import { create } from 'zustand';

export type NewTrip = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  createdAt: number;
};

export type WishlistItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  note: string;
};

type TripState = {
  newTrips: NewTrip[];
  wishlist: WishlistItem[];
  addTrip: (trip: Omit<NewTrip, 'id' | 'createdAt'>) => void;
  addToWishlist: (item: Omit<WishlistItem, 'id'>) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

export const useTripStore = create<TripState>((set, get) => ({
  newTrips: [],
  wishlist: [],
  addTrip: (trip) =>
    set((state) => ({
      newTrips: [{ ...trip, id: `t${Date.now()}`, createdAt: Date.now() }, ...state.newTrips],
    })),
  addToWishlist: (item) => {
    const id = item.title.toLowerCase().replace(/\s+/g, '-');
    if (get().wishlist.some((w) => w.id === id)) return;
    set((state) => ({ wishlist: [...state.wishlist, { ...item, id }] }));
  },
  removeFromWishlist: (id) =>
    set((state) => ({ wishlist: state.wishlist.filter((w) => w.id !== id) })),
  isWishlisted: (id) => get().wishlist.some((w) => w.id === id),
}));
