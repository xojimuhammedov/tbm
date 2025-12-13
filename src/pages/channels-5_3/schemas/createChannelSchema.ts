import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createChannelSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    stream_identifier: z.string().nonempty(
      t("required {{field}}", {
        field: t("Stream identifier"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    international_stream_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("International stream number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    forward_stream_interaction_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Forward stream interaction number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    reverse_stream_interaction_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reverse stream interaction number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    rcpu_site_id_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("RCPU site id A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    icm_a_stream: z.string().nonempty(
      t("required {{field}}", {
        field: t("ICM A stream"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    rcpu_site_id_z: z.string().nonempty(
      t("required {{field}}", {
        field: t("RCPU site id Z"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    icm_b_stream: z.string().nonempty(
      t("required {{field}}", {
        field: t("ICM B stream"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_identifier: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel identifier"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_link: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel link"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_number_in_stream: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel number in stream"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_a_of_channel: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point A of channel"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_b_of_channel: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point B of channel"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    binding_node_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Binding node A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    binding_node_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Binding node B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    last_mile_track_consumer_mu_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Last mile track consumer MU A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    last_mile_track_consumer_mu_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Last mile track consumer MU B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_consumer: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel consumer"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    connection_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    destination_index: z.string().nonempty(
      t("required {{field}}", {
        field: t("Destination index"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_organization_order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel organization order number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_decommission_order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel decommission order number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_reserve: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel reserve"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_mode: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel mode"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    timeslot_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Timeslot number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    fac_group_bc: z.string().nonempty(
      t("required {{field}}", {
        field: t("FAC group BC"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    site_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Site A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ne_a_id: z.string().nonempty(
      t("required {{field}}", {
        field: t("NE A ID"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    a_port_nms: z.string().nonempty(
      t("required {{field}}", {
        field: t("A Port NMS"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    site_z: z.string().nonempty(
      t("required {{field}}", {
        field: t("Site Z"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ne_z_id: z.string().nonempty(
      t("required {{field}}", {
        field: t("NE Z ID"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    z_port_nms: z.string().nonempty(
      t("required {{field}}", {
        field: t("Z Port NMS"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Order number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    stream_consumer: z.string().nonempty(
      t("required {{field}}", {
        field: t("Stream consumer"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    fac_protection_mode: z.string().nonempty(
      t("required {{field}}", {
        field: t("FAC protection mode"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    additional_information: z.string().nonempty(
      t("required {{field}}", {
        field: t("Additional information"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    additional_consumer_information: z.string().nonempty(
      t("required {{field}}", {
        field: t("Additional consumer information"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    phone_numbers: z.string().nonempty(
      t("required {{field}}", {
        field: t("Phone numbers"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    consumer_2: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer 2"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    consumer_3: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer 3"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    payment_status: z.string().nonempty(
      t("required {{field}}", {
        field: t("Payment status"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    responsibility_zone: z.string().nonempty(
      t("required {{field}}", {
        field: t("Responsibility zone"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    mux_belonging_site_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("MUX belonging site A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    mux_belonging_site_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("MUX belonging site B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    verification_by_letters_from_branches: z.string().nonempty(
      t("required {{field}}", {
        field: t("Verification by letters from branches"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    verification_result: z.string().nonempty(
      t("required {{field}}", {
        field: t("Verification result"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    verification: z.string().nonempty(
      t("required {{field}}", {
        field: t("Verification"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ChannelDto = z.infer<ReturnType<typeof createChannelSchema>>;
