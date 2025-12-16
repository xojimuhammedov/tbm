import { r as t, j as r, k as n, z as i } from "./index-ADhmmBpU.js";
import { u as p } from "./useLogin-CjUIlf4N.js";
import { a as l, m as d, u as x, c as f } from "./button-Bp2lHjov-bkEUXTzY.js";
import { S as u } from "./Spin-D_PNnV0x.js";
import "./index.es-njk8-3Q7.js";
import "./useMutate-B2j67kPQ.js";
import "./useApi-BNT2PGFQ.js";
import "./lodash-BI9_Ro3R.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./zod-BQt-Wj8X.js";
import "./useGetOne-DA0KuYmv.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
const m = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("div", {
    ref: s,
    className: d(
      "rounded-4 border-border-alpha-light bg-bg-background border shadow-xs",
      e,
    ),
    ...a,
  }),
);
m.displayName = "Card";
const g = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("div", {
    ref: s,
    className: d("flex flex-col space-y-1.5 p-3", e),
    ...a,
  }),
);
g.displayName = "CardHeader";
const N = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("div", {
    ref: s,
    className: d(
      "text-body-md-medium flex items-center justify-between gap-2 [&>div>svg]:size-5 [&>svg]:size-5",
      e,
    ),
    ...a,
  }),
);
N.displayName = "CardTitle";
const b = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("span", {
    ref: s,
    className: d("text-body-sm-regular text-secondary", e),
    ...a,
  }),
);
b.displayName = "CardDescription";
const c = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("div", {
    ref: s,
    className: d("text-body-sm-regular p-3 pt-0", e),
    ...a,
  }),
);
c.displayName = "CardContent";
const y = t.forwardRef(({ className: e, ...a }, s) =>
  l.jsx("div", {
    ref: s,
    className: d("text-body-sm-regular flex items-center p-3 pt-0", e),
    ...a,
  }),
);
y.displayName = "CardFooter";
const P = () => {
  const { form: e, onSubmit: a, loading: s } = p(),
    { t: o } = x();
  return r.jsx(m, {
    className: "overflow-hidden shadow-lg bg-white w-[440px] text-gray-900",
    children: r.jsx(c, {
      className: "grid p-0",
      children: r.jsxs("div", {
        className: "space-y-4 p-5 md:p-10",
        children: [
          r.jsxs("div", {
            className: "flex flex-col items-center justify-center gap-2 mb-2",
            children: [
              r.jsx("img", { src: "/images/logo.png", alt: "Logo" }),
              r.jsx("h3", {
                className: "text-xl font-bold text-center",
                children: o("Login"),
              }),
            ],
          }),
          r.jsx("p", {
            className: "text-gray-600 text-body-sm-regular mb-10 text-center",
            children: o(
              "Make sure you have entered your email and password and click the login button",
            ),
          }),
          r.jsx(n, {
            ...e,
            children: r.jsxs("form", {
              onSubmit: e.handleSubmit(a),
              className: "space-y-8",
              children: [
                r.jsx(i, {
                  className: "dark:border-gray-300",
                  required: !0,
                  floatingError: !0,
                  label: o("Email"),
                  placeholder: o("Enter your Email"),
                  control: e.control,
                  name: "email",
                }),
                r.jsx(i, {
                  className: "dark:border-gray-300",
                  required: !0,
                  floatingError: !0,
                  control: e.control,
                  label: o("Password"),
                  placeholder: o("Enter your Password"),
                  type: "password",
                  name: "password",
                }),
                r.jsxs(f, {
                  type: "submit",
                  className: "w-full rounded-lg dark:bg-blue-400",
                  children: [s && r.jsx(u, {}), " ", o("Login")],
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  });
};
export { P as default };
