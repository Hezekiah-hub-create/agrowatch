import { useState, useEffect } from 'react';
import { farmsAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { Tractor, MapPin, Maximize, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CROP_ICONS } from '../../data/mockData';

export default function Farms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFarms() {
      try {
        const res = await farmsAPI.list();
        setFarms(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFarms();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Registered Farms</h1>
          <p className="page-subtitle">Manage your field plots and crop configurations.</p>
        </div>
        <Link to="/farms/new">
          <Button icon={<Plus size={18} />}>Add New Farm</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid-3">
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-lg)' }}></div>)}
        </div>
      ) : farms.length === 0 ? (
        <div className="empty-state glass">
          <Tractor className="empty-state-icon" />
          <h3 className="empty-state-title">No farms found</h3>
          <p className="empty-state-desc">Register your first farm plot to start monitoring with drone imagery.</p>
          <Link to="/farms/new"><Button>Register a Farm</Button></Link>
        </div>
      ) : (
        <div className="grid-3">
          {farms.map(farm => (
            <Card key={farm.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: 'var(--radius-md)', 
                  background: 'var(--accent-dim)', color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {CROP_ICONS[farm.crop_type] || '🌱'}
                </div>
                <Badge label={farm.crop_type} variant="info" />
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 4 }}>{farm.farm_name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={14} /> {farm.district}, {farm.region}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <Maximize size={14} /> {farm.area_ha} Hectares
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'var(--sp-2)', display: 'flex', gap: 'var(--sp-3)' }}>
                <Button variant="ghost" fullWidth size="sm">Edit</Button>
                <Link to="/scan" style={{ flex: 1 }}>
                  <Button fullWidth size="sm" iconRight={<ArrowRight size={14} />}>Scan</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
