import {
  j as r,
  k as a,
  z as s,
  i as l,
  Q as c,
  r as n,
} from "./index-ADhmmBpU.js";
import { P as m } from "./PageHeader-l3FtlNyv.js";
import { P as b } from "./PageWrapper-D7EWSq9s.js";
import "./lodash-BI9_Ro3R.js";
import "./index.es-njk8-3Q7.js";
import { u as x } from "./useApplicationDocumentForm-CWDV2SPQ.js";
import { u as i } from "./button-Bp2lHjov-bkEUXTzY.js";
import "./sidebar-C0lF1Npi.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./useMutate-B2j67kPQ.js";
import "./useApi-BNT2PGFQ.js";
import "./zod-BQt-Wj8X.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./useApplicationDocument-C6bKJL3W.js";
import "./useGetOne-DA0KuYmv.js";
const p = ({ id: d, onSave: t }) => {
    const { form: e, handleSubmit: o } = x({ id: d, onSave: t });
    return r.jsx(a, {
      ...e,
      children: r.jsx("form", {
        onSubmit: e.handleSubmit(o),
        className: "py-6 px-4",
        children: r.jsxs("div", {
          className: "w-full max-w-6xl mx-auto p-4",
          children: [
            r.jsx("h1", {
              className: "text-2xl font-bold text-center mb-4",
              children: "Айланиб ўтиш ва алмаштиришлар графиги",
            }),
            r.jsx("div", {
              className: "text-right mb-2 text-sm",
              children: "3.2-шакл",
            }),
            r.jsx("div", {
              className: "border border-gray-800",
              children: r.jsx("table", {
                className: "w-full border-collapse",
                children: r.jsxs("tbody", {
                  children: [
                    r.jsxs("tr", {
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "График номери",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "1",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children:
                            "Ушбу айланиб ўтишдан фойдаланиладиган графиклар пунктларининг рўйҳати",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "2",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children:
                            "Тикланадиган НО учун қўлланадиган автоматик резервлаш принципи",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "3",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          rowSpan: 3,
                          className:
                            "border-r border-gray-800 p-2 align-middle text-center font-medium w-32",
                          children: "Асосий трасса",
                        }),
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Фойдаланилган НО тури, алока номери",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "4",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Тракт (канал)нинг НО трассаси",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "5",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Узаро ишлаш рақами",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "6",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          rowSpan: 3,
                          className:
                            "border-r border-gray-800 p-2 align-middle text-center font-medium w-32",
                          children: "Айланиб ўтадиган трасса",
                        }),
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Тракт (канал)нинг НО трассаси",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "7",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Коммутация пунктлари",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "8",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Узаро ишлаш рақами",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "9",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children:
                            "Айланиб ўтишни ташкил қилиш учун жавобгар раҳбар станция",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "10",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Графикни жорий этиш норматив вақти",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "11",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "ААГни жорий этиш тўғрисида фармойиш",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "12",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                    r.jsxs("tr", {
                      className: "border-t border-gray-800",
                      children: [
                        r.jsx("td", {
                          colSpan: 2,
                          className: "border-r border-gray-800 p-2 text-sm",
                          children: "Изоҳ",
                        }),
                        r.jsx("td", {
                          className:
                            "border-r border-gray-800 p-2 text-center w-12 text-sm",
                          children: "13",
                        }),
                        r.jsx("td", {
                          className: "p-2",
                          children: r.jsx(s, {
                            control: e.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
    });
  },
  k = () => {
    const { t: d } = i(),
      t = l(),
      { id: e } = c(),
      o = n.useMemo(
        () => [
          { name: d("RTSI"), path: "rtsi", isActive: !1 },
          { name: d("Application"), path: "application", isActive: !1 },
          {
            name: d("Application document"),
            path: "application",
            isActive: !1,
          },
          {
            name: d(e ? "Edit" : "Create"),
            path: e ? `${e}/edit` : "create",
            isActive: !0,
          },
        ],
        [e, d],
      );
    return r.jsxs(r.Fragment, {
      children: [
        r.jsx(m, { className: "sticky top-0", breadcrumbs: o }),
        r.jsx(b, {
          children: r.jsx(p, {
            id: e,
            onSave: () => t("/rtsi/application"),
            onCancel: () => t("/rtsi/application"),
          }),
        }),
      ],
    });
  };
export { k as default };
