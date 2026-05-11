import { useState, useEffect } from 'react';
import { useTripStore } from '../stores/tripStore';
import { supabase } from '../lib/supabase';

const AgenciesPage = () => {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      const { data } = await supabase.from('agencies').select('*');
      setAgencies(data || []);
      setLoading(false);
    };
    fetchAgencies();
  }, []);

  if (loading) return <div className="p-8">Cataloging global agencies...</div>;

  return (
    <div className="space-y-8 animate-fade">
      <header>
        <h1 className="h1">Certified Agencies</h1>
        <p className="body">Professional operators verified by SAFAR for elite expeditions.</p>
      </header>

      <div className="grid-layout">
        {agencies.map((agency) => (
          <div key={agency.id} className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
              <img 
                src={agency.hero_image_url || 'https://images.unsplash.com/photo-1599305090748-3663b8782914'} 
                alt="" 
                style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }} 
              />
              <div style={{ flex: 1 }}>
                <h3 className="h2" style={{ fontSize: '20px', marginBottom: '4px' }}>{agency.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-icons" style={{ fontSize: '16px', color: '#fbbf24' }}>star</span>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{agency.star_rating}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>({agency.review_count} reviews)</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                   {agency.certification_badges?.map((badge: string) => (
                     <span key={badge} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--brand)', backgroundColor: 'var(--bg)', padding: '4px 8px', borderRadius: '4px' }}>
                       {badge}
                     </span>
                   ))}
                </div>
              </div>
            </div>
            
            <p className="body" style={{ fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              {agency.philosophy || 'Providing sustainable and authentic travel experiences across the region.'}
            </p>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Specialty</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{agency.specialty || 'Mountaineering'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Region</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{agency.region || 'Gilgit-Baltistan'}</span>
              </div>
            </div>

            <button className="premium-btn" style={{ width: '100%' }}>View Expeditions</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenciesPage;
