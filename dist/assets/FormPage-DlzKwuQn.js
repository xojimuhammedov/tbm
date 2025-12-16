import {
  a as s,
  q as L,
  r as p,
  i as q,
  j as o,
  k as S,
  z as i,
  Q as x,
} from "./index-ADhmmBpU.js";
import { P as h } from "./PageHeader-l3FtlNyv.js";
import { P as E } from "./PageWrapper-D7EWSq9s.js";
import { l as N } from "./lodash-BI9_Ro3R.js";
import "./index.es-njk8-3Q7.js";
import { u as A, c as T } from "./button-Bp2lHjov-bkEUXTzY.js";
import "./sidebar-C0lF1Npi.js";
import { F as j } from "./FormContainerFooter-M0H-Jjey.js";
import { u as v } from "./useGetOne-DA0KuYmv.js";
import { u as V, a as D } from "./useMutate-B2j67kPQ.js";
import { o as G, s as a, a as P } from "./zod-BQt-Wj8X.js";
import { M as _ } from "./MutateRequestMethod-D0dsk-6r.js";
import { F as b } from "./flows.constants-G1-csUmv.js";
import { A as g } from "./arrow-left-Bv-o5b3i.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./Spin-D_PNnV0x.js";
import "./useApi-BNT2PGFQ.js";
const w = (e) =>
    G({
      code: a().nonempty(
        e("required {{field}}", { field: e("Code"), ns: s.LANG.NS.VALIDATION }),
      ),
      column1: a().nonempty(
        e("required {{field}}", {
          field: e("Column 1"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      outs_id: a().nonempty(
        e("required {{field}}", {
          field: e("Outs id"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      international: a().nonempty(
        e("required {{field}}", {
          field: e("International"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      forward: a().nonempty(
        e("required {{field}}", {
          field: e("Forward"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      reverse: a().nonempty(
        e("required {{field}}", {
          field: e("Reverse"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      start: a().nonempty(
        e("required {{field}}", {
          field: e("Start"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      port_a: a().nonempty(
        e("required {{field}}", {
          field: e("Port A"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      mux_a: a().nonempty(
        e("required {{field}}", {
          field: e("MUX A"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      pa: a().nonempty(
        e("required {{field}}", { field: e("PA"), ns: s.LANG.NS.VALIDATION }),
      ),
      final_ms_name: a().nonempty(
        e("required {{field}}", {
          field: e("Final MS name"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      signal_transmission_level: a().nonempty(
        e("required {{field}}", {
          field: e("Signal transmission level"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      au4: a().nonempty(
        e("required {{field}}", { field: e("AU4"), ns: s.LANG.NS.VALIDATION }),
      ),
      ts: a().nonempty(
        e("required {{field}}", { field: e("TS"), ns: s.LANG.NS.VALIDATION }),
      ),
      pb: a().nonempty(
        e("required {{field}}", { field: e("PB"), ns: s.LANG.NS.VALIDATION }),
      ),
      transit: a().nonempty(
        e("required {{field}}", {
          field: e("Transit"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      mux_b: a().nonempty(
        e("required {{field}}", {
          field: e("MUX B"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      port_b: a().nonempty(
        e("required {{field}}", {
          field: e("Port B"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      end: a().nonempty(
        e("required {{field}}", { field: e("End"), ns: s.LANG.NS.VALIDATION }),
      ),
      consumer: a().nonempty(
        e("required {{field}}", {
          field: e("Consumer"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      order_number: a().nonempty(
        e("required {{field}}", {
          field: e("Order number"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      interest_level: a().nonempty(
        e("required {{field}}", {
          field: e("Interest level"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      mt: a().nonempty(
        e("required {{field}}", { field: e("MT"), ns: s.LANG.NS.VALIDATION }),
      ),
      speed: a().nonempty(
        e("required {{field}}", {
          field: e("Speed"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      protection_mode: a().nonempty(
        e("required {{field}}", {
          field: e("Protection mode"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      sp: a().nonempty(
        e("required {{field}}", { field: e("SP"), ns: s.LANG.NS.VALIDATION }),
      ),
      additional_information: a().nonempty(
        e("required {{field}}", {
          field: e("Additional information"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      payment_status: a().nonempty(
        e("required {{field}}", {
          field: e("Payment status"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      e1_name_in_vs: a().nonempty(
        e("required {{field}}", {
          field: e("E1 name in VS"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
      ms_name_in_vs: a().nonempty(
        e("required {{field}}", {
          field: e("MS name in VS"),
          ns: s.LANG.NS.VALIDATION,
        }),
      ),
    }),
  F = ({ id: e, onSave: d }) => {
    const { t: n } = A(),
      { toast: r } = L(),
      l = p.useMemo(() => w(n), [n]),
      m = V({ resolver: P(l) }),
      u = v({ url: [b, e || ""], options: { enabled: !!e } }),
      { query: c } = D({
        url: [b, e || ""],
        method: e ? _.PUT : _.POST,
        options: {
          onError: (t) => {
            r({
              variant: "destructive",
              title: n(`${N.get(t, "response.statusText", "Error")}`),
              description: n(
                `${N.get(t, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (m.reset(),
              d == null || d(),
              r({
                variant: "success",
                title: n("Success"),
                description: n(
                  e ? "Flow updated successfully" : "Flow created successfully",
                ),
              }));
          },
        },
      });
    p.useEffect(() => {
      var f;
      const t = (f = u.data) == null ? void 0 : f.data;
      t &&
        m.reset({
          code: t.code,
          column1: t.column1,
          outs_id: t.outs_id,
          international: t.international,
          forward: t.forward,
          reverse: t.reverse,
          start: t.start,
          port_a: t.port_a,
          mux_a: t.mux_a,
          pa: t.pa,
          final_ms_name: t.final_ms_name,
          signal_transmission_level: t.signal_transmission_level,
          au4: t.au4,
          ts: t.ts,
          pb: t.pb,
          transit: t.transit,
          mux_b: t.mux_b,
          port_b: t.port_b,
          end: t.end,
          consumer: t.consumer,
          order_number: t.order_number,
          interest_level: t.interest_level,
          mt: t.mt,
          speed: t.speed,
          protection_mode: t.protection_mode,
          sp: t.sp,
          additional_information: t.additional_information,
          payment_status: t.payment_status,
          e1_name_in_vs: t.e1_name_in_vs,
          ms_name_in_vs: t.ms_name_in_vs,
        });
    }, [u.data, m]);
    const I = p.useCallback(
      (t) => {
        c.mutate(t);
      },
      [c],
    );
    return { form: m, onSubmit: I };
  },
  M = ({ id: e, onSave: d, readOnly: n = !1 }) => {
    const { t: r } = A(),
      { form: l, onSubmit: m } = F({ id: e, onSave: d }),
      u = q(),
      c = e
        ? `${r("Edit")} ${r("Flows(5_1)")}`
        : `${r("Create")} ${r("Flows(5_1)")}`;
    return o.jsx(S, {
      ...l,
      children: o.jsxs("form", {
        onSubmit: l.handleSubmit(m),
        className: "space-y-4",
        children: [
          o.jsx("h2", { className: "text-xl font-medium", children: c }),
          o.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
            children: [
              o.jsx(i, {
                control: l.control,
                name: "code",
                label: r("Code"),
                placeholder: r("Enter code"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "column1",
                label: r("Column 1"),
                placeholder: r("Enter Column 1"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "outs_id",
                label: r("Outs id"),
                placeholder: r("Enter Outs id"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "international",
                label: r("International"),
                placeholder: r("Enter international"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "forward",
                label: r("Forward"),
                placeholder: r("Enter forward"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "reverse",
                label: r("Reverse"),
                placeholder: r("Enter reverse"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "start",
                label: r("Start"),
                placeholder: r("Enter start date"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "port_a",
                label: r("Port A"),
                placeholder: r("Enter Port A"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "mux_a",
                label: r("MUX A"),
                placeholder: r("Enter MUX A"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "pa",
                label: r("PA"),
                placeholder: r("Enter PA"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "final_ms_name",
                label: r("Final MS name"),
                placeholder: r("Enter final MS name"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "signal_transmission_level",
                label: r("Signal transmission level"),
                placeholder: r("Enter signal transmission level"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "au4",
                label: r("AU4"),
                placeholder: r("Enter AU4"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "ts",
                label: r("TS"),
                placeholder: r("Enter TS"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "pb",
                label: r("PB"),
                placeholder: r("Enter PB"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "transit",
                label: r("Transit"),
                placeholder: r("Enter transit"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "mux_b",
                label: r("MUX B"),
                placeholder: r("Enter MUX B"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "port_b",
                label: r("Port B"),
                placeholder: r("Enter Port B"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "end",
                label: r("End"),
                placeholder: r("Enter end date"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "consumer",
                label: r("Consumer"),
                placeholder: r("Enter consumer"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "order_number",
                label: r("Order number"),
                placeholder: r("Enter order number"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "interest_level",
                label: r("Interest level"),
                placeholder: r("Enter interest level"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "mt",
                label: r("MT"),
                placeholder: r("Enter MT"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "speed",
                label: r("Speed"),
                placeholder: r("Enter speed"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "protection_mode",
                label: r("Protection mode"),
                placeholder: r("Enter protection mode"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "sp",
                label: r("SP"),
                placeholder: r("Enter SP"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "additional_information",
                label: r("Additional information"),
                placeholder: r("Enter additional information"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "payment_status",
                label: r("Payment status"),
                placeholder: r("Enter payment status"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "e1_name_in_vs",
                label: r("E1 name in VS"),
                placeholder: r("Enter E1 name in VS"),
                required: !0,
                disabled: n,
              }),
              o.jsx(i, {
                control: l.control,
                name: "ms_name_in_vs",
                label: r("MS name in VS"),
                placeholder: r("Enter MS name in VS"),
                required: !0,
                disabled: n,
              }),
            ],
          }),
          !n &&
            o.jsx(j, {
              children: o.jsxs(T, {
                size: "sm",
                variant: "ghost",
                type: "button",
                onClick: () => u("/flows-5_1"),
                children: [o.jsx(g, {}), r("Back")],
              }),
            }),
        ],
      }),
    });
  },
  ee = () => {
    const { t: e } = A(),
      d = q(),
      { id: n } = x(),
      r = p.useMemo(
        () => [
          { name: e("Resource Database"), path: "/", isActive: !1 },
          { name: e("Flows(5_1)"), path: "/flows-5_1", isActive: !1 },
          {
            name: e(n ? "Edit" : "Create"),
            path: n ? `/flows-5_1/edit/${n}` : "/flows-5_1/create",
            isActive: !0,
          },
        ],
        [n, e],
      );
    return o.jsxs(o.Fragment, {
      children: [
        o.jsx(h, { className: "sticky top-0", breadcrumbs: r }),
        o.jsx(E, {
          children: o.jsx(M, { id: n || null, onSave: () => d("/flows-5_1") }),
        }),
      ],
    });
  };
export { ee as default };
