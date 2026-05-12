import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { farmsAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Tractor, MapPin, Maximize, Save, X } from 'lucide-react';
import { CROPS, REGIONS, DISTRICTS } from '../../data/mockData';

export default function AddFarm() {
  const [formData, setFormData] = useState({
    farm_name: '',
    crop_type: 'tomato',
    region: 'Volta Region',
    district: 'Ho',
    area_ha: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await farmsAPI.create({
        ...formData,
        area_ha: parseFloat(formData.area_ha)
      });
      navigate('/farms');
    } catch (err) {
      alert('Failed to register farm.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Register New Farm</h1>
        <p className="page-subtitle">Provide details about your field plot for accurate monitoring.</p>
      </div>

      <Card style={{ padding: 'var(--sp-8)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <div className="form-group">
            <label className="form-label">Farm Name</label>
            <div style={{ position: 'relative' }}>
              <Tractor size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                name="farm_name" 
                className="form-input" 
                placeholder="e.g. Riverside Tomato Plot" 
                style={{ paddingLeft: 44 }} 
                value={formData.farm_name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
            <div className="form-group">
              <label className="form-label">Main Crop Type</label>
              <select name="crop_type" className="form-input" value={formData.crop_type} onChange={handleChange}>
                {CROPS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Area (Hectares)</label>
              <div style={{ position: 'relative' }}>
                <Maximize size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  name="area_ha" 
                  type="number" 
                  step="0.1" 
                  className="form-input" 
                  placeholder="e.g. 1.5" 
                  style={{ paddingLeft: 44 }} 
                  value={formData.area_ha} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
            <div className="form-group">
              <label className="form-label">Region</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                <select name="region" className="form-input" style={{ paddingLeft: 44 }} value={formData.region} onChange={handleChange}>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <select name="district" className="form-input" value={formData.district} onChange={handleChange}>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
            <Button variant="ghost" fullWidth icon={<X size={18} />} onClick={() => navigate('/farms')}>Cancel</Button>
            <Button type="submit" fullWidth icon={<Save size={18} />} loading={loading}>Save Farm Record</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
