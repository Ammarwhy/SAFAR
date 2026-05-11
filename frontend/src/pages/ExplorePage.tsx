import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';
import { useProfileStore } from '../stores/profileStore';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

const ExplorePage = () => {
  const { featuredTrip, exploreJourneys, loading: tripsLoading, loadExploreContent, isWishlisted, addToWishlist, removeFromWishlist, loadWishlist } = useTripStore();
  const { nearbyTravelers, loadNearbyTravelers, loadExistingMatches, existingMatches } = useProfileStore();
  const { user } = useAuthStore();
  const [agencies, setAgencies] = useState<any[]>([]);
  const [animatingTripId, setAnimatingTripId] = useState<string | null>(null);

  const toggleWishlist = (tripId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatingTripId(tripId);
    setTimeout(() => setAnimatingTripId(null), 300);
    
    const isLiked = isWishlisted(tripId);
    if (isLiked) removeFromWishlist(tripId);
    else addToWishlist(tripId);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loadExploreContent();
    loadNearbyTravelers();
    loadExistingMatches();
    loadWishlist();
    
    const fetchAgencies = async () => {
      const { data } = await supabase.from('agencies').select('*').limit(3);
      setAgencies(data || []);
    };
    fetchAgencies();
  }, []);

  const handleTripClick = (id: string) => {
    navigate(`/trip/${id}`);
  };

  // Filter out travelers who are already matched
  const matchedUserIds = existingMatches.map(m => m.requester_id === user?.id ? m.target_id : m.requester_id);
  const filteredTravelers = nearbyTravelers.filter(t => !matchedUserIds.includes(t.id));

  if (tripsLoading && !featuredTrip && exploreJourneys.length === 0) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-pulse" style={{ width: '48px', height: '48px', backgroundColor: 'var(--brand)', borderRadius: '50%', margin: '0 auto 16px' }}></div>
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Mapping out expeditions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <div>
          <h1 className="h1" style={{ marginBottom: '8px' }}>Explore Destinations</h1>
          <p className="body" style={{ fontSize: '18px' }}>Discover expeditions and connect with global nomads.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="premium-btn" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={() => navigate('/match')}>
            Find a Travel Partner
          </button>
        </div>
      </header>

      {/* Featured Section */}
      {featuredTrip && (
        <section style={{ marginBottom: '64px' }}>
          <div className="card" style={{ 
            height: '400px', 
            position: 'relative', 
            border: 'none', 
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#000',
            cursor: 'pointer'
          }}
          onClick={() => handleTripClick(featuredTrip.id)}
          >
            <img 
              src={featuredTrip.hero_image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
            />
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px'
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
                Featured Expedition
              </span>
              <h2 className="h1" style={{ color: '#fff', fontSize: '56px', marginBottom: '16px', maxWidth: '600px', lineHeight: 1 }}>
                {featuredTrip.title}
              </h2>
              <p style={{ color: '#fff', opacity: 0.9, fontSize: '20px', maxWidth: '500px', marginBottom: '32px' }}>
                {featuredTrip.destination || 'A journey through the hidden gems of the Karakoram range.'}
              </p>
              <button 
                className="premium-btn" 
                style={{ width: 'fit-content', padding: '16px 40px', backgroundColor: '#fff', color: 'var(--brand)' }}
                onClick={(e) => { e.stopPropagation(); handleTripClick(featuredTrip.id); }}
              >
                View Expedition Details
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Certified Agencies */}
      <section style={{ marginBottom: '64px' }}>
        <div className="section-header">
          <h2 className="h2">Certified Agencies</h2>
          <button className="section-link" onClick={() => navigate('/agencies')}>View All</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', padding: '20px 0' }}>
          {agencies.map((agency) => (
            <div key={agency.id} className="card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img src={agency.hero_image_url || 'https://images.unsplash.com/photo-1599305090748-3663b8782914'} alt="" style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '2px' }}>{agency.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <span className="material-icons" style={{ fontSize: '14px', color: '#fbbf24' }}>star</span>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{agency.star_rating}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{agency.specialty || 'Travel Operator'}</p>
              </div>
            </div>
          ))}
          {agencies.length === 0 && (
             [1,2,3].map(i => (
              <div key={i} className="card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', opacity: 0.5 }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg)' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '100px', height: '12px', backgroundColor: 'var(--bg)', borderRadius: '4px', marginBottom: '8px' }}></div>
                  <div style={{ width: '60px', height: '8px', backgroundColor: 'var(--bg)', borderRadius: '4px' }}></div>
                </div>
              </div>
             ))
          )}
        </div>
      </section>

      {/* Nearby Travelers */}
      <section style={{ marginBottom: '64px' }}>
        <div className="section-header">
          <h2 className="h2">Global Nomads Nearby</h2>
          <button className="section-link" onClick={() => navigate('/match')}>View All</button>
        </div>
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', padding: '20px 0', scrollbarWidth: 'none' }}>
          {filteredTravelers.map((traveler) => (
            <div key={traveler.id} className="card" style={{ flex: '0 0 200px', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '30px', backgroundColor: 'var(--bg)', margin: '0 auto 16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img src={traveler.profile_photo_url || `https://i.pravatar.cc/200?u=${traveler.id}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px' }}>{traveler.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>{traveler.travel_style || 'Adventure Seeker'}</p>
              <button className="premium-btn" style={{ width: '100%', padding: '10px', fontSize: '12px' }} onClick={() => navigate('/match')}>Connect</button>
            </div>
          ))}
          {filteredTravelers.length === 0 && (
            <div style={{ padding: '24px', opacity: 0.5 }}>
               <p style={{ fontSize: '13px' }}>No new nomads nearby.</p>
            </div>
          )}
        </div>
      </section>

      {/* Expeditions Grid */}
      <section>
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <h2 className="h2">Upcoming Expeditions</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand)' }}>Sort by: Date</span>
            <span className="material-icons" style={{ fontSize: '18px' }}>filter_list</span>
          </div>
        </div>
        
        <div className="grid-layout">
          {exploreJourneys.map((journey) => (
            <div key={journey.id} className="card" onClick={() => handleTripClick(journey.id)} style={{ cursor: 'pointer' }}>
              <div style={{ height: '220px', position: 'relative' }}>
                <img src={journey.hero_image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Wishlist Heart */}
                <button 
                  onClick={(e) => toggleWishlist(journey.id, e)}
                  style={{ 
                    position: 'absolute', top: '16px', left: '16px', 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    width: '36px', height: '36px', borderRadius: '10px', 
                    border: 'none', cursor: 'pointer', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <span 
                    className={`material-icons ${animatingTripId === journey.id ? 'heart-active' : ''}`} 
                    style={{ 
                      fontSize: '20px', 
                      color: isWishlisted(journey.id) ? '#ef4444' : 'var(--text-muted)',
                      transition: 'color 0.2s'
                    }}
                  >
                    {isWishlisted(journey.id) ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: 'var(--brand)' }}>
                  PKR {journey.distance_km ? (journey.distance_km * 100).toLocaleString() : '185,000'}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--brand-light)', textTransform: 'uppercase', padding: '4px 8px', backgroundColor: 'var(--bg)', borderRadius: '4px' }}>
                    {journey.status || 'Upcoming'}
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{journey.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-icons" style={{ fontSize: '16px' }}>location_on</span>
                    {journey.destination || 'Gilgit-Baltistan'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-icons" style={{ fontSize: '16px' }}>calendar_today</span>
                    {journey.start_date || 'Aug 12'}
                  </div>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', marginLeft: '4px' }}>
                     {[1,2,3].map(i => (
                       <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#ddd', marginLeft: '-8px', overflow: 'hidden' }}>
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                       </div>
                     ))}
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: 'var(--bg)', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>+4</div>
                   </div>
                   <button 
                    className="premium-btn" 
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                    onClick={(e) => { e.stopPropagation(); handleTripClick(journey.id); }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const heartAnimationStyle = `
  .heart-active {
    animation: heartPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes heartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
`;


export default () => (
  <>
    <style>{heartAnimationStyle}</style>
    <ExplorePage />
  </>
);
