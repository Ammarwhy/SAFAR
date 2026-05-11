import { create } from 'zustand';

export type Toast = {
  id: string;
  senderName: string;
  content: string;
  avatarUrl?: string;
};

type NotificationState = {
  toasts: Toast[];
  addToast: (senderName: string, content: string, avatarUrl?: string) => void;
  removeToast: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  addToast: (senderName, content, avatarUrl) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, senderName, content, avatarUrl };
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 5000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));
