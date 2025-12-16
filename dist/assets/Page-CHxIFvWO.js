import { j as a, i as g, q as k, r as o } from "./index-ADhmmBpU.js";
import { P as y } from "./PageHeader-l3FtlNyv.js";
import { P as b } from "./PageWrapper-D7EWSq9s.js";
import { u as C, c as j } from "./button-Bp2lHjov-bkEUXTzY.js";
import { l as h } from "./lodash-BI9_Ro3R.js";
import { H as S } from "./index.es-BKLEAvF1.js";
import { C as l } from "./channels.constants-CEa8zlM5.js";
import { u as v } from "./useLists-DBTxrMAi.js";
import { S as E, u as P } from "./useDelete-DMNw96p5.js";
import { M as x } from "./MyTooltip-DPJtpMhP.js";
import { T as I } from "./trash-2-B_r_Bsxl.js";
import { C as N } from "./circle-plus-CJWL5GeC.js";
import "./sidebar-C0lF1Npi.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./useApi-BNT2PGFQ.js";
import "./MutateRequestMethod-D0dsk-6r.js";
const A = (e, s, n) => [
    { key: "id_number", dataIndex: "id_number", name: e("Code") },
    {
      key: "consumer_name",
      dataIndex: "consumer_name",
      name: e("Stream identifier"),
    },
    {
      key: "connection_number",
      dataIndex: "connection_number",
      name: e("Channel identifier"),
    },
    { key: "point_a", dataIndex: "point_a", name: e("Site A") },
    { key: "point_b", dataIndex: "point_b", name: e("Site Z") },
    {
      key: "_id",
      dataIndex: "_id",
      name: e(""),
      render: (t) =>
        a.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            a.jsx(x, {
              content: e("Edit"),
              children: a.jsx(E, { className: "size-4", onClick: () => n(t) }),
            }),
            a.jsx(x, {
              content: e("Delete"),
              children: a.jsx(I, { className: "size-4", onClick: () => s(t) }),
            }),
          ],
        }),
    },
  ],
  T = () => {
    const { t: e } = C(),
      s = g(),
      { removeWithConfirm: n } = P([l]),
      { toast: t } = k(),
      { query: r, handleFilter: c, params: m } = v({ url: [l] }),
      i = o.useCallback(
        (d) => {
          n(d)
            .then(() => {
              (r.refetch(),
                t({
                  variant: "success",
                  title: e("Success"),
                  description: e("Channel removed successfully"),
                }));
            })
            .catch((p) => {
              t({
                variant: "destructive",
                title: e(`${h.get(p, "response.statusText", "Error")}`),
                description: e(
                  `${h.get(p, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [n, e, t, r],
      ),
      f = o.useCallback(() => {
        s("/channels-id/create");
      }, [s]),
      u = o.useCallback(
        (d) => {
          s(`/channels-id/edit/${d}`);
        },
        [s],
      ),
      _ = o.useMemo(() => A(e, i, u), [e, i, u]);
    return {
      loading: r.isLoading,
      columns: _,
      dataSource: r.data,
      params: m,
      handleFilter: c,
      handleAdd: f,
    };
  },
  V = () => {
    const { t: e } = C(),
      {
        loading: s,
        columns: n,
        dataSource: t,
        handleFilter: r,
        params: c,
        handleAdd: m,
      } = T(),
      i = o.useMemo(
        () => [{ name: e("Channels ID"), path: "/channels-id", isActive: !0 }],
        [e],
      );
    return a.jsxs(a.Fragment, {
      children: [
        a.jsx(y, {
          className: "sticky top-0",
          breadcrumbs: i,
          children: a.jsxs(j, {
            size: "sm",
            onClick: m,
            children: [a.jsx(N, {}), e("Add new")],
          }),
        }),
        a.jsx(b, {
          children: a.jsx(S, {
            tableKey: l,
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            hasPagination: !0,
            loading: s,
            params: c,
            onParamChange: r,
            rowKey: "_id",
            dataSource: t,
            dataKey: "docs",
            columns: n,
          }),
        }),
      ],
    });
  };
export { V as default };
