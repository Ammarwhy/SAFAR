import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    pushMessages: true,
    pushMatches: true,
    pushTrips: true,
    emailWeekly: false,
    emailMarketing: false
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleRow = ({ title, subtitle, value, onChange }: any) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      padding: '20px', 
      borderBottom: '1px solid var(--border)' 
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{title}</p>
        {subtitle && <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div 
        onClick={onChange}
        style={{ 
          width: '44px', 
          height: '24px', 
          borderRadius: '12px', 
          backgroundColor: value ? 'var(--brand)' : '#e5e7eb', 
          position: 'relative', 
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        <div style={{ 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          backgroundColor: '#fff', 
          position: 'absolute', 
          top: '2px', 
          left: value ? '22px' : '2px',
          transition: 'all 0.3s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }} />
      </div>
    </div>
  );

  return (
    <div className="page-container animate-fade">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="icon-btn-hover"
          >
            <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
          </button>
          <h1 className="h1" style={{ fontSize: '28px' }}>Notifications</h1>
        </header>

        <section style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Push Notifications</p>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <ToggleRow 
              title="New Messages" 
              subtitle="Get notified when you receive a DM or group message" 
              value={prefs.pushMessages} 
              onChange={() => toggle('pushMessages')} 
            />
            <ToggleRow 
              title="Nomad Matches" 
              subtitle="Get notified when someone matches with you" 
              value={prefs.pushMatches} 
              onChange={() => toggle('pushMatches')} 
            />
            <ToggleRow 
              title="Trip Updates" 
              subtitle="Alerts for itinerary changes and safety check-ins" 
              value={prefs.pushTrips} 
              onChange={() => toggle('pushTrips')} 
            />
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Email Reports</p>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <ToggleRow 
              title="Weekly Travel Digest" 
              subtitle="A summary of your journeys and top destinations" 
              value={prefs.emailWeekly} 
              onChange={() => toggle('emailWeekly')} 
            />
            <ToggleRow 
              title="Marketing & Offers" 
              subtitle="Exclusive deals from certified agencies" 
              value={prefs.emailMarketing} 
              onChange={() => toggle('emailMarketing')} 
            />
          </div>
        </section>

        <button 
          className="premium-btn" 
          style={{ width: '100%' }}
          onClick={() => navigate('/settings')}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
