import { isObj, AnyObj } from "./common";

export const unwrapDoc = (v: unknown): AnyObj | null => {
    if (!isObj(v)) return null;
    if (isObj((v as AnyObj).data)) return (v as AnyObj).data as AnyObj;
    return v as AnyObj;
};
