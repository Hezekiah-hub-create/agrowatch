import { useAuth } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import { User, Phone, MapPin, Shield, Edit2, LogOut } from 'lucide-react';

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
    : parts[0].substring(0, 2).toUpperCase();
};

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">User Profile</h1>
        <p className="page-subtitle">Manage your account settings and regional preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--sp-8)' }}>
        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <Card style={{ textAlign: 'center', padding: 'var(--sp-10)' }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'var(--accent-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '2.5rem', color: 'var(--accent)',
              margin: '0 auto var(--sp-6)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              {getInitials(user?.full_name)}
            </div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 4 }}>{user.full_name}</h2>
            <Badge label={user.user_role} variant="accent" dot />
            <div style={{ marginTop: 'var(--sp-8)' }}>
              <Button variant="ghost" fullWidth icon={<Edit2 size={16} />}>Edit Profile</Button>
            </div>
          </Card>

          <Button variant="danger" fullWidth icon={<LogOut size={18} />} onClick={logout}>Sign Out</Button>
        </div>

        {/* Details Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--sp-6)' }}>Account Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
              <DetailItem icon={<Phone size={20} />} label="Phone Number" value={user.phone_number} />
              <DetailItem icon={<MapPin size={20} />} label="Region" value={user.region} />
              <DetailItem icon={<Shield size={20} />} label="Identity Status" value="Verified Farmer" status="accent" />
            </div>
          </Card>

          <Card>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--sp-6)' }}>System Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Push Notifications</span>
                <Badge label="Enabled" variant="accent" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Language</span>
                <Badge label="English" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, status }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
      <div style={{ color: 'var(--text-muted)' }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: '1rem', fontWeight: 500 }}>{value}</div>
      </div>
      {status && <Badge label="Verified" variant={status} dot />}
    </div>
  );
}
