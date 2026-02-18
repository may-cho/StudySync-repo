// @__NO_SIDE_EFFECTS__
function sn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Y = {}, wt = [], Be = () => {
}, mr = () => !1, ms = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), nn = (e) => e.startsWith("onUpdate:"), ne = Object.assign, rn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ni = Object.prototype.hasOwnProperty, K = (e, t) => Ni.call(e, t), I = Array.isArray, Ct = (e) => qt(e) === "[object Map]", vr = (e) => qt(e) === "[object Set]", Mn = (e) => qt(e) === "[object Date]", F = (e) => typeof e == "function", re = (e) => typeof e == "string", Ue = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", br = (e) => (W(e) || F(e)) && F(e.then) && F(e.catch), _r = Object.prototype.toString, qt = (e) => _r.call(e), Fi = (e) => qt(e).slice(8, -1), vs = (e) => qt(e) === "[object Object]", on = (e) => re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = /* @__PURE__ */ sn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), bs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Li = /-\w/g, Oe = bs(
  (e) => e.replace(Li, (t) => t.slice(1).toUpperCase())
), Di = /\B([A-Z])/g, Ee = bs(
  (e) => e.replace(Di, "-$1").toLowerCase()
), yr = bs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ps = bs(
  (e) => e ? `on${yr(e)}` : ""
), it = (e, t) => !Object.is(e, t), ns = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, xr = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, ln = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Bs = (e) => {
  const t = re(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let On;
const _s = () => On || (On = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function mt(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = re(n) ? Ui(n) : mt(n);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (re(e) || W(e))
    return e;
}
const Hi = /;(?![^(]*\))/g, Vi = /:([^]+)/, Bi = /\/\*[^]*?\*\//g;
function Ui(e) {
  const t = {};
  return e.replace(Bi, "").split(Hi).forEach((s) => {
    if (s) {
      const n = s.split(Vi);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Qe(e) {
  let t = "";
  if (re(e))
    t = e;
  else if (I(e))
    for (let s = 0; s < e.length; s++) {
      const n = Qe(e[s]);
      n && (t += n + " ");
    }
  else if (W(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const zi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ki = /* @__PURE__ */ sn(zi);
function wr(e) {
  return !!e || e === "";
}
function Wi(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = an(e[n], t[n]);
  return s;
}
function an(e, t) {
  if (e === t) return !0;
  let s = Mn(e), n = Mn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Ue(e), n = Ue(t), s || n)
    return e === t;
  if (s = I(e), n = I(t), s || n)
    return s && n ? Wi(e, t) : !1;
  if (s = W(e), n = W(t), s || n) {
    if (!s || !n)
      return !1;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), a = t.hasOwnProperty(o);
      if (l && !a || !l && a || !an(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Cr = (e) => !!(e && e.__v_isRef === !0), U = (e) => re(e) ? e : e == null ? "" : I(e) || W(e) && (e.toString === _r || !F(e.toString)) ? Cr(e) ? U(e.value) : JSON.stringify(e, Sr, 2) : String(e), Sr = (e, t) => Cr(t) ? Sr(e, t.value) : Ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], i) => (s[Ms(n, i) + " =>"] = r, s),
    {}
  )
} : vr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Ms(s))
} : Ue(t) ? Ms(t) : W(t) && !I(t) && !vs(t) ? String(t) : t, Ms = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ue(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let Ce;
class Gi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Ce, !t && Ce && (this.index = (Ce.scopes || (Ce.scopes = [])).push(
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
      const s = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ce = this.prevScope, this.prevScope = void 0);
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
function Ji() {
  return Ce;
}
let Z;
const Os = /* @__PURE__ */ new WeakSet();
class Tr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && Ce.active && Ce.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Os.has(this) && (Os.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Er(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Rn(this), Pr(this);
    const t = Z, s = Re;
    Z = this, Re = !0;
    try {
      return this.fn();
    } finally {
      Mr(this), Z = t, Re = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        un(t);
      this.deps = this.depsTail = void 0, Rn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Os.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Us(this) && this.run();
  }
  get dirty() {
    return Us(this);
  }
}
let Ar = 0, kt, Nt;
function Er(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Nt, Nt = e;
    return;
  }
  e.next = kt, kt = e;
}
function cn() {
  Ar++;
}
function fn() {
  if (--Ar > 0)
    return;
  if (Nt) {
    let t = Nt;
    for (Nt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; kt; ) {
    let t = kt;
    for (kt = void 0; t; ) {
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
function Pr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Mr(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), un(n), qi(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function Us(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Or(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Or(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Bt) || (e.globalVersion = Bt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Us(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Z, n = Re;
  Z = e, Re = !0;
  try {
    Pr(e);
    const r = e.fn(e._value);
    (t.version === 0 || it(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Z = s, Re = n, Mr(e), e.flags &= -3;
  }
}
function un(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      un(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function qi(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Re = !0;
const Rr = [];
function Xe() {
  Rr.push(Re), Re = !1;
}
function Ze() {
  const e = Rr.pop();
  Re = e === void 0 ? !0 : e;
}
function Rn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Z;
    Z = void 0;
    try {
      t();
    } finally {
      Z = s;
    }
  }
}
let Bt = 0;
class Yi {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class dn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Z || !Re || Z === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Z)
      s = this.activeLink = new Yi(Z, this), Z.deps ? (s.prevDep = Z.depsTail, Z.depsTail.nextDep = s, Z.depsTail = s) : Z.deps = Z.depsTail = s, jr(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Z.depsTail, s.nextDep = void 0, Z.depsTail.nextDep = s, Z.depsTail = s, Z.deps === s && (Z.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Bt++, this.notify(t);
  }
  notify(t) {
    cn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      fn();
    }
  }
}
function jr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        jr(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const zs = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ Symbol(
  ""
), Ks = /* @__PURE__ */ Symbol(
  ""
), Ut = /* @__PURE__ */ Symbol(
  ""
);
function fe(e, t, s) {
  if (Re && Z) {
    let n = zs.get(e);
    n || zs.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new dn()), r.map = n, r.key = s), r.track();
  }
}
function qe(e, t, s, n, r, i) {
  const o = zs.get(e);
  if (!o) {
    Bt++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (cn(), t === "clear")
    o.forEach(l);
  else {
    const a = I(e), p = a && on(s);
    if (a && s === "length") {
      const f = Number(n);
      o.forEach((d, v) => {
        (v === "length" || v === Ut || !Ue(v) && v >= f) && l(d);
      });
    } else
      switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)), p && l(o.get(Ut)), t) {
        case "add":
          a ? p && l(o.get("length")) : (l(o.get(vt)), Ct(e) && l(o.get(Ks)));
          break;
        case "delete":
          a || (l(o.get(vt)), Ct(e) && l(o.get(Ks)));
          break;
        case "set":
          Ct(e) && l(o.get(vt));
          break;
      }
  }
  fn();
}
function _t(e) {
  const t = /* @__PURE__ */ z(e);
  return t === e ? t : (fe(t, "iterate", Ut), /* @__PURE__ */ Me(e) ? t : t.map(je));
}
function ys(e) {
  return fe(e = /* @__PURE__ */ z(e), "iterate", Ut), e;
}
function nt(e, t) {
  return /* @__PURE__ */ et(e) ? At(/* @__PURE__ */ bt(e) ? je(t) : t) : je(t);
}
const Qi = {
  __proto__: null,
  [Symbol.iterator]() {
    return Rs(this, Symbol.iterator, (e) => nt(this, e));
  },
  concat(...e) {
    return _t(this).concat(
      ...e.map((t) => I(t) ? _t(t) : t)
    );
  },
  entries() {
    return Rs(this, "entries", (e) => (e[1] = nt(this, e[1]), e));
  },
  every(e, t) {
    return Ke(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ke(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => nt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Ke(
      this,
      "find",
      e,
      t,
      (s) => nt(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Ke(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ke(
      this,
      "findLast",
      e,
      t,
      (s) => nt(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ke(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ke(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return js(this, "includes", e);
  },
  indexOf(...e) {
    return js(this, "indexOf", e);
  },
  join(e) {
    return _t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return js(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ke(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ot(this, "pop");
  },
  push(...e) {
    return Ot(this, "push", e);
  },
  reduce(e, ...t) {
    return jn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return jn(this, "reduceRight", e, t);
  },
  shift() {
    return Ot(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ke(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ot(this, "splice", e);
  },
  toReversed() {
    return _t(this).toReversed();
  },
  toSorted(e) {
    return _t(this).toSorted(e);
  },
  toSpliced(...e) {
    return _t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ot(this, "unshift", e);
  },
  values() {
    return Rs(this, "values", (e) => nt(this, e));
  }
};
function Rs(e, t, s) {
  const n = ys(e), r = n[t]();
  return n !== e && !/* @__PURE__ */ Me(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = s(i.value)), i;
  }), r;
}
const Xi = Array.prototype;
function Ke(e, t, s, n, r, i) {
  const o = ys(e), l = o !== e && !/* @__PURE__ */ Me(e), a = o[t];
  if (a !== Xi[t]) {
    const d = a.apply(e, i);
    return l ? je(d) : d;
  }
  let p = s;
  o !== e && (l ? p = function(d, v) {
    return s.call(this, nt(e, d), v, e);
  } : s.length > 2 && (p = function(d, v) {
    return s.call(this, d, v, e);
  }));
  const f = a.call(o, p, n);
  return l && r ? r(f) : f;
}
function jn(e, t, s, n) {
  const r = ys(e);
  let i = s;
  return r !== e && (/* @__PURE__ */ Me(e) ? s.length > 3 && (i = function(o, l, a) {
    return s.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return s.call(this, o, nt(e, l), a, e);
  }), r[t](i, ...n);
}
function js(e, t, s) {
  const n = /* @__PURE__ */ z(e);
  fe(n, "iterate", Ut);
  const r = n[t](...s);
  return (r === -1 || r === !1) && /* @__PURE__ */ mn(s[0]) ? (s[0] = /* @__PURE__ */ z(s[0]), n[t](...s)) : r;
}
function Ot(e, t, s = []) {
  Xe(), cn();
  const n = (/* @__PURE__ */ z(e))[t].apply(e, s);
  return fn(), Ze(), n;
}
const Zi = /* @__PURE__ */ sn("__proto__,__v_isRef,__isVue"), Ir = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ue)
);
function eo(e) {
  Ue(e) || (e = String(e));
  const t = /* @__PURE__ */ z(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
}
class $r {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (r ? i ? fo : Lr : i ? Fr : Nr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = I(t);
    if (!r) {
      let a;
      if (o && (a = Qi[s]))
        return a;
      if (s === "hasOwnProperty")
        return eo;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ue(t) ? t : n
    );
    if ((Ue(s) ? Ir.has(s) : Zi(s)) || (r || fe(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ ue(l)) {
      const a = o && on(s) ? l : l.value;
      return r && W(a) ? /* @__PURE__ */ Gs(a) : a;
    }
    return W(l) ? r ? /* @__PURE__ */ Gs(l) : /* @__PURE__ */ hn(l) : l;
  }
}
class kr extends $r {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    const o = I(t) && on(s);
    if (!this._isShallow) {
      const p = /* @__PURE__ */ et(i);
      if (!/* @__PURE__ */ Me(n) && !/* @__PURE__ */ et(n) && (i = /* @__PURE__ */ z(i), n = /* @__PURE__ */ z(n)), !o && /* @__PURE__ */ ue(i) && !/* @__PURE__ */ ue(n))
        return p || (i.value = n), !0;
    }
    const l = o ? Number(s) < t.length : K(t, s), a = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ ue(t) ? t : r
    );
    return t === /* @__PURE__ */ z(r) && (l ? it(n, i) && qe(t, "set", s, n) : qe(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = K(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && qe(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ue(s) || !Ir.has(s)) && fe(t, "has", s), n;
  }
  ownKeys(t) {
    return fe(
      t,
      "iterate",
      I(t) ? "length" : vt
    ), Reflect.ownKeys(t);
  }
}
class to extends $r {
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
const so = /* @__PURE__ */ new kr(), no = /* @__PURE__ */ new to(), ro = /* @__PURE__ */ new kr(!0);
const Ws = (e) => e, es = (e) => Reflect.getPrototypeOf(e);
function io(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, i = /* @__PURE__ */ z(r), o = Ct(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, p = r[e](...n), f = s ? Ws : t ? At : je;
    return !t && fe(
      i,
      "iterate",
      a ? Ks : vt
    ), ne(
      // inheriting all iterator properties
      Object.create(p),
      {
        // iterator protocol
        next() {
          const { value: d, done: v } = p.next();
          return v ? { value: d, done: v } : {
            value: l ? [f(d[0]), f(d[1])] : f(d),
            done: v
          };
        }
      }
    );
  };
}
function ts(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function oo(e, t) {
  const s = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(r);
      e || (it(r, l) && fe(o, "get", r), fe(o, "get", l));
      const { has: a } = es(o), p = t ? Ws : e ? At : je;
      if (a.call(o, r))
        return p(i.get(r));
      if (a.call(o, l))
        return p(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && fe(/* @__PURE__ */ z(r), "iterate", vt), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(r);
      return e || (it(r, l) && fe(o, "has", r), fe(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = /* @__PURE__ */ z(l), p = t ? Ws : e ? At : je;
      return !e && fe(a, "iterate", vt), l.forEach((f, d) => r.call(i, p(f), p(d), o));
    }
  };
  return ne(
    s,
    e ? {
      add: ts("add"),
      set: ts("set"),
      delete: ts("delete"),
      clear: ts("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Me(r) && !/* @__PURE__ */ et(r) && (r = /* @__PURE__ */ z(r));
        const i = /* @__PURE__ */ z(this);
        return es(i).has.call(i, r) || (i.add(r), qe(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ Me(i) && !/* @__PURE__ */ et(i) && (i = /* @__PURE__ */ z(i));
        const o = /* @__PURE__ */ z(this), { has: l, get: a } = es(o);
        let p = l.call(o, r);
        p || (r = /* @__PURE__ */ z(r), p = l.call(o, r));
        const f = a.call(o, r);
        return o.set(r, i), p ? it(i, f) && qe(o, "set", r, i) : qe(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ z(this), { has: o, get: l } = es(i);
        let a = o.call(i, r);
        a || (r = /* @__PURE__ */ z(r), a = o.call(i, r)), l && l.call(i, r);
        const p = i.delete(r);
        return a && qe(i, "delete", r, void 0), p;
      },
      clear() {
        const r = /* @__PURE__ */ z(this), i = r.size !== 0, o = r.clear();
        return i && qe(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = io(r, e, t);
  }), s;
}
function pn(e, t) {
  const s = oo(e, t);
  return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    K(s, r) && r in n ? s : n,
    r,
    i
  );
}
const lo = {
  get: /* @__PURE__ */ pn(!1, !1)
}, ao = {
  get: /* @__PURE__ */ pn(!1, !0)
}, co = {
  get: /* @__PURE__ */ pn(!0, !1)
};
const Nr = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap();
function uo(e) {
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
function po(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : uo(Fi(e));
}
// @__NO_SIDE_EFFECTS__
function hn(e) {
  return /* @__PURE__ */ et(e) ? e : gn(
    e,
    !1,
    so,
    lo,
    Nr
  );
}
// @__NO_SIDE_EFFECTS__
function ho(e) {
  return gn(
    e,
    !1,
    ro,
    ao,
    Fr
  );
}
// @__NO_SIDE_EFFECTS__
function Gs(e) {
  return gn(
    e,
    !0,
    no,
    co,
    Lr
  );
}
function gn(e, t, s, n, r) {
  if (!W(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = po(e);
  if (i === 0)
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    i === 2 ? n : s
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return /* @__PURE__ */ et(e) ? /* @__PURE__ */ bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Me(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function mn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ z(t) : e;
}
function go(e) {
  return !K(e, "__v_skip") && Object.isExtensible(e) && xr(e, "__v_skip", !0), e;
}
const je = (e) => W(e) ? /* @__PURE__ */ hn(e) : e, At = (e) => W(e) ? /* @__PURE__ */ Gs(e) : e;
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Is(e) {
  return mo(e, !1);
}
function mo(e, t) {
  return /* @__PURE__ */ ue(e) ? e : new vo(e, t);
}
class vo {
  constructor(t, s) {
    this.dep = new dn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ z(t), this._value = s ? t : je(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Me(t) || /* @__PURE__ */ et(t);
    t = n ? t : /* @__PURE__ */ z(t), it(t, s) && (this._rawValue = t, this._value = n ? t : je(t), this.dep.trigger());
  }
}
function Dr(e) {
  return /* @__PURE__ */ ue(e) ? e.value : e;
}
const bo = {
  get: (e, t, s) => t === "__v_raw" ? e : Dr(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return /* @__PURE__ */ ue(r) && !/* @__PURE__ */ ue(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Hr(e) {
  return /* @__PURE__ */ bt(e) ? e : new Proxy(e, bo);
}
class _o {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new dn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Bt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Z !== this)
      return Er(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Or(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function yo(e, t, s = !1) {
  let n, r;
  return F(e) ? n = e : (n = e.get, r = e.set), new _o(n, r, s);
}
const ss = {}, as = /* @__PURE__ */ new WeakMap();
let pt;
function xo(e, t = !1, s = pt) {
  if (s) {
    let n = as.get(s);
    n || as.set(s, n = []), n.push(e);
  }
}
function wo(e, t, s = Y) {
  const { immediate: n, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = s, p = (j) => r ? j : /* @__PURE__ */ Me(j) || r === !1 || r === 0 ? Ye(j, 1) : Ye(j);
  let f, d, v, m, T = !1, M = !1;
  if (/* @__PURE__ */ ue(e) ? (d = () => e.value, T = /* @__PURE__ */ Me(e)) : /* @__PURE__ */ bt(e) ? (d = () => p(e), T = !0) : I(e) ? (M = !0, T = e.some((j) => /* @__PURE__ */ bt(j) || /* @__PURE__ */ Me(j)), d = () => e.map((j) => {
    if (/* @__PURE__ */ ue(j))
      return j.value;
    if (/* @__PURE__ */ bt(j))
      return p(j);
    if (F(j))
      return a ? a(j, 2) : j();
  })) : F(e) ? t ? d = a ? () => a(e, 2) : e : d = () => {
    if (v) {
      Xe();
      try {
        v();
      } finally {
        Ze();
      }
    }
    const j = pt;
    pt = f;
    try {
      return a ? a(e, 3, [m]) : e(m);
    } finally {
      pt = j;
    }
  } : d = Be, t && r) {
    const j = d, q = r === !0 ? 1 / 0 : r;
    d = () => Ye(j(), q);
  }
  const k = Ji(), w = () => {
    f.stop(), k && k.active && rn(k.effects, f);
  };
  if (i && t) {
    const j = t;
    t = (...q) => {
      j(...q), w();
    };
  }
  let O = M ? new Array(e.length).fill(ss) : ss;
  const V = (j) => {
    if (!(!(f.flags & 1) || !f.dirty && !j))
      if (t) {
        const q = f.run();
        if (r || T || (M ? q.some((oe, de) => it(oe, O[de])) : it(q, O))) {
          v && v();
          const oe = pt;
          pt = f;
          try {
            const de = [
              q,
              // pass undefined as the old value when it's changed for the first time
              O === ss ? void 0 : M && O[0] === ss ? [] : O,
              m
            ];
            O = q, a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            pt = oe;
          }
        }
      } else
        f.run();
  };
  return l && l(V), f = new Tr(d), f.scheduler = o ? () => o(V, !1) : V, m = (j) => xo(j, !1, f), v = f.onStop = () => {
    const j = as.get(f);
    if (j) {
      if (a)
        a(j, 4);
      else
        for (const q of j) q();
      as.delete(f);
    }
  }, t ? n ? V(!0) : O = f.run() : o ? o(V.bind(null, !0), !0) : f.run(), w.pause = f.pause.bind(f), w.resume = f.resume.bind(f), w.stop = w, w;
}
function Ye(e, t = 1 / 0, s) {
  if (t <= 0 || !W(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ ue(e))
    Ye(e.value, t, s);
  else if (I(e))
    for (let n = 0; n < e.length; n++)
      Ye(e[n], t, s);
  else if (vr(e) || Ct(e))
    e.forEach((n) => {
      Ye(n, t, s);
    });
  else if (vs(e)) {
    for (const n in e)
      Ye(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Ye(e[n], t, s);
  }
  return e;
}
function Yt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    xs(r, t, s);
  }
}
function Ie(e, t, s, n) {
  if (F(e)) {
    const r = Yt(e, t, s, n);
    return r && br(r) && r.catch((i) => {
      xs(i, t, s);
    }), r;
  }
  if (I(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Ie(e[i], t, s, n));
    return r;
  }
}
function xs(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Y;
  if (t) {
    let l = t.parent;
    const a = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, a, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Xe(), Yt(i, null, 10, [
        e,
        a,
        p
      ]), Ze();
      return;
    }
  }
  Co(e, s, r, n, o);
}
function Co(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const he = [];
let De = -1;
const St = [];
let rt = null, yt = 0;
const Vr = /* @__PURE__ */ Promise.resolve();
let cs = null;
function Br(e) {
  const t = cs || Vr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function So(e) {
  let t = De + 1, s = he.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = he[n], i = zt(r);
    i < e || i === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function vn(e) {
  if (!(e.flags & 1)) {
    const t = zt(e), s = he[he.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= zt(s) ? he.push(e) : he.splice(So(t), 0, e), e.flags |= 1, Ur();
  }
}
function Ur() {
  cs || (cs = Vr.then(Kr));
}
function To(e) {
  I(e) ? St.push(...e) : rt && e.id === -1 ? rt.splice(yt + 1, 0, e) : e.flags & 1 || (St.push(e), e.flags |= 1), Ur();
}
function In(e, t, s = De + 1) {
  for (; s < he.length; s++) {
    const n = he[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      he.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function zr(e) {
  if (St.length) {
    const t = [...new Set(St)].sort(
      (s, n) => zt(s) - zt(n)
    );
    if (St.length = 0, rt) {
      rt.push(...t);
      return;
    }
    for (rt = t, yt = 0; yt < rt.length; yt++) {
      const s = rt[yt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    rt = null, yt = 0;
  }
}
const zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Kr(e) {
  try {
    for (De = 0; De < he.length; De++) {
      const t = he[De];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Yt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; De < he.length; De++) {
      const t = he[De];
      t && (t.flags &= -2);
    }
    De = -1, he.length = 0, zr(), cs = null, (he.length || St.length) && Kr();
  }
}
let Pe = null, Wr = null;
function fs(e) {
  const t = Pe;
  return Pe = e, Wr = e && e.type.__scopeId || null, t;
}
function Gr(e, t = Pe, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && ps(-1);
    const i = fs(t);
    let o;
    try {
      o = e(...r);
    } finally {
      fs(i), n._d && ps(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Ao(e, t) {
  if (Pe === null)
    return e;
  const s = As(Pe), n = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, a = Y] = t[r];
    i && (F(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ye(o), n.push({
      dir: i,
      instance: s,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function ct(e, t, s, n) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[n];
    a && (Xe(), Ie(a, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Ze());
  }
}
function Eo(e, t) {
  if (me) {
    let s = me.provides;
    const n = me.parent && me.parent.provides;
    n === s && (s = me.provides = Object.create(n)), s[e] = t;
  }
}
function Ft(e, t, s = !1) {
  const n = Ai();
  if (n || Tt) {
    let r = Tt ? Tt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && F(t) ? t.call(n && n.proxy) : t;
  }
}
const Po = /* @__PURE__ */ Symbol.for("v-scx"), Mo = () => Ft(Po);
function rs(e, t, s) {
  return Jr(e, t, s);
}
function Jr(e, t, s = Y) {
  const { immediate: n, deep: r, flush: i, once: o } = s, l = ne({}, s), a = t && n || !t && i !== "post";
  let p;
  if (Gt) {
    if (i === "sync") {
      const m = Mo();
      p = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!a) {
      const m = () => {
      };
      return m.stop = Be, m.resume = Be, m.pause = Be, m;
    }
  }
  const f = me;
  l.call = (m, T, M) => Ie(m, f, T, M);
  let d = !1;
  i === "post" ? l.scheduler = (m) => {
    xe(m, f && f.suspense);
  } : i !== "sync" && (d = !0, l.scheduler = (m, T) => {
    T ? m() : vn(m);
  }), l.augmentJob = (m) => {
    t && (m.flags |= 4), d && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const v = wo(e, t, l);
  return Gt && (p ? p.push(v) : a && v()), v;
}
function Oo(e, t, s) {
  const n = this.proxy, r = re(e) ? e.includes(".") ? qr(n, e) : () => n[e] : e.bind(n, n);
  let i;
  F(t) ? i = t : (i = t.handler, s = t);
  const o = Qt(this), l = Jr(r, i.bind(n), s);
  return o(), l;
}
function qr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const Ro = /* @__PURE__ */ Symbol("_vte"), Yr = (e) => e.__isTeleport, He = /* @__PURE__ */ Symbol("_leaveCb"), Rt = /* @__PURE__ */ Symbol("_enterCb");
function jo() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return ri(() => {
    e.isMounted = !0;
  }), ii(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ae = [Function, Array], Qr = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ae,
  onEnter: Ae,
  onAfterEnter: Ae,
  onEnterCancelled: Ae,
  // leave
  onBeforeLeave: Ae,
  onLeave: Ae,
  onAfterLeave: Ae,
  onLeaveCancelled: Ae,
  // appear
  onBeforeAppear: Ae,
  onAppear: Ae,
  onAfterAppear: Ae,
  onAppearCancelled: Ae
}, Xr = (e) => {
  const t = e.subTree;
  return t.component ? Xr(t.component) : t;
}, Io = {
  name: "BaseTransition",
  props: Qr,
  setup(e, { slots: t }) {
    const s = Ai(), n = jo();
    return () => {
      const r = t.default && ti(t.default(), !0);
      if (!r || !r.length)
        return;
      const i = Zr(r), o = /* @__PURE__ */ z(e), { mode: l } = o;
      if (n.isLeaving)
        return $s(i);
      const a = $n(i);
      if (!a)
        return $s(i);
      let p = Js(
        a,
        o,
        n,
        s,
        // #11061, ensure enterHooks is fresh after clone
        (d) => p = d
      );
      a.type !== ge && Kt(a, p);
      let f = s.subTree && $n(s.subTree);
      if (f && f.type !== ge && !ht(f, a) && Xr(s).type !== ge) {
        let d = Js(
          f,
          o,
          n,
          s
        );
        if (Kt(f, d), l === "out-in" && a.type !== ge)
          return n.isLeaving = !0, d.afterLeave = () => {
            n.isLeaving = !1, s.job.flags & 8 || s.update(), delete d.afterLeave, f = void 0;
          }, $s(i);
        l === "in-out" && a.type !== ge ? d.delayLeave = (v, m, T) => {
          const M = ei(
            n,
            f
          );
          M[String(f.key)] = f, v[He] = () => {
            m(), v[He] = void 0, delete p.delayedLeave, f = void 0;
          }, p.delayedLeave = () => {
            T(), delete p.delayedLeave, f = void 0;
          };
        } : f = void 0;
      } else f && (f = void 0);
      return i;
    };
  }
};
function Zr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== ge) {
        t = s;
        break;
      }
  }
  return t;
}
const $o = Io;
function ei(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(t.type, n)), n;
}
function Js(e, t, s, n, r) {
  const {
    appear: i,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: a,
    onEnter: p,
    onAfterEnter: f,
    onEnterCancelled: d,
    onBeforeLeave: v,
    onLeave: m,
    onAfterLeave: T,
    onLeaveCancelled: M,
    onBeforeAppear: k,
    onAppear: w,
    onAfterAppear: O,
    onAppearCancelled: V
  } = t, j = String(e.key), q = ei(s, e), oe = (D, J) => {
    D && Ie(
      D,
      n,
      9,
      J
    );
  }, de = (D, J) => {
    const te = J[1];
    oe(D, J), I(D) ? D.every((P) => P.length <= 1) && te() : D.length <= 1 && te();
  }, be = {
    mode: o,
    persisted: l,
    beforeEnter(D) {
      let J = a;
      if (!s.isMounted)
        if (i)
          J = k || a;
        else
          return;
      D[He] && D[He](
        !0
        /* cancelled */
      );
      const te = q[j];
      te && ht(e, te) && te.el[He] && te.el[He](), oe(J, [D]);
    },
    enter(D) {
      let J = p, te = f, P = d;
      if (!s.isMounted)
        if (i)
          J = w || p, te = O || f, P = V || d;
        else
          return;
      let ee = !1;
      D[Rt] = (ze) => {
        ee || (ee = !0, ze ? oe(P, [D]) : oe(te, [D]), be.delayedLeave && be.delayedLeave(), D[Rt] = void 0);
      };
      const ce = D[Rt].bind(null, !1);
      J ? de(J, [D, ce]) : ce();
    },
    leave(D, J) {
      const te = String(e.key);
      if (D[Rt] && D[Rt](
        !0
        /* cancelled */
      ), s.isUnmounting)
        return J();
      oe(v, [D]);
      let P = !1;
      D[He] = (ce) => {
        P || (P = !0, J(), ce ? oe(M, [D]) : oe(T, [D]), D[He] = void 0, q[te] === e && delete q[te]);
      };
      const ee = D[He].bind(null, !1);
      q[te] = e, m ? de(m, [D, ee]) : ee();
    },
    clone(D) {
      const J = Js(
        D,
        t,
        s,
        n,
        r
      );
      return r && r(J), J;
    }
  };
  return be;
}
function $s(e) {
  if (ws(e))
    return e = ot(e), e.children = null, e;
}
function $n(e) {
  if (!ws(e))
    return Yr(e.type) && e.children ? Zr(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && F(s.default))
      return s.default();
  }
}
function Kt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Kt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ti(e, t = !1, s) {
  let n = [], r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = s == null ? o.key : String(s) + String(o.key != null ? o.key : i);
    o.type === ae ? (o.patchFlag & 128 && r++, n = n.concat(
      ti(o.children, t, l)
    )) : (t || o.type !== ge) && n.push(l != null ? ot(o, { key: l }) : o);
  }
  if (r > 1)
    for (let i = 0; i < n.length; i++)
      n[i].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function ko(e, t) {
  return F(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ne({ name: e.name }, t, { setup: e })
  ) : e;
}
function si(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function kn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const us = /* @__PURE__ */ new WeakMap();
function Lt(e, t, s, n, r = !1) {
  if (I(e)) {
    e.forEach(
      (M, k) => Lt(
        M,
        t && (I(t) ? t[k] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Dt(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Lt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? As(n.component) : n.el, o = r ? null : i, { i: l, r: a } = e, p = t && t.r, f = l.refs === Y ? l.refs = {} : l.refs, d = l.setupState, v = /* @__PURE__ */ z(d), m = d === Y ? mr : (M) => kn(f, M) ? !1 : K(v, M), T = (M, k) => !(k && kn(f, k));
  if (p != null && p !== a) {
    if (Nn(t), re(p))
      f[p] = null, m(p) && (d[p] = null);
    else if (/* @__PURE__ */ ue(p)) {
      const M = t;
      T(p, M.k) && (p.value = null), M.k && (f[M.k] = null);
    }
  }
  if (F(a))
    Yt(a, l, 12, [o, f]);
  else {
    const M = re(a), k = /* @__PURE__ */ ue(a);
    if (M || k) {
      const w = () => {
        if (e.f) {
          const O = M ? m(a) ? d[a] : f[a] : T() || !e.k ? a.value : f[e.k];
          if (r)
            I(O) && rn(O, i);
          else if (I(O))
            O.includes(i) || O.push(i);
          else if (M)
            f[a] = [i], m(a) && (d[a] = f[a]);
          else {
            const V = [i];
            T(a, e.k) && (a.value = V), e.k && (f[e.k] = V);
          }
        } else M ? (f[a] = o, m(a) && (d[a] = o)) : k && (T(a, e.k) && (a.value = o), e.k && (f[e.k] = o));
      };
      if (o) {
        const O = () => {
          w(), us.delete(e);
        };
        O.id = -1, us.set(e, O), xe(O, s);
      } else
        Nn(e), w();
    }
  }
}
function Nn(e) {
  const t = us.get(e);
  t && (t.flags |= 8, us.delete(e));
}
_s().requestIdleCallback;
_s().cancelIdleCallback;
const Dt = (e) => !!e.type.__asyncLoader, ws = (e) => e.type.__isKeepAlive;
function No(e, t) {
  ni(e, "a", t);
}
function Fo(e, t) {
  ni(e, "da", t);
}
function ni(e, t, s = me) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Cs(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      ws(r.parent.vnode) && Lo(n, t, s, r), r = r.parent;
  }
}
function Lo(e, t, s, n) {
  const r = Cs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  oi(() => {
    rn(n[t], r);
  }, s);
}
function Cs(e, t, s = me, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Xe();
      const l = Qt(s), a = Ie(t, s, e, o);
      return l(), Ze(), a;
    });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const tt = (e) => (t, s = me) => {
  (!Gt || e === "sp") && Cs(e, (...n) => t(...n), s);
}, Do = tt("bm"), ri = tt("m"), Ho = tt(
  "bu"
), Vo = tt("u"), ii = tt(
  "bum"
), oi = tt("um"), Bo = tt(
  "sp"
), Uo = tt("rtg"), zo = tt("rtc");
function Ko(e, t = me) {
  Cs("ec", e, t);
}
const Wo = /* @__PURE__ */ Symbol.for("v-ndc");
function gt(e, t, s, n) {
  let r;
  const i = s, o = I(e);
  if (o || re(e)) {
    const l = o && /* @__PURE__ */ bt(e);
    let a = !1, p = !1;
    l && (a = !/* @__PURE__ */ Me(e), p = /* @__PURE__ */ et(e), e = ys(e)), r = new Array(e.length);
    for (let f = 0, d = e.length; f < d; f++)
      r[f] = t(
        a ? p ? At(je(e[f])) : je(e[f]) : e[f],
        f,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (W(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, p = l.length; a < p; a++) {
        const f = l[a];
        r[a] = t(e[f], f, a, i);
      }
    }
  else
    r = [];
  return r;
}
const qs = (e) => e ? Ei(e) ? As(e) : qs(e.parent) : null, Ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => qs(e.parent),
    $root: (e) => qs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ai(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      vn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Br.bind(e.proxy)),
    $watch: (e) => Oo.bind(e)
  })
), ks = (e, t) => e !== Y && !e.__isScriptSetup && K(e, t), Go = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const v = o[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (ks(n, t))
          return o[t] = 1, n[t];
        if (r !== Y && K(r, t))
          return o[t] = 2, r[t];
        if (K(i, t))
          return o[t] = 3, i[t];
        if (s !== Y && K(s, t))
          return o[t] = 4, s[t];
        Ys && (o[t] = 0);
      }
    }
    const p = Ht[t];
    let f, d;
    if (p)
      return t === "$attrs" && fe(e.attrs, "get", ""), p(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== Y && K(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      d = a.config.globalProperties, K(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: i } = e;
    return ks(r, t) ? (r[t] = s, !0) : n !== Y && K(n, t) ? (n[t] = s, !0) : K(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, props: i, type: o }
  }, l) {
    let a;
    return !!(s[l] || e !== Y && l[0] !== "$" && K(e, l) || ks(t, l) || K(i, l) || K(n, l) || K(Ht, l) || K(r.config.globalProperties, l) || (a = o.__cssModules) && a[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : K(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Fn(e) {
  return I(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Ys = !0;
function Jo(e) {
  const t = ai(e), s = e.proxy, n = e.ctx;
  Ys = !1, t.beforeCreate && Ln(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: p,
    // lifecycle
    created: f,
    beforeMount: d,
    mounted: v,
    beforeUpdate: m,
    updated: T,
    activated: M,
    deactivated: k,
    beforeDestroy: w,
    beforeUnmount: O,
    destroyed: V,
    unmounted: j,
    render: q,
    renderTracked: oe,
    renderTriggered: de,
    errorCaptured: be,
    serverPrefetch: D,
    // public API
    expose: J,
    inheritAttrs: te,
    // assets
    components: P,
    directives: ee,
    filters: ce
  } = t;
  if (p && qo(p, n, null), o)
    for (const se in o) {
      const Q = o[se];
      F(Q) && (n[se] = Q.bind(s));
    }
  if (r) {
    const se = r.call(s, s);
    W(se) && (e.data = /* @__PURE__ */ hn(se));
  }
  if (Ys = !0, i)
    for (const se in i) {
      const Q = i[se], lt = F(Q) ? Q.bind(s, s) : F(Q.get) ? Q.get.bind(s, s) : Be, Xt = !F(Q) && F(Q.set) ? Q.set.bind(s) : Be, at = ie({
        get: lt,
        set: Xt
      });
      Object.defineProperty(n, se, {
        enumerable: !0,
        configurable: !0,
        get: () => at.value,
        set: ($e) => at.value = $e
      });
    }
  if (l)
    for (const se in l)
      li(l[se], n, s, se);
  if (a) {
    const se = F(a) ? a.call(s) : a;
    Reflect.ownKeys(se).forEach((Q) => {
      Eo(Q, se[Q]);
    });
  }
  f && Ln(f, e, "c");
  function le(se, Q) {
    I(Q) ? Q.forEach((lt) => se(lt.bind(s))) : Q && se(Q.bind(s));
  }
  if (le(Do, d), le(ri, v), le(Ho, m), le(Vo, T), le(No, M), le(Fo, k), le(Ko, be), le(zo, oe), le(Uo, de), le(ii, O), le(oi, j), le(Bo, D), I(J))
    if (J.length) {
      const se = e.exposed || (e.exposed = {});
      J.forEach((Q) => {
        Object.defineProperty(se, Q, {
          get: () => s[Q],
          set: (lt) => s[Q] = lt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  q && e.render === Be && (e.render = q), te != null && (e.inheritAttrs = te), P && (e.components = P), ee && (e.directives = ee), D && si(e);
}
function qo(e, t, s = Be) {
  I(e) && (e = Qs(e));
  for (const n in e) {
    const r = e[n];
    let i;
    W(r) ? "default" in r ? i = Ft(
      r.from || n,
      r.default,
      !0
    ) : i = Ft(r.from || n) : i = Ft(r), /* @__PURE__ */ ue(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[n] = i;
  }
}
function Ln(e, t, s) {
  Ie(
    I(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function li(e, t, s, n) {
  let r = n.includes(".") ? qr(s, n) : () => s[n];
  if (re(e)) {
    const i = t[e];
    F(i) && rs(r, i);
  } else if (F(e))
    rs(r, e.bind(s));
  else if (W(e))
    if (I(e))
      e.forEach((i) => li(i, t, s, n));
    else {
      const i = F(e.handler) ? e.handler.bind(s) : t[e.handler];
      F(i) && rs(r, i, e);
    }
}
function ai(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !r.length && !s && !n ? a = t : (a = {}, r.length && r.forEach(
    (p) => ds(a, p, o, !0)
  ), ds(a, t, o)), W(t) && i.set(t, a), a;
}
function ds(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && ds(e, i, s, !0), r && r.forEach(
    (o) => ds(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const l = Yo[o] || s && s[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Yo = {
  data: Dn,
  props: Hn,
  emits: Hn,
  // objects
  methods: It,
  computed: It,
  // lifecycle
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  // assets
  components: It,
  directives: It,
  // watch
  watch: Xo,
  // provide / inject
  provide: Dn,
  inject: Qo
};
function Dn(e, t) {
  return t ? e ? function() {
    return ne(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qo(e, t) {
  return It(Qs(e), Qs(t));
}
function Qs(e) {
  if (I(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hn(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ne(
    /* @__PURE__ */ Object.create(null),
    Fn(e),
    Fn(t ?? {})
  ) : t;
}
function Xo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ne(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = pe(e[n], t[n]);
  return s;
}
function ci() {
  return {
    app: null,
    config: {
      isNativeTag: mr,
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
let Zo = 0;
function el(e, t) {
  return function(n, r = null) {
    F(n) || (n = ne({}, n)), r != null && !W(r) && (r = null);
    const i = ci(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const p = i.app = {
      _uid: Zo++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: jl,
      get config() {
        return i.config;
      },
      set config(f) {
      },
      use(f, ...d) {
        return o.has(f) || (f && F(f.install) ? (o.add(f), f.install(p, ...d)) : F(f) && (o.add(f), f(p, ...d))), p;
      },
      mixin(f) {
        return i.mixins.includes(f) || i.mixins.push(f), p;
      },
      component(f, d) {
        return d ? (i.components[f] = d, p) : i.components[f];
      },
      directive(f, d) {
        return d ? (i.directives[f] = d, p) : i.directives[f];
      },
      mount(f, d, v) {
        if (!a) {
          const m = p._ceVNode || ve(n, r);
          return m.appContext = i, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(m, f, v), a = !0, p._container = f, f.__vue_app__ = p, As(m.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        a && (Ie(
          l,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(f, d) {
        return i.provides[f] = d, p;
      },
      runWithContext(f) {
        const d = Tt;
        Tt = p;
        try {
          return f();
        } finally {
          Tt = d;
        }
      }
    };
    return p;
  };
}
let Tt = null;
const tl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${Ee(t)}Modifiers`];
function sl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Y;
  let r = s;
  const i = t.startsWith("update:"), o = i && tl(n, t.slice(7));
  o && (o.trim && (r = s.map((f) => re(f) ? f.trim() : f)), o.number && (r = s.map(ln)));
  let l, a = n[l = Ps(t)] || // also try camelCase event handler (#2249)
  n[l = Ps(Oe(t))];
  !a && i && (a = n[l = Ps(Ee(t))]), a && Ie(
    a,
    e,
    6,
    r
  );
  const p = n[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ie(
      p,
      e,
      6,
      r
    );
  }
}
const nl = /* @__PURE__ */ new WeakMap();
function fi(e, t, s = !1) {
  const n = s ? nl : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!F(e)) {
    const a = (p) => {
      const f = fi(p, t, !0);
      f && (l = !0, ne(o, f));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (W(e) && n.set(e, null), null) : (I(i) ? i.forEach((a) => o[a] = null) : ne(o, i), W(e) && n.set(e, o), o);
}
function Ss(e, t) {
  return !e || !ms(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Ee(t)) || K(e, t));
}
function Vn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: p,
    renderCache: f,
    props: d,
    data: v,
    setupState: m,
    ctx: T,
    inheritAttrs: M
  } = e, k = fs(e);
  let w, O;
  try {
    if (s.shapeFlag & 4) {
      const j = r || n, q = j;
      w = Ve(
        p.call(
          q,
          j,
          f,
          d,
          m,
          v,
          T
        )
      ), O = l;
    } else {
      const j = t;
      w = Ve(
        j.length > 1 ? j(
          d,
          { attrs: l, slots: o, emit: a }
        ) : j(
          d,
          null
        )
      ), O = t.props ? l : rl(l);
    }
  } catch (j) {
    Vt.length = 0, xs(j, e, 1), w = ve(ge);
  }
  let V = w;
  if (O && M !== !1) {
    const j = Object.keys(O), { shapeFlag: q } = V;
    j.length && q & 7 && (i && j.some(nn) && (O = il(
      O,
      i
    )), V = ot(V, O, !1, !0));
  }
  return s.dirs && (V = ot(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(s.dirs) : s.dirs), s.transition && Kt(V, s.transition), w = V, fs(k), w;
}
const rl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ms(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, il = (e, t) => {
  const s = {};
  for (const n in e)
    (!nn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function ol(e, t, s) {
  const { props: n, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, p = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? Bn(n, o, p) : !!o;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        const v = f[d];
        if (ui(o, n, v) && !Ss(p, v))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? Bn(n, o, p) : !0 : !!o;
  return !1;
}
function Bn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (ui(t, e, i) && !Ss(s, i))
      return !0;
  }
  return !1;
}
function ui(e, t, s) {
  const n = e[s], r = t[s];
  return s === "style" && W(n) && W(r) ? !an(n, r) : n !== r;
}
function ll({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const di = {}, pi = () => Object.create(di), hi = (e) => Object.getPrototypeOf(e) === di;
function al(e, t, s, n = !1) {
  const r = {}, i = pi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), gi(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  s ? e.props = n ? r : /* @__PURE__ */ ho(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function cl(e, t, s, n) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ z(r), [a] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        let v = f[d];
        if (Ss(e.emitsOptions, v))
          continue;
        const m = t[v];
        if (a)
          if (K(i, v))
            m !== i[v] && (i[v] = m, p = !0);
          else {
            const T = Oe(v);
            r[T] = Xs(
              a,
              l,
              T,
              m,
              e,
              !1
            );
          }
        else
          m !== i[v] && (i[v] = m, p = !0);
      }
    }
  } else {
    gi(e, t, r, i) && (p = !0);
    let f;
    for (const d in l)
      (!t || // for camelCase
      !K(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Ee(d)) === d || !K(t, f))) && (a ? s && // for camelCase
      (s[d] !== void 0 || // for kebab-case
      s[f] !== void 0) && (r[d] = Xs(
        a,
        l,
        d,
        void 0,
        e,
        !0
      )) : delete r[d]);
    if (i !== l)
      for (const d in i)
        (!t || !K(t, d)) && (delete i[d], p = !0);
  }
  p && qe(e.attrs, "set", "");
}
function gi(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if ($t(a))
        continue;
      const p = t[a];
      let f;
      r && K(r, f = Oe(a)) ? !i || !i.includes(f) ? s[f] = p : (l || (l = {}))[f] = p : Ss(e.emitsOptions, a) || (!(a in n) || p !== n[a]) && (n[a] = p, o = !0);
    }
  if (i) {
    const a = /* @__PURE__ */ z(s), p = l || Y;
    for (let f = 0; f < i.length; f++) {
      const d = i[f];
      s[d] = Xs(
        r,
        a,
        d,
        p[d],
        e,
        !K(p, d)
      );
    }
  }
  return o;
}
function Xs(e, t, s, n, r, i) {
  const o = e[s];
  if (o != null) {
    const l = K(o, "default");
    if (l && n === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && F(a)) {
        const { propsDefaults: p } = r;
        if (s in p)
          n = p[s];
        else {
          const f = Qt(r);
          n = p[s] = a.call(
            null,
            t
          ), f();
        }
      } else
        n = a;
      r.ce && r.ce._setProp(s, n);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ee(s)) && (n = !0));
  }
  return n;
}
const fl = /* @__PURE__ */ new WeakMap();
function mi(e, t, s = !1) {
  const n = s ? fl : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!F(e)) {
    const f = (d) => {
      a = !0;
      const [v, m] = mi(d, t, !0);
      ne(o, v), m && l.push(...m);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !a)
    return W(e) && n.set(e, wt), wt;
  if (I(i))
    for (let f = 0; f < i.length; f++) {
      const d = Oe(i[f]);
      Un(d) && (o[d] = Y);
    }
  else if (i)
    for (const f in i) {
      const d = Oe(f);
      if (Un(d)) {
        const v = i[f], m = o[d] = I(v) || F(v) ? { type: v } : ne({}, v), T = m.type;
        let M = !1, k = !0;
        if (I(T))
          for (let w = 0; w < T.length; ++w) {
            const O = T[w], V = F(O) && O.name;
            if (V === "Boolean") {
              M = !0;
              break;
            } else V === "String" && (k = !1);
          }
        else
          M = F(T) && T.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = M, m[
          1
          /* shouldCastTrue */
        ] = k, (M || K(m, "default")) && l.push(d);
      }
    }
  const p = [o, l];
  return W(e) && n.set(e, p), p;
}
function Un(e) {
  return e[0] !== "$" && !$t(e);
}
const bn = (e) => e === "_" || e === "_ctx" || e === "$stable", _n = (e) => I(e) ? e.map(Ve) : [Ve(e)], ul = (e, t, s) => {
  if (t._n)
    return t;
  const n = Gr((...r) => _n(t(...r)), s);
  return n._c = !1, n;
}, vi = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (bn(r)) continue;
    const i = e[r];
    if (F(i))
      t[r] = ul(r, i, n);
    else if (i != null) {
      const o = _n(i);
      t[r] = () => o;
    }
  }
}, bi = (e, t) => {
  const s = _n(t);
  e.slots.default = () => s;
}, _i = (e, t, s) => {
  for (const n in t)
    (s || !bn(n)) && (e[n] = t[n]);
}, dl = (e, t, s) => {
  const n = e.slots = pi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (_i(n, t, s), s && xr(n, "_", r, !0)) : vi(t, n);
  } else t && bi(e, t);
}, pl = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let i = !0, o = Y;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : _i(r, t, s) : (i = !t.$stable, vi(t, r)), o = t;
  } else t && (bi(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !bn(l) && o[l] == null && delete r[l];
}, xe = bl;
function hl(e) {
  return gl(e);
}
function gl(e, t) {
  const s = _s();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: p,
    setElementText: f,
    parentNode: d,
    nextSibling: v,
    setScopeId: m = Be,
    insertStaticContent: T
  } = e, M = (c, u, h, x = null, b = null, _ = null, A = void 0, S = null, C = !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !ht(c, u) && (x = Zt(c), $e(c, b, _, !0), c = null), u.patchFlag === -2 && (C = !1, u.dynamicChildren = null);
    const { type: y, ref: $, shapeFlag: E } = u;
    switch (y) {
      case Ts:
        k(c, u, h, x);
        break;
      case ge:
        w(c, u, h, x);
        break;
      case Fs:
        c == null && O(u, h, x, A);
        break;
      case ae:
        P(
          c,
          u,
          h,
          x,
          b,
          _,
          A,
          S,
          C
        );
        break;
      default:
        E & 1 ? q(
          c,
          u,
          h,
          x,
          b,
          _,
          A,
          S,
          C
        ) : E & 6 ? ee(
          c,
          u,
          h,
          x,
          b,
          _,
          A,
          S,
          C
        ) : (E & 64 || E & 128) && y.process(
          c,
          u,
          h,
          x,
          b,
          _,
          A,
          S,
          C,
          Pt
        );
    }
    $ != null && b ? Lt($, c && c.ref, _, u || c, !u) : $ == null && c && c.ref != null && Lt(c.ref, null, _, c, !0);
  }, k = (c, u, h, x) => {
    if (c == null)
      n(
        u.el = l(u.children),
        h,
        x
      );
    else {
      const b = u.el = c.el;
      u.children !== c.children && p(b, u.children);
    }
  }, w = (c, u, h, x) => {
    c == null ? n(
      u.el = a(u.children || ""),
      h,
      x
    ) : u.el = c.el;
  }, O = (c, u, h, x) => {
    [c.el, c.anchor] = T(
      c.children,
      u,
      h,
      x,
      c.el,
      c.anchor
    );
  }, V = ({ el: c, anchor: u }, h, x) => {
    let b;
    for (; c && c !== u; )
      b = v(c), n(c, h, x), c = b;
    n(u, h, x);
  }, j = ({ el: c, anchor: u }) => {
    let h;
    for (; c && c !== u; )
      h = v(c), r(c), c = h;
    r(u);
  }, q = (c, u, h, x, b, _, A, S, C) => {
    if (u.type === "svg" ? A = "svg" : u.type === "math" && (A = "mathml"), c == null)
      oe(
        u,
        h,
        x,
        b,
        _,
        A,
        S,
        C
      );
    else {
      const y = c.el && c.el._isVueCE ? c.el : null;
      try {
        y && y._beginPatch(), D(
          c,
          u,
          b,
          _,
          A,
          S,
          C
        );
      } finally {
        y && y._endPatch();
      }
    }
  }, oe = (c, u, h, x, b, _, A, S) => {
    let C, y;
    const { props: $, shapeFlag: E, transition: R, dirs: N } = c;
    if (C = c.el = o(
      c.type,
      _,
      $ && $.is,
      $
    ), E & 8 ? f(C, c.children) : E & 16 && be(
      c.children,
      C,
      null,
      x,
      b,
      Ns(c, _),
      A,
      S
    ), N && ct(c, null, x, "created"), de(C, c, c.scopeId, A, x), $) {
      for (const X in $)
        X !== "value" && !$t(X) && i(C, X, null, $[X], _, x);
      "value" in $ && i(C, "value", null, $.value, _), (y = $.onVnodeBeforeMount) && Le(y, x, c);
    }
    N && ct(c, null, x, "beforeMount");
    const B = ml(b, R);
    B && R.beforeEnter(C), n(C, u, h), ((y = $ && $.onVnodeMounted) || B || N) && xe(() => {
      y && Le(y, x, c), B && R.enter(C), N && ct(c, null, x, "mounted");
    }, b);
  }, de = (c, u, h, x, b) => {
    if (h && m(c, h), x)
      for (let _ = 0; _ < x.length; _++)
        m(c, x[_]);
    if (b) {
      let _ = b.subTree;
      if (u === _ || Ci(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const A = b.vnode;
        de(
          c,
          A,
          A.scopeId,
          A.slotScopeIds,
          b.parent
        );
      }
    }
  }, be = (c, u, h, x, b, _, A, S, C = 0) => {
    for (let y = C; y < c.length; y++) {
      const $ = c[y] = S ? Je(c[y]) : Ve(c[y]);
      M(
        null,
        $,
        u,
        h,
        x,
        b,
        _,
        A,
        S
      );
    }
  }, D = (c, u, h, x, b, _, A) => {
    const S = u.el = c.el;
    let { patchFlag: C, dynamicChildren: y, dirs: $ } = u;
    C |= c.patchFlag & 16;
    const E = c.props || Y, R = u.props || Y;
    let N;
    if (h && ft(h, !1), (N = R.onVnodeBeforeUpdate) && Le(N, h, u, c), $ && ct(u, c, h, "beforeUpdate"), h && ft(h, !0), (E.innerHTML && R.innerHTML == null || E.textContent && R.textContent == null) && f(S, ""), y ? J(
      c.dynamicChildren,
      y,
      S,
      h,
      x,
      Ns(u, b),
      _
    ) : A || Q(
      c,
      u,
      S,
      null,
      h,
      x,
      Ns(u, b),
      _,
      !1
    ), C > 0) {
      if (C & 16)
        te(S, E, R, h, b);
      else if (C & 2 && E.class !== R.class && i(S, "class", null, R.class, b), C & 4 && i(S, "style", E.style, R.style, b), C & 8) {
        const B = u.dynamicProps;
        for (let X = 0; X < B.length; X++) {
          const G = B[X], _e = E[G], ye = R[G];
          (ye !== _e || G === "value") && i(S, G, _e, ye, b, h);
        }
      }
      C & 1 && c.children !== u.children && f(S, u.children);
    } else !A && y == null && te(S, E, R, h, b);
    ((N = R.onVnodeUpdated) || $) && xe(() => {
      N && Le(N, h, u, c), $ && ct(u, c, h, "updated");
    }, x);
  }, J = (c, u, h, x, b, _, A) => {
    for (let S = 0; S < u.length; S++) {
      const C = c[S], y = u[S], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ht(C, y) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 198) ? d(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      M(
        C,
        y,
        $,
        null,
        x,
        b,
        _,
        A,
        !0
      );
    }
  }, te = (c, u, h, x, b) => {
    if (u !== h) {
      if (u !== Y)
        for (const _ in u)
          !$t(_) && !(_ in h) && i(
            c,
            _,
            u[_],
            null,
            b,
            x
          );
      for (const _ in h) {
        if ($t(_)) continue;
        const A = h[_], S = u[_];
        A !== S && _ !== "value" && i(c, _, S, A, b, x);
      }
      "value" in h && i(c, "value", u.value, h.value, b);
    }
  }, P = (c, u, h, x, b, _, A, S, C) => {
    const y = u.el = c ? c.el : l(""), $ = u.anchor = c ? c.anchor : l("");
    let { patchFlag: E, dynamicChildren: R, slotScopeIds: N } = u;
    N && (S = S ? S.concat(N) : N), c == null ? (n(y, h, x), n($, h, x), be(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      $,
      b,
      _,
      A,
      S,
      C
    )) : E > 0 && E & 64 && R && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === R.length ? (J(
      c.dynamicChildren,
      R,
      h,
      b,
      _,
      A,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || b && u === b.subTree) && yi(
      c,
      u,
      !0
      /* shallow */
    )) : Q(
      c,
      u,
      h,
      $,
      b,
      _,
      A,
      S,
      C
    );
  }, ee = (c, u, h, x, b, _, A, S, C) => {
    u.slotScopeIds = S, c == null ? u.shapeFlag & 512 ? b.ctx.activate(
      u,
      h,
      x,
      A,
      C
    ) : ce(
      u,
      h,
      x,
      b,
      _,
      A,
      C
    ) : ze(c, u, C);
  }, ce = (c, u, h, x, b, _, A) => {
    const S = c.component = Tl(
      c,
      x,
      b
    );
    if (ws(c) && (S.ctx.renderer = Pt), Al(S, !1, A), S.asyncDep) {
      if (b && b.registerDep(S, le, A), !c.el) {
        const C = S.subTree = ve(ge);
        w(null, C, u, h), c.placeholder = C.el;
      }
    } else
      le(
        S,
        c,
        u,
        h,
        b,
        _,
        A
      );
  }, ze = (c, u, h) => {
    const x = u.component = c.component;
    if (ol(c, u, h))
      if (x.asyncDep && !x.asyncResolved) {
        se(x, u, h);
        return;
      } else
        x.next = u, x.update();
    else
      u.el = c.el, x.vnode = u;
  }, le = (c, u, h, x, b, _, A) => {
    const S = () => {
      if (c.isMounted) {
        let { next: E, bu: R, u: N, parent: B, vnode: X } = c;
        {
          const Ne = xi(c);
          if (Ne) {
            E && (E.el = X.el, se(c, E, A)), Ne.asyncDep.then(() => {
              xe(() => {
                c.isUnmounted || y();
              }, b);
            });
            return;
          }
        }
        let G = E, _e;
        ft(c, !1), E ? (E.el = X.el, se(c, E, A)) : E = X, R && ns(R), (_e = E.props && E.props.onVnodeBeforeUpdate) && Le(_e, B, E, X), ft(c, !0);
        const ye = Vn(c), ke = c.subTree;
        c.subTree = ye, M(
          ke,
          ye,
          // parent may have changed if it's in a teleport
          d(ke.el),
          // anchor may have changed if it's in a fragment
          Zt(ke),
          c,
          b,
          _
        ), E.el = ye.el, G === null && ll(c, ye.el), N && xe(N, b), (_e = E.props && E.props.onVnodeUpdated) && xe(
          () => Le(_e, B, E, X),
          b
        );
      } else {
        let E;
        const { el: R, props: N } = u, { bm: B, m: X, parent: G, root: _e, type: ye } = c, ke = Dt(u);
        ft(c, !1), B && ns(B), !ke && (E = N && N.onVnodeBeforeMount) && Le(E, G, u), ft(c, !0);
        {
          _e.ce && _e.ce._hasShadowRoot() && _e.ce._injectChildStyle(ye);
          const Ne = c.subTree = Vn(c);
          M(
            null,
            Ne,
            h,
            x,
            c,
            b,
            _
          ), u.el = Ne.el;
        }
        if (X && xe(X, b), !ke && (E = N && N.onVnodeMounted)) {
          const Ne = u;
          xe(
            () => Le(E, G, Ne),
            b
          );
        }
        (u.shapeFlag & 256 || G && Dt(G.vnode) && G.vnode.shapeFlag & 256) && c.a && xe(c.a, b), c.isMounted = !0, u = h = x = null;
      }
    };
    c.scope.on();
    const C = c.effect = new Tr(S);
    c.scope.off();
    const y = c.update = C.run.bind(C), $ = c.job = C.runIfDirty.bind(C);
    $.i = c, $.id = c.uid, C.scheduler = () => vn($), ft(c, !0), y();
  }, se = (c, u, h) => {
    u.component = c;
    const x = c.vnode.props;
    c.vnode = u, c.next = null, cl(c, u.props, x, h), pl(c, u.children, h), Xe(), In(c), Ze();
  }, Q = (c, u, h, x, b, _, A, S, C = !1) => {
    const y = c && c.children, $ = c ? c.shapeFlag : 0, E = u.children, { patchFlag: R, shapeFlag: N } = u;
    if (R > 0) {
      if (R & 128) {
        Xt(
          y,
          E,
          h,
          x,
          b,
          _,
          A,
          S,
          C
        );
        return;
      } else if (R & 256) {
        lt(
          y,
          E,
          h,
          x,
          b,
          _,
          A,
          S,
          C
        );
        return;
      }
    }
    N & 8 ? ($ & 16 && Et(y, b, _), E !== y && f(h, E)) : $ & 16 ? N & 16 ? Xt(
      y,
      E,
      h,
      x,
      b,
      _,
      A,
      S,
      C
    ) : Et(y, b, _, !0) : ($ & 8 && f(h, ""), N & 16 && be(
      E,
      h,
      x,
      b,
      _,
      A,
      S,
      C
    ));
  }, lt = (c, u, h, x, b, _, A, S, C) => {
    c = c || wt, u = u || wt;
    const y = c.length, $ = u.length, E = Math.min(y, $);
    let R;
    for (R = 0; R < E; R++) {
      const N = u[R] = C ? Je(u[R]) : Ve(u[R]);
      M(
        c[R],
        N,
        h,
        null,
        b,
        _,
        A,
        S,
        C
      );
    }
    y > $ ? Et(
      c,
      b,
      _,
      !0,
      !1,
      E
    ) : be(
      u,
      h,
      x,
      b,
      _,
      A,
      S,
      C,
      E
    );
  }, Xt = (c, u, h, x, b, _, A, S, C) => {
    let y = 0;
    const $ = u.length;
    let E = c.length - 1, R = $ - 1;
    for (; y <= E && y <= R; ) {
      const N = c[y], B = u[y] = C ? Je(u[y]) : Ve(u[y]);
      if (ht(N, B))
        M(
          N,
          B,
          h,
          null,
          b,
          _,
          A,
          S,
          C
        );
      else
        break;
      y++;
    }
    for (; y <= E && y <= R; ) {
      const N = c[E], B = u[R] = C ? Je(u[R]) : Ve(u[R]);
      if (ht(N, B))
        M(
          N,
          B,
          h,
          null,
          b,
          _,
          A,
          S,
          C
        );
      else
        break;
      E--, R--;
    }
    if (y > E) {
      if (y <= R) {
        const N = R + 1, B = N < $ ? u[N].el : x;
        for (; y <= R; )
          M(
            null,
            u[y] = C ? Je(u[y]) : Ve(u[y]),
            h,
            B,
            b,
            _,
            A,
            S,
            C
          ), y++;
      }
    } else if (y > R)
      for (; y <= E; )
        $e(c[y], b, _, !0), y++;
    else {
      const N = y, B = y, X = /* @__PURE__ */ new Map();
      for (y = B; y <= R; y++) {
        const Se = u[y] = C ? Je(u[y]) : Ve(u[y]);
        Se.key != null && X.set(Se.key, y);
      }
      let G, _e = 0;
      const ye = R - B + 1;
      let ke = !1, Ne = 0;
      const Mt = new Array(ye);
      for (y = 0; y < ye; y++) Mt[y] = 0;
      for (y = N; y <= E; y++) {
        const Se = c[y];
        if (_e >= ye) {
          $e(Se, b, _, !0);
          continue;
        }
        let Fe;
        if (Se.key != null)
          Fe = X.get(Se.key);
        else
          for (G = B; G <= R; G++)
            if (Mt[G - B] === 0 && ht(Se, u[G])) {
              Fe = G;
              break;
            }
        Fe === void 0 ? $e(Se, b, _, !0) : (Mt[Fe - B] = y + 1, Fe >= Ne ? Ne = Fe : ke = !0, M(
          Se,
          u[Fe],
          h,
          null,
          b,
          _,
          A,
          S,
          C
        ), _e++);
      }
      const An = ke ? vl(Mt) : wt;
      for (G = An.length - 1, y = ye - 1; y >= 0; y--) {
        const Se = B + y, Fe = u[Se], En = u[Se + 1], Pn = Se + 1 < $ ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          En.el || wi(En)
        ) : x;
        Mt[y] === 0 ? M(
          null,
          Fe,
          h,
          Pn,
          b,
          _,
          A,
          S,
          C
        ) : ke && (G < 0 || y !== An[G] ? at(Fe, h, Pn, 2) : G--);
      }
    }
  }, at = (c, u, h, x, b = null) => {
    const { el: _, type: A, transition: S, children: C, shapeFlag: y } = c;
    if (y & 6) {
      at(c.component.subTree, u, h, x);
      return;
    }
    if (y & 128) {
      c.suspense.move(u, h, x);
      return;
    }
    if (y & 64) {
      A.move(c, u, h, Pt);
      return;
    }
    if (A === ae) {
      n(_, u, h);
      for (let E = 0; E < C.length; E++)
        at(C[E], u, h, x);
      n(c.anchor, u, h);
      return;
    }
    if (A === Fs) {
      V(c, u, h);
      return;
    }
    if (x !== 2 && y & 1 && S)
      if (x === 0)
        S.beforeEnter(_), n(_, u, h), xe(() => S.enter(_), b);
      else {
        const { leave: E, delayLeave: R, afterLeave: N } = S, B = () => {
          c.ctx.isUnmounted ? r(_) : n(_, u, h);
        }, X = () => {
          _._isLeaving && _[He](
            !0
            /* cancelled */
          ), E(_, () => {
            B(), N && N();
          });
        };
        R ? R(_, B, X) : X();
      }
    else
      n(_, u, h);
  }, $e = (c, u, h, x = !1, b = !1) => {
    const {
      type: _,
      props: A,
      ref: S,
      children: C,
      dynamicChildren: y,
      shapeFlag: $,
      patchFlag: E,
      dirs: R,
      cacheIndex: N
    } = c;
    if (E === -2 && (b = !1), S != null && (Xe(), Lt(S, null, h, c, !0), Ze()), N != null && (u.renderCache[N] = void 0), $ & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const B = $ & 1 && R, X = !Dt(c);
    let G;
    if (X && (G = A && A.onVnodeBeforeUnmount) && Le(G, u, c), $ & 6)
      ki(c.component, h, x);
    else {
      if ($ & 128) {
        c.suspense.unmount(h, x);
        return;
      }
      B && ct(c, null, u, "beforeUnmount"), $ & 64 ? c.type.remove(
        c,
        u,
        h,
        Pt,
        x
      ) : y && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !y.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ae || E > 0 && E & 64) ? Et(
        y,
        u,
        h,
        !1,
        !0
      ) : (_ === ae && E & 384 || !b && $ & 16) && Et(C, u, h), x && Sn(c);
    }
    (X && (G = A && A.onVnodeUnmounted) || B) && xe(() => {
      G && Le(G, u, c), B && ct(c, null, u, "unmounted");
    }, h);
  }, Sn = (c) => {
    const { type: u, el: h, anchor: x, transition: b } = c;
    if (u === ae) {
      $i(h, x);
      return;
    }
    if (u === Fs) {
      j(c);
      return;
    }
    const _ = () => {
      r(h), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (c.shapeFlag & 1 && b && !b.persisted) {
      const { leave: A, delayLeave: S } = b, C = () => A(h, _);
      S ? S(c.el, _, C) : C();
    } else
      _();
  }, $i = (c, u) => {
    let h;
    for (; c !== u; )
      h = v(c), r(c), c = h;
    r(u);
  }, ki = (c, u, h) => {
    const { bum: x, scope: b, job: _, subTree: A, um: S, m: C, a: y } = c;
    zn(C), zn(y), x && ns(x), b.stop(), _ && (_.flags |= 8, $e(A, c, u, h)), S && xe(S, u), xe(() => {
      c.isUnmounted = !0;
    }, u);
  }, Et = (c, u, h, x = !1, b = !1, _ = 0) => {
    for (let A = _; A < c.length; A++)
      $e(c[A], u, h, x, b);
  }, Zt = (c) => {
    if (c.shapeFlag & 6)
      return Zt(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const u = v(c.anchor || c.el), h = u && u[Ro];
    return h ? v(h) : u;
  };
  let Es = !1;
  const Tn = (c, u, h) => {
    let x;
    c == null ? u._vnode && ($e(u._vnode, null, null, !0), x = u._vnode.component) : M(
      u._vnode || null,
      c,
      u,
      null,
      null,
      null,
      h
    ), u._vnode = c, Es || (Es = !0, In(x), zr(), Es = !1);
  }, Pt = {
    p: M,
    um: $e,
    m: at,
    r: Sn,
    mt: ce,
    mc: be,
    pc: Q,
    pbc: J,
    n: Zt,
    o: e
  };
  return {
    render: Tn,
    hydrate: void 0,
    createApp: el(Tn)
  };
}
function Ns({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ft({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ml(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function yi(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (I(n) && I(r))
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Je(r[i]), l.el = o.el), !s && l.patchFlag !== -2 && yi(o, l)), l.type === Ts && (l.patchFlag === -1 && (l = r[i] = Je(l)), l.el = o.el), l.type === ge && !l.el && (l.el = o.el);
    }
}
function vl(e) {
  const t = e.slice(), s = [0];
  let n, r, i, o, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const p = e[n];
    if (p !== 0) {
      if (r = s[s.length - 1], e[r] < p) {
        t[n] = r, s.push(n);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; )
        l = i + o >> 1, e[s[l]] < p ? i = l + 1 : o = l;
      p < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; )
    s[i] = o, o = t[o];
  return s;
}
function xi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xi(t);
}
function zn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function wi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? wi(t.subTree) : null;
}
const Ci = (e) => e.__isSuspense;
function bl(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : To(e);
}
const ae = /* @__PURE__ */ Symbol.for("v-fgt"), Ts = /* @__PURE__ */ Symbol.for("v-txt"), ge = /* @__PURE__ */ Symbol.for("v-cmt"), Fs = /* @__PURE__ */ Symbol.for("v-stc"), Vt = [];
let Te = null;
function L(e = !1) {
  Vt.push(Te = e ? null : []);
}
function _l() {
  Vt.pop(), Te = Vt[Vt.length - 1] || null;
}
let Wt = 1;
function ps(e, t = !1) {
  Wt += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function Si(e) {
  return e.dynamicChildren = Wt > 0 ? Te || wt : null, _l(), Wt > 0 && Te && Te.push(e), e;
}
function H(e, t, s, n, r, i) {
  return Si(
    g(
      e,
      t,
      s,
      n,
      r,
      i,
      !0
    )
  );
}
function Zs(e, t, s, n, r) {
  return Si(
    ve(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function hs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ti = ({ key: e }) => e ?? null, is = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? re(e) || /* @__PURE__ */ ue(e) || F(e) ? { i: Pe, r: e, k: t, f: !!s } : e : null);
function g(e, t = null, s = null, n = 0, r = null, i = e === ae ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ti(t),
    ref: t && is(t),
    scopeId: Wr,
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
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe
  };
  return l ? (yn(a, s), i & 128 && e.normalize(a)) : s && (a.shapeFlag |= re(s) ? 8 : 16), Wt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Te.push(a), a;
}
const ve = yl;
function yl(e, t = null, s = null, n = 0, r = null, i = !1) {
  if ((!e || e === Wo) && (e = ge), hs(e)) {
    const l = ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && yn(l, s), Wt > 0 && !i && Te && (l.shapeFlag & 6 ? Te[Te.indexOf(e)] = l : Te.push(l)), l.patchFlag = -2, l;
  }
  if (Ol(e) && (e = e.__vccOpts), t) {
    t = xl(t);
    let { class: l, style: a } = t;
    l && !re(l) && (t.class = Qe(l)), W(a) && (/* @__PURE__ */ mn(a) && !I(a) && (a = ne({}, a)), t.style = mt(a));
  }
  const o = re(e) ? 1 : Ci(e) ? 128 : Yr(e) ? 64 : W(e) ? 4 : F(e) ? 2 : 0;
  return g(
    e,
    t,
    s,
    n,
    r,
    o,
    i,
    !0
  );
}
function xl(e) {
  return e ? /* @__PURE__ */ mn(e) || hi(e) ? ne({}, e) : e : null;
}
function ot(e, t, s = !1, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, p = t ? wl(r || {}, t) : r, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Ti(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? I(i) ? i.concat(is(t)) : [i, is(t)] : is(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ae ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ot(e.ssContent),
    ssFallback: e.ssFallback && ot(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && n && Kt(
    f,
    a.clone(f)
  ), f;
}
function os(e = " ", t = 0) {
  return ve(Ts, null, e, t);
}
function we(e = "", t = !1) {
  return t ? (L(), Zs(ge, null, e)) : ve(ge, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? ve(ge) : I(e) ? ve(
    ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : hs(e) ? Je(e) : ve(Ts, null, String(e));
}
function Je(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ot(e);
}
function yn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (I(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), yn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !hi(t) ? t._ctx = Pe : r === 3 && Pe && (Pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else F(t) ? (t = { default: t, _ctx: Pe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [os(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function wl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Qe([t.class, n.class]));
      else if (r === "style")
        t.style = mt([t.style, n.style]);
      else if (ms(r)) {
        const i = t[r], o = n[r];
        o && i !== o && !(I(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Le(e, t, s, n = null) {
  Ie(e, t, 7, [
    s,
    n
  ]);
}
const Cl = ci();
let Sl = 0;
function Tl(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Cl, i = {
    uid: Sl++,
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
    scope: new Gi(
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
    propsOptions: mi(n, r),
    emitsOptions: fi(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Y,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Y,
    data: Y,
    props: Y,
    attrs: Y,
    slots: Y,
    refs: Y,
    setupState: Y,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = sl.bind(null, i), e.ce && e.ce(i), i;
}
let me = null;
const Ai = () => me || Pe;
let gs, en;
{
  const e = _s(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  gs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => me = s
  ), en = t(
    "__VUE_SSR_SETTERS__",
    (s) => Gt = s
  );
}
const Qt = (e) => {
  const t = me;
  return gs(e), e.scope.on(), () => {
    e.scope.off(), gs(t);
  };
}, Kn = () => {
  me && me.scope.off(), gs(null);
};
function Ei(e) {
  return e.vnode.shapeFlag & 4;
}
let Gt = !1;
function Al(e, t = !1, s = !1) {
  t && en(t);
  const { props: n, children: r } = e.vnode, i = Ei(e);
  al(e, n, i, t), dl(e, r, s || t);
  const o = i ? El(e, t) : void 0;
  return t && en(!1), o;
}
function El(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Go);
  const { setup: n } = s;
  if (n) {
    Xe();
    const r = e.setupContext = n.length > 1 ? Ml(e) : null, i = Qt(e), o = Yt(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = br(o);
    if (Ze(), i(), (l || e.sp) && !Dt(e) && si(e), l) {
      if (o.then(Kn, Kn), t)
        return o.then((a) => {
          Wn(e, a);
        }).catch((a) => {
          xs(a, e, 0);
        });
      e.asyncDep = o;
    } else
      Wn(e, o);
  } else
    Pi(e);
}
function Wn(e, t, s) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) && (e.setupState = Hr(t)), Pi(e);
}
function Pi(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Be);
  {
    const r = Qt(e);
    Xe();
    try {
      Jo(e);
    } finally {
      Ze(), r();
    }
  }
}
const Pl = {
  get(e, t) {
    return fe(e, "get", ""), e[t];
  }
};
function Ml(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Pl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function As(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Hr(go(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Ht)
        return Ht[s](e);
    },
    has(t, s) {
      return s in t || s in Ht;
    }
  })) : e.proxy;
}
function Ol(e) {
  return F(e) && "__vccOpts" in e;
}
const ie = (e, t) => /* @__PURE__ */ yo(e, t, Gt);
function Rl(e, t, s) {
  try {
    ps(-1);
    const n = arguments.length;
    return n === 2 ? W(t) && !I(t) ? hs(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && hs(s) && (s = [s]), ve(e, t, s));
  } finally {
    ps(1);
  }
}
const jl = "3.5.28";
let tn;
const Gn = typeof window < "u" && window.trustedTypes;
if (Gn)
  try {
    tn = /* @__PURE__ */ Gn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Mi = tn ? (e) => tn.createHTML(e) : (e) => e, Il = "http://www.w3.org/2000/svg", $l = "http://www.w3.org/1998/Math/MathML", Ge = typeof document < "u" ? document : null, Jn = Ge && /* @__PURE__ */ Ge.createElement("template"), kl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Ge.createElementNS(Il, e) : t === "mathml" ? Ge.createElementNS($l, e) : s ? Ge.createElement(e, { is: s }) : Ge.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Ge.createTextNode(e),
  createComment: (e) => Ge.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ge.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, i) {
    const o = s ? s.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      Jn.innerHTML = Mi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Jn.content;
      if (n === "svg" || n === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, st = "transition", jt = "animation", Jt = /* @__PURE__ */ Symbol("_vtc"), Oi = {
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
}, Nl = /* @__PURE__ */ ne(
  {},
  Qr,
  Oi
), Fl = (e) => (e.displayName = "Transition", e.props = Nl, e), Ll = /* @__PURE__ */ Fl(
  (e, { slots: t }) => Rl($o, Dl(e), t)
), ut = (e, t = []) => {
  I(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, qn = (e) => e ? I(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Dl(e) {
  const t = {};
  for (const P in e)
    P in Oi || (t[P] = e[P]);
  if (e.css === !1)
    return t;
  const {
    name: s = "v",
    type: n,
    duration: r,
    enterFromClass: i = `${s}-enter-from`,
    enterActiveClass: o = `${s}-enter-active`,
    enterToClass: l = `${s}-enter-to`,
    appearFromClass: a = i,
    appearActiveClass: p = o,
    appearToClass: f = l,
    leaveFromClass: d = `${s}-leave-from`,
    leaveActiveClass: v = `${s}-leave-active`,
    leaveToClass: m = `${s}-leave-to`
  } = e, T = Hl(r), M = T && T[0], k = T && T[1], {
    onBeforeEnter: w,
    onEnter: O,
    onEnterCancelled: V,
    onLeave: j,
    onLeaveCancelled: q,
    onBeforeAppear: oe = w,
    onAppear: de = O,
    onAppearCancelled: be = V
  } = t, D = (P, ee, ce, ze) => {
    P._enterCancelled = ze, dt(P, ee ? f : l), dt(P, ee ? p : o), ce && ce();
  }, J = (P, ee) => {
    P._isLeaving = !1, dt(P, d), dt(P, m), dt(P, v), ee && ee();
  }, te = (P) => (ee, ce) => {
    const ze = P ? de : O, le = () => D(ee, P, ce);
    ut(ze, [ee, le]), Yn(() => {
      dt(ee, P ? a : i), We(ee, P ? f : l), qn(ze) || Qn(ee, n, M, le);
    });
  };
  return ne(t, {
    onBeforeEnter(P) {
      ut(w, [P]), We(P, i), We(P, o);
    },
    onBeforeAppear(P) {
      ut(oe, [P]), We(P, a), We(P, p);
    },
    onEnter: te(!1),
    onAppear: te(!0),
    onLeave(P, ee) {
      P._isLeaving = !0;
      const ce = () => J(P, ee);
      We(P, d), P._enterCancelled ? (We(P, v), er(P)) : (er(P), We(P, v)), Yn(() => {
        P._isLeaving && (dt(P, d), We(P, m), qn(j) || Qn(P, n, k, ce));
      }), ut(j, [P, ce]);
    },
    onEnterCancelled(P) {
      D(P, !1, void 0, !0), ut(V, [P]);
    },
    onAppearCancelled(P) {
      D(P, !0, void 0, !0), ut(be, [P]);
    },
    onLeaveCancelled(P) {
      J(P), ut(q, [P]);
    }
  });
}
function Hl(e) {
  if (e == null)
    return null;
  if (W(e))
    return [Ls(e.enter), Ls(e.leave)];
  {
    const t = Ls(e);
    return [t, t];
  }
}
function Ls(e) {
  return Bs(e);
}
function We(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[Jt] || (e[Jt] = /* @__PURE__ */ new Set())).add(t);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const s = e[Jt];
  s && (s.delete(t), s.size || (e[Jt] = void 0));
}
function Yn(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Vl = 0;
function Qn(e, t, s, n) {
  const r = e._endId = ++Vl, i = () => {
    r === e._endId && n();
  };
  if (s != null)
    return setTimeout(i, s);
  const { type: o, timeout: l, propCount: a } = Bl(e, t);
  if (!o)
    return n();
  const p = o + "end";
  let f = 0;
  const d = () => {
    e.removeEventListener(p, v), i();
  }, v = (m) => {
    m.target === e && ++f >= a && d();
  };
  setTimeout(() => {
    f < a && d();
  }, l + 1), e.addEventListener(p, v);
}
function Bl(e, t) {
  const s = window.getComputedStyle(e), n = (T) => (s[T] || "").split(", "), r = n(`${st}Delay`), i = n(`${st}Duration`), o = Xn(r, i), l = n(`${jt}Delay`), a = n(`${jt}Duration`), p = Xn(l, a);
  let f = null, d = 0, v = 0;
  t === st ? o > 0 && (f = st, d = o, v = i.length) : t === jt ? p > 0 && (f = jt, d = p, v = a.length) : (d = Math.max(o, p), f = d > 0 ? o > p ? st : jt : null, v = f ? f === st ? i.length : a.length : 0);
  const m = f === st && /\b(?:transform|all)(?:,|$)/.test(
    n(`${st}Property`).toString()
  );
  return {
    type: f,
    timeout: d,
    propCount: v,
    hasTransform: m
  };
}
function Xn(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((s, n) => Zn(s) + Zn(e[n])));
}
function Zn(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function er(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Ul(e, t, s) {
  const n = e[Jt];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const tr = /* @__PURE__ */ Symbol("_vod"), zl = /* @__PURE__ */ Symbol("_vsh"), Kl = /* @__PURE__ */ Symbol(""), Wl = /(?:^|;)\s*display\s*:/;
function Gl(e, t, s) {
  const n = e.style, r = re(s);
  let i = !1;
  if (s && !r) {
    if (t)
      if (re(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          s[l] == null && ls(n, l, "");
        }
      else
        for (const o in t)
          s[o] == null && ls(n, o, "");
    for (const o in s)
      o === "display" && (i = !0), ls(n, o, s[o]);
  } else if (r) {
    if (t !== s) {
      const o = n[Kl];
      o && (s += ";" + o), n.cssText = s, i = Wl.test(s);
    }
  } else t && e.removeAttribute("style");
  tr in e && (e[tr] = i ? n.display : "", e[zl] && (n.display = "none"));
}
const sr = /\s*!important$/;
function ls(e, t, s) {
  if (I(s))
    s.forEach((n) => ls(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Jl(e, t);
    sr.test(s) ? e.setProperty(
      Ee(n),
      s.replace(sr, ""),
      "important"
    ) : e[n] = s;
  }
}
const nr = ["Webkit", "Moz", "ms"], Ds = {};
function Jl(e, t) {
  const s = Ds[t];
  if (s)
    return s;
  let n = Oe(t);
  if (n !== "filter" && n in e)
    return Ds[t] = n;
  n = yr(n);
  for (let r = 0; r < nr.length; r++) {
    const i = nr[r] + n;
    if (i in e)
      return Ds[t] = i;
  }
  return t;
}
const rr = "http://www.w3.org/1999/xlink";
function ir(e, t, s, n, r, i = Ki(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(rr, t.slice(6, t.length)) : e.setAttributeNS(rr, t, s) : s == null || i && !wr(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Ue(s) ? String(s) : s
  );
}
function or(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Mi(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== a || !("_value" in e)) && (e.value = a), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = wr(s) : s == null && l === "string" ? (s = "", o = !0) : l === "number" && (s = 0, o = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function xt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ql(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const lr = /* @__PURE__ */ Symbol("_vei");
function Yl(e, t, s, n, r = null) {
  const i = e[lr] || (e[lr] = {}), o = i[t];
  if (n && o)
    o.value = n;
  else {
    const [l, a] = Ql(t);
    if (n) {
      const p = i[t] = ea(
        n,
        r
      );
      xt(e, l, p, a);
    } else o && (ql(e, l, o, a), i[t] = void 0);
  }
}
const ar = /(?:Once|Passive|Capture)$/;
function Ql(e) {
  let t;
  if (ar.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ar); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ee(e.slice(2)), t];
}
let Hs = 0;
const Xl = /* @__PURE__ */ Promise.resolve(), Zl = () => Hs || (Xl.then(() => Hs = 0), Hs = Date.now());
function ea(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ie(
      ta(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Zl(), s;
}
function ta(e, t) {
  if (I(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const cr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, sa = (e, t, s, n, r, i) => {
  const o = r === "svg";
  t === "class" ? Ul(e, n, o) : t === "style" ? Gl(e, s, n) : ms(t) ? nn(t) || Yl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : na(e, t, n, o)) ? (or(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ir(e, t, n, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !re(n)) ? or(e, Oe(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ir(e, t, n, o));
};
function na(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && cr(t) && F(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return cr(t) && re(s) ? !1 : t in e;
}
const fr = {};
// @__NO_SIDE_EFFECTS__
function xn(e, t, s) {
  let n = /* @__PURE__ */ ko(e, t);
  vs(n) && (n = ne({}, n, t));
  class r extends wn {
    constructor(o) {
      super(n, o, s);
    }
  }
  return r.def = n, r;
}
const ra = typeof HTMLElement < "u" ? HTMLElement : class {
};
class wn extends ra {
  constructor(t, s = {}, n = gr) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== gr ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      ne({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof wn) {
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
    this._connected = !1, Br(() => {
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
      const { props: i, styles: o } = n;
      let l;
      if (i && !I(i))
        for (const a in i) {
          const p = i[a];
          (p === Number || p && p.type === Number) && (a in this._props && (this._props[a] = Bs(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[Oe(a)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(o), this._mount(n);
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
        K(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => Dr(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = I(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(Oe))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : fr;
    const r = Oe(t);
    s && this._numberProps && this._numberProps[r] && (n = Bs(n)), this._setProp(r, n, !1, !0);
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
    if (s !== this._props[t] && (this._dirty = !0, s === fr ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(Ee(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ee(t), s + "") : s || this.removeAttribute(Ee(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), aa(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = ve(this._def, ne(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (i, o) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            vs(o[0]) ? ne({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      n.emit = (i, ...o) => {
        r(i, o), Ee(i) !== i && r(Ee(i), o);
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
      const i = document.createElement("style");
      n && i.setAttribute("nonce", n), i.textContent = t[r], this.shadowRoot.prepend(i);
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
      const r = t[n], i = r.getAttribute("name") || "default", o = this._slots[i], l = r.parentNode;
      if (o)
        for (const a of o) {
          if (s && a.nodeType === 1) {
            const p = s + "-s", f = document.createTreeWalker(a, 1);
            a.setAttribute(p, "");
            let d;
            for (; d = f.nextNode(); )
              d.setAttribute(p, "");
          }
          l.insertBefore(a, r);
        }
      else
        for (; r.firstChild; ) l.insertBefore(r.firstChild, r);
      l.removeChild(r);
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
      for (let i = 0; i < r.length; i++)
        s.add(r[i]);
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
const ur = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return I(t) ? (s) => ns(t, s) : t;
};
function ia(e) {
  e.target.composing = !0;
}
function dr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Vs = /* @__PURE__ */ Symbol("_assign");
function pr(e, t, s) {
  return t && (e = e.trim()), s && (e = ln(e)), e;
}
const oa = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, r) {
    e[Vs] = ur(r);
    const i = n || r.props && r.props.type === "number";
    xt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Vs](pr(e.value, s, i));
    }), (s || i) && xt(e, "change", () => {
      e.value = pr(e.value, s, i);
    }), t || (xt(e, "compositionstart", ia), xt(e, "compositionend", dr), xt(e, "change", dr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: r, number: i } }, o) {
    if (e[Vs] = ur(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? ln(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (n && t === s || r && e.value.trim() === a) || (e.value = a));
  }
}, la = /* @__PURE__ */ ne({ patchProp: sa }, kl);
let hr;
function Ri() {
  return hr || (hr = hl(la));
}
const aa = ((...e) => {
  Ri().render(...e);
}), gr = ((...e) => {
  const t = Ri().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = fa(n);
    if (!r) return;
    const i = t._component;
    !F(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = s(r, !1, ca(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function ca(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function fa(e) {
  return re(e) ? document.querySelector(e) : e;
}
const ua = ".gallery-card[data-v-f24e9ecc]{background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 10px 30px -10px #00000014;border:1px solid #f0f2f5;transition:all .3s cubic-bezier(.2,0,0,1);height:100%;display:flex;flex-direction:column;position:relative}.gallery-card[data-v-f24e9ecc]:hover{transform:translateY(-4px);box-shadow:0 20px 40px -12px #4158d033;border-color:transparent}.card-cover[data-v-f24e9ecc]{height:110px;position:relative;flex-shrink:0}.card-avatar[data-v-f24e9ecc]{width:100px;height:100px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:2.2rem;color:#fff;position:absolute;bottom:-45px;left:5px;border:4px solid white;box-shadow:0 8px 20px #0000001a;background:linear-gradient(135deg,#4158d0,#c850c0);text-shadow:0 2px 4px rgba(0,0,0,.1);z-index:2}.card-content[data-v-f24e9ecc]{padding:3rem 1.5rem 1.25rem;flex:1;display:flex;flex-direction:column;gap:1.25rem}.card-header[data-v-f24e9ecc]{display:flex;align-items:flex-start;justify-content:space-between;flex-shrink:0}.card-name[data-v-f24e9ecc]{font-weight:600;font-size:1.2rem;color:#1e293b;margin:0 0 .25rem;letter-spacing:-.01em}.card-meta[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;color:#64748b;font-size:.85rem}.dot[data-v-f24e9ecc]{color:#cbd5e1}.match-pill[data-v-f24e9ecc]{background:linear-gradient(135deg,#4158d0,#c850c0);padding:.35rem .75rem;border-radius:40px;color:#fff;font-weight:600;font-size:1.1rem;line-height:1;box-shadow:0 4px 10px #4158d033;flex-shrink:0}.match-symbol[data-v-f24e9ecc]{font-size:.7rem;opacity:.9;margin-left:1px}.stats-minimal[data-v-f24e9ecc]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;margin-bottom:.75rem;border-bottom:1px dashed #e2e8f0}.stat-minimal[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;flex:1}.stat-minimal-emoji[data-v-f24e9ecc]{font-size:1.2rem;opacity:.7}.stat-minimal-text[data-v-f24e9ecc]{display:flex;flex-direction:column}.stat-minimal-value[data-v-f24e9ecc]{font-weight:500;font-size:.9rem;color:#1e293b;line-height:1.2}.stat-minimal-label[data-v-f24e9ecc]{font-size:.6rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.02em}.stat-minimal-divider[data-v-f24e9ecc]{width:1px;height:30px;background:linear-gradient(to bottom,transparent,#e2e8f0,transparent);margin:0 .5rem}.section-header[data-v-f24e9ecc]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}.section-title[data-v-f24e9ecc]{display:flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.03em}.slot-count[data-v-f24e9ecc],.course-count[data-v-f24e9ecc]{font-size:.7rem;color:#4158d0;background:#f0f2ff;padding:.2rem .6rem;border-radius:30px;font-weight:500}.schedule-availability[data-v-f24e9ecc],.shared-courses[data-v-f24e9ecc]{flex-shrink:0}.schedule-slots[data-v-f24e9ecc],.course-list[data-v-f24e9ecc]{display:flex;flex-wrap:wrap;gap:.5rem;min-height:36px}.slot-chip[data-v-f24e9ecc]{background:#f8fafc;padding:.4rem .75rem;border-radius:30px;font-size:.75rem;display:inline-flex;align-items:center;gap:.4rem;border:1px solid #eef2f6;transition:all .2s;cursor:help}.slot-chip[data-v-f24e9ecc]:hover{background:#f0f2ff;border-color:#4158d0}.slot-day[data-v-f24e9ecc]{font-weight:600;color:#1e293b}.slot-time[data-v-f24e9ecc]{color:#64748b}.slot-chip.more[data-v-f24e9ecc]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.slot-chip.more[data-v-f24e9ecc]:hover{background:transparent;border-color:#cbd5e1}.course-chip[data-v-f24e9ecc]{background:#f8fafc;padding:.4rem .9rem;border-radius:30px;font-size:.75rem;color:#475569;border:1px solid #eef2f6;transition:all .2s;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.course-chip[data-v-f24e9ecc]:hover{border-color:#c850c0;color:#c850c0;background:#fdf2f8}.course-chip.more[data-v-f24e9ecc]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.course-chip.more[data-v-f24e9ecc]:hover{background:transparent;border-color:#cbd5e1;color:#94a3b8}.empty-state[data-v-f24e9ecc]{display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:30px;padding:.5rem 1rem;min-height:36px}.empty-text[data-v-f24e9ecc]{font-size:.75rem;color:#94a3b8}.card-actions[data-v-f24e9ecc]{display:flex;gap:.5rem;margin-top:auto;padding-top:.5rem;flex-shrink:0}.btn-profile[data-v-f24e9ecc]{flex:2;padding:.7rem;border:none;border-radius:40px;font-weight:500;font-size:.8rem;background:linear-gradient(135deg,#4158d0,#c850c0);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;box-shadow:0 6px 14px #4158d033;transition:all .2s}.btn-profile[data-v-f24e9ecc]:hover{transform:translateY(-2px);box-shadow:0 10px 20px #4158d04d}.btn-icon[data-v-f24e9ecc]{width:42px;height:42px;border-radius:50%;border:none;background:#fff;color:#64748b;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px #0000000d;border:1px solid #e2e8f0;transition:all .2s;flex-shrink:0}.btn-icon[data-v-f24e9ecc]:hover{transform:translateY(-2px)}.btn-icon.invite[data-v-f24e9ecc]:hover{background:#4158d0;color:#fff;border-color:#4158d0}.btn-icon.message[data-v-f24e9ecc]:hover{background:#c850c0;color:#fff;border-color:#c850c0}@media(max-width:768px){.gallery-card.list-view[data-v-f24e9ecc]{flex-direction:column;min-height:auto}.list-view .card-cover[data-v-f24e9ecc]{width:100%;height:100px;border-radius:24px 24px 0 0}.list-view .card-avatar[data-v-f24e9ecc]{width:80px;height:80px;font-size:2rem;left:50%;transform:translate(-50%);top:auto;bottom:-40px;margin-top:0}.list-view .card-content[data-v-f24e9ecc]{padding:3rem 1.25rem 1.25rem}.list-details-row[data-v-f24e9ecc]{flex-direction:column;gap:1rem}}@media(max-width:640px){.card-avatar[data-v-f24e9ecc]{width:80px;height:80px;font-size:2rem;bottom:-40px;left:50%;transform:translate(-50%)}.card-content[data-v-f24e9ecc]{padding:2.8rem 1.25rem 1.25rem}.card-name[data-v-f24e9ecc]{font-size:1.1rem}.stat-minimal-emoji[data-v-f24e9ecc]{font-size:1rem}.stat-minimal-value[data-v-f24e9ecc]{font-size:.85rem}.btn-icon[data-v-f24e9ecc]{width:38px;height:38px;font-size:1rem}.list-view .card-avatar[data-v-f24e9ecc]{width:70px;height:70px;font-size:1.8rem;bottom:-35px}}", Cn = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, da = { class: "gallery-card" }, pa = { class: "card-avatar" }, ha = { class: "card-content" }, ga = { class: "card-header" }, ma = { class: "card-name" }, va = { class: "card-meta" }, ba = { class: "match-pill" }, _a = { class: "match-value" }, ya = { class: "stat-minimal" }, xa = { class: "stat-minimal-text" }, wa = { class: "stat-minimal-value" }, Ca = {
  key: 0,
  class: "stat-minimal-divider"
}, Sa = { class: "stat-minimal" }, Ta = { class: "stat-minimal-text" }, Aa = { class: "stat-minimal-value" }, Ea = {
  key: 1,
  class: "stat-minimal-divider"
}, Pa = { class: "stat-minimal" }, Ma = { class: "stat-minimal-emoji" }, Oa = { class: "stat-minimal-text" }, Ra = { class: "stat-minimal-value" }, ja = {
  key: 0,
  class: "list-details-row"
}, Ia = { class: "schedule-availability list-compact" }, $a = { class: "section-header list-header" }, ka = {
  key: 0,
  class: "slot-count"
}, Na = {
  key: 0,
  class: "schedule-slots list-slots"
}, Fa = ["title"], La = { class: "slot-day" }, Da = { class: "slot-time" }, Ha = {
  key: 0,
  class: "slot-chip more list-chip"
}, Va = {
  key: 1,
  class: "empty-state list-empty"
}, Ba = { class: "shared-courses list-compact" }, Ua = { class: "section-header list-header" }, za = {
  key: 0,
  class: "course-count"
}, Ka = {
  key: 0,
  class: "course-list list-courses"
}, Wa = {
  key: 0,
  class: "course-chip more list-chip"
}, Ga = {
  key: 1,
  class: "empty-state list-empty"
}, Ja = { class: "schedule-availability" }, qa = { class: "section-header" }, Ya = {
  key: 0,
  class: "slot-count"
}, Qa = {
  key: 0,
  class: "schedule-slots"
}, Xa = ["title"], Za = { class: "slot-day" }, ec = { class: "slot-time" }, tc = {
  key: 0,
  class: "slot-chip more"
}, sc = {
  key: 1,
  class: "empty-state"
}, nc = { class: "shared-courses" }, rc = { class: "section-header" }, ic = {
  key: 0,
  class: "course-count"
}, oc = {
  key: 0,
  class: "course-list"
}, lc = {
  key: 0,
  class: "course-chip more"
}, ac = {
  key: 1,
  class: "empty-state"
}, cc = {
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
    const s = e, n = Ft("viewMode", null), r = ie(
      () => (n?.value || s.viewMode) === "list"
    ), i = ie(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), o = ie(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), l = ie(() => {
      if (Array.isArray(s.timeSlots)) return s.timeSlots;
      try {
        return s.timeSlots ? JSON.parse(s.timeSlots) : [];
      } catch {
        return [];
      }
    }), a = ie(() => (i.value.username || "??").charAt(0).toUpperCase()), p = ie(() => {
      const k = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], w = (i.value.username?.length || 0) % k.length;
      return { background: k[w] };
    }), f = ie(() => l.value.length > 0), d = (k) => {
      if (!k) return "";
      const [w, O] = k.split(":"), V = parseInt(w), j = V >= 12 ? "pm" : "am";
      return `${V % 12 || 12}${O !== "00" ? `:${O}` : ""}${j}`;
    }, v = ie(() => l.value.slice(0, 3).map((k) => ({
      dayShort: k.day?.substring(0, 3) || "Any",
      timeRange: k.start_time ? `${d(k.start_time)}-${d(k.end_time)}` : "Flexible",
      tooltip: `${k.day || "Any day"}: ${k.start_time || "Flexible"} - ${k.end_time || "Flexible"}`
    }))), m = ie(() => {
      if (l.value.length === 0) return "flexible";
      const k = l.value[0];
      if (!k.start_time) return "flexible";
      const w = parseInt(k.start_time.split(":")[0]);
      return w < 12 ? "morning" : w < 17 ? "afternoon" : "evening";
    }), T = ie(() => {
      if (l.value.length === 0) return "🔄";
      const k = l.value[0];
      if (!k.start_time) return "🔄";
      const w = parseInt(k.start_time.split(":")[0]);
      return w < 12 ? "🌅" : w < 17 ? "☀️" : "🌙";
    }), M = () => {
      window.location.href = `/profile/${i.value.id}/`;
    };
    return (k, w) => (L(), H("div", da, [
      g("div", {
        class: "card-cover",
        style: mt(p.value)
      }, [
        g("div", pa, U(a.value), 1)
      ], 4),
      g("div", ha, [
        g("div", ga, [
          g("div", null, [
            g("h3", ma, U(i.value.username), 1),
            g("div", va, [
              g("span", null, U(i.value.major), 1),
              w[2] || (w[2] = g("span", { class: "dot" }, "•", -1)),
              g("span", null, "Year " + U(i.value.year), 1)
            ])
          ]),
          g("div", ba, [
            g("span", _a, U(e.matchPercent), 1),
            w[3] || (w[3] = g("span", { class: "match-symbol" }, "%", -1))
          ])
        ]),
        g("div", {
          class: Qe(["stats-minimal", { "list-stats": r.value }])
        }, [
          g("div", ya, [
            w[5] || (w[5] = g("span", { class: "stat-minimal-emoji" }, "📚", -1)),
            g("span", xa, [
              g("span", wa, U(o.value.length), 1),
              w[4] || (w[4] = g("span", { class: "stat-minimal-label" }, "courses", -1))
            ])
          ]),
          r.value ? we("", !0) : (L(), H("div", Ca)),
          g("div", Sa, [
            w[7] || (w[7] = g("span", { class: "stat-minimal-emoji" }, "⏰", -1)),
            g("span", Ta, [
              g("span", Aa, U(e.overlapHours) + "h", 1),
              w[6] || (w[6] = g("span", { class: "stat-minimal-label" }, "overlap", -1))
            ])
          ]),
          r.value ? we("", !0) : (L(), H("div", Ea)),
          g("div", Pa, [
            g("span", Ma, U(T.value), 1),
            g("span", Oa, [
              g("span", Ra, U(m.value), 1),
              w[8] || (w[8] = g("span", { class: "stat-minimal-label" }, "pref", -1))
            ])
          ])
        ], 2),
        r.value ? (L(), H("div", ja, [
          g("div", Ia, [
            g("div", $a, [
              w[9] || (w[9] = g("div", { class: "section-title" }, [
                g("span", null, "📅"),
                g("span", null, "Schedule")
              ], -1)),
              f.value ? (L(), H("span", ka, U(l.value.length), 1)) : we("", !0)
            ]),
            f.value ? (L(), H("div", Na, [
              (L(!0), H(ae, null, gt(v.value.slice(0, 2), (O, V) => (L(), H("div", {
                key: V,
                class: "slot-chip list-chip",
                title: O.tooltip
              }, [
                g("span", La, U(O.dayShort), 1),
                g("span", Da, U(O.timeRange), 1)
              ], 8, Fa))), 128)),
              l.value.length > 2 ? (L(), H("div", Ha, " +" + U(l.value.length - 2), 1)) : we("", !0)
            ])) : (L(), H("div", Va, [...w[10] || (w[10] = [
              g("span", { class: "empty-text" }, "No availability", -1)
            ])]))
          ]),
          g("div", Ba, [
            g("div", Ua, [
              w[11] || (w[11] = g("div", { class: "section-title" }, [
                g("span", null, "🏷️"),
                g("span", null, "Courses")
              ], -1)),
              o.value.length > 0 ? (L(), H("span", za, U(o.value.length), 1)) : we("", !0)
            ]),
            o.value.length > 0 ? (L(), H("div", Ka, [
              (L(!0), H(ae, null, gt(o.value.slice(0, 2), (O) => (L(), H("span", {
                key: O,
                class: "course-chip list-chip"
              }, U(O), 1))), 128)),
              o.value.length > 2 ? (L(), H("span", Wa, " +" + U(o.value.length - 2), 1)) : we("", !0)
            ])) : (L(), H("div", Ga, [...w[12] || (w[12] = [
              g("span", { class: "empty-text" }, "No courses", -1)
            ])]))
          ])
        ])) : we("", !0),
        r.value ? we("", !0) : (L(), H(ae, { key: 1 }, [
          g("div", Ja, [
            g("div", qa, [
              w[13] || (w[13] = g("div", { class: "section-title" }, [
                g("span", null, "📅"),
                g("span", null, "Schedule match")
              ], -1)),
              f.value ? (L(), H("span", Ya, U(l.value.length) + " slots", 1)) : we("", !0)
            ]),
            f.value ? (L(), H("div", Qa, [
              (L(!0), H(ae, null, gt(v.value, (O, V) => (L(), H("div", {
                key: V,
                class: "slot-chip",
                title: O.tooltip
              }, [
                g("span", Za, U(O.dayShort), 1),
                g("span", ec, U(O.timeRange), 1)
              ], 8, Xa))), 128)),
              l.value.length > 3 ? (L(), H("div", tc, " +" + U(l.value.length - 3), 1)) : we("", !0)
            ])) : (L(), H("div", sc, [...w[14] || (w[14] = [
              g("span", { class: "empty-text" }, "No common availability", -1)
            ])]))
          ]),
          g("div", nc, [
            g("div", rc, [
              w[15] || (w[15] = g("div", { class: "section-title" }, [
                g("span", null, "🏷️"),
                g("span", null, "Courses in common")
              ], -1)),
              o.value.length > 0 ? (L(), H("span", ic, U(o.value.length) + " total ", 1)) : we("", !0)
            ]),
            o.value.length > 0 ? (L(), H("div", oc, [
              (L(!0), H(ae, null, gt(o.value.slice(0, 3), (O) => (L(), H("span", {
                key: O,
                class: "course-chip"
              }, U(O), 1))), 128)),
              o.value.length > 3 ? (L(), H("span", lc, " +" + U(o.value.length - 3), 1)) : we("", !0)
            ])) : (L(), H("div", ac, [...w[16] || (w[16] = [
              g("span", { class: "empty-text" }, "No shared courses", -1)
            ])]))
          ])
        ], 64)),
        g("div", {
          class: Qe(["card-actions", { "list-actions": r.value }])
        }, [
          g("button", {
            class: "btn-profile",
            onClick: M
          }, [...w[17] || (w[17] = [
            g("span", null, "👤", -1),
            g("span", null, "View Profile", -1)
          ])]),
          g("button", {
            class: "btn-icon invite",
            onClick: w[0] || (w[0] = () => {
            }),
            title: "Invite to study group"
          }, [...w[18] || (w[18] = [
            g("span", null, "🤝", -1)
          ])]),
          g("button", {
            class: "btn-icon message",
            onClick: w[1] || (w[1] = () => {
            }),
            title: "Send message"
          }, [...w[19] || (w[19] = [
            g("span", null, "💬", -1)
          ])])
        ], 2)
      ])
    ]));
  }
}, ji = /* @__PURE__ */ Cn(cc, [["styles", [ua]], ["__scopeId", "data-v-f24e9ecc"]]), fc = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-ab17189e]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-ab17189e]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-ab17189e]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-ab17189e]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-ab17189e]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-ab17189e]{position:relative;width:52px;height:52px}.avatar-main[data-v-ab17189e]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-ab17189e]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-ab17189e]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-ab17189e]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-ab17189e]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-ab17189e]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-ab17189e]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-ab17189e]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-ab17189e]{color:#4f46e5}.vertical-divider[data-v-ab17189e]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-ab17189e]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-ab17189e]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-ab17189e]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-ab17189e]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-ab17189e]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-ab17189e]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-ab17189e]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-ab17189e]{flex-direction:column}.match-stats[data-v-ab17189e]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-ab17189e]{width:100%;justify-content:center}}', uc = { class: "elegant-item-container" }, dc = { class: "elegant-content" }, pc = { class: "identity-block" }, hc = { class: "avatar-container" }, gc = { class: "name-section" }, mc = { class: "username" }, vc = { class: "major" }, bc = { class: "match-stats" }, _c = { class: "stat-group" }, yc = { class: "stat-value highlight" }, xc = { class: "stat-group" }, wc = { class: "stat-value" }, Cc = { class: "stat-group" }, Sc = { class: "stat-value" }, Tc = {
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
    const s = e, n = ie(() => {
      if (typeof s.profile == "object") return s.profile;
      try {
        return s.profile ? JSON.parse(s.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = ie(() => {
      if (Array.isArray(s.overlapCourses)) return s.overlapCourses;
      try {
        return s.overlapCourses ? JSON.parse(s.overlapCourses) : [];
      } catch {
        return [];
      }
    }), i = ie(() => (n.value.username || "??").charAt(0).toUpperCase()), o = ie(() => {
      const f = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], d = (n.value.username?.length || 0) % f.length;
      return { background: f[d] };
    }), l = () => {
      const f = n.value.username.replace("@", "");
      window.location.href = `/profile/${f}/`;
    }, a = () => {
      const f = n.value.username.replace("@", "");
      window.location.href = `/study-groups/create/?invite=${f}`;
    }, p = () => {
      const f = n.value.username.replace("@", "");
      window.location.href = `/messages/new/?to=${f}`;
    };
    return (f, d) => (L(), H("div", uc, [
      g("div", {
        class: "glow-accent",
        style: mt(o.value)
      }, null, 4),
      g("div", dc, [
        g("div", pc, [
          g("div", hc, [
            g("div", {
              class: "avatar-ring",
              style: mt(f.avatarBorder)
            }, null, 4),
            g("div", {
              class: "avatar-main",
              style: mt(o.value)
            }, U(i.value), 5)
          ]),
          g("div", gc, [
            g("h3", mc, U(n.value.username), 1),
            g("p", vc, U(n.value.major), 1)
          ])
        ]),
        g("div", bc, [
          g("div", _c, [
            d[1] || (d[1] = g("span", { class: "stat-label" }, "Match", -1)),
            g("span", yc, [
              os(U(e.matchPercent), 1),
              d[0] || (d[0] = g("small", null, "%", -1))
            ])
          ]),
          d[6] || (d[6] = g("div", { class: "vertical-divider" }, null, -1)),
          g("div", xc, [
            d[3] || (d[3] = g("span", { class: "stat-label" }, "Overlap", -1)),
            g("span", wc, [
              os(U(e.overlapHours), 1),
              d[2] || (d[2] = g("small", null, "h", -1))
            ])
          ]),
          d[7] || (d[7] = g("div", { class: "vertical-divider" }, null, -1)),
          g("div", Cc, [
            d[5] || (d[5] = g("span", { class: "stat-label" }, "Shared", -1)),
            g("span", Sc, [
              os(U(r.value.length), 1),
              d[4] || (d[4] = g("small", null, "📚", -1))
            ])
          ])
        ]),
        g("div", { class: "action-block" }, [
          g("button", {
            class: "action-trigger primary",
            onClick: l
          }, [...d[8] || (d[8] = [
            g("span", null, "View", -1)
          ])]),
          g("button", {
            class: "action-trigger icon",
            onClick: p
          }, [...d[9] || (d[9] = [
            g("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          g("button", {
            class: "action-trigger icon",
            onClick: a
          }, [...d[10] || (d[10] = [
            g("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, Ii = /* @__PURE__ */ Cn(Tc, [["styles", [fc]], ["__scopeId", "data-v-ab17189e"]]), Ac = ".discovery-container[data-v-f575c718]{max-width:1440px;margin:0 auto;padding:2.5rem 2rem;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.discovery-header[data-v-f575c718]{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.brand-title[data-v-f575c718]{font-size:1.8rem;font-weight:600;color:#1a1e2b;letter-spacing:-.02em;margin:0 0 .25rem}.brand-tagline[data-v-f575c718]{color:#6b7280;font-size:.9rem;font-weight:400;margin:0}.view-toggles[data-v-f575c718]{display:flex;gap:.5rem;background:#fff;padding:.25rem;border-radius:40px;border:1px solid #eef2f6;box-shadow:0 2px 8px #00000005}.toggle-btn[data-v-f575c718]{width:42px;height:42px;border-radius:40px;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.toggle-btn[data-v-f575c718]:hover{color:#4158d0;background:#f5f7ff}.toggle-btn.active[data-v-f575c718]{background:#4158d0;color:#fff;box-shadow:0 4px 10px #4158d033}.toggle-icon[data-v-f575c718]{font-size:1.3rem;line-height:1}.search-section[data-v-f575c718]{margin-bottom:2rem}.search-field[data-v-f575c718]{max-width:500px;position:relative}.search-icon[data-v-f575c718]{position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);font-size:1.1rem;color:#94a3b8;pointer-events:none}.search-input[data-v-f575c718]{width:100%;padding:1rem 1rem 1rem 3.5rem;font-size:.95rem;border:1px solid #eef2f6;border-radius:50px;background:#fff;box-shadow:0 4px 12px #00000005;transition:all .2s ease}.search-input[data-v-f575c718]:focus{outline:none;border-color:#4158d0;box-shadow:0 4px 16px #4158d014}.search-submit[data-v-f575c718]{position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;transition:all .2s}.search-submit[data-v-f575c718]:hover{background:#f1f5f9;color:#4158d0}.filters-bar[data-v-f575c718]{margin-bottom:2.5rem;border-bottom:1px solid #f0f2f5}.filter-tabs[data-v-f575c718]{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.75rem;scrollbar-width:none}.filter-tabs[data-v-f575c718]::-webkit-scrollbar{display:none}.filter-tab[data-v-f575c718]{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.2rem;border:none;background:transparent;color:#6b7280;font-size:.9rem;font-weight:500;cursor:pointer;border-radius:40px;transition:all .2s ease;white-space:nowrap}.filter-tab[data-v-f575c718]:hover{background:#f8fafc;color:#4158d0}.filter-tab.active[data-v-f575c718]{background:#f0f2ff;color:#4158d0}.tab-emoji[data-v-f575c718]{font-size:1.1rem}.tab-badge[data-v-f575c718]{background:#eef2f6;color:#64748b;padding:.15rem .5rem;border-radius:30px;font-size:.7rem;font-weight:500;margin-left:.25rem}.filter-tab.active .tab-badge[data-v-f575c718]{background:#fff;color:#4158d0}.results-section[data-v-f575c718]{min-height:400px}.results-grid[data-v-f575c718]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.results-list[data-v-f575c718]{display:flex;flex-direction:column;gap:1rem}.results-list[data-v-f575c718] .gallery-card{display:flex;flex-direction:row;height:auto}.results-list[data-v-f575c718] .card-cover{width:120px;height:auto;flex-shrink:0}.empty-state[data-v-f575c718]{text-align:center;padding:4rem 2rem;background:#fff;border-radius:32px;border:1px dashed #e2e8f0}.empty-illustration[data-v-f575c718]{font-size:4rem;margin-bottom:1.5rem;opacity:.7}.empty-title[data-v-f575c718]{font-size:1.3rem;font-weight:500;color:#1e293b;margin-bottom:.5rem}.empty-message[data-v-f575c718]{color:#94a3b8;font-size:.95rem;margin-bottom:1.5rem}.empty-reset[data-v-f575c718]{background:none;border:1px solid #e2e8f0;padding:.6rem 1.5rem;border-radius:40px;color:#64748b;font-size:.9rem;cursor:pointer;transition:all .2s}.empty-reset[data-v-f575c718]:hover{border-color:#4158d0;color:#4158d0;background:#f8faff}.fade-enter-active[data-v-f575c718],.fade-leave-active[data-v-f575c718]{transition:opacity .3s ease}.fade-enter-from[data-v-f575c718],.fade-leave-to[data-v-f575c718]{opacity:0}@media(max-width:768px){.discovery-container[data-v-f575c718]{padding:1.5rem 1rem}.discovery-header[data-v-f575c718]{flex-direction:column;align-items:flex-start;gap:1rem}.view-toggles[data-v-f575c718]{align-self:flex-end}.search-field[data-v-f575c718]{max-width:100%}.results-grid[data-v-f575c718]{grid-template-columns:1fr}}@media(max-width:480px){.filter-tab[data-v-f575c718]{padding:.5rem 1rem;font-size:.85rem}.empty-state[data-v-f575c718]{padding:2rem 1rem}}", Ec = { class: "discovery-container" }, Pc = { class: "discovery-header" }, Mc = { class: "view-toggles" }, Oc = { class: "search-section" }, Rc = { class: "search-field" }, jc = { class: "filters-bar" }, Ic = { class: "filter-tabs" }, $c = ["onClick"], kc = { class: "tab-emoji" }, Nc = { class: "tab-name" }, Fc = {
  key: 0,
  class: "tab-badge"
}, Lc = { class: "results-section" }, Dc = {
  key: 1,
  class: "empty-state"
}, Hc = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ Is("grid"), n = /* @__PURE__ */ Is(""), r = /* @__PURE__ */ Is("all"), i = ie(() => {
      try {
        const v = JSON.parse(t.topMatches), m = v.reduce((w, O) => O.match_percent > 85 ? w += 1 : w, 0), T = v.reduce((w, O) => O.overlap_hours > 5 ? w += 1 : w, 0), M = JSON.parse(t.sameMajor), k = JSON.parse(t.sameMajor);
        return {
          all: v.length,
          best: m,
          schedule: T,
          major: M.length,
          course: k.length
        };
      } catch (v) {
        console.error(v);
      }
    }), o = [
      { id: "all", name: "All matches", icon: "👥", count: i.value.all },
      {
        id: "high",
        name: "Best matches",
        icon: "⭐",
        count: i.value.best
      },
      {
        id: "schedule",
        name: "Schedule",
        icon: "🕒",
        count: i.value.schedule
      },
      {
        id: "courses",
        name: "Courses",
        icon: "📚",
        count: i.value.course
      },
      { id: "major", name: "Major", icon: "🎓", count: i.value.major }
    ], l = ie(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), a = ie(() => {
      try {
        return JSON.parse(l.value || "[]");
      } catch {
        return [];
      }
    }), p = ie(() => {
      let v = a.value;
      if (n.value) {
        const m = n.value.toLowerCase();
        v = v.filter(
          (T) => T.profile.username.toLowerCase().includes(m) || T.profile.major.toLowerCase().includes(m) || T.overlap_courses?.some(
            (M) => M.toLowerCase().includes(m)
          )
        );
      }
      switch (r.value) {
        case "high":
          v = v.filter((m) => m.match_percent >= 85);
          break;
        case "schedule":
          v = v.filter((m) => m.overlap_hours >= 5);
          break;
        case "courses":
          v = v.filter((m) => m.overlap_courses?.length >= 2);
          break;
      }
      return v;
    }), f = (v) => {
      console.log(`Connecting with ${v}`);
    }, d = () => {
      n.value = "", r.value = "all";
    };
    return rs(a, (v) => {
    }), (v, m) => (L(), H("div", Ec, [
      g("div", Pc, [
        m[6] || (m[6] = g("div", { class: "brand" }, [
          g("h1", { class: "brand-title" }, "StudySync"),
          g("p", { class: "brand-tagline" }, "Discover your ideal study partner")
        ], -1)),
        g("div", Mc, [
          g("button", {
            class: Qe(["toggle-btn", { active: s.value === "grid" }]),
            onClick: m[0] || (m[0] = (T) => s.value = "grid"),
            "aria-label": "Grid view"
          }, [...m[4] || (m[4] = [
            g("span", { class: "toggle-icon" }, "⊞", -1)
          ])], 2),
          g("button", {
            class: Qe(["toggle-btn", { active: s.value === "list" }]),
            onClick: m[1] || (m[1] = (T) => s.value = "list"),
            "aria-label": "List view"
          }, [...m[5] || (m[5] = [
            g("span", { class: "toggle-icon" }, "≡", -1)
          ])], 2)
        ])
      ]),
      g("div", Oc, [
        g("div", Rc, [
          m[8] || (m[8] = g("span", { class: "search-icon" }, "🔍", -1)),
          Ao(g("input", {
            "onUpdate:modelValue": m[2] || (m[2] = (T) => n.value = T),
            type: "text",
            placeholder: "Search by name, course, or major...",
            class: "search-input"
          }, null, 512), [
            [oa, n.value]
          ]),
          n.value ? (L(), H("button", {
            key: 0,
            class: "search-submit",
            onClick: m[3] || (m[3] = (T) => n.value = "")
          }, [...m[7] || (m[7] = [
            g("span", { class: "clear-icon" }, "✕", -1)
          ])])) : we("", !0)
        ])
      ]),
      g("div", jc, [
        g("div", Ic, [
          (L(), H(ae, null, gt(o, (T) => g("button", {
            key: T.id,
            class: Qe(["filter-tab", { active: r.value === T.id }]),
            onClick: (M) => r.value = T.id
          }, [
            g("span", kc, U(T.icon), 1),
            g("span", Nc, U(T.name), 1),
            T.count ? (L(), H("span", Fc, U(T.count), 1)) : we("", !0)
          ], 10, $c)), 64))
        ])
      ]),
      g("div", Lc, [
        ve(Ll, {
          name: "fade",
          mode: "out-in"
        }, {
          default: Gr(() => [
            p.value.length > 0 ? (L(), H("div", {
              key: 0,
              class: Qe(["results-grid", { "results-list": s.value === "list" }])
            }, [
              s.value === "grid" ? (L(!0), H(ae, { key: 0 }, gt(p.value, (T, M) => (L(), Zs(ji, {
                key: M,
                profile: T.profile,
                "match-percent": T.match_percent,
                "overlap-hours": T.overlap_hours,
                "overlap-courses": T.overlap_courses,
                "time-slots": T.daily_schedules,
                onConnect: f
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (L(!0), H(ae, { key: 1 }, gt(p.value, (T, M) => (L(), Zs(Ii, {
                profile: T.profile,
                key: T.profile.username.substring(0, 2) + M,
                "match-percent": T.match_percent,
                "overlap-hours": T.overlap_hours,
                "overlap-courses": T.overlap_courses,
                "time-slots": T.daily_schedules,
                onConnect: f
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (L(), H("div", Dc, [
              m[9] || (m[9] = g("div", { class: "empty-illustration" }, "🔍", -1)),
              m[10] || (m[10] = g("h3", { class: "empty-title" }, "No matches found", -1)),
              m[11] || (m[11] = g("p", { class: "empty-message" }, " Try adjusting your filters or search criteria ", -1)),
              g("button", {
                class: "empty-reset",
                onClick: d
              }, " Clear all filters ")
            ]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}, Vc = /* @__PURE__ */ Cn(Hc, [["styles", [Ac]], ["__scopeId", "data-v-f575c718"]]), Bc = /* @__PURE__ */ xn(ji), Uc = /* @__PURE__ */ xn(Vc), zc = /* @__PURE__ */ xn(Ii);
customElements.define("gallery-card", Bc);
customElements.define("find-partner-view", Uc);
customElements.define("gallery-card-compact", zc);
