// @__NO_SIDE_EFFECTS__
function or(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, zt = [], at = () => {
}, Io = () => !1, as = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ir = (e) => e.startsWith("onUpdate:"), we = Object.assign, ar = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, _a = Object.prototype.hasOwnProperty, ae = (e, t) => _a.call(e, t), q = Array.isArray, Ht = (e) => kn(e) === "[object Map]", ls = (e) => kn(e) === "[object Set]", Pr = (e) => kn(e) === "[object Date]", Y = (e) => typeof e == "function", ke = (e) => typeof e == "string", lt = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Fo = (e) => (de(e) || Y(e)) && Y(e.then) && Y(e.catch), Lo = Object.prototype.toString, kn = (e) => Lo.call(e), ka = (e) => kn(e).slice(8, -1), cs = (e) => kn(e) === "[object Object]", lr = (e) => ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, an = /* @__PURE__ */ or(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ds = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Ca = /-\w/g, Je = ds(
  (e) => e.replace(Ca, (t) => t.slice(1).toUpperCase())
), Sa = /\B([A-Z])/g, Be = ds(
  (e) => e.replace(Sa, "-$1").toLowerCase()
), Bo = ds((e) => e.charAt(0).toUpperCase() + e.slice(1)), Es = ds(
  (e) => e ? `on${Bo(e)}` : ""
), Ct = (e, t) => !Object.is(e, t), Bn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Uo = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, fs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Us = (e) => {
  const t = ke(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let jr;
const us = () => jr || (jr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function qe(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = ke(s) ? Ra(s) : qe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (ke(e) || de(e))
    return e;
}
const Ea = /;(?![^(]*\))/g, Ta = /:([^]+)/, Aa = /\/\*[^]*?\*\//g;
function Ra(e) {
  const t = {};
  return e.replace(Aa, "").split(Ea).forEach((n) => {
    if (n) {
      const s = n.split(Ta);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function xe(e) {
  let t = "";
  if (ke(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const s = xe(e[n]);
      s && (t += s + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const $a = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oa = /* @__PURE__ */ or($a);
function zo(e) {
  return !!e || e === "";
}
function Pa(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = Cn(e[s], t[s]);
  return n;
}
function Cn(e, t) {
  if (e === t) return !0;
  let n = Pr(e), s = Pr(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = lt(e), s = lt(t), n || s)
    return e === t;
  if (n = q(e), s = q(t), n || s)
    return n && s ? Pa(e, t) : !1;
  if (n = de(e), s = de(t), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(e).length, o = Object.keys(t).length;
    if (r !== o)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (a && !c || !a && c || !Cn(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ja(e, t) {
  return e.findIndex((n) => Cn(n, t));
}
const Ho = (e) => !!(e && e.__v_isRef === !0), C = (e) => ke(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === Lo || !Y(e.toString)) ? Ho(e) ? C(e.value) : JSON.stringify(e, Vo, 2) : String(e), Vo = (e, t) => Ho(t) ? Vo(e, t.value) : Ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Ts(s, o) + " =>"] = r, n),
    {}
  )
} : ls(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ts(n))
} : lt(t) ? Ts(t) : de(t) && !q(t) && !cs(t) ? String(t) : t, Ts = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    lt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ne;
class Ma {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Ne, !t && Ne && (this.index = (Ne.scopes || (Ne.scopes = [])).push(
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
      const n = Ne;
      try {
        return Ne = this, t();
      } finally {
        Ne = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ne, Ne = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ne = this.prevScope, this.prevScope = void 0);
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
function Da() {
  return Ne;
}
let ge;
const As = /* @__PURE__ */ new WeakSet();
class qo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ne && Ne.active && Ne.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, As.has(this) && (As.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Wo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Mr(this), Jo(this);
    const t = ge, n = Ge;
    ge = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      Go(this), ge = t, Ge = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        fr(t);
      this.deps = this.depsTail = void 0, Mr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? As.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    zs(this) && this.run();
  }
  get dirty() {
    return zs(this);
  }
}
let Ko = 0, ln, cn;
function Wo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = cn, cn = e;
    return;
  }
  e.next = ln, ln = e;
}
function cr() {
  Ko++;
}
function dr() {
  if (--Ko > 0)
    return;
  if (cn) {
    let t = cn;
    for (cn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ln; ) {
    let t = ln;
    for (ln = void 0; t; ) {
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
function Jo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Go(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), fr(s), Na(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function zs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Yo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Yo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === hn) || (e.globalVersion = hn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !zs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, s = Ge;
  ge = e, Ge = !0;
  try {
    Jo(e);
    const r = e.fn(e._value);
    (t.version === 0 || Ct(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ge = n, Ge = s, Go(e), e.flags &= -3;
  }
}
function fr(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      fr(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Na(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ge = !0;
const Xo = [];
function mt() {
  Xo.push(Ge), Ge = !1;
}
function gt() {
  const e = Xo.pop();
  Ge = e === void 0 ? !0 : e;
}
function Mr(e) {
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
let hn = 0;
class Ia {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ur {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !Ge || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new Ia(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, Zo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, hn++, this.notify(t);
  }
  notify(t) {
    cr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      dr();
    }
  }
}
function Zo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Zo(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Hs = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ Symbol(
  ""
), Vs = /* @__PURE__ */ Symbol(
  ""
), mn = /* @__PURE__ */ Symbol(
  ""
);
function Ce(e, t, n) {
  if (Ge && ge) {
    let s = Hs.get(e);
    s || Hs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ur()), r.map = s, r.key = n), r.track();
  }
}
function pt(e, t, n, s, r, o) {
  const i = Hs.get(e);
  if (!i) {
    hn++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (cr(), t === "clear")
    i.forEach(a);
  else {
    const c = q(e), f = c && lr(n);
    if (c && n === "length") {
      const d = Number(s);
      i.forEach((u, b) => {
        (b === "length" || b === mn || !lt(b) && b >= d) && a(u);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && a(i.get(n)), f && a(i.get(mn)), t) {
        case "add":
          c ? f && a(i.get("length")) : (a(i.get(Dt)), Ht(e) && a(i.get(Vs)));
          break;
        case "delete":
          c || (a(i.get(Dt)), Ht(e) && a(i.get(Vs)));
          break;
        case "set":
          Ht(e) && a(i.get(Dt));
          break;
      }
  }
  dr();
}
function Bt(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e ? t : (Ce(t, "iterate", mn), /* @__PURE__ */ Ke(e) ? t : t.map(Ye));
}
function ps(e) {
  return Ce(e = /* @__PURE__ */ ie(e), "iterate", mn), e;
}
function _t(e, t) {
  return /* @__PURE__ */ bt(e) ? Wt(/* @__PURE__ */ Nt(e) ? Ye(t) : t) : Ye(t);
}
const Fa = {
  __proto__: null,
  [Symbol.iterator]() {
    return Rs(this, Symbol.iterator, (e) => _t(this, e));
  },
  concat(...e) {
    return Bt(this).concat(
      ...e.map((t) => q(t) ? Bt(t) : t)
    );
  },
  entries() {
    return Rs(this, "entries", (e) => (e[1] = _t(this, e[1]), e));
  },
  every(e, t) {
    return ct(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ct(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => _t(this, s)),
      arguments
    );
  },
  find(e, t) {
    return ct(
      this,
      "find",
      e,
      t,
      (n) => _t(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ct(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ct(
      this,
      "findLast",
      e,
      t,
      (n) => _t(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ct(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ct(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return $s(this, "includes", e);
  },
  indexOf(...e) {
    return $s(this, "indexOf", e);
  },
  join(e) {
    return Bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return $s(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return tn(this, "pop");
  },
  push(...e) {
    return tn(this, "push", e);
  },
  reduce(e, ...t) {
    return Dr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Dr(this, "reduceRight", e, t);
  },
  shift() {
    return tn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return tn(this, "splice", e);
  },
  toReversed() {
    return Bt(this).toReversed();
  },
  toSorted(e) {
    return Bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return tn(this, "unshift", e);
  },
  values() {
    return Rs(this, "values", (e) => _t(this, e));
  }
};
function Rs(e, t, n) {
  const s = ps(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ Ke(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = n(o.value)), o;
  }), r;
}
const La = Array.prototype;
function ct(e, t, n, s, r, o) {
  const i = ps(e), a = i !== e && !/* @__PURE__ */ Ke(e), c = i[t];
  if (c !== La[t]) {
    const u = c.apply(e, o);
    return a ? Ye(u) : u;
  }
  let f = n;
  i !== e && (a ? f = function(u, b) {
    return n.call(this, _t(e, u), b, e);
  } : n.length > 2 && (f = function(u, b) {
    return n.call(this, u, b, e);
  }));
  const d = c.call(i, f, s);
  return a && r ? r(d) : d;
}
function Dr(e, t, n, s) {
  const r = ps(e);
  let o = n;
  return r !== e && (/* @__PURE__ */ Ke(e) ? n.length > 3 && (o = function(i, a, c) {
    return n.call(this, i, a, c, e);
  }) : o = function(i, a, c) {
    return n.call(this, i, _t(e, a), c, e);
  }), r[t](o, ...s);
}
function $s(e, t, n) {
  const s = /* @__PURE__ */ ie(e);
  Ce(s, "iterate", mn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ gr(n[0]) ? (n[0] = /* @__PURE__ */ ie(n[0]), s[t](...n)) : r;
}
function tn(e, t, n = []) {
  mt(), cr();
  const s = (/* @__PURE__ */ ie(e))[t].apply(e, n);
  return dr(), gt(), s;
}
const Ba = /* @__PURE__ */ or("__proto__,__v_isRef,__isVue"), Qo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lt)
);
function Ua(e) {
  lt(e) || (e = String(e));
  const t = /* @__PURE__ */ ie(this);
  return Ce(t, "has", e), t.hasOwnProperty(e);
}
class ei {
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
      return s === (r ? o ? Xa : ri : o ? si : ni).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = q(t);
    if (!r) {
      let c;
      if (i && (c = Fa[n]))
        return c;
      if (n === "hasOwnProperty")
        return Ua;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Te(t) ? t : s
    );
    if ((lt(n) ? Qo.has(n) : Ba(n)) || (r || Ce(t, "get", n), o))
      return a;
    if (/* @__PURE__ */ Te(a)) {
      const c = i && lr(n) ? a : a.value;
      return r && de(c) ? /* @__PURE__ */ Ks(c) : c;
    }
    return de(a) ? r ? /* @__PURE__ */ Ks(a) : /* @__PURE__ */ hr(a) : a;
  }
}
class ti extends ei {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    const i = q(t) && lr(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ bt(o);
      if (!/* @__PURE__ */ Ke(s) && !/* @__PURE__ */ bt(s) && (o = /* @__PURE__ */ ie(o), s = /* @__PURE__ */ ie(s)), !i && /* @__PURE__ */ Te(o) && !/* @__PURE__ */ Te(s))
        return f || (o.value = s), !0;
    }
    const a = i ? Number(n) < t.length : ae(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Te(t) ? t : r
    );
    return t === /* @__PURE__ */ ie(r) && (a ? Ct(s, o) && pt(t, "set", n, s) : pt(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = ae(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && pt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!lt(n) || !Qo.has(n)) && Ce(t, "has", n), s;
  }
  ownKeys(t) {
    return Ce(
      t,
      "iterate",
      q(t) ? "length" : Dt
    ), Reflect.ownKeys(t);
  }
}
class za extends ei {
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
const Ha = /* @__PURE__ */ new ti(), Va = /* @__PURE__ */ new za(), qa = /* @__PURE__ */ new ti(!0);
const qs = (e) => e, Dn = (e) => Reflect.getPrototypeOf(e);
function Ka(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = /* @__PURE__ */ ie(r), i = Ht(o), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = r[e](...s), d = n ? qs : t ? Wt : Ye;
    return !t && Ce(
      o,
      "iterate",
      c ? Vs : Dt
    ), we(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: u, done: b } = f.next();
          return b ? { value: u, done: b } : {
            value: a ? [d(u[0]), d(u[1])] : d(u),
            done: b
          };
        }
      }
    );
  };
}
function Nn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wa(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ ie(o), a = /* @__PURE__ */ ie(r);
      e || (Ct(r, a) && Ce(i, "get", r), Ce(i, "get", a));
      const { has: c } = Dn(i), f = t ? qs : e ? Wt : Ye;
      if (c.call(i, r))
        return f(o.get(r));
      if (c.call(i, a))
        return f(o.get(a));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ce(/* @__PURE__ */ ie(r), "iterate", Dt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ ie(o), a = /* @__PURE__ */ ie(r);
      return e || (Ct(r, a) && Ce(i, "has", r), Ce(i, "has", a)), r === a ? o.has(r) : o.has(r) || o.has(a);
    },
    forEach(r, o) {
      const i = this, a = i.__v_raw, c = /* @__PURE__ */ ie(a), f = t ? qs : e ? Wt : Ye;
      return !e && Ce(c, "iterate", Dt), a.forEach((d, u) => r.call(o, f(d), f(u), i));
    }
  };
  return we(
    n,
    e ? {
      add: Nn("add"),
      set: Nn("set"),
      delete: Nn("delete"),
      clear: Nn("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Ke(r) && !/* @__PURE__ */ bt(r) && (r = /* @__PURE__ */ ie(r));
        const o = /* @__PURE__ */ ie(this);
        return Dn(o).has.call(o, r) || (o.add(r), pt(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !/* @__PURE__ */ Ke(o) && !/* @__PURE__ */ bt(o) && (o = /* @__PURE__ */ ie(o));
        const i = /* @__PURE__ */ ie(this), { has: a, get: c } = Dn(i);
        let f = a.call(i, r);
        f || (r = /* @__PURE__ */ ie(r), f = a.call(i, r));
        const d = c.call(i, r);
        return i.set(r, o), f ? Ct(o, d) && pt(i, "set", r, o) : pt(i, "add", r, o), this;
      },
      delete(r) {
        const o = /* @__PURE__ */ ie(this), { has: i, get: a } = Dn(o);
        let c = i.call(o, r);
        c || (r = /* @__PURE__ */ ie(r), c = i.call(o, r)), a && a.call(o, r);
        const f = o.delete(r);
        return c && pt(o, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ ie(this), o = r.size !== 0, i = r.clear();
        return o && pt(
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
    n[r] = Ka(r, e, t);
  }), n;
}
function pr(e, t) {
  const n = Wa(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ae(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Ja = {
  get: /* @__PURE__ */ pr(!1, !1)
}, Ga = {
  get: /* @__PURE__ */ pr(!1, !0)
}, Ya = {
  get: /* @__PURE__ */ pr(!0, !1)
};
const ni = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), Xa = /* @__PURE__ */ new WeakMap();
function Za(e) {
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
function Qa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Za(ka(e));
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  return /* @__PURE__ */ bt(e) ? e : mr(
    e,
    !1,
    Ha,
    Ja,
    ni
  );
}
// @__NO_SIDE_EFFECTS__
function el(e) {
  return mr(
    e,
    !1,
    qa,
    Ga,
    si
  );
}
// @__NO_SIDE_EFFECTS__
function Ks(e) {
  return mr(
    e,
    !0,
    Va,
    Ya,
    ri
  );
}
function mr(e, t, n, s, r) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = Qa(e);
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
function Nt(e) {
  return /* @__PURE__ */ bt(e) ? /* @__PURE__ */ Nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ie(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ie(t) : e;
}
function tl(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && Uo(e, "__v_skip", !0), e;
}
const Ye = (e) => de(e) ? /* @__PURE__ */ hr(e) : e, Wt = (e) => de(e) ? /* @__PURE__ */ Ks(e) : e;
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return oi(e, !1);
}
// @__NO_SIDE_EFFECTS__
function nl(e) {
  return oi(e, !0);
}
function oi(e, t) {
  return /* @__PURE__ */ Te(e) ? e : new sl(e, t);
}
class sl {
  constructor(t, n) {
    this.dep = new ur(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ie(t), this._value = n ? t : Ye(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ke(t) || /* @__PURE__ */ bt(t);
    t = s ? t : /* @__PURE__ */ ie(t), Ct(t, n) && (this._rawValue = t, this._value = s ? t : Ye(t), this.dep.trigger());
  }
}
function ii(e) {
  return /* @__PURE__ */ Te(e) ? e.value : e;
}
const rl = {
  get: (e, t, n) => t === "__v_raw" ? e : ii(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ Te(r) && !/* @__PURE__ */ Te(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function ai(e) {
  return /* @__PURE__ */ Nt(e) ? e : new Proxy(e, rl);
}
class ol {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ur(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = hn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return Wo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Yo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function il(e, t, n = !1) {
  let s, r;
  return Y(e) ? s = e : (s = e.get, r = e.set), new ol(s, r, n);
}
const In = {}, Gn = /* @__PURE__ */ new WeakMap();
let Ot;
function al(e, t = !1, n = Ot) {
  if (n) {
    let s = Gn.get(n);
    s || Gn.set(n, s = []), s.push(e);
  }
}
function ll(e, t, n = pe) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: a, call: c } = n, f = (D) => r ? D : /* @__PURE__ */ Ke(D) || r === !1 || r === 0 ? ht(D, 1) : ht(D);
  let d, u, b, x, g = !1, y = !1;
  if (/* @__PURE__ */ Te(e) ? (u = () => e.value, g = /* @__PURE__ */ Ke(e)) : /* @__PURE__ */ Nt(e) ? (u = () => f(e), g = !0) : q(e) ? (y = !0, g = e.some((D) => /* @__PURE__ */ Nt(D) || /* @__PURE__ */ Ke(D)), u = () => e.map((D) => {
    if (/* @__PURE__ */ Te(D))
      return D.value;
    if (/* @__PURE__ */ Nt(D))
      return f(D);
    if (Y(D))
      return c ? c(D, 2) : D();
  })) : Y(e) ? t ? u = c ? () => c(e, 2) : e : u = () => {
    if (b) {
      mt();
      try {
        b();
      } finally {
        gt();
      }
    }
    const D = Ot;
    Ot = d;
    try {
      return c ? c(e, 3, [x]) : e(x);
    } finally {
      Ot = D;
    }
  } : u = at, t && r) {
    const D = u, H = r === !0 ? 1 / 0 : r;
    u = () => ht(D(), H);
  }
  const m = Da(), _ = () => {
    d.stop(), m && m.active && ar(m.effects, d);
  };
  if (o && t) {
    const D = t;
    t = (...H) => {
      D(...H), _();
    };
  }
  let k = y ? new Array(e.length).fill(In) : In;
  const R = (D) => {
    if (!(!(d.flags & 1) || !d.dirty && !D))
      if (t) {
        const H = d.run();
        if (r || g || (y ? H.some((M, I) => Ct(M, k[I])) : Ct(H, k))) {
          b && b();
          const M = Ot;
          Ot = d;
          try {
            const I = [
              H,
              // pass undefined as the old value when it's changed for the first time
              k === In ? void 0 : y && k[0] === In ? [] : k,
              x
            ];
            k = H, c ? c(t, 3, I) : (
              // @ts-expect-error
              t(...I)
            );
          } finally {
            Ot = M;
          }
        }
      } else
        d.run();
  };
  return a && a(R), d = new qo(u), d.scheduler = i ? () => i(R, !1) : R, x = (D) => al(D, !1, d), b = d.onStop = () => {
    const D = Gn.get(d);
    if (D) {
      if (c)
        c(D, 4);
      else
        for (const H of D) H();
      Gn.delete(d);
    }
  }, t ? s ? R(!0) : k = d.run() : i ? i(R.bind(null, !0), !0) : d.run(), _.pause = d.pause.bind(d), _.resume = d.resume.bind(d), _.stop = _, _;
}
function ht(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Te(e))
    ht(e.value, t, n);
  else if (q(e))
    for (let s = 0; s < e.length; s++)
      ht(e[s], t, n);
  else if (ls(e) || Ht(e))
    e.forEach((s) => {
      ht(s, t, n);
    });
  else if (cs(e)) {
    for (const s in e)
      ht(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && ht(e[s], t, n);
  }
  return e;
}
function Sn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    hs(r, t, n);
  }
}
function Xe(e, t, n, s) {
  if (Y(e)) {
    const r = Sn(e, t, n, s);
    return r && Fo(r) && r.catch((o) => {
      hs(o, t, n);
    }), r;
  }
  if (q(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Xe(e[o], t, n, s));
    return r;
  }
}
function hs(e, t, n, s = !0) {
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
      mt(), Sn(o, null, 10, [
        e,
        c,
        f
      ]), gt();
      return;
    }
  }
  cl(e, n, r, s, i);
}
function cl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Re = [];
let st = -1;
const Vt = [];
let kt = null, Ut = 0;
const li = /* @__PURE__ */ Promise.resolve();
let Yn = null;
function gn(e) {
  const t = Yn || li;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function dl(e) {
  let t = st + 1, n = Re.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Re[s], o = bn(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function br(e) {
  if (!(e.flags & 1)) {
    const t = bn(e), n = Re[Re.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= bn(n) ? Re.push(e) : Re.splice(dl(t), 0, e), e.flags |= 1, ci();
  }
}
function ci() {
  Yn || (Yn = li.then(fi));
}
function fl(e) {
  q(e) ? Vt.push(...e) : kt && e.id === -1 ? kt.splice(Ut + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), ci();
}
function Nr(e, t, n = st + 1) {
  for (; n < Re.length; n++) {
    const s = Re[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Re.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function di(e) {
  if (Vt.length) {
    const t = [...new Set(Vt)].sort(
      (n, s) => bn(n) - bn(s)
    );
    if (Vt.length = 0, kt) {
      kt.push(...t);
      return;
    }
    for (kt = t, Ut = 0; Ut < kt.length; Ut++) {
      const n = kt[Ut];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    kt = null, Ut = 0;
  }
}
const bn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function fi(e) {
  try {
    for (st = 0; st < Re.length; st++) {
      const t = Re[st];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Sn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; st < Re.length; st++) {
      const t = Re[st];
      t && (t.flags &= -2);
    }
    st = -1, Re.length = 0, di(), Yn = null, (Re.length || Vt.length) && fi();
  }
}
let Ve = null, ui = null;
function Xn(e) {
  const t = Ve;
  return Ve = e, ui = e && e.type.__scopeId || null, t;
}
function Jt(e, t = Ve, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && es(-1);
    const o = Xn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Xn(o), s._d && es(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ot(e, t) {
  if (Ve === null)
    return e;
  const n = xs(Ve), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, a, c = pe] = t[r];
    o && (Y(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ht(i), s.push({
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
function Tt(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    o && (a.oldValue = o[i].value);
    let c = a.dir[s];
    c && (mt(), Xe(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), gt());
  }
}
function ul(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const s = Oe.parent && Oe.parent.provides;
    s === n && (n = Oe.provides = Object.create(s)), n[e] = t;
  }
}
function Un(e, t, n = !1) {
  const s = Hi();
  if (s || qt) {
    let r = qt ? qt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Y(t) ? t.call(s && s.proxy) : t;
  }
}
const pl = /* @__PURE__ */ Symbol.for("v-scx"), hl = () => Un(pl);
function zn(e, t, n) {
  return pi(e, t, n);
}
function pi(e, t, n = pe) {
  const { immediate: s, deep: r, flush: o, once: i } = n, a = we({}, n), c = t && s || !t && o !== "post";
  let f;
  if (yn) {
    if (o === "sync") {
      const x = hl();
      f = x.__watcherHandles || (x.__watcherHandles = []);
    } else if (!c) {
      const x = () => {
      };
      return x.stop = at, x.resume = at, x.pause = at, x;
    }
  }
  const d = Oe;
  a.call = (x, g, y) => Xe(x, d, g, y);
  let u = !1;
  o === "post" ? a.scheduler = (x) => {
    De(x, d && d.suspense);
  } : o !== "sync" && (u = !0, a.scheduler = (x, g) => {
    g ? x() : br(x);
  }), a.augmentJob = (x) => {
    t && (x.flags |= 4), u && (x.flags |= 2, d && (x.id = d.uid, x.i = d));
  };
  const b = ll(e, t, a);
  return yn && (f ? f.push(b) : c && b()), b;
}
function ml(e, t, n) {
  const s = this.proxy, r = ke(e) ? e.includes(".") ? hi(s, e) : () => s[e] : e.bind(s, s);
  let o;
  Y(t) ? o = t : (o = t.handler, n = t);
  const i = Tn(this), a = pi(r, o.bind(s), n);
  return i(), a;
}
function hi(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const gl = /* @__PURE__ */ Symbol("_vte"), mi = (e) => e.__isTeleport, rt = /* @__PURE__ */ Symbol("_leaveCb"), nn = /* @__PURE__ */ Symbol("_enterCb");
function bl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return En(() => {
    e.isMounted = !0;
  }), ki(() => {
    e.isUnmounting = !0;
  }), e;
}
const ze = [Function, Array], gi = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: ze,
  onEnter: ze,
  onAfterEnter: ze,
  onEnterCancelled: ze,
  // leave
  onBeforeLeave: ze,
  onLeave: ze,
  onAfterLeave: ze,
  onLeaveCancelled: ze,
  // appear
  onBeforeAppear: ze,
  onAppear: ze,
  onAfterAppear: ze,
  onAppearCancelled: ze
}, bi = (e) => {
  const t = e.subTree;
  return t.component ? bi(t.component) : t;
}, vl = {
  name: "BaseTransition",
  props: gi,
  setup(e, { slots: t }) {
    const n = Hi(), s = bl();
    return () => {
      const r = t.default && yi(t.default(), !0);
      if (!r || !r.length)
        return;
      const o = vi(r), i = /* @__PURE__ */ ie(e), { mode: a } = i;
      if (s.isLeaving)
        return Os(o);
      const c = Ir(o);
      if (!c)
        return Os(o);
      let f = Ws(
        c,
        i,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => f = u
      );
      c.type !== $e && vn(c, f);
      let d = n.subTree && Ir(n.subTree);
      if (d && d.type !== $e && !Pt(d, c) && bi(n).type !== $e) {
        let u = Ws(
          d,
          i,
          s,
          n
        );
        if (vn(d, u), a === "out-in" && c.type !== $e)
          return s.isLeaving = !0, u.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete u.afterLeave, d = void 0;
          }, Os(o);
        a === "in-out" && c.type !== $e ? u.delayLeave = (b, x, g) => {
          const y = xi(
            s,
            d
          );
          y[String(d.key)] = d, b[rt] = () => {
            x(), b[rt] = void 0, delete f.delayedLeave, d = void 0;
          }, f.delayedLeave = () => {
            g(), delete f.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return o;
    };
  }
};
function vi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== $e) {
        t = n;
        break;
      }
  }
  return t;
}
const xl = vl;
function xi(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function Ws(e, t, n, s, r) {
  const {
    appear: o,
    mode: i,
    persisted: a = !1,
    onBeforeEnter: c,
    onEnter: f,
    onAfterEnter: d,
    onEnterCancelled: u,
    onBeforeLeave: b,
    onLeave: x,
    onAfterLeave: g,
    onLeaveCancelled: y,
    onBeforeAppear: m,
    onAppear: _,
    onAfterAppear: k,
    onAppearCancelled: R
  } = t, D = String(e.key), H = xi(n, e), M = (B, X) => {
    B && Xe(
      B,
      s,
      9,
      X
    );
  }, I = (B, X) => {
    const oe = X[1];
    M(B, X), q(B) ? B.every((U) => U.length <= 1) && oe() : B.length <= 1 && oe();
  }, re = {
    mode: i,
    persisted: a,
    beforeEnter(B) {
      let X = c;
      if (!n.isMounted)
        if (o)
          X = m || c;
        else
          return;
      B[rt] && B[rt](
        !0
        /* cancelled */
      );
      const oe = H[D];
      oe && Pt(e, oe) && oe.el[rt] && oe.el[rt](), M(X, [B]);
    },
    enter(B) {
      if (H[D] === e) return;
      let X = f, oe = d, U = u;
      if (!n.isMounted)
        if (o)
          X = _ || f, oe = k || d, U = R || u;
        else
          return;
      let se = !1;
      B[nn] = (Pe) => {
        se || (se = !0, Pe ? M(U, [B]) : M(oe, [B]), re.delayedLeave && re.delayedLeave(), B[nn] = void 0);
      };
      const he = B[nn].bind(null, !1);
      X ? I(X, [B, he]) : he();
    },
    leave(B, X) {
      const oe = String(e.key);
      if (B[nn] && B[nn](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      M(b, [B]);
      let U = !1;
      B[rt] = (he) => {
        U || (U = !0, X(), he ? M(y, [B]) : M(g, [B]), B[rt] = void 0, H[oe] === e && delete H[oe]);
      };
      const se = B[rt].bind(null, !1);
      H[oe] = e, x ? I(x, [B, se]) : se();
    },
    clone(B) {
      const X = Ws(
        B,
        t,
        n,
        s,
        r
      );
      return r && r(X), X;
    }
  };
  return re;
}
function Os(e) {
  if (ms(e))
    return e = St(e), e.children = null, e;
}
function Ir(e) {
  if (!ms(e))
    return mi(e.type) && e.children ? vi(e.children) : e;
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
function vn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, vn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function yi(e, t = !1, n) {
  let s = [], r = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === le ? (i.patchFlag & 128 && r++, s = s.concat(
      yi(i.children, t, a)
    )) : (t || i.type !== $e) && s.push(a != null ? St(i, { key: a }) : i);
  }
  if (r > 1)
    for (let o = 0; o < s.length; o++)
      s[o].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function yl(e, t) {
  return Y(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    we({ name: e.name }, t, { setup: e })
  ) : e;
}
function wi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Zn = /* @__PURE__ */ new WeakMap();
function dn(e, t, n, s, r = !1) {
  if (q(e)) {
    e.forEach(
      (y, m) => dn(
        y,
        t && (q(t) ? t[m] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (fn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && dn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? xs(s.component) : s.el, i = r ? null : o, { i: a, r: c } = e, f = t && t.r, d = a.refs === pe ? a.refs = {} : a.refs, u = a.setupState, b = /* @__PURE__ */ ie(u), x = u === pe ? Io : (y) => Fr(d, y) ? !1 : ae(b, y), g = (y, m) => !(m && Fr(d, m));
  if (f != null && f !== c) {
    if (Lr(t), ke(f))
      d[f] = null, x(f) && (u[f] = null);
    else if (/* @__PURE__ */ Te(f)) {
      const y = t;
      g(f, y.k) && (f.value = null), y.k && (d[y.k] = null);
    }
  }
  if (Y(c))
    Sn(c, a, 12, [i, d]);
  else {
    const y = ke(c), m = /* @__PURE__ */ Te(c);
    if (y || m) {
      const _ = () => {
        if (e.f) {
          const k = y ? x(c) ? u[c] : d[c] : g() || !e.k ? c.value : d[e.k];
          if (r)
            q(k) && ar(k, o);
          else if (q(k))
            k.includes(o) || k.push(o);
          else if (y)
            d[c] = [o], x(c) && (u[c] = d[c]);
          else {
            const R = [o];
            g(c, e.k) && (c.value = R), e.k && (d[e.k] = R);
          }
        } else y ? (d[c] = i, x(c) && (u[c] = i)) : m && (g(c, e.k) && (c.value = i), e.k && (d[e.k] = i));
      };
      if (i) {
        const k = () => {
          _(), Zn.delete(e);
        };
        k.id = -1, Zn.set(e, k), De(k, n);
      } else
        Lr(e), _();
    }
  }
}
function Lr(e) {
  const t = Zn.get(e);
  t && (t.flags |= 8, Zn.delete(e));
}
us().requestIdleCallback;
us().cancelIdleCallback;
const fn = (e) => !!e.type.__asyncLoader, ms = (e) => e.type.__isKeepAlive;
function wl(e, t) {
  _i(e, "a", t);
}
function _l(e, t) {
  _i(e, "da", t);
}
function _i(e, t, n = Oe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (gs(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      ms(r.parent.vnode) && kl(s, t, n, r), r = r.parent;
  }
}
function kl(e, t, n, s) {
  const r = gs(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  vr(() => {
    ar(s[t], r);
  }, n);
}
function gs(e, t, n = Oe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      mt();
      const a = Tn(n), c = Xe(t, n, e, i);
      return a(), gt(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const vt = (e) => (t, n = Oe) => {
  (!yn || e === "sp") && gs(e, (...s) => t(...s), n);
}, Cl = vt("bm"), En = vt("m"), Sl = vt(
  "bu"
), El = vt("u"), ki = vt(
  "bum"
), vr = vt("um"), Tl = vt(
  "sp"
), Al = vt("rtg"), Rl = vt("rtc");
function $l(e, t = Oe) {
  gs("ec", e, t);
}
const Ol = /* @__PURE__ */ Symbol.for("v-ndc");
function Ee(e, t, n, s) {
  let r;
  const o = n, i = q(e);
  if (i || ke(e)) {
    const a = i && /* @__PURE__ */ Nt(e);
    let c = !1, f = !1;
    a && (c = !/* @__PURE__ */ Ke(e), f = /* @__PURE__ */ bt(e), e = ps(e)), r = new Array(e.length);
    for (let d = 0, u = e.length; d < u; d++)
      r[d] = t(
        c ? f ? Wt(Ye(e[d])) : Ye(e[d]) : e[d],
        d,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, o);
  } else if (de(e))
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
const Js = (e) => e ? Vi(e) ? xs(e) : Js(e.parent) : null, un = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Js(e.parent),
    $root: (e) => Js(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Si(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      br(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = gn.bind(e.proxy)),
    $watch: (e) => ml.bind(e)
  })
), Ps = (e, t) => e !== pe && !e.__isScriptSetup && ae(e, t), Pl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: a, appContext: c } = e;
    if (t[0] !== "$") {
      const b = i[t];
      if (b !== void 0)
        switch (b) {
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
        if (Ps(s, t))
          return i[t] = 1, s[t];
        if (r !== pe && ae(r, t))
          return i[t] = 2, r[t];
        if (ae(o, t))
          return i[t] = 3, o[t];
        if (n !== pe && ae(n, t))
          return i[t] = 4, n[t];
        Gs && (i[t] = 0);
      }
    }
    const f = un[t];
    let d, u;
    if (f)
      return t === "$attrs" && Ce(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== pe && ae(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = c.config.globalProperties, ae(u, t)
    )
      return u[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ps(r, t) ? (r[t] = n, !0) : s !== pe && ae(s, t) ? (s[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: o, type: i }
  }, a) {
    let c;
    return !!(n[a] || e !== pe && a[0] !== "$" && ae(e, a) || Ps(t, a) || ae(o, a) || ae(s, a) || ae(un, a) || ae(r.config.globalProperties, a) || (c = i.__cssModules) && c[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Br(e) {
  return q(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Gs = !0;
function jl(e) {
  const t = Si(e), n = e.proxy, s = e.ctx;
  Gs = !1, t.beforeCreate && Ur(t.beforeCreate, e, "bc");
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
    mounted: b,
    beforeUpdate: x,
    updated: g,
    activated: y,
    deactivated: m,
    beforeDestroy: _,
    beforeUnmount: k,
    destroyed: R,
    unmounted: D,
    render: H,
    renderTracked: M,
    renderTriggered: I,
    errorCaptured: re,
    serverPrefetch: B,
    // public API
    expose: X,
    inheritAttrs: oe,
    // assets
    components: U,
    directives: se,
    filters: he
  } = t;
  if (f && Ml(f, s, null), i)
    for (const ue in i) {
      const z = i[ue];
      Y(z) && (s[ue] = z.bind(n));
    }
  if (r) {
    const ue = r.call(n, n);
    de(ue) && (e.data = /* @__PURE__ */ hr(ue));
  }
  if (Gs = !0, o)
    for (const ue in o) {
      const z = o[ue], j = Y(z) ? z.bind(n, n) : Y(z.get) ? z.get.bind(n, n) : at, G = !Y(z) && Y(z.set) ? z.set.bind(n) : at, Z = ye({
        get: j,
        set: G
      });
      Object.defineProperty(s, ue, {
        enumerable: !0,
        configurable: !0,
        get: () => Z.value,
        set: (ve) => Z.value = ve
      });
    }
  if (a)
    for (const ue in a)
      Ci(a[ue], s, n, ue);
  if (c) {
    const ue = Y(c) ? c.call(n) : c;
    Reflect.ownKeys(ue).forEach((z) => {
      ul(z, ue[z]);
    });
  }
  d && Ur(d, e, "c");
  function ee(ue, z) {
    q(z) ? z.forEach((j) => ue(j.bind(n))) : z && ue(z.bind(n));
  }
  if (ee(Cl, u), ee(En, b), ee(Sl, x), ee(El, g), ee(wl, y), ee(_l, m), ee($l, re), ee(Rl, M), ee(Al, I), ee(ki, k), ee(vr, D), ee(Tl, B), q(X))
    if (X.length) {
      const ue = e.exposed || (e.exposed = {});
      X.forEach((z) => {
        Object.defineProperty(ue, z, {
          get: () => n[z],
          set: (j) => n[z] = j,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  H && e.render === at && (e.render = H), oe != null && (e.inheritAttrs = oe), U && (e.components = U), se && (e.directives = se), B && wi(e);
}
function Ml(e, t, n = at) {
  q(e) && (e = Ys(e));
  for (const s in e) {
    const r = e[s];
    let o;
    de(r) ? "default" in r ? o = Un(
      r.from || s,
      r.default,
      !0
    ) : o = Un(r.from || s) : o = Un(r), /* @__PURE__ */ Te(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function Ur(e, t, n) {
  Xe(
    q(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ci(e, t, n, s) {
  let r = s.includes(".") ? hi(n, s) : () => n[s];
  if (ke(e)) {
    const o = t[e];
    Y(o) && zn(r, o);
  } else if (Y(e))
    zn(r, e.bind(n));
  else if (de(e))
    if (q(e))
      e.forEach((o) => Ci(o, t, n, s));
    else {
      const o = Y(e.handler) ? e.handler.bind(n) : t[e.handler];
      Y(o) && zn(r, o, e);
    }
}
function Si(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let c;
  return a ? c = a : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (f) => Qn(c, f, i, !0)
  ), Qn(c, t, i)), de(t) && o.set(t, c), c;
}
function Qn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Qn(e, o, n, !0), r && r.forEach(
    (i) => Qn(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const a = Dl[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Dl = {
  data: zr,
  props: Hr,
  emits: Hr,
  // objects
  methods: on,
  computed: on,
  // lifecycle
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  // assets
  components: on,
  directives: on,
  // watch
  watch: Il,
  // provide / inject
  provide: zr,
  inject: Nl
};
function zr(e, t) {
  return t ? e ? function() {
    return we(
      Y(e) ? e.call(this, this) : e,
      Y(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Nl(e, t) {
  return on(Ys(e), Ys(t));
}
function Ys(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function on(e, t) {
  return e ? we(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hr(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : we(
    /* @__PURE__ */ Object.create(null),
    Br(e),
    Br(t ?? {})
  ) : t;
}
function Il(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = we(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Ae(e[s], t[s]);
  return n;
}
function Ei() {
  return {
    app: null,
    config: {
      isNativeTag: Io,
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
let Fl = 0;
function Ll(e, t) {
  return function(s, r = null) {
    Y(s) || (s = we({}, s)), r != null && !de(r) && (r = null);
    const o = Ei(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const f = o.app = {
      _uid: Fl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: bc,
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
      mount(d, u, b) {
        if (!c) {
          const x = f._ceVNode || _e(s, r);
          return x.appContext = o, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(x, d, b), c = !0, f._container = d, d.__vue_app__ = f, xs(x.component);
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
        const u = qt;
        qt = f;
        try {
          return d();
        } finally {
          qt = u;
        }
      }
    };
    return f;
  };
}
let qt = null;
const Bl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Be(t)}Modifiers`];
function Ul(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || pe;
  let r = n;
  const o = t.startsWith("update:"), i = o && Bl(s, t.slice(7));
  i && (i.trim && (r = n.map((d) => ke(d) ? d.trim() : d)), i.number && (r = n.map(fs)));
  let a, c = s[a = Es(t)] || // also try camelCase event handler (#2249)
  s[a = Es(Je(t))];
  !c && o && (c = s[a = Es(Be(t))]), c && Xe(
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
const zl = /* @__PURE__ */ new WeakMap();
function Ti(e, t, n = !1) {
  const s = n ? zl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!Y(e)) {
    const c = (f) => {
      const d = Ti(f, t, !0);
      d && (a = !0, we(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !a ? (de(e) && s.set(e, null), null) : (q(o) ? o.forEach((c) => i[c] = null) : we(i, o), de(e) && s.set(e, i), i);
}
function bs(e, t) {
  return !e || !as(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Be(t)) || ae(e, t));
}
function Vr(e) {
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
    data: b,
    setupState: x,
    ctx: g,
    inheritAttrs: y
  } = e, m = Xn(e);
  let _, k;
  try {
    if (n.shapeFlag & 4) {
      const D = r || s, H = D;
      _ = it(
        f.call(
          H,
          D,
          d,
          u,
          x,
          b,
          g
        )
      ), k = a;
    } else {
      const D = t;
      _ = it(
        D.length > 1 ? D(
          u,
          { attrs: a, slots: i, emit: c }
        ) : D(
          u,
          null
        )
      ), k = t.props ? a : Hl(a);
    }
  } catch (D) {
    pn.length = 0, hs(D, e, 1), _ = _e($e);
  }
  let R = _;
  if (k && y !== !1) {
    const D = Object.keys(k), { shapeFlag: H } = R;
    D.length && H & 7 && (o && D.some(ir) && (k = Vl(
      k,
      o
    )), R = St(R, k, !1, !0));
  }
  return n.dirs && (R = St(R, null, !1, !0), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && vn(R, n.transition), _ = R, Xn(m), _;
}
const Hl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || as(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Vl = (e, t) => {
  const n = {};
  for (const s in e)
    (!ir(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ql(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: a, patchFlag: c } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? qr(s, i, f) : !!i;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let u = 0; u < d.length; u++) {
        const b = d[u];
        if (Ai(i, s, b) && !bs(f, b))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === i ? !1 : s ? i ? qr(s, i, f) : !0 : !!i;
  return !1;
}
function qr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (Ai(t, e, o) && !bs(n, o))
      return !0;
  }
  return !1;
}
function Ai(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && de(s) && de(r) ? !Cn(s, r) : s !== r;
}
function Kl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Ri = {}, $i = () => Object.create(Ri), Oi = (e) => Object.getPrototypeOf(e) === Ri;
function Wl(e, t, n, s = !1) {
  const r = {}, o = $i();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Pi(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ el(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Jl(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = /* @__PURE__ */ ie(r), [c] = e.propsOptions;
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
        let b = d[u];
        if (bs(e.emitsOptions, b))
          continue;
        const x = t[b];
        if (c)
          if (ae(o, b))
            x !== o[b] && (o[b] = x, f = !0);
          else {
            const g = Je(b);
            r[g] = Xs(
              c,
              a,
              g,
              x,
              e,
              !1
            );
          }
        else
          x !== o[b] && (o[b] = x, f = !0);
      }
    }
  } else {
    Pi(e, t, r, o) && (f = !0);
    let d;
    for (const u in a)
      (!t || // for camelCase
      !ae(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Be(u)) === u || !ae(t, d))) && (c ? n && // for camelCase
      (n[u] !== void 0 || // for kebab-case
      n[d] !== void 0) && (r[u] = Xs(
        c,
        a,
        u,
        void 0,
        e,
        !0
      )) : delete r[u]);
    if (o !== a)
      for (const u in o)
        (!t || !ae(t, u)) && (delete o[u], f = !0);
  }
  f && pt(e.attrs, "set", "");
}
function Pi(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (an(c))
        continue;
      const f = t[c];
      let d;
      r && ae(r, d = Je(c)) ? !o || !o.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : bs(e.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, i = !0);
    }
  if (o) {
    const c = /* @__PURE__ */ ie(n), f = a || pe;
    for (let d = 0; d < o.length; d++) {
      const u = o[d];
      n[u] = Xs(
        r,
        c,
        u,
        f[u],
        e,
        !ae(f, u)
      );
    }
  }
  return i;
}
function Xs(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const a = ae(i, "default");
    if (a && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && Y(c)) {
        const { propsDefaults: f } = r;
        if (n in f)
          s = f[n];
        else {
          const d = Tn(r);
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
const Gl = /* @__PURE__ */ new WeakMap();
function ji(e, t, n = !1) {
  const s = n ? Gl : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, a = [];
  let c = !1;
  if (!Y(e)) {
    const d = (u) => {
      c = !0;
      const [b, x] = ji(u, t, !0);
      we(i, b), x && a.push(...x);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!o && !c)
    return de(e) && s.set(e, zt), zt;
  if (q(o))
    for (let d = 0; d < o.length; d++) {
      const u = Je(o[d]);
      Kr(u) && (i[u] = pe);
    }
  else if (o)
    for (const d in o) {
      const u = Je(d);
      if (Kr(u)) {
        const b = o[d], x = i[u] = q(b) || Y(b) ? { type: b } : we({}, b), g = x.type;
        let y = !1, m = !0;
        if (q(g))
          for (let _ = 0; _ < g.length; ++_) {
            const k = g[_], R = Y(k) && k.name;
            if (R === "Boolean") {
              y = !0;
              break;
            } else R === "String" && (m = !1);
          }
        else
          y = Y(g) && g.name === "Boolean";
        x[
          0
          /* shouldCast */
        ] = y, x[
          1
          /* shouldCastTrue */
        ] = m, (y || ae(x, "default")) && a.push(u);
      }
    }
  const f = [i, a];
  return de(e) && s.set(e, f), f;
}
function Kr(e) {
  return e[0] !== "$" && !an(e);
}
const xr = (e) => e === "_" || e === "_ctx" || e === "$stable", yr = (e) => q(e) ? e.map(it) : [it(e)], Yl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Jt((...r) => yr(t(...r)), n);
  return s._c = !1, s;
}, Mi = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (xr(r)) continue;
    const o = e[r];
    if (Y(o))
      t[r] = Yl(r, o, s);
    else if (o != null) {
      const i = yr(o);
      t[r] = () => i;
    }
  }
}, Di = (e, t) => {
  const n = yr(t);
  e.slots.default = () => n;
}, Ni = (e, t, n) => {
  for (const s in t)
    (n || !xr(s)) && (e[s] = t[s]);
}, Xl = (e, t, n) => {
  const s = e.slots = $i();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ni(s, t, n), n && Uo(s, "_", r, !0)) : Mi(t, s);
  } else t && Di(e, t);
}, Zl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = pe;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? o = !1 : Ni(r, t, n) : (o = !t.$stable, Mi(t, r)), i = t;
  } else t && (Di(e, t), i = { default: 1 });
  if (o)
    for (const a in r)
      !xr(a) && i[a] == null && delete r[a];
}, De = sc;
function Ql(e) {
  return ec(e);
}
function ec(e, t) {
  const n = us();
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
    nextSibling: b,
    setScopeId: x = at,
    insertStaticContent: g
  } = e, y = (p, h, w, A = null, S = null, E = null, F = void 0, N = null, P = !!h.dynamicChildren) => {
    if (p === h)
      return;
    p && !Pt(p, h) && (A = Mn(p), ve(p, S, E, !0), p = null), h.patchFlag === -2 && (P = !1, h.dynamicChildren = null);
    const { type: T, ref: K, shapeFlag: L } = h;
    switch (T) {
      case vs:
        m(p, h, w, A);
        break;
      case $e:
        _(p, h, w, A);
        break;
      case Hn:
        p == null && k(h, w, A, F);
        break;
      case le:
        U(
          p,
          h,
          w,
          A,
          S,
          E,
          F,
          N,
          P
        );
        break;
      default:
        L & 1 ? H(
          p,
          h,
          w,
          A,
          S,
          E,
          F,
          N,
          P
        ) : L & 6 ? se(
          p,
          h,
          w,
          A,
          S,
          E,
          F,
          N,
          P
        ) : (L & 64 || L & 128) && T.process(
          p,
          h,
          w,
          A,
          S,
          E,
          F,
          N,
          P,
          Qt
        );
    }
    K != null && S ? dn(K, p && p.ref, E, h || p, !h) : K == null && p && p.ref != null && dn(p.ref, null, E, p, !0);
  }, m = (p, h, w, A) => {
    if (p == null)
      s(
        h.el = a(h.children),
        w,
        A
      );
    else {
      const S = h.el = p.el;
      h.children !== p.children && f(S, h.children);
    }
  }, _ = (p, h, w, A) => {
    p == null ? s(
      h.el = c(h.children || ""),
      w,
      A
    ) : h.el = p.el;
  }, k = (p, h, w, A) => {
    [p.el, p.anchor] = g(
      p.children,
      h,
      w,
      A,
      p.el,
      p.anchor
    );
  }, R = ({ el: p, anchor: h }, w, A) => {
    let S;
    for (; p && p !== h; )
      S = b(p), s(p, w, A), p = S;
    s(h, w, A);
  }, D = ({ el: p, anchor: h }) => {
    let w;
    for (; p && p !== h; )
      w = b(p), r(p), p = w;
    r(h);
  }, H = (p, h, w, A, S, E, F, N, P) => {
    if (h.type === "svg" ? F = "svg" : h.type === "math" && (F = "mathml"), p == null)
      M(
        h,
        w,
        A,
        S,
        E,
        F,
        N,
        P
      );
    else {
      const T = p.el && p.el._isVueCE ? p.el : null;
      try {
        T && T._beginPatch(), B(
          p,
          h,
          S,
          E,
          F,
          N,
          P
        );
      } finally {
        T && T._endPatch();
      }
    }
  }, M = (p, h, w, A, S, E, F, N) => {
    let P, T;
    const { props: K, shapeFlag: L, transition: V, dirs: J } = p;
    if (P = p.el = i(
      p.type,
      E,
      K && K.is,
      K
    ), L & 8 ? d(P, p.children) : L & 16 && re(
      p.children,
      P,
      null,
      A,
      S,
      js(p, E),
      F,
      N
    ), J && Tt(p, null, A, "created"), I(P, p, p.scopeId, F, A), K) {
      for (const me in K)
        me !== "value" && !an(me) && o(P, me, null, K[me], E, A);
      "value" in K && o(P, "value", null, K.value, E), (T = K.onVnodeBeforeMount) && nt(T, A, p);
    }
    J && Tt(p, null, A, "beforeMount");
    const te = tc(S, V);
    te && V.beforeEnter(P), s(P, h, w), ((T = K && K.onVnodeMounted) || te || J) && De(() => {
      T && nt(T, A, p), te && V.enter(P), J && Tt(p, null, A, "mounted");
    }, S);
  }, I = (p, h, w, A, S) => {
    if (w && x(p, w), A)
      for (let E = 0; E < A.length; E++)
        x(p, A[E]);
    if (S) {
      let E = S.subTree;
      if (h === E || Bi(E.type) && (E.ssContent === h || E.ssFallback === h)) {
        const F = S.vnode;
        I(
          p,
          F,
          F.scopeId,
          F.slotScopeIds,
          S.parent
        );
      }
    }
  }, re = (p, h, w, A, S, E, F, N, P = 0) => {
    for (let T = P; T < p.length; T++) {
      const K = p[T] = N ? ut(p[T]) : it(p[T]);
      y(
        null,
        K,
        h,
        w,
        A,
        S,
        E,
        F,
        N
      );
    }
  }, B = (p, h, w, A, S, E, F) => {
    const N = h.el = p.el;
    let { patchFlag: P, dynamicChildren: T, dirs: K } = h;
    P |= p.patchFlag & 16;
    const L = p.props || pe, V = h.props || pe;
    let J;
    if (w && At(w, !1), (J = V.onVnodeBeforeUpdate) && nt(J, w, h, p), K && Tt(h, p, w, "beforeUpdate"), w && At(w, !0), (L.innerHTML && V.innerHTML == null || L.textContent && V.textContent == null) && d(N, ""), T ? X(
      p.dynamicChildren,
      T,
      N,
      w,
      A,
      js(h, S),
      E
    ) : F || z(
      p,
      h,
      N,
      null,
      w,
      A,
      js(h, S),
      E,
      !1
    ), P > 0) {
      if (P & 16)
        oe(N, L, V, w, S);
      else if (P & 2 && L.class !== V.class && o(N, "class", null, V.class, S), P & 4 && o(N, "style", L.style, V.style, S), P & 8) {
        const te = h.dynamicProps;
        for (let me = 0; me < te.length; me++) {
          const fe = te[me], je = L[fe], Me = V[fe];
          (Me !== je || fe === "value") && o(N, fe, je, Me, S, w);
        }
      }
      P & 1 && p.children !== h.children && d(N, h.children);
    } else !F && T == null && oe(N, L, V, w, S);
    ((J = V.onVnodeUpdated) || K) && De(() => {
      J && nt(J, w, h, p), K && Tt(h, p, w, "updated");
    }, A);
  }, X = (p, h, w, A, S, E, F) => {
    for (let N = 0; N < h.length; N++) {
      const P = p[N], T = h[N], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Pt(P, T) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? u(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
        )
      );
      y(
        P,
        T,
        K,
        null,
        A,
        S,
        E,
        F,
        !0
      );
    }
  }, oe = (p, h, w, A, S) => {
    if (h !== w) {
      if (h !== pe)
        for (const E in h)
          !an(E) && !(E in w) && o(
            p,
            E,
            h[E],
            null,
            S,
            A
          );
      for (const E in w) {
        if (an(E)) continue;
        const F = w[E], N = h[E];
        F !== N && E !== "value" && o(p, E, N, F, S, A);
      }
      "value" in w && o(p, "value", h.value, w.value, S);
    }
  }, U = (p, h, w, A, S, E, F, N, P) => {
    const T = h.el = p ? p.el : a(""), K = h.anchor = p ? p.anchor : a("");
    let { patchFlag: L, dynamicChildren: V, slotScopeIds: J } = h;
    J && (N = N ? N.concat(J) : J), p == null ? (s(T, w, A), s(K, w, A), re(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      w,
      K,
      S,
      E,
      F,
      N,
      P
    )) : L > 0 && L & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === V.length ? (X(
      p.dynamicChildren,
      V,
      w,
      S,
      E,
      F,
      N
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || S && h === S.subTree) && Ii(
      p,
      h,
      !0
      /* shallow */
    )) : z(
      p,
      h,
      w,
      K,
      S,
      E,
      F,
      N,
      P
    );
  }, se = (p, h, w, A, S, E, F, N, P) => {
    h.slotScopeIds = N, p == null ? h.shapeFlag & 512 ? S.ctx.activate(
      h,
      w,
      A,
      F,
      P
    ) : he(
      h,
      w,
      A,
      S,
      E,
      F,
      P
    ) : Pe(p, h, P);
  }, he = (p, h, w, A, S, E, F) => {
    const N = p.component = dc(
      p,
      A,
      S
    );
    if (ms(p) && (N.ctx.renderer = Qt), fc(N, !1, F), N.asyncDep) {
      if (S && S.registerDep(N, ee, F), !p.el) {
        const P = N.subTree = _e($e);
        _(null, P, h, w), p.placeholder = P.el;
      }
    } else
      ee(
        N,
        p,
        h,
        w,
        S,
        E,
        F
      );
  }, Pe = (p, h, w) => {
    const A = h.component = p.component;
    if (ql(p, h, w))
      if (A.asyncDep && !A.asyncResolved) {
        ue(A, h, w);
        return;
      } else
        A.next = h, A.update();
    else
      h.el = p.el, A.vnode = h;
  }, ee = (p, h, w, A, S, E, F) => {
    const N = () => {
      if (p.isMounted) {
        let { next: L, bu: V, u: J, parent: te, vnode: me } = p;
        {
          const et = Fi(p);
          if (et) {
            L && (L.el = me.el, ue(p, L, F)), et.asyncDep.then(() => {
              De(() => {
                p.isUnmounted || T();
              }, S);
            });
            return;
          }
        }
        let fe = L, je;
        At(p, !1), L ? (L.el = me.el, ue(p, L, F)) : L = me, V && Bn(V), (je = L.props && L.props.onVnodeBeforeUpdate) && nt(je, te, L, me), At(p, !0);
        const Me = Vr(p), Qe = p.subTree;
        p.subTree = Me, y(
          Qe,
          Me,
          // parent may have changed if it's in a teleport
          u(Qe.el),
          // anchor may have changed if it's in a fragment
          Mn(Qe),
          p,
          S,
          E
        ), L.el = Me.el, fe === null && Kl(p, Me.el), J && De(J, S), (je = L.props && L.props.onVnodeUpdated) && De(
          () => nt(je, te, L, me),
          S
        );
      } else {
        let L;
        const { el: V, props: J } = h, { bm: te, m: me, parent: fe, root: je, type: Me } = p, Qe = fn(h);
        At(p, !1), te && Bn(te), !Qe && (L = J && J.onVnodeBeforeMount) && nt(L, fe, h), At(p, !0);
        {
          je.ce && je.ce._hasShadowRoot() && je.ce._injectChildStyle(Me);
          const et = p.subTree = Vr(p);
          y(
            null,
            et,
            w,
            A,
            p,
            S,
            E
          ), h.el = et.el;
        }
        if (me && De(me, S), !Qe && (L = J && J.onVnodeMounted)) {
          const et = h;
          De(
            () => nt(L, fe, et),
            S
          );
        }
        (h.shapeFlag & 256 || fe && fn(fe.vnode) && fe.vnode.shapeFlag & 256) && p.a && De(p.a, S), p.isMounted = !0, h = w = A = null;
      }
    };
    p.scope.on();
    const P = p.effect = new qo(N);
    p.scope.off();
    const T = p.update = P.run.bind(P), K = p.job = P.runIfDirty.bind(P);
    K.i = p, K.id = p.uid, P.scheduler = () => br(K), At(p, !0), T();
  }, ue = (p, h, w) => {
    h.component = p;
    const A = p.vnode.props;
    p.vnode = h, p.next = null, Jl(p, h.props, A, w), Zl(p, h.children, w), mt(), Nr(p), gt();
  }, z = (p, h, w, A, S, E, F, N, P = !1) => {
    const T = p && p.children, K = p ? p.shapeFlag : 0, L = h.children, { patchFlag: V, shapeFlag: J } = h;
    if (V > 0) {
      if (V & 128) {
        G(
          T,
          L,
          w,
          A,
          S,
          E,
          F,
          N,
          P
        );
        return;
      } else if (V & 256) {
        j(
          T,
          L,
          w,
          A,
          S,
          E,
          F,
          N,
          P
        );
        return;
      }
    }
    J & 8 ? (K & 16 && Zt(T, S, E), L !== T && d(w, L)) : K & 16 ? J & 16 ? G(
      T,
      L,
      w,
      A,
      S,
      E,
      F,
      N,
      P
    ) : Zt(T, S, E, !0) : (K & 8 && d(w, ""), J & 16 && re(
      L,
      w,
      A,
      S,
      E,
      F,
      N,
      P
    ));
  }, j = (p, h, w, A, S, E, F, N, P) => {
    p = p || zt, h = h || zt;
    const T = p.length, K = h.length, L = Math.min(T, K);
    let V;
    for (V = 0; V < L; V++) {
      const J = h[V] = P ? ut(h[V]) : it(h[V]);
      y(
        p[V],
        J,
        w,
        null,
        S,
        E,
        F,
        N,
        P
      );
    }
    T > K ? Zt(
      p,
      S,
      E,
      !0,
      !1,
      L
    ) : re(
      h,
      w,
      A,
      S,
      E,
      F,
      N,
      P,
      L
    );
  }, G = (p, h, w, A, S, E, F, N, P) => {
    let T = 0;
    const K = h.length;
    let L = p.length - 1, V = K - 1;
    for (; T <= L && T <= V; ) {
      const J = p[T], te = h[T] = P ? ut(h[T]) : it(h[T]);
      if (Pt(J, te))
        y(
          J,
          te,
          w,
          null,
          S,
          E,
          F,
          N,
          P
        );
      else
        break;
      T++;
    }
    for (; T <= L && T <= V; ) {
      const J = p[L], te = h[V] = P ? ut(h[V]) : it(h[V]);
      if (Pt(J, te))
        y(
          J,
          te,
          w,
          null,
          S,
          E,
          F,
          N,
          P
        );
      else
        break;
      L--, V--;
    }
    if (T > L) {
      if (T <= V) {
        const J = V + 1, te = J < K ? h[J].el : A;
        for (; T <= V; )
          y(
            null,
            h[T] = P ? ut(h[T]) : it(h[T]),
            w,
            te,
            S,
            E,
            F,
            N,
            P
          ), T++;
      }
    } else if (T > V)
      for (; T <= L; )
        ve(p[T], S, E, !0), T++;
    else {
      const J = T, te = T, me = /* @__PURE__ */ new Map();
      for (T = te; T <= V; T++) {
        const Le = h[T] = P ? ut(h[T]) : it(h[T]);
        Le.key != null && me.set(Le.key, T);
      }
      let fe, je = 0;
      const Me = V - te + 1;
      let Qe = !1, et = 0;
      const en = new Array(Me);
      for (T = 0; T < Me; T++) en[T] = 0;
      for (T = J; T <= L; T++) {
        const Le = p[T];
        if (je >= Me) {
          ve(Le, S, E, !0);
          continue;
        }
        let tt;
        if (Le.key != null)
          tt = me.get(Le.key);
        else
          for (fe = te; fe <= V; fe++)
            if (en[fe - te] === 0 && Pt(Le, h[fe])) {
              tt = fe;
              break;
            }
        tt === void 0 ? ve(Le, S, E, !0) : (en[tt - te] = T + 1, tt >= et ? et = tt : Qe = !0, y(
          Le,
          h[tt],
          w,
          null,
          S,
          E,
          F,
          N,
          P
        ), je++);
      }
      const Rr = Qe ? nc(en) : zt;
      for (fe = Rr.length - 1, T = Me - 1; T >= 0; T--) {
        const Le = te + T, tt = h[Le], $r = h[Le + 1], Or = Le + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          $r.el || Li($r)
        ) : A;
        en[T] === 0 ? y(
          null,
          tt,
          w,
          Or,
          S,
          E,
          F,
          N,
          P
        ) : Qe && (fe < 0 || T !== Rr[fe] ? Z(tt, w, Or, 2) : fe--);
      }
    }
  }, Z = (p, h, w, A, S = null) => {
    const { el: E, type: F, transition: N, children: P, shapeFlag: T } = p;
    if (T & 6) {
      Z(p.component.subTree, h, w, A);
      return;
    }
    if (T & 128) {
      p.suspense.move(h, w, A);
      return;
    }
    if (T & 64) {
      F.move(p, h, w, Qt);
      return;
    }
    if (F === le) {
      s(E, h, w);
      for (let L = 0; L < P.length; L++)
        Z(P[L], h, w, A);
      s(p.anchor, h, w);
      return;
    }
    if (F === Hn) {
      R(p, h, w);
      return;
    }
    if (A !== 2 && T & 1 && N)
      if (A === 0)
        N.beforeEnter(E), s(E, h, w), De(() => N.enter(E), S);
      else {
        const { leave: L, delayLeave: V, afterLeave: J } = N, te = () => {
          p.ctx.isUnmounted ? r(E) : s(E, h, w);
        }, me = () => {
          E._isLeaving && E[rt](
            !0
            /* cancelled */
          ), L(E, () => {
            te(), J && J();
          });
        };
        V ? V(E, te, me) : me();
      }
    else
      s(E, h, w);
  }, ve = (p, h, w, A = !1, S = !1) => {
    const {
      type: E,
      props: F,
      ref: N,
      children: P,
      dynamicChildren: T,
      shapeFlag: K,
      patchFlag: L,
      dirs: V,
      cacheIndex: J
    } = p;
    if (L === -2 && (S = !1), N != null && (mt(), dn(N, null, w, p, !0), gt()), J != null && (h.renderCache[J] = void 0), K & 256) {
      h.ctx.deactivate(p);
      return;
    }
    const te = K & 1 && V, me = !fn(p);
    let fe;
    if (me && (fe = F && F.onVnodeBeforeUnmount) && nt(fe, h, p), K & 6)
      jn(p.component, w, A);
    else {
      if (K & 128) {
        p.suspense.unmount(w, A);
        return;
      }
      te && Tt(p, null, h, "beforeUnmount"), K & 64 ? p.type.remove(
        p,
        h,
        w,
        Qt,
        A
      ) : T && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !T.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== le || L > 0 && L & 64) ? Zt(
        T,
        h,
        w,
        !1,
        !0
      ) : (E === le && L & 384 || !S && K & 16) && Zt(P, h, w), A && Et(p);
    }
    (me && (fe = F && F.onVnodeUnmounted) || te) && De(() => {
      fe && nt(fe, h, p), te && Tt(p, null, h, "unmounted");
    }, w);
  }, Et = (p) => {
    const { type: h, el: w, anchor: A, transition: S } = p;
    if (h === le) {
      Lt(w, A);
      return;
    }
    if (h === Hn) {
      D(p);
      return;
    }
    const E = () => {
      r(w), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (p.shapeFlag & 1 && S && !S.persisted) {
      const { leave: F, delayLeave: N } = S, P = () => F(w, E);
      N ? N(p.el, E, P) : P();
    } else
      E();
  }, Lt = (p, h) => {
    let w;
    for (; p !== h; )
      w = b(p), r(p), p = w;
    r(h);
  }, jn = (p, h, w) => {
    const { bum: A, scope: S, job: E, subTree: F, um: N, m: P, a: T } = p;
    Wr(P), Wr(T), A && Bn(A), S.stop(), E && (E.flags |= 8, ve(F, p, h, w)), N && De(N, h), De(() => {
      p.isUnmounted = !0;
    }, h);
  }, Zt = (p, h, w, A = !1, S = !1, E = 0) => {
    for (let F = E; F < p.length; F++)
      ve(p[F], h, w, A, S);
  }, Mn = (p) => {
    if (p.shapeFlag & 6)
      return Mn(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const h = b(p.anchor || p.el), w = h && h[gl];
    return w ? b(w) : h;
  };
  let Ss = !1;
  const Ar = (p, h, w) => {
    let A;
    p == null ? h._vnode && (ve(h._vnode, null, null, !0), A = h._vnode.component) : y(
      h._vnode || null,
      p,
      h,
      null,
      null,
      null,
      w
    ), h._vnode = p, Ss || (Ss = !0, Nr(A), di(), Ss = !1);
  }, Qt = {
    p: y,
    um: ve,
    m: Z,
    r: Et,
    mt: he,
    mc: re,
    pc: z,
    pbc: X,
    n: Mn,
    o: e
  };
  return {
    render: Ar,
    hydrate: void 0,
    createApp: Ll(Ar)
  };
}
function js({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function At({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function tc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ii(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (q(s) && q(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let a = r[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = ut(r[o]), a.el = i.el), !n && a.patchFlag !== -2 && Ii(i, a)), a.type === vs && (a.patchFlag === -1 && (a = r[o] = ut(a)), a.el = i.el), a.type === $e && !a.el && (a.el = i.el);
    }
}
function nc(e) {
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
function Fi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Fi(t);
}
function Wr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Li(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Li(t.subTree) : null;
}
const Bi = (e) => e.__isSuspense;
function sc(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : fl(e);
}
const le = /* @__PURE__ */ Symbol.for("v-fgt"), vs = /* @__PURE__ */ Symbol.for("v-txt"), $e = /* @__PURE__ */ Symbol.for("v-cmt"), Hn = /* @__PURE__ */ Symbol.for("v-stc"), pn = [];
let Ue = null;
function $(e = !1) {
  pn.push(Ue = e ? null : []);
}
function rc() {
  pn.pop(), Ue = pn[pn.length - 1] || null;
}
let xn = 1;
function es(e, t = !1) {
  xn += e, e < 0 && Ue && t && (Ue.hasOnce = !0);
}
function Ui(e) {
  return e.dynamicChildren = xn > 0 ? Ue || zt : null, rc(), xn > 0 && Ue && Ue.push(e), e;
}
function O(e, t, n, s, r, o) {
  return Ui(
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
function ts(e, t, n, s, r) {
  return Ui(
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
function ns(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Pt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const zi = ({ key: e }) => e ?? null, Vn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ke(e) || /* @__PURE__ */ Te(e) || Y(e) ? { i: Ve, r: e, k: t, f: !!n } : e : null);
function l(e, t = null, n = null, s = 0, r = null, o = e === le ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && zi(t),
    ref: t && Vn(t),
    scopeId: ui,
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
  return a ? (wr(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= ke(n) ? 8 : 16), xn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ue.push(c), c;
}
const _e = oc;
function oc(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Ol) && (e = $e), ns(e)) {
    const a = St(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && wr(a, n), xn > 0 && !o && Ue && (a.shapeFlag & 6 ? Ue[Ue.indexOf(e)] = a : Ue.push(a)), a.patchFlag = -2, a;
  }
  if (mc(e) && (e = e.__vccOpts), t) {
    t = ic(t);
    let { class: a, style: c } = t;
    a && !ke(a) && (t.class = xe(a)), de(c) && (/* @__PURE__ */ gr(c) && !q(c) && (c = we({}, c)), t.style = qe(c));
  }
  const i = ke(e) ? 1 : Bi(e) ? 128 : mi(e) ? 64 : de(e) ? 4 : Y(e) ? 2 : 0;
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
function ic(e) {
  return e ? /* @__PURE__ */ gr(e) || Oi(e) ? we({}, e) : e : null;
}
function St(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: a, transition: c } = e, f = t ? ac(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && zi(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? q(o) ? o.concat(Vn(t)) : [o, Vn(t)] : Vn(t)
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
    patchFlag: t && e.type !== le ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && St(e.ssContent),
    ssFallback: e.ssFallback && St(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && vn(
    d,
    c.clone(d)
  ), d;
}
function ce(e = " ", t = 0) {
  return _e(vs, null, e, t);
}
function We(e, t) {
  const n = _e(Hn, null, e);
  return n.staticCount = t, n;
}
function be(e = "", t = !1) {
  return t ? ($(), ts($e, null, e)) : _e($e, null, e);
}
function it(e) {
  return e == null || typeof e == "boolean" ? _e($e) : q(e) ? _e(
    le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ns(e) ? ut(e) : _e(vs, null, String(e));
}
function ut(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : St(e);
}
function wr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), wr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Oi(t) ? t._ctx = Ve : r === 3 && Ve && (Ve.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Y(t) ? (t = { default: t, _ctx: Ve }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ce(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ac(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = xe([t.class, s.class]));
      else if (r === "style")
        t.style = qe([t.style, s.style]);
      else if (as(r)) {
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
const lc = Ei();
let cc = 0;
function dc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || lc, o = {
    uid: cc++,
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
    scope: new Ma(
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
    propsOptions: ji(s, r),
    emitsOptions: Ti(s, r),
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Ul.bind(null, o), e.ce && e.ce(o), o;
}
let Oe = null;
const Hi = () => Oe || Ve;
let ss, Zs;
{
  const e = us(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  ss = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), Zs = t(
    "__VUE_SSR_SETTERS__",
    (n) => yn = n
  );
}
const Tn = (e) => {
  const t = Oe;
  return ss(e), e.scope.on(), () => {
    e.scope.off(), ss(t);
  };
}, Jr = () => {
  Oe && Oe.scope.off(), ss(null);
};
function Vi(e) {
  return e.vnode.shapeFlag & 4;
}
let yn = !1;
function fc(e, t = !1, n = !1) {
  t && Zs(t);
  const { props: s, children: r } = e.vnode, o = Vi(e);
  Wl(e, s, o, t), Xl(e, r, n || t);
  const i = o ? uc(e, t) : void 0;
  return t && Zs(!1), i;
}
function uc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Pl);
  const { setup: s } = n;
  if (s) {
    mt();
    const r = e.setupContext = s.length > 1 ? hc(e) : null, o = Tn(e), i = Sn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = Fo(i);
    if (gt(), o(), (a || e.sp) && !fn(e) && wi(e), a) {
      if (i.then(Jr, Jr), t)
        return i.then((c) => {
          Gr(e, c);
        }).catch((c) => {
          hs(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Gr(e, i);
  } else
    qi(e);
}
function Gr(e, t, n) {
  Y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = ai(t)), qi(e);
}
function qi(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || at);
  {
    const r = Tn(e);
    mt();
    try {
      jl(e);
    } finally {
      gt(), r();
    }
  }
}
const pc = {
  get(e, t) {
    return Ce(e, "get", ""), e[t];
  }
};
function hc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, pc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function xs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ai(tl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in un)
        return un[n](e);
    },
    has(t, n) {
      return n in t || n in un;
    }
  })) : e.proxy;
}
function mc(e) {
  return Y(e) && "__vccOpts" in e;
}
const ye = (e, t) => /* @__PURE__ */ il(e, t, yn);
function gc(e, t, n) {
  try {
    es(-1);
    const s = arguments.length;
    return s === 2 ? de(t) && !q(t) ? ns(t) ? _e(e, null, [t]) : _e(e, t) : _e(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && ns(n) && (n = [n]), _e(e, t, n));
  } finally {
    es(1);
  }
}
const bc = "3.5.29";
let Qs;
const Yr = typeof window < "u" && window.trustedTypes;
if (Yr)
  try {
    Qs = /* @__PURE__ */ Yr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ki = Qs ? (e) => Qs.createHTML(e) : (e) => e, vc = "http://www.w3.org/2000/svg", xc = "http://www.w3.org/1998/Math/MathML", ft = typeof document < "u" ? document : null, Xr = ft && /* @__PURE__ */ ft.createElement("template"), yc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? ft.createElementNS(vc, e) : t === "mathml" ? ft.createElementNS(xc, e) : n ? ft.createElement(e, { is: n }) : ft.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => ft.createTextNode(e),
  createComment: (e) => ft.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ft.querySelector(e),
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
      Xr.innerHTML = Ki(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Xr.content;
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
}, wt = "transition", sn = "animation", wn = /* @__PURE__ */ Symbol("_vtc"), Wi = {
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
}, wc = /* @__PURE__ */ we(
  {},
  gi,
  Wi
), _c = (e) => (e.displayName = "Transition", e.props = wc, e), _n = /* @__PURE__ */ _c(
  (e, { slots: t }) => gc(xl, kc(e), t)
), Rt = (e, t = []) => {
  q(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Zr = (e) => e ? q(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function kc(e) {
  const t = {};
  for (const U in e)
    U in Wi || (t[U] = e[U]);
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
    leaveActiveClass: b = `${n}-leave-active`,
    leaveToClass: x = `${n}-leave-to`
  } = e, g = Cc(r), y = g && g[0], m = g && g[1], {
    onBeforeEnter: _,
    onEnter: k,
    onEnterCancelled: R,
    onLeave: D,
    onLeaveCancelled: H,
    onBeforeAppear: M = _,
    onAppear: I = k,
    onAppearCancelled: re = R
  } = t, B = (U, se, he, Pe) => {
    U._enterCancelled = Pe, $t(U, se ? d : a), $t(U, se ? f : i), he && he();
  }, X = (U, se) => {
    U._isLeaving = !1, $t(U, u), $t(U, x), $t(U, b), se && se();
  }, oe = (U) => (se, he) => {
    const Pe = U ? I : k, ee = () => B(se, U, he);
    Rt(Pe, [se, ee]), Qr(() => {
      $t(se, U ? c : o), dt(se, U ? d : a), Zr(Pe) || eo(se, s, y, ee);
    });
  };
  return we(t, {
    onBeforeEnter(U) {
      Rt(_, [U]), dt(U, o), dt(U, i);
    },
    onBeforeAppear(U) {
      Rt(M, [U]), dt(U, c), dt(U, f);
    },
    onEnter: oe(!1),
    onAppear: oe(!0),
    onLeave(U, se) {
      U._isLeaving = !0;
      const he = () => X(U, se);
      dt(U, u), U._enterCancelled ? (dt(U, b), so(U)) : (so(U), dt(U, b)), Qr(() => {
        U._isLeaving && ($t(U, u), dt(U, x), Zr(D) || eo(U, s, m, he));
      }), Rt(D, [U, he]);
    },
    onEnterCancelled(U) {
      B(U, !1, void 0, !0), Rt(R, [U]);
    },
    onAppearCancelled(U) {
      B(U, !0, void 0, !0), Rt(re, [U]);
    },
    onLeaveCancelled(U) {
      X(U), Rt(H, [U]);
    }
  });
}
function Cc(e) {
  if (e == null)
    return null;
  if (de(e))
    return [Ms(e.enter), Ms(e.leave)];
  {
    const t = Ms(e);
    return [t, t];
  }
}
function Ms(e) {
  return Us(e);
}
function dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[wn] || (e[wn] = /* @__PURE__ */ new Set())).add(t);
}
function $t(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[wn];
  n && (n.delete(t), n.size || (e[wn] = void 0));
}
function Qr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Sc = 0;
function eo(e, t, n, s) {
  const r = e._endId = ++Sc, o = () => {
    r === e._endId && s();
  };
  if (n != null)
    return setTimeout(o, n);
  const { type: i, timeout: a, propCount: c } = Ec(e, t);
  if (!i)
    return s();
  const f = i + "end";
  let d = 0;
  const u = () => {
    e.removeEventListener(f, b), o();
  }, b = (x) => {
    x.target === e && ++d >= c && u();
  };
  setTimeout(() => {
    d < c && u();
  }, a + 1), e.addEventListener(f, b);
}
function Ec(e, t) {
  const n = window.getComputedStyle(e), s = (g) => (n[g] || "").split(", "), r = s(`${wt}Delay`), o = s(`${wt}Duration`), i = to(r, o), a = s(`${sn}Delay`), c = s(`${sn}Duration`), f = to(a, c);
  let d = null, u = 0, b = 0;
  t === wt ? i > 0 && (d = wt, u = i, b = o.length) : t === sn ? f > 0 && (d = sn, u = f, b = c.length) : (u = Math.max(i, f), d = u > 0 ? i > f ? wt : sn : null, b = d ? d === wt ? o.length : c.length : 0);
  const x = d === wt && /\b(?:transform|all)(?:,|$)/.test(
    s(`${wt}Property`).toString()
  );
  return {
    type: d,
    timeout: u,
    propCount: b,
    hasTransform: x
  };
}
function to(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => no(n) + no(e[s])));
}
function no(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function so(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Tc(e, t, n) {
  const s = e[wn];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ro = /* @__PURE__ */ Symbol("_vod"), Ac = /* @__PURE__ */ Symbol("_vsh"), Rc = /* @__PURE__ */ Symbol(""), $c = /(?:^|;)\s*display\s*:/;
function Oc(e, t, n) {
  const s = e.style, r = ke(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (ke(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && qn(s, a, "");
        }
      else
        for (const i in t)
          n[i] == null && qn(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), qn(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[Rc];
      i && (n += ";" + i), s.cssText = n, o = $c.test(n);
    }
  } else t && e.removeAttribute("style");
  ro in e && (e[ro] = o ? s.display : "", e[Ac] && (s.display = "none"));
}
const oo = /\s*!important$/;
function qn(e, t, n) {
  if (q(n))
    n.forEach((s) => qn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Pc(e, t);
    oo.test(n) ? e.setProperty(
      Be(s),
      n.replace(oo, ""),
      "important"
    ) : e[s] = n;
  }
}
const io = ["Webkit", "Moz", "ms"], Ds = {};
function Pc(e, t) {
  const n = Ds[t];
  if (n)
    return n;
  let s = Je(t);
  if (s !== "filter" && s in e)
    return Ds[t] = s;
  s = Bo(s);
  for (let r = 0; r < io.length; r++) {
    const o = io[r] + s;
    if (o in e)
      return Ds[t] = o;
  }
  return t;
}
const ao = "http://www.w3.org/1999/xlink";
function lo(e, t, n, s, r, o = Oa(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ao, t.slice(6, t.length)) : e.setAttributeNS(ao, t, n) : n == null || o && !zo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : lt(n) ? String(n) : n
  );
}
function co(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Ki(n) : n);
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
    a === "boolean" ? n = zo(n) : n == null && a === "string" ? (n = "", i = !0) : a === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function jt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function jc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const fo = /* @__PURE__ */ Symbol("_vei");
function Mc(e, t, n, s, r = null) {
  const o = e[fo] || (e[fo] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [a, c] = Dc(t);
    if (s) {
      const f = o[t] = Fc(
        s,
        r
      );
      jt(e, a, f, c);
    } else i && (jc(e, a, i, c), o[t] = void 0);
  }
}
const uo = /(?:Once|Passive|Capture)$/;
function Dc(e) {
  let t;
  if (uo.test(e)) {
    t = {};
    let s;
    for (; s = e.match(uo); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Be(e.slice(2)), t];
}
let Ns = 0;
const Nc = /* @__PURE__ */ Promise.resolve(), Ic = () => Ns || (Nc.then(() => Ns = 0), Ns = Date.now());
function Fc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Xe(
      Lc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Ic(), n;
}
function Lc(e, t) {
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
const po = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Bc = (e, t, n, s, r, o) => {
  const i = r === "svg";
  t === "class" ? Tc(e, s, i) : t === "style" ? Oc(e, n, s) : as(t) ? ir(t) || Mc(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Uc(e, t, s, i)) ? (co(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && lo(e, t, s, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ke(s)) ? co(e, Je(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), lo(e, t, s, i));
};
function Uc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && po(t) && Y(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return po(t) && ke(n) ? !1 : t in e;
}
const ho = {};
// @__NO_SIDE_EFFECTS__
function xt(e, t, n) {
  let s = /* @__PURE__ */ yl(e, t);
  cs(s) && (s = we({}, s, t));
  class r extends _r {
    constructor(i) {
      super(s, i, n);
    }
  }
  return r.def = s, r;
}
const zc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class _r extends zc {
  constructor(t, n = {}, s = xo) {
    super(), this._def = t, this._props = n, this._createApp = s, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && s !== xo ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      we({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof _r) {
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
    this._connected = !1, gn(() => {
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
          (f === Number || f && f.type === Number) && (c in this._props && (this._props[c] = Us(this._props[c])), (a || (a = /* @__PURE__ */ Object.create(null)))[Je(c)] = !0);
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
        ae(this, s) || Object.defineProperty(this, s, {
          // unwrap ref to be consistent with public instance behavior
          get: () => ii(n[s])
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
    let s = n ? this.getAttribute(t) : ho;
    const r = Je(t);
    n && this._numberProps && this._numberProps[r] && (s = Us(s)), this._setProp(r, s, !1, !0);
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
    if (n !== this._props[t] && (this._dirty = !0, n === ho ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), r && this._instance && this._update(), s)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), n === !0 ? this.setAttribute(Be(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Be(t), n + "") : n || this.removeAttribute(Be(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Jc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = _e(this._def, we(t, this._props));
    return this._instance || (n.ce = (s) => {
      this._instance = s, s.ce = this, s.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            cs(i[0]) ? we({ detail: i }, i[0]) : { detail: i }
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
const rs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => Bn(t, n) : t;
};
function Hc(e) {
  e.target.composing = !0;
}
function mo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Kt = /* @__PURE__ */ Symbol("_assign");
function go(e, t, n) {
  return t && (e = e.trim()), n && (e = fs(e)), e;
}
const Gt = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[Kt] = rs(r);
    const o = s || r.props && r.props.type === "number";
    jt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[Kt](go(e.value, n, o));
    }), (n || o) && jt(e, "change", () => {
      e.value = go(e.value, n, o);
    }), t || (jt(e, "compositionstart", Hc), jt(e, "compositionend", mo), jt(e, "change", mo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: o } }, i) {
    if (e[Kt] = rs(i), e.composing) return;
    const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? fs(e.value) : e.value, c = t ?? "";
    a !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, Fn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const r = ls(t);
    jt(e, "change", () => {
      const o = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? fs(os(i)) : os(i)
      );
      e[Kt](
        e.multiple ? r ? new Set(o) : o : o[0]
      ), e._assigning = !0, gn(() => {
        e._assigning = !1;
      });
    }), e[Kt] = rs(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    bo(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Kt] = rs(n);
  },
  updated(e, { value: t }) {
    e._assigning || bo(e, t);
  }
};
function bo(e, t) {
  const n = e.multiple, s = q(t);
  if (!(n && !s && !ls(t))) {
    for (let r = 0, o = e.options.length; r < o; r++) {
      const i = e.options[r], a = os(i);
      if (n)
        if (s) {
          const c = typeof a;
          c === "string" || c === "number" ? i.selected = t.some((f) => String(f) === String(a)) : i.selected = ja(t, a) > -1;
        } else
          i.selected = t.has(a);
      else if (Cn(os(i), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function os(e) {
  return "_value" in e ? e._value : e.value;
}
const Vc = ["ctrl", "shift", "alt", "meta"], qc = {
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
  exact: (e, t) => Vc.some((n) => e[`${n}Key`] && !t.includes(n))
}, er = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = qc[t[i]];
      if (a && a(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Kc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ji = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const o = Be(r.key);
    if (t.some(
      (i) => i === o || Kc[i] === o
    ))
      return e(r);
  }));
}, Wc = /* @__PURE__ */ we({ patchProp: Bc }, yc);
let vo;
function Gi() {
  return vo || (vo = Ql(Wc));
}
const Jc = ((...e) => {
  Gi().render(...e);
}), xo = ((...e) => {
  const t = Gi().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Yc(s);
    if (!r) return;
    const o = t._component;
    !Y(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, Gc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Gc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Yc(e) {
  return ke(e) ? document.querySelector(e) : e;
}
function Yi(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Xc } = Object.prototype, { getPrototypeOf: kr } = Object, { iterator: ys, toStringTag: Xi } = Symbol, ws = /* @__PURE__ */ ((e) => (t) => {
  const n = Xc.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ze = (e) => (e = e.toLowerCase(), (t) => ws(t) === e), _s = (e) => (t) => typeof t === e, { isArray: Xt } = Array, Yt = _s("undefined");
function An(e) {
  return e !== null && !Yt(e) && e.constructor !== null && !Yt(e.constructor) && Ie(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Zi = Ze("ArrayBuffer");
function Zc(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Zi(e.buffer), t;
}
const Qc = _s("string"), Ie = _s("function"), Qi = _s("number"), Rn = (e) => e !== null && typeof e == "object", ed = (e) => e === !0 || e === !1, Kn = (e) => {
  if (ws(e) !== "object")
    return !1;
  const t = kr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Xi in e) && !(ys in e);
}, td = (e) => {
  if (!Rn(e) || An(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, nd = Ze("Date"), sd = Ze("File"), rd = (e) => !!(e && typeof e.uri < "u"), od = (e) => e && typeof e.getParts < "u", id = Ze("Blob"), ad = Ze("FileList"), ld = (e) => Rn(e) && Ie(e.pipe);
function cd() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const yo = cd(), wo = typeof yo.FormData < "u" ? yo.FormData : void 0, dd = (e) => {
  let t;
  return e && (wo && e instanceof wo || Ie(e.append) && ((t = ws(e)) === "formdata" || // detect form-data instance
  t === "object" && Ie(e.toString) && e.toString() === "[object FormData]"));
}, fd = Ze("URLSearchParams"), [ud, pd, hd, md] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Ze), gd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function $n(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), Xt(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (An(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (s = 0; s < i; s++)
      a = o[s], t.call(null, e[a], a, e);
  }
}
function ea(e, t) {
  if (An(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const Mt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ta = (e) => !Yt(e) && e !== Mt;
function tr() {
  const { caseless: e, skipUndefined: t } = ta(this) && this || {}, n = {}, s = (r, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && ea(n, o) || o;
    Kn(n[i]) && Kn(r) ? n[i] = tr(n[i], r) : Kn(r) ? n[i] = tr({}, r) : Xt(r) ? n[i] = r.slice() : (!t || !Yt(r)) && (n[i] = r);
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && $n(arguments[r], s);
  return n;
}
const bd = (e, t, n, { allOwnKeys: s } = {}) => ($n(
  t,
  (r, o) => {
    n && Ie(r) ? Object.defineProperty(e, o, {
      value: Yi(r, n),
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
), e), vd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), xd = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, yd = (e, t, n, s) => {
  let r, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
      i = r[o], (!s || s(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && kr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, wd = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, _d = (e) => {
  if (!e) return null;
  if (Xt(e)) return e;
  let t = e.length;
  if (!Qi(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, kd = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && kr(Uint8Array)), Cd = (e, t) => {
  const s = (e && e[ys]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const o = r.value;
    t.call(e, o[0], o[1]);
  }
}, Sd = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, Ed = Ze("HTMLFormElement"), Td = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, s, r) {
  return s.toUpperCase() + r;
}), _o = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Ad = Ze("RegExp"), na = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  $n(n, (r, o) => {
    let i;
    (i = t(r, o, e)) !== !1 && (s[o] = i || r);
  }), Object.defineProperties(e, s);
}, Rd = (e) => {
  na(e, (t, n) => {
    if (Ie(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (Ie(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, $d = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((o) => {
      n[o] = !0;
    });
  };
  return Xt(e) ? s(e) : s(String(e).split(t)), n;
}, Od = () => {
}, Pd = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function jd(e) {
  return !!(e && Ie(e.append) && e[Xi] === "FormData" && e[ys]);
}
const Md = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (Rn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (An(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const o = Xt(s) ? [] : {};
        return $n(s, (i, a) => {
          const c = n(i, r + 1);
          !Yt(c) && (o[a] = c);
        }), t[r] = void 0, o;
      }
    }
    return s;
  };
  return n(e, 0);
}, Dd = Ze("AsyncFunction"), Nd = (e) => e && (Rn(e) || Ie(e)) && Ie(e.then) && Ie(e.catch), sa = ((e, t) => e ? setImmediate : t ? ((n, s) => (Mt.addEventListener(
  "message",
  ({ source: r, data: o }) => {
    r === Mt && o === n && s.length && s.shift()();
  },
  !1
), (r) => {
  s.push(r), Mt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Ie(Mt.postMessage)), Id = typeof queueMicrotask < "u" ? queueMicrotask.bind(Mt) : typeof process < "u" && process.nextTick || sa, Fd = (e) => e != null && Ie(e[ys]), v = {
  isArray: Xt,
  isArrayBuffer: Zi,
  isBuffer: An,
  isFormData: dd,
  isArrayBufferView: Zc,
  isString: Qc,
  isNumber: Qi,
  isBoolean: ed,
  isObject: Rn,
  isPlainObject: Kn,
  isEmptyObject: td,
  isReadableStream: ud,
  isRequest: pd,
  isResponse: hd,
  isHeaders: md,
  isUndefined: Yt,
  isDate: nd,
  isFile: sd,
  isReactNativeBlob: rd,
  isReactNative: od,
  isBlob: id,
  isRegExp: Ad,
  isFunction: Ie,
  isStream: ld,
  isURLSearchParams: fd,
  isTypedArray: kd,
  isFileList: ad,
  forEach: $n,
  merge: tr,
  extend: bd,
  trim: gd,
  stripBOM: vd,
  inherits: xd,
  toFlatObject: yd,
  kindOf: ws,
  kindOfTest: Ze,
  endsWith: wd,
  toArray: _d,
  forEachEntry: Cd,
  matchAll: Sd,
  isHTMLForm: Ed,
  hasOwnProperty: _o,
  hasOwnProp: _o,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: na,
  freezeMethods: Rd,
  toObjectSet: $d,
  toCamelCase: Td,
  noop: Od,
  toFiniteNumber: Pd,
  findKey: ea,
  global: Mt,
  isContextDefined: ta,
  isSpecCompliantForm: jd,
  toJSONObject: Md,
  isAsyncFn: Dd,
  isThenable: Nd,
  setImmediate: sa,
  asap: Id,
  isIterable: Fd
};
let W = class ra extends Error {
  static from(t, n, s, r, o, i) {
    const a = new ra(t.message, n || t.code, s, r, o);
    return a.cause = t, a.name = t.name, t.status != null && a.status == null && (a.status = t.status), i && Object.assign(a, i), a;
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
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), s && (this.config = s), r && (this.request = r), o && (this.response = o, this.status = o.status);
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
const Ld = null;
function nr(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function oa(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Is(e, t, n) {
  return e ? e.concat(t).map(function(r, o) {
    return r = oa(r), !n && o ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Bd(e) {
  return v.isArray(e) && !e.some(nr);
}
const Ud = v.toFlatObject(v, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ks(e, t, n) {
  if (!v.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = v.toFlatObject(
    n,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(y, m) {
      return !v.isUndefined(m[y]);
    }
  );
  const s = n.metaTokens, r = n.visitor || d, o = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && v.isSpecCompliantForm(t);
  if (!v.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (v.isDate(g))
      return g.toISOString();
    if (v.isBoolean(g))
      return g.toString();
    if (!c && v.isBlob(g))
      throw new W("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(g) || v.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function d(g, y, m) {
    let _ = g;
    if (v.isReactNative(t) && v.isReactNativeBlob(g))
      return t.append(Is(m, y, o), f(g)), !1;
    if (g && !m && typeof g == "object") {
      if (v.endsWith(y, "{}"))
        y = s ? y : y.slice(0, -2), g = JSON.stringify(g);
      else if (v.isArray(g) && Bd(g) || (v.isFileList(g) || v.endsWith(y, "[]")) && (_ = v.toArray(g)))
        return y = oa(y), _.forEach(function(R, D) {
          !(v.isUndefined(R) || R === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Is([y], D, o) : i === null ? y : y + "[]",
            f(R)
          );
        }), !1;
    }
    return nr(g) ? !0 : (t.append(Is(m, y, o), f(g)), !1);
  }
  const u = [], b = Object.assign(Ud, {
    defaultVisitor: d,
    convertValue: f,
    isVisitable: nr
  });
  function x(g, y) {
    if (!v.isUndefined(g)) {
      if (u.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      u.push(g), v.forEach(g, function(_, k) {
        (!(v.isUndefined(_) || _ === null) && r.call(t, _, v.isString(k) ? k.trim() : k, y, b)) === !0 && x(_, y ? y.concat(k) : [k]);
      }), u.pop();
    }
  }
  if (!v.isObject(e))
    throw new TypeError("data must be an object");
  return x(e), t;
}
function ko(e) {
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
function Cr(e, t) {
  this._pairs = [], e && ks(e, this, t);
}
const ia = Cr.prototype;
ia.append = function(t, n) {
  this._pairs.push([t, n]);
};
ia.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, ko);
  } : ko;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function zd(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function aa(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || zd, r = v.isFunction(n) ? {
    serialize: n
  } : n, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = v.isURLSearchParams(t) ? t.toString() : new Cr(t, r).toString(s), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Co {
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
    v.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const Sr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Hd = typeof URLSearchParams < "u" ? URLSearchParams : Cr, Vd = typeof FormData < "u" ? FormData : null, qd = typeof Blob < "u" ? Blob : null, Kd = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Hd,
    FormData: Vd,
    Blob: qd
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Er = typeof window < "u" && typeof document < "u", sr = typeof navigator == "object" && navigator || void 0, Wd = Er && (!sr || ["ReactNative", "NativeScript", "NS"].indexOf(sr.product) < 0), Jd = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Gd = Er && window.location.href || "http://localhost", Yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Er,
  hasStandardBrowserEnv: Wd,
  hasStandardBrowserWebWorkerEnv: Jd,
  navigator: sr,
  origin: Gd
}, Symbol.toStringTag, { value: "Module" })), Se = {
  ...Yd,
  ...Kd
};
function Xd(e, t) {
  return ks(e, new Se.classes.URLSearchParams(), {
    visitor: function(n, s, r, o) {
      return Se.isNode && v.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Zd(e) {
  return v.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Qd(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let o;
  for (s = 0; s < r; s++)
    o = n[s], t[o] = e[o];
  return t;
}
function la(e) {
  function t(n, s, r, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = o >= n.length;
    return i = !i && v.isArray(r) ? r.length : i, c ? (v.hasOwnProp(r, i) ? r[i] = [r[i], s] : r[i] = s, !a) : ((!r[i] || !v.isObject(r[i])) && (r[i] = []), t(n, s, r[i], o) && v.isArray(r[i]) && (r[i] = Qd(r[i])), !a);
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const n = {};
    return v.forEachEntry(e, (s, r) => {
      t(Zd(s), r, n, 0);
    }), n;
  }
  return null;
}
function ef(e, t, n) {
  if (v.isString(e))
    try {
      return (t || JSON.parse)(e), v.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const On = {
  transitional: Sr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, n) {
      const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, o = v.isObject(t);
      if (o && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t))
        return r ? JSON.stringify(la(t)) : t;
      if (v.isArrayBuffer(t) || v.isBuffer(t) || v.isStream(t) || v.isFile(t) || v.isBlob(t) || v.isReadableStream(t))
        return t;
      if (v.isArrayBufferView(t))
        return t.buffer;
      if (v.isURLSearchParams(t))
        return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let a;
      if (o) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return Xd(t, this.formSerializer).toString();
        if ((a = v.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return ks(
            a ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer
          );
        }
      }
      return o || r ? (n.setContentType("application/json", !1), ef(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const n = this.transitional || On.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
      if (v.isResponse(t) || v.isReadableStream(t))
        return t;
      if (t && v.isString(t) && (s && !this.responseType || r)) {
        const i = !(n && n.silentJSONParsing) && r;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError" ? W.from(a, W.ERR_BAD_RESPONSE, this, null, this.response) : a;
        }
      }
      return t;
    }
  ],
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
v.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  On.headers[e] = {};
});
const tf = v.toObjectSet([
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
]), nf = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), s = i.substring(r + 1).trim(), !(!n || t[n] && tf[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, So = /* @__PURE__ */ Symbol("internals");
function rn(e) {
  return e && String(e).trim().toLowerCase();
}
function Wn(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(Wn) : String(e);
}
function sf(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const rf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Fs(e, t, n, s, r) {
  if (v.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!v.isString(t)) {
    if (v.isString(s))
      return t.indexOf(s) !== -1;
    if (v.isRegExp(s))
      return s.test(t);
  }
}
function of(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function af(e, t) {
  const n = v.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, o, i) {
        return this[s].call(this, t, r, o, i);
      },
      configurable: !0
    });
  });
}
let Fe = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function o(a, c, f) {
      const d = rn(c);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const u = v.findKey(r, d);
      (!u || r[u] === void 0 || f === !0 || f === void 0 && r[u] !== !1) && (r[u || c] = Wn(a));
    }
    const i = (a, c) => v.forEach(a, (f, d) => o(f, d, c));
    if (v.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (v.isString(t) && (t = t.trim()) && !rf(t))
      i(nf(t), n);
    else if (v.isObject(t) && v.isIterable(t)) {
      let a = {}, c, f;
      for (const d of t) {
        if (!v.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        a[f = d[0]] = (c = a[f]) ? v.isArray(c) ? [...c, d[1]] : [c, d[1]] : d[1];
      }
      i(a, n);
    } else
      t != null && o(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = rn(t), t) {
      const s = v.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return sf(r);
        if (v.isFunction(n))
          return n.call(this, r, s);
        if (v.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = rn(t), t) {
      const s = v.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || Fs(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function o(i) {
      if (i = rn(i), i) {
        const a = v.findKey(s, i);
        a && (!n || Fs(s, s[a], a, n)) && (delete s[a], r = !0);
      }
    }
    return v.isArray(t) ? t.forEach(o) : o(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const o = n[s];
      (!t || Fs(this, this[o], o, t, !0)) && (delete this[o], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return v.forEach(this, (r, o) => {
      const i = v.findKey(s, o);
      if (i) {
        n[i] = Wn(r), delete n[o];
        return;
      }
      const a = t ? of(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Wn(r), s[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return v.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && v.isArray(s) ? s.join(", ") : s);
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
    const s = (this[So] = this[So] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function o(i) {
      const a = rn(i);
      s[a] || (af(r, i), s[a] = !0);
    }
    return v.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Fe.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
v.reduceDescriptors(Fe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
v.freezeMethods(Fe);
function Ls(e, t) {
  const n = this || On, s = t || n, r = Fe.from(s.headers);
  let o = s.data;
  return v.forEach(e, function(a) {
    o = a.call(n, o, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), o;
}
function ca(e) {
  return !!(e && e.__CANCEL__);
}
let Pn = class extends W {
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
function da(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(
    new W(
      "Request failed with status code " + n.status,
      [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
      n.config,
      n.request,
      n
    )
  );
}
function lf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function cf(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), d = s[o];
    i || (i = f), n[r] = c, s[r] = f;
    let u = o, b = 0;
    for (; u !== r; )
      b += n[u++], u = u % e;
    if (r = (r + 1) % e, r === o && (o = (o + 1) % e), f - i < t)
      return;
    const x = d && f - d;
    return x ? Math.round(b * 1e3 / x) : void 0;
  };
}
function df(e, t) {
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
const is = (e, t, n = 3) => {
  let s = 0;
  const r = cf(50, 250);
  return df((o) => {
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
}, Eo = (e, t) => {
  const n = e != null;
  return [
    (s) => t[0]({
      lengthComputable: n,
      total: e,
      loaded: s
    }),
    t[1]
  ];
}, To = (e) => (...t) => v.asap(() => e(...t)), ff = Se.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Se.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Se.origin),
  Se.navigator && /(msie|trident)/i.test(Se.navigator.userAgent)
) : () => !0, uf = Se.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      v.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`), v.isString(s) && a.push(`path=${s}`), v.isString(r) && a.push(`domain=${r}`), o === !0 && a.push("secure"), v.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
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
function pf(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function hf(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function fa(e, t, n) {
  let s = !pf(t);
  return e && (s || n == !1) ? hf(e, t) : t;
}
const Ao = (e) => e instanceof Fe ? { ...e } : e;
function Ft(e, t) {
  t = t || {};
  const n = {};
  function s(f, d, u, b) {
    return v.isPlainObject(f) && v.isPlainObject(d) ? v.merge.call({ caseless: b }, f, d) : v.isPlainObject(d) ? v.merge({}, d) : v.isArray(d) ? d.slice() : d;
  }
  function r(f, d, u, b) {
    if (v.isUndefined(d)) {
      if (!v.isUndefined(f))
        return s(void 0, f, u, b);
    } else return s(f, d, u, b);
  }
  function o(f, d) {
    if (!v.isUndefined(d))
      return s(void 0, d);
  }
  function i(f, d) {
    if (v.isUndefined(d)) {
      if (!v.isUndefined(f))
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
    headers: (f, d, u) => r(Ao(f), Ao(d), u, !0)
  };
  return v.forEach(Object.keys({ ...e, ...t }), function(d) {
    if (d === "__proto__" || d === "constructor" || d === "prototype") return;
    const u = v.hasOwnProp(c, d) ? c[d] : r, b = u(e[d], t[d], d);
    v.isUndefined(b) && u !== a || (n[d] = b);
  }), n;
}
const ua = (e) => {
  const t = Ft({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = Fe.from(i), t.url = aa(
    fa(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), a && i.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), v.isFormData(n)) {
    if (Se.hasStandardBrowserEnv || Se.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (v.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([d, u]) => {
        f.includes(d.toLowerCase()) && i.set(d, u);
      });
    }
  }
  if (Se.hasStandardBrowserEnv && (s && v.isFunction(s) && (s = s(t)), s || s !== !1 && ff(t.url))) {
    const c = r && o && uf.read(o);
    c && i.set(r, c);
  }
  return t;
}, mf = typeof XMLHttpRequest < "u", gf = mf && function(e) {
  return new Promise(function(n, s) {
    const r = ua(e);
    let o = r.data;
    const i = Fe.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: c, onDownloadProgress: f } = r, d, u, b, x, g;
    function y() {
      x && x(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(d), r.signal && r.signal.removeEventListener("abort", d);
    }
    let m = new XMLHttpRequest();
    m.open(r.method.toUpperCase(), r.url, !0), m.timeout = r.timeout;
    function _() {
      if (!m)
        return;
      const R = Fe.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), H = {
        data: !a || a === "text" || a === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: R,
        config: e,
        request: m
      };
      da(
        function(I) {
          n(I), y();
        },
        function(I) {
          s(I), y();
        },
        H
      ), m = null;
    }
    "onloadend" in m ? m.onloadend = _ : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(_);
    }, m.onabort = function() {
      m && (s(new W("Request aborted", W.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function(D) {
      const H = D && D.message ? D.message : "Network Error", M = new W(H, W.ERR_NETWORK, e, m);
      M.event = D || null, s(M), m = null;
    }, m.ontimeout = function() {
      let D = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const H = r.transitional || Sr;
      r.timeoutErrorMessage && (D = r.timeoutErrorMessage), s(
        new W(
          D,
          H.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
          e,
          m
        )
      ), m = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in m && v.forEach(i.toJSON(), function(D, H) {
      m.setRequestHeader(H, D);
    }), v.isUndefined(r.withCredentials) || (m.withCredentials = !!r.withCredentials), a && a !== "json" && (m.responseType = r.responseType), f && ([b, g] = is(f, !0), m.addEventListener("progress", b)), c && m.upload && ([u, x] = is(c), m.upload.addEventListener("progress", u), m.upload.addEventListener("loadend", x)), (r.cancelToken || r.signal) && (d = (R) => {
      m && (s(!R || R.type ? new Pn(null, e, m) : R), m.abort(), m = null);
    }, r.cancelToken && r.cancelToken.subscribe(d), r.signal && (r.signal.aborted ? d() : r.signal.addEventListener("abort", d)));
    const k = lf(r.url);
    if (k && Se.protocols.indexOf(k) === -1) {
      s(
        new W(
          "Unsupported protocol " + k + ":",
          W.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    m.send(o || null);
  });
}, bf = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const o = function(f) {
      if (!r) {
        r = !0, a();
        const d = f instanceof Error ? f : this.reason;
        s.abort(
          d instanceof W ? d : new Pn(d instanceof Error ? d.message : d)
        );
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
    return c.unsubscribe = () => v.asap(a), c;
  }
}, vf = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, xf = async function* (e, t) {
  for await (const n of yf(e))
    yield* vf(n, t);
}, yf = async function* (e) {
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
}, Ro = (e, t, n, s) => {
  const r = xf(e, t);
  let o = 0, i, a = (c) => {
    i || (i = !0, s && s(c));
  };
  return new ReadableStream(
    {
      async pull(c) {
        try {
          const { done: f, value: d } = await r.next();
          if (f) {
            a(), c.close();
            return;
          }
          let u = d.byteLength;
          if (n) {
            let b = o += u;
            n(b);
          }
          c.enqueue(new Uint8Array(d));
        } catch (f) {
          throw a(f), f;
        }
      },
      cancel(c) {
        return a(c), r.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, $o = 64 * 1024, { isFunction: Ln } = v, wf = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(v.global), { ReadableStream: Oo, TextEncoder: Po } = v.global, jo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, _f = (e) => {
  e = v.merge.call(
    {
      skipUndefined: !0
    },
    wf,
    e
  );
  const { fetch: t, Request: n, Response: s } = e, r = t ? Ln(t) : typeof fetch == "function", o = Ln(n), i = Ln(s);
  if (!r)
    return !1;
  const a = r && Ln(Oo), c = r && (typeof Po == "function" ? /* @__PURE__ */ ((g) => (y) => g.encode(y))(new Po()) : async (g) => new Uint8Array(await new n(g).arrayBuffer())), f = o && a && jo(() => {
    let g = !1;
    const y = new n(Se.origin, {
      body: new Oo(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !y;
  }), d = i && a && jo(() => v.isReadableStream(new s("").body)), u = {
    stream: d && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !u[g] && (u[g] = (y, m) => {
      let _ = y && y[g];
      if (_)
        return _.call(y);
      throw new W(
        `Response type '${g}' is not supported`,
        W.ERR_NOT_SUPPORT,
        m
      );
    });
  });
  const b = async (g) => {
    if (g == null)
      return 0;
    if (v.isBlob(g))
      return g.size;
    if (v.isSpecCompliantForm(g))
      return (await new n(Se.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (v.isArrayBufferView(g) || v.isArrayBuffer(g))
      return g.byteLength;
    if (v.isURLSearchParams(g) && (g = g + ""), v.isString(g))
      return (await c(g)).byteLength;
  }, x = async (g, y) => {
    const m = v.toFiniteNumber(g.getContentLength());
    return m ?? b(y);
  };
  return async (g) => {
    let {
      url: y,
      method: m,
      data: _,
      signal: k,
      cancelToken: R,
      timeout: D,
      onDownloadProgress: H,
      onUploadProgress: M,
      responseType: I,
      headers: re,
      withCredentials: B = "same-origin",
      fetchOptions: X
    } = ua(g), oe = t || fetch;
    I = I ? (I + "").toLowerCase() : "text";
    let U = bf(
      [k, R && R.toAbortSignal()],
      D
    ), se = null;
    const he = U && U.unsubscribe && (() => {
      U.unsubscribe();
    });
    let Pe;
    try {
      if (M && f && m !== "get" && m !== "head" && (Pe = await x(re, _)) !== 0) {
        let Z = new n(y, {
          method: "POST",
          body: _,
          duplex: "half"
        }), ve;
        if (v.isFormData(_) && (ve = Z.headers.get("content-type")) && re.setContentType(ve), Z.body) {
          const [Et, Lt] = Eo(
            Pe,
            is(To(M))
          );
          _ = Ro(Z.body, $o, Et, Lt);
        }
      }
      v.isString(B) || (B = B ? "include" : "omit");
      const ee = o && "credentials" in n.prototype, ue = {
        ...X,
        signal: U,
        method: m.toUpperCase(),
        headers: re.normalize().toJSON(),
        body: _,
        duplex: "half",
        credentials: ee ? B : void 0
      };
      se = o && new n(y, ue);
      let z = await (o ? oe(se, X) : oe(y, ue));
      const j = d && (I === "stream" || I === "response");
      if (d && (H || j && he)) {
        const Z = {};
        ["status", "statusText", "headers"].forEach((jn) => {
          Z[jn] = z[jn];
        });
        const ve = v.toFiniteNumber(z.headers.get("content-length")), [Et, Lt] = H && Eo(
          ve,
          is(To(H), !0)
        ) || [];
        z = new s(
          Ro(z.body, $o, Et, () => {
            Lt && Lt(), he && he();
          }),
          Z
        );
      }
      I = I || "text";
      let G = await u[v.findKey(u, I) || "text"](
        z,
        g
      );
      return !j && he && he(), await new Promise((Z, ve) => {
        da(Z, ve, {
          data: G,
          headers: Fe.from(z.headers),
          status: z.status,
          statusText: z.statusText,
          config: g,
          request: se
        });
      });
    } catch (ee) {
      throw he && he(), ee && ee.name === "TypeError" && /Load failed|fetch/i.test(ee.message) ? Object.assign(
        new W(
          "Network Error",
          W.ERR_NETWORK,
          g,
          se,
          ee && ee.response
        ),
        {
          cause: ee.cause || ee
        }
      ) : W.from(ee, ee && ee.code, g, se, ee && ee.response);
    }
  };
}, kf = /* @__PURE__ */ new Map(), pa = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, o = [s, r, n];
  let i = o.length, a = i, c, f, d = kf;
  for (; a--; )
    c = o[a], f = d.get(c), f === void 0 && d.set(c, f = a ? /* @__PURE__ */ new Map() : _f(t)), d = f;
  return f;
};
pa();
const Tr = {
  http: Ld,
  xhr: gf,
  fetch: {
    get: pa
  }
};
v.forEach(Tr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Mo = (e) => `- ${e}`, Cf = (e) => v.isFunction(e) || e === null || e === !1;
function Sf(e, t) {
  e = v.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const o = {};
  for (let i = 0; i < n; i++) {
    s = e[i];
    let a;
    if (r = s, !Cf(s) && (r = Tr[(a = String(s)).toLowerCase()], r === void 0))
      throw new W(`Unknown adapter '${a}'`);
    if (r && (v.isFunction(r) || (r = r.get(t))))
      break;
    o[a || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(o).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = n ? i.length > 1 ? `since :
` + i.map(Mo).join(`
`) : " " + Mo(i[0]) : "as no adapter specified";
    throw new W(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const ha = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Sf,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Tr
};
function Bs(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Pn(null, e);
}
function Do(e) {
  return Bs(e), e.headers = Fe.from(e.headers), e.data = Ls.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ha.getAdapter(e.adapter || On.adapter, e)(e).then(
    function(s) {
      return Bs(e), s.data = Ls.call(e, e.transformResponse, s), s.headers = Fe.from(s.headers), s;
    },
    function(s) {
      return ca(s) || (Bs(e), s && s.response && (s.response.data = Ls.call(
        e,
        e.transformResponse,
        s.response
      ), s.response.headers = Fe.from(s.response.headers))), Promise.reject(s);
    }
  );
}
const ma = "1.13.6", Cs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Cs[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const No = {};
Cs.transitional = function(t, n, s) {
  function r(o, i) {
    return "[Axios v" + ma + "] Transitional option '" + o + "'" + i + (s ? ". " + s : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new W(
        r(i, " has been removed" + (n ? " in " + n : "")),
        W.ERR_DEPRECATED
      );
    return n && !No[i] && (No[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
Cs.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Ef(e, t, n) {
  if (typeof e != "object")
    throw new W("options must be an object", W.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const o = s[r], i = t[o];
    if (i) {
      const a = e[o], c = a === void 0 || i(a, o, e);
      if (c !== !0)
        throw new W(
          "option " + o + " must be " + c,
          W.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (n !== !0)
      throw new W("Unknown option " + o, W.ERR_BAD_OPTION);
  }
}
const Jn = {
  assertOptions: Ef,
  validators: Cs
}, He = Jn.validators;
let It = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Co(),
      response: new Co()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ft(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: o } = n;
    s !== void 0 && Jn.assertOptions(
      s,
      {
        silentJSONParsing: He.transitional(He.boolean),
        forcedJSONParsing: He.transitional(He.boolean),
        clarifyTimeoutError: He.transitional(He.boolean),
        legacyInterceptorReqResOrdering: He.transitional(He.boolean)
      },
      !1
    ), r != null && (v.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : Jn.assertOptions(
      r,
      {
        encode: He.function,
        serialize: He.function
      },
      !0
    )), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Jn.assertOptions(
      n,
      {
        baseUrl: He.spelling("baseURL"),
        withXsrfToken: He.spelling("withXSRFToken")
      },
      !0
    ), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && v.merge(o.common, o[n.method]);
    o && v.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (g) => {
      delete o[g];
    }), n.headers = Fe.concat(i, o);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(y) {
      if (typeof y.runWhen == "function" && y.runWhen(n) === !1)
        return;
      c = c && y.synchronous;
      const m = n.transitional || Sr;
      m && m.legacyInterceptorReqResOrdering ? a.unshift(y.fulfilled, y.rejected) : a.push(y.fulfilled, y.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(y) {
      f.push(y.fulfilled, y.rejected);
    });
    let d, u = 0, b;
    if (!c) {
      const g = [Do.bind(this), void 0];
      for (g.unshift(...a), g.push(...f), b = g.length, d = Promise.resolve(n); u < b; )
        d = d.then(g[u++], g[u++]);
      return d;
    }
    b = a.length;
    let x = n;
    for (; u < b; ) {
      const g = a[u++], y = a[u++];
      try {
        x = g(x);
      } catch (m) {
        y.call(this, m);
        break;
      }
    }
    try {
      d = Do.call(this, x);
    } catch (g) {
      return Promise.reject(g);
    }
    for (u = 0, b = f.length; u < b; )
      d = d.then(f[u++], f[u++]);
    return d;
  }
  getUri(t) {
    t = Ft(this.defaults, t);
    const n = fa(t.baseURL, t.url, t.allowAbsoluteUrls);
    return aa(n, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function(t) {
  It.prototype[t] = function(n, s) {
    return this.request(
      Ft(s || {}, {
        method: t,
        url: n,
        data: (s || {}).data
      })
    );
  };
});
v.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(o, i, a) {
      return this.request(
        Ft(a || {}, {
          method: t,
          headers: s ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: o,
          data: i
        })
      );
    };
  }
  It.prototype[t] = n(), It.prototype[t + "Form"] = n(!0);
});
let Tf = class ga {
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
      s.reason || (s.reason = new Pn(o, i, a), n(s.reason));
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
      token: new ga(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Af(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Rf(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
const rr = {
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
Object.entries(rr).forEach(([e, t]) => {
  rr[t] = e;
});
function ba(e) {
  const t = new It(e), n = Yi(It.prototype.request, t);
  return v.extend(n, It.prototype, t, { allOwnKeys: !0 }), v.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return ba(Ft(e, r));
  }, n;
}
const Q = ba(On);
Q.Axios = It;
Q.CanceledError = Pn;
Q.CancelToken = Tf;
Q.isCancel = ca;
Q.VERSION = ma;
Q.toFormData = ks;
Q.AxiosError = W;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = Af;
Q.isAxiosError = Rf;
Q.mergeConfig = Ft;
Q.AxiosHeaders = Fe;
Q.formToJSON = (e) => la(v.isHTMLForm(e) ? new FormData(e) : e);
Q.getAdapter = ha.getAdapter;
Q.HttpStatusCode = rr;
Q.default = Q;
const {
  Axios: F1,
  AxiosError: L1,
  CanceledError: B1,
  isCancel: U1,
  CancelToken: z1,
  VERSION: H1,
  all: V1,
  Cancel: q1,
  isAxiosError: K1,
  spread: W1,
  toFormData: J1,
  AxiosHeaders: G1,
  HttpStatusCode: Y1,
  formToJSON: X1,
  getAdapter: Z1,
  mergeConfig: Q1
} = Q, $f = ".grid-card[data-v-e3833863]{background:#fff;border-radius:24px;padding:1.5rem;border:1px solid #f1f5f9;display:flex;flex-direction:column;gap:1.25rem;transition:all .3s ease;width:100%;min-height:420px;box-shadow:0 4px 6px -1px #0000000d}.grid-card[data-v-e3833863]:hover{border-color:#3b82f6;transform:translateY(-4px);box-shadow:0 10px 20px -5px #0000001a}.grid-row[data-v-e3833863]{display:flex;align-items:center;gap:1rem}.grid-avatar[data-v-e3833863]{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.4rem;color:#fff;flex-shrink:0}.grid-info[data-v-e3833863]{flex:1;min-width:0}.grid-name[data-v-e3833863]{font-weight:700;font-size:1.1rem;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grid-meta[data-v-e3833863]{font-size:.75rem;color:#64748b}.grid-match[data-v-e3833863]{background:#f0f9ff;padding:.4rem .8rem;border-radius:12px;font-size:.85rem;font-weight:700;color:#0369a1;border:1px solid #e0f2fe}.grid-stats[data-v-e3833863]{display:flex;justify-content:space-between;padding:.75rem 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9}.grid-stat[data-v-e3833863]{display:flex;align-items:center;gap:.4rem;font-size:.85rem;color:#475569}.grid-chips[data-v-e3833863]{display:flex;flex-wrap:wrap;gap:.4rem;min-height:32px}.grid-chip[data-v-e3833863]{background:#f8fafc;padding:.3rem .7rem;border-radius:8px;font-size:.7rem;font-weight:500;color:#475569;border:1px solid #e2e8f0}.grid-chip.course[data-v-e3833863]{background:#eff6ff;color:#2563eb;border-color:#dbeafe}.grid-empty-chip[data-v-e3833863]{font-size:.7rem;color:#94a3b8;padding:.3rem;font-style:italic}.grid-actions[data-v-e3833863]{margin-top:auto;display:flex;flex-direction:column;gap:.75rem}.grid-btn[data-v-e3833863]{width:100%;height:42px;border-radius:12px;border:none;background:#0f172a;color:#fff;font-weight:600;cursor:pointer;transition:background .2s}.grid-btn[data-v-e3833863]:hover{background:#1e293b}.connect-btn[data-v-e3833863]{width:100%;height:42px;border-radius:12px;border:1.5px solid #e2e8f0;background:#fff;color:#0f172a;font-weight:600;cursor:pointer;transition:all .2s}.connect-btn[data-v-e3833863]:hover{border-color:#3b82f6;color:#3b82f6;background:#f0f9ff}.modal-overlay[data-v-e3833863]{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.modal-content[data-v-e3833863]{background:#fff;padding:2rem;border-radius:20px;width:90%;max-width:400px;display:flex;flex-direction:column;gap:1rem}.modal-content select[data-v-e3833863],.modal-content textarea[data-v-e3833863]{padding:.5rem;border:1px solid #ddd;border-radius:8px}.animate-fade-in[data-v-e3833863]{animation:fadeIn-e3833863 .3s ease-in-out}@keyframes fadeIn-e3833863{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media(max-width:640px){.grid-card[data-v-e3833863]{min-height:400px}}", yt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Of = { class: "grid-card" }, Pf = { class: "grid-row" }, jf = { class: "grid-info" }, Mf = { class: "grid-name" }, Df = { class: "grid-meta" }, Nf = { class: "grid-match" }, If = { class: "grid-stats" }, Ff = { class: "grid-stat" }, Lf = { class: "grid-stat" }, Bf = { class: "grid-stat" }, Uf = {
  key: 0,
  class: "grid-chips"
}, zf = {
  key: 0,
  class: "grid-chip more"
}, Hf = {
  key: 1,
  class: "grid-empty-chip"
}, Vf = {
  key: 2,
  class: "grid-chips"
}, qf = {
  key: 0,
  class: "grid-chip more"
}, Kf = {
  key: 3,
  class: "grid-empty-chip"
}, Wf = { class: "grid-actions" }, Jf = { class: "modal-content" }, Gf = { class: "form-group" }, Yf = { class: "form-group" }, Xf = {
  key: 0,
  class: "form-group animate-fade-in"
}, Zf = ["value"], Qf = {
  key: 1,
  class: "form-group animate-fade-in"
}, eu = ["value"], tu = {
  key: 2,
  class: "form-group animate-fade-in"
}, nu = ["value"], su = { class: "form-group" }, ru = { class: "modal-btns" }, ou = {
  __name: "GalleryCard.ce",
  props: {
    profile: [Object, String],
    matchPercent: [Number, String],
    overlapHours: [Number, String],
    overlapCourses: [Array, String],
    allInterests: [Array, String],
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
    const t = e, n = ye(() => {
      if (typeof t.profile == "object") return t.profile;
      try {
        return t.profile ? JSON.parse(t.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), s = ye(() => {
      if (Array.isArray(t.overlapCourses)) return t.overlapCourses;
      try {
        return t.overlapCourses ? JSON.parse(t.overlapCourses) : [];
      } catch {
        return [];
      }
    }), r = ye(() => {
      if (Array.isArray(t.allInterests)) return t.allInterests;
      try {
        return t.allInterests ? JSON.parse(t.allInterests) : [];
      } catch {
        return console.error("Failed to parse interests"), [];
      }
    }), o = ye(() => {
      if (Array.isArray(t.timeSlots)) return t.timeSlots;
      try {
        return t.timeSlots ? JSON.parse(t.timeSlots) : [];
      } catch {
        return [];
      }
    }), i = ye(() => (n.value.username || "??").charAt(0).toUpperCase()), a = ye(() => {
      const _ = ["#4158D0", "#C850C0", "#0093E9", "#80D0C7"], k = (n.value.username?.length || 0) % _.length;
      return { backgroundColor: _[k] };
    }), c = ye(() => o.value.length > 0), f = (_) => {
      if (!_) return "";
      const [k, R] = _.split(":"), D = parseInt(k), H = D >= 12 ? "pm" : "am";
      return `${D % 12 || 12}${R !== "00" ? `:${R}` : ""}${H}`;
    }, d = ye(() => o.value.slice(0, 3).map((_) => ({
      dayShort: _.day?.substring(0, 3) || "Any",
      timeRange: _.start_time ? `${f(_.start_time)}-${f(_.end_time)}` : "Flex"
    }))), u = ye(() => {
      if (o.value.length === 0) return "🔄";
      const _ = o.value[0];
      if (!_.start_time) return "🔄";
      const k = parseInt(_.start_time.split(":")[0]);
      return k < 12 ? "🌅" : k < 17 ? "☀️" : "🌙";
    }), b = () => {
      window.location.href = `/profile/${n.value.id}/`;
    }, x = /* @__PURE__ */ ne(!1), g = /* @__PURE__ */ ne({
      group_name: "",
      group_description: "",
      group_type: "",
      major: "",
      interest: "",
      course: "",
      message: ""
    }), y = () => {
      g.value = {
        group_name: "",
        group_description: "",
        group_type: "",
        course: s.value.length > 0 ? s.value[0] : "",
        major: "",
        interest: "",
        message: ""
      }, x.value = !0;
    }, m = async () => {
      if (!g.value.group_type) {
        alert("Please select a Group Type (Course, Major, or General).");
        return;
      }
      if (!g.value.group_name || !g.value.group_description) {
        alert("Please provide a name and description for the group.");
        return;
      }
      const _ = new FormData();
      _.append("group_name", g.value.group_name), _.append("group_description", g.value.group_description), _.append("group_type", g.value.group_type), _.append("course_name", g.value.course), _.append("invite_message", g.value.message || "Hi! I'd like to study together."), g.value.group_type === "course" && _.append("course_name", g.value.course), g.value.group_type === "major" && _.append("major_name", g.value.major), g.value.group_type === "general" && _.append("interest", g.value.interest);
      try {
        const k = document.cookie.split("; ").find((R) => R.startsWith("csrftoken="))?.split("=")[1];
        await Q.post(`/student/${n.value.id}/create-group/`, _, {
          headers: {
            "X-CSRFToken": k,
            "X-Requested-With": "XMLHttpRequest"
          }
        }), alert("Invite sent! Awaiting Admin approval."), x.value = !1;
      } catch (k) {
        console.error(k), alert("Connection failed. Please check your inputs.");
      }
    };
    return (_, k) => ($(), O("div", Of, [
      l("div", Pf, [
        l("div", {
          class: "grid-avatar",
          style: qe(a.value)
        }, C(i.value), 5),
        l("div", jf, [
          l("div", Mf, C(n.value.username), 1),
          l("div", Df, C(n.value.major) + " • Y" + C(n.value.year), 1)
        ]),
        l("div", Nf, C(e.matchPercent) + "%", 1)
      ]),
      l("div", If, [
        l("div", Ff, [
          k[8] || (k[8] = l("span", null, "📚", -1)),
          l("span", null, C(s.value.length), 1)
        ]),
        l("div", Lf, [
          k[9] || (k[9] = l("span", null, "⏰", -1)),
          l("span", null, C(e.overlapHours) + "h", 1)
        ]),
        l("div", Bf, [
          l("span", null, C(u.value), 1)
        ])
      ]),
      c.value ? ($(), O("div", Uf, [
        ($(!0), O(le, null, Ee(d.value.slice(0, 2), (R) => ($(), O("span", {
          key: R.dayShort,
          class: "grid-chip"
        }, C(R.dayShort) + " " + C(R.timeRange), 1))), 128)),
        e.timeSlots.length > 2 ? ($(), O("span", zf, " +" + C(e.timeSlots.length - 2), 1)) : be("", !0)
      ])) : ($(), O("div", Hf, "No schedule")),
      s.value.length ? ($(), O("div", Vf, [
        ($(!0), O(le, null, Ee(s.value.slice(0, 2), (R) => ($(), O("span", {
          key: R,
          class: "grid-chip course"
        }, C(R), 1))), 128)),
        s.value.length > 2 ? ($(), O("span", qf, " +" + C(s.value.length - 2), 1)) : be("", !0)
      ])) : ($(), O("div", Kf, "No courses match")),
      l("div", Wf, [
        l("button", {
          class: "grid-btn primary",
          onClick: b
        }, " View Profile "),
        l("button", {
          class: "connect-btn",
          onClick: er(y, ["stop"])
        }, " Connect with " + C(n.value.username), 1),
        x.value ? ($(), O("div", {
          key: 0,
          class: "modal-overlay",
          onClick: k[7] || (k[7] = er((R) => x.value = !1, ["self"]))
        }, [
          l("div", Jf, [
            k[20] || (k[20] = l("h3", null, "Setup Study Group", -1)),
            l("div", Gf, [
              k[10] || (k[10] = l("label", null, "Group Name", -1)),
              ot(l("input", {
                "onUpdate:modelValue": k[0] || (k[0] = (R) => g.value.group_name = R),
                placeholder: "Name your group...",
                class: "modal-input"
              }, null, 512), [
                [Gt, g.value.group_name]
              ])
            ]),
            l("div", Yf, [
              k[12] || (k[12] = l("label", null, "Group Category", -1)),
              ot(l("select", {
                "onUpdate:modelValue": k[1] || (k[1] = (R) => g.value.group_type = R),
                class: "modal-input",
                required: ""
              }, [...k[11] || (k[11] = [
                l("option", {
                  value: "",
                  disabled: ""
                }, "-- Choose a category --", -1),
                l("option", { value: "course" }, "Course-Based (Focus on a subject)", -1),
                l("option", { value: "major" }, "Major-Based (Connect with your department)", -1),
                l("option", { value: "general" }, "General Study (Casual study session)", -1)
              ])], 512), [
                [Fn, g.value.group_type]
              ])
            ]),
            g.value.group_type === "course" ? ($(), O("div", Xf, [
              k[14] || (k[14] = l("label", null, "Which course are you studying?", -1)),
              ot(l("select", {
                "onUpdate:modelValue": k[2] || (k[2] = (R) => g.value.course = R),
                class: "modal-input"
              }, [
                k[13] || (k[13] = l("option", {
                  value: "",
                  disabled: ""
                }, "Select a course", -1)),
                ($(!0), O(le, null, Ee(s.value, (R) => ($(), O("option", {
                  key: R,
                  value: R
                }, C(R), 9, Zf))), 128))
              ], 512), [
                [Fn, g.value.course]
              ])
            ])) : be("", !0),
            g.value.group_type === "major" ? ($(), O("div", Qf, [
              k[16] || (k[16] = l("label", null, "Target Major", -1)),
              ot(l("select", {
                "onUpdate:modelValue": k[3] || (k[3] = (R) => g.value.major = R),
                class: "modal-input"
              }, [
                k[15] || (k[15] = l("option", {
                  value: "",
                  disabled: ""
                }, "Confirm major", -1)),
                l("option", {
                  value: n.value.major
                }, C(n.value.major), 9, eu)
              ], 512), [
                [Fn, g.value.major]
              ])
            ])) : be("", !0),
            g.value.group_type === "general" ? ($(), O("div", tu, [
              k[18] || (k[18] = l("label", null, "Select Primary Interest", -1)),
              ot(l("select", {
                "onUpdate:modelValue": k[4] || (k[4] = (R) => g.value.interest = R),
                class: "modal-input"
              }, [
                k[17] || (k[17] = l("option", {
                  value: "",
                  disabled: ""
                }, "What is the focus?", -1)),
                ($(!0), O(le, null, Ee(r.value, (R) => ($(), O("option", {
                  key: R.id,
                  value: R.id
                }, C(R.name || R.interest_name), 9, nu))), 128))
              ], 512), [
                [Fn, g.value.interest]
              ])
            ])) : be("", !0),
            l("div", su, [
              k[19] || (k[19] = l("label", null, "Description", -1)),
              ot(l("textarea", {
                "onUpdate:modelValue": k[5] || (k[5] = (R) => g.value.group_description = R),
                placeholder: "Describe the goal...",
                class: "modal-input"
              }, null, 512), [
                [Gt, g.value.group_description]
              ])
            ]),
            l("div", ru, [
              l("button", {
                onClick: k[6] || (k[6] = (R) => x.value = !1),
                class: "cancel-btn"
              }, "Cancel"),
              l("button", {
                class: "grid-btn primary",
                onClick: m
              }, "Create & Invite")
            ])
          ])
        ])) : be("", !0)
      ])
    ]));
  }
}, va = /* @__PURE__ */ yt(ou, [["styles", [$f]], ["__scopeId", "data-v-e3833863"]]), iu = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-d15bc108]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-d15bc108]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-d15bc108]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-d15bc108]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-d15bc108]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-d15bc108]{position:relative;width:52px;height:52px}.avatar-main[data-v-d15bc108]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-d15bc108]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-d15bc108]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-d15bc108]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-d15bc108]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-d15bc108]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-d15bc108]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-d15bc108]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-d15bc108]{color:#4f46e5}.vertical-divider[data-v-d15bc108]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-d15bc108]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-d15bc108]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-d15bc108]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-d15bc108]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-d15bc108]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-d15bc108]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-d15bc108]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-d15bc108]{flex-direction:column}.match-stats[data-v-d15bc108]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-d15bc108]{width:100%;justify-content:center}}', au = { class: "elegant-item-container" }, lu = { class: "elegant-content" }, cu = { class: "identity-block" }, du = { class: "avatar-container" }, fu = { class: "name-section" }, uu = { class: "username" }, pu = { class: "major" }, hu = { class: "match-stats" }, mu = { class: "stat-group" }, gu = { class: "stat-value highlight" }, bu = { class: "stat-group" }, vu = { class: "stat-value" }, xu = { class: "stat-group" }, yu = { class: "stat-value" }, wu = {
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
    const n = e, s = ye(() => {
      if (typeof n.profile == "object") return n.profile;
      try {
        return n.profile ? JSON.parse(n.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = ye(() => {
      if (Array.isArray(n.overlapCourses)) return n.overlapCourses;
      try {
        return n.overlapCourses ? JSON.parse(n.overlapCourses) : [];
      } catch {
        return [];
      }
    }), o = ye(() => (s.value.username || "??").charAt(0).toUpperCase()), i = ye(() => {
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
    return (d, u) => ($(), O("div", au, [
      l("div", {
        class: "glow-accent",
        style: qe(i.value)
      }, null, 4),
      l("div", lu, [
        l("div", cu, [
          l("div", du, [
            l("div", {
              class: "avatar-ring",
              style: qe(d.avatarBorder)
            }, null, 4),
            l("div", {
              class: "avatar-main",
              style: qe(i.value)
            }, C(o.value), 5)
          ]),
          l("div", fu, [
            l("h3", uu, C(s.value.username), 1),
            l("p", pu, C(s.value.major), 1)
          ])
        ]),
        l("div", hu, [
          l("div", mu, [
            u[1] || (u[1] = l("span", { class: "stat-label" }, "Match", -1)),
            l("span", gu, [
              ce(C(e.matchPercent), 1),
              u[0] || (u[0] = l("small", null, "%", -1))
            ])
          ]),
          u[6] || (u[6] = l("div", { class: "vertical-divider" }, null, -1)),
          l("div", bu, [
            u[3] || (u[3] = l("span", { class: "stat-label" }, "Overlap", -1)),
            l("span", vu, [
              ce(C(e.overlapHours), 1),
              u[2] || (u[2] = l("small", null, "h", -1))
            ])
          ]),
          u[7] || (u[7] = l("div", { class: "vertical-divider" }, null, -1)),
          l("div", xu, [
            u[5] || (u[5] = l("span", { class: "stat-label" }, "Shared", -1)),
            l("span", yu, [
              ce(C(r.value.length), 1),
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
}, xa = /* @__PURE__ */ yt(wu, [["styles", [iu]], ["__scopeId", "data-v-d15bc108"]]), _u = ".discovery-main[data-v-18297967]{padding:1.5rem;font-family:Inter,sans-serif;overflow-y:auto;height:100vh}[data-v-18297967] .connect-btn{width:100%;padding:.6rem;background:#3b82f6;color:#fff;border:none;border-radius:12px;font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s ease;margin-top:auto}[data-v-18297967] .connect-btn:hover{background:#2563eb;transform:translateY(-2px);box-shadow:0 4px 12px #3b82f64d}[data-v-18297967] .connect-btn:active{transform:translateY(0)}[data-v-18297967] .connect-btn.loading{background:#94a3b8;cursor:wait}.discovery-header[data-v-18297967]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:.5rem;width:70vw}.header-left[data-v-18297967]{flex-shrink:0}.header-title[data-v-18297967]{font-size:1.3rem;font-weight:600;color:#0f172a;margin:0 0 .1rem;letter-spacing:-.02em;white-space:nowrap}.header-subtitle[data-v-18297967]{font-size:.7rem;color:#64748b;margin:0;white-space:nowrap}.header-actions[data-v-18297967]{display:flex;align-items:center;gap:1rem;justify-content:space-between;width:350px}.search-wrapper[data-v-18297967]{position:relative;width:200px;flex-shrink:0}.search-icon[data-v-18297967]{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.8rem}.search-input[data-v-18297967]{width:100%;padding:.5rem 1.8rem .5rem 2.2rem;border:1px solid #f1f5f9;border-radius:40px;background:#fff;font-size:.8rem;transition:all .2s}.search-input[data-v-18297967]:focus{outline:none;border-color:#1e3a5f;box-shadow:0 0 0 3px #1e3a5f1a}.search-clear[data-v-18297967]{position:absolute;right:.25rem;top:50%;transform:translateY(-50%);width:22px;height:22px;border:none;background:#f1f5f9;border-radius:11px;color:#64748b;font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.search-clear[data-v-18297967]:hover{background:#e2e8f0;color:#1e3a5f}.view-toggles[data-v-18297967]{display:flex;gap:.2rem;background:#f8fafc;padding:.2rem;border-radius:40px;border:1px solid #f1f5f9;flex-shrink:0}.view-btn[data-v-18297967]{width:32px;height:32px;border:none;background:transparent;border-radius:30px;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;padding:0}.view-btn[data-v-18297967]:hover{color:#1e3a5f;background:#fff}.view-btn.active[data-v-18297967]{background:#1e3a5f;color:#fff}.filter-tabs[data-v-18297967]{display:flex;gap:.4rem;overflow-x:auto;padding-bottom:.5rem;margin-bottom:1.5rem;scrollbar-width:none;width:100%}.filter-tabs[data-v-18297967]::-webkit-scrollbar{display:none}.filter-tab[data-v-18297967]{display:flex;align-items:center;gap:.4rem;padding:.4rem 1rem;border:1px solid #f1f5f9;background:#fff;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}.filter-tab[data-v-18297967]:hover{background:#f8fafc;color:#1e3a5f}.filter-tab.active[data-v-18297967]{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.tab-emoji[data-v-18297967]{font-size:.85rem}.tab-badge[data-v-18297967]{background:#f1f5f9;padding:.1rem .4rem;border-radius:30px;font-size:.6rem;color:#64748b;margin-left:.1rem}.filter-tab.active .tab-badge[data-v-18297967]{background:#fff3;color:#fff}.results-container[data-v-18297967]{min-height:400px;width:100%}.results-flex[data-v-18297967]{display:flex;flex-wrap:wrap;gap:1.2rem;width:100%}.results-flex[data-v-18297967]>*{flex:0 0 calc(25% - .9rem);min-width:280px;max-width:100%;height:340px;margin-bottom:0}[data-v-18297967] .grid-card{height:100%;width:100%;margin:0}.results-list[data-v-18297967]{display:flex;flex-direction:column;gap:1rem;width:100%}.results-list[data-v-18297967]>*{width:100%;height:auto;min-height:200px}.empty-state[data-v-18297967]{text-align:center;padding:3rem 2rem;background:#fff;border-radius:32px;border:2px dashed #f1f5f9;width:100%}.empty-icon[data-v-18297967]{font-size:2.5rem;margin-bottom:1rem;opacity:.5}.empty-state h3[data-v-18297967]{font-size:1.1rem;font-weight:600;color:#0f172a;margin-bottom:.3rem}.empty-state p[data-v-18297967]{font-size:.85rem;color:#64748b;margin-bottom:1.2rem}.empty-reset[data-v-18297967]{background:#f8fafc;border:1px solid #f1f5f9;padding:.5rem 1.5rem;border-radius:40px;color:#1e3a5f;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.empty-reset[data-v-18297967]:hover{background:#1e3a5f;color:#fff}.fade-enter-active[data-v-18297967],.fade-leave-active[data-v-18297967]{transition:opacity .3s ease}.fade-enter-from[data-v-18297967],.fade-leave-to[data-v-18297967]{opacity:0}.modal-overlay[data-v-18297967]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:99999!important}@media(max-width:1200px){.results-flex[data-v-18297967]>*{flex:0 0 calc(33.333% - .8rem)}}@media(max-width:900px){.results-flex[data-v-18297967]>*{flex:0 0 calc(50% - .6rem)}}@media(max-width:768px){.discovery-header[data-v-18297967]{flex-direction:column;align-items:flex-start}.header-left[data-v-18297967]{width:100%}.header-title[data-v-18297967],.header-subtitle[data-v-18297967]{white-space:normal}.header-actions[data-v-18297967]{width:100%;justify-content:space-between}.search-wrapper[data-v-18297967]{width:calc(100% - 90px)}.results-flex[data-v-18297967]>*{flex:0 0 100%;height:auto;min-height:340px}}", ku = { class: "discovery-main" }, Cu = { class: "discovery-header" }, Su = { class: "header-actions" }, Eu = { class: "search-wrapper" }, Tu = { class: "view-toggles" }, Au = { class: "filter-tabs" }, Ru = ["onClick"], $u = { class: "tab-emoji" }, Ou = { class: "tab-name" }, Pu = { class: "tab-badge" }, ju = { class: "results-container" }, Mu = {
  key: 1,
  class: "empty-state"
}, Du = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ ne("grid"), s = /* @__PURE__ */ ne(""), r = /* @__PURE__ */ ne("all"), o = ye(() => {
      try {
        const u = JSON.parse(t.topMatches), b = u.reduce((m, _) => _.match_percent > 85 ? m += 1 : m, 0), x = u.reduce((m, _) => _.overlap_hours > 5 ? m += 1 : m, 0), g = JSON.parse(t.sameMajor), y = JSON.parse(t.sameCourse);
        return {
          all: u.length,
          best: b,
          schedule: x,
          major: g.length,
          course: y.length
        };
      } catch (u) {
        return console.error(u), { all: 0, best: 0, schedule: 0, major: 0, course: 0 };
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
    ], a = ye(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), c = ye(() => {
      try {
        return JSON.parse(a.value || "[]");
      } catch {
        return [];
      }
    }), f = ye(() => {
      let u = c.value;
      if (s.value) {
        const b = s.value.toLowerCase();
        u = u.filter(
          (x) => x.profile.username.toLowerCase().includes(b) || x.profile.major.toLowerCase().includes(b) || x.overlap_courses?.some(
            (g) => g.toLowerCase().includes(b)
          )
        );
      }
      switch (r.value) {
        case "high":
          u = u.filter((b) => b.match_percent >= 85);
          break;
        case "schedule":
          u = u.filter((b) => b.overlap_hours >= 5);
          break;
        case "courses":
          u = u.filter((b) => b.overlap_courses?.length >= 2);
          break;
      }
      return u;
    }), d = () => {
      s.value = "", r.value = "all";
    };
    return zn(c, (u) => {
    }), (u, b) => ($(), O("div", ku, [
      l("div", Cu, [
        b[7] || (b[7] = l("div", { class: "header-left" }, [
          l("h1", { class: "header-title" }, "Find Study Partners"),
          l("p", { class: "header-subtitle" }, "Connect with classmates")
        ], -1)),
        l("div", Su, [
          l("div", Eu, [
            b[4] || (b[4] = l("span", { class: "search-icon" }, "🔍", -1)),
            ot(l("input", {
              "onUpdate:modelValue": b[0] || (b[0] = (x) => s.value = x),
              type: "text",
              placeholder: "Search...",
              class: "search-input"
            }, null, 512), [
              [Gt, s.value]
            ]),
            s.value ? ($(), O("button", {
              key: 0,
              class: "search-clear",
              onClick: b[1] || (b[1] = (x) => s.value = "")
            }, " ✕ ")) : be("", !0)
          ]),
          l("div", Tu, [
            l("button", {
              class: xe(["view-btn", { active: n.value === "grid" }]),
              onClick: b[2] || (b[2] = (x) => n.value = "grid"),
              title: "Grid view"
            }, [...b[5] || (b[5] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-18297967><rect x="3" y="3" width="7" height="7" rx="1" data-v-18297967></rect><rect x="14" y="3" width="7" height="7" rx="1" data-v-18297967></rect><rect x="3" y="14" width="7" height="7" rx="1" data-v-18297967></rect><rect x="14" y="14" width="7" height="7" rx="1" data-v-18297967></rect></svg>', 1)
            ])], 2),
            l("button", {
              class: xe(["view-btn", { active: n.value === "list" }]),
              onClick: b[3] || (b[3] = (x) => n.value = "list"),
              title: "List view"
            }, [...b[6] || (b[6] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-18297967><line x1="8" y1="6" x2="21" y2="6" data-v-18297967></line><line x1="8" y1="12" x2="21" y2="12" data-v-18297967></line><line x1="8" y1="18" x2="21" y2="18" data-v-18297967></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-18297967></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-18297967></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-18297967></line></svg>', 1)
            ])], 2)
          ])
        ])
      ]),
      l("div", Au, [
        ($(), O(le, null, Ee(i, (x) => l("button", {
          key: x.id,
          class: xe(["filter-tab", { active: r.value === x.id }]),
          onClick: (g) => r.value = x.id
        }, [
          l("span", $u, C(x.icon), 1),
          l("span", Ou, C(x.name), 1),
          l("span", Pu, C(x.count), 1)
        ], 10, Ru)), 64))
      ]),
      l("div", ju, [
        _e(_n, {
          name: "fade",
          mode: "out-in"
        }, {
          default: Jt(() => [
            f.value.length > 0 ? ($(), O("div", {
              key: 0,
              class: xe(["results-flex", { "results-list": n.value === "list" }])
            }, [
              n.value === "grid" ? ($(!0), O(le, { key: 0 }, Ee(f.value, (x, g) => ($(), ts(va, {
                key: g,
                profile: x.profile,
                "match-percent": x.match_percent,
                "overlap-hours": x.overlap_hours,
                "overlap-courses": x.overlap_courses,
                "time-slots": x.daily_schedules
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : ($(!0), O(le, { key: 1 }, Ee(f.value, (x, g) => ($(), ts(xa, {
                profile: x.profile,
                key: x.profile.username.substring(0, 2) + g,
                "match-percent": x.match_percent,
                "overlap-hours": x.overlap_hours,
                "overlap-courses": x.overlap_courses,
                "time-slots": x.daily_schedules
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : ($(), O("div", Mu, [
              b[8] || (b[8] = l("div", { class: "empty-icon" }, "🔍", -1)),
              b[9] || (b[9] = l("h3", null, "No matches found", -1)),
              b[10] || (b[10] = l("p", null, "Try adjusting your filters", -1)),
              l("button", {
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
}, Nu = /* @__PURE__ */ yt(Du, [["styles", [_u]], ["__scopeId", "data-v-18297967"]]), Iu = ".btn-approve[data-v-bc4f1dd2]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-bc4f1dd2]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-bc4f1dd2]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-bc4f1dd2]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-bc4f1dd2]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-bc4f1dd2]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-bc4f1dd2]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-bc4f1dd2]{display:flex;align-items:center;gap:14px}.avatar[data-v-bc4f1dd2]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-bc4f1dd2]{display:flex;flex-direction:column}.group-name[data-v-bc4f1dd2]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-bc4f1dd2]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-bc4f1dd2]{display:flex;gap:10px}.btn-action[data-v-bc4f1dd2]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-bc4f1dd2]{width:14px;height:14px}.btn-view[data-v-bc4f1dd2]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-bc4f1dd2]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-bc4f1dd2]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-bc4f1dd2]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-bc4f1dd2]:hover{background-color:#f43f5e;color:#fff}", Fu = { class: "surface" }, Lu = { class: "surface-header" }, Bu = { class: "surface-title" }, Uu = { class: "badge" }, zu = { class: "request-list" }, Hu = ["id"], Vu = { class: "group-info" }, qu = { class: "avatar" }, Ku = { class: "text-content" }, Wu = { class: "group-name" }, Ju = { class: "creator-tag" }, Gu = { class: "action-group" }, Yu = ["onClick"], Xu = ["onClick"], Zu = ["onClick"], Qu = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken";
    const n = t, s = /* @__PURE__ */ ne(null), r = (a) => {
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
    return (a, c) => ($(), O("section", Fu, [
      l("div", Lu, [
        l("div", Bu, [
          c[0] || (c[0] = ce(" Inbound Requests ", -1)),
          l("span", Uu, C(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      l("div", zu, [
        ($(!0), O(le, null, Ee(e.groups, (f) => ($(), O("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          l("div", Vu, [
            l("div", qu, C(f.name.charAt(0).toUpperCase()), 1),
            l("div", Ku, [
              l("span", Wu, C(f.name), 1),
              l("span", Ju, "by @" + C(f.creator), 1)
            ])
          ]),
          l("div", Gu, [
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
            ])], 8, Yu),
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
            ])], 8, Xu),
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
            ])], 8, Zu)
          ])
        ], 8, Hu))), 128))
      ])
    ]));
  }
}, ep = /* @__PURE__ */ yt(Qu, [["styles", [Iu]], ["__scopeId", "data-v-bc4f1dd2"]]), tp = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', np = { class: "viewport" }, sp = { class: "header" }, rp = {
  key: 0,
  class: "status-badge"
}, op = { class: "stats" }, ip = { class: "card" }, ap = { class: "value" }, lp = { class: "card" }, cp = {
  class: "value",
  style: { color: "var(--primary)" }
}, dp = { class: "card" }, fp = { class: "value" }, up = { class: "workspace" }, pp = ["groups"], hp = { class: "surface pulse-container" }, mp = { class: "feed-timeline" }, gp = ["onClick"], bp = { key: 0 }, vp = { key: 1 }, xp = { key: 2 }, yp = { key: 3 }, wp = { key: 4 }, _p = { class: "feed-body" }, kp = { class: "feed-text" }, Cp = { class: "highlight" }, Sp = { class: "highlight" }, Ep = { class: "highlight" }, Tp = { class: "highlight" }, Ap = { class: "highlight" }, Rp = { class: "highlight" }, $p = { class: "highlight" }, Op = { class: "feed-time" }, Pp = {
  key: 0,
  class: "empty-state"
}, jp = { class: "modal-card" }, Mp = { class: "modal-header" }, Dp = { class: "header-top" }, Np = { class: "badge-group" }, Ip = { class: "badge major" }, Fp = { class: "modal-body" }, Lp = { class: "title-row" }, Bp = { class: "group-title" }, Up = {
  key: 0,
  class: "description-box"
}, zp = { class: "description-text" }, Hp = { class: "info-grid" }, Vp = { class: "info-item" }, qp = { class: "item-content" }, Kp = { class: "item-value" }, Wp = { class: "info-item" }, Jp = { class: "item-content" }, Gp = { class: "item-value" }, Yp = { class: "info-item" }, Xp = { class: "item-content" }, Zp = { class: "info-item" }, Qp = { class: "item-content" }, eh = { class: "info-item" }, th = { class: "item-content" }, nh = { class: "item-value" }, sh = { class: "info-item" }, rh = { class: "item-content" }, oh = { class: "item-value" }, ih = { class: "meta-row" }, ah = { class: "modal-footer" }, lh = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ ne(null), n = /* @__PURE__ */ ne(!1), s = /* @__PURE__ */ ne([]), r = /* @__PURE__ */ ne({}), o = /* @__PURE__ */ ne([]), i = /* @__PURE__ */ ne(!0), a = /* @__PURE__ */ ne(null), c = async () => {
      try {
        const y = await Q.get("/api/admin/dashboard-data");
        s.value = y.data.pendingGroups || [], r.value = y.data.stats || {}, o.value = y.data.activities || [];
      } catch (y) {
        console.error("API Error:", y);
      } finally {
        i.value = !1;
      }
    }, f = (y) => {
      if (y.type === "create" && y.group.id) {
        const m = `group-${y.group.id}`, _ = a.value.querySelector("inbound-request");
        if (_ && _.shadowRoot) {
          const k = _.shadowRoot.getElementById(m);
          k && (k.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), k.style.outline = "2px solid var(--primary)", k.style.borderRadius = "20px", setTimeout(() => {
            k.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, d = async (y) => {
      const m = y.detail ? y.detail[0] : y;
      if (!m || typeof m == "object") {
        console.error("Invalid ID received:", m);
        return;
      }
      try {
        const _ = await Q.get(`/api/group/${m}`);
        t.value = _.data, n.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, u = (y, m) => {
      const _ = (D) => {
        if (!D) return null;
        const H = D.match(/(\d{2}:\d{2}):\d{2}/);
        return H ? H[1] : D;
      }, k = _(y), R = _(m);
      return !k && !R ? "Time TBD" : k ? R ? `${k} — ${R}` : `${k} - End TBD` : `Starts at ${R || "TBD"}`;
    }, b = (y, m) => {
      m === "approve" ? x(y) : g(y);
    }, x = async (y) => {
      try {
        await Q.post(`/api/group/${y}/approve`), n.value = !1, c();
      } catch (m) {
        console.error(m);
      }
    }, g = async (y) => {
      try {
        await Q.post(`/api/group/${y}/deny`), n.value = !1, c();
      } catch (m) {
        console.error(m);
      }
    };
    return En(c), (y, m) => ($(), O("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: a
    }, [
      m[31] || (m[31] = We('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      l("main", np, [
        l("header", sp, [
          m[5] || (m[5] = l("h1", null, "Command Center", -1)),
          i.value ? be("", !0) : ($(), O("div", rp, [...m[4] || (m[4] = [
            l("div", { class: "dot-live" }, null, -1),
            ce(" OPERATIONAL ", -1)
          ])]))
        ]),
        l("section", op, [
          l("div", ip, [
            m[6] || (m[6] = l("span", { class: "label" }, "Total Groups", -1)),
            l("span", ap, C(r.value.groups || 0), 1)
          ]),
          l("div", lp, [
            m[7] || (m[7] = l("span", { class: "label" }, "Pending", -1)),
            l("span", cp, C(r.value.pending || 0), 1)
          ]),
          l("div", dp, [
            m[8] || (m[8] = l("span", { class: "label" }, "Total Students", -1)),
            l("span", fp, C(r.value.students || 0), 1)
          ])
        ]),
        l("div", up, [
          l("inbound-request", {
            groups: s.value,
            onAction_taken: c,
            onShow_details: d
          }, null, 40, pp),
          l("section", hp, [
            m[14] || (m[14] = l("div", { class: "surface-header" }, [
              l("div", { class: "surface-title" }, [
                ce(" Notifications "),
                l("div", { class: "live-indicator" }, [
                  l("span", { class: "dot" })
                ])
              ])
            ], -1)),
            l("div", mp, [
              ($(!0), O(le, null, Ee(o.value, (_) => ($(), O("div", {
                key: _.id,
                class: "feed-item",
                onClick: (k) => f(_)
              }, [
                l("div", {
                  class: xe([
                    "feed-icon-wrapper",
                    `bg-${_.type || "default"}`
                  ])
                }, [
                  _.type === "register" ? ($(), O("span", bp, "👋")) : _.type === "create" ? ($(), O("span", vp, "👤")) : _.type === "approve" ? ($(), O("span", xp, " 👍")) : _.type === "deny" ? ($(), O("span", yp, "🚫")) : ($(), O("span", wp, "🔔"))
                ], 2),
                l("div", _p, [
                  l("div", kp, [
                    _.type === "register" ? ($(), O(le, { key: 0 }, [
                      l("span", Cp, C(_.sender), 1),
                      m[9] || (m[9] = ce(" joined our community ", -1))
                    ], 64)) : _.type === "create" ? ($(), O(le, { key: 1 }, [
                      l("span", Sp, C(_.sender), 1),
                      m[10] || (m[10] = ce(" wants to start ", -1)),
                      l("span", Ep, C(_.group.name), 1)
                    ], 64)) : _.type === "approve" ? ($(), O(le, { key: 2 }, [
                      l("span", Tp, C(_.sender), 1),
                      m[11] || (m[11] = ce(" approved the group ", -1)),
                      l("span", Ap, C(_.group.name), 1)
                    ], 64)) : _.type === "deny" ? ($(), O(le, { key: 3 }, [
                      l("span", Rp, C(_.sender), 1),
                      m[12] || (m[12] = ce(" denied the group ", -1)),
                      l("span", $p, C(_.group.name), 1)
                    ], 64)) : ($(), O(le, { key: 4 }, [
                      ce(C(_.message || "Update"), 1)
                    ], 64))
                  ]),
                  l("span", Op, C(_.time_ago), 1)
                ])
              ], 8, gp))), 128)),
              !o.value?.length && !i.value ? ($(), O("div", Pp, [...m[13] || (m[13] = [
                l("p", null, "📭 No recent pulses.", -1)
              ])])) : be("", !0)
            ])
          ]),
          n.value && t.value ? ($(), O("div", {
            key: 0,
            class: "modal-overlay",
            onClick: m[3] || (m[3] = er((_) => n.value = !1, ["self"]))
          }, [
            l("div", jp, [
              l("div", Mp, [
                l("div", Dp, [
                  l("div", Np, [
                    l("span", Ip, C(t.value.major || "Undeclared"), 1),
                    l("span", {
                      class: xe(["badge", t.value.group_type])
                    }, C(t.value.group_type === "general" ? "General" : "Project"), 3),
                    l("span", {
                      class: xe(["badge status", t.value.status.toLowerCase()])
                    }, C(t.value.status), 3)
                  ]),
                  l("button", {
                    class: "close-btn",
                    onClick: m[0] || (m[0] = (_) => n.value = !1)
                  }, "✕")
                ])
              ]),
              l("div", Fp, [
                l("div", Lp, [
                  l("h3", Bp, C(t.value.name), 1),
                  l("span", {
                    class: xe(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    m[15] || (m[15] = l("span", { class: "tag-emoji" }, "📖", -1)),
                    l("span", null, C(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? ($(), O("div", Up, [
                  l("p", zp, " “" + C(t.value.description) + "” ", 1)
                ])) : be("", !0),
                l("div", Hp, [
                  l("div", Vp, [
                    m[17] || (m[17] = l("span", { class: "item-emoji" }, "📅", -1)),
                    l("div", qp, [
                      m[16] || (m[16] = l("span", { class: "item-label" }, "Day", -1)),
                      l("span", Kp, C(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  l("div", Wp, [
                    m[19] || (m[19] = l("span", { class: "item-emoji" }, "⏰", -1)),
                    l("div", Jp, [
                      m[18] || (m[18] = l("span", { class: "item-label" }, "Time", -1)),
                      l("span", Gp, C(u(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  l("div", Yp, [
                    m[21] || (m[21] = l("span", { class: "item-emoji" }, "🎯", -1)),
                    l("div", Xp, [
                      m[20] || (m[20] = l("span", { class: "item-label" }, "Interest", -1)),
                      l("span", {
                        class: xe(["item-value", { "is-null": !t.value.interest }])
                      }, C(t.value.interest || "None"), 3)
                    ])
                  ]),
                  l("div", Zp, [
                    m[23] || (m[23] = l("span", { class: "item-emoji" }, "📚", -1)),
                    l("div", Qp, [
                      m[22] || (m[22] = l("span", { class: "item-label" }, "Semester", -1)),
                      l("span", {
                        class: xe(["item-value", { "is-null": !t.value.semester }])
                      }, C(t.value.semester || "—"), 3)
                    ])
                  ]),
                  l("div", eh, [
                    m[25] || (m[25] = l("span", { class: "item-emoji" }, "👥", -1)),
                    l("div", th, [
                      m[24] || (m[24] = l("span", { class: "item-label" }, "Members", -1)),
                      l("span", nh, C(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  l("div", sh, [
                    m[27] || (m[27] = l("span", { class: "item-emoji" }, "👤", -1)),
                    l("div", rh, [
                      m[26] || (m[26] = l("span", { class: "item-label" }, "Creator", -1)),
                      l("span", oh, "ID: " + C(t.value.creator), 1)
                    ])
                  ])
                ]),
                l("div", ih, [
                  l("span", {
                    class: xe(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    m[28] || (m[28] = l("span", { class: "chip-dot" }, null, -1)),
                    ce(" " + C(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  l("span", {
                    class: xe(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    m[29] || (m[29] = l("span", { class: "chip-dot" }, null, -1)),
                    ce(" " + C(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  l("span", {
                    class: xe(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    m[30] || (m[30] = l("span", { class: "chip-dot" }, null, -1)),
                    ce(" " + C(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              l("div", ah, [
                l("button", {
                  onClick: m[1] || (m[1] = (_) => b(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                l("button", {
                  onClick: m[2] || (m[2] = (_) => b(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : be("", !0)
        ])
      ])
    ], 512));
  }
}, ch = /* @__PURE__ */ yt(lh, [["styles", [tp]]]), dh = "[data-v-543c61ff]{margin:0;padding:0;box-sizing:border-box}.bento-chat-container[data-v-543c61ff]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#f5f7fa;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow:hidden}.bento-layout[data-v-543c61ff]{display:grid;grid-template-columns:280px 1fr 320px;height:100vh;padding:20px;gap:20px}.bento-sidebar[data-v-543c61ff],.bento-main[data-v-543c61ff],.bento-resources[data-v-543c61ff]{background:#fff;border-radius:32px;box-shadow:0 10px 30px -10px #00000008,0 0 0 1px #00000005;overflow:hidden;display:flex;flex-direction:column;height:calc(100vh - 40px)}.bento-sidebar[data-v-543c61ff]{padding:0}.sidebar-header[data-v-543c61ff]{padding:24px 20px 16px;border-bottom:1px solid #f1f5f9}.sidebar-brand[data-v-543c61ff]{display:flex;align-items:center;gap:12px;margin-bottom:12px}.brand-icon[data-v-543c61ff]{width:40px;height:40px;background:#1e3a5f;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff}.brand-name[data-v-543c61ff]{font-size:18px;font-weight:700;color:#0f172a}.sidebar-badge[data-v-543c61ff]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:11px;font-weight:600;color:#1e3a5f;display:inline-block}.sidebar-section[data-v-543c61ff]{padding:20px;flex:1;overflow-y:auto}.sidebar-section[data-v-543c61ff]::-webkit-scrollbar{width:4px}.sidebar-section[data-v-543c61ff]::-webkit-scrollbar-track{background:#f1f5f9}.sidebar-section[data-v-543c61ff]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.section-header[data-v-543c61ff]{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.section-title[data-v-543c61ff]{font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase}.online-count[data-v-543c61ff]{font-size:11px;color:#10b981;font-weight:600;background:#d1fae5;padding:2px 8px;border-radius:30px}.members-list[data-v-543c61ff]{display:flex;flex-direction:column;gap:8px}.member-card[data-v-543c61ff]{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;transition:all .2s}.member-card[data-v-543c61ff]:hover{background:#f8fafc}.member-avatar-wrapper[data-v-543c61ff]{position:relative;width:44px;height:44px}.member-avatar[data-v-543c61ff]{width:100%;height:100%;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.1rem;color:#fff;box-shadow:0 4px 8px #0000000d}.status-dot[data-v-543c61ff]{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;border:2px solid white}.status-dot.online[data-v-543c61ff]{background:#10b981}.status-dot.away[data-v-543c61ff]{background:#f59e0b}.member-details[data-v-543c61ff]{flex:1}.member-name[data-v-543c61ff]{font-size:14px;font-weight:600;color:#0f172a;margin-bottom:2px}.member-status-text[data-v-543c61ff]{font-size:11px;color:#94a3b8}.bento-main[data-v-543c61ff]{display:flex;flex-direction:column;background:#fff}.chat-header[data-v-543c61ff]{padding:24px 28px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center}.group-name[data-v-543c61ff]{font-size:22px;font-weight:700;color:#0f172a;margin-bottom:6px;letter-spacing:-.02em}.group-meta[data-v-543c61ff]{display:flex;gap:16px}.meta-item[data-v-543c61ff]{display:flex;align-items:center;gap:6px;font-size:13px;color:#64748b}.meta-item.online[data-v-543c61ff]{color:#10b981}.online-dot[data-v-543c61ff]{width:8px;height:8px;background:#10b981;border-radius:50%;display:inline-block}.video-button[data-v-543c61ff]{width:48px;height:48px;border-radius:16px;background:#1e3a5f;border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.video-button[data-v-543c61ff]:hover{background:#14273f;transform:translateY(-2px);box-shadow:0 8px 16px #1e3a5f4d}.messages-container[data-v-543c61ff]{flex:1;overflow-y:auto;padding:28px;background:#f8fafc}.messages-container[data-v-543c61ff]::-webkit-scrollbar{width:4px}.messages-container[data-v-543c61ff]::-webkit-scrollbar-track{background:#f1f5f9}.messages-container[data-v-543c61ff]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.message-group[data-v-543c61ff]{margin-bottom:20px;animation:slideIn-543c61ff .2s ease}@keyframes slideIn-543c61ff{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.message-row[data-v-543c61ff]{display:flex;max-width:70%}.own-message[data-v-543c61ff]{margin-left:auto;justify-content:flex-end}.peer-message[data-v-543c61ff]{margin-right:auto;justify-content:flex-start}.message-bubble[data-v-543c61ff]{background:#fff;border-radius:20px;padding:12px 16px;box-shadow:0 2px 8px #00000005;border:1px solid #f1f5f9}.own-message .message-bubble[data-v-543c61ff]{background:#1e3a5f;border-color:#1e3a5f}.message-header[data-v-543c61ff]{display:flex;align-items:center;gap:8px;margin-bottom:6px}.own-message .message-header[data-v-543c61ff]{justify-content:flex-end}.message-sender[data-v-543c61ff]{font-size:12px;font-weight:600;color:#1e3a5f}.own-message .message-sender[data-v-543c61ff]{color:#ffffffe6}.message-time[data-v-543c61ff]{font-size:10px;color:#94a3b8}.own-message .message-time[data-v-543c61ff]{color:#fff9}.text-content[data-v-543c61ff]{font-size:14px;line-height:1.6;color:#1a2e35;word-wrap:break-word}.own-message .text-content[data-v-543c61ff]{color:#fff}.file-link[data-v-543c61ff]{text-decoration:none;display:block}.file-preview[data-v-543c61ff]{display:flex;align-items:center;gap:12px;padding:8px;background:#f8fafc;border-radius:16px;min-width:260px;transition:all .2s}.file-preview[data-v-543c61ff]:hover{background:#f1f5f9}.own-message .file-preview[data-v-543c61ff]{background:#ffffff1a}.file-icon-wrapper[data-v-543c61ff]{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.file-icon-wrapper.image[data-v-543c61ff]{background:#dcfce7;color:#16a34a}.file-icon-wrapper.pdf[data-v-543c61ff]{background:#fee2e2;color:#dc2626}.file-icon-wrapper.document[data-v-543c61ff]{background:#dbeafe;color:#2563eb}.file-icon-wrapper.presentation[data-v-543c61ff]{background:#fed7aa;color:#c2410c}.file-icon-wrapper.spreadsheet[data-v-543c61ff]{background:#dcfce7;color:#059669}.file-icon-wrapper.archive[data-v-543c61ff]{background:#fef9c3;color:#ca8a04}.file-icon-wrapper.audio[data-v-543c61ff]{background:#fae8ff;color:#a21caf}.file-icon-wrapper.video[data-v-543c61ff]{background:#ffe4e6;color:#be123c}.file-icon-wrapper.code[data-v-543c61ff]{background:#e0f2fe;color:#0369a1}.file-icon-wrapper[data-v-543c61ff]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.own-message .file-icon-wrapper[data-v-543c61ff]{background:#fff3;color:#fff}.file-details[data-v-543c61ff]{flex:1;min-width:0}.file-name[data-v-543c61ff]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.own-message .file-name[data-v-543c61ff]{color:#fff}.file-meta[data-v-543c61ff]{font-size:10px;color:#94a3b8}.own-message .file-meta[data-v-543c61ff]{color:#ffffffb3}.file-download-icon[data-v-543c61ff]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transform:scale(.9);transition:all .2s}.file-preview:hover .file-download-icon[data-v-543c61ff]{opacity:1;transform:scale(1)}.input-area[data-v-543c61ff]{padding:20px 28px;background:#fff;border-top:1px solid #f1f5f9}.input-wrapper[data-v-543c61ff]{display:flex;align-items:center;gap:12px;background:#f8fafc;border:1px solid #f1f5f9;border-radius:40px;padding:4px 4px 4px 16px;transition:all .2s}.input-wrapper[data-v-543c61ff]:focus-within{border-color:#1e3a5f;box-shadow:0 0 0 4px #1e3a5f1a;background:#fff}.attach-btn[data-v-543c61ff]{width:40px;height:40px;border-radius:20px;border:none;background:transparent;color:#1e3a5f;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.attach-btn[data-v-543c61ff]:hover{background:#f1f5f9;transform:scale(1.1)}.file-input[data-v-543c61ff]{display:none}.message-input[data-v-543c61ff]{flex:1;border:none;background:transparent;outline:none;font-size:14px;color:#0f172a;padding:10px 0}.message-input[data-v-543c61ff]::placeholder{color:#94a3b8}.send-btn[data-v-543c61ff]{width:44px;height:44px;border-radius:22px;border:none;background:#1e3a5f;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.send-btn[data-v-543c61ff]:hover{background:#14273f;transform:scale(1.05)}.bento-resources[data-v-543c61ff]{padding:0}.resources-header[data-v-543c61ff]{padding:24px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}.resources-title[data-v-543c61ff]{display:flex;align-items:center;gap:10px}.resources-title svg[data-v-543c61ff]{color:#1e3a5f}.resources-title h3[data-v-543c61ff]{font-size:16px;font-weight:600;color:#0f172a;margin:0}.resources-count[data-v-543c61ff]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:12px;font-weight:600;color:#1e3a5f}.resources-list[data-v-543c61ff]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}.resources-list[data-v-543c61ff]::-webkit-scrollbar{width:4px}.resources-list[data-v-543c61ff]::-webkit-scrollbar-track{background:#f1f5f9}.resources-list[data-v-543c61ff]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.resource-item[data-v-543c61ff]{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:18px;transition:all .2s;cursor:pointer;text-decoration:none;color:inherit}.resource-item[data-v-543c61ff]:hover{background:#f1f5f9;transform:translate(4px)}.resource-icon[data-v-543c61ff]{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.resource-icon.image[data-v-543c61ff]{background:#dcfce7;color:#16a34a}.resource-icon.pdf[data-v-543c61ff]{background:#fee2e2;color:#dc2626}.resource-icon.document[data-v-543c61ff]{background:#dbeafe;color:#2563eb}.resource-icon.presentation[data-v-543c61ff]{background:#fed7aa;color:#c2410c}.resource-icon.spreadsheet[data-v-543c61ff]{background:#dcfce7;color:#059669}.resource-icon.archive[data-v-543c61ff]{background:#fef9c3;color:#ca8a04}.resource-icon.audio[data-v-543c61ff]{background:#fae8ff;color:#a21caf}.resource-icon.video[data-v-543c61ff]{background:#ffe4e6;color:#be123c}.resource-icon.code[data-v-543c61ff]{background:#e0f2fe;color:#0369a1}.resource-icon[data-v-543c61ff]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.resource-content[data-v-543c61ff]{flex:1;min-width:0}.resource-name[data-v-543c61ff]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-meta[data-v-543c61ff]{display:flex;gap:8px;font-size:10px}.resource-uploader[data-v-543c61ff]{color:#1e3a5f;font-weight:500}.resource-size[data-v-543c61ff]{color:#94a3b8}.resource-download[data-v-543c61ff]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transition:all .2s}.resource-item:hover .resource-download[data-v-543c61ff]{opacity:1}.resource-download[data-v-543c61ff]:hover{background:#1e3a5f;color:#fff;transform:scale(1.1)}@media(max-width:1200px){.bento-layout[data-v-543c61ff]{grid-template-columns:240px 1fr 280px}}@media(max-width:900px){.bento-layout[data-v-543c61ff]{grid-template-columns:1fr;padding:10px}.bento-sidebar[data-v-543c61ff],.bento-resources[data-v-543c61ff]{display:none}.back-button-container[data-v-543c61ff]{bottom:20px;left:20px}.back-button[data-v-543c61ff]{padding:10px 18px;font-size:14px}}", fh = { class: "bento-chat-container" }, uh = { class: "bento-layout" }, ph = { class: "bento-sidebar" }, hh = { class: "sidebar-header" }, mh = { class: "sidebar-badge" }, gh = { class: "sidebar-section" }, bh = { class: "section-header" }, vh = { class: "online-count" }, xh = { class: "members-list" }, yh = { class: "member-avatar-wrapper" }, wh = { class: "member-details" }, _h = { class: "member-name" }, kh = { class: "member-status-text" }, Ch = { class: "bento-main" }, Sh = { class: "chat-header" }, Eh = { class: "header-info" }, Th = { class: "group-name" }, Ah = { class: "group-meta" }, Rh = { class: "meta-item" }, $h = { class: "meta-item online" }, Oh = { class: "message-bubble" }, Ph = { class: "message-header" }, jh = { class: "message-sender" }, Mh = { class: "message-time" }, Dh = {
  key: 0,
  class: "text-content"
}, Nh = ["href", "download"], Ih = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Fh = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Lh = {
  key: 2,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Bh = { class: "file-details" }, Uh = { class: "file-name" }, zh = { class: "file-meta" }, Hh = { class: "input-area" }, Vh = { class: "input-wrapper" }, qh = { class: "bento-resources" }, Kh = { class: "resources-header" }, Wh = { class: "resources-count" }, Jh = { class: "resources-list" }, Gh = ["href", "download"], Yh = { class: "resource-content" }, Xh = { class: "resource-name" }, Zh = { class: "resource-meta" }, Qh = { class: "resource-uploader" }, em = { class: "resource-size" }, tm = {
  __name: "ChatRoom.ce",
  props: { currentUser: [String] },
  setup(e) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken", Q.defaults.withCredentials = !0;
    let t = /* @__PURE__ */ nl(null);
    const n = /* @__PURE__ */ ne(null), s = /* @__PURE__ */ ne(null), r = /* @__PURE__ */ ne(null), o = /* @__PURE__ */ ne([]), i = /* @__PURE__ */ ne([]), a = /* @__PURE__ */ ne([]), c = e, f = /* @__PURE__ */ ne(""), d = /* @__PURE__ */ ne(null), u = (H) => {
      const M = [
        "#4158D0",
        "#C850C0",
        "#0093E9",
        "#80D0C7",
        "#8EC5FC",
        "#E0C3FC"
      ], I = (H?.length || 0) % M.length;
      return M[I];
    }, b = (H) => !H || H === 0 ? "0 Bytes" : (H / (1024 * 1024)).toFixed(2) + " MB", x = (H) => {
      if (!H) return "";
      const M = new Date(H);
      return isNaN(M.getTime()) ? H : M.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      });
    }, g = () => {
      s.value.click();
    }, y = async (H) => {
      const M = H.target;
      if (!M || !M.files.length) return;
      const I = M.files[0], re = new FormData();
      re.append("file", I), re.append("group_id", n.value);
      try {
        const B = await Q.post(
          "http://127.0.0.1:8000/chat/api/upload/",
          re
        );
        if (B.status === 201 || B.status === 200) {
          const X = B.data.data;
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
      } catch (B) {
        console.error("Upload failed!", B.response?.data || B.message);
      }
      M.value = "";
    }, m = async (H) => {
      try {
        const M = await Q.get(H), I = M.data;
        if (M.status == 200) {
          a.value = I.shared_files || [], o.value = I.members || [], i.value = I.messages || [], r.value = I.group_name;
          const re = o.value.find((B) => String(B.username) === String(c.currentUser));
          re && (re.status = "online"), _(), gn(() => {
            d.value && (d.value.scrollTop = d.value.scrollHeight);
          });
        }
      } catch (M) {
        console.error("Error fetching data:", M);
      }
    }, _ = () => {
      gn(() => {
        d.value && (d.value.scrollTop = d.value.scrollHeight);
      });
    }, k = () => {
      console.log("Starting video call..."), alert("Video call feature coming soon!");
    }, R = ye(() => o.value.filter((H) => H.status === "online").length);
    En(() => {
      const H = window.location.pathname.split("/");
      n.value = H.filter((re) => re !== "").pop();
      const M = `ws://127.0.0.1:8000/ws/chat/${n.value}/`, I = `http://127.0.0.1:8000/chat/api/${n.value}/`;
      m(I), t.value = new WebSocket(M), t.value.onmessage = (re) => {
        const B = JSON.parse(re.data);
        if (B.type === "user_status_change") {
          const X = o.value.find(
            (oe) => String(oe.id) === String(B.user_id)
          );
          X && (X.status = B.status);
        } else
          i.value.push({ ...B }), B.message_type === "file" && a.value.unshift({
            id: B.id || Date.now(),
            file_name: B.file_name,
            file_type: B.file_type,
            uploader: B.sender,
            file_url: B.file_url,
            file_size: B.file_size,
            uploaded_at: B.uploaded_at
          }), _();
      };
    }), vr(() => {
      t.value && (console.log("Closing web socket..."), t.value.close());
    });
    const D = () => {
      f.value.trim() && (t.value.send(
        JSON.stringify({
          message: f.value,
          sender: c.currentUser,
          message_type: "text",
          group_id: n.value
        })
      ), f.value = "");
    };
    return (H, M) => ($(), O("div", fh, [
      l("div", uh, [
        l("aside", ph, [
          l("div", hh, [
            M[1] || (M[1] = We('<div class="sidebar-brand" data-v-543c61ff><div class="brand-icon" data-v-543c61ff><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" data-v-543c61ff><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-543c61ff></path></svg></div><span class="brand-name" data-v-543c61ff>StudySync</span></div>', 1)),
            l("div", mh, C(o.value?.length) + " members", 1)
          ]),
          l("div", gh, [
            l("div", bh, [
              M[2] || (M[2] = l("span", { class: "section-title" }, "MEMBERS", -1)),
              l("span", vh, C(R.value) + " online", 1)
            ]),
            l("div", xh, [
              ($(!0), O(le, null, Ee(o.value, (I) => ($(), O("div", {
                key: I.id,
                class: "member-card"
              }, [
                l("div", yh, [
                  l("div", {
                    class: "member-avatar",
                    style: qe({ backgroundColor: u(I.username) })
                  }, C(I.username.charAt(0).toUpperCase()), 5),
                  l("div", {
                    class: xe(["status-dot", I.status])
                  }, null, 2)
                ]),
                l("div", wh, [
                  l("div", _h, C(I.username), 1),
                  l("div", kh, C(I.status === "online" ? "Online" : "Away"), 1)
                ])
              ]))), 128))
            ])
          ])
        ]),
        l("main", Ch, [
          l("div", Sh, [
            l("div", Eh, [
              l("h1", Th, C(r.value), 1),
              l("div", Ah, [
                l("span", Rh, [
                  M[3] || (M[3] = l("svg", {
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
                  ce(" " + C(o.value?.length) + " members ", 1)
                ]),
                l("span", $h, [
                  M[4] || (M[4] = l("span", { class: "online-dot" }, null, -1)),
                  ce(" " + C(R.value) + " online ", 1)
                ])
              ])
            ]),
            l("button", {
              class: "video-button",
              onClick: k,
              title: "Start Video Call"
            }, [...M[5] || (M[5] = [
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
            ($(!0), O(le, null, Ee(i.value, (I) => ($(), O("div", {
              key: I.id,
              class: "message-group"
            }, [
              l("div", {
                class: xe([
                  "message-row",
                  I.sender === e.currentUser ? "own-message" : "peer-message"
                ])
              }, [
                l("div", Oh, [
                  l("div", Ph, [
                    l("span", jh, C(I.sender), 1),
                    l("span", Mh, C(x(I.time)), 1)
                  ]),
                  I.message_type === "text" ? ($(), O("div", Dh, C(I.message), 1)) : I.message_type === "file" ? ($(), O("a", {
                    key: 1,
                    href: "http://127.0.0.1:8000" + I.file_url,
                    download: I.file_name,
                    target: "_blank",
                    class: "file-link"
                  }, [
                    l("div", {
                      class: xe(["file-preview", { "own-file": I.sender === e.currentUser }])
                    }, [
                      l("div", {
                        class: xe(["file-icon-wrapper", I.file_type?.toLowerCase()])
                      }, [
                        I.file_type == "image" ? ($(), O("svg", Ih, [...M[6] || (M[6] = [
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
                        ])])) : I.file_type === "pdf" ? ($(), O("svg", Fh, [...M[7] || (M[7] = [
                          We('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-543c61ff></path><polyline points="14 2 14 8 20 8" data-v-543c61ff></polyline><path d="M9 15h6" data-v-543c61ff></path><path d="M9 18h4" data-v-543c61ff></path><circle cx="16" cy="15" r="1" fill="currentColor" data-v-543c61ff></circle>', 5)
                        ])])) : ($(), O("svg", Lh, [...M[8] || (M[8] = [
                          l("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }, null, -1),
                          l("polyline", { points: "13 2 13 9 20 9" }, null, -1)
                        ])]))
                      ], 2),
                      l("div", Bh, [
                        l("div", Uh, C(I.file_name), 1),
                        l("div", zh, C(I.file_type?.toUpperCase()) + " • " + C(b(I.file_size)), 1)
                      ]),
                      M[9] || (M[9] = We('<div class="file-download-icon" data-v-543c61ff><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-543c61ff><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-543c61ff></path><polyline points="7 10 12 15 17 10" data-v-543c61ff></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-543c61ff></line></svg></div>', 1))
                    ], 2)
                  ], 8, Nh)) : be("", !0)
                ])
              ], 2)
            ]))), 128))
          ], 512),
          l("div", Hh, [
            l("div", Vh, [
              l("button", {
                class: "attach-btn",
                onClick: g
              }, [...M[10] || (M[10] = [
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
                onChange: y
              }, null, 544),
              ot(l("input", {
                type: "text",
                "onUpdate:modelValue": M[0] || (M[0] = (I) => f.value = I),
                onKeyup: Ji(D, ["enter"]),
                placeholder: "Type a message...",
                class: "message-input"
              }, null, 544), [
                [Gt, f.value]
              ]),
              l("button", {
                class: "send-btn",
                onClick: D
              }, [...M[11] || (M[11] = [
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
        l("aside", qh, [
          l("div", Kh, [
            M[12] || (M[12] = l("div", { class: "resources-title" }, [
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
            l("span", Wh, C(a.value.length), 1)
          ]),
          l("div", Jh, [
            ($(!0), O(le, null, Ee(a.value, (I) => ($(), O("a", {
              key: I.id,
              href: "http://127.0.0.1:8000" + I.file_url,
              download: I.file_name,
              target: "_blank",
              class: "resource-item"
            }, [
              l("div", {
                class: xe(["resource-icon", I.file_type?.toLowerCase()])
              }, [...M[13] || (M[13] = [
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
              l("div", Yh, [
                l("div", Xh, C(I.file_name), 1),
                l("div", Zh, [
                  l("span", Qh, C(I.uploader), 1),
                  l("span", em, C(b(I.file_size)), 1)
                ])
              ]),
              M[14] || (M[14] = We('<div class="resource-download" data-v-543c61ff><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-543c61ff><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-543c61ff></path><polyline points="7 10 12 15 17 10" data-v-543c61ff></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-543c61ff></line></svg></div>', 1))
            ], 8, Gh))), 128))
          ])
        ])
      ])
    ]));
  }
}, nm = /* @__PURE__ */ yt(tm, [["styles", [dh]], ["__scopeId", "data-v-543c61ff"]]), sm = ".post-card-improved[data-v-9b85afa3]{background:#fff;border-radius:24px;padding:1.5rem;margin-bottom:1.2rem;border:1px solid #f1f5f9;transition:all .2s;position:relative}.post-card-improved[data-v-9b85afa3]:hover{background:#fff;border-color:#1e3a5f30;transform:translateY(-2px);box-shadow:0 8px 24px -8px #1e3a5f26}.hot-badge-improved[data-v-9b85afa3]{position:absolute;top:1.2rem;right:1.2rem;background:linear-gradient(135deg,#f59e0b,#dc2626);color:#fff;padding:.25rem 1.2rem;border-radius:30px;font-size:.65rem;font-weight:600;display:flex;align-items:center;gap:.3rem;box-shadow:0 4px 10px #dc262640}.hot-badge-improved svg[data-v-9b85afa3]{width:12px;height:12px}.post-header-improved[data-v-9b85afa3]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.post-avatar-improved[data-v-9b85afa3]{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;font-weight:600;flex-shrink:0;position:relative;box-shadow:0 4px 10px #1e3a5f33}.online-badge[data-v-9b85afa3]{position:absolute;bottom:0;right:0;width:12px;height:12px;background:#10b981;border-radius:50%;border:2px solid white}.post-author-improved h4[data-v-9b85afa3]{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:.2rem;display:flex;align-items:center;gap:.5rem}.post-badge-improved[data-v-9b85afa3]{background:#1e3a5f15;color:#1e3a5f;font-size:.65rem;padding:.15rem .7rem;border-radius:30px;font-weight:500}.post-time-improved[data-v-9b85afa3]{font-size:.7rem;color:#64748b;display:flex;align-items:center;gap:.3rem}.post-time-improved svg[data-v-9b85afa3]{width:12px;height:12px}.post-content-improved[data-v-9b85afa3]{margin-bottom:1rem;padding-left:.2rem}.post-content-improved p[data-v-9b85afa3]{font-size:.9rem;color:#1a2e35;line-height:1.6;margin-bottom:.8rem}.post-media-improved[data-v-9b85afa3]{display:flex;align-items:center;gap:1rem;background:#fff;padding:.8rem 1rem;border-radius:18px;margin-bottom:1rem;border:1px solid #e2e8f0;transition:all .2s;cursor:pointer}.post-media-improved[data-v-9b85afa3]:hover{background:#f8fafc;border-color:#1e3a5f40}.media-icon-improved[data-v-9b85afa3]{width:44px;height:44px;background:linear-gradient(135deg,#1e3a5f10,#4f6af510);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#1e3a5f}.media-icon-improved svg[data-v-9b85afa3]{width:22px;height:22px}.media-info-improved[data-v-9b85afa3]{flex:1}.media-info-improved h5[data-v-9b85afa3]{font-size:.85rem;font-weight:600;color:#0f172a;margin-bottom:.15rem}.media-info-improved p[data-v-9b85afa3]{font-size:.7rem;color:#64748b;margin:0}.media-action-improved[data-v-9b85afa3]{width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;color:#1e3a5f;cursor:pointer;transition:all .2s}.media-action-improved[data-v-9b85afa3]:hover{background:#1e3a5f;color:#fff}.media-action-improved svg[data-v-9b85afa3]{width:18px;height:18px}.post-tags-improved[data-v-9b85afa3]{display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}.tag-improved[data-v-9b85afa3]{background:#fff;border:1px solid #e2e8f0;padding:.2rem 1rem;border-radius:40px;font-size:.7rem;color:#1e3a5f;font-weight:500;transition:all .2s;cursor:pointer}.tag-improved[data-v-9b85afa3]:hover{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.post-engagement-improved[data-v-9b85afa3]{display:flex;gap:1.5rem;padding-top:1rem;border-top:1px solid #e2e8f0}.engagement-item[data-v-9b85afa3]{display:flex;align-items:center;gap:.3rem;color:#64748b;font-size:.8rem;transition:all .2s;cursor:pointer;border:none;background:transparent;padding:0}.engagement-item[data-v-9b85afa3]:hover{color:#1e3a5f}.engagement-item.liked[data-v-9b85afa3]{color:#dc2626}.engagement-item.liked svg[data-v-9b85afa3]{fill:#dc2626}.engagement-item svg[data-v-9b85afa3]{width:18px;height:18px}", rm = { class: "post-card-improved" }, om = {
  key: 0,
  class: "hot-badge-improved"
}, im = { class: "post-header-improved" }, am = {
  key: 0,
  class: "online-badge"
}, lm = { class: "post-author-improved" }, cm = {
  key: 0,
  class: "post-badge-improved"
}, dm = { class: "post-time-improved" }, fm = { class: "post-content-improved" }, um = {
  key: 1,
  class: "post-media-improved"
}, pm = {
  key: 2,
  class: "post-tags-improved"
}, hm = { class: "post-engagement-improved" }, mm = ["fill"], gm = {
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
      ], d = c.split("").reduce((u, b) => u + b.charCodeAt(0), 0) % f.length;
      return f[d];
    }, o = (c) => {
      if (!c) return "recently";
      const f = new Date(c), u = /* @__PURE__ */ new Date() - f, b = Math.floor(u / 6e4);
      return b < 1 ? "Just now" : b < 60 ? `${b}m ago` : b < 1440 ? `${Math.floor(b / 60)}h ago` : f.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }, i = () => {
      s("like", n.post);
    }, a = () => {
      s("view-comments", n.post);
    };
    return (c, f) => ($(), O("div", rm, [
      e.post.isHot ? ($(), O("div", om, [...f[0] || (f[0] = [
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
        ce(" Hot ", -1)
      ])])) : be("", !0),
      l("div", im, [
        l("div", {
          class: "post-avatar-improved",
          style: qe({ backgroundColor: r(e.post.author.username) })
        }, [
          ce(C(e.post.author.username.charAt(0).toUpperCase()) + " ", 1),
          e.post.author.isOnline ? ($(), O("span", am)) : be("", !0)
        ], 4),
        l("div", lm, [
          l("h4", null, [
            ce(C(e.post.author.username) + " ", 1),
            e.post.author.id === e.groupCreatorId ? ($(), O("span", cm, "Creator")) : be("", !0)
          ]),
          l("div", dm, [
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
            ce(" " + C(o(e.post.created_at)), 1)
          ])
        ])
      ]),
      l("div", fm, [
        l("p", null, C(e.post.content), 1)
      ]),
      e.post.image ? ($(), O("div", um, [...f[2] || (f[2] = [
        We('<div class="media-icon-improved" data-v-9b85afa3><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-9b85afa3><rect x="2" y="2" width="20" height="20" rx="2" ry="2" data-v-9b85afa3></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-9b85afa3></circle><polyline points="21 15 16 10 5 21" data-v-9b85afa3></polyline></svg></div><div class="media-info-improved" data-v-9b85afa3><h5 data-v-9b85afa3>Image</h5><p data-v-9b85afa3>Click to view full size</p></div><div class="media-action-improved" data-v-9b85afa3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-9b85afa3><polyline points="15 3 21 3 21 9" data-v-9b85afa3></polyline><polyline points="9 21 3 21 3 15" data-v-9b85afa3></polyline><line x1="21" y1="3" x2="14" y2="10" data-v-9b85afa3></line><line x1="3" y1="21" x2="10" y2="14" data-v-9b85afa3></line></svg></div>', 3)
      ])])) : be("", !0),
      e.post.tags && e.post.tags.length ? ($(), O("div", pm, [
        ($(!0), O(le, null, Ee(e.post.tags, (d) => ($(), O("span", {
          key: d,
          class: "tag-improved"
        }, "#" + C(d), 1))), 128))
      ])) : be("", !0),
      l("div", hm, [
        l("button", {
          onClick: i,
          class: xe(["engagement-item", { liked: e.post.isLiked }])
        }, [
          ($(), O("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: e.post.isLiked ? "currentColor" : "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...f[3] || (f[3] = [
            l("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }, null, -1)
          ])], 8, mm)),
          l("span", null, C(e.post.likesCount), 1)
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
          l("span", null, C(e.post.comments?.length || 0), 1)
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
}, ya = /* @__PURE__ */ yt(gm, [["styles", [sm]], ["__scopeId", "data-v-9b85afa3"]]), bm = "@keyframes slideIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}.fade-enter-from,.fade-leave-to{opacity:0}.fade-slide-enter-active{transition:all .25s ease-out}.fade-slide-leave-active{transition:all .2s ease-in}.fade-slide-enter-from{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to{opacity:0;transform:translateY(10px)}.comment-fade-enter-active,.comment-fade-leave-active{transition:all .2s ease}.comment-fade-enter-from{opacity:0;transform:translate(-10px)}.comment-fade-leave-to{opacity:0;transform:translate(10px)}.detail-comments-section{background:#fff;border-radius:28px;padding:1.5rem;border:1px solid #f1f5f9;margin-top:1rem;animation:slideIn .3s ease}.comments-title{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:1.2rem;display:flex;align-items:center;gap:.5rem}.comments-count{background:#1e3a5f1a;padding:.2rem .8rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.comments-list{display:flex;flex-direction:column;gap:1rem;margin-bottom:1.2rem;max-height:300px;overflow-y:auto;padding-right:.5rem}.comments-list::-webkit-scrollbar{width:4px}.comment-item{display:flex;gap:.8rem;animation:slideIn .3s ease}.comment-avatar{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.comment-content{flex:1}.comment-bubble{background:#f8fafc;border-radius:16px;padding:.8rem 1rem;border:1px solid #f1f5f9}.comment-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}.comment-author{font-weight:600;font-size:.75rem;color:#1e3a5f}.comment-time{font-size:.6rem;color:#94a3b8}.comment-text{font-size:.8rem;color:#1e293b;margin:0;line-height:1.5}.comment-actions{display:flex;gap:.5rem;margin-top:.3rem;margin-left:.5rem}.comment-action{display:flex;align-items:center;gap:.3rem;background:transparent;border:none;color:#94a3b8;font-size:.65rem;cursor:pointer;padding:.2rem .5rem;border-radius:30px;transition:all .2s}.comment-action:hover{background:#f1f5f9;color:#1e3a5f}.add-comment-form{display:flex;gap:.8rem;align-items:center;margin-top:1.2rem}.comment-input{flex:1;padding:.6rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.8rem;background:#f8fafc}.comment-input:focus{outline:none;border-color:#1e3a5f;background:#fff}.send-comment-btn{width:36px;height:36px;border-radius:18px;background:#1e3a5f;border:none;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:all .2s;box-shadow:0 8px 12px -4px #1e3a5f33}.send-comment-btn:hover:not(:disabled){background:#14273f;transform:scale(1.05)}.send-comment-btn:disabled{opacity:.5;cursor:not-allowed}", vm = { class: "detail-post-container" }, xm = ["post", "current-user", "group-creator-id"], ym = { class: "detail-comments-section" }, wm = { class: "comments-title" }, _m = { class: "comments-count" }, km = { class: "comments-list" }, Cm = {
  name: "comment-fade",
  tag: "div"
}, Sm = { class: "comment-content" }, Em = { class: "comment-bubble" }, Tm = { class: "comment-header" }, Am = { class: "comment-author" }, Rm = { class: "comment-time" }, $m = { class: "comment-text" }, Om = { class: "comment-actions" }, Pm = ["onClick"], jm = { class: "add-comment-form" }, Mm = ["disabled"], Dm = {
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
    const n = e, s = /* @__PURE__ */ ne(null), r = t, o = (u) => {
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
      const b = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], x = u.split("").reduce((g, y) => g + y.charCodeAt(0), 0) % b.length;
      return b[x];
    }, d = (u) => {
      if (!u) return "";
      const [b, x] = u.split(":"), g = parseInt(b), y = g >= 12 ? "PM" : "AM";
      return `${g % 12 || 12}:${x} ${y}`;
    };
    return (u, b) => ($(), O("div", vm, [
      l("post-card", {
        post: n.selectedPost,
        "current-user": n.currentUser,
        "group-creator-id": n.group.creator?.id,
        onLike: o,
        onDelete: i,
        expanded: !0
      }, null, 40, xm),
      _e(_n, {
        name: "fade-slide",
        appear: ""
      }, {
        default: Jt(() => [
          l("div", ym, [
            l("h3", wm, [
              b[1] || (b[1] = l("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
              ], -1)),
              b[2] || (b[2] = ce(" Comments ", -1)),
              l("span", _m, C(n.selectedPost.comments?.length || 0), 1)
            ]),
            l("div", km, [
              l("transition-group", Cm, [
                ($(!0), O(le, null, Ee(n.selectedPost.comments, (x) => ($(), O("div", {
                  key: x.id,
                  class: "comment-item"
                }, [
                  l("div", {
                    class: "comment-avatar",
                    style: qe({
                      backgroundColor: f(x.author.username)
                    })
                  }, C(x.author.username.charAt(0).toUpperCase()), 5),
                  l("div", Sm, [
                    l("div", Em, [
                      l("div", Tm, [
                        l("span", Am, C(x.author.username), 1),
                        l("span", Rm, C(d(x.created_at)), 1)
                      ]),
                      l("p", $m, C(x.content), 1)
                    ]),
                    l("div", Om, [
                      l("button", {
                        onClick: (g) => a(x),
                        class: "comment-action"
                      }, [
                        b[3] || (b[3] = l("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          l("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
                        ], -1)),
                        l("span", null, C(x.likesCount || 0), 1)
                      ], 8, Pm)
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            _e(_n, { name: "fade" }, {
              default: Jt(() => [
                l("div", jm, [
                  ot(l("input", {
                    type: "text",
                    "onUpdate:modelValue": b[0] || (b[0] = (x) => s.value = x),
                    class: "comment-input",
                    placeholder: "Write a comment...",
                    onKeyup: Ji(c, ["enter"])
                  }, null, 544), [
                    [Gt, s.value]
                  ]),
                  l("button", {
                    class: "send-comment-btn",
                    onClick: c,
                    disabled: !s.value?.trim()
                  }, [...b[4] || (b[4] = [
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
                  ])], 8, Mm)
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
}, wa = /* @__PURE__ */ yt(Dm, [["styles", [bm]]]), Nm = '@keyframes fadeIn-e2754db1{0%{opacity:0}to{opacity:1}}@keyframes slideIn-e2754db1{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes float-e2754db1{0%{transform:translateY(0)}50%{transform:translateY(-2px)}to{transform:translateY(0)}}.fade-enter-active[data-v-e2754db1],.fade-leave-active[data-v-e2754db1]{transition:opacity .2s ease}.fade-enter-from[data-v-e2754db1],.fade-leave-to[data-v-e2754db1]{opacity:0}.fade-slide-enter-active[data-v-e2754db1]{transition:all .25s ease-out}.fade-slide-leave-active[data-v-e2754db1]{transition:all .2s ease-in}.fade-slide-enter-from[data-v-e2754db1]{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to[data-v-e2754db1]{opacity:0;transform:translateY(10px)}.comment-fade-enter-active[data-v-e2754db1],.comment-fade-leave-active[data-v-e2754db1]{transition:all .2s ease}.comment-fade-enter-from[data-v-e2754db1]{opacity:0;transform:translate(-10px)}.comment-fade-leave-to[data-v-e2754db1]{opacity:0;transform:translate(10px)}.group-wrapper[data-v-e2754db1]{min-height:100vh;overflow-x:hidden}.group-fullscreen[data-v-e2754db1]{width:100%;min-height:100vh;background:transparent;font-family:Inter,sans-serif}.group-header[data-v-e2754db1]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:32px;padding:1.5rem 2rem;margin-bottom:2rem;box-shadow:0 20px 35px -10px #0000000d;border:1px solid rgba(255,255,255,.5);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.header-left[data-v-e2754db1]{display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap}.group-avatar[data-v-e2754db1]{width:70px;height:70px;background:linear-gradient(145deg,#1e3a5f,#2d4b75);border-radius:24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2.2rem;font-weight:600;box-shadow:0 15px 25px -8px #1e3a5f4d;position:relative;overflow:hidden;flex-shrink:0}.group-avatar[data-v-e2754db1]:after{content:"";position:absolute;inset:0;background:linear-gradient(145deg,#ffffff1a,#fff0 60%);pointer-events:none}.group-info[data-v-e2754db1]{min-width:0;flex:1}.group-info h1[data-v-e2754db1]{font-size:1.8rem;font-weight:600;color:#0f172a;margin-bottom:.3rem;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.group-meta[data-v-e2754db1]{display:flex;flex-wrap:wrap;gap:1rem;color:#64748b;font-size:.85rem}.group-meta span[data-v-e2754db1]{display:flex;align-items:center;gap:.3rem}.group-meta span svg[data-v-e2754db1]{width:16px;height:16px;stroke:#1e3a5f;opacity:.7}.group-badge[data-v-e2754db1]{background:#f1f5f9cc;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);color:#1e3a5f;padding:.3rem 1rem;border-radius:40px;font-size:.7rem;font-weight:500;display:inline-flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.5)}.group-badge.creator[data-v-e2754db1]{background:#fef3c7cc;color:#92400e}.group-actions[data-v-e2754db1]{display:flex;gap:.5rem;flex-shrink:0}.btn-group[data-v-e2754db1]{padding:.7rem 1.8rem;border-radius:40px;font-size:.85rem;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;transition:all .2s;border:1px solid transparent;cursor:pointer;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}.btn-group.primary[data-v-e2754db1]{background:#1e3a5f;color:#fff;box-shadow:0 8px 16px -6px #1e3a5f33}.btn-group.primary[data-v-e2754db1]:hover{background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.btn-group.outline[data-v-e2754db1]{background:#ffffffb3;color:#1e3a5f;border:1px solid rgba(255,255,255,.8)}.btn-group.outline[data-v-e2754db1]:hover{background:#fff;border-color:#1e3a5f}.two-column[data-v-e2754db1]{display:grid;grid-template-columns:2fr 1fr;gap:2rem}.main-column[data-v-e2754db1]{display:flex;flex-direction:column;gap:1.5rem;height:100%;overflow:hidden}.sidebar-column[data-v-e2754db1]{display:flex;flex-direction:column;gap:1.5rem;overflow-y:auto;padding-right:.5rem}.sidebar-column[data-v-e2754db1]::-webkit-scrollbar{width:4px}.sidebar-column[data-v-e2754db1]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.sidebar-column[data-v-e2754db1]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.compact-card[data-v-e2754db1]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:28px;padding:1.5rem;border:1px solid rgba(255,255,255,.5);box-shadow:0 15px 30px -12px #0000000d;transition:all .3s ease}.compact-card[data-v-e2754db1]:hover{background:#fff;transform:translateY(-2px);box-shadow:0 20px 35px -15px #0000001a}.card-header-compact[data-v-e2754db1]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem}.header-title[data-v-e2754db1]{display:flex;align-items:center;gap:.6rem;font-size:.9rem;font-weight:600;color:#1e293b}.header-title svg[data-v-e2754db1]{width:18px;height:18px;stroke:#1e3a5f;opacity:.7}.header-count[data-v-e2754db1]{background:#1e3a5f1a;padding:.15rem .6rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.header-link[data-v-e2754db1]{color:#1e3a5f;font-size:.7rem;text-decoration:none;padding:.3rem 1rem;border-radius:30px;border:1px solid rgba(226,232,240,.8);background:#ffffff80;transition:all .2s}.header-link[data-v-e2754db1]:hover{background:#fff;border-color:#1e3a5f}.compact-member-list[data-v-e2754db1]{display:flex;flex-direction:column;gap:.8rem}.compact-member-item[data-v-e2754db1]{display:flex;align-items:center;gap:.8rem;padding:.4rem .5rem;border-radius:12px;transition:all .2s}.compact-member-item[data-v-e2754db1]:hover{background:#f8fafcb3}.compact-member-avatar[data-v-e2754db1]{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;position:relative;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.compact-online-indicator[data-v-e2754db1]{position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#10b981;border-radius:50%;border:2px solid white}.compact-member-info[data-v-e2754db1]{flex:1;display:flex;align-items:center;gap:.5rem;font-size:.85rem}.compact-member-name[data-v-e2754db1]{font-weight:600;color:#0f172a}.compact-member-role[data-v-e2754db1]{font-size:.65rem;color:#94a3b8;background:#f1f5f9b3;padding:.15rem .6rem;border-radius:30px}.compact-creator-badge[data-v-e2754db1],.compact-you-badge[data-v-e2754db1]{font-size:.65rem;padding:.15rem .6rem;border-radius:30px;font-weight:500}.compact-creator-badge[data-v-e2754db1]{background:#fef3c7;color:#92400e}.compact-you-badge[data-v-e2754db1]{background:#e0f2fe;color:#0369a1}.compact-session-list[data-v-e2754db1]{display:flex;flex-direction:column;gap:.8rem}.compact-session-item[data-v-e2754db1]{display:flex;align-items:center;gap:.8rem;padding:.6rem 0;border-bottom:1px solid rgba(226,232,240,.5);font-size:.85rem}.compact-session-item[data-v-e2754db1]:last-child{border-bottom:none}.session-time[data-v-e2754db1]{min-width:90px;font-size:.75rem;color:#64748b;font-weight:500}.session-name[data-v-e2754db1]{flex:1;color:#0f172a;font-weight:500}.compact-live-badge[data-v-e2754db1]{background:#dc2626;color:#fff;padding:.2rem .8rem;border-radius:30px;font-size:.6rem;font-weight:600;letter-spacing:.02em;animation:float-e2754db1 2s infinite}.session-attendees[data-v-e2754db1]{font-size:.7rem;color:#64748b;background:#f1f5f9b3;padding:.2rem .8rem;border-radius:30px}.create-post-card[data-v-e2754db1]{background:#fff;border-radius:28px;padding:1.2rem;border:1px solid #f1f5f9;box-shadow:0 15px 30px -12px #0000000d;flex-shrink:0}.create-post-header[data-v-e2754db1]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.create-avatar[data-v-e2754db1]{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem;flex-shrink:0;box-shadow:0 8px 12px -4px #0000001a}.create-post-input[data-v-e2754db1]{flex:1;padding:.8rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.9rem;transition:all .2s;background:#f8fafc}.create-post-input[data-v-e2754db1]:focus{outline:none;border-color:#1e3a5f;background:#fff;box-shadow:0 0 0 3px #1e3a5f1a}.create-post-toolbar[data-v-e2754db1]{display:flex;justify-content:space-between;align-items:center}.toolbar-left[data-v-e2754db1]{display:flex;gap:.5rem}.toolbar-btn[data-v-e2754db1]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border:none;background:transparent;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.toolbar-btn[data-v-e2754db1]:hover{background:#f8fafc;color:#1e3a5f}.toolbar-btn svg[data-v-e2754db1]{width:16px;height:16px}.post-btn[data-v-e2754db1]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1.5rem;background:#1e3a5f;border:none;border-radius:40px;color:#fff;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;box-shadow:0 8px 16px -6px #1e3a5f33}.post-btn[data-v-e2754db1]:hover:not(:disabled){background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.post-btn[data-v-e2754db1]:disabled{opacity:.5;cursor:not-allowed}.hidden-input[data-v-e2754db1]{display:none}.image-preview-container[data-v-e2754db1]{position:relative;margin:.5rem 0;display:inline-block}.image-preview[data-v-e2754db1]{max-height:100px;border-radius:12px;border:1px solid #e2e8f0;background:#fff}.remove-image-btn[data-v-e2754db1]{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#dc2626;border:none;border-radius:10px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.7rem}.posts-feed-scrollable[data-v-e2754db1],.detail-view-scrollable[data-v-e2754db1]{flex:1;overflow-y:auto;padding-right:.8rem}.posts-feed-scrollable[data-v-e2754db1]::-webkit-scrollbar,.detail-view-scrollable[data-v-e2754db1]::-webkit-scrollbar{width:4px}.posts-feed-scrollable[data-v-e2754db1]::-webkit-scrollbar-track,.detail-view-scrollable[data-v-e2754db1]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.posts-feed-scrollable[data-v-e2754db1]::-webkit-scrollbar-thumb,.detail-view-scrollable[data-v-e2754db1]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.view-header[data-v-e2754db1]{margin-bottom:.5rem}.back-to-feed[data-v-e2754db1]{display:inline-flex;align-items:center;gap:.3rem;padding:.3rem 1rem;background:#fff;border:1px solid #e2e8f0;border-radius:30px;color:#1e3a5f;font-size:.75rem;cursor:pointer;transition:all .2s}.back-to-feed[data-v-e2754db1]:hover{background:#f8fafc;border-color:#1e3a5f}@media(max-width:1200px){.two-column[data-v-e2754db1]{grid-template-columns:1fr;height:auto}.main-column[data-v-e2754db1]{max-height:600px}.sidebar-column[data-v-e2754db1]{max-height:400px}}@media(max-width:768px){.group-fullscreen[data-v-e2754db1]{padding:1rem}.group-header[data-v-e2754db1]{flex-direction:column;align-items:flex-start;gap:1rem}.group-info h1[data-v-e2754db1]{white-space:normal}.create-post-toolbar[data-v-e2754db1]{flex-direction:column;gap:.8rem}.toolbar-left[data-v-e2754db1],.post-btn[data-v-e2754db1]{width:100%;justify-content:center}}', Im = { class: "group-wrapper" }, Fm = { class: "group-fullscreen" }, Lm = { class: "group-header" }, Bm = { class: "header-left" }, Um = { class: "group-avatar" }, zm = { class: "group-info" }, Hm = { class: "group-meta" }, Vm = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, qm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Km = {
  key: 2,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Wm = {
  key: 1,
  class: "group-badge creator"
}, Jm = { class: "group-actions" }, Gm = ["href"], Ym = { class: "two-column" }, Xm = { class: "main-column" }, Zm = { class: "create-post-card" }, Qm = { class: "create-post-header" }, e1 = {
  key: 0,
  class: "image-preview-container"
}, t1 = ["src"], n1 = { class: "create-post-toolbar" }, s1 = ["disabled"], r1 = {
  key: 0,
  class: "view-header"
}, o1 = {
  key: "feed",
  class: "posts-feed-scrollable"
}, i1 = {
  key: "detail",
  class: "detail-view-scrollable"
}, a1 = { class: "sidebar-column" }, l1 = { class: "compact-card" }, c1 = { class: "card-header-compact" }, d1 = { class: "header-title" }, f1 = { class: "header-count" }, u1 = { class: "compact-member-list" }, p1 = {
  key: 0,
  class: "compact-online-indicator"
}, h1 = { class: "compact-member-info" }, m1 = { class: "compact-member-name" }, g1 = { class: "compact-member-role" }, b1 = {
  key: 0,
  class: "compact-creator-badge"
}, v1 = {
  key: 1,
  class: "compact-you-badge"
}, x1 = { class: "compact-card" }, y1 = { class: "compact-session-list" }, w1 = {
  key: 0,
  class: "compact-session-item"
}, _1 = { class: "session-time" }, k1 = {
  __name: "GroupPage.ce",
  setup(e) {
    Q.defaults.xsrfCookieName = "csrftoken", Q.defaults.xsrfHeaderName = "X-CSRFToken", Q.defaults.withCredentials = !0;
    const t = /* @__PURE__ */ ne(null), n = /* @__PURE__ */ ne(null), s = /* @__PURE__ */ ne(null), r = /* @__PURE__ */ ne([
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
      const j = window.location.pathname.split("/").filter((Z) => Z !== ""), G = j[j.length - 1];
      try {
        const Z = await Q.get(`/api/groups/${G}`);
        console.log(Z.data.group), t.value = Z.data.group, s.value = Z.data.members, n.value = Z.data.current_user;
      } catch (Z) {
        console.error("Error fetching group details.", Z);
      }
    };
    En(() => {
      o();
    });
    const i = /* @__PURE__ */ ne(""), a = /* @__PURE__ */ ne(null), c = /* @__PURE__ */ ne(null), f = /* @__PURE__ */ ne(null), d = /* @__PURE__ */ ne("feed"), u = /* @__PURE__ */ ne(null), b = /* @__PURE__ */ ne(""), x = ye(() => t.value.creator?.id === n.value.id), g = ye(() => s.value.some((z) => z.id === n.value.id)), y = ye(() => s.value.slice(0, 5)), m = ye(() => [...r.value].sort(
      (z, j) => new Date(j.created_at) - new Date(z.created_at)
    )), _ = async ({ postId: z, comment: j }) => {
      try {
        const G = await Q.post(`/api/posts/${z}/comment`, {
          content: j
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
    }, k = () => {
    }, R = () => {
    }, D = () => {
    }, H = (z) => {
      const j = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], G = z.split("").reduce((Z, ve) => Z + ve.charCodeAt(0), 0) % j.length;
      return j[G];
    }, M = (z) => z ? new Date(z).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) : "Unknown", I = (z) => {
      if (!z) return "";
      const [j, G] = z.split(":"), Z = parseInt(j), ve = Z >= 12 ? "PM" : "AM";
      return `${Z % 12 || 12}:${G} ${ve}`;
    }, re = (z) => ({
      major: "Major-Based",
      course: "Course-Based",
      general: "General Study"
    })[z] || "General Study", B = () => {
      f.value?.click();
    }, X = (z) => {
      const j = z.target;
      if (!j || !j.files.length) return;
      const G = j.files[0];
      if (G) {
        c.value = G;
        const Z = new FileReader();
        Z.onload = (ve) => {
          a.value = ve.target.result;
        }, Z.readAsDataURL(G);
      }
    }, oe = () => {
      a.value = null, c.value = null, f.value && (f.value.value = "");
    }, U = async () => {
      if (!i.value.trim() && !a.value) return;
      try {
        const j = new FormData();
        j.append("content", i.value.trim()), j.append("image", c.value);
        const G = await Q.post(
          `/groups/${t.id}/post/create`,
          j
        );
        if (G.status === 200 || G.status === 201) {
          const Z = G.data;
          console.log(Z);
        }
        console.log("Uploaded successfully:", G.data);
      } catch (j) {
        console.log("Error creating post.", j);
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
      r.value.unshift(z), i.value = "", oe();
    }, se = (z) => {
      z.isLiked = !z.isLiked, z.likesCount += z.isLiked ? 1 : -1;
    }, he = (z) => {
      if (confirm(
        z.author.id === n.id ? "Delete your post?" : "Remove this post?"
      )) {
        const j = r.value.findIndex((G) => G.id === z.id);
        j !== -1 && r.value.splice(j, 1), d.value === "detail" && u.value?.id === z.id && ee();
      }
    }, Pe = (z) => {
      u.value = z, d.value = "detail", b.value = "";
    }, ee = () => {
      d.value = "feed", u.value = null, b.value = "";
    }, ue = () => {
      confirm("Are you sure you want to leave this group?") && console.log("Leaving group:", t.id);
    };
    return (z, j) => ($(), O("div", Im, [
      l("div", Fm, [
        l("div", Lm, [
          l("div", Bm, [
            l("div", Um, C(t.value.name.charAt(0).toUpperCase()), 1),
            l("div", zm, [
              l("h1", null, C(t.value.name), 1),
              l("div", Hm, [
                l("span", null, [
                  j[1] || (j[1] = We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e2754db1><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-e2754db1></rect><line x1="16" y1="2" x2="16" y2="6" data-v-e2754db1></line><line x1="8" y1="2" x2="8" y2="6" data-v-e2754db1></line><line x1="3" y1="10" x2="21" y2="10" data-v-e2754db1></line></svg>', 1)),
                  ce(" Created " + C(M(t.value.created_at)), 1)
                ]),
                l("span", null, [
                  j[2] || (j[2] = l("svg", {
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
                  ce(" " + C(t.value.member_count) + " / " + C(t.value.max_members) + " members ", 1)
                ]),
                t.value.group_type ? ($(), O("span", {
                  key: 0,
                  class: xe(["group-badge", t.value.group_type])
                }, [
                  t.value.group_type === "major" ? ($(), O("svg", Vm, [...j[3] || (j[3] = [
                    l("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }, null, -1)
                  ])])) : t.value.group_type === "course" ? ($(), O("svg", qm, [...j[4] || (j[4] = [
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
                  ])])) : ($(), O("svg", Km, [...j[5] || (j[5] = [
                    l("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }, null, -1),
                    l("circle", {
                      cx: "9",
                      cy: "7",
                      r: "4"
                    }, null, -1),
                    l("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }, null, -1),
                    l("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }, null, -1)
                  ])])),
                  ce(" " + C(re(t.value.group_type)), 1)
                ], 2)) : be("", !0),
                x.value ? ($(), O("span", Wm, [...j[6] || (j[6] = [
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
                  ce(" Creator ", -1)
                ])])) : be("", !0)
              ])
            ])
          ]),
          l("div", Jm, [
            l("a", {
              href: `/chat/${t.value.id}`,
              class: "btn-group primary"
            }, [...j[7] || (j[7] = [
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
              ce(" Chat ", -1)
            ])], 8, Gm),
            g.value ? ($(), O("button", {
              key: 0,
              onClick: ue,
              class: "btn-group outline"
            }, [...j[8] || (j[8] = [
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
              ce(" Leave ", -1)
            ])])) : be("", !0)
          ])
        ]),
        l("div", Ym, [
          l("div", Xm, [
            l("div", Zm, [
              l("div", Qm, [
                l("div", {
                  class: "create-avatar",
                  style: qe({
                    backgroundColor: H(n.value.username)
                  })
                }, C(n.value.username.charAt(0).toUpperCase()), 5),
                ot(l("input", {
                  type: "text",
                  class: "create-post-input",
                  placeholder: "What's on your mind? Share something with the group...",
                  "onUpdate:modelValue": j[0] || (j[0] = (G) => i.value = G)
                }, null, 512), [
                  [Gt, i.value]
                ])
              ]),
              a.value ? ($(), O("div", e1, [
                l("img", {
                  src: a.value,
                  class: "image-preview",
                  alt: "Preview"
                }, null, 8, t1),
                l("button", {
                  class: "remove-image-btn",
                  onClick: oe
                }, [...j[9] || (j[9] = [
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
              ])) : be("", !0),
              l("div", n1, [
                l("div", { class: "toolbar-left" }, [
                  l("button", {
                    class: "toolbar-btn",
                    onClick: B
                  }, [...j[10] || (j[10] = [
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
                  j[11] || (j[11] = l("button", { class: "toolbar-btn" }, [
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
                  onClick: U,
                  disabled: !i.value.trim() && !a.value
                }, [...j[12] || (j[12] = [
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
                ])], 8, s1)
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
            _e(_n, { name: "fade-slide" }, {
              default: Jt(() => [
                d.value === "detail" ? ($(), O("div", r1, [
                  l("button", {
                    class: "back-to-feed",
                    onClick: ee
                  }, [...j[13] || (j[13] = [
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
                    ce(" Back to Feed ", -1)
                  ])])
                ])) : be("", !0)
              ]),
              _: 1
            }),
            _e(_n, {
              name: "fade",
              mode: "out-in"
            }, {
              default: Jt(() => [
                d.value === "feed" ? ($(), O("div", o1, [
                  ($(!0), O(le, null, Ee(m.value, (G) => ($(), ts(ya, {
                    key: G.id,
                    post: G,
                    "current-user": n.value,
                    "group-creator-id": t.value.creator?.id,
                    onLike: se,
                    onDelete: he,
                    onViewComments: Pe
                  }, null, 8, ["post", "current-user", "group-creator-id"]))), 128))
                ])) : d.value === "detail" ? ($(), O("div", i1, [
                  _e(wa, {
                    "selected-post": u.value,
                    "current-user": n.value,
                    group: t.value,
                    onAddComment: _,
                    onPostLike: D,
                    onDelete: R,
                    onCommentLike: k
                  }, null, 8, ["selected-post", "current-user", "group"])
                ])) : be("", !0)
              ]),
              _: 1
            })
          ]),
          l("div", a1, [
            l("div", l1, [
              l("div", c1, [
                l("div", d1, [
                  j[14] || (j[14] = l("svg", {
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
                  j[15] || (j[15] = l("span", null, "Members", -1)),
                  l("span", f1, C(t.value.member_count), 1)
                ]),
                j[16] || (j[16] = l("a", {
                  href: "#",
                  class: "header-link"
                }, "View all", -1))
              ]),
              l("div", u1, [
                ($(!0), O(le, null, Ee(y.value, (G) => ($(), O("div", {
                  key: G.id,
                  class: "compact-member-item"
                }, [
                  l("div", {
                    class: "compact-member-avatar",
                    style: qe({ backgroundColor: H(G.username) })
                  }, [
                    ce(C(G.username.charAt(0).toUpperCase()) + " ", 1),
                    G.isOnline ? ($(), O("span", p1)) : be("", !0)
                  ], 4),
                  l("div", h1, [
                    l("span", m1, C(G.username), 1),
                    l("span", g1, C(G.role), 1)
                  ]),
                  G.id === t.value.creator?.id ? ($(), O("span", b1, "👑")) : G.id === n.value.id ? ($(), O("span", v1, "you")) : be("", !0)
                ]))), 128))
              ])
            ]),
            l("div", x1, [
              j[20] || (j[20] = We('<div class="card-header-compact" data-v-e2754db1><div class="header-title" data-v-e2754db1><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e2754db1><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-e2754db1></rect><line x1="16" y1="2" x2="16" y2="6" data-v-e2754db1></line><line x1="8" y1="2" x2="8" y2="6" data-v-e2754db1></line><line x1="3" y1="10" x2="21" y2="10" data-v-e2754db1></line></svg><span data-v-e2754db1>Sessions</span></div></div>', 1)),
              l("div", y1, [
                t.value.study_day ? ($(), O("div", w1, [
                  l("div", _1, C(t.value.study_day.substring(0, 3)) + " • " + C(I(t.value.start_time)), 1),
                  j[17] || (j[17] = l("div", { class: "session-name" }, "Regular Meeting", -1)),
                  j[18] || (j[18] = l("span", { class: "compact-live-badge" }, "Live", -1))
                ])) : be("", !0),
                j[19] || (j[19] = We('<div class="compact-session-item" data-v-e2754db1><div class="session-time" data-v-e2754db1>WED • 3:30 PM</div><div class="session-name" data-v-e2754db1>Practice Problems</div><span class="session-attendees" data-v-e2754db1>5 going</span></div><div class="compact-session-item" data-v-e2754db1><div class="session-time" data-v-e2754db1>FRI • 2:00 PM</div><div class="session-name" data-v-e2754db1>Midterm Prep</div><span class="session-attendees" data-v-e2754db1>12 going</span></div>', 2))
              ])
            ])
          ])
        ])
      ])
    ]));
  }
}, C1 = /* @__PURE__ */ yt(k1, [["styles", [Nm]], ["__scopeId", "data-v-e2754db1"]]), S1 = /* @__PURE__ */ xt(va), E1 = /* @__PURE__ */ xt(Nu), T1 = /* @__PURE__ */ xt(xa), A1 = /* @__PURE__ */ xt(ep), R1 = /* @__PURE__ */ xt(ch), $1 = /* @__PURE__ */ xt(nm), O1 = /* @__PURE__ */ xt(ya), P1 = /* @__PURE__ */ xt(C1), j1 = /* @__PURE__ */ xt(wa);
customElements.define("gallery-card", S1);
customElements.define("find-partner-view", E1);
customElements.define("gallery-card-compact", T1);
customElements.define("inbound-request", A1);
customElements.define("admin-dashboard", R1);
customElements.define("chat-room", $1);
customElements.define("post-card", O1);
customElements.define("group-page", P1);
customElements.define("post-details", j1);
