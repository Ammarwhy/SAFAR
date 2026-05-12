import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';

const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tripDetails, loadTripById, loading, isWishlisted, addToWishlist, removeFromWishlist, loadWishlist, joinTrip } = useTripStore();
  const { user } = useAuthStore();
  const { contactUser } = useChatStore();

  const [isAnimating, setIsAnimating] = useState(false);
  const details = id ? tripDetails[id] : null;

  useEffect(() => {
    loadWishlist();
    if (id) {
      loadTripById(id);
    }
  }, [id, loadTripById, loadWishlist]);

  if (loading && !details) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body">Opening dossier...</p>
      </div>
    );
  }

  if (!details || !details.trip) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <h2 className="h2">Expedition not found</h2>
        <button onClick={() => navigate('/')} className="premium-btn">Return to Base</button>
      </div>
    );
  }

  const { trip, participants, stops } = details;
  const liked = isWishlisted(trip.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (liked) removeFromWishlist(trip.id);
    else addToWishlist(trip.id);
  };

  const isParticipant = user && participants.some(p => p.user_id === user.id);
  const isOwner = !!(user && trip.owner_id === user.id);

  const handleJoin = async () => {
    if (id) {
      await joinTrip(id);
    }
  };

  const handleContactLead = async () => {
    if (trip.owner_id && !isOwner) {
      await contactUser(trip.owner_id);
      navigate('/chat');
    }
  };

  return (
    <div className="page-container animate-fade">
      <style>{`
        .heart-active {
          animation: heartPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
      `}</style>
      <header style={{ marginBottom: '40px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'none', border: 'none', cursor: 'pointer', 
            marginBottom: '24px', color: 'var(--text-muted)', fontWeight: 700,
            padding: 0
          }}
        >
          <span className="material-icons">arrow_back</span>
          Back to Explore
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--brand)', backgroundColor: 'rgba(55, 27, 23, 0.08)', padding: '6px 14px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {trip.status}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#16a34a', backgroundColor: 'rgba(22, 163, 74, 0.08)', padding: '6px 14px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Expedition Verified
              </span>
            </div>
            <h1 className="h1" style={{ fontSize: '56px', marginBottom: '12px', lineHeight: 1 }}>{trip.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', color: 'var(--text-muted)', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>location_on</span>
                {trip.destination}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>calendar_today</span>
                {new Date(trip.start_date!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          <button 
            onClick={toggleWishlist}
            style={{ 
              background: '#fff', 
              border: '1px solid var(--border)', 
              width: '56px', height: '56px', 
              borderRadius: '16px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <span 
              className={`material-icons ${isAnimating ? 'heart-active' : ''}`} 
              style={{ 
                color: liked ? '#ef4444' : 'var(--text-muted)',
                fontSize: '28px',
                transition: 'color 0.2s'
              }}
            >
              {liked ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
        {/* Left Column: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ height: '500px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img 
              src={trip.hero_image_url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <section>
            <h2 className="h2" style={{ marginBottom: '32px', fontSize: '28px' }}>Itinerary Overview</h2>
            {stops.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {stops.map((stop, idx) => (
                  <div key={stop.id} style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        backgroundColor: 'var(--brand)', color: '#fff', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: '16px', fontWeight: 900, zIndex: 1,
                        boxShadow: '0 4px 10px rgba(55, 27, 23, 0.2)'
                      }}>
                        {idx + 1}
                      </div>
                      {idx < stops.length - 1 && <div style={{ flex: 1, width: '2px', backgroundColor: 'var(--border)', margin: '8px 0' }}></div>}
                    </div>
                    <div style={{ paddingBottom: '48px', flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--brand)' }}>{stop.name}</h3>
                      <p className="body" style={{ fontSize: '16px', lineHeight: 1.6, opacity: 0.8 }}>
                        {stop.description || 'Delve into the heart of the region, exploring hidden trails and local traditions that define this majestic landscape.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-card)', borderRadius: '24px', border: '1px dashed var(--border)', textAlign: 'center' }}>
                <span className="material-icons" style={{ fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px' }}>auto_stories</span>
                <p className="body" style={{ fontWeight: 600 }}>The grand itinerary is being curated by your expedition lead. Check back soon for the full day-by-day reveal.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div style={{ position: 'sticky', top: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="card" style={{ padding: '40px', borderRadius: '32px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h3 className="h2" style={{ fontSize: '24px', marginBottom: '12px' }}>Secure Your Spot</h3>
            <p className="body" style={{ fontSize: '15px', marginBottom: '32px', opacity: 0.7 }}>Join a group of elite nomads on this curated expedition.</p>
            
            <div style={{ padding: '24px', backgroundColor: 'var(--bg)', borderRadius: '20px', marginBottom: '32px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>All-Inclusive Price</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--brand)' }}>PKR {trip.distance_km ? (trip.distance_km * 100).toLocaleString() : '185,000'}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>/ person</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {isParticipant ? (
                <div style={{ padding: '20px', backgroundColor: 'rgba(22, 163, 74, 0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid #16a34a' }}>
                  <p style={{ color: '#16a34a', fontWeight: 800, fontSize: '15px' }}>
                    <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '8px' }}>check_circle</span>
                    You're on the team!
                  </p>
                </div>
              ) : (
                <button 
                  className="premium-btn" 
                  style={{ width: '100%', padding: '20px', fontSize: '16px', borderRadius: '16px' }}
                  onClick={handleJoin}
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join Expedition'}
                </button>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <button 
                  onClick={() => navigate(`/trip/${trip.id}/expenses`)}
                  style={{ background: '#fff', border: '1px solid var(--border)', padding: '14px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <span className="material-icons" style={{ fontSize: '18px' }}>account_balance_wallet</span>
                  Ledger
                </button>
                <button 
                  onClick={() => navigate(`/trip/${trip.id}/safety`)}
                  style={{ background: '#fff', border: '1px solid var(--border)', padding: '14px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <span className="material-icons" style={{ fontSize: '18px' }}>security</span>
                  Safety
                </button>
              </div>
              
              <button 
                onClick={handleContactLead}
                disabled={isOwner}
                style={{ 
                  background: 'var(--bg)', 
                  border: 'none', 
                  padding: '16px', 
                  borderRadius: '14px', 
                  fontWeight: 800, 
                  cursor: isOwner ? 'default' : 'pointer', 
                  fontSize: '13px', 
                  color: 'var(--brand)', 
                  marginTop: '8px',
                  opacity: isOwner ? 0.6 : 1
                }}
              >
                {isOwner ? 'You are the Expedition Lead' : 'Contact Expedition Lead'}
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: '32px', borderRadius: '32px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="h2" style={{ fontSize: '18px' }}>Nomads Joining</h3>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand)' }}>{participants.length} Active</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {participants.map(p => (
                <div key={p.user_id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px', borderRadius: '12px', transition: 'background 0.2s', cursor: 'pointer' }}>
                  <img src={p.profile_photo_url || `https://i.pravatar.cc/100?u=${p.user_id}`} alt="" style={{ width: '44px', height: '44px', borderRadius: '14px', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '14px' }}>{p.name || 'Nomad'}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Verified Traveler</p>
                  </div>
                </div>
              ))}
              {participants.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', opacity: 0.6 }}>
                  <span className="material-icons" style={{ fontSize: '32px', marginBottom: '8px' }}>group_add</span>
                  <p style={{ fontSize: '13px', fontWeight: 700 }}>Be the first to join this journey!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
