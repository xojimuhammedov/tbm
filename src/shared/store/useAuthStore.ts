import cookiesStorage from "./storages/cookieStorage.ts";
import { ACCESS_TOKEN_KEY } from "./constants/storage.constants.ts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: AuthState["accessToken"]) => void;
  refreshToken: string | null;
  setRefreshToken: (token: AuthState["refreshToken"]) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      setRefreshToken: (refreshToken) => {
        set({ refreshToken });
      },
      accessToken: null,
      refreshToken: null,
    }),
    {
      name: ACCESS_TOKEN_KEY,
      storage: createJSONStorage(() => cookiesStorage()),
    },
  ),
);

export default useAuthStore;
