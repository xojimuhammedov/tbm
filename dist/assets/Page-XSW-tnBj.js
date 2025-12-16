import { J as p, j as e, a as k, M as f, r as n } from "./index-ADhmmBpU.js";
import { P as _ } from "./PageHeader-l3FtlNyv.js";
import { P as C } from "./PageWrapper-D7EWSq9s.js";
import "./lodash-BI9_Ro3R.js";
import { H as T } from "./index.es-BKLEAvF1.js";
import { L as u } from "./ListStatisticsCard-BcOJa2-j.js";
import { u as M } from "./useLists-DBTxrMAi.js";
import { l as S } from "./badge-DGmo3xSE-Cderfv3F.js";
import { M as z } from "./MyTooltip-DPJtpMhP.js";
import { F as v } from "./file-8TEH2UwQ.js";
import { E as V } from "./eye-CW1pDi29.js";
import { u as E } from "./useGetOne-DA0KuYmv.js";
import { u as d, c as j } from "./button-Bp2lHjov-bkEUXTzY.js";
import { M as A } from "./MyModal-3lICjm9q.js";
import { T as F } from "./TelevisionDocument-WwBADac1.js";
import { C as H, M as P, F as q } from "./MyAccordion-x3W9CRJW.js";
import { U as K } from "./user-D-Egm9vv.js";
import "./sidebar-C0lF1Npi.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./useApi-BNT2PGFQ.js";
const Q = (r) => {
    switch (r) {
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
  R = (r, i) => [
    {
      key: "title",
      dataIndex: "title",
      name: r("Document"),
      render: (s, a) => {
        const t =
          a.files && a.files[0] ? `${k.BASE_PATH}${a.files[0]}` : void 0;
        return t
          ? e.jsxs("a", {
              className: "flex items-center gap-2 cursor-pointer",
              href: t,
              target: "_blank",
              children: [e.jsx(v, { size: 15 }), " ", s],
            })
          : e.jsxs("div", {
              className: "flex items-center gap-2",
              children: [e.jsx(v, { size: 15 }), " ", s],
            });
      },
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      name: r("Sent time"),
      render: (s) => (s ? p(s, f) : "-"),
    },
    {
      key: "sender",
      dataIndex: "creatorId",
      name: r("Sender"),
      render: (s) =>
        e.jsxs("div", {
          children: [
            s == null ? void 0 : s.first_name,
            " ",
            s == null ? void 0 : s.second_name,
          ],
        }),
    },
    {
      key: "status",
      dataIndex: "status",
      name: r("Status"),
      render: (s) => e.jsx(S, { variant: Q(s), children: s || "-" }),
    },
    {
      key: "actions",
      dataIndex: "_id",
      name: "",
      render: (s) =>
        e.jsx("div", {
          className: "flex items-center gap-2",
          children: e.jsx(z, {
            content: r("View"),
            children: e.jsx(V, {
              className: "size-4 cursor-pointer",
              onClick: () => i(s),
            }),
          }),
        }),
    },
  ],
  g = "television",
  D = (r) => ({
    inboxQuery: E({ url: [g, r || ""], options: { enabled: !!r } }),
  }),
  L = () => {
    var b;
    const { t: r } = d(),
      [i, s] = n.useState(!1),
      [a, t] = n.useState(null),
      {
        query: o,
        handleFilter: x,
        params: m,
      } = M({ url: [g], defaultParams: { inbox: !0 } }),
      { inboxQuery: h } = D(a),
      c = n.useCallback((l) => {
        (t(l), s(!0));
      }, []),
      y = n.useCallback((l) => {
        console.log(l);
      }, []),
      N = n.useCallback((l) => {
        console.log(l);
      }, []),
      w = n.useCallback((l) => {
        (s(l), l || t(null));
      }, []),
      I = n.useMemo(() => R(r, c), [c, r]);
    return {
      params: m,
      handleFilter: x,
      loading: o.isLoading,
      dataSource: o.data,
      columns: I,
      openView: i,
      currentItem: (b = h.data) == null ? void 0 : b.data,
      handleCloseView: w,
      handleAccept: y,
      handleReject: N,
    };
  },
  Y = ({ docType: r, onOpenChange: i, document: s }) => {
    const { t: a } = d();
    return e.jsxs("div", {
      className: `
            w-full xl:w-1/2 flex flex-col border rounded-lg
            xl:max-h-[80vh]
          `,
      children: [
        e.jsxs("div", {
          className: `
              flex-1 overflow-y-auto p-4 space-y-4
              scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
            `,
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("span", {
                  className: "font-medium text-base",
                  children: a("Ariza haqida"),
                }),
                e.jsxs("div", {
                  className: "border rounded-lg p-4 space-y-2 mt-2",
                  children: [
                    e.jsxs("div", {
                      className: "grid grid-cols-2 gap-4 mb-4",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("div", {
                              className: "text-xs mb-1",
                              children: a("Ariza yuboruvchi"),
                            }),
                            e.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                e.jsx("div", {
                                  className:
                                    "w-6 h-6 rounded-full flex items-center justify-center",
                                  children: e.jsx(K, { className: "size-5" }),
                                }),
                                e.jsx("span", {
                                  className: "text-sm font-medium",
                                  children:
                                    s == null ? void 0 : s.creatorId.first_name,
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("div", {
                              className: "text-xs mb-1",
                              children: a("Yuborilgan vaqt"),
                            }),
                            e.jsx("div", {
                              className: "text-sm",
                              children: p(s == null ? void 0 : s.created_at, f),
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          className: "text-xs mb-1",
                          children: a("Hujjat turi"),
                        }),
                        e.jsx("div", {
                          className: "text-sm font-medium",
                          children: r,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("div", {
              children: [
                e.jsx("div", {
                  className: "font-medium text-base",
                  children: a("Hujjat yuborilish tarixi"),
                }),
                s == null
                  ? void 0
                  : s.recipientIds.map((t) =>
                      e.jsxs(
                        "div",
                        {
                          className: "border rounded-lg p-2 mt-2",
                          children: [
                            e.jsxs("div", {
                              className: "flex items-center justify-between",
                              children: [
                                e.jsxs("div", {
                                  className: "flex items-center gap-1",
                                  children: [
                                    e.jsx(H, {
                                      className: "size-7 text-white",
                                      fill: "green",
                                    }),
                                    e.jsx("span", {
                                      children: a("Hujjat yuborildi"),
                                    }),
                                  ],
                                }),
                                e.jsx("span", {
                                  className:
                                    "text-body-sm-medium text-secondary",
                                  children: p(
                                    s == null ? void 0 : s.created_at,
                                    f,
                                  ),
                                }),
                              ],
                            }),
                            e.jsx(P, {
                              title: e.jsxs("div", {
                                className:
                                  "flex justify-between w-full cursor-pointer px-3",
                                children: [
                                  e.jsxs("div", {
                                    children: [
                                      t.first_name,
                                      " ",
                                      t.second_name,
                                    ],
                                  }),
                                  e.jsx("div", { children: "Izoh" }),
                                ],
                              }),
                              children: e.jsx("div", {
                                className:
                                  "space-y-1 text-sm text-gray-700 px-4 py-2",
                                children: s == null ? void 0 : s.description,
                              }),
                            }),
                          ],
                        },
                        t._id,
                      ),
                    ),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "border-t sticky bottom-0 p-3 flex justify-between",
          children: [
            e.jsx(j, {
              className: "bg-secondary",
              onClick: () => i(!1),
              children: a("Yopish"),
            }),
            e.jsxs("div", {
              className: "flex gap-2",
              children: [
                e.jsx(j, { variant: "destructive", children: a("Rad etish") }),
                e.jsx(j, { variant: "default", children: a("Qabul qilish") }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  B = ({ open: r, onOpenChange: i, document: s }) => {
    const { t: a } = d();
    return e.jsx(A, {
      open: r,
      onOpenChange: i,
      size: "8xl",
      className: "overflow-auto",
      header: e.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          e.jsx(q, { className: "size-5" }),
          e.jsx("span", {
            children: (s == null ? void 0 : s.title) || "Television document",
          }),
        ],
      }),
      children: e.jsxs("div", {
        className: "flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden",
        children: [
          e.jsx("div", {
            className: `
            flex-1 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          `,
            children: e.jsx(F, {
              title: s == null ? void 0 : s.title,
              document: s,
            }),
          }),
          e.jsx(Y, { docType: a("Television"), onOpenChange: i, document: s }),
        ],
      }),
    });
  },
  pe = () => {
    const { t: r } = d(),
      {
        loading: i,
        dataSource: s,
        columns: a,
        params: t,
        handleFilter: o,
        currentItem: x,
        handleCloseView: m,
        openView: h,
      } = L(),
      c = n.useMemo(
        () => [{ name: r("Inboxes"), path: "/inbox", isActive: !0 }],
        [r],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(B, { open: h, onOpenChange: m, document: x }),
        e.jsx(_, { className: "sticky top-0", breadcrumbs: c }),
        e.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3",
          children: [
            e.jsx(u, { title: r("Tasdiqlanganlar"), count: 123 }),
            e.jsx(u, { title: r("Ko'rib chiqilmoqda"), count: 123 }),
            e.jsx(u, { title: r("Rad etilganlar"), count: 123 }),
          ],
        }),
        e.jsx(C, {
          children: e.jsx(T, {
            tableKey: "television-documents",
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            loading: i,
            params: t,
            onParamChange: o,
            rowKey: "_id",
            dataSource: s,
            dataKey: "docs",
            columns: a,
          }),
        }),
      ],
    });
  };
export { pe as default };
