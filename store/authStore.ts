import { KEY_JWT_SESSION } from "@/common/constants";
import { create } from "zustand";

export type authStateDataType = {
  isAuthenticated: boolean;
  userData: any | null;
};

interface AuthState extends authStateDataType {
  setAuthState: (authState: {
    isAuthenticated: boolean;
    userData: any;
    token: string;
  }) => void;
  clearAuthState: () => void;
}

const initialState: authStateDataType = {
  isAuthenticated: false,
  userData: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setAuthState: ({ isAuthenticated, userData, token }) =>
    set(() => {
      if (KEY_JWT_SESSION) localStorage.setItem(KEY_JWT_SESSION, token);
      return { isAuthenticated, userData };
    }),
  clearAuthState: () =>
    set(() => {
      localStorage.removeItem(KEY_JWT_SESSION);
      return { isAuthenticated: false, userData: null };
    }),
}));
