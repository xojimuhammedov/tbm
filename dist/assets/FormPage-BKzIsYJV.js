import {
  j as e,
  k as h,
  z as a,
  i as b,
  Q as y,
  r as u,
} from "./index-ADhmmBpU.js";
import { P as j } from "./PageHeader-l3FtlNyv.js";
import { P as g } from "./PageWrapper-D7EWSq9s.js";
import "./lodash-BI9_Ro3R.js";
import { r as N } from "./index.es-njk8-3Q7.js";
import { u as f, S as w } from "./useStaffOptions-CXWN6ZMm.js";
import { u as v } from "./useF54DocumentForm-CbbVXWu9.js";
import { u as S, a as k } from "./useFlowsOptions-DlABDue9.js";
import { u as d, c as l } from "./button-Bp2lHjov-bkEUXTzY.js";
import { A as q } from "./arrow-left-Bv-o5b3i.js";
import { S as i } from "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./sidebar-C0lF1Npi.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./useLists-DBTxrMAi.js";
import "./useApi-BNT2PGFQ.js";
import "./useQueryParams-Dns8Zny6.js";
import "./staff.constants-D5gKBh84.js";
import "./useMutate-B2j67kPQ.js";
import "./zod-BQt-Wj8X.js";
import "./createF54Schema-CidpDcDP.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./useF54Document-SmdNDJqk.js";
import "./useGetOne-DA0KuYmv.js";
import "./useChannel-CLHGnbdc.js";
import "./channels.constants-BBumYQzh.js";
import "./flows.constants-G1-csUmv.js";
const z = ({ id: o, onSave: n, onCancel: t }) => {
    const { t: r } = d(),
      { staffOptions: c } = f(),
      { channelOptions: x } = S(),
      { flowMbbOptions: m } = k(),
      { form: s, handleSubmit: p } = v({ id: o, onSave: n });
    return e.jsx(h, {
      ...s,
      children: e.jsx("form", {
        onSubmit: s.handleSubmit(p),
        className: "p-4",
        children: e.jsxs("div", {
          className: "rounded-lg shadow-sm border p-6 space-y-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                e.jsxs(l, {
                  type: "button",
                  className: "flex items-center gap-2 hover:text-gray-800",
                  onClick: t,
                  children: [
                    e.jsx(q, { size: 20 }),
                    e.jsx("span", { children: r("Bekor qilish") }),
                  ],
                }),
                e.jsx("div", {
                  className: "text-sm text-gray-500",
                  children: r("RH 45-232/2012"),
                }),
              ],
            }),
            e.jsx("h1", {
              className: "text-2xl font-bold",
              children: r("Hujjat yaratish F-54"),
            }),
            e.jsxs("div", {
              className: "text-center",
              children: [
                e.jsx("h2", {
                  className: "text-lg font-semibold",
                  children: r("V ilova"),
                }),
                e.jsx("p", {
                  className: "text-sm text-gray-300",
                  children: r("(Majburiy)"),
                }),
              ],
            }),
            e.jsx("p", {
              className: "text-center text-sm",
              children: r(
                "Rejaga oid va rejadan tashqari ta'mirlash-sozlash ishlari o'tkazilishini hisobga olish qaydnomasi va uni to'ldrish tartibi",
              ),
            }),
            e.jsx("h3", {
              className: "text-lg font-semibold",
              children: r(
                "B.1 Rejaga oid va rejadan tashqari ta'mirlash-sozlash ishlari o'tkazilishini hisobga olish qaydnomasining shakli",
              ),
            }),
            e.jsx("div", {
              children: e.jsxs("table", {
                className: "w-full border-collapse border border-gray-300",
                children: [
                  e.jsxs("thead", {
                    children: [
                      e.jsxs("tr", {
                        children: [
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            colSpan: 2,
                            children: r(
                              "RTSI, RTTSI ni o'tkazish sanasi va vaqti",
                            ),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: r("Ishlarni o'tkazishning haqiqiy vaqti"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-15",
                            rowSpan: 2,
                            children: r("Kanal kodi"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: r("NO nomeri"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: r(
                              "O'lchanadigan TE va OE tarmoqlari kanallarining belglanishi",
                            ),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: r("Ishlar uchastkasi"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: r("Profilaktika turi"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: r(
                              "Ishlarini o'tkazish yoki bekor qilish sababi",
                            ),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: r("UBP zonasi"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: r("Eslatma"),
                          }),
                        ],
                      }),
                      e.jsxs("tr", {
                        children: [
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            children: r("Sana, Oy"),
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            children: r("Soat minutlar"),
                          }),
                        ],
                      }),
                      e.jsxs("tr", {
                        children: [
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-16",
                            children: "1",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium",
                            children: "2",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "3",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-15",
                            children: "4",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "5",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "6",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "7",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-24",
                            children: "8",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "9",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "10",
                          }),
                          e.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "11",
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx("tbody", {
                    children: e.jsxs("tr", {
                      children: [
                        e.jsx("td", {
                          className:
                            "border border-gray-300 px-1 py-1 text-center text-sm font-medium",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "date",
                            placeholder: r("Kiriting"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "minute",
                            placeholder: r("00"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "real_minutes",
                            placeholder: r("00"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(i, {
                            className:
                              "!border-0 rounded-none text-center h-full !focus-visible:ring-0",
                            control: s.control,
                            name: "channel_id",
                            options: x || [],
                            placeholder: r("Channel"),
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "noNumber",
                            placeholder: r("Raqami"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "teOeDesignation",
                            placeholder: r("Belgilanishi"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "workArea",
                            placeholder: r("Uchastka"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "prophylaxisType",
                            placeholder: r("Profilaktika turi"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "cause",
                            placeholder: r("Nomerlar"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(i, {
                            className:
                              "!border-0 rounded-none text-center h-full !focus-visible:ring-0",
                            control: s.control,
                            name: "ubpZone",
                            options: m || [],
                            placeholder: r("MBB"),
                            isMulti: !0,
                          }),
                        }),
                        e.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e.jsx(a, {
                            control: s.control,
                            name: "note",
                            placeholder: r("Eslatma"),
                            className: "border-0 rounded-none text-center",
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(N, {
              className: "min-h-[150px]",
              control: s.control,
              name: "description",
              placeholder: "Izoh...",
            }),
            e.jsx(i, {
              control: s.control,
              name: "recipientIds",
              options: c || [],
              label: r("Yuboriladigan xodimlar"),
              placeholder: r("Select staffs"),
              isClearable: !0,
              required: !0,
              isMulti: !0,
            }),
            e.jsxs("div", {
              className: "flex justify-between items-center pt-6 border-t",
              children: [
                e.jsx(l, {
                  type: "button",
                  className:
                    "px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500",
                  onClick: t,
                  children: r("Bekor qilish"),
                }),
                e.jsx("div", {
                  className: "flex gap-3",
                  children: e.jsxs(l, {
                    type: "submit",
                    className:
                      "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2",
                    children: [e.jsx(w, { size: 16 }), r("Yuborish")],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  ee = () => {
    const { t: o } = d(),
      n = b(),
      { id: t } = y(),
      r = u.useMemo(
        () => [
          { name: o("RTSI"), path: "rtsi", isActive: !1 },
          { name: o("F-54 document"), path: "f-54", isActive: !1 },
          {
            name: o(t ? "Edit" : "Create"),
            path: t ? `${t}/edit` : "create",
            isActive: !0,
          },
        ],
        [t, o],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(j, { className: "sticky top-0", breadcrumbs: r }),
        e.jsx(g, {
          children: e.jsx(z, {
            id: t,
            onSave: () => n("/rtsi/f-54"),
            onCancel: () => n("/rtsi/f-54"),
          }),
        }),
      ],
    });
  };
export { ee as default };
