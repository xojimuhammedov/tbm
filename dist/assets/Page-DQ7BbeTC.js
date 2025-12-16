import {
  a as g,
  q as E,
  r as o,
  j as s,
  k as v,
  z as R,
  J as A,
  M as F,
} from "./index-ADhmmBpU.js";
import { P as I } from "./PageHeader-l3FtlNyv.js";
import { P as O } from "./PageWrapper-D7EWSq9s.js";
import { u as f, c as q } from "./button-Bp2lHjov-bkEUXTzY.js";
import { l as h } from "./lodash-BI9_Ro3R.js";
import { H as _ } from "./index.es-BKLEAvF1.js";
import { M as L } from "./MyModal-3lICjm9q.js";
import { R as u, P as w, U as z } from "./role.constants-C6vKkRrP.js";
import "./index.es-njk8-3Q7.js";
import "./sidebar-C0lF1Npi.js";
import { F as D } from "./FormContainerFooter-M0H-Jjey.js";
import { u as U } from "./useGetOne-DA0KuYmv.js";
import { u as K, a as H } from "./useMutate-B2j67kPQ.js";
import { o as Y, b as $, s as C, a as G } from "./zod-BQt-Wj8X.js";
import { M } from "./MutateRequestMethod-D0dsk-6r.js";
import { u as N, M as Q } from "./useLists-DBTxrMAi.js";
import { S as V } from "./MySelect-CDOMHlry-CVNRsqeU.js";
import { S as W, u as B } from "./useDelete-DMNw96p5.js";
import { M as P } from "./MyTooltip-DPJtpMhP.js";
import { l as J } from "./badge-DGmo3xSE-Cderfv3F.js";
import { T as X } from "./trash-2-B_r_Bsxl.js";
import { C as Z } from "./circle-plus-CJWL5GeC.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./Spin-D_PNnV0x.js";
import "./useApi-BNT2PGFQ.js";
const ee = (e) =>
    Y({
      name: C().nonempty(
        e("required {{field}}", {
          field: e("First name"),
          ns: g.LANG.NS.VALIDATION,
        }),
      ),
      permissions: $(C()).nonempty(
        e("required {{field}}", {
          field: e("Permissions"),
          ns: g.LANG.NS.VALIDATION,
        }),
      ),
    }),
  se = ({ id: e, onSave: n }) => {
    const { t } = f(),
      { toast: a } = E(),
      r = o.useMemo(() => ee(t), [t]),
      l = K({ resolver: G(r) }),
      c = U({ url: [u, e || ""], options: { enabled: !!e } }),
      { query: m } = H({
        url: [u, e || ""],
        method: e ? M.PUT : M.POST,
        options: {
          onError: (i) => {
            a({
              variant: "destructive",
              title: t(`${h.get(i, "response.statusText", "Error")}`),
              description: t(
                `${h.get(i, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (l.reset(),
              n == null || n(),
              a({
                variant: "success",
                title: t("Success"),
                description: t(
                  e
                    ? "Staff updated successfully"
                    : "Staff created successfully",
                ),
              }));
          },
        },
      });
    o.useEffect(() => {
      const i = c.data;
      i && l.reset({ name: i.name, permissions: i.permissions });
    }, [c.data, l]);
    const d = o.useCallback(
      (i) => {
        m.mutate(i);
      },
      [m],
    );
    return { form: l, onSubmit: d };
  },
  te = () => {
    const { query: e } = N({ url: [w], defaultParams: { page: 1, limit: Q } });
    return {
      permissionOptions: o.useMemo(() => {
        var t, a;
        return (a = (t = e.data) == null ? void 0 : t.docs) == null
          ? void 0
          : a.map((r) => ({ label: r.name, value: r.value }));
      }, [e.data]),
    };
  },
  ae = ({ id: e, onSave: n }) => {
    const { t } = f(),
      { permissionOptions: a } = te(),
      { form: r, onSubmit: l } = se({ id: e, onSave: n });
    return s.jsx(v, {
      ...r,
      children: s.jsxs("form", {
        onSubmit: r.handleSubmit(l),
        className: "space-y-4",
        children: [
          s.jsx(R, {
            control: r.control,
            name: "name",
            label: t("Role"),
            placeholder: t("Enter role"),
            required: !0,
          }),
          s.jsx(V, {
            control: r.control,
            name: "permissions",
            options: a || [],
            label: t("Permissions"),
            placeholder: t("Select permission"),
            isClearable: !0,
            required: !0,
            isMulti: !0,
          }),
          s.jsx(D, {}),
        ],
      }),
    });
  },
  re = (e, n, t) => [
    { key: "name", dataIndex: "name", name: e("Role") },
    {
      key: "permissions",
      dataIndex: "permissions",
      name: e("Permissions"),
      render: (a) =>
        s.jsx("div", {
          className: "max-w-60",
          children: a.map((r) =>
            s.jsx(J, { variant: "blue-outlined", children: r }, r),
          ),
        }),
    },
    {
      key: "updated_at",
      dataIndex: "updated_at",
      name: e("Updated date"),
      render: (a) => A(a, F),
    },
    {
      key: "_id",
      dataIndex: "_id",
      name: e(""),
      render: (a) =>
        s.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            s.jsx(P, {
              content: e("Edit"),
              children: s.jsx(W, { className: "size-4", onClick: () => t(a) }),
            }),
            s.jsx(P, {
              content: e("Delete"),
              children: s.jsx(X, { className: "size-4", onClick: () => n(a) }),
            }),
          ],
        }),
    },
  ],
  oe = () => {
    const { t: e } = f(),
      [n, t] = o.useState(null),
      [a, r] = o.useState(!1),
      { removeWithConfirm: l } = B([u]),
      { toast: c } = E(),
      { query: m, handleFilter: d, params: i } = N({ url: [u] }),
      p = o.useCallback(
        (y) => {
          l(y)
            .then(() => {
              (m.refetch(),
                c({
                  variant: "success",
                  title: e("Success"),
                  description: e("System user removed successfully"),
                }));
            })
            .catch((b) => {
              c({
                variant: "destructive",
                title: e(`${h.get(b, "response.statusText", "Error")}`),
                description: e(
                  `${h.get(b, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [l, e, c],
      ),
      x = o.useCallback(() => {
        r(!0);
      }, []),
      j = o.useCallback(() => {
        (r(!1), t(null));
      }, []),
      T = o.useCallback(() => {
        (m.refetch(), j());
      }, [j]),
      S = o.useCallback((y) => {
        (t(y), r(!0));
      }, []),
      k = o.useMemo(() => re(e, p, S), [e, p, S]);
    return {
      loading: m.isLoading,
      columns: k,
      dataSource: m.data,
      params: i,
      handleFilter: d,
      handleSave: T,
      handleAdd: x,
      handleClose: j,
      openForm: a,
      id: n,
    };
  },
  Oe = () => {
    const { t: e } = f(),
      {
        loading: n,
        columns: t,
        dataSource: a,
        handleFilter: r,
        params: l,
        openForm: c,
        handleClose: m,
        handleAdd: d,
        handleSave: i,
        id: p,
      } = oe(),
      x = o.useMemo(
        () => [{ name: e("Role"), path: "/roles", isActive: !0 }],
        [e],
      );
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx(L, {
          open: c,
          onOpenChange: m,
          size: "2xl",
          header: s.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              s.jsx(z, { className: "h-5 w-5" }),
              s.jsx("span", { children: e("New role") }),
            ],
          }),
          children: s.jsx(ae, { id: p, onSave: i }),
        }),
        s.jsx(I, {
          className: "sticky top-0",
          breadcrumbs: x,
          children: s.jsxs(q, {
            size: "sm",
            onClick: d,
            children: [s.jsx(Z, {}), e("Add new")],
          }),
        }),
        s.jsx(O, {
          children: s.jsx(_, {
            tableKey: u,
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            hasPagination: !0,
            loading: n,
            params: l,
            onParamChange: r,
            rowKey: "_id",
            dataSource: a,
            dataKey: "docs",
            columns: t,
          }),
        }),
      ],
    });
  };
export { Oe as default };
