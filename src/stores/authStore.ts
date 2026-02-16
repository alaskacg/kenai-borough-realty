import { create } from 'zustand';
import type { Profile } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'buyer' | 'seller') => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ user: data.user });
    await get().fetchProfile();
  },

  signUp: async (email: string, password: string, fullName: string, role: 'buyer' | 'seller') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });
    if (error) throw error;
    
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        role,
        email_verified: false,
        phone_verified: false,
      });
    }
    
    set({ user: data.user });
    await get().fetchProfile();
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },

  fetchProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      set({ user, profile });
    }
    set({ loading: false });
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const { user } = get();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    set({ profile: data });
  },
}));

supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    useAuthStore.getState().fetchProfile();
  } else {
    useAuthStore.setState({ loading: false });
  }
});

supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    useAuthStore.getState().fetchProfile();
  } else {
    useAuthStore.setState({ user: null, profile: null });
  }
});
