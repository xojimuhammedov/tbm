import { J as l, j as r, M as o } from "./index-ADhmmBpU.js";
import { l as n } from "./badge-DGmo3xSE-Cderfv3F.js";
import { M as d } from "./MyTooltip-DPJtpMhP.js";
import { E as x } from "./eye-CW1pDi29.js";
import { S as c } from "./useDelete-DMNw96p5.js";
import { T as m } from "./trash-2-B_r_Bsxl.js";
import { u as h } from "./button-Bp2lHjov-bkEUXTzY.js";
const p = (a) => {
    switch (a) {
      case "approved":
        return "green-outlined";
      case "sent":
        return "blue-outlined";
      case "rejected":
        return "red-outlined";
      default:
        return "gray-outlined";
    }
  },
  f = (a, i, e, s) => [
    { key: "description", dataIndex: "description", name: a("Description") },
    {
      key: "created_at",
      dataIndex: "created_at",
      name: a("Created time"),
      render: (t) => l(t, o),
    },
    {
      key: "status",
      dataIndex: "status",
      name: a("Status"),
      render: (t) => r.jsx(n, { variant: p(t), children: t }),
    },
    {
      key: "actions",
      dataIndex: "_id",
      name: "",
      render: (t) =>
        r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx(d, {
              content: a("View"),
              children: r.jsx(x, {
                className: "size-4 cursor-pointer",
                onClick: () => s(t),
              }),
            }),
            r.jsx(d, {
              content: a("Edit"),
              children: r.jsx(c, {
                className: "size-4 cursor-pointer",
                onClick: () => i(t),
              }),
            }),
            r.jsx(d, {
              content: a("Delete"),
              children: r.jsx(m, {
                className: "size-4 cursor-pointer",
                onClick: () => e(t),
              }),
            }),
          ],
        }),
    },
  ],
  k = ({ document: a, title: i }) => {
    const { t: e } = h();
    return r.jsx(r.Fragment, {
      children: r.jsx("div", {
        className: "p-4",
        children: r.jsxs("div", {
          className: "rounded-lg shadow-sm border p-6 space-y-3",
          children: [
            r.jsx("div", {
              className: "flex items-center justify-end",
              children: r.jsx("div", { className: "text-sm", children: i }),
            }),
            r.jsxs("div", {
              className: "text-center",
              children: [
                r.jsx("h2", {
                  className: "text-lg font-semibold",
                  children: e("V ilova"),
                }),
                r.jsx("p", {
                  className: "text-sm text-gray-300",
                  children: e("(Majburiy)"),
                }),
              ],
            }),
            r.jsx("p", {
              className: "text-center text-sm",
              children: e(
                "Rejaga oid ta'mirlash-sozlash ishlari qayidnomasi va uni to'ldrish tartibi",
              ),
            }),
            r.jsx("h3", {
              className: "text-lg font-semibold",
              children: e(
                "B.1 Rejaga oid ta'mirlash-sozlash ishlari qayidnomaning shakli",
              ),
            }),
            r.jsx("div", {
              className: "overflow-x-auto",
              children: r.jsxs("table", {
                className: "w-full border-collapse border border-gray-300",
                children: [
                  r.jsxs("thead", {
                    children: [
                      r.jsxs("tr", {
                        children: [
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            colSpan: 2,
                            children: e(
                              "Ishchi (O'lchashlari) amalga oshirish vaqti",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: e("NO nomeri"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: e(
                              "TE va OE tarmoqlari trafiklari(kanallari)ning belglanishi",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: e("Ishlar uchastkasi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: e(
                              "Aylanib o’tish va almashtirishlar grafigi",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: e(
                              "O’lchashlar hamda aylanib o’tishlar va almashtirishlar grafigini joriy qilish sababli ekspluatatsiyadan chiqariladigan iste’molchilar traktlari (kanallari)ning belgilanishi, aloqalarining nomerlari",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: e("Profilaktika turi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: e("Eslatma"),
                          }),
                        ],
                      }),
                      r.jsxs("tr", {
                        children: [
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            children: e("Sana, Oy"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            children: e("Soat minutlar"),
                          }),
                        ],
                      }),
                      r.jsxs("tr", {
                        children: [
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-16",
                            children: "1",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium",
                            children: "2",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "3",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "4",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "5",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-24",
                            children: "6",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "7",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "8",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "9",
                          }),
                        ],
                      }),
                    ],
                  }),
                  r.jsx("tbody", {
                    children:
                      a == null
                        ? void 0
                        : a.map((s, t) =>
                            r.jsxs(
                              "tr",
                              {
                                className: "hover:bg-gray-50",
                                children: [
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1 text-center text-sm font-medium",
                                    children: s.date,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.minute,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.noNumber,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.teOeDesignation,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.workArea,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.rerouteSchedule,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.consumersDesignation,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.prophylaxisType,
                                  }),
                                  r.jsx("td", {
                                    className:
                                      "border border-gray-300 px-1 py-1",
                                    children: s.note,
                                  }),
                                ],
                              },
                              t,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    });
  };
export { k as F, f as c };
