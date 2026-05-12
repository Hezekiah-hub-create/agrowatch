import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmsAPI, scansAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import ScanPipeline from '../../components/Scan/ScanPipeline';
import { Upload, Tractor, Leaf, X, AlertCircle } from 'lucide-react';

export default function NewScan() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [files, setFiles] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFarms() {
      try {
        const res = await farmsAPI.list();
        setFarms(res);
        if (res.length > 0) setSelectedFarm(res[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFarms();
  }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startScan = async () => {
    if (!selectedFarm || files.length === 0) return;
    setScanning(true);
  };

  const onScanComplete = async () => {
    const formData = new FormData();
    formData.append('farm_id', selectedFarm.id);
    formData.append('farm_name', selectedFarm.farm_name);
    formData.append('crop_type', selectedFarm.crop_type);
    files.forEach(f => formData.append('images', f));

    try {
      const scan = await scansAPI.create(formData);
      navigate(`/scan/${scan.id}`);
    } catch (err) {
      alert('Scan processing failed.');
      setScanning(false);
    }
  };

  if (loading) return <div className="skeleton" style={{ height: '100%', width: '100%' }}></div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">New Field Scan</h1>
        <p className="page-subtitle">Upload drone imagery for automated plant detection and tracking.</p>
      </div>

      {scanning ? (
        <Card style={{ padding: 'var(--sp-12)' }}>
          <ScanPipeline onComplete={onScanComplete} />
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <Card>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--sp-4)' }}>Step 1: Select Field Plot</h3>
            <div className="grid-2">
              <Select 
                label="Target Farm"
                icon={Tractor}
                placeholder="Choose a farm..."
                value={selectedFarm?.id}
                options={farms.map(f => ({ value: f.id, label: f.farm_name }))}
                onChange={(val) => setSelectedFarm(farms.find(f => f.id === val))}
              />
              
              <div className="form-group">
                <label className="form-label">Detected Crop Type</label>
                <div style={{ position: 'relative' }}>
                  <Leaf size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="form-input" value={selectedFarm?.crop_type || ''} readOnly style={{ paddingLeft: 44, background: 'rgba(255,255,255,0.02)', textTransform: 'capitalize' }} />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--sp-4)' }}>Step 2: Upload Drone Imagery</h3>
            <div 
              style={{
                border: '2px dashed var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--sp-10)',
                textAlign: 'center',
                background: 'rgba(74, 222, 128, 0.02)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <Upload size={40} style={{ color: 'var(--text-muted)', marginBottom: 'var(--sp-4)' }} />
              <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Drag and drop images here</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Support for .jpg, .png, .mp4 drone footage (Max 100MB)</div>
              <input 
                id="file-upload" 
                type="file" 
                multiple 
                hidden 
                accept="image/*,video/*" 
                onChange={handleFileChange}
              />
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Selected Files ({files.length})</div>
                {files.map((file, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-2) var(--sp-3)', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', overflow: 'hidden' }}>
                      <Leaf size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center', background: 'var(--accent-dim)', padding: 'var(--sp-4)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
            <AlertCircle size={20} color="var(--accent)" />
            <p style={{ fontSize: '0.8125rem', color: 'var(--accent)' }}>
              Note: For best results, ensure images are captured at noon with minimal cloud cover at an altitude of 10-30 meters.
            </p>
          </div>

          <Button 
            size="lg" 
            fullWidth 
            disabled={files.length === 0 || !selectedFarm}
            onClick={startScan}
          >
            Initialize AI Analysis Pipeline
          </Button>
        </div>
      )}
    </div>
  );
}
