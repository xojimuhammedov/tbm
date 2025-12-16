import { j as s, i as k, q as N, r } from "./index-ADhmmBpU.js";
import { P as V } from "./PageHeader-l3FtlNyv.js";
import { u as m, c as E } from "./button-Bp2lHjov-bkEUXTzY.js";
import { M as I } from "./MyModal-3lICjm9q.js";
import { A as P, c as T } from "./createApplicationColumns-BV7-RfVS.js";
import { D as M } from "./DocumentInfo-DZJr13Om.js";
import { F } from "./MyAccordion-x3W9CRJW.js";
import { u as S } from "./useLists-DBTxrMAi.js";
import { u as z, A as p } from "./useApplicationDocument-C6bKJL3W.js";
import { u as L } from "./useDelete-DMNw96p5.js";
import { l as b } from "./lodash-BI9_Ro3R.js";
import { C as R } from "./circle-plus-CJWL5GeC.js";
import "./sidebar-C0lF1Npi.js";
import "./badge-DGmo3xSE-Cderfv3F.js";
import "./MyTooltip-DPJtpMhP.js";
import "./useMutate-B2j67kPQ.js";
import "./useApi-BNT2PGFQ.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./index.es-njk8-3Q7.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./eye-CW1pDi29.js";
import "./trash-2-B_r_Bsxl.js";
import "./user-D-Egm9vv.js";
import "./useQueryParams-Dns8Zny6.js";
import "./useGetOne-DA0KuYmv.js";
const $ = ({ open: e, onOpenChange: a, document: t }) => {
    const { t: l } = m();
    return s.jsx(I, {
      open: e,
      onOpenChange: a,
      size: "8xl",
      className: "overflow-auto",
      header: s.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          s.jsx(F, { className: "size-5" }),
          s.jsx("span", {
            children: (t == null ? void 0 : t.title) || "Application document",
          }),
        ],
      }),
      children: s.jsxs("div", {
        className: "flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden",
        children: [
          s.jsx("div", {
            className: `
            flex-1 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          `,
            children: s.jsx(P, {
              title: t == null ? void 0 : t.title,
              document: t,
            }),
          }),
          s.jsx(M, { docType: l("Application"), onOpenChange: a, document: t }),
        ],
      }),
    });
  },
  q = () => {
    var v;
    const { t: e } = m(),
      a = k(),
      { toast: t } = N(),
      [l, n] = r.useState(!1),
      [c, u] = r.useState(null),
      { removeWithConfirm: d } = L([p]),
      { query: i, handleFilter: g, params: j } = S({ url: [p] }),
      { applicationDocumentQuery: w } = z(c),
      C = r.useCallback(() => {
        a("/rh-252/a-252/create");
      }, [a]),
      h = r.useCallback(
        (o) => {
          a(`/rh-252/a-252/edit/${o}`);
        },
        [a],
      ),
      f = r.useCallback((o) => {
        (u(o), n(!0));
      }, []),
      y = r.useCallback((o) => {
        (n(o), o || u(null));
      }, []),
      x = r.useCallback(
        (o) => {
          d(o)
            .then(() => {
              (i.refetch(),
                t({
                  variant: "success",
                  title: e("Success"),
                  description: e("Application document successfully deleted"),
                }));
            })
            .catch((A) => {
              t({
                variant: "destructive",
                title: e(`${b.get(A, "response.statusText", "Error")}`),
                description: e(
                  `${b.get(A, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [i, d, e, t],
      ),
      D = r.useMemo(
        () =>
          T(e, h, x, f, [p], () => {
            i.refetch();
          }),
        [x, h, f, i, e],
      );
    return {
      params: j,
      handleAdd: C,
      handleFilter: g,
      loading: i.isLoading,
      dataSource: i.data,
      columns: D,
      openView: l,
      currentItem: (v = w.data) == null ? void 0 : v.data,
      handleCloseView: y,
    };
  },
  ue = () => {
    const { t: e } = m(),
      { handleAdd: a, currentItem: t, handleCloseView: l, openView: n } = q(),
      c = r.useMemo(
        () => [
          { name: e("RH 252"), path: "/rh-252", isActive: !1 },
          { name: e("A application"), path: "/rh-252/a-252", isActive: !0 },
        ],
        [e],
      );
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx($, { open: n, onOpenChange: l, document: t }),
        s.jsx(V, {
          className: "sticky top-0",
          breadcrumbs: c,
          children: s.jsxs(E, {
            size: "sm",
            onClick: a,
            children: [s.jsx(R, {}), e("Add new")],
          }),
        }),
      ],
    });
  };
export { ue as default };
