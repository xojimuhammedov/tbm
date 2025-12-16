import {
  N as U,
  j as s,
  J as z,
  M as H,
  r as l,
  q,
  a as i,
  k as K,
  z as N,
} from "./index-ADhmmBpU.js";
import { P as $ } from "./PageHeader-l3FtlNyv.js";
import { P as Y } from "./PageWrapper-D7EWSq9s.js";
import { u as E, c as W } from "./button-Bp2lHjov-bkEUXTzY.js";
import { l as S } from "./lodash-BI9_Ro3R.js";
import { H as Z } from "./index.es-BKLEAvF1.js";
import { M as V } from "./MyModal-3lICjm9q.js";
import { u as M, M as B } from "./useLists-DBTxrMAi.js";
import { S as x } from "./staff.constants-D5gKBh84.js";
import { S as Q, u as J } from "./useDelete-DMNw96p5.js";
import { M as b } from "./MyTooltip-DPJtpMhP.js";
import { E as X } from "./eye-CW1pDi29.js";
import { T as ee } from "./trash-2-B_r_Bsxl.js";
import { n as y } from "./index.es-njk8-3Q7.js";
import "./sidebar-C0lF1Npi.js";
import { F as se } from "./FormContainerFooter-M0H-Jjey.js";
import { u as ae } from "./useGetOne-DA0KuYmv.js";
import { u as oe, a as te } from "./useMutate-B2j67kPQ.js";
import { o as re, s as u, Z as g, a as ne } from "./zod-BQt-Wj8X.js";
import { M as R } from "./MutateRequestMethod-D0dsk-6r.js";
import { R as le, U as ie } from "./role.constants-C6vKkRrP.js";
import { S as de } from "./MySelect-CDOMHlry-CVNRsqeU.js";
import { U as ce } from "./user-D-Egm9vv.js";
import { C as me } from "./circle-plus-CJWL5GeC.js";
import "./dropdown-menu-BPBcxHRB-EjT0ADL9-BtVDbh7T.js";
import "./useQueryParams-Dns8Zny6.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./popover-HTqpqYpJ-CIljcfgV-Ob8cCMTy.js";
import "./useApi-BNT2PGFQ.js";
import "./Spin-D_PNnV0x.js";
var v = ((e) => ((e.ACTIVE = "active"), (e.INACTIVE = "inactive"), e))(v || {});
const ue = (e) => [
    {
      name: "permission_group",
      label: e("Permission group"),
      isMulti: !1,
      options: [],
    },
    { name: "status", label: e("Status"), isMulti: !1, options: U(v, e) },
  ],
  pe = (e, d, t, o) => [
    {
      key: "first_name",
      dataIndex: "first_name",
      name: e("Staff"),
      render: (a, r) => s.jsxs("div", { children: [a, " ", r.second_name] }),
    },
    { key: "pinfl", dataIndex: "pinfl", name: e("PINFL") },
    { key: "email", dataIndex: "email", name: e("Email") },
    { key: "phone", dataIndex: "phone", name: e("Phone") },
    {
      key: "role",
      dataIndex: "role",
      name: e("Role"),
      render: (a) => (a == null ? void 0 : a.name),
    },
    {
      key: "updated_at",
      dataIndex: "updated_at",
      name: e("Updated date"),
      render: (a) => z(a, H),
    },
    {
      key: "_id",
      dataIndex: "_id",
      name: e(""),
      render: (a) =>
        s.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            s.jsx(b, {
              content: e("View"),
              children: s.jsx(X, { className: "size-4", onClick: () => o(a) }),
            }),
            s.jsx(b, {
              content: e("Edit"),
              children: s.jsx(Q, { className: "size-4", onClick: () => t(a) }),
            }),
            s.jsx(b, {
              content: e("Delete"),
              children: s.jsx(ee, { className: "size-4", onClick: () => d(a) }),
            }),
          ],
        }),
    },
  ],
  fe = () => {
    const { t: e } = E(),
      [d, t] = l.useState(null),
      [o, a] = l.useState(!1),
      [r, m] = l.useState(null),
      [p, f] = l.useState(!1),
      { removeWithConfirm: n } = J([x]),
      { toast: c } = q(),
      { query: h, handleFilter: T, params: L } = M({ url: [x] }),
      I = l.useCallback(
        (A) => {
          n(A)
            .then(() => {
              (h.refetch(),
                c({
                  variant: "success",
                  title: e("Success"),
                  description: e("System user removed successfully"),
                }));
            })
            .catch((C) => {
              c({
                variant: "destructive",
                title: e(`${S.get(C, "response.statusText", "Error")}`),
                description: e(
                  `${S.get(C, "response.data.message", "An error occurred. Contact the administrator")}`,
                ),
              });
            });
        },
        [n, e, c],
      ),
      j = l.useCallback(() => {
        a(!0);
      }, []),
      w = l.useCallback(() => {
        (a(!1), t(null));
      }, []),
      O = l.useCallback(() => {
        (h.refetch(), w());
      }, [w]),
      P = l.useCallback((A) => {
        (t(A), a(!0));
      }, []),
      _ = l.useCallback((A) => {
        (m(A), f(!0));
      }, []),
      D = l.useCallback(() => {
        (f(!1), m(null));
      }, []),
      F = l.useMemo(() => pe(e, I, P, _), [e, I, P, _]),
      G = l.useMemo(() => ue(e), [e]);
    return {
      loading: h.isLoading,
      columns: F,
      dataSource: h.data,
      filters: G,
      params: L,
      handleFilter: T,
      handleSave: O,
      handleAdd: j,
      handleClose: w,
      openForm: o,
      id: d,
      openView: p,
      viewId: r,
      handleCloseView: D,
    };
  },
  he = /[a-z]/,
  Ne = /[A-Z]/,
  Ae = /\d/,
  xe = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  Ie = (e, d) =>
    re({
      first_name: u().nonempty(
        e("required {{field}}", {
          field: e("First name"),
          ns: i.LANG.NS.VALIDATION,
        }),
      ),
      second_name: u().nonempty(
        e("required {{field}}", {
          field: e("Second name"),
          ns: i.LANG.NS.VALIDATION,
        }),
      ),
      middle_name: u().optional(),
      email: u()
        .trim()
        .toLowerCase()
        .nonempty(
          e("required {{field}}", {
            field: e("Email"),
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .email(
          e("Invalid {{field}}", {
            field: e("Email"),
            ns: i.LANG.NS.VALIDATION,
          }),
        ),
      pinfl: u().nonempty(
        e("required {{field}}", {
          field: e("Pinfl"),
          ns: i.LANG.NS.VALIDATION,
        }),
      ),
      phone: u().nonempty(
        e("required {{field}}", {
          field: e("Phone"),
          ns: i.LANG.NS.VALIDATION,
        }),
      ),
      role: u().nonempty(
        e("required {{field}}", {
          field: e("User role"),
          ns: i.LANG.NS.VALIDATION,
        }),
      ),
      password: u()
        .min(
          8,
          e("min {{count}} {{field}}", {
            field: e("Password"),
            count: 8,
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .max(
          128,
          e("max {{count}} {{field}}", {
            field: e("Password"),
            count: 128,
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          he,
          e("Password must contain at least one lowercase letter", {
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          Ne,
          e("Password must contain at least one uppercase letter", {
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          Ae,
          e("Password must contain at least one number", {
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .regex(
          xe,
          e("Password must contain at least one special character", {
            ns: i.LANG.NS.VALIDATION,
          }),
        )
        .optional(),
      passwordRepeat: u().optional(),
    }).superRefine(
      ({ password: t, passwordRepeat: o }, a) => (
        t !== o &&
          a.addIssue({
            code: g.custom,
            message: e("Password does not match", { ns: i.LANG.NS.VALIDATION }),
            path: ["passwordRepeat"],
          }),
        d ||
          (t ||
            a.addIssue({
              code: g.custom,
              message: e("required {{field}}", {
                field: e("Password"),
                ns: i.LANG.NS.VALIDATION,
              }),
              path: ["password"],
            }),
          o ||
            a.addIssue({
              code: g.custom,
              message: e("required {{field}}", {
                field: e("Password repeat"),
                ns: i.LANG.NS.VALIDATION,
              }),
              path: ["passwordRepeat"],
            })),
        a
      ),
    ),
  Se = ({ id: e, onSave: d }) => {
    const { t } = E(),
      { toast: o } = q(),
      a = l.useMemo(() => Ie(t, e), [t, e]),
      r = oe({ resolver: ne(a) }),
      m = ae({ url: [x, e || ""], options: { enabled: !!e } }),
      { query: p } = te({
        url: [x, e || ""],
        method: e ? R.PUT : R.POST,
        options: {
          onError: (n) => {
            o({
              variant: "destructive",
              title: t(`${S.get(n, "response.statusText", "Error")}`),
              description: t(
                `${S.get(n, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (r.reset(),
              d == null || d(),
              o({
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
    l.useEffect(() => {
      var c;
      const n = (c = m.data) == null ? void 0 : c.user;
      n &&
        (r.setValue("first_name", n.first_name),
        r.setValue("second_name", n.second_name),
        r.setValue("middle_name", n.middle_name),
        r.setValue("email", n.email),
        r.setValue("phone", n.phone),
        r.setValue("pinfl", n.pinfl),
        r.setValue("role", n.role._id));
    }, [m.data, r]);
    const f = l.useCallback(
      (n) => {
        const c = { ...n };
        (delete c.passwordRepeat, p.mutate(c));
      },
      [p],
    );
    return { form: r, onSubmit: f };
  },
  Ee = () => {
    const { query: e } = M({ url: [le], defaultParams: { page: 1, limit: B } });
    return {
      roleOptions: l.useMemo(() => {
        var t, o;
        return (o = (t = e.data) == null ? void 0 : t.docs) == null
          ? void 0
          : o.map((a) => ({ label: a.name, value: a._id }));
      }, [e.data]),
    };
  },
  k = ({ id: e, onSave: d, readOnly: t = !1 }) => {
    const { t: o } = E(),
      { form: a, onSubmit: r } = Se({ id: e, onSave: d }),
      { roleOptions: m } = Ee();
    return s.jsx(K, {
      ...a,
      children: s.jsxs("form", {
        onSubmit: a.handleSubmit(r),
        className: "space-y-4",
        children: [
          s.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [
              s.jsx(N, {
                control: a.control,
                name: "first_name",
                label: o("First name"),
                placeholder: o("Enter first name"),
                required: !0,
                disabled: t,
              }),
              s.jsx(N, {
                control: a.control,
                name: "second_name",
                label: o("Second name"),
                placeholder: o("Enter second name"),
                required: !0,
                disabled: t,
              }),
              s.jsx(N, {
                control: a.control,
                name: "middle_name",
                label: o("Middle name"),
                placeholder: o("Enter second name"),
                disabled: t,
              }),
              s.jsx(N, {
                control: a.control,
                name: "email",
                label: o("Email"),
                placeholder: o("Enter email"),
                required: !0,
                disabled: t,
              }),
              s.jsx(y, {
                control: a.control,
                name: "pinfl",
                label: o("Pinfl"),
                placeholder: o("Enter pinfl"),
                required: !0,
                mask: "0000000000000",
                disabled: t,
              }),
              s.jsx(y, {
                control: a.control,
                name: "phone",
                label: o("Phone"),
                placeholder: o("Enter phone number"),
                required: !0,
                mask: "{998}000000000",
                disabled: t,
              }),
              !t &&
                s.jsxs(s.Fragment, {
                  children: [
                    s.jsx(N, {
                      control: a.control,
                      name: "password",
                      type: "password",
                      label: o("Password"),
                      placeholder: o("Enter password"),
                      required: !0,
                    }),
                    s.jsx(N, {
                      control: a.control,
                      name: "passwordRepeat",
                      type: "password",
                      label: o("Confirm password"),
                      placeholder: o("Repeat password"),
                      required: !0,
                    }),
                  ],
                }),
              s.jsx(de, {
                control: a.control,
                name: "role",
                options: m || [],
                label: o("Role"),
                placeholder: o("Select role"),
                required: !0,
                isDisabled: t,
              }),
            ],
          }),
          !t && s.jsx(se, {}),
        ],
      }),
    });
  },
  Je = () => {
    const { t: e } = E(),
      {
        loading: d,
        columns: t,
        dataSource: o,
        filters: a,
        handleFilter: r,
        params: m,
        openForm: p,
        handleClose: f,
        handleAdd: n,
        handleSave: c,
        id: h,
        openView: T,
        viewId: L,
        handleCloseView: I,
      } = fe(),
      j = l.useMemo(
        () => [{ name: e("Staff"), path: "/staff", isActive: !0 }],
        [e],
      );
    return s.jsxs(s.Fragment, {
      children: [
        s.jsx(V, {
          open: p,
          onOpenChange: f,
          size: "2xl",
          header: s.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              s.jsx(ie, { className: "h-5 w-5" }),
              s.jsx("span", { children: e("New employee") }),
            ],
          }),
          children: s.jsx(k, { id: h, onSave: c }),
        }),
        s.jsx(V, {
          open: T,
          onOpenChange: I,
          size: "2xl",
          header: s.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              s.jsx(ce, { className: "h-5 w-5" }),
              s.jsx("span", { children: e("View employee") }),
            ],
          }),
          children: s.jsx(k, { id: L, readOnly: !0 }),
        }),
        s.jsx($, {
          className: "sticky top-0",
          breadcrumbs: j,
          children: s.jsxs(W, {
            size: "sm",
            onClick: n,
            children: [s.jsx(me, {}), e("Add new")],
          }),
        }),
        s.jsx(Y, {
          children: s.jsx(Z, {
            tableKey: x,
            hasNumbers: !0,
            hasSearch: !0,
            isStickyHeader: !0,
            hasPagination: !0,
            loading: d,
            params: m,
            onParamChange: r,
            rowKey: "_id",
            dataSource: o,
            dataKey: "docs",
            columns: t,
            filters: a,
          }),
        }),
      ],
    });
  };
export { Je as default };
