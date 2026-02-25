// @__NO_SIDE_EFFECTS__
function Vn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const ne = {}, It = [], st = () => {
}, So = () => !1, Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), qn = (e) => e.startsWith("onUpdate:"), ue = Object.assign, Kn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, la = Object.prototype.hasOwnProperty, X = (e, t) => la.call(e, t), L = Array.isArray, Lt = (e) => hs(e) === "[object Map]", Co = (e) => hs(e) === "[object Set]", yr = (e) => hs(e) === "[object Date]", V = (e) => typeof e == "function", de = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", Z = (e) => e !== null && typeof e == "object", Eo = (e) => (Z(e) || V(e)) && V(e.then) && V(e.catch), To = Object.prototype.toString, hs = (e) => To.call(e), ca = (e) => hs(e).slice(8, -1), Js = (e) => hs(e) === "[object Object]", Wn = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Zt = /* @__PURE__ */ Vn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Gs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, fa = /-\w/g, ze = Gs(
  (e) => e.replace(fa, (t) => t.slice(1).toUpperCase())
), ua = /\B([A-Z])/g, Le = Gs(
  (e) => e.replace(ua, "-$1").toLowerCase()
), Ro = Gs((e) => e.charAt(0).toUpperCase() + e.slice(1)), un = Gs(
  (e) => e ? `on${Ro(e)}` : ""
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
let _r;
const Ys = () => _r || (_r = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Rt(e) {
  if (L(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = de(n) ? ma(n) : Rt(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (de(e) || Z(e))
    return e;
}
const da = /;(?![^(]*\))/g, pa = /:([^]+)/, ha = /\/\*[^]*?\*\//g;
function ma(e) {
  const t = {};
  return e.replace(ha, "").split(da).forEach((s) => {
    if (s) {
      const n = s.split(pa);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function me(e) {
  let t = "";
  if (de(e))
    t = e;
  else if (L(e))
    for (let s = 0; s < e.length; s++) {
      const n = me(e[s]);
      n && (t += n + " ");
    }
  else if (Z(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const ga = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ba = /* @__PURE__ */ Vn(ga);
function Oo(e) {
  return !!e || e === "";
}
function va(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = Gn(e[n], t[n]);
  return s;
}
function Gn(e, t) {
  if (e === t) return !0;
  let s = yr(e), n = yr(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = nt(e), n = nt(t), s || n)
    return e === t;
  if (s = L(e), n = L(t), s || n)
    return s && n ? va(e, t) : !1;
  if (s = Z(e), n = Z(t), s || n) {
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
const ko = (e) => !!(e && e.__v_isRef === !0), j = (e) => de(e) ? e : e == null ? "" : L(e) || Z(e) && (e.toString === To || !V(e.toString)) ? ko(e) ? j(e.value) : JSON.stringify(e, Po, 2) : String(e), Po = (e, t) => ko(t) ? Po(e, t.value) : Lt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[dn(n, o) + " =>"] = r, s),
    {}
  )
} : Co(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => dn(s))
} : nt(t) ? dn(t) : Z(t) && !L(t) && !Js(t) ? String(t) : t, dn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let Pe;
class ya {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Pe, !t && Pe && (this.index = (Pe.scopes || (Pe.scopes = [])).push(
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
      const s = Pe;
      try {
        return Pe = this, t();
      } finally {
        Pe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Pe, Pe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Pe = this.prevScope, this.prevScope = void 0);
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
function _a() {
  return Pe;
}
let le;
const pn = /* @__PURE__ */ new WeakSet();
class $o {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pe && Pe.active && Pe.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || jo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, xr(this), Fo(this);
    const t = le, s = Ve;
    le = this, Ve = !0;
    try {
      return this.fn();
    } finally {
      Do(this), le = t, Ve = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qn(t);
      this.deps = this.depsTail = void 0, xr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? pn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Rn(this) && this.run();
  }
  get dirty() {
    return Rn(this);
  }
}
let No = 0, es, ts;
function jo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ts, ts = e;
    return;
  }
  e.next = es, es = e;
}
function Yn() {
  No++;
}
function Xn() {
  if (--No > 0)
    return;
  if (ts) {
    let t = ts;
    for (ts = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; es; ) {
    let t = es;
    for (es = void 0; t; ) {
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
function Fo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Do(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Qn(n), xa(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function Rn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Mo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Mo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === as) || (e.globalVersion = as, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Rn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = le, n = Ve;
  le = e, Ve = !0;
  try {
    Fo(e);
    const r = e.fn(e._value);
    (t.version === 0 || vt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    le = s, Ve = n, Do(e), e.flags &= -3;
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
function xa(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ve = !0;
const Io = [];
function ut() {
  Io.push(Ve), Ve = !1;
}
function dt() {
  const e = Io.pop();
  Ve = e === void 0 ? !0 : e;
}
function xr(e) {
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
let as = 0;
class wa {
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
    if (!le || !Ve || le === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== le)
      s = this.activeLink = new wa(le, this), le.deps ? (s.prevDep = le.depsTail, le.depsTail.nextDep = s, le.depsTail = s) : le.deps = le.depsTail = s, Lo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = le.depsTail, s.nextDep = void 0, le.depsTail.nextDep = s, le.depsTail = s, le.deps === s && (le.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, as++, this.notify(t);
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
function Lo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Lo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const An = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ Symbol(
  ""
), On = /* @__PURE__ */ Symbol(
  ""
), ls = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, s) {
  if (Ve && le) {
    let n = An.get(e);
    n || An.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new Zn()), r.map = n, r.key = s), r.track();
  }
}
function lt(e, t, s, n, r, o) {
  const i = An.get(e);
  if (!i) {
    as++;
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
      i.forEach((h, y) => {
        (y === "length" || y === ls || !nt(y) && y >= c) && a(h);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && a(i.get(s)), f && a(i.get(ls)), t) {
        case "add":
          l ? f && a(i.get("length")) : (a(i.get(At)), Lt(e) && a(i.get(On)));
          break;
        case "delete":
          l || (a(i.get(At)), Lt(e) && a(i.get(On)));
          break;
        case "set":
          Lt(e) && a(i.get(At));
          break;
      }
  }
  Xn();
}
function Ft(e) {
  const t = /* @__PURE__ */ Y(e);
  return t === e ? t : (ye(t, "iterate", ls), /* @__PURE__ */ Be(e) ? t : t.map(qe));
}
function Xs(e) {
  return ye(e = /* @__PURE__ */ Y(e), "iterate", ls), e;
}
function gt(e, t) {
  return /* @__PURE__ */ pt(e) ? Ht(/* @__PURE__ */ Ot(e) ? qe(t) : t) : qe(t);
}
const Sa = {
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
    return Jt(this, "pop");
  },
  push(...e) {
    return Jt(this, "push", e);
  },
  reduce(e, ...t) {
    return wr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wr(this, "reduceRight", e, t);
  },
  shift() {
    return Jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return rt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Jt(this, "splice", e);
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
    return Jt(this, "unshift", e);
  },
  values() {
    return hn(this, "values", (e) => gt(this, e));
  }
};
function hn(e, t, s) {
  const n = Xs(e), r = n[t]();
  return n !== e && !/* @__PURE__ */ Be(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const Ca = Array.prototype;
function rt(e, t, s, n, r, o) {
  const i = Xs(e), a = i !== e && !/* @__PURE__ */ Be(e), l = i[t];
  if (l !== Ca[t]) {
    const h = l.apply(e, o);
    return a ? qe(h) : h;
  }
  let f = s;
  i !== e && (a ? f = function(h, y) {
    return s.call(this, gt(e, h), y, e);
  } : s.length > 2 && (f = function(h, y) {
    return s.call(this, h, y, e);
  }));
  const c = l.call(i, f, n);
  return a && r ? r(c) : c;
}
function wr(e, t, s, n) {
  const r = Xs(e);
  let o = s;
  return r !== e && (/* @__PURE__ */ Be(e) ? s.length > 3 && (o = function(i, a, l) {
    return s.call(this, i, a, l, e);
  }) : o = function(i, a, l) {
    return s.call(this, i, gt(e, a), l, e);
  }), r[t](o, ...n);
}
function mn(e, t, s) {
  const n = /* @__PURE__ */ Y(e);
  ye(n, "iterate", ls);
  const r = n[t](...s);
  return (r === -1 || r === !1) && /* @__PURE__ */ nr(s[0]) ? (s[0] = /* @__PURE__ */ Y(s[0]), n[t](...s)) : r;
}
function Jt(e, t, s = []) {
  ut(), Yn();
  const n = (/* @__PURE__ */ Y(e))[t].apply(e, s);
  return Xn(), dt(), n;
}
const Ea = /* @__PURE__ */ Vn("__proto__,__v_isRef,__isVue"), Uo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function Ta(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ Y(this);
  return ye(t, "has", e), t.hasOwnProperty(e);
}
class Bo {
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
      return n === (r ? o ? Da : qo : o ? Vo : zo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = L(t);
    if (!r) {
      let l;
      if (i && (l = Sa[s]))
        return l;
      if (s === "hasOwnProperty")
        return Ta;
    }
    const a = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ we(t) ? t : n
    );
    if ((nt(s) ? Uo.has(s) : Ea(s)) || (r || ye(t, "get", s), o))
      return a;
    if (/* @__PURE__ */ we(a)) {
      const l = i && Wn(s) ? a : a.value;
      return r && Z(l) ? /* @__PURE__ */ Pn(l) : l;
    }
    return Z(a) ? r ? /* @__PURE__ */ Pn(a) : /* @__PURE__ */ tr(a) : a;
  }
}
class Ho extends Bo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    const i = L(t) && Wn(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ pt(o);
      if (!/* @__PURE__ */ Be(n) && !/* @__PURE__ */ pt(n) && (o = /* @__PURE__ */ Y(o), n = /* @__PURE__ */ Y(n)), !i && /* @__PURE__ */ we(o) && !/* @__PURE__ */ we(n))
        return f || (o.value = n), !0;
    }
    const a = i ? Number(s) < t.length : X(t, s), l = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ we(t) ? t : r
    );
    return t === /* @__PURE__ */ Y(r) && (a ? vt(n, o) && lt(t, "set", s, n) : lt(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = X(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && lt(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!nt(s) || !Uo.has(s)) && ye(t, "has", s), n;
  }
  ownKeys(t) {
    return ye(
      t,
      "iterate",
      L(t) ? "length" : At
    ), Reflect.ownKeys(t);
  }
}
class Ra extends Bo {
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
const Aa = /* @__PURE__ */ new Ho(), Oa = /* @__PURE__ */ new Ra(), ka = /* @__PURE__ */ new Ho(!0);
const kn = (e) => e, Ts = (e) => Reflect.getPrototypeOf(e);
function Pa(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = /* @__PURE__ */ Y(r), i = Lt(o), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, f = r[e](...n), c = s ? kn : t ? Ht : qe;
    return !t && ye(
      o,
      "iterate",
      l ? On : At
    ), ue(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: y } = f.next();
          return y ? { value: h, done: y } : {
            value: a ? [c(h[0]), c(h[1])] : c(h),
            done: y
          };
        }
      }
    );
  };
}
function Rs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function $a(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ Y(o), a = /* @__PURE__ */ Y(r);
      e || (vt(r, a) && ye(i, "get", r), ye(i, "get", a));
      const { has: l } = Ts(i), f = t ? kn : e ? Ht : qe;
      if (l.call(i, r))
        return f(o.get(r));
      if (l.call(i, a))
        return f(o.get(a));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ye(/* @__PURE__ */ Y(r), "iterate", At), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ Y(o), a = /* @__PURE__ */ Y(r);
      return e || (vt(r, a) && ye(i, "has", r), ye(i, "has", a)), r === a ? o.has(r) : o.has(r) || o.has(a);
    },
    forEach(r, o) {
      const i = this, a = i.__v_raw, l = /* @__PURE__ */ Y(a), f = t ? kn : e ? Ht : qe;
      return !e && ye(l, "iterate", At), a.forEach((c, h) => r.call(o, f(c), f(h), i));
    }
  };
  return ue(
    s,
    e ? {
      add: Rs("add"),
      set: Rs("set"),
      delete: Rs("delete"),
      clear: Rs("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Be(r) && !/* @__PURE__ */ pt(r) && (r = /* @__PURE__ */ Y(r));
        const o = /* @__PURE__ */ Y(this);
        return Ts(o).has.call(o, r) || (o.add(r), lt(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !/* @__PURE__ */ Be(o) && !/* @__PURE__ */ pt(o) && (o = /* @__PURE__ */ Y(o));
        const i = /* @__PURE__ */ Y(this), { has: a, get: l } = Ts(i);
        let f = a.call(i, r);
        f || (r = /* @__PURE__ */ Y(r), f = a.call(i, r));
        const c = l.call(i, r);
        return i.set(r, o), f ? vt(o, c) && lt(i, "set", r, o) : lt(i, "add", r, o), this;
      },
      delete(r) {
        const o = /* @__PURE__ */ Y(this), { has: i, get: a } = Ts(o);
        let l = i.call(o, r);
        l || (r = /* @__PURE__ */ Y(r), l = i.call(o, r)), a && a.call(o, r);
        const f = o.delete(r);
        return l && lt(o, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ Y(this), o = r.size !== 0, i = r.clear();
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
  const s = $a(e, t);
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    X(s, r) && r in n ? s : n,
    r,
    o
  );
}
const Na = {
  get: /* @__PURE__ */ er(!1, !1)
}, ja = {
  get: /* @__PURE__ */ er(!1, !0)
}, Fa = {
  get: /* @__PURE__ */ er(!0, !1)
};
const zo = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Da = /* @__PURE__ */ new WeakMap();
function Ma(e) {
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
function Ia(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ma(ca(e));
}
// @__NO_SIDE_EFFECTS__
function tr(e) {
  return /* @__PURE__ */ pt(e) ? e : sr(
    e,
    !1,
    Aa,
    Na,
    zo
  );
}
// @__NO_SIDE_EFFECTS__
function La(e) {
  return sr(
    e,
    !1,
    ka,
    ja,
    Vo
  );
}
// @__NO_SIDE_EFFECTS__
function Pn(e) {
  return sr(
    e,
    !0,
    Oa,
    Fa,
    qo
  );
}
function sr(e, t, s, n, r) {
  if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = Ia(e);
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
function Be(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function nr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Y(t) : e;
}
function Ua(e) {
  return !X(e, "__v_skip") && Object.isExtensible(e) && Ao(e, "__v_skip", !0), e;
}
const qe = (e) => Z(e) ? /* @__PURE__ */ tr(e) : e, Ht = (e) => Z(e) ? /* @__PURE__ */ Pn(e) : e;
// @__NO_SIDE_EFFECTS__
function we(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return Ba(e, !1);
}
function Ba(e, t) {
  return /* @__PURE__ */ we(e) ? e : new Ha(e, t);
}
class Ha {
  constructor(t, s) {
    this.dep = new Zn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Y(t), this._value = s ? t : qe(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Be(t) || /* @__PURE__ */ pt(t);
    t = n ? t : /* @__PURE__ */ Y(t), vt(t, s) && (this._rawValue = t, this._value = n ? t : qe(t), this.dep.trigger());
  }
}
function Ko(e) {
  return /* @__PURE__ */ we(e) ? e.value : e;
}
const za = {
  get: (e, t, s) => t === "__v_raw" ? e : Ko(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return /* @__PURE__ */ we(r) && !/* @__PURE__ */ we(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Wo(e) {
  return /* @__PURE__ */ Ot(e) ? e : new Proxy(e, za);
}
class Va {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Zn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = as - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return jo(this, !0), !0;
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
function qa(e, t, s = !1) {
  let n, r;
  return V(e) ? n = e : (n = e.get, r = e.set), new Va(n, r, s);
}
const As = {}, Is = /* @__PURE__ */ new WeakMap();
let Ct;
function Ka(e, t = !1, s = Ct) {
  if (s) {
    let n = Is.get(s);
    n || Is.set(s, n = []), n.push(e);
  }
}
function Wa(e, t, s = ne) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: a, call: l } = s, f = (P) => r ? P : /* @__PURE__ */ Be(P) || r === !1 || r === 0 ? ct(P, 1) : ct(P);
  let c, h, y, x, g = !1, b = !1;
  if (/* @__PURE__ */ we(e) ? (h = () => e.value, g = /* @__PURE__ */ Be(e)) : /* @__PURE__ */ Ot(e) ? (h = () => f(e), g = !0) : L(e) ? (b = !0, g = e.some((P) => /* @__PURE__ */ Ot(P) || /* @__PURE__ */ Be(P)), h = () => e.map((P) => {
    if (/* @__PURE__ */ we(P))
      return P.value;
    if (/* @__PURE__ */ Ot(P))
      return f(P);
    if (V(P))
      return l ? l(P, 2) : P();
  })) : V(e) ? t ? h = l ? () => l(e, 2) : e : h = () => {
    if (y) {
      ut();
      try {
        y();
      } finally {
        dt();
      }
    }
    const P = Ct;
    Ct = c;
    try {
      return l ? l(e, 3, [x]) : e(x);
    } finally {
      Ct = P;
    }
  } : h = st, t && r) {
    const P = h, q = r === !0 ? 1 / 0 : r;
    h = () => ct(P(), q);
  }
  const p = _a(), w = () => {
    c.stop(), p && p.active && Kn(p.effects, c);
  };
  if (o && t) {
    const P = t;
    t = (...q) => {
      P(...q), w();
    };
  }
  let O = b ? new Array(e.length).fill(As) : As;
  const M = (P) => {
    if (!(!(c.flags & 1) || !c.dirty && !P))
      if (t) {
        const q = c.run();
        if (r || g || (b ? q.some((re, te) => vt(re, O[te])) : vt(q, O))) {
          y && y();
          const re = Ct;
          Ct = c;
          try {
            const te = [
              q,
              // pass undefined as the old value when it's changed for the first time
              O === As ? void 0 : b && O[0] === As ? [] : O,
              x
            ];
            O = q, l ? l(t, 3, te) : (
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
  return a && a(M), c = new $o(h), c.scheduler = i ? () => i(M, !1) : M, x = (P) => Ka(P, !1, c), y = c.onStop = () => {
    const P = Is.get(c);
    if (P) {
      if (l)
        l(P, 4);
      else
        for (const q of P) q();
      Is.delete(c);
    }
  }, t ? n ? M(!0) : O = c.run() : i ? i(M.bind(null, !0), !0) : c.run(), w.pause = c.pause.bind(c), w.resume = c.resume.bind(c), w.stop = w, w;
}
function ct(e, t = 1 / 0, s) {
  if (t <= 0 || !Z(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ we(e))
    ct(e.value, t, s);
  else if (L(e))
    for (let n = 0; n < e.length; n++)
      ct(e[n], t, s);
  else if (Co(e) || Lt(e))
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
function ms(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    Qs(r, t, s);
  }
}
function Ke(e, t, s, n) {
  if (V(e)) {
    const r = ms(e, t, s, n);
    return r && Eo(r) && r.catch((o) => {
      Qs(o, t, s);
    }), r;
  }
  if (L(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Ke(e[o], t, s, n));
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
        for (let h = 0; h < c.length; h++)
          if (c[h](e, l, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (o) {
      ut(), ms(o, null, 10, [
        e,
        l,
        f
      ]), dt();
      return;
    }
  }
  Ja(e, s, r, n, i);
}
function Ja(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ee = [];
let Ze = -1;
const Ut = [];
let bt = null, Dt = 0;
const Jo = /* @__PURE__ */ Promise.resolve();
let Ls = null;
function Go(e) {
  const t = Ls || Jo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ga(e) {
  let t = Ze + 1, s = Ee.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = Ee[n], o = cs(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function rr(e) {
  if (!(e.flags & 1)) {
    const t = cs(e), s = Ee[Ee.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= cs(s) ? Ee.push(e) : Ee.splice(Ga(t), 0, e), e.flags |= 1, Yo();
  }
}
function Yo() {
  Ls || (Ls = Jo.then(Qo));
}
function Ya(e) {
  L(e) ? Ut.push(...e) : bt && e.id === -1 ? bt.splice(Dt + 1, 0, e) : e.flags & 1 || (Ut.push(e), e.flags |= 1), Yo();
}
function Sr(e, t, s = Ze + 1) {
  for (; s < Ee.length; s++) {
    const n = Ee[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Ee.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Xo(e) {
  if (Ut.length) {
    const t = [...new Set(Ut)].sort(
      (s, n) => cs(s) - cs(n)
    );
    if (Ut.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, Dt = 0; Dt < bt.length; Dt++) {
      const s = bt[Dt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    bt = null, Dt = 0;
  }
}
const cs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Qo(e) {
  try {
    for (Ze = 0; Ze < Ee.length; Ze++) {
      const t = Ee[Ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ms(
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
    Ze = -1, Ee.length = 0, Xo(), Ls = null, (Ee.length || Ut.length) && Qo();
  }
}
let Ue = null, Zo = null;
function Us(e) {
  const t = Ue;
  return Ue = e, Zo = e && e.type.__scopeId || null, t;
}
function ei(e, t = Ue, s) {
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
function Xa(e, t) {
  if (Ue === null)
    return e;
  const s = nn(Ue), n = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, a, l = ne] = t[r];
    o && (V(o) && (o = {
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
    l && (ut(), Ke(l, s, 8, [
      e.el,
      a,
      e,
      t
    ]), dt());
  }
}
function Qa(e, t) {
  if (Re) {
    let s = Re.provides;
    const n = Re.parent && Re.parent.provides;
    n === s && (s = Re.provides = Object.create(n)), s[e] = t;
  }
}
function ss(e, t, s = !1) {
  const n = $i();
  if (n || Bt) {
    let r = Bt ? Bt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && V(t) ? t.call(n && n.proxy) : t;
  }
}
const Za = /* @__PURE__ */ Symbol.for("v-scx"), el = () => ss(Za);
function Ps(e, t, s) {
  return ti(e, t, s);
}
function ti(e, t, s = ne) {
  const { immediate: n, deep: r, flush: o, once: i } = s, a = ue({}, s), l = t && n || !t && o !== "post";
  let f;
  if (ds) {
    if (o === "sync") {
      const x = el();
      f = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!l) {
      const x = () => {
      };
      return x.stop = st, x.resume = st, x.pause = st, x;
    }
  }
  const c = Re;
  a.call = (x, g, b) => Ke(x, c, g, b);
  let h = !1;
  o === "post" ? a.scheduler = (x) => {
    ke(x, c && c.suspense);
  } : o !== "sync" && (h = !0, a.scheduler = (x, g) => {
    g ? x() : rr(x);
  }), a.augmentJob = (x) => {
    t && (x.flags |= 4), h && (x.flags |= 2, c && (x.id = c.uid, x.i = c));
  };
  const y = Wa(e, t, a);
  return ds && (f ? f.push(y) : l && y()), y;
}
function tl(e, t, s) {
  const n = this.proxy, r = de(e) ? e.includes(".") ? si(n, e) : () => n[e] : e.bind(n, n);
  let o;
  V(t) ? o = t : (o = t.handler, s = t);
  const i = gs(this), a = ti(r, o.bind(n), s);
  return i(), a;
}
function si(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const sl = /* @__PURE__ */ Symbol("_vte"), ni = (e) => e.__isTeleport, et = /* @__PURE__ */ Symbol("_leaveCb"), Gt = /* @__PURE__ */ Symbol("_enterCb");
function nl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return or(() => {
    e.isMounted = !0;
  }), ui(() => {
    e.isUnmounting = !0;
  }), e;
}
const Me = [Function, Array], ri = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Me,
  onEnter: Me,
  onAfterEnter: Me,
  onEnterCancelled: Me,
  // leave
  onBeforeLeave: Me,
  onLeave: Me,
  onAfterLeave: Me,
  onLeaveCancelled: Me,
  // appear
  onBeforeAppear: Me,
  onAppear: Me,
  onAfterAppear: Me,
  onAppearCancelled: Me
}, oi = (e) => {
  const t = e.subTree;
  return t.component ? oi(t.component) : t;
}, rl = {
  name: "BaseTransition",
  props: ri,
  setup(e, { slots: t }) {
    const s = $i(), n = nl();
    return () => {
      const r = t.default && li(t.default(), !0);
      if (!r || !r.length)
        return;
      const o = ii(r), i = /* @__PURE__ */ Y(e), { mode: a } = i;
      if (n.isLeaving)
        return gn(o);
      const l = Cr(o);
      if (!l)
        return gn(o);
      let f = $n(
        l,
        i,
        n,
        s,
        // #11061, ensure enterHooks is fresh after clone
        (h) => f = h
      );
      l.type !== Te && fs(l, f);
      let c = s.subTree && Cr(s.subTree);
      if (c && c.type !== Te && !Et(c, l) && oi(s).type !== Te) {
        let h = $n(
          c,
          i,
          n,
          s
        );
        if (fs(c, h), a === "out-in" && l.type !== Te)
          return n.isLeaving = !0, h.afterLeave = () => {
            n.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, c = void 0;
          }, gn(o);
        a === "in-out" && l.type !== Te ? h.delayLeave = (y, x, g) => {
          const b = ai(
            n,
            c
          );
          b[String(c.key)] = c, y[et] = () => {
            x(), y[et] = void 0, delete f.delayedLeave, c = void 0;
          }, f.delayedLeave = () => {
            g(), delete f.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return o;
    };
  }
};
function ii(e) {
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
const ol = rl;
function ai(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(t.type, n)), n;
}
function $n(e, t, s, n, r) {
  const {
    appear: o,
    mode: i,
    persisted: a = !1,
    onBeforeEnter: l,
    onEnter: f,
    onAfterEnter: c,
    onEnterCancelled: h,
    onBeforeLeave: y,
    onLeave: x,
    onAfterLeave: g,
    onLeaveCancelled: b,
    onBeforeAppear: p,
    onAppear: w,
    onAfterAppear: O,
    onAppearCancelled: M
  } = t, P = String(e.key), q = ai(s, e), re = (z, G) => {
    z && Ke(
      z,
      n,
      9,
      G
    );
  }, te = (z, G) => {
    const oe = G[1];
    re(z, G), L(z) ? z.every((N) => N.length <= 1) && oe() : z.length <= 1 && oe();
  }, pe = {
    mode: i,
    persisted: a,
    beforeEnter(z) {
      let G = l;
      if (!s.isMounted)
        if (o)
          G = p || l;
        else
          return;
      z[et] && z[et](
        !0
        /* cancelled */
      );
      const oe = q[P];
      oe && Et(e, oe) && oe.el[et] && oe.el[et](), re(G, [z]);
    },
    enter(z) {
      let G = f, oe = c, N = h;
      if (!s.isMounted)
        if (o)
          G = w || f, oe = O || c, N = M || h;
        else
          return;
      let Q = !1;
      z[Gt] = (De) => {
        Q || (Q = !0, De ? re(N, [z]) : re(oe, [z]), pe.delayedLeave && pe.delayedLeave(), z[Gt] = void 0);
      };
      const fe = z[Gt].bind(null, !1);
      G ? te(G, [z, fe]) : fe();
    },
    leave(z, G) {
      const oe = String(e.key);
      if (z[Gt] && z[Gt](
        !0
        /* cancelled */
      ), s.isUnmounting)
        return G();
      re(y, [z]);
      let N = !1;
      z[et] = (fe) => {
        N || (N = !0, G(), fe ? re(b, [z]) : re(g, [z]), z[et] = void 0, q[oe] === e && delete q[oe]);
      };
      const Q = z[et].bind(null, !1);
      q[oe] = e, x ? te(x, [z, Q]) : Q();
    },
    clone(z) {
      const G = $n(
        z,
        t,
        s,
        n,
        r
      );
      return r && r(G), G;
    }
  };
  return pe;
}
function gn(e) {
  if (Zs(e))
    return e = yt(e), e.children = null, e;
}
function Cr(e) {
  if (!Zs(e))
    return ni(e.type) && e.children ? ii(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && V(s.default))
      return s.default();
  }
}
function fs(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, fs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function li(e, t = !1, s) {
  let n = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = s == null ? i.key : String(s) + String(i.key != null ? i.key : o);
    i.type === ce ? (i.patchFlag & 128 && r++, n = n.concat(
      li(i.children, t, a)
    )) : (t || i.type !== Te) && n.push(a != null ? yt(i, { key: a }) : i);
  }
  if (r > 1)
    for (let o = 0; o < n.length; o++)
      n[o].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function il(e, t) {
  return V(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ue({ name: e.name }, t, { setup: e })
  ) : e;
}
function ci(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Er(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Bs = /* @__PURE__ */ new WeakMap();
function ns(e, t, s, n, r = !1) {
  if (L(e)) {
    e.forEach(
      (b, p) => ns(
        b,
        t && (L(t) ? t[p] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (rs(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && ns(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? nn(n.component) : n.el, i = r ? null : o, { i: a, r: l } = e, f = t && t.r, c = a.refs === ne ? a.refs = {} : a.refs, h = a.setupState, y = /* @__PURE__ */ Y(h), x = h === ne ? So : (b) => Er(c, b) ? !1 : X(y, b), g = (b, p) => !(p && Er(c, p));
  if (f != null && f !== l) {
    if (Tr(t), de(f))
      c[f] = null, x(f) && (h[f] = null);
    else if (/* @__PURE__ */ we(f)) {
      const b = t;
      g(f, b.k) && (f.value = null), b.k && (c[b.k] = null);
    }
  }
  if (V(l))
    ms(l, a, 12, [i, c]);
  else {
    const b = de(l), p = /* @__PURE__ */ we(l);
    if (b || p) {
      const w = () => {
        if (e.f) {
          const O = b ? x(l) ? h[l] : c[l] : g() || !e.k ? l.value : c[e.k];
          if (r)
            L(O) && Kn(O, o);
          else if (L(O))
            O.includes(o) || O.push(o);
          else if (b)
            c[l] = [o], x(l) && (h[l] = c[l]);
          else {
            const M = [o];
            g(l, e.k) && (l.value = M), e.k && (c[e.k] = M);
          }
        } else b ? (c[l] = i, x(l) && (h[l] = i)) : p && (g(l, e.k) && (l.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const O = () => {
          w(), Bs.delete(e);
        };
        O.id = -1, Bs.set(e, O), ke(O, s);
      } else
        Tr(e), w();
    }
  }
}
function Tr(e) {
  const t = Bs.get(e);
  t && (t.flags |= 8, Bs.delete(e));
}
Ys().requestIdleCallback;
Ys().cancelIdleCallback;
const rs = (e) => !!e.type.__asyncLoader, Zs = (e) => e.type.__isKeepAlive;
function al(e, t) {
  fi(e, "a", t);
}
function ll(e, t) {
  fi(e, "da", t);
}
function fi(e, t, s = Re) {
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
      Zs(r.parent.vnode) && cl(n, t, s, r), r = r.parent;
  }
}
function cl(e, t, s, n) {
  const r = en(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  di(() => {
    Kn(n[t], r);
  }, s);
}
function en(e, t, s = Re, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      ut();
      const a = gs(s), l = Ke(t, s, e, i);
      return a(), dt(), l;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const ht = (e) => (t, s = Re) => {
  (!ds || e === "sp") && en(e, (...n) => t(...n), s);
}, fl = ht("bm"), or = ht("m"), ul = ht(
  "bu"
), dl = ht("u"), ui = ht(
  "bum"
), di = ht("um"), pl = ht(
  "sp"
), hl = ht("rtg"), ml = ht("rtc");
function gl(e, t = Re) {
  en("ec", e, t);
}
const bl = /* @__PURE__ */ Symbol.for("v-ndc");
function ft(e, t, s, n) {
  let r;
  const o = s, i = L(e);
  if (i || de(e)) {
    const a = i && /* @__PURE__ */ Ot(e);
    let l = !1, f = !1;
    a && (l = !/* @__PURE__ */ Be(e), f = /* @__PURE__ */ pt(e), e = Xs(e)), r = new Array(e.length);
    for (let c = 0, h = e.length; c < h; c++)
      r[c] = t(
        l ? f ? Ht(qe(e[c])) : qe(e[c]) : e[c],
        c,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, o);
  } else if (Z(e))
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
const Nn = (e) => e ? Ni(e) ? nn(e) : Nn(e.parent) : null, os = (
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
    $options: (e) => hi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      rr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Go.bind(e.proxy)),
    $watch: (e) => tl.bind(e)
  })
), bn = (e, t) => e !== ne && !e.__isScriptSetup && X(e, t), vl = {
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
        if (r !== ne && X(r, t))
          return i[t] = 2, r[t];
        if (X(o, t))
          return i[t] = 3, o[t];
        if (s !== ne && X(s, t))
          return i[t] = 4, s[t];
        jn && (i[t] = 0);
      }
    }
    const f = os[t];
    let c, h;
    if (f)
      return t === "$attrs" && ye(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (c = a.__cssModules) && (c = c[t])
    )
      return c;
    if (s !== ne && X(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      h = l.config.globalProperties, X(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return bn(r, t) ? (r[t] = s, !0) : n !== ne && X(n, t) ? (n[t] = s, !0) : X(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, props: o, type: i }
  }, a) {
    let l;
    return !!(s[a] || e !== ne && a[0] !== "$" && X(e, a) || bn(t, a) || X(o, a) || X(n, a) || X(os, a) || X(r.config.globalProperties, a) || (l = i.__cssModules) && l[a]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : X(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Rr(e) {
  return L(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let jn = !0;
function yl(e) {
  const t = hi(e), s = e.proxy, n = e.ctx;
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
    beforeMount: h,
    mounted: y,
    beforeUpdate: x,
    updated: g,
    activated: b,
    deactivated: p,
    beforeDestroy: w,
    beforeUnmount: O,
    destroyed: M,
    unmounted: P,
    render: q,
    renderTracked: re,
    renderTriggered: te,
    errorCaptured: pe,
    serverPrefetch: z,
    // public API
    expose: G,
    inheritAttrs: oe,
    // assets
    components: N,
    directives: Q,
    filters: fe
  } = t;
  if (f && _l(f, n, null), i)
    for (const ie in i) {
      const K = i[ie];
      V(K) && (n[ie] = K.bind(s));
    }
  if (r) {
    const ie = r.call(s, s);
    Z(ie) && (e.data = /* @__PURE__ */ tr(ie));
  }
  if (jn = !0, o)
    for (const ie in o) {
      const K = o[ie], Je = V(K) ? K.bind(s, s) : V(K.get) ? K.get.bind(s, s) : st, $t = !V(K) && V(K.set) ? K.set.bind(s) : st, ve = ge({
        get: Je,
        set: $t
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
      pi(a[ie], n, s, ie);
  if (l) {
    const ie = V(l) ? l.call(s) : l;
    Reflect.ownKeys(ie).forEach((K) => {
      Qa(K, ie[K]);
    });
  }
  c && Ar(c, e, "c");
  function J(ie, K) {
    L(K) ? K.forEach((Je) => ie(Je.bind(s))) : K && ie(K.bind(s));
  }
  if (J(fl, h), J(or, y), J(ul, x), J(dl, g), J(al, b), J(ll, p), J(gl, pe), J(ml, re), J(hl, te), J(ui, O), J(di, P), J(pl, z), L(G))
    if (G.length) {
      const ie = e.exposed || (e.exposed = {});
      G.forEach((K) => {
        Object.defineProperty(ie, K, {
          get: () => s[K],
          set: (Je) => s[K] = Je,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  q && e.render === st && (e.render = q), oe != null && (e.inheritAttrs = oe), N && (e.components = N), Q && (e.directives = Q), z && ci(e);
}
function _l(e, t, s = st) {
  L(e) && (e = Fn(e));
  for (const n in e) {
    const r = e[n];
    let o;
    Z(r) ? "default" in r ? o = ss(
      r.from || n,
      r.default,
      !0
    ) : o = ss(r.from || n) : o = ss(r), /* @__PURE__ */ we(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function Ar(e, t, s) {
  Ke(
    L(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function pi(e, t, s, n) {
  let r = n.includes(".") ? si(s, n) : () => s[n];
  if (de(e)) {
    const o = t[e];
    V(o) && Ps(r, o);
  } else if (V(e))
    Ps(r, e.bind(s));
  else if (Z(e))
    if (L(e))
      e.forEach((o) => pi(o, t, s, n));
    else {
      const o = V(e.handler) ? e.handler.bind(s) : t[e.handler];
      V(o) && Ps(r, o, e);
    }
}
function hi(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let l;
  return a ? l = a : !r.length && !s && !n ? l = t : (l = {}, r.length && r.forEach(
    (f) => Hs(l, f, i, !0)
  ), Hs(l, t, i)), Z(t) && o.set(t, l), l;
}
function Hs(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && Hs(e, o, s, !0), r && r.forEach(
    (i) => Hs(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const a = xl[i] || s && s[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const xl = {
  data: Or,
  props: kr,
  emits: kr,
  // objects
  methods: Qt,
  computed: Qt,
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
  components: Qt,
  directives: Qt,
  // watch
  watch: Sl,
  // provide / inject
  provide: Or,
  inject: wl
};
function Or(e, t) {
  return t ? e ? function() {
    return ue(
      V(e) ? e.call(this, this) : e,
      V(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wl(e, t) {
  return Qt(Fn(e), Fn(t));
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
function Qt(e, t) {
  return e ? ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function kr(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ue(
    /* @__PURE__ */ Object.create(null),
    Rr(e),
    Rr(t ?? {})
  ) : t;
}
function Sl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ue(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Se(e[n], t[n]);
  return s;
}
function mi() {
  return {
    app: null,
    config: {
      isNativeTag: So,
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
let Cl = 0;
function El(e, t) {
  return function(n, r = null) {
    V(n) || (n = ue({}, n)), r != null && !Z(r) && (r = null);
    const o = mi(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const f = o.app = {
      _uid: Cl++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: rc,
      get config() {
        return o.config;
      },
      set config(c) {
      },
      use(c, ...h) {
        return i.has(c) || (c && V(c.install) ? (i.add(c), c.install(f, ...h)) : V(c) && (i.add(c), c(f, ...h))), f;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), f;
      },
      component(c, h) {
        return h ? (o.components[c] = h, f) : o.components[c];
      },
      directive(c, h) {
        return h ? (o.directives[c] = h, f) : o.directives[c];
      },
      mount(c, h, y) {
        if (!l) {
          const x = f._ceVNode || xe(n, r);
          return x.appContext = o, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(x, c, y), l = !0, f._container = c, c.__vue_app__ = f, nn(x.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (Ke(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, h) {
        return o.provides[c] = h, f;
      },
      runWithContext(c) {
        const h = Bt;
        Bt = f;
        try {
          return c();
        } finally {
          Bt = h;
        }
      }
    };
    return f;
  };
}
let Bt = null;
const Tl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ze(t)}Modifiers`] || e[`${Le(t)}Modifiers`];
function Rl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ne;
  let r = s;
  const o = t.startsWith("update:"), i = o && Tl(n, t.slice(7));
  i && (i.trim && (r = s.map((c) => de(c) ? c.trim() : c)), i.number && (r = s.map(Jn)));
  let a, l = n[a = un(t)] || // also try camelCase event handler (#2249)
  n[a = un(ze(t))];
  !l && o && (l = n[a = un(Le(t))]), l && Ke(
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
    e.emitted[a] = !0, Ke(
      f,
      e,
      6,
      r
    );
  }
}
const Al = /* @__PURE__ */ new WeakMap();
function gi(e, t, s = !1) {
  const n = s ? Al : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!V(e)) {
    const l = (f) => {
      const c = gi(f, t, !0);
      c && (a = !0, ue(i, c));
    };
    !s && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !o && !a ? (Z(e) && n.set(e, null), null) : (L(o) ? o.forEach((l) => i[l] = null) : ue(i, o), Z(e) && n.set(e, i), i);
}
function tn(e, t) {
  return !e || !Ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, Le(t)) || X(e, t));
}
function Pr(e) {
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
    props: h,
    data: y,
    setupState: x,
    ctx: g,
    inheritAttrs: b
  } = e, p = Us(e);
  let w, O;
  try {
    if (s.shapeFlag & 4) {
      const P = r || n, q = P;
      w = tt(
        f.call(
          q,
          P,
          c,
          h,
          x,
          y,
          g
        )
      ), O = a;
    } else {
      const P = t;
      w = tt(
        P.length > 1 ? P(
          h,
          { attrs: a, slots: i, emit: l }
        ) : P(
          h,
          null
        )
      ), O = t.props ? a : Ol(a);
    }
  } catch (P) {
    is.length = 0, Qs(P, e, 1), w = xe(Te);
  }
  let M = w;
  if (O && b !== !1) {
    const P = Object.keys(O), { shapeFlag: q } = M;
    P.length && q & 7 && (o && P.some(qn) && (O = kl(
      O,
      o
    )), M = yt(M, O, !1, !0));
  }
  return s.dirs && (M = yt(M, null, !1, !0), M.dirs = M.dirs ? M.dirs.concat(s.dirs) : s.dirs), s.transition && fs(M, s.transition), w = M, Us(p), w;
}
const Ol = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Ws(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, kl = (e, t) => {
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
      for (let h = 0; h < c.length; h++) {
        const y = c[h];
        if (bi(i, n, y) && !tn(f, y))
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
    if (bi(t, e, o) && !tn(s, o))
      return !0;
  }
  return !1;
}
function bi(e, t, s) {
  const n = e[s], r = t[s];
  return s === "style" && Z(n) && Z(r) ? !Gn(n, r) : n !== r;
}
function $l({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const vi = {}, yi = () => Object.create(vi), _i = (e) => Object.getPrototypeOf(e) === vi;
function Nl(e, t, s, n = !1) {
  const r = {}, o = yi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), xi(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : /* @__PURE__ */ La(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function jl(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ Y(r), [l] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let h = 0; h < c.length; h++) {
        let y = c[h];
        if (tn(e.emitsOptions, y))
          continue;
        const x = t[y];
        if (l)
          if (X(o, y))
            x !== o[y] && (o[y] = x, f = !0);
          else {
            const g = ze(y);
            r[g] = Dn(
              l,
              a,
              g,
              x,
              e,
              !1
            );
          }
        else
          x !== o[y] && (o[y] = x, f = !0);
      }
    }
  } else {
    xi(e, t, r, o) && (f = !0);
    let c;
    for (const h in a)
      (!t || // for camelCase
      !X(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Le(h)) === h || !X(t, c))) && (l ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[c] !== void 0) && (r[h] = Dn(
        l,
        a,
        h,
        void 0,
        e,
        !0
      )) : delete r[h]);
    if (o !== a)
      for (const h in o)
        (!t || !X(t, h)) && (delete o[h], f = !0);
  }
  f && lt(e.attrs, "set", "");
}
function xi(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if (Zt(l))
        continue;
      const f = t[l];
      let c;
      r && X(r, c = ze(l)) ? !o || !o.includes(c) ? s[c] = f : (a || (a = {}))[c] = f : tn(e.emitsOptions, l) || (!(l in n) || f !== n[l]) && (n[l] = f, i = !0);
    }
  if (o) {
    const l = /* @__PURE__ */ Y(s), f = a || ne;
    for (let c = 0; c < o.length; c++) {
      const h = o[c];
      s[h] = Dn(
        r,
        l,
        h,
        f[h],
        e,
        !X(f, h)
      );
    }
  }
  return i;
}
function Dn(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const a = X(i, "default");
    if (a && n === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && V(l)) {
        const { propsDefaults: f } = r;
        if (s in f)
          n = f[s];
        else {
          const c = gs(r);
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
    ] && (n === "" || n === Le(s)) && (n = !0));
  }
  return n;
}
const Fl = /* @__PURE__ */ new WeakMap();
function wi(e, t, s = !1) {
  const n = s ? Fl : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, a = [];
  let l = !1;
  if (!V(e)) {
    const c = (h) => {
      l = !0;
      const [y, x] = wi(h, t, !0);
      ue(i, y), x && a.push(...x);
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !l)
    return Z(e) && n.set(e, It), It;
  if (L(o))
    for (let c = 0; c < o.length; c++) {
      const h = ze(o[c]);
      Nr(h) && (i[h] = ne);
    }
  else if (o)
    for (const c in o) {
      const h = ze(c);
      if (Nr(h)) {
        const y = o[c], x = i[h] = L(y) || V(y) ? { type: y } : ue({}, y), g = x.type;
        let b = !1, p = !0;
        if (L(g))
          for (let w = 0; w < g.length; ++w) {
            const O = g[w], M = V(O) && O.name;
            if (M === "Boolean") {
              b = !0;
              break;
            } else M === "String" && (p = !1);
          }
        else
          b = V(g) && g.name === "Boolean";
        x[
          0
          /* shouldCast */
        ] = b, x[
          1
          /* shouldCastTrue */
        ] = p, (b || X(x, "default")) && a.push(h);
      }
    }
  const f = [i, a];
  return Z(e) && n.set(e, f), f;
}
function Nr(e) {
  return e[0] !== "$" && !Zt(e);
}
const ir = (e) => e === "_" || e === "_ctx" || e === "$stable", ar = (e) => L(e) ? e.map(tt) : [tt(e)], Dl = (e, t, s) => {
  if (t._n)
    return t;
  const n = ei((...r) => ar(t(...r)), s);
  return n._c = !1, n;
}, Si = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (ir(r)) continue;
    const o = e[r];
    if (V(o))
      t[r] = Dl(r, o, n);
    else if (o != null) {
      const i = ar(o);
      t[r] = () => i;
    }
  }
}, Ci = (e, t) => {
  const s = ar(t);
  e.slots.default = () => s;
}, Ei = (e, t, s) => {
  for (const n in t)
    (s || !ir(n)) && (e[n] = t[n]);
}, Ml = (e, t, s) => {
  const n = e.slots = yi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ei(n, t, s), s && Ao(n, "_", r, !0)) : Si(t, n);
  } else t && Ci(e, t);
}, Il = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = ne;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? s && a === 1 ? o = !1 : Ei(r, t, s) : (o = !t.$stable, Si(t, r)), i = t;
  } else t && (Ci(e, t), i = { default: 1 });
  if (o)
    for (const a in r)
      !ir(a) && i[a] == null && delete r[a];
}, ke = zl;
function Ll(e) {
  return Ul(e);
}
function Ul(e, t) {
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
    parentNode: h,
    nextSibling: y,
    setScopeId: x = st,
    insertStaticContent: g
  } = e, b = (d, m, _, T = null, S = null, C = null, k = void 0, A = null, R = !!m.dynamicChildren) => {
    if (d === m)
      return;
    d && !Et(d, m) && (T = Es(d), be(d, S, C, !0), d = null), m.patchFlag === -2 && (R = !1, m.dynamicChildren = null);
    const { type: E, ref: U, shapeFlag: $ } = m;
    switch (E) {
      case sn:
        p(d, m, _, T);
        break;
      case Te:
        w(d, m, _, T);
        break;
      case $s:
        d == null && O(m, _, T, k);
        break;
      case ce:
        N(
          d,
          m,
          _,
          T,
          S,
          C,
          k,
          A,
          R
        );
        break;
      default:
        $ & 1 ? q(
          d,
          m,
          _,
          T,
          S,
          C,
          k,
          A,
          R
        ) : $ & 6 ? Q(
          d,
          m,
          _,
          T,
          S,
          C,
          k,
          A,
          R
        ) : ($ & 64 || $ & 128) && E.process(
          d,
          m,
          _,
          T,
          S,
          C,
          k,
          A,
          R,
          Kt
        );
    }
    U != null && S ? ns(U, d && d.ref, C, m || d, !m) : U == null && d && d.ref != null && ns(d.ref, null, C, d, !0);
  }, p = (d, m, _, T) => {
    if (d == null)
      n(
        m.el = a(m.children),
        _,
        T
      );
    else {
      const S = m.el = d.el;
      m.children !== d.children && f(S, m.children);
    }
  }, w = (d, m, _, T) => {
    d == null ? n(
      m.el = l(m.children || ""),
      _,
      T
    ) : m.el = d.el;
  }, O = (d, m, _, T) => {
    [d.el, d.anchor] = g(
      d.children,
      m,
      _,
      T,
      d.el,
      d.anchor
    );
  }, M = ({ el: d, anchor: m }, _, T) => {
    let S;
    for (; d && d !== m; )
      S = y(d), n(d, _, T), d = S;
    n(m, _, T);
  }, P = ({ el: d, anchor: m }) => {
    let _;
    for (; d && d !== m; )
      _ = y(d), r(d), d = _;
    r(m);
  }, q = (d, m, _, T, S, C, k, A, R) => {
    if (m.type === "svg" ? k = "svg" : m.type === "math" && (k = "mathml"), d == null)
      re(
        m,
        _,
        T,
        S,
        C,
        k,
        A,
        R
      );
    else {
      const E = d.el && d.el._isVueCE ? d.el : null;
      try {
        E && E._beginPatch(), z(
          d,
          m,
          S,
          C,
          k,
          A,
          R
        );
      } finally {
        E && E._endPatch();
      }
    }
  }, re = (d, m, _, T, S, C, k, A) => {
    let R, E;
    const { props: U, shapeFlag: $, transition: I, dirs: H } = d;
    if (R = d.el = i(
      d.type,
      C,
      U && U.is,
      U
    ), $ & 8 ? c(R, d.children) : $ & 16 && pe(
      d.children,
      R,
      null,
      T,
      S,
      vn(d, C),
      k,
      A
    ), H && _t(d, null, T, "created"), te(R, d, d.scopeId, k, T), U) {
      for (const ae in U)
        ae !== "value" && !Zt(ae) && o(R, ae, null, U[ae], C, T);
      "value" in U && o(R, "value", null, U.value, C), (E = U.onVnodeBeforeMount) && Qe(E, T, d);
    }
    H && _t(d, null, T, "beforeMount");
    const W = Bl(S, I);
    W && I.beforeEnter(R), n(R, m, _), ((E = U && U.onVnodeMounted) || W || H) && ke(() => {
      E && Qe(E, T, d), W && I.enter(R), H && _t(d, null, T, "mounted");
    }, S);
  }, te = (d, m, _, T, S) => {
    if (_ && x(d, _), T)
      for (let C = 0; C < T.length; C++)
        x(d, T[C]);
    if (S) {
      let C = S.subTree;
      if (m === C || Oi(C.type) && (C.ssContent === m || C.ssFallback === m)) {
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
  }, pe = (d, m, _, T, S, C, k, A, R = 0) => {
    for (let E = R; E < d.length; E++) {
      const U = d[E] = A ? at(d[E]) : tt(d[E]);
      b(
        null,
        U,
        m,
        _,
        T,
        S,
        C,
        k,
        A
      );
    }
  }, z = (d, m, _, T, S, C, k) => {
    const A = m.el = d.el;
    let { patchFlag: R, dynamicChildren: E, dirs: U } = m;
    R |= d.patchFlag & 16;
    const $ = d.props || ne, I = m.props || ne;
    let H;
    if (_ && xt(_, !1), (H = I.onVnodeBeforeUpdate) && Qe(H, _, m, d), U && _t(m, d, _, "beforeUpdate"), _ && xt(_, !0), ($.innerHTML && I.innerHTML == null || $.textContent && I.textContent == null) && c(A, ""), E ? G(
      d.dynamicChildren,
      E,
      A,
      _,
      T,
      vn(m, S),
      C
    ) : k || K(
      d,
      m,
      A,
      null,
      _,
      T,
      vn(m, S),
      C,
      !1
    ), R > 0) {
      if (R & 16)
        oe(A, $, I, _, S);
      else if (R & 2 && $.class !== I.class && o(A, "class", null, I.class, S), R & 4 && o(A, "style", $.style, I.style, S), R & 8) {
        const W = m.dynamicProps;
        for (let ae = 0; ae < W.length; ae++) {
          const ee = W[ae], Ae = $[ee], Oe = I[ee];
          (Oe !== Ae || ee === "value") && o(A, ee, Ae, Oe, S, _);
        }
      }
      R & 1 && d.children !== m.children && c(A, m.children);
    } else !k && E == null && oe(A, $, I, _, S);
    ((H = I.onVnodeUpdated) || U) && ke(() => {
      H && Qe(H, _, m, d), U && _t(m, d, _, "updated");
    }, T);
  }, G = (d, m, _, T, S, C, k) => {
    for (let A = 0; A < m.length; A++) {
      const R = d[A], E = m[A], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Et(R, E) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? h(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      b(
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
  }, oe = (d, m, _, T, S) => {
    if (m !== _) {
      if (m !== ne)
        for (const C in m)
          !Zt(C) && !(C in _) && o(
            d,
            C,
            m[C],
            null,
            S,
            T
          );
      for (const C in _) {
        if (Zt(C)) continue;
        const k = _[C], A = m[C];
        k !== A && C !== "value" && o(d, C, A, k, S, T);
      }
      "value" in _ && o(d, "value", m.value, _.value, S);
    }
  }, N = (d, m, _, T, S, C, k, A, R) => {
    const E = m.el = d ? d.el : a(""), U = m.anchor = d ? d.anchor : a("");
    let { patchFlag: $, dynamicChildren: I, slotScopeIds: H } = m;
    H && (A = A ? A.concat(H) : H), d == null ? (n(E, _, T), n(U, _, T), pe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      _,
      U,
      S,
      C,
      k,
      A,
      R
    )) : $ > 0 && $ & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren && d.dynamicChildren.length === I.length ? (G(
      d.dynamicChildren,
      I,
      _,
      S,
      C,
      k,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || S && m === S.subTree) && Ti(
      d,
      m,
      !0
      /* shallow */
    )) : K(
      d,
      m,
      _,
      U,
      S,
      C,
      k,
      A,
      R
    );
  }, Q = (d, m, _, T, S, C, k, A, R) => {
    m.slotScopeIds = A, d == null ? m.shapeFlag & 512 ? S.ctx.activate(
      m,
      _,
      T,
      k,
      R
    ) : fe(
      m,
      _,
      T,
      S,
      C,
      k,
      R
    ) : De(d, m, R);
  }, fe = (d, m, _, T, S, C, k) => {
    const A = d.component = Xl(
      d,
      T,
      S
    );
    if (Zs(d) && (A.ctx.renderer = Kt), Ql(A, !1, k), A.asyncDep) {
      if (S && S.registerDep(A, J, k), !d.el) {
        const R = A.subTree = xe(Te);
        w(null, R, m, _), d.placeholder = R.el;
      }
    } else
      J(
        A,
        d,
        m,
        _,
        S,
        C,
        k
      );
  }, De = (d, m, _) => {
    const T = m.component = d.component;
    if (Pl(d, m, _))
      if (T.asyncDep && !T.asyncResolved) {
        ie(T, m, _);
        return;
      } else
        T.next = m, T.update();
    else
      m.el = d.el, T.vnode = m;
  }, J = (d, m, _, T, S, C, k) => {
    const A = () => {
      if (d.isMounted) {
        let { next: $, bu: I, u: H, parent: W, vnode: ae } = d;
        {
          const Ye = Ri(d);
          if (Ye) {
            $ && ($.el = ae.el, ie(d, $, k)), Ye.asyncDep.then(() => {
              ke(() => {
                d.isUnmounted || E();
              }, S);
            });
            return;
          }
        }
        let ee = $, Ae;
        xt(d, !1), $ ? ($.el = ae.el, ie(d, $, k)) : $ = ae, I && ks(I), (Ae = $.props && $.props.onVnodeBeforeUpdate) && Qe(Ae, W, $, ae), xt(d, !0);
        const Oe = Pr(d), Ge = d.subTree;
        d.subTree = Oe, b(
          Ge,
          Oe,
          // parent may have changed if it's in a teleport
          h(Ge.el),
          // anchor may have changed if it's in a fragment
          Es(Ge),
          d,
          S,
          C
        ), $.el = Oe.el, ee === null && $l(d, Oe.el), H && ke(H, S), (Ae = $.props && $.props.onVnodeUpdated) && ke(
          () => Qe(Ae, W, $, ae),
          S
        );
      } else {
        let $;
        const { el: I, props: H } = m, { bm: W, m: ae, parent: ee, root: Ae, type: Oe } = d, Ge = rs(m);
        xt(d, !1), W && ks(W), !Ge && ($ = H && H.onVnodeBeforeMount) && Qe($, ee, m), xt(d, !0);
        {
          Ae.ce && Ae.ce._hasShadowRoot() && Ae.ce._injectChildStyle(Oe);
          const Ye = d.subTree = Pr(d);
          b(
            null,
            Ye,
            _,
            T,
            d,
            S,
            C
          ), m.el = Ye.el;
        }
        if (ae && ke(ae, S), !Ge && ($ = H && H.onVnodeMounted)) {
          const Ye = m;
          ke(
            () => Qe($, ee, Ye),
            S
          );
        }
        (m.shapeFlag & 256 || ee && rs(ee.vnode) && ee.vnode.shapeFlag & 256) && d.a && ke(d.a, S), d.isMounted = !0, m = _ = T = null;
      }
    };
    d.scope.on();
    const R = d.effect = new $o(A);
    d.scope.off();
    const E = d.update = R.run.bind(R), U = d.job = R.runIfDirty.bind(R);
    U.i = d, U.id = d.uid, R.scheduler = () => rr(U), xt(d, !0), E();
  }, ie = (d, m, _) => {
    m.component = d;
    const T = d.vnode.props;
    d.vnode = m, d.next = null, jl(d, m.props, T, _), Il(d, m.children, _), ut(), Sr(d), dt();
  }, K = (d, m, _, T, S, C, k, A, R = !1) => {
    const E = d && d.children, U = d ? d.shapeFlag : 0, $ = m.children, { patchFlag: I, shapeFlag: H } = m;
    if (I > 0) {
      if (I & 128) {
        $t(
          E,
          $,
          _,
          T,
          S,
          C,
          k,
          A,
          R
        );
        return;
      } else if (I & 256) {
        Je(
          E,
          $,
          _,
          T,
          S,
          C,
          k,
          A,
          R
        );
        return;
      }
    }
    H & 8 ? (U & 16 && qt(E, S, C), $ !== E && c(_, $)) : U & 16 ? H & 16 ? $t(
      E,
      $,
      _,
      T,
      S,
      C,
      k,
      A,
      R
    ) : qt(E, S, C, !0) : (U & 8 && c(_, ""), H & 16 && pe(
      $,
      _,
      T,
      S,
      C,
      k,
      A,
      R
    ));
  }, Je = (d, m, _, T, S, C, k, A, R) => {
    d = d || It, m = m || It;
    const E = d.length, U = m.length, $ = Math.min(E, U);
    let I;
    for (I = 0; I < $; I++) {
      const H = m[I] = R ? at(m[I]) : tt(m[I]);
      b(
        d[I],
        H,
        _,
        null,
        S,
        C,
        k,
        A,
        R
      );
    }
    E > U ? qt(
      d,
      S,
      C,
      !0,
      !1,
      $
    ) : pe(
      m,
      _,
      T,
      S,
      C,
      k,
      A,
      R,
      $
    );
  }, $t = (d, m, _, T, S, C, k, A, R) => {
    let E = 0;
    const U = m.length;
    let $ = d.length - 1, I = U - 1;
    for (; E <= $ && E <= I; ) {
      const H = d[E], W = m[E] = R ? at(m[E]) : tt(m[E]);
      if (Et(H, W))
        b(
          H,
          W,
          _,
          null,
          S,
          C,
          k,
          A,
          R
        );
      else
        break;
      E++;
    }
    for (; E <= $ && E <= I; ) {
      const H = d[$], W = m[I] = R ? at(m[I]) : tt(m[I]);
      if (Et(H, W))
        b(
          H,
          W,
          _,
          null,
          S,
          C,
          k,
          A,
          R
        );
      else
        break;
      $--, I--;
    }
    if (E > $) {
      if (E <= I) {
        const H = I + 1, W = H < U ? m[H].el : T;
        for (; E <= I; )
          b(
            null,
            m[E] = R ? at(m[E]) : tt(m[E]),
            _,
            W,
            S,
            C,
            k,
            A,
            R
          ), E++;
      }
    } else if (E > I)
      for (; E <= $; )
        be(d[E], S, C, !0), E++;
    else {
      const H = E, W = E, ae = /* @__PURE__ */ new Map();
      for (E = W; E <= I; E++) {
        const je = m[E] = R ? at(m[E]) : tt(m[E]);
        je.key != null && ae.set(je.key, E);
      }
      let ee, Ae = 0;
      const Oe = I - W + 1;
      let Ge = !1, Ye = 0;
      const Wt = new Array(Oe);
      for (E = 0; E < Oe; E++) Wt[E] = 0;
      for (E = H; E <= $; E++) {
        const je = d[E];
        if (Ae >= Oe) {
          be(je, S, C, !0);
          continue;
        }
        let Xe;
        if (je.key != null)
          Xe = ae.get(je.key);
        else
          for (ee = W; ee <= I; ee++)
            if (Wt[ee - W] === 0 && Et(je, m[ee])) {
              Xe = ee;
              break;
            }
        Xe === void 0 ? be(je, S, C, !0) : (Wt[Xe - W] = E + 1, Xe >= Ye ? Ye = Xe : Ge = !0, b(
          je,
          m[Xe],
          _,
          null,
          S,
          C,
          k,
          A,
          R
        ), Ae++);
      }
      const gr = Ge ? Hl(Wt) : It;
      for (ee = gr.length - 1, E = Oe - 1; E >= 0; E--) {
        const je = W + E, Xe = m[je], br = m[je + 1], vr = je + 1 < U ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          br.el || Ai(br)
        ) : T;
        Wt[E] === 0 ? b(
          null,
          Xe,
          _,
          vr,
          S,
          C,
          k,
          A,
          R
        ) : Ge && (ee < 0 || E !== gr[ee] ? ve(Xe, _, vr, 2) : ee--);
      }
    }
  }, ve = (d, m, _, T, S = null) => {
    const { el: C, type: k, transition: A, children: R, shapeFlag: E } = d;
    if (E & 6) {
      ve(d.component.subTree, m, _, T);
      return;
    }
    if (E & 128) {
      d.suspense.move(m, _, T);
      return;
    }
    if (E & 64) {
      k.move(d, m, _, Kt);
      return;
    }
    if (k === ce) {
      n(C, m, _);
      for (let $ = 0; $ < R.length; $++)
        ve(R[$], m, _, T);
      n(d.anchor, m, _);
      return;
    }
    if (k === $s) {
      M(d, m, _);
      return;
    }
    if (T !== 2 && E & 1 && A)
      if (T === 0)
        A.beforeEnter(C), n(C, m, _), ke(() => A.enter(C), S);
      else {
        const { leave: $, delayLeave: I, afterLeave: H } = A, W = () => {
          d.ctx.isUnmounted ? r(C) : n(C, m, _);
        }, ae = () => {
          C._isLeaving && C[et](
            !0
            /* cancelled */
          ), $(C, () => {
            W(), H && H();
          });
        };
        I ? I(C, W, ae) : ae();
      }
    else
      n(C, m, _);
  }, be = (d, m, _, T = !1, S = !1) => {
    const {
      type: C,
      props: k,
      ref: A,
      children: R,
      dynamicChildren: E,
      shapeFlag: U,
      patchFlag: $,
      dirs: I,
      cacheIndex: H
    } = d;
    if ($ === -2 && (S = !1), A != null && (ut(), ns(A, null, _, d, !0), dt()), H != null && (m.renderCache[H] = void 0), U & 256) {
      m.ctx.deactivate(d);
      return;
    }
    const W = U & 1 && I, ae = !rs(d);
    let ee;
    if (ae && (ee = k && k.onVnodeBeforeUnmount) && Qe(ee, m, d), U & 6)
      Cs(d.component, _, T);
    else {
      if (U & 128) {
        d.suspense.unmount(_, T);
        return;
      }
      W && _t(d, null, m, "beforeUnmount"), U & 64 ? d.type.remove(
        d,
        m,
        _,
        Kt,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== ce || $ > 0 && $ & 64) ? qt(
        E,
        m,
        _,
        !1,
        !0
      ) : (C === ce && $ & 384 || !S && U & 16) && qt(R, m, _), T && Nt(d);
    }
    (ae && (ee = k && k.onVnodeUnmounted) || W) && ke(() => {
      ee && Qe(ee, m, d), W && _t(d, null, m, "unmounted");
    }, _);
  }, Nt = (d) => {
    const { type: m, el: _, anchor: T, transition: S } = d;
    if (m === ce) {
      jt(_, T);
      return;
    }
    if (m === $s) {
      P(d);
      return;
    }
    const C = () => {
      r(_), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (d.shapeFlag & 1 && S && !S.persisted) {
      const { leave: k, delayLeave: A } = S, R = () => k(_, C);
      A ? A(d.el, C, R) : R();
    } else
      C();
  }, jt = (d, m) => {
    let _;
    for (; d !== m; )
      _ = y(d), r(d), d = _;
    r(m);
  }, Cs = (d, m, _) => {
    const { bum: T, scope: S, job: C, subTree: k, um: A, m: R, a: E } = d;
    jr(R), jr(E), T && ks(T), S.stop(), C && (C.flags |= 8, be(k, d, m, _)), A && ke(A, m), ke(() => {
      d.isUnmounted = !0;
    }, m);
  }, qt = (d, m, _, T = !1, S = !1, C = 0) => {
    for (let k = C; k < d.length; k++)
      be(d[k], m, _, T, S);
  }, Es = (d) => {
    if (d.shapeFlag & 6)
      return Es(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const m = y(d.anchor || d.el), _ = m && m[sl];
    return _ ? y(_) : m;
  };
  let fn = !1;
  const mr = (d, m, _) => {
    let T;
    d == null ? m._vnode && (be(m._vnode, null, null, !0), T = m._vnode.component) : b(
      m._vnode || null,
      d,
      m,
      null,
      null,
      null,
      _
    ), m._vnode = d, fn || (fn = !0, Sr(T), Xo(), fn = !1);
  }, Kt = {
    p: b,
    um: be,
    m: ve,
    r: Nt,
    mt: fe,
    mc: pe,
    pc: K,
    pbc: G,
    n: Es,
    o: e
  };
  return {
    render: mr,
    hydrate: void 0,
    createApp: El(mr)
  };
}
function vn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function xt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ti(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (L(n) && L(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let a = r[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = at(r[o]), a.el = i.el), !s && a.patchFlag !== -2 && Ti(i, a)), a.type === sn && (a.patchFlag === -1 && (a = r[o] = at(a)), a.el = i.el), a.type === Te && !a.el && (a.el = i.el);
    }
}
function Hl(e) {
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
function Ri(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ri(t);
}
function jr(e) {
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
const Oi = (e) => e.__isSuspense;
function zl(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : Ya(e);
}
const ce = /* @__PURE__ */ Symbol.for("v-fgt"), sn = /* @__PURE__ */ Symbol.for("v-txt"), Te = /* @__PURE__ */ Symbol.for("v-cmt"), $s = /* @__PURE__ */ Symbol.for("v-stc"), is = [];
let Fe = null;
function F(e = !1) {
  is.push(Fe = e ? null : []);
}
function Vl() {
  is.pop(), Fe = is[is.length - 1] || null;
}
let us = 1;
function zs(e, t = !1) {
  us += e, e < 0 && Fe && t && (Fe.hasOnce = !0);
}
function ki(e) {
  return e.dynamicChildren = us > 0 ? Fe || It : null, Vl(), us > 0 && Fe && Fe.push(e), e;
}
function D(e, t, s, n, r, o) {
  return ki(
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
function Mn(e, t, s, n, r) {
  return ki(
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
const Pi = ({ key: e }) => e ?? null, Ns = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? de(e) || /* @__PURE__ */ we(e) || V(e) ? { i: Ue, r: e, k: t, f: !!s } : e : null);
function u(e, t = null, s = null, n = 0, r = null, o = e === ce ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Pi(t),
    ref: t && Ns(t),
    scopeId: Zo,
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
    ctx: Ue
  };
  return a ? (lr(l, s), o & 128 && e.normalize(l)) : s && (l.shapeFlag |= de(s) ? 8 : 16), us > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Fe.push(l), l;
}
const xe = ql;
function ql(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === bl) && (e = Te), Vs(e)) {
    const a = yt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && lr(a, s), us > 0 && !o && Fe && (a.shapeFlag & 6 ? Fe[Fe.indexOf(e)] = a : Fe.push(a)), a.patchFlag = -2, a;
  }
  if (sc(e) && (e = e.__vccOpts), t) {
    t = Kl(t);
    let { class: a, style: l } = t;
    a && !de(a) && (t.class = me(a)), Z(l) && (/* @__PURE__ */ nr(l) && !L(l) && (l = ue({}, l)), t.style = Rt(l));
  }
  const i = de(e) ? 1 : Oi(e) ? 128 : ni(e) ? 64 : Z(e) ? 4 : V(e) ? 2 : 0;
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
function Kl(e) {
  return e ? /* @__PURE__ */ nr(e) || _i(e) ? ue({}, e) : e : null;
}
function yt(e, t, s = !1, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: a, transition: l } = e, f = t ? Jl(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Pi(f),
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
  return l && n && fs(
    c,
    l.clone(c)
  ), c;
}
function Ce(e = " ", t = 0) {
  return xe(sn, null, e, t);
}
function Wl(e, t) {
  const s = xe($s, null, e);
  return s.staticCount = t, s;
}
function he(e = "", t = !1) {
  return t ? (F(), Mn(Te, null, e)) : xe(Te, null, e);
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
      !r && !_i(t) ? t._ctx = Ue : r === 3 && Ue && (Ue.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else V(t) ? (t = { default: t, _ctx: Ue }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ce(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Jl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = me([t.class, n.class]));
      else if (r === "style")
        t.style = Rt([t.style, n.style]);
      else if (Ws(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(L(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Qe(e, t, s, n = null) {
  Ke(e, t, 7, [
    s,
    n
  ]);
}
const Gl = mi();
let Yl = 0;
function Xl(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Gl, o = {
    uid: Yl++,
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
    scope: new ya(
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
    propsOptions: wi(n, r),
    emitsOptions: gi(n, r),
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
let Re = null;
const $i = () => Re || Ue;
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
    (s) => Re = s
  ), In = t(
    "__VUE_SSR_SETTERS__",
    (s) => ds = s
  );
}
const gs = (e) => {
  const t = Re;
  return qs(e), e.scope.on(), () => {
    e.scope.off(), qs(t);
  };
}, Fr = () => {
  Re && Re.scope.off(), qs(null);
};
function Ni(e) {
  return e.vnode.shapeFlag & 4;
}
let ds = !1;
function Ql(e, t = !1, s = !1) {
  t && In(t);
  const { props: n, children: r } = e.vnode, o = Ni(e);
  Nl(e, n, o, t), Ml(e, r, s || t);
  const i = o ? Zl(e, t) : void 0;
  return t && In(!1), i;
}
function Zl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, vl);
  const { setup: n } = s;
  if (n) {
    ut();
    const r = e.setupContext = n.length > 1 ? tc(e) : null, o = gs(e), i = ms(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = Eo(i);
    if (dt(), o(), (a || e.sp) && !rs(e) && ci(e), a) {
      if (i.then(Fr, Fr), t)
        return i.then((l) => {
          Dr(e, l);
        }).catch((l) => {
          Qs(l, e, 0);
        });
      e.asyncDep = i;
    } else
      Dr(e, i);
  } else
    ji(e);
}
function Dr(e, t, s) {
  V(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = Wo(t)), ji(e);
}
function ji(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || st);
  {
    const r = gs(e);
    ut();
    try {
      yl(e);
    } finally {
      dt(), r();
    }
  }
}
const ec = {
  get(e, t) {
    return ye(e, "get", ""), e[t];
  }
};
function tc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, ec),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function nn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Wo(Ua(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in os)
        return os[s](e);
    },
    has(t, s) {
      return s in t || s in os;
    }
  })) : e.proxy;
}
function sc(e) {
  return V(e) && "__vccOpts" in e;
}
const ge = (e, t) => /* @__PURE__ */ qa(e, t, ds);
function nc(e, t, s) {
  try {
    zs(-1);
    const n = arguments.length;
    return n === 2 ? Z(t) && !L(t) ? Vs(t) ? xe(e, null, [t]) : xe(e, t) : xe(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Vs(s) && (s = [s]), xe(e, t, s));
  } finally {
    zs(1);
  }
}
const rc = "3.5.28";
let Ln;
const Mr = typeof window < "u" && window.trustedTypes;
if (Mr)
  try {
    Ln = /* @__PURE__ */ Mr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Fi = Ln ? (e) => Ln.createHTML(e) : (e) => e, oc = "http://www.w3.org/2000/svg", ic = "http://www.w3.org/1998/Math/MathML", it = typeof document < "u" ? document : null, Ir = it && /* @__PURE__ */ it.createElement("template"), ac = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? it.createElementNS(oc, e) : t === "mathml" ? it.createElementNS(ic, e) : s ? it.createElement(e, { is: s }) : it.createElement(e);
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
      Ir.innerHTML = Fi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Ir.content;
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
}, mt = "transition", Yt = "animation", ps = /* @__PURE__ */ Symbol("_vtc"), Di = {
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
}, lc = /* @__PURE__ */ ue(
  {},
  ri,
  Di
), cc = (e) => (e.displayName = "Transition", e.props = lc, e), fc = /* @__PURE__ */ cc(
  (e, { slots: t }) => nc(ol, uc(e), t)
), wt = (e, t = []) => {
  L(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, Lr = (e) => e ? L(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function uc(e) {
  const t = {};
  for (const N in e)
    N in Di || (t[N] = e[N]);
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
    leaveFromClass: h = `${s}-leave-from`,
    leaveActiveClass: y = `${s}-leave-active`,
    leaveToClass: x = `${s}-leave-to`
  } = e, g = dc(r), b = g && g[0], p = g && g[1], {
    onBeforeEnter: w,
    onEnter: O,
    onEnterCancelled: M,
    onLeave: P,
    onLeaveCancelled: q,
    onBeforeAppear: re = w,
    onAppear: te = O,
    onAppearCancelled: pe = M
  } = t, z = (N, Q, fe, De) => {
    N._enterCancelled = De, St(N, Q ? c : a), St(N, Q ? f : i), fe && fe();
  }, G = (N, Q) => {
    N._isLeaving = !1, St(N, h), St(N, x), St(N, y), Q && Q();
  }, oe = (N) => (Q, fe) => {
    const De = N ? te : O, J = () => z(Q, N, fe);
    wt(De, [Q, J]), Ur(() => {
      St(Q, N ? l : o), ot(Q, N ? c : a), Lr(De) || Br(Q, n, b, J);
    });
  };
  return ue(t, {
    onBeforeEnter(N) {
      wt(w, [N]), ot(N, o), ot(N, i);
    },
    onBeforeAppear(N) {
      wt(re, [N]), ot(N, l), ot(N, f);
    },
    onEnter: oe(!1),
    onAppear: oe(!0),
    onLeave(N, Q) {
      N._isLeaving = !0;
      const fe = () => G(N, Q);
      ot(N, h), N._enterCancelled ? (ot(N, y), Vr(N)) : (Vr(N), ot(N, y)), Ur(() => {
        N._isLeaving && (St(N, h), ot(N, x), Lr(P) || Br(N, n, p, fe));
      }), wt(P, [N, fe]);
    },
    onEnterCancelled(N) {
      z(N, !1, void 0, !0), wt(M, [N]);
    },
    onAppearCancelled(N) {
      z(N, !0, void 0, !0), wt(pe, [N]);
    },
    onLeaveCancelled(N) {
      G(N), wt(q, [N]);
    }
  });
}
function dc(e) {
  if (e == null)
    return null;
  if (Z(e))
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
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[ps] || (e[ps] = /* @__PURE__ */ new Set())).add(t);
}
function St(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const s = e[ps];
  s && (s.delete(t), s.size || (e[ps] = void 0));
}
function Ur(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let pc = 0;
function Br(e, t, s, n) {
  const r = e._endId = ++pc, o = () => {
    r === e._endId && n();
  };
  if (s != null)
    return setTimeout(o, s);
  const { type: i, timeout: a, propCount: l } = hc(e, t);
  if (!i)
    return n();
  const f = i + "end";
  let c = 0;
  const h = () => {
    e.removeEventListener(f, y), o();
  }, y = (x) => {
    x.target === e && ++c >= l && h();
  };
  setTimeout(() => {
    c < l && h();
  }, a + 1), e.addEventListener(f, y);
}
function hc(e, t) {
  const s = window.getComputedStyle(e), n = (g) => (s[g] || "").split(", "), r = n(`${mt}Delay`), o = n(`${mt}Duration`), i = Hr(r, o), a = n(`${Yt}Delay`), l = n(`${Yt}Duration`), f = Hr(a, l);
  let c = null, h = 0, y = 0;
  t === mt ? i > 0 && (c = mt, h = i, y = o.length) : t === Yt ? f > 0 && (c = Yt, h = f, y = l.length) : (h = Math.max(i, f), c = h > 0 ? i > f ? mt : Yt : null, y = c ? c === mt ? o.length : l.length : 0);
  const x = c === mt && /\b(?:transform|all)(?:,|$)/.test(
    n(`${mt}Property`).toString()
  );
  return {
    type: c,
    timeout: h,
    propCount: y,
    hasTransform: x
  };
}
function Hr(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((s, n) => zr(s) + zr(e[n])));
}
function zr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Vr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function mc(e, t, s) {
  const n = e[ps];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const qr = /* @__PURE__ */ Symbol("_vod"), gc = /* @__PURE__ */ Symbol("_vsh"), bc = /* @__PURE__ */ Symbol(""), vc = /(?:^|;)\s*display\s*:/;
function yc(e, t, s) {
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
      const i = n[bc];
      i && (s += ";" + i), n.cssText = s, o = vc.test(s);
    }
  } else t && e.removeAttribute("style");
  qr in e && (e[qr] = o ? n.display : "", e[gc] && (n.display = "none"));
}
const Kr = /\s*!important$/;
function js(e, t, s) {
  if (L(s))
    s.forEach((n) => js(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = _c(e, t);
    Kr.test(s) ? e.setProperty(
      Le(n),
      s.replace(Kr, ""),
      "important"
    ) : e[n] = s;
  }
}
const Wr = ["Webkit", "Moz", "ms"], _n = {};
function _c(e, t) {
  const s = _n[t];
  if (s)
    return s;
  let n = ze(t);
  if (n !== "filter" && n in e)
    return _n[t] = n;
  n = Ro(n);
  for (let r = 0; r < Wr.length; r++) {
    const o = Wr[r] + n;
    if (o in e)
      return _n[t] = o;
  }
  return t;
}
const Jr = "http://www.w3.org/1999/xlink";
function Gr(e, t, s, n, r, o = ba(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Jr, t.slice(6, t.length)) : e.setAttributeNS(Jr, t, s) : s == null || o && !Oo(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : nt(s) ? String(s) : s
  );
}
function Yr(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Fi(s) : s);
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
    a === "boolean" ? s = Oo(s) : s == null && a === "string" ? (s = "", i = !0) : a === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Mt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function xc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Xr = /* @__PURE__ */ Symbol("_vei");
function wc(e, t, s, n, r = null) {
  const o = e[Xr] || (e[Xr] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [a, l] = Sc(t);
    if (n) {
      const f = o[t] = Tc(
        n,
        r
      );
      Mt(e, a, f, l);
    } else i && (xc(e, a, i, l), o[t] = void 0);
  }
}
const Qr = /(?:Once|Passive|Capture)$/;
function Sc(e) {
  let t;
  if (Qr.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Qr); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Le(e.slice(2)), t];
}
let xn = 0;
const Cc = /* @__PURE__ */ Promise.resolve(), Ec = () => xn || (Cc.then(() => xn = 0), xn = Date.now());
function Tc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ke(
      Rc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Ec(), s;
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
const Zr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ac = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? mc(e, n, i) : t === "style" ? yc(e, s, n) : Ws(t) ? qn(t) || wc(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Oc(e, t, n, i)) ? (Yr(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Gr(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !de(n)) ? Yr(e, ze(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Gr(e, t, n, i));
};
function Oc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Zr(t) && V(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Zr(t) && de(s) ? !1 : t in e;
}
const eo = {};
// @__NO_SIDE_EFFECTS__
function bs(e, t, s) {
  let n = /* @__PURE__ */ il(e, t);
  Js(n) && (n = ue({}, n, t));
  class r extends cr {
    constructor(i) {
      super(n, i, s);
    }
  }
  return r.def = n, r;
}
const kc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class cr extends kc {
  constructor(t, s = {}, n = oo) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== oo ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
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
    this._connected = !1, Go(() => {
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
          (f === Number || f && f.type === Number) && (l in this._props && (this._props[l] = Tn(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[ze(l)] = !0);
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
        X(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => Ko(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = L(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(ze))
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
    let n = s ? this.getAttribute(t) : eo;
    const r = ze(t);
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
    if (s !== this._props[t] && (this._dirty = !0, s === eo ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Le(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Le(t), s + "") : s || this.removeAttribute(Le(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Mc(t, this._root);
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
        r(o, i), Le(o) !== o && r(Le(o), i);
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
            let h;
            for (; h = c.nextNode(); )
              h.setAttribute(f, "");
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
const to = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return L(t) ? (s) => ks(t, s) : t;
};
function Pc(e) {
  e.target.composing = !0;
}
function so(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const wn = /* @__PURE__ */ Symbol("_assign");
function no(e, t, s) {
  return t && (e = e.trim()), s && (e = Jn(e)), e;
}
const $c = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, r) {
    e[wn] = to(r);
    const o = n || r.props && r.props.type === "number";
    Mt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[wn](no(e.value, s, o));
    }), (s || o) && Mt(e, "change", () => {
      e.value = no(e.value, s, o);
    }), t || (Mt(e, "compositionstart", Pc), Mt(e, "compositionend", so), Mt(e, "change", so));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: r, number: o } }, i) {
    if (e[wn] = to(i), e.composing) return;
    const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? Jn(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (n && t === s || r && e.value.trim() === l) || (e.value = l));
  }
}, Nc = ["ctrl", "shift", "alt", "meta"], jc = {
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
  exact: (e, t) => Nc.some((s) => e[`${s}Key`] && !t.includes(s))
}, Fc = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = jc[t[i]];
      if (a && a(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Dc = /* @__PURE__ */ ue({ patchProp: Ac }, ac);
let ro;
function Mi() {
  return ro || (ro = Ll(Dc));
}
const Mc = ((...e) => {
  Mi().render(...e);
}), oo = ((...e) => {
  const t = Mi().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Lc(n);
    if (!r) return;
    const o = t._component;
    !V(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = s(r, !1, Ic(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Ic(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Lc(e) {
  return de(e) ? document.querySelector(e) : e;
}
const Uc = ".gallery-card[data-v-17be2fa0]{background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 10px 30px -10px #00000014;border:1px solid #f0f2f5;transition:all .3s cubic-bezier(.2,0,0,1);height:100%;display:flex;flex-direction:column;position:relative}.gallery-card[data-v-17be2fa0]:hover{transform:translateY(-4px);box-shadow:0 20px 40px -12px #4158d033;border-color:transparent}.card-cover[data-v-17be2fa0]{height:110px;position:relative;flex-shrink:0}.card-avatar[data-v-17be2fa0]{width:100px;height:100px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:2.2rem;color:#fff;position:absolute;bottom:-45px;left:5px;border:4px solid white;box-shadow:0 8px 20px #0000001a;background:linear-gradient(135deg,#4158d0,#c850c0);text-shadow:0 2px 4px rgba(0,0,0,.1);z-index:2}.card-content[data-v-17be2fa0]{padding:3rem 1.5rem 1.25rem;flex:1;display:flex;flex-direction:column;gap:1.25rem}.card-header[data-v-17be2fa0]{display:flex;align-items:flex-start;justify-content:space-between;flex-shrink:0}.card-name[data-v-17be2fa0]{font-weight:600;font-size:1.2rem;color:#1e293b;margin:0 0 .25rem;letter-spacing:-.01em}.card-meta[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;color:#64748b;font-size:.85rem}.dot[data-v-17be2fa0]{color:#cbd5e1}.match-pill[data-v-17be2fa0]{background:linear-gradient(135deg,#4158d0,#c850c0);padding:.35rem .75rem;border-radius:40px;color:#fff;font-weight:600;font-size:1.1rem;line-height:1;box-shadow:0 4px 10px #4158d033;flex-shrink:0}.match-symbol[data-v-17be2fa0]{font-size:.7rem;opacity:.9;margin-left:1px}.stats-minimal[data-v-17be2fa0]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;margin-bottom:.75rem;border-bottom:1px dashed #e2e8f0}.stat-minimal[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;flex:1}.stat-minimal-emoji[data-v-17be2fa0]{font-size:1.2rem;opacity:.7}.stat-minimal-text[data-v-17be2fa0]{display:flex;flex-direction:column}.stat-minimal-value[data-v-17be2fa0]{font-weight:500;font-size:.9rem;color:#1e293b;line-height:1.2}.stat-minimal-label[data-v-17be2fa0]{font-size:.6rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.02em}.stat-minimal-divider[data-v-17be2fa0]{width:1px;height:30px;background:linear-gradient(to bottom,transparent,#e2e8f0,transparent);margin:0 .5rem}.section-header[data-v-17be2fa0]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}.section-title[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.03em}.slot-count[data-v-17be2fa0],.course-count[data-v-17be2fa0]{font-size:.7rem;color:#4158d0;background:#f0f2ff;padding:.2rem .6rem;border-radius:30px;font-weight:500}.schedule-availability[data-v-17be2fa0],.shared-courses[data-v-17be2fa0]{flex-shrink:0}.schedule-slots[data-v-17be2fa0],.course-list[data-v-17be2fa0]{display:flex;flex-wrap:wrap;gap:.5rem;min-height:36px}.slot-chip[data-v-17be2fa0]{background:#f8fafc;padding:.4rem .75rem;border-radius:30px;font-size:.75rem;display:inline-flex;align-items:center;gap:.4rem;border:1px solid #eef2f6;transition:all .2s;cursor:help}.slot-chip[data-v-17be2fa0]:hover{background:#f0f2ff;border-color:#4158d0}.slot-day[data-v-17be2fa0]{font-weight:600;color:#1e293b}.slot-time[data-v-17be2fa0]{color:#64748b}.slot-chip.more[data-v-17be2fa0]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.slot-chip.more[data-v-17be2fa0]:hover{background:transparent;border-color:#cbd5e1}.course-chip[data-v-17be2fa0]{background:#f8fafc;padding:.4rem .9rem;border-radius:30px;font-size:.75rem;color:#475569;border:1px solid #eef2f6;transition:all .2s;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.course-chip[data-v-17be2fa0]:hover{border-color:#c850c0;color:#c850c0;background:#fdf2f8}.course-chip.more[data-v-17be2fa0]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.course-chip.more[data-v-17be2fa0]:hover{background:transparent;border-color:#cbd5e1;color:#94a3b8}.empty-state[data-v-17be2fa0]{display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:30px;padding:.5rem 1rem;min-height:36px}.empty-text[data-v-17be2fa0]{font-size:.75rem;color:#94a3b8}.card-actions[data-v-17be2fa0]{display:flex;gap:.5rem;margin-top:auto;padding-top:.5rem;flex-shrink:0}.btn-profile[data-v-17be2fa0]{flex:2;padding:.7rem;border:none;border-radius:40px;font-weight:500;font-size:.8rem;background:linear-gradient(135deg,#4158d0,#c850c0);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;box-shadow:0 6px 14px #4158d033;transition:all .2s}.btn-profile[data-v-17be2fa0]:hover{transform:translateY(-2px);box-shadow:0 10px 20px #4158d04d}.btn-icon[data-v-17be2fa0]{width:42px;height:42px;border-radius:50%;border:none;background:#fff;color:#64748b;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px #0000000d;border:1px solid #e2e8f0;transition:all .2s;flex-shrink:0}.btn-icon[data-v-17be2fa0]:hover{transform:translateY(-2px)}.btn-icon.invite[data-v-17be2fa0]:hover{background:#4158d0;color:#fff;border-color:#4158d0}.btn-icon.message[data-v-17be2fa0]:hover{background:#c850c0;color:#fff;border-color:#c850c0}@media(max-width:768px){.gallery-card.list-view[data-v-17be2fa0]{flex-direction:column;min-height:auto}.list-view .card-cover[data-v-17be2fa0]{width:100%;height:100px;border-radius:24px 24px 0 0}.list-view .card-avatar[data-v-17be2fa0]{width:80px;height:80px;font-size:2rem;left:50%;transform:translate(-50%);top:auto;bottom:-40px;margin-top:0}.list-view .card-content[data-v-17be2fa0]{padding:3rem 1.25rem 1.25rem}.list-details-row[data-v-17be2fa0]{flex-direction:column;gap:1rem}}@media(max-width:640px){.card-avatar[data-v-17be2fa0]{width:80px;height:80px;font-size:2rem;bottom:-40px;left:50%;transform:translate(-50%)}.card-content[data-v-17be2fa0]{padding:2.8rem 1.25rem 1.25rem}.card-name[data-v-17be2fa0]{font-size:1.1rem}.stat-minimal-emoji[data-v-17be2fa0]{font-size:1rem}.stat-minimal-value[data-v-17be2fa0]{font-size:.85rem}.btn-icon[data-v-17be2fa0]{width:38px;height:38px;font-size:1rem}.list-view .card-avatar[data-v-17be2fa0]{width:70px;height:70px;font-size:1.8rem;bottom:-35px}}", vs = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, Bc = { class: "gallery-card" }, Hc = { class: "card-avatar" }, zc = { class: "card-content" }, Vc = { class: "card-header" }, qc = { class: "card-name" }, Kc = { class: "card-meta" }, Wc = { class: "match-pill" }, Jc = { class: "match-value" }, Gc = { class: "stat-minimal" }, Yc = { class: "stat-minimal-text" }, Xc = { class: "stat-minimal-value" }, Qc = {
  key: 0,
  class: "stat-minimal-divider"
}, Zc = { class: "stat-minimal" }, ef = { class: "stat-minimal-text" }, tf = { class: "stat-minimal-value" }, sf = {
  key: 1,
  class: "stat-minimal-divider"
}, nf = { class: "stat-minimal" }, rf = { class: "stat-minimal-text" }, of = { class: "stat-minimal-value" }, af = {
  key: 0,
  class: "list-details-row"
}, lf = { class: "schedule-availability list-compact" }, cf = { class: "section-header list-header" }, ff = {
  key: 0,
  class: "slot-count"
}, uf = {
  key: 0,
  class: "schedule-slots list-slots"
}, df = ["title"], pf = { class: "slot-day" }, hf = { class: "slot-time" }, mf = {
  key: 0,
  class: "slot-chip more list-chip"
}, gf = {
  key: 1,
  class: "empty-state list-empty"
}, bf = { class: "shared-courses list-compact" }, vf = { class: "section-header list-header" }, yf = {
  key: 0,
  class: "course-count"
}, _f = {
  key: 0,
  class: "course-list list-courses"
}, xf = {
  key: 0,
  class: "course-chip more list-chip"
}, wf = {
  key: 1,
  class: "empty-state list-empty"
}, Sf = { class: "schedule-availability" }, Cf = { class: "section-header" }, Ef = {
  key: 0,
  class: "slot-count"
}, Tf = {
  key: 0,
  class: "schedule-slots"
}, Rf = ["title"], Af = { class: "slot-day" }, Of = { class: "slot-time" }, kf = {
  key: 0,
  class: "slot-chip more"
}, Pf = {
  key: 1,
  class: "empty-state"
}, $f = { class: "shared-courses" }, Nf = { class: "section-header" }, jf = {
  key: 0,
  class: "course-count"
}, Ff = {
  key: 0,
  class: "course-list"
}, Df = {
  key: 0,
  class: "course-chip more"
}, Mf = {
  key: 1,
  class: "empty-state"
}, If = {
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
    const s = e, n = ss("viewMode", null), r = ge(
      () => (n?.value || s.viewMode) === "list"
    ), o = ge(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), i = ge(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), a = ge(() => {
      if (Array.isArray(s.timeSlots)) return s.timeSlots;
      try {
        return s.timeSlots ? JSON.parse(s.timeSlots) : [];
      } catch {
        return [];
      }
    }), l = ge(() => (o.value.username || "??").charAt(0).toUpperCase()), f = ge(() => {
      const b = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], p = (o.value.username?.length || 0) % b.length;
      return { background: b[p] };
    }), c = ge(() => a.value.length > 0), h = (b) => {
      if (!b) return "";
      const [p, w] = b.split(":"), O = parseInt(p), M = O >= 12 ? "pm" : "am";
      return `${O % 12 || 12}${w !== "00" ? `:${w}` : ""}${M}`;
    }, y = ge(() => a.value.slice(0, 3).map((b) => ({
      dayShort: b.day?.substring(0, 3) || "Any",
      timeRange: b.start_time ? `${h(b.start_time)}-${h(b.end_time)}` : "Flexible",
      tooltip: `${b.day || "Any day"}: ${b.start_time || "Flexible"} - ${b.end_time || "Flexible"}`
    }))), x = ge(() => {
      if (a.value.length === 0) return "flexible";
      const b = a.value[0];
      if (!b.start_time) return "flexible";
      const p = parseInt(b.start_time.split(":")[0]);
      return p < 12 ? "morning" : p < 17 ? "afternoon" : "evening";
    }), g = () => {
      window.location.href = `/profile/${o.value.id}/`;
    };
    return (b, p) => (F(), D("div", Bc, [
      u("div", {
        class: "card-cover",
        style: Rt(f.value)
      }, [
        u("div", Hc, j(l.value), 1)
      ], 4),
      u("div", zc, [
        u("div", Vc, [
          u("div", null, [
            u("h3", qc, j(o.value.username), 1),
            u("div", Kc, [
              u("span", null, j(o.value.major), 1),
              p[2] || (p[2] = u("span", { class: "dot" }, "•", -1)),
              u("span", null, "Year " + j(o.value.year), 1)
            ])
          ]),
          u("div", Wc, [
            u("span", Jc, j(e.matchPercent), 1),
            p[3] || (p[3] = u("span", { class: "match-symbol" }, "%", -1))
          ])
        ]),
        u("div", {
          class: me(["stats-minimal", { "list-stats": r.value }])
        }, [
          u("div", Gc, [
            p[5] || (p[5] = u("span", { class: "stat-minimal-emoji" }, "📚", -1)),
            u("span", Yc, [
              u("span", Xc, j(i.value.length), 1),
              p[4] || (p[4] = u("span", { class: "stat-minimal-label" }, "courses", -1))
            ])
          ]),
          r.value ? he("", !0) : (F(), D("div", Qc)),
          u("div", Zc, [
            p[7] || (p[7] = u("span", { class: "stat-minimal-emoji" }, "⏰", -1)),
            u("span", ef, [
              u("span", tf, j(e.overlapHours) + "h", 1),
              p[6] || (p[6] = u("span", { class: "stat-minimal-label" }, "overlap", -1))
            ])
          ]),
          r.value ? he("", !0) : (F(), D("div", sf)),
          u("div", nf, [
            p[9] || (p[9] = u("span", { class: "stat-minimal-emoji" }, [
              u("i", { class: "fa-solid fa-clock" })
            ], -1)),
            u("span", rf, [
              u("span", of, j(x.value), 1),
              p[8] || (p[8] = u("span", { class: "stat-minimal-label" }, "pref", -1))
            ])
          ])
        ], 2),
        r.value ? (F(), D("div", af, [
          u("div", lf, [
            u("div", cf, [
              p[10] || (p[10] = u("div", { class: "section-title" }, [
                u("span", null, "📅"),
                u("span", null, "Schedule")
              ], -1)),
              c.value ? (F(), D("span", ff, j(a.value.length), 1)) : he("", !0)
            ]),
            c.value ? (F(), D("div", uf, [
              (F(!0), D(ce, null, ft(y.value.slice(0, 2), (w, O) => (F(), D("div", {
                key: O,
                class: "slot-chip list-chip",
                title: w.tooltip
              }, [
                u("span", pf, j(w.dayShort), 1),
                u("span", hf, j(w.timeRange), 1)
              ], 8, df))), 128)),
              a.value.length > 2 ? (F(), D("div", mf, " +" + j(a.value.length - 2), 1)) : he("", !0)
            ])) : (F(), D("div", gf, [...p[11] || (p[11] = [
              u("span", { class: "empty-text" }, "No availability", -1)
            ])]))
          ]),
          u("div", bf, [
            u("div", vf, [
              p[12] || (p[12] = u("div", { class: "section-title" }, [
                u("span", null, "🏷️"),
                u("span", null, "Courses")
              ], -1)),
              i.value.length > 0 ? (F(), D("span", yf, j(i.value.length), 1)) : he("", !0)
            ]),
            i.value.length > 0 ? (F(), D("div", _f, [
              (F(!0), D(ce, null, ft(i.value.slice(0, 2), (w) => (F(), D("span", {
                key: w,
                class: "course-chip list-chip"
              }, j(w), 1))), 128)),
              i.value.length > 2 ? (F(), D("span", xf, " +" + j(i.value.length - 2), 1)) : he("", !0)
            ])) : (F(), D("div", wf, [...p[13] || (p[13] = [
              u("span", { class: "empty-text" }, "No courses", -1)
            ])]))
          ])
        ])) : he("", !0),
        r.value ? he("", !0) : (F(), D(ce, { key: 1 }, [
          u("div", Sf, [
            u("div", Cf, [
              p[14] || (p[14] = u("div", { class: "section-title" }, [
                u("span", null, "📅"),
                u("span", null, "Schedule match")
              ], -1)),
              c.value ? (F(), D("span", Ef, j(a.value.length) + " slots", 1)) : he("", !0)
            ]),
            c.value ? (F(), D("div", Tf, [
              (F(!0), D(ce, null, ft(y.value, (w, O) => (F(), D("div", {
                key: O,
                class: "slot-chip",
                title: w.tooltip
              }, [
                u("span", Af, j(w.dayShort), 1),
                u("span", Of, j(w.timeRange), 1)
              ], 8, Rf))), 128)),
              a.value.length > 3 ? (F(), D("div", kf, " +" + j(a.value.length - 3), 1)) : he("", !0)
            ])) : (F(), D("div", Pf, [...p[15] || (p[15] = [
              u("span", { class: "empty-text" }, "No common availability", -1)
            ])]))
          ]),
          u("div", $f, [
            u("div", Nf, [
              p[16] || (p[16] = u("div", { class: "section-title" }, [
                u("span", null, "🏷️"),
                u("span", null, "Courses in common")
              ], -1)),
              i.value.length > 0 ? (F(), D("span", jf, j(i.value.length) + " total ", 1)) : he("", !0)
            ]),
            i.value.length > 0 ? (F(), D("div", Ff, [
              (F(!0), D(ce, null, ft(i.value.slice(0, 3), (w) => (F(), D("span", {
                key: w,
                class: "course-chip"
              }, j(w), 1))), 128)),
              i.value.length > 3 ? (F(), D("span", Df, " +" + j(i.value.length - 3), 1)) : he("", !0)
            ])) : (F(), D("div", Mf, [...p[17] || (p[17] = [
              u("span", { class: "empty-text" }, "No shared courses", -1)
            ])]))
          ])
        ], 64)),
        u("div", {
          class: me(["card-actions", { "list-actions": r.value }])
        }, [
          u("button", {
            class: "btn-profile",
            onClick: g
          }, [...p[18] || (p[18] = [
            u("span", null, "👤", -1),
            u("span", null, "View Profile", -1)
          ])]),
          u("button", {
            class: "btn-icon invite",
            onClick: p[0] || (p[0] = () => {
            }),
            title: "Invite to study group"
          }, [...p[19] || (p[19] = [
            u("span", null, "🤝", -1)
          ])]),
          u("button", {
            class: "btn-icon message",
            onClick: p[1] || (p[1] = () => {
            }),
            title: "Send message"
          }, [...p[20] || (p[20] = [
            u("span", null, "💬", -1)
          ])])
        ], 2)
      ])
    ]));
  }
}, Ii = /* @__PURE__ */ vs(If, [["styles", [Uc]], ["__scopeId", "data-v-17be2fa0"]]), Lf = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-ab17189e]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-ab17189e]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-ab17189e]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-ab17189e]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-ab17189e]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-ab17189e]{position:relative;width:52px;height:52px}.avatar-main[data-v-ab17189e]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-ab17189e]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-ab17189e]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-ab17189e]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-ab17189e]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-ab17189e]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-ab17189e]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-ab17189e]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-ab17189e]{color:#4f46e5}.vertical-divider[data-v-ab17189e]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-ab17189e]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-ab17189e]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-ab17189e]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-ab17189e]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-ab17189e]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-ab17189e]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-ab17189e]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-ab17189e]{flex-direction:column}.match-stats[data-v-ab17189e]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-ab17189e]{width:100%;justify-content:center}}', Uf = { class: "elegant-item-container" }, Bf = { class: "elegant-content" }, Hf = { class: "identity-block" }, zf = { class: "avatar-container" }, Vf = { class: "name-section" }, qf = { class: "username" }, Kf = { class: "major" }, Wf = { class: "match-stats" }, Jf = { class: "stat-group" }, Gf = { class: "stat-value highlight" }, Yf = { class: "stat-group" }, Xf = { class: "stat-value" }, Qf = { class: "stat-group" }, Zf = { class: "stat-value" }, eu = {
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
    const s = e, n = ge(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = ge(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), o = ge(() => (n.value.username || "??").charAt(0).toUpperCase()), i = ge(() => {
      const c = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], h = (n.value.username?.length || 0) % c.length;
      return { background: c[h] };
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
    return (c, h) => (F(), D("div", Uf, [
      u("div", {
        class: "glow-accent",
        style: Rt(i.value)
      }, null, 4),
      u("div", Bf, [
        u("div", Hf, [
          u("div", zf, [
            u("div", {
              class: "avatar-ring",
              style: Rt(c.avatarBorder)
            }, null, 4),
            u("div", {
              class: "avatar-main",
              style: Rt(i.value)
            }, j(o.value), 5)
          ]),
          u("div", Vf, [
            u("h3", qf, j(n.value.username), 1),
            u("p", Kf, j(n.value.major), 1)
          ])
        ]),
        u("div", Wf, [
          u("div", Jf, [
            h[1] || (h[1] = u("span", { class: "stat-label" }, "Match", -1)),
            u("span", Gf, [
              Ce(j(e.matchPercent), 1),
              h[0] || (h[0] = u("small", null, "%", -1))
            ])
          ]),
          h[6] || (h[6] = u("div", { class: "vertical-divider" }, null, -1)),
          u("div", Yf, [
            h[3] || (h[3] = u("span", { class: "stat-label" }, "Overlap", -1)),
            u("span", Xf, [
              Ce(j(e.overlapHours), 1),
              h[2] || (h[2] = u("small", null, "h", -1))
            ])
          ]),
          h[7] || (h[7] = u("div", { class: "vertical-divider" }, null, -1)),
          u("div", Qf, [
            h[5] || (h[5] = u("span", { class: "stat-label" }, "Shared", -1)),
            u("span", Zf, [
              Ce(j(r.value.length), 1),
              h[4] || (h[4] = u("small", null, "📚", -1))
            ])
          ])
        ]),
        u("div", { class: "action-block" }, [
          u("button", {
            class: "action-trigger primary",
            onClick: a
          }, [...h[8] || (h[8] = [
            u("span", null, "View", -1)
          ])]),
          u("button", {
            class: "action-trigger icon",
            onClick: f
          }, [...h[9] || (h[9] = [
            u("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          u("button", {
            class: "action-trigger icon",
            onClick: l
          }, [...h[10] || (h[10] = [
            u("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, Li = /* @__PURE__ */ vs(eu, [["styles", [Lf]], ["__scopeId", "data-v-ab17189e"]]), tu = ".discovery-container[data-v-f575c718]{max-width:1440px;margin:0 auto;padding:2.5rem 2rem;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.discovery-header[data-v-f575c718]{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.brand-title[data-v-f575c718]{font-size:1.8rem;font-weight:600;color:#1a1e2b;letter-spacing:-.02em;margin:0 0 .25rem}.brand-tagline[data-v-f575c718]{color:#6b7280;font-size:.9rem;font-weight:400;margin:0}.view-toggles[data-v-f575c718]{display:flex;gap:.5rem;background:#fff;padding:.25rem;border-radius:40px;border:1px solid #eef2f6;box-shadow:0 2px 8px #00000005}.toggle-btn[data-v-f575c718]{width:42px;height:42px;border-radius:40px;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.toggle-btn[data-v-f575c718]:hover{color:#4158d0;background:#f5f7ff}.toggle-btn.active[data-v-f575c718]{background:#4158d0;color:#fff;box-shadow:0 4px 10px #4158d033}.toggle-icon[data-v-f575c718]{font-size:1.3rem;line-height:1}.search-section[data-v-f575c718]{margin-bottom:2rem}.search-field[data-v-f575c718]{max-width:500px;position:relative}.search-icon[data-v-f575c718]{position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);font-size:1.1rem;color:#94a3b8;pointer-events:none}.search-input[data-v-f575c718]{width:100%;padding:1rem 1rem 1rem 3.5rem;font-size:.95rem;border:1px solid #eef2f6;border-radius:50px;background:#fff;box-shadow:0 4px 12px #00000005;transition:all .2s ease}.search-input[data-v-f575c718]:focus{outline:none;border-color:#4158d0;box-shadow:0 4px 16px #4158d014}.search-submit[data-v-f575c718]{position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;transition:all .2s}.search-submit[data-v-f575c718]:hover{background:#f1f5f9;color:#4158d0}.filters-bar[data-v-f575c718]{margin-bottom:2.5rem;border-bottom:1px solid #f0f2f5}.filter-tabs[data-v-f575c718]{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.75rem;scrollbar-width:none}.filter-tabs[data-v-f575c718]::-webkit-scrollbar{display:none}.filter-tab[data-v-f575c718]{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.2rem;border:none;background:transparent;color:#6b7280;font-size:.9rem;font-weight:500;cursor:pointer;border-radius:40px;transition:all .2s ease;white-space:nowrap}.filter-tab[data-v-f575c718]:hover{background:#f8fafc;color:#4158d0}.filter-tab.active[data-v-f575c718]{background:#f0f2ff;color:#4158d0}.tab-emoji[data-v-f575c718]{font-size:1.1rem}.tab-badge[data-v-f575c718]{background:#eef2f6;color:#64748b;padding:.15rem .5rem;border-radius:30px;font-size:.7rem;font-weight:500;margin-left:.25rem}.filter-tab.active .tab-badge[data-v-f575c718]{background:#fff;color:#4158d0}.results-section[data-v-f575c718]{min-height:400px}.results-grid[data-v-f575c718]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.results-list[data-v-f575c718]{display:flex;flex-direction:column;gap:1rem}.results-list[data-v-f575c718] .gallery-card{display:flex;flex-direction:row;height:auto}.results-list[data-v-f575c718] .card-cover{width:120px;height:auto;flex-shrink:0}.empty-state[data-v-f575c718]{text-align:center;padding:4rem 2rem;background:#fff;border-radius:32px;border:1px dashed #e2e8f0}.empty-illustration[data-v-f575c718]{font-size:4rem;margin-bottom:1.5rem;opacity:.7}.empty-title[data-v-f575c718]{font-size:1.3rem;font-weight:500;color:#1e293b;margin-bottom:.5rem}.empty-message[data-v-f575c718]{color:#94a3b8;font-size:.95rem;margin-bottom:1.5rem}.empty-reset[data-v-f575c718]{background:none;border:1px solid #e2e8f0;padding:.6rem 1.5rem;border-radius:40px;color:#64748b;font-size:.9rem;cursor:pointer;transition:all .2s}.empty-reset[data-v-f575c718]:hover{border-color:#4158d0;color:#4158d0;background:#f8faff}.fade-enter-active[data-v-f575c718],.fade-leave-active[data-v-f575c718]{transition:opacity .3s ease}.fade-enter-from[data-v-f575c718],.fade-leave-to[data-v-f575c718]{opacity:0}@media(max-width:768px){.discovery-container[data-v-f575c718]{padding:1.5rem 1rem}.discovery-header[data-v-f575c718]{flex-direction:column;align-items:flex-start;gap:1rem}.view-toggles[data-v-f575c718]{align-self:flex-end}.search-field[data-v-f575c718]{max-width:100%}.results-grid[data-v-f575c718]{grid-template-columns:1fr}}@media(max-width:480px){.filter-tab[data-v-f575c718]{padding:.5rem 1rem;font-size:.85rem}.empty-state[data-v-f575c718]{padding:2rem 1rem}}", su = { class: "discovery-container" }, nu = { class: "discovery-header" }, ru = { class: "view-toggles" }, ou = { class: "search-section" }, iu = { class: "search-field" }, au = { class: "filters-bar" }, lu = { class: "filter-tabs" }, cu = ["onClick"], fu = { class: "tab-emoji" }, uu = { class: "tab-name" }, du = {
  key: 0,
  class: "tab-badge"
}, pu = { class: "results-section" }, hu = {
  key: 1,
  class: "empty-state"
}, mu = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ He("grid"), n = /* @__PURE__ */ He(""), r = /* @__PURE__ */ He("all"), o = ge(() => {
      try {
        const y = JSON.parse(t.topMatches), x = y.reduce((w, O) => O.match_percent > 85 ? w += 1 : w, 0), g = y.reduce((w, O) => O.overlap_hours > 5 ? w += 1 : w, 0), b = JSON.parse(t.sameMajor), p = JSON.parse(t.sameMajor);
        return {
          all: y.length,
          best: x,
          schedule: g,
          major: b.length,
          course: p.length
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
    ], a = ge(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), l = ge(() => {
      try {
        return JSON.parse(a.value || "[]");
      } catch {
        return [];
      }
    }), f = ge(() => {
      let y = l.value;
      if (n.value) {
        const x = n.value.toLowerCase();
        y = y.filter(
          (g) => g.profile.username.toLowerCase().includes(x) || g.profile.major.toLowerCase().includes(x) || g.overlap_courses?.some(
            (b) => b.toLowerCase().includes(x)
          )
        );
      }
      switch (r.value) {
        case "high":
          y = y.filter((x) => x.match_percent >= 85);
          break;
        case "schedule":
          y = y.filter((x) => x.overlap_hours >= 5);
          break;
        case "courses":
          y = y.filter((x) => x.overlap_courses?.length >= 2);
          break;
      }
      return y;
    }), c = (y) => {
      console.log(`Connecting with ${y}`);
    }, h = () => {
      n.value = "", r.value = "all";
    };
    return Ps(l, (y) => {
    }), (y, x) => (F(), D("div", su, [
      u("div", nu, [
        x[6] || (x[6] = u("div", { class: "brand" }, [
          u("h1", { class: "brand-title" }, "StudySync"),
          u("p", { class: "brand-tagline" }, "Discover your ideal study partner")
        ], -1)),
        u("div", ru, [
          u("button", {
            class: me(["toggle-btn", { active: s.value === "grid" }]),
            onClick: x[0] || (x[0] = (g) => s.value = "grid"),
            "aria-label": "Grid view"
          }, [...x[4] || (x[4] = [
            u("span", { class: "toggle-icon" }, "⊞", -1)
          ])], 2),
          u("button", {
            class: me(["toggle-btn", { active: s.value === "list" }]),
            onClick: x[1] || (x[1] = (g) => s.value = "list"),
            "aria-label": "List view"
          }, [...x[5] || (x[5] = [
            u("span", { class: "toggle-icon" }, "≡", -1)
          ])], 2)
        ])
      ]),
      u("div", ou, [
        u("div", iu, [
          x[8] || (x[8] = u("span", { class: "search-icon" }, "🔍", -1)),
          Xa(u("input", {
            "onUpdate:modelValue": x[2] || (x[2] = (g) => n.value = g),
            type: "text",
            placeholder: "Search by name, course, or major...",
            class: "search-input"
          }, null, 512), [
            [$c, n.value]
          ]),
          n.value ? (F(), D("button", {
            key: 0,
            class: "search-submit",
            onClick: x[3] || (x[3] = (g) => n.value = "")
          }, [...x[7] || (x[7] = [
            u("span", { class: "clear-icon" }, "✕", -1)
          ])])) : he("", !0)
        ])
      ]),
      u("div", au, [
        u("div", lu, [
          (F(), D(ce, null, ft(i, (g) => u("button", {
            key: g.id,
            class: me(["filter-tab", { active: r.value === g.id }]),
            onClick: (b) => r.value = g.id
          }, [
            u("span", fu, j(g.icon), 1),
            u("span", uu, j(g.name), 1),
            g.count ? (F(), D("span", du, j(g.count), 1)) : he("", !0)
          ], 10, cu)), 64))
        ])
      ]),
      u("div", pu, [
        xe(fc, {
          name: "fade",
          mode: "out-in"
        }, {
          default: ei(() => [
            f.value.length > 0 ? (F(), D("div", {
              key: 0,
              class: me(["results-grid", { "results-list": s.value === "list" }])
            }, [
              s.value === "grid" ? (F(!0), D(ce, { key: 0 }, ft(f.value, (g, b) => (F(), Mn(Ii, {
                key: b,
                profile: g.profile,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: c
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (F(!0), D(ce, { key: 1 }, ft(f.value, (g, b) => (F(), Mn(Li, {
                profile: g.profile,
                key: g.profile.username.substring(0, 2) + b,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: c
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (F(), D("div", hu, [
              x[9] || (x[9] = u("div", { class: "empty-illustration" }, "🔍", -1)),
              x[10] || (x[10] = u("h3", { class: "empty-title" }, "No matches found", -1)),
              x[11] || (x[11] = u("p", { class: "empty-message" }, " Try adjusting your filters or search criteria ", -1)),
              u("button", {
                class: "empty-reset",
                onClick: h
              }, " Clear all filters ")
            ]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}, gu = /* @__PURE__ */ vs(mu, [["styles", [tu]], ["__scopeId", "data-v-f575c718"]]);
function Ui(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: bu } = Object.prototype, { getPrototypeOf: fr } = Object, { iterator: rn, toStringTag: Bi } = Symbol, on = /* @__PURE__ */ ((e) => (t) => {
  const s = bu.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), We = (e) => (e = e.toLowerCase(), (t) => on(t) === e), an = (e) => (t) => typeof t === e, { isArray: Vt } = Array, zt = an("undefined");
function ys(e) {
  return e !== null && !zt(e) && e.constructor !== null && !zt(e.constructor) && $e(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Hi = We("ArrayBuffer");
function vu(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Hi(e.buffer), t;
}
const yu = an("string"), $e = an("function"), zi = an("number"), _s = (e) => e !== null && typeof e == "object", _u = (e) => e === !0 || e === !1, Fs = (e) => {
  if (on(e) !== "object")
    return !1;
  const t = fr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Bi in e) && !(rn in e);
}, xu = (e) => {
  if (!_s(e) || ys(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, wu = We("Date"), Su = We("File"), Cu = We("Blob"), Eu = We("FileList"), Tu = (e) => _s(e) && $e(e.pipe), Ru = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || $e(e.append) && ((t = on(e)) === "formdata" || // detect form-data instance
  t === "object" && $e(e.toString) && e.toString() === "[object FormData]"));
}, Au = We("URLSearchParams"), [Ou, ku, Pu, $u] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(We), Nu = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function xs(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, r;
  if (typeof e != "object" && (e = [e]), Vt(e))
    for (n = 0, r = e.length; n < r; n++)
      t.call(null, e[n], n, e);
  else {
    if (ys(e))
      return;
    const o = s ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (n = 0; n < i; n++)
      a = o[n], t.call(null, e[a], a, e);
  }
}
function Vi(e, t) {
  if (ys(e))
    return null;
  t = t.toLowerCase();
  const s = Object.keys(e);
  let n = s.length, r;
  for (; n-- > 0; )
    if (r = s[n], t === r.toLowerCase())
      return r;
  return null;
}
const Tt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, qi = (e) => !zt(e) && e !== Tt;
function Un() {
  const { caseless: e, skipUndefined: t } = qi(this) && this || {}, s = {}, n = (r, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && Vi(s, o) || o;
    Fs(s[i]) && Fs(r) ? s[i] = Un(s[i], r) : Fs(r) ? s[i] = Un({}, r) : Vt(r) ? s[i] = r.slice() : (!t || !zt(r)) && (s[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && xs(arguments[r], n);
  return s;
}
const ju = (e, t, s, { allOwnKeys: n } = {}) => (xs(
  t,
  (r, o) => {
    s && $e(r) ? Object.defineProperty(e, o, {
      value: Ui(r, s),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, o, {
      value: r,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: n }
), e), Fu = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Du = (e, t, s, n) => {
  e.prototype = Object.create(
    t.prototype,
    n
  ), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), s && Object.assign(e.prototype, s);
}, Mu = (e, t, s, n) => {
  let r, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!n || n(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = s !== !1 && fr(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, Iu = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const n = e.indexOf(t, s);
  return n !== -1 && n === s;
}, Lu = (e) => {
  if (!e) return null;
  if (Vt(e)) return e;
  let t = e.length;
  if (!zi(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, Uu = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && fr(Uint8Array)), Bu = (e, t) => {
  const n = (e && e[rn]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, Hu = (e, t) => {
  let s;
  const n = [];
  for (; (s = e.exec(t)) !== null; )
    n.push(s);
  return n;
}, zu = We("HTMLFormElement"), Vu = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(s, n, r) {
  return n.toUpperCase() + r;
}), io = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), qu = We("RegExp"), Ki = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), n = {};
  xs(s, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (n[o] = i || r);
  }), Object.defineProperties(e, n);
}, Ku = (e) => {
  Ki(e, (t, s) => {
    if ($e(e) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = e[s];
    if ($e(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Wu = (e, t) => {
  const s = {}, n = (r) => {
    r.forEach((o) => {
      s[o] = !0;
    });
  };
  return Vt(e) ? n(e) : n(String(e).split(t)), s;
}, Ju = () => {
}, Gu = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Yu(e) {
  return !!(e && $e(e.append) && e[Bi] === "FormData" && e[rn]);
}
const Xu = (e) => {
  const t = new Array(10), s = (n, r) => {
    if (_s(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (ys(n))
        return n;
      if (!("toJSON" in n)) {
        t[r] = n;
        const o = Vt(n) ? [] : {};
        return xs(n, (i, a) => {
          const l = s(i, r + 1);
          !zt(l) && (o[a] = l);
        }), t[r] = void 0, o;
      }
    }
    return n;
  };
  return s(e, 0);
}, Qu = We("AsyncFunction"), Zu = (e) => e && (_s(e) || $e(e)) && $e(e.then) && $e(e.catch), Wi = ((e, t) => e ? setImmediate : t ? ((s, n) => (Tt.addEventListener(
  "message",
  ({ source: r, data: o }) => {
    r === Tt && o === s && n.length && n.shift()();
  },
  !1
), (r) => {
  n.push(r), Tt.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(typeof setImmediate == "function", $e(Tt.postMessage)), ed = typeof queueMicrotask < "u" ? queueMicrotask.bind(Tt) : typeof process < "u" && process.nextTick || Wi, td = (e) => e != null && $e(e[rn]), v = {
  isArray: Vt,
  isArrayBuffer: Hi,
  isBuffer: ys,
  isFormData: Ru,
  isArrayBufferView: vu,
  isString: yu,
  isNumber: zi,
  isBoolean: _u,
  isObject: _s,
  isPlainObject: Fs,
  isEmptyObject: xu,
  isReadableStream: Ou,
  isRequest: ku,
  isResponse: Pu,
  isHeaders: $u,
  isUndefined: zt,
  isDate: wu,
  isFile: Su,
  isBlob: Cu,
  isRegExp: qu,
  isFunction: $e,
  isStream: Tu,
  isURLSearchParams: Au,
  isTypedArray: Uu,
  isFileList: Eu,
  forEach: xs,
  merge: Un,
  extend: ju,
  trim: Nu,
  stripBOM: Fu,
  inherits: Du,
  toFlatObject: Mu,
  kindOf: on,
  kindOfTest: We,
  endsWith: Iu,
  toArray: Lu,
  forEachEntry: Bu,
  matchAll: Hu,
  isHTMLForm: zu,
  hasOwnProperty: io,
  hasOwnProp: io,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ki,
  freezeMethods: Ku,
  toObjectSet: Wu,
  toCamelCase: Vu,
  noop: Ju,
  toFiniteNumber: Gu,
  findKey: Vi,
  global: Tt,
  isContextDefined: qi,
  isSpecCompliantForm: Yu,
  toJSONObject: Xu,
  isAsyncFn: Qu,
  isThenable: Zu,
  setImmediate: Wi,
  asap: ed,
  isIterable: td
};
let B = class Ji extends Error {
  static from(t, s, n, r, o, i) {
    const a = new Ji(t.message, s || t.code, n, r, o);
    return a.cause = t, a.name = t.name, i && Object.assign(a, i), a;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, s, n, r, o) {
    super(t), this.name = "AxiosError", this.isAxiosError = !0, s && (this.code = s), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status);
  }
  toJSON() {
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
      config: v.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
B.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
B.ERR_BAD_OPTION = "ERR_BAD_OPTION";
B.ECONNABORTED = "ECONNABORTED";
B.ETIMEDOUT = "ETIMEDOUT";
B.ERR_NETWORK = "ERR_NETWORK";
B.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
B.ERR_DEPRECATED = "ERR_DEPRECATED";
B.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
B.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
B.ERR_CANCELED = "ERR_CANCELED";
B.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
B.ERR_INVALID_URL = "ERR_INVALID_URL";
const sd = null;
function Bn(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function Gi(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ao(e, t, s) {
  return e ? e.concat(t).map(function(r, o) {
    return r = Gi(r), !s && o ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function nd(e) {
  return v.isArray(e) && !e.some(Bn);
}
const rd = v.toFlatObject(v, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ln(e, t, s) {
  if (!v.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = v.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, p) {
    return !v.isUndefined(p[b]);
  });
  const n = s.metaTokens, r = s.visitor || c, o = s.dots, i = s.indexes, l = (s.Blob || typeof Blob < "u" && Blob) && v.isSpecCompliantForm(t);
  if (!v.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (v.isDate(g))
      return g.toISOString();
    if (v.isBoolean(g))
      return g.toString();
    if (!l && v.isBlob(g))
      throw new B("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(g) || v.isTypedArray(g) ? l && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function c(g, b, p) {
    let w = g;
    if (g && !p && typeof g == "object") {
      if (v.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), g = JSON.stringify(g);
      else if (v.isArray(g) && nd(g) || (v.isFileList(g) || v.endsWith(b, "[]")) && (w = v.toArray(g)))
        return b = Gi(b), w.forEach(function(M, P) {
          !(v.isUndefined(M) || M === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ao([b], P, o) : i === null ? b : b + "[]",
            f(M)
          );
        }), !1;
    }
    return Bn(g) ? !0 : (t.append(ao(p, b, o), f(g)), !1);
  }
  const h = [], y = Object.assign(rd, {
    defaultVisitor: c,
    convertValue: f,
    isVisitable: Bn
  });
  function x(g, b) {
    if (!v.isUndefined(g)) {
      if (h.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      h.push(g), v.forEach(g, function(w, O) {
        (!(v.isUndefined(w) || w === null) && r.call(
          t,
          w,
          v.isString(O) ? O.trim() : O,
          b,
          y
        )) === !0 && x(w, b ? b.concat(O) : [O]);
      }), h.pop();
    }
  }
  if (!v.isObject(e))
    throw new TypeError("data must be an object");
  return x(e), t;
}
function lo(e) {
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
    return t.call(this, n, lo);
  } : lo;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function od(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Xi(e, t, s) {
  if (!t)
    return e;
  const n = s && s.encode || od, r = v.isFunction(s) ? {
    serialize: s
  } : s, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = v.isURLSearchParams(t) ? t.toString() : new ur(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class co {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
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
    v.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const dr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, id = typeof URLSearchParams < "u" ? URLSearchParams : ur, ad = typeof FormData < "u" ? FormData : null, ld = typeof Blob < "u" ? Blob : null, cd = {
  isBrowser: !0,
  classes: {
    URLSearchParams: id,
    FormData: ad,
    Blob: ld
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, pr = typeof window < "u" && typeof document < "u", Hn = typeof navigator == "object" && navigator || void 0, fd = pr && (!Hn || ["ReactNative", "NativeScript", "NS"].indexOf(Hn.product) < 0), ud = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", dd = pr && window.location.href || "http://localhost", pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: pr,
  hasStandardBrowserEnv: fd,
  hasStandardBrowserWebWorkerEnv: ud,
  navigator: Hn,
  origin: dd
}, Symbol.toStringTag, { value: "Module" })), _e = {
  ...pd,
  ...cd
};
function hd(e, t) {
  return ln(e, new _e.classes.URLSearchParams(), {
    visitor: function(s, n, r, o) {
      return _e.isNode && v.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function md(e) {
  return v.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function gd(e) {
  const t = {}, s = Object.keys(e);
  let n;
  const r = s.length;
  let o;
  for (n = 0; n < r; n++)
    o = s[n], t[o] = e[o];
  return t;
}
function Qi(e) {
  function t(s, n, r, o) {
    let i = s[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), l = o >= s.length;
    return i = !i && v.isArray(r) ? r.length : i, l ? (v.hasOwnProp(r, i) ? r[i] = [r[i], n] : r[i] = n, !a) : ((!r[i] || !v.isObject(r[i])) && (r[i] = []), t(s, n, r[i], o) && v.isArray(r[i]) && (r[i] = gd(r[i])), !a);
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const s = {};
    return v.forEachEntry(e, (n, r) => {
      t(md(n), r, s, 0);
    }), s;
  }
  return null;
}
function bd(e, t, s) {
  if (v.isString(e))
    try {
      return (t || JSON.parse)(e), v.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(e);
}
const ws = {
  transitional: dr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, s) {
    const n = s.getContentType() || "", r = n.indexOf("application/json") > -1, o = v.isObject(t);
    if (o && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t))
      return r ? JSON.stringify(Qi(t)) : t;
    if (v.isArrayBuffer(t) || v.isBuffer(t) || v.isStream(t) || v.isFile(t) || v.isBlob(t) || v.isReadableStream(t))
      return t;
    if (v.isArrayBufferView(t))
      return t.buffer;
    if (v.isURLSearchParams(t))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return hd(t, this.formSerializer).toString();
      if ((a = v.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return ln(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || r ? (s.setContentType("application/json", !1), bd(t)) : t;
  }],
  transformResponse: [function(t) {
    const s = this.transitional || ws.transitional, n = s && s.forcedJSONParsing, r = this.responseType === "json";
    if (v.isResponse(t) || v.isReadableStream(t))
      return t;
    if (t && v.isString(t) && (n && !this.responseType || r)) {
      const i = !(s && s.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? B.from(a, B.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
v.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ws.headers[e] = {};
});
const vd = v.toObjectSet([
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
]), yd = (e) => {
  const t = {};
  let s, n, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), s = i.substring(0, r).trim().toLowerCase(), n = i.substring(r + 1).trim(), !(!s || t[s] && vd[s]) && (s === "set-cookie" ? t[s] ? t[s].push(n) : t[s] = [n] : t[s] = t[s] ? t[s] + ", " + n : n);
  }), t;
}, fo = /* @__PURE__ */ Symbol("internals");
function Xt(e) {
  return e && String(e).trim().toLowerCase();
}
function Ds(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(Ds) : String(e);
}
function _d(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const xd = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Sn(e, t, s, n, r) {
  if (v.isFunction(n))
    return n.call(this, t, s);
  if (r && (t = s), !!v.isString(t)) {
    if (v.isString(n))
      return t.indexOf(n) !== -1;
    if (v.isRegExp(n))
      return n.test(t);
  }
}
function wd(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, n) => s.toUpperCase() + n);
}
function Sd(e, t) {
  const s = v.toCamelCase(" " + t);
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
      const c = Xt(l);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const h = v.findKey(r, c);
      (!h || r[h] === void 0 || f === !0 || f === void 0 && r[h] !== !1) && (r[h || l] = Ds(a));
    }
    const i = (a, l) => v.forEach(a, (f, c) => o(f, c, l));
    if (v.isPlainObject(t) || t instanceof this.constructor)
      i(t, s);
    else if (v.isString(t) && (t = t.trim()) && !xd(t))
      i(yd(t), s);
    else if (v.isObject(t) && v.isIterable(t)) {
      let a = {}, l, f;
      for (const c of t) {
        if (!v.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        a[f = c[0]] = (l = a[f]) ? v.isArray(l) ? [...l, c[1]] : [l, c[1]] : c[1];
      }
      i(a, s);
    } else
      t != null && o(s, t, n);
    return this;
  }
  get(t, s) {
    if (t = Xt(t), t) {
      const n = v.findKey(this, t);
      if (n) {
        const r = this[n];
        if (!s)
          return r;
        if (s === !0)
          return _d(r);
        if (v.isFunction(s))
          return s.call(this, r, n);
        if (v.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = Xt(t), t) {
      const n = v.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!s || Sn(this, this[n], n, s)));
    }
    return !1;
  }
  delete(t, s) {
    const n = this;
    let r = !1;
    function o(i) {
      if (i = Xt(i), i) {
        const a = v.findKey(n, i);
        a && (!s || Sn(n, n[a], a, s)) && (delete n[a], r = !0);
      }
    }
    return v.isArray(t) ? t.forEach(o) : o(t), r;
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
    return v.forEach(this, (r, o) => {
      const i = v.findKey(n, o);
      if (i) {
        s[i] = Ds(r), delete s[o];
        return;
      }
      const a = t ? wd(o) : String(o).trim();
      a !== o && delete s[o], s[a] = Ds(r), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const s = /* @__PURE__ */ Object.create(null);
    return v.forEach(this, (n, r) => {
      n != null && n !== !1 && (s[r] = t && v.isArray(n) ? n.join(", ") : n);
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
    const n = (this[fo] = this[fo] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const a = Xt(i);
      n[a] || (Sd(r, i), n[a] = !0);
    }
    return v.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ne.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
v.reduceDescriptors(Ne.prototype, ({ value: e }, t) => {
  let s = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[s] = n;
    }
  };
});
v.freezeMethods(Ne);
function Cn(e, t) {
  const s = this || ws, n = t || s, r = Ne.from(n.headers);
  let o = n.data;
  return v.forEach(e, function(a) {
    o = a.call(s, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function Zi(e) {
  return !!(e && e.__CANCEL__);
}
let Ss = class extends B {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, s, n) {
    super(t ?? "canceled", B.ERR_CANCELED, s, n), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function ea(e, t, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? e(s) : t(new B(
    "Request failed with status code " + s.status,
    [B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
function Cd(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ed(e, t) {
  e = e || 10;
  const s = new Array(e), n = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const f = Date.now(), c = n[o];
    i || (i = f), s[r] = l, n[r] = f;
    let h = o, y = 0;
    for (; h !== r; )
      y += s[h++], h = h % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), f - i < t)
      return;
    const x = c && f - c;
    return x ? Math.round(y * 1e3 / x) : void 0;
  };
}
function Td(e, t) {
  let s = 0, n = 1e3 / t, r, o;
  const i = (f, c = Date.now()) => {
    s = c, r = null, o && (clearTimeout(o), o = null), e(...f);
  };
  return [(...f) => {
    const c = Date.now(), h = c - s;
    h >= n ? i(f, c) : (r = f, o || (o = setTimeout(() => {
      o = null, i(r);
    }, n - h)));
  }, () => r && i(r)];
}
const Ks = (e, t, s = 3) => {
  let n = 0;
  const r = Ed(50, 250);
  return Td((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, l = i - n, f = r(l), c = i <= a;
    n = i;
    const h = {
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
    e(h);
  }, s);
}, uo = (e, t) => {
  const s = e != null;
  return [(n) => t[0]({
    lengthComputable: s,
    total: e,
    loaded: n
  }), t[1]];
}, po = (e) => (...t) => v.asap(() => e(...t)), Rd = _e.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, _e.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(_e.origin),
  _e.navigator && /(msie|trident)/i.test(_e.navigator.userAgent)
) : () => !0, Ad = _e.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, n, r, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      v.isNumber(s) && a.push(`expires=${new Date(s).toUTCString()}`), v.isString(n) && a.push(`path=${n}`), v.isString(r) && a.push(`domain=${r}`), o === !0 && a.push("secure"), v.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
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
function Od(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function kd(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ta(e, t, s) {
  let n = !Od(t);
  return e && (n || s == !1) ? kd(e, t) : t;
}
const ho = (e) => e instanceof Ne ? { ...e } : e;
function Pt(e, t) {
  t = t || {};
  const s = {};
  function n(f, c, h, y) {
    return v.isPlainObject(f) && v.isPlainObject(c) ? v.merge.call({ caseless: y }, f, c) : v.isPlainObject(c) ? v.merge({}, c) : v.isArray(c) ? c.slice() : c;
  }
  function r(f, c, h, y) {
    if (v.isUndefined(c)) {
      if (!v.isUndefined(f))
        return n(void 0, f, h, y);
    } else return n(f, c, h, y);
  }
  function o(f, c) {
    if (!v.isUndefined(c))
      return n(void 0, c);
  }
  function i(f, c) {
    if (v.isUndefined(c)) {
      if (!v.isUndefined(f))
        return n(void 0, f);
    } else return n(void 0, c);
  }
  function a(f, c, h) {
    if (h in t)
      return n(f, c);
    if (h in e)
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
    headers: (f, c, h) => r(ho(f), ho(c), h, !0)
  };
  return v.forEach(
    Object.keys({ ...e, ...t }),
    function(c) {
      if (c === "__proto__" || c === "constructor" || c === "prototype")
        return;
      const h = v.hasOwnProp(l, c) ? l[c] : r, y = h(e[c], t[c], c);
      v.isUndefined(y) && h !== a || (s[c] = y);
    }
  ), s;
}
const sa = (e) => {
  const t = Pt({}, e);
  let { data: s, withXSRFToken: n, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = Ne.from(i), t.url = Xi(ta(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  ), v.isFormData(s)) {
    if (_e.hasStandardBrowserEnv || _e.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (v.isFunction(s.getHeaders)) {
      const l = s.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(l).forEach(([c, h]) => {
        f.includes(c.toLowerCase()) && i.set(c, h);
      });
    }
  }
  if (_e.hasStandardBrowserEnv && (n && v.isFunction(n) && (n = n(t)), n || n !== !1 && Rd(t.url))) {
    const l = r && o && Ad.read(o);
    l && i.set(r, l);
  }
  return t;
}, Pd = typeof XMLHttpRequest < "u", $d = Pd && function(e) {
  return new Promise(function(s, n) {
    const r = sa(e);
    let o = r.data;
    const i = Ne.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: f } = r, c, h, y, x, g;
    function b() {
      x && x(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let p = new XMLHttpRequest();
    p.open(r.method.toUpperCase(), r.url, !0), p.timeout = r.timeout;
    function w() {
      if (!p)
        return;
      const M = Ne.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), q = {
        data: !a || a === "text" || a === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: M,
        config: e,
        request: p
      };
      ea(function(te) {
        s(te), b();
      }, function(te) {
        n(te), b();
      }, q), p = null;
    }
    "onloadend" in p ? p.onloadend = w : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, p.onabort = function() {
      p && (n(new B("Request aborted", B.ECONNABORTED, e, p)), p = null);
    }, p.onerror = function(P) {
      const q = P && P.message ? P.message : "Network Error", re = new B(q, B.ERR_NETWORK, e, p);
      re.event = P || null, n(re), p = null;
    }, p.ontimeout = function() {
      let P = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const q = r.transitional || dr;
      r.timeoutErrorMessage && (P = r.timeoutErrorMessage), n(new B(
        P,
        q.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
        e,
        p
      )), p = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in p && v.forEach(i.toJSON(), function(P, q) {
      p.setRequestHeader(q, P);
    }), v.isUndefined(r.withCredentials) || (p.withCredentials = !!r.withCredentials), a && a !== "json" && (p.responseType = r.responseType), f && ([y, g] = Ks(f, !0), p.addEventListener("progress", y)), l && p.upload && ([h, x] = Ks(l), p.upload.addEventListener("progress", h), p.upload.addEventListener("loadend", x)), (r.cancelToken || r.signal) && (c = (M) => {
      p && (n(!M || M.type ? new Ss(null, e, p) : M), p.abort(), p = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const O = Cd(r.url);
    if (O && _e.protocols.indexOf(O) === -1) {
      n(new B("Unsupported protocol " + O + ":", B.ERR_BAD_REQUEST, e));
      return;
    }
    p.send(o || null);
  });
}, Nd = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let n = new AbortController(), r;
    const o = function(f) {
      if (!r) {
        r = !0, a();
        const c = f instanceof Error ? f : this.reason;
        n.abort(c instanceof B ? c : new Ss(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new B(`timeout of ${t}ms exceeded`, B.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(o) : f.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", o));
    const { signal: l } = n;
    return l.unsubscribe = () => v.asap(a), l;
  }
}, jd = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let n = 0, r;
  for (; n < s; )
    r = n + t, yield e.slice(n, r), n = r;
}, Fd = async function* (e, t) {
  for await (const s of Dd(e))
    yield* jd(s, t);
}, Dd = async function* (e) {
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
}, mo = (e, t, s, n) => {
  const r = Fd(e, t);
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
        let h = c.byteLength;
        if (s) {
          let y = o += h;
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
}, go = 64 * 1024, { isFunction: Os } = v, Md = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(v.global), {
  ReadableStream: bo,
  TextEncoder: vo
} = v.global, yo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Id = (e) => {
  e = v.merge.call({
    skipUndefined: !0
  }, Md, e);
  const { fetch: t, Request: s, Response: n } = e, r = t ? Os(t) : typeof fetch == "function", o = Os(s), i = Os(n);
  if (!r)
    return !1;
  const a = r && Os(bo), l = r && (typeof vo == "function" ? /* @__PURE__ */ ((g) => (b) => g.encode(b))(new vo()) : async (g) => new Uint8Array(await new s(g).arrayBuffer())), f = o && a && yo(() => {
    let g = !1;
    const b = new s(_e.origin, {
      body: new bo(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !b;
  }), c = i && a && yo(() => v.isReadableStream(new n("").body)), h = {
    stream: c && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !h[g] && (h[g] = (b, p) => {
      let w = b && b[g];
      if (w)
        return w.call(b);
      throw new B(`Response type '${g}' is not supported`, B.ERR_NOT_SUPPORT, p);
    });
  });
  const y = async (g) => {
    if (g == null)
      return 0;
    if (v.isBlob(g))
      return g.size;
    if (v.isSpecCompliantForm(g))
      return (await new s(_e.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (v.isArrayBufferView(g) || v.isArrayBuffer(g))
      return g.byteLength;
    if (v.isURLSearchParams(g) && (g = g + ""), v.isString(g))
      return (await l(g)).byteLength;
  }, x = async (g, b) => {
    const p = v.toFiniteNumber(g.getContentLength());
    return p ?? y(b);
  };
  return async (g) => {
    let {
      url: b,
      method: p,
      data: w,
      signal: O,
      cancelToken: M,
      timeout: P,
      onDownloadProgress: q,
      onUploadProgress: re,
      responseType: te,
      headers: pe,
      withCredentials: z = "same-origin",
      fetchOptions: G
    } = sa(g), oe = t || fetch;
    te = te ? (te + "").toLowerCase() : "text";
    let N = Nd([O, M && M.toAbortSignal()], P), Q = null;
    const fe = N && N.unsubscribe && (() => {
      N.unsubscribe();
    });
    let De;
    try {
      if (re && f && p !== "get" && p !== "head" && (De = await x(pe, w)) !== 0) {
        let ve = new s(b, {
          method: "POST",
          body: w,
          duplex: "half"
        }), be;
        if (v.isFormData(w) && (be = ve.headers.get("content-type")) && pe.setContentType(be), ve.body) {
          const [Nt, jt] = uo(
            De,
            Ks(po(re))
          );
          w = mo(ve.body, go, Nt, jt);
        }
      }
      v.isString(z) || (z = z ? "include" : "omit");
      const J = o && "credentials" in s.prototype, ie = {
        ...G,
        signal: N,
        method: p.toUpperCase(),
        headers: pe.normalize().toJSON(),
        body: w,
        duplex: "half",
        credentials: J ? z : void 0
      };
      Q = o && new s(b, ie);
      let K = await (o ? oe(Q, G) : oe(b, ie));
      const Je = c && (te === "stream" || te === "response");
      if (c && (q || Je && fe)) {
        const ve = {};
        ["status", "statusText", "headers"].forEach((Cs) => {
          ve[Cs] = K[Cs];
        });
        const be = v.toFiniteNumber(K.headers.get("content-length")), [Nt, jt] = q && uo(
          be,
          Ks(po(q), !0)
        ) || [];
        K = new n(
          mo(K.body, go, Nt, () => {
            jt && jt(), fe && fe();
          }),
          ve
        );
      }
      te = te || "text";
      let $t = await h[v.findKey(h, te) || "text"](K, g);
      return !Je && fe && fe(), await new Promise((ve, be) => {
        ea(ve, be, {
          data: $t,
          headers: Ne.from(K.headers),
          status: K.status,
          statusText: K.statusText,
          config: g,
          request: Q
        });
      });
    } catch (J) {
      throw fe && fe(), J && J.name === "TypeError" && /Load failed|fetch/i.test(J.message) ? Object.assign(
        new B("Network Error", B.ERR_NETWORK, g, Q, J && J.response),
        {
          cause: J.cause || J
        }
      ) : B.from(J, J && J.code, g, Q, J && J.response);
    }
  };
}, Ld = /* @__PURE__ */ new Map(), na = (e) => {
  let t = e && e.env || {};
  const { fetch: s, Request: n, Response: r } = t, o = [
    n,
    r,
    s
  ];
  let i = o.length, a = i, l, f, c = Ld;
  for (; a--; )
    l = o[a], f = c.get(l), f === void 0 && c.set(l, f = a ? /* @__PURE__ */ new Map() : Id(t)), c = f;
  return f;
};
na();
const hr = {
  http: sd,
  xhr: $d,
  fetch: {
    get: na
  }
};
v.forEach(hr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const _o = (e) => `- ${e}`, Ud = (e) => v.isFunction(e) || e === null || e === !1;
function Bd(e, t) {
  e = v.isArray(e) ? e : [e];
  const { length: s } = e;
  let n, r;
  const o = {};
  for (let i = 0; i < s; i++) {
    n = e[i];
    let a;
    if (r = n, !Ud(n) && (r = hr[(a = String(n)).toLowerCase()], r === void 0))
      throw new B(`Unknown adapter '${a}'`);
    if (r && (v.isFunction(r) || (r = r.get(t))))
      break;
    o[a || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([l, f]) => `adapter ${l} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = s ? i.length > 1 ? `since :
` + i.map(_o).join(`
`) : " " + _o(i[0]) : "as no adapter specified";
    throw new B(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const ra = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Bd,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: hr
};
function En(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ss(null, e);
}
function xo(e) {
  return En(e), e.headers = Ne.from(e.headers), e.data = Cn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ra.getAdapter(e.adapter || ws.adapter, e)(e).then(function(n) {
    return En(e), n.data = Cn.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Ne.from(n.headers), n;
  }, function(n) {
    return Zi(n) || (En(e), n && n.response && (n.response.data = Cn.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Ne.from(n.response.headers))), Promise.reject(n);
  });
}
const oa = "1.13.5", cn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  cn[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const wo = {};
cn.transitional = function(t, s, n) {
  function r(o, i) {
    return "[Axios v" + oa + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new B(
        r(i, " has been removed" + (s ? " in " + s : "")),
        B.ERR_DEPRECATED
      );
    return s && !wo[i] && (wo[i] = !0, console.warn(
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
function Hd(e, t, s) {
  if (typeof e != "object")
    throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let r = n.length;
  for (; r-- > 0; ) {
    const o = n[r], i = t[o];
    if (i) {
      const a = e[o], l = a === void 0 || i(a, o, e);
      if (l !== !0)
        throw new B("option " + o + " must be " + l, B.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new B("Unknown option " + o, B.ERR_BAD_OPTION);
  }
}
const Ms = {
  assertOptions: Hd,
  validators: cn
}, Ie = Ms.validators;
let kt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new co(),
      response: new co()
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
    typeof t == "string" ? (s = s || {}, s.url = t) : s = t || {}, s = Pt(this.defaults, s);
    const { transitional: n, paramsSerializer: r, headers: o } = s;
    n !== void 0 && Ms.assertOptions(n, {
      silentJSONParsing: Ie.transitional(Ie.boolean),
      forcedJSONParsing: Ie.transitional(Ie.boolean),
      clarifyTimeoutError: Ie.transitional(Ie.boolean),
      legacyInterceptorReqResOrdering: Ie.transitional(Ie.boolean)
    }, !1), r != null && (v.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : Ms.assertOptions(r, {
      encode: Ie.function,
      serialize: Ie.function
    }, !0)), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), Ms.assertOptions(s, {
      baseUrl: Ie.spelling("baseURL"),
      withXsrfToken: Ie.spelling("withXSRFToken")
    }, !0), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let i = o && v.merge(
      o.common,
      o[s.method]
    );
    o && v.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete o[g];
      }
    ), s.headers = Ne.concat(i, o);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(s) === !1)
        return;
      l = l && b.synchronous;
      const p = s.transitional || dr;
      p && p.legacyInterceptorReqResOrdering ? a.unshift(b.fulfilled, b.rejected) : a.push(b.fulfilled, b.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(b) {
      f.push(b.fulfilled, b.rejected);
    });
    let c, h = 0, y;
    if (!l) {
      const g = [xo.bind(this), void 0];
      for (g.unshift(...a), g.push(...f), y = g.length, c = Promise.resolve(s); h < y; )
        c = c.then(g[h++], g[h++]);
      return c;
    }
    y = a.length;
    let x = s;
    for (; h < y; ) {
      const g = a[h++], b = a[h++];
      try {
        x = g(x);
      } catch (p) {
        b.call(this, p);
        break;
      }
    }
    try {
      c = xo.call(this, x);
    } catch (g) {
      return Promise.reject(g);
    }
    for (h = 0, y = f.length; h < y; )
      c = c.then(f[h++], f[h++]);
    return c;
  }
  getUri(t) {
    t = Pt(this.defaults, t);
    const s = ta(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Xi(s, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function(t) {
  kt.prototype[t] = function(s, n) {
    return this.request(Pt(n || {}, {
      method: t,
      url: s,
      data: (n || {}).data
    }));
  };
});
v.forEach(["post", "put", "patch"], function(t) {
  function s(n) {
    return function(o, i, a) {
      return this.request(Pt(a || {}, {
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
let zd = class ia {
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
      n.reason || (n.reason = new Ss(o, i, a), s(n.reason));
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
      token: new ia(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Vd(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function qd(e) {
  return v.isObject(e) && e.isAxiosError === !0;
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
function aa(e) {
  const t = new kt(e), s = Ui(kt.prototype.request, t);
  return v.extend(s, kt.prototype, t, { allOwnKeys: !0 }), v.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return aa(Pt(e, r));
  }, s;
}
const se = aa(ws);
se.Axios = kt;
se.CanceledError = Ss;
se.CancelToken = zd;
se.isCancel = Zi;
se.VERSION = oa;
se.toFormData = ln;
se.AxiosError = B;
se.Cancel = se.CanceledError;
se.all = function(t) {
  return Promise.all(t);
};
se.spread = Vd;
se.isAxiosError = qd;
se.mergeConfig = Pt;
se.AxiosHeaders = Ne;
se.formToJSON = (e) => Qi(v.isHTMLForm(e) ? new FormData(e) : e);
se.getAdapter = ra.getAdapter;
se.HttpStatusCode = zn;
se.default = se;
const {
  Axios: Ah,
  AxiosError: Oh,
  CanceledError: kh,
  isCancel: Ph,
  CancelToken: $h,
  VERSION: Nh,
  all: jh,
  Cancel: Fh,
  isAxiosError: Dh,
  spread: Mh,
  toFormData: Ih,
  AxiosHeaders: Lh,
  HttpStatusCode: Uh,
  formToJSON: Bh,
  getAdapter: Hh,
  mergeConfig: zh
} = se, Kd = ".btn-approve[data-v-3d0c8d0a]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-3d0c8d0a]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-3d0c8d0a]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-3d0c8d0a]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-3d0c8d0a]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-3d0c8d0a]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-3d0c8d0a]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-3d0c8d0a]{display:flex;align-items:center;gap:14px}.avatar[data-v-3d0c8d0a]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-3d0c8d0a]{display:flex;flex-direction:column}.group-name[data-v-3d0c8d0a]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-3d0c8d0a]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-3d0c8d0a]{display:flex;gap:10px}.btn-action[data-v-3d0c8d0a]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-3d0c8d0a]{width:14px;height:14px}.btn-view[data-v-3d0c8d0a]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-3d0c8d0a]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-3d0c8d0a]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-3d0c8d0a]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-3d0c8d0a]:hover{background-color:#f43f5e;color:#fff}", Wd = { class: "surface" }, Jd = { class: "surface-header" }, Gd = { class: "surface-title" }, Yd = { class: "badge" }, Xd = { class: "request-list" }, Qd = ["id"], Zd = { class: "group-info" }, ep = { class: "avatar" }, tp = { class: "text-content" }, sp = { class: "group-name" }, np = { class: "creator-tag" }, rp = { class: "action-group" }, op = ["onClick"], ip = ["onClick"], ap = ["onClick"], lp = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    se.defaults.xsrfCookieName = "csrftoken", se.defaults.xsrfHeaderName = "X-CSRFToken";
    const s = t, n = /* @__PURE__ */ He(null), r = (a) => {
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
    return (a, l) => (F(), D("section", Wd, [
      u("div", Jd, [
        u("div", Gd, [
          l[0] || (l[0] = Ce(" Inbound Requests ", -1)),
          u("span", Yd, j(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      u("div", Xd, [
        (F(!0), D(ce, null, ft(e.groups, (f) => (F(), D("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          u("div", Zd, [
            u("div", ep, j(f.name.charAt(0).toUpperCase()), 1),
            u("div", tp, [
              u("span", sp, j(f.name), 1),
              u("span", np, "by @" + j(f.creator), 1)
            ])
          ]),
          u("div", rp, [
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
            ])], 8, op),
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
            ])], 8, ip),
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
            ])], 8, ap)
          ])
        ], 8, Qd))), 128))
      ])
    ]));
  }
}, cp = /* @__PURE__ */ vs(lp, [["styles", [Kd]], ["__scopeId", "data-v-3d0c8d0a"]]), fp = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', up = { class: "viewport" }, dp = { class: "header" }, pp = {
  key: 0,
  class: "status-badge"
}, hp = { class: "stats" }, mp = { class: "card" }, gp = { class: "value" }, bp = { class: "card" }, vp = {
  class: "value",
  style: { color: "var(--primary)" }
}, yp = { class: "card" }, _p = { class: "value" }, xp = { class: "workspace" }, wp = ["groups"], Sp = { class: "surface pulse-container" }, Cp = { class: "feed-timeline" }, Ep = ["onClick"], Tp = { key: 0 }, Rp = { key: 1 }, Ap = { key: 2 }, Op = { key: 3 }, kp = { key: 4 }, Pp = { class: "feed-body" }, $p = { class: "feed-text" }, Np = { class: "highlight" }, jp = { class: "highlight" }, Fp = { class: "highlight" }, Dp = { class: "highlight" }, Mp = { class: "highlight" }, Ip = { class: "highlight" }, Lp = { class: "highlight" }, Up = { class: "feed-time" }, Bp = {
  key: 0,
  class: "empty-state"
}, Hp = { class: "modal-card" }, zp = { class: "modal-header" }, Vp = { class: "header-top" }, qp = { class: "badge-group" }, Kp = { class: "badge major" }, Wp = { class: "modal-body" }, Jp = { class: "title-row" }, Gp = { class: "group-title" }, Yp = {
  key: 0,
  class: "description-box"
}, Xp = { class: "description-text" }, Qp = { class: "info-grid" }, Zp = { class: "info-item" }, eh = { class: "item-content" }, th = { class: "item-value" }, sh = { class: "info-item" }, nh = { class: "item-content" }, rh = { class: "item-value" }, oh = { class: "info-item" }, ih = { class: "item-content" }, ah = { class: "info-item" }, lh = { class: "item-content" }, ch = { class: "info-item" }, fh = { class: "item-content" }, uh = { class: "item-value" }, dh = { class: "info-item" }, ph = { class: "item-content" }, hh = { class: "item-value" }, mh = { class: "meta-row" }, gh = { class: "modal-footer" }, bh = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ He(null), s = /* @__PURE__ */ He(!1), n = /* @__PURE__ */ He([]), r = /* @__PURE__ */ He({}), o = /* @__PURE__ */ He([]), i = /* @__PURE__ */ He(!0), a = /* @__PURE__ */ He(null), l = async () => {
      console.log("called again");
      try {
        const b = await se.get("/api/admin/dashboard-data");
        n.value = b.data.pendingGroups || [], r.value = b.data.stats || {}, o.value = b.data.activities || [];
      } catch (b) {
        console.error("API Error:", b);
      } finally {
        i.value = !1;
      }
    }, f = (b) => {
      if (b.type === "create" && b.group.id) {
        const p = `group-${b.group.id}`, w = a.value.querySelector("inbound-request");
        if (w && w.shadowRoot) {
          const O = w.shadowRoot.getElementById(p);
          O && (O.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), O.style.outline = "2px solid var(--primary)", O.style.borderRadius = "20px", setTimeout(() => {
            O.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, c = async (b) => {
      const p = b.detail ? b.detail[0] : b;
      if (!p || typeof p == "object") {
        console.error("Invalid ID received:", p);
        return;
      }
      try {
        const w = await se.get(`/api/group/${p}`);
        t.value = w.data, s.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, h = (b, p) => {
      const w = (P) => {
        if (!P) return null;
        const q = P.match(/(\d{2}:\d{2}):\d{2}/);
        return q ? q[1] : P;
      }, O = w(b), M = w(p);
      return !O && !M ? "Time TBD" : O ? M ? `${O} — ${M}` : `${O} - End TBD` : `Starts at ${M || "TBD"}`;
    }, y = (b, p) => {
      p === "approve" ? x(b) : g(b);
    }, x = async (b) => {
      try {
        await se.post(`/api/group/${b}/approve`), s.value = !1, l();
      } catch (p) {
        console.error(p);
      }
    }, g = async (b) => {
      try {
        await se.post(`/api/group/${b}/deny`), s.value = !1, l();
      } catch (p) {
        console.error(p);
      }
    };
    return or(l), (b, p) => (F(), D("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: a
    }, [
      p[31] || (p[31] = Wl('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      u("main", up, [
        u("header", dp, [
          p[5] || (p[5] = u("h1", null, "Command Center", -1)),
          i.value ? he("", !0) : (F(), D("div", pp, [...p[4] || (p[4] = [
            u("div", { class: "dot-live" }, null, -1),
            Ce(" OPERATIONAL ", -1)
          ])]))
        ]),
        u("section", hp, [
          u("div", mp, [
            p[6] || (p[6] = u("span", { class: "label" }, "Total Groups", -1)),
            u("span", gp, j(r.value.groups || 0), 1)
          ]),
          u("div", bp, [
            p[7] || (p[7] = u("span", { class: "label" }, "Pending", -1)),
            u("span", vp, j(r.value.pending || 0), 1)
          ]),
          u("div", yp, [
            p[8] || (p[8] = u("span", { class: "label" }, "Total Students", -1)),
            u("span", _p, j(r.value.students || 0), 1)
          ])
        ]),
        u("div", xp, [
          u("inbound-request", {
            groups: n.value,
            onAction_taken: l,
            onShow_details: c
          }, null, 40, wp),
          u("section", Sp, [
            p[14] || (p[14] = u("div", { class: "surface-header" }, [
              u("div", { class: "surface-title" }, [
                Ce(" Notifications "),
                u("div", { class: "live-indicator" }, [
                  u("span", { class: "dot" })
                ])
              ])
            ], -1)),
            u("div", Cp, [
              (F(!0), D(ce, null, ft(o.value, (w) => (F(), D("div", {
                key: w.id,
                class: "feed-item",
                onClick: (O) => f(w)
              }, [
                u("div", {
                  class: me([
                    "feed-icon-wrapper",
                    `bg-${w.type || "default"}`
                  ])
                }, [
                  w.type === "register" ? (F(), D("span", Tp, "👋")) : w.type === "create" ? (F(), D("span", Rp, "👤")) : w.type === "approve" ? (F(), D("span", Ap, " 👍")) : w.type === "deny" ? (F(), D("span", Op, "🚫")) : (F(), D("span", kp, "🔔"))
                ], 2),
                u("div", Pp, [
                  u("div", $p, [
                    w.type === "register" ? (F(), D(ce, { key: 0 }, [
                      u("span", Np, j(w.sender), 1),
                      p[9] || (p[9] = Ce(" joined our community ", -1))
                    ], 64)) : w.type === "create" ? (F(), D(ce, { key: 1 }, [
                      u("span", jp, j(w.sender), 1),
                      p[10] || (p[10] = Ce(" wants to start ", -1)),
                      u("span", Fp, j(w.group.name), 1)
                    ], 64)) : w.type === "approve" ? (F(), D(ce, { key: 2 }, [
                      u("span", Dp, j(w.sender), 1),
                      p[11] || (p[11] = Ce(" approved the group ", -1)),
                      u("span", Mp, j(w.group.name), 1)
                    ], 64)) : w.type === "deny" ? (F(), D(ce, { key: 3 }, [
                      u("span", Ip, j(w.sender), 1),
                      p[12] || (p[12] = Ce(" denied the group ", -1)),
                      u("span", Lp, j(w.group.name), 1)
                    ], 64)) : (F(), D(ce, { key: 4 }, [
                      Ce(j(w.message || "Update"), 1)
                    ], 64))
                  ]),
                  u("span", Up, j(w.time_ago), 1)
                ])
              ], 8, Ep))), 128)),
              !o.value?.length && !i.value ? (F(), D("div", Bp, [...p[13] || (p[13] = [
                u("p", null, "📭 No recent pulses.", -1)
              ])])) : he("", !0)
            ])
          ]),
          s.value && t.value ? (F(), D("div", {
            key: 0,
            class: "modal-overlay",
            onClick: p[3] || (p[3] = Fc((w) => s.value = !1, ["self"]))
          }, [
            u("div", Hp, [
              u("div", zp, [
                u("div", Vp, [
                  u("div", qp, [
                    u("span", Kp, j(t.value.major || "Undeclared"), 1),
                    u("span", {
                      class: me(["badge", t.value.group_type])
                    }, j(t.value.group_type === "general" ? "General" : "Project"), 3),
                    u("span", {
                      class: me(["badge status", t.value.status.toLowerCase()])
                    }, j(t.value.status), 3)
                  ]),
                  u("button", {
                    class: "close-btn",
                    onClick: p[0] || (p[0] = (w) => s.value = !1)
                  }, "✕")
                ])
              ]),
              u("div", Wp, [
                u("div", Jp, [
                  u("h3", Gp, j(t.value.name), 1),
                  u("span", {
                    class: me(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    p[15] || (p[15] = u("span", { class: "tag-emoji" }, "📖", -1)),
                    u("span", null, j(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? (F(), D("div", Yp, [
                  u("p", Xp, " “" + j(t.value.description) + "” ", 1)
                ])) : he("", !0),
                u("div", Qp, [
                  u("div", Zp, [
                    p[17] || (p[17] = u("span", { class: "item-emoji" }, "📅", -1)),
                    u("div", eh, [
                      p[16] || (p[16] = u("span", { class: "item-label" }, "Day", -1)),
                      u("span", th, j(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  u("div", sh, [
                    p[19] || (p[19] = u("span", { class: "item-emoji" }, "⏰", -1)),
                    u("div", nh, [
                      p[18] || (p[18] = u("span", { class: "item-label" }, "Time", -1)),
                      u("span", rh, j(h(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  u("div", oh, [
                    p[21] || (p[21] = u("span", { class: "item-emoji" }, "🎯", -1)),
                    u("div", ih, [
                      p[20] || (p[20] = u("span", { class: "item-label" }, "Interest", -1)),
                      u("span", {
                        class: me(["item-value", { "is-null": !t.value.interest }])
                      }, j(t.value.interest || "None"), 3)
                    ])
                  ]),
                  u("div", ah, [
                    p[23] || (p[23] = u("span", { class: "item-emoji" }, "📚", -1)),
                    u("div", lh, [
                      p[22] || (p[22] = u("span", { class: "item-label" }, "Semester", -1)),
                      u("span", {
                        class: me(["item-value", { "is-null": !t.value.semester }])
                      }, j(t.value.semester || "—"), 3)
                    ])
                  ]),
                  u("div", ch, [
                    p[25] || (p[25] = u("span", { class: "item-emoji" }, "👥", -1)),
                    u("div", fh, [
                      p[24] || (p[24] = u("span", { class: "item-label" }, "Members", -1)),
                      u("span", uh, j(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  u("div", dh, [
                    p[27] || (p[27] = u("span", { class: "item-emoji" }, "👤", -1)),
                    u("div", ph, [
                      p[26] || (p[26] = u("span", { class: "item-label" }, "Creator", -1)),
                      u("span", hh, "ID: " + j(t.value.creator), 1)
                    ])
                  ])
                ]),
                u("div", mh, [
                  u("span", {
                    class: me(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    p[28] || (p[28] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  u("span", {
                    class: me(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    p[29] || (p[29] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  u("span", {
                    class: me(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    p[30] || (p[30] = u("span", { class: "chip-dot" }, null, -1)),
                    Ce(" " + j(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              u("div", gh, [
                u("button", {
                  onClick: p[1] || (p[1] = (w) => y(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                u("button", {
                  onClick: p[2] || (p[2] = (w) => y(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : he("", !0)
        ])
      ])
    ], 512));
  }
}, vh = /* @__PURE__ */ vs(bh, [["styles", [fp]]]), yh = /* @__PURE__ */ bs(Ii), _h = /* @__PURE__ */ bs(gu), xh = /* @__PURE__ */ bs(Li), wh = /* @__PURE__ */ bs(cp), Sh = /* @__PURE__ */ bs(vh);
customElements.define("gallery-card", yh);
customElements.define("find-partner-view", _h);
customElements.define("gallery-card-compact", xh);
customElements.define("inbound-request", wh);
customElements.define("admin-dashboard", Sh);
