import {
  c as K,
  r as d,
  at as Ce,
  b8 as q,
  b9 as B,
  ba as D,
  j as n,
  bb as I,
  bc as U,
  bd as he,
  be as W,
  R as f,
  bf as ge,
  bg as Ae,
  bh as ye,
} from "./index-ADhmmBpU.js";
/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ie = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  Ye = K("circle-check", Ie);
/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Re = [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7",
      },
    ],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }],
  ],
  Ze = K("file-text", Re);
var we = Ce[" useId ".trim().toString()] || (() => {}),
  Ne = 0;
function Y(e) {
  const [t, o] = d.useState(we());
  return (
    q(() => {
      o((r) => r ?? String(Ne++));
    }, [e]),
    t ? `radix-${t}` : ""
  );
}
var N = "Collapsible",
  [_e, Z] = B(N),
  [je, O] = _e(N),
  J = d.forwardRef((e, t) => {
    const {
        __scopeCollapsible: o,
        open: r,
        defaultOpen: c,
        disabled: a,
        onOpenChange: s,
        ...l
      } = e,
      [p, u] = D({ prop: r, defaultProp: c ?? !1, onChange: s, caller: N });
    return n.jsx(je, {
      scope: o,
      disabled: a,
      contentId: Y(),
      open: p,
      onOpenToggle: d.useCallback(() => u((m) => !m), [u]),
      children: n.jsx(I.div, {
        "data-state": $(p),
        "data-disabled": a ? "" : void 0,
        ...l,
        ref: t,
      }),
    });
  });
J.displayName = N;
var Q = "CollapsibleTrigger",
  X = d.forwardRef((e, t) => {
    const { __scopeCollapsible: o, ...r } = e,
      c = O(Q, o);
    return n.jsx(I.button, {
      type: "button",
      "aria-controls": c.contentId,
      "aria-expanded": c.open || !1,
      "data-state": $(c.open),
      "data-disabled": c.disabled ? "" : void 0,
      disabled: c.disabled,
      ...r,
      ref: t,
      onClick: U(e.onClick, c.onOpenToggle),
    });
  });
X.displayName = Q;
var T = "CollapsibleContent",
  ee = d.forwardRef((e, t) => {
    const { forceMount: o, ...r } = e,
      c = O(T, e.__scopeCollapsible);
    return n.jsx(he, {
      present: o || c.open,
      children: ({ present: a }) => n.jsx(Pe, { ...r, ref: t, present: a }),
    });
  });
ee.displayName = T;
var Pe = d.forwardRef((e, t) => {
  const { __scopeCollapsible: o, present: r, children: c, ...a } = e,
    s = O(T, o),
    [l, p] = d.useState(r),
    u = d.useRef(null),
    m = W(t, u),
    x = d.useRef(0),
    A = x.current,
    b = d.useRef(0),
    R = b.current,
    C = s.open || l,
    h = d.useRef(C),
    g = d.useRef(void 0);
  return (
    d.useEffect(() => {
      const i = requestAnimationFrame(() => (h.current = !1));
      return () => cancelAnimationFrame(i);
    }, []),
    q(() => {
      const i = u.current;
      if (i) {
        ((g.current = g.current || {
          transitionDuration: i.style.transitionDuration,
          animationName: i.style.animationName,
        }),
          (i.style.transitionDuration = "0s"),
          (i.style.animationName = "none"));
        const y = i.getBoundingClientRect();
        ((x.current = y.height),
          (b.current = y.width),
          h.current ||
            ((i.style.transitionDuration = g.current.transitionDuration),
            (i.style.animationName = g.current.animationName)),
          p(r));
      }
    }, [s.open, r]),
    n.jsx(I.div, {
      "data-state": $(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !C,
      ...a,
      ref: m,
      style: {
        "--radix-collapsible-content-height": A ? `${A}px` : void 0,
        "--radix-collapsible-content-width": R ? `${R}px` : void 0,
        ...e.style,
      },
      children: C && c,
    })
  );
});
function $(e) {
  return e ? "open" : "closed";
}
var ke = J,
  Ee = X,
  Me = ee,
  Se = d.createContext(void 0);
function De(e) {
  const t = d.useContext(Se);
  return e || t || "ltr";
}
var v = "Accordion",
  Oe = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [H, Te, $e] = ge(v),
  [_, Je] = B(v, [$e, Z]),
  L = Z(),
  oe = f.forwardRef((e, t) => {
    const { type: o, ...r } = e,
      c = r,
      a = r;
    return n.jsx(H.Provider, {
      scope: e.__scopeAccordion,
      children:
        o === "multiple"
          ? n.jsx(Fe, { ...a, ref: t })
          : n.jsx(Ve, { ...c, ref: t }),
    });
  });
oe.displayName = v;
var [te, He] = _(v),
  [ne, Le] = _(v, { collapsible: !1 }),
  Ve = f.forwardRef((e, t) => {
    const {
        value: o,
        defaultValue: r,
        onValueChange: c = () => {},
        collapsible: a = !1,
        ...s
      } = e,
      [l, p] = D({ prop: o, defaultProp: r ?? "", onChange: c, caller: v });
    return n.jsx(te, {
      scope: e.__scopeAccordion,
      value: f.useMemo(() => (l ? [l] : []), [l]),
      onItemOpen: p,
      onItemClose: f.useCallback(() => a && p(""), [a, p]),
      children: n.jsx(ne, {
        scope: e.__scopeAccordion,
        collapsible: a,
        children: n.jsx(re, { ...s, ref: t }),
      }),
    });
  }),
  Fe = f.forwardRef((e, t) => {
    const { value: o, defaultValue: r, onValueChange: c = () => {}, ...a } = e,
      [s, l] = D({ prop: o, defaultProp: r ?? [], onChange: c, caller: v }),
      p = f.useCallback((m) => l((x = []) => [...x, m]), [l]),
      u = f.useCallback((m) => l((x = []) => x.filter((A) => A !== m)), [l]);
    return n.jsx(te, {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: p,
      onItemClose: u,
      children: n.jsx(ne, {
        scope: e.__scopeAccordion,
        collapsible: !0,
        children: n.jsx(re, { ...a, ref: t }),
      }),
    });
  }),
  [ze, j] = _(v),
  re = f.forwardRef((e, t) => {
    const {
        __scopeAccordion: o,
        disabled: r,
        dir: c,
        orientation: a = "vertical",
        ...s
      } = e,
      l = f.useRef(null),
      p = W(l, t),
      u = Te(o),
      x = De(c) === "ltr",
      A = U(e.onKeyDown, (b) => {
        var z;
        if (!Oe.includes(b.key)) return;
        const R = b.target,
          C = u().filter((M) => {
            var G;
            return !((G = M.ref.current) != null && G.disabled);
          }),
          h = C.findIndex((M) => M.ref.current === R),
          g = C.length;
        if (h === -1) return;
        b.preventDefault();
        let i = h;
        const y = 0,
          P = g - 1,
          k = () => {
            ((i = h + 1), i > P && (i = y));
          },
          E = () => {
            ((i = h - 1), i < y && (i = P));
          };
        switch (b.key) {
          case "Home":
            i = y;
            break;
          case "End":
            i = P;
            break;
          case "ArrowRight":
            a === "horizontal" && (x ? k() : E());
            break;
          case "ArrowDown":
            a === "vertical" && k();
            break;
          case "ArrowLeft":
            a === "horizontal" && (x ? E() : k());
            break;
          case "ArrowUp":
            a === "vertical" && E();
            break;
        }
        const be = i % g;
        (z = C[be].ref.current) == null || z.focus();
      });
    return n.jsx(ze, {
      scope: o,
      disabled: r,
      direction: c,
      orientation: a,
      children: n.jsx(H.Slot, {
        scope: o,
        children: n.jsx(I.div, {
          ...s,
          "data-orientation": a,
          ref: p,
          onKeyDown: r ? void 0 : A,
        }),
      }),
    });
  }),
  w = "AccordionItem",
  [Ge, V] = _(w),
  ae = f.forwardRef((e, t) => {
    const { __scopeAccordion: o, value: r, ...c } = e,
      a = j(w, o),
      s = He(w, o),
      l = L(o),
      p = Y(),
      u = (r && s.value.includes(r)) || !1,
      m = a.disabled || e.disabled;
    return n.jsx(Ge, {
      scope: o,
      open: u,
      disabled: m,
      triggerId: p,
      children: n.jsx(ke, {
        "data-orientation": a.orientation,
        "data-state": pe(u),
        ...l,
        ...c,
        ref: t,
        disabled: m,
        open: u,
        onOpenChange: (x) => {
          x ? s.onItemOpen(r) : s.onItemClose(r);
        },
      }),
    });
  });
ae.displayName = w;
var ce = "AccordionHeader",
  se = f.forwardRef((e, t) => {
    const { __scopeAccordion: o, ...r } = e,
      c = j(v, o),
      a = V(ce, o);
    return n.jsx(I.h3, {
      "data-orientation": c.orientation,
      "data-state": pe(a.open),
      "data-disabled": a.disabled ? "" : void 0,
      ...r,
      ref: t,
    });
  });
se.displayName = ce;
var S = "AccordionTrigger",
  ie = f.forwardRef((e, t) => {
    const { __scopeAccordion: o, ...r } = e,
      c = j(v, o),
      a = V(S, o),
      s = Le(S, o),
      l = L(o);
    return n.jsx(H.ItemSlot, {
      scope: o,
      children: n.jsx(Ee, {
        "aria-disabled": (a.open && !s.collapsible) || void 0,
        "data-orientation": c.orientation,
        id: a.triggerId,
        ...l,
        ...r,
        ref: t,
      }),
    });
  });
ie.displayName = S;
var le = "AccordionContent",
  de = f.forwardRef((e, t) => {
    const { __scopeAccordion: o, ...r } = e,
      c = j(v, o),
      a = V(le, o),
      s = L(o);
    return n.jsx(Me, {
      role: "region",
      "aria-labelledby": a.triggerId,
      "data-orientation": c.orientation,
      ...s,
      ...r,
      ref: t,
      style: {
        "--radix-accordion-content-height":
          "var(--radix-collapsible-content-height)",
        "--radix-accordion-content-width":
          "var(--radix-collapsible-content-width)",
        ...e.style,
      },
    });
  });
de.displayName = le;
function pe(e) {
  return e ? "open" : "closed";
}
var Ke = oe,
  qe = ae,
  Be = se,
  ue = ie,
  fe = de;
function F(...e) {
  return Ae(ye(e));
}
const Ue = Ke,
  me = d.forwardRef(({ className: e, ...t }, o) =>
    n.jsx(qe, { ref: o, className: F("border-b", e), ...t }),
  );
me.displayName = "AccordionItem";
const xe = d.forwardRef(({ className: e, children: t, ...o }, r) =>
  n.jsx(Be, {
    className: "flex",
    children: n.jsxs(ue, {
      ref: r,
      className: F(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        e,
      ),
      ...o,
      children: [
        t,
        n.jsx("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "h-4 w-4 shrink-0 transition-transform duration-200",
          children: n.jsx("polyline", { points: "6 9 12 15 18 9" }),
        }),
      ],
    }),
  }),
);
xe.displayName = ue.displayName;
const ve = d.forwardRef(({ className: e, children: t, ...o }, r) =>
  n.jsx(fe, {
    ref: r,
    className: F(
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all",
      e,
    ),
    ...o,
    children: n.jsx("div", { className: "pb-4 pt-0", children: t }),
  }),
);
ve.displayName = fe.displayName;
const Qe = ({ title: e = "", children: t }) =>
  n.jsx(n.Fragment, {
    children: n.jsx(Ue, {
      type: "single",
      collapsible: !0,
      children: n.jsxs(me, {
        value: "custom-accordion",
        className: "border-0",
        children: [
          n.jsx(xe, {
            className: "bg-item-tertiary p-2 mt-2 rounded-lg",
            children: e,
          }),
          n.jsx(ve, { children: t }),
        ],
      }),
    }),
  });
export { Ye as C, Ze as F, Qe as M };
