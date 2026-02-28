// @__NO_SIDE_EFFECTS__
function Zn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const le = {}, Bt = [], nt = () => {
}, $o = () => !1, Zs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Qn = (e) => e.startsWith("onUpdate:"), he = Object.assign, er = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, ma = Object.prototype.hasOwnProperty, se = (e, t) => ma.call(e, t), z = Array.isArray, zt = (e) => bs(e) === "[object Map]", Mo = (e) => bs(e) === "[object Set]", Tr = (e) => bs(e) === "[object Date]", K = (e) => typeof e == "function", me = (e) => typeof e == "string", ot = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", jo = (e) => (re(e) || K(e)) && K(e.then) && K(e.catch), Po = Object.prototype.toString, bs = (e) => Po.call(e), ga = (e) => bs(e).slice(8, -1), Qs = (e) => bs(e) === "[object Object]", tr = (e) => me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ss = /* @__PURE__ */ Zn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), en = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, ba = /-\w/g, Ve = en(
  (e) => e.replace(ba, (t) => t.slice(1).toUpperCase())
), va = /\B([A-Z])/g, Fe = en(
  (e) => e.replace(va, "-$1").toLowerCase()
), No = en((e) => e.charAt(0).toUpperCase() + e.slice(1)), bn = en(
  (e) => e ? `on${No(e)}` : ""
), yt = (e, t) => !Object.is(e, t), $s = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Do = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, sr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Mn = (e) => {
  const t = me(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Rr;
const tn = () => Rr || (Rr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rt(e) {
  if (z(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = me(n) ? wa(n) : rt(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (me(e) || re(e))
    return e;
}
const xa = /;(?![^(]*\))/g, ya = /:([^]+)/, _a = /\/\*[^]*?\*\//g;
function wa(e) {
  const t = {};
  return e.replace(_a, "").split(xa).forEach((s) => {
    if (s) {
      const n = s.split(ya);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ie(e) {
  let t = "";
  if (me(e))
    t = e;
  else if (z(e))
    for (let s = 0; s < e.length; s++) {
      const n = ie(e[s]);
      n && (t += n + " ");
    }
  else if (re(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const ka = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ca = /* @__PURE__ */ Zn(ka);
function Fo(e) {
  return !!e || e === "";
}
function Sa(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = nr(e[n], t[n]);
  return s;
}
function nr(e, t) {
  if (e === t) return !0;
  let s = Tr(e), n = Tr(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = ot(e), n = ot(t), s || n)
    return e === t;
  if (s = z(e), n = z(t), s || n)
    return s && n ? Sa(e, t) : !1;
  if (s = re(e), n = re(t), s || n) {
    if (!s || !n)
      return !1;
    const r = Object.keys(e).length, o = Object.keys(t).length;
    if (r !== o)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !nr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Io = (e) => !!(e && e.__v_isRef === !0), A = (e) => me(e) ? e : e == null ? "" : z(e) || re(e) && (e.toString === Po || !K(e.toString)) ? Io(e) ? A(e.value) : JSON.stringify(e, Lo, 2) : String(e), Lo = (e, t) => Io(t) ? Lo(e, t.value) : zt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[vn(n, o) + " =>"] = r, s),
    {}
  )
} : Mo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => vn(s))
} : ot(t) ? vn(t) : re(t) && !z(t) && !Qs(t) ? String(t) : t, vn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ot(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
let je;
class Ea {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = je, !t && je && (this.index = (je.scopes || (je.scopes = [])).push(
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
      const s = je;
      try {
        return je = this, t();
      } finally {
        je = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = je, je = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (je = this.prevScope, this.prevScope = void 0);
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
function Ta() {
  return je;
}
let ue;
const xn = /* @__PURE__ */ new WeakSet();
class Uo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, je && je.active && je.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, xn.has(this) && (xn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || zo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ar(this), Ho(this);
    const t = ue, s = qe;
    ue = this, qe = !0;
    try {
      return this.fn();
    } finally {
      Vo(this), ue = t, qe = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ir(t);
      this.deps = this.depsTail = void 0, Ar(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? xn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    jn(this) && this.run();
  }
  get dirty() {
    return jn(this);
  }
}
let Bo = 0, ns, rs;
function zo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = rs, rs = e;
    return;
  }
  e.next = ns, ns = e;
}
function rr() {
  Bo++;
}
function or() {
  if (--Bo > 0)
    return;
  if (rs) {
    let t = rs;
    for (rs = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; ns; ) {
    let t = ns;
    for (ns = void 0; t; ) {
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
function Ho(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Vo(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), ir(n), Ra(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function jn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (qo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function qo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ds) || (e.globalVersion = ds, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !jn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = ue, n = qe;
  ue = e, qe = !0;
  try {
    Ho(e);
    const r = e.fn(e._value);
    (t.version === 0 || yt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ue = s, qe = n, Vo(e), e.flags &= -3;
  }
}
function ir(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep)
      ir(o, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Ra(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let qe = !0;
const Ko = [];
function pt() {
  Ko.push(qe), qe = !1;
}
function ht() {
  const e = Ko.pop();
  qe = e === void 0 ? !0 : e;
}
function Ar(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = ue;
    ue = void 0;
    try {
      t();
    } finally {
      ue = s;
    }
  }
}
let ds = 0;
class Aa {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ar {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ue || !qe || ue === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== ue)
      s = this.activeLink = new Aa(ue, this), ue.deps ? (s.prevDep = ue.depsTail, ue.depsTail.nextDep = s, ue.depsTail = s) : ue.deps = ue.depsTail = s, Wo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = ue.depsTail, s.nextDep = void 0, ue.depsTail.nextDep = s, ue.depsTail = s, ue.deps === s && (ue.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ds++, this.notify(t);
  }
  notify(t) {
    rr();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      or();
    }
  }
}
function Wo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Wo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Pn = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ Symbol(
  ""
), Nn = /* @__PURE__ */ Symbol(
  ""
), fs = /* @__PURE__ */ Symbol(
  ""
);
function _e(e, t, s) {
  if (qe && ue) {
    let n = Pn.get(e);
    n || Pn.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new ar()), r.map = n, r.key = s), r.track();
  }
}
function ft(e, t, s, n, r, o) {
  const i = Pn.get(e);
  if (!i) {
    ds++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (rr(), t === "clear")
    i.forEach(l);
  else {
    const c = z(e), f = c && tr(s);
    if (c && s === "length") {
      const d = Number(n);
      i.forEach((h, x) => {
        (x === "length" || x === fs || !ot(x) && x >= d) && l(h);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && l(i.get(s)), f && l(i.get(fs)), t) {
        case "add":
          c ? f && l(i.get("length")) : (l(i.get($t)), zt(e) && l(i.get(Nn)));
          break;
        case "delete":
          c || (l(i.get($t)), zt(e) && l(i.get(Nn)));
          break;
        case "set":
          zt(e) && l(i.get($t));
          break;
      }
  }
  or();
}
function It(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e ? t : (_e(t, "iterate", fs), /* @__PURE__ */ He(e) ? t : t.map(Ke));
}
function sn(e) {
  return _e(e = /* @__PURE__ */ te(e), "iterate", fs), e;
}
function vt(e, t) {
  return /* @__PURE__ */ mt(e) ? qt(/* @__PURE__ */ Mt(e) ? Ke(t) : t) : Ke(t);
}
const Oa = {
  __proto__: null,
  [Symbol.iterator]() {
    return yn(this, Symbol.iterator, (e) => vt(this, e));
  },
  concat(...e) {
    return It(this).concat(
      ...e.map((t) => z(t) ? It(t) : t)
    );
  },
  entries() {
    return yn(this, "entries", (e) => (e[1] = vt(this, e[1]), e));
  },
  every(e, t) {
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => vt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (s) => vt(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return it(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return it(
      this,
      "findLast",
      e,
      t,
      (s) => vt(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return it(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return it(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return _n(this, "includes", e);
  },
  indexOf(...e) {
    return _n(this, "indexOf", e);
  },
  join(e) {
    return It(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return _n(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Xt(this, "pop");
  },
  push(...e) {
    return Xt(this, "push", e);
  },
  reduce(e, ...t) {
    return Or(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Or(this, "reduceRight", e, t);
  },
  shift() {
    return Xt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Xt(this, "splice", e);
  },
  toReversed() {
    return It(this).toReversed();
  },
  toSorted(e) {
    return It(this).toSorted(e);
  },
  toSpliced(...e) {
    return It(this).toSpliced(...e);
  },
  unshift(...e) {
    return Xt(this, "unshift", e);
  },
  values() {
    return yn(this, "values", (e) => vt(this, e));
  }
};
function yn(e, t, s) {
  const n = sn(e), r = n[t]();
  return n !== e && !/* @__PURE__ */ He(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const $a = Array.prototype;
function it(e, t, s, n, r, o) {
  const i = sn(e), l = i !== e && !/* @__PURE__ */ He(e), c = i[t];
  if (c !== $a[t]) {
    const h = c.apply(e, o);
    return l ? Ke(h) : h;
  }
  let f = s;
  i !== e && (l ? f = function(h, x) {
    return s.call(this, vt(e, h), x, e);
  } : s.length > 2 && (f = function(h, x) {
    return s.call(this, h, x, e);
  }));
  const d = c.call(i, f, n);
  return l && r ? r(d) : d;
}
function Or(e, t, s, n) {
  const r = sn(e);
  let o = s;
  return r !== e && (/* @__PURE__ */ He(e) ? s.length > 3 && (o = function(i, l, c) {
    return s.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return s.call(this, i, vt(e, l), c, e);
  }), r[t](o, ...n);
}
function _n(e, t, s) {
  const n = /* @__PURE__ */ te(e);
  _e(n, "iterate", fs);
  const r = n[t](...s);
  return (r === -1 || r === !1) && /* @__PURE__ */ fr(s[0]) ? (s[0] = /* @__PURE__ */ te(s[0]), n[t](...s)) : r;
}
function Xt(e, t, s = []) {
  pt(), rr();
  const n = (/* @__PURE__ */ te(e))[t].apply(e, s);
  return or(), ht(), n;
}
const Ma = /* @__PURE__ */ Zn("__proto__,__v_isRef,__isVue"), Jo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ot)
);
function ja(e) {
  ot(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return _e(t, "has", e), t.hasOwnProperty(e);
}
class Go {
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
      return n === (r ? o ? Ha : Qo : o ? Zo : Xo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = z(t);
    if (!r) {
      let c;
      if (i && (c = Oa[s]))
        return c;
      if (s === "hasOwnProperty")
        return ja;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ce(t) ? t : n
    );
    if ((ot(s) ? Jo.has(s) : Ma(s)) || (r || _e(t, "get", s), o))
      return l;
    if (/* @__PURE__ */ Ce(l)) {
      const c = i && tr(s) ? l : l.value;
      return r && re(c) ? /* @__PURE__ */ Fn(c) : c;
    }
    return re(l) ? r ? /* @__PURE__ */ Fn(l) : /* @__PURE__ */ cr(l) : l;
  }
}
class Yo extends Go {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    const i = z(t) && tr(s);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ mt(o);
      if (!/* @__PURE__ */ He(n) && !/* @__PURE__ */ mt(n) && (o = /* @__PURE__ */ te(o), n = /* @__PURE__ */ te(n)), !i && /* @__PURE__ */ Ce(o) && !/* @__PURE__ */ Ce(n))
        return f || (o.value = n), !0;
    }
    const l = i ? Number(s) < t.length : se(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ Ce(t) ? t : r
    );
    return t === /* @__PURE__ */ te(r) && (l ? yt(n, o) && ft(t, "set", s, n) : ft(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = se(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && ft(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!ot(s) || !Jo.has(s)) && _e(t, "has", s), n;
  }
  ownKeys(t) {
    return _e(
      t,
      "iterate",
      z(t) ? "length" : $t
    ), Reflect.ownKeys(t);
  }
}
class Pa extends Go {
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
const Na = /* @__PURE__ */ new Yo(), Da = /* @__PURE__ */ new Pa(), Fa = /* @__PURE__ */ new Yo(!0);
const Dn = (e) => e, Ts = (e) => Reflect.getPrototypeOf(e);
function Ia(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = /* @__PURE__ */ te(r), i = zt(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = r[e](...n), d = s ? Dn : t ? qt : Ke;
    return !t && _e(
      o,
      "iterate",
      c ? Nn : $t
    ), he(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: x } = f.next();
          return x ? { value: h, done: x } : {
            value: l ? [d(h[0]), d(h[1])] : d(h),
            done: x
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
function La(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ te(o), l = /* @__PURE__ */ te(r);
      e || (yt(r, l) && _e(i, "get", r), _e(i, "get", l));
      const { has: c } = Ts(i), f = t ? Dn : e ? qt : Ke;
      if (c.call(i, r))
        return f(o.get(r));
      if (c.call(i, l))
        return f(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && _e(/* @__PURE__ */ te(r), "iterate", $t), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ te(o), l = /* @__PURE__ */ te(r);
      return e || (yt(r, l) && _e(i, "has", r), _e(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ te(l), f = t ? Dn : e ? qt : Ke;
      return !e && _e(c, "iterate", $t), l.forEach((d, h) => r.call(o, f(d), f(h), i));
    }
  };
  return he(
    s,
    e ? {
      add: Rs("add"),
      set: Rs("set"),
      delete: Rs("delete"),
      clear: Rs("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ He(r) && !/* @__PURE__ */ mt(r) && (r = /* @__PURE__ */ te(r));
        const o = /* @__PURE__ */ te(this);
        return Ts(o).has.call(o, r) || (o.add(r), ft(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ mt(o) && (o = /* @__PURE__ */ te(o));
        const i = /* @__PURE__ */ te(this), { has: l, get: c } = Ts(i);
        let f = l.call(i, r);
        f || (r = /* @__PURE__ */ te(r), f = l.call(i, r));
        const d = c.call(i, r);
        return i.set(r, o), f ? yt(o, d) && ft(i, "set", r, o) : ft(i, "add", r, o), this;
      },
      delete(r) {
        const o = /* @__PURE__ */ te(this), { has: i, get: l } = Ts(o);
        let c = i.call(o, r);
        c || (r = /* @__PURE__ */ te(r), c = i.call(o, r)), l && l.call(o, r);
        const f = o.delete(r);
        return c && ft(o, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ te(this), o = r.size !== 0, i = r.clear();
        return o && ft(
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
    s[r] = Ia(r, e, t);
  }), s;
}
function lr(e, t) {
  const s = La(e, t);
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    se(s, r) && r in n ? s : n,
    r,
    o
  );
}
const Ua = {
  get: /* @__PURE__ */ lr(!1, !1)
}, Ba = {
  get: /* @__PURE__ */ lr(!1, !0)
}, za = {
  get: /* @__PURE__ */ lr(!0, !1)
};
const Xo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap(), Ha = /* @__PURE__ */ new WeakMap();
function Va(e) {
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
function qa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Va(ga(e));
}
// @__NO_SIDE_EFFECTS__
function cr(e) {
  return /* @__PURE__ */ mt(e) ? e : dr(
    e,
    !1,
    Na,
    Ua,
    Xo
  );
}
// @__NO_SIDE_EFFECTS__
function Ka(e) {
  return dr(
    e,
    !1,
    Fa,
    Ba,
    Zo
  );
}
// @__NO_SIDE_EFFECTS__
function Fn(e) {
  return dr(
    e,
    !0,
    Da,
    za,
    Qo
  );
}
function dr(e, t, s, n, r) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = qa(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
  return /* @__PURE__ */ mt(e) ? /* @__PURE__ */ Mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function fr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function Wa(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && Do(e, "__v_skip", !0), e;
}
const Ke = (e) => re(e) ? /* @__PURE__ */ cr(e) : e, qt = (e) => re(e) ? /* @__PURE__ */ Fn(e) : e;
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function be(e) {
  return ei(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ja(e) {
  return ei(e, !0);
}
function ei(e, t) {
  return /* @__PURE__ */ Ce(e) ? e : new Ga(e, t);
}
class Ga {
  constructor(t, s) {
    this.dep = new ar(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ te(t), this._value = s ? t : Ke(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ mt(t);
    t = n ? t : /* @__PURE__ */ te(t), yt(t, s) && (this._rawValue = t, this._value = n ? t : Ke(t), this.dep.trigger());
  }
}
function ti(e) {
  return /* @__PURE__ */ Ce(e) ? e.value : e;
}
const Ya = {
  get: (e, t, s) => t === "__v_raw" ? e : ti(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return /* @__PURE__ */ Ce(r) && !/* @__PURE__ */ Ce(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function si(e) {
  return /* @__PURE__ */ Mt(e) ? e : new Proxy(e, Ya);
}
class Xa {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new ar(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ds - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ue !== this)
      return zo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return qo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Za(e, t, s = !1) {
  let n, r;
  return K(e) ? n = e : (n = e.get, r = e.set), new Xa(n, r, s);
}
const As = {}, Ls = /* @__PURE__ */ new WeakMap();
let Rt;
function Qa(e, t = !1, s = Rt) {
  if (s) {
    let n = Ls.get(s);
    n || Ls.set(s, n = []), n.push(e);
  }
}
function el(e, t, s = le) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = s, f = ($) => r ? $ : /* @__PURE__ */ He($) || r === !1 || r === 0 ? ut($, 1) : ut($);
  let d, h, x, y, g = !1, b = !1;
  if (/* @__PURE__ */ Ce(e) ? (h = () => e.value, g = /* @__PURE__ */ He(e)) : /* @__PURE__ */ Mt(e) ? (h = () => f(e), g = !0) : z(e) ? (b = !0, g = e.some(($) => /* @__PURE__ */ Mt($) || /* @__PURE__ */ He($)), h = () => e.map(($) => {
    if (/* @__PURE__ */ Ce($))
      return $.value;
    if (/* @__PURE__ */ Mt($))
      return f($);
    if (K($))
      return c ? c($, 2) : $();
  })) : K(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (x) {
      pt();
      try {
        x();
      } finally {
        ht();
      }
    }
    const $ = Rt;
    Rt = d;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Rt = $;
    }
  } : h = nt, t && r) {
    const $ = h, E = r === !0 ? 1 / 0 : r;
    h = () => ut($(), E);
  }
  const p = Ta(), w = () => {
    d.stop(), p && p.active && er(p.effects, d);
  };
  if (o && t) {
    const $ = t;
    t = (...E) => {
      $(...E), w();
    };
  }
  let N = b ? new Array(e.length).fill(As) : As;
  const L = ($) => {
    if (!(!(d.flags & 1) || !d.dirty && !$))
      if (t) {
        const E = d.run();
        if (r || g || (b ? E.some((j, J) => yt(j, N[J])) : yt(E, N))) {
          x && x();
          const j = Rt;
          Rt = d;
          try {
            const J = [
              E,
              // pass undefined as the old value when it's changed for the first time
              N === As ? void 0 : b && N[0] === As ? [] : N,
              y
            ];
            N = E, c ? c(t, 3, J) : (
              // @ts-expect-error
              t(...J)
            );
          } finally {
            Rt = j;
          }
        }
      } else
        d.run();
  };
  return l && l(L), d = new Uo(h), d.scheduler = i ? () => i(L, !1) : L, y = ($) => Qa($, !1, d), x = d.onStop = () => {
    const $ = Ls.get(d);
    if ($) {
      if (c)
        c($, 4);
      else
        for (const E of $) E();
      Ls.delete(d);
    }
  }, t ? n ? L(!0) : N = d.run() : i ? i(L.bind(null, !0), !0) : d.run(), w.pause = d.pause.bind(d), w.resume = d.resume.bind(d), w.stop = w, w;
}
function ut(e, t = 1 / 0, s) {
  if (t <= 0 || !re(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ Ce(e))
    ut(e.value, t, s);
  else if (z(e))
    for (let n = 0; n < e.length; n++)
      ut(e[n], t, s);
  else if (Mo(e) || zt(e))
    e.forEach((n) => {
      ut(n, t, s);
    });
  else if (Qs(e)) {
    for (const n in e)
      ut(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ut(e[n], t, s);
  }
  return e;
}
function vs(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    nn(r, t, s);
  }
}
function We(e, t, s, n) {
  if (K(e)) {
    const r = vs(e, t, s, n);
    return r && jo(r) && r.catch((o) => {
      nn(o, t, s);
    }), r;
  }
  if (z(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(We(e[o], t, s, n));
    return r;
  }
}
function nn(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || le;
  if (t) {
    let l = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      pt(), vs(o, null, 10, [
        e,
        c,
        f
      ]), ht();
      return;
    }
  }
  tl(e, s, r, n, i);
}
function tl(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Te = [];
let et = -1;
const Ht = [];
let xt = null, Lt = 0;
const ni = /* @__PURE__ */ Promise.resolve();
let Us = null;
function Bs(e) {
  const t = Us || ni;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function sl(e) {
  let t = et + 1, s = Te.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = Te[n], o = us(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function ur(e) {
  if (!(e.flags & 1)) {
    const t = us(e), s = Te[Te.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= us(s) ? Te.push(e) : Te.splice(sl(t), 0, e), e.flags |= 1, ri();
  }
}
function ri() {
  Us || (Us = ni.then(ii));
}
function nl(e) {
  z(e) ? Ht.push(...e) : xt && e.id === -1 ? xt.splice(Lt + 1, 0, e) : e.flags & 1 || (Ht.push(e), e.flags |= 1), ri();
}
function $r(e, t, s = et + 1) {
  for (; s < Te.length; s++) {
    const n = Te[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Te.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function oi(e) {
  if (Ht.length) {
    const t = [...new Set(Ht)].sort(
      (s, n) => us(s) - us(n)
    );
    if (Ht.length = 0, xt) {
      xt.push(...t);
      return;
    }
    for (xt = t, Lt = 0; Lt < xt.length; Lt++) {
      const s = xt[Lt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    xt = null, Lt = 0;
  }
}
const us = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ii(e) {
  try {
    for (et = 0; et < Te.length; et++) {
      const t = Te[et];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), vs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; et < Te.length; et++) {
      const t = Te[et];
      t && (t.flags &= -2);
    }
    et = -1, Te.length = 0, oi(), Us = null, (Te.length || Ht.length) && ii();
  }
}
let ze = null, ai = null;
function zs(e) {
  const t = ze;
  return ze = e, ai = e && e.type.__scopeId || null, t;
}
function Hs(e, t = ze, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && Ws(-1);
    const o = zs(t);
    let i;
    try {
      i = e(...r);
    } finally {
      zs(o), n._d && Ws(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Vs(e, t) {
  if (ze === null)
    return e;
  const s = dn(ze), n = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = le] = t[r];
    o && (K(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ut(i), n.push({
      dir: o,
      instance: s,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function Ct(e, t, s, n) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[n];
    c && (pt(), We(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), ht());
  }
}
function rl(e, t) {
  if (Ae) {
    let s = Ae.provides;
    const n = Ae.parent && Ae.parent.provides;
    n === s && (s = Ae.provides = Object.create(n)), s[e] = t;
  }
}
function os(e, t, s = !1) {
  const n = Ii();
  if (n || Vt) {
    let r = Vt ? Vt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && K(t) ? t.call(n && n.proxy) : t;
  }
}
const ol = /* @__PURE__ */ Symbol.for("v-scx"), il = () => os(ol);
function Ms(e, t, s) {
  return li(e, t, s);
}
function li(e, t, s = le) {
  const { immediate: n, deep: r, flush: o, once: i } = s, l = he({}, s), c = t && n || !t && o !== "post";
  let f;
  if (ms) {
    if (o === "sync") {
      const y = il();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = nt, y.resume = nt, y.pause = nt, y;
    }
  }
  const d = Ae;
  l.call = (y, g, b) => We(y, d, g, b);
  let h = !1;
  o === "post" ? l.scheduler = (y) => {
    Me(y, d && d.suspense);
  } : o !== "sync" && (h = !0, l.scheduler = (y, g) => {
    g ? y() : ur(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), h && (y.flags |= 2, d && (y.id = d.uid, y.i = d));
  };
  const x = el(e, t, l);
  return ms && (f ? f.push(x) : c && x()), x;
}
function al(e, t, s) {
  const n = this.proxy, r = me(e) ? e.includes(".") ? ci(n, e) : () => n[e] : e.bind(n, n);
  let o;
  K(t) ? o = t : (o = t.handler, s = t);
  const i = xs(this), l = li(r, o.bind(n), s);
  return i(), l;
}
function ci(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const ll = /* @__PURE__ */ Symbol("_vte"), di = (e) => e.__isTeleport, tt = /* @__PURE__ */ Symbol("_leaveCb"), Zt = /* @__PURE__ */ Symbol("_enterCb");
function cl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return an(() => {
    e.isMounted = !0;
  }), vi(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ue = [Function, Array], fi = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ue,
  onEnter: Ue,
  onAfterEnter: Ue,
  onEnterCancelled: Ue,
  // leave
  onBeforeLeave: Ue,
  onLeave: Ue,
  onAfterLeave: Ue,
  onLeaveCancelled: Ue,
  // appear
  onBeforeAppear: Ue,
  onAppear: Ue,
  onAfterAppear: Ue,
  onAppearCancelled: Ue
}, ui = (e) => {
  const t = e.subTree;
  return t.component ? ui(t.component) : t;
}, dl = {
  name: "BaseTransition",
  props: fi,
  setup(e, { slots: t }) {
    const s = Ii(), n = cl();
    return () => {
      const r = t.default && mi(t.default(), !0);
      if (!r || !r.length)
        return;
      const o = pi(r), i = /* @__PURE__ */ te(e), { mode: l } = i;
      if (n.isLeaving)
        return wn(o);
      const c = Mr(o);
      if (!c)
        return wn(o);
      let f = In(
        c,
        i,
        n,
        s,
        // #11061, ensure enterHooks is fresh after clone
        (h) => f = h
      );
      c.type !== Re && ps(c, f);
      let d = s.subTree && Mr(s.subTree);
      if (d && d.type !== Re && !At(d, c) && ui(s).type !== Re) {
        let h = In(
          d,
          i,
          n,
          s
        );
        if (ps(d, h), l === "out-in" && c.type !== Re)
          return n.isLeaving = !0, h.afterLeave = () => {
            n.isLeaving = !1, s.job.flags & 8 || s.update(), delete h.afterLeave, d = void 0;
          }, wn(o);
        l === "in-out" && c.type !== Re ? h.delayLeave = (x, y, g) => {
          const b = hi(
            n,
            d
          );
          b[String(d.key)] = d, x[tt] = () => {
            y(), x[tt] = void 0, delete f.delayedLeave, d = void 0;
          }, f.delayedLeave = () => {
            g(), delete f.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return o;
    };
  }
};
function pi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Re) {
        t = s;
        break;
      }
  }
  return t;
}
const fl = dl;
function hi(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), s.set(t.type, n)), n;
}
function In(e, t, s, n, r) {
  const {
    appear: o,
    mode: i,
    persisted: l = !1,
    onBeforeEnter: c,
    onEnter: f,
    onAfterEnter: d,
    onEnterCancelled: h,
    onBeforeLeave: x,
    onLeave: y,
    onAfterLeave: g,
    onLeaveCancelled: b,
    onBeforeAppear: p,
    onAppear: w,
    onAfterAppear: N,
    onAppearCancelled: L
  } = t, $ = String(e.key), E = hi(s, e), j = (U, X) => {
    U && We(
      U,
      n,
      9,
      X
    );
  }, J = (U, X) => {
    const ce = X[1];
    j(U, X), z(U) ? U.every((I) => I.length <= 1) && ce() : U.length <= 1 && ce();
  }, W = {
    mode: i,
    persisted: l,
    beforeEnter(U) {
      let X = c;
      if (!s.isMounted)
        if (o)
          X = p || c;
        else
          return;
      U[tt] && U[tt](
        !0
        /* cancelled */
      );
      const ce = E[$];
      ce && At(e, ce) && ce.el[tt] && ce.el[tt](), j(X, [U]);
    },
    enter(U) {
      let X = f, ce = d, I = h;
      if (!s.isMounted)
        if (o)
          X = w || f, ce = N || d, I = L || h;
        else
          return;
      let ne = !1;
      U[Zt] = (Le) => {
        ne || (ne = !0, Le ? j(I, [U]) : j(ce, [U]), W.delayedLeave && W.delayedLeave(), U[Zt] = void 0);
      };
      const pe = U[Zt].bind(null, !1);
      X ? J(X, [U, pe]) : pe();
    },
    leave(U, X) {
      const ce = String(e.key);
      if (U[Zt] && U[Zt](
        !0
        /* cancelled */
      ), s.isUnmounting)
        return X();
      j(x, [U]);
      let I = !1;
      U[tt] = (pe) => {
        I || (I = !0, X(), pe ? j(b, [U]) : j(g, [U]), U[tt] = void 0, E[ce] === e && delete E[ce]);
      };
      const ne = U[tt].bind(null, !1);
      E[ce] = e, y ? J(y, [U, ne]) : ne();
    },
    clone(U) {
      const X = In(
        U,
        t,
        s,
        n,
        r
      );
      return r && r(X), X;
    }
  };
  return W;
}
function wn(e) {
  if (rn(e))
    return e = _t(e), e.children = null, e;
}
function Mr(e) {
  if (!rn(e))
    return di(e.type) && e.children ? pi(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16)
      return s[0];
    if (t & 32 && K(s.default))
      return s.default();
  }
}
function ps(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ps(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function mi(e, t = !1, s) {
  let n = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = s == null ? i.key : String(s) + String(i.key != null ? i.key : o);
    i.type === ee ? (i.patchFlag & 128 && r++, n = n.concat(
      mi(i.children, t, l)
    )) : (t || i.type !== Re) && n.push(l != null ? _t(i, { key: l }) : i);
  }
  if (r > 1)
    for (let o = 0; o < n.length; o++)
      n[o].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function ul(e, t) {
  return K(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    he({ name: e.name }, t, { setup: e })
  ) : e;
}
function gi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function jr(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const qs = /* @__PURE__ */ new WeakMap();
function is(e, t, s, n, r = !1) {
  if (z(e)) {
    e.forEach(
      (b, p) => is(
        b,
        t && (z(t) ? t[p] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (as(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && is(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? dn(n.component) : n.el, i = r ? null : o, { i: l, r: c } = e, f = t && t.r, d = l.refs === le ? l.refs = {} : l.refs, h = l.setupState, x = /* @__PURE__ */ te(h), y = h === le ? $o : (b) => jr(d, b) ? !1 : se(x, b), g = (b, p) => !(p && jr(d, p));
  if (f != null && f !== c) {
    if (Pr(t), me(f))
      d[f] = null, y(f) && (h[f] = null);
    else if (/* @__PURE__ */ Ce(f)) {
      const b = t;
      g(f, b.k) && (f.value = null), b.k && (d[b.k] = null);
    }
  }
  if (K(c))
    vs(c, l, 12, [i, d]);
  else {
    const b = me(c), p = /* @__PURE__ */ Ce(c);
    if (b || p) {
      const w = () => {
        if (e.f) {
          const N = b ? y(c) ? h[c] : d[c] : g() || !e.k ? c.value : d[e.k];
          if (r)
            z(N) && er(N, o);
          else if (z(N))
            N.includes(o) || N.push(o);
          else if (b)
            d[c] = [o], y(c) && (h[c] = d[c]);
          else {
            const L = [o];
            g(c, e.k) && (c.value = L), e.k && (d[e.k] = L);
          }
        } else b ? (d[c] = i, y(c) && (h[c] = i)) : p && (g(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const N = () => {
          w(), qs.delete(e);
        };
        N.id = -1, qs.set(e, N), Me(N, s);
      } else
        Pr(e), w();
    }
  }
}
function Pr(e) {
  const t = qs.get(e);
  t && (t.flags |= 8, qs.delete(e));
}
tn().requestIdleCallback;
tn().cancelIdleCallback;
const as = (e) => !!e.type.__asyncLoader, rn = (e) => e.type.__isKeepAlive;
function pl(e, t) {
  bi(e, "a", t);
}
function hl(e, t) {
  bi(e, "da", t);
}
function bi(e, t, s = Ae) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (on(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      rn(r.parent.vnode) && ml(n, t, s, r), r = r.parent;
  }
}
function ml(e, t, s, n) {
  const r = on(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  pr(() => {
    er(n[t], r);
  }, s);
}
function on(e, t, s = Ae, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      pt();
      const l = xs(s), c = We(t, s, e, i);
      return l(), ht(), c;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const gt = (e) => (t, s = Ae) => {
  (!ms || e === "sp") && on(e, (...n) => t(...n), s);
}, gl = gt("bm"), an = gt("m"), bl = gt(
  "bu"
), vl = gt("u"), vi = gt(
  "bum"
), pr = gt("um"), xl = gt(
  "sp"
), yl = gt("rtg"), _l = gt("rtc");
function wl(e, t = Ae) {
  on("ec", e, t);
}
const kl = /* @__PURE__ */ Symbol.for("v-ndc");
function ke(e, t, s, n) {
  let r;
  const o = s, i = z(e);
  if (i || me(e)) {
    const l = i && /* @__PURE__ */ Mt(e);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ He(e), f = /* @__PURE__ */ mt(e), e = sn(e)), r = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      r[d] = t(
        c ? f ? qt(Ke(e[d])) : Ke(e[d]) : e[d],
        d,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (re(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const d = l[c];
        r[c] = t(e[d], d, c, o);
      }
    }
  else
    r = [];
  return r;
}
const Ln = (e) => e ? Li(e) ? dn(e) : Ln(e.parent) : null, ls = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ he(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ln(e.parent),
    $root: (e) => Ln(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => yi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ur(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Bs.bind(e.proxy)),
    $watch: (e) => al.bind(e)
  })
), kn = (e, t) => e !== le && !e.__isScriptSetup && se(e, t), Cl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: o, accessCache: i, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const x = i[t];
      if (x !== void 0)
        switch (x) {
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
        if (kn(n, t))
          return i[t] = 1, n[t];
        if (r !== le && se(r, t))
          return i[t] = 2, r[t];
        if (se(o, t))
          return i[t] = 3, o[t];
        if (s !== le && se(s, t))
          return i[t] = 4, s[t];
        Un && (i[t] = 0);
      }
    }
    const f = ls[t];
    let d, h;
    if (f)
      return t === "$attrs" && _e(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (s !== le && se(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      h = c.config.globalProperties, se(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return kn(r, t) ? (r[t] = s, !0) : n !== le && se(n, t) ? (n[t] = s, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, props: o, type: i }
  }, l) {
    let c;
    return !!(s[l] || e !== le && l[0] !== "$" && se(e, l) || kn(t, l) || se(o, l) || se(n, l) || se(ls, l) || se(r.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : se(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Nr(e) {
  return z(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Un = !0;
function Sl(e) {
  const t = yi(e), s = e.proxy, n = e.ctx;
  Un = !1, t.beforeCreate && Dr(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: x,
    beforeUpdate: y,
    updated: g,
    activated: b,
    deactivated: p,
    beforeDestroy: w,
    beforeUnmount: N,
    destroyed: L,
    unmounted: $,
    render: E,
    renderTracked: j,
    renderTriggered: J,
    errorCaptured: W,
    serverPrefetch: U,
    // public API
    expose: X,
    inheritAttrs: ce,
    // assets
    components: I,
    directives: ne,
    filters: pe
  } = t;
  if (f && El(f, n, null), i)
    for (const de in i) {
      const G = i[de];
      K(G) && (n[de] = G.bind(s));
    }
  if (r) {
    const de = r.call(s, s);
    re(de) && (e.data = /* @__PURE__ */ cr(de));
  }
  if (Un = !0, o)
    for (const de in o) {
      const G = o[de], Ge = K(G) ? G.bind(s, s) : K(G.get) ? G.get.bind(s, s) : nt, Nt = !K(G) && K(G.set) ? G.set.bind(s) : nt, ye = ge({
        get: Ge,
        set: Nt
      });
      Object.defineProperty(n, de, {
        enumerable: !0,
        configurable: !0,
        get: () => ye.value,
        set: (xe) => ye.value = xe
      });
    }
  if (l)
    for (const de in l)
      xi(l[de], n, s, de);
  if (c) {
    const de = K(c) ? c.call(s) : c;
    Reflect.ownKeys(de).forEach((G) => {
      rl(G, de[G]);
    });
  }
  d && Dr(d, e, "c");
  function Z(de, G) {
    z(G) ? G.forEach((Ge) => de(Ge.bind(s))) : G && de(G.bind(s));
  }
  if (Z(gl, h), Z(an, x), Z(bl, y), Z(vl, g), Z(pl, b), Z(hl, p), Z(wl, W), Z(_l, j), Z(yl, J), Z(vi, N), Z(pr, $), Z(xl, U), z(X))
    if (X.length) {
      const de = e.exposed || (e.exposed = {});
      X.forEach((G) => {
        Object.defineProperty(de, G, {
          get: () => s[G],
          set: (Ge) => s[G] = Ge,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  E && e.render === nt && (e.render = E), ce != null && (e.inheritAttrs = ce), I && (e.components = I), ne && (e.directives = ne), U && gi(e);
}
function El(e, t, s = nt) {
  z(e) && (e = Bn(e));
  for (const n in e) {
    const r = e[n];
    let o;
    re(r) ? "default" in r ? o = os(
      r.from || n,
      r.default,
      !0
    ) : o = os(r.from || n) : o = os(r), /* @__PURE__ */ Ce(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function Dr(e, t, s) {
  We(
    z(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function xi(e, t, s, n) {
  let r = n.includes(".") ? ci(s, n) : () => s[n];
  if (me(e)) {
    const o = t[e];
    K(o) && Ms(r, o);
  } else if (K(e))
    Ms(r, e.bind(s));
  else if (re(e))
    if (z(e))
      e.forEach((o) => xi(o, t, s, n));
    else {
      const o = K(e.handler) ? e.handler.bind(s) : t[e.handler];
      K(o) && Ms(r, o, e);
    }
}
function yi(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !r.length && !s && !n ? c = t : (c = {}, r.length && r.forEach(
    (f) => Ks(c, f, i, !0)
  ), Ks(c, t, i)), re(t) && o.set(t, c), c;
}
function Ks(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && Ks(e, o, s, !0), r && r.forEach(
    (i) => Ks(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const l = Tl[i] || s && s[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Tl = {
  data: Fr,
  props: Ir,
  emits: Ir,
  // objects
  methods: ts,
  computed: ts,
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
  components: ts,
  directives: ts,
  // watch
  watch: Al,
  // provide / inject
  provide: Fr,
  inject: Rl
};
function Fr(e, t) {
  return t ? e ? function() {
    return he(
      K(e) ? e.call(this, this) : e,
      K(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rl(e, t) {
  return ts(Bn(e), Bn(t));
}
function Bn(e) {
  if (z(e)) {
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
function ts(e, t) {
  return e ? he(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ir(e, t) {
  return e ? z(e) && z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : he(
    /* @__PURE__ */ Object.create(null),
    Nr(e),
    Nr(t ?? {})
  ) : t;
}
function Al(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = he(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Se(e[n], t[n]);
  return s;
}
function _i() {
  return {
    app: null,
    config: {
      isNativeTag: $o,
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
let Ol = 0;
function $l(e, t) {
  return function(n, r = null) {
    K(n) || (n = he({}, n)), r != null && !re(r) && (r = null);
    const o = _i(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = o.app = {
      _uid: Ol++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: cc,
      get config() {
        return o.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return i.has(d) || (d && K(d.install) ? (i.add(d), d.install(f, ...h)) : K(d) && (i.add(d), d(f, ...h))), f;
      },
      mixin(d) {
        return o.mixins.includes(d) || o.mixins.push(d), f;
      },
      component(d, h) {
        return h ? (o.components[d] = h, f) : o.components[d];
      },
      directive(d, h) {
        return h ? (o.directives[d] = h, f) : o.directives[d];
      },
      mount(d, h, x) {
        if (!c) {
          const y = f._ceVNode || ve(n, r);
          return y.appContext = o, x === !0 ? x = "svg" : x === !1 && (x = void 0), e(y, d, x), c = !0, f._container = d, d.__vue_app__ = f, dn(y.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        c && (We(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return o.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = Vt;
        Vt = f;
        try {
          return d();
        } finally {
          Vt = h;
        }
      }
    };
    return f;
  };
}
let Vt = null;
const Ml = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ve(t)}Modifiers`] || e[`${Fe(t)}Modifiers`];
function jl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || le;
  let r = s;
  const o = t.startsWith("update:"), i = o && Ml(n, t.slice(7));
  i && (i.trim && (r = s.map((d) => me(d) ? d.trim() : d)), i.number && (r = s.map(sr)));
  let l, c = n[l = bn(t)] || // also try camelCase event handler (#2249)
  n[l = bn(Ve(t))];
  !c && o && (c = n[l = bn(Fe(t))]), c && We(
    c,
    e,
    6,
    r
  );
  const f = n[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, We(
      f,
      e,
      6,
      r
    );
  }
}
const Pl = /* @__PURE__ */ new WeakMap();
function wi(e, t, s = !1) {
  const n = s ? Pl : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!K(e)) {
    const c = (f) => {
      const d = wi(f, t, !0);
      d && (l = !0, he(i, d));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (re(e) && n.set(e, null), null) : (z(o) ? o.forEach((c) => i[c] = null) : he(i, o), re(e) && n.set(e, i), i);
}
function ln(e, t) {
  return !e || !Zs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Fe(t)) || se(e, t));
}
function Lr(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: l,
    emit: c,
    render: f,
    renderCache: d,
    props: h,
    data: x,
    setupState: y,
    ctx: g,
    inheritAttrs: b
  } = e, p = zs(e);
  let w, N;
  try {
    if (s.shapeFlag & 4) {
      const $ = r || n, E = $;
      w = st(
        f.call(
          E,
          $,
          d,
          h,
          y,
          x,
          g
        )
      ), N = l;
    } else {
      const $ = t;
      w = st(
        $.length > 1 ? $(
          h,
          { attrs: l, slots: i, emit: c }
        ) : $(
          h,
          null
        )
      ), N = t.props ? l : Nl(l);
    }
  } catch ($) {
    cs.length = 0, nn($, e, 1), w = ve(Re);
  }
  let L = w;
  if (N && b !== !1) {
    const $ = Object.keys(N), { shapeFlag: E } = L;
    $.length && E & 7 && (o && $.some(Qn) && (N = Dl(
      N,
      o
    )), L = _t(L, N, !1, !0));
  }
  return s.dirs && (L = _t(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(s.dirs) : s.dirs), s.transition && ps(L, s.transition), w = L, zs(p), w;
}
const Nl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Zs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Dl = (e, t) => {
  const s = {};
  for (const n in e)
    (!Qn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Fl(e, t, s) {
  const { props: n, children: r, component: o } = e, { props: i, children: l, patchFlag: c } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? Ur(n, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const x = d[h];
        if (ki(i, n, x) && !ln(f, x))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? Ur(n, i, f) : !0 : !!i;
  return !1;
}
function Ur(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (ki(t, e, o) && !ln(s, o))
      return !0;
  }
  return !1;
}
function ki(e, t, s) {
  const n = e[s], r = t[s];
  return s === "style" && re(n) && re(r) ? !nr(n, r) : n !== r;
}
function Il({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Ci = {}, Si = () => Object.create(Ci), Ei = (e) => Object.getPrototypeOf(e) === Ci;
function Ll(e, t, s, n = !1) {
  const r = {}, o = Si();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ti(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : /* @__PURE__ */ Ka(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Ul(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ te(r), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let x = d[h];
        if (ln(e.emitsOptions, x))
          continue;
        const y = t[x];
        if (c)
          if (se(o, x))
            y !== o[x] && (o[x] = y, f = !0);
          else {
            const g = Ve(x);
            r[g] = zn(
              c,
              l,
              g,
              y,
              e,
              !1
            );
          }
        else
          y !== o[x] && (o[x] = y, f = !0);
      }
    }
  } else {
    Ti(e, t, r, o) && (f = !0);
    let d;
    for (const h in l)
      (!t || // for camelCase
      !se(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Fe(h)) === h || !se(t, d))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[d] !== void 0) && (r[h] = zn(
        c,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete r[h]);
    if (o !== l)
      for (const h in o)
        (!t || !se(t, h)) && (delete o[h], f = !0);
  }
  f && ft(e.attrs, "set", "");
}
function Ti(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (ss(c))
        continue;
      const f = t[c];
      let d;
      r && se(r, d = Ve(c)) ? !o || !o.includes(d) ? s[d] = f : (l || (l = {}))[d] = f : ln(e.emitsOptions, c) || (!(c in n) || f !== n[c]) && (n[c] = f, i = !0);
    }
  if (o) {
    const c = /* @__PURE__ */ te(s), f = l || le;
    for (let d = 0; d < o.length; d++) {
      const h = o[d];
      s[h] = zn(
        r,
        c,
        h,
        f[h],
        e,
        !se(f, h)
      );
    }
  }
  return i;
}
function zn(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const l = se(i, "default");
    if (l && n === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: f } = r;
        if (s in f)
          n = f[s];
        else {
          const d = xs(r);
          n = f[s] = c.call(
            null,
            t
          ), d();
        }
      } else
        n = c;
      r.ce && r.ce._setProp(s, n);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !l ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Fe(s)) && (n = !0));
  }
  return n;
}
const Bl = /* @__PURE__ */ new WeakMap();
function Ri(e, t, s = !1) {
  const n = s ? Bl : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!K(e)) {
    const d = (h) => {
      c = !0;
      const [x, y] = Ri(h, t, !0);
      he(i, x), y && l.push(...y);
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!o && !c)
    return re(e) && n.set(e, Bt), Bt;
  if (z(o))
    for (let d = 0; d < o.length; d++) {
      const h = Ve(o[d]);
      Br(h) && (i[h] = le);
    }
  else if (o)
    for (const d in o) {
      const h = Ve(d);
      if (Br(h)) {
        const x = o[d], y = i[h] = z(x) || K(x) ? { type: x } : he({}, x), g = y.type;
        let b = !1, p = !0;
        if (z(g))
          for (let w = 0; w < g.length; ++w) {
            const N = g[w], L = K(N) && N.name;
            if (L === "Boolean") {
              b = !0;
              break;
            } else L === "String" && (p = !1);
          }
        else
          b = K(g) && g.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = b, y[
          1
          /* shouldCastTrue */
        ] = p, (b || se(y, "default")) && l.push(h);
      }
    }
  const f = [i, l];
  return re(e) && n.set(e, f), f;
}
function Br(e) {
  return e[0] !== "$" && !ss(e);
}
const hr = (e) => e === "_" || e === "_ctx" || e === "$stable", mr = (e) => z(e) ? e.map(st) : [st(e)], zl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Hs((...r) => mr(t(...r)), s);
  return n._c = !1, n;
}, Ai = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (hr(r)) continue;
    const o = e[r];
    if (K(o))
      t[r] = zl(r, o, n);
    else if (o != null) {
      const i = mr(o);
      t[r] = () => i;
    }
  }
}, Oi = (e, t) => {
  const s = mr(t);
  e.slots.default = () => s;
}, $i = (e, t, s) => {
  for (const n in t)
    (s || !hr(n)) && (e[n] = t[n]);
}, Hl = (e, t, s) => {
  const n = e.slots = Si();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? ($i(n, t, s), s && Do(n, "_", r, !0)) : Ai(t, n);
  } else t && Oi(e, t);
}, Vl = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = le;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : $i(r, t, s) : (o = !t.$stable, Ai(t, r)), i = t;
  } else t && (Oi(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !hr(l) && i[l] == null && delete r[l];
}, Me = Gl;
function ql(e) {
  return Kl(e);
}
function Kl(e, t) {
  const s = tn();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: h,
    nextSibling: x,
    setScopeId: y = nt,
    insertStaticContent: g
  } = e, b = (u, m, _, O = null, S = null, T = null, D = void 0, P = null, M = !!m.dynamicChildren) => {
    if (u === m)
      return;
    u && !At(u, m) && (O = Es(u), xe(u, S, T, !0), u = null), m.patchFlag === -2 && (M = !1, m.dynamicChildren = null);
    const { type: R, ref: H, shapeFlag: F } = m;
    switch (R) {
      case cn:
        p(u, m, _, O);
        break;
      case Re:
        w(u, m, _, O);
        break;
      case js:
        u == null && N(m, _, O, D);
        break;
      case ee:
        I(
          u,
          m,
          _,
          O,
          S,
          T,
          D,
          P,
          M
        );
        break;
      default:
        F & 1 ? E(
          u,
          m,
          _,
          O,
          S,
          T,
          D,
          P,
          M
        ) : F & 6 ? ne(
          u,
          m,
          _,
          O,
          S,
          T,
          D,
          P,
          M
        ) : (F & 64 || F & 128) && R.process(
          u,
          m,
          _,
          O,
          S,
          T,
          D,
          P,
          M,
          Gt
        );
    }
    H != null && S ? is(H, u && u.ref, T, m || u, !m) : H == null && u && u.ref != null && is(u.ref, null, T, u, !0);
  }, p = (u, m, _, O) => {
    if (u == null)
      n(
        m.el = l(m.children),
        _,
        O
      );
    else {
      const S = m.el = u.el;
      m.children !== u.children && f(S, m.children);
    }
  }, w = (u, m, _, O) => {
    u == null ? n(
      m.el = c(m.children || ""),
      _,
      O
    ) : m.el = u.el;
  }, N = (u, m, _, O) => {
    [u.el, u.anchor] = g(
      u.children,
      m,
      _,
      O,
      u.el,
      u.anchor
    );
  }, L = ({ el: u, anchor: m }, _, O) => {
    let S;
    for (; u && u !== m; )
      S = x(u), n(u, _, O), u = S;
    n(m, _, O);
  }, $ = ({ el: u, anchor: m }) => {
    let _;
    for (; u && u !== m; )
      _ = x(u), r(u), u = _;
    r(m);
  }, E = (u, m, _, O, S, T, D, P, M) => {
    if (m.type === "svg" ? D = "svg" : m.type === "math" && (D = "mathml"), u == null)
      j(
        m,
        _,
        O,
        S,
        T,
        D,
        P,
        M
      );
    else {
      const R = u.el && u.el._isVueCE ? u.el : null;
      try {
        R && R._beginPatch(), U(
          u,
          m,
          S,
          T,
          D,
          P,
          M
        );
      } finally {
        R && R._endPatch();
      }
    }
  }, j = (u, m, _, O, S, T, D, P) => {
    let M, R;
    const { props: H, shapeFlag: F, transition: B, dirs: q } = u;
    if (M = u.el = i(
      u.type,
      T,
      H && H.is,
      H
    ), F & 8 ? d(M, u.children) : F & 16 && W(
      u.children,
      M,
      null,
      O,
      S,
      Cn(u, T),
      D,
      P
    ), q && Ct(u, null, O, "created"), J(M, u, u.scopeId, D, O), H) {
      for (const fe in H)
        fe !== "value" && !ss(fe) && o(M, fe, null, H[fe], T, O);
      "value" in H && o(M, "value", null, H.value, T), (R = H.onVnodeBeforeMount) && Qe(R, O, u);
    }
    q && Ct(u, null, O, "beforeMount");
    const Y = Wl(S, B);
    Y && B.beforeEnter(M), n(M, m, _), ((R = H && H.onVnodeMounted) || Y || q) && Me(() => {
      R && Qe(R, O, u), Y && B.enter(M), q && Ct(u, null, O, "mounted");
    }, S);
  }, J = (u, m, _, O, S) => {
    if (_ && y(u, _), O)
      for (let T = 0; T < O.length; T++)
        y(u, O[T]);
    if (S) {
      let T = S.subTree;
      if (m === T || Ni(T.type) && (T.ssContent === m || T.ssFallback === m)) {
        const D = S.vnode;
        J(
          u,
          D,
          D.scopeId,
          D.slotScopeIds,
          S.parent
        );
      }
    }
  }, W = (u, m, _, O, S, T, D, P, M = 0) => {
    for (let R = M; R < u.length; R++) {
      const H = u[R] = P ? dt(u[R]) : st(u[R]);
      b(
        null,
        H,
        m,
        _,
        O,
        S,
        T,
        D,
        P
      );
    }
  }, U = (u, m, _, O, S, T, D) => {
    const P = m.el = u.el;
    let { patchFlag: M, dynamicChildren: R, dirs: H } = m;
    M |= u.patchFlag & 16;
    const F = u.props || le, B = m.props || le;
    let q;
    if (_ && St(_, !1), (q = B.onVnodeBeforeUpdate) && Qe(q, _, m, u), H && Ct(m, u, _, "beforeUpdate"), _ && St(_, !0), (F.innerHTML && B.innerHTML == null || F.textContent && B.textContent == null) && d(P, ""), R ? X(
      u.dynamicChildren,
      R,
      P,
      _,
      O,
      Cn(m, S),
      T
    ) : D || G(
      u,
      m,
      P,
      null,
      _,
      O,
      Cn(m, S),
      T,
      !1
    ), M > 0) {
      if (M & 16)
        ce(P, F, B, _, S);
      else if (M & 2 && F.class !== B.class && o(P, "class", null, B.class, S), M & 4 && o(P, "style", F.style, B.style, S), M & 8) {
        const Y = m.dynamicProps;
        for (let fe = 0; fe < Y.length; fe++) {
          const oe = Y[fe], Oe = F[oe], $e = B[oe];
          ($e !== Oe || oe === "value") && o(P, oe, Oe, $e, S, _);
        }
      }
      M & 1 && u.children !== m.children && d(P, m.children);
    } else !D && R == null && ce(P, F, B, _, S);
    ((q = B.onVnodeUpdated) || H) && Me(() => {
      q && Qe(q, _, m, u), H && Ct(m, u, _, "updated");
    }, O);
  }, X = (u, m, _, O, S, T, D) => {
    for (let P = 0; P < m.length; P++) {
      const M = u[P], R = m[P], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        M.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !At(M, R) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 198) ? h(M.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      b(
        M,
        R,
        H,
        null,
        O,
        S,
        T,
        D,
        !0
      );
    }
  }, ce = (u, m, _, O, S) => {
    if (m !== _) {
      if (m !== le)
        for (const T in m)
          !ss(T) && !(T in _) && o(
            u,
            T,
            m[T],
            null,
            S,
            O
          );
      for (const T in _) {
        if (ss(T)) continue;
        const D = _[T], P = m[T];
        D !== P && T !== "value" && o(u, T, P, D, S, O);
      }
      "value" in _ && o(u, "value", m.value, _.value, S);
    }
  }, I = (u, m, _, O, S, T, D, P, M) => {
    const R = m.el = u ? u.el : l(""), H = m.anchor = u ? u.anchor : l("");
    let { patchFlag: F, dynamicChildren: B, slotScopeIds: q } = m;
    q && (P = P ? P.concat(q) : q), u == null ? (n(R, _, O), n(H, _, O), W(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      _,
      H,
      S,
      T,
      D,
      P,
      M
    )) : F > 0 && F & 64 && B && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === B.length ? (X(
      u.dynamicChildren,
      B,
      _,
      S,
      T,
      D,
      P
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || S && m === S.subTree) && Mi(
      u,
      m,
      !0
      /* shallow */
    )) : G(
      u,
      m,
      _,
      H,
      S,
      T,
      D,
      P,
      M
    );
  }, ne = (u, m, _, O, S, T, D, P, M) => {
    m.slotScopeIds = P, u == null ? m.shapeFlag & 512 ? S.ctx.activate(
      m,
      _,
      O,
      D,
      M
    ) : pe(
      m,
      _,
      O,
      S,
      T,
      D,
      M
    ) : Le(u, m, M);
  }, pe = (u, m, _, O, S, T, D) => {
    const P = u.component = sc(
      u,
      O,
      S
    );
    if (rn(u) && (P.ctx.renderer = Gt), nc(P, !1, D), P.asyncDep) {
      if (S && S.registerDep(P, Z, D), !u.el) {
        const M = P.subTree = ve(Re);
        w(null, M, m, _), u.placeholder = M.el;
      }
    } else
      Z(
        P,
        u,
        m,
        _,
        S,
        T,
        D
      );
  }, Le = (u, m, _) => {
    const O = m.component = u.component;
    if (Fl(u, m, _))
      if (O.asyncDep && !O.asyncResolved) {
        de(O, m, _);
        return;
      } else
        O.next = m, O.update();
    else
      m.el = u.el, O.vnode = m;
  }, Z = (u, m, _, O, S, T, D) => {
    const P = () => {
      if (u.isMounted) {
        let { next: F, bu: B, u: q, parent: Y, vnode: fe } = u;
        {
          const Xe = ji(u);
          if (Xe) {
            F && (F.el = fe.el, de(u, F, D)), Xe.asyncDep.then(() => {
              Me(() => {
                u.isUnmounted || R();
              }, S);
            });
            return;
          }
        }
        let oe = F, Oe;
        St(u, !1), F ? (F.el = fe.el, de(u, F, D)) : F = fe, B && $s(B), (Oe = F.props && F.props.onVnodeBeforeUpdate) && Qe(Oe, Y, F, fe), St(u, !0);
        const $e = Lr(u), Ye = u.subTree;
        u.subTree = $e, b(
          Ye,
          $e,
          // parent may have changed if it's in a teleport
          h(Ye.el),
          // anchor may have changed if it's in a fragment
          Es(Ye),
          u,
          S,
          T
        ), F.el = $e.el, oe === null && Il(u, $e.el), q && Me(q, S), (Oe = F.props && F.props.onVnodeUpdated) && Me(
          () => Qe(Oe, Y, F, fe),
          S
        );
      } else {
        let F;
        const { el: B, props: q } = m, { bm: Y, m: fe, parent: oe, root: Oe, type: $e } = u, Ye = as(m);
        St(u, !1), Y && $s(Y), !Ye && (F = q && q.onVnodeBeforeMount) && Qe(F, oe, m), St(u, !0);
        {
          Oe.ce && Oe.ce._hasShadowRoot() && Oe.ce._injectChildStyle($e);
          const Xe = u.subTree = Lr(u);
          b(
            null,
            Xe,
            _,
            O,
            u,
            S,
            T
          ), m.el = Xe.el;
        }
        if (fe && Me(fe, S), !Ye && (F = q && q.onVnodeMounted)) {
          const Xe = m;
          Me(
            () => Qe(F, oe, Xe),
            S
          );
        }
        (m.shapeFlag & 256 || oe && as(oe.vnode) && oe.vnode.shapeFlag & 256) && u.a && Me(u.a, S), u.isMounted = !0, m = _ = O = null;
      }
    };
    u.scope.on();
    const M = u.effect = new Uo(P);
    u.scope.off();
    const R = u.update = M.run.bind(M), H = u.job = M.runIfDirty.bind(M);
    H.i = u, H.id = u.uid, M.scheduler = () => ur(H), St(u, !0), R();
  }, de = (u, m, _) => {
    m.component = u;
    const O = u.vnode.props;
    u.vnode = m, u.next = null, Ul(u, m.props, O, _), Vl(u, m.children, _), pt(), $r(u), ht();
  }, G = (u, m, _, O, S, T, D, P, M = !1) => {
    const R = u && u.children, H = u ? u.shapeFlag : 0, F = m.children, { patchFlag: B, shapeFlag: q } = m;
    if (B > 0) {
      if (B & 128) {
        Nt(
          R,
          F,
          _,
          O,
          S,
          T,
          D,
          P,
          M
        );
        return;
      } else if (B & 256) {
        Ge(
          R,
          F,
          _,
          O,
          S,
          T,
          D,
          P,
          M
        );
        return;
      }
    }
    q & 8 ? (H & 16 && Jt(R, S, T), F !== R && d(_, F)) : H & 16 ? q & 16 ? Nt(
      R,
      F,
      _,
      O,
      S,
      T,
      D,
      P,
      M
    ) : Jt(R, S, T, !0) : (H & 8 && d(_, ""), q & 16 && W(
      F,
      _,
      O,
      S,
      T,
      D,
      P,
      M
    ));
  }, Ge = (u, m, _, O, S, T, D, P, M) => {
    u = u || Bt, m = m || Bt;
    const R = u.length, H = m.length, F = Math.min(R, H);
    let B;
    for (B = 0; B < F; B++) {
      const q = m[B] = M ? dt(m[B]) : st(m[B]);
      b(
        u[B],
        q,
        _,
        null,
        S,
        T,
        D,
        P,
        M
      );
    }
    R > H ? Jt(
      u,
      S,
      T,
      !0,
      !1,
      F
    ) : W(
      m,
      _,
      O,
      S,
      T,
      D,
      P,
      M,
      F
    );
  }, Nt = (u, m, _, O, S, T, D, P, M) => {
    let R = 0;
    const H = m.length;
    let F = u.length - 1, B = H - 1;
    for (; R <= F && R <= B; ) {
      const q = u[R], Y = m[R] = M ? dt(m[R]) : st(m[R]);
      if (At(q, Y))
        b(
          q,
          Y,
          _,
          null,
          S,
          T,
          D,
          P,
          M
        );
      else
        break;
      R++;
    }
    for (; R <= F && R <= B; ) {
      const q = u[F], Y = m[B] = M ? dt(m[B]) : st(m[B]);
      if (At(q, Y))
        b(
          q,
          Y,
          _,
          null,
          S,
          T,
          D,
          P,
          M
        );
      else
        break;
      F--, B--;
    }
    if (R > F) {
      if (R <= B) {
        const q = B + 1, Y = q < H ? m[q].el : O;
        for (; R <= B; )
          b(
            null,
            m[R] = M ? dt(m[R]) : st(m[R]),
            _,
            Y,
            S,
            T,
            D,
            P,
            M
          ), R++;
      }
    } else if (R > B)
      for (; R <= F; )
        xe(u[R], S, T, !0), R++;
    else {
      const q = R, Y = R, fe = /* @__PURE__ */ new Map();
      for (R = Y; R <= B; R++) {
        const De = m[R] = M ? dt(m[R]) : st(m[R]);
        De.key != null && fe.set(De.key, R);
      }
      let oe, Oe = 0;
      const $e = B - Y + 1;
      let Ye = !1, Xe = 0;
      const Yt = new Array($e);
      for (R = 0; R < $e; R++) Yt[R] = 0;
      for (R = q; R <= F; R++) {
        const De = u[R];
        if (Oe >= $e) {
          xe(De, S, T, !0);
          continue;
        }
        let Ze;
        if (De.key != null)
          Ze = fe.get(De.key);
        else
          for (oe = Y; oe <= B; oe++)
            if (Yt[oe - Y] === 0 && At(De, m[oe])) {
              Ze = oe;
              break;
            }
        Ze === void 0 ? xe(De, S, T, !0) : (Yt[Ze - Y] = R + 1, Ze >= Xe ? Xe = Ze : Ye = !0, b(
          De,
          m[Ze],
          _,
          null,
          S,
          T,
          D,
          P,
          M
        ), Oe++);
      }
      const Cr = Ye ? Jl(Yt) : Bt;
      for (oe = Cr.length - 1, R = $e - 1; R >= 0; R--) {
        const De = Y + R, Ze = m[De], Sr = m[De + 1], Er = De + 1 < H ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Sr.el || Pi(Sr)
        ) : O;
        Yt[R] === 0 ? b(
          null,
          Ze,
          _,
          Er,
          S,
          T,
          D,
          P,
          M
        ) : Ye && (oe < 0 || R !== Cr[oe] ? ye(Ze, _, Er, 2) : oe--);
      }
    }
  }, ye = (u, m, _, O, S = null) => {
    const { el: T, type: D, transition: P, children: M, shapeFlag: R } = u;
    if (R & 6) {
      ye(u.component.subTree, m, _, O);
      return;
    }
    if (R & 128) {
      u.suspense.move(m, _, O);
      return;
    }
    if (R & 64) {
      D.move(u, m, _, Gt);
      return;
    }
    if (D === ee) {
      n(T, m, _);
      for (let F = 0; F < M.length; F++)
        ye(M[F], m, _, O);
      n(u.anchor, m, _);
      return;
    }
    if (D === js) {
      L(u, m, _);
      return;
    }
    if (O !== 2 && R & 1 && P)
      if (O === 0)
        P.beforeEnter(T), n(T, m, _), Me(() => P.enter(T), S);
      else {
        const { leave: F, delayLeave: B, afterLeave: q } = P, Y = () => {
          u.ctx.isUnmounted ? r(T) : n(T, m, _);
        }, fe = () => {
          T._isLeaving && T[tt](
            !0
            /* cancelled */
          ), F(T, () => {
            Y(), q && q();
          });
        };
        B ? B(T, Y, fe) : fe();
      }
    else
      n(T, m, _);
  }, xe = (u, m, _, O = !1, S = !1) => {
    const {
      type: T,
      props: D,
      ref: P,
      children: M,
      dynamicChildren: R,
      shapeFlag: H,
      patchFlag: F,
      dirs: B,
      cacheIndex: q
    } = u;
    if (F === -2 && (S = !1), P != null && (pt(), is(P, null, _, u, !0), ht()), q != null && (m.renderCache[q] = void 0), H & 256) {
      m.ctx.deactivate(u);
      return;
    }
    const Y = H & 1 && B, fe = !as(u);
    let oe;
    if (fe && (oe = D && D.onVnodeBeforeUnmount) && Qe(oe, m, u), H & 6)
      Ss(u.component, _, O);
    else {
      if (H & 128) {
        u.suspense.unmount(_, O);
        return;
      }
      Y && Ct(u, null, m, "beforeUnmount"), H & 64 ? u.type.remove(
        u,
        m,
        _,
        Gt,
        O
      ) : R && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !R.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (T !== ee || F > 0 && F & 64) ? Jt(
        R,
        m,
        _,
        !1,
        !0
      ) : (T === ee && F & 384 || !S && H & 16) && Jt(M, m, _), O && Dt(u);
    }
    (fe && (oe = D && D.onVnodeUnmounted) || Y) && Me(() => {
      oe && Qe(oe, m, u), Y && Ct(u, null, m, "unmounted");
    }, _);
  }, Dt = (u) => {
    const { type: m, el: _, anchor: O, transition: S } = u;
    if (m === ee) {
      Ft(_, O);
      return;
    }
    if (m === js) {
      $(u);
      return;
    }
    const T = () => {
      r(_), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (u.shapeFlag & 1 && S && !S.persisted) {
      const { leave: D, delayLeave: P } = S, M = () => D(_, T);
      P ? P(u.el, T, M) : M();
    } else
      T();
  }, Ft = (u, m) => {
    let _;
    for (; u !== m; )
      _ = x(u), r(u), u = _;
    r(m);
  }, Ss = (u, m, _) => {
    const { bum: O, scope: S, job: T, subTree: D, um: P, m: M, a: R } = u;
    zr(M), zr(R), O && $s(O), S.stop(), T && (T.flags |= 8, xe(D, u, m, _)), P && Me(P, m), Me(() => {
      u.isUnmounted = !0;
    }, m);
  }, Jt = (u, m, _, O = !1, S = !1, T = 0) => {
    for (let D = T; D < u.length; D++)
      xe(u[D], m, _, O, S);
  }, Es = (u) => {
    if (u.shapeFlag & 6)
      return Es(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const m = x(u.anchor || u.el), _ = m && m[ll];
    return _ ? x(_) : m;
  };
  let gn = !1;
  const kr = (u, m, _) => {
    let O;
    u == null ? m._vnode && (xe(m._vnode, null, null, !0), O = m._vnode.component) : b(
      m._vnode || null,
      u,
      m,
      null,
      null,
      null,
      _
    ), m._vnode = u, gn || (gn = !0, $r(O), oi(), gn = !1);
  }, Gt = {
    p: b,
    um: xe,
    m: ye,
    r: Dt,
    mt: pe,
    mc: W,
    pc: G,
    pbc: X,
    n: Es,
    o: e
  };
  return {
    render: kr,
    hydrate: void 0,
    createApp: $l(kr)
  };
}
function Cn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function St({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Wl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Mi(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (z(n) && z(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = dt(r[o]), l.el = i.el), !s && l.patchFlag !== -2 && Mi(i, l)), l.type === cn && (l.patchFlag === -1 && (l = r[o] = dt(l)), l.el = i.el), l.type === Re && !l.el && (l.el = i.el);
    }
}
function Jl(e) {
  const t = e.slice(), s = [0];
  let n, r, o, i, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const f = e[n];
    if (f !== 0) {
      if (r = s[s.length - 1], e[r] < f) {
        t[n] = r, s.push(n);
        continue;
      }
      for (o = 0, i = s.length - 1; o < i; )
        l = o + i >> 1, e[s[l]] < f ? o = l + 1 : i = l;
      f < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, i = s[o - 1]; o-- > 0; )
    s[o] = i, i = t[i];
  return s;
}
function ji(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ji(t);
}
function zr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Pi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Pi(t.subTree) : null;
}
const Ni = (e) => e.__isSuspense;
function Gl(e, t) {
  t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : nl(e);
}
const ee = /* @__PURE__ */ Symbol.for("v-fgt"), cn = /* @__PURE__ */ Symbol.for("v-txt"), Re = /* @__PURE__ */ Symbol.for("v-cmt"), js = /* @__PURE__ */ Symbol.for("v-stc"), cs = [];
let Ie = null;
function k(e = !1) {
  cs.push(Ie = e ? null : []);
}
function Yl() {
  cs.pop(), Ie = cs[cs.length - 1] || null;
}
let hs = 1;
function Ws(e, t = !1) {
  hs += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function Di(e) {
  return e.dynamicChildren = hs > 0 ? Ie || Bt : null, Yl(), hs > 0 && Ie && Ie.push(e), e;
}
function C(e, t, s, n, r, o) {
  return Di(
    a(
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
function Hn(e, t, s, n, r) {
  return Di(
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
function Js(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Fi = ({ key: e }) => e ?? null, Ps = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? me(e) || /* @__PURE__ */ Ce(e) || K(e) ? { i: ze, r: e, k: t, f: !!s } : e : null);
function a(e, t = null, s = null, n = 0, r = null, o = e === ee ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fi(t),
    ref: t && Ps(t),
    scopeId: ai,
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
    ctx: ze
  };
  return l ? (gr(c, s), o & 128 && e.normalize(c)) : s && (c.shapeFlag |= me(s) ? 8 : 16), hs > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ie.push(c), c;
}
const ve = Xl;
function Xl(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === kl) && (e = Re), Js(e)) {
    const l = _t(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && gr(l, s), hs > 0 && !o && Ie && (l.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = l : Ie.push(l)), l.patchFlag = -2, l;
  }
  if (ac(e) && (e = e.__vccOpts), t) {
    t = Zl(t);
    let { class: l, style: c } = t;
    l && !me(l) && (t.class = ie(l)), re(c) && (/* @__PURE__ */ fr(c) && !z(c) && (c = he({}, c)), t.style = rt(c));
  }
  const i = me(e) ? 1 : Ni(e) ? 128 : di(e) ? 64 : re(e) ? 4 : K(e) ? 2 : 0;
  return a(
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
function Zl(e) {
  return e ? /* @__PURE__ */ fr(e) || Ei(e) ? he({}, e) : e : null;
}
function _t(e, t, s = !1, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e, f = t ? Ql(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Fi(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? z(o) ? o.concat(Ps(t)) : [o, Ps(t)] : Ps(t)
    ) : o,
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
    patchFlag: t && e.type !== ee ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && _t(e.ssContent),
    ssFallback: e.ssFallback && _t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && ps(
    d,
    c.clone(d)
  ), d;
}
function Ee(e = " ", t = 0) {
  return ve(cn, null, e, t);
}
function lt(e, t) {
  const s = ve(js, null, e);
  return s.staticCount = t, s;
}
function ae(e = "", t = !1) {
  return t ? (k(), Hn(Re, null, e)) : ve(Re, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean" ? ve(Re) : z(e) ? ve(
    ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Js(e) ? dt(e) : ve(cn, null, String(e));
}
function dt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : _t(e);
}
function gr(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (z(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), gr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !Ei(t) ? t._ctx = ze : r === 3 && ze && (ze.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else K(t) ? (t = { default: t, _ctx: ze }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ee(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Ql(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = ie([t.class, n.class]));
      else if (r === "style")
        t.style = rt([t.style, n.style]);
      else if (Zs(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(z(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Qe(e, t, s, n = null) {
  We(e, t, 7, [
    s,
    n
  ]);
}
const ec = _i();
let tc = 0;
function sc(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || ec, o = {
    uid: tc++,
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
    scope: new Ea(
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
    propsOptions: Ri(n, r),
    emitsOptions: wi(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: le,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: le,
    data: le,
    props: le,
    attrs: le,
    slots: le,
    refs: le,
    setupState: le,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = jl.bind(null, o), e.ce && e.ce(o), o;
}
let Ae = null;
const Ii = () => Ae || ze;
let Gs, Vn;
{
  const e = tn(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Gs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ae = s
  ), Vn = t(
    "__VUE_SSR_SETTERS__",
    (s) => ms = s
  );
}
const xs = (e) => {
  const t = Ae;
  return Gs(e), e.scope.on(), () => {
    e.scope.off(), Gs(t);
  };
}, Hr = () => {
  Ae && Ae.scope.off(), Gs(null);
};
function Li(e) {
  return e.vnode.shapeFlag & 4;
}
let ms = !1;
function nc(e, t = !1, s = !1) {
  t && Vn(t);
  const { props: n, children: r } = e.vnode, o = Li(e);
  Ll(e, n, o, t), Hl(e, r, s || t);
  const i = o ? rc(e, t) : void 0;
  return t && Vn(!1), i;
}
function rc(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Cl);
  const { setup: n } = s;
  if (n) {
    pt();
    const r = e.setupContext = n.length > 1 ? ic(e) : null, o = xs(e), i = vs(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = jo(i);
    if (ht(), o(), (l || e.sp) && !as(e) && gi(e), l) {
      if (i.then(Hr, Hr), t)
        return i.then((c) => {
          Vr(e, c);
        }).catch((c) => {
          nn(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Vr(e, i);
  } else
    Ui(e);
}
function Vr(e, t, s) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = si(t)), Ui(e);
}
function Ui(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || nt);
  {
    const r = xs(e);
    pt();
    try {
      Sl(e);
    } finally {
      ht(), r();
    }
  }
}
const oc = {
  get(e, t) {
    return _e(e, "get", ""), e[t];
  }
};
function ic(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, oc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function dn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(si(Wa(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in ls)
        return ls[s](e);
    },
    has(t, s) {
      return s in t || s in ls;
    }
  })) : e.proxy;
}
function ac(e) {
  return K(e) && "__vccOpts" in e;
}
const ge = (e, t) => /* @__PURE__ */ Za(e, t, ms);
function lc(e, t, s) {
  try {
    Ws(-1);
    const n = arguments.length;
    return n === 2 ? re(t) && !z(t) ? Js(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Js(s) && (s = [s]), ve(e, t, s));
  } finally {
    Ws(1);
  }
}
const cc = "3.5.28";
let qn;
const qr = typeof window < "u" && window.trustedTypes;
if (qr)
  try {
    qn = /* @__PURE__ */ qr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Bi = qn ? (e) => qn.createHTML(e) : (e) => e, dc = "http://www.w3.org/2000/svg", fc = "http://www.w3.org/1998/Math/MathML", ct = typeof document < "u" ? document : null, Kr = ct && /* @__PURE__ */ ct.createElement("template"), uc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? ct.createElementNS(dc, e) : t === "mathml" ? ct.createElementNS(fc, e) : s ? ct.createElement(e, { is: s }) : ct.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => ct.createTextNode(e),
  createComment: (e) => ct.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ct.querySelector(e),
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
      Kr.innerHTML = Bi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Kr.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, bt = "transition", Qt = "animation", gs = /* @__PURE__ */ Symbol("_vtc"), zi = {
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
}, pc = /* @__PURE__ */ he(
  {},
  fi,
  zi
), hc = (e) => (e.displayName = "Transition", e.props = pc, e), Kn = /* @__PURE__ */ hc(
  (e, { slots: t }) => lc(fl, mc(e), t)
), Et = (e, t = []) => {
  z(e) ? e.forEach((s) => s(...t)) : e && e(...t);
}, Wr = (e) => e ? z(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function mc(e) {
  const t = {};
  for (const I in e)
    I in zi || (t[I] = e[I]);
  if (e.css === !1)
    return t;
  const {
    name: s = "v",
    type: n,
    duration: r,
    enterFromClass: o = `${s}-enter-from`,
    enterActiveClass: i = `${s}-enter-active`,
    enterToClass: l = `${s}-enter-to`,
    appearFromClass: c = o,
    appearActiveClass: f = i,
    appearToClass: d = l,
    leaveFromClass: h = `${s}-leave-from`,
    leaveActiveClass: x = `${s}-leave-active`,
    leaveToClass: y = `${s}-leave-to`
  } = e, g = gc(r), b = g && g[0], p = g && g[1], {
    onBeforeEnter: w,
    onEnter: N,
    onEnterCancelled: L,
    onLeave: $,
    onLeaveCancelled: E,
    onBeforeAppear: j = w,
    onAppear: J = N,
    onAppearCancelled: W = L
  } = t, U = (I, ne, pe, Le) => {
    I._enterCancelled = Le, Tt(I, ne ? d : l), Tt(I, ne ? f : i), pe && pe();
  }, X = (I, ne) => {
    I._isLeaving = !1, Tt(I, h), Tt(I, y), Tt(I, x), ne && ne();
  }, ce = (I) => (ne, pe) => {
    const Le = I ? J : N, Z = () => U(ne, I, pe);
    Et(Le, [ne, Z]), Jr(() => {
      Tt(ne, I ? c : o), at(ne, I ? d : l), Wr(Le) || Gr(ne, n, b, Z);
    });
  };
  return he(t, {
    onBeforeEnter(I) {
      Et(w, [I]), at(I, o), at(I, i);
    },
    onBeforeAppear(I) {
      Et(j, [I]), at(I, c), at(I, f);
    },
    onEnter: ce(!1),
    onAppear: ce(!0),
    onLeave(I, ne) {
      I._isLeaving = !0;
      const pe = () => X(I, ne);
      at(I, h), I._enterCancelled ? (at(I, x), Zr(I)) : (Zr(I), at(I, x)), Jr(() => {
        I._isLeaving && (Tt(I, h), at(I, y), Wr($) || Gr(I, n, p, pe));
      }), Et($, [I, pe]);
    },
    onEnterCancelled(I) {
      U(I, !1, void 0, !0), Et(L, [I]);
    },
    onAppearCancelled(I) {
      U(I, !0, void 0, !0), Et(W, [I]);
    },
    onLeaveCancelled(I) {
      X(I), Et(E, [I]);
    }
  });
}
function gc(e) {
  if (e == null)
    return null;
  if (re(e))
    return [Sn(e.enter), Sn(e.leave)];
  {
    const t = Sn(e);
    return [t, t];
  }
}
function Sn(e) {
  return Mn(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)), (e[gs] || (e[gs] = /* @__PURE__ */ new Set())).add(t);
}
function Tt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const s = e[gs];
  s && (s.delete(t), s.size || (e[gs] = void 0));
}
function Jr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let bc = 0;
function Gr(e, t, s, n) {
  const r = e._endId = ++bc, o = () => {
    r === e._endId && n();
  };
  if (s != null)
    return setTimeout(o, s);
  const { type: i, timeout: l, propCount: c } = vc(e, t);
  if (!i)
    return n();
  const f = i + "end";
  let d = 0;
  const h = () => {
    e.removeEventListener(f, x), o();
  }, x = (y) => {
    y.target === e && ++d >= c && h();
  };
  setTimeout(() => {
    d < c && h();
  }, l + 1), e.addEventListener(f, x);
}
function vc(e, t) {
  const s = window.getComputedStyle(e), n = (g) => (s[g] || "").split(", "), r = n(`${bt}Delay`), o = n(`${bt}Duration`), i = Yr(r, o), l = n(`${Qt}Delay`), c = n(`${Qt}Duration`), f = Yr(l, c);
  let d = null, h = 0, x = 0;
  t === bt ? i > 0 && (d = bt, h = i, x = o.length) : t === Qt ? f > 0 && (d = Qt, h = f, x = c.length) : (h = Math.max(i, f), d = h > 0 ? i > f ? bt : Qt : null, x = d ? d === bt ? o.length : c.length : 0);
  const y = d === bt && /\b(?:transform|all)(?:,|$)/.test(
    n(`${bt}Property`).toString()
  );
  return {
    type: d,
    timeout: h,
    propCount: x,
    hasTransform: y
  };
}
function Yr(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((s, n) => Xr(s) + Xr(e[n])));
}
function Xr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Zr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function xc(e, t, s) {
  const n = e[gs];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Qr = /* @__PURE__ */ Symbol("_vod"), yc = /* @__PURE__ */ Symbol("_vsh"), _c = /* @__PURE__ */ Symbol(""), wc = /(?:^|;)\s*display\s*:/;
function kc(e, t, s) {
  const n = e.style, r = me(s);
  let o = !1;
  if (s && !r) {
    if (t)
      if (me(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          s[l] == null && Ns(n, l, "");
        }
      else
        for (const i in t)
          s[i] == null && Ns(n, i, "");
    for (const i in s)
      i === "display" && (o = !0), Ns(n, i, s[i]);
  } else if (r) {
    if (t !== s) {
      const i = n[_c];
      i && (s += ";" + i), n.cssText = s, o = wc.test(s);
    }
  } else t && e.removeAttribute("style");
  Qr in e && (e[Qr] = o ? n.display : "", e[yc] && (n.display = "none"));
}
const eo = /\s*!important$/;
function Ns(e, t, s) {
  if (z(s))
    s.forEach((n) => Ns(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Cc(e, t);
    eo.test(s) ? e.setProperty(
      Fe(n),
      s.replace(eo, ""),
      "important"
    ) : e[n] = s;
  }
}
const to = ["Webkit", "Moz", "ms"], En = {};
function Cc(e, t) {
  const s = En[t];
  if (s)
    return s;
  let n = Ve(t);
  if (n !== "filter" && n in e)
    return En[t] = n;
  n = No(n);
  for (let r = 0; r < to.length; r++) {
    const o = to[r] + n;
    if (o in e)
      return En[t] = o;
  }
  return t;
}
const so = "http://www.w3.org/1999/xlink";
function no(e, t, s, n, r, o = Ca(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(so, t.slice(6, t.length)) : e.setAttributeNS(so, t, s) : s == null || o && !Fo(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : ot(s) ? String(s) : s
  );
}
function ro(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Bi(s) : s);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = Fo(s) : s == null && l === "string" ? (s = "", i = !0) : l === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Ut(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Sc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const oo = /* @__PURE__ */ Symbol("_vei");
function Ec(e, t, s, n, r = null) {
  const o = e[oo] || (e[oo] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [l, c] = Tc(t);
    if (n) {
      const f = o[t] = Oc(
        n,
        r
      );
      Ut(e, l, f, c);
    } else i && (Sc(e, l, i, c), o[t] = void 0);
  }
}
const io = /(?:Once|Passive|Capture)$/;
function Tc(e) {
  let t;
  if (io.test(e)) {
    t = {};
    let n;
    for (; n = e.match(io); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Fe(e.slice(2)), t];
}
let Tn = 0;
const Rc = /* @__PURE__ */ Promise.resolve(), Ac = () => Tn || (Rc.then(() => Tn = 0), Tn = Date.now());
function Oc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    We(
      $c(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Ac(), s;
}
function $c(e, t) {
  if (z(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Mc = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? xc(e, n, i) : t === "style" ? kc(e, s, n) : Zs(t) ? Qn(t) || Ec(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : jc(e, t, n, i)) ? (ro(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && no(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !me(n)) ? ro(e, Ve(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), no(e, t, n, i));
};
function jc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ao(t) && K(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return ao(t) && me(s) ? !1 : t in e;
}
const lo = {};
// @__NO_SIDE_EFFECTS__
function wt(e, t, s) {
  let n = /* @__PURE__ */ ul(e, t);
  Qs(n) && (n = he({}, n, t));
  class r extends br {
    constructor(i) {
      super(n, i, s);
    }
  }
  return r.def = n, r;
}
const Pc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class br extends Pc {
  constructor(t, s = {}, n = ho) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== ho ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      he({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof br) {
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
    this._connected = !1, Bs(() => {
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
      let l;
      if (o && !z(o))
        for (const c in o) {
          const f = o[c];
          (f === Number || f && f.type === Number) && (c in this._props && (this._props[c] = Mn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[Ve(c)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(i), this._mount(n);
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
        se(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => ti(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = z(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(Ve))
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
    let n = s ? this.getAttribute(t) : lo;
    const r = Ve(t);
    s && this._numberProps && this._numberProps[r] && (n = Mn(n)), this._setProp(r, n, !1, !0);
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
    if (s !== this._props[t] && (this._dirty = !0, s === lo ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Fe(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Fe(t), s + "") : s || this.removeAttribute(Fe(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Uc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = ve(this._def, he(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            Qs(i[0]) ? he({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      n.emit = (o, ...i) => {
        r(o, i), Fe(o) !== o && r(Fe(o), i);
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
      const r = t[n], o = r.getAttribute("name") || "default", i = this._slots[o], l = r.parentNode;
      if (i)
        for (const c of i) {
          if (s && c.nodeType === 1) {
            const f = s + "-s", d = document.createTreeWalker(c, 1);
            c.setAttribute(f, "");
            let h;
            for (; h = d.nextNode(); )
              h.setAttribute(f, "");
          }
          l.insertBefore(c, r);
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
const co = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return z(t) ? (s) => $s(t, s) : t;
};
function Nc(e) {
  e.target.composing = !0;
}
function fo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Rn = /* @__PURE__ */ Symbol("_assign");
function uo(e, t, s) {
  return t && (e = e.trim()), s && (e = sr(e)), e;
}
const Ys = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, r) {
    e[Rn] = co(r);
    const o = n || r.props && r.props.type === "number";
    Ut(e, t ? "change" : "input", (i) => {
      i.target.composing || e[Rn](uo(e.value, s, o));
    }), (s || o) && Ut(e, "change", () => {
      e.value = uo(e.value, s, o);
    }), t || (Ut(e, "compositionstart", Nc), Ut(e, "compositionend", fo), Ut(e, "change", fo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: r, number: o } }, i) {
    if (e[Rn] = co(i), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? sr(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || r && e.value.trim() === c) || (e.value = c));
  }
}, Dc = ["ctrl", "shift", "alt", "meta"], Fc = {
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
  exact: (e, t) => Dc.some((s) => e[`${s}Key`] && !t.includes(s))
}, Wn = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = Fc[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Ic = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Hi = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = ((r) => {
    if (!("key" in r))
      return;
    const o = Fe(r.key);
    if (t.some(
      (i) => i === o || Ic[i] === o
    ))
      return e(r);
  }));
}, Lc = /* @__PURE__ */ he({ patchProp: Mc }, uc);
let po;
function Vi() {
  return po || (po = ql(Lc));
}
const Uc = ((...e) => {
  Vi().render(...e);
}), ho = ((...e) => {
  const t = Vi().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = zc(n);
    if (!r) return;
    const o = t._component;
    !K(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = s(r, !1, Bc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Bc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function zc(e) {
  return me(e) ? document.querySelector(e) : e;
}
const Hc = ".gallery-card[data-v-17be2fa0]{background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 10px 30px -10px #00000014;border:1px solid #f0f2f5;transition:all .3s cubic-bezier(.2,0,0,1);height:100%;display:flex;flex-direction:column;position:relative}.gallery-card[data-v-17be2fa0]:hover{transform:translateY(-4px);box-shadow:0 20px 40px -12px #4158d033;border-color:transparent}.card-cover[data-v-17be2fa0]{height:110px;position:relative;flex-shrink:0}.card-avatar[data-v-17be2fa0]{width:100px;height:100px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:2.2rem;color:#fff;position:absolute;bottom:-45px;left:5px;border:4px solid white;box-shadow:0 8px 20px #0000001a;background:linear-gradient(135deg,#4158d0,#c850c0);text-shadow:0 2px 4px rgba(0,0,0,.1);z-index:2}.card-content[data-v-17be2fa0]{padding:3rem 1.5rem 1.25rem;flex:1;display:flex;flex-direction:column;gap:1.25rem}.card-header[data-v-17be2fa0]{display:flex;align-items:flex-start;justify-content:space-between;flex-shrink:0}.card-name[data-v-17be2fa0]{font-weight:600;font-size:1.2rem;color:#1e293b;margin:0 0 .25rem;letter-spacing:-.01em}.card-meta[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;color:#64748b;font-size:.85rem}.dot[data-v-17be2fa0]{color:#cbd5e1}.match-pill[data-v-17be2fa0]{background:linear-gradient(135deg,#4158d0,#c850c0);padding:.35rem .75rem;border-radius:40px;color:#fff;font-weight:600;font-size:1.1rem;line-height:1;box-shadow:0 4px 10px #4158d033;flex-shrink:0}.match-symbol[data-v-17be2fa0]{font-size:.7rem;opacity:.9;margin-left:1px}.stats-minimal[data-v-17be2fa0]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;margin-bottom:.75rem;border-bottom:1px dashed #e2e8f0}.stat-minimal[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;flex:1}.stat-minimal-emoji[data-v-17be2fa0]{font-size:1.2rem;opacity:.7}.stat-minimal-text[data-v-17be2fa0]{display:flex;flex-direction:column}.stat-minimal-value[data-v-17be2fa0]{font-weight:500;font-size:.9rem;color:#1e293b;line-height:1.2}.stat-minimal-label[data-v-17be2fa0]{font-size:.6rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.02em}.stat-minimal-divider[data-v-17be2fa0]{width:1px;height:30px;background:linear-gradient(to bottom,transparent,#e2e8f0,transparent);margin:0 .5rem}.section-header[data-v-17be2fa0]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}.section-title[data-v-17be2fa0]{display:flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.03em}.slot-count[data-v-17be2fa0],.course-count[data-v-17be2fa0]{font-size:.7rem;color:#4158d0;background:#f0f2ff;padding:.2rem .6rem;border-radius:30px;font-weight:500}.schedule-availability[data-v-17be2fa0],.shared-courses[data-v-17be2fa0]{flex-shrink:0}.schedule-slots[data-v-17be2fa0],.course-list[data-v-17be2fa0]{display:flex;flex-wrap:wrap;gap:.5rem;min-height:36px}.slot-chip[data-v-17be2fa0]{background:#f8fafc;padding:.4rem .75rem;border-radius:30px;font-size:.75rem;display:inline-flex;align-items:center;gap:.4rem;border:1px solid #eef2f6;transition:all .2s;cursor:help}.slot-chip[data-v-17be2fa0]:hover{background:#f0f2ff;border-color:#4158d0}.slot-day[data-v-17be2fa0]{font-weight:600;color:#1e293b}.slot-time[data-v-17be2fa0]{color:#64748b}.slot-chip.more[data-v-17be2fa0]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.slot-chip.more[data-v-17be2fa0]:hover{background:transparent;border-color:#cbd5e1}.course-chip[data-v-17be2fa0]{background:#f8fafc;padding:.4rem .9rem;border-radius:30px;font-size:.75rem;color:#475569;border:1px solid #eef2f6;transition:all .2s;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.course-chip[data-v-17be2fa0]:hover{border-color:#c850c0;color:#c850c0;background:#fdf2f8}.course-chip.more[data-v-17be2fa0]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8;cursor:default}.course-chip.more[data-v-17be2fa0]:hover{background:transparent;border-color:#cbd5e1;color:#94a3b8}.empty-state[data-v-17be2fa0]{display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:30px;padding:.5rem 1rem;min-height:36px}.empty-text[data-v-17be2fa0]{font-size:.75rem;color:#94a3b8}.card-actions[data-v-17be2fa0]{display:flex;gap:.5rem;margin-top:auto;padding-top:.5rem;flex-shrink:0}.btn-profile[data-v-17be2fa0]{flex:2;padding:.7rem;border:none;border-radius:40px;font-weight:500;font-size:.8rem;background:linear-gradient(135deg,#4158d0,#c850c0);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;box-shadow:0 6px 14px #4158d033;transition:all .2s}.btn-profile[data-v-17be2fa0]:hover{transform:translateY(-2px);box-shadow:0 10px 20px #4158d04d}.btn-icon[data-v-17be2fa0]{width:42px;height:42px;border-radius:50%;border:none;background:#fff;color:#64748b;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px #0000000d;border:1px solid #e2e8f0;transition:all .2s;flex-shrink:0}.btn-icon[data-v-17be2fa0]:hover{transform:translateY(-2px)}.btn-icon.invite[data-v-17be2fa0]:hover{background:#4158d0;color:#fff;border-color:#4158d0}.btn-icon.message[data-v-17be2fa0]:hover{background:#c850c0;color:#fff;border-color:#c850c0}@media(max-width:768px){.gallery-card.list-view[data-v-17be2fa0]{flex-direction:column;min-height:auto}.list-view .card-cover[data-v-17be2fa0]{width:100%;height:100px;border-radius:24px 24px 0 0}.list-view .card-avatar[data-v-17be2fa0]{width:80px;height:80px;font-size:2rem;left:50%;transform:translate(-50%);top:auto;bottom:-40px;margin-top:0}.list-view .card-content[data-v-17be2fa0]{padding:3rem 1.25rem 1.25rem}.list-details-row[data-v-17be2fa0]{flex-direction:column;gap:1rem}}@media(max-width:640px){.card-avatar[data-v-17be2fa0]{width:80px;height:80px;font-size:2rem;bottom:-40px;left:50%;transform:translate(-50%)}.card-content[data-v-17be2fa0]{padding:2.8rem 1.25rem 1.25rem}.card-name[data-v-17be2fa0]{font-size:1.1rem}.stat-minimal-emoji[data-v-17be2fa0]{font-size:1rem}.stat-minimal-value[data-v-17be2fa0]{font-size:.85rem}.btn-icon[data-v-17be2fa0]{width:38px;height:38px;font-size:1rem}.list-view .card-avatar[data-v-17be2fa0]{width:70px;height:70px;font-size:1.8rem;bottom:-35px}}", kt = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, Vc = { class: "gallery-card" }, qc = { class: "card-avatar" }, Kc = { class: "card-content" }, Wc = { class: "card-header" }, Jc = { class: "card-name" }, Gc = { class: "card-meta" }, Yc = { class: "match-pill" }, Xc = { class: "match-value" }, Zc = { class: "stat-minimal" }, Qc = { class: "stat-minimal-text" }, ed = { class: "stat-minimal-value" }, td = {
  key: 0,
  class: "stat-minimal-divider"
}, sd = { class: "stat-minimal" }, nd = { class: "stat-minimal-text" }, rd = { class: "stat-minimal-value" }, od = {
  key: 1,
  class: "stat-minimal-divider"
}, id = { class: "stat-minimal" }, ad = { class: "stat-minimal-text" }, ld = { class: "stat-minimal-value" }, cd = {
  key: 0,
  class: "list-details-row"
}, dd = { class: "schedule-availability list-compact" }, fd = { class: "section-header list-header" }, ud = {
  key: 0,
  class: "slot-count"
}, pd = {
  key: 0,
  class: "schedule-slots list-slots"
}, hd = ["title"], md = { class: "slot-day" }, gd = { class: "slot-time" }, bd = {
  key: 0,
  class: "slot-chip more list-chip"
}, vd = {
  key: 1,
  class: "empty-state list-empty"
}, xd = { class: "shared-courses list-compact" }, yd = { class: "section-header list-header" }, _d = {
  key: 0,
  class: "course-count"
}, wd = {
  key: 0,
  class: "course-list list-courses"
}, kd = {
  key: 0,
  class: "course-chip more list-chip"
}, Cd = {
  key: 1,
  class: "empty-state list-empty"
}, Sd = { class: "schedule-availability" }, Ed = { class: "section-header" }, Td = {
  key: 0,
  class: "slot-count"
}, Rd = {
  key: 0,
  class: "schedule-slots"
}, Ad = ["title"], Od = { class: "slot-day" }, $d = { class: "slot-time" }, Md = {
  key: 0,
  class: "slot-chip more"
}, jd = {
  key: 1,
  class: "empty-state"
}, Pd = { class: "shared-courses" }, Nd = { class: "section-header" }, Dd = {
  key: 0,
  class: "course-count"
}, Fd = {
  key: 0,
  class: "course-list"
}, Id = {
  key: 0,
  class: "course-chip more"
}, Ld = {
  key: 1,
  class: "empty-state"
}, Ud = {
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
    const s = e, n = os("viewMode", null), r = ge(
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
    }), l = ge(() => {
      if (Array.isArray(s.timeSlots)) return s.timeSlots;
      try {
        return s.timeSlots ? JSON.parse(s.timeSlots) : [];
      } catch {
        return [];
      }
    }), c = ge(() => (o.value.username || "??").charAt(0).toUpperCase()), f = ge(() => {
      const b = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], p = (o.value.username?.length || 0) % b.length;
      return { background: b[p] };
    }), d = ge(() => l.value.length > 0), h = (b) => {
      if (!b) return "";
      const [p, w] = b.split(":"), N = parseInt(p), L = N >= 12 ? "pm" : "am";
      return `${N % 12 || 12}${w !== "00" ? `:${w}` : ""}${L}`;
    }, x = ge(() => l.value.slice(0, 3).map((b) => ({
      dayShort: b.day?.substring(0, 3) || "Any",
      timeRange: b.start_time ? `${h(b.start_time)}-${h(b.end_time)}` : "Flexible",
      tooltip: `${b.day || "Any day"}: ${b.start_time || "Flexible"} - ${b.end_time || "Flexible"}`
    }))), y = ge(() => {
      if (l.value.length === 0) return "flexible";
      const b = l.value[0];
      if (!b.start_time) return "flexible";
      const p = parseInt(b.start_time.split(":")[0]);
      return p < 12 ? "morning" : p < 17 ? "afternoon" : "evening";
    }), g = () => {
      window.location.href = `/profile/${o.value.id}/`;
    };
    return (b, p) => (k(), C("div", Vc, [
      a("div", {
        class: "card-cover",
        style: rt(f.value)
      }, [
        a("div", qc, A(c.value), 1)
      ], 4),
      a("div", Kc, [
        a("div", Wc, [
          a("div", null, [
            a("h3", Jc, A(o.value.username), 1),
            a("div", Gc, [
              a("span", null, A(o.value.major), 1),
              p[2] || (p[2] = a("span", { class: "dot" }, "•", -1)),
              a("span", null, "Year " + A(o.value.year), 1)
            ])
          ]),
          a("div", Yc, [
            a("span", Xc, A(e.matchPercent), 1),
            p[3] || (p[3] = a("span", { class: "match-symbol" }, "%", -1))
          ])
        ]),
        a("div", {
          class: ie(["stats-minimal", { "list-stats": r.value }])
        }, [
          a("div", Zc, [
            p[5] || (p[5] = a("span", { class: "stat-minimal-emoji" }, "📚", -1)),
            a("span", Qc, [
              a("span", ed, A(i.value.length), 1),
              p[4] || (p[4] = a("span", { class: "stat-minimal-label" }, "courses", -1))
            ])
          ]),
          r.value ? ae("", !0) : (k(), C("div", td)),
          a("div", sd, [
            p[7] || (p[7] = a("span", { class: "stat-minimal-emoji" }, "⏰", -1)),
            a("span", nd, [
              a("span", rd, A(e.overlapHours) + "h", 1),
              p[6] || (p[6] = a("span", { class: "stat-minimal-label" }, "overlap", -1))
            ])
          ]),
          r.value ? ae("", !0) : (k(), C("div", od)),
          a("div", id, [
            p[9] || (p[9] = a("span", { class: "stat-minimal-emoji" }, [
              a("i", { class: "fa-solid fa-clock" })
            ], -1)),
            a("span", ad, [
              a("span", ld, A(y.value), 1),
              p[8] || (p[8] = a("span", { class: "stat-minimal-label" }, "pref", -1))
            ])
          ])
        ], 2),
        r.value ? (k(), C("div", cd, [
          a("div", dd, [
            a("div", fd, [
              p[10] || (p[10] = a("div", { class: "section-title" }, [
                a("span", null, "📅"),
                a("span", null, "Schedule")
              ], -1)),
              d.value ? (k(), C("span", ud, A(l.value.length), 1)) : ae("", !0)
            ]),
            d.value ? (k(), C("div", pd, [
              (k(!0), C(ee, null, ke(x.value.slice(0, 2), (w, N) => (k(), C("div", {
                key: N,
                class: "slot-chip list-chip",
                title: w.tooltip
              }, [
                a("span", md, A(w.dayShort), 1),
                a("span", gd, A(w.timeRange), 1)
              ], 8, hd))), 128)),
              l.value.length > 2 ? (k(), C("div", bd, " +" + A(l.value.length - 2), 1)) : ae("", !0)
            ])) : (k(), C("div", vd, [...p[11] || (p[11] = [
              a("span", { class: "empty-text" }, "No availability", -1)
            ])]))
          ]),
          a("div", xd, [
            a("div", yd, [
              p[12] || (p[12] = a("div", { class: "section-title" }, [
                a("span", null, "🏷️"),
                a("span", null, "Courses")
              ], -1)),
              i.value.length > 0 ? (k(), C("span", _d, A(i.value.length), 1)) : ae("", !0)
            ]),
            i.value.length > 0 ? (k(), C("div", wd, [
              (k(!0), C(ee, null, ke(i.value.slice(0, 2), (w) => (k(), C("span", {
                key: w,
                class: "course-chip list-chip"
              }, A(w), 1))), 128)),
              i.value.length > 2 ? (k(), C("span", kd, " +" + A(i.value.length - 2), 1)) : ae("", !0)
            ])) : (k(), C("div", Cd, [...p[13] || (p[13] = [
              a("span", { class: "empty-text" }, "No courses", -1)
            ])]))
          ])
        ])) : ae("", !0),
        r.value ? ae("", !0) : (k(), C(ee, { key: 1 }, [
          a("div", Sd, [
            a("div", Ed, [
              p[14] || (p[14] = a("div", { class: "section-title" }, [
                a("span", null, "📅"),
                a("span", null, "Schedule match")
              ], -1)),
              d.value ? (k(), C("span", Td, A(l.value.length) + " slots", 1)) : ae("", !0)
            ]),
            d.value ? (k(), C("div", Rd, [
              (k(!0), C(ee, null, ke(x.value, (w, N) => (k(), C("div", {
                key: N,
                class: "slot-chip",
                title: w.tooltip
              }, [
                a("span", Od, A(w.dayShort), 1),
                a("span", $d, A(w.timeRange), 1)
              ], 8, Ad))), 128)),
              l.value.length > 3 ? (k(), C("div", Md, " +" + A(l.value.length - 3), 1)) : ae("", !0)
            ])) : (k(), C("div", jd, [...p[15] || (p[15] = [
              a("span", { class: "empty-text" }, "No common availability", -1)
            ])]))
          ]),
          a("div", Pd, [
            a("div", Nd, [
              p[16] || (p[16] = a("div", { class: "section-title" }, [
                a("span", null, "🏷️"),
                a("span", null, "Courses in common")
              ], -1)),
              i.value.length > 0 ? (k(), C("span", Dd, A(i.value.length) + " total ", 1)) : ae("", !0)
            ]),
            i.value.length > 0 ? (k(), C("div", Fd, [
              (k(!0), C(ee, null, ke(i.value.slice(0, 3), (w) => (k(), C("span", {
                key: w,
                class: "course-chip"
              }, A(w), 1))), 128)),
              i.value.length > 3 ? (k(), C("span", Id, " +" + A(i.value.length - 3), 1)) : ae("", !0)
            ])) : (k(), C("div", Ld, [...p[17] || (p[17] = [
              a("span", { class: "empty-text" }, "No shared courses", -1)
            ])]))
          ])
        ], 64)),
        a("div", {
          class: ie(["card-actions", { "list-actions": r.value }])
        }, [
          a("button", {
            class: "btn-profile",
            onClick: g
          }, [...p[18] || (p[18] = [
            a("span", null, "👤", -1),
            a("span", null, "View Profile", -1)
          ])]),
          a("button", {
            class: "btn-icon invite",
            onClick: p[0] || (p[0] = () => {
            }),
            title: "Invite to study group"
          }, [...p[19] || (p[19] = [
            a("span", null, "🤝", -1)
          ])]),
          a("button", {
            class: "btn-icon message",
            onClick: p[1] || (p[1] = () => {
            }),
            title: "Send message"
          }, [...p[20] || (p[20] = [
            a("span", null, "💬", -1)
          ])])
        ], 2)
      ])
    ]));
  }
}, qi = /* @__PURE__ */ kt(Ud, [["styles", [Hc]], ["__scopeId", "data-v-17be2fa0"]]), Bd = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-ab17189e]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-ab17189e]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-ab17189e]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-ab17189e]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-ab17189e]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-ab17189e]{position:relative;width:52px;height:52px}.avatar-main[data-v-ab17189e]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-ab17189e]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-ab17189e]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-ab17189e]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-ab17189e]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-ab17189e]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-ab17189e]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-ab17189e]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-ab17189e]{color:#4f46e5}.vertical-divider[data-v-ab17189e]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-ab17189e]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-ab17189e]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-ab17189e]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-ab17189e]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-ab17189e]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-ab17189e]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-ab17189e]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-ab17189e]{flex-direction:column}.match-stats[data-v-ab17189e]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-ab17189e]{width:100%;justify-content:center}}', zd = { class: "elegant-item-container" }, Hd = { class: "elegant-content" }, Vd = { class: "identity-block" }, qd = { class: "avatar-container" }, Kd = { class: "name-section" }, Wd = { class: "username" }, Jd = { class: "major" }, Gd = { class: "match-stats" }, Yd = { class: "stat-group" }, Xd = { class: "stat-value highlight" }, Zd = { class: "stat-group" }, Qd = { class: "stat-value" }, ef = { class: "stat-group" }, tf = { class: "stat-value" }, sf = {
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
      const d = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], h = (n.value.username?.length || 0) % d.length;
      return { background: d[h] };
    }), l = () => {
      const d = n.value.username.replace("@", "");
      window.location.href = `/profile/${d}/`;
    }, c = () => {
      const d = n.value.username.replace("@", "");
      window.location.href = `/study-groups/create/?invite=${d}`;
    }, f = () => {
      const d = n.value.username.replace("@", "");
      window.location.href = `/messages/new/?to=${d}`;
    };
    return (d, h) => (k(), C("div", zd, [
      a("div", {
        class: "glow-accent",
        style: rt(i.value)
      }, null, 4),
      a("div", Hd, [
        a("div", Vd, [
          a("div", qd, [
            a("div", {
              class: "avatar-ring",
              style: rt(d.avatarBorder)
            }, null, 4),
            a("div", {
              class: "avatar-main",
              style: rt(i.value)
            }, A(o.value), 5)
          ]),
          a("div", Kd, [
            a("h3", Wd, A(n.value.username), 1),
            a("p", Jd, A(n.value.major), 1)
          ])
        ]),
        a("div", Gd, [
          a("div", Yd, [
            h[1] || (h[1] = a("span", { class: "stat-label" }, "Match", -1)),
            a("span", Xd, [
              Ee(A(e.matchPercent), 1),
              h[0] || (h[0] = a("small", null, "%", -1))
            ])
          ]),
          h[6] || (h[6] = a("div", { class: "vertical-divider" }, null, -1)),
          a("div", Zd, [
            h[3] || (h[3] = a("span", { class: "stat-label" }, "Overlap", -1)),
            a("span", Qd, [
              Ee(A(e.overlapHours), 1),
              h[2] || (h[2] = a("small", null, "h", -1))
            ])
          ]),
          h[7] || (h[7] = a("div", { class: "vertical-divider" }, null, -1)),
          a("div", ef, [
            h[5] || (h[5] = a("span", { class: "stat-label" }, "Shared", -1)),
            a("span", tf, [
              Ee(A(r.value.length), 1),
              h[4] || (h[4] = a("small", null, "📚", -1))
            ])
          ])
        ]),
        a("div", { class: "action-block" }, [
          a("button", {
            class: "action-trigger primary",
            onClick: l
          }, [...h[8] || (h[8] = [
            a("span", null, "View", -1)
          ])]),
          a("button", {
            class: "action-trigger icon",
            onClick: f
          }, [...h[9] || (h[9] = [
            a("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          a("button", {
            class: "action-trigger icon",
            onClick: c
          }, [...h[10] || (h[10] = [
            a("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, Ki = /* @__PURE__ */ kt(sf, [["styles", [Bd]], ["__scopeId", "data-v-ab17189e"]]), nf = ".discovery-container[data-v-f575c718]{max-width:1440px;margin:0 auto;padding:2.5rem 2rem;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.discovery-header[data-v-f575c718]{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.brand-title[data-v-f575c718]{font-size:1.8rem;font-weight:600;color:#1a1e2b;letter-spacing:-.02em;margin:0 0 .25rem}.brand-tagline[data-v-f575c718]{color:#6b7280;font-size:.9rem;font-weight:400;margin:0}.view-toggles[data-v-f575c718]{display:flex;gap:.5rem;background:#fff;padding:.25rem;border-radius:40px;border:1px solid #eef2f6;box-shadow:0 2px 8px #00000005}.toggle-btn[data-v-f575c718]{width:42px;height:42px;border-radius:40px;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.toggle-btn[data-v-f575c718]:hover{color:#4158d0;background:#f5f7ff}.toggle-btn.active[data-v-f575c718]{background:#4158d0;color:#fff;box-shadow:0 4px 10px #4158d033}.toggle-icon[data-v-f575c718]{font-size:1.3rem;line-height:1}.search-section[data-v-f575c718]{margin-bottom:2rem}.search-field[data-v-f575c718]{max-width:500px;position:relative}.search-icon[data-v-f575c718]{position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);font-size:1.1rem;color:#94a3b8;pointer-events:none}.search-input[data-v-f575c718]{width:100%;padding:1rem 1rem 1rem 3.5rem;font-size:.95rem;border:1px solid #eef2f6;border-radius:50px;background:#fff;box-shadow:0 4px 12px #00000005;transition:all .2s ease}.search-input[data-v-f575c718]:focus{outline:none;border-color:#4158d0;box-shadow:0 4px 16px #4158d014}.search-submit[data-v-f575c718]{position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;transition:all .2s}.search-submit[data-v-f575c718]:hover{background:#f1f5f9;color:#4158d0}.filters-bar[data-v-f575c718]{margin-bottom:2.5rem;border-bottom:1px solid #f0f2f5}.filter-tabs[data-v-f575c718]{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.75rem;scrollbar-width:none}.filter-tabs[data-v-f575c718]::-webkit-scrollbar{display:none}.filter-tab[data-v-f575c718]{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.2rem;border:none;background:transparent;color:#6b7280;font-size:.9rem;font-weight:500;cursor:pointer;border-radius:40px;transition:all .2s ease;white-space:nowrap}.filter-tab[data-v-f575c718]:hover{background:#f8fafc;color:#4158d0}.filter-tab.active[data-v-f575c718]{background:#f0f2ff;color:#4158d0}.tab-emoji[data-v-f575c718]{font-size:1.1rem}.tab-badge[data-v-f575c718]{background:#eef2f6;color:#64748b;padding:.15rem .5rem;border-radius:30px;font-size:.7rem;font-weight:500;margin-left:.25rem}.filter-tab.active .tab-badge[data-v-f575c718]{background:#fff;color:#4158d0}.results-section[data-v-f575c718]{min-height:400px}.results-grid[data-v-f575c718]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.results-list[data-v-f575c718]{display:flex;flex-direction:column;gap:1rem}.results-list[data-v-f575c718] .gallery-card{display:flex;flex-direction:row;height:auto}.results-list[data-v-f575c718] .card-cover{width:120px;height:auto;flex-shrink:0}.empty-state[data-v-f575c718]{text-align:center;padding:4rem 2rem;background:#fff;border-radius:32px;border:1px dashed #e2e8f0}.empty-illustration[data-v-f575c718]{font-size:4rem;margin-bottom:1.5rem;opacity:.7}.empty-title[data-v-f575c718]{font-size:1.3rem;font-weight:500;color:#1e293b;margin-bottom:.5rem}.empty-message[data-v-f575c718]{color:#94a3b8;font-size:.95rem;margin-bottom:1.5rem}.empty-reset[data-v-f575c718]{background:none;border:1px solid #e2e8f0;padding:.6rem 1.5rem;border-radius:40px;color:#64748b;font-size:.9rem;cursor:pointer;transition:all .2s}.empty-reset[data-v-f575c718]:hover{border-color:#4158d0;color:#4158d0;background:#f8faff}.fade-enter-active[data-v-f575c718],.fade-leave-active[data-v-f575c718]{transition:opacity .3s ease}.fade-enter-from[data-v-f575c718],.fade-leave-to[data-v-f575c718]{opacity:0}@media(max-width:768px){.discovery-container[data-v-f575c718]{padding:1.5rem 1rem}.discovery-header[data-v-f575c718]{flex-direction:column;align-items:flex-start;gap:1rem}.view-toggles[data-v-f575c718]{align-self:flex-end}.search-field[data-v-f575c718]{max-width:100%}.results-grid[data-v-f575c718]{grid-template-columns:1fr}}@media(max-width:480px){.filter-tab[data-v-f575c718]{padding:.5rem 1rem;font-size:.85rem}.empty-state[data-v-f575c718]{padding:2rem 1rem}}", rf = { class: "discovery-container" }, of = { class: "discovery-header" }, af = { class: "view-toggles" }, lf = { class: "search-section" }, cf = { class: "search-field" }, df = { class: "filters-bar" }, ff = { class: "filter-tabs" }, uf = ["onClick"], pf = { class: "tab-emoji" }, hf = { class: "tab-name" }, mf = {
  key: 0,
  class: "tab-badge"
}, gf = { class: "results-section" }, bf = {
  key: 1,
  class: "empty-state"
}, vf = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, s = /* @__PURE__ */ be("grid"), n = /* @__PURE__ */ be(""), r = /* @__PURE__ */ be("all"), o = ge(() => {
      try {
        const x = JSON.parse(t.topMatches), y = x.reduce((w, N) => N.match_percent > 85 ? w += 1 : w, 0), g = x.reduce((w, N) => N.overlap_hours > 5 ? w += 1 : w, 0), b = JSON.parse(t.sameMajor), p = JSON.parse(t.sameMajor);
        return {
          all: x.length,
          best: y,
          schedule: g,
          major: b.length,
          course: p.length
        };
      } catch (x) {
        console.error(x);
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
    ], l = ge(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), c = ge(() => {
      try {
        return JSON.parse(l.value || "[]");
      } catch {
        return [];
      }
    }), f = ge(() => {
      let x = c.value;
      if (n.value) {
        const y = n.value.toLowerCase();
        x = x.filter(
          (g) => g.profile.username.toLowerCase().includes(y) || g.profile.major.toLowerCase().includes(y) || g.overlap_courses?.some(
            (b) => b.toLowerCase().includes(y)
          )
        );
      }
      switch (r.value) {
        case "high":
          x = x.filter((y) => y.match_percent >= 85);
          break;
        case "schedule":
          x = x.filter((y) => y.overlap_hours >= 5);
          break;
        case "courses":
          x = x.filter((y) => y.overlap_courses?.length >= 2);
          break;
      }
      return x;
    }), d = (x) => {
      console.log(`Connecting with ${x}`);
    }, h = () => {
      n.value = "", r.value = "all";
    };
    return Ms(c, (x) => {
    }), (x, y) => (k(), C("div", rf, [
      a("div", of, [
        y[6] || (y[6] = a("div", { class: "brand" }, [
          a("h1", { class: "brand-title" }, "StudySync"),
          a("p", { class: "brand-tagline" }, "Discover your ideal study partner")
        ], -1)),
        a("div", af, [
          a("button", {
            class: ie(["toggle-btn", { active: s.value === "grid" }]),
            onClick: y[0] || (y[0] = (g) => s.value = "grid"),
            "aria-label": "Grid view"
          }, [...y[4] || (y[4] = [
            a("span", { class: "toggle-icon" }, "⊞", -1)
          ])], 2),
          a("button", {
            class: ie(["toggle-btn", { active: s.value === "list" }]),
            onClick: y[1] || (y[1] = (g) => s.value = "list"),
            "aria-label": "List view"
          }, [...y[5] || (y[5] = [
            a("span", { class: "toggle-icon" }, "≡", -1)
          ])], 2)
        ])
      ]),
      a("div", lf, [
        a("div", cf, [
          y[8] || (y[8] = a("span", { class: "search-icon" }, "🔍", -1)),
          Vs(a("input", {
            "onUpdate:modelValue": y[2] || (y[2] = (g) => n.value = g),
            type: "text",
            placeholder: "Search by name, course, or major...",
            class: "search-input"
          }, null, 512), [
            [Ys, n.value]
          ]),
          n.value ? (k(), C("button", {
            key: 0,
            class: "search-submit",
            onClick: y[3] || (y[3] = (g) => n.value = "")
          }, [...y[7] || (y[7] = [
            a("span", { class: "clear-icon" }, "✕", -1)
          ])])) : ae("", !0)
        ])
      ]),
      a("div", df, [
        a("div", ff, [
          (k(), C(ee, null, ke(i, (g) => a("button", {
            key: g.id,
            class: ie(["filter-tab", { active: r.value === g.id }]),
            onClick: (b) => r.value = g.id
          }, [
            a("span", pf, A(g.icon), 1),
            a("span", hf, A(g.name), 1),
            g.count ? (k(), C("span", mf, A(g.count), 1)) : ae("", !0)
          ], 10, uf)), 64))
        ])
      ]),
      a("div", gf, [
        ve(Kn, {
          name: "fade",
          mode: "out-in"
        }, {
          default: Hs(() => [
            f.value.length > 0 ? (k(), C("div", {
              key: 0,
              class: ie(["results-grid", { "results-list": s.value === "list" }])
            }, [
              s.value === "grid" ? (k(!0), C(ee, { key: 0 }, ke(f.value, (g, b) => (k(), Hn(qi, {
                key: b,
                profile: g.profile,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: d
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (k(!0), C(ee, { key: 1 }, ke(f.value, (g, b) => (k(), Hn(Ki, {
                profile: g.profile,
                key: g.profile.username.substring(0, 2) + b,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: d
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (k(), C("div", bf, [
              y[9] || (y[9] = a("div", { class: "empty-illustration" }, "🔍", -1)),
              y[10] || (y[10] = a("h3", { class: "empty-title" }, "No matches found", -1)),
              y[11] || (y[11] = a("p", { class: "empty-message" }, " Try adjusting your filters or search criteria ", -1)),
              a("button", {
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
}, xf = /* @__PURE__ */ kt(vf, [["styles", [nf]], ["__scopeId", "data-v-f575c718"]]);
function Wi(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: yf } = Object.prototype, { getPrototypeOf: vr } = Object, { iterator: fn, toStringTag: Ji } = Symbol, un = /* @__PURE__ */ ((e) => (t) => {
  const s = yf.call(t);
  return e[s] || (e[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Je = (e) => (e = e.toLowerCase(), (t) => un(t) === e), pn = (e) => (t) => typeof t === e, { isArray: Wt } = Array, Kt = pn("undefined");
function ys(e) {
  return e !== null && !Kt(e) && e.constructor !== null && !Kt(e.constructor) && Pe(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Gi = Je("ArrayBuffer");
function _f(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Gi(e.buffer), t;
}
const wf = pn("string"), Pe = pn("function"), Yi = pn("number"), _s = (e) => e !== null && typeof e == "object", kf = (e) => e === !0 || e === !1, Ds = (e) => {
  if (un(e) !== "object")
    return !1;
  const t = vr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ji in e) && !(fn in e);
}, Cf = (e) => {
  if (!_s(e) || ys(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Sf = Je("Date"), Ef = Je("File"), Tf = Je("Blob"), Rf = Je("FileList"), Af = (e) => _s(e) && Pe(e.pipe), Of = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Pe(e.append) && ((t = un(e)) === "formdata" || // detect form-data instance
  t === "object" && Pe(e.toString) && e.toString() === "[object FormData]"));
}, $f = Je("URLSearchParams"), [Mf, jf, Pf, Nf] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Je), Df = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ws(e, t, { allOwnKeys: s = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, r;
  if (typeof e != "object" && (e = [e]), Wt(e))
    for (n = 0, r = e.length; n < r; n++)
      t.call(null, e[n], n, e);
  else {
    if (ys(e))
      return;
    const o = s ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let l;
    for (n = 0; n < i; n++)
      l = o[n], t.call(null, e[l], l, e);
  }
}
function Xi(e, t) {
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
const Ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Zi = (e) => !Kt(e) && e !== Ot;
function Jn() {
  const { caseless: e, skipUndefined: t } = Zi(this) && this || {}, s = {}, n = (r, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && Xi(s, o) || o;
    Ds(s[i]) && Ds(r) ? s[i] = Jn(s[i], r) : Ds(r) ? s[i] = Jn({}, r) : Wt(r) ? s[i] = r.slice() : (!t || !Kt(r)) && (s[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && ws(arguments[r], n);
  return s;
}
const Ff = (e, t, s, { allOwnKeys: n } = {}) => (ws(
  t,
  (r, o) => {
    s && Pe(r) ? Object.defineProperty(e, o, {
      value: Wi(r, s),
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
), e), If = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Lf = (e, t, s, n) => {
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
}, Uf = (e, t, s, n) => {
  let r, o, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!n || n(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = s !== !1 && vr(e);
  } while (e && (!s || s(e, t)) && e !== Object.prototype);
  return t;
}, Bf = (e, t, s) => {
  e = String(e), (s === void 0 || s > e.length) && (s = e.length), s -= t.length;
  const n = e.indexOf(t, s);
  return n !== -1 && n === s;
}, zf = (e) => {
  if (!e) return null;
  if (Wt(e)) return e;
  let t = e.length;
  if (!Yi(t)) return null;
  const s = new Array(t);
  for (; t-- > 0; )
    s[t] = e[t];
  return s;
}, Hf = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && vr(Uint8Array)), Vf = (e, t) => {
  const n = (e && e[fn]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, qf = (e, t) => {
  let s;
  const n = [];
  for (; (s = e.exec(t)) !== null; )
    n.push(s);
  return n;
}, Kf = Je("HTMLFormElement"), Wf = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(s, n, r) {
  return n.toUpperCase() + r;
}), mo = (({ hasOwnProperty: e }) => (t, s) => e.call(t, s))(Object.prototype), Jf = Je("RegExp"), Qi = (e, t) => {
  const s = Object.getOwnPropertyDescriptors(e), n = {};
  ws(s, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (n[o] = i || r);
  }), Object.defineProperties(e, n);
}, Gf = (e) => {
  Qi(e, (t, s) => {
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
}, Yf = (e, t) => {
  const s = {}, n = (r) => {
    r.forEach((o) => {
      s[o] = !0;
    });
  };
  return Wt(e) ? n(e) : n(String(e).split(t)), s;
}, Xf = () => {
}, Zf = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Qf(e) {
  return !!(e && Pe(e.append) && e[Ji] === "FormData" && e[fn]);
}
const eu = (e) => {
  const t = new Array(10), s = (n, r) => {
    if (_s(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (ys(n))
        return n;
      if (!("toJSON" in n)) {
        t[r] = n;
        const o = Wt(n) ? [] : {};
        return ws(n, (i, l) => {
          const c = s(i, r + 1);
          !Kt(c) && (o[l] = c);
        }), t[r] = void 0, o;
      }
    }
    return n;
  };
  return s(e, 0);
}, tu = Je("AsyncFunction"), su = (e) => e && (_s(e) || Pe(e)) && Pe(e.then) && Pe(e.catch), ea = ((e, t) => e ? setImmediate : t ? ((s, n) => (Ot.addEventListener(
  "message",
  ({ source: r, data: o }) => {
    r === Ot && o === s && n.length && n.shift()();
  },
  !1
), (r) => {
  n.push(r), Ot.postMessage(s, "*");
}))(`axios@${Math.random()}`, []) : (s) => setTimeout(s))(typeof setImmediate == "function", Pe(Ot.postMessage)), nu = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ot) : typeof process < "u" && process.nextTick || ea, ru = (e) => e != null && Pe(e[fn]), v = {
  isArray: Wt,
  isArrayBuffer: Gi,
  isBuffer: ys,
  isFormData: Of,
  isArrayBufferView: _f,
  isString: wf,
  isNumber: Yi,
  isBoolean: kf,
  isObject: _s,
  isPlainObject: Ds,
  isEmptyObject: Cf,
  isReadableStream: Mf,
  isRequest: jf,
  isResponse: Pf,
  isHeaders: Nf,
  isUndefined: Kt,
  isDate: Sf,
  isFile: Ef,
  isBlob: Tf,
  isRegExp: Jf,
  isFunction: Pe,
  isStream: Af,
  isURLSearchParams: $f,
  isTypedArray: Hf,
  isFileList: Rf,
  forEach: ws,
  merge: Jn,
  extend: Ff,
  trim: Df,
  stripBOM: If,
  inherits: Lf,
  toFlatObject: Uf,
  kindOf: un,
  kindOfTest: Je,
  endsWith: Bf,
  toArray: zf,
  forEachEntry: Vf,
  matchAll: qf,
  isHTMLForm: Kf,
  hasOwnProperty: mo,
  hasOwnProp: mo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Qi,
  freezeMethods: Gf,
  toObjectSet: Yf,
  toCamelCase: Wf,
  noop: Xf,
  toFiniteNumber: Zf,
  findKey: Xi,
  global: Ot,
  isContextDefined: Zi,
  isSpecCompliantForm: Qf,
  toJSONObject: eu,
  isAsyncFn: tu,
  isThenable: su,
  setImmediate: ea,
  asap: nu,
  isIterable: ru
};
let V = class ta extends Error {
  static from(t, s, n, r, o, i) {
    const l = new ta(t.message, s || t.code, n, r, o);
    return l.cause = t, l.name = t.name, i && Object.assign(l, i), l;
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
V.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
V.ERR_BAD_OPTION = "ERR_BAD_OPTION";
V.ECONNABORTED = "ECONNABORTED";
V.ETIMEDOUT = "ETIMEDOUT";
V.ERR_NETWORK = "ERR_NETWORK";
V.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
V.ERR_DEPRECATED = "ERR_DEPRECATED";
V.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
V.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
V.ERR_CANCELED = "ERR_CANCELED";
V.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
V.ERR_INVALID_URL = "ERR_INVALID_URL";
const ou = null;
function Gn(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function sa(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function go(e, t, s) {
  return e ? e.concat(t).map(function(r, o) {
    return r = sa(r), !s && o ? "[" + r + "]" : r;
  }).join(s ? "." : "") : t;
}
function iu(e) {
  return v.isArray(e) && !e.some(Gn);
}
const au = v.toFlatObject(v, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function hn(e, t, s) {
  if (!v.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), s = v.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, p) {
    return !v.isUndefined(p[b]);
  });
  const n = s.metaTokens, r = s.visitor || d, o = s.dots, i = s.indexes, c = (s.Blob || typeof Blob < "u" && Blob) && v.isSpecCompliantForm(t);
  if (!v.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (v.isDate(g))
      return g.toISOString();
    if (v.isBoolean(g))
      return g.toString();
    if (!c && v.isBlob(g))
      throw new V("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(g) || v.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function d(g, b, p) {
    let w = g;
    if (g && !p && typeof g == "object") {
      if (v.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), g = JSON.stringify(g);
      else if (v.isArray(g) && iu(g) || (v.isFileList(g) || v.endsWith(b, "[]")) && (w = v.toArray(g)))
        return b = sa(b), w.forEach(function(L, $) {
          !(v.isUndefined(L) || L === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? go([b], $, o) : i === null ? b : b + "[]",
            f(L)
          );
        }), !1;
    }
    return Gn(g) ? !0 : (t.append(go(p, b, o), f(g)), !1);
  }
  const h = [], x = Object.assign(au, {
    defaultVisitor: d,
    convertValue: f,
    isVisitable: Gn
  });
  function y(g, b) {
    if (!v.isUndefined(g)) {
      if (h.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      h.push(g), v.forEach(g, function(w, N) {
        (!(v.isUndefined(w) || w === null) && r.call(
          t,
          w,
          v.isString(N) ? N.trim() : N,
          b,
          x
        )) === !0 && y(w, b ? b.concat(N) : [N]);
      }), h.pop();
    }
  }
  if (!v.isObject(e))
    throw new TypeError("data must be an object");
  return y(e), t;
}
function bo(e) {
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
function xr(e, t) {
  this._pairs = [], e && hn(e, this, t);
}
const na = xr.prototype;
na.append = function(t, s) {
  this._pairs.push([t, s]);
};
na.toString = function(t) {
  const s = t ? function(n) {
    return t.call(this, n, bo);
  } : bo;
  return this._pairs.map(function(r) {
    return s(r[0]) + "=" + s(r[1]);
  }, "").join("&");
};
function lu(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ra(e, t, s) {
  if (!t)
    return e;
  const n = s && s.encode || lu, r = v.isFunction(s) ? {
    serialize: s
  } : s, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = v.isURLSearchParams(t) ? t.toString() : new xr(t, r).toString(n), i) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class vo {
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
const yr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, cu = typeof URLSearchParams < "u" ? URLSearchParams : xr, du = typeof FormData < "u" ? FormData : null, fu = typeof Blob < "u" ? Blob : null, uu = {
  isBrowser: !0,
  classes: {
    URLSearchParams: cu,
    FormData: du,
    Blob: fu
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, _r = typeof window < "u" && typeof document < "u", Yn = typeof navigator == "object" && navigator || void 0, pu = _r && (!Yn || ["ReactNative", "NativeScript", "NS"].indexOf(Yn.product) < 0), hu = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", mu = _r && window.location.href || "http://localhost", gu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: _r,
  hasStandardBrowserEnv: pu,
  hasStandardBrowserWebWorkerEnv: hu,
  navigator: Yn,
  origin: mu
}, Symbol.toStringTag, { value: "Module" })), we = {
  ...gu,
  ...uu
};
function bu(e, t) {
  return hn(e, new we.classes.URLSearchParams(), {
    visitor: function(s, n, r, o) {
      return we.isNode && v.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function vu(e) {
  return v.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function xu(e) {
  const t = {}, s = Object.keys(e);
  let n;
  const r = s.length;
  let o;
  for (n = 0; n < r; n++)
    o = s[n], t[o] = e[o];
  return t;
}
function oa(e) {
  function t(s, n, r, o) {
    let i = s[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), c = o >= s.length;
    return i = !i && v.isArray(r) ? r.length : i, c ? (v.hasOwnProp(r, i) ? r[i] = [r[i], n] : r[i] = n, !l) : ((!r[i] || !v.isObject(r[i])) && (r[i] = []), t(s, n, r[i], o) && v.isArray(r[i]) && (r[i] = xu(r[i])), !l);
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const s = {};
    return v.forEachEntry(e, (n, r) => {
      t(vu(n), r, s, 0);
    }), s;
  }
  return null;
}
function yu(e, t, s) {
  if (v.isString(e))
    try {
      return (t || JSON.parse)(e), v.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(e);
}
const ks = {
  transitional: yr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, s) {
    const n = s.getContentType() || "", r = n.indexOf("application/json") > -1, o = v.isObject(t);
    if (o && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t))
      return r ? JSON.stringify(oa(t)) : t;
    if (v.isArrayBuffer(t) || v.isBuffer(t) || v.isStream(t) || v.isFile(t) || v.isBlob(t) || v.isReadableStream(t))
      return t;
    if (v.isArrayBufferView(t))
      return t.buffer;
    if (v.isURLSearchParams(t))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (o) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return bu(t, this.formSerializer).toString();
      if ((l = v.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return hn(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return o || r ? (s.setContentType("application/json", !1), yu(t)) : t;
  }],
  transformResponse: [function(t) {
    const s = this.transitional || ks.transitional, n = s && s.forcedJSONParsing, r = this.responseType === "json";
    if (v.isResponse(t) || v.isReadableStream(t))
      return t;
    if (t && v.isString(t) && (n && !this.responseType || r)) {
      const i = !(s && s.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? V.from(l, V.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: we.classes.FormData,
    Blob: we.classes.Blob
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
  ks.headers[e] = {};
});
const _u = v.toObjectSet([
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
]), wu = (e) => {
  const t = {};
  let s, n, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), s = i.substring(0, r).trim().toLowerCase(), n = i.substring(r + 1).trim(), !(!s || t[s] && _u[s]) && (s === "set-cookie" ? t[s] ? t[s].push(n) : t[s] = [n] : t[s] = t[s] ? t[s] + ", " + n : n);
  }), t;
}, xo = /* @__PURE__ */ Symbol("internals");
function es(e) {
  return e && String(e).trim().toLowerCase();
}
function Fs(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(Fs) : String(e);
}
function ku(e) {
  const t = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Cu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function An(e, t, s, n, r) {
  if (v.isFunction(n))
    return n.call(this, t, s);
  if (r && (t = s), !!v.isString(t)) {
    if (v.isString(n))
      return t.indexOf(n) !== -1;
    if (v.isRegExp(n))
      return n.test(t);
  }
}
function Su(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, s, n) => s.toUpperCase() + n);
}
function Eu(e, t) {
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
    function o(l, c, f) {
      const d = es(c);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const h = v.findKey(r, d);
      (!h || r[h] === void 0 || f === !0 || f === void 0 && r[h] !== !1) && (r[h || c] = Fs(l));
    }
    const i = (l, c) => v.forEach(l, (f, d) => o(f, d, c));
    if (v.isPlainObject(t) || t instanceof this.constructor)
      i(t, s);
    else if (v.isString(t) && (t = t.trim()) && !Cu(t))
      i(wu(t), s);
    else if (v.isObject(t) && v.isIterable(t)) {
      let l = {}, c, f;
      for (const d of t) {
        if (!v.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        l[f = d[0]] = (c = l[f]) ? v.isArray(c) ? [...c, d[1]] : [c, d[1]] : d[1];
      }
      i(l, s);
    } else
      t != null && o(s, t, n);
    return this;
  }
  get(t, s) {
    if (t = es(t), t) {
      const n = v.findKey(this, t);
      if (n) {
        const r = this[n];
        if (!s)
          return r;
        if (s === !0)
          return ku(r);
        if (v.isFunction(s))
          return s.call(this, r, n);
        if (v.isRegExp(s))
          return s.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, s) {
    if (t = es(t), t) {
      const n = v.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!s || An(this, this[n], n, s)));
    }
    return !1;
  }
  delete(t, s) {
    const n = this;
    let r = !1;
    function o(i) {
      if (i = es(i), i) {
        const l = v.findKey(n, i);
        l && (!s || An(n, n[l], l, s)) && (delete n[l], r = !0);
      }
    }
    return v.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const s = Object.keys(this);
    let n = s.length, r = !1;
    for (; n--; ) {
      const o = s[n];
      (!t || An(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const s = this, n = {};
    return v.forEach(this, (r, o) => {
      const i = v.findKey(n, o);
      if (i) {
        s[i] = Fs(r), delete s[o];
        return;
      }
      const l = t ? Su(o) : String(o).trim();
      l !== o && delete s[o], s[l] = Fs(r), n[l] = !0;
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
    const n = (this[xo] = this[xo] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const l = es(i);
      n[l] || (Eu(r, i), n[l] = !0);
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
function On(e, t) {
  const s = this || ks, n = t || s, r = Ne.from(n.headers);
  let o = n.data;
  return v.forEach(e, function(l) {
    o = l.call(s, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function ia(e) {
  return !!(e && e.__CANCEL__);
}
let Cs = class extends V {
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
    super(t ?? "canceled", V.ERR_CANCELED, s, n), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function aa(e, t, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? e(s) : t(new V(
    "Request failed with status code " + s.status,
    [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
function Tu(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ru(e, t) {
  e = e || 10;
  const s = new Array(e), n = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), d = n[o];
    i || (i = f), s[r] = c, n[r] = f;
    let h = o, x = 0;
    for (; h !== r; )
      x += s[h++], h = h % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), f - i < t)
      return;
    const y = d && f - d;
    return y ? Math.round(x * 1e3 / y) : void 0;
  };
}
function Au(e, t) {
  let s = 0, n = 1e3 / t, r, o;
  const i = (f, d = Date.now()) => {
    s = d, r = null, o && (clearTimeout(o), o = null), e(...f);
  };
  return [(...f) => {
    const d = Date.now(), h = d - s;
    h >= n ? i(f, d) : (r = f, o || (o = setTimeout(() => {
      o = null, i(r);
    }, n - h)));
  }, () => r && i(r)];
}
const Xs = (e, t, s = 3) => {
  let n = 0;
  const r = Ru(50, 250);
  return Au((o) => {
    const i = o.loaded, l = o.lengthComputable ? o.total : void 0, c = i - n, f = r(c), d = i <= l;
    n = i;
    const h = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: c,
      rate: f || void 0,
      estimated: f && l && d ? (l - i) / f : void 0,
      event: o,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(h);
  }, s);
}, yo = (e, t) => {
  const s = e != null;
  return [(n) => t[0]({
    lengthComputable: s,
    total: e,
    loaded: n
  }), t[1]];
}, _o = (e) => (...t) => v.asap(() => e(...t)), Ou = we.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (s) => (s = new URL(s, we.origin), e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)))(
  new URL(we.origin),
  we.navigator && /(msie|trident)/i.test(we.navigator.userAgent)
) : () => !0, $u = we.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, s, n, r, o, i) {
      if (typeof document > "u") return;
      const l = [`${e}=${encodeURIComponent(t)}`];
      v.isNumber(s) && l.push(`expires=${new Date(s).toUTCString()}`), v.isString(n) && l.push(`path=${n}`), v.isString(r) && l.push(`domain=${r}`), o === !0 && l.push("secure"), v.isString(i) && l.push(`SameSite=${i}`), document.cookie = l.join("; ");
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
function Mu(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ju(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function la(e, t, s) {
  let n = !Mu(t);
  return e && (n || s == !1) ? ju(e, t) : t;
}
const wo = (e) => e instanceof Ne ? { ...e } : e;
function Pt(e, t) {
  t = t || {};
  const s = {};
  function n(f, d, h, x) {
    return v.isPlainObject(f) && v.isPlainObject(d) ? v.merge.call({ caseless: x }, f, d) : v.isPlainObject(d) ? v.merge({}, d) : v.isArray(d) ? d.slice() : d;
  }
  function r(f, d, h, x) {
    if (v.isUndefined(d)) {
      if (!v.isUndefined(f))
        return n(void 0, f, h, x);
    } else return n(f, d, h, x);
  }
  function o(f, d) {
    if (!v.isUndefined(d))
      return n(void 0, d);
  }
  function i(f, d) {
    if (v.isUndefined(d)) {
      if (!v.isUndefined(f))
        return n(void 0, f);
    } else return n(void 0, d);
  }
  function l(f, d, h) {
    if (h in t)
      return n(f, d);
    if (h in e)
      return n(void 0, f);
  }
  const c = {
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
    validateStatus: l,
    headers: (f, d, h) => r(wo(f), wo(d), h, !0)
  };
  return v.forEach(
    Object.keys({ ...e, ...t }),
    function(d) {
      if (d === "__proto__" || d === "constructor" || d === "prototype")
        return;
      const h = v.hasOwnProp(c, d) ? c[d] : r, x = h(e[d], t[d], d);
      v.isUndefined(x) && h !== l || (s[d] = x);
    }
  ), s;
}
const ca = (e) => {
  const t = Pt({}, e);
  let { data: s, withXSRFToken: n, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: l } = t;
  if (t.headers = i = Ne.from(i), t.url = ra(la(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), v.isFormData(s)) {
    if (we.hasStandardBrowserEnv || we.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (v.isFunction(s.getHeaders)) {
      const c = s.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([d, h]) => {
        f.includes(d.toLowerCase()) && i.set(d, h);
      });
    }
  }
  if (we.hasStandardBrowserEnv && (n && v.isFunction(n) && (n = n(t)), n || n !== !1 && Ou(t.url))) {
    const c = r && o && $u.read(o);
    c && i.set(r, c);
  }
  return t;
}, Pu = typeof XMLHttpRequest < "u", Nu = Pu && function(e) {
  return new Promise(function(s, n) {
    const r = ca(e);
    let o = r.data;
    const i = Ne.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: f } = r, d, h, x, y, g;
    function b() {
      y && y(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(d), r.signal && r.signal.removeEventListener("abort", d);
    }
    let p = new XMLHttpRequest();
    p.open(r.method.toUpperCase(), r.url, !0), p.timeout = r.timeout;
    function w() {
      if (!p)
        return;
      const L = Ne.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), E = {
        data: !l || l === "text" || l === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: L,
        config: e,
        request: p
      };
      aa(function(J) {
        s(J), b();
      }, function(J) {
        n(J), b();
      }, E), p = null;
    }
    "onloadend" in p ? p.onloadend = w : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, p.onabort = function() {
      p && (n(new V("Request aborted", V.ECONNABORTED, e, p)), p = null);
    }, p.onerror = function($) {
      const E = $ && $.message ? $.message : "Network Error", j = new V(E, V.ERR_NETWORK, e, p);
      j.event = $ || null, n(j), p = null;
    }, p.ontimeout = function() {
      let $ = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const E = r.transitional || yr;
      r.timeoutErrorMessage && ($ = r.timeoutErrorMessage), n(new V(
        $,
        E.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED,
        e,
        p
      )), p = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in p && v.forEach(i.toJSON(), function($, E) {
      p.setRequestHeader(E, $);
    }), v.isUndefined(r.withCredentials) || (p.withCredentials = !!r.withCredentials), l && l !== "json" && (p.responseType = r.responseType), f && ([x, g] = Xs(f, !0), p.addEventListener("progress", x)), c && p.upload && ([h, y] = Xs(c), p.upload.addEventListener("progress", h), p.upload.addEventListener("loadend", y)), (r.cancelToken || r.signal) && (d = (L) => {
      p && (n(!L || L.type ? new Cs(null, e, p) : L), p.abort(), p = null);
    }, r.cancelToken && r.cancelToken.subscribe(d), r.signal && (r.signal.aborted ? d() : r.signal.addEventListener("abort", d)));
    const N = Tu(r.url);
    if (N && we.protocols.indexOf(N) === -1) {
      n(new V("Unsupported protocol " + N + ":", V.ERR_BAD_REQUEST, e));
      return;
    }
    p.send(o || null);
  });
}, Du = (e, t) => {
  const { length: s } = e = e ? e.filter(Boolean) : [];
  if (t || s) {
    let n = new AbortController(), r;
    const o = function(f) {
      if (!r) {
        r = !0, l();
        const d = f instanceof Error ? f : this.reason;
        n.abort(d instanceof V ? d : new Cs(d instanceof Error ? d.message : d));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new V(`timeout of ${t}ms exceeded`, V.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(o) : f.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", o));
    const { signal: c } = n;
    return c.unsubscribe = () => v.asap(l), c;
  }
}, Fu = function* (e, t) {
  let s = e.byteLength;
  if (s < t) {
    yield e;
    return;
  }
  let n = 0, r;
  for (; n < s; )
    r = n + t, yield e.slice(n, r), n = r;
}, Iu = async function* (e, t) {
  for await (const s of Lu(e))
    yield* Fu(s, t);
}, Lu = async function* (e) {
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
}, ko = (e, t, s, n) => {
  const r = Iu(e, t);
  let o = 0, i, l = (c) => {
    i || (i = !0, n && n(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: f, value: d } = await r.next();
        if (f) {
          l(), c.close();
          return;
        }
        let h = d.byteLength;
        if (s) {
          let x = o += h;
          s(x);
        }
        c.enqueue(new Uint8Array(d));
      } catch (f) {
        throw l(f), f;
      }
    },
    cancel(c) {
      return l(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Co = 64 * 1024, { isFunction: Os } = v, Uu = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(v.global), {
  ReadableStream: So,
  TextEncoder: Eo
} = v.global, To = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Bu = (e) => {
  e = v.merge.call({
    skipUndefined: !0
  }, Uu, e);
  const { fetch: t, Request: s, Response: n } = e, r = t ? Os(t) : typeof fetch == "function", o = Os(s), i = Os(n);
  if (!r)
    return !1;
  const l = r && Os(So), c = r && (typeof Eo == "function" ? /* @__PURE__ */ ((g) => (b) => g.encode(b))(new Eo()) : async (g) => new Uint8Array(await new s(g).arrayBuffer())), f = o && l && To(() => {
    let g = !1;
    const b = new s(we.origin, {
      body: new So(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !b;
  }), d = i && l && To(() => v.isReadableStream(new n("").body)), h = {
    stream: d && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !h[g] && (h[g] = (b, p) => {
      let w = b && b[g];
      if (w)
        return w.call(b);
      throw new V(`Response type '${g}' is not supported`, V.ERR_NOT_SUPPORT, p);
    });
  });
  const x = async (g) => {
    if (g == null)
      return 0;
    if (v.isBlob(g))
      return g.size;
    if (v.isSpecCompliantForm(g))
      return (await new s(we.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (v.isArrayBufferView(g) || v.isArrayBuffer(g))
      return g.byteLength;
    if (v.isURLSearchParams(g) && (g = g + ""), v.isString(g))
      return (await c(g)).byteLength;
  }, y = async (g, b) => {
    const p = v.toFiniteNumber(g.getContentLength());
    return p ?? x(b);
  };
  return async (g) => {
    let {
      url: b,
      method: p,
      data: w,
      signal: N,
      cancelToken: L,
      timeout: $,
      onDownloadProgress: E,
      onUploadProgress: j,
      responseType: J,
      headers: W,
      withCredentials: U = "same-origin",
      fetchOptions: X
    } = ca(g), ce = t || fetch;
    J = J ? (J + "").toLowerCase() : "text";
    let I = Du([N, L && L.toAbortSignal()], $), ne = null;
    const pe = I && I.unsubscribe && (() => {
      I.unsubscribe();
    });
    let Le;
    try {
      if (j && f && p !== "get" && p !== "head" && (Le = await y(W, w)) !== 0) {
        let ye = new s(b, {
          method: "POST",
          body: w,
          duplex: "half"
        }), xe;
        if (v.isFormData(w) && (xe = ye.headers.get("content-type")) && W.setContentType(xe), ye.body) {
          const [Dt, Ft] = yo(
            Le,
            Xs(_o(j))
          );
          w = ko(ye.body, Co, Dt, Ft);
        }
      }
      v.isString(U) || (U = U ? "include" : "omit");
      const Z = o && "credentials" in s.prototype, de = {
        ...X,
        signal: I,
        method: p.toUpperCase(),
        headers: W.normalize().toJSON(),
        body: w,
        duplex: "half",
        credentials: Z ? U : void 0
      };
      ne = o && new s(b, de);
      let G = await (o ? ce(ne, X) : ce(b, de));
      const Ge = d && (J === "stream" || J === "response");
      if (d && (E || Ge && pe)) {
        const ye = {};
        ["status", "statusText", "headers"].forEach((Ss) => {
          ye[Ss] = G[Ss];
        });
        const xe = v.toFiniteNumber(G.headers.get("content-length")), [Dt, Ft] = E && yo(
          xe,
          Xs(_o(E), !0)
        ) || [];
        G = new n(
          ko(G.body, Co, Dt, () => {
            Ft && Ft(), pe && pe();
          }),
          ye
        );
      }
      J = J || "text";
      let Nt = await h[v.findKey(h, J) || "text"](G, g);
      return !Ge && pe && pe(), await new Promise((ye, xe) => {
        aa(ye, xe, {
          data: Nt,
          headers: Ne.from(G.headers),
          status: G.status,
          statusText: G.statusText,
          config: g,
          request: ne
        });
      });
    } catch (Z) {
      throw pe && pe(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new V("Network Error", V.ERR_NETWORK, g, ne, Z && Z.response),
        {
          cause: Z.cause || Z
        }
      ) : V.from(Z, Z && Z.code, g, ne, Z && Z.response);
    }
  };
}, zu = /* @__PURE__ */ new Map(), da = (e) => {
  let t = e && e.env || {};
  const { fetch: s, Request: n, Response: r } = t, o = [
    n,
    r,
    s
  ];
  let i = o.length, l = i, c, f, d = zu;
  for (; l--; )
    c = o[l], f = d.get(c), f === void 0 && d.set(c, f = l ? /* @__PURE__ */ new Map() : Bu(t)), d = f;
  return f;
};
da();
const wr = {
  http: ou,
  xhr: Nu,
  fetch: {
    get: da
  }
};
v.forEach(wr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ro = (e) => `- ${e}`, Hu = (e) => v.isFunction(e) || e === null || e === !1;
function Vu(e, t) {
  e = v.isArray(e) ? e : [e];
  const { length: s } = e;
  let n, r;
  const o = {};
  for (let i = 0; i < s; i++) {
    n = e[i];
    let l;
    if (r = n, !Hu(n) && (r = wr[(l = String(n)).toLowerCase()], r === void 0))
      throw new V(`Unknown adapter '${l}'`);
    if (r && (v.isFunction(r) || (r = r.get(t))))
      break;
    o[l || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = s ? i.length > 1 ? `since :
` + i.map(Ro).join(`
`) : " " + Ro(i[0]) : "as no adapter specified";
    throw new V(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const fa = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Vu,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: wr
};
function $n(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Cs(null, e);
}
function Ao(e) {
  return $n(e), e.headers = Ne.from(e.headers), e.data = On.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), fa.getAdapter(e.adapter || ks.adapter, e)(e).then(function(n) {
    return $n(e), n.data = On.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Ne.from(n.headers), n;
  }, function(n) {
    return ia(n) || ($n(e), n && n.response && (n.response.data = On.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Ne.from(n.response.headers))), Promise.reject(n);
  });
}
const ua = "1.13.5", mn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  mn[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Oo = {};
mn.transitional = function(t, s, n) {
  function r(o, i) {
    return "[Axios v" + ua + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, l) => {
    if (t === !1)
      throw new V(
        r(i, " has been removed" + (s ? " in " + s : "")),
        V.ERR_DEPRECATED
      );
    return s && !Oo[i] && (Oo[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), t ? t(o, i, l) : !0;
  };
};
mn.spelling = function(t) {
  return (s, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function qu(e, t, s) {
  if (typeof e != "object")
    throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let r = n.length;
  for (; r-- > 0; ) {
    const o = n[r], i = t[o];
    if (i) {
      const l = e[o], c = l === void 0 || i(l, o, e);
      if (c !== !0)
        throw new V("option " + o + " must be " + c, V.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new V("Unknown option " + o, V.ERR_BAD_OPTION);
  }
}
const Is = {
  assertOptions: qu,
  validators: mn
}, Be = Is.validators;
let jt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new vo(),
      response: new vo()
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
    n !== void 0 && Is.assertOptions(n, {
      silentJSONParsing: Be.transitional(Be.boolean),
      forcedJSONParsing: Be.transitional(Be.boolean),
      clarifyTimeoutError: Be.transitional(Be.boolean),
      legacyInterceptorReqResOrdering: Be.transitional(Be.boolean)
    }, !1), r != null && (v.isFunction(r) ? s.paramsSerializer = {
      serialize: r
    } : Is.assertOptions(r, {
      encode: Be.function,
      serialize: Be.function
    }, !0)), s.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : s.allowAbsoluteUrls = !0), Is.assertOptions(s, {
      baseUrl: Be.spelling("baseURL"),
      withXsrfToken: Be.spelling("withXSRFToken")
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
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      if (typeof b.runWhen == "function" && b.runWhen(s) === !1)
        return;
      c = c && b.synchronous;
      const p = s.transitional || yr;
      p && p.legacyInterceptorReqResOrdering ? l.unshift(b.fulfilled, b.rejected) : l.push(b.fulfilled, b.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(b) {
      f.push(b.fulfilled, b.rejected);
    });
    let d, h = 0, x;
    if (!c) {
      const g = [Ao.bind(this), void 0];
      for (g.unshift(...l), g.push(...f), x = g.length, d = Promise.resolve(s); h < x; )
        d = d.then(g[h++], g[h++]);
      return d;
    }
    x = l.length;
    let y = s;
    for (; h < x; ) {
      const g = l[h++], b = l[h++];
      try {
        y = g(y);
      } catch (p) {
        b.call(this, p);
        break;
      }
    }
    try {
      d = Ao.call(this, y);
    } catch (g) {
      return Promise.reject(g);
    }
    for (h = 0, x = f.length; h < x; )
      d = d.then(f[h++], f[h++]);
    return d;
  }
  getUri(t) {
    t = Pt(this.defaults, t);
    const s = la(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ra(s, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function(t) {
  jt.prototype[t] = function(s, n) {
    return this.request(Pt(n || {}, {
      method: t,
      url: s,
      data: (n || {}).data
    }));
  };
});
v.forEach(["post", "put", "patch"], function(t) {
  function s(n) {
    return function(o, i, l) {
      return this.request(Pt(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  jt.prototype[t] = s(), jt.prototype[t + "Form"] = s(!0);
});
let Ku = class pa {
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
      const i = new Promise((l) => {
        n.subscribe(l), o = l;
      }).then(r);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, t(function(o, i, l) {
      n.reason || (n.reason = new Cs(o, i, l), s(n.reason));
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
      token: new pa(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Wu(e) {
  return function(s) {
    return e.apply(null, s);
  };
}
function Ju(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
const Xn = {
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
Object.entries(Xn).forEach(([e, t]) => {
  Xn[t] = e;
});
function ha(e) {
  const t = new jt(e), s = Wi(jt.prototype.request, t);
  return v.extend(s, jt.prototype, t, { allOwnKeys: !0 }), v.extend(s, t, null, { allOwnKeys: !0 }), s.create = function(r) {
    return ha(Pt(e, r));
  }, s;
}
const Q = ha(ks);
Q.Axios = jt;
Q.CanceledError = Cs;
Q.CancelToken = Ku;
Q.isCancel = ia;
Q.VERSION = ua;
Q.toFormData = hn;
Q.AxiosError = V;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = Wu;
Q.isAxiosError = Ju;
Q.mergeConfig = Pt;
Q.AxiosHeaders = Ne;
Q.formToJSON = (e) => oa(v.isHTMLForm(e) ? new FormData(e) : e);
Q.getAdapter = fa.getAdapter;
Q.HttpStatusCode = Xn;
Q.default = Q;
const {
  Axios: J1,
  AxiosError: G1,
  CanceledError: Y1,
  isCancel: X1,
  CancelToken: Z1,
  VERSION: Q1,
  all: eg,
  Cancel: tg,
  isAxiosError: sg,
  spread: ng,
  toFormData: rg,
  AxiosHeaders: og,
  HttpStatusCode: ig,
  formToJSON: ag,
  getAdapter: lg,
  mergeConfig: cg
} = Q, Gu = ".btn-approve[data-v-3d0c8d0a]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-3d0c8d0a]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-3d0c8d0a]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-3d0c8d0a]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-3d0c8d0a]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-3d0c8d0a]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-3d0c8d0a]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-3d0c8d0a]{display:flex;align-items:center;gap:14px}.avatar[data-v-3d0c8d0a]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-3d0c8d0a]{display:flex;flex-direction:column}.group-name[data-v-3d0c8d0a]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-3d0c8d0a]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-3d0c8d0a]{display:flex;gap:10px}.btn-action[data-v-3d0c8d0a]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-3d0c8d0a]{width:14px;height:14px}.btn-view[data-v-3d0c8d0a]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-3d0c8d0a]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-3d0c8d0a]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-3d0c8d0a]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-3d0c8d0a]:hover{background-color:#f43f5e;color:#fff}", Yu = { class: "surface" }, Xu = { class: "surface-header" }, Zu = { class: "surface-title" }, Qu = { class: "badge" }, ep = { class: "request-list" }, tp = ["id"], sp = { class: "group-info" }, np = { class: "avatar" }, rp = { class: "text-content" }, op = { class: "group-name" }, ip = { class: "creator-tag" }, ap = { class: "action-group" }, lp = ["onClick"], cp = ["onClick"], dp = ["onClick"], fp = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken";
    const s = t, n = /* @__PURE__ */ be(null), r = (l) => {
      n.value = l, s("show_details", l.id);
    }, o = async (l) => {
      try {
        await Q.post(`/api/group/${l}/approve`), s("action_taken");
      } catch (c) {
        console.error(c);
      }
    }, i = async (l) => {
      try {
        await Q.post(`/api/group/${l}/deny`), s("action_taken");
      } catch (c) {
        console.error(c);
      }
    };
    return (l, c) => (k(), C("section", Yu, [
      a("div", Xu, [
        a("div", Zu, [
          c[0] || (c[0] = Ee(" Inbound Requests ", -1)),
          a("span", Qu, A(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      a("div", ep, [
        (k(!0), C(ee, null, ke(e.groups, (f) => (k(), C("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          a("div", sp, [
            a("div", np, A(f.name.charAt(0).toUpperCase()), 1),
            a("div", rp, [
              a("span", op, A(f.name), 1),
              a("span", ip, "by @" + A(f.creator), 1)
            ])
          ]),
          a("div", ap, [
            a("button", {
              class: "btn-action btn-view",
              onClick: (d) => r(f)
            }, [...c[1] || (c[1] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                a("circle", {
                  cx: "12",
                  cy: "12",
                  r: "3"
                })
              ], -1)
            ])], 8, lp),
            a("button", {
              class: "btn-action btn-approve",
              onClick: (d) => o(f.id)
            }, [...c[2] || (c[2] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                a("polyline", { points: "20 6 9 17 4 12" })
              ], -1)
            ])], 8, cp),
            a("button", {
              class: "btn-action btn-deny",
              onClick: (d) => i(f.id)
            }, [...c[3] || (c[3] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                a("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18"
                }),
                a("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18"
                })
              ], -1)
            ])], 8, dp)
          ])
        ], 8, tp))), 128))
      ])
    ]));
  }
}, up = /* @__PURE__ */ kt(fp, [["styles", [Gu]], ["__scopeId", "data-v-3d0c8d0a"]]), pp = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', hp = { class: "viewport" }, mp = { class: "header" }, gp = {
  key: 0,
  class: "status-badge"
}, bp = { class: "stats" }, vp = { class: "card" }, xp = { class: "value" }, yp = { class: "card" }, _p = {
  class: "value",
  style: { color: "var(--primary)" }
}, wp = { class: "card" }, kp = { class: "value" }, Cp = { class: "workspace" }, Sp = ["groups"], Ep = { class: "surface pulse-container" }, Tp = { class: "feed-timeline" }, Rp = ["onClick"], Ap = { key: 0 }, Op = { key: 1 }, $p = { key: 2 }, Mp = { key: 3 }, jp = { key: 4 }, Pp = { class: "feed-body" }, Np = { class: "feed-text" }, Dp = { class: "highlight" }, Fp = { class: "highlight" }, Ip = { class: "highlight" }, Lp = { class: "highlight" }, Up = { class: "highlight" }, Bp = { class: "highlight" }, zp = { class: "highlight" }, Hp = { class: "feed-time" }, Vp = {
  key: 0,
  class: "empty-state"
}, qp = { class: "modal-card" }, Kp = { class: "modal-header" }, Wp = { class: "header-top" }, Jp = { class: "badge-group" }, Gp = { class: "badge major" }, Yp = { class: "modal-body" }, Xp = { class: "title-row" }, Zp = { class: "group-title" }, Qp = {
  key: 0,
  class: "description-box"
}, eh = { class: "description-text" }, th = { class: "info-grid" }, sh = { class: "info-item" }, nh = { class: "item-content" }, rh = { class: "item-value" }, oh = { class: "info-item" }, ih = { class: "item-content" }, ah = { class: "item-value" }, lh = { class: "info-item" }, ch = { class: "item-content" }, dh = { class: "info-item" }, fh = { class: "item-content" }, uh = { class: "info-item" }, ph = { class: "item-content" }, hh = { class: "item-value" }, mh = { class: "info-item" }, gh = { class: "item-content" }, bh = { class: "item-value" }, vh = { class: "meta-row" }, xh = { class: "modal-footer" }, yh = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ be(null), s = /* @__PURE__ */ be(!1), n = /* @__PURE__ */ be([]), r = /* @__PURE__ */ be({}), o = /* @__PURE__ */ be([]), i = /* @__PURE__ */ be(!0), l = /* @__PURE__ */ be(null), c = async () => {
      console.log("called again");
      try {
        const b = await Q.get("/api/admin/dashboard-data");
        n.value = b.data.pendingGroups || [], r.value = b.data.stats || {}, o.value = b.data.activities || [];
      } catch (b) {
        console.error("API Error:", b);
      } finally {
        i.value = !1;
      }
    }, f = (b) => {
      if (b.type === "create" && b.group.id) {
        const p = `group-${b.group.id}`, w = l.value.querySelector("inbound-request");
        if (w && w.shadowRoot) {
          const N = w.shadowRoot.getElementById(p);
          N && (N.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), N.style.outline = "2px solid var(--primary)", N.style.borderRadius = "20px", setTimeout(() => {
            N.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, d = async (b) => {
      const p = b.detail ? b.detail[0] : b;
      if (!p || typeof p == "object") {
        console.error("Invalid ID received:", p);
        return;
      }
      try {
        const w = await Q.get(`/api/group/${p}`);
        t.value = w.data, s.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, h = (b, p) => {
      const w = ($) => {
        if (!$) return null;
        const E = $.match(/(\d{2}:\d{2}):\d{2}/);
        return E ? E[1] : $;
      }, N = w(b), L = w(p);
      return !N && !L ? "Time TBD" : N ? L ? `${N} — ${L}` : `${N} - End TBD` : `Starts at ${L || "TBD"}`;
    }, x = (b, p) => {
      p === "approve" ? y(b) : g(b);
    }, y = async (b) => {
      try {
        await Q.post(`/api/group/${b}/approve`), s.value = !1, c();
      } catch (p) {
        console.error(p);
      }
    }, g = async (b) => {
      try {
        await Q.post(`/api/group/${b}/deny`), s.value = !1, c();
      } catch (p) {
        console.error(p);
      }
    };
    return an(c), (b, p) => (k(), C("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: l
    }, [
      p[31] || (p[31] = lt('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      a("main", hp, [
        a("header", mp, [
          p[5] || (p[5] = a("h1", null, "Command Center", -1)),
          i.value ? ae("", !0) : (k(), C("div", gp, [...p[4] || (p[4] = [
            a("div", { class: "dot-live" }, null, -1),
            Ee(" OPERATIONAL ", -1)
          ])]))
        ]),
        a("section", bp, [
          a("div", vp, [
            p[6] || (p[6] = a("span", { class: "label" }, "Total Groups", -1)),
            a("span", xp, A(r.value.groups || 0), 1)
          ]),
          a("div", yp, [
            p[7] || (p[7] = a("span", { class: "label" }, "Pending", -1)),
            a("span", _p, A(r.value.pending || 0), 1)
          ]),
          a("div", wp, [
            p[8] || (p[8] = a("span", { class: "label" }, "Total Students", -1)),
            a("span", kp, A(r.value.students || 0), 1)
          ])
        ]),
        a("div", Cp, [
          a("inbound-request", {
            groups: n.value,
            onAction_taken: c,
            onShow_details: d
          }, null, 40, Sp),
          a("section", Ep, [
            p[14] || (p[14] = a("div", { class: "surface-header" }, [
              a("div", { class: "surface-title" }, [
                Ee(" Notifications "),
                a("div", { class: "live-indicator" }, [
                  a("span", { class: "dot" })
                ])
              ])
            ], -1)),
            a("div", Tp, [
              (k(!0), C(ee, null, ke(o.value, (w) => (k(), C("div", {
                key: w.id,
                class: "feed-item",
                onClick: (N) => f(w)
              }, [
                a("div", {
                  class: ie([
                    "feed-icon-wrapper",
                    `bg-${w.type || "default"}`
                  ])
                }, [
                  w.type === "register" ? (k(), C("span", Ap, "👋")) : w.type === "create" ? (k(), C("span", Op, "👤")) : w.type === "approve" ? (k(), C("span", $p, " 👍")) : w.type === "deny" ? (k(), C("span", Mp, "🚫")) : (k(), C("span", jp, "🔔"))
                ], 2),
                a("div", Pp, [
                  a("div", Np, [
                    w.type === "register" ? (k(), C(ee, { key: 0 }, [
                      a("span", Dp, A(w.sender), 1),
                      p[9] || (p[9] = Ee(" joined our community ", -1))
                    ], 64)) : w.type === "create" ? (k(), C(ee, { key: 1 }, [
                      a("span", Fp, A(w.sender), 1),
                      p[10] || (p[10] = Ee(" wants to start ", -1)),
                      a("span", Ip, A(w.group.name), 1)
                    ], 64)) : w.type === "approve" ? (k(), C(ee, { key: 2 }, [
                      a("span", Lp, A(w.sender), 1),
                      p[11] || (p[11] = Ee(" approved the group ", -1)),
                      a("span", Up, A(w.group.name), 1)
                    ], 64)) : w.type === "deny" ? (k(), C(ee, { key: 3 }, [
                      a("span", Bp, A(w.sender), 1),
                      p[12] || (p[12] = Ee(" denied the group ", -1)),
                      a("span", zp, A(w.group.name), 1)
                    ], 64)) : (k(), C(ee, { key: 4 }, [
                      Ee(A(w.message || "Update"), 1)
                    ], 64))
                  ]),
                  a("span", Hp, A(w.time_ago), 1)
                ])
              ], 8, Rp))), 128)),
              !o.value?.length && !i.value ? (k(), C("div", Vp, [...p[13] || (p[13] = [
                a("p", null, "📭 No recent pulses.", -1)
              ])])) : ae("", !0)
            ])
          ]),
          s.value && t.value ? (k(), C("div", {
            key: 0,
            class: "modal-overlay",
            onClick: p[3] || (p[3] = Wn((w) => s.value = !1, ["self"]))
          }, [
            a("div", qp, [
              a("div", Kp, [
                a("div", Wp, [
                  a("div", Jp, [
                    a("span", Gp, A(t.value.major || "Undeclared"), 1),
                    a("span", {
                      class: ie(["badge", t.value.group_type])
                    }, A(t.value.group_type === "general" ? "General" : "Project"), 3),
                    a("span", {
                      class: ie(["badge status", t.value.status.toLowerCase()])
                    }, A(t.value.status), 3)
                  ]),
                  a("button", {
                    class: "close-btn",
                    onClick: p[0] || (p[0] = (w) => s.value = !1)
                  }, "✕")
                ])
              ]),
              a("div", Yp, [
                a("div", Xp, [
                  a("h3", Zp, A(t.value.name), 1),
                  a("span", {
                    class: ie(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    p[15] || (p[15] = a("span", { class: "tag-emoji" }, "📖", -1)),
                    a("span", null, A(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? (k(), C("div", Qp, [
                  a("p", eh, " “" + A(t.value.description) + "” ", 1)
                ])) : ae("", !0),
                a("div", th, [
                  a("div", sh, [
                    p[17] || (p[17] = a("span", { class: "item-emoji" }, "📅", -1)),
                    a("div", nh, [
                      p[16] || (p[16] = a("span", { class: "item-label" }, "Day", -1)),
                      a("span", rh, A(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  a("div", oh, [
                    p[19] || (p[19] = a("span", { class: "item-emoji" }, "⏰", -1)),
                    a("div", ih, [
                      p[18] || (p[18] = a("span", { class: "item-label" }, "Time", -1)),
                      a("span", ah, A(h(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  a("div", lh, [
                    p[21] || (p[21] = a("span", { class: "item-emoji" }, "🎯", -1)),
                    a("div", ch, [
                      p[20] || (p[20] = a("span", { class: "item-label" }, "Interest", -1)),
                      a("span", {
                        class: ie(["item-value", { "is-null": !t.value.interest }])
                      }, A(t.value.interest || "None"), 3)
                    ])
                  ]),
                  a("div", dh, [
                    p[23] || (p[23] = a("span", { class: "item-emoji" }, "📚", -1)),
                    a("div", fh, [
                      p[22] || (p[22] = a("span", { class: "item-label" }, "Semester", -1)),
                      a("span", {
                        class: ie(["item-value", { "is-null": !t.value.semester }])
                      }, A(t.value.semester || "—"), 3)
                    ])
                  ]),
                  a("div", uh, [
                    p[25] || (p[25] = a("span", { class: "item-emoji" }, "👥", -1)),
                    a("div", ph, [
                      p[24] || (p[24] = a("span", { class: "item-label" }, "Members", -1)),
                      a("span", hh, A(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  a("div", mh, [
                    p[27] || (p[27] = a("span", { class: "item-emoji" }, "👤", -1)),
                    a("div", gh, [
                      p[26] || (p[26] = a("span", { class: "item-label" }, "Creator", -1)),
                      a("span", bh, "ID: " + A(t.value.creator), 1)
                    ])
                  ])
                ]),
                a("div", vh, [
                  a("span", {
                    class: ie(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    p[28] || (p[28] = a("span", { class: "chip-dot" }, null, -1)),
                    Ee(" " + A(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  a("span", {
                    class: ie(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    p[29] || (p[29] = a("span", { class: "chip-dot" }, null, -1)),
                    Ee(" " + A(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  a("span", {
                    class: ie(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    p[30] || (p[30] = a("span", { class: "chip-dot" }, null, -1)),
                    Ee(" " + A(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              a("div", xh, [
                a("button", {
                  onClick: p[1] || (p[1] = (w) => x(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                a("button", {
                  onClick: p[2] || (p[2] = (w) => x(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : ae("", !0)
        ])
      ])
    ], 512));
  }
}, _h = /* @__PURE__ */ kt(yh, [["styles", [pp]]]), wh = ".chat-app[data-v-c91fc45b]{display:flex;height:80vh;background:#f8fafc;border-radius:32px;overflow:hidden;box-shadow:0 30px 60px -15px #0003;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.chat-main[data-v-c91fc45b]{flex:1;display:flex;flex-direction:column;background:#fff}.chat-header[data-v-c91fc45b]{padding:1.5rem 2rem;background:#fff;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}.header-left[data-v-c91fc45b]{display:flex;align-items:center;gap:1.25rem}.back-button[data-v-c91fc45b]{width:40px;height:40px;border-radius:14px;border:none;background:#f8fafc;color:#475569;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.back-button[data-v-c91fc45b]:hover{background:#f1f5f9;color:#0f172a;transform:translate(-3px)}.group-info[data-v-c91fc45b]{display:flex;flex-direction:column;gap:.25rem}.group-title[data-v-c91fc45b]{font-size:1.35rem;font-weight:700;color:#0f172a;margin:0;letter-spacing:-.3px}.status-badge[data-v-c91fc45b]{display:flex;align-items:center;gap:.5rem}.status-dot[data-v-c91fc45b]{width:8px;height:8px;border-radius:50%;background:#10b981;animation:pulse-c91fc45b 2s infinite}.status-text[data-v-c91fc45b]{font-size:.75rem;color:#64748b;font-weight:500}.header-actions[data-v-c91fc45b]{display:flex;align-items:center;gap:1rem}.action-icon[data-v-c91fc45b]{width:44px;height:44px;border-radius:14px;border:none;background:#f8fafc;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.action-icon[data-v-c91fc45b]:hover,.action-icon.active[data-v-c91fc45b]{background:#f1f5f9;color:#0f172a}.call-button[data-v-c91fc45b]{padding:.5rem 1.25rem;height:44px;border-radius:40px;border:none;background:#f1f5f9;color:#64748b;font-size:.9rem;font-weight:600;display:flex;align-items:center;gap:.5rem;cursor:not-allowed;transition:all .2s ease}.call-button.call-active[data-v-c91fc45b]{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;cursor:pointer;box-shadow:0 8px 20px -5px #3b82f666}.call-button.call-active[data-v-c91fc45b]:hover{transform:translateY(-2px);box-shadow:0 12px 25px -5px #3b82f680}.call-text[data-v-c91fc45b]{font-size:.85rem}.messages-container[data-v-c91fc45b]{flex:1;overflow-y:auto;padding:2rem;background:#fafbfc}.date-divider[data-v-c91fc45b]{display:flex;justify-content:center;margin:1.5rem 0}.date-text[data-v-c91fc45b]{padding:.4rem 1.2rem;background:#00000008;border-radius:30px;font-size:.75rem;font-weight:600;color:#64748b;letter-spacing:.3px;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.message-row[data-v-c91fc45b]{display:flex;gap:1rem;margin-bottom:1.5rem;align-items:flex-end}.message-row.own-message[data-v-c91fc45b]{flex-direction:row-reverse}.message-avatar[data-v-c91fc45b]{position:relative;flex-shrink:0}.avatar-circle[data-v-c91fc45b]{width:38px;height:38px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1rem;cursor:pointer;transition:transform .2s ease}.avatar-circle[data-v-c91fc45b]:hover{transform:scale(1.05)}.profile-card[data-v-c91fc45b]{position:absolute;bottom:100%;left:0;width:240px;background:#fff;border-radius:24px;box-shadow:0 25px 50px -12px #00000040;z-index:1000;margin-bottom:12px;animation:slideUp-c91fc45b .2s ease;overflow:hidden}.profile-header[data-v-c91fc45b]{height:80px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:12px}.profile-avatar[data-v-c91fc45b]{width:50px;height:50px;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:600;color:#0f172a;border:3px solid white}.profile-body[data-v-c91fc45b]{padding:1.25rem}.profile-body h4[data-v-c91fc45b]{margin:0 0 1rem;font-size:1rem;font-weight:700;color:#0f172a;text-align:center}.profile-detail[data-v-c91fc45b]{display:flex;justify-content:space-between;margin-bottom:.5rem;font-size:.8rem}.detail-label[data-v-c91fc45b]{color:#64748b;font-weight:500}.detail-value[data-v-c91fc45b]{color:#0f172a;font-weight:600}.message-bubble[data-v-c91fc45b]{position:relative;max-width:60%;padding:.9rem 1.2rem;background:#fff;box-shadow:0 4px 12px #00000005;border-radius:24px 24px 24px 4px}.own-bubble[data-v-c91fc45b]{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border-bottom-right-radius:4px;border-bottom-left-radius:24px}.message-tools[data-v-c91fc45b]{position:absolute;top:-35px;right:0;display:flex;gap:.25rem;background:#fff;border-radius:30px;padding:.25rem;box-shadow:0 8px 20px #00000014;z-index:10}.tool-btn[data-v-c91fc45b]{width:30px;height:30px;border-radius:50%;border:none;background:transparent;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.tool-btn[data-v-c91fc45b]:hover{background:#f1f5f9;color:#3b82f6}.tool-btn.delete[data-v-c91fc45b]:hover{background:#fee2e2;color:#ef4444}.file-attachment[data-v-c91fc45b]{display:flex;align-items:center;gap:1rem;min-width:200px}.file-icon[data-v-c91fc45b]{width:40px;height:40px;border-radius:14px;background:#ffffff26;display:flex;align-items:center;justify-content:center;font-size:1.2rem}.file-info[data-v-c91fc45b]{flex:1;display:flex;align-items:center;justify-content:space-between;gap:1rem}.file-name[data-v-c91fc45b]{font-size:.9rem;font-weight:500;word-break:break-word}.file-download[data-v-c91fc45b]{width:32px;height:32px;border-radius:10px;background:#ffffff26;display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;transition:all .2s}.file-download[data-v-c91fc45b]:hover{background:#ffffff40;transform:scale(1.1)}.text-content[data-v-c91fc45b]{font-size:.95rem;line-height:1.5;word-wrap:break-word;white-space:pre-wrap}.edit-mode[data-v-c91fc45b]{width:100%}.edit-field[data-v-c91fc45b]{width:100%;min-height:80px;padding:.75rem;border:2px solid #e2e8f0;border-radius:16px;font-size:.9rem;font-family:inherit;resize:vertical;margin-bottom:.75rem;transition:all .2s}.edit-field[data-v-c91fc45b]:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f61a}.edit-actions[data-v-c91fc45b]{display:flex;gap:.5rem;justify-content:flex-end}.edit-cancel[data-v-c91fc45b],.edit-save[data-v-c91fc45b]{padding:.3rem 1rem;border-radius:30px;border:none;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s}.edit-cancel[data-v-c91fc45b]{background:#f1f5f9;color:#475569}.edit-cancel[data-v-c91fc45b]:hover{background:#e2e8f0}.edit-save[data-v-c91fc45b]{background:#3b82f6;color:#fff}.edit-save[data-v-c91fc45b]:hover{background:#2563eb}.message-footer[data-v-c91fc45b]{display:flex;align-items:center;justify-content:space-between;margin-top:.5rem}.reaction-group[data-v-c91fc45b]{display:flex;gap:.25rem;flex-wrap:wrap}.reaction-chip[data-v-c91fc45b]{padding:.2rem .6rem;background:#00000008;border-radius:30px;font-size:.7rem;display:flex;align-items:center;gap:.2rem;cursor:pointer;transition:all .2s}.own-bubble .reaction-chip[data-v-c91fc45b]{background:#ffffff26;color:#fff}.reaction-chip[data-v-c91fc45b]:hover{transform:scale(1.05);background:#00000014}.own-bubble .reaction-chip[data-v-c91fc45b]:hover{background:#ffffff40}.add-reaction[data-v-c91fc45b]{width:24px;height:24px;border-radius:50%;border:none;background:#00000008;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.own-bubble .add-reaction[data-v-c91fc45b]{background:#ffffff26;color:#fff}.add-reaction[data-v-c91fc45b]:hover{transform:scale(1.1);background:#00000014}.own-bubble .add-reaction[data-v-c91fc45b]:hover{background:#ffffff40}.message-time[data-v-c91fc45b]{font-size:.65rem;opacity:.6;font-weight:500}.input-area[data-v-c91fc45b]{padding:1.5rem 2rem;background:#fff;border-top:1px solid #f1f5f9}.input-form[data-v-c91fc45b]{display:flex;align-items:center;gap:.75rem}.file-upload[data-v-c91fc45b]{display:none}.attach-button[data-v-c91fc45b]{width:48px;height:48px;border-radius:16px;border:none;background:#f8fafc;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.attach-button[data-v-c91fc45b]:hover{background:#f1f5f9;color:#3b82f6;transform:scale(1.05)}.input-wrapper[data-v-c91fc45b]{flex:1}.message-field[data-v-c91fc45b]{width:100%;padding:.8rem 1.2rem;border:none;background:#f8fafc;border-radius:30px;font-size:.95rem;transition:all .2s}.message-field[data-v-c91fc45b]:focus{outline:none;background:#f1f5f9;box-shadow:0 0 0 3px #3b82f61a}.send-button[data-v-c91fc45b]{width:48px;height:48px;border-radius:16px;border:none;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 8px 16px -5px #3b82f64d}.send-button[data-v-c91fc45b]:hover:not(:disabled){transform:scale(1.05) translateY(-2px);box-shadow:0 12px 20px -5px #3b82f666}.send-button[data-v-c91fc45b]:disabled{background:#e2e8f0;color:#94a3b8;box-shadow:none;cursor:not-allowed}.resources-panel[data-v-c91fc45b]{width:320px;background:#fff;border-left:1px solid #f1f5f9;display:flex;flex-direction:column;animation:slideIn-c91fc45b .3s ease}.panel-header[data-v-c91fc45b]{padding:1.5rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}.panel-title[data-v-c91fc45b]{display:flex;align-items:center;gap:.75rem}.panel-title h3[data-v-c91fc45b]{margin:0;font-size:1.1rem;font-weight:700;color:#0f172a}.close-panel[data-v-c91fc45b]{width:32px;height:32px;border-radius:10px;border:none;background:#f8fafc;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.close-panel[data-v-c91fc45b]:hover{background:#f1f5f9;color:#0f172a}.panel-content[data-v-c91fc45b]{flex:1;overflow-y:auto;padding:1rem}.resources-grid[data-v-c91fc45b]{display:flex;flex-direction:column;gap:.75rem}.resource-card[data-v-c91fc45b]{display:flex;align-items:center;gap:1rem;padding:1rem;background:#f8fafc;border-radius:18px;transition:all .2s}.resource-card[data-v-c91fc45b]:hover{background:#f1f5f9;transform:translate(3px)}.resource-icon[data-v-c91fc45b]{width:40px;height:40px;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 4px 8px #00000005}.resource-meta[data-v-c91fc45b]{flex:1;min-width:0}.resource-meta h4[data-v-c91fc45b]{margin:0 0 .25rem;font-size:.9rem;font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-meta span[data-v-c91fc45b]{font-size:.7rem;color:#64748b}.resource-action[data-v-c91fc45b]{width:36px;height:36px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;color:#64748b;text-decoration:none;transition:all .2s}.resource-action[data-v-c91fc45b]:hover{background:#3b82f6;color:#fff;transform:scale(1.1)}.empty-state[data-v-c91fc45b]{text-align:center;padding:3rem 1rem}.empty-icon[data-v-c91fc45b]{font-size:3rem;margin-bottom:1rem;opacity:.5}.empty-state p[data-v-c91fc45b]{color:#94a3b8;font-size:.9rem}.call-modal[data-v-c91fc45b]{position:fixed;inset:0;background:#0f172a;z-index:10000;display:flex;flex-direction:column}.call-grid[data-v-c91fc45b]{flex:1;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;padding:2rem}.call-participant[data-v-c91fc45b]{position:relative;background:#1e293b;border-radius:28px;overflow:hidden;aspect-ratio:16/9;box-shadow:0 25px 50px -12px #00000080}.call-participant video[data-v-c91fc45b]{width:100%;height:100%;object-fit:cover}.participant-name[data-v-c91fc45b]{position:absolute;bottom:15px;left:15px;padding:.3rem 1rem;background:#0009;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:30px;color:#fff;font-size:.8rem;font-weight:500}.call-toolbar[data-v-c91fc45b]{position:absolute;bottom:30px;left:50%;transform:translate(-50%);display:flex;gap:1rem;background:#ffffff14;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);padding:.75rem 1.5rem;border-radius:60px;border:1px solid rgba(255,255,255,.1)}.call-control[data-v-c91fc45b]{width:52px;height:52px;border-radius:50%;border:none;background:#ffffff26;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.call-control[data-v-c91fc45b]:hover{background:#ffffff40;transform:scale(1.1)}.call-control.active[data-v-c91fc45b]{background:#10b981}.call-control.end-call[data-v-c91fc45b]{background:#ef4444}.call-control.end-call[data-v-c91fc45b]:hover{background:#dc2626}@keyframes pulse-c91fc45b{0%,to{opacity:1}50%{opacity:.4}}@keyframes slideIn-c91fc45b{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}@keyframes slideUp-c91fc45b{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.slide-enter-active[data-v-c91fc45b],.slide-leave-active[data-v-c91fc45b]{transition:all .3s ease}.slide-enter-from[data-v-c91fc45b],.slide-leave-to[data-v-c91fc45b]{opacity:0;transform:translate(20px)}.fade-enter-active[data-v-c91fc45b],.fade-leave-active[data-v-c91fc45b]{transition:opacity .2s ease}.fade-enter-from[data-v-c91fc45b],.fade-leave-to[data-v-c91fc45b]{opacity:0}[data-v-c91fc45b]::-webkit-scrollbar{width:4px}[data-v-c91fc45b]::-webkit-scrollbar-track{background:#f1f5f9}[data-v-c91fc45b]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}[data-v-c91fc45b]::-webkit-scrollbar-thumb:hover{background:#94a3b8}@media(max-width:768px){.chat-app[data-v-c91fc45b]{height:100vh;border-radius:0}.resources-panel[data-v-c91fc45b]{position:fixed;right:0;top:0;bottom:0;z-index:1000;box-shadow:-10px 0 30px #0000001a}.message-bubble[data-v-c91fc45b]{max-width:85%}.call-text[data-v-c91fc45b]{display:none}.call-button[data-v-c91fc45b]{width:44px;padding:0;justify-content:center}}", kh = {
  name: "ChatWidget",
  props: {
    group: { type: Object, required: !0 },
    messages: {
      type: Array,
      default: () => [
        {
          content: "Hello",
          timestamp: "12:00:00",
          sender: {
            id: 1,
            username: "May Cho Oo",
            studentprofile: {
              major: "SE",
              semester: "8"
            }
          }
        }
      ]
    },
    resources: { type: Array, default: () => [] },
    currentUser: {
      type: Object,
      required: !0,
      default: {
        id: 2,
        username: "thura"
      }
    },
    isTimetableActive: { type: Boolean, default: !1 }
  },
  data() {
    return {
      newMessage: "",
      showResources: !1,
      hoveredMessage: null,
      activeUserCard: null,
      editingMessage: null,
      editContent: "",
      showVideoCall: !1,
      localStream: null,
      peerConnections: {},
      isMuted: !1,
      isCameraOn: !0,
      chatSocket: null,
      userColors: {}
    };
  },
  mounted() {
    this.initWebSocket(), this.scrollToBottom(), this.generateUserColors(), console.log(props.group);
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    generateUserColors() {
      const e = [
        "#F87171",
        "#FBBF24",
        "#34D399",
        "#60A5FA",
        "#C084FC",
        "#F472B6",
        "#F59E0B",
        "#10B981",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#EF4444"
      ];
      this.messages.forEach((t) => {
        this.userColors[t.sender.id] || (this.userColors[t.sender.id] = e[Math.floor(Math.random() * e.length)]);
      });
    },
    getUserColor(e) {
      return this.userColors[e] || "#667EEA";
    },
    shouldShowDateDivider(e) {
      if (e === 0) return !0;
      const t = new Date(
        this.messages[e].timestamp
      ).toDateString(), s = new Date(
        this.messages[e - 1].timestamp
      ).toDateString();
      return t !== s;
    },
    formatDate(e) {
      const t = new Date(e), s = /* @__PURE__ */ new Date(), n = new Date(s);
      return n.setDate(n.getDate() - 1), t.toDateString() === s.toDateString() ? "Today" : t.toDateString() === n.toDateString() ? "Yesterday" : t.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    },
    formatTime(e) {
      return new Date(e).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: !0
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const e = this.$refs.messagesContainer;
        e?.scrollTo({
          top: e.scrollHeight,
          behavior: "smooth"
        });
      });
    },
    initWebSocket() {
      const e = window.location.protocol === "https:" ? "wss://" : "ws://";
      this.chatSocket = new WebSocket(
        e + window.location.host + "/ws/chat/" + this.group.chat_room.id + "/"
      ), this.chatSocket.onmessage = this.handleWebSocketMessage;
    },
    handleWebSocketMessage(e) {
      const t = JSON.parse(e.data);
      this.$emit("websocket-message", t);
    },
    sendMessage() {
      this.newMessage.trim() && (this.chatSocket.send(
        JSON.stringify({
          action: "send",
          content: this.newMessage
        })
      ), this.newMessage = "");
    },
    isFileMessage(e) {
      return e?.includes("|");
    },
    getFileName(e) {
      return e.split("|")[0].replace("Shared a file:", "").trim();
    },
    getFileUrl(e) {
      return e.split("|")[1]?.trim();
    },
    toggleReaction(e, t) {
      this.chatSocket.send(
        JSON.stringify({
          action: "react",
          msgId: e,
          emoji: t
        })
      );
    },
    startEdit(e) {
      this.editingMessage = e.id, this.editContent = e.content, this.$nextTick(() => this.$refs.editInput?.focus());
    },
    saveEdit() {
      this.editContent.trim() && (this.chatSocket.send(
        JSON.stringify({
          action: "edit",
          msgId: this.editingMessage,
          content: this.editContent
        })
      ), this.cancelEdit());
    },
    cancelEdit() {
      this.editingMessage = null, this.editContent = "";
    },
    deleteMessage(e) {
      confirm("Delete this message?") && this.chatSocket.send(
        JSON.stringify({
          action: "delete",
          msgId: e
        })
      );
    },
    async handleFileUpload(e) {
      const t = e.target.files[0];
      if (!t) return;
      const s = new FormData();
      s.append("file", t), s.append(
        "csrfmiddlewaretoken",
        document.querySelector("[name=csrfmiddlewaretoken]")?.value
      );
      try {
        await fetch(`/upload-file/${this.group.id}/`, {
          method: "POST",
          body: s
        }), e.target.value = "";
      } catch (n) {
        console.error("Upload error:", n);
      }
    },
    showUserCard(e) {
      this.activeUserCard = e;
    },
    hideUserCard() {
      this.activeUserCard = null;
    },
    goToDashboard() {
      this.$emit("navigate");
    },
    async startCall() {
      this.showVideoCall = !0, this.chatSocket.send(JSON.stringify({ action: "call", data: "start" }));
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: !0,
          audio: !0
        }), this.addVideoStream("local", this.localStream, !0);
      } catch (e) {
        console.error("Error accessing media devices:", e);
      }
    },
    addVideoStream(e, t, s = !1) {
      this.$nextTick(() => {
        const n = document.createElement("div");
        n.className = "call-participant", n.id = `participant-${e}`;
        const r = document.createElement("video");
        r.id = `video-${e}`, r.autoplay = !0, r.playsInline = !0, r.muted = s, r.srcObject = t;
        const o = document.createElement("span");
        o.className = "participant-name", o.innerText = e === "local" ? "You" : "Peer", n.appendChild(r), n.appendChild(o), this.$refs.videoGrid.appendChild(n);
      });
    },
    toggleMute() {
      if (this.localStream) {
        const e = this.localStream.getAudioTracks()[0];
        e.enabled = !e.enabled, this.isMuted = !e.enabled;
      }
    },
    toggleCamera() {
      if (this.localStream) {
        const e = this.localStream.getVideoTracks()[0];
        e.enabled = !e.enabled, this.isCameraOn = e.enabled;
      }
    },
    endCall() {
      Object.values(this.peerConnections).forEach((e) => e.close()), this.localStream && this.localStream.getTracks().forEach((e) => e.stop()), this.$refs.videoGrid.innerHTML = "", this.showVideoCall = !1;
    }
  }
}, Ch = { class: "chat-app" }, Sh = { class: "chat-main" }, Eh = { class: "chat-header" }, Th = { class: "header-left" }, Rh = { class: "group-info" }, Ah = { class: "group-title" }, Oh = { class: "status-badge" }, $h = { class: "status-text" }, Mh = { class: "header-actions" }, jh = ["disabled"], Ph = { class: "call-text" }, Nh = {
  class: "messages-container",
  ref: "messagesContainer"
}, Dh = {
  key: 0,
  class: "date-divider"
}, Fh = { class: "date-text" }, Ih = {
  key: 0,
  class: "message-avatar"
}, Lh = ["onMouseenter"], Uh = {
  key: 0,
  class: "profile-card"
}, Bh = { class: "profile-avatar" }, zh = { class: "profile-body" }, Hh = { class: "profile-detail" }, Vh = { class: "detail-value" }, qh = { class: "profile-detail" }, Kh = { class: "detail-value" }, Wh = ["onMouseenter"], Jh = {
  key: 0,
  class: "message-tools"
}, Gh = ["onClick"], Yh = ["onClick"], Xh = {
  key: 1,
  class: "edit-mode"
}, Zh = { class: "edit-actions" }, Qh = {
  key: 2,
  class: "file-attachment"
}, em = { class: "file-info" }, tm = { class: "file-name" }, sm = ["href"], nm = {
  key: 3,
  class: "text-content"
}, rm = { class: "message-footer" }, om = { class: "reaction-group" }, im = ["onClick"], am = { class: "reaction-emoji" }, lm = { class: "reaction-count" }, cm = ["onClick"], dm = { class: "message-time" }, fm = {
  key: 1,
  class: "message-avatar right"
}, um = { class: "input-area" }, pm = { class: "input-wrapper" }, hm = ["disabled"], mm = {
  key: 0,
  class: "resources-panel"
}, gm = { class: "panel-header" }, bm = { class: "panel-content" }, vm = {
  key: 0,
  class: "empty-state"
}, xm = {
  key: 1,
  class: "resources-grid"
}, ym = { class: "resource-meta" }, _m = ["href"], wm = {
  key: 0,
  class: "call-modal"
}, km = {
  class: "call-grid",
  ref: "videoGrid"
}, Cm = { class: "call-toolbar" }, Sm = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
}, Em = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
}, Tm = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
}, Rm = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Am(e, t, s, n, r, o) {
  return k(), C("div", Ch, [
    a("div", Sh, [
      a("div", Eh, [
        a("div", Th, [
          a("button", {
            class: "back-button",
            onClick: t[0] || (t[0] = (...i) => o.goToDashboard && o.goToDashboard(...i))
          }, [...t[17] || (t[17] = [
            a("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("path", {
                d: "M19 12H5M12 19L5 12L12 5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])]),
          a("div", Rh, [
            a("h2", Ah, A(s.group.name), 1),
            a("div", Oh, [
              t[18] || (t[18] = a("span", { class: "status-dot" }, null, -1)),
              a("span", $h, A(s.messages.length) + " messages", 1)
            ])
          ])
        ]),
        a("div", Mh, [
          a("button", {
            class: ie(["action-icon", { active: r.showResources }]),
            onClick: t[1] || (t[1] = (i) => r.showResources = !r.showResources)
          }, [...t[19] || (t[19] = [
            a("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("rect", {
                x: "2",
                y: "3",
                width: "20",
                height: "18",
                rx: "2",
                ry: "2"
              }),
              a("line", {
                x1: "2",
                y1: "9",
                x2: "22",
                y2: "9"
              })
            ], -1)
          ])], 2),
          a("button", {
            class: ie(["call-button", { "call-active": s.isTimetableActive }]),
            disabled: !s.isTimetableActive,
            onClick: t[2] || (t[2] = (...i) => o.startCall && o.startCall(...i))
          }, [
            t[20] || (t[20] = a("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" })
            ], -1)),
            a("span", Ph, A(s.isTimetableActive ? "Join Call" : "Call Unavailable"), 1)
          ], 10, jh)
        ])
      ]),
      a("div", Nh, [
        (k(!0), C(ee, null, ke(s.messages, (i, l) => (k(), C("div", {
          key: i.id,
          class: "message-group"
        }, [
          o.shouldShowDateDivider(l) ? (k(), C("div", Dh, [
            a("span", Fh, A(o.formatDate(i.timestamp)), 1)
          ])) : ae("", !0),
          a("div", {
            class: ie(["message-row", { "own-message": i.sender.id === s.currentUser.id }])
          }, [
            i.sender.id !== s.currentUser.id ? (k(), C("div", Ih, [
              a("div", {
                class: "avatar-circle",
                style: rt({ backgroundColor: o.getUserColor(i.sender.id) }),
                onMouseenter: (c) => o.showUserCard(i.sender.id),
                onMouseleave: t[3] || (t[3] = (...c) => o.hideUserCard && o.hideUserCard(...c))
              }, A(i.sender.username.charAt(0).toUpperCase()), 45, Lh),
              r.activeUserCard === i.sender.id ? (k(), C("div", Uh, [
                a("div", {
                  class: "profile-header",
                  style: rt({ backgroundColor: o.getUserColor(i.sender.id) })
                }, [
                  a("div", Bh, A(i.sender.username.charAt(0).toUpperCase()), 1)
                ], 4),
                a("div", zh, [
                  a("h4", null, A(i.sender.username), 1),
                  a("div", Hh, [
                    t[21] || (t[21] = a("span", { class: "detail-label" }, "Major", -1)),
                    a("span", Vh, A(i.sender.studentprofile?.major || "General"), 1)
                  ]),
                  a("div", qh, [
                    t[22] || (t[22] = a("span", { class: "detail-label" }, "Semester", -1)),
                    a("span", Kh, A(i.sender.studentprofile?.semester || "N/A"), 1)
                  ])
                ])
              ])) : ae("", !0)
            ])) : ae("", !0),
            a("div", {
              class: ie(["message-bubble", {
                "own-bubble": i.sender.id === s.currentUser.id,
                "file-bubble": o.isFileMessage(i.content)
              }]),
              onMouseenter: (c) => r.hoveredMessage = i.id,
              onMouseleave: t[8] || (t[8] = (c) => r.hoveredMessage = null)
            }, [
              i.sender.id === s.currentUser.id && r.hoveredMessage === i.id ? (k(), C("div", Jh, [
                a("button", {
                  class: "tool-btn",
                  onClick: (c) => o.startEdit(i)
                }, [...t[23] || (t[23] = [
                  a("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    a("path", {
                      d: "M17 3L21 7L7 21H3V17L17 3Z",
                      "stroke-width": "2"
                    })
                  ], -1)
                ])], 8, Gh),
                a("button", {
                  class: "tool-btn delete",
                  onClick: (c) => o.deleteMessage(i.id)
                }, [...t[24] || (t[24] = [
                  a("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    a("path", {
                      d: "M3 6H5H21",
                      "stroke-width": "2"
                    }),
                    a("path", {
                      d: "M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6",
                      "stroke-width": "2"
                    }),
                    a("path", {
                      d: "M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6",
                      "stroke-width": "2"
                    })
                  ], -1)
                ])], 8, Yh)
              ])) : ae("", !0),
              r.editingMessage === i.id ? (k(), C("div", Xh, [
                Vs(a("textarea", {
                  "onUpdate:modelValue": t[4] || (t[4] = (c) => r.editContent = c),
                  class: "edit-field",
                  ref_for: !0,
                  ref: "editInput",
                  onKeydown: t[5] || (t[5] = Hi(Wn((...c) => o.saveEdit && o.saveEdit(...c), ["prevent"]), ["enter"]))
                }, null, 544), [
                  [Ys, r.editContent]
                ]),
                a("div", Zh, [
                  a("button", {
                    class: "edit-cancel",
                    onClick: t[6] || (t[6] = (...c) => o.cancelEdit && o.cancelEdit(...c))
                  }, " Cancel "),
                  a("button", {
                    class: "edit-save",
                    onClick: t[7] || (t[7] = (...c) => o.saveEdit && o.saveEdit(...c))
                  }, "Save")
                ])
              ])) : o.isFileMessage(i.content) ? (k(), C("div", Qh, [
                t[26] || (t[26] = a("div", { class: "file-icon" }, "📎", -1)),
                a("div", em, [
                  a("span", tm, A(o.getFileName(i.content)), 1),
                  a("a", {
                    href: o.getFileUrl(i.content),
                    class: "file-download",
                    download: ""
                  }, [...t[25] || (t[25] = [
                    a("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor"
                    }, [
                      a("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                      a("polyline", { points: "7 10 12 15 17 10" }),
                      a("line", {
                        x1: "12",
                        y1: "15",
                        x2: "12",
                        y2: "3"
                      })
                    ], -1)
                  ])], 8, sm)
                ])
              ])) : (k(), C("div", nm, A(i.content), 1)),
              a("div", rm, [
                a("div", om, [
                  (k(!0), C(ee, null, ke(i.reactions, (c) => (k(), C("span", {
                    key: c.emoji,
                    class: "reaction-chip",
                    onClick: (f) => o.toggleReaction(i.id, c.emoji)
                  }, [
                    a("span", am, A(c.emoji), 1),
                    a("span", lm, A(c.count), 1)
                  ], 8, im))), 128)),
                  a("button", {
                    class: "add-reaction",
                    onClick: (c) => o.toggleReaction(i.id, "👍")
                  }, [...t[27] || (t[27] = [
                    a("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor"
                    }, [
                      a("path", { d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" })
                    ], -1)
                  ])], 8, cm)
                ]),
                a("span", dm, A(o.formatTime(i.timestamp)), 1)
              ])
            ], 42, Wh),
            i.sender.id === s.currentUser.id ? (k(), C("div", fm, [
              a("div", {
                class: "avatar-circle",
                style: rt({ backgroundColor: o.getUserColor(s.currentUser.id) })
              }, A(s.currentUser.username.charAt(0).toUpperCase()), 5)
            ])) : ae("", !0)
          ], 2)
        ]))), 128))
      ], 512),
      a("div", um, [
        a("form", {
          onSubmit: t[12] || (t[12] = Wn((...i) => o.sendMessage && o.sendMessage(...i), ["prevent"])),
          class: "input-form"
        }, [
          a("input", {
            type: "file",
            ref: "fileInput",
            class: "file-upload",
            onChange: t[9] || (t[9] = (...i) => o.handleFileUpload && o.handleFileUpload(...i))
          }, null, 544),
          a("button", {
            type: "button",
            class: "attach-button",
            onClick: t[10] || (t[10] = (i) => e.$refs.fileInput.click())
          }, [...t[28] || (t[28] = [
            a("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              a("path", {
                d: "M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18",
                "stroke-width": "2"
              }),
              a("path", {
                d: "M16 8L8 16",
                "stroke-width": "2"
              })
            ], -1)
          ])]),
          a("div", pm, [
            Vs(a("input", {
              "onUpdate:modelValue": t[11] || (t[11] = (i) => r.newMessage = i),
              type: "text",
              class: "message-field",
              placeholder: "Type your message...",
              autocomplete: "off"
            }, null, 512), [
              [Ys, r.newMessage]
            ])
          ]),
          a("button", {
            type: "submit",
            class: "send-button",
            disabled: !r.newMessage.trim()
          }, [...t[29] || (t[29] = [
            a("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, [
              a("line", {
                x1: "22",
                y1: "2",
                x2: "11",
                y2: "13",
                "stroke-width": "2"
              }),
              a("polygon", {
                points: "22 2 15 22 11 13 2 9 22 2",
                "stroke-width": "2"
              })
            ], -1)
          ])], 8, hm)
        ], 32)
      ])
    ]),
    ve(Kn, { name: "slide" }, {
      default: Hs(() => [
        r.showResources ? (k(), C("div", mm, [
          a("div", gm, [
            t[30] || (t[30] = a("div", { class: "panel-title" }, [
              a("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor"
              }, [
                a("rect", {
                  x: "2",
                  y: "3",
                  width: "20",
                  height: "18",
                  rx: "2",
                  ry: "2"
                }),
                a("line", {
                  x1: "2",
                  y1: "9",
                  x2: "22",
                  y2: "9"
                })
              ]),
              a("h3", null, "Resources")
            ], -1)),
            a("button", {
              class: "close-panel",
              onClick: t[13] || (t[13] = (i) => r.showResources = !1)
            }, "✕")
          ]),
          a("div", bm, [
            s.resources.length === 0 ? (k(), C("div", vm, [...t[31] || (t[31] = [
              a("div", { class: "empty-icon" }, "📁", -1),
              a("p", null, "No resources yet", -1)
            ])])) : (k(), C("div", xm, [
              (k(!0), C(ee, null, ke(s.resources, (i) => (k(), C("div", {
                key: i.id,
                class: "resource-card"
              }, [
                t[33] || (t[33] = a("div", { class: "resource-icon" }, [
                  a("span", null, "📄")
                ], -1)),
                a("div", ym, [
                  a("h4", null, A(i.filename), 1),
                  a("span", null, "by " + A(i.uploader.username), 1)
                ]),
                a("a", {
                  href: i.file.url,
                  class: "resource-action",
                  download: ""
                }, [...t[32] || (t[32] = [
                  a("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    a("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                    a("polyline", { points: "7 10 12 15 17 10" }),
                    a("line", {
                      x1: "12",
                      y1: "15",
                      x2: "12",
                      y2: "3"
                    })
                  ], -1)
                ])], 8, _m)
              ]))), 128))
            ]))
          ])
        ])) : ae("", !0)
      ]),
      _: 1
    }),
    ve(Kn, { name: "fade" }, {
      default: Hs(() => [
        r.showVideoCall ? (k(), C("div", wm, [
          a("div", km, null, 512),
          a("div", Cm, [
            a("button", {
              class: ie(["call-control", { active: !r.isMuted }]),
              onClick: t[14] || (t[14] = (...i) => o.toggleMute && o.toggleMute(...i))
            }, [
              r.isMuted ? (k(), C("svg", Sm, [...t[34] || (t[34] = [
                a("path", { d: "M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" }, null, -1),
                a("path", { d: "M19 12a7 7 0 0 1-14 0" }, null, -1),
                a("line", {
                  x1: "3",
                  y1: "3",
                  x2: "21",
                  y2: "21"
                }, null, -1)
              ])])) : (k(), C("svg", Em, [...t[35] || (t[35] = [
                a("path", { d: "M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" }, null, -1),
                a("path", { d: "M19 12a7 7 0 0 1-14 0" }, null, -1)
              ])]))
            ], 2),
            a("button", {
              class: ie(["call-control", { active: r.isCameraOn }]),
              onClick: t[15] || (t[15] = (...i) => o.toggleCamera && o.toggleCamera(...i))
            }, [
              r.isCameraOn ? (k(), C("svg", Rm, [...t[37] || (t[37] = [
                a("path", { d: "M23 7L16 12L23 17V7Z" }, null, -1),
                a("rect", {
                  x: "1",
                  y: "5",
                  width: "15",
                  height: "14",
                  rx: "2",
                  ry: "2"
                }, null, -1)
              ])])) : (k(), C("svg", Tm, [...t[36] || (t[36] = [
                a("path", { d: "M23 7L16 12L23 17V7Z" }, null, -1),
                a("rect", {
                  x: "1",
                  y: "5",
                  width: "15",
                  height: "14",
                  rx: "2",
                  ry: "2"
                }, null, -1)
              ])]))
            ], 2),
            a("button", {
              class: "call-control end-call",
              onClick: t[16] || (t[16] = (...i) => o.endCall && o.endCall(...i))
            }, [...t[38] || (t[38] = [
              a("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor"
              }, [
                a("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" })
              ], -1)
            ])])
          ])
        ])) : ae("", !0)
      ]),
      _: 1
    })
  ]);
}
const Om = /* @__PURE__ */ kt(kh, [["render", Am], ["styles", [wh]], ["__scopeId", "data-v-c91fc45b"]]), $m = ".resources-panel[data-v-6e8cfa84]{background:#fff;border-radius:24px;box-shadow:0 20px 35px -8px #0000001a;height:100%;overflow:hidden}.panel-header[data-v-6e8cfa84]{padding:1rem 1.5rem;border-bottom:1px solid #f0f2f5;display:flex;align-items:center;gap:.5rem;color:#4a5568}.resources-list[data-v-6e8cfa84]{padding:.5rem;overflow-y:auto;height:calc(100% - 60px)}.resource-item[data-v-6e8cfa84]{display:flex;align-items:center;justify-content:space-between;padding:.5rem;border-radius:8px}.resource-item[data-v-6e8cfa84]:hover{background:#f8fafc}.resource-info[data-v-6e8cfa84]{display:flex;align-items:center;gap:.5rem;flex:1;min-width:0}.resource-info p[data-v-6e8cfa84]{margin:0;font-size:.85rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-info small[data-v-6e8cfa84]{font-size:.65rem;color:#a0aec0}.download-btn[data-v-6e8cfa84]{width:32px;height:32px;border-radius:50%;background:#f8f9fa;color:#4a5568;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:1.2rem}.download-btn[data-v-6e8cfa84]:hover{background:#667eea;color:#fff}.empty[data-v-6e8cfa84]{text-align:center;color:#a0aec0;padding:2rem;font-style:italic}", Mm = {
  name: "ResourcesPanel",
  props: {
    files: { type: Array, default: () => [] }
  }
}, jm = { class: "resources-panel" }, Pm = { class: "resources-list" }, Nm = {
  key: 0,
  class: "empty"
}, Dm = { class: "resource-info" }, Fm = ["href"];
function Im(e, t, s, n, r, o) {
  return k(), C("div", jm, [
    t[1] || (t[1] = a("div", { class: "panel-header" }, [
      a("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none"
      }, [
        a("path", {
          d: "M4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20Z",
          stroke: "currentColor",
          "stroke-width": "2"
        }),
        a("path", {
          d: "M2 8H22",
          stroke: "currentColor",
          "stroke-width": "2"
        })
      ]),
      a("h4", null, "Resources")
    ], -1)),
    a("div", Pm, [
      s.files.length === 0 ? (k(), C("div", Nm, "No resources yet")) : ae("", !0),
      (k(!0), C(ee, null, ke(s.files, (i) => (k(), C("div", {
        key: i.id,
        class: "resource-item"
      }, [
        a("div", Dm, [
          t[0] || (t[0] = a("span", null, "📄", -1)),
          a("div", null, [
            a("p", null, A(i.filename), 1),
            a("small", null, "by " + A(i.uploader.username), 1)
          ])
        ]),
        a("a", {
          href: i.file.url,
          class: "download-btn",
          download: ""
        }, "↓", 8, Fm)
      ]))), 128))
    ])
  ]);
}
const Lm = /* @__PURE__ */ kt(Mm, [["render", Im], ["styles", [$m]], ["__scopeId", "data-v-6e8cfa84"]]), Um = "[data-v-ed49e247]{margin:0;padding:0;box-sizing:border-box}.chat-container[data-v-ed49e247]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(135deg,#667eea,#764ba2);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.chat-layout[data-v-ed49e247]{display:grid;grid-template-columns:260px 1fr 300px;height:100vh;background:#fffffff2;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 25px 50px -12px #00000040}.chat-sidebar[data-v-ed49e247]{background:#fff;border-right:1px solid #f0f2f5;padding:28px 20px;overflow-y:auto;height:100vh}.sidebar-brand[data-v-ed49e247]{display:flex;align-items:center;gap:12px;margin-bottom:40px;padding:0 8px}.brand-icon[data-v-ed49e247]{width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 16px -4px #6366f14d}.brand-name[data-v-ed49e247]{font-size:18px;font-weight:700;background:linear-gradient(135deg,#1e293b,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.section-title[data-v-ed49e247]{font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:.5px;margin-bottom:16px;padding:0 8px}.member-row[data-v-ed49e247]{display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:12px;transition:all .2s;cursor:pointer}.member-row[data-v-ed49e247]:hover{background:#f8fafc;transform:translate(4px)}.member-avatar[data-v-ed49e247]{position:relative;width:40px;height:40px}.avatar-initials[data-v-ed49e247]{width:100%;height:100%;background:linear-gradient(135deg,#e2e8f0,#f1f5f9);border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:#475569;border:2px solid white;box-shadow:0 4px 8px #0000000d}.status-indicator[data-v-ed49e247]{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;border:2px solid white}.status-indicator.online[data-v-ed49e247]{background:#10b981;box-shadow:0 0 0 2px #10b98133}.status-indicator.away[data-v-ed49e247]{background:#f59e0b;box-shadow:0 0 0 2px #f59e0b33}.member-info[data-v-ed49e247]{flex:1}.member-name[data-v-ed49e247]{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:2px}.member-status[data-v-ed49e247]{font-size:11px;color:#94a3b8}.chat-main[data-v-ed49e247]{display:flex;flex-direction:column;height:100vh;background:#fff;overflow:hidden}.chat-header[data-v-ed49e247]{padding:20px 32px;background:#fff;border-bottom:1px solid #f0f2f5;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}.header-channel h1[data-v-ed49e247]{font-size:20px;font-weight:700;color:#0f172a;margin-bottom:6px;letter-spacing:-.3px}.channel-meta[data-v-ed49e247]{display:flex;gap:12px}.meta-badge[data-v-ed49e247]{font-size:12px;color:#64748b;font-weight:500}.meta-badge.online[data-v-ed49e247]{color:#10b981;display:flex;align-items:center;gap:4px}.video-call-button[data-v-ed49e247]{width:48px;height:48px;border:none;border-radius:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;background-color:#2563eb;transition:all .2s}.messages-container[data-v-ed49e247]{flex:1;overflow:hidden;background:#fafbfc}.messages-area[data-v-ed49e247]{height:100%;overflow-y:auto;padding:24px 32px;scroll-behavior:smooth}.messages-area[data-v-ed49e247]::-webkit-scrollbar{width:4px}.messages-area[data-v-ed49e247]::-webkit-scrollbar-track{background:#f1f5f9}.messages-area[data-v-ed49e247]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.message-group[data-v-ed49e247]{margin-bottom:20px;animation:slideIn-ed49e247 .3s ease}@keyframes slideIn-ed49e247{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.message-wrapper[data-v-ed49e247]{display:flex;max-width:70%}.own-message[data-v-ed49e247]{margin-left:auto;justify-content:flex-end}.peer-message[data-v-ed49e247]{margin-right:auto;justify-content:flex-start}.message-header[data-v-ed49e247]{display:flex;align-items:center;gap:8px;margin-bottom:6px}.message-sender[data-v-ed49e247]{font-size:13px;font-weight:600;color:#1e293b}.message-time[data-v-ed49e247]{font-size:11px;color:#94a3b8}.own-message .message-header[data-v-ed49e247]{flex-direction:row-reverse}.own-message .message-sender[data-v-ed49e247]{color:#6366f1}.text-bubble[data-v-ed49e247]{padding:12px 18px;font-size:14px;line-height:1.6;border-radius:18px;word-wrap:break-word;max-width:100%;box-shadow:0 2px 8px #00000005}.peer-message .text-bubble[data-v-ed49e247]{background:#fff;border:1px solid #f0f2f5;border-bottom-left-radius:4px;color:#334155}.own-message .text-bubble[data-v-ed49e247]{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-bottom-right-radius:4px;box-shadow:0 8px 16px -4px #6366f14d}.file-link[data-v-ed49e247]{text-decoration:none;display:block}.file-bubble[data-v-ed49e247]{display:flex;align-items:center;gap:14px;padding:12px 16px;background:#fff;border:1px solid #f0f2f5;border-radius:18px;min-width:280px;max-width:320px;transition:all .2s;box-shadow:0 2px 8px #00000005}.peer-message .file-bubble[data-v-ed49e247]{border-bottom-left-radius:4px}.own-message .file-bubble[data-v-ed49e247]{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-bottom-right-radius:4px;box-shadow:0 8px 16px -4px #6366f14d}.file-bubble[data-v-ed49e247]:hover{transform:translateY(-2px);box-shadow:0 12px 24px -8px #00000026}.own-message .file-bubble[data-v-ed49e247]:hover{box-shadow:0 12px 24px -8px #6366f166}.file-icon[data-v-ed49e247]{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.peer-message .file-icon.image[data-v-ed49e247]{background:#dcfce7;color:#16a34a}.peer-message .file-icon.pdf[data-v-ed49e247]{background:#fee2e2;color:#dc2626}.peer-message .file-icon.document[data-v-ed49e247]{background:#dbeafe;color:#2563eb}.peer-message .file-icon.presentation[data-v-ed49e247]{background:#fed7aa;color:#c2410c}.peer-message .file-icon.spreadsheet[data-v-ed49e247]{background:#dcfce7;color:#059669}.peer-message .file-icon.archive[data-v-ed49e247]{background:#fef9c3;color:#ca8a04}.peer-message .file-icon.audio[data-v-ed49e247]{background:#fae8ff;color:#a21caf}.peer-message .file-icon.video[data-v-ed49e247]{background:#ffe4e6;color:#be123c}.peer-message .file-icon.code[data-v-ed49e247]{background:#e0f2fe;color:#0369a1}.peer-message .file-icon[data-v-ed49e247]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.own-message .file-icon[data-v-ed49e247]{background:#fff3;color:#fff}.own-message .file-icon.image[data-v-ed49e247]{background:#16a34a40}.own-message .file-icon.pdf[data-v-ed49e247]{background:#dc262640}.own-message .file-icon.document[data-v-ed49e247]{background:#2563eb40}.own-message .file-icon.presentation[data-v-ed49e247]{background:#c2410c40}.own-message .file-icon.spreadsheet[data-v-ed49e247]{background:#05966940}.own-message .file-icon.archive[data-v-ed49e247]{background:#ca8a0440}.own-message .file-icon.audio[data-v-ed49e247]{background:#a21caf40}.own-message .file-icon.video[data-v-ed49e247]{background:#be123c40}.own-message .file-icon.code[data-v-ed49e247]{background:#0369a140}.file-details[data-v-ed49e247]{flex:1;min-width:0}.file-name[data-v-ed49e247]{font-size:14px;font-weight:600;color:#1e293b;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.own-message .file-name[data-v-ed49e247]{color:#fff}.file-meta[data-v-ed49e247]{font-size:11px;color:#94a3b8}.own-message .file-meta[data-v-ed49e247]{color:#fffc}.file-download[data-v-ed49e247]{width:32px;height:32px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#6366f1;opacity:0;transform:scale(.8);transition:all .2s;flex-shrink:0}.own-message .file-download[data-v-ed49e247]{background:#fff3;color:#fff}.file-bubble:hover .file-download[data-v-ed49e247]{opacity:1;transform:scale(1)}.input-container[data-v-ed49e247]{padding:20px 32px;background:#fff;border-top:1px solid #f0f2f5;flex-shrink:0}.input-wrapper[data-v-ed49e247]{display:flex;align-items:center;gap:12px;background:#f8fafc;border:1px solid #f0f2f5;border-radius:30px;padding:6px 6px 6px 16px;transition:all .2s}.input-wrapper[data-v-ed49e247]:focus-within{border-color:#6366f1;box-shadow:0 0 0 4px #6366f11a;background:#fff}.attach-button[data-v-ed49e247]{width:40px;height:40px;border:none;background:transparent;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6366f1;transition:all .2s}.attach-button[data-v-ed49e247]:hover{background:#eff6ff;transform:scale(1.1)}.file-input-hidden[data-v-ed49e247]{display:none}.message-input[data-v-ed49e247]{flex:1;border:none;background:transparent;outline:none;font-size:14px;color:#1e293b;padding:10px 0}.message-input[data-v-ed49e247]::placeholder{color:#94a3b8}.send-button[data-v-ed49e247]{width:44px;height:44px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #6366f14d}.send-button[data-v-ed49e247]:hover{transform:scale(1.1) rotate(5deg);box-shadow:0 8px 16px #6366f166}.resources-sidebar[data-v-ed49e247]{width:300px;background:#fff;border-left:1px solid #f0f2f5;display:flex;flex-direction:column;height:100vh;overflow:hidden}.resources-header[data-v-ed49e247]{padding:24px 20px;border-bottom:1px solid #f0f2f5;display:flex;align-items:center;justify-content:space-between}.resources-title[data-v-ed49e247]{display:flex;align-items:center;gap:10px}.resources-title h3[data-v-ed49e247]{font-size:16px;font-weight:700;color:#0f172a;margin:0}.resources-count[data-v-ed49e247]{background:#f1f5f9;padding:4px 10px;border-radius:30px;font-size:12px;font-weight:600;color:#6366f1}.resources-list[data-v-ed49e247]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}.resources-list[data-v-ed49e247]::-webkit-scrollbar{width:4px}.resources-list[data-v-ed49e247]::-webkit-scrollbar-track{background:#f1f5f9}.resources-list[data-v-ed49e247]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.resource-card[data-v-ed49e247]{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:14px;transition:all .2s;cursor:pointer}.resource-card[data-v-ed49e247]:hover{background:#f1f5f9;transform:translate(4px)}.resource-icon[data-v-ed49e247]{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.resource-icon.image[data-v-ed49e247]{background:#dcfce7;color:#16a34a}.resource-icon.pdf[data-v-ed49e247]{background:#fee2e2;color:#dc2626}.resource-icon.document[data-v-ed49e247]{background:#dbeafe;color:#2563eb}.resource-icon.presentation[data-v-ed49e247]{background:#fed7aa;color:#c2410c}.resource-icon.spreadsheet[data-v-ed49e247]{background:#dcfce7;color:#059669}.resource-icon.archive[data-v-ed49e247]{background:#fef9c3;color:#ca8a04}.resource-icon.audio[data-v-ed49e247]{background:#fae8ff;color:#a21caf}.resource-icon.video[data-v-ed49e247]{background:#ffe4e6;color:#be123c}.resource-icon.code[data-v-ed49e247]{background:#e0f2fe;color:#0369a1}.resource-icon[data-v-ed49e247]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.resource-content[data-v-ed49e247]{flex:1;min-width:0}.resource-name[data-v-ed49e247]{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-meta[data-v-ed49e247]{display:flex;gap:8px;font-size:11px}.resource-uploader[data-v-ed49e247]{color:#6366f1;font-weight:500}.resource-size[data-v-ed49e247]{color:#94a3b8}.resource-download[data-v-ed49e247]{width:32px;height:32px;border:none;background:transparent;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;opacity:0;transition:all .2s}.resource-card:hover .resource-download[data-v-ed49e247]{opacity:1}.resource-download[data-v-ed49e247]:hover{background:#fff;color:#6366f1;transform:scale(1.1)}", Bm = { class: "chat-container" }, zm = { class: "chat-layout" }, Hm = { class: "chat-sidebar" }, Vm = { class: "sidebar-section" }, qm = { class: "member-avatar" }, Km = { class: "avatar-initials" }, Wm = { class: "member-info" }, Jm = { class: "member-name" }, Gm = { class: "member-status" }, Ym = { class: "chat-main" }, Xm = { class: "chat-header" }, Zm = { class: "header-channel" }, Qm = { class: "channel-meta" }, e1 = { class: "meta-badge" }, t1 = { class: "messages-container" }, s1 = { class: "message-content" }, n1 = { class: "message-header" }, r1 = { class: "message-sender" }, o1 = { class: "message-time" }, i1 = {
  key: 0,
  class: "text-bubble"
}, a1 = ["href", "download"], l1 = ["data-type"], c1 = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, d1 = {
  key: 1,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, f1 = {
  key: 2,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, u1 = {
  key: 3,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, p1 = {
  key: 4,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, h1 = {
  key: 5,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, m1 = {
  key: 6,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, g1 = {
  key: 7,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, b1 = {
  key: 8,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, v1 = {
  key: 9,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, x1 = { class: "file-details" }, y1 = { class: "file-name" }, _1 = { class: "file-meta" }, w1 = { class: "input-container" }, k1 = { class: "input-wrapper" }, C1 = { class: "resources-sidebar" }, S1 = { class: "resources-header" }, E1 = { class: "resources-count" }, T1 = { class: "resources-list" }, R1 = ["download", "href"], A1 = { class: "resource-content" }, O1 = { class: "resource-name" }, $1 = { class: "resource-meta" }, M1 = { class: "resource-uploader" }, j1 = { class: "resource-size" }, P1 = {
  __name: "ChatRoom.ce",
  props: { currentUser: [String] },
  setup(e) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken", Q.defaults.withCredentials = !0;
    let t = /* @__PURE__ */ Ja(null);
    const s = /* @__PURE__ */ be(null), n = /* @__PURE__ */ be(null), r = /* @__PURE__ */ be(null), o = /* @__PURE__ */ be([]), i = /* @__PURE__ */ be([]), l = /* @__PURE__ */ be([]), c = e, f = /* @__PURE__ */ be(""), d = /* @__PURE__ */ be(null), h = ($) => !$ || $ === 0 ? "0 Bytes" : ($ / (1024 * 1024)).toFixed(2) + " MB", x = ($) => {
      if (!$) return "";
      const E = new Date($);
      return isNaN(E.getTime()) ? $ : E.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      });
    }, y = () => {
      n.value.click();
    }, g = async ($) => {
      const E = $.target;
      if (!E || !E.files.length) return;
      const j = E.files[0], J = new FormData();
      J.append("file", j), J.append("group_id", s.value);
      try {
        const W = await Q.post(
          "http://127.0.0.1:8000/chat/api/upload/",
          J
        );
        if (W.status === 201 || W.status === 200) {
          const U = W.data.data;
          console.log({ fileData: U }), t.value.send(
            JSON.stringify({
              message_type: "file",
              file_url: U.file_url,
              file_name: U.file_name,
              file_type: U.file_type,
              file_size: U.file_size,
              sender: c.currentUser,
              message: U.file_name,
              group_id: s.value
            })
          );
        }
      } catch (W) {
        console.error("Upload failed!", W.response?.data || W.message);
      }
      E.value = "";
    }, b = async ($) => {
      try {
        const E = await Q.get($), j = E.data;
        if (E.status == 200) {
          l.value = j.shared_files || [], o.value = j.members || [], i.value = j.messages || [], r.value = j.group_name;
          const J = o.value.find((W) => {
            console.log(W.username, c.currentUser), String(W.username), String(c.currentUser);
          });
          console.log(J), J && (J.status = "online"), p(), Bs(() => {
            d.value && (d.value.scrollTop = d.value.scrollHeight);
          });
        }
      } catch (E) {
        console.error("Error fetching data:", E);
      }
    }, p = () => {
      Bs(() => {
        d.value && (d.value.scrollTop = d.value.scrollHeight);
      });
    }, w = () => {
      console.log("Starting video call..."), alert("Video call feature coming soon!");
    }, N = ge(() => o.value.filter(($) => $.status === "online").length);
    an(() => {
      const $ = window.location.pathname.split("/");
      s.value = $.filter((J) => J !== "").pop();
      const E = `ws://127.0.0.1:8000/ws/chat/${s.value}/`, j = `http://127.0.0.1:8000/chat/api/${s.value}/`;
      b(j), t.value = new WebSocket(E), t.value.onmessage = (J) => {
        const W = JSON.parse(J.data);
        if (W.type === "user_status_change") {
          const U = o.value.find(
            (X) => String(X.id) === String(W.user_id)
          );
          U && (U.status = W.status);
        } else
          i.value.push({ ...W }), W.message_type === "file" && l.value.unshift({
            id: W.id || Date.now(),
            file_name: W.file_name,
            file_type: W.file_type,
            uploader: W.sender,
            file_url: W.file_url,
            file_size: W.file_size,
            uploaded_at: W.uploaded_at
          }), p();
      };
    }), pr(() => {
      t.value && (console.log("Closing web socket..."), t.value.close());
    });
    const L = () => {
      f.value.trim() && (t.value.send(
        JSON.stringify({
          message: f.value,
          sender: c.currentUser,
          message_type: "text",
          group_id: s.value
        })
      ), f.value = "");
    };
    return ($, E) => (k(), C("div", Bm, [
      a("div", zm, [
        a("aside", Hm, [
          E[2] || (E[2] = lt('<div class="sidebar-brand" data-v-ed49e247><div class="brand-icon" data-v-ed49e247><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" data-v-ed49e247><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-ed49e247></path></svg></div><span class="brand-name" data-v-ed49e247>StudySync</span></div>', 1)),
          a("div", Vm, [
            E[1] || (E[1] = a("div", { class: "section-title" }, "MEMBERS", -1)),
            (k(!0), C(ee, null, ke(o.value, (j) => (k(), C("div", {
              key: j.id,
              class: "member-row"
            }, [
              a("div", qm, [
                a("div", Km, A(j.username.charAt(0).toUpperCase()), 1),
                a("div", {
                  class: ie(["status-indicator", j.status])
                }, null, 2)
              ]),
              a("div", Wm, [
                a("div", Jm, A(j.username), 1),
                a("div", Gm, A(j.status === "online" ? "Online" : "Away"), 1)
              ])
            ]))), 128))
          ])
        ]),
        a("main", Ym, [
          a("header", Xm, [
            a("div", Zm, [
              a("h1", null, A(r.value), 1),
              a("div", Qm, [
                a("span", e1, A(o.value?.length) + " members ∙ " + A(N.value) + " online ", 1)
              ])
            ]),
            a("div", { class: "header-actions" }, [
              a("button", {
                class: "video-call-button",
                onClick: w,
                title: "Start Video Call"
              }, [...E[3] || (E[3] = [
                a("svg", {
                  width: "22",
                  height: "22",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "white",
                  "stroke-width": "2"
                }, [
                  a("path", { d: "M23 7L16 12L23 17V7Z" }),
                  a("rect", {
                    x: "1",
                    y: "5",
                    width: "15",
                    height: "14",
                    rx: "2",
                    ry: "2"
                  })
                ], -1)
              ])])
            ])
          ]),
          a("div", t1, [
            a("div", {
              class: "messages-area",
              ref_key: "messagesContainer",
              ref: d
            }, [
              (k(!0), C(ee, null, ke(i.value, (j) => (k(), C("div", {
                key: j.id,
                class: "message-group"
              }, [
                a("div", {
                  class: ie([
                    "message-wrapper",
                    j.sender === e.currentUser ? "own-message" : "peer-message"
                  ])
                }, [
                  a("div", s1, [
                    a("div", n1, [
                      a("span", r1, A(j.sender), 1),
                      a("span", o1, A(x(j.time)), 1)
                    ]),
                    j.message_type === "text" ? (k(), C("div", i1, A(j.message), 1)) : j.message_type === "file" ? (k(), C("a", {
                      key: 1,
                      href: "http://127.0.0.1:8000" + j.file_url,
                      download: j.file_name,
                      target: "_blank",
                      class: "file-link"
                    }, [
                      a("div", {
                        class: ie(["file-bubble", { "own-file": j.sender === e.currentUser }]),
                        "data-type": j.file_type?.toLowerCase()
                      }, [
                        a("div", {
                          class: ie(["file-icon", [
                            j.file_type,
                            { "own-file-icon": j.sender === e.currentUser }
                          ]])
                        }, [
                          j.file_type == "image" ? (k(), C("svg", c1, [...E[4] || (E[4] = [
                            a("rect", {
                              x: "2",
                              y: "2",
                              width: "20",
                              height: "20",
                              rx: "2",
                              ry: "2"
                            }, null, -1),
                            a("circle", {
                              cx: "8.5",
                              cy: "8.5",
                              r: "1.5",
                              fill: "currentColor"
                            }, null, -1),
                            a("polyline", { points: "21 15 16 10 5 21" }, null, -1)
                          ])])) : j.file_type === "pdf" ? (k(), C("svg", d1, [...E[5] || (E[5] = [
                            lt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-ed49e247></path><polyline points="14 2 14 8 20 8" data-v-ed49e247></polyline><path d="M9 15h6" data-v-ed49e247></path><path d="M9 18h4" data-v-ed49e247></path><circle cx="16" cy="15" r="1" fill="currentColor" data-v-ed49e247></circle>', 5)
                          ])])) : j.file_type == "document" ? (k(), C("svg", f1, [...E[6] || (E[6] = [
                            lt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-ed49e247></path><polyline points="14 2 14 8 20 8" data-v-ed49e247></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-ed49e247></line><line x1="16" y1="17" x2="8" y2="17" data-v-ed49e247></line><polyline points="10 9 9 9 8 9" data-v-ed49e247></polyline>', 5)
                          ])])) : j.file_type == "presentation" ? (k(), C("svg", u1, [...E[7] || (E[7] = [
                            lt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-ed49e247></path><polyline points="14 2 14 8 20 8" data-v-ed49e247></polyline><path d="M8 13h8" data-v-ed49e247></path><path d="M8 17h5" data-v-ed49e247></path><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" data-v-ed49e247></circle>', 5)
                          ])])) : j.file_type == "spreadsheet" ? (k(), C("svg", p1, [...E[8] || (E[8] = [
                            lt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-ed49e247></path><polyline points="14 2 14 8 20 8" data-v-ed49e247></polyline><line x1="8" y1="16" x2="12" y2="16" data-v-ed49e247></line><line x1="8" y1="12" x2="16" y2="12" data-v-ed49e247></line><line x1="8" y1="8" x2="10" y2="8" data-v-ed49e247></line>', 5)
                          ])])) : j.file_type == "archive" ? (k(), C("svg", h1, [...E[9] || (E[9] = [
                            a("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                            a("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                            a("line", {
                              x1: "12",
                              y1: "12",
                              x2: "12",
                              y2: "16"
                            }, null, -1),
                            a("line", {
                              x1: "9",
                              y1: "13",
                              x2: "15",
                              y2: "13"
                            }, null, -1)
                          ])])) : j.file_type == "audio" ? (k(), C("svg", m1, [...E[10] || (E[10] = [
                            a("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                            a("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                            a("path", { d: "M9 15v-3a3 3 0 1 1 6 0v3" }, null, -1),
                            a("circle", {
                              cx: "12",
                              cy: "16",
                              r: "2",
                              fill: "currentColor"
                            }, null, -1)
                          ])])) : j.file_type == "video" ? (k(), C("svg", g1, [...E[11] || (E[11] = [
                            a("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                            a("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                            a("polygon", { points: "9 13 15 10 15 18 9 15 9 13" }, null, -1)
                          ])])) : j.file_type == "code" ? (k(), C("svg", b1, [...E[12] || (E[12] = [
                            a("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                            a("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                            a("polyline", { points: "9 13 6 16 9 19" }, null, -1),
                            a("polyline", { points: "15 13 18 16 15 19" }, null, -1)
                          ])])) : (k(), C("svg", v1, [...E[13] || (E[13] = [
                            lt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-ed49e247></path><polyline points="14 2 14 8 20 8" data-v-ed49e247></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-ed49e247></line><line x1="16" y1="17" x2="8" y2="17" data-v-ed49e247></line><circle cx="10.5" cy="15.5" r="0.5" fill="currentColor" data-v-ed49e247></circle>', 5)
                          ])]))
                        ], 2),
                        a("div", x1, [
                          a("div", y1, A(j.file_name), 1),
                          a("div", _1, A(j.file_type?.toUpperCase()) + " • " + A(h(j.file_size)), 1)
                        ]),
                        E[14] || (E[14] = lt('<div class="file-download" data-v-ed49e247><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ed49e247><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-ed49e247></path><polyline points="7 10 12 15 17 10" data-v-ed49e247></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-ed49e247></line></svg></div>', 1))
                      ], 10, l1)
                    ], 8, a1)) : ae("", !0)
                  ])
                ], 2)
              ]))), 128))
            ], 512)
          ]),
          a("div", w1, [
            a("div", k1, [
              a("button", {
                class: "attach-button",
                onClick: y
              }, [...E[15] || (E[15] = [
                a("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "#6366f1",
                  "stroke-width": "2"
                }, [
                  a("path", { d: "M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18" }),
                  a("path", { d: "M16 8L8 16" })
                ], -1)
              ])]),
              a("input", {
                type: "file",
                ref_key: "fileInput",
                ref: n,
                class: "file-input-hidden",
                onChange: g
              }, null, 544),
              Vs(a("input", {
                type: "text",
                "onUpdate:modelValue": E[0] || (E[0] = (j) => f.value = j),
                onKeyup: Hi(L, ["enter"]),
                placeholder: "Type a message...",
                class: "message-input"
              }, null, 544), [
                [Ys, f.value]
              ]),
              a("button", {
                class: "send-button",
                onClick: L
              }, [...E[16] || (E[16] = [
                a("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "white",
                  "stroke-width": "2.5"
                }, [
                  a("line", {
                    x1: "22",
                    y1: "2",
                    x2: "11",
                    y2: "13"
                  }),
                  a("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                ], -1)
              ])])
            ])
          ])
        ]),
        a("aside", C1, [
          a("div", S1, [
            E[17] || (E[17] = a("div", { class: "resources-title" }, [
              a("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#6366f1",
                "stroke-width": "2"
              }, [
                a("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
              ]),
              a("h3", null, "Resources")
            ], -1)),
            a("span", E1, A(l.value.length), 1)
          ]),
          a("div", T1, [
            (k(!0), C(ee, null, ke(l.value, (j) => (k(), C("a", {
              download: j.file_name,
              target: "_blank",
              href: "http://127.0.0.1:8000" + j.file_url,
              key: j.id,
              class: "resource-card file-link"
            }, [
              a("div", {
                class: ie(["resource-icon", j.file_type?.toLowerCase()])
              }, [...E[18] || (E[18] = [
                a("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  a("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
                  a("polyline", { points: "13 2 13 9 20 9" })
                ], -1)
              ])], 2),
              a("div", A1, [
                a("div", O1, A(j.file_name), 1),
                a("div", $1, [
                  a("span", M1, A(j.uploader), 1),
                  a("span", j1, A(h(j.file_size)), 1)
                ])
              ]),
              E[19] || (E[19] = lt('<button class="resource-download" data-v-ed49e247><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ed49e247><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-ed49e247></path><polyline points="7 10 12 15 17 10" data-v-ed49e247></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-ed49e247></line></svg></button>', 1))
            ], 8, R1))), 128))
          ])
        ])
      ])
    ]));
  }
}, N1 = /* @__PURE__ */ kt(P1, [["styles", [Um]], ["__scopeId", "data-v-ed49e247"]]), D1 = /* @__PURE__ */ wt(qi), F1 = /* @__PURE__ */ wt(xf), I1 = /* @__PURE__ */ wt(Ki), L1 = /* @__PURE__ */ wt(up), U1 = /* @__PURE__ */ wt(_h), B1 = /* @__PURE__ */ wt(Om), z1 = /* @__PURE__ */ wt(Lm), H1 = /* @__PURE__ */ wt(N1);
customElements.define("gallery-card", D1);
customElements.define("find-partner-view", F1);
customElements.define("gallery-card-compact", I1);
customElements.define("inbound-request", L1);
customElements.define("admin-dashboard", U1);
customElements.define("chat-widget", B1);
customElements.define("resources-panel", z1);
customElements.define("chat-room", H1);
