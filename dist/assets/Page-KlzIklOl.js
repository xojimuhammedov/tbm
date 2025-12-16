import {
  c as O,
  J as T,
  j as e,
  M as _,
  r as n,
  q as U,
  aR as H,
  aS as Q,
  aT as Y,
  aV as F,
  aW as $,
  a_ as W,
  a as v,
  k as B,
  z as G,
} from "./index-ADhmmBpU.js";
import { P as J } from "./PageHeader-l3FtlNyv.js";
import { P as X } from "./PageWrapper-D7EWSq9s.js";
import { u as C, m as Z, c as ee } from "./button-Bp2lHjov-bkEUXTzY.js";
import { l as k } from "./lodash-BI9_Ro3R.js";
import { b as M, U as se, H as ae } from "./index.es-BKLEAvF1.js";
import { M as L } from "./MyModal-3lICjm9q.js";
import { u as R, D as te } from "./useLists-DBTxrMAi.js";
import { S as re, u as oe } from "./useDelete-DMNw96p5.js";
import { M as S } from "./MyTooltip-DPJtpMhP.js";
import { E as ne } from "./eye-CW1pDi29.js";
import { T as ie } from "./trash-2-B_r_Bsxl.js";
import "./index.es-njk8-3Q7.js";
import "./sidebar-C0lF1Npi.js";
import { F as ce } from "./FormContainerFooter-M0H-Jjey.js";
import { u as le, a as de } from "./useMutate-B2j67kPQ.js";
import { o as ue, b as me, s as N, a as pe } from "./zod-BQt-Wj8X.js";
import { u as fe } from "./useGetOne-DA0KuYmv.js";
import { M as V } from "./MutateRequestMethod-D0dsk-6r.js";
import { S as he } from "./staff.constants-D5gKBh84.js";
import { C as xe } from "./circle-plus-CJWL5GeC.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./useApi-BNT2PGFQ.js";
import "./Spin-D_PNnV0x.js";
/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const je = [
    ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
    ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
    ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }],
  ],
  A = O("users-round", je),
  b = "groups",
  ge = (s, i, r, a) => [
    { key: "name", dataIndex: "name", name: s("Group name") },
    {
      key: "description",
      dataIndex: "description",
      name: s("Group description"),
    },
    { key: "userCount", dataIndex: "userCount", name: s("Users count") },
    {
      key: "created_at",
      dataIndex: "created_at",
      name: s("Created date"),
      render: (t) => T(t, _),
    },
    {
      key: "updated_at",
      dataIndex: "updated_at",
      name: s("Updated date"),
      render: (t) => T(t, _),
    },
    {
      key: "_id",
      dataIndex: "_id",
      name: s(""),
      render: (t) =>
        e.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            e.jsx(S, {
              content: s("View"),
              children: e.jsx(ne, { className: "size-4", onClick: () => a(t) }),
            }),
            e.jsx(S, {
              content: s("Edit"),
              children: e.jsx(re, { className: "size-4", onClick: () => i(t) }),
            }),
            e.jsx(S, {
              content: s("Delete"),
              children: e.jsx(ie, { className: "size-4", onClick: () => r(t) }),
            }),
          ],
        }),
    },
  ],
  ye = () => {
    const { t: s } = C(),
      [i, r] = n.useState(null),
      [a, t] = n.useState(!1),
      [c, p] = n.useState(null),
      [o, f] = n.useState(!1),
      { removeWithConfirm: h } = oe([b]),
      { toast: l } = U(),
      { query: d, handleFilter: u, params: x } = R({ url: [b] }),
      j = n.useCallback(
        (y) => {
          h(y)
            .then(() => {
              (d.refetch(),
                l({
                  variant: "success",
                  title: s("Success"),
                  description: s("Group removed successfully"),
                }));
            })
            .catch((E) => {
              l({
                variant: "destructive",
                title: s(`${k.get(E, "response.statusText", "Error")}`),
                description: s(
                  `${k.get(E, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [h, s, l],
      ),
      m = n.useCallback(() => {
        t(!0);
      }, []),
      g = n.useCallback(() => {
        (t(!1), r(null));
      }, []),
      z = n.useCallback(() => {
        (d.refetch(), g());
      }, [g]),
      I = n.useCallback((y) => {
        (r(y), t(!0));
      }, []),
      w = n.useCallback((y) => {
        (p(y), f(!0));
      }, []),
      D = n.useCallback(() => {
        (f(!1), p(null));
      }, []),
      K = n.useMemo(() => ge(s, I, j, w), [s, j, I, w]);
    return {
      loading: d.isLoading,
      columns: K,
      dataSource: d.data,
      params: x,
      handleFilter: u,
      handleSave: z,
      handleAdd: m,
      handleClose: g,
      openForm: a,
      id: i,
      openView: o,
      viewId: c,
      handleCloseView: D,
    };
  },
  P = ({
    control: s,
    name: i,
    label: r,
    helperText: a,
    required: t,
    className: c,
    total: p = 0,
    params: o,
    onParamsChange: f,
    floatingError: h,
    header: l,
    rules: d,
    ...u
  }) => {
    const x =
      r &&
      e.jsxs(W, {
        className: "my-3",
        children: [
          r,
          " ",
          t && e.jsx("span", { className: "text-red-600", children: "*" }),
        ],
      });
    return i && s
      ? e.jsx(H, {
          control: s,
          name: i,
          rules: d,
          render: ({ field: j }) =>
            e.jsxs(Q, {
              children: [
                x,
                l && l,
                e.jsx(Y, {
                  className: "mt-2",
                  children: e.jsx(M, {
                    ...u,
                    params: o,
                    selectedItems: j.value,
                    onSelectedItemsChange: j.onChange,
                  }),
                }),
                e.jsx(se, {
                  onPageChange: (m) => {
                    f == null || f({ ...o, page: m });
                  },
                  currentPage: Number((o == null ? void 0 : o.page) || 1),
                  totalPages: Math.ceil(
                    p / Number((o == null ? void 0 : o.limit) || te),
                  ),
                }),
                e.jsx(F, { children: a }),
                e.jsx($, { className: Z(h && "absolute") }),
              ],
            }),
        })
      : e.jsxs(e.Fragment, {
          children: [x, e.jsx(M, { ...u }), e.jsx(F, { children: a })],
        });
  },
  be = (s) =>
    ue({
      name: N().nonempty(
        s("required {{field}}", {
          field: s("Group name"),
          ns: v.LANG.NS.VALIDATION,
        }),
      ),
      description: N().nonempty(
        s("required {{field}}", {
          field: s("Group description"),
          ns: v.LANG.NS.VALIDATION,
        }),
      ),
      users: me(N()).default([]),
    }),
  ke = ({ id: s, onSave: i }) => {
    var u, x, j;
    const { t: r } = C(),
      { toast: a } = U(),
      t = n.useMemo(() => be(r), [r]),
      c = le({
        resolver: pe(t),
        defaultValues: { name: "", description: "", users: [] },
      }),
      { query: p, handleFilter: o, params: f } = R({ url: [he] }),
      h = fe({ url: [b, s || ""], options: { enabled: !!s } }),
      { query: l } = de({
        url: [b, s || ""],
        method: s ? V.PUT : V.POST,
        options: {
          onError: (m) => {
            a({
              variant: "destructive",
              title: r(`${k.get(m, "response.statusText", "Error")}`),
              description: r(
                `${k.get(m, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (c.reset(),
              i == null || i(),
              a({
                variant: "success",
                title: r("Success"),
                description: r(
                  s
                    ? "Group updated successfully"
                    : "Group created successfully",
                ),
              }));
          },
        },
      });
    n.useEffect(() => {
      const m = h.data;
      m &&
        (c.setValue("name", m.name),
        c.setValue("description", m.description),
        c.setValue(
          "users",
          (m.users || []).map((g) => g._id),
        ));
    }, [h.data, c]);
    const d = n.useCallback(
      (m) => {
        l.mutate(m);
      },
      [l],
    );
    return {
      form: c,
      onSubmit: d,
      staffList: ((u = p.data) == null ? void 0 : u.docs) || [],
      staffTotal: ((x = p.data) == null ? void 0 : x.total) || 0,
      staffLoading: p.isLoading,
      staffParams: f,
      handleStaffFilter: o,
      groupUsers: ((j = h.data) == null ? void 0 : j.users) || [],
    };
  },
  q = ({ id: s, onSave: i, readOnly: r = !1 }) => {
    const { t: a } = C(),
      {
        form: t,
        onSubmit: c,
        staffList: p,
        staffTotal: o,
        staffParams: f,
        handleStaffFilter: h,
        groupUsers: l,
      } = ke({ id: s, onSave: i }),
      d = [
        {
          key: "first_name",
          dataIndex: "first_name",
          name: a("Staff"),
          render: (u, x) =>
            e.jsxs("div", { children: [u, " ", x.second_name] }),
        },
        { key: "pinfl", dataIndex: "pinfl", name: a("PINFL") },
        { key: "email", dataIndex: "email", name: a("Email") },
        {
          key: "role",
          dataIndex: "role",
          name: a("Role"),
          render: (u) => u.name,
        },
      ];
    return e.jsx(B, {
      ...t,
      children: e.jsxs("form", {
        onSubmit: t.handleSubmit(c),
        className: "space-y-4",
        children: [
          e.jsxs("div", {
            className: "grid grid-cols-1 gap-4",
            children: [
              e.jsx(G, {
                control: t.control,
                name: "name",
                label: a("Group name"),
                placeholder: a("Enter group name"),
                required: !0,
                disabled: r,
              }),
              e.jsx(G, {
                control: t.control,
                name: "description",
                label: a("Group description"),
                placeholder: a("Enter group description"),
                required: !0,
                disabled: r,
              }),
            ],
          }),
          e.jsx("div", {
            className: "border border-border-alpha-strong rounded-lg p-3",
            children: r
              ? e.jsx(P, {
                  label: a("Staffs"),
                  rowKey: "_id",
                  rows: l,
                  columns: d,
                  hasCheckbox: !1,
                  required: !1,
                })
              : e.jsx(P, {
                  control: t.control,
                  name: "users",
                  label: a("Staffs"),
                  required: !0,
                  rowKey: "_id",
                  rows: p,
                  columns: d,
                  params: f,
                  total: o,
                  onParamsChange: h,
                  helperText: a("Select staff to include in this group"),
                  hasCheckbox: !0,
                }),
          }),
          !r && e.jsx(ce, {}),
        ],
      }),
    });
  },
  Be = () => {
    const { t: s } = C(),
      {
        loading: i,
        columns: r,
        dataSource: a,
        params: t,
        handleFilter: c,
        openForm: p,
        handleClose: o,
        handleAdd: f,
        handleSave: h,
        id: l,
        openView: d,
        viewId: u,
        handleCloseView: x,
      } = ye(),
      j = n.useMemo(
        () => [{ name: s("Groups"), path: "/groups", isActive: !0 }],
        [s],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(L, {
          open: p,
          onOpenChange: o,
          size: "2xl",
          header: e.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              e.jsx(A, { className: "h-5 w-5" }),
              e.jsx("span", { children: s("New group") }),
            ],
          }),
          children: e.jsx(q, { id: l, onSave: h }),
        }),
        e.jsx(L, {
          open: d,
          onOpenChange: x,
          size: "2xl",
          header: e.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              e.jsx(A, { className: "h-5 w-5" }),
              e.jsx("span", { children: s("View group") }),
            ],
          }),
          children: e.jsx(q, { id: u, readOnly: !0 }),
        }),
        e.jsx(J, {
          className: "sticky top-0",
          breadcrumbs: j,
          children: e.jsxs(ee, {
            size: "sm",
            onClick: f,
            children: [e.jsx(xe, {}), s("Add new")],
          }),
        }),
        e.jsx(X, {
          children: e.jsx(ae, {
            tableKey: b,
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            hasPagination: !0,
            loading: i,
            params: t,
            onParamChange: c,
            rowKey: "_id",
            dataSource: a,
            dataKey: "docs",
            columns: r,
          }),
        }),
      ],
    });
  };
export { Be as default };
