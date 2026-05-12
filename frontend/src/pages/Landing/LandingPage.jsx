import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import ThemeToggle from '../../components/UI/ThemeToggle';
import Logo from '../../components/UI/Logo';
import { Leaf, ShieldCheck, ShoppingBag, ArrowRight, Scan, MapPin, BarChart3, Database, Users, Globe, Activity, Crosshair } from 'lucide-react';
import heroDrone from '../../assets/hero_drone.png';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowX: 'hidden' }}>
      {/* Navbar */}
      <nav style={{ 
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: 'var(--bg-base)',
        opacity: 0.95,
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--sp-4) 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={40} iconSize={24} />
          
          <div className="desktop-only" style={{ display: 'flex', gap: 'var(--sp-8)', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'center' }}>
              <a href="#features" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Features</a>
              <a href="#how-it-works" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)' }}>How it Works</a>
            </div>
            <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
            <ThemeToggle />
            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
              <Link to="/login" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Login</Link>
              <Link to="/register"><Button>Get Started</Button></Link>
            </div>
          </div>

          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <ThemeToggle />
            <Link to="/login"><Button size="sm">Login</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        padding: 'clamp(120px, 15vh, 180px) 0 clamp(60px, 10vh, 120px)', 
        background: 'radial-gradient(circle at top right, var(--accent-dim), transparent 50%), radial-gradient(circle at bottom left, var(--amber-dim), transparent 50%)'
      }}>
        <div className="container grid-hero">
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <Badge label="REVOLUTIONIZING GHANAIAN AGRICULTURE" variant="accent" style={{ marginBottom: 'var(--sp-6)' }} />
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              lineHeight: 1.05,
              marginBottom: 'var(--sp-6)', 
              fontWeight: 800,
              fontFamily: 'Plus Jakarta Sans',
              color: 'var(--text-primary)'
            }}>
              High-Precision <span className="gradient-text">Crop Monitoring</span> & Market Linkage
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: 'var(--sp-10)', lineHeight: 1.6, maxWidth: 540 }}>
              Empowering smallholder farmers in the Volta Region with AI-driven plant detection, tracking, and disease diagnosis for Tomato, Maize, and Pineapple.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
              <Link to="/register">
                <Button size="lg" iconRight={<ArrowRight size={20} />}>Start Monitoring Now</Button>
              </Link>
              <Button variant="ghost" size="lg">Watch the Video</Button>
            </div>
            
            <div style={{ marginTop: 'var(--sp-12)', display: 'flex', gap: 'var(--sp-8)', flexWrap: 'wrap' }}>
              <Stat label="Avg. Yield Increase" value="35%" />
              <Stat label="Disease Detection" value="98%" />
              <Stat label="Active Fields" value="450+" />
            </div>
          </div>

          {/* Enhanced Hero Image Area */}
          <div className="animate-float" style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', inset: '-30px', 
              background: 'linear-gradient(135deg, var(--accent) 0%, transparent 60%)', 
              borderRadius: 'var(--radius-xl)', opacity: 0.15, zIndex: 0 
            }} />
            
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
              <img 
                src={heroDrone} 
                alt="AgroWatch Drone" 
                style={{ width: '100%', display: 'block', position: 'relative', zIndex: 1 }} 
              />
              {/* Scanning Line Effect */}
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px', 
                background: 'linear-gradient(to right, transparent, var(--accent), transparent)', 
                boxShadow: '0 0 15px var(--accent)', 
                zIndex: 2, 
                animation: 'scanLine 4s ease-in-out infinite' 
              }} />
            </div>

            {/* Live HUD - Top Right */}
            <div className="glass" style={{ 
              position: 'absolute', top: 20, right: -10, 
              padding: '10px 16px', 
              display: 'flex', alignItems: 'center', gap: 10, 
              zIndex: 10,
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.05)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.05em' }}>LIVE FEED ANALYSIS</div>
            </div>

            {/* Enhanced Plant Tracking Info - Bottom Left */}
            <div className="glass-strong desktop-only" style={{ 
              position: 'absolute', bottom: 40, left: -30, 
              padding: '20px', 
              display: 'flex', flexDirection: 'column', gap: 12, 
              zIndex: 10,
              minWidth: 240,
              border: '1px solid var(--accent)',
              boxShadow: '0 0 40px var(--accent-dim)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Crosshair size={18} color="var(--accent)" />
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>Target Acquisition</div>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>98.4% CONF</div>
              </div>
              
              <div style={{ height: '1px', background: 'var(--border)' }} />
              
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Current Asset</div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Tomato Plot #124</div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)' }}>Healthy</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>Vitality</div>
                  <div style={{ width: '100%', height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--accent)' }} />
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderLeft: '2px solid var(--accent)', borderTop: '2px solid var(--accent)' }} />
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRight: '2px solid var(--accent)', borderBottom: '2px solid var(--accent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain same... */}
      {/* How it Works Section */}
      <section id="how-it-works" style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Badge label="PROCESS" variant="info" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>The AgroWatch Pipeline</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '1.125rem' }}>Our integrated system handles the entire lifecycle from field data to market sale.</p>
          </div>

          <div className="grid-steps">
            <Step number="01" icon={<Globe size={24} />} title="Drone Deployment" desc="Deploy autonomous drones to capture high-res field imagery across your plots." />
            <Step number="02" icon={<Database size={24} />} title="AI Detection" desc="Our YOLOv8 models identify individual plants and track them across frames." />
            <Step number="03" icon={<ShieldCheck size={24} />} title="Expert Diagnosis" desc="The expert system analyzes symptoms and provides treatment advisories." />
            <Step number="04" icon={<ShoppingBag size={24} />} title="Market Sale" desc="Verified healthy produce is listed on the marketplace for direct buyer linkage." />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container" style={{ padding: '120px 0' }}>
        <div className="glass-strong" style={{ 
          padding: 'clamp(40px, 8vw, 100px) var(--container-px)', 
          textAlign: 'center', 
          borderRadius: 'var(--radius-xl)', 
          background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 'var(--sp-6)', color: 'var(--text-primary)' }}>Ready to scale your farm?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: 'var(--sp-10)', maxWidth: 640, margin: '0 auto var(--sp-10)' }}>
            Join the agricultural revolution today. Register your farm and get your first field scan processed for free.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register"><Button size="lg">Create Your Account</Button></Link>
            <Button variant="ghost" size="lg">Contact Support</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '80px 0', background: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-6)' }}>
          <Logo size={32} iconSize={18} />
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © 2025 AgroWatch Ghana. Built for Ho Technical University.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>{value}</div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{label}</div>
    </div>
  );
}

function Step({ number, icon, title, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent)', opacity: 0.2 }}>{number}</div>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>
      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}
