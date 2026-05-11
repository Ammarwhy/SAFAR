import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, userData?: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        set({ isLoading: false, error: error.message });
        return { success: false, error: error.message };
      }
      if (data.session && data.user) {
        set({ session: data.session, user: data.user, isAuthenticated: true, isLoading: false, error: null });
        return { success: true };
      }
      set({ isLoading: false, error: 'No session returned' });
      return { success: false, error: 'No session returned' };
    } catch (err: any) {
      const errorMsg = err?.message || 'Login failed';
      set({ isLoading: false, error: errorMsg });
      return { success: false, error: errorMsg };
    }
  },

  register: async (email: string, password: string, userData?: Record<string, any>) => {
    set({ isLoading: true, error: null });
    try {
      const normalizedEmail = (email || '').trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
        const msg = 'Please provide a valid email address.';
        set({ isLoading: false, error: msg });
        return { success: false, error: msg };
      }
      if (!password || password.length < 8) {
        const msg = 'Password must be at least 8 characters.';
        set({ isLoading: false, error: msg });
        return { success: false, error: msg };
      }

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: { data: userData || {} },
      });

      if (error) {
        const msg = error?.message || 'Sign up failed';
        set({ isLoading: false, error: msg });
        return { success: false, error: msg };
      }

      if (data.user) {
        const profilePayload: any = {
          id: data.user.id,
          email: data.user.email,
          name: (userData && (userData.name || userData.agencyName)) || data.user.email,
          profile_photo_url: null,
        };

        const { error: profileInsertError } = await supabase.from('profiles').insert(profilePayload);
        if (profileInsertError) {
          console.warn('Warning: failed to insert profile row:', profileInsertError.message);
        }

        set({ isLoading: false, error: null });
        return { success: true };
      }

      set({ isLoading: false, error: 'User creation failed' });
      return { success: false, error: 'User creation failed' };
    } catch (err: any) {
      const errorMsg = err?.message || 'Registration failed';
      set({ isLoading: false, error: errorMsg });
      return { success: false, error: errorMsg };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({ session: null, user: null, isAuthenticated: false, isLoading: false, error: null });
    } catch (err: any) {
      console.error('Logout error:', err);
      set({ isLoading: false });
    }
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        set({ isLoading: false, error: error.message, isAuthenticated: false });
        return;
      }
      if (data.session?.user) {
        set({ session: data.session, user: data.session.user, isAuthenticated: true, isLoading: false, error: null });
      } else {
        set({ session: null, user: null, isAuthenticated: false, isLoading: false, error: null });
      }
    } catch (err: any) {
      console.error('Session check error:', err);
      set({ isAuthenticated: false, isLoading: false, error: err?.message || 'Session check failed' });
    }
  },

  clearError: () => set({ error: null }),
}));
