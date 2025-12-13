import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createTelevisionSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    title: z.string().nonempty(
      t("required {{field}}", {
        field: t("Document title"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    files: z.array(z.string()).optional().default([]),
    recipientIds: z.array(z.string()).optional().default([]),
    description: z.string().optional(),

    chairman: z.string().nonempty(
      t("required {{field}}", {
        field: t("Chairman"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    director: z.string().nonempty(
      t("required {{field}}", {
        field: t("Director"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    text1: z.string().nonempty(
      t("required {{field}}", {
        field: t("Text1"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    text2: z.string().nonempty(
      t("required {{field}}", {
        field: t("Text2"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),

    speed: z.string().nonempty(
      t("required {{field}}", {
        field: t("Speed"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),

    documents: z
      .array(
        z.object({
          address: z.string().optional().default(""),
          speed_and_type: z.string().optional().default(""),
          date: z.string().optional().default(""),
          duration: z.string().optional().default(""),
          type: z.string().optional().default(""),
        }),
      )
      .min(
        1,
        t("At least one row is required", { ns: config.LANG.NS.VALIDATION }),
      ),
  });

export type TelevisionDto = z.infer<ReturnType<typeof createTelevisionSchema>>;
