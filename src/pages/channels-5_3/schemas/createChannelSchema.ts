import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createChannelSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    code: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Code"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    flow_id: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Flow ID"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    flow_code: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Flow Code"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    international_stream_number: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("International stream number"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    forward_stream_interaction_number: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Forward stream interaction number"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    reverse_stream_interaction_number: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Reverse stream interaction number"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    rcpu_site_id_a: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("RCPU site id A"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    icm_a_stream: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("ICM A stream"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    rcpu_site_id_z: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("RCPU site id Z"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    icm_b_stream: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("ICM B stream"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    channel_link: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Channel link"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    channel_number_in_stream: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Channel number in stream"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    destination_index: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Destination index"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    channel_mode: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Channel mode"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    timeslot_number: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Timeslot number"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    fac_group_bc: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("FAC group BC"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    site_a: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Site A"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    ne_a_id: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("NE A ID"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    a_port_nms: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("A Port NMS"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    site_z: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Site Z"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    ne_z_id: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("NE Z ID"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
    z_port_nms: z
      .string()
      .nonempty(
        t("required {{field}}", {
          field: t("Z Port NMS"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),

    stream_identifier: z.string().optional(),
    channel_identifier: z.string().optional(),
    point_a_of_channel: z.string().optional(),
    point_b_of_channel: z.string().optional(),
    binding_node_a: z.string().optional(),
    binding_node_b: z.string().optional(),
    last_mile_track_consumer_mu_a: z.string().optional(),
    last_mile_track_consumer_mu_b: z.string().optional(),
    channel_consumer: z.string().optional(),
    connection_number: z.string().optional(),
    channel_organization_order_number: z.string().optional(),
    channel_decommission_order_number: z.string().optional(),
    channel_reserve: z.string().optional(),
    order_number: z.string().optional(),
    stream_consumer: z.string().optional(),
    fac_protection_mode: z.string().optional(),
    additional_information: z.string().optional(),
    additional_consumer_information: z.string().optional(),
    phone_numbers: z.string().optional(),
    consumer_2: z.string().optional(),
    consumer_3: z.string().optional(),
    payment_status: z.string().optional(),
    responsibility_zone: z.string().optional(),
    mux_belonging_site_a: z.string().optional(),
    mux_belonging_site_b: z.string().optional(),
    verification_by_letters_from_branches: z.string().optional(),
    verification_result: z.string().optional(),
    verification: z.string().optional(),
  });

export type ChannelDto = z.infer<ReturnType<typeof createChannelSchema>>;
