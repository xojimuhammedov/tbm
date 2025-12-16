var nt = (e) => {
  throw TypeError(e);
};
var Ue = (e, t, n) => t.has(e) || nt("Cannot " + n);
var h = (e, t, n) => (
    Ue(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  F = (e, t, n) =>
    t.has(e)
      ? nt("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  T = (e, t, n, s) => (
    Ue(e, t, "write to private field"),
    s ? s.call(e, n) : t.set(e, n),
    n
  ),
  x = (e, t, n) => (Ue(e, t, "access private method"), n);
import {
  az as Yt,
  aH as st,
  aI as q,
  aA as ke,
  aJ as ue,
  aE as Be,
  aK as Ie,
  aL as rt,
  aM as en,
  aN as tn,
  aO as nn,
  aP as ot,
  aD as Tt,
  r as L,
  aF as sn,
  v as rn,
  s as Ct,
  aQ as on,
  q as an,
  i as cn,
} from "./index-ADhmmBpU.js";
import { l as it } from "./lodash-BI9_Ro3R.js";
import { u as un } from "./button-Bp2lHjov-bkEUXTzY.js";
var D,
  R,
  fe,
  _,
  W,
  ee,
  $,
  J,
  de,
  te,
  ne,
  K,
  X,
  Q,
  se,
  S,
  ce,
  je,
  ve,
  qe,
  Me,
  He,
  ze,
  $e,
  At,
  Ot,
  ln =
    ((Ot = class extends Yt {
      constructor(t, n) {
        super();
        F(this, S);
        F(this, D);
        F(this, R);
        F(this, fe);
        F(this, _);
        F(this, W);
        F(this, ee);
        F(this, $);
        F(this, J);
        F(this, de);
        F(this, te);
        F(this, ne);
        F(this, K);
        F(this, X);
        F(this, Q);
        F(this, se, new Set());
        ((this.options = n),
          T(this, D, t),
          T(this, J, null),
          T(this, $, st()),
          this.options.experimental_prefetchInRender ||
            h(this, $).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            ),
          this.bindMethods(),
          this.setOptions(n));
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (h(this, R).addObserver(this),
          at(h(this, R), this.options)
            ? x(this, S, ce).call(this)
            : this.updateResult(),
          x(this, S, Me).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return Je(h(this, R), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return Je(h(this, R), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          x(this, S, He).call(this),
          x(this, S, ze).call(this),
          h(this, R).removeObserver(this));
      }
      setOptions(t) {
        const n = this.options,
          s = h(this, R);
        if (
          ((this.options = h(this, D).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof q(this.options.enabled, h(this, R)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean",
          );
        (x(this, S, $e).call(this),
          h(this, R).setOptions(this.options),
          n._defaulted &&
            !ke(this.options, n) &&
            h(this, D)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: h(this, R),
                observer: this,
              }));
        const r = this.hasListeners();
        (r && ct(h(this, R), s, this.options, n) && x(this, S, ce).call(this),
          this.updateResult(),
          r &&
            (h(this, R) !== s ||
              q(this.options.enabled, h(this, R)) !==
                q(n.enabled, h(this, R)) ||
              ue(this.options.staleTime, h(this, R)) !==
                ue(n.staleTime, h(this, R))) &&
            x(this, S, je).call(this));
        const o = x(this, S, ve).call(this);
        r &&
          (h(this, R) !== s ||
            q(this.options.enabled, h(this, R)) !== q(n.enabled, h(this, R)) ||
            o !== h(this, Q)) &&
          x(this, S, qe).call(this, o);
      }
      getOptimisticResult(t) {
        const n = h(this, D).getQueryCache().build(h(this, D), t),
          s = this.createResult(n, t);
        return (
          dn(this, s) &&
            (T(this, _, s),
            T(this, ee, this.options),
            T(this, W, h(this, R).state)),
          s
        );
      }
      getCurrentResult() {
        return h(this, _);
      }
      trackResult(t, n) {
        return new Proxy(t, {
          get: (s, r) => (
            this.trackProp(r),
            n == null || n(r),
            Reflect.get(s, r)
          ),
        });
      }
      trackProp(t) {
        h(this, se).add(t);
      }
      getCurrentQuery() {
        return h(this, R);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = h(this, D).defaultQueryOptions(t),
          s = h(this, D).getQueryCache().build(h(this, D), n);
        return s.fetch().then(() => this.createResult(s, n));
      }
      fetch(t) {
        return x(this, S, ce)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), h(this, _)));
      }
      createResult(t, n) {
        var ie;
        const s = h(this, R),
          r = this.options,
          o = h(this, _),
          i = h(this, W),
          c = h(this, ee),
          u = t !== s ? t.state : h(this, fe),
          { state: l } = t;
        let f = { ...l },
          g = !1,
          w;
        if (n._optimisticResults) {
          const j = this.hasListeners(),
            be = !j && at(t, n),
            Y = j && ct(t, s, n, r);
          ((be || Y) && (f = { ...f, ...nn(l.data, t.options) }),
            n._optimisticResults === "isRestoring" && (f.fetchStatus = "idle"));
        }
        let { error: m, errorUpdatedAt: y, status: p } = f;
        w = f.data;
        let E = !1;
        if (n.placeholderData !== void 0 && w === void 0 && p === "pending") {
          let j;
          (o != null &&
          o.isPlaceholderData &&
          n.placeholderData === (c == null ? void 0 : c.placeholderData)
            ? ((j = o.data), (E = !0))
            : (j =
                typeof n.placeholderData == "function"
                  ? n.placeholderData(
                      (ie = h(this, ne)) == null ? void 0 : ie.state.data,
                      h(this, ne),
                    )
                  : n.placeholderData),
            j !== void 0 &&
              ((p = "success"),
              (w = ot(o == null ? void 0 : o.data, j, n)),
              (g = !0)));
        }
        if (n.select && w !== void 0 && !E)
          if (
            o &&
            w === (i == null ? void 0 : i.data) &&
            n.select === h(this, de)
          )
            w = h(this, te);
          else
            try {
              (T(this, de, n.select),
                (w = n.select(w)),
                (w = ot(o == null ? void 0 : o.data, w, n)),
                T(this, te, w),
                T(this, J, null));
            } catch (j) {
              T(this, J, j);
            }
        h(this, J) &&
          ((m = h(this, J)),
          (w = h(this, te)),
          (y = Date.now()),
          (p = "error"));
        const O = f.fetchStatus === "fetching",
          C = p === "pending",
          I = p === "error",
          P = C && O,
          v = w !== void 0,
          U = {
            status: p,
            fetchStatus: f.fetchStatus,
            isPending: C,
            isSuccess: p === "success",
            isError: I,
            isInitialLoading: P,
            isLoading: P,
            data: w,
            dataUpdatedAt: f.dataUpdatedAt,
            error: m,
            errorUpdatedAt: y,
            failureCount: f.fetchFailureCount,
            failureReason: f.fetchFailureReason,
            errorUpdateCount: f.errorUpdateCount,
            isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
            isFetchedAfterMount:
              f.dataUpdateCount > u.dataUpdateCount ||
              f.errorUpdateCount > u.errorUpdateCount,
            isFetching: O,
            isRefetching: O && !C,
            isLoadingError: I && !v,
            isPaused: f.fetchStatus === "paused",
            isPlaceholderData: g,
            isRefetchError: I && v,
            isStale: Ze(t, n),
            refetch: this.refetch,
            promise: h(this, $),
            isEnabled: q(n.enabled, t) !== !1,
          };
        if (this.options.experimental_prefetchInRender) {
          const j = (we) => {
              U.status === "error"
                ? we.reject(U.error)
                : U.data !== void 0 && we.resolve(U.data);
            },
            be = () => {
              const we = T(this, $, (U.promise = st()));
              j(we);
            },
            Y = h(this, $);
          switch (Y.status) {
            case "pending":
              t.queryHash === s.queryHash && j(Y);
              break;
            case "fulfilled":
              (U.status === "error" || U.data !== Y.value) && be();
              break;
            case "rejected":
              (U.status !== "error" || U.error !== Y.reason) && be();
              break;
          }
        }
        return U;
      }
      updateResult() {
        const t = h(this, _),
          n = this.createResult(h(this, R), this.options);
        if (
          (T(this, W, h(this, R).state),
          T(this, ee, this.options),
          h(this, W).data !== void 0 && T(this, ne, h(this, R)),
          ke(n, t))
        )
          return;
        T(this, _, n);
        const s = () => {
          if (!t) return !0;
          const { notifyOnChangeProps: r } = this.options,
            o = typeof r == "function" ? r() : r;
          if (o === "all" || (!o && !h(this, se).size)) return !0;
          const i = new Set(o ?? h(this, se));
          return (
            this.options.throwOnError && i.add("error"),
            Object.keys(h(this, _)).some((c) => {
              const d = c;
              return h(this, _)[d] !== t[d] && i.has(d);
            })
          );
        };
        x(this, S, At).call(this, { listeners: s() });
      }
      onQueryUpdate() {
        (this.updateResult(), this.hasListeners() && x(this, S, Me).call(this));
      }
    }),
    (D = new WeakMap()),
    (R = new WeakMap()),
    (fe = new WeakMap()),
    (_ = new WeakMap()),
    (W = new WeakMap()),
    (ee = new WeakMap()),
    ($ = new WeakMap()),
    (J = new WeakMap()),
    (de = new WeakMap()),
    (te = new WeakMap()),
    (ne = new WeakMap()),
    (K = new WeakMap()),
    (X = new WeakMap()),
    (Q = new WeakMap()),
    (se = new WeakMap()),
    (S = new WeakSet()),
    (ce = function (t) {
      x(this, S, $e).call(this);
      let n = h(this, R).fetch(this.options, t);
      return ((t != null && t.throwOnError) || (n = n.catch(Be)), n);
    }),
    (je = function () {
      x(this, S, He).call(this);
      const t = ue(this.options.staleTime, h(this, R));
      if (Ie || h(this, _).isStale || !rt(t)) return;
      const s = en(h(this, _).dataUpdatedAt, t) + 1;
      T(
        this,
        K,
        setTimeout(() => {
          h(this, _).isStale || this.updateResult();
        }, s),
      );
    }),
    (ve = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(h(this, R))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (qe = function (t) {
      (x(this, S, ze).call(this),
        T(this, Q, t),
        !(
          Ie ||
          q(this.options.enabled, h(this, R)) === !1 ||
          !rt(h(this, Q)) ||
          h(this, Q) === 0
        ) &&
          T(
            this,
            X,
            setInterval(
              () => {
                (this.options.refetchIntervalInBackground || tn.isFocused()) &&
                  x(this, S, ce).call(this);
              },
              h(this, Q),
            ),
          ));
    }),
    (Me = function () {
      (x(this, S, je).call(this),
        x(this, S, qe).call(this, x(this, S, ve).call(this)));
    }),
    (He = function () {
      h(this, K) && (clearTimeout(h(this, K)), T(this, K, void 0));
    }),
    (ze = function () {
      h(this, X) && (clearInterval(h(this, X)), T(this, X, void 0));
    }),
    ($e = function () {
      const t = h(this, D).getQueryCache().build(h(this, D), this.options);
      if (t === h(this, R)) return;
      const n = h(this, R);
      (T(this, R, t),
        T(this, fe, t.state),
        this.hasListeners() &&
          (n == null || n.removeObserver(this), t.addObserver(this)));
    }),
    (At = function (t) {
      Tt.batch(() => {
        (t.listeners &&
          this.listeners.forEach((n) => {
            n(h(this, _));
          }),
          h(this, D)
            .getQueryCache()
            .notify({ query: h(this, R), type: "observerResultsUpdated" }));
      });
    }),
    Ot);
function fn(e, t) {
  return (
    q(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function at(e, t) {
  return fn(e, t) || (e.state.data !== void 0 && Je(e, t, t.refetchOnMount));
}
function Je(e, t, n) {
  if (q(t.enabled, e) !== !1 && ue(t.staleTime, e) !== "static") {
    const s = typeof n == "function" ? n(e) : n;
    return s === "always" || (s !== !1 && Ze(e, t));
  }
  return !1;
}
function ct(e, t, n, s) {
  return (
    (e !== t || q(s.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    Ze(e, n)
  );
}
function Ze(e, t) {
  return q(t.enabled, e) !== !1 && e.isStaleByTime(ue(t.staleTime, e));
}
function dn(e, t) {
  return !ke(e.getCurrentResult(), t);
}
var xt = L.createContext(!1),
  hn = () => L.useContext(xt);
xt.Provider;
function pn() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var mn = L.createContext(pn()),
  yn = () => L.useContext(mn),
  bn = (e, t) => {
    (e.suspense || e.throwOnError || e.experimental_prefetchInRender) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  wn = (e) => {
    L.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  gn = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: s,
    suspense: r,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    s &&
    ((r && e.data === void 0) || sn(n, [e.error, s])),
  Rn = (e) => {
    if (e.suspense) {
      const t = (s) => (s === "static" ? s : Math.max(s ?? 1e3, 1e3)),
        n = e.staleTime;
      ((e.staleTime = typeof n == "function" ? (...s) => t(n(...s)) : t(n)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
    }
  },
  En = (e, t) => e.isLoading && e.isFetching && !t,
  Sn = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  ut = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function On(e, t, n) {
  var f, g, w, m, y;
  const s = hn(),
    r = yn(),
    o = rn(),
    i = o.defaultQueryOptions(e);
  ((g =
    (f = o.getDefaultOptions().queries) == null
      ? void 0
      : f._experimental_beforeQuery) == null || g.call(f, i),
    (i._optimisticResults = s ? "isRestoring" : "optimistic"),
    Rn(i),
    bn(i, r),
    wn(r));
  const c = !o.getQueryCache().get(i.queryHash),
    [d] = L.useState(() => new t(o, i)),
    u = d.getOptimisticResult(i),
    l = !s && e.subscribed !== !1;
  if (
    (L.useSyncExternalStore(
      L.useCallback(
        (p) => {
          const E = l ? d.subscribe(Tt.batchCalls(p)) : Be;
          return (d.updateResult(), E);
        },
        [d, l],
      ),
      () => d.getCurrentResult(),
      () => d.getCurrentResult(),
    ),
    L.useEffect(() => {
      d.setOptions(i);
    }, [i, d]),
    Sn(i, u))
  )
    throw ut(i, d, r);
  if (
    gn({
      result: u,
      errorResetBoundary: r,
      throwOnError: i.throwOnError,
      query: o.getQueryCache().get(i.queryHash),
      suspense: i.suspense,
    })
  )
    throw u.error;
  if (
    ((m =
      (w = o.getDefaultOptions().queries) == null
        ? void 0
        : w._experimental_afterQuery) == null || m.call(w, i, u),
    i.experimental_prefetchInRender && !Ie && En(u, s))
  ) {
    const p = c
      ? ut(i, d, r)
      : (y = o.getQueryCache().get(i.queryHash)) == null
        ? void 0
        : y.promise;
    p == null ||
      p.catch(Be).finally(() => {
        d.updateResult();
      });
  }
  return i.notifyOnChangeProps ? u : d.trackResult(u);
}
function ir(e, t) {
  return On(e, ln);
}
function Pt(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Tn } = Object.prototype,
  { getPrototypeOf: Ye } = Object,
  { iterator: Ce, toStringTag: Ft } = Symbol,
  Ae = ((e) => (t) => {
    const n = Tn.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  M = (e) => ((e = e.toLowerCase()), (t) => Ae(t) === e),
  xe = (e) => (t) => typeof t === e,
  { isArray: re } = Array,
  le = xe("undefined");
function he(e) {
  return (
    e !== null &&
    !le(e) &&
    e.constructor !== null &&
    !le(e.constructor) &&
    k(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Nt = M("ArrayBuffer");
function Cn(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Nt(e.buffer)),
    t
  );
}
const An = xe("string"),
  k = xe("function"),
  Ut = xe("number"),
  pe = (e) => e !== null && typeof e == "object",
  xn = (e) => e === !0 || e === !1,
  ge = (e) => {
    if (Ae(e) !== "object") return !1;
    const t = Ye(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Ft in e) &&
      !(Ce in e)
    );
  },
  Pn = (e) => {
    if (!pe(e) || he(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Fn = M("Date"),
  Nn = M("File"),
  Un = M("Blob"),
  _n = M("FileList"),
  Ln = (e) => pe(e) && k(e.pipe),
  Dn = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (k(e.append) &&
          ((t = Ae(e)) === "formdata" ||
            (t === "object" &&
              k(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  kn = M("URLSearchParams"),
  [Bn, In, jn, vn] = ["ReadableStream", "Request", "Response", "Headers"].map(
    M,
  ),
  qn = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function me(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let s, r;
  if ((typeof e != "object" && (e = [e]), re(e)))
    for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
  else {
    if (he(e)) return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let c;
    for (s = 0; s < i; s++) ((c = o[s]), t.call(null, e[c], c, e));
  }
}
function _t(e, t) {
  if (he(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length,
    r;
  for (; s-- > 0; ) if (((r = n[s]), t === r.toLowerCase())) return r;
  return null;
}
const V =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Lt = (e) => !le(e) && e !== V;
function Qe() {
  const { caseless: e } = (Lt(this) && this) || {},
    t = {},
    n = (s, r) => {
      const o = (e && _t(t, r)) || r;
      ge(t[o]) && ge(s)
        ? (t[o] = Qe(t[o], s))
        : ge(s)
          ? (t[o] = Qe({}, s))
          : re(s)
            ? (t[o] = s.slice())
            : (t[o] = s);
    };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && me(arguments[s], n);
  return t;
}
const Mn = (e, t, n, { allOwnKeys: s } = {}) => (
    me(
      t,
      (r, o) => {
        n && k(r) ? (e[o] = Pt(r, n)) : (e[o] = r);
      },
      { allOwnKeys: s },
    ),
    e
  ),
  Hn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  zn = (e, t, n, s) => {
    ((e.prototype = Object.create(t.prototype, s)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  $n = (e, t, n, s) => {
    let r, o, i;
    const c = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
        ((i = r[o]),
          (!s || s(i, e, t)) && !c[i] && ((t[i] = e[i]), (c[i] = !0)));
      e = n !== !1 && Ye(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Jn = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const s = e.indexOf(t, n);
    return s !== -1 && s === n;
  },
  Qn = (e) => {
    if (!e) return null;
    if (re(e)) return e;
    let t = e.length;
    if (!Ut(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Vn = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Ye(Uint8Array)),
  Wn = (e, t) => {
    const s = (e && e[Ce]).call(e);
    let r;
    for (; (r = s.next()) && !r.done; ) {
      const o = r.value;
      t.call(e, o[0], o[1]);
    }
  },
  Kn = (e, t) => {
    let n;
    const s = [];
    for (; (n = e.exec(t)) !== null; ) s.push(n);
    return s;
  },
  Xn = M("HTMLFormElement"),
  Gn = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, r) {
      return s.toUpperCase() + r;
    }),
  lt = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Zn = M("RegExp"),
  Dt = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      s = {};
    (me(n, (r, o) => {
      let i;
      (i = t(r, o, e)) !== !1 && (s[o] = i || r);
    }),
      Object.defineProperties(e, s));
  },
  Yn = (e) => {
    Dt(e, (t, n) => {
      if (k(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const s = e[n];
      if (k(s)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  es = (e, t) => {
    const n = {},
      s = (r) => {
        r.forEach((o) => {
          n[o] = !0;
        });
      };
    return (re(e) ? s(e) : s(String(e).split(t)), n);
  },
  ts = () => {},
  ns = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function ss(e) {
  return !!(e && k(e.append) && e[Ft] === "FormData" && e[Ce]);
}
const rs = (e) => {
    const t = new Array(10),
      n = (s, r) => {
        if (pe(s)) {
          if (t.indexOf(s) >= 0) return;
          if (he(s)) return s;
          if (!("toJSON" in s)) {
            t[r] = s;
            const o = re(s) ? [] : {};
            return (
              me(s, (i, c) => {
                const d = n(i, r + 1);
                !le(d) && (o[c] = d);
              }),
              (t[r] = void 0),
              o
            );
          }
        }
        return s;
      };
    return n(e, 0);
  },
  os = M("AsyncFunction"),
  is = (e) => e && (pe(e) || k(e)) && k(e.then) && k(e.catch),
  kt = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, s) => (
            V.addEventListener(
              "message",
              ({ source: r, data: o }) => {
                r === V && o === n && s.length && s.shift()();
              },
              !1,
            ),
            (r) => {
              (s.push(r), V.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    k(V.postMessage),
  ),
  as =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(V)
      : (typeof process < "u" && process.nextTick) || kt,
  cs = (e) => e != null && k(e[Ce]),
  a = {
    isArray: re,
    isArrayBuffer: Nt,
    isBuffer: he,
    isFormData: Dn,
    isArrayBufferView: Cn,
    isString: An,
    isNumber: Ut,
    isBoolean: xn,
    isObject: pe,
    isPlainObject: ge,
    isEmptyObject: Pn,
    isReadableStream: Bn,
    isRequest: In,
    isResponse: jn,
    isHeaders: vn,
    isUndefined: le,
    isDate: Fn,
    isFile: Nn,
    isBlob: Un,
    isRegExp: Zn,
    isFunction: k,
    isStream: Ln,
    isURLSearchParams: kn,
    isTypedArray: Vn,
    isFileList: _n,
    forEach: me,
    merge: Qe,
    extend: Mn,
    trim: qn,
    stripBOM: Hn,
    inherits: zn,
    toFlatObject: $n,
    kindOf: Ae,
    kindOfTest: M,
    endsWith: Jn,
    toArray: Qn,
    forEachEntry: Wn,
    matchAll: Kn,
    isHTMLForm: Xn,
    hasOwnProperty: lt,
    hasOwnProp: lt,
    reduceDescriptors: Dt,
    freezeMethods: Yn,
    toObjectSet: es,
    toCamelCase: Gn,
    noop: ts,
    toFiniteNumber: ns,
    findKey: _t,
    global: V,
    isContextDefined: Lt,
    isSpecCompliantForm: ss,
    toJSONObject: rs,
    isAsyncFn: os,
    isThenable: is,
    setImmediate: kt,
    asap: as,
    isIterable: cs,
  };
function b(e, t, n, s, r) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    s && (this.request = s),
    r && ((this.response = r), (this.status = r.status ? r.status : null)));
}
a.inherits(b, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: a.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Bt = b.prototype,
  It = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  It[e] = { value: e };
});
Object.defineProperties(b, It);
Object.defineProperty(Bt, "isAxiosError", { value: !0 });
b.from = (e, t, n, s, r, o) => {
  const i = Object.create(Bt);
  return (
    a.toFlatObject(
      e,
      i,
      function (d) {
        return d !== Error.prototype;
      },
      (c) => c !== "isAxiosError",
    ),
    b.call(i, e.message, t, n, s, r),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const us = null;
function Ve(e) {
  return a.isPlainObject(e) || a.isArray(e);
}
function jt(e) {
  return a.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ft(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (r, o) {
          return ((r = jt(r)), !n && o ? "[" + r + "]" : r);
        })
        .join(n ? "." : "")
    : t;
}
function ls(e) {
  return a.isArray(e) && !e.some(Ve);
}
const fs = a.toFlatObject(a, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Pe(e, t, n) {
  if (!a.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = a.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, p) {
        return !a.isUndefined(p[y]);
      },
    )));
  const s = n.metaTokens,
    r = n.visitor || l,
    o = n.dots,
    i = n.indexes,
    d = (n.Blob || (typeof Blob < "u" && Blob)) && a.isSpecCompliantForm(t);
  if (!a.isFunction(r)) throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (a.isDate(m)) return m.toISOString();
    if (a.isBoolean(m)) return m.toString();
    if (!d && a.isBlob(m))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(m) || a.isTypedArray(m)
      ? d && typeof Blob == "function"
        ? new Blob([m])
        : Buffer.from(m)
      : m;
  }
  function l(m, y, p) {
    let E = m;
    if (m && !p && typeof m == "object") {
      if (a.endsWith(y, "{}"))
        ((y = s ? y : y.slice(0, -2)), (m = JSON.stringify(m)));
      else if (
        (a.isArray(m) && ls(m)) ||
        ((a.isFileList(m) || a.endsWith(y, "[]")) && (E = a.toArray(m)))
      )
        return (
          (y = jt(y)),
          E.forEach(function (C, I) {
            !(a.isUndefined(C) || C === null) &&
              t.append(
                i === !0 ? ft([y], I, o) : i === null ? y : y + "[]",
                u(C),
              );
          }),
          !1
        );
    }
    return Ve(m) ? !0 : (t.append(ft(p, y, o), u(m)), !1);
  }
  const f = [],
    g = Object.assign(fs, {
      defaultVisitor: l,
      convertValue: u,
      isVisitable: Ve,
    });
  function w(m, y) {
    if (!a.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      (f.push(m),
        a.forEach(m, function (E, O) {
          (!(a.isUndefined(E) || E === null) &&
            r.call(t, E, a.isString(O) ? O.trim() : O, y, g)) === !0 &&
            w(E, y ? y.concat(O) : [O]);
        }),
        f.pop());
    }
  }
  if (!a.isObject(e)) throw new TypeError("data must be an object");
  return (w(e), t);
}
function dt(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
    return t[s];
  });
}
function et(e, t) {
  ((this._pairs = []), e && Pe(e, this, t));
}
const vt = et.prototype;
vt.append = function (t, n) {
  this._pairs.push([t, n]);
};
vt.toString = function (t) {
  const n = t
    ? function (s) {
        return t.call(this, s, dt);
      }
    : dt;
  return this._pairs
    .map(function (r) {
      return n(r[0]) + "=" + n(r[1]);
    }, "")
    .join("&");
};
function ds(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function qt(e, t, n) {
  if (!t) return e;
  const s = (n && n.encode) || ds;
  a.isFunction(n) && (n = { serialize: n });
  const r = n && n.serialize;
  let o;
  if (
    (r
      ? (o = r(t, n))
      : (o = a.isURLSearchParams(t) ? t.toString() : new et(t, n).toString(s)),
    o)
  ) {
    const i = e.indexOf("#");
    (i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o));
  }
  return e;
}
class ht {
  constructor() {
    this.handlers = [];
  }
  use(t, n, s) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    a.forEach(this.handlers, function (s) {
      s !== null && t(s);
    });
  }
}
const Mt = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  hs = typeof URLSearchParams < "u" ? URLSearchParams : et,
  ps = typeof FormData < "u" ? FormData : null,
  ms = typeof Blob < "u" ? Blob : null,
  ys = {
    isBrowser: !0,
    classes: { URLSearchParams: hs, FormData: ps, Blob: ms },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  tt = typeof window < "u" && typeof document < "u",
  We = (typeof navigator == "object" && navigator) || void 0,
  bs =
    tt &&
    (!We || ["ReactNative", "NativeScript", "NS"].indexOf(We.product) < 0),
  ws =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  gs = (tt && window.location.href) || "http://localhost",
  Rs = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: tt,
        hasStandardBrowserEnv: bs,
        hasStandardBrowserWebWorkerEnv: ws,
        navigator: We,
        origin: gs,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  N = { ...Rs, ...ys };
function Es(e, t) {
  return Pe(e, new N.classes.URLSearchParams(), {
    visitor: function (n, s, r, o) {
      return N.isNode && a.isBuffer(n)
        ? (this.append(s, n.toString("base64")), !1)
        : o.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function Ss(e) {
  return a
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Os(e) {
  const t = {},
    n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++) ((o = n[s]), (t[o] = e[o]));
  return t;
}
function Ht(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const c = Number.isFinite(+i),
      d = o >= n.length;
    return (
      (i = !i && a.isArray(r) ? r.length : i),
      d
        ? (a.hasOwnProp(r, i) ? (r[i] = [r[i], s]) : (r[i] = s), !c)
        : ((!r[i] || !a.isObject(r[i])) && (r[i] = []),
          t(n, s, r[i], o) && a.isArray(r[i]) && (r[i] = Os(r[i])),
          !c)
    );
  }
  if (a.isFormData(e) && a.isFunction(e.entries)) {
    const n = {};
    return (
      a.forEachEntry(e, (s, r) => {
        t(Ss(s), r, n, 0);
      }),
      n
    );
  }
  return null;
}
function Ts(e, t, n) {
  if (a.isString(e))
    try {
      return ((t || JSON.parse)(e), a.trim(e));
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (n || JSON.stringify)(e);
}
const ye = {
  transitional: Mt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const s = n.getContentType() || "",
        r = s.indexOf("application/json") > -1,
        o = a.isObject(t);
      if ((o && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t)))
        return r ? JSON.stringify(Ht(t)) : t;
      if (
        a.isArrayBuffer(t) ||
        a.isBuffer(t) ||
        a.isStream(t) ||
        a.isFile(t) ||
        a.isBlob(t) ||
        a.isReadableStream(t)
      )
        return t;
      if (a.isArrayBufferView(t)) return t.buffer;
      if (a.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let c;
      if (o) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return Es(t, this.formSerializer).toString();
        if ((c = a.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
          const d = this.env && this.env.FormData;
          return Pe(
            c ? { "files[]": t } : t,
            d && new d(),
            this.formSerializer,
          );
        }
      }
      return o || r ? (n.setContentType("application/json", !1), Ts(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || ye.transitional,
        s = n && n.forcedJSONParsing,
        r = this.responseType === "json";
      if (a.isResponse(t) || a.isReadableStream(t)) return t;
      if (t && a.isString(t) && ((s && !this.responseType) || r)) {
        const i = !(n && n.silentJSONParsing) && r;
        try {
          return JSON.parse(t);
        } catch (c) {
          if (i)
            throw c.name === "SyntaxError"
              ? b.from(c, b.ERR_BAD_RESPONSE, this, null, this.response)
              : c;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: N.classes.FormData, Blob: N.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ye.headers[e] = {};
});
const Cs = a.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  As = (e) => {
    const t = {};
    let n, s, r;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((r = i.indexOf(":")),
              (n = i.substring(0, r).trim().toLowerCase()),
              (s = i.substring(r + 1).trim()),
              !(!n || (t[n] && Cs[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(s)
                    : (t[n] = [s])
                  : (t[n] = t[n] ? t[n] + ", " + s : s)));
          }),
      t
    );
  },
  pt = Symbol("internals");
function ae(e) {
  return e && String(e).trim().toLowerCase();
}
function Re(e) {
  return e === !1 || e == null ? e : a.isArray(e) ? e.map(Re) : String(e);
}
function xs(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = n.exec(e)); ) t[s[1]] = s[2];
  return t;
}
const Ps = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function _e(e, t, n, s, r) {
  if (a.isFunction(s)) return s.call(this, t, n);
  if ((r && (t = n), !!a.isString(t))) {
    if (a.isString(s)) return t.indexOf(s) !== -1;
    if (a.isRegExp(s)) return s.test(t);
  }
}
function Fs(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Ns(e, t) {
  const n = a.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function (r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0,
    });
  });
}
let B = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(c, d, u) {
      const l = ae(d);
      if (!l) throw new Error("header name must be a non-empty string");
      const f = a.findKey(r, l);
      (!f || r[f] === void 0 || u === !0 || (u === void 0 && r[f] !== !1)) &&
        (r[f || d] = Re(c));
    }
    const i = (c, d) => a.forEach(c, (u, l) => o(u, l, d));
    if (a.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (a.isString(t) && (t = t.trim()) && !Ps(t)) i(As(t), n);
    else if (a.isObject(t) && a.isIterable(t)) {
      let c = {},
        d,
        u;
      for (const l of t) {
        if (!a.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        c[(u = l[0])] = (d = c[u])
          ? a.isArray(d)
            ? [...d, l[1]]
            : [d, l[1]]
          : l[1];
      }
      i(c, n);
    } else t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (((t = ae(t)), t)) {
      const s = a.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n) return r;
        if (n === !0) return xs(r);
        if (a.isFunction(n)) return n.call(this, r, s);
        if (a.isRegExp(n)) return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = ae(t)), t)) {
      const s = a.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || _e(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (((i = ae(i)), i)) {
        const c = a.findKey(s, i);
        c && (!n || _e(s, s[c], c, n)) && (delete s[c], (r = !0));
      }
    }
    return (a.isArray(t) ? t.forEach(o) : o(t), r);
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length,
      r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || _e(this, this[o], o, t, !0)) && (delete this[o], (r = !0));
    }
    return r;
  }
  normalize(t) {
    const n = this,
      s = {};
    return (
      a.forEach(this, (r, o) => {
        const i = a.findKey(s, o);
        if (i) {
          ((n[i] = Re(r)), delete n[o]);
          return;
        }
        const c = t ? Fs(o) : String(o).trim();
        (c !== o && delete n[o], (n[c] = Re(r)), (s[c] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      a.forEach(this, (s, r) => {
        s != null && s !== !1 && (n[r] = t && a.isArray(s) ? s.join(", ") : s);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return (n.forEach((r) => s.set(r)), s);
  }
  static accessor(t) {
    const s = (this[pt] = this[pt] = { accessors: {} }).accessors,
      r = this.prototype;
    function o(i) {
      const c = ae(i);
      s[c] || (Ns(r, i), (s[c] = !0));
    }
    return (a.isArray(t) ? t.forEach(o) : o(t), this);
  }
};
B.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
a.reduceDescriptors(B.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    },
  };
});
a.freezeMethods(B);
function Le(e, t) {
  const n = this || ye,
    s = t || n,
    r = B.from(s.headers);
  let o = s.data;
  return (
    a.forEach(e, function (c) {
      o = c.call(n, o, r.normalize(), t ? t.status : void 0);
    }),
    r.normalize(),
    o
  );
}
function zt(e) {
  return !!(e && e.__CANCEL__);
}
function oe(e, t, n) {
  (b.call(this, e ?? "canceled", b.ERR_CANCELED, t, n),
    (this.name = "CanceledError"));
}
a.inherits(oe, b, { __CANCEL__: !0 });
function $t(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status)
    ? e(n)
    : t(
        new b(
          "Request failed with status code " + n.status,
          [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function Us(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function _s(e, t) {
  e = e || 10;
  const n = new Array(e),
    s = new Array(e);
  let r = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (d) {
      const u = Date.now(),
        l = s[o];
      (i || (i = u), (n[r] = d), (s[r] = u));
      let f = o,
        g = 0;
      for (; f !== r; ) ((g += n[f++]), (f = f % e));
      if (((r = (r + 1) % e), r === o && (o = (o + 1) % e), u - i < t)) return;
      const w = l && u - l;
      return w ? Math.round((g * 1e3) / w) : void 0;
    }
  );
}
function Ls(e, t) {
  let n = 0,
    s = 1e3 / t,
    r,
    o;
  const i = (u, l = Date.now()) => {
    ((n = l), (r = null), o && (clearTimeout(o), (o = null)), e(...u));
  };
  return [
    (...u) => {
      const l = Date.now(),
        f = l - n;
      f >= s
        ? i(u, l)
        : ((r = u),
          o ||
            (o = setTimeout(() => {
              ((o = null), i(r));
            }, s - f)));
    },
    () => r && i(r),
  ];
}
const Se = (e, t, n = 3) => {
    let s = 0;
    const r = _s(50, 250);
    return Ls((o) => {
      const i = o.loaded,
        c = o.lengthComputable ? o.total : void 0,
        d = i - s,
        u = r(d),
        l = i <= c;
      s = i;
      const f = {
        loaded: i,
        total: c,
        progress: c ? i / c : void 0,
        bytes: d,
        rate: u || void 0,
        estimated: u && c && l ? (c - i) / u : void 0,
        event: o,
        lengthComputable: c != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  mt = (e, t) => {
    const n = e != null;
    return [(s) => t[0]({ lengthComputable: n, total: e, loaded: s }), t[1]];
  },
  yt =
    (e) =>
    (...t) =>
      a.asap(() => e(...t)),
  Ds = N.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, N.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(N.origin),
        N.navigator && /(msie|trident)/i.test(N.navigator.userAgent),
      )
    : () => !0,
  ks = N.hasStandardBrowserEnv
    ? {
        write(e, t, n, s, r, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          (a.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            a.isString(s) && i.push("path=" + s),
            a.isString(r) && i.push("domain=" + r),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; ")));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"),
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Bs(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Is(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Jt(e, t, n) {
  let s = !Bs(t);
  return e && (s || n == !1) ? Is(e, t) : t;
}
const bt = (e) => (e instanceof B ? { ...e } : e);
function Z(e, t) {
  t = t || {};
  const n = {};
  function s(u, l, f, g) {
    return a.isPlainObject(u) && a.isPlainObject(l)
      ? a.merge.call({ caseless: g }, u, l)
      : a.isPlainObject(l)
        ? a.merge({}, l)
        : a.isArray(l)
          ? l.slice()
          : l;
  }
  function r(u, l, f, g) {
    if (a.isUndefined(l)) {
      if (!a.isUndefined(u)) return s(void 0, u, f, g);
    } else return s(u, l, f, g);
  }
  function o(u, l) {
    if (!a.isUndefined(l)) return s(void 0, l);
  }
  function i(u, l) {
    if (a.isUndefined(l)) {
      if (!a.isUndefined(u)) return s(void 0, u);
    } else return s(void 0, l);
  }
  function c(u, l, f) {
    if (f in t) return s(u, l);
    if (f in e) return s(void 0, u);
  }
  const d = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: c,
    headers: (u, l, f) => r(bt(u), bt(l), f, !0),
  };
  return (
    a.forEach(Object.keys({ ...e, ...t }), function (l) {
      const f = d[l] || r,
        g = f(e[l], t[l], l);
      (a.isUndefined(g) && f !== c) || (n[l] = g);
    }),
    n
  );
}
const Qt = (e) => {
    const t = Z({}, e);
    let {
      data: n,
      withXSRFToken: s,
      xsrfHeaderName: r,
      xsrfCookieName: o,
      headers: i,
      auth: c,
    } = t;
    ((t.headers = i = B.from(i)),
      (t.url = qt(
        Jt(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      c &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (c.username || "") +
                ":" +
                (c.password ? unescape(encodeURIComponent(c.password)) : ""),
            ),
        ));
    let d;
    if (a.isFormData(n)) {
      if (N.hasStandardBrowserEnv || N.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((d = i.getContentType()) !== !1) {
        const [u, ...l] = d
          ? d
              .split(";")
              .map((f) => f.trim())
              .filter(Boolean)
          : [];
        i.setContentType([u || "multipart/form-data", ...l].join("; "));
      }
    }
    if (
      N.hasStandardBrowserEnv &&
      (s && a.isFunction(s) && (s = s(t)), s || (s !== !1 && Ds(t.url)))
    ) {
      const u = r && o && ks.read(o);
      u && i.set(r, u);
    }
    return t;
  },
  js = typeof XMLHttpRequest < "u",
  vs =
    js &&
    function (e) {
      return new Promise(function (n, s) {
        const r = Qt(e);
        let o = r.data;
        const i = B.from(r.headers).normalize();
        let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = r,
          l,
          f,
          g,
          w,
          m;
        function y() {
          (w && w(),
            m && m(),
            r.cancelToken && r.cancelToken.unsubscribe(l),
            r.signal && r.signal.removeEventListener("abort", l));
        }
        let p = new XMLHttpRequest();
        (p.open(r.method.toUpperCase(), r.url, !0), (p.timeout = r.timeout));
        function E() {
          if (!p) return;
          const C = B.from(
              "getAllResponseHeaders" in p && p.getAllResponseHeaders(),
            ),
            P = {
              data:
                !c || c === "text" || c === "json"
                  ? p.responseText
                  : p.response,
              status: p.status,
              statusText: p.statusText,
              headers: C,
              config: e,
              request: p,
            };
          ($t(
            function (z) {
              (n(z), y());
            },
            function (z) {
              (s(z), y());
            },
            P,
          ),
            (p = null));
        }
        ("onloadend" in p
          ? (p.onloadend = E)
          : (p.onreadystatechange = function () {
              !p ||
                p.readyState !== 4 ||
                (p.status === 0 &&
                  !(p.responseURL && p.responseURL.indexOf("file:") === 0)) ||
                setTimeout(E);
            }),
          (p.onabort = function () {
            p &&
              (s(new b("Request aborted", b.ECONNABORTED, e, p)), (p = null));
          }),
          (p.onerror = function () {
            (s(new b("Network Error", b.ERR_NETWORK, e, p)), (p = null));
          }),
          (p.ontimeout = function () {
            let I = r.timeout
              ? "timeout of " + r.timeout + "ms exceeded"
              : "timeout exceeded";
            const P = r.transitional || Mt;
            (r.timeoutErrorMessage && (I = r.timeoutErrorMessage),
              s(
                new b(
                  I,
                  P.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
                  e,
                  p,
                ),
              ),
              (p = null));
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in p &&
            a.forEach(i.toJSON(), function (I, P) {
              p.setRequestHeader(P, I);
            }),
          a.isUndefined(r.withCredentials) ||
            (p.withCredentials = !!r.withCredentials),
          c && c !== "json" && (p.responseType = r.responseType),
          u && (([g, m] = Se(u, !0)), p.addEventListener("progress", g)),
          d &&
            p.upload &&
            (([f, w] = Se(d)),
            p.upload.addEventListener("progress", f),
            p.upload.addEventListener("loadend", w)),
          (r.cancelToken || r.signal) &&
            ((l = (C) => {
              p &&
                (s(!C || C.type ? new oe(null, e, p) : C),
                p.abort(),
                (p = null));
            }),
            r.cancelToken && r.cancelToken.subscribe(l),
            r.signal &&
              (r.signal.aborted
                ? l()
                : r.signal.addEventListener("abort", l))));
        const O = Us(r.url);
        if (O && N.protocols.indexOf(O) === -1) {
          s(new b("Unsupported protocol " + O + ":", b.ERR_BAD_REQUEST, e));
          return;
        }
        p.send(o || null);
      });
    },
  qs = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let s = new AbortController(),
        r;
      const o = function (u) {
        if (!r) {
          ((r = !0), c());
          const l = u instanceof Error ? u : this.reason;
          s.abort(
            l instanceof b ? l : new oe(l instanceof Error ? l.message : l),
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          ((i = null), o(new b(`timeout ${t} of ms exceeded`, b.ETIMEDOUT)));
        }, t);
      const c = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((u) => {
            u.unsubscribe
              ? u.unsubscribe(o)
              : u.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((u) => u.addEventListener("abort", o));
      const { signal: d } = s;
      return ((d.unsubscribe = () => a.asap(c)), d);
    }
  },
  Ms = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let s = 0,
      r;
    for (; s < n; ) ((r = s + t), yield e.slice(s, r), (s = r));
  },
  Hs = async function* (e, t) {
    for await (const n of zs(e)) yield* Ms(n, t);
  },
  zs = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: s } = await t.read();
        if (n) break;
        yield s;
      }
    } finally {
      await t.cancel();
    }
  },
  wt = (e, t, n, s) => {
    const r = Hs(e, t);
    let o = 0,
      i,
      c = (d) => {
        i || ((i = !0), s && s(d));
      };
    return new ReadableStream(
      {
        async pull(d) {
          try {
            const { done: u, value: l } = await r.next();
            if (u) {
              (c(), d.close());
              return;
            }
            let f = l.byteLength;
            if (n) {
              let g = (o += f);
              n(g);
            }
            d.enqueue(new Uint8Array(l));
          } catch (u) {
            throw (c(u), u);
          }
        },
        cancel(d) {
          return (c(d), r.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Fe =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Vt = Fe && typeof ReadableStream == "function",
  $s =
    Fe &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  Wt = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Js =
    Vt &&
    Wt(() => {
      let e = !1;
      const t = new Request(N.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return ((e = !0), "half");
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  gt = 64 * 1024,
  Ke = Vt && Wt(() => a.isReadableStream(new Response("").body)),
  Oe = { stream: Ke && ((e) => e.body) };
Fe &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Oe[t] &&
        (Oe[t] = a.isFunction(e[t])
          ? (n) => n[t]()
          : (n, s) => {
              throw new b(
                `Response type '${t}' is not supported`,
                b.ERR_NOT_SUPPORT,
                s,
              );
            });
    });
  })(new Response());
const Qs = async (e) => {
    if (e == null) return 0;
    if (a.isBlob(e)) return e.size;
    if (a.isSpecCompliantForm(e))
      return (
        await new Request(N.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (a.isArrayBufferView(e) || a.isArrayBuffer(e)) return e.byteLength;
    if ((a.isURLSearchParams(e) && (e = e + ""), a.isString(e)))
      return (await $s(e)).byteLength;
  },
  Vs = async (e, t) => {
    const n = a.toFiniteNumber(e.getContentLength());
    return n ?? Qs(t);
  },
  Ws =
    Fe &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: s,
        signal: r,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: c,
        onUploadProgress: d,
        responseType: u,
        headers: l,
        withCredentials: f = "same-origin",
        fetchOptions: g,
      } = Qt(e);
      u = u ? (u + "").toLowerCase() : "text";
      let w = qs([r, o && o.toAbortSignal()], i),
        m;
      const y =
        w &&
        w.unsubscribe &&
        (() => {
          w.unsubscribe();
        });
      let p;
      try {
        if (
          d &&
          Js &&
          n !== "get" &&
          n !== "head" &&
          (p = await Vs(l, s)) !== 0
        ) {
          let P = new Request(t, { method: "POST", body: s, duplex: "half" }),
            v;
          if (
            (a.isFormData(s) &&
              (v = P.headers.get("content-type")) &&
              l.setContentType(v),
            P.body)
          ) {
            const [z, U] = mt(p, Se(yt(d)));
            s = wt(P.body, gt, z, U);
          }
        }
        a.isString(f) || (f = f ? "include" : "omit");
        const E = "credentials" in Request.prototype;
        m = new Request(t, {
          ...g,
          signal: w,
          method: n.toUpperCase(),
          headers: l.normalize().toJSON(),
          body: s,
          duplex: "half",
          credentials: E ? f : void 0,
        });
        let O = await fetch(m, g);
        const C = Ke && (u === "stream" || u === "response");
        if (Ke && (c || (C && y))) {
          const P = {};
          ["status", "statusText", "headers"].forEach((ie) => {
            P[ie] = O[ie];
          });
          const v = a.toFiniteNumber(O.headers.get("content-length")),
            [z, U] = (c && mt(v, Se(yt(c), !0))) || [];
          O = new Response(
            wt(O.body, gt, z, () => {
              (U && U(), y && y());
            }),
            P,
          );
        }
        u = u || "text";
        let I = await Oe[a.findKey(Oe, u) || "text"](O, e);
        return (
          !C && y && y(),
          await new Promise((P, v) => {
            $t(P, v, {
              data: I,
              headers: B.from(O.headers),
              status: O.status,
              statusText: O.statusText,
              config: e,
              request: m,
            });
          })
        );
      } catch (E) {
        throw (
          y && y(),
          E && E.name === "TypeError" && /Load failed|fetch/i.test(E.message)
            ? Object.assign(new b("Network Error", b.ERR_NETWORK, e, m), {
                cause: E.cause || E,
              })
            : b.from(E, E && E.code, e, m)
        );
      }
    }),
  Xe = { http: us, xhr: vs, fetch: Ws };
a.forEach(Xe, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Rt = (e) => `- ${e}`,
  Ks = (e) => a.isFunction(e) || e === null || e === !1,
  Kt = {
    getAdapter: (e) => {
      e = a.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, s;
      const r = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((s = n),
          !Ks(n) && ((s = Xe[(i = String(n)).toLowerCase()]), s === void 0))
        )
          throw new b(`Unknown adapter '${i}'`);
        if (s) break;
        r[i || "#" + o] = s;
      }
      if (!s) {
        const o = Object.entries(r).map(
          ([c, d]) =>
            `adapter ${c} ` +
            (d === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(Rt).join(`
`)
            : " " + Rt(o[0])
          : "as no adapter specified";
        throw new b(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT",
        );
      }
      return s;
    },
    adapters: Xe,
  };
function De(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new oe(null, e);
}
function Et(e) {
  return (
    De(e),
    (e.headers = B.from(e.headers)),
    (e.data = Le.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Kt.getAdapter(e.adapter || ye.adapter)(e).then(
      function (s) {
        return (
          De(e),
          (s.data = Le.call(e, e.transformResponse, s)),
          (s.headers = B.from(s.headers)),
          s
        );
      },
      function (s) {
        return (
          zt(s) ||
            (De(e),
            s &&
              s.response &&
              ((s.response.data = Le.call(e, e.transformResponse, s.response)),
              (s.response.headers = B.from(s.response.headers)))),
          Promise.reject(s)
        );
      },
    )
  );
}
const Xt = "1.11.0",
  Ne = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ne[e] = function (s) {
      return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const St = {};
Ne.transitional = function (t, n, s) {
  function r(o, i) {
    return (
      "[Axios v" +
      Xt +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (s ? ". " + s : "")
    );
  }
  return (o, i, c) => {
    if (t === !1)
      throw new b(
        r(i, " has been removed" + (n ? " in " + n : "")),
        b.ERR_DEPRECATED,
      );
    return (
      n &&
        !St[i] &&
        ((St[i] = !0),
        console.warn(
          r(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(o, i, c) : !0
    );
  };
};
Ne.spelling = function (t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Xs(e, t, n) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r],
      i = t[o];
    if (i) {
      const c = e[o],
        d = c === void 0 || i(c, o, e);
      if (d !== !0)
        throw new b("option " + o + " must be " + d, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const Ee = { assertOptions: Xs, validators: Ne },
  H = Ee.validators;
let G = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new ht(), response: new ht() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(r)
          : (r = new Error());
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack
            ? o &&
              !String(s.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (s.stack +=
                `
` + o)
            : (s.stack = o);
        } catch {}
      }
      throw s;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Z(this.defaults, n)));
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    (s !== void 0 &&
      Ee.assertOptions(
        s,
        {
          silentJSONParsing: H.transitional(H.boolean),
          forcedJSONParsing: H.transitional(H.boolean),
          clarifyTimeoutError: H.transitional(H.boolean),
        },
        !1,
      ),
      r != null &&
        (a.isFunction(r)
          ? (n.paramsSerializer = { serialize: r })
          : Ee.assertOptions(
              r,
              { encode: H.function, serialize: H.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Ee.assertOptions(
        n,
        {
          baseUrl: H.spelling("baseURL"),
          withXsrfToken: H.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let i = o && a.merge(o.common, o[n.method]);
    (o &&
      a.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (m) => {
          delete o[m];
        },
      ),
      (n.headers = B.concat(i, o)));
    const c = [];
    let d = !0;
    this.interceptors.request.forEach(function (y) {
      (typeof y.runWhen == "function" && y.runWhen(n) === !1) ||
        ((d = d && y.synchronous), c.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (y) {
      u.push(y.fulfilled, y.rejected);
    });
    let l,
      f = 0,
      g;
    if (!d) {
      const m = [Et.bind(this), void 0];
      for (
        m.unshift(...c), m.push(...u), g = m.length, l = Promise.resolve(n);
        f < g;

      )
        l = l.then(m[f++], m[f++]);
      return l;
    }
    g = c.length;
    let w = n;
    for (f = 0; f < g; ) {
      const m = c[f++],
        y = c[f++];
      try {
        w = m(w);
      } catch (p) {
        y.call(this, p);
        break;
      }
    }
    try {
      l = Et.call(this, w);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, g = u.length; f < g; ) l = l.then(u[f++], u[f++]);
    return l;
  }
  getUri(t) {
    t = Z(this.defaults, t);
    const n = Jt(t.baseURL, t.url, t.allowAbsoluteUrls);
    return qt(n, t.params, t.paramsSerializer);
  }
};
a.forEach(["delete", "get", "head", "options"], function (t) {
  G.prototype[t] = function (n, s) {
    return this.request(
      Z(s || {}, { method: t, url: n, data: (s || {}).data }),
    );
  };
});
a.forEach(["post", "put", "patch"], function (t) {
  function n(s) {
    return function (o, i, c) {
      return this.request(
        Z(c || {}, {
          method: t,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        }),
      );
    };
  }
  ((G.prototype[t] = n()), (G.prototype[t + "Form"] = n(!0)));
});
let Gs = class Gt {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const s = this;
    (this.promise.then((r) => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0; ) s._listeners[o](r);
      s._listeners = null;
    }),
      (this.promise.then = (r) => {
        let o;
        const i = new Promise((c) => {
          (s.subscribe(c), (o = c));
        }).then(r);
        return (
          (i.cancel = function () {
            s.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, c) {
        s.reason || ((s.reason = new oe(o, i, c)), n(s.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (s) => {
        t.abort(s);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new Gt(function (r) {
        t = r;
      }),
      cancel: t,
    };
  }
};
function Zs(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Ys(e) {
  return a.isObject(e) && e.isAxiosError === !0;
}
const Ge = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Ge).forEach(([e, t]) => {
  Ge[t] = e;
});
function Zt(e) {
  const t = new G(e),
    n = Pt(G.prototype.request, t);
  return (
    a.extend(n, G.prototype, t, { allOwnKeys: !0 }),
    a.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (r) {
      return Zt(Z(e, r));
    }),
    n
  );
}
const A = Zt(ye);
A.Axios = G;
A.CanceledError = oe;
A.CancelToken = Gs;
A.isCancel = zt;
A.VERSION = Xt;
A.toFormData = Pe;
A.AxiosError = b;
A.Cancel = A.CanceledError;
A.all = function (t) {
  return Promise.all(t);
};
A.spread = Zs;
A.isAxiosError = Ys;
A.mergeConfig = Z;
A.AxiosHeaders = B;
A.formToJSON = (e) => Ht(a.isHTMLForm(e) ? new FormData(e) : e);
A.getAdapter = Kt.getAdapter;
A.HttpStatusCode = Ge;
A.default = A;
const {
    Axios: ur,
    AxiosError: lr,
    CanceledError: fr,
    isCancel: dr,
    CancelToken: hr,
    VERSION: pr,
    all: mr,
    Cancel: yr,
    isAxiosError: br,
    spread: wr,
    toFormData: gr,
    AxiosHeaders: Rr,
    HttpStatusCode: er,
    formToJSON: Er,
    getAdapter: Sr,
    mergeConfig: Or,
  } = A,
  tr = "https://eresurs.rtmc.uz",
  Te = A.create({ withCredentials: !0, baseURL: tr });
Te.interceptors.request.use(
  async (e) => {
    try {
      const t = Ct.getState().accessToken;
      t && (e.headers.Authorization = `Bearer ${t}`);
    } catch (t) {
      console.log(t);
    }
    return e;
  },
  (e) => Promise.reject(e),
);
Te.interceptors.response.use(
  function (e) {
    return e;
  },
  function (e) {
    return Promise.reject(e);
  },
);
function Tr(e = [], t = ["/api"]) {
  const { start: n, complete: s } = on({
      color: "var(--color-item-primary-primary)",
      height: 2,
    }),
    { setAccessToken: r } = Ct(),
    { toast: o } = an(),
    { t: i } = un(),
    c = cn(),
    [d, u] = L.useState(!1),
    l = L.useCallback(
      (y) => {
        throw (
          y.response &&
            (o({
              variant: "destructive",
              title: i(`${it.get(y, "response.statusText", "Error")}`),
              description: i(
                `${it.get(y, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            }),
            y.response.status === er.Unauthorized && (r(null), c("/auth"))),
          y
        );
      },
      [c, r, i, o],
    ),
    f = L.useCallback(() => {
      (u(!1), s());
    }, [s]),
    g = L.useCallback((y = []) => [...t, ...e, ...y].join("/"), [t, e]),
    w = L.useCallback(
      async ({ params: y, options: p }) => {
        try {
          return (
            u(!0),
            (
              await Te.get(g(), {
                ...p,
                params: y,
                onUploadProgress: () => {
                  n();
                },
              })
            ).data
          );
        } catch (E) {
          throw (l(E), E);
        } finally {
          f();
        }
      },
      [l, f, g, n],
    ),
    m = L.useCallback(
      async ({ data: y, options: p, url: E = [] }) => {
        try {
          return (
            u(!0),
            (
              await Te(g(E), {
                ...p,
                data: y,
                onUploadProgress: () => {
                  n();
                },
              })
            ).data
          );
        } catch (O) {
          throw (l(O), O);
        } finally {
          f();
        }
      },
      [l, f, g, n],
    );
  return { loading: d, get: w, mutate: m };
}
export { ir as a, Te as r, Tr as u };
