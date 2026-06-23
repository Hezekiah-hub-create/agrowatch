import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import ThemeToggle from '../../components/UI/ThemeToggle';
import Logo from '../../components/UI/Logo';
import Modal from '../../components/UI/Modal';
import { Leaf, ShieldCheck, ShoppingBag, ArrowRight, Scan, MapPin, BarChart3, Database, Users, Globe, Activity, Crosshair, Play, Apple, Wheat, Citrus } from 'lucide-react';
import heroDrone from '../../assets/hero_drone.png';

export default function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
              <a href="#crops" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Crops</a>
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
              <Button variant="ghost" size="lg" icon={<Play size={18} fill="currentColor" />} onClick={() => setIsVideoOpen(true)}>
                Watch the Video
              </Button>
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
          </div>
        </div>
      </section>
      
      {/* Crops Section */}
      <section id="crops" style={{ padding: '100px 0', background: 'var(--bg-base)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Badge label="PRECISION TARGETING" variant="accent" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Supported Value Chains</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
              Our AI models are specifically trained for the unique agricultural landscape of Ghana.
            </p>
          </div>

          <div className="grid-3">
            <CropCard 
              name="Tomato" 
              desc="Early detection of Late Blight, Bacterial Spot, and Leaf Curl Virus to prevent total crop loss." 
              benefits={['Early Diagnosis', 'Treatment Advisory', 'Yield Optimization']}
              image={<Apple size={48} color="var(--accent)" />}
            />
            <CropCard 
              name="Maize" 
              desc="Monitoring growth vigor and identifying nitrogen deficiencies in the Ashanti and Volta belts." 
              benefits={['Growth Tracking', 'Nutrient Analysis', 'Harvest Timing']}
              image={<Wheat size={48} color="var(--accent)" />}
            />
            <CropCard 
              name="Pineapple" 
              desc="High-resolution plot management and size estimation for export-grade fruit tracking." 
              benefits={['Size Calibration', 'Plot Mapping', 'Export Verification']}
              image={<Citrus size={48} color="var(--accent)" />}
            />
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section id="features" style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container grid-hero">
          <div style={{ position: 'relative' }}>
            <div className="glass-strong" style={{ padding: '40px', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
                <FeatureItem 
                  icon={<Activity size={24} />} 
                  title="Real-time AI Vision" 
                  desc="Utilizing YOLOv8 nano-models for rapid on-device plant detection even in low-connectivity areas."
                />
                <FeatureItem 
                  icon={<ShieldCheck size={24} />} 
                  title="Expert Rule-Engine" 
                  desc="A hybrid system combining AI predictions with established agricultural knowledge bases."
                />
                <FeatureItem 
                  icon={<BarChart3 size={24} />} 
                  title="Predictive Analytics" 
                  desc="Historical data analysis to predict potential outbreaks based on regional weather patterns."
                />
              </div>
            </div>
          </div>
          
          <div>
            <Badge label="TECHNOLOGY" variant="info" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--sp-6)' }}>
              Intelligence <span style={{ color: 'var(--accent)' }}>Beyond</span> Simple Vision
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: 'var(--sp-8)', lineHeight: 1.7 }}>
              AgroWatch isn't just about taking pictures. It's about providing actionable intelligence. 
              Our system bridges the gap between raw data and farmer decision-making.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
              <div className="glass" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: 8 }}>98% Accuracy</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>In controlled plant detection tests.</p>
              </div>
              <div className="glass" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--info)', marginBottom: 8 }}>24/7 Monitoring</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Constant field state persistence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(to bottom, var(--bg-base), var(--bg-surface))' }}>
        <div className="container">
          <div className="glass-strong" style={{ padding: '60px', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--sp-12)' }}>Regional Impact in Volta</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-10)' }}>
              <ImpactStat value="1,200+" label="Plants Monitored" sub="Across active pilot plots" />
              <ImpactStat value="85%" label="Waste Reduction" sub="Through early disease intervention" />
              <ImpactStat value="4.8/5" label="Farmer Rating" sub="Based on initial pilot surveys" />
              <ImpactStat value="24hr" label="Expert Sync" sub="Average time for expert validation" />
            </div>
          </div>
        </div>
      </section>

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

      {/* Video Modal */}
      <Modal 
        open={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        title="AgroWatch in Action"
        width={900}
      >
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          <iframe 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            src="https://www.youtube.com/embed/XmGv72p_8vU?autoplay=1"
            title="AgroWatch Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '80px 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 'var(--sp-12)', marginBottom: 'var(--sp-12)' }}>
            <div>
              <Logo size={40} iconSize={24} style={{ marginBottom: 'var(--sp-6)' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: 'var(--sp-4)', maxWidth: 300 }}>
                Revolutionizing agricultural monitoring through computer vision and expert systems.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--sp-4)' }}>Platform</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <a href="#features">Features</a>
                <a href="#crops">Crops</a>
                <a href="#how-it-works">How it Works</a>
                <Link to="/market">Marketplace</Link>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--sp-4)' }}>Research</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <span>Ho Technical University</span>
                <span>Computer Science Dept</span>
                <span>Dissertation Project</span>
                <span>Volta Region, Ghana</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-6)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              © 2025 AgroWatch Ghana. Built by Hezekiah Tounou for HTU.
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-6)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <Link to="/login">Farmer Portal</Link>
              <Link to="/login">Buyer Portal</Link>
            </div>
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

function CropCard({ name, desc, benefits, image }) {
  return (
    <div className="glass-strong" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <div style={{ fontSize: '3rem' }}>{image}</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{name}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginTop: 'auto' }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--accent)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--sp-5)' }}>
      <div style={{ 
        width: 48, height: 48, borderRadius: 'var(--radius-md)', 
        background: 'var(--accent-dim)', color: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 4 }}>{title}</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

function ImpactStat({ value, label, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  );
}
