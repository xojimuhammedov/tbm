import type { UseFormReturn } from "react-hook-form";

export type FormAny = UseFormReturn<any>;

export type PopulateCtx = {
  setCurrentIds: (v: string[]) => void;
};

export type BuildCtx = {
  fullCode: string;
  currentIds: string[];
};

export type Handler = {
  populate: (form: FormAny, payload: any, ctx: PopulateCtx) => void;
  build: (data: any, ctx: BuildCtx) => any;
};
