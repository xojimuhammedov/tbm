var gt = (e) => {
  throw TypeError(e);
};
var qe = (e, r, t) => r.has(e) || gt("Cannot " + t);
var U = (e, r, t) => (
    qe(e, r, "read from private field"),
    t ? t.call(e) : r.get(e)
  ),
  ge = (e, r, t) =>
    r.has(e)
      ? gt("Cannot add the same private member more than once")
      : r instanceof WeakSet
        ? r.add(e)
        : r.set(e, t),
  ve = (e, r, t, i) => (
    qe(e, r, "write to private field"),
    i ? i.call(e, t) : r.set(e, t),
    t
  ),
  _e = (e, r, t) => (qe(e, r, "access private method"), t);
import {
  az as Yt,
  aA as Jt,
  aB as vt,
  aC as Xt,
  aD as kt,
  v as Zt,
  r as xe,
  aE as Gt,
  aF as er,
  R as x,
} from "./index-ADhmmBpU.js";
import { u as tr } from "./useApi-BNT2PGFQ.js";
var ce,
  de,
  H,
  ae,
  ne,
  Ee,
  Xe,
  Dt,
  rr =
    ((Dt = class extends Yt {
      constructor(r, t) {
        super();
        ge(this, ne);
        ge(this, ce);
        ge(this, de);
        ge(this, H);
        ge(this, ae);
        (ve(this, ce, r),
          this.setOptions(t),
          this.bindMethods(),
          _e(this, ne, Ee).call(this));
      }
      bindMethods() {
        ((this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this)));
      }
      setOptions(r) {
        var i;
        const t = this.options;
        ((this.options = U(this, ce).defaultMutationOptions(r)),
          Jt(this.options, t) ||
            U(this, ce)
              .getMutationCache()
              .notify({
                type: "observerOptionsUpdated",
                mutation: U(this, H),
                observer: this,
              }),
          t != null &&
          t.mutationKey &&
          this.options.mutationKey &&
          vt(t.mutationKey) !== vt(this.options.mutationKey)
            ? this.reset()
            : ((i = U(this, H)) == null ? void 0 : i.state.status) ===
                "pending" && U(this, H).setOptions(this.options));
      }
      onUnsubscribe() {
        var r;
        this.hasListeners() ||
          (r = U(this, H)) == null ||
          r.removeObserver(this);
      }
      onMutationUpdate(r) {
        (_e(this, ne, Ee).call(this), _e(this, ne, Xe).call(this, r));
      }
      getCurrentResult() {
        return U(this, de);
      }
      reset() {
        var r;
        ((r = U(this, H)) == null || r.removeObserver(this),
          ve(this, H, void 0),
          _e(this, ne, Ee).call(this),
          _e(this, ne, Xe).call(this));
      }
      mutate(r, t) {
        var i;
        return (
          ve(this, ae, t),
          (i = U(this, H)) == null || i.removeObserver(this),
          ve(
            this,
            H,
            U(this, ce).getMutationCache().build(U(this, ce), this.options),
          ),
          U(this, H).addObserver(this),
          U(this, H).execute(r)
        );
      }
    }),
    (ce = new WeakMap()),
    (de = new WeakMap()),
    (H = new WeakMap()),
    (ae = new WeakMap()),
    (ne = new WeakSet()),
    (Ee = function () {
      var t;
      const r = ((t = U(this, H)) == null ? void 0 : t.state) ?? Xt();
      ve(this, de, {
        ...r,
        isPending: r.status === "pending",
        isSuccess: r.status === "success",
        isError: r.status === "error",
        isIdle: r.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      });
    }),
    (Xe = function (r) {
      kt.batch(() => {
        var t, i, l, u, d, c, k, p;
        if (U(this, ae) && this.hasListeners()) {
          const A = U(this, de).variables,
            w = U(this, de).context;
          (r == null ? void 0 : r.type) === "success"
            ? ((i = (t = U(this, ae)).onSuccess) == null ||
                i.call(t, r.data, A, w),
              (u = (l = U(this, ae)).onSettled) == null ||
                u.call(l, r.data, null, A, w))
            : (r == null ? void 0 : r.type) === "error" &&
              ((c = (d = U(this, ae)).onError) == null ||
                c.call(d, r.error, A, w),
              (p = (k = U(this, ae)).onSettled) == null ||
                p.call(k, void 0, r.error, A, w));
        }
        this.listeners.forEach((A) => {
          A(U(this, de));
        });
      });
    }),
    Dt);
function sr(e, r) {
  const t = Zt(),
    [i] = xe.useState(() => new rr(t, e));
  xe.useEffect(() => {
    i.setOptions(e);
  }, [i, e]);
  const l = xe.useSyncExternalStore(
      xe.useCallback((d) => i.subscribe(kt.batchCalls(d)), [i]),
      () => i.getCurrentResult(),
      () => i.getCurrentResult(),
    ),
    u = xe.useCallback(
      (d, c) => {
        i.mutate(d, c).catch(Gt);
      },
      [i],
    );
  if (l.error && er(i.options.throwOnError, [l.error])) throw l.error;
  return { ...l, mutate: u, mutateAsync: l.mutate };
}
var Se = (e) => e.type === "checkbox",
  ye = (e) => e instanceof Date,
  W = (e) => e == null;
const Et = (e) => typeof e == "object";
var N = (e) => !W(e) && !Array.isArray(e) && Et(e) && !ye(e),
  ir = (e) =>
    N(e) && e.target ? (Se(e.target) ? e.target.checked : e.target.value) : e,
  ar = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
  nr = (e, r) => e.has(ar(r)),
  ur = (e) => {
    const r = e.constructor && e.constructor.prototype;
    return N(r) && r.hasOwnProperty("isPrototypeOf");
  },
  tt =
    typeof window < "u" &&
    typeof window.HTMLElement < "u" &&
    typeof document < "u";
function M(e) {
  let r;
  const t = Array.isArray(e),
    i = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date) r = new Date(e);
  else if (!(tt && (e instanceof Blob || i)) && (t || N(e)))
    if (((r = t ? [] : {}), !t && !ur(e))) r = e;
    else for (const l in e) e.hasOwnProperty(l) && (r[l] = M(e[l]));
  else return e;
  return r;
}
var Ue = (e) => /^\w*$/.test(e),
  R = (e) => e === void 0,
  Le = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  rt = (e) => Le(e.replace(/["|']|\]/g, "").split(/\.|\[/)),
  h = (e, r, t) => {
    if (!r || !N(e)) return t;
    const i = (Ue(r) ? [r] : rt(r)).reduce((l, u) => (W(l) ? l : l[u]), e);
    return R(i) || i === e ? (R(e[r]) ? t : e[r]) : i;
  },
  re = (e) => typeof e == "boolean",
  C = (e, r, t) => {
    let i = -1;
    const l = Ue(r) ? [r] : rt(r),
      u = l.length,
      d = u - 1;
    for (; ++i < u; ) {
      const c = l[i];
      let k = t;
      if (i !== d) {
        const p = e[c];
        k = N(p) || Array.isArray(p) ? p : isNaN(+l[i + 1]) ? {} : [];
      }
      if (c === "__proto__" || c === "constructor" || c === "prototype") return;
      ((e[c] = k), (e = e[c]));
    }
  };
const _t = { BLUR: "blur", FOCUS_OUT: "focusout" },
  Q = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  ie = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  },
  Ct = x.createContext(null);
Ct.displayName = "HookFormContext";
const lr = () => x.useContext(Ct);
var or = (e, r, t, i = !0) => {
  const l = { defaultValues: r._defaultValues };
  for (const u in e)
    Object.defineProperty(l, u, {
      get: () => {
        const d = u;
        return (
          r._proxyFormState[d] !== Q.all &&
            (r._proxyFormState[d] = !i || Q.all),
          e[d]
        );
      },
    });
  return l;
};
const Ot = typeof window < "u" ? x.useLayoutEffect : x.useEffect;
var se = (e) => typeof e == "string",
  cr = (e, r, t, i, l) =>
    se(e)
      ? (i && r.watch.add(e), h(t, e, l))
      : Array.isArray(e)
        ? e.map((u) => (i && r.watch.add(u), h(t, u)))
        : (i && (r.watchAll = !0), t),
  Ze = (e) => W(e) || !Et(e);
function oe(e, r, t = new WeakSet()) {
  if (Ze(e) || Ze(r)) return e === r;
  if (ye(e) && ye(r)) return e.getTime() === r.getTime();
  const i = Object.keys(e),
    l = Object.keys(r);
  if (i.length !== l.length) return !1;
  if (t.has(e) || t.has(r)) return !0;
  (t.add(e), t.add(r));
  for (const u of i) {
    const d = e[u];
    if (!l.includes(u)) return !1;
    if (u !== "ref") {
      const c = r[u];
      if (
        (ye(d) && ye(c)) ||
        (N(d) && N(c)) ||
        (Array.isArray(d) && Array.isArray(c))
          ? !oe(d, c, t)
          : d !== c
      )
        return !1;
    }
  }
  return !0;
}
var dr = (e, r, t, i, l) =>
    r
      ? {
          ...t[e],
          types: { ...(t[e] && t[e].types ? t[e].types : {}), [i]: l || !0 },
        }
      : {},
  $ = (e) => (Array.isArray(e) ? e : [e]),
  bt = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (l) => {
        for (const u of e) u.next && u.next(l);
      },
      subscribe: (l) => (
        e.push(l),
        {
          unsubscribe: () => {
            e = e.filter((u) => u !== l);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  },
  q = (e) => N(e) && !Object.keys(e).length,
  st = (e) => e.type === "file",
  J = (e) => typeof e == "function",
  Oe = (e) => {
    if (!tt) return !1;
    const r = e ? e.ownerDocument : 0;
    return (
      e instanceof
      (r && r.defaultView ? r.defaultView.HTMLElement : HTMLElement)
    );
  },
  Mt = (e) => e.type === "select-multiple",
  it = (e) => e.type === "radio",
  fr = (e) => it(e) || Se(e),
  We = (e) => Oe(e) && e.isConnected;
function yr(e, r) {
  const t = r.slice(0, -1).length;
  let i = 0;
  for (; i < t; ) e = R(e) ? i++ : e[r[i++]];
  return e;
}
function hr(e) {
  for (const r in e) if (e.hasOwnProperty(r) && !R(e[r])) return !1;
  return !0;
}
function I(e, r) {
  const t = Array.isArray(r) ? r : Ue(r) ? [r] : rt(r),
    i = t.length === 1 ? e : yr(e, t),
    l = t.length - 1,
    u = t[l];
  return (
    i && delete i[u],
    l !== 0 &&
      ((N(i) && q(i)) || (Array.isArray(i) && hr(i))) &&
      I(e, t.slice(0, -1)),
    e
  );
}
var Rt = (e) => {
  for (const r in e) if (J(e[r])) return !0;
  return !1;
};
function Me(e, r = {}) {
  const t = Array.isArray(e);
  if (N(e) || t)
    for (const i in e)
      Array.isArray(e[i]) || (N(e[i]) && !Rt(e[i]))
        ? ((r[i] = Array.isArray(e[i]) ? [] : {}), Me(e[i], r[i]))
        : W(e[i]) || (r[i] = !0);
  return r;
}
function Ut(e, r, t) {
  const i = Array.isArray(e);
  if (N(e) || i)
    for (const l in e)
      Array.isArray(e[l]) || (N(e[l]) && !Rt(e[l]))
        ? R(r) || Ze(t[l])
          ? (t[l] = Array.isArray(e[l]) ? Me(e[l], []) : { ...Me(e[l]) })
          : Ut(e[l], W(r) ? {} : r[l], t[l])
        : (t[l] = !oe(e[l], r[l]));
  return t;
}
var pe = (e, r) => Ut(e, r, Me(r));
const mt = { value: !1, isValid: !1 },
  At = { value: !0, isValid: !0 };
var Lt = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        const r = e
          .filter((t) => t && t.checked && !t.disabled)
          .map((t) => t.value);
        return { value: r, isValid: !!r.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !R(e[0].attributes.value)
          ? R(e[0].value) || e[0].value === ""
            ? At
            : { value: e[0].value, isValid: !0 }
          : At
        : mt;
    }
    return mt;
  },
  Tt = (e, { valueAsNumber: r, valueAsDate: t, setValueAs: i }) =>
    R(e)
      ? e
      : r
        ? e === ""
          ? NaN
          : e && +e
        : t && se(e)
          ? new Date(e)
          : i
            ? i(e)
            : e;
const Ft = { isValid: !1, value: null };
var It = (e) =>
  Array.isArray(e)
    ? e.reduce(
        (r, t) =>
          t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : r,
        Ft,
      )
    : Ft;
function Vt(e) {
  const r = e.ref;
  return st(r)
    ? r.files
    : it(r)
      ? It(e.refs).value
      : Mt(r)
        ? [...r.selectedOptions].map(({ value: t }) => t)
        : Se(r)
          ? Lt(e.refs).value
          : Tt(R(r.value) ? e.ref.value : r.value, e);
}
var gr = (e, r, t, i) => {
    const l = {};
    for (const u of e) {
      const d = h(r, u);
      d && C(l, u, d._f);
    }
    return {
      criteriaMode: t,
      names: [...e],
      fields: l,
      shouldUseNativeValidation: i,
    };
  },
  Re = (e) => e instanceof RegExp,
  we = (e) =>
    R(e)
      ? e
      : Re(e)
        ? e.source
        : N(e)
          ? Re(e.value)
            ? e.value.source
            : e.value
          : e,
  me = (e) => ({
    isOnSubmit: !e || e === Q.onSubmit,
    isOnBlur: e === Q.onBlur,
    isOnChange: e === Q.onChange,
    isOnAll: e === Q.all,
    isOnTouch: e === Q.onTouched,
  });
const xt = "AsyncFunction";
var vr = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (J(e.validate) && e.validate.constructor.name === xt) ||
      (N(e.validate) &&
        Object.values(e.validate).find((r) => r.constructor.name === xt))
    ),
  _r = (e) =>
    e.mount &&
    (e.required ||
      e.min ||
      e.max ||
      e.maxLength ||
      e.minLength ||
      e.pattern ||
      e.validate),
  Ge = (e, r, t) =>
    !t &&
    (r.watchAll ||
      r.watch.has(e) ||
      [...r.watch].some(
        (i) => e.startsWith(i) && /^\.\w+/.test(e.slice(i.length)),
      ));
const Ae = (e, r, t, i) => {
  for (const l of t || Object.keys(e)) {
    const u = h(e, l);
    if (u) {
      const { _f: d, ...c } = u;
      if (d) {
        if (d.refs && d.refs[0] && r(d.refs[0], l) && !i) return !0;
        if (d.ref && r(d.ref, d.name) && !i) return !0;
        if (Ae(c, r)) break;
      } else if (N(c) && Ae(c, r)) break;
    }
  }
};
function pt(e, r, t) {
  const i = h(e, t);
  if (i || Ue(t)) return { error: i, name: t };
  const l = t.split(".");
  for (; l.length; ) {
    const u = l.join("."),
      d = h(r, u),
      c = h(e, u);
    if (d && !Array.isArray(d) && t !== u) return { name: t };
    if (c && c.type) return { name: u, error: c };
    if (c && c.root && c.root.type) return { name: `${u}.root`, error: c.root };
    l.pop();
  }
  return { name: t };
}
var br = (e, r, t, i) => {
    t(e);
    const { name: l, ...u } = e;
    return (
      q(u) ||
      Object.keys(u).length >= Object.keys(r).length ||
      Object.keys(u).find((d) => r[d] === (!i || Q.all))
    );
  },
  mr = (e, r, t) =>
    !e ||
    !r ||
    e === r ||
    $(e).some((i) => i && (t ? i === r : i.startsWith(r) || r.startsWith(i))),
  Ar = (e, r, t, i, l) =>
    l.isOnAll
      ? !1
      : !t && l.isOnTouch
        ? !(r || e)
        : (t ? i.isOnBlur : l.isOnBlur)
          ? !e
          : (t ? i.isOnChange : l.isOnChange)
            ? e
            : !0,
  Fr = (e, r) => !Le(h(e, r)).length && I(e, r),
  Nt = (e, r, t) => {
    const i = $(h(e, t));
    return (C(i, "root", r[t]), C(e, t, i), e);
  },
  Ce = (e) => se(e);
function wt(e, r, t = "validate") {
  if (Ce(e) || (Array.isArray(e) && e.every(Ce)) || (re(e) && !e))
    return { type: t, message: Ce(e) ? e : "", ref: r };
}
var be = (e) => (N(e) && !Re(e) ? e : { value: e, message: "" }),
  et = async (e, r, t, i, l, u) => {
    const {
        ref: d,
        refs: c,
        required: k,
        maxLength: p,
        minLength: A,
        min: w,
        max: _,
        pattern: fe,
        validate: X,
        name: L,
        valueAsNumber: Z,
        mount: Fe,
      } = e._f,
      F = h(t, L);
    if (!Fe || r.has(L)) return {};
    const Y = c ? c[0] : d,
      j = (V) => {
        l &&
          Y.reportValidity &&
          (Y.setCustomValidity(re(V) ? "" : V || ""), Y.reportValidity());
      },
      g = {},
      b = it(d),
      m = Se(d),
      O = b || m,
      B =
        ((Z || st(d)) && R(d.value) && R(F)) ||
        (Oe(d) && d.value === "") ||
        F === "" ||
        (Array.isArray(F) && !F.length),
      G = dr.bind(null, L, i, g),
      ee = (V, D, T, P = ie.maxLength, K = ie.minLength) => {
        const te = V ? D : T;
        g[L] = { type: V ? P : K, message: te, ref: d, ...G(V ? P : K, te) };
      };
    if (
      u
        ? !Array.isArray(F) || !F.length
        : k &&
          ((!O && (B || W(F))) ||
            (re(F) && !F) ||
            (m && !Lt(c).isValid) ||
            (b && !It(c).isValid))
    ) {
      const { value: V, message: D } = Ce(k)
        ? { value: !!k, message: k }
        : be(k);
      if (
        V &&
        ((g[L] = {
          type: ie.required,
          message: D,
          ref: Y,
          ...G(ie.required, D),
        }),
        !i)
      )
        return (j(D), g);
    }
    if (!B && (!W(w) || !W(_))) {
      let V, D;
      const T = be(_),
        P = be(w);
      if (!W(F) && !isNaN(F)) {
        const K = d.valueAsNumber || (F && +F);
        (W(T.value) || (V = K > T.value), W(P.value) || (D = K < P.value));
      } else {
        const K = d.valueAsDate || new Date(F),
          te = (De) => new Date(new Date().toDateString() + " " + De),
          Ve = d.type == "time",
          he = d.type == "week";
        (se(T.value) &&
          F &&
          (V = Ve
            ? te(F) > te(T.value)
            : he
              ? F > T.value
              : K > new Date(T.value)),
          se(P.value) &&
            F &&
            (D = Ve
              ? te(F) < te(P.value)
              : he
                ? F < P.value
                : K < new Date(P.value)));
      }
      if ((V || D) && (ee(!!V, T.message, P.message, ie.max, ie.min), !i))
        return (j(g[L].message), g);
    }
    if ((p || A) && !B && (se(F) || (u && Array.isArray(F)))) {
      const V = be(p),
        D = be(A),
        T = !W(V.value) && F.length > +V.value,
        P = !W(D.value) && F.length < +D.value;
      if ((T || P) && (ee(T, V.message, D.message), !i))
        return (j(g[L].message), g);
    }
    if (fe && !B && se(F)) {
      const { value: V, message: D } = be(fe);
      if (
        Re(V) &&
        !F.match(V) &&
        ((g[L] = { type: ie.pattern, message: D, ref: d, ...G(ie.pattern, D) }),
        !i)
      )
        return (j(D), g);
    }
    if (X) {
      if (J(X)) {
        const V = await X(F, t),
          D = wt(V, Y);
        if (D && ((g[L] = { ...D, ...G(ie.validate, D.message) }), !i))
          return (j(D.message), g);
      } else if (N(X)) {
        let V = {};
        for (const D in X) {
          if (!q(V) && !i) break;
          const T = wt(await X[D](F, t), Y, D);
          T &&
            ((V = { ...T, ...G(D, T.message) }), j(T.message), i && (g[L] = V));
        }
        if (!q(V) && ((g[L] = { ref: Y, ...V }), !i)) return g;
      }
    }
    return (j(!0), g);
  };
const Vr = {
  mode: Q.onSubmit,
  reValidateMode: Q.onChange,
  shouldFocusError: !0,
};
function xr(e = {}) {
  let r = { ...Vr, ...e },
    t = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: J(r.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: r.errors || {},
      disabled: r.disabled || !1,
    },
    i = {},
    l =
      N(r.defaultValues) || N(r.values)
        ? M(r.defaultValues || r.values) || {}
        : {},
    u = r.shouldUnregister ? {} : M(l),
    d = { action: !1, mount: !1, watch: !1 },
    c = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    k,
    p = 0;
  const A = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1,
  };
  let w = { ...A };
  const _ = { array: bt(), state: bt() },
    fe = r.criteriaMode === Q.all,
    X = (s) => (a) => {
      (clearTimeout(p), (p = setTimeout(s, a)));
    },
    L = async (s) => {
      if (!r.disabled && (A.isValid || w.isValid || s)) {
        const a = r.resolver ? q((await m()).errors) : await B(i, !0);
        a !== t.isValid && _.state.next({ isValid: a });
      }
    },
    Z = (s, a) => {
      !r.disabled &&
        (A.isValidating ||
          A.validatingFields ||
          w.isValidating ||
          w.validatingFields) &&
        ((s || Array.from(c.mount)).forEach((n) => {
          n && (a ? C(t.validatingFields, n, a) : I(t.validatingFields, n));
        }),
        _.state.next({
          validatingFields: t.validatingFields,
          isValidating: !q(t.validatingFields),
        }));
    },
    Fe = (s, a = [], n, y, f = !0, o = !0) => {
      if (y && n && !r.disabled) {
        if (((d.action = !0), o && Array.isArray(h(i, s)))) {
          const v = n(h(i, s), y.argA, y.argB);
          f && C(i, s, v);
        }
        if (o && Array.isArray(h(t.errors, s))) {
          const v = n(h(t.errors, s), y.argA, y.argB);
          (f && C(t.errors, s, v), Fr(t.errors, s));
        }
        if (
          (A.touchedFields || w.touchedFields) &&
          o &&
          Array.isArray(h(t.touchedFields, s))
        ) {
          const v = n(h(t.touchedFields, s), y.argA, y.argB);
          f && C(t.touchedFields, s, v);
        }
        ((A.dirtyFields || w.dirtyFields) && (t.dirtyFields = pe(l, u)),
          _.state.next({
            name: s,
            isDirty: ee(s, a),
            dirtyFields: t.dirtyFields,
            errors: t.errors,
            isValid: t.isValid,
          }));
      } else C(u, s, a);
    },
    F = (s, a) => {
      (C(t.errors, s, a), _.state.next({ errors: t.errors }));
    },
    Y = (s) => {
      ((t.errors = s), _.state.next({ errors: t.errors, isValid: !1 }));
    },
    j = (s, a, n, y) => {
      const f = h(i, s);
      if (f) {
        const o = h(u, s, R(n) ? h(l, s) : n);
        (R(o) || (y && y.defaultChecked) || a
          ? C(u, s, a ? o : Vt(f._f))
          : T(s, o),
          d.mount && L());
      }
    },
    g = (s, a, n, y, f) => {
      let o = !1,
        v = !1;
      const S = { name: s };
      if (!r.disabled) {
        if (!n || y) {
          (A.isDirty || w.isDirty) &&
            ((v = t.isDirty),
            (t.isDirty = S.isDirty = ee()),
            (o = v !== S.isDirty));
          const E = oe(h(l, s), a);
          ((v = !!h(t.dirtyFields, s)),
            E ? I(t.dirtyFields, s) : C(t.dirtyFields, s, !0),
            (S.dirtyFields = t.dirtyFields),
            (o = o || ((A.dirtyFields || w.dirtyFields) && v !== !E)));
        }
        if (n) {
          const E = h(t.touchedFields, s);
          E ||
            (C(t.touchedFields, s, n),
            (S.touchedFields = t.touchedFields),
            (o = o || ((A.touchedFields || w.touchedFields) && E !== n)));
        }
        o && f && _.state.next(S);
      }
      return o ? S : {};
    },
    b = (s, a, n, y) => {
      const f = h(t.errors, s),
        o = (A.isValid || w.isValid) && re(a) && t.isValid !== a;
      if (
        (r.delayError && n
          ? ((k = X(() => F(s, n))), k(r.delayError))
          : (clearTimeout(p),
            (k = null),
            n ? C(t.errors, s, n) : I(t.errors, s)),
        (n ? !oe(f, n) : f) || !q(y) || o)
      ) {
        const v = {
          ...y,
          ...(o && re(a) ? { isValid: a } : {}),
          errors: t.errors,
          name: s,
        };
        ((t = { ...t, ...v }), _.state.next(v));
      }
    },
    m = async (s) => {
      Z(s, !0);
      const a = await r.resolver(
        u,
        r.context,
        gr(s || c.mount, i, r.criteriaMode, r.shouldUseNativeValidation),
      );
      return (Z(s), a);
    },
    O = async (s) => {
      const { errors: a } = await m(s);
      if (s)
        for (const n of s) {
          const y = h(a, n);
          y ? C(t.errors, n, y) : I(t.errors, n);
        }
      else t.errors = a;
      return a;
    },
    B = async (s, a, n = { valid: !0 }) => {
      for (const y in s) {
        const f = s[y];
        if (f) {
          const { _f: o, ...v } = f;
          if (o) {
            const S = c.array.has(o.name),
              E = f._f && vr(f._f);
            E && A.validatingFields && Z([y], !0);
            const z = await et(
              f,
              c.disabled,
              u,
              fe,
              r.shouldUseNativeValidation && !a,
              S,
            );
            if (
              (E && A.validatingFields && Z([y]),
              z[o.name] && ((n.valid = !1), a))
            )
              break;
            !a &&
              (h(z, o.name)
                ? S
                  ? Nt(t.errors, z, o.name)
                  : C(t.errors, o.name, z[o.name])
                : I(t.errors, o.name));
          }
          !q(v) && (await B(v, a, n));
        }
      }
      return n.valid;
    },
    G = () => {
      for (const s of c.unMount) {
        const a = h(i, s);
        a &&
          (a._f.refs ? a._f.refs.every((n) => !We(n)) : !We(a._f.ref)) &&
          Te(s);
      }
      c.unMount = new Set();
    },
    ee = (s, a) => !r.disabled && (s && a && C(u, s, a), !oe(De(), l)),
    V = (s, a, n) =>
      cr(s, c, { ...(d.mount ? u : R(a) ? l : se(s) ? { [s]: a } : a) }, n, a),
    D = (s) => Le(h(d.mount ? u : l, s, r.shouldUnregister ? h(l, s, []) : [])),
    T = (s, a, n = {}) => {
      const y = h(i, s);
      let f = a;
      if (y) {
        const o = y._f;
        o &&
          (!o.disabled && C(u, s, Tt(a, o)),
          (f = Oe(o.ref) && W(a) ? "" : a),
          Mt(o.ref)
            ? [...o.ref.options].forEach(
                (v) => (v.selected = f.includes(v.value)),
              )
            : o.refs
              ? Se(o.ref)
                ? o.refs.forEach((v) => {
                    (!v.defaultChecked || !v.disabled) &&
                      (Array.isArray(f)
                        ? (v.checked = !!f.find((S) => S === v.value))
                        : (v.checked = f === v.value || !!f));
                  })
                : o.refs.forEach((v) => (v.checked = v.value === f))
              : st(o.ref)
                ? (o.ref.value = "")
                : ((o.ref.value = f),
                  o.ref.type || _.state.next({ name: s, values: M(u) })));
      }
      ((n.shouldDirty || n.shouldTouch) &&
        g(s, f, n.shouldTouch, n.shouldDirty, !0),
        n.shouldValidate && he(s));
    },
    P = (s, a, n) => {
      for (const y in a) {
        if (!a.hasOwnProperty(y)) return;
        const f = a[y],
          o = s + "." + y,
          v = h(i, o);
        (c.array.has(s) || N(f) || (v && !v._f)) && !ye(f)
          ? P(o, f, n)
          : T(o, f, n);
      }
    },
    K = (s, a, n = {}) => {
      const y = h(i, s),
        f = c.array.has(s),
        o = M(a);
      (C(u, s, o),
        f
          ? (_.array.next({ name: s, values: M(u) }),
            (A.isDirty || A.dirtyFields || w.isDirty || w.dirtyFields) &&
              n.shouldDirty &&
              _.state.next({
                name: s,
                dirtyFields: pe(l, u),
                isDirty: ee(s, o),
              }))
          : y && !y._f && !W(o)
            ? P(s, o, n)
            : T(s, o, n),
        Ge(s, c) && _.state.next({ ...t, name: s }),
        _.state.next({ name: d.mount ? s : void 0, values: M(u) }));
    },
    te = async (s) => {
      d.mount = !0;
      const a = s.target;
      let n = a.name,
        y = !0;
      const f = h(i, n),
        o = (E) => {
          y =
            Number.isNaN(E) ||
            (ye(E) && isNaN(E.getTime())) ||
            oe(E, h(u, n, E));
        },
        v = me(r.mode),
        S = me(r.reValidateMode);
      if (f) {
        let E, z;
        const ke = a.type ? Vt(f._f) : ir(s),
          ue = s.type === _t.BLUR || s.type === _t.FOCUS_OUT,
          jt =
            (!_r(f._f) && !r.resolver && !h(t.errors, n) && !f._f.deps) ||
            Ar(ue, h(t.touchedFields, n), t.isSubmitted, S, v),
          Be = Ge(n, c, ue);
        (C(u, n, ke),
          ue
            ? (f._f.onBlur && f._f.onBlur(s), k && k(0))
            : f._f.onChange && f._f.onChange(s));
        const Pe = g(n, ke, ue),
          zt = !q(Pe) || Be;
        if ((!ue && _.state.next({ name: n, type: s.type, values: M(u) }), jt))
          return (
            (A.isValid || w.isValid) &&
              (r.mode === "onBlur" ? ue && L() : ue || L()),
            zt && _.state.next({ name: n, ...(Be ? {} : Pe) })
          );
        if ((!ue && Be && _.state.next({ ...t }), r.resolver)) {
          const { errors: yt } = await m([n]);
          if ((o(ke), y)) {
            const Qt = pt(t.errors, i, n),
              ht = pt(yt, i, Qt.name || n);
            ((E = ht.error), (n = ht.name), (z = q(yt)));
          }
        } else
          (Z([n], !0),
            (E = (await et(f, c.disabled, u, fe, r.shouldUseNativeValidation))[
              n
            ]),
            Z([n]),
            o(ke),
            y &&
              (E
                ? (z = !1)
                : (A.isValid || w.isValid) && (z = await B(i, !0))));
        y && (f._f.deps && he(f._f.deps), b(n, z, E, Pe));
      }
    },
    Ve = (s, a) => {
      if (h(t.errors, a) && s.focus) return (s.focus(), 1);
    },
    he = async (s, a = {}) => {
      let n, y;
      const f = $(s);
      if (r.resolver) {
        const o = await O(R(s) ? s : f);
        ((n = q(o)), (y = s ? !f.some((v) => h(o, v)) : n));
      } else
        s
          ? ((y = (
              await Promise.all(
                f.map(async (o) => {
                  const v = h(i, o);
                  return await B(v && v._f ? { [o]: v } : v);
                }),
              )
            ).every(Boolean)),
            !(!y && !t.isValid) && L())
          : (y = n = await B(i));
      return (
        _.state.next({
          ...(!se(s) || ((A.isValid || w.isValid) && n !== t.isValid)
            ? {}
            : { name: s }),
          ...(r.resolver || !s ? { isValid: n } : {}),
          errors: t.errors,
        }),
        a.shouldFocus && !y && Ae(i, Ve, s ? f : c.mount),
        y
      );
    },
    De = (s) => {
      const a = { ...(d.mount ? u : l) };
      return R(s) ? a : se(s) ? h(a, s) : s.map((n) => h(a, n));
    },
    at = (s, a) => ({
      invalid: !!h((a || t).errors, s),
      isDirty: !!h((a || t).dirtyFields, s),
      error: h((a || t).errors, s),
      isValidating: !!h(t.validatingFields, s),
      isTouched: !!h((a || t).touchedFields, s),
    }),
    Bt = (s) => {
      (s && $(s).forEach((a) => I(t.errors, a)),
        _.state.next({ errors: s ? t.errors : {} }));
    },
    nt = (s, a, n) => {
      const y = (h(i, s, { _f: {} })._f || {}).ref,
        f = h(t.errors, s) || {},
        { ref: o, message: v, type: S, ...E } = f;
      (C(t.errors, s, { ...E, ...a, ref: y }),
        _.state.next({ name: s, errors: t.errors, isValid: !1 }),
        n && n.shouldFocus && y && y.focus && y.focus());
    },
    Pt = (s, a) =>
      J(s)
        ? _.state.subscribe({
            next: (n) => "values" in n && s(V(void 0, a), n),
          })
        : V(s, a, !0),
    ut = (s) =>
      _.state.subscribe({
        next: (a) => {
          mr(s.name, a.name, s.exact) &&
            br(a, s.formState || A, $t, s.reRenderRoot) &&
            s.callback({ values: { ...u }, ...t, ...a, defaultValues: l });
        },
      }).unsubscribe,
    qt = (s) => (
      (d.mount = !0),
      (w = { ...w, ...s.formState }),
      ut({ ...s, formState: w })
    ),
    Te = (s, a = {}) => {
      for (const n of s ? $(s) : c.mount)
        (c.mount.delete(n),
          c.array.delete(n),
          a.keepValue || (I(i, n), I(u, n)),
          !a.keepError && I(t.errors, n),
          !a.keepDirty && I(t.dirtyFields, n),
          !a.keepTouched && I(t.touchedFields, n),
          !a.keepIsValidating && I(t.validatingFields, n),
          !r.shouldUnregister && !a.keepDefaultValue && I(l, n));
      (_.state.next({ values: M(u) }),
        _.state.next({ ...t, ...(a.keepDirty ? { isDirty: ee() } : {}) }),
        !a.keepIsValid && L());
    },
    lt = ({ disabled: s, name: a }) => {
      ((re(s) && d.mount) || s || c.disabled.has(a)) &&
        (s ? c.disabled.add(a) : c.disabled.delete(a));
    },
    Ie = (s, a = {}) => {
      let n = h(i, s);
      const y = re(a.disabled) || re(r.disabled);
      return (
        C(i, s, {
          ...(n || {}),
          _f: {
            ...(n && n._f ? n._f : { ref: { name: s } }),
            name: s,
            mount: !0,
            ...a,
          },
        }),
        c.mount.add(s),
        n
          ? lt({ disabled: re(a.disabled) ? a.disabled : r.disabled, name: s })
          : j(s, !0, a.value),
        {
          ...(y ? { disabled: a.disabled || r.disabled } : {}),
          ...(r.progressive
            ? {
                required: !!a.required,
                min: we(a.min),
                max: we(a.max),
                minLength: we(a.minLength),
                maxLength: we(a.maxLength),
                pattern: we(a.pattern),
              }
            : {}),
          name: s,
          onChange: te,
          onBlur: te,
          ref: (f) => {
            if (f) {
              (Ie(s, a), (n = h(i, s)));
              const o =
                  (R(f.value) &&
                    f.querySelectorAll &&
                    f.querySelectorAll("input,select,textarea")[0]) ||
                  f,
                v = fr(o),
                S = n._f.refs || [];
              if (v ? S.find((E) => E === o) : o === n._f.ref) return;
              (C(i, s, {
                _f: {
                  ...n._f,
                  ...(v
                    ? {
                        refs: [
                          ...S.filter(We),
                          o,
                          ...(Array.isArray(h(l, s)) ? [{}] : []),
                        ],
                        ref: { type: o.type, name: s },
                      }
                    : { ref: o }),
                },
              }),
                j(s, !1, void 0, o));
            } else
              ((n = h(i, s, {})),
                n._f && (n._f.mount = !1),
                (r.shouldUnregister || a.shouldUnregister) &&
                  !(nr(c.array, s) && d.action) &&
                  c.unMount.add(s));
          },
        }
      );
    },
    Ne = () => r.shouldFocusError && Ae(i, Ve, c.mount),
    Wt = (s) => {
      re(s) &&
        (_.state.next({ disabled: s }),
        Ae(
          i,
          (a, n) => {
            const y = h(i, n);
            y &&
              ((a.disabled = y._f.disabled || s),
              Array.isArray(y._f.refs) &&
                y._f.refs.forEach((f) => {
                  f.disabled = y._f.disabled || s;
                }));
          },
          0,
          !1,
        ));
    },
    ot = (s, a) => async (n) => {
      let y;
      n && (n.preventDefault && n.preventDefault(), n.persist && n.persist());
      let f = M(u);
      if ((_.state.next({ isSubmitting: !0 }), r.resolver)) {
        const { errors: o, values: v } = await m();
        ((t.errors = o), (f = M(v)));
      } else await B(i);
      if (c.disabled.size) for (const o of c.disabled) I(f, o);
      if ((I(t.errors, "root"), q(t.errors))) {
        _.state.next({ errors: {} });
        try {
          await s(f, n);
        } catch (o) {
          y = o;
        }
      } else (a && (await a({ ...t.errors }, n)), Ne(), setTimeout(Ne));
      if (
        (_.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: q(t.errors) && !y,
          submitCount: t.submitCount + 1,
          errors: t.errors,
        }),
        y)
      )
        throw y;
    },
    Kt = (s, a = {}) => {
      h(i, s) &&
        (R(a.defaultValue)
          ? K(s, M(h(l, s)))
          : (K(s, a.defaultValue), C(l, s, M(a.defaultValue))),
        a.keepTouched || I(t.touchedFields, s),
        a.keepDirty ||
          (I(t.dirtyFields, s),
          (t.isDirty = a.defaultValue ? ee(s, M(h(l, s))) : ee())),
        a.keepError || (I(t.errors, s), A.isValid && L()),
        _.state.next({ ...t }));
    },
    ct = (s, a = {}) => {
      const n = s ? M(s) : l,
        y = M(n),
        f = q(s),
        o = f ? l : y;
      if ((a.keepDefaultValues || (l = n), !a.keepValues)) {
        if (a.keepDirtyValues) {
          const v = new Set([...c.mount, ...Object.keys(pe(l, u))]);
          for (const S of Array.from(v))
            h(t.dirtyFields, S) ? C(o, S, h(u, S)) : K(S, h(o, S));
        } else {
          if (tt && R(s))
            for (const v of c.mount) {
              const S = h(i, v);
              if (S && S._f) {
                const E = Array.isArray(S._f.refs) ? S._f.refs[0] : S._f.ref;
                if (Oe(E)) {
                  const z = E.closest("form");
                  if (z) {
                    z.reset();
                    break;
                  }
                }
              }
            }
          if (a.keepFieldsRef) for (const v of c.mount) K(v, h(o, v));
          else i = {};
        }
        ((u = r.shouldUnregister ? (a.keepDefaultValues ? M(l) : {}) : M(o)),
          _.array.next({ values: { ...o } }),
          _.state.next({ values: { ...o } }));
      }
      ((c = {
        mount: a.keepDirtyValues ? c.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (d.mount = !A.isValid || !!a.keepIsValid || !!a.keepDirtyValues),
        (d.watch = !!r.shouldUnregister),
        _.state.next({
          submitCount: a.keepSubmitCount ? t.submitCount : 0,
          isDirty: f
            ? !1
            : a.keepDirty
              ? t.isDirty
              : !!(a.keepDefaultValues && !oe(s, l)),
          isSubmitted: a.keepIsSubmitted ? t.isSubmitted : !1,
          dirtyFields: f
            ? {}
            : a.keepDirtyValues
              ? a.keepDefaultValues && u
                ? pe(l, u)
                : t.dirtyFields
              : a.keepDefaultValues && s
                ? pe(l, s)
                : a.keepDirty
                  ? t.dirtyFields
                  : {},
          touchedFields: a.keepTouched ? t.touchedFields : {},
          errors: a.keepErrors ? t.errors : {},
          isSubmitSuccessful: a.keepIsSubmitSuccessful
            ? t.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
        }));
    },
    dt = (s, a) => ct(J(s) ? s(u) : s, a),
    Ht = (s, a = {}) => {
      const n = h(i, s),
        y = n && n._f;
      if (y) {
        const f = y.refs ? y.refs[0] : y.ref;
        f.focus && (f.focus(), a.shouldSelect && J(f.select) && f.select());
      }
    },
    $t = (s) => {
      t = { ...t, ...s };
    },
    ft = {
      control: {
        register: Ie,
        unregister: Te,
        getFieldState: at,
        handleSubmit: ot,
        setError: nt,
        _subscribe: ut,
        _runSchema: m,
        _focusError: Ne,
        _getWatch: V,
        _getDirty: ee,
        _setValid: L,
        _setFieldArray: Fe,
        _setDisabledField: lt,
        _setErrors: Y,
        _getFieldArray: D,
        _reset: ct,
        _resetDefaultValues: () =>
          J(r.defaultValues) &&
          r.defaultValues().then((s) => {
            (dt(s, r.resetOptions), _.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: G,
        _disableForm: Wt,
        _subjects: _,
        _proxyFormState: A,
        get _fields() {
          return i;
        },
        get _formValues() {
          return u;
        },
        get _state() {
          return d;
        },
        set _state(s) {
          d = s;
        },
        get _defaultValues() {
          return l;
        },
        get _names() {
          return c;
        },
        set _names(s) {
          c = s;
        },
        get _formState() {
          return t;
        },
        get _options() {
          return r;
        },
        set _options(s) {
          r = { ...r, ...s };
        },
      },
      subscribe: qt,
      trigger: he,
      register: Ie,
      handleSubmit: ot,
      watch: Pt,
      setValue: K,
      getValues: De,
      reset: dt,
      resetField: Kt,
      clearErrors: Bt,
      unregister: Te,
      setError: nt,
      setFocus: Ht,
      getFieldState: at,
    };
  return { ...ft, formControl: ft };
}
var le = () => {
    if (typeof crypto < "u" && crypto.randomUUID) return crypto.randomUUID();
    const e = typeof performance > "u" ? Date.now() : performance.now() * 1e3;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (r) => {
      const t = (Math.random() * 16 + e) % 16 | 0;
      return (r == "x" ? t : (t & 3) | 8).toString(16);
    });
  },
  Ke = (e, r, t = {}) =>
    t.shouldFocus || R(t.shouldFocus)
      ? t.focusName || `${e}.${R(t.focusIndex) ? r : t.focusIndex}.`
      : "",
  He = (e, r) => [...e, ...$(r)],
  $e = (e) => (Array.isArray(e) ? e.map(() => {}) : void 0);
function je(e, r, t) {
  return [...e.slice(0, r), ...$(t), ...e.slice(r)];
}
var ze = (e, r, t) =>
    Array.isArray(e)
      ? (R(e[t]) && (e[t] = void 0), e.splice(t, 0, e.splice(r, 1)[0]), e)
      : [],
  Qe = (e, r) => [...$(r), ...$(e)];
function pr(e, r) {
  let t = 0;
  const i = [...e];
  for (const l of r) (i.splice(l - t, 1), t++);
  return Le(i).length ? i : [];
}
var Ye = (e, r) =>
    R(r)
      ? []
      : pr(
          e,
          $(r).sort((t, i) => t - i),
        ),
  Je = (e, r, t) => {
    [e[r], e[t]] = [e[t], e[r]];
  },
  St = (e, r, t) => ((e[r] = t), e);
function Er(e) {
  const r = lr(),
    {
      control: t = r.control,
      name: i,
      keyName: l = "id",
      shouldUnregister: u,
      rules: d,
    } = e,
    [c, k] = x.useState(t._getFieldArray(i)),
    p = x.useRef(t._getFieldArray(i).map(le)),
    A = x.useRef(c),
    w = x.useRef(!1);
  ((A.current = c),
    t._names.array.add(i),
    x.useMemo(() => d && t.register(i, d), [t, d, i]),
    Ot(
      () =>
        t._subjects.array.subscribe({
          next: ({ values: g, name: b }) => {
            if (b === i || !b) {
              const m = h(g, i);
              Array.isArray(m) && (k(m), (p.current = m.map(le)));
            }
          },
        }).unsubscribe,
      [t, i],
    ));
  const _ = x.useCallback(
      (g) => {
        ((w.current = !0), t._setFieldArray(i, g));
      },
      [t, i],
    ),
    fe = (g, b) => {
      const m = $(M(g)),
        O = He(t._getFieldArray(i), m);
      ((t._names.focus = Ke(i, O.length - 1, b)),
        (p.current = He(p.current, m.map(le))),
        _(O),
        k(O),
        t._setFieldArray(i, O, He, { argA: $e(g) }));
    },
    X = (g, b) => {
      const m = $(M(g)),
        O = Qe(t._getFieldArray(i), m);
      ((t._names.focus = Ke(i, 0, b)),
        (p.current = Qe(p.current, m.map(le))),
        _(O),
        k(O),
        t._setFieldArray(i, O, Qe, { argA: $e(g) }));
    },
    L = (g) => {
      const b = Ye(t._getFieldArray(i), g);
      ((p.current = Ye(p.current, g)),
        _(b),
        k(b),
        !Array.isArray(h(t._fields, i)) && C(t._fields, i, void 0),
        t._setFieldArray(i, b, Ye, { argA: g }));
    },
    Z = (g, b, m) => {
      const O = $(M(b)),
        B = je(t._getFieldArray(i), g, O);
      ((t._names.focus = Ke(i, g, m)),
        (p.current = je(p.current, g, O.map(le))),
        _(B),
        k(B),
        t._setFieldArray(i, B, je, { argA: g, argB: $e(b) }));
    },
    Fe = (g, b) => {
      const m = t._getFieldArray(i);
      (Je(m, g, b),
        Je(p.current, g, b),
        _(m),
        k(m),
        t._setFieldArray(i, m, Je, { argA: g, argB: b }, !1));
    },
    F = (g, b) => {
      const m = t._getFieldArray(i);
      (ze(m, g, b),
        ze(p.current, g, b),
        _(m),
        k(m),
        t._setFieldArray(i, m, ze, { argA: g, argB: b }, !1));
    },
    Y = (g, b) => {
      const m = M(b),
        O = St(t._getFieldArray(i), g, m);
      ((p.current = [...O].map((B, G) =>
        !B || G === g ? le() : p.current[G],
      )),
        _(O),
        k([...O]),
        t._setFieldArray(i, O, St, { argA: g, argB: m }, !0, !1));
    },
    j = (g) => {
      const b = $(M(g));
      ((p.current = b.map(le)),
        _([...b]),
        k([...b]),
        t._setFieldArray(i, [...b], (m) => m, {}, !0, !1));
    };
  return (
    x.useEffect(() => {
      if (
        ((t._state.action = !1),
        Ge(i, t._names) && t._subjects.state.next({ ...t._formState }),
        w.current &&
          (!me(t._options.mode).isOnSubmit || t._formState.isSubmitted) &&
          !me(t._options.reValidateMode).isOnSubmit)
      )
        if (t._options.resolver)
          t._runSchema([i]).then((g) => {
            const b = h(g.errors, i),
              m = h(t._formState.errors, i);
            (m
              ? (!b && m.type) ||
                (b && (m.type !== b.type || m.message !== b.message))
              : b && b.type) &&
              (b ? C(t._formState.errors, i, b) : I(t._formState.errors, i),
              t._subjects.state.next({ errors: t._formState.errors }));
          });
        else {
          const g = h(t._fields, i);
          g &&
            g._f &&
            !(
              me(t._options.reValidateMode).isOnSubmit &&
              me(t._options.mode).isOnSubmit
            ) &&
            et(
              g,
              t._names.disabled,
              t._formValues,
              t._options.criteriaMode === Q.all,
              t._options.shouldUseNativeValidation,
              !0,
            ).then(
              (b) =>
                !q(b) &&
                t._subjects.state.next({
                  errors: Nt(t._formState.errors, b, i),
                }),
            );
        }
      (t._subjects.state.next({ name: i, values: M(t._formValues) }),
        t._names.focus &&
          Ae(t._fields, (g, b) => {
            if (t._names.focus && b.startsWith(t._names.focus) && g.focus)
              return (g.focus(), 1);
          }),
        (t._names.focus = ""),
        t._setValid(),
        (w.current = !1));
    }, [c, i, t]),
    x.useEffect(
      () => (
        !h(t._formValues, i) && t._setFieldArray(i),
        () => {
          const g = (b, m) => {
            const O = h(t._fields, b);
            O && O._f && (O._f.mount = m);
          };
          t._options.shouldUnregister || u ? t.unregister(i) : g(i, !1);
        }
      ),
      [i, t, l, u],
    ),
    {
      swap: x.useCallback(Fe, [_, i, t]),
      move: x.useCallback(F, [_, i, t]),
      prepend: x.useCallback(X, [_, i, t]),
      append: x.useCallback(fe, [_, i, t]),
      remove: x.useCallback(L, [_, i, t]),
      insert: x.useCallback(Z, [_, i, t]),
      update: x.useCallback(Y, [_, i, t]),
      replace: x.useCallback(j, [_, i, t]),
      fields: x.useMemo(
        () => c.map((g, b) => ({ ...g, [l]: p.current[b] || le() })),
        [c, l],
      ),
    }
  );
}
function Cr(e = {}) {
  const r = x.useRef(void 0),
    t = x.useRef(void 0),
    [i, l] = x.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: J(e.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1,
      isReady: !1,
      defaultValues: J(e.defaultValues) ? void 0 : e.defaultValues,
    });
  if (!r.current)
    if (e.formControl)
      ((r.current = { ...e.formControl, formState: i }),
        e.defaultValues &&
          !J(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      const { formControl: d, ...c } = xr(e);
      r.current = { ...c, formState: i };
    }
  const u = r.current.control;
  return (
    (u._options = e),
    Ot(() => {
      const d = u._subscribe({
        formState: u._proxyFormState,
        callback: () => l({ ...u._formState }),
        reRenderRoot: !0,
      });
      return (
        l((c) => ({ ...c, isReady: !0 })),
        (u._formState.isReady = !0),
        d
      );
    }, [u]),
    x.useEffect(() => u._disableForm(e.disabled), [u, e.disabled]),
    x.useEffect(() => {
      (e.mode && (u._options.mode = e.mode),
        e.reValidateMode && (u._options.reValidateMode = e.reValidateMode));
    }, [u, e.mode, e.reValidateMode]),
    x.useEffect(() => {
      e.errors && (u._setErrors(e.errors), u._focusError());
    }, [u, e.errors]),
    x.useEffect(() => {
      e.shouldUnregister && u._subjects.state.next({ values: u._getWatch() });
    }, [u, e.shouldUnregister]),
    x.useEffect(() => {
      if (u._proxyFormState.isDirty) {
        const d = u._getDirty();
        d !== i.isDirty && u._subjects.state.next({ isDirty: d });
      }
    }, [u, i.isDirty]),
    x.useEffect(() => {
      e.values && !oe(e.values, t.current)
        ? (u._reset(e.values, {
            keepFieldsRef: !0,
            ...u._options.resetOptions,
          }),
          (t.current = e.values),
          l((d) => ({ ...d })))
        : u._resetDefaultValues();
    }, [u, e.values]),
    x.useEffect(() => {
      (u._state.mount || (u._setValid(), (u._state.mount = !0)),
        u._state.watch &&
          ((u._state.watch = !1), u._subjects.state.next({ ...u._formState })),
        u._removeUnmounted());
    }),
    (r.current.formState = or(i, u)),
    r.current
  );
}
const Or = ({
  url: e = [],
  baseUrl: r,
  method: t,
  options: i = {},
  config: l = {},
}) => {
  const { mutate: u } = tr(e, r);
  return {
    query: sr({
      mutationKey: e,
      mutationFn: (c) => u({ data: c, options: { ...l, method: t } }),
      ...i,
    }),
  };
};
export { Or as a, Er as b, dr as c, h as g, C as s, Cr as u };
