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

  // --- Reusable Schemas ---

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

  const stoppedFlowSchema = z.object({
    _id: z.string().optional(),
    code: z.string().min(1, requiredMsg("Code")),
    point_a: z.string().min(1, requiredMsg("Point A")),
    point_b: z.string().min(1, requiredMsg("Point B")),
  });

  // Interface bo'yicha ResponsibleUser ob'ekt
  const responsibleSchema = z.object({
    _id: z.string(),
    first_name: z.string(),
    second_name: z.string(),
    middle_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });

  const baseSchema = z.object({
    document_index: z.string().min(1, requiredMsg("Document Index")),
    order_date: z.string().min(1, requiredMsg("Order date")),
    responsible: responsibleSchema,
    to: z.array(z.string()).min(1, requiredMsg("To")),
    copy: z.array(z.string()),
    payload_model: z.string().optional(),
  });

  // --- Payload Schemas ---

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
    update: z.object({
      channels: z.array(z.object({ old: z.string(), new: z.string() })).optional(),
      flows: z.array(flowSchema).optional(),
    }).optional(),
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
    }),
    delete: z.object({
      elements: z.array(z.string()).min(1, requiredMsg("Elements")),
      flow_ids: z.array(z.any()).optional(), // Interface'da FlowsIds1733[]
      channels: z.array(z.any()).optional(), // Interface'da Channels1733[]
    }),
  });

  const payload1770Schema = z.object({
    basic: z.object({
      organization_name: z.string().min(1, requiredMsg("Organization")),
      request_number: z.string().min(1, requiredMsg("Request number")),
      request_date: z.string().min(1, requiredMsg("Request date")),
      title: z.string().min(1, requiredMsg("Title")),
      connection_closure_type: z.string().min(1, requiredMsg("Closure Type")),
      max_duration_minutes: z.number().min(1, requiredMsg("Duration")),
      start_time: z.string().min(1, requiredMsg("Start time")),
      end_time: z.string().min(1, requiredMsg("End time")),
      timezone: z.string().min(1, requiredMsg("Timezone")),
      context: z.string().optional(),

    }),
    flow_ids: z.array(z.string()).min(1, requiredMsg("Flow IDs")),
  });

  // Yangi 17-48 Payload
  const payload1748Schema = z.object({
    basic: z.object({
      title: z.string().min(1, requiredMsg("Title")),
      start_time: z.string().min(1, requiredMsg("Start time")),
      end_time: z.string().min(1, requiredMsg("End time")),
    }),
    content: z.string().min(1, requiredMsg("Content")),
    reserve_routes: z.string().optional(),
    main_routes: z.string().optional(),
    stopped_flows: z.array(stoppedFlowSchema),
    including: z.string().optional(),
    responsible_person: z.string().min(1, requiredMsg("Responsible person")),
    concert_text: z.string().min(1, requiredMsg("Concert text")),
    basis: z.string().min(1, requiredMsg("Basis")),
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
    baseSchema.extend({
      code: z.literal("17-70"),
      payload: payload1770Schema,
    }),
    baseSchema.extend({
      code: z.literal("17-48"),
      payload: payload1748Schema,
    }),
  ]);
};

export type OrderDto = z.infer<ReturnType<typeof createOrderSchema>>;