import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';

const SafetyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tripDetails, loadTripById, loading } = useTripStore();
  const [sosActive, setSosActive] = useState(false);

  const details = id ? tripDetails[id] : null;

  useEffect(() => {
    if (id) {
      loadTripById(id);
    }
  }, [id, loadTripById]);

  const triggerSOS = () => {
    setSosActive(true);
    alert('SOS Signal Dispatched to local authorities and emergency contacts.');
  };

  if (loading && !details) return <div className="p-8">Syncing safety protocols...</div>;
  if (!details || !details.trip) return <div className="p-8">Expedition not found</div>;

  return (
    <div className="animate-fade">
      <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', color: 'var(--text-muted)', fontWeight: 700 }}
      >
        <span className="material-icons">arrow_back</span>
        Back to Expedition
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <span className="material-icons" style={{ fontSize: '40px', color: '#b91c1c' }}>security</span>
          </div>
          <h1 className="h1">Safety Command Center</h1>
          <p className="body">Real-time protection for your journey through {details.trip.destination}.</p>
        </header>

        <div className="card" style={{ padding: '40px', border: '2px solid #fee2e2', textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="h2" style={{ color: '#b91c1c', marginBottom: '16px' }}>Emergency SOS</h2>
          <p className="body" style={{ marginBottom: '32px' }}>Only use this in life-threatening situations. Triggering this will notify your emergency contacts and local Safar response teams.</p>
          <button 
            onClick={triggerSOS}
            style={{ 
              width: '200px', height: '200px', borderRadius: '50%', 
              backgroundColor: sosActive ? '#444' : '#b91c1c', 
              color: '#fff', border: 'none', fontSize: '24px', fontWeight: 900, 
              cursor: 'pointer', boxShadow: '0 0 0 15px rgba(185, 28, 28, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            {sosActive ? 'SIGNAL SENT' : 'SOS'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="h2" style={{ fontSize: '18px', marginBottom: '16px' }}>Emergency Contacts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '14px' }}>Sarah Wilson (Wife)</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>+92 333 1234567</p>
                </div>
                <span className="material-icons" style={{ color: 'var(--brand)' }}>phone</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '14px' }}>Local Authorities (Skardu)</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>15 (Emergency)</p>
                </div>
                <span className="material-icons" style={{ color: 'var(--brand)' }}>local_police</span>
              </div>
            </div>
            <button style={{ width: '100%', marginTop: '24px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'none', fontWeight: 700 }}>
              Edit Contacts
            </button>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 className="h2" style={{ fontSize: '18px', marginBottom: '16px' }}>Travel Insurance</h3>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', marginBottom: '4px' }}>Policy Active</p>
              <p style={{ fontWeight: 800, fontSize: '15px' }}>Global Wanderer Plus</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>#EXP-2026-9901</p>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: 1.5 }}>
              Your policy covers emergency medical evacuation, trip cancellation, and lost gear in high-altitude zones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;
