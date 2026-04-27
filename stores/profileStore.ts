import { create } from 'zustand';

type ProfileState = {
  name: string;
  bio: string;
  travelStyles: string[];
  languages: string[];
  setProfile: (data: Partial<Omit<ProfileState, 'setProfile'>>) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  name: 'Elias Thorne',
  bio: 'Curator & Route Collector — chasing mountain dawns, heritage trails, and slow mornings.',
  travelStyles: ['Heritage', 'Mountain', 'Slow Travel'],
  languages: ['English', 'Urdu'],
  setProfile: (data) => set((state) => ({ ...state, ...data })),
}));
