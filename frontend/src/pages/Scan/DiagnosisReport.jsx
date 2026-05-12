import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { scansAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { DISEASE_CONDITIONS } from '../../data/mockData';
import { ChevronLeft, Printer, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

export default function DiagnosisReport() {
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

  // Group detections by disease type
  const uniqueDiseases = Array.from(new Set(
    (scan.detections || [])
      .filter(d => d.disease_flag?.severity !== 'none')
      .map(d => d.disease_flag.id)
  )).map(id => {
    const disease = DISEASE_CONDITIONS[scan.crop_type].find(dc => dc.id === id);
    const count = scan.detections.filter(d => d.disease_flag.id === id).length;
    return { ...disease, count };
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Link to={`/scan/${scan.id}`} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
            <ChevronLeft size={14} /> Back to Results
          </Link>
          <h1 className="page-title">Expert Advisory Report</h1>
          <p className="page-subtitle">Pest and Disease Diagnosis for {scan.farm_name}</p>
        </div>
        <Button variant="ghost" icon={<Printer size={18} />} onClick={() => window.print()}>Print Report</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
        {/* Summary Card */}
        <Card style={{ background: 'var(--bg-surface)', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 4 }}>System Health Overview</h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                The Expert Advisory Module analyzed {scan.total_plants} plants. 
                {scan.disease_flags > 0 
                  ? ` Found symptoms of ${uniqueDiseases.length} distinct conditions affecting ${(scan.disease_flags/scan.total_plants * 100).toFixed(1)}% of the crop.`
                  : " No pathological symptoms were identified. Crop status is optimal."}
              </p>
            </div>
          </div>
        </Card>

        {/* Diagnosis Detail Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {uniqueDiseases.map((disease, i) => (
            <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ 
                padding: 'var(--sp-4) var(--sp-6)', 
                background: disease.severity === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                borderBottom: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                  {disease.severity === 'high' ? <AlertTriangle size={20} color="var(--danger)" /> : <Info size={20} color="var(--amber)" />}
                  <h3 style={{ fontSize: '1.125rem' }}>{disease.label}</h3>
                  <Badge label={`${disease.count} plants affected`} variant={disease.severity === 'high' ? 'danger' : 'amber'} />
                </div>
                {disease.pathogen && <span style={{ fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{disease.pathogen}</span>}
              </div>
              
              <div style={{ padding: 'var(--sp-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-8)' }}>
                <div>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>Description & Symptoms</h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{disease.description}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Management Recommendations</h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{disease.recommendation}</p>
                </div>
              </div>
            </Card>
          ))}
          
          {uniqueDiseases.length === 0 && (
            <div className="empty-state glass">
              <ShieldCheck className="empty-state-icon" style={{ color: 'var(--accent)' }} />
              <h3 className="empty-state-title">Crop is Healthy</h3>
              <p className="empty-state-desc">Our analysis found no signs of pests or diseases in this field scan. Continue your standard management practices.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
