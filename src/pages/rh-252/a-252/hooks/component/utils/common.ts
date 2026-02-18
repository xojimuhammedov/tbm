export const safeArray = <T>(v: any): T[] => (Array.isArray(v) ? v : []);

export const codePrefix = (full?: string) =>
  full ? full.split("-").slice(0, 2).join("-") : "";

export type AnyObj = Record<string, any>;
export const isObj = (v: unknown): v is AnyObj =>
  typeof v === "object" && v !== null;
