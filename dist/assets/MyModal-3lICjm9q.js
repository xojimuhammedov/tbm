import { r as n, j as o } from "./index-ADhmmBpU.js";
import { a as s, m as d } from "./button-Bp2lHjov-bkEUXTzY.js";
import {
  T as y,
  U as b,
  V as v,
  _ as r,
  W as R,
  X as k,
  Y as x,
  Z as c,
  $ as i,
} from "./sidebar-C0lF1Npi.js";
const C = y,
  D = b,
  E = v,
  f = n.forwardRef(({ className: e, ...a }, t) =>
    s.jsx(i, {
      ref: t,
      className: d(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        e,
      ),
      ...a,
    }),
  );
f.displayName = i.displayName;
const p = n.forwardRef(({ className: e, children: a, ...t }, m) =>
  s.jsxs(E, {
    children: [
      s.jsx(f, {}),
      s.jsxs(r, {
        ref: m,
        className: d(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
          e,
        ),
        ...t,
        children: [
          a,
          s.jsxs(R, {
            className:
              "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none",
            children: [
              s.jsx(k, { className: "h-4 w-4" }),
              s.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  }),
);
p.displayName = r.displayName;
const u = ({ className: e, ...a }) =>
  s.jsx("div", {
    className: d("flex flex-col space-y-1.5 text-center sm:text-left", e),
    ...a,
  });
u.displayName = "DialogHeader";
const N = ({ className: e, ...a }) =>
  s.jsx("div", {
    className: d(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e,
    ),
    ...a,
  });
N.displayName = "DialogFooter";
const g = n.forwardRef(({ className: e, ...a }, t) =>
  s.jsx(x, {
    ref: t,
    className: d("text-lg leading-none font-semibold tracking-tight", e),
    ...a,
  }),
);
g.displayName = x.displayName;
const h = n.forwardRef(({ className: e, ...a }, t) =>
  s.jsx(c, { ref: t, className: d("text-muted-foreground text-sm", e), ...a }),
);
h.displayName = c.displayName;
const F = ({
  header: e,
  footer: a,
  trigger: t,
  children: m,
  className: j,
  size: l = "lg",
  ...w
}) =>
  o.jsxs(C, {
    ...w,
    children: [
      t && o.jsx(D, { asChild: !0, children: t }),
      o.jsxs(p, {
        className: d(
          "data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          l === "xl" && "max-w-xl",
          l === "2xl" && "max-w-2xl",
          l === "3xl" && "max-w-3xl",
          l === "4xl" && "max-w-5xl",
          l === "5xl" && "max-w-5xl",
          l === "6xl" && "max-w-6xl",
          l === "7xl" && "max-w-7xl",
          l === "80%" && "max-w-[80%]",
          l === "8xl" && "max-w-[90%]",
          l === "full" && "max-w-[95%]",
          j,
        ),
        children: [
          o.jsxs(u, {
            children: [
              o.jsx(g, { children: e }),
              o.jsx(h, { className: "hidden" }),
            ],
          }),
          m,
          a && o.jsx(N, { children: a }),
        ],
      }),
    ],
  });
export { F as M };
