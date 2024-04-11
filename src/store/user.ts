import { logout } from "@/app/actions/authActions";
import { create } from "zustand";

export interface IUseUser {
  logout: () => void;
}

export const useUser = create<IUseUser>((set) => ({
  logout() {
    logout().then(() => {
      window.location.href = "/login";
    });
  },
}));
