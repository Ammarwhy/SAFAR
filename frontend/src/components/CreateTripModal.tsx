import React, { useState } from 'react';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tripData: any) => void;
  loading?: boolean;
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose, onCreate, loading }) => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination) return;
    onCreate({
      title,
      destination,
      start_date: startDate,
      hero_image_url: imageUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'
    });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '1px solid var(--border)',
          animation: 'slideUp 0.3s'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 className="h2" style={{ fontSize: '24px' }}>Draft New Expedition</h2>
          <button onClick={onClose} className="material-icons" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>close</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="input-group">
            <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--brand)', marginBottom: '8px', display: 'block' }}>Expedition Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Karakoram Quest 2026"
              required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', outline: 'none' }}
            />
          </div>

          <div className="input-group">
            <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--brand)', marginBottom: '8px', display: 'block' }}>Destination</label>
            <input 
              type="text" 
              value={destination} 
              onChange={e => setDestination(e.target.value)} 
              placeholder="e.g. Skardu, Pakistan"
              required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <div className="input-group">
              <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--brand)', marginBottom: '8px', display: 'block' }}>Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', outline: 'none' }}
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ fontWeight: 700, fontSize: '13px', color: 'var(--brand)', marginBottom: '8px', display: 'block' }}>Cover Image URL (Optional)</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              placeholder="https://images.unsplash.com/..."
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="premium-btn" 
            disabled={loading || !title || !destination}
            style={{ width: '100%', padding: '18px', fontSize: '16px', marginTop: '12px' }}
          >
            {loading ? 'Publishing...' : 'Publish Expedition'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CreateTripModal;
