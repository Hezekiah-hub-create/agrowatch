import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { scansAPI, farmsAPI, marketAPI } from '../../services/api';
import StatCard from '../../components/UI/StatCard';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { Leaf, ScanLine, Tractor, ShoppingBasket, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, isFarmer } = useAuth();
  const [scans, setScans] = useState([]);
  const [farms, setFarms] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [scansRes, farmsRes, marketRes] = await Promise.all([
          scansAPI.list(),
          farmsAPI.list(),
          marketAPI.list()
        ]);
        setScans(scansRes);
        setFarms(farmsRes);
        setListings(marketRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    { label: 'Total Plants', value: scans.reduce((acc, s) => acc + (s.total_plants || 0), 0), icon: <Leaf />, color: 'var(--accent)', trend: 12 },
    { label: 'Active Scans', value: scans.length, icon: <ScanLine />, color: 'var(--info)', trend: 5 },
    { label: 'Registered Farms', value: farms.length, icon: <Tractor />, color: 'var(--amber)', trend: 0 },
    { label: 'Market Listings', value: listings.length, icon: <ShoppingBasket />, color: 'var(--accent)', trend: 8 },
  ];

  if (loading) return <div className="skeleton" style={{ height: '100%', width: '100%' }}></div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.full_name?.split(' ')[0]}</h1>
          <p className="page-subtitle">Here is what's happening on your farm today.</p>
        </div>
        <Link to="/scan">
          <Button icon={<ScanLine size={18} />}>Start New Scan</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-8)' }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="dashboard-grid">
        {/* Recent Scans */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Recent Field Scans</h3>
            <Link to="/scan" style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600 }}>View All</Link>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Farm & Crop</th>
                  <th>Date</th>
                  <th>Plants</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scans.slice(0, 5).map(scan => (
                  <tr key={scan.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{scan.farm_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{scan.crop_type}</div>
                    </td>
                    <td>{new Date(scan.scan_date).toLocaleDateString()}</td>
                    <td>{scan.total_plants}</td>
                    <td>
                      <Badge 
                        label={scan.disease_flags > 0 ? `${scan.disease_flags} Flags` : 'Healthy'} 
                        variant={scan.disease_flags > 0 ? 'danger' : 'accent'} 
                        dot 
                      />
                    </td>
                    <td>
                      <Link to={`/scan/${scan.id}`}>
                        <Button variant="ghost" size="sm" icon={<ArrowUpRight size={14} />}>Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alerts & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <Card variant="glass" style={{ borderColor: 'var(--danger)' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
              <AlertCircle color="var(--danger)" size={20} />
              <div>
                <h4 style={{ fontSize: '0.9375rem', marginBottom: 4 }}>Urgent Alert</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Late Blight symptoms detected in Asante Family Farm. Treatment recommended.
                </p>
                <Link to="/scan/scan-001" style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 700, marginTop: 8, display: 'block' }}>
                  VIEW REPORT
                </Link>
              </div>
            </div>
          </Card>

          <Card style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--sp-4)' }}>Activity Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {[
                { icon: <Clock size={14} />, text: 'Scan completed for North Field', time: '2h ago' },
                { icon: <ShoppingBasket size={14} />, text: 'New enquiry for your Tomato listing', time: '5h ago' },
                { icon: <Tractor size={14} />, text: 'New farm "Riverside Plot" added', time: '1d ago' },
              ].map((act, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-muted)' }}>{act.icon}</div>
                  <div style={{ flex: 1, fontSize: '0.8125rem' }}>{act.text}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
