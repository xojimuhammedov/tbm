import cookiesStorage from "./storages/cookieStorage.ts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PASSWORD_TOKEN_KEY } from "@/shared/store/constants/storage.constants.ts";

type PasswordConfirmTokenState = {
  passwordToken: string | null;
  setPasswordToken: (
    passwordToken: PasswordConfirmTokenState["passwordToken"],
  ) => void;
};
const usePasswordConfirmTokenStore = create<PasswordConfirmTokenState>()(
  persist(
    (set) => ({
      setPasswordToken: (data) => {
        set({ passwordToken: data });
      },
      passwordToken: null,
    }),
    {
      name: PASSWORD_TOKEN_KEY,
      storage: createJSONStorage(() => cookiesStorage(1 / 24 / 12)),
    },
  ),
);

export default usePasswordConfirmTokenStore;
