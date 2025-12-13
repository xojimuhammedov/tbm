import { Language } from "@/shared/enums/Language.ts";

const isProd = import.meta.env.PROD;

export const config = {
  BASE_PATH: isProd ? `${import.meta.env.VITE_BASE_URL}/` : "/",
  SOCKET_URL: isProd ? `${import.meta.env.VITE_SOCKET_URL}/admin` : "/admin",
  MODE: import.meta.env.MODE,
  APP: {
    NAME: import.meta.env.VITE_APP_NAME,
    LOGO: import.meta.env.VITE_APP_LOGO,
    LOGO_MIN: import.meta.env.VITE_APP_LOGO_MIN,
    OWNER: {
      URL: import.meta.env.VITE_OWNER_URL,
      NAME: import.meta.env.VITE_OWNER_NAME,
    },
  },
  SIGNED: Boolean(import.meta.env.VITE_SIGNED),
  LANG: {
    DEFAULT: Language.UZ,
    NS: {
      DEFAULT: import.meta.env.VITE_DEFAULT_NS,
      VALIDATION: import.meta.env.VITE_VALIDATION_NS,
      ERROR: import.meta.env.VITE_ERROR_NS,
    },
  },
  DEFAULT_TIMEZONE: import.meta.env.VITE_DEFAULT_TIMEZONE,
};
