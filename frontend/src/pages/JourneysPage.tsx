import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';

const JourneysPage = () => {
  const { trips, wishlist, loading, loadTripsForCurrentUser, loadWishlist } = useTripStore();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Wishlist'>('Upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    loadTripsForCurrentUser();
    loadWishlist();
  }, [loadTripsForCurrentUser, loadWishlist]);

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'Upcoming') return trip.status !== 'Completed';
    if (activeTab === 'Past') return trip.status === 'Completed';
    return false;
  });

  const displayList = activeTab === 'Wishlist' ? wishlist.map(w => ({
    id: w.id,
    title: w.title,
    hero_image_url: w.image,
    destination: w.subtitle,
    status: 'Wishlisted'
  })) : filteredTrips;

  if (loading && trips.length === 0) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading your adventures...</p>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade">
      <header style={{ marginBottom: '32px' }}>
        <h1 className="h1">My Journeys</h1>
        <p className="body">Manage your upcoming, past, and wishlisted expeditions.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
        {(['Upcoming', 'Past', 'Wishlist'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: 800,
              color: activeTab === tab ? 'var(--brand)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '2px solid var(--brand)' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab} {tab === 'Wishlist' ? `(${wishlist.length})` : ''}
          </button>
        ))}
      </div>

      <div className="grid-layout">
        {displayList.map((trip: any) => (
          <div key={trip.id} className="card" onClick={() => navigate(`/trip/${trip.id}`)} style={{ cursor: 'pointer' }}>
            <div style={{ height: '200px', position: 'relative' }}>
              <img src={trip.hero_image_url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ 
                position: 'absolute', 
                bottom: '12px', 
                left: '12px', 
                backgroundColor: activeTab === 'Wishlist' ? 'var(--brand-light)' : 'var(--brand)', 
                color: '#fff', 
                padding: '4px 10px', 
                borderRadius: '6px', 
                fontSize: '11px', 
                fontWeight: 800 
              }}>
                {trip.status || 'Planned'}
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{trip.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
                <span className="material-icons" style={{ fontSize: '16px' }}>location_on</span>
                {trip.destination}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {activeTab !== 'Wishlist' && (
                    <><strong>Start:</strong> {trip.start_date || 'TBD'}</>
                  )}
                </div>
                <button 
                  className="premium-btn" 
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/trip/${trip.id}`); }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {displayList.length === 0 && (
          <div className="card" style={{ padding: '48px', textAlign: 'center', gridColumn: '1 / -1', opacity: 0.6 }}>
            <span className="material-icons" style={{ fontSize: '48px', marginBottom: '16px' }}>{activeTab === 'Wishlist' ? 'favorite_border' : 'map'}</span>
            <h3 className="h2">No journeys in {activeTab}</h3>
            <p className="body">
              {activeTab === 'Wishlist' ? 'Start liking expeditions to see them here.' : 'Your passport is waiting for its first stamp.'}
            </p>
            <button className="premium-btn" style={{ margin: '24px auto 0' }} onClick={() => navigate('/')}>Explore Expeditions</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneysPage;
