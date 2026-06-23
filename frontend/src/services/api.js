import axios from 'axios';
import {
  MOCK_FARMS, MOCK_SCANS, MOCK_LISTINGS, MOCK_USERS
} from '../data/mockData';

// ── Config ──────────────────────────────────────────────────────────────────
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // default true
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const http = axios.create({ baseURL: BASE_URL });

// Attach token to all requests
http.interceptors.request.use((cfg) => {
  const stored = localStorage.getItem('agrowatch_user');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: async (phone, password, role) => {
    if (USE_MOCK) { await delay(600); return { user: MOCK_USERS[role] || MOCK_USERS.farmer, token: 'mock-jwt' }; }
    const { data } = await http.get('/users/');
    const user = data.find(u => u.phone_number === phone);
    if (!user) throw new Error("Invalid credentials");
    return { user, token: 'mock-jwt' };
  },
  register: async (payload) => {
    if (USE_MOCK) { await delay(800); return { user: { id: Date.now(), ...payload }, token: 'mock-jwt' }; }
    const drfPayload = {
      username: payload.phone_number,
      phone_number: payload.phone_number,
      full_name: payload.full_name,
      user_role: payload.role,
      region: payload.region,
      district: payload.district,
      password: payload.password
    };
    const { data } = await http.post('/users/', drfPayload);
    return { user: data, token: 'mock-jwt' };
  },
};

// ── Farms ─────────────────────────────────────────────────────────────────────
export const farmsAPI = {
  list: async (farmerId) => {
    if (USE_MOCK) { await delay(400); return MOCK_FARMS.filter(f => f.farmer_id === farmerId || !farmerId); }
    const { data } = await http.get('/farms/');
    return data;
  },
  create: async (payload) => {
    if (USE_MOCK) {
      await delay(600);
      const farm = { id: Date.now(), farmer_id: 1, created_at: new Date().toISOString(), ...payload };
      MOCK_FARMS.push(farm);
      return farm;
    }
    const { data } = await http.post('/farms/', payload);
    return data;
  },
  get: async (id) => {
    if (USE_MOCK) { await delay(300); return MOCK_FARMS.find(f => f.id === Number(id)); }
    const { data } = await http.get(`/farms/${id}/`);
    return data;
  },
  update: async (id, payload) => {
    if (USE_MOCK) {
      await delay(400);
      const index = MOCK_FARMS.findIndex(f => f.id === Number(id));
      if (index !== -1) {
        MOCK_FARMS[index] = { ...MOCK_FARMS[index], ...payload };
        return MOCK_FARMS[index];
      }
      throw new Error('Farm not found');
    }
    const { data } = await http.patch(`/farms/${id}/`, payload);
    return data;
  },
};

// ── Scans ─────────────────────────────────────────────────────────────────────
export const scansAPI = {
  list: async () => {
    if (USE_MOCK) { await delay(400); return MOCK_SCANS; }
    const { data } = await http.get('/scans/');
    return data;
  },
  get: async (id) => {
    if (USE_MOCK) { await delay(300); return MOCK_SCANS.find(s => s.id === id); }
    const { data } = await http.get(`/scans/${id}/`);
    return data;
  },
  create: async (payload) => {
    if (USE_MOCK) {
      await delay(3000); // simulate processing
      const scan = {
        id: `scan-${Date.now()}`,
        status: 'completed',
        total_plants: Math.floor(150 + Math.random() * 400),
        disease_flags: Math.floor(5 + Math.random() * 40),
        precision: 0.87, recall: 0.83, f1_score: 0.85, mota: 0.78,
        identity_switches: 16,
        scan_date: new Date().toISOString(),
        ...payload,
      };
      MOCK_SCANS.unshift(scan);
      return scan;
    }
    const { data } = await http.post('/scans/', payload);
    return data;
  },
};

// ── Market ─────────────────────────────────────────────────────────────────────
export const marketAPI = {
  list: async (filters = {}) => {
    if (USE_MOCK) {
      await delay(400);
      let results = [...MOCK_LISTINGS];
      if (filters.crop_type) results = results.filter(l => l.crop_type === filters.crop_type);
      if (filters.region) results = results.filter(l => l.farmer_region === filters.region);
      return results;
    }
    const { data } = await http.get('/market/listings/', { params: filters });
    return data;
  },
  create: async (payload) => {
    if (USE_MOCK) {
      await delay(600);
      const listing = { id: Date.now(), farmer_id: 1, farmer_name: 'Kwame Asante',
        farmer_region: 'Volta Region', farmer_district: 'Ho',
        listing_status: 'active', created_at: new Date().toISOString(), ...payload };
      MOCK_LISTINGS.unshift(listing);
      return listing;
    }
    const { data } = await http.post('/market/listings/', payload);
    return data;
  },
  enquire: async (listingId, message) => {
    if (USE_MOCK) { await delay(500); return { success: true }; }
    const { data } = await http.post(`/market/listings/${listingId}/enquire/`, { message });
    return data;
  },
};
