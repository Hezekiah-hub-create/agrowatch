import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/farms':     'My Farms',
  '/scan':      'New Scan',
  '/market':    'Market Listings',
  '/profile':   'Profile',
};

export default function TopBar({ onMenuClick }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || (pathname.startsWith('/scan/') ? 'Scan Results' : 'AgroWatch');

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 'var(--sidebar-w)',
      right: 0,
      height: 'var(--topbar-h)',
      background: 'var(--bg-base)',
      opacity: 0.9,
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--sp-8)',
      zIndex: 40,
      gap: 'var(--sp-4)',
    }}>
      {/* Mobile menu btn */}
      <button
        onClick={onMenuClick}
        className="topbar-menu-btn"
        style={{
          display: 'none',
          width: 36, height: 36,
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <h1 style={{ fontSize: '1.0625rem', fontWeight: 700, flex: 1, margin: 0, color: 'var(--text-primary)' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <ThemeToggle />
        {/* Notification bell */}
        <button style={{
          position: 'relative',
          width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-input)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Bell size={17} />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--amber)',
            boxShadow: '0 0 6px var(--amber)',
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--sp-2)',
          padding: '4px 10px 4px 4px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          cursor: 'default',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--amber))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.75rem', color: '#0a1410',
          }}>
            {user?.full_name?.charAt(0) || '?'}
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {user?.full_name?.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
