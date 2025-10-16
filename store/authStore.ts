import { KEY_JWT_SESSION } from "@/common/constants";
import AppStorage from "@/utils/AppStorage";
import { create } from "zustand";

export interface userDataType {
  email: string
  username: string
}

export type authStateDataType = {
  isAuthenticated: boolean;
  userData: userDataType | null;
};

interface AuthState extends authStateDataType {
  setAuthState: (authState: userDataType & {
    accessToken?: string;
  }) => void;
  clearAuthState: () => void;
}

const initialState: authStateDataType = {
  isAuthenticated: false,
  userData: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setAuthState: ({ username, email, accessToken }) =>
    set(() => {
      if (KEY_JWT_SESSION && accessToken) AppStorage.setItem(KEY_JWT_SESSION, accessToken);
      return { isAuthenticated: true, userData: { username, email } };
    }),
  clearAuthState: () =>
    set(() => {
      AppStorage.removeItem(KEY_JWT_SESSION);
      return { isAuthenticated: false, userData: null };
    }),
}));
