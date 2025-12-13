import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";
import {
  LOWERCASE_LETTER_PATTERN,
  NUMBERS_PATTERN,
  SPECIAL_CHARS_PATTERN,
  UPPERCASE_LETTER_PATTERN,
} from "@/shared/constants/validation.constants.ts";

export const createStaffSchema = (
  t: (...args: TranslationArgsType) => string,
  id: string | null,
) =>
  z
    .object({
      first_name: z.string().nonempty(
        t("required {{field}}", {
          field: t("First name"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      second_name: z.string().nonempty(
        t("required {{field}}", {
          field: t("Second name"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      middle_name: z.string().optional(),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .nonempty(
          t("required {{field}}", {
            field: t("Email"),
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .email(
          t("Invalid {{field}}", {
            field: t("Email"),
            ns: config.LANG.NS.VALIDATION,
          }),
        ),
      pinfl: z.string().nonempty(
        t("required {{field}}", {
          field: t("Pinfl"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      phone: z.string().nonempty(
        t("required {{field}}", {
          field: t("Phone"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      role: z.string().nonempty(
        t("required {{field}}", {
          field: t("User role"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      password: z
        .string()
        .min(
          8,
          t("min {{count}} {{field}}", {
            field: t("Password"),
            count: 8,
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .max(
          128,
          t("max {{count}} {{field}}", {
            field: t("Password"),
            count: 128,
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          LOWERCASE_LETTER_PATTERN,
          t("Password must contain at least one lowercase letter", {
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          UPPERCASE_LETTER_PATTERN,
          t("Password must contain at least one uppercase letter", {
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          NUMBERS_PATTERN,
          t("Password must contain at least one number", {
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          SPECIAL_CHARS_PATTERN,
          t("Password must contain at least one special character", {
            ns: config.LANG.NS.VALIDATION,
          }),
        )
        .optional(),
      passwordRepeat: z.string().optional(),
    })
    .superRefine(({ password, passwordRepeat }, ctx) => {
      if (password !== passwordRepeat) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("Password does not match", {
            ns: config.LANG.NS.VALIDATION,
          }),
          path: ["passwordRepeat"],
        });
      }
      if (!id) {
        if (!password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("required {{field}}", {
              field: t("Password"),
              ns: config.LANG.NS.VALIDATION,
            }),
            path: ["password"],
          });
        }
        if (!passwordRepeat) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("required {{field}}", {
              field: t("Password repeat"),
              ns: config.LANG.NS.VALIDATION,
            }),
            path: ["passwordRepeat"],
          });
        }
      }

      return ctx;
    });

export type StaffDto = z.infer<ReturnType<typeof createStaffSchema>>;
