import { i as E, q as S, r as a, j as s } from "./index-ADhmmBpU.js";
import { P as T } from "./PageHeader-l3FtlNyv.js";
import { u as d, c as A } from "./button-Bp2lHjov-bkEUXTzY.js";
import { c as I, F as q } from "./F56Document-KH1e5gbK.js";
import { u as M } from "./useLists-DBTxrMAi.js";
import { u as L, F as b } from "./useF56Document-DUDGEvHE.js";
import { u as P } from "./useDelete-DMNw96p5.js";
import { l as w } from "./lodash-BI9_Ro3R.js";
import { M as R } from "./MyModal-3lICjm9q.js";
import { D as $ } from "./DocumentInfo-DZJr13Om.js";
import { F as z } from "./MyAccordion-x3W9CRJW.js";
import { L as m } from "./ListStatisticsCard-BcOJa2-j.js";
import { C as K } from "./circle-plus-CJWL5GeC.js";
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
const Q = () => {
    var v;
    const { t: e } = d(),
      r = E(),
      { toast: t } = S(),
      [i, l] = a.useState(null),
      [n, u] = a.useState(!1),
      [F, p] = a.useState(null),
      { removeWithConfirm: h } = P([b]),
      { query: c, handleFilter: C, params: y } = M({ url: [b] }),
      { f56DocumentQuery: D } = L(F),
      k = a.useCallback(() => {
        r("/gras/d-231/create");
      }, [r]),
      x = a.useCallback(
        (o) => {
          (l(o), r(`/gras/d-231/edit/${o}`));
        },
        [r],
      ),
      f = a.useCallback(
        (o) => {
          h(o)
            .then(() => {
              (c.refetch(),
                t({
                  variant: "success",
                  title: e("Success"),
                  description: e("F56 document successfully"),
                }));
            })
            .catch((j) => {
              t({
                variant: "destructive",
                title: e(`${w.get(j, "response.statusText", "Error")}`),
                description: e(
                  `${w.get(j, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [h, e, t],
      ),
      g = a.useCallback((o) => {
        (p(o), u(!0));
      }, []),
      N = a.useCallback((o) => {
        (u(o), o || p(null));
      }, []),
      V = a.useMemo(() => I(e, x, f, g), [f, x, g, e]);
    return {
      params: y,
      handleAdd: k,
      handleFilter: C,
      loading: c.isLoading,
      dataSource: c.data,
      columns: V,
      id: i,
      openView: n,
      currentItem: (v = D.data) == null ? void 0 : v.data,
      handleCloseView: N,
    };
  },
  Y = ({ open: e, onOpenChange: r, document: t }) => {
    const { t: i } = d();
    return s.jsx(R, {
      open: e,
      onOpenChange: r,
      size: "8xl",
      className: "overflow-auto",
      header: s.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          s.jsx(z, { className: "h-5 w-5" }),
          s.jsx("span", {
            children: (t == null ? void 0 : t.title) || "F-56 document",
          }),
        ],
      }),
      children: s.jsxs("div", {
        className: "flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden",
        children: [
          s.jsx("div", {
            className: `
            flex-4/5 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          `,
            children: s.jsx(q, {
              title: t == null ? void 0 : t.title,
              document: t == null ? void 0 : t.documents,
            }),
          }),
          s.jsx($, { docType: i("F56"), onOpenChange: r, document: t }),
        ],
      }),
    });
  },
  ps = () => {
    const { t: e } = d(),
      { handleAdd: r, openView: t, currentItem: i, handleCloseView: l } = Q(),
      n = a.useMemo(
        () => [
          { name: e("RTSI"), path: "/rtsi", isActive: !1 },
          { name: e("F-56 document"), path: "/rtsi/f-56", isActive: !0 },
        ],
        [e],
      );
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx(Y, { open: t, onOpenChange: l, document: i }),
        s.jsx(T, {
          className: "sticky top-0",
          breadcrumbs: n,
          children: s.jsxs(A, {
            size: "sm",
            onClick: r,
            children: [s.jsx(K, {}), e("Add new")],
          }),
        }),
        s.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3",
          children: [
            s.jsx(m, { title: e("Tasdiqlanganlar"), count: 123 }),
            s.jsx(m, { title: e("Ko'rib chiqilmoqda"), count: 123 }),
            s.jsx(m, { title: e("Rad etilganlar"), count: 123 }),
          ],
        }),
      ],
    });
  };
export { ps as default };
