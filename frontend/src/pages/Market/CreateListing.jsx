import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { ShoppingBasket, Package, Banknote, Calendar, Save, X } from 'lucide-react';
import { CROPS } from '../../data/mockData';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    crop_type: 'tomato',
    quantity_kg: '',
    asking_price_ghs: '',
    harvest_date: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await marketAPI.create({
        ...formData,
        quantity_kg: parseFloat(formData.quantity_kg),
        asking_price_ghs: parseFloat(formData.asking_price_ghs)
      });
      navigate('/market');
    } catch (err) {
      alert('Failed to create listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">List Your Produce</h1>
        <p className="page-subtitle">Reach verified buyers across Ghana and secure fair prices.</p>
      </div>

      <Card style={{ padding: 'var(--sp-8)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
            <div className="form-group">
              <label className="form-label">Produce Type</label>
              <div style={{ position: 'relative' }}>
                <ShoppingBasket size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select name="crop_type" className="form-input" style={{ paddingLeft: 44 }} value={formData.crop_type} onChange={handleChange}>
                  {CROPS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Quantity (Kilograms)</label>
              <div style={{ position: 'relative' }}>
                <Package size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="quantity_kg" type="number" className="form-input" placeholder="e.g. 250" style={{ paddingLeft: 44 }} value={formData.quantity_kg} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
            <div className="form-group">
              <label className="form-label">Asking Price (GHS per kg)</label>
              <div style={{ position: 'relative' }}>
                <Banknote size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="asking_price_ghs" type="number" step="0.1" className="form-input" placeholder="e.g. 8.5" style={{ paddingLeft: 44 }} value={formData.asking_price_ghs} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Available from (Harvest Date)</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                <input name="harvest_date" type="date" className="form-input" style={{ paddingLeft: 44 }} value={formData.harvest_date} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Listing Description</label>
            <textarea 
              name="description" 
              className="form-input" 
              rows={4} 
              placeholder="Provide details about quality, variety, and delivery options..." 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
            <Button variant="ghost" fullWidth icon={<X size={18} />} onClick={() => navigate('/market')}>Cancel</Button>
            <Button type="submit" fullWidth icon={<Save size={18} />} loading={loading}>Publish Listing</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
