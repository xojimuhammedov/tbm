import { i as N, q as V, r as a, j as e } from "./index-ADhmmBpU.js";
import { P as E } from "./PageHeader-l3FtlNyv.js";
import { u as d, c as T } from "./button-Bp2lHjov-bkEUXTzY.js";
import { c as A, F as I } from "./F54Document-CBJy2Clm.js";
import { u as S } from "./useLists-DBTxrMAi.js";
import { u as q, F as j } from "./useF54Document-SmdNDJqk.js";
import { l as b } from "./lodash-BI9_Ro3R.js";
import { u as M } from "./useDelete-DMNw96p5.js";
import { M as L } from "./MyModal-3lICjm9q.js";
import { D as P } from "./DocumentInfo-DZJr13Om.js";
import { F as R } from "./MyAccordion-x3W9CRJW.js";
import { L as m } from "./ListStatisticsCard-BcOJa2-j.js";
import { C as $ } from "./circle-plus-CJWL5GeC.js";
import "./sidebar-C0lF1Npi.js";
import "./badge-DGmo3xSE-Cderfv3F.js";
import "./MyTooltip-DPJtpMhP.js";
import "./eye-CW1pDi29.js";
import "./trash-2-B_r_Bsxl.js";
import "./useApi-BNT2PGFQ.js";
import "./useQueryParams-Dns8Zny6.js";
import "./useGetOne-DA0KuYmv.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./user-D-Egm9vv.js";
const z = () => {
    var g;
    const { t: s } = d(),
      t = N(),
      { toast: r } = V(),
      [i, l] = a.useState(!1),
      [n, u] = a.useState(null),
      { removeWithConfirm: p } = M([j]),
      { query: c, handleFilter: w, params: F } = S({ url: [j] }),
      { f54DocumentQuery: C } = q(n),
      y = a.useCallback(() => {
        t("/gras/c-231/create");
      }, [t]),
      h = a.useCallback(
        (o) => {
          t(`/gras/c-231/edit/${o}`);
        },
        [t],
      ),
      x = a.useCallback(
        (o) => {
          p(o)
            .then(() => {
              (c.refetch(),
                r({
                  variant: "success",
                  title: s("Success"),
                  description: s("F54 document successfully"),
                }));
            })
            .catch((v) => {
              r({
                variant: "destructive",
                title: s(`${b.get(v, "response.statusText", "Error")}`),
                description: s(
                  `${b.get(v, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [p, s, r],
      ),
      f = a.useCallback((o) => {
        (u(o), l(!0));
      }, []),
      D = a.useCallback((o) => {
        (l(o), o || u(null));
      }, []),
      k = a.useMemo(() => A(s, h, x, f), [x, h, f, s]);
    return {
      params: F,
      handleAdd: y,
      handleFilter: w,
      loading: c.isLoading,
      dataSource: c.data,
      columns: k,
      openView: i,
      currentItem: (g = C.data) == null ? void 0 : g.data,
      handleCloseView: D,
    };
  },
  K = ({ open: s, onOpenChange: t, document: r }) => {
    const { t: i } = d();
    return e.jsx(L, {
      open: s,
      onOpenChange: t,
      size: "8xl",
      className: "overflow-auto",
      header: e.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          e.jsx(R, { className: "h-5 w-5" }),
          e.jsx("span", { children: "F-54 document" }),
        ],
      }),
      children: e.jsxs("div", {
        className: "flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden",
        children: [
          e.jsx("div", {
            className: `
            flex-4/5 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          `,
            children: e.jsx(I, { document: r }),
          }),
          e.jsx(P, { docType: i("F54"), onOpenChange: t, document: r }),
        ],
      }),
    });
  },
  de = () => {
    const { t: s } = d(),
      { handleAdd: t, openView: r, currentItem: i, handleCloseView: l } = z(),
      n = a.useMemo(
        () => [
          { name: s("RTSI"), path: "/rtsi", isActive: !1 },
          { name: s("F-54 document"), path: "/rtsi/f-54", isActive: !0 },
        ],
        [s],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(K, { open: r, onOpenChange: l, document: i }),
        e.jsx(E, {
          className: "sticky top-0",
          breadcrumbs: n,
          children: e.jsxs(T, {
            size: "sm",
            onClick: t,
            children: [e.jsx($, {}), s("Add new")],
          }),
        }),
        e.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3",
          children: [
            e.jsx(m, { title: s("Tasdiqlanganlar"), count: 123 }),
            e.jsx(m, { title: s("Ko'rib chiqilmoqda"), count: 123 }),
            e.jsx(m, { title: s("Rad etilganlar"), count: 123 }),
          ],
        }),
      ],
    });
  };
export { de as default };
