import { useState, useEffect } from 'react';
import { useProfileStore } from '../stores/profileStore';
import { computeMatchScore } from '../lib/matchEngine';
import type { TravelerPreferences } from '../lib/matchEngine';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

const MatchPage = () => {
  const { loadCurrentProfile, travelerProfile, loadAllTravelersWithDetails, loading, existingMatches, loadExistingMatches } = useProfileStore();
  const { user } = useAuthStore();
  const [matches, setMatches] = useState<any[]>([]);
  const navigate = useNavigate();

  const init = async () => {
    await loadCurrentProfile();
    await loadExistingMatches();
    const others = await loadAllTravelersWithDetails();
    
    // Get fresh state after awaits
    const state = useProfileStore.getState();
    const currentTraveler = state.travelerProfile;
    const currentMatches = state.existingMatches;

    const userPrefs: TravelerPreferences = {
      personaDNA: currentTraveler?.persona_dna || { heritage: 0.5, culinary: 0.5, urban: 0.5, nature: 0.5, adventure: 0.5, relaxation: 0.5 },
      travelStyle: currentTraveler?.travel_style || 'Adventure',
      travelPace: currentTraveler?.travel_pace || 'Moderate',
      interestTags: currentTraveler?.interest_tags || []
    };

    // Filter out people who are already matched
    const matchedUserIds = currentMatches.map((m: any) => m.requester_id === user?.id ? m.target_id : m.requester_id);
    
    const filteredOthers = others.filter(other => !matchedUserIds.includes(other.id));

    const scored = filteredOthers.map(other => {
      // Create a more dynamic DNA if missing to avoid static 80% everywhere
      const otherDNA = other.traveler?.persona_dna || { 
        heritage: 0.4 + Math.random() * 0.2, 
        culinary: 0.4 + Math.random() * 0.2,
        urban: 0.4 + Math.random() * 0.2,
        nature: 0.4 + Math.random() * 0.2,
        adventure: 0.4 + Math.random() * 0.2,
        relaxation: 0.4 + Math.random() * 0.2
      };

      const otherPrefs: TravelerPreferences = {
        personaDNA: otherDNA,
        travelStyle: other.traveler?.travel_style || 'Adventure',
        travelPace: other.traveler?.travel_pace || 'Moderate',
        interestTags: other.traveler?.interest_tags || []
      };
      
      return {
        ...other,
        matchScore: computeMatchScore(userPrefs, otherPrefs)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setMatches(scored);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMatch = async (targetId: string, score: number) => {
    if (!user) return;
    try {
      const { error } = await supabase.from('matches').insert({
        requester_id: user.id,
        target_id: targetId,
        match_percentage: score,
        status: 'Connected' // Setting to connected for demo parity
      });
      if (error) throw error;
      
      // Update local state to show "Already Matched"
      setMatches(prev => prev.map(m => m.id === targetId ? { ...m, isMatched: true } : m));
      
      // Optionally reload matches to hide them or show tick
      setTimeout(() => {
        init();
      }, 1500);
    } catch (e) {
      console.error('Match failed', e);
    }
  };

  if (loading && matches.length === 0) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body">Calibrating matching engine...</p>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade">
      <header>
        <h1 className="h1">Nomad Match</h1>
        <p className="body">Find your perfect travel partners based on Travel DNA. We filter out those you've already connected with.</p>
      </header>

      <div className="grid-layout">
        {matches.map((match) => (
          <div key={match.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '35px', 
                backgroundColor: 'var(--brand)', 
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: 'var(--shadow-md)'
              }}>
                <img src={match.profile_photo_url || `https://i.pravatar.cc/200?u=${match.id}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ 
                position: 'absolute', bottom: '-10px', right: '-10px', 
                backgroundColor: match.isMatched ? '#16a34a' : 'var(--brand)', 
                color: '#fff', 
                padding: '6px 12px', borderRadius: '12px', 
                fontSize: '14px', fontWeight: 900,
                boxShadow: 'var(--shadow-sm)',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                {match.isMatched ? <span className="material-icons" style={{ fontSize: '14px' }}>check</span> : null}
                {match.matchScore}%
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{match.name}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
              {match.traveler.travel_style || 'Adventure'} • {match.traveler.travel_pace || 'Moderate'}
            </p>
            
            <p className="body" style={{ fontSize: '13px', marginBottom: '24px', height: '40px', overflow: 'hidden' }}>
              {match.bio || 'Exploring the hidden gems of the world. Looking for like-minded travelers.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '24px' }}>
              {(match.traveler.interest_tags || ['Heritage', 'Culture']).slice(0, 3).map((tag: string) => (
                <span key={tag} style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', backgroundColor: 'var(--bg)', borderRadius: '6px', color: 'var(--brand)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 'auto', width: '100%', display: 'flex', gap: '12px' }}>
              {match.isMatched ? (
                 <button className="premium-btn" style={{ flex: 1, padding: '12px', backgroundColor: '#16a34a' }}>
                    Already Matched
                 </button>
              ) : (
                <button className="premium-btn" style={{ flex: 1, padding: '12px' }} onClick={() => handleMatch(match.id, match.matchScore)}>
                  Match Now
                </button>
              )}
              <button 
                style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid var(--border)', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => navigate('/chat')}
              >
                <span className="material-icons" style={{ fontSize: '20px', color: 'var(--text-muted)' }}>forum</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {matches.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
          <span className="material-icons" style={{ fontSize: '64px', marginBottom: '16px' }}>person_search</span>
          <p className="h2">No new travelers found</p>
          <p className="body">You've matched with everyone in your area or there are no new explorers yet.</p>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
