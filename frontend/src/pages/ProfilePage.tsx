import { useEffect } from 'react';
import { useProfileStore } from '../stores/profileStore';
import { useAuthStore } from '../stores/authStore';

const ProfilePage = () => {
  const { profile, travelerProfile, loading, loadCurrentProfile } = useProfileStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    loadCurrentProfile();
  }, [loadCurrentProfile]);

  if (loading && !profile) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Fetching your profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade">
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h1">Profile</h1>
        <button 
          onClick={logout}
          style={{ 
            padding: '8px 16px', 
            borderRadius: 'var(--radius-sm)', 
            backgroundColor: '#fff', 
            border: '1px solid var(--border)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--brand)'
          }}
        >
          Sign Out
        </button>
        </header>

      {/* Main Profile Card */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '20px', 
        marginBottom: '20px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '24px', 
            backgroundColor: 'var(--brand)', 
            overflow: 'hidden'
          }}>
            <img 
              src={profile?.profile_photo_url || `https://i.pravatar.cc/150?u=${profile?.id}`} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ paddingTop: '4px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{profile?.name || 'Traveler'}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{profile?.email}</p>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: 800, 
              backgroundColor: 'var(--bg)', 
              color: 'var(--brand)', 
              padding: '4px 8px', 
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}>
              {profile?.membership_tier || 'Member'}
            </span>
          </div>
        </div>
        
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
          {profile?.bio || 'Exploring the world one peak at a time.'}
        </p>

        <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{travelerProfile?.destinations_visited || 0}</p>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Visited</p>
          </div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{profile?.followers_count || 0}</p>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Followers</p>
          </div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{travelerProfile?.expeditions_count || 0}</p>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Expeditions</p>
          </div>
        </div>
      </div>

      {/* Travel DNA */}
      <h3 className="section-title" style={{ paddingLeft: '4px', marginBottom: '12px' }}>Travel DNA</h3>
      <div style={{ 
        backgroundColor: 'var(--brand)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '20px', 
        color: '#fff',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>Travel Style</p>
            <p style={{ fontSize: '15px', fontWeight: 700 }}>{travelerProfile?.travel_style || 'Luxury Adventure'}</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>Travel Pace</p>
            <p style={{ fontSize: '15px', fontWeight: 700 }}>{travelerProfile?.travel_pace || 'Moderate'}</p>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Interests</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(travelerProfile?.interest_tags || ['Heritage', 'Culture', 'Photography']).map(tag => (
                <span key={tag} style={{ 
                  fontSize: '11px', 
                  backgroundColor: 'rgba(255,255,255,0.15)', 
                  padding: '4px 10px', 
                  borderRadius: '8px',
                  fontWeight: 600
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ 
          position: 'absolute', top: '-20px', right: '-20px', 
          width: '100px', height: '100px', 
          borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)'
        }}></div>
      </div>
    </div>
  );
};

export default ProfilePage;
