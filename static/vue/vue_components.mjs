// @__NO_SIDE_EFFECTS__
function Xs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, zt = [], it = () => {
}, $o = () => !1, es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Zs = (e) => e.startsWith("onUpdate:"), xe = Object.assign, Qs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ga = Object.prototype.hasOwnProperty, ie = (e, t) => ga.call(e, t), q = Array.isArray, Ut = (e) => xn(e) === "[object Map]", Oo = (e) => xn(e) === "[object Set]", Er = (e) => xn(e) === "[object Date]", Y = (e) => typeof e == "function", ke = (e) => typeof e == "string", at = (e) => typeof e == "symbol", ce = (e) => e !== null && typeof e == "object", Po = (e) => (ce(e) || Y(e)) && Y(e.then) && Y(e.catch), Do = Object.prototype.toString, xn = (e) => Do.call(e), ba = (e) => xn(e).slice(8, -1), ts = (e) => xn(e) === "[object Object]", er = (e) => ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, sn = /* @__PURE__ */ Xs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ns = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, va = /-\w/g, Je = ns(
  (e) => e.replace(va, (t) => t.slice(1).toUpperCase())
), xa = /\B([A-Z])/g, Be = ns(
  (e) => e.replace(xa, "-$1").toLowerCase()
), Mo = ns((e) => e.charAt(0).toUpperCase() + e.slice(1)), xs = ns(
  (e) => e ? `on${Mo(e)}` : ""
), kt = (e, t) => !Object.is(e, t), Mn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, jo = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, tr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ms = (e) => {
  const t = ke(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Tr;
const ss = () => Tr || (Tr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function qe(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = ke(s) ? ka(s) : qe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (ke(e) || ce(e))
    return e;
}
const ya = /;(?![^(]*\))/g, wa = /:([^]+)/, _a = /\/\*[^]*?\*\//g;
function ka(e) {
  const t = {};
  return e.replace(_a, "").split(ya).forEach((n) => {
    if (n) {
      const s = n.split(wa);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ve(e) {
  let t = "";
  if (ke(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = ve(e[n]);
      s && (t += s + " ");
    }
  else if (ce(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ca = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Sa = /* @__PURE__ */ Xs(Ca);
function No(e) {
  return !!e || e === "";
}
function Ea(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = nr(e[s], t[s]);
  return n;
}
function nr(e, t) {
  if (e === t) return !0;
  let n = Er(e), s = Er(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = at(e), s = at(t), n || s)
    return e === t;
  if (n = q(e), s = q(t), n || s)
    return n && s ? Ea(e, t) : !1;
  if (n = ce(e), s = ce(t), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(e).length, o = Object.keys(t).length;
    if (r !== o)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !nr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Fo = (e) => !!(e && e.__v_isRef === !0), S = (e) => ke(e) ? e : e == null ? "" : q(e) || ce(e) && (e.toString === Do || !Y(e.toString)) ? Fo(e) ? S(e.value) : JSON.stringify(e, Io, 2) : String(e), Io = (e, t) => Fo(t) ? Io(e, t.value) : Ut(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[ys(s, o) + " =>"] = r, n),
    {}
  )
} : Oo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ys(n))
} : at(t) ? ys(t) : ce(t) && !q(t) && !ts(t) ? String(t) : t, ys = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    at(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let je;
class Ta {
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
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = je;
      try {
        return je = this, t();
      } finally {
        je = n;
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
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
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
function Aa() {
  return je;
}
let ge;
const ws = /* @__PURE__ */ new WeakSet();
class Lo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, je && je.active && je.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ws.has(this) && (ws.delete(this), this.trigger()));
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
    this.flags |= 2, Ar(this), Uo(this);
    const t = ge, n = Ge;
    ge = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      Ho(this), ge = t, Ge = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        or(t);
      this.deps = this.depsTail = void 0, Ar(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ws.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    js(this) && this.run();
  }
  get dirty() {
    return js(this);
  }
}
let Bo = 0, rn, on;
function zo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = on, on = e;
    return;
  }
  e.next = rn, rn = e;
}
function sr() {
  Bo++;
}
function rr() {
  if (--Bo > 0)
    return;
  if (on) {
    let t = on;
    for (on = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; rn; ) {
    let t = rn;
    for (rn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Uo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ho(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), or(s), Ra(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Vo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Vo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === fn) || (e.globalVersion = fn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !js(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, s = Ge;
  ge = e, Ge = !0;
  try {
    Uo(e);
    const r = e.fn(e._value);
    (t.version === 0 || kt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ge = n, Ge = s, Ho(e), e.flags &= -3;
  }
}
function or(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      or(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ra(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ge = !0;
const qo = [];
function ht() {
  qo.push(Ge), Ge = !1;
}
function mt() {
  const e = qo.pop();
  Ge = e === void 0 ? !0 : e;
}
function Ar(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ge;
    ge = void 0;
    try {
      t();
    } finally {
      ge = n;
    }
  }
}
let fn = 0;
class $a {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ir {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !Ge || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new $a(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, Ko(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, fn++, this.notify(t);
  }
  notify(t) {
    sr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      rr();
    }
  }
}
function Ko(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Ko(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ns = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ Symbol(
  ""
), Fs = /* @__PURE__ */ Symbol(
  ""
), un = /* @__PURE__ */ Symbol(
  ""
);
function Ce(e, t, n) {
  if (Ge && ge) {
    let s = Ns.get(e);
    s || Ns.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ir()), r.map = s, r.key = n), r.track();
  }
}
function ut(e, t, n, s, r, o) {
  const i = Ns.get(e);
  if (!i) {
    fn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (sr(), t === "clear")
    i.forEach(a);
  else {
    const c = q(e), f = c && er(n);
    if (c && n === "length") {
      const d = Number(s);
      i.forEach((u, m) => {
        (m === "length" || m === un || !at(m) && m >= d) && a(u);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(un)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get(Dt)), Ut(e) && a(i.get(Fs)));
          break;
        case "delete":
          c || (a(i.get(Dt)), Ut(e) && a(i.get(Fs)));
          break;
        case "set":
          Ut(e) && a(i.get(Dt));
          break;
      }
  }
  rr();
}
function It(e) {
  const t = /* @__PURE__ */ oe(e);
  return t === e ? t : (Ce(t, "iterate", un), /* @__PURE__ */ Ke(e) ? t : t.map(Ye));
}
function rs(e) {
  return Ce(e = /* @__PURE__ */ oe(e), "iterate", un), e;
}
function wt(e, t) {
  return /* @__PURE__ */ gt(e) ? qt(/* @__PURE__ */ Mt(e) ? Ye(t) : t) : Ye(t);
}
const Oa = {
  __proto__: null,
  [Symbol.iterator]() {
    return _s(this, Symbol.iterator, (e) => wt(this, e));
  },
  concat(...e) {
    return It(this).concat(
      ...e.map((t) => q(t) ? It(t) : t)
    );
  },
  entries() {
    return _s(this, "entries", (e) => (e[1] = wt(this, e[1]), e));
  },
  every(e, t) {
    return lt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return lt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => wt(this, s)),
      arguments
    );
  },
  find(e, t) {
    return lt(
      this,
      "find",
      e,
      t,
      (n) => wt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return lt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return lt(
      this,
      "findLast",
      e,
      t,
      (n) => wt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return lt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return lt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ks(this, "includes", e);
  },
  indexOf(...e) {
    return ks(this, "indexOf", e);
  },
  join(e) {
    return It(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ks(this, "lastIndexOf", e);
  },
  map(e, t) {
    return lt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Zt(this, "pop");
  },
  push(...e) {
    return Zt(this, "push", e);
  },
  reduce(e, ...t) {
    return Rr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Rr(this, "reduceRight", e, t);
  },
  shift() {
    return Zt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return lt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Zt(this, "splice", e);
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
    return Zt(this, "unshift", e);
  },
  values() {
    return _s(this, "values", (e) => wt(this, e));
  }
};
function _s(e, t, n) {
  const s = rs(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ Ke(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const Pa = Array.prototype;
function lt(e, t, n, s, r, o) {
  const i = rs(e), a = i !== e && !/* @__PURE__ */ Ke(e), c = i[t];
  if (c !== Pa[t]) {
    const u = c.apply(e, o);
    return a ? Ye(u) : u;
  }
  let f = n;
  i !== e && (a ? f = function(u, m) {
    return n.call(this, wt(e, u), m, e);
  } : n.length > 2 && (f = function(u, m) {
    return n.call(this, u, m, e);
  }));
  const d = c.call(i, f, s);
  return a && r ? r(d) : d;
}
function Rr(e, t, n, s) {
  const r = rs(e);
  let o = n;
  return r !== e && (/* @__PURE__ */ Ke(e) ? n.length > 3 && (o = function(i, a, c) {
    return n.call(this, i, a, c, e);
  }) : o = function(i, a, c) {
    return n.call(this, i, wt(e, a), c, e);
  }), r[t](o, ...s);
}
function ks(e, t, n) {
  const s = /* @__PURE__ */ oe(e);
  Ce(s, "iterate", un);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ dr(n[0]) ? (n[0] = /* @__PURE__ */ oe(n[0]), s[t](...n)) : r;
}
function Zt(e, t, n = []) {
  ht(), sr();
  const s = (/* @__PURE__ */ oe(e))[t].apply(e, n);
  return rr(), mt(), s;
}
const Da = /* @__PURE__ */ Xs("__proto__,__v_isRef,__isVue"), Wo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(at)
);
function Ma(e) {
  at(e) || (e = String(e));
  const t = /* @__PURE__ */ oe(this);
  return Ce(t, "has", e), t.hasOwnProperty(e);
}
class Jo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Va : Zo : o ? Xo : Yo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = q(t);
    if (!r) {
      let c;
      if (i && (c = Oa[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ma;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ee(t) ? t : s
    );
    if ((at(n) ? Wo.has(n) : Da(n)) || (r || Ce(t, "get", n), o))
      return a;
    if (/* @__PURE__ */ Ee(a)) {
      const c = i && er(n) ? a : a.value;
      return r && ce(c) ? /* @__PURE__ */ Ls(c) : c;
    }
    return ce(a) ? r ? /* @__PURE__ */ Ls(a) : /* @__PURE__ */ lr(a) : a;
  }
}
class Go extends Jo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = q(t) && er(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ gt(o);
      if (!/* @__PURE__ */ Ke(s) && !/* @__PURE__ */ gt(s) && (o = /* @__PURE__ */ oe(o), s = /* @__PURE__ */ oe(s)), !i && /* @__PURE__ */ Ee(o) && !/* @__PURE__ */ Ee(s))
        return f || (o.value = s), !0;
    }
    const a = i ? Number(n) < t.length : ie(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Ee(t) ? t : r
    );
    return t === /* @__PURE__ */ oe(r) && (a ? kt(s, o) && ut(t, "set", n, s) : ut(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = ie(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && ut(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!at(n) || !Wo.has(n)) && Ce(t, "has", n), s;
  }
  ownKeys(t) {
    return Ce(
      t,
      "iterate",
      q(t) ? "length" : Dt
    ), Reflect.ownKeys(t);
  }
}
class ja extends Jo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Na = /* @__PURE__ */ new Go(), Fa = /* @__PURE__ */ new ja(), Ia = /* @__PURE__ */ new Go(!0);
const Is = (e) => e, $n = (e) => Reflect.getPrototypeOf(e);
function La(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = /* @__PURE__ */ oe(r), i = Ut(o), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = r[e](...s), d = n ? Is : t ? qt : Ye;
    return !t && Ce(
      o,
      "iterate",
      c ? Fs : Dt
    ), xe(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: u, done: m } = f.next();
          return m ? { value: u, done: m } : {
            value: a ? [d(u[0]), d(u[1])] : d(u),
            done: m
          };
        }
      }
    );
  };
}
function On(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ba(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ oe(o), a = /* @__PURE__ */ oe(r);
      e || (kt(r, a) && Ce(i, "get", r), Ce(i, "get", a));
      const { has: c } = $n(i), f = t ? Is : e ? qt : Ye;
      if (c.call(i, r))
        return f(o.get(r));
      if (c.call(i, a))
        return f(o.get(a));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ce(/* @__PURE__ */ oe(r), "iterate", Dt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ oe(o), a = /* @__PURE__ */ oe(r);
      return e || (kt(r, a) && Ce(i, "has", r), Ce(i, "has", a)), r === a ? o.has(r) : o.has(r) || o.has(a);
    },
    forEach(r, o) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ oe(a), f = t ? Is : e ? qt : Ye;
      return !e && Ce(c, "iterate", Dt), a.forEach((d, u) => r.call(o, f(d), f(u), i));
    }
  };
  return xe(
    n,
    e ? {
      add: On("add"),
      set: On("set"),
      delete: On("delete"),
      clear: On("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Ke(r) && !/* @__PURE__ */ gt(r) && (r = /* @__PURE__ */ oe(r));
        const o = /* @__PURE__ */ oe(this);
        return $n(o).has.call(o, r) || (o.add(r), ut(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !/* @__PURE__ */ Ke(o) && !/* @__PURE__ */ gt(o) && (o = /* @__PURE__ */ oe(o));
        const i = /* @__PURE__ */ oe(this), { has: a, get: c } = $n(i);
        let f = a.call(i, r);
        f || (r = /* @__PURE__ */ oe(r), f = a.call(i, r));
        const d = c.call(i, r);
        return i.set(r, o), f ? kt(o, d) && ut(i, "set", r, o) : ut(i, "add", r, o), this;
      },
      delete(r) {
        const o = /* @__PURE__ */ oe(this), { has: i, get: a } = $n(o);
        let c = i.call(o, r);
        c || (r = /* @__PURE__ */ oe(r), c = i.call(o, r)), a && a.call(o, r);
        const f = o.delete(r);
        return c && ut(o, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ oe(this), o = r.size !== 0, i = r.clear();
        return o && ut(
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
    n[r] = La(r, e, t);
  }), n;
}
function ar(e, t) {
  const n = Ba(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ie(n, r) && r in s ? n : s,
    r,
    o
  );
}
const za = {
  get: /* @__PURE__ */ ar(!1, !1)
}, Ua = {
  get: /* @__PURE__ */ ar(!1, !0)
}, Ha = {
  get: /* @__PURE__ */ ar(!0, !1)
};
const Yo = /* @__PURE__ */ new WeakMap(), Xo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap();
function qa(e) {
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
function Ka(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : qa(ba(e));
}
// @__NO_SIDE_EFFECTS__
function lr(e) {
  return /* @__PURE__ */ gt(e) ? e : cr(
    e,
    !1,
    Na,
    za,
    Yo
  );
}
// @__NO_SIDE_EFFECTS__
function Wa(e) {
  return cr(
    e,
    !1,
    Ia,
    Ua,
    Xo
  );
}
// @__NO_SIDE_EFFECTS__
function Ls(e) {
  return cr(
    e,
    !0,
    Fa,
    Ha,
    Zo
  );
}
function cr(e, t, n, s, r) {
  if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = Ka(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const a = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
  return /* @__PURE__ */ gt(e) ? /* @__PURE__ */ Mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function dr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ oe(t) : e;
}
function Ja(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && jo(e, "__v_skip", !0), e;
}
const Ye = (e) => ce(e) ? /* @__PURE__ */ lr(e) : e, qt = (e) => ce(e) ? /* @__PURE__ */ Ls(e) : e;
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  return Qo(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ga(e) {
  return Qo(e, !0);
}
function Qo(e, t) {
  return /* @__PURE__ */ Ee(e) ? e : new Ya(e, t);
}
class Ya {
  constructor(t, n) {
    this.dep = new ir(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ oe(t), this._value = n ? t : Ye(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ke(t) || /* @__PURE__ */ gt(t);
    t = s ? t : /* @__PURE__ */ oe(t), kt(t, n) && (this._rawValue = t, this._value = s ? t : Ye(t), this.dep.trigger());
  }
}
function ei(e) {
  return /* @__PURE__ */ Ee(e) ? e.value : e;
}
const Xa = {
  get: (e, t, n) => t === "__v_raw" ? e : ei(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ee(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function ti(e) {
  return /* @__PURE__ */ Mt(e) ? e : new Proxy(e, Xa);
}
class Za {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ir(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return zo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Vo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Qa(e, t, n = !1) {
  let s, r;
  return Y(e) ? s = e : (s = e.get, r = e.set), new Za(s, r, n);
}
const Pn = {}, Hn = /* @__PURE__ */ new WeakMap();
let $t;
function el(e, t = !1, n = $t) {
  if (n) {
    let s = Hn.get(n);
    s || Hn.set(n, s = []), s.push(e);
  }
}
function tl(e, t, n = pe) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: a, call: c } = n, f = (j) => r ? j : /* @__PURE__ */ Ke(j) || r === !1 || r === 0 ? pt(j, 1) : pt(j);
  let d, u, m, v, g = !1, x = !1;
  if (/* @__PURE__ */ Ee(e) ? (u = () => e.value, g = /* @__PURE__ */ Ke(e)) : /* @__PURE__ */ Mt(e) ? (u = () => f(e), g = !0) : q(e) ? (x = !0, g = e.some((j) => /* @__PURE__ */ Mt(j) || /* @__PURE__ */ Ke(j)), u = () => e.map((j) => {
    if (/* @__PURE__ */ Ee(j))
      return j.value;
    if (/* @__PURE__ */ Mt(j))
      return f(j);
    if (Y(j))
      return c ? c(j, 2) : j();
  })) : Y(e) ? t ? u = c ? () => c(e, 2) : e : u = () => {
    if (m) {
      ht();
      try {
        m();
      } finally {
        mt();
      }
    }
    const j = $t;
    $t = d;
    try {
      return c ? c(e, 3, [v]) : e(v);
    } finally {
      $t = j;
    }
  } : u = it, t && r) {
    const j = u, U = r === !0 ? 1 / 0 : r;
    u = () => pt(j(), U);
  }
  const b = Aa(), E = () => {
    d.stop(), b && b.active && Qs(b.effects, d);
  };
  if (o && t) {
    const j = t;
    t = (...U) => {
      j(...U), E();
    };
  }
  let F = x ? new Array(e.length).fill(Pn) : Pn;
  const H = (j) => {
    if (!(!(d.flags & 1) || !d.dirty && !j))
      if (t) {
        const U = d.run();
        if (r || g || (x ? U.some((P, M) => kt(P, F[M])) : kt(U, F))) {
          m && m();
          const P = $t;
          $t = d;
          try {
            const M = [
              U,
              // pass undefined as the old value when it's changed for the first time
              F === Pn ? void 0 : x && F[0] === Pn ? [] : F,
              v
            ];
            F = U, c ? c(t, 3, M) : (
              // @ts-expect-error
              t(...M)
            );
          } finally {
            $t = P;
          }
        }
      } else
        d.run();
  };
  return a && a(H), d = new Lo(u), d.scheduler = i ? () => i(H, !1) : H, v = (j) => el(j, !1, d), m = d.onStop = () => {
    const j = Hn.get(d);
    if (j) {
      if (c)
        c(j, 4);
      else
        for (const U of j) U();
      Hn.delete(d);
    }
  }, t ? s ? H(!0) : F = d.run() : i ? i(H.bind(null, !0), !0) : d.run(), E.pause = d.pause.bind(d), E.resume = d.resume.bind(d), E.stop = E, E;
}
function pt(e, t = 1 / 0, n) {
  if (t <= 0 || !ce(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ee(e))
    pt(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      pt(e[s], t, n);
  else if (Oo(e) || Ut(e))
    e.forEach((s) => {
      pt(s, t, n);
    });
  else if (ts(e)) {
    for (const s in e)
      pt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && pt(e[s], t, n);
  }
  return e;
}
function yn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    os(r, t, n);
  }
}
function Xe(e, t, n, s) {
  if (Y(e)) {
    const r = yn(e, t, n, s);
    return r && Po(r) && r.catch((o) => {
      os(o, t, n);
    }), r;
  }
  if (q(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Xe(e[o], t, n, s));
    return r;
  }
}
function os(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || pe;
  if (t) {
    let a = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let u = 0; u < d.length; u++)
          if (d[u](e, c, f) === !1)
            return;
      }
      a = a.parent;
    }
    if (o) {
      ht(), yn(o, null, 10, [
        e,
        c,
        f
      ]), mt();
      return;
    }
  }
  nl(e, n, r, s, i);
}
function nl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ae = [];
let st = -1;
const Ht = [];
let _t = null, Lt = 0;
const ni = /* @__PURE__ */ Promise.resolve();
let Vn = null;
function qn(e) {
  const t = Vn || ni;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function sl(e) {
  let t = st + 1, n = Ae.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Ae[s], o = pn(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function fr(e) {
  if (!(e.flags & 1)) {
    const t = pn(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= pn(n) ? Ae.push(e) : Ae.splice(sl(t), 0, e), e.flags |= 1, si();
  }
}
function si() {
  Vn || (Vn = ni.then(oi));
}
function rl(e) {
  q(e) ? Ht.push(...e) : _t && e.id === -1 ? _t.splice(Lt + 1, 0, e) : e.flags & 1 || (Ht.push(e), e.flags |= 1), si();
}
function $r(e, t, n = st + 1) {
  for (; n < Ae.length; n++) {
    const s = Ae[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Ae.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function ri(e) {
  if (Ht.length) {
    const t = [...new Set(Ht)].sort(
      (n, s) => pn(n) - pn(s)
    );
    if (Ht.length = 0, _t) {
      _t.push(...t);
      return;
    }
    for (_t = t, Lt = 0; Lt < _t.length; Lt++) {
      const n = _t[Lt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    _t = null, Lt = 0;
  }
}
const pn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function oi(e) {
  try {
    for (st = 0; st < Ae.length; st++) {
      const t = Ae[st];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), yn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; st < Ae.length; st++) {
      const t = Ae[st];
      t && (t.flags &= -2);
    }
    st = -1, Ae.length = 0, ri(), Vn = null, (Ae.length || Ht.length) && oi();
  }
}
let Ve = null, ii = null;
function Kn(e) {
  const t = Ve;
  return Ve = e, ii = e && e.type.__scopeId || null, t;
}
function Kt(e, t = Ve, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Gn(-1);
    const o = Kn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Kn(o), s._d && Gn(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function is(e, t) {
  if (Ve === null)
    return e;
  const n = fs(Ve), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, a, c = pe] = t[r];
    o && (Y(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && pt(i), s.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: c
    }));
  }
  return e;
}
function Et(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    o && (a.oldValue = o[i].value);
    let c = a.dir[s];
    c && (ht(), Xe(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), mt());
  }
}
function ol(e, t) {
  if ($e) {
    let n = $e.provides;
    const s = $e.parent && $e.parent.provides;
    s === n && (n = $e.provides = Object.create(s)), n[e] = t;
  }
}
function jn(e, t, n = !1) {
  const s = Fi();
  if (s || Vt) {
    let r = Vt ? Vt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Y(t) ? t.call(s && s.proxy) : t;
  }
}
const il = /* @__PURE__ */ Symbol.for("v-scx"), al = () => jn(il);
function Nn(e, t, n) {
  return ai(e, t, n);
}
function ai(e, t, n = pe) {
  const { immediate: s, deep: r, flush: o, once: i } = n, a = xe({}, n), c = t && s || !t && o !== "post";
  let f;
  if (gn) {
    if (o === "sync") {
      const v = al();
      f = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!c) {
      const v = () => {
      };
      return v.stop = it, v.resume = it, v.pause = it, v;
    }
  }
  const d = $e;
  a.call = (v, g, x) => Xe(v, d, g, x);
  let u = !1;
  o === "post" ? a.scheduler = (v) => {
    Me(v, d && d.suspense);
  } : o !== "sync" && (u = !0, a.scheduler = (v, g) => {
    g ? v() : fr(v);
  }), a.augmentJob = (v) => {
    t && (v.flags |= 4), u && (v.flags |= 2, d && (v.id = d.uid, v.i = d));
  };
  const m = tl(e, t, a);
  return gn && (f ? f.push(m) : c && m()), m;
}
function ll(e, t, n) {
  const s = this.proxy, r = ke(e) ? e.includes(".") ? li(s, e) : () => s[e] : e.bind(s, s);
  let o;
  Y(t) ? o = t : (o = t.handler, n = t);
  const i = _n(this), a = ai(r, o.bind(s), n);
  return i(), a;
}
function li(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const cl = /* @__PURE__ */ Symbol("_vte"), ci = (e) => e.__isTeleport, rt = /* @__PURE__ */ Symbol("_leaveCb"), Qt = /* @__PURE__ */ Symbol("_enterCb");
function dl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return wn(() => {
    e.isMounted = !0;
  }), bi(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ue = [Function, Array], di = {
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
}, fi = (e) => {
  const t = e.subTree;
  return t.component ? fi(t.component) : t;
}, fl = {
  name: "BaseTransition",
  props: di,
  setup(e, { slots: t }) {
    const n = Fi(), s = dl();
    return () => {
      const r = t.default && hi(t.default(), !0);
      if (!r || !r.length)
        return;
      const o = ui(r), i = /* @__PURE__ */ oe(e), { mode: a } = i;
      if (s.isLeaving)
        return Cs(o);
      const c = Or(o);
      if (!c)
        return Cs(o);
      let f = Bs(
        c,
        i,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => f = u
      );
      c.type !== Re && hn(c, f);
      let d = n.subTree && Or(n.subTree);
      if (d && d.type !== Re && !Ot(d, c) && fi(n).type !== Re) {
        let u = Bs(
          d,
          i,
          s,
          n
        );
        if (hn(d, u), a === "out-in" && c.type !== Re)
          return s.isLeaving = !0, u.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete u.afterLeave, d = void 0;
          }, Cs(o);
        a === "in-out" && c.type !== Re ? u.delayLeave = (m, v, g) => {
          const x = pi(
            s,
            d
          );
          x[String(d.key)] = d, m[rt] = () => {
            v(), m[rt] = void 0, delete f.delayedLeave, d = void 0;
          }, f.delayedLeave = () => {
            g(), delete f.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return o;
    };
  }
};
function ui(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Re) {
        t = n;
        break;
      }
  }
  return t;
}
const ul = fl;
function pi(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function Bs(e, t, n, s, r) {
  const {
    appear: o,
    mode: i,
    persisted: a = !1,
    onBeforeEnter: c,
    onEnter: f,
    onAfterEnter: d,
    onEnterCancelled: u,
    onBeforeLeave: m,
    onLeave: v,
    onAfterLeave: g,
    onLeaveCancelled: x,
    onBeforeAppear: b,
    onAppear: E,
    onAfterAppear: F,
    onAppearCancelled: H
  } = t, j = String(e.key), U = pi(n, e), P = (L, X) => {
    L && Xe(
      L,
      s,
      9,
      X
    );
  }, M = (L, X) => {
    const re = X[1];
    P(L, X), q(L) ? L.every((B) => B.length <= 1) && re() : L.length <= 1 && re();
  }, se = {
    mode: i,
    persisted: a,
    beforeEnter(L) {
      let X = c;
      if (!n.isMounted)
        if (o)
          X = b || c;
        else
          return;
      L[rt] && L[rt](
        !0
        /* cancelled */
      );
      const re = U[j];
      re && Ot(e, re) && re.el[rt] && re.el[rt](), P(X, [L]);
    },
    enter(L) {
      let X = f, re = d, B = u;
      if (!n.isMounted)
        if (o)
          X = E || f, re = F || d, B = H || u;
        else
          return;
      let ne = !1;
      L[Qt] = (Oe) => {
        ne || (ne = !0, Oe ? P(B, [L]) : P(re, [L]), se.delayedLeave && se.delayedLeave(), L[Qt] = void 0);
      };
      const he = L[Qt].bind(null, !1);
      X ? M(X, [L, he]) : he();
    },
    leave(L, X) {
      const re = String(e.key);
      if (L[Qt] && L[Qt](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      P(m, [L]);
      let B = !1;
      L[rt] = (he) => {
        B || (B = !0, X(), he ? P(x, [L]) : P(g, [L]), L[rt] = void 0, U[re] === e && delete U[re]);
      };
      const ne = L[rt].bind(null, !1);
      U[re] = e, v ? M(v, [L, ne]) : ne();
    },
    clone(L) {
      const X = Bs(
        L,
        t,
        n,
        s,
        r
      );
      return r && r(X), X;
    }
  };
  return se;
}
function Cs(e) {
  if (as(e))
    return e = Ct(e), e.children = null, e;
}
function Or(e) {
  if (!as(e))
    return ci(e.type) && e.children ? ui(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && Y(n.default))
      return n.default();
  }
}
function hn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, hn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function hi(e, t = !1, n) {
  let s = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === fe ? (i.patchFlag & 128 && r++, s = s.concat(
      hi(i.children, t, a)
    )) : (t || i.type !== Re) && s.push(a != null ? Ct(i, { key: a }) : i);
  }
  if (r > 1)
    for (let o = 0; o < s.length; o++)
      s[o].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function pl(e, t) {
  return Y(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    xe({ name: e.name }, t, { setup: e })
  ) : e;
}
function mi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Pr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Wn = /* @__PURE__ */ new WeakMap();
function an(e, t, n, s, r = !1) {
  if (q(e)) {
    e.forEach(
      (x, b) => an(
        x,
        t && (q(t) ? t[b] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (ln(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && an(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? fs(s.component) : s.el, i = r ? null : o, { i: a, r: c } = e, f = t && t.r, d = a.refs === pe ? a.refs = {} : a.refs, u = a.setupState, m = /* @__PURE__ */ oe(u), v = u === pe ? $o : (x) => Pr(d, x) ? !1 : ie(m, x), g = (x, b) => !(b && Pr(d, b));
  if (f != null && f !== c) {
    if (Dr(t), ke(f))
      d[f] = null, v(f) && (u[f] = null);
    else if (/* @__PURE__ */ Ee(f)) {
      const x = t;
      g(f, x.k) && (f.value = null), x.k && (d[x.k] = null);
    }
  }
  if (Y(c))
    yn(c, a, 12, [i, d]);
  else {
    const x = ke(c), b = /* @__PURE__ */ Ee(c);
    if (x || b) {
      const E = () => {
        if (e.f) {
          const F = x ? v(c) ? u[c] : d[c] : g() || !e.k ? c.value : d[e.k];
          if (r)
            q(F) && Qs(F, o);
          else if (q(F))
            F.includes(o) || F.push(o);
          else if (x)
            d[c] = [o], v(c) && (u[c] = d[c]);
          else {
            const H = [o];
            g(c, e.k) && (c.value = H), e.k && (d[e.k] = H);
          }
        } else x ? (d[c] = i, v(c) && (u[c] = i)) : b && (g(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const F = () => {
          E(), Wn.delete(e);
        };
        F.id = -1, Wn.set(e, F), Me(F, n);
      } else
        Dr(e), E();
    }
  }
}
function Dr(e) {
  const t = Wn.get(e);
  t && (t.flags |= 8, Wn.delete(e));
}
ss().requestIdleCallback;
ss().cancelIdleCallback;
const ln = (e) => !!e.type.__asyncLoader, as = (e) => e.type.__isKeepAlive;
function hl(e, t) {
  gi(e, "a", t);
}
function ml(e, t) {
  gi(e, "da", t);
}
function gi(e, t, n = $e) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (ls(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      as(r.parent.vnode) && gl(s, t, n, r), r = r.parent;
  }
}
function gl(e, t, n, s) {
  const r = ls(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  ur(() => {
    Qs(s[t], r);
  }, n);
}
function ls(e, t, n = $e, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      ht();
      const a = _n(n), c = Xe(t, n, e, i);
      return a(), mt(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const bt = (e) => (t, n = $e) => {
  (!gn || e === "sp") && ls(e, (...s) => t(...s), n);
}, bl = bt("bm"), wn = bt("m"), vl = bt(
  "bu"
), xl = bt("u"), bi = bt(
  "bum"
), ur = bt("um"), yl = bt(
  "sp"
), wl = bt("rtg"), _l = bt("rtc");
function kl(e, t = $e) {
  ls("ec", e, t);
}
const Cl = /* @__PURE__ */ Symbol.for("v-ndc");
function Ne(e, t, n, s) {
  let r;
  const o = n, i = q(e);
  if (i || ke(e)) {
    const a = i && /* @__PURE__ */ Mt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ Ke(e), f = /* @__PURE__ */ gt(e), e = rs(e)), r = new Array(e.length);
    for (let d = 0, u = e.length; d < u; d++)
      r[d] = t(
        c ? f ? qt(Ye(e[d])) : Ye(e[d]) : e[d],
        d,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, o);
  } else if (ce(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (a, c) => t(a, c, void 0, o)
      );
    else {
      const a = Object.keys(e);
      r = new Array(a.length);
      for (let c = 0, f = a.length; c < f; c++) {
        const d = a[c];
        r[c] = t(e[d], d, c, o);
      }
    }
  else
    r = [];
  return r;
}
const zs = (e) => e ? Ii(e) ? fs(e) : zs(e.parent) : null, cn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => zs(e.parent),
    $root: (e) => zs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => xi(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      fr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = qn.bind(e.proxy)),
    $watch: (e) => ll.bind(e)
  })
), Ss = (e, t) => e !== pe && !e.__isScriptSetup && ie(e, t), Sl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: a, appContext: c } = e;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Ss(s, t))
          return i[t] = 1, s[t];
        if (r !== pe && ie(r, t))
          return i[t] = 2, r[t];
        if (ie(o, t))
          return i[t] = 3, o[t];
        if (n !== pe && ie(n, t))
          return i[t] = 4, n[t];
        Us && (i[t] = 0);
      }
    }
    const f = cn[t];
    let d, u;
    if (f)
      return t === "$attrs" && Ce(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== pe && ie(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = c.config.globalProperties, ie(u, t)
    )
      return u[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ss(r, t) ? (r[t] = n, !0) : s !== pe && ie(s, t) ? (s[t] = n, !0) : ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: o, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== pe && a[0] !== "$" && ie(e, a) || Ss(t, a) || ie(o, a) || ie(s, a) || ie(cn, a) || ie(r.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Mr(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Us = !0;
function El(e) {
  const t = xi(e), n = e.proxy, s = e.ctx;
  Us = !1, t.beforeCreate && jr(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: a,
    provide: c,
    inject: f,
    // lifecycle
    created: d,
    beforeMount: u,
    mounted: m,
    beforeUpdate: v,
    updated: g,
    activated: x,
    deactivated: b,
    beforeDestroy: E,
    beforeUnmount: F,
    destroyed: H,
    unmounted: j,
    render: U,
    renderTracked: P,
    renderTriggered: M,
    errorCaptured: se,
    serverPrefetch: L,
    // public API
    expose: X,
    inheritAttrs: re,
    // assets
    components: B,
    directives: ne,
    filters: he
  } = t;
  if (f && Tl(f, s, null), i)
    for (const ue in i) {
      const z = i[ue];
      Y(z) && (s[ue] = z.bind(n));
    }
  if (r) {
    const ue = r.call(n, n);
    ce(ue) && (e.data = /* @__PURE__ */ lr(ue));
  }
  if (Us = !0, o)
    for (const ue in o) {
      const z = o[ue], O = Y(z) ? z.bind(n, n) : Y(z.get) ? z.get.bind(n, n) : it, G = !Y(z) && Y(z.set) ? z.set.bind(n) : it, Z = we({
        get: O,
        set: G
      });
      Object.defineProperty(s, ue, {
        enumerable: !0,
        configurable: !0,
        get: () => Z.value,
        set: (be) => Z.value = be
      });
    }
  if (a)
    for (const ue in a)
      vi(a[ue], s, n, ue);
  if (c) {
    const ue = Y(c) ? c.call(n) : c;
    Reflect.ownKeys(ue).forEach((z) => {
      ol(z, ue[z]);
    });
  }
  d && jr(d, e, "c");
  function ee(ue, z) {
    q(z) ? z.forEach((O) => ue(O.bind(n))) : z && ue(z.bind(n));
  }
  if (ee(bl, u), ee(wn, m), ee(vl, v), ee(xl, g), ee(hl, x), ee(ml, b), ee(kl, se), ee(_l, P), ee(wl, M), ee(bi, F), ee(ur, j), ee(yl, L), q(X))
    if (X.length) {
      const ue = e.exposed || (e.exposed = {});
      X.forEach((z) => {
        Object.defineProperty(ue, z, {
          get: () => n[z],
          set: (O) => n[z] = O,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  U && e.render === it && (e.render = U), re != null && (e.inheritAttrs = re), B && (e.components = B), ne && (e.directives = ne), L && mi(e);
}
function Tl(e, t, n = it) {
  q(e) && (e = Hs(e));
  for (const s in e) {
    const r = e[s];
    let o;
    ce(r) ? "default" in r ? o = jn(
      r.from || s,
      r.default,
      !0
    ) : o = jn(r.from || s) : o = jn(r), /* @__PURE__ */ Ee(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function jr(e, t, n) {
  Xe(
    q(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function vi(e, t, n, s) {
  let r = s.includes(".") ? li(n, s) : () => n[s];
  if (ke(e)) {
    const o = t[e];
    Y(o) && Nn(r, o);
  } else if (Y(e))
    Nn(r, e.bind(n));
  else if (ce(e))
    if (q(e))
      e.forEach((o) => vi(o, t, n, s));
    else {
      const o = Y(e.handler) ? e.handler.bind(n) : t[e.handler];
      Y(o) && Nn(r, o, e);
    }
}
function xi(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let c;
  return a ? c = a : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (f) => Jn(c, f, i, !0)
  ), Jn(c, t, i)), ce(t) && o.set(t, c), c;
}
function Jn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Jn(e, o, n, !0), r && r.forEach(
    (i) => Jn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const a = Al[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Al = {
  data: Nr,
  props: Fr,
  emits: Fr,
  // objects
  methods: nn,
  computed: nn,
  // lifecycle
  beforeCreate: Te,
  created: Te,
  beforeMount: Te,
  mounted: Te,
  beforeUpdate: Te,
  updated: Te,
  beforeDestroy: Te,
  beforeUnmount: Te,
  destroyed: Te,
  unmounted: Te,
  activated: Te,
  deactivated: Te,
  errorCaptured: Te,
  serverPrefetch: Te,
  // assets
  components: nn,
  directives: nn,
  // watch
  watch: $l,
  // provide / inject
  provide: Nr,
  inject: Rl
};
function Nr(e, t) {
  return t ? e ? function() {
    return xe(
      Y(e) ? e.call(this, this) : e,
      Y(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rl(e, t) {
  return nn(Hs(e), Hs(t));
}
function Hs(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nn(e, t) {
  return e ? xe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Fr(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : xe(
    /* @__PURE__ */ Object.create(null),
    Mr(e),
    Mr(t ?? {})
  ) : t;
}
function $l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = xe(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Te(e[s], t[s]);
  return n;
}
function yi() {
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
function Pl(e, t) {
  return function(s, r = null) {
    Y(s) || (s = xe({}, s)), r != null && !ce(r) && (r = null);
    const o = yi(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = o.app = {
      _uid: Ol++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: dc,
      get config() {
        return o.config;
      },
      set config(d) {
      },
      use(d, ...u) {
        return i.has(d) || (d && Y(d.install) ? (i.add(d), d.install(f, ...u)) : Y(d) && (i.add(d), d(f, ...u))), f;
      },
      mixin(d) {
        return o.mixins.includes(d) || o.mixins.push(d), f;
      },
      component(d, u) {
        return u ? (o.components[d] = u, f) : o.components[d];
      },
      directive(d, u) {
        return u ? (o.directives[d] = u, f) : o.directives[d];
      },
      mount(d, u, m) {
        if (!c) {
          const v = f._ceVNode || _e(s, r);
          return v.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(v, d, m), c = !0, f._container = d, d.__vue_app__ = f, fs(v.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        c && (Xe(
          a,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, u) {
        return o.provides[d] = u, f;
      },
      runWithContext(d) {
        const u = Vt;
        Vt = f;
        try {
          return d();
        } finally {
          Vt = u;
        }
      }
    };
    return f;
  };
}
let Vt = null;
const Dl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Be(t)}Modifiers`];
function Ml(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || pe;
  let r = n;
  const o = t.startsWith("update:"), i = o && Dl(s, t.slice(7));
  i && (i.trim && (r = n.map((d) => ke(d) ? d.trim() : d)), i.number && (r = n.map(tr)));
  let a, c = s[a = xs(t)] || // also try camelCase event handler (#2249)
  s[a = xs(Je(t))];
  !c && o && (c = s[a = xs(Be(t))]), c && Xe(
    c,
    e,
    6,
    r
  );
  const f = s[a + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Xe(
      f,
      e,
      6,
      r
    );
  }
}
const jl = /* @__PURE__ */ new WeakMap();
function wi(e, t, n = !1) {
  const s = n ? jl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!Y(e)) {
    const c = (f) => {
      const d = wi(f, t, !0);
      d && (a = !0, xe(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !a ? (ce(e) && s.set(e, null), null) : (q(o) ? o.forEach((c) => i[c] = null) : xe(i, o), ce(e) && s.set(e, i), i);
}
function cs(e, t) {
  return !e || !es(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Be(t)) || ie(e, t));
}
function Ir(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: a,
    emit: c,
    render: f,
    renderCache: d,
    props: u,
    data: m,
    setupState: v,
    ctx: g,
    inheritAttrs: x
  } = e, b = Kn(e);
  let E, F;
  try {
    if (n.shapeFlag & 4) {
      const j = r || s, U = j;
      E = ot(
        f.call(
          U,
          j,
          d,
          u,
          v,
          m,
          g
        )
      ), F = a;
    } else {
      const j = t;
      E = ot(
        j.length > 1 ? j(
          u,
          { attrs: a, slots: i, emit: c }
        ) : j(
          u,
          null
        )
      ), F = t.props ? a : Nl(a);
    }
  } catch (j) {
    dn.length = 0, os(j, e, 1), E = _e(Re);
  }
  let H = E;
  if (F && x !== !1) {
    const j = Object.keys(F), { shapeFlag: U } = H;
    j.length && U & 7 && (o && j.some(Zs) && (F = Fl(
      F,
      o
    )), H = Ct(H, F, !1, !0));
  }
  return n.dirs && (H = Ct(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && hn(H, n.transition), E = H, Kn(b), E;
}
const Nl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || es(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Fl = (e, t) => {
  const n = {};
  for (const s in e)
    (!Zs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Il(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: a, patchFlag: c } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Lr(s, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let u = 0; u < d.length; u++) {
        const m = d[u];
        if (_i(i, s, m) && !cs(f, m))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === i ? !1 : s ? i ? Lr(s, i, f) : !0 : !!i;
  return !1;
}
function Lr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (_i(t, e, o) && !cs(n, o))
      return !0;
  }
  return !1;
}
function _i(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && ce(s) && ce(r) ? !nr(s, r) : s !== r;
}
function Ll({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ki = {}, Ci = () => Object.create(ki), Si = (e) => Object.getPrototypeOf(e) === ki;
function Bl(e, t, n, s = !1) {
  const r = {}, o = Ci();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ei(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ Wa(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function zl(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ oe(r), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let u = 0; u < d.length; u++) {
        let m = d[u];
        if (cs(e.emitsOptions, m))
          continue;
        const v = t[m];
        if (c)
          if (ie(o, m))
            v !== o[m] && (o[m] = v, f = !0);
          else {
            const g = Je(m);
            r[g] = Vs(
              c,
              a,
              g,
              v,
              e,
              !1
            );
          }
        else
          v !== o[m] && (o[m] = v, f = !0);
      }
    }
  } else {
    Ei(e, t, r, o) && (f = !0);
    let d;
    for (const u in a)
      (!t || // for camelCase
      !ie(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Be(u)) === u || !ie(t, d))) && (c ? n && // for camelCase
      (n[u] !== void 0 || // for kebab-case
      n[d] !== void 0) && (r[u] = Vs(
        c,
        a,
        u,
        void 0,
        e,
        !0
      )) : delete r[u]);
    if (o !== a)
      for (const u in o)
        (!t || !ie(t, u)) && (delete o[u], f = !0);
  }
  f && ut(e.attrs, "set", "");
}
function Ei(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (sn(c))
        continue;
      const f = t[c];
      let d;
      r && ie(r, d = Je(c)) ? !o || !o.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : cs(e.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, i = !0);
    }
  if (o) {
    const c = /* @__PURE__ */ oe(n), f = a || pe;
    for (let d = 0; d < o.length; d++) {
      const u = o[d];
      n[u] = Vs(
        r,
        c,
        u,
        f[u],
        e,
        !ie(f, u)
      );
    }
  }
  return i;
}
function Vs(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const a = ie(i, "default");
    if (a && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && Y(c)) {
        const { propsDefaults: f } = r;
        if (n in f)
          s = f[n];
        else {
          const d = _n(r);
          s = f[n] = c.call(
            null,
            t
          ), d();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !a ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Be(n)) && (s = !0));
  }
  return s;
}
const Ul = /* @__PURE__ */ new WeakMap();
function Ti(e, t, n = !1) {
  const s = n ? Ul : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, a = [];
  let c = !1;
  if (!Y(e)) {
    const d = (u) => {
      c = !0;
      const [m, v] = Ti(u, t, !0);
      xe(i, m), v && a.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!o && !c)
    return ce(e) && s.set(e, zt), zt;
  if (q(o))
    for (let d = 0; d < o.length; d++) {
      const u = Je(o[d]);
      Br(u) && (i[u] = pe);
    }
  else if (o)
    for (const d in o) {
      const u = Je(d);
      if (Br(u)) {
        const m = o[d], v = i[u] = q(m) || Y(m) ? { type: m } : xe({}, m), g = v.type;
        let x = !1, b = !0;
        if (q(g))
          for (let E = 0; E < g.length; ++E) {
            const F = g[E], H = Y(F) && F.name;
            if (H === "Boolean") {
              x = !0;
              break;
            } else H === "String" && (b = !1);
          }
        else
          x = Y(g) && g.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = x, v[
          1
          /* shouldCastTrue */
        ] = b, (x || ie(v, "default")) && a.push(u);
      }
    }
  const f = [i, a];
  return ce(e) && s.set(e, f), f;
}
function Br(e) {
  return e[0] !== "$" && !sn(e);
}
const pr = (e) => e === "_" || e === "_ctx" || e === "$stable", hr = (e) => q(e) ? e.map(ot) : [ot(e)], Hl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Kt((...r) => hr(t(...r)), n);
  return s._c = !1, s;
}, Ai = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (pr(r)) continue;
    const o = e[r];
    if (Y(o))
      t[r] = Hl(r, o, s);
    else if (o != null) {
      const i = hr(o);
      t[r] = () => i;
    }
  }
}, Ri = (e, t) => {
  const n = hr(t);
  e.slots.default = () => n;
}, $i = (e, t, n) => {
  for (const s in t)
    (n || !pr(s)) && (e[s] = t[s]);
}, Vl = (e, t, n) => {
  const s = e.slots = Ci();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? ($i(s, t, n), n && jo(s, "_", r, !0)) : Ai(t, s);
  } else t && Ri(e, t);
}, ql = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = pe;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? o = !1 : $i(r, t, n) : (o = !t.$stable, Ai(t, r)), i = t;
  } else t && (Ri(e, t), i = { default: 1 });
  if (o)
    for (const a in r)
      !pr(a) && i[a] == null && delete r[a];
}, Me = Yl;
function Kl(e) {
  return Wl(e);
}
function Wl(e, t) {
  const n = ss();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: a,
    createComment: c,
    setText: f,
    setElementText: d,
    parentNode: u,
    nextSibling: m,
    setScopeId: v = it,
    insertStaticContent: g
  } = e, x = (p, h, w, T = null, _ = null, k = null, N = void 0, D = null, R = !!h.dynamicChildren) => {
    if (p === h)
      return;
    p && !Ot(p, h) && (T = Rn(p), be(p, _, k, !0), p = null), h.patchFlag === -2 && (R = !1, h.dynamicChildren = null);
    const { type: C, ref: K, shapeFlag: I } = h;
    switch (C) {
      case ds:
        b(p, h, w, T);
        break;
      case Re:
        E(p, h, w, T);
        break;
      case Fn:
        p == null && F(h, w, T, N);
        break;
      case fe:
        B(
          p,
          h,
          w,
          T,
          _,
          k,
          N,
          D,
          R
        );
        break;
      default:
        I & 1 ? U(
          p,
          h,
          w,
          T,
          _,
          k,
          N,
          D,
          R
        ) : I & 6 ? ne(
          p,
          h,
          w,
          T,
          _,
          k,
          N,
          D,
          R
        ) : (I & 64 || I & 128) && C.process(
          p,
          h,
          w,
          T,
          _,
          k,
          N,
          D,
          R,
          Yt
        );
    }
    K != null && _ ? an(K, p && p.ref, k, h || p, !h) : K == null && p && p.ref != null && an(p.ref, null, k, p, !0);
  }, b = (p, h, w, T) => {
    if (p == null)
      s(
        h.el = a(h.children),
        w,
        T
      );
    else {
      const _ = h.el = p.el;
      h.children !== p.children && f(_, h.children);
    }
  }, E = (p, h, w, T) => {
    p == null ? s(
      h.el = c(h.children || ""),
      w,
      T
    ) : h.el = p.el;
  }, F = (p, h, w, T) => {
    [p.el, p.anchor] = g(
      p.children,
      h,
      w,
      T,
      p.el,
      p.anchor
    );
  }, H = ({ el: p, anchor: h }, w, T) => {
    let _;
    for (; p && p !== h; )
      _ = m(p), s(p, w, T), p = _;
    s(h, w, T);
  }, j = ({ el: p, anchor: h }) => {
    let w;
    for (; p && p !== h; )
      w = m(p), r(p), p = w;
    r(h);
  }, U = (p, h, w, T, _, k, N, D, R) => {
    if (h.type === "svg" ? N = "svg" : h.type === "math" && (N = "mathml"), p == null)
      P(
        h,
        w,
        T,
        _,
        k,
        N,
        D,
        R
      );
    else {
      const C = p.el && p.el._isVueCE ? p.el : null;
      try {
        C && C._beginPatch(), L(
          p,
          h,
          _,
          k,
          N,
          D,
          R
        );
      } finally {
        C && C._endPatch();
      }
    }
  }, P = (p, h, w, T, _, k, N, D) => {
    let R, C;
    const { props: K, shapeFlag: I, transition: V, dirs: J } = p;
    if (R = p.el = i(
      p.type,
      k,
      K && K.is,
      K
    ), I & 8 ? d(R, p.children) : I & 16 && se(
      p.children,
      R,
      null,
      T,
      _,
      Es(p, k),
      N,
      D
    ), J && Et(p, null, T, "created"), M(R, p, p.scopeId, N, T), K) {
      for (const me in K)
        me !== "value" && !sn(me) && o(R, me, null, K[me], k, T);
      "value" in K && o(R, "value", null, K.value, k), (C = K.onVnodeBeforeMount) && nt(C, T, p);
    }
    J && Et(p, null, T, "beforeMount");
    const te = Jl(_, V);
    te && V.beforeEnter(R), s(R, h, w), ((C = K && K.onVnodeMounted) || te || J) && Me(() => {
      C && nt(C, T, p), te && V.enter(R), J && Et(p, null, T, "mounted");
    }, _);
  }, M = (p, h, w, T, _) => {
    if (w && v(p, w), T)
      for (let k = 0; k < T.length; k++)
        v(p, T[k]);
    if (_) {
      let k = _.subTree;
      if (h === k || Mi(k.type) && (k.ssContent === h || k.ssFallback === h)) {
        const N = _.vnode;
        M(
          p,
          N,
          N.scopeId,
          N.slotScopeIds,
          _.parent
        );
      }
    }
  }, se = (p, h, w, T, _, k, N, D, R = 0) => {
    for (let C = R; C < p.length; C++) {
      const K = p[C] = D ? ft(p[C]) : ot(p[C]);
      x(
        null,
        K,
        h,
        w,
        T,
        _,
        k,
        N,
        D
      );
    }
  }, L = (p, h, w, T, _, k, N) => {
    const D = h.el = p.el;
    let { patchFlag: R, dynamicChildren: C, dirs: K } = h;
    R |= p.patchFlag & 16;
    const I = p.props || pe, V = h.props || pe;
    let J;
    if (w && Tt(w, !1), (J = V.onVnodeBeforeUpdate) && nt(J, w, h, p), K && Et(h, p, w, "beforeUpdate"), w && Tt(w, !0), (I.innerHTML && V.innerHTML == null || I.textContent && V.textContent == null) && d(D, ""), C ? X(
      p.dynamicChildren,
      C,
      D,
      w,
      T,
      Es(h, _),
      k
    ) : N || z(
      p,
      h,
      D,
      null,
      w,
      T,
      Es(h, _),
      k,
      !1
    ), R > 0) {
      if (R & 16)
        re(D, I, V, w, _);
      else if (R & 2 && I.class !== V.class && o(D, "class", null, V.class, _), R & 4 && o(D, "style", I.style, V.style, _), R & 8) {
        const te = h.dynamicProps;
        for (let me = 0; me < te.length; me++) {
          const de = te[me], Pe = I[de], De = V[de];
          (De !== Pe || de === "value") && o(D, de, Pe, De, _, w);
        }
      }
      R & 1 && p.children !== h.children && d(D, h.children);
    } else !N && C == null && re(D, I, V, w, _);
    ((J = V.onVnodeUpdated) || K) && Me(() => {
      J && nt(J, w, h, p), K && Et(h, p, w, "updated");
    }, T);
  }, X = (p, h, w, T, _, k, N) => {
    for (let D = 0; D < h.length; D++) {
      const R = p[D], C = h[D], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ot(R, C) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? u(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
        )
      );
      x(
        R,
        C,
        K,
        null,
        T,
        _,
        k,
        N,
        !0
      );
    }
  }, re = (p, h, w, T, _) => {
    if (h !== w) {
      if (h !== pe)
        for (const k in h)
          !sn(k) && !(k in w) && o(
            p,
            k,
            h[k],
            null,
            _,
            T
          );
      for (const k in w) {
        if (sn(k)) continue;
        const N = w[k], D = h[k];
        N !== D && k !== "value" && o(p, k, D, N, _, T);
      }
      "value" in w && o(p, "value", h.value, w.value, _);
    }
  }, B = (p, h, w, T, _, k, N, D, R) => {
    const C = h.el = p ? p.el : a(""), K = h.anchor = p ? p.anchor : a("");
    let { patchFlag: I, dynamicChildren: V, slotScopeIds: J } = h;
    J && (D = D ? D.concat(J) : J), p == null ? (s(C, w, T), s(K, w, T), se(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      w,
      K,
      _,
      k,
      N,
      D,
      R
    )) : I > 0 && I & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (X(
      p.dynamicChildren,
      V,
      w,
      _,
      k,
      N,
      D
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || _ && h === _.subTree) && Oi(
      p,
      h,
      !0
      /* shallow */
    )) : z(
      p,
      h,
      w,
      K,
      _,
      k,
      N,
      D,
      R
    );
  }, ne = (p, h, w, T, _, k, N, D, R) => {
    h.slotScopeIds = D, p == null ? h.shapeFlag & 512 ? _.ctx.activate(
      h,
      w,
      T,
      N,
      R
    ) : he(
      h,
      w,
      T,
      _,
      k,
      N,
      R
    ) : Oe(p, h, R);
  }, he = (p, h, w, T, _, k, N) => {
    const D = p.component = sc(
      p,
      T,
      _
    );
    if (as(p) && (D.ctx.renderer = Yt), rc(D, !1, N), D.asyncDep) {
      if (_ && _.registerDep(D, ee, N), !p.el) {
        const R = D.subTree = _e(Re);
        E(null, R, h, w), p.placeholder = R.el;
      }
    } else
      ee(
        D,
        p,
        h,
        w,
        _,
        k,
        N
      );
  }, Oe = (p, h, w) => {
    const T = h.component = p.component;
    if (Il(p, h, w))
      if (T.asyncDep && !T.asyncResolved) {
        ue(T, h, w);
        return;
      } else
        T.next = h, T.update();
    else
      h.el = p.el, T.vnode = h;
  }, ee = (p, h, w, T, _, k, N) => {
    const D = () => {
      if (p.isMounted) {
        let { next: I, bu: V, u: J, parent: te, vnode: me } = p;
        {
          const et = Pi(p);
          if (et) {
            I && (I.el = me.el, ue(p, I, N)), et.asyncDep.then(() => {
              Me(() => {
                p.isUnmounted || C();
              }, _);
            });
            return;
          }
        }
        let de = I, Pe;
        Tt(p, !1), I ? (I.el = me.el, ue(p, I, N)) : I = me, V && Mn(V), (Pe = I.props && I.props.onVnodeBeforeUpdate) && nt(Pe, te, I, me), Tt(p, !0);
        const De = Ir(p), Qe = p.subTree;
        p.subTree = De, x(
          Qe,
          De,
          // parent may have changed if it's in a teleport
          u(Qe.el),
          // anchor may have changed if it's in a fragment
          Rn(Qe),
          p,
          _,
          k
        ), I.el = De.el, de === null && Ll(p, De.el), J && Me(J, _), (Pe = I.props && I.props.onVnodeUpdated) && Me(
          () => nt(Pe, te, I, me),
          _
        );
      } else {
        let I;
        const { el: V, props: J } = h, { bm: te, m: me, parent: de, root: Pe, type: De } = p, Qe = ln(h);
        Tt(p, !1), te && Mn(te), !Qe && (I = J && J.onVnodeBeforeMount) && nt(I, de, h), Tt(p, !0);
        {
          Pe.ce && Pe.ce._hasShadowRoot() && Pe.ce._injectChildStyle(De);
          const et = p.subTree = Ir(p);
          x(
            null,
            et,
            w,
            T,
            p,
            _,
            k
          ), h.el = et.el;
        }
        if (me && Me(me, _), !Qe && (I = J && J.onVnodeMounted)) {
          const et = h;
          Me(
            () => nt(I, de, et),
            _
          );
        }
        (h.shapeFlag & 256 || de && ln(de.vnode) && de.vnode.shapeFlag & 256) && p.a && Me(p.a, _), p.isMounted = !0, h = w = T = null;
      }
    };
    p.scope.on();
    const R = p.effect = new Lo(D);
    p.scope.off();
    const C = p.update = R.run.bind(R), K = p.job = R.runIfDirty.bind(R);
    K.i = p, K.id = p.uid, R.scheduler = () => fr(K), Tt(p, !0), C();
  }, ue = (p, h, w) => {
    h.component = p;
    const T = p.vnode.props;
    p.vnode = h, p.next = null, zl(p, h.props, T, w), ql(p, h.children, w), ht(), $r(p), mt();
  }, z = (p, h, w, T, _, k, N, D, R = !1) => {
    const C = p && p.children, K = p ? p.shapeFlag : 0, I = h.children, { patchFlag: V, shapeFlag: J } = h;
    if (V > 0) {
      if (V & 128) {
        G(
          C,
          I,
          w,
          T,
          _,
          k,
          N,
          D,
          R
        );
        return;
      } else if (V & 256) {
        O(
          C,
          I,
          w,
          T,
          _,
          k,
          N,
          D,
          R
        );
        return;
      }
    }
    J & 8 ? (K & 16 && Gt(C, _, k), I !== C && d(w, I)) : K & 16 ? J & 16 ? G(
      C,
      I,
      w,
      T,
      _,
      k,
      N,
      D,
      R
    ) : Gt(C, _, k, !0) : (K & 8 && d(w, ""), J & 16 && se(
      I,
      w,
      T,
      _,
      k,
      N,
      D,
      R
    ));
  }, O = (p, h, w, T, _, k, N, D, R) => {
    p = p || zt, h = h || zt;
    const C = p.length, K = h.length, I = Math.min(C, K);
    let V;
    for (V = 0; V < I; V++) {
      const J = h[V] = R ? ft(h[V]) : ot(h[V]);
      x(
        p[V],
        J,
        w,
        null,
        _,
        k,
        N,
        D,
        R
      );
    }
    C > K ? Gt(
      p,
      _,
      k,
      !0,
      !1,
      I
    ) : se(
      h,
      w,
      T,
      _,
      k,
      N,
      D,
      R,
      I
    );
  }, G = (p, h, w, T, _, k, N, D, R) => {
    let C = 0;
    const K = h.length;
    let I = p.length - 1, V = K - 1;
    for (; C <= I && C <= V; ) {
      const J = p[C], te = h[C] = R ? ft(h[C]) : ot(h[C]);
      if (Ot(J, te))
        x(
          J,
          te,
          w,
          null,
          _,
          k,
          N,
          D,
          R
        );
      else
        break;
      C++;
    }
    for (; C <= I && C <= V; ) {
      const J = p[I], te = h[V] = R ? ft(h[V]) : ot(h[V]);
      if (Ot(J, te))
        x(
          J,
          te,
          w,
          null,
          _,
          k,
          N,
          D,
          R
        );
      else
        break;
      I--, V--;
    }
    if (C > I) {
      if (C <= V) {
        const J = V + 1, te = J < K ? h[J].el : T;
        for (; C <= V; )
          x(
            null,
            h[C] = R ? ft(h[C]) : ot(h[C]),
            w,
            te,
            _,
            k,
            N,
            D,
            R
          ), C++;
      }
    } else if (C > V)
      for (; C <= I; )
        be(p[C], _, k, !0), C++;
    else {
      const J = C, te = C, me = /* @__PURE__ */ new Map();
      for (C = te; C <= V; C++) {
        const Le = h[C] = R ? ft(h[C]) : ot(h[C]);
        Le.key != null && me.set(Le.key, C);
      }
      let de, Pe = 0;
      const De = V - te + 1;
      let Qe = !1, et = 0;
      const Xt = new Array(De);
      for (C = 0; C < De; C++) Xt[C] = 0;
      for (C = J; C <= I; C++) {
        const Le = p[C];
        if (Pe >= De) {
          be(Le, _, k, !0);
          continue;
        }
        let tt;
        if (Le.key != null)
          tt = me.get(Le.key);
        else
          for (de = te; de <= V; de++)
            if (Xt[de - te] === 0 && Ot(Le, h[de])) {
              tt = de;
              break;
            }
        tt === void 0 ? be(Le, _, k, !0) : (Xt[tt - te] = C + 1, tt >= et ? et = tt : Qe = !0, x(
          Le,
          h[tt],
          w,
          null,
          _,
          k,
          N,
          D,
          R
        ), Pe++);
      }
      const kr = Qe ? Gl(Xt) : zt;
      for (de = kr.length - 1, C = De - 1; C >= 0; C--) {
        const Le = te + C, tt = h[Le], Cr = h[Le + 1], Sr = Le + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Cr.el || Di(Cr)
        ) : T;
        Xt[C] === 0 ? x(
          null,
          tt,
          w,
          Sr,
          _,
          k,
          N,
          D,
          R
        ) : Qe && (de < 0 || C !== kr[de] ? Z(tt, w, Sr, 2) : de--);
      }
    }
  }, Z = (p, h, w, T, _ = null) => {
    const { el: k, type: N, transition: D, children: R, shapeFlag: C } = p;
    if (C & 6) {
      Z(p.component.subTree, h, w, T);
      return;
    }
    if (C & 128) {
      p.suspense.move(h, w, T);
      return;
    }
    if (C & 64) {
      N.move(p, h, w, Yt);
      return;
    }
    if (N === fe) {
      s(k, h, w);
      for (let I = 0; I < R.length; I++)
        Z(R[I], h, w, T);
      s(p.anchor, h, w);
      return;
    }
    if (N === Fn) {
      H(p, h, w);
      return;
    }
    if (T !== 2 && C & 1 && D)
      if (T === 0)
        D.beforeEnter(k), s(k, h, w), Me(() => D.enter(k), _);
      else {
        const { leave: I, delayLeave: V, afterLeave: J } = D, te = () => {
          p.ctx.isUnmounted ? r(k) : s(k, h, w);
        }, me = () => {
          k._isLeaving && k[rt](
            !0
            /* cancelled */
          ), I(k, () => {
            te(), J && J();
          });
        };
        V ? V(k, te, me) : me();
      }
    else
      s(k, h, w);
  }, be = (p, h, w, T = !1, _ = !1) => {
    const {
      type: k,
      props: N,
      ref: D,
      children: R,
      dynamicChildren: C,
      shapeFlag: K,
      patchFlag: I,
      dirs: V,
      cacheIndex: J
    } = p;
    if (I === -2 && (_ = !1), D != null && (ht(), an(D, null, w, p, !0), mt()), J != null && (h.renderCache[J] = void 0), K & 256) {
      h.ctx.deactivate(p);
      return;
    }
    const te = K & 1 && V, me = !ln(p);
    let de;
    if (me && (de = N && N.onVnodeBeforeUnmount) && nt(de, h, p), K & 6)
      An(p.component, w, T);
    else {
      if (K & 128) {
        p.suspense.unmount(w, T);
        return;
      }
      te && Et(p, null, h, "beforeUnmount"), K & 64 ? p.type.remove(
        p,
        h,
        w,
        Yt,
        T
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== fe || I > 0 && I & 64) ? Gt(
        C,
        h,
        w,
        !1,
        !0
      ) : (k === fe && I & 384 || !_ && K & 16) && Gt(R, h, w), T && St(p);
    }
    (me && (de = N && N.onVnodeUnmounted) || te) && Me(() => {
      de && nt(de, h, p), te && Et(p, null, h, "unmounted");
    }, w);
  }, St = (p) => {
    const { type: h, el: w, anchor: T, transition: _ } = p;
    if (h === fe) {
      Ft(w, T);
      return;
    }
    if (h === Fn) {
      j(p);
      return;
    }
    const k = () => {
      r(w), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (p.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: N, delayLeave: D } = _, R = () => N(w, k);
      D ? D(p.el, k, R) : R();
    } else
      k();
  }, Ft = (p, h) => {
    let w;
    for (; p !== h; )
      w = m(p), r(p), p = w;
    r(h);
  }, An = (p, h, w) => {
    const { bum: T, scope: _, job: k, subTree: N, um: D, m: R, a: C } = p;
    zr(R), zr(C), T && Mn(T), _.stop(), k && (k.flags |= 8, be(N, p, h, w)), D && Me(D, h), Me(() => {
      p.isUnmounted = !0;
    }, h);
  }, Gt = (p, h, w, T = !1, _ = !1, k = 0) => {
    for (let N = k; N < p.length; N++)
      be(p[N], h, w, T, _);
  }, Rn = (p) => {
    if (p.shapeFlag & 6)
      return Rn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const h = m(p.anchor || p.el), w = h && h[cl];
    return w ? m(w) : h;
  };
  let vs = !1;
  const _r = (p, h, w) => {
    let T;
    p == null ? h._vnode && (be(h._vnode, null, null, !0), T = h._vnode.component) : x(
      h._vnode || null,
      p,
      h,
      null,
      null,
      null,
      w
    ), h._vnode = p, vs || (vs = !0, $r(T), ri(), vs = !1);
  }, Yt = {
    p: x,
    um: be,
    m: Z,
    r: St,
    mt: he,
    mc: se,
    pc: z,
    pbc: X,
    n: Rn,
    o: e
  };
  return {
    render: _r,
    hydrate: void 0,
    createApp: Pl(_r)
  };
}
function Es({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Tt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Jl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Oi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (q(s) && q(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let a = r[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = ft(r[o]), a.el = i.el), !n && a.patchFlag !== -2 && Oi(i, a)), a.type === ds && (a.patchFlag === -1 && (a = r[o] = ft(a)), a.el = i.el), a.type === Re && !a.el && (a.el = i.el);
    }
}
function Gl(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, a;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (r = n[n.length - 1], e[r] < f) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        a = o + i >> 1, e[n[a]] < f ? o = a + 1 : i = a;
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
function Pi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Pi(t);
}
function zr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Di(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Di(t.subTree) : null;
}
const Mi = (e) => e.__isSuspense;
function Yl(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : rl(e);
}
const fe = /* @__PURE__ */ Symbol.for("v-fgt"), ds = /* @__PURE__ */ Symbol.for("v-txt"), Re = /* @__PURE__ */ Symbol.for("v-cmt"), Fn = /* @__PURE__ */ Symbol.for("v-stc"), dn = [];
let ze = null;
function A(e = !1) {
  dn.push(ze = e ? null : []);
}
function Xl() {
  dn.pop(), ze = dn[dn.length - 1] || null;
}
let mn = 1;
function Gn(e, t = !1) {
  mn += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function ji(e) {
  return e.dynamicChildren = mn > 0 ? ze || zt : null, Xl(), mn > 0 && ze && ze.push(e), e;
}
function $(e, t, n, s, r, o) {
  return ji(
    l(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Yn(e, t, n, s, r) {
  return ji(
    _e(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ot(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ni = ({ key: e }) => e ?? null, In = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ke(e) || /* @__PURE__ */ Ee(e) || Y(e) ? { i: Ve, r: e, k: t, f: !!n } : e : null);
function l(e, t = null, n = null, s = 0, r = null, o = e === fe ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ni(t),
    ref: t && In(t),
    scopeId: ii,
    slotScopeIds: null,
    children: n,
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
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ve
  };
  return a ? (mr(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= ke(n) ? 8 : 16), mn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ze.push(c), c;
}
const _e = Zl;
function Zl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Cl) && (e = Re), Xn(e)) {
    const a = Ct(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && mr(a, n), mn > 0 && !o && ze && (a.shapeFlag & 6 ? ze[ze.indexOf(e)] = a : ze.push(a)), a.patchFlag = -2, a;
  }
  if (lc(e) && (e = e.__vccOpts), t) {
    t = Ql(t);
    let { class: a, style: c } = t;
    a && !ke(a) && (t.class = ve(a)), ce(c) && (/* @__PURE__ */ dr(c) && !q(c) && (c = xe({}, c)), t.style = qe(c));
  }
  const i = ke(e) ? 1 : Mi(e) ? 128 : ci(e) ? 64 : ce(e) ? 4 : Y(e) ? 2 : 0;
  return l(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Ql(e) {
  return e ? /* @__PURE__ */ dr(e) || Si(e) ? xe({}, e) : e : null;
}
function Ct(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: a, transition: c } = e, f = t ? ec(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ni(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? q(o) ? o.concat(In(t)) : [o, In(t)] : In(t)
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
    patchFlag: t && e.type !== fe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Ct(e.ssContent),
    ssFallback: e.ssFallback && Ct(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && hn(
    d,
    c.clone(d)
  ), d;
}
function le(e = " ", t = 0) {
  return _e(ds, null, e, t);
}
function We(e, t) {
  const n = _e(Fn, null, e);
  return n.staticCount = t, n;
}
function ye(e = "", t = !1) {
  return t ? (A(), Yn(Re, null, e)) : _e(Re, null, e);
}
function ot(e) {
  return e == null || typeof e == "boolean" ? _e(Re) : q(e) ? _e(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Xn(e) ? ft(e) : _e(ds, null, String(e));
}
function ft(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ct(e);
}
function mr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), mr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Si(t) ? t._ctx = Ve : r === 3 && Ve && (Ve.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Y(t) ? (t = { default: t, _ctx: Ve }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [le(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ec(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ve([t.class, s.class]));
      else if (r === "style")
        t.style = qe([t.style, s.style]);
      else if (es(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(q(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function nt(e, t, n, s = null) {
  Xe(e, t, 7, [
    n,
    s
  ]);
}
const tc = yi();
let nc = 0;
function sc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || tc, o = {
    uid: nc++,
    vnode: e,
    type: s,
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
    scope: new Ta(
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
    propsOptions: Ti(s, r),
    emitsOptions: wi(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Ml.bind(null, o), e.ce && e.ce(o), o;
}
let $e = null;
const Fi = () => $e || Ve;
let Zn, qs;
{
  const e = ss(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Zn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => $e = n
  ), qs = t(
    "__VUE_SSR_SETTERS__",
    (n) => gn = n
  );
}
const _n = (e) => {
  const t = $e;
  return Zn(e), e.scope.on(), () => {
    e.scope.off(), Zn(t);
  };
}, Ur = () => {
  $e && $e.scope.off(), Zn(null);
};
function Ii(e) {
  return e.vnode.shapeFlag & 4;
}
let gn = !1;
function rc(e, t = !1, n = !1) {
  t && qs(t);
  const { props: s, children: r } = e.vnode, o = Ii(e);
  Bl(e, s, o, t), Vl(e, r, n || t);
  const i = o ? oc(e, t) : void 0;
  return t && qs(!1), i;
}
function oc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Sl);
  const { setup: s } = n;
  if (s) {
    ht();
    const r = e.setupContext = s.length > 1 ? ac(e) : null, o = _n(e), i = yn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = Po(i);
    if (mt(), o(), (a || e.sp) && !ln(e) && mi(e), a) {
      if (i.then(Ur, Ur), t)
        return i.then((c) => {
          Hr(e, c);
        }).catch((c) => {
          os(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Hr(e, i);
  } else
    Li(e);
}
function Hr(e, t, n) {
  Y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = ti(t)), Li(e);
}
function Li(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || it);
  {
    const r = _n(e);
    ht();
    try {
      El(e);
    } finally {
      mt(), r();
    }
  }
}
const ic = {
  get(e, t) {
    return Ce(e, "get", ""), e[t];
  }
};
function ac(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ic),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function fs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ti(Ja(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in cn)
        return cn[n](e);
    },
    has(t, n) {
      return n in t || n in cn;
    }
  })) : e.proxy;
}
function lc(e) {
  return Y(e) && "__vccOpts" in e;
}
const we = (e, t) => /* @__PURE__ */ Qa(e, t, gn);
function cc(e, t, n) {
  try {
    Gn(-1);
    const s = arguments.length;
    return s === 2 ? ce(t) && !q(t) ? Xn(t) ? _e(e, null, [t]) : _e(e, t) : _e(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Xn(n) && (n = [n]), _e(e, t, n));
  } finally {
    Gn(1);
  }
}
const dc = "3.5.28";
let Ks;
const Vr = typeof window < "u" && window.trustedTypes;
if (Vr)
  try {
    Ks = /* @__PURE__ */ Vr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Bi = Ks ? (e) => Ks.createHTML(e) : (e) => e, fc = "http://www.w3.org/2000/svg", uc = "http://www.w3.org/1998/Math/MathML", dt = typeof document < "u" ? document : null, qr = dt && /* @__PURE__ */ dt.createElement("template"), pc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? dt.createElementNS(fc, e) : t === "mathml" ? dt.createElementNS(uc, e) : n ? dt.createElement(e, { is: n }) : dt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => dt.createTextNode(e),
  createComment: (e) => dt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => dt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      qr.innerHTML = Bi(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = qr.content;
      if (s === "svg" || s === "mathml") {
        const c = a.firstChild;
        for (; c.firstChild; )
          a.appendChild(c.firstChild);
        a.removeChild(c);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, yt = "transition", en = "animation", bn = /* @__PURE__ */ Symbol("_vtc"), zi = {
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
}, hc = /* @__PURE__ */ xe(
  {},
  di,
  zi
), mc = (e) => (e.displayName = "Transition", e.props = hc, e), vn = /* @__PURE__ */ mc(
  (e, { slots: t }) => cc(ul, gc(e), t)
), At = (e, t = []) => {
  q(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Kr = (e) => e ? q(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function gc(e) {
  const t = {};
  for (const B in e)
    B in zi || (t[B] = e[B]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: r,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: a = `${n}-enter-to`,
    appearFromClass: c = o,
    appearActiveClass: f = i,
    appearToClass: d = a,
    leaveFromClass: u = `${n}-leave-from`,
    leaveActiveClass: m = `${n}-leave-active`,
    leaveToClass: v = `${n}-leave-to`
  } = e, g = bc(r), x = g && g[0], b = g && g[1], {
    onBeforeEnter: E,
    onEnter: F,
    onEnterCancelled: H,
    onLeave: j,
    onLeaveCancelled: U,
    onBeforeAppear: P = E,
    onAppear: M = F,
    onAppearCancelled: se = H
  } = t, L = (B, ne, he, Oe) => {
    B._enterCancelled = Oe, Rt(B, ne ? d : a), Rt(B, ne ? f : i), he && he();
  }, X = (B, ne) => {
    B._isLeaving = !1, Rt(B, u), Rt(B, v), Rt(B, m), ne && ne();
  }, re = (B) => (ne, he) => {
    const Oe = B ? M : F, ee = () => L(ne, B, he);
    At(Oe, [ne, ee]), Wr(() => {
      Rt(ne, B ? c : o), ct(ne, B ? d : a), Kr(Oe) || Jr(ne, s, x, ee);
    });
  };
  return xe(t, {
    onBeforeEnter(B) {
      At(E, [B]), ct(B, o), ct(B, i);
    },
    onBeforeAppear(B) {
      At(P, [B]), ct(B, c), ct(B, f);
    },
    onEnter: re(!1),
    onAppear: re(!0),
    onLeave(B, ne) {
      B._isLeaving = !0;
      const he = () => X(B, ne);
      ct(B, u), B._enterCancelled ? (ct(B, m), Xr(B)) : (Xr(B), ct(B, m)), Wr(() => {
        B._isLeaving && (Rt(B, u), ct(B, v), Kr(j) || Jr(B, s, b, he));
      }), At(j, [B, he]);
    },
    onEnterCancelled(B) {
      L(B, !1, void 0, !0), At(H, [B]);
    },
    onAppearCancelled(B) {
      L(B, !0, void 0, !0), At(se, [B]);
    },
    onLeaveCancelled(B) {
      X(B), At(U, [B]);
    }
  });
}
function bc(e) {
  if (e == null)
    return null;
  if (ce(e))
    return [Ts(e.enter), Ts(e.leave)];
  {
    const t = Ts(e);
    return [t, t];
  }
}
function Ts(e) {
  return Ms(e);
}
function ct(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[bn] || (e[bn] = /* @__PURE__ */ new Set())).add(t);
}
function Rt(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[bn];
  n && (n.delete(t), n.size || (e[bn] = void 0));
}
function Wr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let vc = 0;
function Jr(e, t, n, s) {
  const r = e._endId = ++vc, o = () => {
    r === e._endId && s();
  };
  if (n != null)
    return setTimeout(o, n);
  const { type: i, timeout: a, propCount: c } = xc(e, t);
  if (!i)
    return s();
  const f = i + "end";
  let d = 0;
  const u = () => {
    e.removeEventListener(f, m), o();
  }, m = (v) => {
    v.target === e && ++d >= c && u();
  };
  setTimeout(() => {
    d < c && u();
  }, a + 1), e.addEventListener(f, m);
}
function xc(e, t) {
  const n = window.getComputedStyle(e), s = (g) => (n[g] || "").split(", "), r = s(`${yt}Delay`), o = s(`${yt}Duration`), i = Gr(r, o), a = s(`${en}Delay`), c = s(`${en}Duration`), f = Gr(a, c);
  let d = null, u = 0, m = 0;
  t === yt ? i > 0 && (d = yt, u = i, m = o.length) : t === en ? f > 0 && (d = en, u = f, m = c.length) : (u = Math.max(i, f), d = u > 0 ? i > f ? yt : en : null, m = d ? d === yt ? o.length : c.length : 0);
  const v = d === yt && /\b(?:transform|all)(?:,|$)/.test(
    s(`${yt}Property`).toString()
  );
  return {
    type: d,
    timeout: u,
    propCount: m,
    hasTransform: v
  };
}
function Gr(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => Yr(n) + Yr(e[s])));
}
function Yr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Xr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function yc(e, t, n) {
  const s = e[bn];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Zr = /* @__PURE__ */ Symbol("_vod"), wc = /* @__PURE__ */ Symbol("_vsh"), _c = /* @__PURE__ */ Symbol(""), kc = /(?:^|;)\s*display\s*:/;
function Cc(e, t, n) {
  const s = e.style, r = ke(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (ke(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Ln(s, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Ln(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), Ln(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[_c];
      i && (n += ";" + i), s.cssText = n, o = kc.test(n);
    }
  } else t && e.removeAttribute("style");
  Zr in e && (e[Zr] = o ? s.display : "", e[wc] && (s.display = "none"));
}
const Qr = /\s*!important$/;
function Ln(e, t, n) {
  if (q(n))
    n.forEach((s) => Ln(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Sc(e, t);
    Qr.test(n) ? e.setProperty(
      Be(s),
      n.replace(Qr, ""),
      "important"
    ) : e[s] = n;
  }
}
const eo = ["Webkit", "Moz", "ms"], As = {};
function Sc(e, t) {
  const n = As[t];
  if (n)
    return n;
  let s = Je(t);
  if (s !== "filter" && s in e)
    return As[t] = s;
  s = Mo(s);
  for (let r = 0; r < eo.length; r++) {
    const o = eo[r] + s;
    if (o in e)
      return As[t] = o;
  }
  return t;
}
const to = "http://www.w3.org/1999/xlink";
function no(e, t, n, s, r, o = Sa(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(to, t.slice(6, t.length)) : e.setAttributeNS(to, t, n) : n == null || o && !No(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : at(n) ? String(n) : n
  );
}
function so(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Bi(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = No(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Bt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ec(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const ro = /* @__PURE__ */ Symbol("_vei");
function Tc(e, t, n, s, r = null) {
  const o = e[ro] || (e[ro] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [a, c] = Ac(t);
    if (s) {
      const f = o[t] = Oc(
        s,
        r
      );
      Bt(e, a, f, c);
    } else i && (Ec(e, a, i, c), o[t] = void 0);
  }
}
const oo = /(?:Once|Passive|Capture)$/;
function Ac(e) {
  let t;
  if (oo.test(e)) {
    t = {};
    let s;
    for (; s = e.match(oo); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Be(e.slice(2)), t];
}
let Rs = 0;
const Rc = /* @__PURE__ */ Promise.resolve(), $c = () => Rs || (Rc.then(() => Rs = 0), Rs = Date.now());
function Oc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Xe(
      Pc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = $c(), n;
}
function Pc(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const io = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Dc = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? yc(e, s, i) : t === "style" ? Cc(e, n, s) : es(t) ? Zs(t) || Tc(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mc(e, t, s, i)) ? (so(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && no(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ke(s)) ? so(e, Je(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), no(e, t, s, i));
};
function Mc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && io(t) && Y(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return io(t) && ke(n) ? !1 : t in e;
}
const ao = {};
// @__NO_SIDE_EFFECTS__
function vt(e, t, n) {
  let s = /* @__PURE__ */ pl(e, t);
  ts(s) && (s = xe({}, s, t));
  class r extends gr {
    constructor(i) {
      super(s, i, n);
    }
  }
  return r.def = s, r;
}
const jc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class gr extends jc {
  constructor(t, n = {}, s = po) {
    super(), this._def = t, this._props = n, this._createApp = s, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && s !== po ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      xe({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof gr) {
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
    this._connected = !1, qn(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const n of t)
      this._setAttr(n.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (s, r = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: o, styles: i } = s;
      let a;
      if (o && !q(o))
        for (const c in o) {
          const f = o[c];
          (f === Number || f && f.type === Number) && (c in this._props && (this._props[c] = Ms(this._props[c])), (a || (a = /* @__PURE__ */ Object.create(null)))[Je(c)] = !0);
        }
      this._numberProps = a, this._resolveProps(s), this.shadowRoot && this._applyStyles(i), this._mount(s);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((s) => {
      s.configureApp = this._def.configureApp, t(this._def = s, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const s in n)
        ie(this, s) || Object.defineProperty(this, s, {
          // unwrap ref to be consistent with public instance behavior
          get: () => ei(n[s])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, s = q(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && s.includes(r) && this._setProp(r, this[r]);
    for (const r of s.map(Je))
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
    const n = this.hasAttribute(t);
    let s = n ? this.getAttribute(t) : ao;
    const r = Je(t);
    n && this._numberProps && this._numberProps[r] && (s = Ms(s)), this._setProp(r, s, !1, !0);
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
  _setProp(t, n, s = !0, r = !1) {
    if (n !== this._props[t] && (this._dirty = !0, n === ao ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), r && this._instance && this._update(), s)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), n === !0 ? this.setAttribute(Be(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Be(t), n + "") : n || this.removeAttribute(Be(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Uc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = _e(this._def, xe(t, this._props));
    return this._instance || (n.ce = (s) => {
      this._instance = s, s.ce = this, s.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            ts(i[0]) ? xe({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      s.emit = (o, ...i) => {
        r(o, i), Be(o) !== o && r(Be(o), i);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const s = this._nonce;
    for (let r = t.length - 1; r >= 0; r--) {
      const o = document.createElement("style");
      s && o.setAttribute("nonce", s), o.textContent = t[r], this.shadowRoot.prepend(o);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const s = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[s] || (t[s] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), n = this._instance.type.__scopeId;
    for (let s = 0; s < t.length; s++) {
      const r = t[s], o = r.getAttribute("name") || "default", i = this._slots[o], a = r.parentNode;
      if (i)
        for (const c of i) {
          if (n && c.nodeType === 1) {
            const f = n + "-s", d = document.createTreeWalker(c, 1);
            c.setAttribute(f, "");
            let u;
            for (; u = d.nextNode(); )
              u.setAttribute(f, "");
          }
          a.insertBefore(c, r);
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
    const n = /* @__PURE__ */ new Set();
    for (const s of t) {
      const r = s.querySelectorAll("slot");
      for (let o = 0; o < r.length; o++)
        n.add(r[o]);
    }
    return Array.from(n);
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
const lo = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => Mn(t, n) : t;
};
function Nc(e) {
  e.target.composing = !0;
}
function co(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const $s = /* @__PURE__ */ Symbol("_assign");
function fo(e, t, n) {
  return t && (e = e.trim()), n && (e = tr(e)), e;
}
const us = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[$s] = lo(r);
    const o = s || r.props && r.props.type === "number";
    Bt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[$s](fo(e.value, n, o));
    }), (n || o) && Bt(e, "change", () => {
      e.value = fo(e.value, n, o);
    }), t || (Bt(e, "compositionstart", Nc), Bt(e, "compositionend", co), Bt(e, "change", co));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: o } }, i) {
    if (e[$s] = lo(i), e.composing) return;
    const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? tr(e.value) : e.value, c = t ?? "";
    a !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, Fc = ["ctrl", "shift", "alt", "meta"], Ic = {
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
  exact: (e, t) => Fc.some((n) => e[`${n}Key`] && !t.includes(n))
}, Lc = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = Ic[t[i]];
      if (a && a(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Bc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ui = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const o = Be(r.key);
    if (t.some(
      (i) => i === o || Bc[i] === o
    ))
      return e(r);
  }));
}, zc = /* @__PURE__ */ xe({ patchProp: Dc }, pc);
let uo;
function Hi() {
  return uo || (uo = Kl(zc));
}
const Uc = ((...e) => {
  Hi().render(...e);
}), po = ((...e) => {
  const t = Hi().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Vc(s);
    if (!r) return;
    const o = t._component;
    !Y(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, Hc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Hc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Vc(e) {
  return ke(e) ? document.querySelector(e) : e;
}
const qc = ".grid-card[data-v-d5cd0540]{background:#fff;border-radius:24px;padding:1.25rem;border:1px solid #f0f2f5;display:flex;flex-direction:column;gap:1rem;transition:all .2s;height:280px;width:100px;box-shadow:0 4px 12px #00000005}.grid-card[data-v-d5cd0540]:hover{border-color:#cbd5e1;box-shadow:0 8px 24px #0000000a}.grid-row[data-v-d5cd0540]{display:flex;align-items:center;gap:.75rem;flex-shrink:0}.grid-avatar[data-v-d5cd0540]{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.3rem;color:#fff;flex-shrink:0;box-shadow:0 4px 10px #0000000d}.grid-info[data-v-d5cd0540]{flex:1;min-width:0}.grid-name[data-v-d5cd0540]{font-weight:600;font-size:1rem;color:#1a2634;margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grid-meta[data-v-d5cd0540]{font-size:.7rem;color:#8a99aa}.grid-match[data-v-d5cd0540]{background:#f8fafc;padding:.25rem .75rem;border-radius:40px;font-size:.8rem;font-weight:600;color:#1a2634;border:1px solid #edf2f7;white-space:nowrap;flex-shrink:0}.grid-stats[data-v-d5cd0540]{display:flex;gap:1.5rem;padding:.75rem 0;border-top:1px solid #edf2f7;border-bottom:1px solid #edf2f7;flex-shrink:0}.grid-stat[data-v-d5cd0540]{display:flex;align-items:center;gap:.4rem;font-size:.8rem;color:#4a5a6e}.grid-stat span[data-v-d5cd0540]:first-child{opacity:.8}.grid-stat span[data-v-d5cd0540]:last-child{font-weight:500}.grid-chips[data-v-d5cd0540]{display:flex;flex-wrap:wrap;gap:.35rem;min-height:32px;flex-shrink:0}.grid-chip[data-v-d5cd0540]{background:#f8fafc;padding:.3rem .8rem;border-radius:40px;font-size:.7rem;color:#4a5a6e;border:1px solid #edf2f7;white-space:nowrap;transition:all .2s;display:inline-flex;align-items:center;height:28px}.grid-chip.course[data-v-d5cd0540]{background:#fff;border-color:#e0e5eb}.grid-chip.more[data-v-d5cd0540]{background:transparent;border:1px dashed #cbd5e1;color:#94a3b8}.grid-chip[data-v-d5cd0540]:hover{background:#fff;border-color:#cbd5e1}.grid-empty-chip[data-v-d5cd0540]{background:#f8fafc;padding:.3rem .8rem;border-radius:40px;font-size:.7rem;color:#94a3b8;border:1px dashed #e0e5eb;display:inline-flex;align-items:center;height:28px;width:fit-content}.grid-empty[data-v-d5cd0540]{font-size:.75rem;color:#a0aec0;padding:.5rem 0;font-style:italic;height:28px;display:flex;align-items:center}.grid-actions[data-v-d5cd0540]{margin-top:auto;flex-shrink:0}.grid-btn[data-v-d5cd0540]{width:100%;height:40px;border-radius:40px;border:none;background:#1a2634;color:#fff;font-size:.85rem;font-weight:500;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem;box-shadow:0 4px 10px #1a26341a}.grid-btn[data-v-d5cd0540]:hover{background:#2d3a4a;transform:translateY(-2px);box-shadow:0 8px 16px #1a263426}.grid-btn[data-v-d5cd0540]:active{transform:translateY(0)}@media(max-width:640px){.grid-card[data-v-d5cd0540]{padding:1rem;height:320px}.grid-avatar[data-v-d5cd0540]{width:42px;height:42px;font-size:1.1rem}.grid-name[data-v-d5cd0540]{font-size:.9rem}.grid-meta[data-v-d5cd0540]{font-size:.65rem}.grid-match[data-v-d5cd0540]{font-size:.7rem;padding:.2rem .6rem}.grid-stat[data-v-d5cd0540]{font-size:.7rem;gap:.3rem}.grid-chip[data-v-d5cd0540],.grid-empty-chip[data-v-d5cd0540]{font-size:.65rem;padding:.2rem .7rem;height:26px}.grid-btn[data-v-d5cd0540]{height:36px;font-size:.8rem}}", xt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Kc = { class: "grid-card" }, Wc = { class: "grid-row" }, Jc = { class: "grid-info" }, Gc = { class: "grid-name" }, Yc = { class: "grid-meta" }, Xc = { class: "grid-match" }, Zc = { class: "grid-stats" }, Qc = { class: "grid-stat" }, ed = { class: "grid-stat" }, td = { class: "grid-stat" }, nd = {
  key: 0,
  class: "grid-chips"
}, sd = {
  key: 0,
  class: "grid-chip more"
}, rd = {
  key: 1,
  class: "grid-empty-chip"
}, od = {
  key: 2,
  class: "grid-chips"
}, id = {
  key: 0,
  class: "grid-chip more"
}, ad = {
  key: 3,
  class: "grid-empty-chip"
}, ld = {
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
  setup(e) {
    const t = e, n = we(() => {
      if (typeof t.profile == "object") return t.profile;
      try {
        return t.profile ? JSON.parse(t.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), s = we(() => {
      if (Array.isArray(t.overlapCourses)) return t.overlapCourses;
      try {
        return t.overlapCourses ? JSON.parse(t.overlapCourses) : [];
      } catch {
        return [];
      }
    }), r = we(() => {
      if (Array.isArray(t.timeSlots)) return t.timeSlots;
      try {
        return t.timeSlots ? JSON.parse(t.timeSlots) : [];
      } catch {
        return [];
      }
    }), o = we(() => (n.value.username || "??").charAt(0).toUpperCase()), i = we(() => {
      const m = ["#4158D0", "#C850C0", "#0093E9", "#80D0C7"], v = (n.value.username?.length || 0) % m.length;
      return { backgroundColor: m[v] };
    }), a = we(() => r.value.length > 0), c = (m) => {
      if (!m) return "";
      const [v, g] = m.split(":"), x = parseInt(v), b = x >= 12 ? "pm" : "am";
      return `${x % 12 || 12}${g !== "00" ? `:${g}` : ""}${b}`;
    }, f = we(() => r.value.slice(0, 3).map((m) => ({
      dayShort: m.day?.substring(0, 3) || "Any",
      timeRange: m.start_time ? `${c(m.start_time)}-${c(m.end_time)}` : "Flex"
    }))), d = we(() => {
      if (r.value.length === 0) return "🔄";
      const m = r.value[0];
      if (!m.start_time) return "🔄";
      const v = parseInt(m.start_time.split(":")[0]);
      return v < 12 ? "🌅" : v < 17 ? "☀️" : "🌙";
    }), u = () => {
      window.location.href = `/profile/${n.value.id}/`;
    };
    return (m, v) => (A(), $("div", Kc, [
      l("div", Wc, [
        l("div", {
          class: "grid-avatar",
          style: qe(i.value)
        }, S(o.value), 5),
        l("div", Jc, [
          l("div", Gc, S(n.value.username), 1),
          l("div", Yc, S(n.value.major) + " • Y" + S(n.value.year), 1)
        ]),
        l("div", Xc, S(e.matchPercent) + "%", 1)
      ]),
      l("div", Zc, [
        l("div", Qc, [
          v[0] || (v[0] = l("span", null, "📚", -1)),
          l("span", null, S(s.value.length), 1)
        ]),
        l("div", ed, [
          v[1] || (v[1] = l("span", null, "⏰", -1)),
          l("span", null, S(e.overlapHours) + "h", 1)
        ]),
        l("div", td, [
          l("span", null, S(d.value), 1)
        ])
      ]),
      a.value ? (A(), $("div", nd, [
        (A(!0), $(fe, null, Ne(f.value.slice(0, 2), (g) => (A(), $("span", {
          key: g.dayShort,
          class: "grid-chip"
        }, S(g.dayShort) + " " + S(g.timeRange), 1))), 128)),
        r.value.length > 2 ? (A(), $("span", sd, " +" + S(r.value.length - 2), 1)) : ye("", !0)
      ])) : (A(), $("div", rd, "No schedule")),
      s.value.length ? (A(), $("div", od, [
        (A(!0), $(fe, null, Ne(s.value.slice(0, 2), (g) => (A(), $("span", {
          key: g,
          class: "grid-chip course"
        }, S(g), 1))), 128)),
        s.value.length > 2 ? (A(), $("span", id, " +" + S(s.value.length - 2), 1)) : ye("", !0)
      ])) : (A(), $("div", ad, "No courses match")),
      l("div", { class: "grid-actions" }, [
        l("button", {
          class: "grid-btn primary",
          onClick: u
        }, " View Profile ")
      ])
    ]));
  }
}, Vi = /* @__PURE__ */ xt(ld, [["styles", [qc]], ["__scopeId", "data-v-d5cd0540"]]), cd = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-ab17189e]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-ab17189e]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-ab17189e]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-ab17189e]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-ab17189e]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-ab17189e]{position:relative;width:52px;height:52px}.avatar-main[data-v-ab17189e]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-ab17189e]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-ab17189e]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-ab17189e]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-ab17189e]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-ab17189e]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-ab17189e]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-ab17189e]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-ab17189e]{color:#4f46e5}.vertical-divider[data-v-ab17189e]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-ab17189e]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-ab17189e]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-ab17189e]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-ab17189e]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-ab17189e]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-ab17189e]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-ab17189e]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-ab17189e]{flex-direction:column}.match-stats[data-v-ab17189e]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-ab17189e]{width:100%;justify-content:center}}', dd = { class: "elegant-item-container" }, fd = { class: "elegant-content" }, ud = { class: "identity-block" }, pd = { class: "avatar-container" }, hd = { class: "name-section" }, md = { class: "username" }, gd = { class: "major" }, bd = { class: "match-stats" }, vd = { class: "stat-group" }, xd = { class: "stat-value highlight" }, yd = { class: "stat-group" }, wd = { class: "stat-value" }, _d = { class: "stat-group" }, kd = { class: "stat-value" }, Cd = {
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
    const n = e, s = we(() => {
      if (typeof n.profile == "object") return n.profile;
      try {
        return n.profile ? JSON.parse(n.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = we(() => {
      if (Array.isArray(n.overlapCourses)) return n.overlapCourses;
      try {
        return n.overlapCourses ? JSON.parse(n.overlapCourses) : [];
      } catch {
        return [];
      }
    }), o = we(() => (s.value.username || "??").charAt(0).toUpperCase()), i = we(() => {
      const d = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], u = (s.value.username?.length || 0) % d.length;
      return { background: d[u] };
    }), a = () => {
      const d = s.value.username.replace("@", "");
      window.location.href = `/profile/${d}/`;
    }, c = () => {
      const d = s.value.username.replace("@", "");
      window.location.href = `/study-groups/create/?invite=${d}`;
    }, f = () => {
      const d = s.value.username.replace("@", "");
      window.location.href = `/messages/new/?to=${d}`;
    };
    return (d, u) => (A(), $("div", dd, [
      l("div", {
        class: "glow-accent",
        style: qe(i.value)
      }, null, 4),
      l("div", fd, [
        l("div", ud, [
          l("div", pd, [
            l("div", {
              class: "avatar-ring",
              style: qe(d.avatarBorder)
            }, null, 4),
            l("div", {
              class: "avatar-main",
              style: qe(i.value)
            }, S(o.value), 5)
          ]),
          l("div", hd, [
            l("h3", md, S(s.value.username), 1),
            l("p", gd, S(s.value.major), 1)
          ])
        ]),
        l("div", bd, [
          l("div", vd, [
            u[1] || (u[1] = l("span", { class: "stat-label" }, "Match", -1)),
            l("span", xd, [
              le(S(e.matchPercent), 1),
              u[0] || (u[0] = l("small", null, "%", -1))
            ])
          ]),
          u[6] || (u[6] = l("div", { class: "vertical-divider" }, null, -1)),
          l("div", yd, [
            u[3] || (u[3] = l("span", { class: "stat-label" }, "Overlap", -1)),
            l("span", wd, [
              le(S(e.overlapHours), 1),
              u[2] || (u[2] = l("small", null, "h", -1))
            ])
          ]),
          u[7] || (u[7] = l("div", { class: "vertical-divider" }, null, -1)),
          l("div", _d, [
            u[5] || (u[5] = l("span", { class: "stat-label" }, "Shared", -1)),
            l("span", kd, [
              le(S(r.value.length), 1),
              u[4] || (u[4] = l("small", null, "📚", -1))
            ])
          ])
        ]),
        l("div", { class: "action-block" }, [
          l("button", {
            class: "action-trigger primary",
            onClick: a
          }, [...u[8] || (u[8] = [
            l("span", null, "View", -1)
          ])]),
          l("button", {
            class: "action-trigger icon",
            onClick: f
          }, [...u[9] || (u[9] = [
            l("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          l("button", {
            class: "action-trigger icon",
            onClick: c
          }, [...u[10] || (u[10] = [
            l("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, qi = /* @__PURE__ */ xt(Cd, [["styles", [cd]], ["__scopeId", "data-v-ab17189e"]]), Sd = ".discovery-main[data-v-80895a4b]{padding:1.5rem;font-family:Inter,sans-serif;overflow-y:auto;height:100vh}.discovery-header[data-v-80895a4b]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:.5rem;width:70vw}.header-left[data-v-80895a4b]{flex-shrink:0}.header-title[data-v-80895a4b]{font-size:1.3rem;font-weight:600;color:#0f172a;margin:0 0 .1rem;letter-spacing:-.02em;white-space:nowrap}.header-subtitle[data-v-80895a4b]{font-size:.7rem;color:#64748b;margin:0;white-space:nowrap}.header-actions[data-v-80895a4b]{display:flex;align-items:center;gap:1rem;justify-content:space-between;width:350px}.search-wrapper[data-v-80895a4b]{position:relative;width:200px;flex-shrink:0}.search-icon[data-v-80895a4b]{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.8rem}.search-input[data-v-80895a4b]{width:100%;padding:.5rem 1.8rem .5rem 2.2rem;border:1px solid #f1f5f9;border-radius:40px;background:#fff;font-size:.8rem;transition:all .2s}.search-input[data-v-80895a4b]:focus{outline:none;border-color:#1e3a5f;box-shadow:0 0 0 3px #1e3a5f1a}.search-clear[data-v-80895a4b]{position:absolute;right:.25rem;top:50%;transform:translateY(-50%);width:22px;height:22px;border:none;background:#f1f5f9;border-radius:11px;color:#64748b;font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.search-clear[data-v-80895a4b]:hover{background:#e2e8f0;color:#1e3a5f}.view-toggles[data-v-80895a4b]{display:flex;gap:.2rem;background:#f8fafc;padding:.2rem;border-radius:40px;border:1px solid #f1f5f9;flex-shrink:0}.view-btn[data-v-80895a4b]{width:32px;height:32px;border:none;background:transparent;border-radius:30px;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;padding:0}.view-btn[data-v-80895a4b]:hover{color:#1e3a5f;background:#fff}.view-btn.active[data-v-80895a4b]{background:#1e3a5f;color:#fff}.filter-tabs[data-v-80895a4b]{display:flex;gap:.4rem;overflow-x:auto;padding-bottom:.5rem;margin-bottom:1.5rem;scrollbar-width:none;width:100%}.filter-tabs[data-v-80895a4b]::-webkit-scrollbar{display:none}.filter-tab[data-v-80895a4b]{display:flex;align-items:center;gap:.4rem;padding:.4rem 1rem;border:1px solid #f1f5f9;background:#fff;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}.filter-tab[data-v-80895a4b]:hover{background:#f8fafc;color:#1e3a5f}.filter-tab.active[data-v-80895a4b]{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.tab-emoji[data-v-80895a4b]{font-size:.85rem}.tab-badge[data-v-80895a4b]{background:#f1f5f9;padding:.1rem .4rem;border-radius:30px;font-size:.6rem;color:#64748b;margin-left:.1rem}.filter-tab.active .tab-badge[data-v-80895a4b]{background:#fff3;color:#fff}.results-container[data-v-80895a4b]{min-height:400px;width:100%}.results-flex[data-v-80895a4b]{display:flex;flex-wrap:wrap;gap:1.2rem;width:100%}.results-flex[data-v-80895a4b]>*{flex:0 0 calc(25% - .9rem);min-width:280px;max-width:100%;height:340px;margin-bottom:0}[data-v-80895a4b] .grid-card{height:100%;width:100%;margin:0}.results-list[data-v-80895a4b]{display:flex;flex-direction:column;gap:1rem;width:100%}.results-list[data-v-80895a4b]>*{width:100%;height:auto;min-height:200px}.empty-state[data-v-80895a4b]{text-align:center;padding:3rem 2rem;background:#fff;border-radius:32px;border:2px dashed #f1f5f9;width:100%}.empty-icon[data-v-80895a4b]{font-size:2.5rem;margin-bottom:1rem;opacity:.5}.empty-state h3[data-v-80895a4b]{font-size:1.1rem;font-weight:600;color:#0f172a;margin-bottom:.3rem}.empty-state p[data-v-80895a4b]{font-size:.85rem;color:#64748b;margin-bottom:1.2rem}.empty-reset[data-v-80895a4b]{background:#f8fafc;border:1px solid #f1f5f9;padding:.5rem 1.5rem;border-radius:40px;color:#1e3a5f;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.empty-reset[data-v-80895a4b]:hover{background:#1e3a5f;color:#fff}.fade-enter-active[data-v-80895a4b],.fade-leave-active[data-v-80895a4b]{transition:opacity .3s ease}.fade-enter-from[data-v-80895a4b],.fade-leave-to[data-v-80895a4b]{opacity:0}@media(max-width:1200px){.results-flex[data-v-80895a4b]>*{flex:0 0 calc(33.333% - .8rem)}}@media(max-width:900px){.results-flex[data-v-80895a4b]>*{flex:0 0 calc(50% - .6rem)}}@media(max-width:768px){.discovery-header[data-v-80895a4b]{flex-direction:column;align-items:flex-start}.header-left[data-v-80895a4b]{width:100%}.header-title[data-v-80895a4b],.header-subtitle[data-v-80895a4b]{white-space:normal}.header-actions[data-v-80895a4b]{width:100%;justify-content:space-between}.search-wrapper[data-v-80895a4b]{width:calc(100% - 90px)}.results-flex[data-v-80895a4b]>*{flex:0 0 100%;height:auto;min-height:340px}}", Ed = { class: "discovery-main" }, Td = { class: "discovery-header" }, Ad = { class: "header-actions" }, Rd = { class: "search-wrapper" }, $d = { class: "view-toggles" }, Od = { class: "filter-tabs" }, Pd = ["onClick"], Dd = { class: "tab-emoji" }, Md = { class: "tab-name" }, jd = { class: "tab-badge" }, Nd = { class: "results-container" }, Fd = {
  key: 1,
  class: "empty-state"
}, Id = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ ae("grid"), s = /* @__PURE__ */ ae(""), r = /* @__PURE__ */ ae("all"), o = we(() => {
      try {
        const m = JSON.parse(t.topMatches), v = m.reduce((E, F) => F.match_percent > 85 ? E += 1 : E, 0), g = m.reduce((E, F) => F.overlap_hours > 5 ? E += 1 : E, 0), x = JSON.parse(t.sameMajor), b = JSON.parse(t.sameCourse);
        return {
          all: m.length,
          best: v,
          schedule: g,
          major: x.length,
          course: b.length
        };
      } catch (m) {
        return console.error(m), { all: 0, best: 0, schedule: 0, major: 0, course: 0 };
      }
    }), i = [
      { id: "all", name: "All", icon: "👥", count: o.value.all },
      { id: "high", name: "Best", icon: "⭐", count: o.value.best },
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
    ], a = we(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), c = we(() => {
      try {
        return JSON.parse(a.value || "[]");
      } catch {
        return [];
      }
    }), f = we(() => {
      let m = c.value;
      if (s.value) {
        const v = s.value.toLowerCase();
        m = m.filter(
          (g) => g.profile.username.toLowerCase().includes(v) || g.profile.major.toLowerCase().includes(v) || g.overlap_courses?.some(
            (x) => x.toLowerCase().includes(v)
          )
        );
      }
      switch (r.value) {
        case "high":
          m = m.filter((v) => v.match_percent >= 85);
          break;
        case "schedule":
          m = m.filter((v) => v.overlap_hours >= 5);
          break;
        case "courses":
          m = m.filter((v) => v.overlap_courses?.length >= 2);
          break;
      }
      return m;
    }), d = (m) => {
      console.log(`Connecting with ${m}`);
    }, u = () => {
      s.value = "", r.value = "all";
    };
    return Nn(c, (m) => {
    }), (m, v) => (A(), $("div", Ed, [
      l("div", Td, [
        v[7] || (v[7] = l("div", { class: "header-left" }, [
          l("h1", { class: "header-title" }, "Find Study Partners"),
          l("p", { class: "header-subtitle" }, "Connect with classmates")
        ], -1)),
        l("div", Ad, [
          l("div", Rd, [
            v[4] || (v[4] = l("span", { class: "search-icon" }, "🔍", -1)),
            is(l("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (g) => s.value = g),
              type: "text",
              placeholder: "Search...",
              class: "search-input"
            }, null, 512), [
              [us, s.value]
            ]),
            s.value ? (A(), $("button", {
              key: 0,
              class: "search-clear",
              onClick: v[1] || (v[1] = (g) => s.value = "")
            }, " ✕ ")) : ye("", !0)
          ]),
          l("div", $d, [
            l("button", {
              class: ve(["view-btn", { active: n.value === "grid" }]),
              onClick: v[2] || (v[2] = (g) => n.value = "grid"),
              title: "Grid view"
            }, [...v[5] || (v[5] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-80895a4b><rect x="3" y="3" width="7" height="7" rx="1" data-v-80895a4b></rect><rect x="14" y="3" width="7" height="7" rx="1" data-v-80895a4b></rect><rect x="3" y="14" width="7" height="7" rx="1" data-v-80895a4b></rect><rect x="14" y="14" width="7" height="7" rx="1" data-v-80895a4b></rect></svg>', 1)
            ])], 2),
            l("button", {
              class: ve(["view-btn", { active: n.value === "list" }]),
              onClick: v[3] || (v[3] = (g) => n.value = "list"),
              title: "List view"
            }, [...v[6] || (v[6] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-80895a4b><line x1="8" y1="6" x2="21" y2="6" data-v-80895a4b></line><line x1="8" y1="12" x2="21" y2="12" data-v-80895a4b></line><line x1="8" y1="18" x2="21" y2="18" data-v-80895a4b></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-80895a4b></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-80895a4b></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-80895a4b></line></svg>', 1)
            ])], 2)
          ])
        ])
      ]),
      l("div", Od, [
        (A(), $(fe, null, Ne(i, (g) => l("button", {
          key: g.id,
          class: ve(["filter-tab", { active: r.value === g.id }]),
          onClick: (x) => r.value = g.id
        }, [
          l("span", Dd, S(g.icon), 1),
          l("span", Md, S(g.name), 1),
          l("span", jd, S(g.count), 1)
        ], 10, Pd)), 64))
      ]),
      l("div", Nd, [
        _e(vn, {
          name: "fade",
          mode: "out-in"
        }, {
          default: Kt(() => [
            f.value.length > 0 ? (A(), $("div", {
              key: 0,
              class: ve(["results-flex", { "results-list": n.value === "list" }])
            }, [
              n.value === "grid" ? (A(!0), $(fe, { key: 0 }, Ne(f.value, (g, x) => (A(), Yn(Vi, {
                key: x,
                profile: g.profile,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: d
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (A(!0), $(fe, { key: 1 }, Ne(f.value, (g, x) => (A(), Yn(qi, {
                profile: g.profile,
                key: g.profile.username.substring(0, 2) + x,
                "match-percent": g.match_percent,
                "overlap-hours": g.overlap_hours,
                "overlap-courses": g.overlap_courses,
                "time-slots": g.daily_schedules,
                onConnect: d
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (A(), $("div", Fd, [
              v[8] || (v[8] = l("div", { class: "empty-icon" }, "🔍", -1)),
              v[9] || (v[9] = l("h3", null, "No matches found", -1)),
              v[10] || (v[10] = l("p", null, "Try adjusting your filters", -1)),
              l("button", {
                class: "empty-reset",
                onClick: u
              }, " Clear all filters ")
            ]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}, Ld = /* @__PURE__ */ xt(Id, [["styles", [Sd]], ["__scopeId", "data-v-80895a4b"]]);
function Ki(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Bd } = Object.prototype, { getPrototypeOf: br } = Object, { iterator: ps, toStringTag: Wi } = Symbol, hs = /* @__PURE__ */ ((e) => (t) => {
  const n = Bd.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ze = (e) => (e = e.toLowerCase(), (t) => hs(t) === e), ms = (e) => (t) => typeof t === e, { isArray: Jt } = Array, Wt = ms("undefined");
function kn(e) {
  return e !== null && !Wt(e) && e.constructor !== null && !Wt(e.constructor) && Fe(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ji = Ze("ArrayBuffer");
function zd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ji(e.buffer), t;
}
const Ud = ms("string"), Fe = ms("function"), Gi = ms("number"), Cn = (e) => e !== null && typeof e == "object", Hd = (e) => e === !0 || e === !1, Bn = (e) => {
  if (hs(e) !== "object")
    return !1;
  const t = br(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Wi in e) && !(ps in e);
}, Vd = (e) => {
  if (!Cn(e) || kn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, qd = Ze("Date"), Kd = Ze("File"), Wd = Ze("Blob"), Jd = Ze("FileList"), Gd = (e) => Cn(e) && Fe(e.pipe), Yd = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Fe(e.append) && ((t = hs(e)) === "formdata" || // detect form-data instance
  t === "object" && Fe(e.toString) && e.toString() === "[object FormData]"));
}, Xd = Ze("URLSearchParams"), [Zd, Qd, ef, tf] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Ze), nf = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Sn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), Jt(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (kn(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (s = 0; s < i; s++)
      a = o[s], t.call(null, e[a], a, e);
  }
}
function Yi(e, t) {
  if (kn(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const Pt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Xi = (e) => !Wt(e) && e !== Pt;
function Ws() {
  const { caseless: e, skipUndefined: t } = Xi(this) && this || {}, n = {}, s = (r, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && Yi(n, o) || o;
    Bn(n[i]) && Bn(r) ? n[i] = Ws(n[i], r) : Bn(r) ? n[i] = Ws({}, r) : Jt(r) ? n[i] = r.slice() : (!t || !Wt(r)) && (n[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Sn(arguments[r], s);
  return n;
}
const sf = (e, t, n, { allOwnKeys: s } = {}) => (Sn(
  t,
  (r, o) => {
    n && Fe(r) ? Object.defineProperty(e, o, {
      value: Ki(r, n),
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
  { allOwnKeys: s }
), e), rf = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), of = (e, t, n, s) => {
  e.prototype = Object.create(
    t.prototype,
    s
  ), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, af = (e, t, n, s) => {
  let r, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && br(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, lf = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, cf = (e) => {
  if (!e) return null;
  if (Jt(e)) return e;
  let t = e.length;
  if (!Gi(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, df = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && br(Uint8Array)), ff = (e, t) => {
  const s = (e && e[ps]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, uf = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, pf = Ze("HTMLFormElement"), hf = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, s, r) {
  return s.toUpperCase() + r;
}), ho = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), mf = Ze("RegExp"), Zi = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  Sn(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, gf = (e) => {
  Zi(e, (t, n) => {
    if (Fe(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (Fe(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, bf = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return Jt(e) ? s(e) : s(String(e).split(t)), n;
}, vf = () => {
}, xf = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function yf(e) {
  return !!(e && Fe(e.append) && e[Wi] === "FormData" && e[ps]);
}
const wf = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Cn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (kn(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = Jt(s) ? [] : {};
        return Sn(s, (i, a) => {
          const c = n(i, r + 1);
          !Wt(c) && (o[a] = c);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, _f = Ze("AsyncFunction"), kf = (e) => e && (Cn(e) || Fe(e)) && Fe(e.then) && Fe(e.catch), Qi = ((e, t) => e ? setImmediate : t ? ((n, s) => (Pt.addEventListener(
  "message",
  ({ source: r, data: o }) => {
    r === Pt && o === n && s.length && s.shift()();
  },
  !1
), (r) => {
  s.push(r), Pt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Fe(Pt.postMessage)), Cf = typeof queueMicrotask < "u" ? queueMicrotask.bind(Pt) : typeof process < "u" && process.nextTick || Qi, Sf = (e) => e != null && Fe(e[ps]), y = {
  isArray: Jt,
  isArrayBuffer: Ji,
  isBuffer: kn,
  isFormData: Yd,
  isArrayBufferView: zd,
  isString: Ud,
  isNumber: Gi,
  isBoolean: Hd,
  isObject: Cn,
  isPlainObject: Bn,
  isEmptyObject: Vd,
  isReadableStream: Zd,
  isRequest: Qd,
  isResponse: ef,
  isHeaders: tf,
  isUndefined: Wt,
  isDate: qd,
  isFile: Kd,
  isBlob: Wd,
  isRegExp: mf,
  isFunction: Fe,
  isStream: Gd,
  isURLSearchParams: Xd,
  isTypedArray: df,
  isFileList: Jd,
  forEach: Sn,
  merge: Ws,
  extend: sf,
  trim: nf,
  stripBOM: rf,
  inherits: of,
  toFlatObject: af,
  kindOf: hs,
  kindOfTest: Ze,
  endsWith: lf,
  toArray: cf,
  forEachEntry: ff,
  matchAll: uf,
  isHTMLForm: pf,
  hasOwnProperty: ho,
  hasOwnProp: ho,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Zi,
  freezeMethods: gf,
  toObjectSet: bf,
  toCamelCase: hf,
  noop: vf,
  toFiniteNumber: xf,
  findKey: Yi,
  global: Pt,
  isContextDefined: Xi,
  isSpecCompliantForm: yf,
  toJSONObject: wf,
  isAsyncFn: _f,
  isThenable: kf,
  setImmediate: Qi,
  asap: Cf,
  isIterable: Sf
};
let W = class ea extends Error {
  static from(t, n, s, r, o, i) {
    const a = new ea(t.message, n || t.code, s, r, o);
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
  constructor(t, n, s, r, o) {
    super(t), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), s && (this.config = s), r && (this.request = r), o && (this.response = o, this.status = o.status);
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
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
W.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
W.ERR_BAD_OPTION = "ERR_BAD_OPTION";
W.ECONNABORTED = "ECONNABORTED";
W.ETIMEDOUT = "ETIMEDOUT";
W.ERR_NETWORK = "ERR_NETWORK";
W.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
W.ERR_DEPRECATED = "ERR_DEPRECATED";
W.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
W.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
W.ERR_CANCELED = "ERR_CANCELED";
W.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
W.ERR_INVALID_URL = "ERR_INVALID_URL";
const Ef = null;
function Js(e) {
  return y.isPlainObject(e) || y.isArray(e);
}
function ta(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function mo(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = ta(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Tf(e) {
  return y.isArray(e) && !e.some(Js);
}
const Af = y.toFlatObject(y, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function gs(e, t, n) {
  if (!y.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = y.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(x, b) {
    return !y.isUndefined(b[x]);
  });
  const s = n.metaTokens, r = n.visitor || d, o = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(t);
  if (!y.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (y.isDate(g))
      return g.toISOString();
    if (y.isBoolean(g))
      return g.toString();
    if (!c && y.isBlob(g))
      throw new W("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(g) || y.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function d(g, x, b) {
    let E = g;
    if (g && !b && typeof g == "object") {
      if (y.endsWith(x, "{}"))
        x = s ? x : x.slice(0, -2), g = JSON.stringify(g);
      else if (y.isArray(g) && Tf(g) || (y.isFileList(g) || y.endsWith(x, "[]")) && (E = y.toArray(g)))
        return x = ta(x), E.forEach(function(H, j) {
          !(y.isUndefined(H) || H === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? mo([x], j, o) : i === null ? x : x + "[]",
            f(H)
          );
        }), !1;
    }
    return Js(g) ? !0 : (t.append(mo(b, x, o), f(g)), !1);
  }
  const u = [], m = Object.assign(Af, {
    defaultVisitor: d,
    convertValue: f,
    isVisitable: Js
  });
  function v(g, x) {
    if (!y.isUndefined(g)) {
      if (u.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + x.join("."));
      u.push(g), y.forEach(g, function(E, F) {
        (!(y.isUndefined(E) || E === null) && r.call(
          t,
          E,
          y.isString(F) ? F.trim() : F,
          x,
          m
        )) === !0 && v(E, x ? x.concat(F) : [F]);
      }), u.pop();
    }
  }
  if (!y.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function go(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function vr(e, t) {
  this._pairs = [], e && gs(e, this, t);
}
const na = vr.prototype;
na.append = function(t, n) {
  this._pairs.push([t, n]);
};
na.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, go);
  } : go;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Rf(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function sa(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || Rf, r = y.isFunction(n) ? {
    serialize: n
  } : n, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = y.isURLSearchParams(t) ? t.toString() : new vr(t, r).toString(s), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class bo {
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
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
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
    y.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const xr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, $f = typeof URLSearchParams < "u" ? URLSearchParams : vr, Of = typeof FormData < "u" ? FormData : null, Pf = typeof Blob < "u" ? Blob : null, Df = {
  isBrowser: !0,
  classes: {
    URLSearchParams: $f,
    FormData: Of,
    Blob: Pf
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, yr = typeof window < "u" && typeof document < "u", Gs = typeof navigator == "object" && navigator || void 0, Mf = yr && (!Gs || ["ReactNative", "NativeScript", "NS"].indexOf(Gs.product) < 0), jf = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Nf = yr && window.location.href || "http://localhost", Ff = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: yr,
  hasStandardBrowserEnv: Mf,
  hasStandardBrowserWebWorkerEnv: jf,
  navigator: Gs,
  origin: Nf
}, Symbol.toStringTag, { value: "Module" })), Se = {
  ...Ff,
  ...Df
};
function If(e, t) {
  return gs(e, new Se.classes.URLSearchParams(), {
    visitor: function(n, s, r, o) {
      return Se.isNode && y.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Lf(e) {
  return y.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Bf(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function ra(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = o >= n.length;
    return i = !i && y.isArray(r) ? r.length : i, c ? (y.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !a) : ((!r[i] || !y.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && y.isArray(r[i]) && (r[i] = Bf(r[i])), !a);
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const n = {};
    return y.forEachEntry(e, (s, r) => {
      t(Lf(s), r, n, 0);
    }), n;
  }
  return null;
}
function zf(e, t, n) {
  if (y.isString(e))
    try {
      return (t || JSON.parse)(e), y.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const En = {
  transitional: xr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = y.isObject(t);
    if (o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t))
      return r ? JSON.stringify(ra(t)) : t;
    if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t) || y.isReadableStream(t))
      return t;
    if (y.isArrayBufferView(t))
      return t.buffer;
    if (y.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return If(t, this.formSerializer).toString();
      if ((a = y.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return gs(
          a ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return o || r ? (n.setContentType("application/json", !1), zf(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || En.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (y.isResponse(t) || y.isReadableStream(t))
      return t;
    if (t && y.isString(t) && (s && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? W.from(a, W.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: Se.classes.FormData,
    Blob: Se.classes.Blob
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
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  En.headers[e] = {};
});
const Uf = y.toObjectSet([
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
]), Hf = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && Uf[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, vo = /* @__PURE__ */ Symbol("internals");
function tn(e) {
  return e && String(e).trim().toLowerCase();
}
function zn(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(zn) : String(e);
}
function Vf(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const qf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Os(e, t, n, s, r) {
  if (y.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!y.isString(t)) {
    if (y.isString(s))
      return t.indexOf(s) !== -1;
    if (y.isRegExp(s))
      return s.test(t);
  }
}
function Kf(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Wf(e, t) {
  const n = y.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0
    });
  });
}
let Ie = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(a, c, f) {
      const d = tn(c);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const u = y.findKey(r, d);
      (!u || r[u] === void 0 || f === !0 || f === void 0 && r[u] !== !1) && (r[u || c] = zn(a));
    }
    const i = (a, c) => y.forEach(a, (f, d) => o(f, d, c));
    if (y.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (y.isString(t) && (t = t.trim()) && !qf(t))
      i(Hf(t), n);
    else if (y.isObject(t) && y.isIterable(t)) {
      let a = {}, c, f;
      for (const d of t) {
        if (!y.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        a[f = d[0]] = (c = a[f]) ? y.isArray(c) ? [...c, d[1]] : [c, d[1]] : d[1];
      }
      i(a, n);
    } else
      t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = tn(t), t) {
      const s = y.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return Vf(r);
        if (y.isFunction(n))
          return n.call(this, r, s);
        if (y.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = tn(t), t) {
      const s = y.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || Os(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (i = tn(i), i) {
        const a = y.findKey(s, i);
        a && (!n || Os(s, s[a], a, n)) && (delete s[a], r = !0);
      }
    }
    return y.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || Os(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return y.forEach(this, (r, o) => {
      const i = y.findKey(s, o);
      if (i) {
        n[i] = zn(r), delete n[o];
        return;
      }
      const a = t ? Kf(o) : String(o).trim();
      a !== o && delete n[o], n[a] = zn(r), s[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && y.isArray(s) ? s.join(", ") : s);
    }), n;
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
    return n.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[vo] = this[vo] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const a = tn(i);
      s[a] || (Wf(r, i), s[a] = !0);
    }
    return y.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ie.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(Ie.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
y.freezeMethods(Ie);
function Ps(e, t) {
  const n = this || En, s = t || n, r = Ie.from(s.headers);
  let o = s.data;
  return y.forEach(e, function(a) {
    o = a.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function oa(e) {
  return !!(e && e.__CANCEL__);
}
let Tn = class extends W {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, n, s) {
    super(t ?? "canceled", W.ERR_CANCELED, n, s), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function ia(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new W(
    "Request failed with status code " + n.status,
    [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Jf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Gf(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), d = s[o];
    i || (i = f), n[r] = c, s[r] = f;
    let u = o, m = 0;
    for (; u !== r; )
      m += n[u++], u = u % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), f - i < t)
      return;
    const v = d && f - d;
    return v ? Math.round(m * 1e3 / v) : void 0;
  };
}
function Yf(e, t) {
  let n = 0, s = 1e3 / t, r, o;
  const i = (f, d = Date.now()) => {
    n = d, r = null, o && (clearTimeout(o), o = null), e(...f);
  };
  return [(...f) => {
    const d = Date.now(), u = d - n;
    u >= s ? i(f, d) : (r = f, o || (o = setTimeout(() => {
      o = null, i(r);
    }, s - u)));
  }, () => r && i(r)];
}
const Qn = (e, t, n = 3) => {
  let s = 0;
  const r = Gf(50, 250);
  return Yf((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, c = i - s, f = r(c), d = i <= a;
    s = i;
    const u = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: f || void 0,
      estimated: f && a && d ? (a - i) / f : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(u);
  }, n);
}, xo = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, yo = (e) => (...t) => y.asap(() => e(...t)), Xf = Se.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Se.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Se.origin),
  Se.navigator && /(msie|trident)/i.test(Se.navigator.userAgent)
) : () => !0, Zf = Se.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      y.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), y.isString(s) && a.push(`path=${s}`), y.isString(r) && a.push(`domain=${r}`), o === !0 && a.push("secure"), y.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
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
function Qf(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function eu(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function aa(e, t, n) {
  let s = !Qf(t);
  return e && (s || n == !1) ? eu(e, t) : t;
}
const wo = (e) => e instanceof Ie ? { ...e } : e;
function Nt(e, t) {
  t = t || {};
  const n = {};
  function s(f, d, u, m) {
    return y.isPlainObject(f) && y.isPlainObject(d) ? y.merge.call({ caseless: m }, f, d) : y.isPlainObject(d) ? y.merge({}, d) : y.isArray(d) ? d.slice() : d;
  }
  function r(f, d, u, m) {
    if (y.isUndefined(d)) {
      if (!y.isUndefined(f))
        return s(void 0, f, u, m);
    } else return s(f, d, u, m);
  }
  function o(f, d) {
    if (!y.isUndefined(d))
      return s(void 0, d);
  }
  function i(f, d) {
    if (y.isUndefined(d)) {
      if (!y.isUndefined(f))
        return s(void 0, f);
    } else return s(void 0, d);
  }
  function a(f, d, u) {
    if (u in t)
      return s(f, d);
    if (u in e)
      return s(void 0, f);
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
    validateStatus: a,
    headers: (f, d, u) => r(wo(f), wo(d), u, !0)
  };
  return y.forEach(
    Object.keys({ ...e, ...t }),
    function(d) {
      if (d === "__proto__" || d === "constructor" || d === "prototype")
        return;
      const u = y.hasOwnProp(c, d) ? c[d] : r, m = u(e[d], t[d], d);
      y.isUndefined(m) && u !== a || (n[d] = m);
    }
  ), n;
}
const la = (e) => {
  const t = Nt({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = Ie.from(i), t.url = sa(aa(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  ), y.isFormData(n)) {
    if (Se.hasStandardBrowserEnv || Se.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (y.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([d, u]) => {
        f.includes(d.toLowerCase()) && i.set(d, u);
      });
    }
  }
  if (Se.hasStandardBrowserEnv && (s && y.isFunction(s) && (s = s(t)), s || s !== !1 && Xf(t.url))) {
    const c = r && o && Zf.read(o);
    c && i.set(r, c);
  }
  return t;
}, tu = typeof XMLHttpRequest < "u", nu = tu && function(e) {
  return new Promise(function(n, s) {
    const r = la(e);
    let o = r.data;
    const i = Ie.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: f } = r, d, u, m, v, g;
    function x() {
      v && v(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(d), r.signal && r.signal.removeEventListener("abort", d);
    }
    let b = new XMLHttpRequest();
    b.open(r.method.toUpperCase(), r.url, !0), b.timeout = r.timeout;
    function E() {
      if (!b)
        return;
      const H = Ie.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), U = {
        data: !a || a === "text" || a === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: H,
        config: e,
        request: b
      };
      ia(function(M) {
        n(M), x();
      }, function(M) {
        s(M), x();
      }, U), b = null;
    }
    "onloadend" in b ? b.onloadend = E : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, b.onabort = function() {
      b && (s(new W("Request aborted", W.ECONNABORTED, e, b)), b = null);
    }, b.onerror = function(j) {
      const U = j && j.message ? j.message : "Network Error", P = new W(U, W.ERR_NETWORK, e, b);
      P.event = j || null, s(P), b = null;
    }, b.ontimeout = function() {
      let j = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const U = r.transitional || xr;
      r.timeoutErrorMessage && (j = r.timeoutErrorMessage), s(new W(
        j,
        U.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
        e,
        b
      )), b = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in b && y.forEach(i.toJSON(), function(j, U) {
      b.setRequestHeader(U, j);
    }), y.isUndefined(r.withCredentials) || (b.withCredentials = !!r.withCredentials), a && a !== "json" && (b.responseType = r.responseType), f && ([m, g] = Qn(f, !0), b.addEventListener("progress", m)), c && b.upload && ([u, v] = Qn(c), b.upload.addEventListener("progress", u), b.upload.addEventListener("loadend", v)), (r.cancelToken || r.signal) && (d = (H) => {
      b && (s(!H || H.type ? new Tn(null, e, b) : H), b.abort(), b = null);
    }, r.cancelToken && r.cancelToken.subscribe(d), r.signal && (r.signal.aborted ? d() : r.signal.addEventListener("abort", d)));
    const F = Jf(r.url);
    if (F && Se.protocols.indexOf(F) === -1) {
      s(new W("Unsupported protocol " + F + ":", W.ERR_BAD_REQUEST, e));
      return;
    }
    b.send(o || null);
  });
}, su = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(f) {
      if (!r) {
        r = !0, a();
        const d = f instanceof Error ? f : this.reason;
        s.abort(d instanceof W ? d : new Tn(d instanceof Error ? d.message : d));
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new W(`timeout of ${t}ms exceeded`, W.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(o) : f.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", o));
    const { signal: c } = s;
    return c.unsubscribe = () => y.asap(a), c;
  }
}, ru = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, ou = async function* (e, t) {
  for await (const n of iu(e))
    yield* ru(n, t);
}, iu = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await t.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, _o = (e, t, n, s) => {
  const r = ou(e, t);
  let o = 0, i, a = (c) => {
    i || (i = !0, s && s(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: f, value: d } = await r.next();
        if (f) {
          a(), c.close();
          return;
        }
        let u = d.byteLength;
        if (n) {
          let m = o += u;
          n(m);
        }
        c.enqueue(new Uint8Array(d));
      } catch (f) {
        throw a(f), f;
      }
    },
    cancel(c) {
      return a(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, ko = 64 * 1024, { isFunction: Dn } = y, au = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(y.global), {
  ReadableStream: Co,
  TextEncoder: So
} = y.global, Eo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, lu = (e) => {
  e = y.merge.call({
    skipUndefined: !0
  }, au, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? Dn(t) : typeof fetch == "function", o = Dn(n), i = Dn(s);
  if (!r)
    return !1;
  const a = r && Dn(Co), c = r && (typeof So == "function" ? /* @__PURE__ */ ((g) => (x) => g.encode(x))(new So()) : async (g) => new Uint8Array(await new n(g).arrayBuffer())), f = o && a && Eo(() => {
    let g = !1;
    const x = new n(Se.origin, {
      body: new Co(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !x;
  }), d = i && a && Eo(() => y.isReadableStream(new s("").body)), u = {
    stream: d && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !u[g] && (u[g] = (x, b) => {
      let E = x && x[g];
      if (E)
        return E.call(x);
      throw new W(`Response type '${g}' is not supported`, W.ERR_NOT_SUPPORT, b);
    });
  });
  const m = async (g) => {
    if (g == null)
      return 0;
    if (y.isBlob(g))
      return g.size;
    if (y.isSpecCompliantForm(g))
      return (await new n(Se.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (y.isArrayBufferView(g) || y.isArrayBuffer(g))
      return g.byteLength;
    if (y.isURLSearchParams(g) && (g = g + ""), y.isString(g))
      return (await c(g)).byteLength;
  }, v = async (g, x) => {
    const b = y.toFiniteNumber(g.getContentLength());
    return b ?? m(x);
  };
  return async (g) => {
    let {
      url: x,
      method: b,
      data: E,
      signal: F,
      cancelToken: H,
      timeout: j,
      onDownloadProgress: U,
      onUploadProgress: P,
      responseType: M,
      headers: se,
      withCredentials: L = "same-origin",
      fetchOptions: X
    } = la(g), re = t || fetch;
    M = M ? (M + "").toLowerCase() : "text";
    let B = su([F, H && H.toAbortSignal()], j), ne = null;
    const he = B && B.unsubscribe && (() => {
      B.unsubscribe();
    });
    let Oe;
    try {
      if (P && f && b !== "get" && b !== "head" && (Oe = await v(se, E)) !== 0) {
        let Z = new n(x, {
          method: "POST",
          body: E,
          duplex: "half"
        }), be;
        if (y.isFormData(E) && (be = Z.headers.get("content-type")) && se.setContentType(be), Z.body) {
          const [St, Ft] = xo(
            Oe,
            Qn(yo(P))
          );
          E = _o(Z.body, ko, St, Ft);
        }
      }
      y.isString(L) || (L = L ? "include" : "omit");
      const ee = o && "credentials" in n.prototype, ue = {
        ...X,
        signal: B,
        method: b.toUpperCase(),
        headers: se.normalize().toJSON(),
        body: E,
        duplex: "half",
        credentials: ee ? L : void 0
      };
      ne = o && new n(x, ue);
      let z = await (o ? re(ne, X) : re(x, ue));
      const O = d && (M === "stream" || M === "response");
      if (d && (U || O && he)) {
        const Z = {};
        ["status", "statusText", "headers"].forEach((An) => {
          Z[An] = z[An];
        });
        const be = y.toFiniteNumber(z.headers.get("content-length")), [St, Ft] = U && xo(
          be,
          Qn(yo(U), !0)
        ) || [];
        z = new s(
          _o(z.body, ko, St, () => {
            Ft && Ft(), he && he();
          }),
          Z
        );
      }
      M = M || "text";
      let G = await u[y.findKey(u, M) || "text"](z, g);
      return !O && he && he(), await new Promise((Z, be) => {
        ia(Z, be, {
          data: G,
          headers: Ie.from(z.headers),
          status: z.status,
          statusText: z.statusText,
          config: g,
          request: ne
        });
      });
    } catch (ee) {
      throw he && he(), ee && ee.name === "TypeError" && /Load failed|fetch/i.test(ee.message) ? Object.assign(
        new W("Network Error", W.ERR_NETWORK, g, ne, ee && ee.response),
        {
          cause: ee.cause || ee
        }
      ) : W.from(ee, ee && ee.code, g, ne, ee && ee.response);
    }
  };
}, cu = /* @__PURE__ */ new Map(), ca = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, o = [
    s,
    r,
    n
  ];
  let i = o.length, a = i, c, f, d = cu;
  for (; a--; )
    c = o[a], f = d.get(c), f === void 0 && d.set(c, f = a ? /* @__PURE__ */ new Map() : lu(t)), d = f;
  return f;
};
ca();
const wr = {
  http: Ef,
  xhr: nu,
  fetch: {
    get: ca
  }
};
y.forEach(wr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const To = (e) => `- ${e}`, du = (e) => y.isFunction(e) || e === null || e === !1;
function fu(e, t) {
  e = y.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let a;
    if (r = s, !du(s) && (r = wr[(a = String(s)).toLowerCase()], r === void 0))
      throw new W(`Unknown adapter '${a}'`);
    if (r && (y.isFunction(r) || (r = r.get(t))))
      break;
    o[a || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = n ? i.length > 1 ? `since :
` + i.map(To).join(`
`) : " " + To(i[0]) : "as no adapter specified";
    throw new W(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const da = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: fu,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: wr
};
function Ds(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Tn(null, e);
}
function Ao(e) {
  return Ds(e), e.headers = Ie.from(e.headers), e.data = Ps.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), da.getAdapter(e.adapter || En.adapter, e)(e).then(function(s) {
    return Ds(e), s.data = Ps.call(
      e,
      e.transformResponse,
      s
    ), s.headers = Ie.from(s.headers), s;
  }, function(s) {
    return oa(s) || (Ds(e), s && s.response && (s.response.data = Ps.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = Ie.from(s.response.headers))), Promise.reject(s);
  });
}
const fa = "1.13.5", bs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  bs[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ro = {};
bs.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + fa + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new W(
        r(i, " has been removed" + (n ? " in " + n : "")),
        W.ERR_DEPRECATED
      );
    return n && !Ro[i] && (Ro[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
bs.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function uu(e, t, n) {
  if (typeof e != "object")
    throw new W("options must be an object", W.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const a = e[o], c = a === void 0 || i(a, o, e);
      if (c !== !0)
        throw new W("option " + o + " must be " + c, W.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new W("Unknown option " + o, W.ERR_BAD_OPTION);
  }
}
const Un = {
  assertOptions: uu,
  validators: bs
}, He = Un.validators;
let jt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new bo(),
      response: new bo()
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
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const o = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? o && !String(s.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + o) : s.stack = o;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Nt(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 && Un.assertOptions(s, {
      silentJSONParsing: He.transitional(He.boolean),
      forcedJSONParsing: He.transitional(He.boolean),
      clarifyTimeoutError: He.transitional(He.boolean),
      legacyInterceptorReqResOrdering: He.transitional(He.boolean)
    }, !1), r != null && (y.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : Un.assertOptions(r, {
      encode: He.function,
      serialize: He.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Un.assertOptions(n, {
      baseUrl: He.spelling("baseURL"),
      withXsrfToken: He.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && y.merge(
      o.common,
      o[n.method]
    );
    o && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete o[g];
      }
    ), n.headers = Ie.concat(i, o);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(x) {
      if (typeof x.runWhen == "function" && x.runWhen(n) === !1)
        return;
      c = c && x.synchronous;
      const b = n.transitional || xr;
      b && b.legacyInterceptorReqResOrdering ? a.unshift(x.fulfilled, x.rejected) : a.push(x.fulfilled, x.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(x) {
      f.push(x.fulfilled, x.rejected);
    });
    let d, u = 0, m;
    if (!c) {
      const g = [Ao.bind(this), void 0];
      for (g.unshift(...a), g.push(...f), m = g.length, d = Promise.resolve(n); u < m; )
        d = d.then(g[u++], g[u++]);
      return d;
    }
    m = a.length;
    let v = n;
    for (; u < m; ) {
      const g = a[u++], x = a[u++];
      try {
        v = g(v);
      } catch (b) {
        x.call(this, b);
        break;
      }
    }
    try {
      d = Ao.call(this, v);
    } catch (g) {
      return Promise.reject(g);
    }
    for (u = 0, m = f.length; u < m; )
      d = d.then(f[u++], f[u++]);
    return d;
  }
  getUri(t) {
    t = Nt(this.defaults, t);
    const n = aa(t.baseURL, t.url, t.allowAbsoluteUrls);
    return sa(n, t.params, t.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(t) {
  jt.prototype[t] = function(n, s) {
    return this.request(Nt(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, a) {
      return this.request(Nt(a || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  jt.prototype[t] = n(), jt.prototype[t + "Form"] = n(!0);
});
let pu = class ua {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let o = s._listeners.length;
      for (; o-- > 0; )
        s._listeners[o](r);
      s._listeners = null;
    }), this.promise.then = (r) => {
      let o;
      const i = new Promise((a) => {
        s.subscribe(a), o = a;
      }).then(r);
      return i.cancel = function() {
        s.unsubscribe(o);
      }, i;
    }, t(function(o, i, a) {
      s.reason || (s.reason = new Tn(o, i, a), n(s.reason));
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
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (s) => {
      t.abort(s);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ua(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function hu(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function mu(e) {
  return y.isObject(e) && e.isAxiosError === !0;
}
const Ys = {
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
Object.entries(Ys).forEach(([e, t]) => {
  Ys[t] = e;
});
function pa(e) {
  const t = new jt(e), n = Ki(jt.prototype.request, t);
  return y.extend(n, jt.prototype, t, { allOwnKeys: !0 }), y.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return pa(Nt(e, r));
  }, n;
}
const Q = pa(En);
Q.Axios = jt;
Q.CanceledError = Tn;
Q.CancelToken = pu;
Q.isCancel = oa;
Q.VERSION = fa;
Q.toFormData = gs;
Q.AxiosError = W;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = hu;
Q.isAxiosError = mu;
Q.mergeConfig = Nt;
Q.AxiosHeaders = Ie;
Q.formToJSON = (e) => ra(y.isHTMLForm(e) ? new FormData(e) : e);
Q.getAdapter = da.getAdapter;
Q.HttpStatusCode = Ys;
Q.default = Q;
const {
  Axios: bg,
  AxiosError: vg,
  CanceledError: xg,
  isCancel: yg,
  CancelToken: wg,
  VERSION: _g,
  all: kg,
  Cancel: Cg,
  isAxiosError: Sg,
  spread: Eg,
  toFormData: Tg,
  AxiosHeaders: Ag,
  HttpStatusCode: Rg,
  formToJSON: $g,
  getAdapter: Og,
  mergeConfig: Pg
} = Q, gu = ".btn-approve[data-v-3d0c8d0a]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-3d0c8d0a]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-3d0c8d0a]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-3d0c8d0a]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-3d0c8d0a]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-3d0c8d0a]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-3d0c8d0a]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-3d0c8d0a]{display:flex;align-items:center;gap:14px}.avatar[data-v-3d0c8d0a]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-3d0c8d0a]{display:flex;flex-direction:column}.group-name[data-v-3d0c8d0a]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-3d0c8d0a]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-3d0c8d0a]{display:flex;gap:10px}.btn-action[data-v-3d0c8d0a]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-3d0c8d0a]{width:14px;height:14px}.btn-view[data-v-3d0c8d0a]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-3d0c8d0a]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-3d0c8d0a]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-3d0c8d0a]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-3d0c8d0a]:hover{background-color:#f43f5e;color:#fff}", bu = { class: "surface" }, vu = { class: "surface-header" }, xu = { class: "surface-title" }, yu = { class: "badge" }, wu = { class: "request-list" }, _u = ["id"], ku = { class: "group-info" }, Cu = { class: "avatar" }, Su = { class: "text-content" }, Eu = { class: "group-name" }, Tu = { class: "creator-tag" }, Au = { class: "action-group" }, Ru = ["onClick"], $u = ["onClick"], Ou = ["onClick"], Pu = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken";
    const n = t, s = /* @__PURE__ */ ae(null), r = (a) => {
      s.value = a, n("show_details", a.id);
    }, o = async (a) => {
      try {
        await Q.post(`/api/group/${a}/approve`), n("action_taken");
      } catch (c) {
        console.error(c);
      }
    }, i = async (a) => {
      try {
        await Q.post(`/api/group/${a}/deny`), n("action_taken");
      } catch (c) {
        console.error(c);
      }
    };
    return (a, c) => (A(), $("section", bu, [
      l("div", vu, [
        l("div", xu, [
          c[0] || (c[0] = le(" Inbound Requests ", -1)),
          l("span", yu, S(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      l("div", wu, [
        (A(!0), $(fe, null, Ne(e.groups, (f) => (A(), $("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          l("div", ku, [
            l("div", Cu, S(f.name.charAt(0).toUpperCase()), 1),
            l("div", Su, [
              l("span", Eu, S(f.name), 1),
              l("span", Tu, "by @" + S(f.creator), 1)
            ])
          ]),
          l("div", Au, [
            l("button", {
              class: "btn-action btn-view",
              onClick: (d) => r(f)
            }, [...c[1] || (c[1] = [
              l("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                l("circle", {
                  cx: "12",
                  cy: "12",
                  r: "3"
                })
              ], -1)
            ])], 8, Ru),
            l("button", {
              class: "btn-action btn-approve",
              onClick: (d) => o(f.id)
            }, [...c[2] || (c[2] = [
              l("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                l("polyline", { points: "20 6 9 17 4 12" })
              ], -1)
            ])], 8, $u),
            l("button", {
              class: "btn-action btn-deny",
              onClick: (d) => i(f.id)
            }, [...c[3] || (c[3] = [
              l("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                l("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18"
                }),
                l("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18"
                })
              ], -1)
            ])], 8, Ou)
          ])
        ], 8, _u))), 128))
      ])
    ]));
  }
}, Du = /* @__PURE__ */ xt(Pu, [["styles", [gu]], ["__scopeId", "data-v-3d0c8d0a"]]), Mu = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', ju = { class: "viewport" }, Nu = { class: "header" }, Fu = {
  key: 0,
  class: "status-badge"
}, Iu = { class: "stats" }, Lu = { class: "card" }, Bu = { class: "value" }, zu = { class: "card" }, Uu = {
  class: "value",
  style: { color: "var(--primary)" }
}, Hu = { class: "card" }, Vu = { class: "value" }, qu = { class: "workspace" }, Ku = ["groups"], Wu = { class: "surface pulse-container" }, Ju = { class: "feed-timeline" }, Gu = ["onClick"], Yu = { key: 0 }, Xu = { key: 1 }, Zu = { key: 2 }, Qu = { key: 3 }, ep = { key: 4 }, tp = { class: "feed-body" }, np = { class: "feed-text" }, sp = { class: "highlight" }, rp = { class: "highlight" }, op = { class: "highlight" }, ip = { class: "highlight" }, ap = { class: "highlight" }, lp = { class: "highlight" }, cp = { class: "highlight" }, dp = { class: "feed-time" }, fp = {
  key: 0,
  class: "empty-state"
}, up = { class: "modal-card" }, pp = { class: "modal-header" }, hp = { class: "header-top" }, mp = { class: "badge-group" }, gp = { class: "badge major" }, bp = { class: "modal-body" }, vp = { class: "title-row" }, xp = { class: "group-title" }, yp = {
  key: 0,
  class: "description-box"
}, wp = { class: "description-text" }, _p = { class: "info-grid" }, kp = { class: "info-item" }, Cp = { class: "item-content" }, Sp = { class: "item-value" }, Ep = { class: "info-item" }, Tp = { class: "item-content" }, Ap = { class: "item-value" }, Rp = { class: "info-item" }, $p = { class: "item-content" }, Op = { class: "info-item" }, Pp = { class: "item-content" }, Dp = { class: "info-item" }, Mp = { class: "item-content" }, jp = { class: "item-value" }, Np = { class: "info-item" }, Fp = { class: "item-content" }, Ip = { class: "item-value" }, Lp = { class: "meta-row" }, Bp = { class: "modal-footer" }, zp = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ ae(null), n = /* @__PURE__ */ ae(!1), s = /* @__PURE__ */ ae([]), r = /* @__PURE__ */ ae({}), o = /* @__PURE__ */ ae([]), i = /* @__PURE__ */ ae(!0), a = /* @__PURE__ */ ae(null), c = async () => {
      try {
        const x = await Q.get("/api/admin/dashboard-data");
        s.value = x.data.pendingGroups || [], r.value = x.data.stats || {}, o.value = x.data.activities || [];
      } catch (x) {
        console.error("API Error:", x);
      } finally {
        i.value = !1;
      }
    }, f = (x) => {
      if (x.type === "create" && x.group.id) {
        const b = `group-${x.group.id}`, E = a.value.querySelector("inbound-request");
        if (E && E.shadowRoot) {
          const F = E.shadowRoot.getElementById(b);
          F && (F.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), F.style.outline = "2px solid var(--primary)", F.style.borderRadius = "20px", setTimeout(() => {
            F.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, d = async (x) => {
      const b = x.detail ? x.detail[0] : x;
      if (!b || typeof b == "object") {
        console.error("Invalid ID received:", b);
        return;
      }
      try {
        const E = await Q.get(`/api/group/${b}`);
        t.value = E.data, n.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, u = (x, b) => {
      const E = (j) => {
        if (!j) return null;
        const U = j.match(/(\d{2}:\d{2}):\d{2}/);
        return U ? U[1] : j;
      }, F = E(x), H = E(b);
      return !F && !H ? "Time TBD" : F ? H ? `${F} — ${H}` : `${F} - End TBD` : `Starts at ${H || "TBD"}`;
    }, m = (x, b) => {
      b === "approve" ? v(x) : g(x);
    }, v = async (x) => {
      try {
        await Q.post(`/api/group/${x}/approve`), n.value = !1, c();
      } catch (b) {
        console.error(b);
      }
    }, g = async (x) => {
      try {
        await Q.post(`/api/group/${x}/deny`), n.value = !1, c();
      } catch (b) {
        console.error(b);
      }
    };
    return wn(c), (x, b) => (A(), $("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: a
    }, [
      b[31] || (b[31] = We('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      l("main", ju, [
        l("header", Nu, [
          b[5] || (b[5] = l("h1", null, "Command Center", -1)),
          i.value ? ye("", !0) : (A(), $("div", Fu, [...b[4] || (b[4] = [
            l("div", { class: "dot-live" }, null, -1),
            le(" OPERATIONAL ", -1)
          ])]))
        ]),
        l("section", Iu, [
          l("div", Lu, [
            b[6] || (b[6] = l("span", { class: "label" }, "Total Groups", -1)),
            l("span", Bu, S(r.value.groups || 0), 1)
          ]),
          l("div", zu, [
            b[7] || (b[7] = l("span", { class: "label" }, "Pending", -1)),
            l("span", Uu, S(r.value.pending || 0), 1)
          ]),
          l("div", Hu, [
            b[8] || (b[8] = l("span", { class: "label" }, "Total Students", -1)),
            l("span", Vu, S(r.value.students || 0), 1)
          ])
        ]),
        l("div", qu, [
          l("inbound-request", {
            groups: s.value,
            onAction_taken: c,
            onShow_details: d
          }, null, 40, Ku),
          l("section", Wu, [
            b[14] || (b[14] = l("div", { class: "surface-header" }, [
              l("div", { class: "surface-title" }, [
                le(" Notifications "),
                l("div", { class: "live-indicator" }, [
                  l("span", { class: "dot" })
                ])
              ])
            ], -1)),
            l("div", Ju, [
              (A(!0), $(fe, null, Ne(o.value, (E) => (A(), $("div", {
                key: E.id,
                class: "feed-item",
                onClick: (F) => f(E)
              }, [
                l("div", {
                  class: ve([
                    "feed-icon-wrapper",
                    `bg-${E.type || "default"}`
                  ])
                }, [
                  E.type === "register" ? (A(), $("span", Yu, "👋")) : E.type === "create" ? (A(), $("span", Xu, "👤")) : E.type === "approve" ? (A(), $("span", Zu, " 👍")) : E.type === "deny" ? (A(), $("span", Qu, "🚫")) : (A(), $("span", ep, "🔔"))
                ], 2),
                l("div", tp, [
                  l("div", np, [
                    E.type === "register" ? (A(), $(fe, { key: 0 }, [
                      l("span", sp, S(E.sender), 1),
                      b[9] || (b[9] = le(" joined our community ", -1))
                    ], 64)) : E.type === "create" ? (A(), $(fe, { key: 1 }, [
                      l("span", rp, S(E.sender), 1),
                      b[10] || (b[10] = le(" wants to start ", -1)),
                      l("span", op, S(E.group.name), 1)
                    ], 64)) : E.type === "approve" ? (A(), $(fe, { key: 2 }, [
                      l("span", ip, S(E.sender), 1),
                      b[11] || (b[11] = le(" approved the group ", -1)),
                      l("span", ap, S(E.group.name), 1)
                    ], 64)) : E.type === "deny" ? (A(), $(fe, { key: 3 }, [
                      l("span", lp, S(E.sender), 1),
                      b[12] || (b[12] = le(" denied the group ", -1)),
                      l("span", cp, S(E.group.name), 1)
                    ], 64)) : (A(), $(fe, { key: 4 }, [
                      le(S(E.message || "Update"), 1)
                    ], 64))
                  ]),
                  l("span", dp, S(E.time_ago), 1)
                ])
              ], 8, Gu))), 128)),
              !o.value?.length && !i.value ? (A(), $("div", fp, [...b[13] || (b[13] = [
                l("p", null, "📭 No recent pulses.", -1)
              ])])) : ye("", !0)
            ])
          ]),
          n.value && t.value ? (A(), $("div", {
            key: 0,
            class: "modal-overlay",
            onClick: b[3] || (b[3] = Lc((E) => n.value = !1, ["self"]))
          }, [
            l("div", up, [
              l("div", pp, [
                l("div", hp, [
                  l("div", mp, [
                    l("span", gp, S(t.value.major || "Undeclared"), 1),
                    l("span", {
                      class: ve(["badge", t.value.group_type])
                    }, S(t.value.group_type === "general" ? "General" : "Project"), 3),
                    l("span", {
                      class: ve(["badge status", t.value.status.toLowerCase()])
                    }, S(t.value.status), 3)
                  ]),
                  l("button", {
                    class: "close-btn",
                    onClick: b[0] || (b[0] = (E) => n.value = !1)
                  }, "✕")
                ])
              ]),
              l("div", bp, [
                l("div", vp, [
                  l("h3", xp, S(t.value.name), 1),
                  l("span", {
                    class: ve(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    b[15] || (b[15] = l("span", { class: "tag-emoji" }, "📖", -1)),
                    l("span", null, S(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? (A(), $("div", yp, [
                  l("p", wp, " “" + S(t.value.description) + "” ", 1)
                ])) : ye("", !0),
                l("div", _p, [
                  l("div", kp, [
                    b[17] || (b[17] = l("span", { class: "item-emoji" }, "📅", -1)),
                    l("div", Cp, [
                      b[16] || (b[16] = l("span", { class: "item-label" }, "Day", -1)),
                      l("span", Sp, S(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  l("div", Ep, [
                    b[19] || (b[19] = l("span", { class: "item-emoji" }, "⏰", -1)),
                    l("div", Tp, [
                      b[18] || (b[18] = l("span", { class: "item-label" }, "Time", -1)),
                      l("span", Ap, S(u(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  l("div", Rp, [
                    b[21] || (b[21] = l("span", { class: "item-emoji" }, "🎯", -1)),
                    l("div", $p, [
                      b[20] || (b[20] = l("span", { class: "item-label" }, "Interest", -1)),
                      l("span", {
                        class: ve(["item-value", { "is-null": !t.value.interest }])
                      }, S(t.value.interest || "None"), 3)
                    ])
                  ]),
                  l("div", Op, [
                    b[23] || (b[23] = l("span", { class: "item-emoji" }, "📚", -1)),
                    l("div", Pp, [
                      b[22] || (b[22] = l("span", { class: "item-label" }, "Semester", -1)),
                      l("span", {
                        class: ve(["item-value", { "is-null": !t.value.semester }])
                      }, S(t.value.semester || "—"), 3)
                    ])
                  ]),
                  l("div", Dp, [
                    b[25] || (b[25] = l("span", { class: "item-emoji" }, "👥", -1)),
                    l("div", Mp, [
                      b[24] || (b[24] = l("span", { class: "item-label" }, "Members", -1)),
                      l("span", jp, S(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  l("div", Np, [
                    b[27] || (b[27] = l("span", { class: "item-emoji" }, "👤", -1)),
                    l("div", Fp, [
                      b[26] || (b[26] = l("span", { class: "item-label" }, "Creator", -1)),
                      l("span", Ip, "ID: " + S(t.value.creator), 1)
                    ])
                  ])
                ]),
                l("div", Lp, [
                  l("span", {
                    class: ve(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    b[28] || (b[28] = l("span", { class: "chip-dot" }, null, -1)),
                    le(" " + S(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  l("span", {
                    class: ve(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    b[29] || (b[29] = l("span", { class: "chip-dot" }, null, -1)),
                    le(" " + S(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  l("span", {
                    class: ve(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    b[30] || (b[30] = l("span", { class: "chip-dot" }, null, -1)),
                    le(" " + S(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              l("div", Bp, [
                l("button", {
                  onClick: b[1] || (b[1] = (E) => m(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                l("button", {
                  onClick: b[2] || (b[2] = (E) => m(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : ye("", !0)
        ])
      ])
    ], 512));
  }
}, Up = /* @__PURE__ */ xt(zp, [["styles", [Mu]]]), Hp = "[data-v-5c526232]{margin:0;padding:0;box-sizing:border-box}.bento-chat-container[data-v-5c526232]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#f5f7fa;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow:hidden}.bento-layout[data-v-5c526232]{display:grid;grid-template-columns:280px 1fr 320px;height:100vh;padding:20px;gap:20px}.bento-sidebar[data-v-5c526232],.bento-main[data-v-5c526232],.bento-resources[data-v-5c526232]{background:#fff;border-radius:32px;box-shadow:0 10px 30px -10px #00000008,0 0 0 1px #00000005;overflow:hidden;display:flex;flex-direction:column;height:calc(100vh - 40px)}.bento-sidebar[data-v-5c526232]{padding:0}.sidebar-header[data-v-5c526232]{padding:24px 20px 16px;border-bottom:1px solid #f1f5f9}.sidebar-brand[data-v-5c526232]{display:flex;align-items:center;gap:12px;margin-bottom:12px}.brand-icon[data-v-5c526232]{width:40px;height:40px;background:#1e3a5f;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff}.brand-name[data-v-5c526232]{font-size:18px;font-weight:700;color:#0f172a}.sidebar-badge[data-v-5c526232]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:11px;font-weight:600;color:#1e3a5f;display:inline-block}.sidebar-section[data-v-5c526232]{padding:20px;flex:1;overflow-y:auto}.sidebar-section[data-v-5c526232]::-webkit-scrollbar{width:4px}.sidebar-section[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.sidebar-section[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.section-header[data-v-5c526232]{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.section-title[data-v-5c526232]{font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase}.online-count[data-v-5c526232]{font-size:11px;color:#10b981;font-weight:600;background:#d1fae5;padding:2px 8px;border-radius:30px}.members-list[data-v-5c526232]{display:flex;flex-direction:column;gap:8px}.member-card[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;transition:all .2s}.member-card[data-v-5c526232]:hover{background:#f8fafc}.member-avatar-wrapper[data-v-5c526232]{position:relative;width:44px;height:44px}.member-avatar[data-v-5c526232]{width:100%;height:100%;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.1rem;color:#fff;box-shadow:0 4px 8px #0000000d}.status-dot[data-v-5c526232]{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;border:2px solid white}.status-dot.online[data-v-5c526232]{background:#10b981}.status-dot.away[data-v-5c526232]{background:#f59e0b}.member-details[data-v-5c526232]{flex:1}.member-name[data-v-5c526232]{font-size:14px;font-weight:600;color:#0f172a;margin-bottom:2px}.member-status-text[data-v-5c526232]{font-size:11px;color:#94a3b8}.bento-main[data-v-5c526232]{display:flex;flex-direction:column;background:#fff}.chat-header[data-v-5c526232]{padding:24px 28px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center}.group-name[data-v-5c526232]{font-size:22px;font-weight:700;color:#0f172a;margin-bottom:6px;letter-spacing:-.02em}.group-meta[data-v-5c526232]{display:flex;gap:16px}.meta-item[data-v-5c526232]{display:flex;align-items:center;gap:6px;font-size:13px;color:#64748b}.meta-item.online[data-v-5c526232]{color:#10b981}.online-dot[data-v-5c526232]{width:8px;height:8px;background:#10b981;border-radius:50%;display:inline-block}.video-button[data-v-5c526232]{width:48px;height:48px;border-radius:16px;background:#1e3a5f;border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.video-button[data-v-5c526232]:hover{background:#14273f;transform:translateY(-2px);box-shadow:0 8px 16px #1e3a5f4d}.messages-container[data-v-5c526232]{flex:1;overflow-y:auto;padding:28px;background:#f8fafc}.messages-container[data-v-5c526232]::-webkit-scrollbar{width:4px}.messages-container[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.messages-container[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.message-group[data-v-5c526232]{margin-bottom:20px;animation:slideIn-5c526232 .2s ease}@keyframes slideIn-5c526232{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.message-row[data-v-5c526232]{display:flex;max-width:70%}.own-message[data-v-5c526232]{margin-left:auto;justify-content:flex-end}.peer-message[data-v-5c526232]{margin-right:auto;justify-content:flex-start}.message-bubble[data-v-5c526232]{background:#fff;border-radius:20px;padding:12px 16px;box-shadow:0 2px 8px #00000005;border:1px solid #f1f5f9}.own-message .message-bubble[data-v-5c526232]{background:#1e3a5f;border-color:#1e3a5f}.message-header[data-v-5c526232]{display:flex;align-items:center;gap:8px;margin-bottom:6px}.own-message .message-header[data-v-5c526232]{justify-content:flex-end}.message-sender[data-v-5c526232]{font-size:12px;font-weight:600;color:#1e3a5f}.own-message .message-sender[data-v-5c526232]{color:#ffffffe6}.message-time[data-v-5c526232]{font-size:10px;color:#94a3b8}.own-message .message-time[data-v-5c526232]{color:#fff9}.text-content[data-v-5c526232]{font-size:14px;line-height:1.6;color:#1a2e35;word-wrap:break-word}.own-message .text-content[data-v-5c526232]{color:#fff}.file-link[data-v-5c526232]{text-decoration:none;display:block}.file-preview[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:8px;background:#f8fafc;border-radius:16px;min-width:260px;transition:all .2s}.file-preview[data-v-5c526232]:hover{background:#f1f5f9}.own-message .file-preview[data-v-5c526232]{background:#ffffff1a}.file-icon-wrapper[data-v-5c526232]{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.file-icon-wrapper.image[data-v-5c526232]{background:#dcfce7;color:#16a34a}.file-icon-wrapper.pdf[data-v-5c526232]{background:#fee2e2;color:#dc2626}.file-icon-wrapper.document[data-v-5c526232]{background:#dbeafe;color:#2563eb}.file-icon-wrapper.presentation[data-v-5c526232]{background:#fed7aa;color:#c2410c}.file-icon-wrapper.spreadsheet[data-v-5c526232]{background:#dcfce7;color:#059669}.file-icon-wrapper.archive[data-v-5c526232]{background:#fef9c3;color:#ca8a04}.file-icon-wrapper.audio[data-v-5c526232]{background:#fae8ff;color:#a21caf}.file-icon-wrapper.video[data-v-5c526232]{background:#ffe4e6;color:#be123c}.file-icon-wrapper.code[data-v-5c526232]{background:#e0f2fe;color:#0369a1}.file-icon-wrapper[data-v-5c526232]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.own-message .file-icon-wrapper[data-v-5c526232]{background:#fff3;color:#fff}.file-details[data-v-5c526232]{flex:1;min-width:0}.file-name[data-v-5c526232]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.own-message .file-name[data-v-5c526232]{color:#fff}.file-meta[data-v-5c526232]{font-size:10px;color:#94a3b8}.own-message .file-meta[data-v-5c526232]{color:#ffffffb3}.file-download-icon[data-v-5c526232]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transform:scale(.9);transition:all .2s}.file-preview:hover .file-download-icon[data-v-5c526232]{opacity:1;transform:scale(1)}.input-area[data-v-5c526232]{padding:20px 28px;background:#fff;border-top:1px solid #f1f5f9}.input-wrapper[data-v-5c526232]{display:flex;align-items:center;gap:12px;background:#f8fafc;border:1px solid #f1f5f9;border-radius:40px;padding:4px 4px 4px 16px;transition:all .2s}.input-wrapper[data-v-5c526232]:focus-within{border-color:#1e3a5f;box-shadow:0 0 0 4px #1e3a5f1a;background:#fff}.attach-btn[data-v-5c526232]{width:40px;height:40px;border-radius:20px;border:none;background:transparent;color:#1e3a5f;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.attach-btn[data-v-5c526232]:hover{background:#f1f5f9;transform:scale(1.1)}.file-input[data-v-5c526232]{display:none}.message-input[data-v-5c526232]{flex:1;border:none;background:transparent;outline:none;font-size:14px;color:#0f172a;padding:10px 0}.message-input[data-v-5c526232]::placeholder{color:#94a3b8}.send-btn[data-v-5c526232]{width:44px;height:44px;border-radius:22px;border:none;background:#1e3a5f;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.send-btn[data-v-5c526232]:hover{background:#14273f;transform:scale(1.05)}.bento-resources[data-v-5c526232]{padding:0}.resources-header[data-v-5c526232]{padding:24px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}.resources-title[data-v-5c526232]{display:flex;align-items:center;gap:10px}.resources-title svg[data-v-5c526232]{color:#1e3a5f}.resources-title h3[data-v-5c526232]{font-size:16px;font-weight:600;color:#0f172a;margin:0}.resources-count[data-v-5c526232]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:12px;font-weight:600;color:#1e3a5f}.resources-list[data-v-5c526232]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}.resources-list[data-v-5c526232]::-webkit-scrollbar{width:4px}.resources-list[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.resources-list[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.resource-item[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:18px;transition:all .2s;cursor:pointer;text-decoration:none;color:inherit}.resource-item[data-v-5c526232]:hover{background:#f1f5f9;transform:translate(4px)}.resource-icon[data-v-5c526232]{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.resource-icon.image[data-v-5c526232]{background:#dcfce7;color:#16a34a}.resource-icon.pdf[data-v-5c526232]{background:#fee2e2;color:#dc2626}.resource-icon.document[data-v-5c526232]{background:#dbeafe;color:#2563eb}.resource-icon.presentation[data-v-5c526232]{background:#fed7aa;color:#c2410c}.resource-icon.spreadsheet[data-v-5c526232]{background:#dcfce7;color:#059669}.resource-icon.archive[data-v-5c526232]{background:#fef9c3;color:#ca8a04}.resource-icon.audio[data-v-5c526232]{background:#fae8ff;color:#a21caf}.resource-icon.video[data-v-5c526232]{background:#ffe4e6;color:#be123c}.resource-icon.code[data-v-5c526232]{background:#e0f2fe;color:#0369a1}.resource-icon[data-v-5c526232]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.resource-content[data-v-5c526232]{flex:1;min-width:0}.resource-name[data-v-5c526232]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-meta[data-v-5c526232]{display:flex;gap:8px;font-size:10px}.resource-uploader[data-v-5c526232]{color:#1e3a5f;font-weight:500}.resource-size[data-v-5c526232]{color:#94a3b8}.resource-download[data-v-5c526232]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transition:all .2s}.resource-item:hover .resource-download[data-v-5c526232]{opacity:1}.resource-download[data-v-5c526232]:hover{background:#1e3a5f;color:#fff;transform:scale(1.1)}@media(max-width:1200px){.bento-layout[data-v-5c526232]{grid-template-columns:240px 1fr 280px}}@media(max-width:900px){.bento-layout[data-v-5c526232]{grid-template-columns:1fr;padding:10px}.bento-sidebar[data-v-5c526232],.bento-resources[data-v-5c526232]{display:none}.back-button-container[data-v-5c526232]{bottom:20px;left:20px}.back-button[data-v-5c526232]{padding:10px 18px;font-size:14px}}", Vp = { class: "bento-chat-container" }, qp = { class: "bento-layout" }, Kp = { class: "bento-sidebar" }, Wp = { class: "sidebar-header" }, Jp = { class: "sidebar-badge" }, Gp = { class: "sidebar-section" }, Yp = { class: "section-header" }, Xp = { class: "online-count" }, Zp = { class: "members-list" }, Qp = { class: "member-avatar-wrapper" }, eh = { class: "member-details" }, th = { class: "member-name" }, nh = { class: "member-status-text" }, sh = { class: "bento-main" }, rh = { class: "chat-header" }, oh = { class: "header-info" }, ih = { class: "group-name" }, ah = { class: "group-meta" }, lh = { class: "meta-item" }, ch = { class: "meta-item online" }, dh = { class: "message-bubble" }, fh = { class: "message-header" }, uh = { class: "message-sender" }, ph = { class: "message-time" }, hh = {
  key: 0,
  class: "text-content"
}, mh = ["href", "download"], gh = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, bh = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, vh = {
  key: 2,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, xh = { class: "file-details" }, yh = { class: "file-name" }, wh = { class: "file-meta" }, _h = { class: "input-area" }, kh = { class: "input-wrapper" }, Ch = { class: "bento-resources" }, Sh = { class: "resources-header" }, Eh = { class: "resources-count" }, Th = { class: "resources-list" }, Ah = ["href", "download"], Rh = { class: "resource-content" }, $h = { class: "resource-name" }, Oh = { class: "resource-meta" }, Ph = { class: "resource-uploader" }, Dh = { class: "resource-size" }, Mh = {
  __name: "ChatRoom.ce",
  props: { currentUser: [String] },
  setup(e) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken", Q.defaults.withCredentials = !0;
    let t = /* @__PURE__ */ Ga(null);
    const n = /* @__PURE__ */ ae(null), s = /* @__PURE__ */ ae(null), r = /* @__PURE__ */ ae(null), o = /* @__PURE__ */ ae([]), i = /* @__PURE__ */ ae([]), a = /* @__PURE__ */ ae([]), c = e, f = /* @__PURE__ */ ae(""), d = /* @__PURE__ */ ae(null), u = (U) => {
      const P = [
        "#4158D0",
        "#C850C0",
        "#0093E9",
        "#80D0C7",
        "#8EC5FC",
        "#E0C3FC"
      ], M = (U?.length || 0) % P.length;
      return P[M];
    }, m = (U) => !U || U === 0 ? "0 Bytes" : (U / (1024 * 1024)).toFixed(2) + " MB", v = (U) => {
      if (!U) return "";
      const P = new Date(U);
      return isNaN(P.getTime()) ? U : P.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      });
    }, g = () => {
      s.value.click();
    }, x = async (U) => {
      const P = U.target;
      if (!P || !P.files.length) return;
      const M = P.files[0], se = new FormData();
      se.append("file", M), se.append("group_id", n.value);
      try {
        const L = await Q.post(
          "http://127.0.0.1:8000/chat/api/upload/",
          se
        );
        if (L.status === 201 || L.status === 200) {
          const X = L.data.data;
          t.value.send(
            JSON.stringify({
              message_type: "file",
              file_url: X.file_url,
              file_name: X.file_name,
              file_type: X.file_type,
              file_size: X.file_size,
              sender: c.currentUser,
              message: X.file_name,
              group_id: n.value
            })
          );
        }
      } catch (L) {
        console.error("Upload failed!", L.response?.data || L.message);
      }
      P.value = "";
    }, b = async (U) => {
      try {
        const P = await Q.get(U), M = P.data;
        if (P.status == 200) {
          a.value = M.shared_files || [], o.value = M.members || [], i.value = M.messages || [], r.value = M.group_name;
          const se = o.value.find((L) => String(L.username) === String(c.currentUser));
          se && (se.status = "online"), E(), qn(() => {
            d.value && (d.value.scrollTop = d.value.scrollHeight);
          });
        }
      } catch (P) {
        console.error("Error fetching data:", P);
      }
    }, E = () => {
      qn(() => {
        d.value && (d.value.scrollTop = d.value.scrollHeight);
      });
    }, F = () => {
      console.log("Starting video call..."), alert("Video call feature coming soon!");
    }, H = we(() => o.value.filter((U) => U.status === "online").length);
    wn(() => {
      const U = window.location.pathname.split("/");
      n.value = U.filter((se) => se !== "").pop();
      const P = `ws://127.0.0.1:8000/ws/chat/${n.value}/`, M = `http://127.0.0.1:8000/chat/api/${n.value}/`;
      b(M), t.value = new WebSocket(P), t.value.onmessage = (se) => {
        const L = JSON.parse(se.data);
        if (L.type === "user_status_change") {
          const X = o.value.find(
            (re) => String(re.id) === String(L.user_id)
          );
          X && (X.status = L.status);
        } else
          i.value.push({ ...L }), L.message_type === "file" && a.value.unshift({
            id: L.id || Date.now(),
            file_name: L.file_name,
            file_type: L.file_type,
            uploader: L.sender,
            file_url: L.file_url,
            file_size: L.file_size,
            uploaded_at: L.uploaded_at
          }), E();
      };
    }), ur(() => {
      t.value && (console.log("Closing web socket..."), t.value.close());
    });
    const j = () => {
      f.value.trim() && (t.value.send(
        JSON.stringify({
          message: f.value,
          sender: c.currentUser,
          message_type: "text",
          group_id: n.value
        })
      ), f.value = "");
    };
    return (U, P) => (A(), $("div", Vp, [
      l("div", qp, [
        l("aside", Kp, [
          l("div", Wp, [
            P[1] || (P[1] = We('<div class="sidebar-brand" data-v-5c526232><div class="brand-icon" data-v-5c526232><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" data-v-5c526232><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-5c526232></path></svg></div><span class="brand-name" data-v-5c526232>StudySync</span></div>', 1)),
            l("div", Jp, S(o.value?.length) + " members", 1)
          ]),
          l("div", Gp, [
            l("div", Yp, [
              P[2] || (P[2] = l("span", { class: "section-title" }, "MEMBERS", -1)),
              l("span", Xp, S(H.value) + " online", 1)
            ]),
            l("div", Zp, [
              (A(!0), $(fe, null, Ne(o.value, (M) => (A(), $("div", {
                key: M.id,
                class: "member-card"
              }, [
                l("div", Qp, [
                  l("div", {
                    class: "member-avatar",
                    style: qe({ backgroundColor: u(M.username) })
                  }, S(M.username.charAt(0).toUpperCase()), 5),
                  l("div", {
                    class: ve(["status-dot", M.status])
                  }, null, 2)
                ]),
                l("div", eh, [
                  l("div", th, S(M.username), 1),
                  l("div", nh, S(M.status === "online" ? "Online" : "Away"), 1)
                ])
              ]))), 128))
            ])
          ])
        ]),
        l("main", sh, [
          l("div", rh, [
            l("div", oh, [
              l("h1", ih, S(r.value), 1),
              l("div", ah, [
                l("span", lh, [
                  P[3] || (P[3] = l("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    l("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    l("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  le(" " + S(o.value?.length) + " members ", 1)
                ]),
                l("span", ch, [
                  P[4] || (P[4] = l("span", { class: "online-dot" }, null, -1)),
                  le(" " + S(H.value) + " online ", 1)
                ])
              ])
            ]),
            l("button", {
              class: "video-button",
              onClick: F,
              title: "Start Video Call"
            }, [...P[5] || (P[5] = [
              l("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M23 7L16 12L23 17V7Z" }),
                l("rect", {
                  x: "1",
                  y: "5",
                  width: "15",
                  height: "14",
                  rx: "2",
                  ry: "2"
                })
              ], -1)
            ])])
          ]),
          l("div", {
            class: "messages-container",
            ref_key: "messagesContainer",
            ref: d
          }, [
            (A(!0), $(fe, null, Ne(i.value, (M) => (A(), $("div", {
              key: M.id,
              class: "message-group"
            }, [
              l("div", {
                class: ve([
                  "message-row",
                  M.sender === e.currentUser ? "own-message" : "peer-message"
                ])
              }, [
                l("div", dh, [
                  l("div", fh, [
                    l("span", uh, S(M.sender), 1),
                    l("span", ph, S(v(M.time)), 1)
                  ]),
                  M.message_type === "text" ? (A(), $("div", hh, S(M.message), 1)) : M.message_type === "file" ? (A(), $("a", {
                    key: 1,
                    href: "http://127.0.0.1:8000" + M.file_url,
                    download: M.file_name,
                    target: "_blank",
                    class: "file-link"
                  }, [
                    l("div", {
                      class: ve(["file-preview", { "own-file": M.sender === e.currentUser }])
                    }, [
                      l("div", {
                        class: ve(["file-icon-wrapper", M.file_type?.toLowerCase()])
                      }, [
                        M.file_type == "image" ? (A(), $("svg", gh, [...P[6] || (P[6] = [
                          l("rect", {
                            x: "2",
                            y: "2",
                            width: "20",
                            height: "20",
                            rx: "2",
                            ry: "2"
                          }, null, -1),
                          l("circle", {
                            cx: "8.5",
                            cy: "8.5",
                            r: "1.5",
                            fill: "currentColor"
                          }, null, -1),
                          l("polyline", { points: "21 15 16 10 5 21" }, null, -1)
                        ])])) : M.file_type === "pdf" ? (A(), $("svg", bh, [...P[7] || (P[7] = [
                          We('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-5c526232></path><polyline points="14 2 14 8 20 8" data-v-5c526232></polyline><path d="M9 15h6" data-v-5c526232></path><path d="M9 18h4" data-v-5c526232></path><circle cx="16" cy="15" r="1" fill="currentColor" data-v-5c526232></circle>', 5)
                        ])])) : (A(), $("svg", vh, [...P[8] || (P[8] = [
                          l("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }, null, -1),
                          l("polyline", { points: "13 2 13 9 20 9" }, null, -1)
                        ])]))
                      ], 2),
                      l("div", xh, [
                        l("div", yh, S(M.file_name), 1),
                        l("div", wh, S(M.file_type?.toUpperCase()) + " • " + S(m(M.file_size)), 1)
                      ]),
                      P[9] || (P[9] = We('<div class="file-download-icon" data-v-5c526232><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c526232><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-5c526232></path><polyline points="7 10 12 15 17 10" data-v-5c526232></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-5c526232></line></svg></div>', 1))
                    ], 2)
                  ], 8, mh)) : ye("", !0)
                ])
              ], 2)
            ]))), 128))
          ], 512),
          l("div", _h, [
            l("div", kh, [
              l("button", {
                class: "attach-btn",
                onClick: g
              }, [...P[10] || (P[10] = [
                l("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  l("path", { d: "M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18" }),
                  l("path", { d: "M16 8L8 16" })
                ], -1)
              ])]),
              l("input", {
                type: "file",
                ref_key: "fileInput",
                ref: s,
                class: "file-input",
                onChange: x
              }, null, 544),
              is(l("input", {
                type: "text",
                "onUpdate:modelValue": P[0] || (P[0] = (M) => f.value = M),
                onKeyup: Ui(j, ["enter"]),
                placeholder: "Type a message...",
                class: "message-input"
              }, null, 544), [
                [us, f.value]
              ]),
              l("button", {
                class: "send-btn",
                onClick: j
              }, [...P[11] || (P[11] = [
                l("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5"
                }, [
                  l("line", {
                    x1: "22",
                    y1: "2",
                    x2: "11",
                    y2: "13"
                  }),
                  l("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                ], -1)
              ])])
            ])
          ])
        ]),
        l("aside", Ch, [
          l("div", Sh, [
            P[12] || (P[12] = l("div", { class: "resources-title" }, [
              l("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
              ]),
              l("h3", null, "Resources")
            ], -1)),
            l("span", Eh, S(a.value.length), 1)
          ]),
          l("div", Th, [
            (A(!0), $(fe, null, Ne(a.value, (M) => (A(), $("a", {
              key: M.id,
              href: "http://127.0.0.1:8000" + M.file_url,
              download: M.file_name,
              target: "_blank",
              class: "resource-item"
            }, [
              l("div", {
                class: ve(["resource-icon", M.file_type?.toLowerCase()])
              }, [...P[13] || (P[13] = [
                l("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  l("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
                  l("polyline", { points: "13 2 13 9 20 9" })
                ], -1)
              ])], 2),
              l("div", Rh, [
                l("div", $h, S(M.file_name), 1),
                l("div", Oh, [
                  l("span", Ph, S(M.uploader), 1),
                  l("span", Dh, S(m(M.file_size)), 1)
                ])
              ]),
              P[14] || (P[14] = We('<div class="resource-download" data-v-5c526232><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c526232><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-5c526232></path><polyline points="7 10 12 15 17 10" data-v-5c526232></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-5c526232></line></svg></div>', 1))
            ], 8, Ah))), 128))
          ])
        ])
      ])
    ]));
  }
}, jh = /* @__PURE__ */ xt(Mh, [["styles", [Hp]], ["__scopeId", "data-v-5c526232"]]), Nh = ".post-card-improved[data-v-d35c2e4e]{background:#fff;border-radius:24px;padding:1.5rem;margin-bottom:1.2rem;border:1px solid #f1f5f9;transition:all .2s;position:relative}.post-card-improved[data-v-d35c2e4e]:hover{background:#fff;border-color:#1e3a5f30;transform:translateY(-2px);box-shadow:0 8px 24px -8px #1e3a5f26}.hot-badge-improved[data-v-d35c2e4e]{position:absolute;top:1.2rem;right:1.2rem;background:linear-gradient(135deg,#f59e0b,#dc2626);color:#fff;padding:.25rem 1.2rem;border-radius:30px;font-size:.65rem;font-weight:600;display:flex;align-items:center;gap:.3rem;box-shadow:0 4px 10px #dc262640}.hot-badge-improved svg[data-v-d35c2e4e]{width:12px;height:12px}.post-header-improved[data-v-d35c2e4e]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.post-avatar-improved[data-v-d35c2e4e]{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;font-weight:600;flex-shrink:0;position:relative;box-shadow:0 4px 10px #1e3a5f33}.online-badge[data-v-d35c2e4e]{position:absolute;bottom:0;right:0;width:12px;height:12px;background:#10b981;border-radius:50%;border:2px solid white}.post-author-improved h4[data-v-d35c2e4e]{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:.2rem;display:flex;align-items:center;gap:.5rem}.post-badge-improved[data-v-d35c2e4e]{background:#1e3a5f15;color:#1e3a5f;font-size:.65rem;padding:.15rem .7rem;border-radius:30px;font-weight:500}.post-time-improved[data-v-d35c2e4e]{font-size:.7rem;color:#64748b;display:flex;align-items:center;gap:.3rem}.post-time-improved svg[data-v-d35c2e4e]{width:12px;height:12px}.post-content-improved[data-v-d35c2e4e]{margin-bottom:1rem;padding-left:.2rem}.post-content-improved p[data-v-d35c2e4e]{font-size:.9rem;color:#1a2e35;line-height:1.6;margin-bottom:.8rem}.post-media-improved[data-v-d35c2e4e]{display:flex;align-items:center;gap:1rem;background:#fff;padding:.8rem 1rem;border-radius:18px;margin-bottom:1rem;border:1px solid #e2e8f0;transition:all .2s;cursor:pointer}.post-media-improved[data-v-d35c2e4e]:hover{background:#f8fafc;border-color:#1e3a5f40}.media-icon-improved[data-v-d35c2e4e]{width:44px;height:44px;background:linear-gradient(135deg,#1e3a5f10,#4f6af510);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#1e3a5f}.media-icon-improved svg[data-v-d35c2e4e]{width:22px;height:22px}.media-info-improved[data-v-d35c2e4e]{flex:1}.media-info-improved h5[data-v-d35c2e4e]{font-size:.85rem;font-weight:600;color:#0f172a;margin-bottom:.15rem}.media-info-improved p[data-v-d35c2e4e]{font-size:.7rem;color:#64748b;margin:0}.media-action-improved[data-v-d35c2e4e]{width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;color:#1e3a5f;cursor:pointer;transition:all .2s}.media-action-improved[data-v-d35c2e4e]:hover{background:#1e3a5f;color:#fff}.media-action-improved svg[data-v-d35c2e4e]{width:18px;height:18px}.post-tags-improved[data-v-d35c2e4e]{display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}.tag-improved[data-v-d35c2e4e]{background:#fff;border:1px solid #e2e8f0;padding:.2rem 1rem;border-radius:40px;font-size:.7rem;color:#1e3a5f;font-weight:500;transition:all .2s;cursor:pointer}.tag-improved[data-v-d35c2e4e]:hover{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.post-engagement-improved[data-v-d35c2e4e]{display:flex;gap:1.5rem;padding-top:1rem;border-top:1px solid #e2e8f0}.engagement-item[data-v-d35c2e4e]{display:flex;align-items:center;gap:.3rem;color:#64748b;font-size:.8rem;transition:all .2s;cursor:pointer;border:none;background:transparent;padding:0}.engagement-item[data-v-d35c2e4e]:hover{color:#1e3a5f}.engagement-item.liked[data-v-d35c2e4e]{color:#dc2626}.engagement-item.liked svg[data-v-d35c2e4e]{fill:#dc2626}.engagement-item svg[data-v-d35c2e4e]{width:18px;height:18px}", Fh = { class: "post-card-improved" }, Ih = {
  key: 0,
  class: "hot-badge-improved"
}, Lh = { class: "post-header-improved" }, Bh = {
  key: 0,
  class: "online-badge"
}, zh = { class: "post-author-improved" }, Uh = {
  key: 0,
  class: "post-badge-improved"
}, Hh = { class: "post-time-improved" }, Vh = { class: "post-content-improved" }, qh = {
  key: 1,
  class: "post-media-improved"
}, Kh = {
  key: 2,
  class: "post-tags-improved"
}, Wh = { class: "post-engagement-improved" }, Jh = ["fill"], Gh = {
  __name: "PostCard.ce",
  props: {
    post: { type: Object, required: !0 },
    currentUser: { type: Object, required: !0 },
    groupCreatorId: { type: [Number, String], default: null },
    expanded: { type: Boolean, default: !1 }
  },
  emits: ["like", "delete", "view-comments"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = (c) => {
      const f = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], d = c.split("").reduce((u, m) => u + m.charCodeAt(0), 0) % f.length;
      return f[d];
    }, o = (c) => {
      if (!c) return "recently";
      const f = new Date(c), u = /* @__PURE__ */ new Date() - f, m = Math.floor(u / 6e4);
      return m < 1 ? "Just now" : m < 60 ? `${m}m ago` : m < 1440 ? `${Math.floor(m / 60)}h ago` : f.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }, i = () => {
      s("like", n.post);
    }, a = () => {
      s("view-comments", n.post);
    };
    return (c, f) => (A(), $("div", Fh, [
      e.post.isHot ? (A(), $("div", Ih, [...f[0] || (f[0] = [
        l("svg", {
          width: "12",
          height: "12",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [
          l("path", { d: "M8 9l4-4 4 4m0 6l-4 4-4-4" })
        ], -1),
        le(" Hot ", -1)
      ])])) : ye("", !0),
      l("div", Lh, [
        l("div", {
          class: "post-avatar-improved",
          style: qe({ backgroundColor: r(e.post.author.username) })
        }, [
          le(S(e.post.author.username.charAt(0).toUpperCase()) + " ", 1),
          e.post.author.isOnline ? (A(), $("span", Bh)) : ye("", !0)
        ], 4),
        l("div", zh, [
          l("h4", null, [
            le(S(e.post.author.username) + " ", 1),
            e.post.author.id === e.groupCreatorId ? (A(), $("span", Uh, "Creator")) : ye("", !0)
          ]),
          l("div", Hh, [
            f[1] || (f[1] = l("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              l("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              l("polyline", { points: "12 6 12 12 16 14" })
            ], -1)),
            le(" " + S(o(e.post.created_at)), 1)
          ])
        ])
      ]),
      l("div", Vh, [
        l("p", null, S(e.post.content), 1)
      ]),
      e.post.image ? (A(), $("div", qh, [...f[2] || (f[2] = [
        We('<div class="media-icon-improved" data-v-d35c2e4e><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d35c2e4e><rect x="2" y="2" width="20" height="20" rx="2" ry="2" data-v-d35c2e4e></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-d35c2e4e></circle><polyline points="21 15 16 10 5 21" data-v-d35c2e4e></polyline></svg></div><div class="media-info-improved" data-v-d35c2e4e><h5 data-v-d35c2e4e>Image</h5><p data-v-d35c2e4e>Click to view full size</p></div><div class="media-action-improved" data-v-d35c2e4e><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d35c2e4e><polyline points="15 3 21 3 21 9" data-v-d35c2e4e></polyline><polyline points="9 21 3 21 3 15" data-v-d35c2e4e></polyline><line x1="21" y1="3" x2="14" y2="10" data-v-d35c2e4e></line><line x1="3" y1="21" x2="10" y2="14" data-v-d35c2e4e></line></svg></div>', 3)
      ])])) : ye("", !0),
      e.post.tags && e.post.tags.length ? (A(), $("div", Kh, [
        (A(!0), $(fe, null, Ne(e.post.tags, (d) => (A(), $("span", {
          key: d,
          class: "tag-improved"
        }, "#" + S(d), 1))), 128))
      ])) : ye("", !0),
      l("div", Wh, [
        l("button", {
          onClick: i,
          class: ve(["engagement-item", { liked: e.post.isLiked }])
        }, [
          (A(), $("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: e.post.isLiked ? "currentColor" : "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...f[3] || (f[3] = [
            l("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }, null, -1)
          ])], 8, Jh)),
          l("span", null, S(e.post.likesCount), 1)
        ], 2),
        l("button", {
          onClick: a,
          class: "engagement-item"
        }, [
          f[4] || (f[4] = l("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            l("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          ], -1)),
          l("span", null, S(e.post.comments?.length || 0), 1)
        ]),
        f[5] || (f[5] = l("button", { class: "engagement-item" }, [
          l("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            l("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" })
          ])
        ], -1))
      ])
    ]));
  }
}, ha = /* @__PURE__ */ xt(Gh, [["styles", [Nh]], ["__scopeId", "data-v-d35c2e4e"]]), Yh = "@keyframes slideIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}.fade-enter-from,.fade-leave-to{opacity:0}.fade-slide-enter-active{transition:all .25s ease-out}.fade-slide-leave-active{transition:all .2s ease-in}.fade-slide-enter-from{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to{opacity:0;transform:translateY(10px)}.comment-fade-enter-active,.comment-fade-leave-active{transition:all .2s ease}.comment-fade-enter-from{opacity:0;transform:translate(-10px)}.comment-fade-leave-to{opacity:0;transform:translate(10px)}.detail-comments-section{background:#fff;border-radius:28px;padding:1.5rem;border:1px solid #f1f5f9;margin-top:1rem;animation:slideIn .3s ease}.comments-title{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:1.2rem;display:flex;align-items:center;gap:.5rem}.comments-count{background:#1e3a5f1a;padding:.2rem .8rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.comments-list{display:flex;flex-direction:column;gap:1rem;margin-bottom:1.2rem;max-height:300px;overflow-y:auto;padding-right:.5rem}.comments-list::-webkit-scrollbar{width:4px}.comment-item{display:flex;gap:.8rem;animation:slideIn .3s ease}.comment-avatar{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.comment-content{flex:1}.comment-bubble{background:#f8fafc;border-radius:16px;padding:.8rem 1rem;border:1px solid #f1f5f9}.comment-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}.comment-author{font-weight:600;font-size:.75rem;color:#1e3a5f}.comment-time{font-size:.6rem;color:#94a3b8}.comment-text{font-size:.8rem;color:#1e293b;margin:0;line-height:1.5}.comment-actions{display:flex;gap:.5rem;margin-top:.3rem;margin-left:.5rem}.comment-action{display:flex;align-items:center;gap:.3rem;background:transparent;border:none;color:#94a3b8;font-size:.65rem;cursor:pointer;padding:.2rem .5rem;border-radius:30px;transition:all .2s}.comment-action:hover{background:#f1f5f9;color:#1e3a5f}.add-comment-form{display:flex;gap:.8rem;align-items:center;margin-top:1.2rem}.comment-input{flex:1;padding:.6rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.8rem;background:#f8fafc}.comment-input:focus{outline:none;border-color:#1e3a5f;background:#fff}.send-comment-btn{width:36px;height:36px;border-radius:18px;background:#1e3a5f;border:none;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:all .2s;box-shadow:0 8px 12px -4px #1e3a5f33}.send-comment-btn:hover:not(:disabled){background:#14273f;transform:scale(1.05)}.send-comment-btn:disabled{opacity:.5;cursor:not-allowed}", Xh = { class: "detail-post-container" }, Zh = ["post", "current-user", "group-creator-id"], Qh = { class: "detail-comments-section" }, em = { class: "comments-title" }, tm = { class: "comments-count" }, nm = { class: "comments-list" }, sm = {
  name: "comment-fade",
  tag: "div"
}, rm = { class: "comment-content" }, om = { class: "comment-bubble" }, im = { class: "comment-header" }, am = { class: "comment-author" }, lm = { class: "comment-time" }, cm = { class: "comment-text" }, dm = { class: "comment-actions" }, fm = ["onClick"], um = { class: "add-comment-form" }, pm = ["disabled"], hm = {
  __name: "PostDetails.ce",
  props: {
    selectedPost: Object,
    currentUser: Object,
    group: Object
  },
  emits: [
    "post-like",
    "delete",
    "comment-like",
    "add-comment"
  ],
  setup(e, { emit: t }) {
    const n = e, s = /* @__PURE__ */ ae(null), r = t, o = (u) => {
      r("post-like", u);
    }, i = (u) => {
      r("delete", u);
    }, a = (u) => {
      r("comment-like", u);
    }, c = () => {
      s.value.trim() && (r("add-comment", {
        postId: n.selectedPost.id,
        comment: s.value
      }), s.value = "");
    }, f = (u) => {
      const m = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], v = u.split("").reduce((g, x) => g + x.charCodeAt(0), 0) % m.length;
      return m[v];
    }, d = (u) => {
      if (!u) return "";
      const [m, v] = u.split(":"), g = parseInt(m), x = g >= 12 ? "PM" : "AM";
      return `${g % 12 || 12}:${v} ${x}`;
    };
    return (u, m) => (A(), $("div", Xh, [
      l("post-card", {
        post: n.selectedPost,
        "current-user": n.currentUser,
        "group-creator-id": n.group.creator?.id,
        onLike: o,
        onDelete: i,
        expanded: !0
      }, null, 40, Zh),
      _e(vn, {
        name: "fade-slide",
        appear: ""
      }, {
        default: Kt(() => [
          l("div", Qh, [
            l("h3", em, [
              m[1] || (m[1] = l("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
              ], -1)),
              m[2] || (m[2] = le(" Comments ", -1)),
              l("span", tm, S(n.selectedPost.comments?.length || 0), 1)
            ]),
            l("div", nm, [
              l("transition-group", sm, [
                (A(!0), $(fe, null, Ne(n.selectedPost.comments, (v) => (A(), $("div", {
                  key: v.id,
                  class: "comment-item"
                }, [
                  l("div", {
                    class: "comment-avatar",
                    style: qe({
                      backgroundColor: f(v.author.username)
                    })
                  }, S(v.author.username.charAt(0).toUpperCase()), 5),
                  l("div", rm, [
                    l("div", om, [
                      l("div", im, [
                        l("span", am, S(v.author.username), 1),
                        l("span", lm, S(d(v.created_at)), 1)
                      ]),
                      l("p", cm, S(v.content), 1)
                    ]),
                    l("div", dm, [
                      l("button", {
                        onClick: (g) => a(v),
                        class: "comment-action"
                      }, [
                        m[3] || (m[3] = l("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          l("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
                        ], -1)),
                        l("span", null, S(v.likesCount || 0), 1)
                      ], 8, fm)
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            _e(vn, { name: "fade" }, {
              default: Kt(() => [
                l("div", um, [
                  is(l("input", {
                    type: "text",
                    "onUpdate:modelValue": m[0] || (m[0] = (v) => s.value = v),
                    class: "comment-input",
                    placeholder: "Write a comment...",
                    onKeyup: Ui(c, ["enter"])
                  }, null, 544), [
                    [us, s.value]
                  ]),
                  l("button", {
                    class: "send-comment-btn",
                    onClick: c,
                    disabled: !s.value?.trim()
                  }, [...m[4] || (m[4] = [
                    l("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      l("line", {
                        x1: "22",
                        y1: "2",
                        x2: "11",
                        y2: "13"
                      }),
                      l("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                    ], -1)
                  ])], 8, pm)
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      })
    ]));
  }
}, ma = /* @__PURE__ */ xt(hm, [["styles", [Yh]]]), mm = '@keyframes fadeIn-c1f43b4b{0%{opacity:0}to{opacity:1}}@keyframes slideIn-c1f43b4b{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes float-c1f43b4b{0%{transform:translateY(0)}50%{transform:translateY(-2px)}to{transform:translateY(0)}}.fade-enter-active[data-v-c1f43b4b],.fade-leave-active[data-v-c1f43b4b]{transition:opacity .2s ease}.fade-enter-from[data-v-c1f43b4b],.fade-leave-to[data-v-c1f43b4b]{opacity:0}.fade-slide-enter-active[data-v-c1f43b4b]{transition:all .25s ease-out}.fade-slide-leave-active[data-v-c1f43b4b]{transition:all .2s ease-in}.fade-slide-enter-from[data-v-c1f43b4b]{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to[data-v-c1f43b4b]{opacity:0;transform:translateY(10px)}.comment-fade-enter-active[data-v-c1f43b4b],.comment-fade-leave-active[data-v-c1f43b4b]{transition:all .2s ease}.comment-fade-enter-from[data-v-c1f43b4b]{opacity:0;transform:translate(-10px)}.comment-fade-leave-to[data-v-c1f43b4b]{opacity:0;transform:translate(10px)}.group-wrapper[data-v-c1f43b4b]{min-height:100vh;overflow-x:hidden}.group-fullscreen[data-v-c1f43b4b]{width:100%;min-height:100vh;background:transparent;font-family:Inter,sans-serif}.group-header[data-v-c1f43b4b]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:32px;padding:1.5rem 2rem;margin-bottom:2rem;box-shadow:0 20px 35px -10px #0000000d;border:1px solid rgba(255,255,255,.5);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.header-left[data-v-c1f43b4b]{display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap}.group-avatar[data-v-c1f43b4b]{width:70px;height:70px;background:linear-gradient(145deg,#1e3a5f,#2d4b75);border-radius:24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2.2rem;font-weight:600;box-shadow:0 15px 25px -8px #1e3a5f4d;position:relative;overflow:hidden;flex-shrink:0}.group-avatar[data-v-c1f43b4b]:after{content:"";position:absolute;inset:0;background:linear-gradient(145deg,#ffffff1a,#fff0 60%);pointer-events:none}.group-info[data-v-c1f43b4b]{min-width:0;flex:1}.group-info h1[data-v-c1f43b4b]{font-size:1.8rem;font-weight:600;color:#0f172a;margin-bottom:.3rem;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.group-meta[data-v-c1f43b4b]{display:flex;flex-wrap:wrap;gap:1rem;color:#64748b;font-size:.85rem}.group-meta span[data-v-c1f43b4b]{display:flex;align-items:center;gap:.3rem}.group-meta span svg[data-v-c1f43b4b]{width:16px;height:16px;stroke:#1e3a5f;opacity:.7}.group-badge[data-v-c1f43b4b]{background:#f1f5f9cc;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);color:#1e3a5f;padding:.3rem 1rem;border-radius:40px;font-size:.7rem;font-weight:500;display:inline-flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.5)}.group-badge.creator[data-v-c1f43b4b]{background:#fef3c7cc;color:#92400e}.group-actions[data-v-c1f43b4b]{display:flex;gap:.5rem;flex-shrink:0}.btn-group[data-v-c1f43b4b]{padding:.7rem 1.8rem;border-radius:40px;font-size:.85rem;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;transition:all .2s;border:1px solid transparent;cursor:pointer;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}.btn-group.primary[data-v-c1f43b4b]{background:#1e3a5f;color:#fff;box-shadow:0 8px 16px -6px #1e3a5f33}.btn-group.primary[data-v-c1f43b4b]:hover{background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.btn-group.outline[data-v-c1f43b4b]{background:#ffffffb3;color:#1e3a5f;border:1px solid rgba(255,255,255,.8)}.btn-group.outline[data-v-c1f43b4b]:hover{background:#fff;border-color:#1e3a5f}.two-column[data-v-c1f43b4b]{display:grid;grid-template-columns:2fr 1fr;gap:2rem}.main-column[data-v-c1f43b4b]{display:flex;flex-direction:column;gap:1.5rem;height:100%;overflow:hidden}.sidebar-column[data-v-c1f43b4b]{display:flex;flex-direction:column;gap:1.5rem;overflow-y:auto;padding-right:.5rem}.sidebar-column[data-v-c1f43b4b]::-webkit-scrollbar{width:4px}.sidebar-column[data-v-c1f43b4b]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.sidebar-column[data-v-c1f43b4b]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.compact-card[data-v-c1f43b4b]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:28px;padding:1.5rem;border:1px solid rgba(255,255,255,.5);box-shadow:0 15px 30px -12px #0000000d;transition:all .3s ease}.compact-card[data-v-c1f43b4b]:hover{background:#fff;transform:translateY(-2px);box-shadow:0 20px 35px -15px #0000001a}.card-header-compact[data-v-c1f43b4b]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem}.header-title[data-v-c1f43b4b]{display:flex;align-items:center;gap:.6rem;font-size:.9rem;font-weight:600;color:#1e293b}.header-title svg[data-v-c1f43b4b]{width:18px;height:18px;stroke:#1e3a5f;opacity:.7}.header-count[data-v-c1f43b4b]{background:#1e3a5f1a;padding:.15rem .6rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.header-link[data-v-c1f43b4b]{color:#1e3a5f;font-size:.7rem;text-decoration:none;padding:.3rem 1rem;border-radius:30px;border:1px solid rgba(226,232,240,.8);background:#ffffff80;transition:all .2s}.header-link[data-v-c1f43b4b]:hover{background:#fff;border-color:#1e3a5f}.compact-member-list[data-v-c1f43b4b]{display:flex;flex-direction:column;gap:.8rem}.compact-member-item[data-v-c1f43b4b]{display:flex;align-items:center;gap:.8rem;padding:.4rem .5rem;border-radius:12px;transition:all .2s}.compact-member-item[data-v-c1f43b4b]:hover{background:#f8fafcb3}.compact-member-avatar[data-v-c1f43b4b]{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;position:relative;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.compact-online-indicator[data-v-c1f43b4b]{position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#10b981;border-radius:50%;border:2px solid white}.compact-member-info[data-v-c1f43b4b]{flex:1;display:flex;align-items:center;gap:.5rem;font-size:.85rem}.compact-member-name[data-v-c1f43b4b]{font-weight:600;color:#0f172a}.compact-member-role[data-v-c1f43b4b]{font-size:.65rem;color:#94a3b8;background:#f1f5f9b3;padding:.15rem .6rem;border-radius:30px}.compact-creator-badge[data-v-c1f43b4b],.compact-you-badge[data-v-c1f43b4b]{font-size:.65rem;padding:.15rem .6rem;border-radius:30px;font-weight:500}.compact-creator-badge[data-v-c1f43b4b]{background:#fef3c7;color:#92400e}.compact-you-badge[data-v-c1f43b4b]{background:#e0f2fe;color:#0369a1}.compact-session-list[data-v-c1f43b4b]{display:flex;flex-direction:column;gap:.8rem}.compact-session-item[data-v-c1f43b4b]{display:flex;align-items:center;gap:.8rem;padding:.6rem 0;border-bottom:1px solid rgba(226,232,240,.5);font-size:.85rem}.compact-session-item[data-v-c1f43b4b]:last-child{border-bottom:none}.session-time[data-v-c1f43b4b]{min-width:90px;font-size:.75rem;color:#64748b;font-weight:500}.session-name[data-v-c1f43b4b]{flex:1;color:#0f172a;font-weight:500}.compact-live-badge[data-v-c1f43b4b]{background:#dc2626;color:#fff;padding:.2rem .8rem;border-radius:30px;font-size:.6rem;font-weight:600;letter-spacing:.02em;animation:float-c1f43b4b 2s infinite}.session-attendees[data-v-c1f43b4b]{font-size:.7rem;color:#64748b;background:#f1f5f9b3;padding:.2rem .8rem;border-radius:30px}.create-post-card[data-v-c1f43b4b]{background:#fff;border-radius:28px;padding:1.2rem;border:1px solid #f1f5f9;box-shadow:0 15px 30px -12px #0000000d;flex-shrink:0}.create-post-header[data-v-c1f43b4b]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.create-avatar[data-v-c1f43b4b]{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem;flex-shrink:0;box-shadow:0 8px 12px -4px #0000001a}.create-post-input[data-v-c1f43b4b]{flex:1;padding:.8rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.9rem;transition:all .2s;background:#f8fafc}.create-post-input[data-v-c1f43b4b]:focus{outline:none;border-color:#1e3a5f;background:#fff;box-shadow:0 0 0 3px #1e3a5f1a}.create-post-toolbar[data-v-c1f43b4b]{display:flex;justify-content:space-between;align-items:center}.toolbar-left[data-v-c1f43b4b]{display:flex;gap:.5rem}.toolbar-btn[data-v-c1f43b4b]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border:none;background:transparent;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.toolbar-btn[data-v-c1f43b4b]:hover{background:#f8fafc;color:#1e3a5f}.toolbar-btn svg[data-v-c1f43b4b]{width:16px;height:16px}.post-btn[data-v-c1f43b4b]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1.5rem;background:#1e3a5f;border:none;border-radius:40px;color:#fff;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;box-shadow:0 8px 16px -6px #1e3a5f33}.post-btn[data-v-c1f43b4b]:hover:not(:disabled){background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.post-btn[data-v-c1f43b4b]:disabled{opacity:.5;cursor:not-allowed}.hidden-input[data-v-c1f43b4b]{display:none}.image-preview-container[data-v-c1f43b4b]{position:relative;margin:.5rem 0;display:inline-block}.image-preview[data-v-c1f43b4b]{max-height:100px;border-radius:12px;border:1px solid #e2e8f0;background:#fff}.remove-image-btn[data-v-c1f43b4b]{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#dc2626;border:none;border-radius:10px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.7rem}.posts-feed-scrollable[data-v-c1f43b4b],.detail-view-scrollable[data-v-c1f43b4b]{flex:1;overflow-y:auto;padding-right:.8rem}.posts-feed-scrollable[data-v-c1f43b4b]::-webkit-scrollbar,.detail-view-scrollable[data-v-c1f43b4b]::-webkit-scrollbar{width:4px}.posts-feed-scrollable[data-v-c1f43b4b]::-webkit-scrollbar-track,.detail-view-scrollable[data-v-c1f43b4b]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.posts-feed-scrollable[data-v-c1f43b4b]::-webkit-scrollbar-thumb,.detail-view-scrollable[data-v-c1f43b4b]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.view-header[data-v-c1f43b4b]{margin-bottom:.5rem}.back-to-feed[data-v-c1f43b4b]{display:inline-flex;align-items:center;gap:.3rem;padding:.3rem 1rem;background:#fff;border:1px solid #e2e8f0;border-radius:30px;color:#1e3a5f;font-size:.75rem;cursor:pointer;transition:all .2s}.back-to-feed[data-v-c1f43b4b]:hover{background:#f8fafc;border-color:#1e3a5f}@media(max-width:1200px){.two-column[data-v-c1f43b4b]{grid-template-columns:1fr;height:auto}.main-column[data-v-c1f43b4b]{max-height:600px}.sidebar-column[data-v-c1f43b4b]{max-height:400px}}@media(max-width:768px){.group-fullscreen[data-v-c1f43b4b]{padding:1rem}.group-header[data-v-c1f43b4b]{flex-direction:column;align-items:flex-start;gap:1rem}.group-info h1[data-v-c1f43b4b]{white-space:normal}.create-post-toolbar[data-v-c1f43b4b]{flex-direction:column;gap:.8rem}.toolbar-left[data-v-c1f43b4b],.post-btn[data-v-c1f43b4b]{width:100%;justify-content:center}}', gm = { class: "group-wrapper" }, bm = { class: "group-fullscreen" }, vm = { class: "group-header" }, xm = { class: "header-left" }, ym = { class: "group-avatar" }, wm = { class: "group-info" }, _m = { class: "group-meta" }, km = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Cm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Sm = {
  key: 2,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Em = {
  key: 1,
  class: "group-badge creator"
}, Tm = { class: "group-actions" }, Am = ["href"], Rm = { class: "two-column" }, $m = { class: "main-column" }, Om = { class: "create-post-card" }, Pm = { class: "create-post-header" }, Dm = {
  key: 0,
  class: "image-preview-container"
}, Mm = ["src"], jm = { class: "create-post-toolbar" }, Nm = ["disabled"], Fm = {
  key: 0,
  class: "view-header"
}, Im = {
  key: "feed",
  class: "posts-feed-scrollable"
}, Lm = {
  key: "detail",
  class: "detail-view-scrollable"
}, Bm = { class: "sidebar-column" }, zm = { class: "compact-card" }, Um = { class: "card-header-compact" }, Hm = { class: "header-title" }, Vm = { class: "header-count" }, qm = { class: "compact-member-list" }, Km = {
  key: 0,
  class: "compact-online-indicator"
}, Wm = { class: "compact-member-info" }, Jm = { class: "compact-member-name" }, Gm = { class: "compact-member-role" }, Ym = {
  key: 0,
  class: "compact-creator-badge"
}, Xm = {
  key: 1,
  class: "compact-you-badge"
}, Zm = { class: "compact-card" }, Qm = { class: "compact-session-list" }, eg = {
  key: 0,
  class: "compact-session-item"
}, tg = { class: "session-time" }, ng = {
  __name: "GroupPage.ce",
  setup(e) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken", Q.defaults.withCredentials = !0;
    const t = /* @__PURE__ */ ae(null), n = /* @__PURE__ */ ae(null), s = /* @__PURE__ */ ae(null), r = /* @__PURE__ */ ae([
      {
        id: 1,
        author: { id: 2, username: "alex_chen", isOnline: !0 },
        content: "🎉 Just finished implementing a balanced binary tree in Python! Here's my implementation if anyone wants to see:",
        image: null,
        created_at: "2024-03-15T14:30:00Z",
        likesCount: 24,
        isLiked: !1,
        isHot: !0,
        tags: ["python", "binarytrees", "algorithms"],
        comments: [
          {
            id: 101,
            author: { username: "maria_r", id: 4 },
            content: "This is so helpful! I was stuck on the recursive part for hours.",
            likesCount: 5,
            created_at: "2024-03-15T15:20:00Z"
          },
          {
            id: 102,
            author: { username: "james_kim", id: 5 },
            content: "Could you explain the time complexity?",
            likesCount: 2,
            created_at: "2024-03-15T16:10:00Z"
          }
        ]
      },
      {
        id: 2,
        author: { id: 4, username: "maria_r", isOnline: !0 },
        content: "Has anyone started working on the BFS/DFS assignment? I'm a bit confused about the implementation.",
        image: null,
        created_at: "2024-03-14T09:15:00Z",
        likesCount: 12,
        isLiked: !0,
        isHot: !1,
        tags: ["help", "bfs", "dfs"],
        comments: [
          {
            id: 103,
            author: { username: "alex_chen", id: 2 },
            content: "BFS uses queue, DFS uses stack. Think level order vs depth first.",
            likesCount: 8,
            created_at: "2024-03-14T10:30:00Z"
          }
        ]
      },
      {
        id: 3,
        author: { id: 5, username: "james_kim", isOnline: !1 },
        content: "Found this amazing visualization tool for sorting algorithms: https://visualgo.net/en/sorting",
        image: null,
        created_at: "2024-03-13T18:20:00Z",
        likesCount: 18,
        isLiked: !1,
        isHot: !1,
        tags: ["resources", "sorting", "visualization"],
        comments: []
      }
    ]), o = async () => {
      const O = window.location.pathname.split("/").filter((Z) => Z !== ""), G = O[O.length - 1];
      try {
        const Z = await Q.get(`/api/groups/${G}`);
        console.log(Z.data.group), t.value = Z.data.group, s.value = Z.data.members, n.value = Z.data.current_user;
      } catch (Z) {
        console.error("Error fetching group details.", Z);
      }
    };
    wn(() => {
      o();
    });
    const i = /* @__PURE__ */ ae(""), a = /* @__PURE__ */ ae(null), c = /* @__PURE__ */ ae(null), f = /* @__PURE__ */ ae(null), d = /* @__PURE__ */ ae("feed"), u = /* @__PURE__ */ ae(null), m = /* @__PURE__ */ ae(""), v = we(() => t.value.creator?.id === n.value.id), g = we(() => s.value.some((z) => z.id === n.value.id)), x = we(() => s.value.slice(0, 5)), b = we(() => [...r.value].sort(
      (z, O) => new Date(O.created_at) - new Date(z.created_at)
    )), E = async ({ postId: z, comment: O }) => {
      try {
        const G = await Q.post(`/api/posts/${z}/comment`, {
          content: O
        });
        if (G.status === 200 || G.status === 201) {
          const Z = G.data.data;
          console.log(Z), r.value.unshift({
            id: Z.id,
            author: Z.author,
            content: Z.content,
            likesCount: Z.likes,
            created_at: Z.created_at
          });
        }
      } catch (G) {
        console.error("Error commenting to the post.", G);
      }
    }, F = () => {
    }, H = () => {
    }, j = () => {
    }, U = (z) => {
      const O = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], G = z.split("").reduce((Z, be) => Z + be.charCodeAt(0), 0) % O.length;
      return O[G];
    }, P = (z) => z ? new Date(z).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) : "Unknown", M = (z) => {
      if (!z) return "";
      const [O, G] = z.split(":"), Z = parseInt(O), be = Z >= 12 ? "PM" : "AM";
      return `${Z % 12 || 12}:${G} ${be}`;
    }, se = (z) => ({
      major: "Major-Based",
      course: "Course-Based",
      general: "General Study"
    })[z] || "General Study", L = () => {
      f.value?.click();
    }, X = (z) => {
      const O = z.target;
      if (!O || !O.files.length) return;
      const G = O.files[0];
      if (G) {
        c.value = G;
        const Z = new FileReader();
        Z.onload = (be) => {
          a.value = be.target.result;
        }, Z.readAsDataURL(G);
      }
    }, re = () => {
      a.value = null, c.value = null, f.value && (f.value.value = "");
    }, B = async () => {
      if (!i.value.trim() && !a.value) return;
      try {
        const O = new FormData();
        O.append("content", i.value.trim()), O.append("image", c.value);
        const G = await Q.post(
          `/groups/${t.id}/post/create`,
          O
        );
        if (G.status === 200 || G.status === 201) {
          const Z = G.data;
          console.log(Z);
        }
        console.log("Uploaded successfully:", G.data);
      } catch (O) {
        console.log("Error creating post.", O);
      }
      const z = {
        id: Date.now(),
        author: {
          id: n.id,
          username: n.username,
          isOnline: !0
        },
        content: i.value,
        image: a.value,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        likesCount: 0,
        isLiked: !1,
        isHot: !1,
        tags: [],
        comments: []
      };
      r.value.unshift(z), i.value = "", re();
    }, ne = (z) => {
      z.isLiked = !z.isLiked, z.likesCount += z.isLiked ? 1 : -1;
    }, he = (z) => {
      if (confirm(
        z.author.id === n.id ? "Delete your post?" : "Remove this post?"
      )) {
        const O = r.value.findIndex((G) => G.id === z.id);
        O !== -1 && r.value.splice(O, 1), d.value === "detail" && u.value?.id === z.id && ee();
      }
    }, Oe = (z) => {
      u.value = z, d.value = "detail", m.value = "";
    }, ee = () => {
      d.value = "feed", u.value = null, m.value = "";
    }, ue = () => {
      confirm("Are you sure you want to leave this group?") && console.log("Leaving group:", t.id);
    };
    return (z, O) => (A(), $("div", gm, [
      l("div", bm, [
        l("div", vm, [
          l("div", xm, [
            l("div", ym, S(t.value.name.charAt(0).toUpperCase()), 1),
            l("div", wm, [
              l("h1", null, S(t.value.name), 1),
              l("div", _m, [
                l("span", null, [
                  O[1] || (O[1] = We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-c1f43b4b><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-c1f43b4b></rect><line x1="16" y1="2" x2="16" y2="6" data-v-c1f43b4b></line><line x1="8" y1="2" x2="8" y2="6" data-v-c1f43b4b></line><line x1="3" y1="10" x2="21" y2="10" data-v-c1f43b4b></line></svg>', 1)),
                  le(" Created " + S(P(t.value.created_at)), 1)
                ]),
                l("span", null, [
                  O[2] || (O[2] = l("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    l("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    l("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  le(" " + S(t.value.member_count) + " / " + S(t.value.max_members) + " members ", 1)
                ]),
                t.value.group_type ? (A(), $("span", {
                  key: 0,
                  class: ve(["group-badge", t.value.group_type])
                }, [
                  t.value.group_type === "major" ? (A(), $("svg", km, [...O[3] || (O[3] = [
                    l("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }, null, -1)
                  ])])) : t.value.group_type === "course" ? (A(), $("svg", Cm, [...O[4] || (O[4] = [
                    l("rect", {
                      x: "2",
                      y: "3",
                      width: "20",
                      height: "14",
                      rx: "2",
                      ry: "2"
                    }, null, -1),
                    l("line", {
                      x1: "8",
                      y1: "21",
                      x2: "16",
                      y2: "21"
                    }, null, -1),
                    l("line", {
                      x1: "12",
                      y1: "17",
                      x2: "12",
                      y2: "21"
                    }, null, -1)
                  ])])) : (A(), $("svg", Sm, [...O[5] || (O[5] = [
                    l("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }, null, -1),
                    l("circle", {
                      cx: "9",
                      cy: "7",
                      r: "4"
                    }, null, -1),
                    l("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }, null, -1),
                    l("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }, null, -1)
                  ])])),
                  le(" " + S(se(t.value.group_type)), 1)
                ], 2)) : ye("", !0),
                v.value ? (A(), $("span", Em, [...O[6] || (O[6] = [
                  l("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    l("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" })
                  ], -1),
                  le(" Creator ", -1)
                ])])) : ye("", !0)
              ])
            ])
          ]),
          l("div", Tm, [
            l("a", {
              href: `/chat/${t.value.id}`,
              class: "btn-group primary"
            }, [...O[7] || (O[7] = [
              l("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
              ], -1),
              le(" Chat ", -1)
            ])], 8, Am),
            g.value ? (A(), $("button", {
              key: 0,
              onClick: ue,
              class: "btn-group outline"
            }, [...O[8] || (O[8] = [
              l("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                l("polyline", { points: "16 17 21 12 16 7" }),
                l("line", {
                  x1: "21",
                  y1: "12",
                  x2: "9",
                  y2: "12"
                })
              ], -1),
              le(" Leave ", -1)
            ])])) : ye("", !0)
          ])
        ]),
        l("div", Rm, [
          l("div", $m, [
            l("div", Om, [
              l("div", Pm, [
                l("div", {
                  class: "create-avatar",
                  style: qe({
                    backgroundColor: U(n.value.username)
                  })
                }, S(n.value.username.charAt(0).toUpperCase()), 5),
                is(l("input", {
                  type: "text",
                  class: "create-post-input",
                  placeholder: "What's on your mind? Share something with the group...",
                  "onUpdate:modelValue": O[0] || (O[0] = (G) => i.value = G)
                }, null, 512), [
                  [us, i.value]
                ])
              ]),
              a.value ? (A(), $("div", Dm, [
                l("img", {
                  src: a.value,
                  class: "image-preview",
                  alt: "Preview"
                }, null, 8, Mm),
                l("button", {
                  class: "remove-image-btn",
                  onClick: re
                }, [...O[9] || (O[9] = [
                  l("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5"
                  }, [
                    l("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    l("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])])
              ])) : ye("", !0),
              l("div", jm, [
                l("div", { class: "toolbar-left" }, [
                  l("button", {
                    class: "toolbar-btn",
                    onClick: L
                  }, [...O[10] || (O[10] = [
                    l("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      l("rect", {
                        x: "2",
                        y: "2",
                        width: "20",
                        height: "20",
                        rx: "2",
                        ry: "2"
                      }),
                      l("circle", {
                        cx: "8.5",
                        cy: "8.5",
                        r: "1.5"
                      }),
                      l("polyline", { points: "21 15 16 10 5 21" })
                    ], -1),
                    l("span", null, "Photo", -1)
                  ])]),
                  O[11] || (O[11] = l("button", { class: "toolbar-btn" }, [
                    l("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      l("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                      l("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
                    ]),
                    l("span", null, "Link")
                  ], -1))
                ]),
                l("button", {
                  class: "post-btn",
                  onClick: B,
                  disabled: !i.value.trim() && !a.value
                }, [...O[12] || (O[12] = [
                  l("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    l("line", {
                      x1: "22",
                      y1: "2",
                      x2: "11",
                      y2: "13"
                    }),
                    l("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                  ], -1),
                  l("span", null, "Post", -1)
                ])], 8, Nm)
              ]),
              l("input", {
                type: "file",
                ref_key: "imageInput",
                ref: f,
                class: "hidden-input",
                accept: "image/*",
                onChange: X
              }, null, 544)
            ]),
            _e(vn, { name: "fade-slide" }, {
              default: Kt(() => [
                d.value === "detail" ? (A(), $("div", Fm, [
                  l("button", {
                    class: "back-to-feed",
                    onClick: ee
                  }, [...O[13] || (O[13] = [
                    l("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      l("path", { d: "M19 12H5M12 19l-7-7 7-7" })
                    ], -1),
                    le(" Back to Feed ", -1)
                  ])])
                ])) : ye("", !0)
              ]),
              _: 1
            }),
            _e(vn, {
              name: "fade",
              mode: "out-in"
            }, {
              default: Kt(() => [
                d.value === "feed" ? (A(), $("div", Im, [
                  (A(!0), $(fe, null, Ne(b.value, (G) => (A(), Yn(ha, {
                    key: G.id,
                    post: G,
                    "current-user": n.value,
                    "group-creator-id": t.value.creator?.id,
                    onLike: ne,
                    onDelete: he,
                    onViewComments: Oe
                  }, null, 8, ["post", "current-user", "group-creator-id"]))), 128))
                ])) : d.value === "detail" ? (A(), $("div", Lm, [
                  _e(ma, {
                    "selected-post": u.value,
                    "current-user": n.value,
                    group: t.value,
                    onAddComment: E,
                    onPostLike: j,
                    onDelete: H,
                    onCommentLike: F
                  }, null, 8, ["selected-post", "current-user", "group"])
                ])) : ye("", !0)
              ]),
              _: 1
            })
          ]),
          l("div", Bm, [
            l("div", zm, [
              l("div", Um, [
                l("div", Hm, [
                  O[14] || (O[14] = l("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    l("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    l("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  O[15] || (O[15] = l("span", null, "Members", -1)),
                  l("span", Vm, S(t.value.member_count), 1)
                ]),
                O[16] || (O[16] = l("a", {
                  href: "#",
                  class: "header-link"
                }, "View all", -1))
              ]),
              l("div", qm, [
                (A(!0), $(fe, null, Ne(x.value, (G) => (A(), $("div", {
                  key: G.id,
                  class: "compact-member-item"
                }, [
                  l("div", {
                    class: "compact-member-avatar",
                    style: qe({ backgroundColor: U(G.username) })
                  }, [
                    le(S(G.username.charAt(0).toUpperCase()) + " ", 1),
                    G.isOnline ? (A(), $("span", Km)) : ye("", !0)
                  ], 4),
                  l("div", Wm, [
                    l("span", Jm, S(G.username), 1),
                    l("span", Gm, S(G.role), 1)
                  ]),
                  G.id === t.value.creator?.id ? (A(), $("span", Ym, "👑")) : G.id === n.value.id ? (A(), $("span", Xm, "you")) : ye("", !0)
                ]))), 128))
              ])
            ]),
            l("div", Zm, [
              O[20] || (O[20] = We('<div class="card-header-compact" data-v-c1f43b4b><div class="header-title" data-v-c1f43b4b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-c1f43b4b><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-c1f43b4b></rect><line x1="16" y1="2" x2="16" y2="6" data-v-c1f43b4b></line><line x1="8" y1="2" x2="8" y2="6" data-v-c1f43b4b></line><line x1="3" y1="10" x2="21" y2="10" data-v-c1f43b4b></line></svg><span data-v-c1f43b4b>Sessions</span></div></div>', 1)),
              l("div", Qm, [
                t.value.study_day ? (A(), $("div", eg, [
                  l("div", tg, S(t.value.study_day.substring(0, 3)) + " • " + S(M(t.value.start_time)), 1),
                  O[17] || (O[17] = l("div", { class: "session-name" }, "Regular Meeting", -1)),
                  O[18] || (O[18] = l("span", { class: "compact-live-badge" }, "Live", -1))
                ])) : ye("", !0),
                O[19] || (O[19] = We('<div class="compact-session-item" data-v-c1f43b4b><div class="session-time" data-v-c1f43b4b>WED • 3:30 PM</div><div class="session-name" data-v-c1f43b4b>Practice Problems</div><span class="session-attendees" data-v-c1f43b4b>5 going</span></div><div class="compact-session-item" data-v-c1f43b4b><div class="session-time" data-v-c1f43b4b>FRI • 2:00 PM</div><div class="session-name" data-v-c1f43b4b>Midterm Prep</div><span class="session-attendees" data-v-c1f43b4b>12 going</span></div>', 2))
              ])
            ])
          ])
        ])
      ])
    ]));
  }
}, sg = /* @__PURE__ */ xt(ng, [["styles", [mm]], ["__scopeId", "data-v-c1f43b4b"]]), rg = /* @__PURE__ */ vt(Vi), og = /* @__PURE__ */ vt(Ld), ig = /* @__PURE__ */ vt(qi), ag = /* @__PURE__ */ vt(Du), lg = /* @__PURE__ */ vt(Up), cg = /* @__PURE__ */ vt(jh), dg = /* @__PURE__ */ vt(ha), fg = /* @__PURE__ */ vt(sg), ug = /* @__PURE__ */ vt(ma);
customElements.define("gallery-card", rg);
customElements.define("find-partner-view", og);
customElements.define("gallery-card-compact", ig);
customElements.define("inbound-request", ag);
customElements.define("admin-dashboard", lg);
customElements.define("chat-room", cg);
customElements.define("post-card", dg);
customElements.define("group-page", fg);
customElements.define("post-details", ug);
