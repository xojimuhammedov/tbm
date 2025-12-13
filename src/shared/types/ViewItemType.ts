import { ReactNode } from "react";
import { ClassValue } from "class-variance-authority/types";

export type ViewItemType<TData> = {
  [K in keyof TData]: {
    key?: string;
    dataIndex: K;
    name?: string;
    type?: "data" | "object";
    className?: ClassValue;
    render?: (value: TData[K], record: TData) => ReactNode;
    renderPdf?: (value: TData[K], record: TData) => ReactNode;
  };
}[keyof TData];
