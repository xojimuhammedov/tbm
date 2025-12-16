import {
  a as l,
  q as L,
  r as u,
  i as N,
  j as i,
  k as q,
  z as a,
  Q as x,
} from "./index-ADhmmBpU.js";
import { P as g } from "./PageHeader-l3FtlNyv.js";
import { P as S } from "./PageWrapper-D7EWSq9s.js";
import { l as p } from "./lodash-BI9_Ro3R.js";
import "./index.es-njk8-3Q7.js";
import { u as b, c as E } from "./button-Bp2lHjov-bkEUXTzY.js";
import "./sidebar-C0lF1Npi.js";
import { F as j } from "./FormContainerFooter-M0H-Jjey.js";
import { u as C } from "./useGetOne-DA0KuYmv.js";
import { u as D, a as T } from "./useMutate-B2j67kPQ.js";
import { o as V, s, a as G } from "./zod-BQt-Wj8X.js";
import { M as A } from "./MutateRequestMethod-D0dsk-6r.js";
import { C as h } from "./channels.constants-BBumYQzh.js";
import { A as v } from "./arrow-left-Bv-o5b3i.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./Spin-D_PNnV0x.js";
import "./useApi-BNT2PGFQ.js";
const z = (e) =>
    V({
      code: s().nonempty(
        e("required {{field}}", { field: e("Code"), ns: l.LANG.NS.VALIDATION }),
      ),
      stream_identifier: s().nonempty(
        e("required {{field}}", {
          field: e("Stream identifier"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      international_stream_number: s().nonempty(
        e("required {{field}}", {
          field: e("International stream number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      forward_stream_interaction_number: s().nonempty(
        e("required {{field}}", {
          field: e("Forward stream interaction number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      reverse_stream_interaction_number: s().nonempty(
        e("required {{field}}", {
          field: e("Reverse stream interaction number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      rcpu_site_id_a: s().nonempty(
        e("required {{field}}", {
          field: e("RCPU site id A"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      icm_a_stream: s().nonempty(
        e("required {{field}}", {
          field: e("ICM A stream"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      rcpu_site_id_z: s().nonempty(
        e("required {{field}}", {
          field: e("RCPU site id Z"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      icm_b_stream: s().nonempty(
        e("required {{field}}", {
          field: e("ICM B stream"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_identifier: s().nonempty(
        e("required {{field}}", {
          field: e("Channel identifier"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_link: s().nonempty(
        e("required {{field}}", {
          field: e("Channel link"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_number_in_stream: s().nonempty(
        e("required {{field}}", {
          field: e("Channel number in stream"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      point_a_of_channel: s().nonempty(
        e("required {{field}}", {
          field: e("Point A of channel"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      point_b_of_channel: s().nonempty(
        e("required {{field}}", {
          field: e("Point B of channel"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      binding_node_a: s().nonempty(
        e("required {{field}}", {
          field: e("Binding node A"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      binding_node_b: s().nonempty(
        e("required {{field}}", {
          field: e("Binding node B"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      last_mile_track_consumer_mu_a: s().nonempty(
        e("required {{field}}", {
          field: e("Last mile track consumer MU A"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      last_mile_track_consumer_mu_b: s().nonempty(
        e("required {{field}}", {
          field: e("Last mile track consumer MU B"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_consumer: s().nonempty(
        e("required {{field}}", {
          field: e("Channel consumer"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      connection_number: s().nonempty(
        e("required {{field}}", {
          field: e("Connection number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      destination_index: s().nonempty(
        e("required {{field}}", {
          field: e("Destination index"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_organization_order_number: s().nonempty(
        e("required {{field}}", {
          field: e("Channel organization order number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_decommission_order_number: s().nonempty(
        e("required {{field}}", {
          field: e("Channel decommission order number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_reserve: s().nonempty(
        e("required {{field}}", {
          field: e("Channel reserve"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      channel_mode: s().nonempty(
        e("required {{field}}", {
          field: e("Channel mode"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      timeslot_number: s().nonempty(
        e("required {{field}}", {
          field: e("Timeslot number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      fac_group_bc: s().nonempty(
        e("required {{field}}", {
          field: e("FAC group BC"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      site_a: s().nonempty(
        e("required {{field}}", {
          field: e("Site A"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      ne_a_id: s().nonempty(
        e("required {{field}}", {
          field: e("NE A ID"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      a_port_nms: s().nonempty(
        e("required {{field}}", {
          field: e("A Port NMS"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      site_z: s().nonempty(
        e("required {{field}}", {
          field: e("Site Z"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      ne_z_id: s().nonempty(
        e("required {{field}}", {
          field: e("NE Z ID"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      z_port_nms: s().nonempty(
        e("required {{field}}", {
          field: e("Z Port NMS"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      order_number: s().nonempty(
        e("required {{field}}", {
          field: e("Order number"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      stream_consumer: s().nonempty(
        e("required {{field}}", {
          field: e("Stream consumer"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      fac_protection_mode: s().nonempty(
        e("required {{field}}", {
          field: e("FAC protection mode"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      additional_information: s().nonempty(
        e("required {{field}}", {
          field: e("Additional information"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      additional_consumer_information: s().nonempty(
        e("required {{field}}", {
          field: e("Additional consumer information"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      phone_numbers: s().nonempty(
        e("required {{field}}", {
          field: e("Phone numbers"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      consumer_2: s().nonempty(
        e("required {{field}}", {
          field: e("Consumer 2"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      consumer_3: s().nonempty(
        e("required {{field}}", {
          field: e("Consumer 3"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      payment_status: s().nonempty(
        e("required {{field}}", {
          field: e("Payment status"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      responsibility_zone: s().nonempty(
        e("required {{field}}", {
          field: e("Responsibility zone"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      mux_belonging_site_a: s().nonempty(
        e("required {{field}}", {
          field: e("MUX belonging site A"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      mux_belonging_site_b: s().nonempty(
        e("required {{field}}", {
          field: e("MUX belonging site B"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      verification_by_letters_from_branches: s().nonempty(
        e("required {{field}}", {
          field: e("Verification by letters from branches"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      verification_result: s().nonempty(
        e("required {{field}}", {
          field: e("Verification result"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
      verification: s().nonempty(
        e("required {{field}}", {
          field: e("Verification"),
          ns: l.LANG.NS.VALIDATION,
        }),
      ),
    }),
  y = ({ id: e, onSave: d }) => {
    const { t: r } = b(),
      { toast: n } = L(),
      t = u.useMemo(() => z(r), [r]),
      m = D({ resolver: G(t) }),
      c = C({ url: [h, e || ""], options: { enabled: !!e } }),
      { query: _ } = T({
        url: [h, e || ""],
        method: e ? A.PUT : A.POST,
        options: {
          onError: (o) => {
            n({
              variant: "destructive",
              title: r(`${p.get(o, "response.statusText", "Error")}`),
              description: r(
                `${p.get(o, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (m.reset(),
              d == null || d(),
              n({
                variant: "success",
                title: r("Success"),
                description: r(
                  e
                    ? "Channel updated successfully"
                    : "Channel created successfully",
                ),
              }));
          },
        },
      });
    u.useEffect(() => {
      var f;
      const o = (f = c.data) == null ? void 0 : f.data;
      o &&
        m.reset({
          code: o.code,
          stream_identifier: o.stream_identifier,
          international_stream_number: o.international_stream_number,
          forward_stream_interaction_number:
            o.forward_stream_interaction_number,
          reverse_stream_interaction_number:
            o.reverse_stream_interaction_number,
          rcpu_site_id_a: o.rcpu_site_id_a,
          icm_a_stream: o.icm_a_stream,
          rcpu_site_id_z: o.rcpu_site_id_z,
          icm_b_stream: o.icm_b_stream,
          channel_identifier: o.channel_identifier,
          channel_link: o.channel_link,
          channel_number_in_stream: o.channel_number_in_stream,
          point_a_of_channel: o.point_a_of_channel,
          point_b_of_channel: o.point_b_of_channel,
          binding_node_a: o.binding_node_a,
          binding_node_b: o.binding_node_b,
          last_mile_track_consumer_mu_a: o.last_mile_track_consumer_mu_a,
          last_mile_track_consumer_mu_b: o.last_mile_track_consumer_mu_b,
          channel_consumer: o.channel_consumer,
          connection_number: o.connection_number,
          destination_index: o.destination_index,
          channel_organization_order_number:
            o.channel_organization_order_number,
          channel_decommission_order_number:
            o.channel_decommission_order_number,
          channel_reserve: o.channel_reserve,
          channel_mode: o.channel_mode,
          timeslot_number: o.timeslot_number,
          fac_group_bc: o.fac_group_bc,
          site_a: o.site_a,
          ne_a_id: o.ne_a_id,
          a_port_nms: o.a_port_nms,
          site_z: o.site_z,
          ne_z_id: o.ne_z_id,
          z_port_nms: o.z_port_nms,
          order_number: o.order_number,
          stream_consumer: o.stream_consumer,
          fac_protection_mode: o.fac_protection_mode,
          additional_information: o.additional_information,
          additional_consumer_information: o.additional_consumer_information,
          phone_numbers: o.phone_numbers,
          consumer_2: o.consumer_2,
          consumer_3: o.consumer_3,
          payment_status: o.payment_status,
          responsibility_zone: o.responsibility_zone,
          mux_belonging_site_a: o.mux_belonging_site_a,
          mux_belonging_site_b: o.mux_belonging_site_b,
          verification_by_letters_from_branches:
            o.verification_by_letters_from_branches,
          verification_result: o.verification_result,
          verification: o.verification,
        });
    }, [c.data, m]);
    const I = u.useCallback(
      (o) => {
        _.mutate(o);
      },
      [_],
    );
    return { form: m, onSubmit: I };
  },
  M = ({ id: e, onSave: d, readOnly: r = !1 }) => {
    const { t: n } = b(),
      { form: t, onSubmit: m } = y({ id: e, onSave: d }),
      c = N(),
      _ = e
        ? `${n("Edit")} ${n("Channels(5_3)")}`
        : `${n("Create")} ${n("Channels(5_3)")}`;
    return i.jsx(q, {
      ...t,
      children: i.jsxs("form", {
        onSubmit: t.handleSubmit(m),
        className: "space-y-4",
        children: [
          i.jsx("h2", { className: "text-xl font-medium", children: _ }),
          i.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
            children: [
              i.jsx(a, {
                control: t.control,
                name: "code",
                label: n("Code"),
                placeholder: n("Enter code"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "stream_identifier",
                label: n("Stream identifier"),
                placeholder: n("Enter stream identifier"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "international_stream_number",
                label: n("International stream number"),
                placeholder: n("Enter international stream number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "forward_stream_interaction_number",
                label: n("Forward stream interaction number"),
                placeholder: n("Enter forward stream interaction number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "reverse_stream_interaction_number",
                label: n("Reverse stream interaction number"),
                placeholder: n("Enter reverse stream interaction number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "rcpu_site_id_a",
                label: n("RCPU site id A"),
                placeholder: n("Enter RCPU site id A"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "icm_a_stream",
                label: n("ICM A stream"),
                placeholder: n("Enter ICM A stream"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "rcpu_site_id_z",
                label: n("RCPU site id Z"),
                placeholder: n("Enter RCPU site id Z"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "icm_b_stream",
                label: n("ICM B stream"),
                placeholder: n("Enter ICM B stream"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_identifier",
                label: n("Channel identifier"),
                placeholder: n("Enter channel identifier"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_link",
                label: n("Channel link"),
                placeholder: n("Enter channel link"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_number_in_stream",
                label: n("Channel number in stream"),
                placeholder: n("Enter channel number in stream"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "point_a_of_channel",
                label: n("Point A of channel"),
                placeholder: n("Enter point A of channel"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "point_b_of_channel",
                label: n("Point B of channel"),
                placeholder: n("Enter point B of channel"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "binding_node_a",
                label: n("Binding node A"),
                placeholder: n("Enter binding node A"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "binding_node_b",
                label: n("Binding node B"),
                placeholder: n("Enter binding node B"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "last_mile_track_consumer_mu_a",
                label: n("Last mile track consumer MU A"),
                placeholder: n("Enter last mile track consumer MU A"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "last_mile_track_consumer_mu_b",
                label: n("Last mile track consumer MU B"),
                placeholder: n("Enter last mile track consumer MU B"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_consumer",
                label: n("Channel consumer"),
                placeholder: n("Enter channel consumer"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "connection_number",
                label: n("Connection number"),
                placeholder: n("Enter connection number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "destination_index",
                label: n("Destination index"),
                placeholder: n("Enter destination index"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_organization_order_number",
                label: n("Channel organization order number"),
                placeholder: n("Enter channel organization order number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_decommission_order_number",
                label: n("Channel decommission order number"),
                placeholder: n("Enter channel decommission order number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_reserve",
                label: n("Channel reserve"),
                placeholder: n("Enter channel reserve"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "channel_mode",
                label: n("Channel mode"),
                placeholder: n("Enter channel mode"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "timeslot_number",
                label: n("Timeslot number"),
                placeholder: n("Enter timeslot number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "fac_group_bc",
                label: n("FAC group BC"),
                placeholder: n("Enter FAC group BC"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "site_a",
                label: n("Site A"),
                placeholder: n("Enter site A"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "ne_a_id",
                label: n("NE A ID"),
                placeholder: n("Enter NE A ID"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "a_port_nms",
                label: n("A Port NMS"),
                placeholder: n("Enter A Port NMS"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "site_z",
                label: n("Site Z"),
                placeholder: n("Enter site Z"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "ne_z_id",
                label: n("NE Z ID"),
                placeholder: n("Enter NE Z ID"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "z_port_nms",
                label: n("Z Port NMS"),
                placeholder: n("Enter Z Port NMS"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "order_number",
                label: n("Order number"),
                placeholder: n("Enter order number"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "stream_consumer",
                label: n("Stream consumer"),
                placeholder: n("Enter stream consumer"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "fac_protection_mode",
                label: n("FAC protection mode"),
                placeholder: n("Enter FAC protection mode"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "additional_information",
                label: n("Additional information"),
                placeholder: n("Enter additional information"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "additional_consumer_information",
                label: n("Additional consumer information"),
                placeholder: n("Enter additional consumer information"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "phone_numbers",
                label: n("Phone numbers"),
                placeholder: n("Enter phone numbers"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "consumer_2",
                label: n("Consumer 2"),
                placeholder: n("Enter consumer 2"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "consumer_3",
                label: n("Consumer 3"),
                placeholder: n("Enter consumer 3"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "payment_status",
                label: n("Payment status"),
                placeholder: n("Enter payment status"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "responsibility_zone",
                label: n("Responsibility zone"),
                placeholder: n("Enter responsibility zone"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "mux_belonging_site_a",
                label: n("MUX belonging site A"),
                placeholder: n("Enter MUX belonging site A"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "mux_belonging_site_b",
                label: n("MUX belonging site B"),
                placeholder: n("Enter MUX belonging site B"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "verification_by_letters_from_branches",
                label: n("Verification by letters from branches"),
                placeholder: n("Enter verification by letters from branches"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "verification_result",
                label: n("Verification result"),
                placeholder: n("Enter verification result"),
                required: !0,
                disabled: r,
              }),
              i.jsx(a, {
                control: t.control,
                name: "verification",
                label: n("Verification"),
                placeholder: n("Enter verification"),
                required: !0,
                disabled: r,
              }),
            ],
          }),
          !r &&
            i.jsx(j, {
              children: i.jsxs(E, {
                size: "sm",
                variant: "ghost",
                type: "button",
                onClick: () => c("/channels-5_3"),
                children: [i.jsx(v, {}), n("Back")],
              }),
            }),
        ],
      }),
    });
  },
  ee = () => {
    const { t: e } = b(),
      d = N(),
      { id: r } = x(),
      n = u.useMemo(
        () => [
          { name: e("Resource Database"), path: "/", isActive: !1 },
          { name: e("Channels(5_3)"), path: "/channels-5_3", isActive: !1 },
          {
            name: e(r ? "Edit" : "Create"),
            path: r ? `/channels-5_3/edit/${r}` : "/channels-5_3/create",
            isActive: !0,
          },
        ],
        [r, e],
      );
    return i.jsxs(i.Fragment, {
      children: [
        i.jsx(g, { className: "sticky top-0", breadcrumbs: n }),
        i.jsx(S, {
          children: i.jsx(M, {
            id: r || null,
            onSave: () => d("/channels-5_3"),
          }),
        }),
      ],
    });
  };
export { ee as default };
