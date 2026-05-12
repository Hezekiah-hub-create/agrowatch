import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { scansAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import StatCard from '../../components/UI/StatCard';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import PlantDetectionMap from '../../components/Scan/PlantDetectionMap';
import { Leaf, AlertTriangle, FileText, ChevronLeft, Download } from 'lucide-react';

export default function ScanResults() {
  const { scanId } = useParams();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScan() {
      try {
        const res = await scansAPI.get(scanId);
        setScan(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadScan();
  }, [scanId]);

  if (loading) return <div className="skeleton" style={{ height: '100%', width: '100%' }}></div>;
  if (!scan) return <div>Scan not found.</div>;

  const metrics = [
    { label: 'Precision', value: scan.precision, icon: <Leaf />, color: 'var(--accent)' },
    { label: 'Recall', value: scan.recall, icon: <Leaf />, color: 'var(--accent)' },
    { label: 'F1 Score', value: scan.f1_score, icon: <Leaf />, color: 'var(--info)' },
    { label: 'MOTA', value: scan.mota, icon: <Leaf />, color: 'var(--amber)', sub: 'Tracking Accuracy' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="page-title">{scan.farm_name} - {scan.crop_type}</h1>
          <p className="page-subtitle">Scan ID: {scan.id} • Processed on {new Date(scan.scan_date).toLocaleString()}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
          <Button variant="ghost" icon={<Download size={18} />}>Export Data</Button>
          <Link to={`/diagnose/${scan.id}`}>
            <Button variant="amber" icon={<AlertTriangle size={18} />}>View Diagnosis Report</Button>
          </Link>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 'var(--sp-8)' }}>
        {metrics.map((m, i) => <StatCard key={i} {...m} />)}
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Detection Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)' }}>
              <h3 style={{ fontSize: '1rem' }}>Detection & Tracking Visualization</h3>
              <Badge label={`${scan.total_plants} Plants Detected`} variant="accent" dot />
            </div>
            <PlantDetectionMap detections={scan.detections || []} cropType={scan.crop_type} />
          </Card>

          <Card>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--sp-4)' }}>Performance Overview</h3>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p>The YOLOv8 model identified <strong style={{color: 'var(--text-primary)'}}>{scan.total_plants}</strong> plants with a confidence threshold of 0.25.</p>
              <p>Tracking algorithm (Modified SORT) recorded <strong style={{color: 'var(--text-primary)'}}>{scan.identity_switches}</strong> identity switches across the drone sequence.</p>
              <p>Disease detection module flagged <strong style={{color: 'var(--danger)'}}>{scan.disease_flags}</strong> individual plants for further inspection.</p>
            </div>
          </Card>
        </div>

        {/* Detailed Detection List */}
        <Card style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)' }}>
            <h3 style={{ fontSize: '1rem' }}>Flagged Detections</h3>
            <Badge label="High Priority" variant="danger" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', maxHeight: 500, overflowY: 'auto', paddingRight: 8 }}>
            {(scan.detections || []).filter(d => d.disease_flag?.severity !== 'none').map((det, i) => (
              <div key={i} style={{ padding: 'var(--sp-3)', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)' }}>TRACK ID: {det.track_id}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Conf: {det.confidence}</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>{det.disease_flag.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Severity: {det.disease_flag.severity}</div>
              </div>
            ))}
            
            {(scan.detections || []).filter(d => d.disease_flag?.severity !== 'none').length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--text-muted)' }}>
                No significant disease flags in this scan.
              </div>
            )}
          </div>
          
          <Link to={`/diagnose/${scan.id}`} style={{ display: 'block', marginTop: 'var(--sp-6)' }}>
            <Button variant="ghost" fullWidth icon={<FileText size={16} />}>Detailed Diagnosis Report</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
