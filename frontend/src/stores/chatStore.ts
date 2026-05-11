import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from './notificationStore';

export type MatchRoom = {
  id: string; // match row id or vibe room id
  other_id: string;
  other_name?: string | null;
  other_avatar?: string | null;
  match_percentage?: number | null;
  status?: string | null;
  isGroup?: boolean;
};

export type Message = {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  sent_at: string;
  sender_name?: string;
  sender_avatar?: string;
  is_read?: boolean;
};

type ChatState = {
  rooms: MatchRoom[];
  vibeRooms: MatchRoom[];
  messages: Message[];
  roomProfiles: Record<string, any>; // user_id -> profile
  unreadCounts: Record<string, number>;
  lastMessageAt: Record<string, string>;
  loading: boolean;
  error?: string | null;
  socket: Socket | null;
  loadMatchesForCurrentUser: () => Promise<void>;
  loadMatchesForUser: (id: string) => Promise<void>;
  loadMessageHistory: (roomId: string, isGroup?: boolean) => Promise<void>;
  loadRoomProfiles: (roomId: string, isGroup: boolean) => Promise<void>;
  sendMessage: (roomId: string, content: string, isGroup?: boolean) => void;
  markAsRead: (roomId: string) => Promise<void>;
  initSocket: () => void;
  joinRoom: (roomId: string) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: [],
  vibeRooms: [],
  messages: [],
  roomProfiles: {},
  unreadCounts: {},
  lastMessageAt: {},
  loading: false,
  error: null,
  socket: null,

  initSocket: () => {
    if (get().socket) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');
    
    socket.on('receive_message', (data: any) => {
      const msg: Message = {
        id: data.id || Math.random().toString(36).substr(2, 9),
        room_id: data.roomId || '',
        sender_id: data.senderId || '',
        content: data.content || '',
        sent_at: data.sent_at || new Date().toISOString()
      };
      
      const { user } = useAuthStore.getState();
      // const isActive = document.visibilityState === 'visible';
      
      set((state) => {
        const isSelf = msg.sender_id === user?.id;
        const newUnread = { ...state.unreadCounts };
        
        // If message is from someone else, increment unread count for that room
        if (!isSelf) {
          newUnread[msg.room_id] = (newUnread[msg.room_id] || 0) + 1;
          
          // Trigger Global Toast
          const senderProf = state.roomProfiles[msg.sender_id];
          const senderName = senderProf?.name || 'Nomad';
          useNotificationStore.getState().addToast(senderName, msg.content, senderProf?.profile_photo_url);
        }

        return {
          messages: [...state.messages, msg],
          unreadCounts: newUnread,
          lastMessageAt: {
            ...state.lastMessageAt,
            [msg.room_id]: msg.sent_at
          }
        };
      });
    });

    set({ socket });
  },

  joinRoom: (roomId: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('join_room', roomId);
    }
  },

  sendMessage: (roomId: string, content: string, isGroup: boolean = false) => {
    const socket = get().socket;
    const auth = useAuthStore.getState();
    const user = auth.user;
    if (socket && user) {
      socket.emit('send_message', {
        roomId,
        senderId: user.id,
        content,
        isGroup
      });
    }
  },

  markAsRead: async (roomId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .or(`room_id.eq.${roomId},match_id.eq.${roomId}`)
        .eq('is_read', false);

      set((state) => {
        const newUnread = { ...state.unreadCounts };
        delete newUnread[roomId];
        return { unreadCounts: newUnread };
      });
    } catch (e) {
      console.error('Failed to mark as read', e);
    }
  },

  loadMessageHistory: async (roomId: string, isGroup: boolean = false) => {
    set({ loading: true });
    try {
      let query = supabase.from('messages').select('*');
      
      if (isGroup) {
        query = query.eq('room_id', roomId);
      } else {
        query = query.eq('match_id', roomId);
      }

      const { data, error } = await query.order('sent_at', { ascending: true });

      if (error) throw error;
      set({ messages: data || [], loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  loadMatchesForCurrentUser: async () => {
    const auth = useAuthStore.getState();
    const user = auth.user;
    if (!user) return;
    await get().loadMatchesForUser(user.id);
  },

  loadMatchesForUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // 1. Fetch Personal Matches
      const { data: matches, error: mErr } = await supabase
        .from('matches')
        .select('*')
        .or(`requester_id.eq.${id},target_id.eq.${id}`)
        .eq('status', 'Connected');

      if (mErr) throw mErr;

      const otherIds = (matches ?? []).map((m: any) => (m.requester_id === id ? m.target_id : m.requester_id));
      const uniqueIds = Array.from(new Set(otherIds));

      let profilesMap: Record<string, any> = {};
      if (uniqueIds.length > 0) {
        const { data: profiles } = await supabase.from('profiles').select('id, name, profile_photo_url').in('id', uniqueIds);
        profilesMap = (profiles ?? []).reduce((acc: any, p: any) => ({ ...acc, [p.id]: p }), {});
      }

      const rooms: MatchRoom[] = [];
      const seenIds = new Set<string>();

      (matches ?? []).forEach((m: any) => {
        const other = m.requester_id === id ? m.target_id : m.requester_id;
        if (!seenIds.has(other)) {
          seenIds.add(other);
          const prof = profilesMap[other] ?? {};
          rooms.push({
            id: m.id,
            other_id: other,
            other_name: prof.name ?? 'Unknown Nomad',
            other_avatar: prof.profile_photo_url ?? null,
            match_percentage: m.match_percentage ?? null,
            status: m.status ?? null,
            isGroup: false
          } as MatchRoom);
        }
      });

      // 2. Fetch Vibe Rooms (Expedition Group Chats)
      const { data: tripJoins } = await supabase
        .from('trip_participants')
        .select('trip_id, trips(id, title, destination)')
        .eq('user_id', id);

      const tripIds = (tripJoins ?? []).map((tj: any) => tj.trip_id);
      let vibeR: MatchRoom[] = [];

      if (tripIds.length > 0) {
        const { data: vibeRoomsData } = await supabase
          .from('vibe_rooms')
          .select('id, trip_id, trips(title)')
          .in('trip_id', tripIds);

        vibeR = (vibeRoomsData ?? []).map((vr: any) => ({
          id: vr.id,
          other_id: vr.trip_id,
          other_name: vr.trips?.title || 'Expedition Group',
          other_avatar: null,
          isGroup: true
        }));
      }

      const { data: allMsgs } = await supabase
        .from('messages')
        .select('room_id, match_id, sent_at, is_read, sender_id')
        .or(`room_id.in.(${vibeR.map(v => v.id).join(',') || '00000000-0000-0000-0000-000000000000'}),match_id.in.(${rooms.map(r => r.id).join(',') || '00000000-0000-0000-0000-000000000000'})`);

      const unread: Record<string, number> = {};
      const lastAt: Record<string, string> = {};

      (allMsgs ?? []).forEach(m => {
        const rid = m.room_id || m.match_id;
        if (!rid) return;

        // Update latest timestamp
        if (!lastAt[rid] || m.sent_at > lastAt[rid]) {
          lastAt[rid] = m.sent_at;
        }

        // Increment unread if not from me and is_read is false
        if (!m.is_read && m.sender_id !== id) {
          unread[rid] = (unread[rid] || 0) + 1;
        }
      });

      set({ 
        rooms, 
        vibeRooms: vibeR, 
        roomProfiles: profilesMap, 
        unreadCounts: unread,
        lastMessageAt: lastAt,
        loading: false 
      });
    } catch (e: any) {
      set({ loading: false, error: e?.message || String(e) });
    }
  },

  loadRoomProfiles: async (roomId: string, isGroup: boolean) => {
    if (!isGroup) return; // For DMs, they are already loaded in rooms
    
    try {
      // 1. Find trip_id from vibe_rooms
      const { data: vr } = await supabase.from('vibe_rooms').select('trip_id').eq('id', roomId).single();
      if (!vr) return;

      // 2. Fetch all participants
      const { data: participants } = await supabase
        .from('trip_participants')
        .select('user_id, profiles(id, name, profile_photo_url)')
        .eq('trip_id', vr.trip_id);

      if (participants) {
        const newProfiles = (participants as any[]).reduce((acc: any, p: any) => ({
          ...acc,
          [p.user_id]: p.profiles
        }), {});
        
        set(state => ({
          roomProfiles: { ...state.roomProfiles, ...newProfiles }
        }));
      }
    } catch (e) {
      console.error('Failed to load room profiles', e);
    }
  }
}));

export default useChatStore;
