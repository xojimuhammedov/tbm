import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
import h1212 from "@/pages/tbp/hujjatlar/hooks/component/handlers/12-12.ts";
import h1214 from "@/pages/tbp/hujjatlar/hooks/component/handlers/12-14.ts";
import h1248 from "@/pages/tbp/hujjatlar/hooks/component/handlers/12-48.ts";

export const handlers: Record<string, Handler> = {
  "12-12": h1212,
  "12-14": h1214,
  "12-48": h1248,
};

