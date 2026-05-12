import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../stores/profileStore';
import { supabase } from '../lib/supabase';

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loadCurrentProfile } = useProfileStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '' // Placeholder as it's not in schema yet
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        phone: ''
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          bio: formData.bio
        })
        .eq('id', profile.id);

      if (error) throw error;

      await loadCurrentProfile();
      setMessage({ type: 'success', text: 'Information updated successfully!' });
    } catch (e: any) {
      setMessage({ type: 'error', text: e.message || 'Failed to update information' });
    } finally {
      setSaving(false);
    }
  };

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
          <h1 className="h1" style={{ fontSize: '28px' }}>Personal Information</h1>
        </header>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {message && (
            <div style={{ 
              padding: '12px 16px', 
              borderRadius: '12px', 
              backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
              color: message.type === 'success' ? '#166534' : '#b91c1c',
              fontSize: '14px',
              fontWeight: 600
            }}>
              {message.text}
            </div>
          )}

          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Email cannot be changed directly.</p>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+92 300 1234567"
            />
          </div>

          <div className="input-group">
            <label>Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your travel style..."
              rows={4}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px solid var(--border)', 
                backgroundColor: 'var(--bg)', 
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="premium-btn" 
            disabled={saving}
            style={{ marginTop: '12px' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
