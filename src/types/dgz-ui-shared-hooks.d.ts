import type { ReactNode } from "react";

declare module "dgz-ui-shared/hooks" {
    export type ConfirmOptions = {
        onConfirm: () => void;
        title?: ReactNode;
        description?: ReactNode;
        /**
         * Allow future options supported by the library without breaking strict TS here.
         */
        [key: string]: unknown;
    };

    export function useConfirm(): {
        confirm: (options: ConfirmOptions) => void;
        confirmPassword?: (...args: unknown[]) => unknown;
    };
}

