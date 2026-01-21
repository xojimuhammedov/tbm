import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createOrderSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  const requiredMsg = (fieldKey: string) =>
    t("required {{field}}", {
      field: t(fieldKey),
      ns: config.LANG.NS.VALIDATION,
    });

  const flowSchema = z.object({
    code: z.string().min(1, requiredMsg("Code")),
    point_a: z.string().min(1, requiredMsg("Point A")),
    point_b: z.string().min(1, requiredMsg("Point B")),
    port_a: z.string().min(1, requiredMsg("Port A")),
    port_b: z.string().min(1, requiredMsg("Port B")),
    device_a: z.string().min(1, requiredMsg("Device A")),
    device_b: z.string().min(1, requiredMsg("Device B")),
    signal_level: z.string().optional(),
  });

  const eventScheduleSchema = z.object({
    date: z.string().min(1, requiredMsg("Date")),
    duration: z.string().min(1, requiredMsg("Duration")),
    event_type: z.string().min(1, requiredMsg("Event Type")),
  });

  const orderEventSchema = z.object({
    location: z.string().min(1, requiredMsg("Location")),
    connection_spec: z.string().min(1, requiredMsg("Connection Spec")),
    schedule: z.array(eventScheduleSchema).min(1),
  });

  const baseSchema = z.object({
    document_index: z.string().min(1, requiredMsg("Document Index")),
    order_date: z.string().min(1, requiredMsg("Order date")),
    responsible: z.string().min(1, requiredMsg("Responsible")),
    to: z.array(z.string()).min(1, requiredMsg("To")),
    copy: z.array(z.string()).min(1, requiredMsg("Copy")),
    payload_model: z.string().optional(),
  });

  const payload1745Schema = z.object({
    basic: z.object({
      organization_name: z.string().min(1, requiredMsg("Organization")),
      request_number: z.string().min(1, requiredMsg("Request number")),
      request_date: z.string().min(1, requiredMsg("Request date")),
      deadline: z.string().min(1, requiredMsg("Deadline")),
      justification: z.string().min(1, requiredMsg("Justification")),
      signal_level: z.string().min(1, requiredMsg("Signal level")),
      actions: z.array(z.enum(["create", "update", "delete"])),
    }),
    create: z.object({ flow_ids: z.array(flowSchema) }).optional(),
    update: z
      .object({
        channels: z
          .array(z.object({ old: z.string(), new: z.string() }))
          .optional(),
        flows: z.array(flowSchema).optional(),
      })
      .optional(),
    delete: z.object({ elements: z.array(z.string()) }).optional(),
  });

  const payload1754Schema = z.object({
    basic: z.object({
      organization_name: z.string().min(1, requiredMsg("Organization")),
      request_number: z.string().min(1, requiredMsg("Request number")),
      request_date: z.string().min(1, requiredMsg("Request date")),
      justification: z.string().min(1, requiredMsg("Justification")),
      context: z.string().min(1, requiredMsg("Context")),
    }),
    events: z.array(orderEventSchema).min(1),
  });

  const payload1733Schema = z.object({
    basic: z.object({
      organization_name: z.string().min(1, requiredMsg("Organization")),
      request_number: z.string().min(1, requiredMsg("Request number")),
      request_date: z.string().min(1, requiredMsg("Request date")),
      deadline: z.string().min(1, requiredMsg("Deadline")),
      justification: z.string().min(1, requiredMsg("Justification")),
      delete: z.object({
        elements: z.array(z.string()).min(1, requiredMsg("Elements")),
      }),
    }),
  });

  return z.discriminatedUnion("code", [
    baseSchema.extend({
      code: z.literal("17-45"),
      payload: payload1745Schema,
    }),
    baseSchema.extend({
      code: z.literal("17-54"),
      payload: payload1754Schema,
    }),
    baseSchema.extend({
      code: z.literal("17-33"),
      payload: payload1733Schema,
    }),
  ]);
};

export type OrderDto = z.infer<ReturnType<typeof createOrderSchema>>;
