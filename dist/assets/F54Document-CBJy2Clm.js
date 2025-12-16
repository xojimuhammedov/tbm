import { J as d, j as r, M as n } from "./index-ADhmmBpU.js";
import { l as o } from "./badge-DGmo3xSE-Cderfv3F.js";
import { M as i } from "./MyTooltip-DPJtpMhP.js";
import { E as h } from "./eye-CW1pDi29.js";
import { S as p } from "./useDelete-DMNw96p5.js";
import { T as c } from "./trash-2-B_r_Bsxl.js";
import { u as y } from "./button-Bp2lHjov-bkEUXTzY.js";
const b = (e) => {
    switch (e) {
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
  I = (e, a, x, l) => [
    {
      key: "channel_id",
      dataIndex: "channel_id",
      name: e("Kanal"),
      render: (s) => (s == null ? void 0 : s.code) || "",
    },
    { key: "workArea", dataIndex: "workArea", name: e("Ishlar uchastkasi") },
    {
      key: "ubpZone",
      dataIndex: "ubpZone",
      name: e("UBP zonasi"),
      render: (s) => s.map((t) => r.jsx("div", { children: t }, t)),
    },
    {
      key: "minute",
      dataIndex: "minute",
      name: e("O'tkazish uchun belgilangan vaqt"),
    },
    {
      key: "real_minutes",
      dataIndex: "real_minutes",
      name: e("Ishlarni o'tkazishning haqiqiy vaqti"),
    },
    { key: "description", dataIndex: "description", name: e("Description") },
    {
      key: "created_at",
      dataIndex: "created_at",
      name: e("Created time"),
      render: (s) => d(s, n),
    },
    {
      key: "status",
      dataIndex: "status",
      name: e("Status"),
      render: (s) => r.jsx(o, { variant: b(s), children: s }),
    },
    {
      key: "actions",
      dataIndex: "_id",
      name: "",
      render: (s) =>
        r.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            r.jsx(i, {
              content: e("View"),
              children: r.jsx(h, {
                className: "size-4 cursor-pointer",
                onClick: () => l(s),
              }),
            }),
            r.jsx(i, {
              content: e("Edit"),
              children: r.jsx(p, {
                className: "size-4 cursor-pointer",
                onClick: () => a(s),
              }),
            }),
            r.jsx(i, {
              content: e("Delete"),
              children: r.jsx(c, {
                className: "size-4 cursor-pointer",
                onClick: () => x(s),
              }),
            }),
          ],
        }),
    },
  ],
  S = ({ document: e }) => {
    const { t: a } = y();
    return r.jsx(r.Fragment, {
      children: r.jsx("div", {
        className: "bg-gray-50 p-4",
        children: r.jsxs("div", {
          className: "rounded-lg shadow-sm border p-6 space-y-3",
          children: [
            r.jsx("div", {
              className: "flex items-center justify-end",
              children: r.jsx("div", {
                className: "text-sm",
                children: a("RH 45-232/2025"),
              }),
            }),
            r.jsxs("div", {
              className: "text-center",
              children: [
                r.jsx("h2", {
                  className: "text-lg font-semibold",
                  children: a("V ilova"),
                }),
                r.jsx("p", {
                  className: "text-sm text-gray-300",
                  children: a("(Majburiy)"),
                }),
              ],
            }),
            r.jsx("p", {
              className: "text-center text-sm",
              children: a(
                "Rejaga oid ta'mirlash-sozlash ishlari qayidnomasi va uni to'ldrish tartibi",
              ),
            }),
            r.jsx("h3", {
              className: "text-lg font-semibold",
              children: a(
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
                            children: a(
                              "RTSI, RTTSI ni o'tkazish sanasi va vaqti",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: a("Ishlarni o'tkazishning haqiqiy vaqti"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-15",
                            rowSpan: 2,
                            children: a("Kanal kodi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: a("NO nomeri"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            rowSpan: 2,
                            children: a(
                              "O'lchanadigan TE va OE tarmoqlari kanallarining belglanishi",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: a("Ishlar uchastkasi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: a("Profilaktika turi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: a(
                              "Ishlarini o'tkazish yoki bekor qilish sababi",
                            ),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: a("UBP zonasi"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            rowSpan: 2,
                            children: a("Eslatma"),
                          }),
                        ],
                      }),
                      r.jsxs("tr", {
                        children: [
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs",
                            children: a("Sana, Oy"),
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs w-12",
                            children: a("Soat minutlar"),
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
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-15",
                            children: "4",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "5",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "6",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "7",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-24",
                            children: "8",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "9",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-20",
                            children: "10",
                          }),
                          r.jsx("th", {
                            className:
                              "border border-gray-300 px-1 py-1 text-xs font-medium w-12",
                            children: "11",
                          }),
                        ],
                      }),
                    ],
                  }),
                  r.jsx("tbody", {
                    children: r.jsxs("tr", {
                      className: "hover:bg-gray-50",
                      children: [
                        r.jsx("td", {
                          className:
                            "border border-gray-300 px-1 py-1 text-center text-sm font-medium text-gray-700",
                          children: e == null ? void 0 : e.date,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.minute,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.real_minutes,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.channel_id.code,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.noNumber,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.teOeDesignation,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.workArea,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.prophylaxisType,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.cause,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.ubpZone,
                        }),
                        r.jsx("td", {
                          className: "border border-gray-300 px-1 py-1",
                          children: e == null ? void 0 : e.note,
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    });
  };
export { S as F, I as c };
