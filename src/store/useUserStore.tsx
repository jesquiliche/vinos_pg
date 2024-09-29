// store/useUserStore.ts
import { create } from 'zustand';

interface UserStore {
  userId: string | null;
  setUserId: (id: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
}));

export default useUserStore;
