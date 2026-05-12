import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    darkMode, setDarkMode, 
    compactView, setCompactView, 
    highContrast, setHighContrast 
  } = useSettingsStore();
  
  const [language, setLanguage] = useState('English');

  const SettingRow = ({ icon, title, subtitle, onClick, showArrow = true }: any) => (
    <div 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        padding: '16px 20px', 
        cursor: 'pointer',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.2s'
      }}
      className="setting-row-hover"
    >
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '12px', 
        backgroundColor: 'var(--bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>{icon}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{title}</p>
        {subtitle && <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      {showArrow && <span className="material-icons" style={{ color: 'var(--text-muted)', fontSize: '20px' }}>chevron_right</span>}
    </div>
  );

  const ToggleRow = ({ icon, title, subtitle, value, onChange }: any) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      padding: '16px 20px', 
      borderBottom: '1px solid var(--border)' 
    }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '12px', 
        backgroundColor: 'var(--bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>{icon}</span>
      </div>
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

  const LanguageRow = ({ name, active, onClick }: any) => (
    <div 
      onClick={onClick}
      style={{ 
        padding: '16px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer'
      }}
    >
       <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="material-icons" style={{ color: 'var(--text-muted)', fontSize: '20px' }}>translate</span>
      </div>
      <p style={{ flex: 1, fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{name}</p>
      {active && <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>check_circle</span>}
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
        <h1 className="h1" style={{ fontSize: '28px' }}>Settings</h1>
      </header>

      <section style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Account</p>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <SettingRow icon="person" title="Personal Information" subtitle="Name, email, phone" />
          <SettingRow icon="payments" title="Payments & Payouts" subtitle="Cards, bank accounts" />
          <SettingRow icon="notifications" title="Notifications" subtitle="Alerts and reminders" />
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Security</p>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <ToggleRow icon="security" title="Two-Factor Auth" subtitle="Extra login security" value={false} onChange={() => {}} />
          <ToggleRow icon="face" title="Face ID" subtitle="Biometric unlock" value={false} onChange={() => {}} />
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Language</p>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <LanguageRow name="English" active={language === 'English'} onClick={() => setLanguage('English')} />
          <LanguageRow name="Urdu" active={language === 'Urdu'} onClick={() => setLanguage('Urdu')} />
          <LanguageRow name="Arabic" active={language === 'Arabic'} onClick={() => setLanguage('Arabic')} />
          <LanguageRow name="French" active={language === 'French'} onClick={() => setLanguage('French')} />
          <LanguageRow name="Deutsch" active={language === 'Deutsch'} onClick={() => setLanguage('Deutsch')} />
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>Display Options</p>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <ToggleRow icon="dark_mode" title="Dark Mode" subtitle="Switch to darker color scheme" value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <ToggleRow icon="view_compact" title="Compact View" subtitle="Reduce spacing between cards" value={compactView} onChange={() => setCompactView(!compactView)} />
          <ToggleRow icon="contrast" title="High Contrast" subtitle="Improve readability" value={highContrast} onChange={() => setHighContrast(!highContrast)} />
        </div>
      </section>
      </div>
      <style>{`
        .setting-row-hover:hover {
          background-color: rgba(0,0,0,0.02);
        }
        .setting-row-hover:last-child, .ToggleRow:last-child {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
