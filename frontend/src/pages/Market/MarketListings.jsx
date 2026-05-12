import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { marketAPI } from '../../services/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ListingCard from '../../components/Market/ListingCard';
import Modal from '../../components/UI/Modal';
import { ShoppingBasket, Search, Filter, Plus, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CROPS, REGIONS } from '../../data/mockData';

export default function MarketListings() {
  const { isFarmer } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ crop_type: '', region: '' });
  const [selectedListing, setSelectedListing] = useState(null);
  const [enquiry, setEnquiry] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadListings();
  }, [filters]);

  async function loadListings() {
    setLoading(true);
    try {
      const res = await marketAPI.list(filters);
      setListings(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnquire = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await marketAPI.enquire(selectedListing.id, enquiry);
      alert('Your enquiry has been sent to the farmer!');
      setSelectedListing(null);
      setEnquiry('');
    } catch (err) {
      alert('Failed to send enquiry.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Agricultural Marketplace</h1>
          <p className="page-subtitle">Connecting Volta Region farmers directly with institutional and retail buyers.</p>
        </div>
        {isFarmer && (
          <Link to="/market/new">
            <Button icon={<Plus size={18} />}>Create Listing</Button>
          </Link>
        )}
      </div>

      {/* Filters Bar */}
      <Card style={{ marginBottom: 'var(--sp-8)', padding: 'var(--sp-4) var(--sp-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
            <label className="form-label">Crop Type</label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select 
                className="form-input" 
                style={{ paddingLeft: 36 }}
                value={filters.crop_type}
                onChange={e => setFilters(p => ({ ...p, crop_type: e.target.value }))}
              >
                <option value="">All Crops</option>
                {CROPS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
            <label className="form-label">Location (Region)</label>
            <div style={{ position: 'relative' }}>
              <Filter size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select 
                className="form-input" 
                style={{ paddingLeft: 36 }}
                value={filters.region}
                onChange={e => setFilters(p => ({ ...p, region: e.target.value }))}
              >
                <option value="">All Regions</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <Button variant="ghost" onClick={() => setFilters({ crop_type: '', region: '' })}>Reset</Button>
        </div>
      </Card>

      {loading ? (
        <div className="grid-auto">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 320, borderRadius: 'var(--radius-lg)' }}></div>)}
        </div>
      ) : listings.length === 0 ? (
        <div className="empty-state glass">
          <ShoppingBasket className="empty-state-icon" />
          <h3 className="empty-state-title">No listings found</h3>
          <p className="empty-state-desc">Try adjusting your filters or check back later for new produce listings.</p>
        </div>
      ) : (
        <div className="grid-auto">
          {listings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onEnquire={() => setSelectedListing(listing)} 
            />
          ))}
        </div>
      )}

      {/* Enquiry Modal */}
      <Modal 
        open={!!selectedListing} 
        onClose={() => setSelectedListing(null)}
        title="Contact Farmer"
      >
        {selectedListing && (
          <form onSubmit={handleEnquire} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            <div style={{ padding: 'var(--sp-4)', background: 'var(--accent-dim)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{selectedListing.crop_type.toUpperCase()} - {selectedListing.quantity_kg}kg</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Farmer: {selectedListing.farmer_name}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea 
                className="form-input" 
                rows={4} 
                placeholder="Ask about availability, delivery, or negotiate price..."
                value={enquiry}
                onChange={e => setEnquiry(e.target.value)}
                required
              />
            </div>
            <Button type="submit" fullWidth icon={<Send size={18} />} loading={sending}>
              Send Enquiry
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
