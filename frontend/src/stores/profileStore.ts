import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export type Profile = {
  id: string;
  email?: string | null;
  name?: string | null;
  bio?: string | null;
  membership_tier?: string | null;
  profile_photo_url?: string | null;
  followers_count?: number;
  travel_style?: string | null;
};

export type TravelerProfile = {
  user_id: string;
  destinations_visited?: number | null;
  travel_style?: string | null;
  travel_pace?: string | null;
  interest_tags?: string[] | null;
  persona_dna?: any;
  curation_score?: number | null;
  expeditions_count?: number | null;
  countries_count?: number | null;
};

type ProfileState = {
  profile: Profile | null;
  travelerProfile: TravelerProfile | null;
  loading: boolean;
  error?: string | null;
  loadCurrentProfile: () => Promise<void>;
  loadProfileById: (id: string) => Promise<void>;
  loadNearbyTravelers: () => Promise<void>;
  loadAllTravelersWithDetails: () => Promise<Array<Profile & { traveler: TravelerProfile }>>;
  setProfile: (p: Partial<Profile>) => void;
  nearbyTravelers: Profile[];
  followerProfiles: Profile[];
  existingMatches: any[];
  loadExistingMatches: () => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  travelerProfile: null,
  loading: false,
  error: null,
  nearbyTravelers: [],
  followerProfiles: [],
  existingMatches: [],

  setProfile: (p) => set((s) => ({ ...s, profile: s.profile ? { ...s.profile, ...p } as Profile : null })),

  loadExistingMatches: async () => {
    const auth = useAuthStore.getState();
    const userId = auth.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`requester_id.eq.${userId},target_id.eq.${userId}`);

    if (!error) {
      set({ existingMatches: data ?? [] });
    }
  },
  loadAllTravelersWithDetails: async () => {
    set({ loading: true, error: null });
    try {
      const auth = useAuthStore.getState();
      const userId = auth.user?.id;

      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', userId || '');
      
      if (pErr) throw pErr;

      const { data: travelers, error: tErr } = await supabase
        .from('traveler_profiles')
        .select('*')
        .neq('user_id', userId || '');

      if (tErr) throw tErr;

      const result = (profiles ?? []).map(p => {
        const t = (travelers ?? []).find(tr => tr.user_id === p.id);
        return { ...p, traveler: t || { user_id: p.id } };
      });

      set({ loading: false });
      return result;
    } catch (e: any) {
      set({ error: e?.message || String(e), loading: false });
      return [];
    }
  },
  loadCurrentProfile: async () => {
    const auth = useAuthStore.getState();
    const user = auth.user;
    if (!user) return;
    await get().loadProfileById(user.id);
  },

  loadProfileById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { data: p, error: pErr } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
      if (pErr) {
        set({ loading: false, error: pErr.message || String(pErr) });
        return;
      }

      const { data: t, error: tErr } = await supabase.from('traveler_profiles').select('*').eq('user_id', id).maybeSingle();
      if (tErr) {
        console.warn('traveler_profiles load warning:', tErr.message || tErr);
      }

      let followersCount = 0;
      let expeditionsCount = 0;
      let fProfiles: Profile[] = [];
      try {
        const { data: fRows, count: fCount } = await supabase
          .from('followers')
          .select('follower_id, profiles!followers_follower_id_fkey(*)', { count: 'exact' })
          .eq('user_id', id)
          .limit(5);
        
        followersCount = fCount ?? 0;
        fProfiles = (fRows ?? []).map((row: any) => row.profiles).filter(Boolean);

        const { count: eCount } = await supabase
          .from('trip_participants')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', id);
        expeditionsCount = eCount ?? 0;
      } catch (e) {
        console.warn('Stats fetch failed', e);
      }

      const traveler = t ?? { user_id: id, destinations_visited: 0, expeditions_count: expeditionsCount };
      if (traveler) {
        if (typeof traveler.expeditions_count === 'undefined' || traveler.expeditions_count === 0) {
          traveler.expeditions_count = expeditionsCount;
        }
        if (typeof traveler.destinations_visited === 'undefined') {
          traveler.destinations_visited = 0;
        }
      }

      const finalProfile = p ? { ...p, followers_count: followersCount } : null;

      set({ 
        profile: finalProfile, 
        travelerProfile: traveler, 
        followerProfiles: fProfiles,
        loading: false 
      });

      set((s) => ({ profile: s.profile ? { ...s.profile, followers_count: followersCount } : s.profile }));
    } catch (e: any) {
      set({ loading: false, error: e?.message || String(e) });
    }
  },

  loadNearbyTravelers: async () => {
    set({ loading: true, error: null });
    try {
      const auth = useAuthStore.getState();
      const userId = auth.user?.id;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', userId || '')
        .limit(10);

      if (error) throw error;
      set({ nearbyTravelers: data ?? [], loading: false });
    } catch (e: any) {
      set({ error: e?.message || String(e), loading: false });
    }
  },
}));
