// @__NO_SIDE_EFFECTS__
function Vn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const ne = {}, It = [], st = () => {
}, wo = () => !1, Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), qn = (e) => e.startsWith("onUpdate:"), ue = Object.assign, Kn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, ca = Object.prototype.hasOwnProperty, Y = (e, t) => ca.call(e, t), L = Array.isArray, Lt = (e) => ms(e) === "[object Map]", So = (e) => ms(e) === "[object Set]", vr = (e) => ms(e) === "[object Date]", z = (e) => typeof e == "function", de = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", Q = (e) => e !== null && typeof e == "object", Co = (e) => (Q(e) || z(e)) && z(e.then) && z(e.catch), Eo = Object.prototype.toString, ms = (e) => Eo.call(e), fa = (e) => ms(e).slice(8, -1), Js = (e) => ms(e) === "[object Object]", Wn = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, es = /* @__PURE__ */ Vn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Gs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, ua = /-\w/g, He = Gs(
  (e) => e.replace(ua, (t) => t.slice(1).toUpperCase())
), da = /\B([A-Z])/g, Ie = Gs(
  (e) => e.replace(da, "-$1").toLowerCase()
), To = Gs((e) => e.charAt(0).toUpperCase() + e.slice(1)), un = Gs(
  (e) => e ? `on${To(e)}` : ""
), vt = (e, t) => !Object.is(e, t), ks = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Ao = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Jn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Tn = (e) => {
  const t = de(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let yr;
const Ys = () => yr || (yr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function At(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = de(n) ? ga(n) : At(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (de(e) || Q(e))
    return e;
}
const pa = /;(?![^(]*\))/g, ha = /:([^]+)/, ma = /\/\*[^]*?\*\//g;
function ga(e) {
  const t = {};
  return e.replace(ma, "").split(pa).forEach((s) => {
    if (s) {
      const n = s.split(ha);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ge(e) {
  let t = "";
  if (de(e))
    t = e;
  else if (L(e))
    for (let s = 0; s < e.length; s++) {
      const n = ge(e[s]);
      n && (t += n + " ");
    }
  else if (Q(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const ba = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", va = /* @__PURE__ */ Vn(ba);
function Ro(e) {
  return !!e || e === "";
}
function ya(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = Gn(e[n], t[n]);
  return s;
}
function Gn(e, t) {
  if (e === t) return !0;
  let s = vr(e), n = vr(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = nt(e), n = nt(t), s || n)
    return e === t;
  if (s = L(e), n = L(t), s || n)
    return s && n ? ya(e, t) : !1;
  if (s = Q(e), n = Q(t), s || n) {
    if (!s || !n)
      return !1;
    const r = Object.keys(e).length, o = Object.keys(t).length;
    if (r !== o)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), l = t.hasOwnProperty(i);
      if (a && !l || !a && l || !Gn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Oo = (e) => !!(e && e.__v_isRef === !0), j = (e) => de(e) ? e : e == null ? "" : L(e) || Q(e) && (e.toString === Eo || !z(e.toString)) ? Oo(e) ? j(e.value) : JSON.stringify(e, ko, 2) : String(e), ko = (e, t) => Oo(t) ? ko(e, t.value) : Lt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[dn(n, o) + " =>"] = r, s),
    {}
  )
} : So(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => dn(s))
} : nt(t) ? dn(t) : Q(t) && !L(t) && !Js(t) ? String(t) : t, dn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let $e;
class _a {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = $e, !t && $e && (this.index = ($e.scopes || ($e.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = $e;
      try {
        return $e = this, t();
      } finally {
        $e = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = $e, $e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && ($e = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function xa() {
  return $e;
}
let le;
const pn = /* @__PURE__ */ new WeakSet();
class $o {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, $e && $e.active && $e.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, pn.has(this) && (pn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || No(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, _r(this), jo(this);
    const t = le, s = ze;
    le = this, ze = !0;
    try {
      return this.fn();
    } finally {
      Fo(this), le = t, ze = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qn(t);
      this.deps = this.depsTail = void 0, _r(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? pn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    An(this) && this.run();
  }
  get dirty() {
    return An(this);
  }
}
let Po = 0, ts, ss;
function No(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ss, ss = e;
    return;
  }
  e.next = ts, ts = e;
}
function Yn() {
  Po++;
}
function Xn() {
  if (--Po > 0)
    return;
  if (ss) {
    let t = ss;
    for (ss = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; ts; ) {
    let t = ts;
    for (ts = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function jo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Fo(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Qn(n), wa(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function An(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Mo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Mo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ls) || (e.globalVersion = ls, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !An(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = le, n = ze;
  le = e, ze = !0;
  try {
    jo(e);
    const r = e.fn(e._value);
    (t.version === 0 || vt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    le = s, ze = n, Fo(e), e.flags &= -3;
  }
}
function Qn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep)
      Qn(o, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function wa(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let ze = !0;
const Do = [];
function ut() {
  Do.push(ze), ze = !1;
}
function dt() {
  const e = Do.pop();
  ze = e === void 0 ? !0 : e;
}
function _r(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = le;
    le = void 0;
    try {
      t();
    } finally {
      le = s;
    }
  }
}
let ls = 0;
class Sa {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Zn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!le || !ze || le === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== le)
      s = this.activeLink = new Sa(le, this), le.deps ? (s.prevDep = le.depsTail, le.depsTail.nextDep = s, le.depsTail = s) : le.deps = le.depsTail = s, Io(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = le.depsTail, s.nextDep = void 0, le.depsTail.nextDep = s, le.depsTail = s, le.deps === s && (le.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ls++, this.notify(t);
  }
  notify(t) {
    Yn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Xn();
    }
  }
}
function Io(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Io(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Rn = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ Symbol(
  ""
), On = /* @__PURE__ */ Symbol(
  ""
), cs = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, s) {
  if (ze && le) {
    let n = Rn.get(e);
    n || Rn.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new Zn()), r.map = n, r.key = s), r.track();
  }
}
function lt(e, t, s, n, r, o) {
  const i = Rn.get(e);
  if (!i) {
    ls++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (Yn(), t === "clear")
    i.forEach(a);
  else {
    const l = L(e), f = l && Wn(s);
    if (l && s === "length") {
      const c = Number(n);
      i.forEach((p, y) => {
        (y === "length" || y === cs || !nt(y) && y >= c) && a(p);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && a(i.get(s)), f && a(i.get(cs)), t) {
        case "add":
          l ? f && a(i.get("length")) : (a(i.get(Rt)), Lt(e) && a(i.get(On)));
          break;
        case "delete":
          l || (a(i.get(Rt)), Lt(e) && a(i.get(On)));
          break;
        case "set":
          Lt(e) && a(i.get(Rt));
          break;
      }
  }
  Xn();
}
function Ft(e) {
  const t = /* @__PURE__ */ G(e);
  return t === e ? t : (ye(t, "iterate", cs), /* @__PURE__ */ Ue(e) ? t : t.map(Ve));
}
function Xs(e) {
  return ye(e = /* @__PURE__ */ G(e), "iterate", cs), e;
}
function gt(e, t) {
  return /* @__PURE__ */ pt(e) ? Ht(/* @__PURE__ */ Ot(e) ? Ve(t) : t) : Ve(t);
}
const Ca = {
  __proto__: null,
  [Symbol.iterator]() {
    return hn(this, Symbol.iterator, (e) => gt(this, e));
  },
  concat(...e) {
    return Ft(this).concat(
      ...e.map((t) => L(t) ? Ft(t) : t)
    );
  },
  entries() {
    return hn(this, "entries", (e) => (e[1] = gt(this, e[1]), e));
  },
  every(e, t) {
    return rt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return rt(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => gt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return rt(
      this,
      "find",
      e,
      t,
      (s) => gt(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return rt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return rt(
      this,
      "findLast",
      e,
      t,
      (s) => gt(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return rt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return rt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return mn(this, "includes", e);
  },
  indexOf(...e) {
    return mn(this, "indexOf", e);
  },
  join(e) {
    return Ft(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return mn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return rt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Gt(this, "pop");
  },
  push(...e) {
    return Gt(this, "push", e);
  },
  reduce(e, ...t) {
    return xr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xr(this, "reduceRight", e, t);
  },
  shift() {
    return Gt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return rt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Gt(this, "splice", e);
  },
  toReversed() {
    return Ft(this).toReversed();
  },
  toSorted(e) {
    return Ft(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ft(this).toSpliced(...e);
  },
  unshift(...e) {
    return Gt(this, "unshift", e);
  },
  values() {
    return hn(this, "values", (e) => gt(this, e));
  }
};
function hn(e, t, s) {
  const n = Xs(e), r = n[t]();
  return n !== e && !/* @__PURE__ */ Ue(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const Ea = Array.prototype;
function rt(e, t, s, n, r, o) {
  const i = Xs(e), a = i !== e && !/* @__PURE__ */ Ue(e), l = i[t];
  if (l !== Ea[t]) {
    const p = l.apply(e, o);
    return a ? Ve(p) : p;
  }
  let f = s;
  i !== e && (a ? f = function(p, y) {
    return s.call(this, gt(e, p), y, e);
  } : s.length > 2 && (f = function(p, y) {
    return s.call(this, p, y, e);
  }));
  const c = l.call(i, f, n);
  return a && r ? r(c) : c;
}
function xr(e, t, s, n) {
  const r = Xs(e);
  let o = s;
  return r !== e && (/* @__PURE__ */ Ue(e) ? s.length > 3 && (o = function(i, a, l) {
    return s.call(this, i, a, l, e);
  }) : o = function(i, a, l) {
    return s.call(this, i, gt(e, a), l, e);
  }), r[t](o, ...n);
}
function mn(e, t, s) {
  const n = /* @__PURE__ */ G(e);
  ye(n, "iterate", cs);
  const r = n[t](...s);
  return (r === -1 || r === !1) && /* @__PURE__ */ nr(s[0]) ? (s[0] = /* @__PURE__ */ G(s[0]), n[t](...s)) : r;
}
function Gt(e, t, s = []) {
  ut(), Yn();
  const n = (/* @__PURE__ */ G(e))[t].apply(e, s);
  return Xn(), dt(), n;
}
const Ta = /* @__PURE__ */ Vn("__proto__,__v_isRef,__isVue"), Lo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function Aa(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ G(this);
  return ye(t, "has", e), t.hasOwnProperty(e);
}
class Uo {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw")
      return n === (r ? o ? Da : Vo : o ? zo : Ho).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = L(t);
    if (!r) {
      let l;
      if (i && (l = Ca[s]))
        return l;
      if (s === "hasOwnProperty")
        return Aa;
    }
    const a = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ we(t) ? t : n
    );
    if ((nt(s) ? Lo.has(s) : Ta(s)) || (r || ye(t, "get", s), o))
      return a;
    if (/* @__PURE__ */ we(a)) {
      const l = i && Wn(s) ? a : a.value;
      return r && Q(l) ? /* @__PURE__ */ $n(l) : l;
    }
    return Q(a) ? r ? /* @__PURE__ */ $n(a) : /* @__PURE__ */ tr(a) : a;
  }
}
class Bo extends Uo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    const i = L(t) && Wn(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ pt(o);
      if (!/* @__PURE__ */ Ue(n) && !/* @__PURE__ */ pt(n) && (o = /* @__PURE__ */ G(o), n = /* @__PURE__ */ G(n)), !i && /* @__PURE__ */ we(o) && !/* @__PURE__ */ we(n))
        return f || (o.value = n), !0;
    }
    const a = i ? Number(s) < t.length : Y(t, s), l = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ we(t) ? t : r
    );
    return t === /* @__PURE__ */ G(r) && (a ? vt(n, o) && lt(t, "set", s, n) : lt(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = Y(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && lt(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!nt(s) || !Lo.has(s)) && ye(t, "has", s), n;
  }
  ownKeys(t) {
    return ye(
      t,
      "iterate",
      L(t) ? "length" : Rt
    ), Reflect.ownKeys(t);
  }
}
class Ra extends Uo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Oa = /* @__PURE__ */ new Bo(), ka = /* @__PURE__ */ new Ra(), $a = /* @__PURE__ */ new Bo(!0);
const kn = (e) => e, Ts = (e) => Reflect.getPrototypeOf(e);
function Pa(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = /* @__PURE__ */ G(r), i = Lt(o), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, f = r[e](...n), c = s ? kn : t ? Ht : Ve;
    return !t && ye(
      o,
      "iterate",
      l ? On : Rt
    ), ue(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: p, done: y } = f.next();
          return y ? { value: p, done: y } : {
            value: a ? [c(p[0]), c(p[1])] : c(p),
            done: y
          };
        }
      }
    );
  };
}
function As(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Na(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ G(o), a = /* @__PURE__ */ G(r);
      e || (vt(r, a) && ye(i, "get", r), ye(i, "get", a));
      const { has: l } = Ts(i), f = t ? kn : e ? Ht : Ve;
      if (l.call(i, r))
        return f(o.get(r));
      if (l.call(i, a))
        return f(o.get(a));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ye(/* @__PURE__ */ G(r), "iterate", Rt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ G(o), a = /* @__PURE__ */ G(r);
      return e || (vt(r, a) && ye(i, "has", r), ye(i, "has", a)), r === a ? o.has(r) : o.has(r) || o.has(a);
    },
    forEach(r, o) {
      const i = this, a = i.__v_raw, l = /* @__PURE__ */ G(a), f = t ? kn : e ? Ht : Ve;
      return !e && ye(l, "iterate", Rt), a.forEach((c, p) => r.call(o, f(c), f(p), i));
    }
  };
  return ue(
    s,
    e ? {
      add: As("add"),
      set: As("set"),
      delete: As("delete"),
      clear: As("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Ue(r) && !/* @__PURE__ */ pt(r) && (r = /* @__PURE__ */ G(r));
        const o = /* @__PURE__ */ G(this);
        return Ts(o).has.call(o, r) || (o.add(r), lt(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !/* @__PURE__ */ Ue(o) && !/* @__PURE__ */ pt(o) && (o = /* @__PURE__ */ G(o));
        const i = /* @__PURE__ */ G(this), { has: a, get: l } = Ts(i);
        let f = a.call(i, r);
        f || (r = /* @__PURE__ */ G(r), f = a.call(i, r));
        const c = l.call(i, r);
        return i.set(r, o), f ? vt(o, c) && lt(i, "set", r, o) : lt(i, "add", r, o), this;
      },
      delete(r) {
        const o = /* @__PURE__ */ G(this), { has: i, get: a } = Ts(o);
        let l = i.call(o, r);
        l || (r = /* @__PURE__ */ G(r), l = i.call(o, r)), a && a.call(o, r);
        const f = o.delete(r);
        return l && lt(o, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ G(this), o = r.size !== 0, i = r.clear();
        return o && lt(
          r,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = Pa(r, e, t);
  }), s;
}
function er(e, t) {
  const s = Na(e, t);
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    Y(s, r) && r in n ? s : n,
    r,
    o
  );
}
const ja = {
  get: /* @__PURE__ */ er(!1, !1)
}, Fa = {
  get: /* @__PURE__ */ er(!1, !0)
}, Ma = {
  get: /* @__PURE__ */ er(!0, !1)
};
const Ho = /* @__PURE__ */ new WeakMap(), zo = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ new WeakMap(), Da = /* @__PURE__ */ new WeakMap();
function Ia(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function La(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ia(fa(e));
}
// @__NO_SIDE_EFFECTS__
function tr(e) {
  return /* @__PURE__ */ pt(e) ? e : sr(
    e,
    !1,
    Oa,
    ja,
    Ho
  );
}
// @__NO_SIDE_EFFECTS__
function Ua(e) {
  return sr(
    e,
    !1,
    $a,
    Fa,
    zo
  );
}
// @__NO_SIDE_EFFECTS__
function $n(e) {
  return sr(
    e,
    !0,
    ka,
    Ma,
    Vo
  );
}
function sr(e, t, s, n, r) {
  if (!Q(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = La(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const a = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Ot(e) {
  return /* @__PURE__ */ pt(e) ? /* @__PURE__ */ Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ue(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function nr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function G(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ G(t) : e;
}
function Ba(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && Ao(e, "__v_skip", !0), e;
}
const Ve = (e) => Q(e) ? /* @__PURE__ */ tr(e) : e, Ht = (e) => Q(e) ? /* @__PURE__ */ $n(e) : e;
// @__NO_SIDE_EFFECTS__
function we(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return Ha(e, !1);
}
function Ha(e, t) {
  return /* @__PURE__ */ we(e) ? e : new za(e, t);
}
class za {
  constructor(t, s) {
    this.dep = new Zn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ G(t), this._value = s ? t : Ve(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ue(t) || /* @__PURE__ */ pt(t);
    t = n ? t : /* @__PURE__ */ G(t), vt(t, s) && (this._rawValue = t, this._value = n ? t : Ve(t), this.dep.trigger());
  }
}
function qo(e) {
  return /* @__PURE__ */ we(e) ? e.value : e;
}
const Va = {
  get: (e, t, s) => t === "__v_raw" ? e : qo(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return /* @__PURE__ */ we(r) && !/* @__PURE__ */ we(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Ko(e) {
  return /* @__PURE__ */ Ot(e) ? e : new Proxy(e, Va);
}
class qa {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Zn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ls - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return No(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Mo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ka(e, t, s = !1) {
  let n, r;
  return z(e) ? n = e : (n = e.get, r = e.set), new qa(n, r, s);
}
const Rs = {}, Is = /* @__PURE__ */ new WeakMap();
let Ct;
function Wa(e, t = !1, s = Ct) {
  if (s) {
    let n = Is.get(s);
    n || Is.set(s, n = []), n.push(e);
  }
}
function Ja(e, t, s = ne) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: a, call: l } = s, f = ($) => r ? $ : /* @__PURE__ */ Ue($) || r === !1 || r === 0 ? ct($, 1) : ct($);
  let c, p, y, w, g = !1, _ = !1;
  if (/* @__PURE__ */ we(e) ? (p = () => e.value, g = /* @__PURE__ */ Ue(e)) : /* @__PURE__ */ Ot(e) ? (p = () => f(e), g = !0) : L(e) ? (_ = !0, g = e.some(($) => /* @__PURE__ */ Ot($) || /* @__PURE__ */ Ue($)), p = () => e.map(($) => {
    if (/* @__PURE__ */ we($))
      return $.value;
    if (/* @__PURE__ */ Ot($))
      return f($);
    if (z($))
      return l ? l($, 2) : $();
  })) : z(e) ? t ? p = l ? () => l(e, 2) : e : p = () => {
    if (y) {
      ut();
      try {
        y();
      } finally {
        dt();
      }
    }
    const $ = Ct;
    Ct = c;
    try {
      return l ? l(e, 3, [w]) : e(w);
    } finally {
      Ct = $;
    }
  } : p = st, t && r) {
    const $ = p, V = r === !0 ? 1 / 0 : r;
    p = () => ct($(), V);
  }
  const h = xa(), v = () => {
    c.stop(), h && h.active && Kn(h.effects, c);
  };
  if (o && t) {
    const $ = t;
    t = (...V) => {
      $(...V), v();
    };
  }
  let A = _ ? new Array(e.length).fill(Rs) : Rs;
  const F = ($) => {
    if (!(!(c.flags & 1) || !c.dirty && !$))
      if (t) {
        const V = c.run();
        if (r || g || (_ ? V.some((re, te) => vt(re, A[te])) : vt(V, A))) {
          y && y();
          const re = Ct;
          Ct = c;
          try {
            const te = [
              V,
              // pass undefined as the old value when it's changed for the first time
              A === Rs ? void 0 : _ && A[0] === Rs ? [] : A,
              w
            ];
            A = V, l ? l(t, 3, te) : (
              // @ts-expect-error
              t(...te)
            );
          } finally {
            Ct = re;
          }
        }
      } else
        c.run();
  };
  return a && a(F), c = new $o(p), c.scheduler = i ? () => i(F, !1) : F, w = ($) => Wa($, !1, c), y = c.onStop = () => {
    const $ = Is.get(c);
    if ($) {
      if (l)
        l($, 4);
      else
        for (const V of $) V();
      Is.delete(c);
    }
  }, t ? n ? F(!0) : A = c.run() : i ? i(F.bind(null, !0), !0) : c.run(), v.pause = c.pause.bind(c), v.resume = c.resume.bind(c), v.stop = v, v;
}
function ct(e, t = 1 / 0, s) {
  if (t <= 0 || !Q(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ we(e))
    ct(e.value, t, s);
  else if (L(e))
    for (let n = 0; n < e.length; n++)
      ct(e[n], t, s);
  else if (So(e) || Lt(e))
    e.forEach((n) => {
      ct(n, t, s);
    });
  else if (Js(e)) {
    for (const n in e)
      ct(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ct(e[n], t, s);
  }
  return e;
}
function gs(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    Qs(r, t, s);
  }
}
function qe(e, t, s, n) {
  if (z(e)) {
    const r = gs(e, t, s, n);
    return r && Co(r) && r.catch((o) => {
      Qs(o, t, s);
    }), r;
  }
  if (L(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(qe(e[o], t, s, n));
    return r;
  }
}
function Qs(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ne;
  if (t) {
    let a = t.parent;
    const l = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, l, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (o) {
      ut(), gs(o, null, 10, [
        e,
        l,
        f
      ]), dt();
      return;
    }
  }
  Ga(e, s, r, n, i);
}
function Ga(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ee = [];
let Ze = -1;
const Ut = [];
let bt = null, Mt = 0;
const Wo = /* @__PURE__ */ Promise.resolve();
let Ls = null;
function Jo(e) {
  const t = Ls || Wo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ya(e) {
  let t = Ze + 1, s = Ee.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = Ee[n], o = fs(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function rr(e) {
  if (!(e.flags & 1)) {
    const t = fs(e), s = Ee[Ee.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= fs(s) ? Ee.push(e) : Ee.splice(Ya(t), 0, e), e.flags |= 1, Go();
  }
}
function Go() {
  Ls || (Ls = Wo.then(Xo));
}
function Xa(e) {
  L(e) ? Ut.push(...e) : bt && e.id === -1 ? bt.splice(Mt + 1, 0, e) : e.flags & 1 || (Ut.push(e), e.flags |= 1), Go();
}
function wr(e, t, s = Ze + 1) {
  for (; s < Ee.length; s++) {
    const n = Ee[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Ee.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Yo(e) {
  if (Ut.length) {
    const t = [...new Set(Ut)].sort(
      (s, n) => fs(s) - fs(n)
    );
    if (Ut.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, Mt = 0; Mt < bt.length; Mt++) {
      const s = bt[Mt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    bt = null, Mt = 0;
  }
}
const fs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Xo(e) {
  try {
    for (Ze = 0; Ze < Ee.length; Ze++) {
      const t = Ee[Ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), gs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ze < Ee.length; Ze++) {
      const t = Ee[Ze];
      t && (t.flags &= -2);
    }
    Ze = -1, Ee.length = 0, Yo(), Ls = null, (Ee.length || Ut.length) && Xo();
  }
}
let Le = null, Qo = null;
function Us(e) {
  const t = Le;
  return Le = e, Qo = e && e.type.__scopeId || null, t;
}
function Zo(e, t = Le, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && zs(-1);
    const o = Us(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Us(o), n._d && zs(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Qa(e, t) {
  if (Le === null)
    return e;
  const s = nn(Le), n = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, a, l = ne] = t[r];
    o && (z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ct(i), n.push({
      dir: o,
      instance: s,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function _t(e, t, s, n) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    o && (a.oldValue = o[i].value);
    let l = a.dir[n];
    l && (ut(), qe(l, s, 8, [
      e.el,
      a,
      e,
      t
    ]), dt());
  }
}
function Za(e, t) {
  if (Ae) {
    let s = Ae.provides;
    const n = Ae.parent && Ae.parent.provides;
    n === s && (s = Ae.provides = Object.create(n)), s[e] = t;
  }
}
function ns(e, t, s = !1) {
  const n = $i();
  if (n || Bt) {
    let r = Bt ? Bt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && z(t) ? t.call(n && n.proxy) : t;
  }
}
const el = /* @__PURE__ */ Symbol.for("v-scx"), tl = () => ns(el);
function $s(e, t, s) {
  return ei(e, t, s);
}
function ei(e, t, s = ne) {
  const { immediate: n, deep: r, flush: o, once: i } = s, a = ue({}, s), l = t && n || !t && o !== "post";
  let f;
  if (ps) {
    if (o === "sync") {
      const w = tl();
      f = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!l) {
      const w = () => {
      };
      return w.stop = st, w.resume = st, w.pause = st, w;
    }
  }
  const c = Ae;
  a.call = (w, g, _) => qe(w, c, g, _);
  let p = !1;
  o === "post" ? a.scheduler = (w) => {
    ke(w, c && c.suspense);
  } : o !== "sync" && (p = !0, a.scheduler = (w, g) => {
    g ? w() : rr(w);
  }), a.augmentJob = (w) => {
    t && (w.flags |= 4), p && (w.flags |= 2, c && (w.id = c.uid, w.i = c));
  };
  const y = Ja(e, t, a);
  return ps && (f ? f.push(y) : l && y()), y;
}
function sl(e, t, s) {
  const n = this.proxy, r = de(e) ? e.includes(".") ? ti(n, e) : () => n[e] : e.bind(n, n);
  let o;
  z(t) ? o = t : (o = t.handler, s = t);
  const i = bs(this), a = ei(r, o.bind(n), s);
  return i(), a;
}
function ti(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const nl = /* @__PURE__ */ Symbol("_vte"), si = (e) => e.__isTeleport, et = /* @__PURE__ */ Symbol("_leaveCb"), Yt = /* @__PURE__ */ Symbol("_enterCb");
function rl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return or(() => {
    e.isMounted = !0;
  }), fi(() => {
    e.isUnmounting = !0;
  }), e;
}
const De = [Function, Array], ni = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: De,
  onEnter: De,
  onAfterEnter: De,
  onEnterCancelled: De,
  // leave
  onBeforeLeave: De,
  onLeave: De,
  onAfterLeave: De,
  onLeaveCancelled: De,
  // appear
  onBeforeAppear: De,
  onAppear: De,
  onAfterAppear: De,
  onAppearCancelled: De
}, ri = (e) => {
  const t = e.subTree;
  return t.component ? ri(t.component) : t;
}, ol = {
  name: "BaseTransition",
  props: ni,
  setup(e, { slots: t }) {
    const s = $i(), n = rl();
    return () => {
      const r = t.default && ai(t.default(), !0);
      if (!r || !r.length)
        return;
      const o = oi(r), i = /* @__PURE__ */ G(e), { mode: a } = i;
      if (n.isLeaving)
        return gn(o);
      const l = Sr(o);
      if (!l)
        return gn(o);
      let f = Pn(
        l,
        i,
        n,
        s,
        // #11061, ensure enterHooks is fresh after clone
        (p) => f = p
      );
      l.type !== Te && us(l, f);
      let c = s.subTree && Sr(s.subTree);
      if (c && c.type !== Te && !Et(c, l) && ri(s).type !== Te) {
        let p = Pn(
          c,
          i,
          n,
          s
        );
        if (us(c, p), a === "out-in" && l.type !== Te)
          return n.isLeaving = !0, p.afterLeave = () => {
            n.isLeaving = !1, s.job.flags & 8 || s.update(), delete p.afterLeave, c = void 0;
          }, gn(o);
        a === "in-out" && l.type !== Te ? p.delayLeave = (y, w, g) => {
          const _ = ii(
            n,
            c
          );
          _[String(c.key)] = c, y[et] = () => {
            w(), y[et] = void 0, delete f.delayedLeave, c = void 0;
          }, f.delayedLeave = () => {
            g(), delete f.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return o;
    };
  }
};
function oi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Te) {
        t = s;
        break;
      }
  }
  return t;
}
const il = ol;
function ii(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(t.type, n)), n;
}
function Pn(e, t, s, n, r) {
  const {
    appear: o,
    mode: i,
    persisted: a = !1,
    onBeforeEnter: l,
    onEnter: f,
    onAfterEnter: c,
    onEnterCancelled: p,
    onBeforeLeave: y,
    onLeave: w,
    onAfterLeave: g,
    onLeaveCancelled: _,
    onBeforeAppear: h,
    onAppear: v,
    onAfterAppear: A,
    onAppearCancelled: F
  } = t, $ = String(e.key), V = ii(s, e), re = (H, J) => {
    H && qe(
      H,
      n,
      9,
      J
    );
  }, te = (H, J) => {
    const oe = J[1];
    re(H, J), L(H) ? H.every((N) => N.length <= 1) && oe() : H.length <= 1 && oe();
  }, he = {
    mode: i,
    persisted: a,
    beforeEnter(H) {
      let J = l;
      if (!s.isMounted)
        if (o)
          J = h || l;
        else
          return;
      H[et] && H[et](
        !0
        /* cancelled */
      );
      const oe = V[$];
      oe && Et(e, oe) && oe.el[et] && oe.el[et](), re(J, [H]);
    },
    enter(H) {
      let J = f, oe = c, N = p;
      if (!s.isMounted)
        if (o)
          J = v || f, oe = A || c, N = F || p;
        else
          return;
      let X = !1;
      H[Yt] = (Me) => {
        X || (X = !0, Me ? re(N, [H]) : re(oe, [H]), he.delayedLeave && he.delayedLeave(), H[Yt] = void 0);
      };
      const fe = H[Yt].bind(null, !1);
      J ? te(J, [H, fe]) : fe();
    },
    leave(H, J) {
      const oe = String(e.key);
      if (H[Yt] && H[Yt](
        !0
        /* cancelled */
      ), s.isUnmounting)
        return J();
      re(y, [H]);
      let N = !1;
      H[et] = (fe) => {
        N || (N = !0, J(), fe ? re(_, [H]) : re(g, [H]), H[et] = void 0, V[oe] === e && delete V[oe]);
      };
      const X = H[et].bind(null, !1);
      V[oe] = e, w ? te(w, [H, X]) : X();
    },
    clone(H) {
      const J = Pn(
        H,
        t,
        s,
        n,
        r
      );
      return r && r(J), J;
    }
  };
  return he;
}
function gn(e) {
  if (Zs(e))
    return e = yt(e), e.children = null, e;
}
function Sr(e) {
  if (!Zs(e))
    return si(e.type) && e.children ? oi(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && z(s.default))
      return s.default();
  }
}
function us(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, us(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ai(e, t = !1, s) {
  let n = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = s == null ? i.key : String(s) + String(i.key != null ? i.key : o);
    i.type === ce ? (i.patchFlag & 128 && r++, n = n.concat(
      ai(i.children, t, a)
    )) : (t || i.type !== Te) && n.push(a != null ? yt(i, { key: a }) : i);
  }
  if (r > 1)
    for (let o = 0; o < n.length; o++)
      n[o].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function al(e, t) {
  return z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ue({ name: e.name }, t, { setup: e })
  ) : e;
}
function li(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Cr(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Bs = /* @__PURE__ */ new WeakMap();
function rs(e, t, s, n, r = !1) {
  if (L(e)) {
    e.forEach(
      (_, h) => rs(
        _,
        t && (L(t) ? t[h] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (os(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && rs(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? nn(n.component) : n.el, i = r ? null : o, { i: a, r: l } = e, f = t && t.r, c = a.refs === ne ? a.refs = {} : a.refs, p = a.setupState, y = /* @__PURE__ */ G(p), w = p === ne ? wo : (_) => Cr(c, _) ? !1 : Y(y, _), g = (_, h) => !(h && Cr(c, h));
  if (f != null && f !== l) {
    if (Er(t), de(f))
      c[f] = null, w(f) && (p[f] = null);
    else if (/* @__PURE__ */ we(f)) {
      const _ = t;
      g(f, _.k) && (f.value = null), _.k && (c[_.k] = null);
    }
  }
  if (z(l))
    gs(l, a, 12, [i, c]);
  else {
    const _ = de(l), h = /* @__PURE__ */ we(l);
    if (_ || h) {
      const v = () => {
        if (e.f) {
          const A = _ ? w(l) ? p[l] : c[l] : g() || !e.k ? l.value : c[e.k];
          if (r)
            L(A) && Kn(A, o);
          else if (L(A))
            A.includes(o) || A.push(o);
          else if (_)
            c[l] = [o], w(l) && (p[l] = c[l]);
          else {
            const F = [o];
            g(l, e.k) && (l.value = F), e.k && (c[e.k] = F);
          }
        } else _ ? (c[l] = i, w(l) && (p[l] = i)) : h && (g(l, e.k) && (l.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const A = () => {
          v(), Bs.delete(e);
        };
        A.id = -1, Bs.set(e, A), ke(A, s);
      } else
        Er(e), v();
    }
  }
}
function Er(e) {
  const t = Bs.get(e);
  t && (t.flags |= 8, Bs.delete(e));
}
Ys().requestIdleCallback;
Ys().cancelIdleCallback;
const os = (e) => !!e.type.__asyncLoader, Zs = (e) => e.type.__isKeepAlive;
function ll(e, t) {
  ci(e, "a", t);
}
function cl(e, t) {
  ci(e, "da", t);
}
function ci(e, t, s = Ae) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (en(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      Zs(r.parent.vnode) && fl(n, t, s, r), r = r.parent;
  }
}
function fl(e, t, s, n) {
  const r = en(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  ui(() => {
    Kn(n[t], r);
  }, s);
}
function en(e, t, s = Ae, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      ut();
      const a = bs(s), l = qe(t, s, e, i);
      return a(), dt(), l;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const ht = (e) => (t, s = Ae) => {
  (!ps || e === "sp") && en(e, (...n) => t(...n), s);
}, ul = ht("bm"), or = ht("m"), dl = ht(
  "bu"
), pl = ht("u"), fi = ht(
  "bum"
), ui = ht("um"), hl = ht(
  "sp"
), ml = ht("rtg"), gl = ht("rtc");
function bl(e, t = Ae) {
  en("ec", e, t);
}
const vl = /* @__PURE__ */ Symbol.for("v-ndc");
function ft(e, t, s, n) {
  let r;
  const o = s, i = L(e);
  if (i || de(e)) {
    const a = i && /* @__PURE__ */ Ot(e);
    let l = !1, f = !1;
    a && (l = !/* @__PURE__ */ Ue(e), f = /* @__PURE__ */ pt(e), e = Xs(e)), r = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      r[c] = t(
        l ? f ? Ht(Ve(e[c])) : Ve(e[c]) : e[c],
        c,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, o);
  } else if (Q(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (a, l) => t(a, l, void 0, o)
      );
    else {
      const a = Object.keys(e);
      r = new Array(a.length);
      for (let l = 0, f = a.length; l < f; l++) {
        const c = a[l];
        r[l] = t(e[c], c, l, o);
      }
    }
  else
    r = [];
  return r;
}
const Nn = (e) => e ? Pi(e) ? nn(e) : Nn(e.parent) : null, is = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ue(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Nn(e.parent),
    $root: (e) => Nn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => pi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      rr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Jo.bind(e.proxy)),
    $watch: (e) => sl.bind(e)
  })
), bn = (e, t) => e !== ne && !e.__isScriptSetup && Y(e, t), yl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: o, accessCache: i, type: a, appContext: l } = e;
    if (t[0] !== "$") {
      const y = i[t];
      if (y !== void 0)
        switch (y) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (bn(n, t))
          return i[t] = 1, n[t];
        if (r !== ne && Y(r, t))
          return i[t] = 2, r[t];
        if (Y(o, t))
          return i[t] = 3, o[t];
        if (s !== ne && Y(s, t))
          return i[t] = 4, s[t];
        jn && (i[t] = 0);
      }
    }
    const f = is[t];
    let c, p;
    if (f)
      return t === "$attrs" && ye(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (c = a.__cssModules) && (c = c[t])
    )
      return c;
    if (s !== ne && Y(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      p = l.config.globalProperties, Y(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return bn(r, t) ? (r[t] = s, !0) : n !== ne && Y(n, t) ? (n[t] = s, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, props: o, type: i }
  }, a) {
    let l;
    return !!(s[a] || e !== ne && a[0] !== "$" && Y(e, a) || bn(t, a) || Y(o, a) || Y(n, a) || Y(is, a) || Y(r.config.globalProperties, a) || (l = i.__cssModules) && l[a]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Y(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Tr(e) {
  return L(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let jn = !0;
function _l(e) {
  const t = pi(e), s = e.proxy, n = e.ctx;
  jn = !1, t.beforeCreate && Ar(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: a,
    provide: l,
    inject: f,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: y,
    beforeUpdate: w,
    updated: g,
    activated: _,
    deactivated: h,
    beforeDestroy: v,
    beforeUnmount: A,
    destroyed: F,
    unmounted: $,
    render: V,
    renderTracked: re,
    renderTriggered: te,
    errorCaptured: he,
    serverPrefetch: H,
    // public API
    expose: J,
    inheritAttrs: oe,
    // assets
    components: N,
    directives: X,
    filters: fe
  } = t;
  if (f && xl(f, n, null), i)
    for (const ie in i) {
      const K = i[ie];
      z(K) && (n[ie] = K.bind(s));
    }
  if (r) {
    const ie = r.call(s, s);
    Q(ie) && (e.data = /* @__PURE__ */ tr(ie));
  }
  if (jn = !0, o)
    for (const ie in o) {
      const K = o[ie], We = z(K) ? K.bind(s, s) : z(K.get) ? K.get.bind(s, s) : st, Pt = !z(K) && z(K.set) ? K.set.bind(s) : st, ve = pe({
        get: We,
        set: Pt
      });
      Object.defineProperty(n, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => ve.value,
        set: (be) => ve.value = be
      });
    }
  if (a)
    for (const ie in a)
      di(a[ie], n, s, ie);
  if (l) {
    const ie = z(l) ? l.call(s) : l;
    Reflect.ownKeys(ie).forEach((K) => {
      Za(K, ie[K]);
    });
  }
  c && Ar(c, e, "c");
  function Z(ie, K) {
    L(K) ? K.forEach((We) => ie(We.bind(s))) : K && ie(K.bind(s));
  }
  if (Z(ul, p), Z(or, y), Z(dl, w), Z(pl, g), Z(ll, _), Z(cl, h), Z(bl, he), Z(gl, re), Z(ml, te), Z(fi, A), Z(ui, $), Z(hl, H), L(J))
    if (J.length) {
      const ie = e.exposed || (e.exposed = {});
      J.forEach((K) => {
        Object.defineProperty(ie, K, {
          get: () => s[K],
          set: (We) => s[K] = We,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  V && e.render === st && (e.render = V), oe != null && (e.inheritAttrs = oe), N && (e.components = N), X && (e.directives = X), H && li(e);
}
function xl(e, t, s = st) {
  L(e) && (e = Fn(e));
  for (const n in e) {
    const r = e[n];
    let o;
    Q(r) ? "default" in r ? o = ns(
      r.from || n,
      r.default,
      !0
    ) : o = ns(r.from || n) : o = ns(r), /* @__PURE__ */ we(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function Ar(e, t, s) {
  qe(
    L(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function di(e, t, s, n) {
  let r = n.includes(".") ? ti(s, n) : () => s[n];
  if (de(e)) {
    const o = t[e];
    z(o) && $s(r, o);
  } else if (z(e))
    $s(r, e.bind(s));
  else if (Q(e))
    if (L(e))
      e.forEach((o) => di(o, t, s, n));
    else {
      const o = z(e.handler) ? e.handler.bind(s) : t[e.handler];
      z(o) && $s(r, o, e);
    }
}
function pi(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !r.length && !s && !n ? l = t : (l = {}, r.length && r.forEach(
    (f) => Hs(l, f, i, !0)
  ), Hs(l, t, i)), Q(t) && o.set(t, l), l;
}
function Hs(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && Hs(e, o, s, !0), r && r.forEach(
    (i) => Hs(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const a = wl[i] || s && s[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const wl = {
  data: Rr,
  props: Or,
  emits: Or,
  // objects
  methods: Zt,
  computed: Zt,
  // lifecycle
  beforeCreate: Se,
  created: Se,
  beforeMount: Se,
  mounted: Se,
  beforeUpdate: Se,
  updated: Se,
  beforeDestroy: Se,
  beforeUnmount: Se,
  destroyed: Se,
  unmounted: Se,
  activated: Se,
  deactivated: Se,
  errorCaptured: Se,
  serverPrefetch: Se,
  // assets
  components: Zt,
  directives: Zt,
  // watch
  watch: Cl,
  // provide / inject
  provide: Rr,
  inject: Sl
};
function Rr(e, t) {
  return t ? e ? function() {
    return ue(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sl(e, t) {
  return Zt(Fn(e), Fn(t));
}
function Fn(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Zt(e, t) {
  return e ? ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Or(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ue(
    /* @__PURE__ */ Object.create(null),
    Tr(e),
    Tr(t ?? {})
  ) : t;
}
function Cl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ue(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Se(e[n], t[n]);
  return s;
}
function hi() {
  return {
    app: null,
    config: {
      isNativeTag: wo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let El = 0;
function Tl(e, t) {
  return function(n, r = null) {
    z(n) || (n = ue({}, n)), r != null && !Q(r) && (r = null);
    const o = hi(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const f = o.app = {
      _uid: El++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: oc,
      get config() {
        return o.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return i.has(c) || (c && z(c.install) ? (i.add(c), c.install(f, ...p)) : z(c) && (i.add(c), c(f, ...p))), f;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), f;
      },
      component(c, p) {
        return p ? (o.components[c] = p, f) : o.components[c];
      },
      directive(c, p) {
        return p ? (o.directives[c] = p, f) : o.directives[c];
      },
      mount(c, p, y) {
        if (!l) {
          const w = f._ceVNode || xe(n, r);
          return w.appContext = o, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(w, c, y), l = !0, f._container = c, c.__vue_app__ = f, nn(w.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (qe(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, p) {
        return o.provides[c] = p, f;
      },
      runWithContext(c) {
        const p = Bt;
        Bt = f;
        try {
          return c();
        } finally {
          Bt = p;
        }
      }
    };
    return f;
  };
}
let Bt = null;
const Al = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${He(t)}Modifiers`] || e[`${Ie(t)}Modifiers`];
function Rl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ne;
  let r = s;
  const o = t.startsWith("update:"), i = o && Al(n, t.slice(7));
  i && (i.trim && (r = s.map((c) => de(c) ? c.trim() : c)), i.number && (r = s.map(Jn)));
  let a, l = n[a = un(t)] || // also try camelCase event handler (#2249)
  n[a = un(He(t))];
  !l && o && (l = n[a = un(Ie(t))]), l && qe(
    l,
    e,
    6,
    r
  );
  const f = n[a + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, qe(
      f,
      e,
      6,
      r
    );
  }
}
const Ol = /* @__PURE__ */ new WeakMap();
function mi(e, t, s = !1) {
  const n = s ? Ol : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!z(e)) {
    const l = (f) => {
      const c = mi(f, t, !0);
      c && (a = !0, ue(i, c));
    };
    !s && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !o && !a ? (Q(e) && n.set(e, null), null) : (L(o) ? o.forEach((l) => i[l] = null) : ue(i, o), Q(e) && n.set(e, i), i);
}
function tn(e, t) {
  return !e || !Ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Ie(t)) || Y(e, t));
}
function kr(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: a,
    emit: l,
    render: f,
    renderCache: c,
    props: p,
    data: y,
    setupState: w,
    ctx: g,
    inheritAttrs: _
  } = e, h = Us(e);
  let v, A;
  try {
    if (s.shapeFlag & 4) {
      const $ = r || n, V = $;
      v = tt(
        f.call(
          V,
          $,
          c,
          p,
          w,
          y,
          g
        )
      ), A = a;
    } else {
      const $ = t;
      v = tt(
        $.length > 1 ? $(
          p,
          { attrs: a, slots: i, emit: l }
        ) : $(
          p,
          null
        )
      ), A = t.props ? a : kl(a);
    }
  } catch ($) {
    as.length = 0, Qs($, e, 1), v = xe(Te);
  }
  let F = v;
  if (A && _ !== !1) {
    const $ = Object.keys(A), { shapeFlag: V } = F;
    $.length && V & 7 && (o && $.some(qn) && (A = $l(
      A,
      o
    )), F = yt(F, A, !1, !0));
  }
  return s.dirs && (F = yt(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(s.dirs) : s.dirs), s.transition && us(F, s.transition), v = F, Us(h), v;
}
const kl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ws(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, $l = (e, t) => {
  const s = {};
  for (const n in e)
    (!qn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Pl(e, t, s) {
  const { props: n, children: r, component: o } = e, { props: i, children: a, patchFlag: l } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? $r(n, i, f) : !!i;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const y = c[p];
        if (gi(i, n, y) && !tn(f, y))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : n === i ? !1 : n ? i ? $r(n, i, f) : !0 : !!i;
  return !1;
}
function $r(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (gi(t, e, o) && !tn(s, o))
      return !0;
  }
  return !1;
}
function gi(e, t, s) {
  const n = e[s], r = t[s];
  return s === "style" && Q(n) && Q(r) ? !Gn(n, r) : n !== r;
}
function Nl({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const bi = {}, vi = () => Object.create(bi), yi = (e) => Object.getPrototypeOf(e) === bi;
function jl(e, t, s, n = !1) {
  const r = {}, o = vi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _i(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : /* @__PURE__ */ Ua(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Fl(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ G(r), [l] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let y = c[p];
        if (tn(e.emitsOptions, y))
          continue;
        const w = t[y];
        if (l)
          if (Y(o, y))
            w !== o[y] && (o[y] = w, f = !0);
          else {
            const g = He(y);
            r[g] = Mn(
              l,
              a,
              g,
              w,
              e,
              !1
            );
          }
        else
          w !== o[y] && (o[y] = w, f = !0);
      }
    }
  } else {
    _i(e, t, r, o) && (f = !0);
    let c;
    for (const p in a)
      (!t || // for camelCase
      !Y(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Ie(p)) === p || !Y(t, c))) && (l ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[c] !== void 0) && (r[p] = Mn(
        l,
        a,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (o !== a)
      for (const p in o)
        (!t || !Y(t, p)) && (delete o[p], f = !0);
  }
  f && lt(e.attrs, "set", "");
}
function _i(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if (es(l))
        continue;
      const f = t[l];
      let c;
      r && Y(r, c = He(l)) ? !o || !o.includes(c) ? s[c] = f : (a || (a = {}))[c] = f : tn(e.emitsOptions, l) || (!(l in n) || f !== n[l]) && (n[l] = f, i = !0);
    }
  if (o) {
    const l = /* @__PURE__ */ G(s), f = a || ne;
    for (let c = 0; c < o.length; c++) {
      const p = o[c];
      s[p] = Mn(
        r,
        l,
        p,
        f[p],
        e,
        !Y(f, p)
      );
    }
  }
  return i;
}
function Mn(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const a = Y(i, "default");
    if (a && n === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && z(l)) {
        const { propsDefaults: f } = r;
        if (s in f)
          n = f[s];
        else {
          const c = bs(r);
          n = f[s] = l.call(
            null,
            t
          ), c();
        }
      } else
        n = l;
      r.ce && r.ce._setProp(s, n);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !a ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ie(s)) && (n = !0));
  }
  return n;
}
const Ml = /* @__PURE__ */ new WeakMap();
function xi(e, t, s = !1) {
  const n = s ? Ml : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, a = [];
  let l = !1;
  if (!z(e)) {
    const c = (p) => {
      l = !0;
      const [y, w] = xi(p, t, !0);
      ue(i, y), w && a.push(...w);
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !l)
    return Q(e) && n.set(e, It), It;
  if (L(o))
    for (let c = 0; c < o.length; c++) {
      const p = He(o[c]);
      Pr(p) && (i[p] = ne);
    }
  else if (o)
    for (const c in o) {
      const p = He(c);
      if (Pr(p)) {
        const y = o[c], w = i[p] = L(y) || z(y) ? { type: y } : ue({}, y), g = w.type;
        let _ = !1, h = !0;
        if (L(g))
          for (let v = 0; v < g.length; ++v) {
            const A = g[v], F = z(A) && A.name;
            if (F === "Boolean") {
              _ = !0;
              break;
            } else F === "String" && (h = !1);
          }
        else
          _ = z(g) && g.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = _, w[
          1
          /* shouldCastTrue */
        ] = h, (_ || Y(w, "default")) && a.push(p);
      }
    }
  const f = [i, a];
  return Q(e) && n.set(e, f), f;
}
function Pr(e) {
  return e[0] !== "$" && !es(e);
}
const ir = (e) => e === "_" || e === "_ctx" || e === "$stable", ar = (e) => L(e) ? e.map(tt) : [tt(e)], Dl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Zo((...r) => ar(t(...r)), s);
  return n._c = !1, n;
}, wi = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (ir(r)) continue;
    const o = e[r];
    if (z(o))
      t[r] = Dl(r, o, n);
    else if (o != null) {
      const i = ar(o);
      t[r] = () => i;
    }
  }
}, Si = (e, t) => {
  const s = ar(t);
  e.slots.default = () => s;
}, Ci = (e, t, s) => {
  for (const n in t)
    (s || !ir(n)) && (e[n] = t[n]);
}, Il = (e, t, s) => {
  const n = e.slots = vi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ci(n, t, s), s && Ao(n, "_", r, !0)) : wi(t, n);
  } else t && Si(e, t);
}, Ll = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = ne;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? s && a === 1 ? o = !1 : Ci(r, t, s) : (o = !t.$stable, wi(t, r)), i = t;
  } else t && (Si(e, t), i = { default: 1 });
  if (o)
    for (const a in r)
      !ir(a) && i[a] == null && delete r[a];
}, ke = Vl;
function Ul(e) {
  return Bl(e);
}
function Bl(e, t) {
  const s = Ys();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: a,
    createComment: l,
    setText: f,
    setElementText: c,
    parentNode: p,
    nextSibling: y,
    setScopeId: w = st,
    insertStaticContent: g
  } = e, _ = (d, m, x, T = null, S = null, C = null, k = void 0, O = null, R = !!m.dynamicChildren) => {
    if (d === m)
      return;
    d && !Et(d, m) && (T = Es(d), be(d, S, C, !0), d = null), m.patchFlag === -2 && (R = !1, m.dynamicChildren = null);
    const { type: E, ref: U, shapeFlag: P } = m;
    switch (E) {
      case sn:
        h(d, m, x, T);
        break;
      case Te:
        v(d, m, x, T);
        break;
      case Ps:
        d == null && A(m, x, T, k);
        break;
      case ce:
        N(
          d,
          m,
          x,
          T,
          S,
          C,
          k,
          O,
          R
        );
        break;
      default:
        P & 1 ? V(
          d,
          m,
          x,
          T,
          S,
          C,
          k,
          O,
          R
        ) : P & 6 ? X(
          d,
          m,
          x,
          T,
          S,
          C,
          k,
          O,
          R
        ) : (P & 64 || P & 128) && E.process(
          d,
          m,
          x,
          T,
          S,
          C,
          k,
          O,
          R,
          Wt
        );
    }
    U != null && S ? rs(U, d && d.ref, C, m || d, !m) : U == null && d && d.ref != null && rs(d.ref, null, C, d, !0);
  }, h = (d, m, x, T) => {
    if (d == null)
      n(
        m.el = a(m.children),
        x,
        T
      );
    else {
      const S = m.el = d.el;
      m.children !== d.children && f(S, m.children);
    }
  }, v = (d, m, x, T) => {
    d == null ? n(
      m.el = l(m.children || ""),
      x,
      T
    ) : m.el = d.el;
  }, A = (d, m, x, T) => {
    [d.el, d.anchor] = g(
      d.children,
      m,
      x,
      T,
      d.el,
      d.anchor
    );
  }, F = ({ el: d, anchor: m }, x, T) => {
    let S;
    for (; d && d !== m; )
      S = y(d), n(d, x, T), d = S;
    n(m, x, T);
  }, $ = ({ el: d, anchor: m }) => {
    let x;
    for (; d && d !== m; )
      x = y(d), r(d), d = x;
    r(m);
  }, V = (d, m, x, T, S, C, k, O, R) => {
    if (m.type === "svg" ? k = "svg" : m.type === "math" && (k = "mathml"), d == null)
      re(
        m,
        x,
        T,
        S,
        C,
        k,
        O,
        R
      );
    else {
      const E = d.el && d.el._isVueCE ? d.el : null;
      try {
        E && E._beginPatch(), H(
          d,
          m,
          S,
          C,
          k,
          O,
          R
        );
      } finally {
        E && E._endPatch();
      }
    }
  }, re = (d, m, x, T, S, C, k, O) => {
    let R, E;
    const { props: U, shapeFlag: P, transition: I, dirs: B } = d;
    if (R = d.el = i(
      d.type,
      C,
      U && U.is,
      U
    ), P & 8 ? c(R, d.children) : P & 16 && he(
      d.children,
      R,
      null,
      T,
      S,
      vn(d, C),
      k,
      O
    ), B && _t(d, null, T, "created"), te(R, d, d.scopeId, k, T), U) {
      for (const ae in U)
        ae !== "value" && !es(ae) && o(R, ae, null, U[ae], C, T);
      "value" in U && o(R, "value", null, U.value, C), (E = U.onVnodeBeforeMount) && Xe(E, T, d);
    }
    B && _t(d, null, T, "beforeMount");
    const W = Hl(S, I);
    W && I.beforeEnter(R), n(R, m, x), ((E = U && U.onVnodeMounted) || W || B) && ke(() => {
      E && Xe(E, T, d), W && I.enter(R), B && _t(d, null, T, "mounted");
    }, S);
  }, te = (d, m, x, T, S) => {
    if (x && w(d, x), T)
      for (let C = 0; C < T.length; C++)
        w(d, T[C]);
    if (S) {
      let C = S.subTree;
      if (m === C || Ri(C.type) && (C.ssContent === m || C.ssFallback === m)) {
        const k = S.vnode;
        te(
          d,
          k,
          k.scopeId,
          k.slotScopeIds,
          S.parent
        );
      }
    }
  }, he = (d, m, x, T, S, C, k, O, R = 0) => {
    for (let E = R; E < d.length; E++) {
      const U = d[E] = O ? at(d[E]) : tt(d[E]);
      _(
        null,
        U,
        m,
        x,
        T,
        S,
        C,
        k,
        O
      );
    }
  }, H = (d, m, x, T, S, C, k) => {
    const O = m.el = d.el;
    let { patchFlag: R, dynamicChildren: E, dirs: U } = m;
    R |= d.patchFlag & 16;
    const P = d.props || ne, I = m.props || ne;
    let B;
    if (x && xt(x, !1), (B = I.onVnodeBeforeUpdate) && Xe(B, x, m, d), U && _t(m, d, x, "beforeUpdate"), x && xt(x, !0), (P.innerHTML && I.innerHTML == null || P.textContent && I.textContent == null) && c(O, ""), E ? J(
      d.dynamicChildren,
      E,
      O,
      x,
      T,
      vn(m, S),
      C
    ) : k || K(
      d,
      m,
      O,
      null,
      x,
      T,
      vn(m, S),
      C,
      !1
    ), R > 0) {
      if (R & 16)
        oe(O, P, I, x, S);
      else if (R & 2 && P.class !== I.class && o(O, "class", null, I.class, S), R & 4 && o(O, "style", P.style, I.style, S), R & 8) {
        const W = m.dynamicProps;
        for (let ae = 0; ae < W.length; ae++) {
          const ee = W[ae], Re = P[ee], Oe = I[ee];
          (Oe !== Re || ee === "value") && o(O, ee, Re, Oe, S, x);
        }
      }
      R & 1 && d.children !== m.children && c(O, m.children);
    } else !k && E == null && oe(O, P, I, x, S);
    ((B = I.onVnodeUpdated) || U) && ke(() => {
      B && Xe(B, x, m, d), U && _t(m, d, x, "updated");
    }, T);
  }, J = (d, m, x, T, S, C, k) => {
    for (let O = 0; O < m.length; O++) {
      const R = d[O], E = m[O], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(R, E) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? p(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          x
        )
      );
      _(
        R,
        E,
        U,
        null,
        T,
        S,
        C,
        k,
        !0
      );
    }
  }, oe = (d, m, x, T, S) => {
    if (m !== x) {
      if (m !== ne)
        for (const C in m)
          !es(C) && !(C in x) && o(
            d,
            C,
            m[C],
            null,
            S,
            T
          );
      for (const C in x) {
        if (es(C)) continue;
        const k = x[C], O = m[C];
        k !== O && C !== "value" && o(d, C, O, k, S, T);
      }
      "value" in x && o(d, "value", m.value, x.value, S);
    }
  }, N = (d, m, x, T, S, C, k, O, R) => {
    const E = m.el = d ? d.el : a(""), U = m.anchor = d ? d.anchor : a("");
    let { patchFlag: P, dynamicChildren: I, slotScopeIds: B } = m;
    B && (O = O ? O.concat(B) : B), d == null ? (n(E, x, T), n(U, x, T), he(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      x,
      U,
      S,
      C,
      k,
      O,
      R
    )) : P > 0 && P & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === I.length ? (J(
      d.dynamicChildren,
      I,
      x,
      S,
      C,
      k,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || S && m === S.subTree) && Ei(
      d,
      m,
      !0
      /* shallow */
    )) : K(
      d,
      m,
      x,
      U,
      S,
      C,
      k,
      O,
      R
    );
  }, X = (d, m, x, T, S, C, k, O, R) => {
    m.slotScopeIds = O, d == null ? m.shapeFlag & 512 ? S.ctx.activate(
      m,
      x,
      T,
      k,
      R
    ) : fe(
      m,
      x,
      T,
      S,
      C,
      k,
      R
    ) : Me(d, m, R);
  }, fe = (d, m, x, T, S, C, k) => {
    const O = d.component = Ql(
      d,
      T,
      S
    );
    if (Zs(d) && (O.ctx.renderer = Wt), Zl(O, !1, k), O.asyncDep) {
      if (S && S.registerDep(O, Z, k), !d.el) {
        const R = O.subTree = xe(Te);
        v(null, R, m, x), d.placeholder = R.el;
      }
    } else
      Z(
        O,
        d,
        m,
        x,
        S,
        C,
        k
      );
  }, Me = (d, m, x) => {
    const T = m.component = d.component;
    if (Pl(d, m, x))
      if (T.asyncDep && !T.asyncResolved) {
        ie(T, m, x);
        return;
      } else
        T.next = m, T.update();
    else
      m.el = d.el, T.vnode = m;
  }, Z = (d, m, x, T, S, C, k) => {
    const O = () => {
      if (d.isMounted) {
        let { next: P, bu: I, u: B, parent: W, vnode: ae } = d;
        {
          const Ge = Ti(d);
          if (Ge) {
            P && (P.el = ae.el, ie(d, P, k)), Ge.asyncDep.then(() => {
              ke(() => {
                d.isUnmounted || E();
              }, S);
            });
            return;
          }
        }
        let ee = P, Re;
        xt(d, !1), P ? (P.el = ae.el, ie(d, P, k)) : P = ae, I && ks(I), (Re = P.props && P.props.onVnodeBeforeUpdate) && Xe(Re, W, P, ae), xt(d, !0);
        const Oe = kr(d), Je = d.subTree;
        d.subTree = Oe, _(
          Je,
          Oe,
          // parent may have changed if it's in a teleport
          p(Je.el),
          // anchor may have changed if it's in a fragment
          Es(Je),
          d,
          S,
          C
        ), P.el = Oe.el, ee === null && Nl(d, Oe.el), B && ke(B, S), (Re = P.props && P.props.onVnodeUpdated) && ke(
          () => Xe(Re, W, P, ae),
          S
        );
      } else {
        let P;
        const { el: I, props: B } = m, { bm: W, m: ae, parent: ee, root: Re, type: Oe } = d, Je = os(m);
        xt(d, !1), W && ks(W), !Je && (P = B && B.onVnodeBeforeMount) && Xe(P, ee, m), xt(d, !0);
        {
          Re.ce && Re.ce._hasShadowRoot() && Re.ce._injectChildStyle(Oe);
          const Ge = d.subTree = kr(d);
          _(
            null,
            Ge,
            x,
            T,
            d,
            S,
            C
          ), m.el = Ge.el;
        }
        if (ae && ke(ae, S), !Je && (P = B && B.onVnodeMounted)) {
          const Ge = m;
          ke(
            () => Xe(P, ee, Ge),
            S
          );
        }
        (m.shapeFlag & 256 || ee && os(ee.vnode) && ee.vnode.shapeFlag & 256) && d.a && ke(d.a, S), d.isMounted = !0, m = x = T = null;
      }
    };
    d.scope.on();
    const R = d.effect = new $o(O);
    d.scope.off();
    const E = d.update = R.run.bind(R), U = d.job = R.runIfDirty.bind(R);
    U.i = d, U.id = d.uid, R.scheduler = () => rr(U), xt(d, !0), E();
  }, ie = (d, m, x) => {
    m.component = d;
    const T = d.vnode.props;
    d.vnode = m, d.next = null, Fl(d, m.props, T, x), Ll(d, m.children, x), ut(), wr(d), dt();
  }, K = (d, m, x, T, S, C, k, O, R = !1) => {
    const E = d && d.children, U = d ? d.shapeFlag : 0, P = m.children, { patchFlag: I, shapeFlag: B } = m;
    if (I > 0) {
      if (I & 128) {
        Pt(
          E,
          P,
          x,
          T,
          S,
          C,
          k,
          O,
          R
        );
        return;
      } else if (I & 256) {
        We(
          E,
          P,
          x,
          T,
          S,
          C,
          k,
          O,
          R
        );
        return;
      }
    }
    B & 8 ? (U & 16 && Kt(E, S, C), P !== E && c(x, P)) : U & 16 ? B & 16 ? Pt(
      E,
      P,
      x,
      T,
      S,
      C,
      k,
      O,
      R
    ) : Kt(E, S, C, !0) : (U & 8 && c(x, ""), B & 16 && he(
      P,
      x,
      T,
      S,
      C,
      k,
      O,
      R
    ));
  }, We = (d, m, x, T, S, C, k, O, R) => {
    d = d || It, m = m || It;
    const E = d.length, U = m.length, P = Math.min(E, U);
    let I;
    for (I = 0; I < P; I++) {
      const B = m[I] = R ? at(m[I]) : tt(m[I]);
      _(
        d[I],
        B,
        x,
        null,
        S,
        C,
        k,
        O,
        R
      );
    }
    E > U ? Kt(
      d,
      S,
      C,
      !0,
      !1,
      P
    ) : he(
      m,
      x,
      T,
      S,
      C,
      k,
      O,
      R,
      P
    );
  }, Pt = (d, m, x, T, S, C, k, O, R) => {
    let E = 0;
    const U = m.length;
    let P = d.length - 1, I = U - 1;
    for (; E <= P && E <= I; ) {
      const B = d[E], W = m[E] = R ? at(m[E]) : tt(m[E]);
      if (Et(B, W))
        _(
          B,
          W,
          x,
          null,
          S,
          C,
          k,
          O,
          R
        );
      else
        break;
      E++;
    }
    for (; E <= P && E <= I; ) {
      const B = d[P], W = m[I] = R ? at(m[I]) : tt(m[I]);
      if (Et(B, W))
        _(
          B,
          W,
          x,
          null,
          S,
          C,
          k,
          O,
          R
        );
      else
        break;
      P--, I--;
    }
    if (E > P) {
      if (E <= I) {
        const B = I + 1, W = B < U ? m[B].el : T;
        for (; E <= I; )
          _(
            null,
            m[E] = R ? at(m[E]) : tt(m[E]),
            x,
            W,
            S,
            C,
            k,
            O,
            R
          ), E++;
      }
    } else if (E > I)
      for (; E <= P; )
        be(d[E], S, C, !0), E++;
    else {
      const B = E, W = E, ae = /* @__PURE__ */ new Map();
      for (E = W; E <= I; E++) {
        const je = m[E] = R ? at(m[E]) : tt(m[E]);
        je.key != null && ae.set(je.key, E);
      }
      let ee, Re = 0;
      const Oe = I - W + 1;
      let Je = !1, Ge = 0;
      const Jt = new Array(Oe);
      for (E = 0; E < Oe; E++) Jt[E] = 0;
      for (E = B; E <= P; E++) {
        const je = d[E];
        if (Re >= Oe) {
          be(je, S, C, !0);
          continue;
        }
        let Ye;
        if (je.key != null)
          Ye = ae.get(je.key);
        else
          for (ee = W; ee <= I; ee++)
            if (Jt[ee - W] === 0 && Et(je, m[ee])) {
              Ye = ee;
              break;
            }
        Ye === void 0 ? be(je, S, C, !0) : (Jt[Ye - W] = E + 1, Ye >= Ge ? Ge = Ye : Je = !0, _(
          je,
          m[Ye],
          x,
          null,
          S,
          C,
          k,
          O,
          R
        ), Re++);
      }
      const mr = Je ? zl(Jt) : It;
      for (ee = mr.length - 1, E = Oe - 1; E >= 0; E--) {
        const je = W + E, Ye = m[je], gr = m[je + 1], br = je + 1 < U ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          gr.el || Ai(gr)
        ) : T;
        Jt[E] === 0 ? _(
          null,
          Ye,
          x,
          br,
          S,
          C,
          k,
          O,
          R
        ) : Je && (ee < 0 || E !== mr[ee] ? ve(Ye, x, br, 2) : ee--);
      }
    }
  }, ve = (d, m, x, T, S = null) => {
    const { el: C, type: k, transition: O, children: R, shapeFlag: E } = d;
    if (E & 6) {
      ve(d.component.subTree, m, x, T);
      return;
    }
    if (E & 128) {
      d.suspense.move(m, x, T);
      return;
    }
    if (E & 64) {
      k.move(d, m, x, Wt);
      return;
    }
    if (k === ce) {
      n(C, m, x);
      for (let P = 0; P < R.length; P++)
        ve(R[P], m, x, T);
      n(d.anchor, m, x);
      return;
    }
    if (k === Ps) {
      F(d, m, x);
      return;
    }
    if (T !== 2 && E & 1 && O)
      if (T === 0)
        O.beforeEnter(C), n(C, m, x), ke(() => O.enter(C), S);
      else {
        const { leave: P, delayLeave: I, afterLeave: B } = O, W = () => {
          d.ctx.isUnmounted ? r(C) : n(C, m, x);
        }, ae = () => {
          C._isLeaving && C[et](
            !0
            /* cancelled */
          ), P(C, () => {
            W(), B && B();
          });
        };
        I ? I(C, W, ae) : ae();
      }
    else
      n(C, m, x);
  }, be = (d, m, x, T = !1, S = !1) => {
    const {
      type: C,
      props: k,
      ref: O,
      children: R,
      dynamicChildren: E,
      shapeFlag: U,
      patchFlag: P,
      dirs: I,
      cacheIndex: B
    } = d;
    if (P === -2 && (S = !1), O != null && (ut(), rs(O, null, x, d, !0), dt()), B != null && (m.renderCache[B] = void 0), U & 256) {
      m.ctx.deactivate(d);
      return;
    }
    const W = U & 1 && I, ae = !os(d);
    let ee;
    if (ae && (ee = k && k.onVnodeBeforeUnmount) && Xe(ee, m, d), U & 6)
      Cs(d.component, x, T);
    else {
      if (U & 128) {
        d.suspense.unmount(x, T);
        return;
      }
      W && _t(d, null, m, "beforeUnmount"), U & 64 ? d.type.remove(
        d,
        m,
        x,
        Wt,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== ce || P > 0 && P & 64) ? Kt(
        E,
        m,
        x,
        !1,
        !0
      ) : (C === ce && P & 384 || !S && U & 16) && Kt(R, m, x), T && Nt(d);
    }
    (ae && (ee = k && k.onVnodeUnmounted) || W) && ke(() => {
      ee && Xe(ee, m, d), W && _t(d, null, m, "unmounted");
    }, x);
  }, Nt = (d) => {
    const { type: m, el: x, anchor: T, transition: S } = d;
    if (m === ce) {
      jt(x, T);
      return;
    }
    if (m === Ps) {
      $(d);
      return;
    }
    const C = () => {
      r(x), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: k, delayLeave: O } = S, R = () => k(x, C);
      O ? O(d.el, C, R) : R();
    } else
      C();
  }, jt = (d, m) => {
    let x;
    for (; d !== m; )
      x = y(d), r(d), d = x;
    r(m);
  }, Cs = (d, m, x) => {
    const { bum: T, scope: S, job: C, subTree: k, um: O, m: R, a: E } = d;
    Nr(R), Nr(E), T && ks(T), S.stop(), C && (C.flags |= 8, be(k, d, m, x)), O && ke(O, m), ke(() => {
      d.isUnmounted = !0;
    }, m);
  }, Kt = (d, m, x, T = !1, S = !1, C = 0) => {
    for (let k = C; k < d.length; k++)
      be(d[k], m, x, T, S);
  }, Es = (d) => {
    if (d.shapeFlag & 6)
      return Es(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const m = y(d.anchor || d.el), x = m && m[nl];
    return x ? y(x) : m;
  };
  let fn = !1;
  const hr = (d, m, x) => {
    let T;
    d == null ? m._vnode && (be(m._vnode, null, null, !0), T = m._vnode.component) : _(
      m._vnode || null,
      d,
      m,
      null,
      null,
      null,
      x
    ), m._vnode = d, fn || (fn = !0, wr(T), Yo(), fn = !1);
  }, Wt = {
    p: _,
    um: be,
    m: ve,
    r: Nt,
    mt: fe,
    mc: he,
    pc: K,
    pbc: J,
    n: Es,
    o: e
  };
  return {
    render: hr,
    hydrate: void 0,
    createApp: Tl(hr)
  };
}
function vn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function xt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ei(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (L(n) && L(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let a = r[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = at(r[o]), a.el = i.el), !s && a.patchFlag !== -2 && Ei(i, a)), a.type === sn && (a.patchFlag === -1 && (a = r[o] = at(a)), a.el = i.el), a.type === Te && !a.el && (a.el = i.el);
    }
}
function zl(e) {
  const t = e.slice(), s = [0];
  let n, r, o, i, a;
  const l = e.length;
  for (n = 0; n < l; n++) {
    const f = e[n];
    if (f !== 0) {
      if (r = s[s.length - 1], e[r] < f) {
        t[n] = r, s.push(n);
        continue;
      }
      for (o = 0, i = s.length - 1; o < i; )
        a = o + i >> 1, e[s[a]] < f ? o = a + 1 : i = a;
      f < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, i = s[o - 1]; o-- > 0; )
    s[o] = i, i = t[i];
  return s;
}
function Ti(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ti(t);
}
function Nr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ai(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ai(t.subTree) : null;
}
const Ri = (e) => e.__isSuspense;
function Vl(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : Xa(e);
}
const ce = /* @__PURE__ */ Symbol.for("v-fgt"), sn = /* @__PURE__ */ Symbol.for("v-txt"), Te = /* @__PURE__ */ Symbol.for("v-cmt"), Ps = /* @__PURE__ */ Symbol.for("v-stc"), as = [];
let Fe = null;
function M(e = !1) {
  as.push(Fe = e ? null : []);
}
function ql() {
  as.pop(), Fe = as[as.length - 1] || null;
}
let ds = 1;
function zs(e, t = !1) {
  ds += e, e < 0 && Fe && t && (Fe.hasOnce = !0);
}
function Oi(e) {
  return e.dynamicChildren = ds > 0 ? Fe || It : null, ql(), ds > 0 && Fe && Fe.push(e), e;
}
function D(e, t, s, n, r, o) {
  return Oi(
    u(
      e,
      t,
      s,
      n,
      r,
      o,
      !0
    )
  );
}
function Dn(e, t, s, n, r) {
  return Oi(
    xe(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function Vs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ki = ({ key: e }) => e ?? null, Ns = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? de(e) || /* @__PURE__ */ we(e) || z(e) ? { i: Le, r: e, k: t, f: !!s } : e : null);
function u(e, t = null, s = null, n = 0, r = null, o = e === ce ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ki(t),
    ref: t && Ns(t),
    scopeId: Qo,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Le
  };
  return a ? (lr(l, s), o & 128 && e.normalize(l)) : s && (l.shapeFlag |= de(s) ? 8 : 16), ds > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Fe.push(l), l;
}
const xe = Kl;
function Kl(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === vl) && (e = Te), Vs(e)) {
    const a = yt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && lr(a, s), ds > 0 && !o && Fe && (a.shapeFlag & 6 ? Fe[Fe.indexOf(e)] = a : Fe.push(a)), a.patchFlag = -2, a;
  }
  if (nc(e) && (e = e.__vccOpts), t) {
    t = Wl(t);
    let { class: a, style: l } = t;
    a && !de(a) && (t.class = ge(a)), Q(l) && (/* @__PURE__ */ nr(l) && !L(l) && (l = ue({}, l)), t.style = At(l));
  }
  const i = de(e) ? 1 : Ri(e) ? 128 : si(e) ? 64 : Q(e) ? 4 : z(e) ? 2 : 0;
  return u(
    e,
    t,
    s,
    n,
    r,
    i,
    o,
    !0
  );
}
function Wl(e) {
  return e ? /* @__PURE__ */ nr(e) || yi(e) ? ue({}, e) : e : null;
}
function yt(e, t, s = !1, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: a, transition: l } = e, f = t ? Gl(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && ki(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? L(o) ? o.concat(Ns(t)) : [o, Ns(t)] : Ns(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ce ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && yt(e.ssContent),
    ssFallback: e.ssFallback && yt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && n && us(
    c,
    l.clone(c)
  ), c;
}
function Ce(e = " ", t = 0) {
  return xe(sn, null, e, t);
}
function Jl(e, t) {
  const s = xe(Ps, null, e);
  return s.staticCount = t, s;
}
function me(e = "", t = !1) {
  return t ? (M(), Dn(Te, null, e)) : xe(Te, null, e);
}
function tt(e) {
  return e == null || typeof e == "boolean" ? xe(Te) : L(e) ? xe(
    ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Vs(e) ? at(e) : xe(sn, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : yt(e);
}
function lr(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (L(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), lr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !yi(t) ? t._ctx = Le : r === 3 && Le && (Le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else z(t) ? (t = { default: t, _ctx: Le }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ce(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Gl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = ge([t.class, n.class]));
      else if (r === "style")
        t.style = At([t.style, n.style]);
      else if (Ws(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(L(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Xe(e, t, s, n = null) {
  qe(e, t, 7, [
    s,
    n
  ]);
}
const Yl = hi();
let Xl = 0;
function Ql(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Yl, o = {
    uid: Xl++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new _a(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: xi(n, r),
    emitsOptions: mi(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Rl.bind(null, o), e.ce && e.ce(o), o;
}
let Ae = null;
const $i = () => Ae || Le;
let qs, In;
{
  const e = Ys(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  qs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ae = s
  ), In = t(
    "__VUE_SSR_SETTERS__",
    (s) => ps = s
  );
}
const bs = (e) => {
  const t = Ae;
  return qs(e), e.scope.on(), () => {
    e.scope.off(), qs(t);
  };
}, jr = () => {
  Ae && Ae.scope.off(), qs(null);
};
function Pi(e) {
  return e.vnode.shapeFlag & 4;
}
let ps = !1;
function Zl(e, t = !1, s = !1) {
  t && In(t);
  const { props: n, children: r } = e.vnode, o = Pi(e);
  jl(e, n, o, t), Il(e, r, s || t);
  const i = o ? ec(e, t) : void 0;
  return t && In(!1), i;
}
function ec(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, yl);
  const { setup: n } = s;
  if (n) {
    ut();
    const r = e.setupContext = n.length > 1 ? sc(e) : null, o = bs(e), i = gs(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = Co(i);
    if (dt(), o(), (a || e.sp) && !os(e) && li(e), a) {
      if (i.then(jr, jr), t)
        return i.then((l) => {
          Fr(e, l);
        }).catch((l) => {
          Qs(l, e, 0);
        });
      e.asyncDep = i;
    } else
      Fr(e, i);
  } else
    Ni(e);
}
function Fr(e, t, s) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Q(t) && (e.setupState = Ko(t)), Ni(e);
}
function Ni(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || st);
  {
    const r = bs(e);
    ut();
    try {
      _l(e);
    } finally {
      dt(), r();
    }
  }
}
const tc = {
  get(e, t) {
    return ye(e, "get", ""), e[t];
  }
};
function sc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, tc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function nn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ko(Ba(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in is)
        return is[s](e);
    },
    has(t, s) {
      return s in t || s in is;
    }
  })) : e.proxy;
}
function nc(e) {
  return z(e) && "__vccOpts" in e;
}
const pe = (e, t) => /* @__PURE__ */ Ka(e, t, ps);
function rc(e, t, s) {
  try {
    zs(-1);
    const n = arguments.length;
    return n === 2 ? Q(t) && !L(t) ? Vs(t) ? xe(e, null, [t]) : xe(e, t) : xe(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Vs(s) && (s = [s]), xe(e, t, s));
  } finally {
    zs(1);
  }
}
const oc = "3.5.28";
let Ln;
const Mr = typeof window < "u" && window.trustedTypes;
if (Mr)
  try {
    Ln = /* @__PURE__ */ Mr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ji = Ln ? (e) => Ln.createHTML(e) : (e) => e, ic = "http://www.w3.org/2000/svg", ac = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, Dr = it && /* @__PURE__ */ it.createElement("template"), lc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? it.createElementNS(ic, e) : t === "mathml" ? it.createElementNS(ac, e) : s ? it.createElement(e, { is: s }) : it.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => it.createTextNode(e),
  createComment: (e) => it.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => it.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, o) {
    const i = s ? s.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      Dr.innerHTML = ji(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Dr.content;
      if (n === "svg" || n === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, s);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, mt = "transition", Xt = "animation", hs = /* @__PURE__ */ Symbol("_vtc"), Fi = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, cc = /* @__PURE__ */ ue(
  {},
  ni,
  Fi
), fc = (e) => (e.displayName = "Transition", e.props = cc, e), uc = /* @__PURE__ */ fc(
  (e, { slots: t }) => rc(il, dc(e), t)
), wt = (e, t = []) => {
  L(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, Ir = (e) => e ? L(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function dc(e) {
  const t = {};
  for (const N in e)
    N in Fi || (t[N] = e[N]);
  if (e.css === !1)
    return t;
  const {
    name: s = "v",
    type: n,
    duration: r,
    enterFromClass: o = `${s}-enter-from`,
    enterActiveClass: i = `${s}-enter-active`,
    enterToClass: a = `${s}-enter-to`,
    appearFromClass: l = o,
    appearActiveClass: f = i,
    appearToClass: c = a,
    leaveFromClass: p = `${s}-leave-from`,
    leaveActiveClass: y = `${s}-leave-active`,
    leaveToClass: w = `${s}-leave-to`
  } = e, g = pc(r), _ = g && g[0], h = g && g[1], {
    onBeforeEnter: v,
    onEnter: A,
    onEnterCancelled: F,
    onLeave: $,
    onLeaveCancelled: V,
    onBeforeAppear: re = v,
    onAppear: te = A,
    onAppearCancelled: he = F
  } = t, H = (N, X, fe, Me) => {
    N._enterCancelled = Me, St(N, X ? c : a), St(N, X ? f : i), fe && fe();
  }, J = (N, X) => {
    N._isLeaving = !1, St(N, p), St(N, w), St(N, y), X && X();
  }, oe = (N) => (X, fe) => {
    const Me = N ? te : A, Z = () => H(X, N, fe);
    wt(Me, [X, Z]), Lr(() => {
      St(X, N ? l : o), ot(X, N ? c : a), Ir(Me) || Ur(X, n, _, Z);
    });
  };
  return ue(t, {
    onBeforeEnter(N) {
      wt(v, [N]), ot(N, o), ot(N, i);
    },
    onBeforeAppear(N) {
      wt(re, [N]), ot(N, l), ot(N, f);
    },
    onEnter: oe(!1),
    onAppear: oe(!0),
    onLeave(N, X) {
      N._isLeaving = !0;
      const fe = () => J(N, X);
      ot(N, p), N._enterCancelled ? (ot(N, y), zr(N)) : (zr(N), ot(N, y)), Lr(() => {
        N._isLeaving && (St(N, p), ot(N, w), Ir($) || Ur(N, n, h, fe));
      }), wt($, [N, fe]);
    },
    onEnterCancelled(N) {
      H(N, !1, void 0, !0), wt(F, [N]);
    },
    onAppearCancelled(N) {
      H(N, !0, void 0, !0), wt(he, [N]);
    },
    onLeaveCancelled(N) {
      J(N), wt(V, [N]);
    }
  });
}
function pc(e) {
  if (e == null)
    return null;
  if (Q(e))
    return [yn(e.enter), yn(e.leave)];
  {
    const t = yn(e);
    return [t, t];
  }
}
function yn(e) {
  return Tn(e);
}
function ot(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[hs] || (e[hs] = /* @__PURE__ */ new Set())).add(t);
}
function St(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const s = e[hs];
  s && (s.delete(t), s.size || (e[hs] = void 0));
}
function Lr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let hc = 0;
function Ur(e, t, s, n) {
  const r = e._endId = ++hc, o = () => {
    r === e._endId && n();
  };
  if (s != null)
    return setTimeout(o, s);
  const { type: i, timeout: a, propCount: l } = mc(e, t);
  if (!i)
    return n();
  const f = i + "end";
  let c = 0;
  const p = () => {
    e.removeEventListener(f, y), o();
  }, y = (w) => {
    w.target === e && ++c >= l && p();
  };
  setTimeout(() => {
    c < l && p();
  }, a + 1), e.addEventListener(f, y);
}
function mc(e, t) {
  const s = window.getComputedStyle(e), n = (g) => (s[g] || "").split(", "), r = n(`${mt}Delay`), o = n(`${mt}Duration`), i = Br(r, o), a = n(`${Xt}Delay`), l = n(`${Xt}Duration`), f = Br(a, l);
  let c = null, p = 0, y = 0;
  t === mt ? i > 0 && (c = mt, p = i, y = o.length) : t === Xt ? f > 0 && (c = Xt, p = f, y = l.length) : (p = Math.max(i, f), c = p > 0 ? i > f ? mt : Xt : null, y = c ? c === mt ? o.length : l.length : 0);
  const w = c === mt && /\b(?:transform|all)(?:,|$)/.test(
    n(`${mt}Property`).toString()
  );
  return {
    type: c,
    timeout: p,
    propCount: y,
    hasTransform: w
  };
}
function Br(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((s, n) => Hr(s) + Hr(e[n])));
}
function Hr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function zr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function gc(e, t, s) {
  const n = e[hs];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Vr = /* @__PURE__ */ Symbol("_vod"), bc = /* @__PURE__ */ Symbol("_vsh"), vc = /* @__PURE__ */ Symbol(""), yc = /(?:^|;)\s*display\s*:/;
function _c(e, t, s) {
  const n = e.style, r = de(s);
  let o = !1;
  if (s && !r) {
    if (t)
      if (de(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          s[a] == null && js(n, a, "");
        }
      else
        for (const i in t)
          s[i] == null && js(n, i, "");
    for (const i in s)
      i === "display" && (o = !0), js(n, i, s[i]);
  } else if (r) {
    if (t !== s) {
      const i = n[vc];
      i && (s += ";" + i), n.cssText = s, o = yc.test(s);
    }
  } else t && e.removeAttribute("style");
  Vr in e && (e[Vr] = o ? n.display : "", e[bc] && (n.display = "none"));
}
const qr = /\s*!important$/;
function js(e, t, s) {
  if (L(s))
    s.forEach((n) => js(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = xc(e, t);
    qr.test(s) ? e.setProperty(
      Ie(n),
      s.replace(qr, ""),
      "important"
    ) : e[n] = s;
  }
}
const Kr = ["Webkit", "Moz", "ms"], _n = {};
function xc(e, t) {
  const s = _n[t];
  if (s)
    return s;
  let n = He(t);
  if (n !== "filter" && n in e)
    return _n[t] = n;
  n = To(n);
  for (let r = 0; r < Kr.length; r++) {
    const o = Kr[r] + n;
    if (o in e)
      return _n[t] = o;
  }
  return t;
}
const Wr = "http://www.w3.org/1999/xlink";
function Jr(e, t, s, n, r, o = va(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Wr, t.slice(6, t.length)) : e.setAttributeNS(Wr, t, s) : s == null || o && !Ro(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : nt(s) ? String(s) : s
  );
}
function Gr(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? ji(s) : s);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, l = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (a !== l || !("_value" in e)) && (e.value = l), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = Ro(s) : s == null && a === "string" ? (s = "", i = !0) : a === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Dt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function wc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Yr = /* @__PURE__ */ Symbol("_vei");
function Sc(e, t, s, n, r = null) {
  const o = e[Yr] || (e[Yr] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [a, l] = Cc(t);
    if (n) {
      const f = o[t] = Ac(
        n,
        r
      );
      Dt(e, a, f, l);
    } else i && (wc(e, a, i, l), o[t] = void 0);
  }
}
const Xr = /(?:Once|Passive|Capture)$/;
function Cc(e) {
  let t;
  if (Xr.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Xr); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ie(e.slice(2)), t];
}
let xn = 0;
const Ec = /* @__PURE__ */ Promise.resolve(), Tc = () => xn || (Ec.then(() => xn = 0), xn = Date.now());
function Ac(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    qe(
      Rc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Tc(), s;
}
function Rc(e, t) {
  if (L(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const Qr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Oc = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? gc(e, n, i) : t === "style" ? _c(e, s, n) : Ws(t) ? qn(t) || Sc(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : kc(e, t, n, i)) ? (Gr(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Jr(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !de(n)) ? Gr(e, He(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Jr(e, t, n, i));
};
function kc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Qr(t) && z(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Qr(t) && de(s) ? !1 : t in e;
}
const Zr = {};
// @__NO_SIDE_EFFECTS__
function vs(e, t, s) {
  let n = /* @__PURE__ */ al(e, t);
  Js(n) && (n = ue({}, n, t));
  class r extends cr {
    constructor(i) {
      super(n, i, s);
    }
  }
  return r.def = n, r;
}
const $c = typeof HTMLElement < "u" ? HTMLElement : class {
};
class cr extends $c {
  constructor(t, s = {}, n = ro) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== ro ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      ue({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof cr) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, Jo(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const s of t)
      this._setAttr(s.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (n, r = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: o, styles: i } = n;
      let a;
      if (o && !L(o))
        for (const l in o) {
          const f = o[l];
          (f === Number || f && f.type === Number) && (l in this._props && (this._props[l] = Tn(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[He(l)] = !0);
        }
      this._numberProps = a, this._resolveProps(n), this.shadowRoot && this._applyStyles(i), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const s = this._instance && this._instance.exposed;
    if (s)
      for (const n in s)
        Y(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => qo(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = L(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(He))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(o) {
          this._setProp(r, o, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Zr;
    const r = He(t);
    s && this._numberProps && this._numberProps[r] && (n = Tn(n)), this._setProp(r, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, r = !1) {
    if (s !== this._props[t] && (this._dirty = !0, s === Zr ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Ie(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ie(t), s + "") : s || this.removeAttribute(Ie(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Ic(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = xe(this._def, ue(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            Js(i[0]) ? ue({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      n.emit = (o, ...i) => {
        r(o, i), Ie(o) !== o && r(Ie(o), i);
      }, this._setParent();
    }), s;
  }
  _applyStyles(t, s) {
    if (!t) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s))
        return;
      this._styleChildren.add(s);
    }
    const n = this._nonce;
    for (let r = t.length - 1; r >= 0; r--) {
      const o = document.createElement("style");
      n && o.setAttribute("nonce", n), o.textContent = t[r], this.shadowRoot.prepend(o);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let s;
    for (; s = this.firstChild; ) {
      const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(s), this.removeChild(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), s = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const r = t[n], o = r.getAttribute("name") || "default", i = this._slots[o], a = r.parentNode;
      if (i)
        for (const l of i) {
          if (s && l.nodeType === 1) {
            const f = s + "-s", c = document.createTreeWalker(l, 1);
            l.setAttribute(f, "");
            let p;
            for (; p = c.nextNode(); )
              p.setAttribute(f, "");
          }
          a.insertBefore(l, r);
        }
      else
        for (; r.firstChild; ) a.insertBefore(r.firstChild, r);
      a.removeChild(r);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    this._teleportTargets && t.push(...this._teleportTargets);
    const s = /* @__PURE__ */ new Set();
    for (const n of t) {
      const r = n.querySelectorAll("slot");
      for (let o = 0; o < r.length; o++)
        s.add(r[o]);
    }
    return Array.from(s);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  /**
   * @internal
   */
  _hasShadowRoot() {
    return this._def.shadowRoot !== !1;
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const eo = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return L(t) ? (s) => ks(t, s) : t;
};
function Pc(e) {
  e.target.composing = !0;
}
function to(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const wn = /* @__PURE__ */ Symbol("_assign");
function so(e, t, s) {
  return t && (e = e.trim()), s && (e = Jn(e)), e;
}
const Nc = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, r) {
    e[wn] = eo(r);
    const o = n || r.props && r.props.type === "number";
    Dt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[wn](so(e.value, s, o));
    }), (s || o) && Dt(e, "change", () => {
      e.value = so(e.value, s, o);
    }), t || (Dt(e, "compositionstart", Pc), Dt(e, "compositionend", to), Dt(e, "change", to));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: r, number: o } }, i) {
    if (e[wn] = eo(i), e.composing) return;
    const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? Jn(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (n && t === s || r && e.value.trim() === l) || (e.value = l));
  }
}, jc = ["ctrl", "shift", "alt", "meta"], Fc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => jc.some((s) => e[`${s}Key`] && !t.includes(s))
}, Mc = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = Fc[t[i]];
      if (a && a(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Dc = /* @__PURE__ */ ue({ patchProp: Oc }, lc);
let no;
function Mi() {
  return no || (no = Ul(Dc));
}
const Ic = ((...e) => {
  Mi().render(...e);
}), ro = ((...e) => {
  const t = Mi().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Uc(n);
    if (!r) return;
    const o = t._component;
    !z(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = s(r, !1, Lc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Lc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Uc(e) {
  return de(e) ? document.querySelector(e) : e;
}
const Bc = ".gallery-card[data-v-f24e9ecc]{background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 10px 30px -10px #00000014;border:1px solid #f0f2f5;transition:all .3s cubic-bezier(.2,0,0,1);height:100%;display:flex;flex-direction:column;position:relative}.gallery-card[data-v-f24e9ecc]:hover{transform:translateY(-4px);box-shadow:0 20px 40px -12px #4158d033;border-color:transparent}.card-cover[data-v-f24e9ecc]{height:110px;position:relative;flex-shrink:0}.card-avatar[data-v-f24e9ecc]{width:100px;height:100px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:2.2rem;color:#fff;position:absolute;bottom:-45px;left:5px;border:4px solid white;box-shadow:0 8px 20px #0000001a;background:linear-gradient(135deg,#4158d0,#c850c0);text-shadow:0 2px 4px rgba(0,0,0,.1);z-index:2}.card-content[data-v-f24e9ecc]{padding:3rem 1.5rem 1.25rem;flex:1;display:flex;flex-direction:column;gap:1.25rem}.card-header[data-v-f24e9ecc]{display:flex;align-items:flex-start;justify-content:space-between;flex-shrink:0}.card-name[data-v-f24e9ecc]{font-weight:600;font-size:1.2rem;color:#1e293b;margin:0 0 .25rem;letter-spacing:-.01em}.card-meta[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;color:#64748b;font-size:.85rem}.dot[data-v-f24e9ecc]{color:#cbd5e1}.match-pill[data-v-f24e9ecc]{background:linear-gradient(135deg,#4158d0,#c850c0);padding:.35rem .75rem;border-radius:40px;color:#fff;font-weight:600;font-size:1.1rem;line-height:1;box-shadow:0 4px 10px #4158d033;flex-shrink:0}.match-symbol[data-v-f24e9ecc]{font-size:.7rem;opacity:.9;margin-left:1px}.stats-minimal[data-v-f24e9ecc]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;margin-bottom:.75rem;border-bottom:1px dashed #e2e8f0}.stat-minimal[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;flex:1}.stat-minimal-emoji[data-v-f24e9ecc]{font-size:1.2rem;opacity:.7}.stat-minimal-text[data-v-f24e9ecc]{display:flex;flex-direction:column}.stat-minimal-value[data-v-f24e9ecc]{font-weight:500;font-size:.9rem;color:#1e293b;line-height:1.2}.stat-minimal-label[data-v-f24e9ecc]{font-size:.6rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.02em}.stat-minimal-divider[data-v-f24e9ecc]{width:1px;height:30px;background:linear-gradient(to bottom,transparent,#e2e8f0,transparent);margin:0 .5rem}.section-header[data-v-f24e9ecc]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}.section-title[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.03em}.slot-count[data-v-f24e9ecc],.course-count[data-v-f24e9ecc]{font-size:.7rem;color:#4158d0;background:#f0f2ff;padding:.2rem .6rem;border-radius:30px;font-weight:500}.schedule-availability[data-v-f24e9ecc],.shared-courses[data-v-f24e9ecc]{flex-shrink:0}.schedule-slots[data-v-f24e9ecc],.course-list[data-v-f24e9ecc]{display:flex;flex-wrap:wrap;gap:.5rem;min-height:36px}.slot-chip[data-v-f24e9ecc]{background:#f8fafc;padding:.4rem .75rem;border-radius:30px;font-size:.75rem;display:inline-flex;align-items:center;gap:.4rem;border:1px solid #eef2f6;transition:all .2s;cursor:help}.slot-chip[data-v-f24e9ecc]:hover{background:#f0f2ff;border-color:#4158d0}.slot-day[data-v-f24e9ecc]{font-weight:600;color:#1e293b}.slot-time[data-v-f24e9ecc]{color:#64748b}.slot-chip.more[data-v-f24e9ecc]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.slot-chip.more[data-v-f24e9ecc]:hover{background:transparent;border-color:#cbd5e1}.course-chip[data-v-f24e9ecc]{background:#f8fafc;padding:.4rem .9rem;border-radius:30px;font-size:.75rem;color:#475569;border:1px solid #eef2f6;transition:all .2s;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.course-chip[data-v-f24e9ecc]:hover{border-color:#c850c0;color:#c850c0;background:#fdf2f8}.course-chip.more[data-v-f24e9ecc]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.course-chip.more[data-v-f24e9ecc]:hover{background:transparent;border-color:#cbd5e1;color:#94a3b8}.empty-state[data-v-f24e9ecc]{display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:30px;padding:.5rem 1rem;min-height:36px}.empty-text[data-v-f24e9ecc]{font-size:.75rem;color:#94a3b8}.card-actions[data-v-f24e9ecc]{display:flex;gap:.5rem;margin-top:auto;padding-top:.5rem;flex-shrink:0}.btn-profile[data-v-f24e9ecc]{flex:2;padding:.7rem;border:none;border-radius:40px;font-weight:500;font-size:.8rem;background:linear-gradient(135deg,#4158d0,#c850c0);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;box-shadow:0 6px 14px #4158d033;transition:all .2s}.btn-profile[data-v-f24e9ecc]:hover{transform:translateY(-2px);box-shadow:0 10px 20px #4158d04d}.btn-icon[data-v-f24e9ecc]{width:42px;height:42px;border-radius:50%;border:none;background:#fff;color:#64748b;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px #0000000d;border:1px solid #e2e8f0;transition:all .2s;flex-shrink:0}.btn-icon[data-v-f24e9ecc]:hover{transform:translateY(-2px)}.btn-icon.invite[data-v-f24e9ecc]:hover{background:#4158d0;color:#fff;border-color:#4158d0}.btn-icon.message[data-v-f24e9ecc]:hover{background:#c850c0;color:#fff;border-color:#c850c0}@media(max-width:768px){.gallery-card.list-view[data-v-f24e9ecc]{flex-direction:column;min-height:auto}.list-view .card-cover[data-v-f24e9ecc]{width:100%;height:100px;border-radius:24px 24px 0 0}.list-view .card-avatar[data-v-f24e9ecc]{width:80px;height:80px;font-size:2rem;left:50%;transform:translate(-50%);top:auto;bottom:-40px;margin-top:0}.list-view .card-content[data-v-f24e9ecc]{padding:3rem 1.25rem 1.25rem}.list-details-row[data-v-f24e9ecc]{flex-direction:column;gap:1rem}}@media(max-width:640px){.card-avatar[data-v-f24e9ecc]{width:80px;height:80px;font-size:2rem;bottom:-40px;left:50%;transform:translate(-50%)}.card-content[data-v-f24e9ecc]{padding:2.8rem 1.25rem 1.25rem}.card-name[data-v-f24e9ecc]{font-size:1.1rem}.stat-minimal-emoji[data-v-f24e9ecc]{font-size:1rem}.stat-minimal-value[data-v-f24e9ecc]{font-size:.85rem}.btn-icon[data-v-f24e9ecc]{width:38px;height:38px;font-size:1rem}.list-view .card-avatar[data-v-f24e9ecc]{width:70px;height:70px;font-size:1.8rem;bottom:-35px}}", ys = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, Hc = { class: "gallery-card" }, zc = { class: "card-avatar" }, Vc = { class: "card-content" }, qc = { class: "card-header" }, Kc = { class: "card-name" }, Wc = { class: "card-meta" }, Jc = { class: "match-pill" }, Gc = { class: "match-value" }, Yc = { class: "stat-minimal" }, Xc = { class: "stat-minimal-text" }, Qc = { class: "stat-minimal-value" }, Zc = {
  key: 0,
  class: "stat-minimal-divider"
}, ef = { class: "stat-minimal" }, tf = { class: "stat-minimal-text" }, sf = { class: "stat-minimal-value" }, nf = {
  key: 1,
  class: "stat-minimal-divider"
}, rf = { class: "stat-minimal" }, of = { class: "stat-minimal-emoji" }, af = { class: "stat-minimal-text" }, lf = { class: "stat-minimal-value" }, cf = {
  key: 0,
  class: "list-details-row"
}, ff = { class: "schedule-availability list-compact" }, uf = { class: "section-header list-header" }, df = {
  key: 0,
  class: "slot-count"
}, pf = {
  key: 0,
  class: "schedule-slots list-slots"
}, hf = ["title"], mf = { class: "slot-day" }, gf = { class: "slot-time" }, bf = {
  key: 0,
  class: "slot-chip more list-chip"
}, vf = {
  key: 1,
  class: "empty-state list-empty"
}, yf = { class: "shared-courses list-compact" }, _f = { class: "section-header list-header" }, xf = {
  key: 0,
  class: "course-count"
}, wf = {
  key: 0,
  class: "course-list list-courses"
}, Sf = {
  key: 0,
  class: "course-chip more list-chip"
}, Cf = {
  key: 1,
  class: "empty-state list-empty"
}, Ef = { class: "schedule-availability" }, Tf = { class: "section-header" }, Af = {
  key: 0,
  class: "slot-count"
}, Rf = {
  key: 0,
  class: "schedule-slots"
}, Of = ["title"], kf = { class: "slot-day" }, $f = { class: "slot-time" }, Pf = {
  key: 0,
  class: "slot-chip more"
}, Nf = {
  key: 1,
  class: "empty-state"
}, jf = { class: "shared-courses" }, Ff = { class: "section-header" }, Mf = {
  key: 0,
  class: "course-count"
}, Df = {
  key: 0,
  class: "course-list"
}, If = {
  key: 0,
  class: "course-chip more"
}, Lf = {
  key: 1,
  class: "empty-state"
}, Uf = {
  __name: "GalleryCard.ce",
  props: {
    profile: [Object, String],
    matchPercent: [Number, String],
    overlapHours: [Number, String],
    overlapCourses: [Array, String],
    timeSlots: {
      type: [Array, String],
      default: () => []
    },
    viewMode: {
      type: String,
      default: "grid"
    }
  },
  emits: ["connect"],
  setup(e, { emit: t }) {
    const s = e, n = ns("viewMode", null), r = pe(
      () => (n?.value || s.viewMode) === "list"
    ), o = pe(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), i = pe(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), a = pe(() => {
      if (Array.isArray(s.timeSlots)) return s.timeSlots;
      try {
        return s.timeSlots ? JSON.parse(s.timeSlots) : [];
      } catch {
        return [];
      }
    }), l = pe(() => (o.value.username || "??").charAt(0).toUpperCase()), f = pe(() => {
      const h = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], v = (o.value.username?.length || 0) % h.length;
      return { background: h[v] };
    }), c = pe(() => a.value.length > 0), p = (h) => {
      if (!h) return "";
      const [v, A] = h.split(":"), F = parseInt(v), $ = F >= 12 ? "pm" : "am";
      return `${F % 12 || 12}${A !== "00" ? `:${A}` : ""}${$}`;
    }, y = pe(() => a.value.slice(0, 3).map((h) => ({
      dayShort: h.day?.substring(0, 3) || "Any",
      timeRange: h.start_time ? `${p(h.start_time)}-${p(h.end_time)}` : "Flexible",
      tooltip: `${h.day || "Any day"}: ${h.start_time || "Flexible"} - ${h.end_time || "Flexible"}`
    }))), w = pe(() => {
      if (a.value.length === 0) return "flexible";
      const h = a.value[0];
      if (!h.start_time) return "flexible";
      const v = parseInt(h.start_time.split(":")[0]);
      return v < 12 ? "morning" : v < 17 ? "afternoon" : "evening";
    }), g = pe(() => {
      if (a.value.length === 0) return "🔄";
      const h = a.value[0];
      if (!h.start_time) return "🔄";
      const v = parseInt(h.start_time.split(":")[0]);
      return v < 12 ? "🌅" : v < 17 ? "☀️" : "🌙";
    }), _ = () => {
      window.location.href = `/profile/${o.value.id}/`;
    };
    return (h, v) => (M(), D("div", Hc, [
      u("div", {
        class: "card-cover",
        style: At(f.value)
      }, [
        u("div", zc, j(l.value), 1)
      ], 4),
      u("div", Vc, [
        u("div", qc, [
          u("div", null, [
            u("h3", Kc, j(o.value.username), 1),
            u("div", Wc, [
              u("span", null, j(o.value.major), 1),
              v[2] || (v[2] = u("span", { class: "dot" }, "•", -1)),
              u("span", null, "Year " + j(o.value.year), 1)
            ])
          ]),
          u("div", Jc, [
            u("span", Gc, j(e.matchPercent), 1),
            v[3] || (v[3] = u("span", { class: "match-symbol" }, "%", -1))
          ])
        ]),
        u("div", {
          class: ge(["stats-minimal", { "list-stats": r.value }])
        }, [
          u("div", Yc, [
            v[5] || (v[5] = u("span", { class: "stat-minimal-emoji" }, "📚", -1)),
            u("span", Xc, [
              u("span", Qc, j(i.value.length), 1),
              v[4] || (v[4] = u("span", { class: "stat-minimal-label" }, "courses", -1))
            ])
          ]),
          r.value ? me("", !0) : (M(), D("div", Zc)),
          u("div", ef, [
            v[7] || (v[7] = u("span", { class: "stat-minimal-emoji" }, "⏰", -1)),
            u("span", tf, [
              u("span", sf, j(e.overlapHours) + "h", 1),
              v[6] || (v[6] = u("span", { class: "stat-minimal-label" }, "overlap", -1))
            ])
          ]),
          r.value ? me("", !0) : (M(), D("div", nf)),
          u("div", rf, [
            u("span", of, j(g.value), 1),
            u("span", af, [
              u("span", lf, j(w.value), 1),
              v[8] || (v[8] = u("span", { class: "stat-minimal-label" }, "pref", -1))
            ])
          ])
        ], 2),
        r.value ? (M(), D("div", cf, [
          u("div", ff, [
            u("div", uf, [
              v[9] || (v[9] = u("div", { class: "section-title" }, [
                u("span", null, "📅"),
                u("span", null, "Schedule")
              ], -1)),
              c.value ? (M(), D("span", df, j(a.value.length), 1)) : me("", !0)
            ]),
            c.value ? (M(), D("div", pf, [
              (M(!0), D(ce, null, ft(y.value.slice(0, 2), (A, F) => (M(), D("div", {
                key: F,
                class: "slot-chip list-chip",
                title: A.tooltip
              }, [
                u("span", mf, j(A.dayShort), 1),
                u("span", gf, j(A.timeRange), 1)
              ], 8, hf))), 128)),
              a.value.length > 2 ? (M(), D("div", bf, " +" + j(a.value.length - 2), 1)) : me("", !0)
            ])) : (M(), D("div", vf, [...v[10] || (v[10] = [
              u("span", { class: "empty-text" }, "No availability", -1)
            ])]))
          ]),
          u("div", yf, [
            u("div", _f, [
              v[11] || (v[11] = u("div", { class: "section-title" }, [
                u("span", null, "🏷️"),
                u("span", null, "Courses")
              ], -1)),
              i.value.length > 0 ? (M(), D("span", xf, j(i.value.length), 1)) : me("", !0)
            ]),
            i.value.length > 0 ? (M(), D("div", wf, [
              (M(!0), D(ce, null, ft(i.value.slice(0, 2), (A) => (M(), D("span", {
                key: A,
                class: "course-chip list-chip"
              }, j(A), 1))), 128)),
              i.value.length > 2 ? (M(), D("span", Sf, " +" + j(i.value.length - 2), 1)) : me("", !0)
            ])) : (M(), D("div", Cf, [...v[12] || (v[12] = [
              u("span", { class: "empty-text" }, "No courses", -1)
            ])]))
          ])
        ])) : me("", !0),
        r.value ? me("", !0) : (M(), D(ce, { key: 1 }, [
          u("div", Ef, [
            u("div", Tf, [
              v[13] || (v[13] = u("div", { class: "section-title" }, [
                u("span", null, "📅"),
                u("span", null, "Schedule match")
              ], -1)),
              c.value ? (M(), D("span", Af, j(a.value.length) + " slots", 1)) : me("", !0)
            ]),
            c.value ? (M(), D("div", Rf, [
              (M(!0), D(ce, null, ft(y.value, (A, F) => (M(), D("div", {
                key: F,
                class: "slot-chip",
                title: A.tooltip
              }, [
                u("span", kf, j(A.dayShort), 1),
                u("span", $f, j(A.timeRange), 1)
              ], 8, Of))), 128)),
              a.value.length > 3 ? (M(), D("div", Pf, " +" + j(a.value.length - 3), 1)) : me("", !0)
            ])) : (M(), D("div", Nf, [...v[14] || (v[14] = [
              u("span", { class: "empty-text" }, "No common availability", -1)
            ])]))
          ]),
          u("div", jf, [
            u("div", Ff, [
              v[15] || (v[15] = u("div", { class: "section-title" }, [
                u("span", null, "🏷️"),
                u("span", null, "Courses in common")
              ], -1)),
              i.value.length > 0 ? (M(), D("span", Mf, j(i.value.length) + " total ", 1)) : me("", !0)
            ]),
            i.value.length > 0 ? (M(), D("div", Df, [
              (M(!0), D(ce, null, ft(i.value.slice(0, 3), (A) => (M(), D("span", {
                key: A,
                class: "course-chip"
              }, j(A), 1))), 128)),
              i.value.length > 3 ? (M(), D("span", If, " +" + j(i.value.length - 3), 1)) : me("", !0)
            ])) : (M(), D("div", Lf, [...v[16] || (v[16] = [
              u("span", { class: "empty-text" }, "No shared courses", -1)
            ])]))
          ])
        ], 64)),
        u("div", {
          class: ge(["card-actions", { "list-actions": r.value }])
        }, [
          u("button", {
            class: "btn-profile",
            onClick: _
          }, [...v[17] || (v[17] = [
            u("span", null, "👤", -1),
            u("span", null, "View Profile", -1)
          ])]),
          u("button", {
            class: "btn-icon invite",
            onClick: v[0] || (v[0] = () => {
            }),
            title: "Invite to study group"
          }, [...v[18] || (v[18] = [
            u("span", null, "🤝", -1)
          ])]),
          u("button", {
            class: "btn-icon message",
            onClick: v[1] || (v[1] = () => {
            }),
            title: "Send message"
          }, [...v[19] || (v[19] = [
            u("span", null, "💬", -1)
          ])])
        ], 2)
      ])
    ]));
  }
}, Di = /* @__PURE__ */ ys(Uf, [["styles", [Bc]], ["__scopeId", "data-v-f24e9ecc"]]), Bf = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-ab17189e]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-ab17189e]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-ab17189e]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-ab17189e]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-ab17189e]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-ab17189e]{position:relative;width:52px;height:52px}.avatar-main[data-v-ab17189e]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-ab17189e]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-ab17189e]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-ab17189e]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-ab17189e]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-ab17189e]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-ab17189e]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-ab17189e]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-ab17189e]{color:#4f46e5}.vertical-divider[data-v-ab17189e]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-ab17189e]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-ab17189e]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-ab17189e]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-ab17189e]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-ab17189e]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-ab17189e]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-ab17189e]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-ab17189e]{flex-direction:column}.match-stats[data-v-ab17189e]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-ab17189e]{width:100%;justify-content:center}}', Hf = { class: "elegant-item-container" }, zf = { class: "elegant-content" }, Vf = { class: "identity-block" }, qf = { class: "avatar-container" }, Kf = { class: "name-section" }, Wf = { class: "username" }, Jf = { class: "major" }, Gf = { class: "match-stats" }, Yf = { class: "stat-group" }, Xf = { class: "stat-value highlight" }, Qf = { class: "stat-group" }, Zf = { class: "stat-value" }, eu = { class: "stat-group" }, tu = { class: "stat-value" }, su = {
  __name: "GalleryCardCompat.ce",
  props: {
    profile: [Object, String],
    matchPercent: [Number, String],
    overlapHours: [Number, String],
    overlapCourses: [Array, String],
    timeSlots: {
      type: [Array, String],
      default: () => []
    }
  },
  emits: ["connect"],
  setup(e, { emit: t }) {
    const s = e, n = pe(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = pe(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), o = pe(() => (n.value.username || "??").charAt(0).toUpperCase()), i = pe(() => {
      const c = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], p = (n.value.username?.length || 0) % c.length;
      return { background: c[p] };
    }), a = () => {
      const c = n.value.username.replace("@", "");
      window.location.href = `/profile/${c}/`;
    }, l = () => {
      const c = n.value.username.replace("@", "");
      window.location.href = `/study-groups/create/?invite=${c}`;
    }, f = () => {
      const c = n.value.username.replace("@", "");
      window.location.href = `/messages/new/?to=${c}`;
    };
    return (c, p) => (M(), D("div", Hf, [
      u("div", {
        class: "glow-accent",
        style: At(i.value)
      }, null, 4),
      u("div", zf, [
        u("div", Vf, [
          u("div", qf, [
            u("div", {
              class: "avatar-ring",
              style: At(c.avatarBorder)
            }, null, 4),
            u("div", {
              class: "avatar-main",
              style: At(i.value)
            }, j(o.value), 5)
          ]),
          u("div", Kf, [
            u("h3", Wf, j(n.value.username), 1),
            u("p", Jf, j(n.value.major), 1)
          ])
        ]),
        u("div", Gf, [
          u("div", Yf, [
            p[1] || (p[1] = u("span", { class: "stat-label" }, "Match", -1)),
            u("span", Xf, [
              Ce(j(e.matchPercent), 1),
              p[0] || (p[0] = u("small", null, "%", -1))
            ])
          ]),
          p[6] || (p[6] = u("div", { class: "vertical-divider" }, null, -1)),
          u("div", Qf, [
            p[3] || (p[3] = u("span", { class: "stat-label" }, "Overlap", -1)),
            u("span", Zf, [
              Ce(j(e.overlapHours), 1),
              p[2] || (p[2] = u("small", null, "h", -1))
            ])
          ]),
          p[7] || (p[7] = u("div", { class: "vertical-divider" }, null, -1)),
          u("div", eu, [
            p[5] || (p[5] = u("span", { class: "stat-label" }, "Shared", -1)),
            u("span", tu, [
              Ce(j(r.value.length), 1),
              p[4] || (p[4] = u("small", null, "📚", -1))
            ])
          ])
        ]),
        u("div", { class: "action-block" }, [
          u("button", {
            class: "action-trigger primary",
            onClick: a
          }, [...p[8] || (p[8] = [
            u("span", null, "View", -1)
          ])]),
          u("button", {
            class: "action-trigger icon",
            onClick: f
          }, [...p[9] || (p[9] = [
            u("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          u("button", {
            class: "action-trigger icon",
            onClick: l
          }, [...p[10] || (p[10] = [
            u("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, Ii = /* @__PURE__ */ ys(su, [["styles", [Bf]], ["__scopeId", "data-v-ab17189e"]]), nu = ".discovery-container[data-v-f575c718]{max-width:1440px;margin:0 auto;padding:2.5rem 2rem;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.discovery-header[data-v-f575c718]{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.brand-title[data-v-f575c718]{font-size:1.8rem;font-weight:600;color:#1a1e2b;letter-spacing:-.02em;margin:0 0 .25rem}.brand-tagline[data-v-f575c718]{color:#6b7280;font-size:.9rem;font-weight:400;margin:0}.view-toggles[data-v-f575c718]{display:flex;gap:.5rem;background:#fff;padding:.25rem;border-radius:40px;border:1px solid #eef2f6;box-shadow:0 2px 8px #00000005}.toggle-btn[data-v-f575c718]{width:42px;height:42px;border-radius:40px;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.toggle-btn[data-v-f575c718]:hover{color:#4158d0;background:#f5f7ff}.toggle-btn.active[data-v-f575c718]{background:#4158d0;color:#fff;box-shadow:0 4px 10px #4158d033}.toggle-icon[data-v-f575c718]{font-size:1.3rem;line-height:1}.search-section[data-v-f575c718]{margin-bottom:2rem}.search-field[data-v-f575c718]{max-width:500px;position:relative}.search-icon[data-v-f575c718]{position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);font-size:1.1rem;color:#94a3b8;pointer-events:none}.search-input[data-v-f575c718]{width:100%;padding:1rem 1rem 1rem 3.5rem;font-size:.95rem;border:1px solid #eef2f6;border-radius:50px;background:#fff;box-shadow:0 4px 12px #00000005;transition:all .2s ease}.search-input[data-v-f575c718]:focus{outline:none;border-color:#4158d0;box-shadow:0 4px 16px #4158d014}.search-submit[data-v-f575c718]{position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;transition:all .2s}.search-submit[data-v-f575c718]:hover{background:#f1f5f9;color:#4158d0}.filters-bar[data-v-f575c718]{margin-bottom:2.5rem;border-bottom:1px solid #f0f2f5}.filter-tabs[data-v-f575c718]{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.75rem;scrollbar-width:none}.filter-tabs[data-v-f575c718]::-webkit-scrollbar{display:none}.filter-tab[data-v-f575c718]{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.2rem;border:none;background:transparent;color:#6b7280;font-size:.9rem;font-weight:500;cursor:pointer;border-radius:40px;transition:all .2s ease;white-space:nowrap}.filter-tab[data-v-f575c718]:hover{background:#f8fafc;color:#4158d0}.filter-tab.active[data-v-f575c718]{background:#f0f2ff;color:#4158d0}.tab-emoji[data-v-f575c718]{font-size:1.1rem}.tab-badge[data-v-f575c718]{background:#eef2f6;color:#64748b;padding:.15rem .5rem;border-radius:30px;font-size:.7rem;font-weight:500;margin-left:.25rem}.filter-tab.active .tab-badge[data-v-f575c718]{background:#fff;color:#4158d0}.results-section[data-v-f575c718]{min-height:400px}.results-grid[data-v-f575c718]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.results-list[data-v-f575c718]{display:flex;flex-direction:column;gap:1rem}.results-list[data-v-f575c718] .gallery-card{display:flex;flex-direction:row;height:auto}.results-list[data-v-f575c718] .card-cover{width:120px;height:auto;flex-shrink:0}.empty-state[data-v-f575c718]{text-align:center;padding:4rem 2rem;background:#fff;border-radius:32px;border:1px dashed #e2e8f0}.empty-illustration[data-v-f575c718]{font-size:4rem;margin-bottom:1.5rem;opacity:.7}.empty-title[data-v-f575c718]{font-size:1.3rem;font-weight:500;color:#1e293b;margin-bottom:.5rem}.empty-message[data-v-f575c718]{color:#94a3b8;font-size:.95rem;margin-bottom:1.5rem}.empty-reset[data-v-f575c718]{background:none;border:1px solid #e2e8f0;padding:.6rem 1.5rem;border-radius:40px;color:#64748b;font-size:.9rem;cursor:pointer;transition:all .2s}.empty-reset[data-v-f575c718]:hover{border-color:#4158d0;color:#4158d0;background:#f8faff}.fade-enter-active[data-v-f575c718],.fade-leave-active[data-v-f575c718]{transition:opacity .3s ease}.fade-enter-from[data-v-f575c718],.fade-leave-to[data-v-f575c718]{opacity:0}@media(max-width:768px){.discovery-container[data-v-f575c718]{padding:1.5rem 1rem}.discovery-header[data-v-f575c718]{flex-direction:column;align-items:flex-start;gap:1rem}.view-toggles[data-v-f575c718]{align-self:flex-end}.search-field[data-v-f575c718]{max-width:100%}.results-grid[data-v-f575c718]{grid-template-columns:1fr}}@media(max-width:480px){.filter-tab[data-v-f575c718]{padding:.5rem 1rem;font-size:.85rem}.empty-state[data-v-f575c718]{padding:2rem 1rem}}", ru = { class: "discovery-container" }, ou = { class: "discovery-header" }, iu = { class: "view-toggles" }, au = { class: "search-section" }, lu = { class: "search-field" }, cu = { class: "filters-bar" }, fu = { class: "filter-tabs" }, uu = ["onClick"], du = { class: "tab-emoji" }, pu = { class: "tab-name" }, hu = {
  key: 0,
  class: "tab-badge"
}, mu = { class: "results-section" }, gu = {
  key: 1,
  class: "empty-state"
}, bu = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ Be("grid"), n = /* @__PURE__ */ Be(""), r = /* @__PURE__ */ Be("all"), o = pe(() => {
      try {
        const y = JSON.parse(t.topMatches), w = y.reduce((v, A) => A.match_percent > 85 ? v += 1 : v, 0), g = y.reduce((v, A) => A.overlap_hours > 5 ? v += 1 : v, 0), _ = JSON.parse(t.sameMajor), h = JSON.parse(t.sameMajor);
        return {
          all: y.length,
          best: w,
          schedule: g,
          major: _.length,
          course: h.length
        };
      } catch (y) {
        console.error(y);
      }
    }), i = [
      { id: "all", name: "All matches", icon: "👥", count: o.value.all },
      {
        id: "high",
        name: "Best matches",
        icon: "⭐",
        count: o.value.best
      },
      {
        id: "schedule",
        name: "Schedule",
        icon: "🕒",
        count: o.value.schedule
      },
      {
        id: "courses",
        name: "Courses",
        icon: "📚",
        count: o.value.course
      },
      { id: "major", name: "Major", icon: "🎓", count: o.value.major }
    ], a = pe(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), l = pe(() => {
      try {
        return JSON.parse(a.value || "[]");
      } catch {
        return [];
      }
    }), f = pe(() => {
      let y = l.value;
      if (n.value) {
        const w = n.value.toLowerCase();
        y = y.filter(
          (g) => g.profile.username.toLowerCase().includes(w) || g.profile.major.toLowerCase().includes(w) || g.overlap_courses?.some(
            (_) => _.toLowerCase().includes(w)
          )
        );
      }
      switch (r.value) {
        case "high":
          y = y.filter((w) => w.match_percent >= 85);
          break;
        case "schedule":
          y = y.filter((w) => w.overlap_hours >= 5);
          break;
        case "courses":
          y = y.filter((w) => w.overlap_courses?.length >= 2);
          break;
      }
      return y;
    }), c = (y) => {
      console.log(`Connecting with ${y}`);
    }, p = () => {
      n.value = "", r.value = "all";
    };
    return $s(l, (y) => {
    }), (y, w) => (M(), D("div", ru, [
      u("div", ou, [
        w[6] || (w[6] = u("div", { class: "brand" }, [
          u("h1", { class: "brand-title" }, "StudySync"),
          u("p", { class: "brand-tagline" }, "Discover your ideal study partner")
        ], -1)),
        u("div", iu, [
          u("button", {
            class: ge(["toggle-btn", { active: s.value === "grid" }]),
            onClick: w[0] || (w[0] = (g) => s.value = "grid"),
            "aria-label": "Grid view"
          }, [...w[4] || (w[4] = [
            u("span", { class: "toggle-icon" }, "⊞", -1)
          ])], 2),
          u("button", {
            class: ge(["toggle-btn", { active: s.value === "list" }]),
            onClick: w[1] || (w[1] = (g) => s.value = "list"),
            "aria-label": "List view"
          }, [...w[5] || (w[5] = [
            u("span", { class: "toggle-icon" }, "≡", -1)
          ])], 2)
        ])
      ]),
      u("div", au, [
        u("div", lu, [
          w[8] || (w[8] = u("span", { class: "search-icon" }, "🔍", -1)),
          Qa(u("input", {
            "onUpdate:modelValue": w[2] || (w[2] = (g) => n.value = g),
            type: "text",
            placeholder: "Search by name, course, or major...",
            class: "search-input"
          }, null, 512), [
            [Nc, n.value]
          ]),
          n.value ? (M(), D("button", {
            key: 0,
            class: "search-submit",
            onClick: w[3] || (w[3] = (g) => n.value = "")
          }, [...w[7] || (w[7] = [
            u("span", { class: "clear-icon" }, "✕", -1)
          ])])) : me("", !0)
        ])
      ]),
      u("div", cu, [
        u("div", fu, [
          (M(), D(ce, null, ft(i, (g) => u("button", {
            key: g.id,
            class: ge(["filter-tab", { active: r.value === g.id }]),
            onClick: (_) => r.value = g.id
          }, [
            u("span", du, j(g.icon), 1),
            u("span", pu, j(g.name), 1),
            g.count ? (M(), D("span", hu, j(g.count), 1)) : me("", !0)
          ], 10, uu)), 64))
        ])
      ]),
      u("div", mu, [
        xe(uc, {
          name: "fade",
          mode: "out-in"
        }, {
          default: Zo(() => [
            f.value.length > 0 ? (M(), D("div", {
              key: 0,
              class: ge(["results-grid", { "results-list": s.value === "list" }])
            }, [
              s.value === "grid" ? (M(!0), D(ce, { key: 0 }, ft(f.value, (g, _) => (M(), Dn(Di, {
                key: _,
                profile: g.profile,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: c
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (M(!0), D(ce, { key: 1 }, ft(f.value, (g, _) => (M(), Dn(Ii, {
                profile: g.profile,
                key: g.profile.username.substring(0, 2) + _,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: c
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (M(), D("div", gu, [
              w[9] || (w[9] = u("div", { class: "empty-illustration" }, "🔍", -1)),
              w[10] || (w[10] = u("h3", { class: "empty-title" }, "No matches found", -1)),
              w[11] || (w[11] = u("p", { class: "empty-message" }, " Try adjusting your filters or search criteria ", -1)),
              u("button", {
                class: "empty-reset",
                onClick: p
              }, " Clear all filters ")
            ]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}, vu = /* @__PURE__ */ ys(bu, [["styles", [nu]], ["__scopeId", "data-v-f575c718"]]);
function Li(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: yu } = Object.prototype, { getPrototypeOf: fr } = Object, { iterator: rn, toStringTag: Ui } = Symbol, on = /* @__PURE__ */ ((e) => (t) => {
  const s = yu.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ke = (e) => (e = e.toLowerCase(), (t) => on(t) === e), an = (e) => (t) => typeof t === e, { isArray: Vt } = Array, zt = an("undefined");
function _s(e) {
  return e !== null && !zt(e) && e.constructor !== null && !zt(e.constructor) && Pe(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Bi = Ke("ArrayBuffer");
function _u(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Bi(e.buffer), t;
}
const xu = an("string"), Pe = an("function"), Hi = an("number"), xs = (e) => e !== null && typeof e == "object", wu = (e) => e === !0 || e === !1, Fs = (e) => {
  if (on(e) !== "object")
    return !1;
  const t = fr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ui in e) && !(rn in e);
}, Su = (e) => {
  if (!xs(e) || _s(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Cu = Ke("Date"), Eu = Ke("File"), Tu = Ke("Blob"), Au = Ke("FileList"), Ru = (e) => xs(e) && Pe(e.pipe), Ou = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Pe(e.append) && ((t = on(e)) === "formdata" || // detect form-data instance
  t === "object" && Pe(e.toString) && e.toString() === "[object FormData]"));
}, ku = Ke("URLSearchParams"), [$u, Pu, Nu, ju] = ["ReadableStream", "Request", "Response", "Headers"].map(Ke), Fu = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ws(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, r;
  if (typeof e != "object" && (e = [e]), Vt(e))
    for (n = 0, r = e.length; n < r; n++)
      t.call(null, e[n], n, e);
  else {
    if (_s(e))
      return;
    const o = s ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (n = 0; n < i; n++)
      a = o[n], t.call(null, e[a], a, e);
  }
}
function zi(e, t) {
  if (_s(e))
    return null;
  t = t.toLowerCase();
  const s = Object.keys(e);
  let n = s.length, r;
  for (; n-- > 0; )
    if (r = s[n], t === r.toLowerCase())
      return r;
  return null;
}
const Tt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Vi = (e) => !zt(e) && e !== Tt;
function Un() {
  const { caseless: e, skipUndefined: t } = Vi(this) && this || {}, s = {}, n = (r, o) => {
    const i = e && zi(s, o) || o;
    Fs(s[i]) && Fs(r) ? s[i] = Un(s[i], r) : Fs(r) ? s[i] = Un({}, r) : Vt(r) ? s[i] = r.slice() : (!t || !zt(r)) && (s[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && ws(arguments[r], n);
  return s;
}
const Mu = (e, t, s, { allOwnKeys: n } = {}) => (ws(t, (r, o) => {
  s && Pe(r) ? e[o] = Li(r, s) : e[o] = r;
}, { allOwnKeys: n }), e), Du = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Iu = (e, t, s, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, Lu = (e, t, s, n) => {
  let r, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!n || n(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = s !== !1 && fr(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, Uu = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const n = e.indexOf(t, s);
  return n !== -1 && n === s;
}, Bu = (e) => {
  if (!e) return null;
  if (Vt(e)) return e;
  let t = e.length;
  if (!Hi(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, Hu = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && fr(Uint8Array)), zu = (e, t) => {
  const n = (e && e[rn]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, Vu = (e, t) => {
  let s;
  const n = [];
  for (; (s = e.exec(t)) !== null; )
    n.push(s);
  return n;
}, qu = Ke("HTMLFormElement"), Ku = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(s, n, r) {
    return n.toUpperCase() + r;
  }
), oo = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), Wu = Ke("RegExp"), qi = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), n = {};
  ws(s, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (n[o] = i || r);
  }), Object.defineProperties(e, n);
}, Ju = (e) => {
  qi(e, (t, s) => {
    if (Pe(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = e[s];
    if (Pe(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Gu = (e, t) => {
  const s = {}, n = (r) => {
    r.forEach((o) => {
      s[o] = !0;
    });
  };
  return Vt(e) ? n(e) : n(String(e).split(t)), s;
}, Yu = () => {
}, Xu = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Qu(e) {
  return !!(e && Pe(e.append) && e[Ui] === "FormData" && e[rn]);
}
const Zu = (e) => {
  const t = new Array(10), s = (n, r) => {
    if (xs(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (_s(n))
        return n;
      if (!("toJSON" in n)) {
        t[r] = n;
        const o = Vt(n) ? [] : {};
        return ws(n, (i, a) => {
          const l = s(i, r + 1);
          !zt(l) && (o[a] = l);
        }), t[r] = void 0, o;
      }
    }
    return n;
  };
  return s(e, 0);
}, ed = Ke("AsyncFunction"), td = (e) => e && (xs(e) || Pe(e)) && Pe(e.then) && Pe(e.catch), Ki = ((e, t) => e ? setImmediate : t ? ((s, n) => (Tt.addEventListener("message", ({ source: r, data: o }) => {
  r === Tt && o === s && n.length && n.shift()();
}, !1), (r) => {
  n.push(r), Tt.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(
  typeof setImmediate == "function",
  Pe(Tt.postMessage)
), sd = typeof queueMicrotask < "u" ? queueMicrotask.bind(Tt) : typeof process < "u" && process.nextTick || Ki, nd = (e) => e != null && Pe(e[rn]), b = {
  isArray: Vt,
  isArrayBuffer: Bi,
  isBuffer: _s,
  isFormData: Ou,
  isArrayBufferView: _u,
  isString: xu,
  isNumber: Hi,
  isBoolean: wu,
  isObject: xs,
  isPlainObject: Fs,
  isEmptyObject: Su,
  isReadableStream: $u,
  isRequest: Pu,
  isResponse: Nu,
  isHeaders: ju,
  isUndefined: zt,
  isDate: Cu,
  isFile: Eu,
  isBlob: Tu,
  isRegExp: Wu,
  isFunction: Pe,
  isStream: Ru,
  isURLSearchParams: ku,
  isTypedArray: Hu,
  isFileList: Au,
  forEach: ws,
  merge: Un,
  extend: Mu,
  trim: Fu,
  stripBOM: Du,
  inherits: Iu,
  toFlatObject: Lu,
  kindOf: on,
  kindOfTest: Ke,
  endsWith: Uu,
  toArray: Bu,
  forEachEntry: zu,
  matchAll: Vu,
  isHTMLForm: qu,
  hasOwnProperty: oo,
  hasOwnProp: oo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: qi,
  freezeMethods: Ju,
  toObjectSet: Gu,
  toCamelCase: Ku,
  noop: Yu,
  toFiniteNumber: Xu,
  findKey: zi,
  global: Tt,
  isContextDefined: Vi,
  isSpecCompliantForm: Qu,
  toJSONObject: Zu,
  isAsyncFn: ed,
  isThenable: td,
  setImmediate: Ki,
  asap: sd,
  isIterable: nd
};
function q(e, t, s, n, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), s && (this.config = s), n && (this.request = n), r && (this.response = r, this.status = r.status ? r.status : null);
}
b.inherits(q, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: b.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Wi = q.prototype, Ji = {};
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
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ji[e] = { value: e };
});
Object.defineProperties(q, Ji);
Object.defineProperty(Wi, "isAxiosError", { value: !0 });
q.from = (e, t, s, n, r, o) => {
  const i = Object.create(Wi);
  b.toFlatObject(e, i, function(c) {
    return c !== Error.prototype;
  }, (f) => f !== "isAxiosError");
  const a = e && e.message ? e.message : "Error", l = t == null && e ? e.code : t;
  return q.call(i, a, l, s, n, r), e && i.cause == null && Object.defineProperty(i, "cause", { value: e, configurable: !0 }), i.name = e && e.name || "Error", o && Object.assign(i, o), i;
};
const rd = null;
function Bn(e) {
  return b.isPlainObject(e) || b.isArray(e);
}
function Gi(e) {
  return b.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function io(e, t, s) {
  return e ? e.concat(t).map(function(r, o) {
    return r = Gi(r), !s && o ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function od(e) {
  return b.isArray(e) && !e.some(Bn);
}
const id = b.toFlatObject(b, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ln(e, t, s) {
  if (!b.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = b.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(_, h) {
    return !b.isUndefined(h[_]);
  });
  const n = s.metaTokens, r = s.visitor || c, o = s.dots, i = s.indexes, l = (s.Blob || typeof Blob < "u" && Blob) && b.isSpecCompliantForm(t);
  if (!b.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (b.isDate(g))
      return g.toISOString();
    if (b.isBoolean(g))
      return g.toString();
    if (!l && b.isBlob(g))
      throw new q("Blob is not supported. Use a Buffer instead.");
    return b.isArrayBuffer(g) || b.isTypedArray(g) ? l && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function c(g, _, h) {
    let v = g;
    if (g && !h && typeof g == "object") {
      if (b.endsWith(_, "{}"))
        _ = n ? _ : _.slice(0, -2), g = JSON.stringify(g);
      else if (b.isArray(g) && od(g) || (b.isFileList(g) || b.endsWith(_, "[]")) && (v = b.toArray(g)))
        return _ = Gi(_), v.forEach(function(F, $) {
          !(b.isUndefined(F) || F === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? io([_], $, o) : i === null ? _ : _ + "[]",
            f(F)
          );
        }), !1;
    }
    return Bn(g) ? !0 : (t.append(io(h, _, o), f(g)), !1);
  }
  const p = [], y = Object.assign(id, {
    defaultVisitor: c,
    convertValue: f,
    isVisitable: Bn
  });
  function w(g, _) {
    if (!b.isUndefined(g)) {
      if (p.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + _.join("."));
      p.push(g), b.forEach(g, function(v, A) {
        (!(b.isUndefined(v) || v === null) && r.call(
          t,
          v,
          b.isString(A) ? A.trim() : A,
          _,
          y
        )) === !0 && w(v, _ ? _.concat(A) : [A]);
      }), p.pop();
    }
  }
  if (!b.isObject(e))
    throw new TypeError("data must be an object");
  return w(e), t;
}
function ao(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function ur(e, t) {
  this._pairs = [], e && ln(e, this, t);
}
const Yi = ur.prototype;
Yi.append = function(t, s) {
  this._pairs.push([t, s]);
};
Yi.toString = function(t) {
  const s = t ? function(n) {
    return t.call(this, n, ao);
  } : ao;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function ad(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Xi(e, t, s) {
  if (!t)
    return e;
  const n = s && s.encode || ad;
  b.isFunction(s) && (s = {
    serialize: s
  });
  const r = s && s.serialize;
  let o;
  if (r ? o = r(t, s) : o = b.isURLSearchParams(t) ? t.toString() : new ur(t, s).toString(n), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class lo {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, s, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: s,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    b.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Qi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ld = typeof URLSearchParams < "u" ? URLSearchParams : ur, cd = typeof FormData < "u" ? FormData : null, fd = typeof Blob < "u" ? Blob : null, ud = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ld,
    FormData: cd,
    Blob: fd
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, dr = typeof window < "u" && typeof document < "u", Hn = typeof navigator == "object" && navigator || void 0, dd = dr && (!Hn || ["ReactNative", "NativeScript", "NS"].indexOf(Hn.product) < 0), pd = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", hd = dr && window.location.href || "http://localhost", md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: dr,
  hasStandardBrowserEnv: dd,
  hasStandardBrowserWebWorkerEnv: pd,
  navigator: Hn,
  origin: hd
}, Symbol.toStringTag, { value: "Module" })), _e = {
  ...md,
  ...ud
};
function gd(e, t) {
  return ln(e, new _e.classes.URLSearchParams(), {
    visitor: function(s, n, r, o) {
      return _e.isNode && b.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function bd(e) {
  return b.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function vd(e) {
  const t = {}, s = Object.keys(e);
  let n;
  const r = s.length;
  let o;
  for (n = 0; n < r; n++)
    o = s[n], t[o] = e[o];
  return t;
}
function Zi(e) {
  function t(s, n, r, o) {
    let i = s[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), l = o >= s.length;
    return i = !i && b.isArray(r) ? r.length : i, l ? (b.hasOwnProp(r, i) ? r[i] = [r[i], n] : r[i] = n, !a) : ((!r[i] || !b.isObject(r[i])) && (r[i] = []), t(s, n, r[i], o) && b.isArray(r[i]) && (r[i] = vd(r[i])), !a);
  }
  if (b.isFormData(e) && b.isFunction(e.entries)) {
    const s = {};
    return b.forEachEntry(e, (n, r) => {
      t(bd(n), r, s, 0);
    }), s;
  }
  return null;
}
function yd(e, t, s) {
  if (b.isString(e))
    try {
      return (t || JSON.parse)(e), b.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(e);
}
const Ss = {
  transitional: Qi,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, s) {
    const n = s.getContentType() || "", r = n.indexOf("application/json") > -1, o = b.isObject(t);
    if (o && b.isHTMLForm(t) && (t = new FormData(t)), b.isFormData(t))
      return r ? JSON.stringify(Zi(t)) : t;
    if (b.isArrayBuffer(t) || b.isBuffer(t) || b.isStream(t) || b.isFile(t) || b.isBlob(t) || b.isReadableStream(t))
      return t;
    if (b.isArrayBufferView(t))
      return t.buffer;
    if (b.isURLSearchParams(t))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return gd(t, this.formSerializer).toString();
      if ((a = b.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return ln(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || r ? (s.setContentType("application/json", !1), yd(t)) : t;
  }],
  transformResponse: [function(t) {
    const s = this.transitional || Ss.transitional, n = s && s.forcedJSONParsing, r = this.responseType === "json";
    if (b.isResponse(t) || b.isReadableStream(t))
      return t;
    if (t && b.isString(t) && (n && !this.responseType || r)) {
      const i = !(s && s.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? q.from(a, q.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _e.classes.FormData,
    Blob: _e.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
b.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ss.headers[e] = {};
});
const _d = b.toObjectSet([
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
  "user-agent"
]), xd = (e) => {
  const t = {};
  let s, n, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), s = i.substring(0, r).trim().toLowerCase(), n = i.substring(r + 1).trim(), !(!s || t[s] && _d[s]) && (s === "set-cookie" ? t[s] ? t[s].push(n) : t[s] = [n] : t[s] = t[s] ? t[s] + ", " + n : n);
  }), t;
}, co = /* @__PURE__ */ Symbol("internals");
function Qt(e) {
  return e && String(e).trim().toLowerCase();
}
function Ms(e) {
  return e === !1 || e == null ? e : b.isArray(e) ? e.map(Ms) : String(e);
}
function wd(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Sd = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Sn(e, t, s, n, r) {
  if (b.isFunction(n))
    return n.call(this, t, s);
  if (r && (t = s), !!b.isString(t)) {
    if (b.isString(n))
      return t.indexOf(n) !== -1;
    if (b.isRegExp(n))
      return n.test(t);
  }
}
function Cd(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, n) => s.toUpperCase() + n);
}
function Ed(e, t) {
  const s = b.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + s, {
      value: function(r, o, i) {
        return this[n].call(this, t, r, o, i);
      },
      configurable: !0
    });
  });
}
let Ne = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, s, n) {
    const r = this;
    function o(a, l, f) {
      const c = Qt(l);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const p = b.findKey(r, c);
      (!p || r[p] === void 0 || f === !0 || f === void 0 && r[p] !== !1) && (r[p || l] = Ms(a));
    }
    const i = (a, l) => b.forEach(a, (f, c) => o(f, c, l));
    if (b.isPlainObject(t) || t instanceof this.constructor)
      i(t, s);
    else if (b.isString(t) && (t = t.trim()) && !Sd(t))
      i(xd(t), s);
    else if (b.isObject(t) && b.isIterable(t)) {
      let a = {}, l, f;
      for (const c of t) {
        if (!b.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        a[f = c[0]] = (l = a[f]) ? b.isArray(l) ? [...l, c[1]] : [l, c[1]] : c[1];
      }
      i(a, s);
    } else
      t != null && o(s, t, n);
    return this;
  }
  get(t, s) {
    if (t = Qt(t), t) {
      const n = b.findKey(this, t);
      if (n) {
        const r = this[n];
        if (!s)
          return r;
        if (s === !0)
          return wd(r);
        if (b.isFunction(s))
          return s.call(this, r, n);
        if (b.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = Qt(t), t) {
      const n = b.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!s || Sn(this, this[n], n, s)));
    }
    return !1;
  }
  delete(t, s) {
    const n = this;
    let r = !1;
    function o(i) {
      if (i = Qt(i), i) {
        const a = b.findKey(n, i);
        a && (!s || Sn(n, n[a], a, s)) && (delete n[a], r = !0);
      }
    }
    return b.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const s = Object.keys(this);
    let n = s.length, r = !1;
    for (; n--; ) {
      const o = s[n];
      (!t || Sn(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const s = this, n = {};
    return b.forEach(this, (r, o) => {
      const i = b.findKey(n, o);
      if (i) {
        s[i] = Ms(r), delete s[o];
        return;
      }
      const a = t ? Cd(o) : String(o).trim();
      a !== o && delete s[o], s[a] = Ms(r), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const s = /* @__PURE__ */ Object.create(null);
    return b.forEach(this, (n, r) => {
      n != null && n !== !1 && (s[r] = t && b.isArray(n) ? n.join(", ") : n);
    }), s;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, s]) => t + ": " + s).join(`
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
  static concat(t, ...s) {
    const n = new this(t);
    return s.forEach((r) => n.set(r)), n;
  }
  static accessor(t) {
    const n = (this[co] = this[co] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const a = Qt(i);
      n[a] || (Ed(r, i), n[a] = !0);
    }
    return b.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ne.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
b.reduceDescriptors(Ne.prototype, ({ value: e }, t) => {
  let s = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[s] = n;
    }
  };
});
b.freezeMethods(Ne);
function Cn(e, t) {
  const s = this || Ss, n = t || s, r = Ne.from(n.headers);
  let o = n.data;
  return b.forEach(e, function(a) {
    o = a.call(s, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function ea(e) {
  return !!(e && e.__CANCEL__);
}
function qt(e, t, s) {
  q.call(this, e ?? "canceled", q.ERR_CANCELED, t, s), this.name = "CanceledError";
}
b.inherits(qt, q, {
  __CANCEL__: !0
});
function ta(e, t, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? e(s) : t(new q(
    "Request failed with status code " + s.status,
    [q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
function Td(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ad(e, t) {
  e = e || 10;
  const s = new Array(e), n = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const f = Date.now(), c = n[o];
    i || (i = f), s[r] = l, n[r] = f;
    let p = o, y = 0;
    for (; p !== r; )
      y += s[p++], p = p % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), f - i < t)
      return;
    const w = c && f - c;
    return w ? Math.round(y * 1e3 / w) : void 0;
  };
}
function Rd(e, t) {
  let s = 0, n = 1e3 / t, r, o;
  const i = (f, c = Date.now()) => {
    s = c, r = null, o && (clearTimeout(o), o = null), e(...f);
  };
  return [(...f) => {
    const c = Date.now(), p = c - s;
    p >= n ? i(f, c) : (r = f, o || (o = setTimeout(() => {
      o = null, i(r);
    }, n - p)));
  }, () => r && i(r)];
}
const Ks = (e, t, s = 3) => {
  let n = 0;
  const r = Ad(50, 250);
  return Rd((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, l = i - n, f = r(l), c = i <= a;
    n = i;
    const p = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: l,
      rate: f || void 0,
      estimated: f && a && c ? (a - i) / f : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, s);
}, fo = (e, t) => {
  const s = e != null;
  return [(n) => t[0]({
    lengthComputable: s,
    total: e,
    loaded: n
  }), t[1]];
}, uo = (e) => (...t) => b.asap(() => e(...t)), Od = _e.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, _e.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(_e.origin),
  _e.navigator && /(msie|trident)/i.test(_e.navigator.userAgent)
) : () => !0, kd = _e.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, n, r, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      b.isNumber(s) && a.push(`expires=${new Date(s).toUTCString()}`), b.isString(n) && a.push(`path=${n}`), b.isString(r) && a.push(`domain=${r}`), o === !0 && a.push("secure"), b.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function $d(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Pd(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function sa(e, t, s) {
  let n = !$d(t);
  return e && (n || s == !1) ? Pd(e, t) : t;
}
const po = (e) => e instanceof Ne ? { ...e } : e;
function $t(e, t) {
  t = t || {};
  const s = {};
  function n(f, c, p, y) {
    return b.isPlainObject(f) && b.isPlainObject(c) ? b.merge.call({ caseless: y }, f, c) : b.isPlainObject(c) ? b.merge({}, c) : b.isArray(c) ? c.slice() : c;
  }
  function r(f, c, p, y) {
    if (b.isUndefined(c)) {
      if (!b.isUndefined(f))
        return n(void 0, f, p, y);
    } else return n(f, c, p, y);
  }
  function o(f, c) {
    if (!b.isUndefined(c))
      return n(void 0, c);
  }
  function i(f, c) {
    if (b.isUndefined(c)) {
      if (!b.isUndefined(f))
        return n(void 0, f);
    } else return n(void 0, c);
  }
  function a(f, c, p) {
    if (p in t)
      return n(f, c);
    if (p in e)
      return n(void 0, f);
  }
  const l = {
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
    validateStatus: a,
    headers: (f, c, p) => r(po(f), po(c), p, !0)
  };
  return b.forEach(Object.keys({ ...e, ...t }), function(c) {
    const p = l[c] || r, y = p(e[c], t[c], c);
    b.isUndefined(y) && p !== a || (s[c] = y);
  }), s;
}
const na = (e) => {
  const t = $t({}, e);
  let { data: s, withXSRFToken: n, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = Ne.from(i), t.url = Xi(sa(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  ), b.isFormData(s)) {
    if (_e.hasStandardBrowserEnv || _e.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (b.isFunction(s.getHeaders)) {
      const l = s.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(l).forEach(([c, p]) => {
        f.includes(c.toLowerCase()) && i.set(c, p);
      });
    }
  }
  if (_e.hasStandardBrowserEnv && (n && b.isFunction(n) && (n = n(t)), n || n !== !1 && Od(t.url))) {
    const l = r && o && kd.read(o);
    l && i.set(r, l);
  }
  return t;
}, Nd = typeof XMLHttpRequest < "u", jd = Nd && function(e) {
  return new Promise(function(s, n) {
    const r = na(e);
    let o = r.data;
    const i = Ne.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: f } = r, c, p, y, w, g;
    function _() {
      w && w(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let h = new XMLHttpRequest();
    h.open(r.method.toUpperCase(), r.url, !0), h.timeout = r.timeout;
    function v() {
      if (!h)
        return;
      const F = Ne.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), V = {
        data: !a || a === "text" || a === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: F,
        config: e,
        request: h
      };
      ta(function(te) {
        s(te), _();
      }, function(te) {
        n(te), _();
      }, V), h = null;
    }
    "onloadend" in h ? h.onloadend = v : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, h.onabort = function() {
      h && (n(new q("Request aborted", q.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function($) {
      const V = $ && $.message ? $.message : "Network Error", re = new q(V, q.ERR_NETWORK, e, h);
      re.event = $ || null, n(re), h = null;
    }, h.ontimeout = function() {
      let $ = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const V = r.transitional || Qi;
      r.timeoutErrorMessage && ($ = r.timeoutErrorMessage), n(new q(
        $,
        V.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
        e,
        h
      )), h = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in h && b.forEach(i.toJSON(), function($, V) {
      h.setRequestHeader(V, $);
    }), b.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials), a && a !== "json" && (h.responseType = r.responseType), f && ([y, g] = Ks(f, !0), h.addEventListener("progress", y)), l && h.upload && ([p, w] = Ks(l), h.upload.addEventListener("progress", p), h.upload.addEventListener("loadend", w)), (r.cancelToken || r.signal) && (c = (F) => {
      h && (n(!F || F.type ? new qt(null, e, h) : F), h.abort(), h = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const A = Td(r.url);
    if (A && _e.protocols.indexOf(A) === -1) {
      n(new q("Unsupported protocol " + A + ":", q.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(o || null);
  });
}, Fd = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let n = new AbortController(), r;
    const o = function(f) {
      if (!r) {
        r = !0, a();
        const c = f instanceof Error ? f : this.reason;
        n.abort(c instanceof q ? c : new qt(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new q(`timeout ${t} of ms exceeded`, q.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(o) : f.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", o));
    const { signal: l } = n;
    return l.unsubscribe = () => b.asap(a), l;
  }
}, Md = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let n = 0, r;
  for (; n < s; )
    r = n + t, yield e.slice(n, r), n = r;
}, Dd = async function* (e, t) {
  for await (const s of Id(e))
    yield* Md(s, t);
}, Id = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: s, value: n } = await t.read();
      if (s)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, ho = (e, t, s, n) => {
  const r = Dd(e, t);
  let o = 0, i, a = (l) => {
    i || (i = !0, n && n(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: f, value: c } = await r.next();
        if (f) {
          a(), l.close();
          return;
        }
        let p = c.byteLength;
        if (s) {
          let y = o += p;
          s(y);
        }
        l.enqueue(new Uint8Array(c));
      } catch (f) {
        throw a(f), f;
      }
    },
    cancel(l) {
      return a(l), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, mo = 64 * 1024, { isFunction: Os } = b, Ld = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(b.global), {
  ReadableStream: go,
  TextEncoder: bo
} = b.global, vo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Ud = (e) => {
  e = b.merge.call({
    skipUndefined: !0
  }, Ld, e);
  const { fetch: t, Request: s, Response: n } = e, r = t ? Os(t) : typeof fetch == "function", o = Os(s), i = Os(n);
  if (!r)
    return !1;
  const a = r && Os(go), l = r && (typeof bo == "function" ? /* @__PURE__ */ ((g) => (_) => g.encode(_))(new bo()) : async (g) => new Uint8Array(await new s(g).arrayBuffer())), f = o && a && vo(() => {
    let g = !1;
    const _ = new s(_e.origin, {
      body: new go(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !_;
  }), c = i && a && vo(() => b.isReadableStream(new n("").body)), p = {
    stream: c && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !p[g] && (p[g] = (_, h) => {
      let v = _ && _[g];
      if (v)
        return v.call(_);
      throw new q(`Response type '${g}' is not supported`, q.ERR_NOT_SUPPORT, h);
    });
  });
  const y = async (g) => {
    if (g == null)
      return 0;
    if (b.isBlob(g))
      return g.size;
    if (b.isSpecCompliantForm(g))
      return (await new s(_e.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (b.isArrayBufferView(g) || b.isArrayBuffer(g))
      return g.byteLength;
    if (b.isURLSearchParams(g) && (g = g + ""), b.isString(g))
      return (await l(g)).byteLength;
  }, w = async (g, _) => {
    const h = b.toFiniteNumber(g.getContentLength());
    return h ?? y(_);
  };
  return async (g) => {
    let {
      url: _,
      method: h,
      data: v,
      signal: A,
      cancelToken: F,
      timeout: $,
      onDownloadProgress: V,
      onUploadProgress: re,
      responseType: te,
      headers: he,
      withCredentials: H = "same-origin",
      fetchOptions: J
    } = na(g), oe = t || fetch;
    te = te ? (te + "").toLowerCase() : "text";
    let N = Fd([A, F && F.toAbortSignal()], $), X = null;
    const fe = N && N.unsubscribe && (() => {
      N.unsubscribe();
    });
    let Me;
    try {
      if (re && f && h !== "get" && h !== "head" && (Me = await w(he, v)) !== 0) {
        let ve = new s(_, {
          method: "POST",
          body: v,
          duplex: "half"
        }), be;
        if (b.isFormData(v) && (be = ve.headers.get("content-type")) && he.setContentType(be), ve.body) {
          const [Nt, jt] = fo(
            Me,
            Ks(uo(re))
          );
          v = ho(ve.body, mo, Nt, jt);
        }
      }
      b.isString(H) || (H = H ? "include" : "omit");
      const Z = o && "credentials" in s.prototype, ie = {
        ...J,
        signal: N,
        method: h.toUpperCase(),
        headers: he.normalize().toJSON(),
        body: v,
        duplex: "half",
        credentials: Z ? H : void 0
      };
      X = o && new s(_, ie);
      let K = await (o ? oe(X, J) : oe(_, ie));
      const We = c && (te === "stream" || te === "response");
      if (c && (V || We && fe)) {
        const ve = {};
        ["status", "statusText", "headers"].forEach((Cs) => {
          ve[Cs] = K[Cs];
        });
        const be = b.toFiniteNumber(K.headers.get("content-length")), [Nt, jt] = V && fo(
          be,
          Ks(uo(V), !0)
        ) || [];
        K = new n(
          ho(K.body, mo, Nt, () => {
            jt && jt(), fe && fe();
          }),
          ve
        );
      }
      te = te || "text";
      let Pt = await p[b.findKey(p, te) || "text"](K, g);
      return !We && fe && fe(), await new Promise((ve, be) => {
        ta(ve, be, {
          data: Pt,
          headers: Ne.from(K.headers),
          status: K.status,
          statusText: K.statusText,
          config: g,
          request: X
        });
      });
    } catch (Z) {
      throw fe && fe(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new q("Network Error", q.ERR_NETWORK, g, X),
        {
          cause: Z.cause || Z
        }
      ) : q.from(Z, Z && Z.code, g, X);
    }
  };
}, Bd = /* @__PURE__ */ new Map(), ra = (e) => {
  let t = e && e.env || {};
  const { fetch: s, Request: n, Response: r } = t, o = [
    n,
    r,
    s
  ];
  let i = o.length, a = i, l, f, c = Bd;
  for (; a--; )
    l = o[a], f = c.get(l), f === void 0 && c.set(l, f = a ? /* @__PURE__ */ new Map() : Ud(t)), c = f;
  return f;
};
ra();
const pr = {
  http: rd,
  xhr: jd,
  fetch: {
    get: ra
  }
};
b.forEach(pr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const yo = (e) => `- ${e}`, Hd = (e) => b.isFunction(e) || e === null || e === !1;
function zd(e, t) {
  e = b.isArray(e) ? e : [e];
  const { length: s } = e;
  let n, r;
  const o = {};
  for (let i = 0; i < s; i++) {
    n = e[i];
    let a;
    if (r = n, !Hd(n) && (r = pr[(a = String(n)).toLowerCase()], r === void 0))
      throw new q(`Unknown adapter '${a}'`);
    if (r && (b.isFunction(r) || (r = r.get(t))))
      break;
    o[a || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([l, f]) => `adapter ${l} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = s ? i.length > 1 ? `since :
` + i.map(yo).join(`
`) : " " + yo(i[0]) : "as no adapter specified";
    throw new q(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const oa = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: zd,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: pr
};
function En(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new qt(null, e);
}
function _o(e) {
  return En(e), e.headers = Ne.from(e.headers), e.data = Cn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), oa.getAdapter(e.adapter || Ss.adapter, e)(e).then(function(n) {
    return En(e), n.data = Cn.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Ne.from(n.headers), n;
  }, function(n) {
    return ea(n) || (En(e), n && n.response && (n.response.data = Cn.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Ne.from(n.response.headers))), Promise.reject(n);
  });
}
const ia = "1.13.2", cn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  cn[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const xo = {};
cn.transitional = function(t, s, n) {
  function r(o, i) {
    return "[Axios v" + ia + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new q(
        r(i, " has been removed" + (s ? " in " + s : "")),
        q.ERR_DEPRECATED
      );
    return s && !xo[i] && (xo[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
cn.spelling = function(t) {
  return (s, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Vd(e, t, s) {
  if (typeof e != "object")
    throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let r = n.length;
  for (; r-- > 0; ) {
    const o = n[r], i = t[o];
    if (i) {
      const a = e[o], l = a === void 0 || i(a, o, e);
      if (l !== !0)
        throw new q("option " + o + " must be " + l, q.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new q("Unknown option " + o, q.ERR_BAD_OPTION);
  }
}
const Ds = {
  assertOptions: Vd,
  validators: cn
}, Qe = Ds.validators;
let kt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new lo(),
      response: new lo()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, s) {
    try {
      return await this._request(t, s);
    } catch (n) {
      if (n instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, s) {
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = $t(this.defaults, s);
    const { transitional: n, paramsSerializer: r, headers: o } = s;
    n !== void 0 && Ds.assertOptions(n, {
      silentJSONParsing: Qe.transitional(Qe.boolean),
      forcedJSONParsing: Qe.transitional(Qe.boolean),
      clarifyTimeoutError: Qe.transitional(Qe.boolean)
    }, !1), r != null && (b.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : Ds.assertOptions(r, {
      encode: Qe.function,
      serialize: Qe.function
    }, !0)), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), Ds.assertOptions(s, {
      baseUrl: Qe.spelling("baseURL"),
      withXsrfToken: Qe.spelling("withXSRFToken")
    }, !0), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let i = o && b.merge(
      o.common,
      o[s.method]
    );
    o && b.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete o[g];
      }
    ), s.headers = Ne.concat(i, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(_) {
      typeof _.runWhen == "function" && _.runWhen(s) === !1 || (l = l && _.synchronous, a.unshift(_.fulfilled, _.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(_) {
      f.push(_.fulfilled, _.rejected);
    });
    let c, p = 0, y;
    if (!l) {
      const g = [_o.bind(this), void 0];
      for (g.unshift(...a), g.push(...f), y = g.length, c = Promise.resolve(s); p < y; )
        c = c.then(g[p++], g[p++]);
      return c;
    }
    y = a.length;
    let w = s;
    for (; p < y; ) {
      const g = a[p++], _ = a[p++];
      try {
        w = g(w);
      } catch (h) {
        _.call(this, h);
        break;
      }
    }
    try {
      c = _o.call(this, w);
    } catch (g) {
      return Promise.reject(g);
    }
    for (p = 0, y = f.length; p < y; )
      c = c.then(f[p++], f[p++]);
    return c;
  }
  getUri(t) {
    t = $t(this.defaults, t);
    const s = sa(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Xi(s, t.params, t.paramsSerializer);
  }
};
b.forEach(["delete", "get", "head", "options"], function(t) {
  kt.prototype[t] = function(s, n) {
    return this.request($t(n || {}, {
      method: t,
      url: s,
      data: (n || {}).data
    }));
  };
});
b.forEach(["post", "put", "patch"], function(t) {
  function s(n) {
    return function(o, i, a) {
      return this.request($t(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  kt.prototype[t] = s(), kt.prototype[t + "Form"] = s(!0);
});
let qd = class aa {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function(o) {
      s = o;
    });
    const n = this;
    this.promise.then((r) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](r);
      n._listeners = null;
    }), this.promise.then = (r) => {
      let o;
      const i = new Promise((a) => {
        n.subscribe(a), o = a;
      }).then(r);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, t(function(o, i, a) {
      n.reason || (n.reason = new qt(o, i, a), s(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const s = this._listeners.indexOf(t);
    s !== -1 && this._listeners.splice(s, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), s = (n) => {
      t.abort(n);
    };
    return this.subscribe(s), t.signal.unsubscribe = () => this.unsubscribe(s), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new aa(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Kd(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function Wd(e) {
  return b.isObject(e) && e.isAxiosError === !0;
}
const zn = {
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
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(zn).forEach(([e, t]) => {
  zn[t] = e;
});
function la(e) {
  const t = new kt(e), s = Li(kt.prototype.request, t);
  return b.extend(s, kt.prototype, t, { allOwnKeys: !0 }), b.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return la($t(e, r));
  }, s;
}
const se = la(Ss);
se.Axios = kt;
se.CanceledError = qt;
se.CancelToken = qd;
se.isCancel = ea;
se.VERSION = ia;
se.toFormData = ln;
se.AxiosError = q;
se.Cancel = se.CanceledError;
se.all = function(t) {
  return Promise.all(t);
};
se.spread = Kd;
se.isAxiosError = Wd;
se.mergeConfig = $t;
se.AxiosHeaders = Ne;
se.formToJSON = (e) => Zi(b.isHTMLForm(e) ? new FormData(e) : e);
se.getAdapter = oa.getAdapter;
se.HttpStatusCode = zn;
se.default = se;
const {
  Axios: Oh,
  AxiosError: kh,
  CanceledError: $h,
  isCancel: Ph,
  CancelToken: Nh,
  VERSION: jh,
  all: Fh,
  Cancel: Mh,
  isAxiosError: Dh,
  spread: Ih,
  toFormData: Lh,
  AxiosHeaders: Uh,
  HttpStatusCode: Bh,
  formToJSON: Hh,
  getAdapter: zh,
  mergeConfig: Vh
} = se, Jd = ".btn-approve[data-v-3d0c8d0a]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-3d0c8d0a]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-3d0c8d0a]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-3d0c8d0a]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-3d0c8d0a]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-3d0c8d0a]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-3d0c8d0a]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-3d0c8d0a]{display:flex;align-items:center;gap:14px}.avatar[data-v-3d0c8d0a]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-3d0c8d0a]{display:flex;flex-direction:column}.group-name[data-v-3d0c8d0a]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-3d0c8d0a]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-3d0c8d0a]{display:flex;gap:10px}.btn-action[data-v-3d0c8d0a]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-3d0c8d0a]{width:14px;height:14px}.btn-view[data-v-3d0c8d0a]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-3d0c8d0a]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-3d0c8d0a]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-3d0c8d0a]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-3d0c8d0a]:hover{background-color:#f43f5e;color:#fff}", Gd = { class: "surface" }, Yd = { class: "surface-header" }, Xd = { class: "surface-title" }, Qd = { class: "badge" }, Zd = { class: "request-list" }, ep = ["id"], tp = { class: "group-info" }, sp = { class: "avatar" }, np = { class: "text-content" }, rp = { class: "group-name" }, op = { class: "creator-tag" }, ip = { class: "action-group" }, ap = ["onClick"], lp = ["onClick"], cp = ["onClick"], fp = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    se.defaults.xsrfCookieName = "csrftoken", se.defaults.xsrfHeaderName = "X-CSRFToken";
    const s = t, n = /* @__PURE__ */ Be(null), r = (a) => {
      n.value = a, s("show_details", a.id);
    }, o = async (a) => {
      try {
        await se.post(`/api/group/${a}/approve`), s("action_taken");
      } catch (l) {
        console.error(l);
      }
    }, i = async (a) => {
      try {
        await se.post(`/api/group/${a}/deny`), s("action_taken");
      } catch (l) {
        console.error(l);
      }
    };
    return (a, l) => (M(), D("section", Gd, [
      u("div", Yd, [
        u("div", Xd, [
          l[0] || (l[0] = Ce(" Inbound Requests ", -1)),
          u("span", Qd, j(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      u("div", Zd, [
        (M(!0), D(ce, null, ft(e.groups, (f) => (M(), D("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          u("div", tp, [
            u("div", sp, j(f.name.charAt(0).toUpperCase()), 1),
            u("div", np, [
              u("span", rp, j(f.name), 1),
              u("span", op, "by @" + j(f.creator), 1)
            ])
          ]),
          u("div", ip, [
            u("button", {
              class: "btn-action btn-view",
              onClick: (c) => r(f)
            }, [...l[1] || (l[1] = [
              u("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                u("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "3"
                })
              ], -1)
            ])], 8, ap),
            u("button", {
              class: "btn-action btn-approve",
              onClick: (c) => o(f.id)
            }, [...l[2] || (l[2] = [
              u("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                u("polyline", { points: "20 6 9 17 4 12" })
              ], -1)
            ])], 8, lp),
            u("button", {
              class: "btn-action btn-deny",
              onClick: (c) => i(f.id)
            }, [...l[3] || (l[3] = [
              u("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                u("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18"
                }),
                u("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18"
                })
              ], -1)
            ])], 8, cp)
          ])
        ], 8, ep))), 128))
      ])
    ]));
  }
}, up = /* @__PURE__ */ ys(fp, [["styles", [Jd]], ["__scopeId", "data-v-3d0c8d0a"]]), dp = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', pp = { class: "viewport" }, hp = { class: "header" }, mp = {
  key: 0,
  class: "status-badge"
}, gp = { class: "stats" }, bp = { class: "card" }, vp = { class: "value" }, yp = { class: "card" }, _p = {
  class: "value",
  style: { color: "var(--primary)" }
}, xp = { class: "card" }, wp = { class: "value" }, Sp = { class: "workspace" }, Cp = ["groups"], Ep = { class: "surface pulse-container" }, Tp = { class: "feed-timeline" }, Ap = ["onClick"], Rp = { key: 0 }, Op = { key: 1 }, kp = { key: 2 }, $p = { key: 3 }, Pp = { key: 4 }, Np = { class: "feed-body" }, jp = { class: "feed-text" }, Fp = { class: "highlight" }, Mp = { class: "highlight" }, Dp = { class: "highlight" }, Ip = { class: "highlight" }, Lp = { class: "highlight" }, Up = { class: "highlight" }, Bp = { class: "highlight" }, Hp = { class: "feed-time" }, zp = {
  key: 0,
  class: "empty-state"
}, Vp = { class: "modal-card" }, qp = { class: "modal-header" }, Kp = { class: "header-top" }, Wp = { class: "badge-group" }, Jp = { class: "badge major" }, Gp = { class: "modal-body" }, Yp = { class: "title-row" }, Xp = { class: "group-title" }, Qp = {
  key: 0,
  class: "description-box"
}, Zp = { class: "description-text" }, eh = { class: "info-grid" }, th = { class: "info-item" }, sh = { class: "item-content" }, nh = { class: "item-value" }, rh = { class: "info-item" }, oh = { class: "item-content" }, ih = { class: "item-value" }, ah = { class: "info-item" }, lh = { class: "item-content" }, ch = { class: "info-item" }, fh = { class: "item-content" }, uh = { class: "info-item" }, dh = { class: "item-content" }, ph = { class: "item-value" }, hh = { class: "info-item" }, mh = { class: "item-content" }, gh = { class: "item-value" }, bh = { class: "meta-row" }, vh = { class: "modal-footer" }, yh = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ Be(null), s = /* @__PURE__ */ Be(!1), n = /* @__PURE__ */ Be([]), r = /* @__PURE__ */ Be({}), o = /* @__PURE__ */ Be([]), i = /* @__PURE__ */ Be(!0), a = /* @__PURE__ */ Be(null), l = async () => {
      console.log("called again");
      try {
        const _ = await se.get("/api/admin/dashboard-data");
        n.value = _.data.pendingGroups || [], r.value = _.data.stats || {}, o.value = _.data.activities || [];
      } catch (_) {
        console.error("API Error:", _);
      } finally {
        i.value = !1;
      }
    }, f = (_) => {
      if (_.type === "create" && _.group.id) {
        const h = `group-${_.group.id}`, v = a.value.querySelector("inbound-request");
        if (v && v.shadowRoot) {
          const A = v.shadowRoot.getElementById(h);
          A && (A.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), A.style.outline = "2px solid var(--primary)", A.style.borderRadius = "20px", setTimeout(() => {
            A.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, c = async (_) => {
      const h = _.detail ? _.detail[0] : _;
      if (!h || typeof h == "object") {
        console.error("Invalid ID received:", h);
        return;
      }
      try {
        const v = await se.get(`/api/group/${h}`);
        t.value = v.data, s.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, p = (_, h) => {
      const v = ($) => {
        if (!$) return null;
        const V = $.match(/(\d{2}:\d{2}):\d{2}/);
        return V ? V[1] : $;
      }, A = v(_), F = v(h);
      return !A && !F ? "Time TBD" : A ? F ? `${A} — ${F}` : `${A} - End TBD` : `Starts at ${F || "TBD"}`;
    }, y = (_, h) => {
      h === "approve" ? w(_) : g(_);
    }, w = async (_) => {
      try {
        await se.post(`/api/group/${_}/approve`), s.value = !1, l();
      } catch (h) {
        console.error(h);
      }
    }, g = async (_) => {
      try {
        await se.post(`/api/group/${_}/deny`), s.value = !1, l();
      } catch (h) {
        console.error(h);
      }
    };
    return or(l), (_, h) => (M(), D("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: a
    }, [
      h[31] || (h[31] = Jl('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      u("main", pp, [
        u("header", hp, [
          h[5] || (h[5] = u("h1", null, "Command Center", -1)),
          i.value ? me("", !0) : (M(), D("div", mp, [...h[4] || (h[4] = [
            u("div", { class: "dot-live" }, null, -1),
            Ce(" OPERATIONAL ", -1)
          ])]))
        ]),
        u("section", gp, [
          u("div", bp, [
            h[6] || (h[6] = u("span", { class: "label" }, "Total Groups", -1)),
            u("span", vp, j(r.value.groups || 0), 1)
          ]),
          u("div", yp, [
            h[7] || (h[7] = u("span", { class: "label" }, "Pending", -1)),
            u("span", _p, j(r.value.pending || 0), 1)
          ]),
          u("div", xp, [
            h[8] || (h[8] = u("span", { class: "label" }, "Total Students", -1)),
            u("span", wp, j(r.value.students || 0), 1)
          ])
        ]),
        u("div", Sp, [
          u("inbound-request", {
            groups: n.value,
            onAction_taken: l,
            onShow_details: c
          }, null, 40, Cp),
          u("section", Ep, [
            h[14] || (h[14] = u("div", { class: "surface-header" }, [
              u("div", { class: "surface-title" }, [
                Ce(" Notifications "),
                u("div", { class: "live-indicator" }, [
                  u("span", { class: "dot" })
                ])
              ])
            ], -1)),
            u("div", Tp, [
              (M(!0), D(ce, null, ft(o.value, (v) => (M(), D("div", {
                key: v.id,
                class: "feed-item",
                onClick: (A) => f(v)
              }, [
                u("div", {
                  class: ge([
                    "feed-icon-wrapper",
                    `bg-${v.type || "default"}`
                  ])
                }, [
                  v.type === "register" ? (M(), D("span", Rp, "👋")) : v.type === "create" ? (M(), D("span", Op, "👤")) : v.type === "approve" ? (M(), D("span", kp, " 👍")) : v.type === "deny" ? (M(), D("span", $p, "🚫")) : (M(), D("span", Pp, "🔔"))
                ], 2),
                u("div", Np, [
                  u("div", jp, [
                    v.type === "register" ? (M(), D(ce, { key: 0 }, [
                      u("span", Fp, j(v.sender), 1),
                      h[9] || (h[9] = Ce(" joined our community ", -1))
                    ], 64)) : v.type === "create" ? (M(), D(ce, { key: 1 }, [
                      u("span", Mp, j(v.sender), 1),
                      h[10] || (h[10] = Ce(" wants to start ", -1)),
                      u("span", Dp, j(v.group.name), 1)
                    ], 64)) : v.type === "approve" ? (M(), D(ce, { key: 2 }, [
                      u("span", Ip, j(v.sender), 1),
                      h[11] || (h[11] = Ce(" approved the group ", -1)),
                      u("span", Lp, j(v.group.name), 1)
                    ], 64)) : v.type === "deny" ? (M(), D(ce, { key: 3 }, [
                      u("span", Up, j(v.sender), 1),
                      h[12] || (h[12] = Ce(" denied the group ", -1)),
                      u("span", Bp, j(v.group.name), 1)
                    ], 64)) : (M(), D(ce, { key: 4 }, [
                      Ce(j(v.message || "Update"), 1)
                    ], 64))
                  ]),
                  u("span", Hp, j(v.time_ago), 1)
                ])
              ], 8, Ap))), 128)),
              !o.value?.length && !i.value ? (M(), D("div", zp, [...h[13] || (h[13] = [
                u("p", null, "📭 No recent pulses.", -1)
              ])])) : me("", !0)
            ])
          ]),
          s.value && t.value ? (M(), D("div", {
            key: 0,
            class: "modal-overlay",
            onClick: h[3] || (h[3] = Mc((v) => s.value = !1, ["self"]))
          }, [
            u("div", Vp, [
              u("div", qp, [
                u("div", Kp, [
                  u("div", Wp, [
                    u("span", Jp, j(t.value.major || "Undeclared"), 1),
                    u("span", {
                      class: ge(["badge", t.value.group_type])
                    }, j(t.value.group_type === "general" ? "General" : "Project"), 3),
                    u("span", {
                      class: ge(["badge status", t.value.status.toLowerCase()])
                    }, j(t.value.status), 3)
                  ]),
                  u("button", {
                    class: "close-btn",
                    onClick: h[0] || (h[0] = (v) => s.value = !1)
                  }, "✕")
                ])
              ]),
              u("div", Gp, [
                u("div", Yp, [
                  u("h3", Xp, j(t.value.name), 1),
                  u("span", {
                    class: ge(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    h[15] || (h[15] = u("span", { class: "tag-emoji" }, "📖", -1)),
                    u("span", null, j(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? (M(), D("div", Qp, [
                  u("p", Zp, " “" + j(t.value.description) + "” ", 1)
                ])) : me("", !0),
                u("div", eh, [
                  u("div", th, [
                    h[17] || (h[17] = u("span", { class: "item-emoji" }, "📅", -1)),
                    u("div", sh, [
                      h[16] || (h[16] = u("span", { class: "item-label" }, "Day", -1)),
                      u("span", nh, j(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  u("div", rh, [
                    h[19] || (h[19] = u("span", { class: "item-emoji" }, "⏰", -1)),
                    u("div", oh, [
                      h[18] || (h[18] = u("span", { class: "item-label" }, "Time", -1)),
                      u("span", ih, j(p(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  u("div", ah, [
                    h[21] || (h[21] = u("span", { class: "item-emoji" }, "🎯", -1)),
                    u("div", lh, [
                      h[20] || (h[20] = u("span", { class: "item-label" }, "Interest", -1)),
                      u("span", {
                        class: ge(["item-value", { "is-null": !t.value.interest }])
                      }, j(t.value.interest || "None"), 3)
                    ])
                  ]),
                  u("div", ch, [
                    h[23] || (h[23] = u("span", { class: "item-emoji" }, "📚", -1)),
                    u("div", fh, [
                      h[22] || (h[22] = u("span", { class: "item-label" }, "Semester", -1)),
                      u("span", {
                        class: ge(["item-value", { "is-null": !t.value.semester }])
                      }, j(t.value.semester || "—"), 3)
                    ])
                  ]),
                  u("div", uh, [
                    h[25] || (h[25] = u("span", { class: "item-emoji" }, "👥", -1)),
                    u("div", dh, [
                      h[24] || (h[24] = u("span", { class: "item-label" }, "Members", -1)),
                      u("span", ph, j(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  u("div", hh, [
                    h[27] || (h[27] = u("span", { class: "item-emoji" }, "👤", -1)),
                    u("div", mh, [
                      h[26] || (h[26] = u("span", { class: "item-label" }, "Creator", -1)),
                      u("span", gh, "ID: " + j(t.value.creator), 1)
                    ])
                  ])
                ]),
                u("div", bh, [
                  u("span", {
                    class: ge(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    h[28] || (h[28] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  u("span", {
                    class: ge(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    h[29] || (h[29] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  u("span", {
                    class: ge(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    h[30] || (h[30] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              u("div", vh, [
                u("button", {
                  onClick: h[1] || (h[1] = (v) => y(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                u("button", {
                  onClick: h[2] || (h[2] = (v) => y(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : me("", !0)
        ])
      ])
    ], 512));
  }
}, _h = /* @__PURE__ */ ys(yh, [["styles", [dp]]]), xh = /* @__PURE__ */ vs(Di), wh = /* @__PURE__ */ vs(vu), Sh = /* @__PURE__ */ vs(Ii), Ch = /* @__PURE__ */ vs(up), Eh = /* @__PURE__ */ vs(_h);
customElements.define("gallery-card", xh);
customElements.define("find-partner-view", wh);
customElements.define("gallery-card-compact", Sh);
customElements.define("inbound-request", Ch);
customElements.define("admin-dashboard", Eh);
