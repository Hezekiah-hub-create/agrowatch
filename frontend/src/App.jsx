import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages (to be implemented)
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Farms from './pages/Farms/Farms';
import AddFarm from './pages/Farms/AddFarm';
import NewScan from './pages/Scan/NewScan';
import ScanResults from './pages/Scan/ScanResults';
import DiagnosisReport from './pages/Scan/DiagnosisReport';
import MarketListings from './pages/Market/MarketListings';
import CreateListing from './pages/Market/CreateListing';
import Profile from './pages/Profile/Profile';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }}></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Dashboard Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="farms" element={<Farms />} />
        <Route path="farms/new" element={<AddFarm />} />
        <Route path="scan" element={<NewScan />} />
        <Route path="scan/:scanId" element={<ScanResults />} />
        <Route path="diagnose/:scanId" element={<DiagnosisReport />} />
        <Route path="market" element={<MarketListings />} />
        <Route path="market/new" element={<CreateListing />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
