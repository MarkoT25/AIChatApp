import { create } from "zustand";
import { UserType } from "@/interfaces/types";

interface UserStore {
  selectedUser: UserType | null;
  setSelectedUser: (user: UserType) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user: UserType) => set({ selectedUser: user }),
}));

export default useUserStore;
