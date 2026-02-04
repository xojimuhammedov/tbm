import { safeArray } from "./common";

export const listToText = (v: any) => safeArray<string>(v).join("\n");

export const textToList = (v: any) =>
    typeof v === "string"
        ? v
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean)
        : safeArray<string>(v);
