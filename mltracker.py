"""
AgroWatch ML Tracker
Assigns stable track IDs to detections across a sequence of images
using YOLOv8's built-in ByteTrack tracker.
"""

from pathlib import Path
from typing import List, Dict, Any

WEIGHTS_DIR = Path(__file__).resolve().parent / "mlweights"

MODEL_PATHS = {
    "tomato":    WEIGHTS_DIR / "tomato.pt",
    "maize":     WEIGHTS_DIR / "maize.pt",
    "pineapple": WEIGHTS_DIR / "pineapple.pt",
}

_tracker_cache: Dict[str, Any] = {}


def _load_model(crop_type: str):
    if crop_type not in _tracker_cache:
        try:
            from ultralytics import YOLO
        except ImportError:
            raise RuntimeError("ultralytics is not installed. Run: pip install ultralytics")
        weight_path = MODEL_PATHS.get(crop_type)
        if not weight_path or not weight_path.exists():
            raise FileNotFoundError(f"Weights not found: {weight_path}")
        _tracker_cache[crop_type] = YOLO(str(weight_path))
    return _tracker_cache[crop_type]


def run_tracking(image_paths: List[str], crop_type: str, conf_threshold: float = 0.25) -> Dict:
    """
    Run YOLOv8 detection + ByteTrack tracking over a sequence of images.

    Args:
        image_paths:    Ordered list of image file paths (one scan session).
        crop_type:      One of "tomato", "maize", "pineapple".
        conf_threshold: Minimum confidence threshold.

    Returns:
        {
            "tracked_detections": [ {track_id, x, y, w, h, conf, class_name, is_disease, frame_idx}, … ],
            "unique_track_ids":   set of int,
            "total_plants":       int,
            "disease_flags":      int,
            "id_switches":        int,   # proxy: repeated track_id resets
            "mota_approx":        float, # 1 - (FP + FN + IDsw) / GT
        }
    """
    model = _load_model(crop_type)

    all_detections = []
    seen_track_ids = set()
    id_switches = 0
    gt_count = 0

    for frame_idx, img_path in enumerate(image_paths):
        results = model.track(
            source=img_path,
            conf=conf_threshold,
            persist=True,       # keep state across frames
            tracker="bytetrack.yaml",
            verbose=False,
            save=False,
        )

        for result in results:
            boxes = result.boxes
            names = result.names
            if boxes is None or boxes.id is None:
                continue
            for box, track_id in zip(boxes, boxes.id.int().tolist()):
                cls_id = int(box.cls[0])
                cls_name = names.get(cls_id, str(cls_id)).lower()
                x_c, y_c, w, h = box.xywh[0].tolist()
                conf = float(box.conf[0])
                is_disease = "healthy" not in cls_name

                if track_id in seen_track_ids:
                    id_switches += 1
                seen_track_ids.add(track_id)
                gt_count += 1

                all_detections.append({
                    "track_id":   track_id,
                    "frame_idx":  frame_idx,
                    "x": round(x_c, 2),
                    "y": round(y_c, 2),
                    "w": round(w, 2),
                    "h": round(h, 2),
                    "confidence": round(conf, 4),
                    "class_name": cls_name,
                    "is_disease": is_disease,
                })

    unique_ids = {d["track_id"] for d in all_detections}
    disease_flags = sum(1 for d in all_detections if d["is_disease"])

    # Approximate MOTA: 1 - (FP + FN + IDsw) / GT
    # In the tracking context: FP ≈ 0 (YOLO handles FP internally),
    # FN is inferred from gt_count - matched, IDsw from our proxy.
    fn_approx = max(0, gt_count - len(unique_ids))
    mota = round(1.0 - (0 + fn_approx + id_switches) / max(gt_count, 1), 4)

    return {
        "tracked_detections": all_detections,
        "unique_track_ids":   unique_ids,
        "total_plants":       len(unique_ids),
        "disease_flags":      disease_flags,
        "id_switches":        id_switches,
        "mota_approx":        mota,
    }
