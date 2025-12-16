import {
  J as k,
  j as a,
  M as v,
  i as y,
  q as j,
  r as n,
} from "./index-ADhmmBpU.js";
import { P as E } from "./PageHeader-l3FtlNyv.js";
import { P as _ } from "./PageWrapper-D7EWSq9s.js";
import { u as f, c as I } from "./button-Bp2lHjov-bkEUXTzY.js";
import { l as x } from "./lodash-BI9_Ro3R.js";
import { H as P } from "./index.es-BKLEAvF1.js";
import { C as l } from "./card-indexes.constants-DqNyTkxE.js";
import { u as S } from "./useLists-DBTxrMAi.js";
import { S as T, u as b } from "./useDelete-DMNw96p5.js";
import { M as h } from "./MyTooltip-DPJtpMhP.js";
import { T as A } from "./trash-2-B_r_Bsxl.js";
import { C as N } from "./circle-plus-CJWL5GeC.js";
import "./sidebar-C0lF1Npi.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./useApi-BNT2PGFQ.js";
import "./MutateRequestMethod-D0dsk-6r.js";
const D = (e, t, r) => [
    { key: "code", dataIndex: "code", name: e("Code") },
    { key: "consumer", dataIndex: "consumer", name: e("Consumer") },
    { key: "verification", dataIndex: "verification", name: e("Verification") },
    { key: "signal_level", dataIndex: "signal_level", name: e("Signal level") },
    {
      key: "updated_at",
      dataIndex: "updated_at",
      name: e("Updated date"),
      render: (s) => k(s, v),
    },
    {
      key: "_id",
      dataIndex: "_id",
      name: e(""),
      render: (s) =>
        a.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            a.jsx(h, {
              content: e("Edit"),
              children: a.jsx(T, { className: "size-4", onClick: () => r(s) }),
            }),
            a.jsx(h, {
              content: e("Delete"),
              children: a.jsx(A, { className: "size-4", onClick: () => t(s) }),
            }),
          ],
        }),
    },
  ],
  M = () => {
    const { t: e } = f(),
      t = y(),
      { removeWithConfirm: r } = b([l]),
      { toast: s } = j(),
      { query: o, handleFilter: d, params: c } = S({ url: [l] }),
      i = n.useCallback(
        (m) => {
          r(m)
            .then(() => {
              (o.refetch(),
                s({
                  variant: "success",
                  title: e("Success"),
                  description: e("Card index removed successfully"),
                }));
            })
            .catch((p) => {
              s({
                variant: "destructive",
                title: e(`${x.get(p, "response.statusText", "Error")}`),
                description: e(
                  `${x.get(p, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [r, e, s, o],
      ),
      C = n.useCallback(() => {
        t("/card-indexes/create");
      }, [t]),
      u = n.useCallback(
        (m) => {
          t(`/card-indexes/edit/${m}`);
        },
        [t],
      ),
      g = n.useMemo(() => D(e, i, u), [e, i, u]);
    return {
      loading: o.isLoading,
      columns: g,
      dataSource: o.data,
      params: c,
      handleFilter: d,
      handleAdd: C,
    };
  },
  ee = () => {
    const { t: e } = f(),
      {
        loading: t,
        columns: r,
        dataSource: s,
        handleFilter: o,
        params: d,
        handleAdd: c,
      } = M(),
      i = n.useMemo(
        () => [{ name: e("Card index"), path: "/card-indexes", isActive: !0 }],
        [e],
      );
    return a.jsxs(a.Fragment, {
      children: [
        a.jsx(E, {
          className: "sticky top-0",
          breadcrumbs: i,
          children: a.jsxs(I, {
            size: "sm",
            onClick: c,
            children: [a.jsx(N, {}), e("Add new")],
          }),
        }),
        a.jsx(_, {
          children: a.jsx(P, {
            tableKey: l,
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            hasPagination: !0,
            loading: t,
            params: d,
            onParamChange: o,
            rowKey: "_id",
            dataSource: s,
            dataKey: "docs",
            columns: r,
          }),
        }),
      ],
    });
  };
export { ee as default };
