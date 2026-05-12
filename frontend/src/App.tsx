import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { useProfileStore } from './stores/profileStore';
import { useSettingsStore } from './stores/settingsStore';
import { useTranslation } from './hooks/useTranslation';
import ExplorePage from './pages/ExplorePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import JourneysPage from './pages/JourneysPage';
import TripDetailsPage from './pages/TripDetailsPage';
import MatchPage from './pages/MatchPage';
import ExpensePage from './pages/ExpensePage';
import SafetyPage from './pages/SafetyPage';
import AgenciesPage from './pages/AgenciesPage';
import SettingsPage from './pages/SettingsPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import NotificationContainer from './components/NotificationContainer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { profile } = useProfileStore();
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('explore'), path: '/', icon: 'explore' },
    { name: t('nomadMatch'), path: '/match', icon: 'people' },
    { name: t('messages'), path: '/chat', icon: 'forum' },
    { name: t('myJourneys'), path: '/journeys', icon: 'map' },
    { name: t('profile'), path: '/profile', icon: 'person' },
    { name: t('settings'), path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SAFAR</div>
      
      <nav className="nav-group" style={{ flex: 1 }}>
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="material-icons nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--brand)', overflow: 'hidden' }}>
            <img src={profile?.profile_photo_url || `https://i.pravatar.cc/100?u=${user?.id}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{profile?.name || user?.email?.split('@')[0]}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{profile?.membership_tier || 'Member'}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="nav-link" 
          style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', padding: '12px' }}
        >
          <span className="material-icons nav-icon">logout</span>
          <span>{t('signOut')}</span>
        </button>
      </div>
    </aside>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();
  const { loadCurrentProfile } = useProfileStore();
  
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentProfile();
    }
  }, [isAuthenticated, loadCurrentProfile]);

  const { language } = useTranslation();
  const isRTL = language === 'Urdu' || language === 'Arabic';

  if (isLoading) return <div className="auth-container">Loading SAFAR...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className={`app-container ${isRTL ? 'rtl-layout' : ''}`} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  const { initSettings } = useSettingsStore();
  
  useEffect(() => {
    initSettings();
  }, [initSettings]);

  return (
    <Router>
      <NotificationContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/journeys" element={<ProtectedRoute><JourneysPage /></ProtectedRoute>} />
        <Route path="/match" element={<ProtectedRoute><MatchPage /></ProtectedRoute>} />
        <Route path="/trip/:id" element={<ProtectedRoute><TripDetailsPage /></ProtectedRoute>} />
        <Route path="/trip/:id/expenses" element={<ProtectedRoute><ExpensePage /></ProtectedRoute>} />
        <Route path="/trip/:id/safety" element={<ProtectedRoute><SafetyPage /></ProtectedRoute>} />
        <Route path="/agencies" element={<ProtectedRoute><AgenciesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/settings/personal-info" element={<ProtectedRoute><PersonalInfoPage /></ProtectedRoute>} />
        <Route path="/settings/notifications" element={<ProtectedRoute><NotificationSettingsPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
