import { config } from "@/shared/utils/config.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";

export const createOrderSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  const requiredMsg = (fieldKey: string) =>
    t("required {{field}}", {
      field: t(fieldKey),
      ns: config.LANG.NS.VALIDATION,
    });

  // --- Reusable Schemas ---

  const responsibleSchema = z.object({
    _id: z.string(),
    first_name: z.string(),
    second_name: z.string(),
    middle_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });

  const baseSchema = z.object({
    code: z.string().min(1, requiredMsg("Code")),
    order_date: z.string().min(1, requiredMsg("Order date")),
    nomenclature_number: z.string().min(1, requiredMsg("Nomenclature number")),
    responsible: responsibleSchema.optional(),
    director: responsibleSchema.optional(),
    to: z.array(z.string()).min(1, requiredMsg("To")),
    copy: z.array(z.string()).optional(),
  });

  const payload1212Schema = z.object({
    basic: z.object({
      organization_name: z.string().min(1, requiredMsg("Organization")),
      request_date: z.string().min(1, requiredMsg("Request date")).nullable(),
      request_number: z.string().min(1, requiredMsg("Request number")),
      signal_level: z.string().min(1, requiredMsg("Signal level")),
      actions: z.array(z.string()).min(1, requiredMsg("Actions")),
      start_time: z.string().optional().nullable(),
      description: z.string().optional(),
    }),
    create: z
      .object({
        flow_ids: z
          .array(
            z.object({
              code: z.string(),
              point_a: z.string(),
              point_b: z.string(),
              signal_level: z.string().optional(),
              port_a: z.string(),
              port_b: z.string(),
              device_a: z.string(),
              device_b: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    update: z
      .object({
        channels: z
          .array(z.object({ old: z.string(), new: z.string() }))
          .optional(),
        flows: z
          .array(
            z.object({
              code: z.string(),
              point_a: z.string(),
              point_b: z.string(),
              device_a: z.string(),
              device_b: z.string(),
              port_a: z.string(),
              port_b: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    delete: z
      .object({
        elements: z.array(z.object({ value: z.string() })).optional(),
      })
      .optional(),
    file_name: z.string().optional(),
  });

  const payload1214Schema = z.object({
    basic: z.object({
      title: z.string().min(1, requiredMsg("Title")),
      start_time: z.string().min(1, requiredMsg("Start time")),
      end_time: z.string().min(1, requiredMsg("End time")),
      base_file: z.string().optional(),
    }),
    content: z.string().optional(),
    stopped_flows: z.array(z.string()).optional(),
    including: z.string().optional(),
    main_routes: z.string().optional(),
    reserve_routes: z.string().optional(),
    responsible_person: z.string().optional(),
    concert_text: z.string().optional(),
    concert_second: z.string().optional(),
    basis: z.string().optional(),
  });

  const payload1234Schema = z.object({
    basic: z.object({
      title: z.string().min(1, requiredMsg("Title")),
      station_interval: z.string().min(1, requiredMsg("Station interval")),
      cause: z.string().optional(),
      control_station: z.string().optional(),
      requirement_ip: z.string().optional(),
      requirement_ip_date: z.string().optional(),
      requirement_user: z.string().optional(),
      connection_closure_type: z.string().optional(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
    }),
    flow_ids: z.array(z.string()).optional(),
    file_name: z.string().optional(),
  });

  const payload1213Schema = z.object({
    basic: z.object({
      title: z.string().min(1, requiredMsg("Title")),
      start_time: z.string().min(1, requiredMsg("Start time")),
      context: z.string().optional(),
      responsible: z.string().optional(),
    }),
  });

  return z.discriminatedUnion("code", [
    baseSchema.extend({ code: z.literal("12-12"), payload: payload1212Schema }),
    baseSchema.extend({ code: z.literal("12-13"), payload: payload1213Schema }),
    baseSchema.extend({ code: z.literal("12-14"), payload: payload1214Schema }),
    baseSchema.extend({ code: z.literal("12-34"), payload: payload1234Schema }),
  ]);
};

export type OrderDto = z.infer<ReturnType<typeof createOrderSchema>>;
