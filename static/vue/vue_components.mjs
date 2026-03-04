// @__NO_SIDE_EFFECTS__
function ar(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const fe = {}, Yt = [], it = () => {
}, Ns = () => !1, fo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ir = (e) => e.startsWith("onUpdate:"), be = Object.assign, lr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, wi = Object.prototype.hasOwnProperty, ae = (e, t) => wi.call(e, t), V = Array.isArray, Gt = (e) => $n(e) === "[object Map]", uo = (e) => $n(e) === "[object Set]", jr = (e) => $n(e) === "[object Date]", G = (e) => typeof e == "function", xe = (e) => typeof e == "string", lt = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", Is = (e) => (le(e) || G(e)) && G(e.then) && G(e.catch), Ls = Object.prototype.toString, $n = (e) => Ls.call(e), _i = (e) => $n(e).slice(8, -1), po = (e) => $n(e) === "[object Object]", dr = (e) => xe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, un = /* @__PURE__ */ ar(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ho = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ki = /-\w/g, Ye = ho(
  (e) => e.replace(ki, (t) => t.slice(1).toUpperCase())
), Ci = /\B([A-Z])/g, Fe = ho(
  (e) => e.replace(Ci, "-$1").toLowerCase()
), Bs = ho((e) => e.charAt(0).toUpperCase() + e.slice(1)), To = ho(
  (e) => e ? `on${Bs(e)}` : ""
), At = (e, t) => !Object.is(e, t), Un = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Fs = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, mo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ho = (e) => {
  const t = xe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Mr;
const go = () => Mr || (Mr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ke(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = xe(o) ? Ai(o) : ke(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (xe(e) || le(e))
    return e;
}
const Si = /;(?![^(]*\))/g, Ei = /:([^]+)/, $i = /\/\*[^]*?\*\//g;
function Ai(e) {
  const t = {};
  return e.replace($i, "").split(Si).forEach((n) => {
    if (n) {
      const o = n.split(Ei);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function me(e) {
  let t = "";
  if (xe(e))
    t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const o = me(e[n]);
      o && (t += o + " ");
    }
  else if (le(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ti = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ri = /* @__PURE__ */ ar(Ti);
function zs(e) {
  return !!e || e === "";
}
function Oi(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = An(e[o], t[o]);
  return n;
}
function An(e, t) {
  if (e === t) return !0;
  let n = jr(e), o = jr(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = lt(e), o = lt(t), n || o)
    return e === t;
  if (n = V(e), o = V(t), n || o)
    return n && o ? Oi(e, t) : !1;
  if (n = le(e), o = le(t), n || o) {
    if (!n || !o)
      return !1;
    const r = Object.keys(e).length, s = Object.keys(t).length;
    if (r !== s)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), d = t.hasOwnProperty(i);
      if (l && !d || !l && d || !An(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Pi(e, t) {
  return e.findIndex((n) => An(n, t));
}
const Us = (e) => !!(e && e.__v_isRef === !0), S = (e) => xe(e) ? e : e == null ? "" : V(e) || le(e) && (e.toString === Ls || !G(e.toString)) ? Us(e) ? S(e.value) : JSON.stringify(e, Hs, 2) : String(e), Hs = (e, t) => Us(t) ? Hs(e, t.value) : Gt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], s) => (n[Ro(o, s) + " =>"] = r, n),
    {}
  )
} : uo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ro(n))
} : lt(t) ? Ro(t) : le(t) && !V(t) && !po(t) ? String(t) : t, Ro = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    lt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let De;
class ji {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = De, !t && De && (this.index = (De.scopes || (De.scopes = [])).push(
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
      const n = De;
      try {
        return De = this, t();
      } finally {
        De = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = De, De = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (De = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
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
function Mi() {
  return De;
}
let he;
const Oo = /* @__PURE__ */ new WeakSet();
class Vs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, De && De.active && De.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Oo.has(this) && (Oo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ks(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Dr(this), Ws(this);
    const t = he, n = Ge;
    he = this, Ge = !0;
    try {
      return this.fn();
    } finally {
      Js(this), he = t, Ge = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ur(t);
      this.deps = this.depsTail = void 0, Dr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Oo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Vo(this) && this.run();
  }
  get dirty() {
    return Vo(this);
  }
}
let qs = 0, pn, hn;
function Ks(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = hn, hn = e;
    return;
  }
  e.next = pn, pn = e;
}
function cr() {
  qs++;
}
function fr() {
  if (--qs > 0)
    return;
  if (hn) {
    let t = hn;
    for (hn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; pn; ) {
    let t = pn;
    for (pn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ws(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Js(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const r = o.prevDep;
    o.version === -1 ? (o === n && (n = r), ur(o), Di(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = r;
  }
  e.deps = t, e.depsTail = n;
}
function Vo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ys(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ys(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xn) || (e.globalVersion = xn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Vo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = he, o = Ge;
  he = e, Ge = !0;
  try {
    Ws(e);
    const r = e.fn(e._value);
    (t.version === 0 || At(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    he = n, Ge = o, Js(e), e.flags &= -3;
  }
}
function ur(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: r } = e;
  if (o && (o.nextSub = r, e.prevSub = void 0), r && (r.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      ur(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Di(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ge = !0;
const Gs = [];
function vt() {
  Gs.push(Ge), Ge = !1;
}
function bt() {
  const e = Gs.pop();
  Ge = e === void 0 ? !0 : e;
}
function Dr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = he;
    he = void 0;
    try {
      t();
    } finally {
      he = n;
    }
  }
}
let xn = 0;
class Ni {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class pr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!he || !Ge || he === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== he)
      n = this.activeLink = new Ni(he, this), he.deps ? (n.prevDep = he.depsTail, he.depsTail.nextDep = n, he.depsTail = n) : he.deps = he.depsTail = n, Xs(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = he.depsTail, n.nextDep = void 0, he.depsTail.nextDep = n, he.depsTail = n, he.deps === n && (he.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, xn++, this.notify(t);
  }
  notify(t) {
    cr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      fr();
    }
  }
}
function Xs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Xs(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const qo = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ Symbol(
  ""
), Ko = /* @__PURE__ */ Symbol(
  ""
), yn = /* @__PURE__ */ Symbol(
  ""
);
function Ce(e, t, n) {
  if (Ge && he) {
    let o = qo.get(e);
    o || qo.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || (o.set(n, r = new pr()), r.map = o, r.key = n), r.track();
  }
}
function ht(e, t, n, o, r, s) {
  const i = qo.get(e);
  if (!i) {
    xn++;
    return;
  }
  const l = (d) => {
    d && d.trigger();
  };
  if (cr(), t === "clear")
    i.forEach(l);
  else {
    const d = V(e), f = d && dr(n);
    if (d && n === "length") {
      const c = Number(o);
      i.forEach((p, x) => {
        (x === "length" || x === yn || !lt(x) && x >= c) && l(p);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), f && l(i.get(yn)), t) {
        case "add":
          d ? f && l(i.get("length")) : (l(i.get(zt)), Gt(e) && l(i.get(Ko)));
          break;
        case "delete":
          d || (l(i.get(zt)), Gt(e) && l(i.get(Ko)));
          break;
        case "set":
          Gt(e) && l(i.get(zt));
          break;
      }
  }
  fr();
}
function Wt(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e ? t : (Ce(t, "iterate", yn), /* @__PURE__ */ Je(e) ? t : t.map(Xe));
}
function vo(e) {
  return Ce(e = /* @__PURE__ */ se(e), "iterate", yn), e;
}
function St(e, t) {
  return /* @__PURE__ */ xt(e) ? en(/* @__PURE__ */ Ut(e) ? Xe(t) : t) : Xe(t);
}
const Ii = {
  __proto__: null,
  [Symbol.iterator]() {
    return Po(this, Symbol.iterator, (e) => St(this, e));
  },
  concat(...e) {
    return Wt(this).concat(
      ...e.map((t) => V(t) ? Wt(t) : t)
    );
  },
  entries() {
    return Po(this, "entries", (e) => (e[1] = St(this, e[1]), e));
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
      (n) => n.map((o) => St(this, o)),
      arguments
    );
  },
  find(e, t) {
    return ct(
      this,
      "find",
      e,
      t,
      (n) => St(this, n),
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
      (n) => St(this, n),
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
    return jo(this, "includes", e);
  },
  indexOf(...e) {
    return jo(this, "indexOf", e);
  },
  join(e) {
    return Wt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return jo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return an(this, "pop");
  },
  push(...e) {
    return an(this, "push", e);
  },
  reduce(e, ...t) {
    return Nr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Nr(this, "reduceRight", e, t);
  },
  shift() {
    return an(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return an(this, "splice", e);
  },
  toReversed() {
    return Wt(this).toReversed();
  },
  toSorted(e) {
    return Wt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Wt(this).toSpliced(...e);
  },
  unshift(...e) {
    return an(this, "unshift", e);
  },
  values() {
    return Po(this, "values", (e) => St(this, e));
  }
};
function Po(e, t, n) {
  const o = vo(e), r = o[t]();
  return o !== e && !/* @__PURE__ */ Je(e) && (r._next = r.next, r.next = () => {
    const s = r._next();
    return s.done || (s.value = n(s.value)), s;
  }), r;
}
const Li = Array.prototype;
function ct(e, t, n, o, r, s) {
  const i = vo(e), l = i !== e && !/* @__PURE__ */ Je(e), d = i[t];
  if (d !== Li[t]) {
    const p = d.apply(e, s);
    return l ? Xe(p) : p;
  }
  let f = n;
  i !== e && (l ? f = function(p, x) {
    return n.call(this, St(e, p), x, e);
  } : n.length > 2 && (f = function(p, x) {
    return n.call(this, p, x, e);
  }));
  const c = d.call(i, f, o);
  return l && r ? r(c) : c;
}
function Nr(e, t, n, o) {
  const r = vo(e);
  let s = n;
  return r !== e && (/* @__PURE__ */ Je(e) ? n.length > 3 && (s = function(i, l, d) {
    return n.call(this, i, l, d, e);
  }) : s = function(i, l, d) {
    return n.call(this, i, St(e, l), d, e);
  }), r[t](s, ...o);
}
function jo(e, t, n) {
  const o = /* @__PURE__ */ se(e);
  Ce(o, "iterate", yn);
  const r = o[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ vr(n[0]) ? (n[0] = /* @__PURE__ */ se(n[0]), o[t](...n)) : r;
}
function an(e, t, n = []) {
  vt(), cr();
  const o = (/* @__PURE__ */ se(e))[t].apply(e, n);
  return fr(), bt(), o;
}
const Bi = /* @__PURE__ */ ar("__proto__,__v_isRef,__isVue"), Zs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(lt)
);
function Fi(e) {
  lt(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return Ce(t, "has", e), t.hasOwnProperty(e);
}
class Qs {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return o === (r ? s ? Gi : oa : s ? na : ta).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = V(t);
    if (!r) {
      let d;
      if (i && (d = Ii[n]))
        return d;
      if (n === "hasOwnProperty")
        return Fi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Ee(t) ? t : o
    );
    if ((lt(n) ? Zs.has(n) : Bi(n)) || (r || Ce(t, "get", n), s))
      return l;
    if (/* @__PURE__ */ Ee(l)) {
      const d = i && dr(n) ? l : l.value;
      return r && le(d) ? /* @__PURE__ */ Jo(d) : d;
    }
    return le(l) ? r ? /* @__PURE__ */ Jo(l) : /* @__PURE__ */ mr(l) : l;
  }
}
class ea extends Qs {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    const i = V(t) && dr(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ xt(s);
      if (!/* @__PURE__ */ Je(o) && !/* @__PURE__ */ xt(o) && (s = /* @__PURE__ */ se(s), o = /* @__PURE__ */ se(o)), !i && /* @__PURE__ */ Ee(s) && !/* @__PURE__ */ Ee(o))
        return f || (s.value = o), !0;
    }
    const l = i ? Number(n) < t.length : ae(t, n), d = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ Ee(t) ? t : r
    );
    return t === /* @__PURE__ */ se(r) && (l ? At(o, s) && ht(t, "set", n, o) : ht(t, "add", n, o)), d;
  }
  deleteProperty(t, n) {
    const o = ae(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && o && ht(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!lt(n) || !Zs.has(n)) && Ce(t, "has", n), o;
  }
  ownKeys(t) {
    return Ce(
      t,
      "iterate",
      V(t) ? "length" : zt
    ), Reflect.ownKeys(t);
  }
}
class zi extends Qs {
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
const Ui = /* @__PURE__ */ new ea(), Hi = /* @__PURE__ */ new zi(), Vi = /* @__PURE__ */ new ea(!0);
const Wo = (e) => e, In = (e) => Reflect.getPrototypeOf(e);
function qi(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = /* @__PURE__ */ se(r), i = Gt(s), l = e === "entries" || e === Symbol.iterator && i, d = e === "keys" && i, f = r[e](...o), c = n ? Wo : t ? en : Xe;
    return !t && Ce(
      s,
      "iterate",
      d ? Ko : zt
    ), be(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: p, done: x } = f.next();
          return x ? { value: p, done: x } : {
            value: l ? [c(p[0]), c(p[1])] : c(p),
            done: x
          };
        }
      }
    );
  };
}
function Ln(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ki(e, t) {
  const n = {
    get(r) {
      const s = this.__v_raw, i = /* @__PURE__ */ se(s), l = /* @__PURE__ */ se(r);
      e || (At(r, l) && Ce(i, "get", r), Ce(i, "get", l));
      const { has: d } = In(i), f = t ? Wo : e ? en : Xe;
      if (d.call(i, r))
        return f(s.get(r));
      if (d.call(i, l))
        return f(s.get(l));
      s !== i && s.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ce(/* @__PURE__ */ se(r), "iterate", zt), r.size;
    },
    has(r) {
      const s = this.__v_raw, i = /* @__PURE__ */ se(s), l = /* @__PURE__ */ se(r);
      return e || (At(r, l) && Ce(i, "has", r), Ce(i, "has", l)), r === l ? s.has(r) : s.has(r) || s.has(l);
    },
    forEach(r, s) {
      const i = this, l = i.__v_raw, d = /* @__PURE__ */ se(l), f = t ? Wo : e ? en : Xe;
      return !e && Ce(d, "iterate", zt), l.forEach((c, p) => r.call(s, f(c), f(p), i));
    }
  };
  return be(
    n,
    e ? {
      add: Ln("add"),
      set: Ln("set"),
      delete: Ln("delete"),
      clear: Ln("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Je(r) && !/* @__PURE__ */ xt(r) && (r = /* @__PURE__ */ se(r));
        const s = /* @__PURE__ */ se(this);
        return In(s).has.call(s, r) || (s.add(r), ht(s, "add", r, r)), this;
      },
      set(r, s) {
        !t && !/* @__PURE__ */ Je(s) && !/* @__PURE__ */ xt(s) && (s = /* @__PURE__ */ se(s));
        const i = /* @__PURE__ */ se(this), { has: l, get: d } = In(i);
        let f = l.call(i, r);
        f || (r = /* @__PURE__ */ se(r), f = l.call(i, r));
        const c = d.call(i, r);
        return i.set(r, s), f ? At(s, c) && ht(i, "set", r, s) : ht(i, "add", r, s), this;
      },
      delete(r) {
        const s = /* @__PURE__ */ se(this), { has: i, get: l } = In(s);
        let d = i.call(s, r);
        d || (r = /* @__PURE__ */ se(r), d = i.call(s, r)), l && l.call(s, r);
        const f = s.delete(r);
        return d && ht(s, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ se(this), s = r.size !== 0, i = r.clear();
        return s && ht(
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
    n[r] = qi(r, e, t);
  }), n;
}
function hr(e, t) {
  const n = Ki(e, t);
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    ae(n, r) && r in o ? n : o,
    r,
    s
  );
}
const Wi = {
  get: /* @__PURE__ */ hr(!1, !1)
}, Ji = {
  get: /* @__PURE__ */ hr(!1, !0)
}, Yi = {
  get: /* @__PURE__ */ hr(!0, !1)
};
const ta = /* @__PURE__ */ new WeakMap(), na = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap();
function Xi(e) {
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
function Zi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Xi(_i(e));
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
  return /* @__PURE__ */ xt(e) ? e : gr(
    e,
    !1,
    Ui,
    Wi,
    ta
  );
}
// @__NO_SIDE_EFFECTS__
function Qi(e) {
  return gr(
    e,
    !1,
    Vi,
    Ji,
    na
  );
}
// @__NO_SIDE_EFFECTS__
function Jo(e) {
  return gr(
    e,
    !0,
    Hi,
    Yi,
    oa
  );
}
function gr(e, t, n, o, r) {
  if (!le(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = Zi(e);
  if (s === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    s === 2 ? o : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
  return /* @__PURE__ */ xt(e) ? /* @__PURE__ */ Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function xt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function vr(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function el(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && Fs(e, "__v_skip", !0), e;
}
const Xe = (e) => le(e) ? /* @__PURE__ */ mr(e) : e, en = (e) => le(e) ? /* @__PURE__ */ Jo(e) : e;
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  return ra(e, !1);
}
// @__NO_SIDE_EFFECTS__
function tl(e) {
  return ra(e, !0);
}
function ra(e, t) {
  return /* @__PURE__ */ Ee(e) ? e : new nl(e, t);
}
class nl {
  constructor(t, n) {
    this.dep = new pr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ se(t), this._value = n ? t : Xe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ Je(t) || /* @__PURE__ */ xt(t);
    t = o ? t : /* @__PURE__ */ se(t), At(t, n) && (this._rawValue = t, this._value = o ? t : Xe(t), this.dep.trigger());
  }
}
function sa(e) {
  return /* @__PURE__ */ Ee(e) ? e.value : e;
}
const ol = {
  get: (e, t, n) => t === "__v_raw" ? e : sa(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return /* @__PURE__ */ Ee(r) && !/* @__PURE__ */ Ee(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function aa(e) {
  return /* @__PURE__ */ Ut(e) ? e : new Proxy(e, ol);
}
class rl {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new pr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return Ks(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Ys(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function sl(e, t, n = !1) {
  let o, r;
  return G(e) ? o = e : (o = e.get, r = e.set), new rl(o, r, n);
}
const Bn = {}, Xn = /* @__PURE__ */ new WeakMap();
let It;
function al(e, t = !1, n = It) {
  if (n) {
    let o = Xn.get(n);
    o || Xn.set(n, o = []), o.push(e);
  }
}
function il(e, t, n = fe) {
  const { immediate: o, deep: r, once: s, scheduler: i, augmentJob: l, call: d } = n, f = (I) => r ? I : /* @__PURE__ */ Je(I) || r === !1 || r === 0 ? mt(I, 1) : mt(I);
  let c, p, x, w, v = !1, k = !1;
  if (/* @__PURE__ */ Ee(e) ? (p = () => e.value, v = /* @__PURE__ */ Je(e)) : /* @__PURE__ */ Ut(e) ? (p = () => f(e), v = !0) : V(e) ? (k = !0, v = e.some((I) => /* @__PURE__ */ Ut(I) || /* @__PURE__ */ Je(I)), p = () => e.map((I) => {
    if (/* @__PURE__ */ Ee(I))
      return I.value;
    if (/* @__PURE__ */ Ut(I))
      return f(I);
    if (G(I))
      return d ? d(I, 2) : I();
  })) : G(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (x) {
      vt();
      try {
        x();
      } finally {
        bt();
      }
    }
    const I = It;
    It = c;
    try {
      return d ? d(e, 3, [w]) : e(w);
    } finally {
      It = I;
    }
  } : p = it, t && r) {
    const I = p, F = r === !0 ? 1 / 0 : r;
    p = () => mt(I(), F);
  }
  const b = Mi(), E = () => {
    c.stop(), b && b.active && lr(b.effects, c);
  };
  if (s && t) {
    const I = t;
    t = (...F) => {
      I(...F), E();
    };
  }
  let $ = k ? new Array(e.length).fill(Bn) : Bn;
  const j = (I) => {
    if (!(!(c.flags & 1) || !c.dirty && !I))
      if (t) {
        const F = c.run();
        if (r || v || (k ? F.some((N, M) => At(N, $[M])) : At(F, $))) {
          x && x();
          const N = It;
          It = c;
          try {
            const M = [
              F,
              // pass undefined as the old value when it's changed for the first time
              $ === Bn ? void 0 : k && $[0] === Bn ? [] : $,
              w
            ];
            $ = F, d ? d(t, 3, M) : (
              // @ts-expect-error
              t(...M)
            );
          } finally {
            It = N;
          }
        }
      } else
        c.run();
  };
  return l && l(j), c = new Vs(p), c.scheduler = i ? () => i(j, !1) : j, w = (I) => al(I, !1, c), x = c.onStop = () => {
    const I = Xn.get(c);
    if (I) {
      if (d)
        d(I, 4);
      else
        for (const F of I) F();
      Xn.delete(c);
    }
  }, t ? o ? j(!0) : $ = c.run() : i ? i(j.bind(null, !0), !0) : c.run(), E.pause = c.pause.bind(c), E.resume = c.resume.bind(c), E.stop = E, E;
}
function mt(e, t = 1 / 0, n) {
  if (t <= 0 || !le(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Ee(e))
    mt(e.value, t, n);
  else if (V(e))
    for (let o = 0; o < e.length; o++)
      mt(e[o], t, n);
  else if (uo(e) || Gt(e))
    e.forEach((o) => {
      mt(o, t, n);
    });
  else if (po(e)) {
    for (const o in e)
      mt(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && mt(e[o], t, n);
  }
  return e;
}
function Tn(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    bo(r, t, n);
  }
}
function Ze(e, t, n, o) {
  if (G(e)) {
    const r = Tn(e, t, n, o);
    return r && Is(r) && r.catch((s) => {
      bo(s, t, n);
    }), r;
  }
  if (V(e)) {
    const r = [];
    for (let s = 0; s < e.length; s++)
      r.push(Ze(e[s], t, n, o));
    return r;
  }
}
function bo(e, t, n, o = !0) {
  const r = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || fe;
  if (t) {
    let l = t.parent;
    const d = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, d, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (s) {
      vt(), Tn(s, null, 10, [
        e,
        d,
        f
      ]), bt();
      return;
    }
  }
  ll(e, n, r, o, i);
}
function ll(e, t, n, o = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Ae = [];
let rt = -1;
const Xt = [];
let Et = null, Jt = 0;
const ia = /* @__PURE__ */ Promise.resolve();
let Zn = null;
function wn(e) {
  const t = Zn || ia;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function dl(e) {
  let t = rt + 1, n = Ae.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = Ae[o], s = _n(r);
    s < e || s === e && r.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function br(e) {
  if (!(e.flags & 1)) {
    const t = _n(e), n = Ae[Ae.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= _n(n) ? Ae.push(e) : Ae.splice(dl(t), 0, e), e.flags |= 1, la();
  }
}
function la() {
  Zn || (Zn = ia.then(ca));
}
function cl(e) {
  V(e) ? Xt.push(...e) : Et && e.id === -1 ? Et.splice(Jt + 1, 0, e) : e.flags & 1 || (Xt.push(e), e.flags |= 1), la();
}
function Ir(e, t, n = rt + 1) {
  for (; n < Ae.length; n++) {
    const o = Ae[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Ae.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function da(e) {
  if (Xt.length) {
    const t = [...new Set(Xt)].sort(
      (n, o) => _n(n) - _n(o)
    );
    if (Xt.length = 0, Et) {
      Et.push(...t);
      return;
    }
    for (Et = t, Jt = 0; Jt < Et.length; Jt++) {
      const n = Et[Jt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Et = null, Jt = 0;
  }
}
const _n = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ca(e) {
  try {
    for (rt = 0; rt < Ae.length; rt++) {
      const t = Ae[rt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Tn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; rt < Ae.length; rt++) {
      const t = Ae[rt];
      t && (t.flags &= -2);
    }
    rt = -1, Ae.length = 0, da(), Zn = null, (Ae.length || Xt.length) && ca();
  }
}
let Ke = null, fa = null;
function Qn(e) {
  const t = Ke;
  return Ke = e, fa = e && e.type.__scopeId || null, t;
}
function gt(e, t = Ke, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && no(-1);
    const s = Qn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Qn(s), o._d && no(1);
    }
    return i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function qe(e, t) {
  if (Ke === null)
    return e;
  const n = ko(Ke), o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [s, i, l, d = fe] = t[r];
    s && (G(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && mt(i), o.push({
      dir: s,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: d
    }));
  }
  return e;
}
function jt(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    s && (l.oldValue = s[i].value);
    let d = l.dir[o];
    d && (vt(), Ze(d, n, 8, [
      e.el,
      l,
      e,
      t
    ]), bt());
  }
}
function fl(e, t) {
  if (Re) {
    let n = Re.provides;
    const o = Re.parent && Re.parent.provides;
    o === n && (n = Re.provides = Object.create(o)), n[e] = t;
  }
}
function Hn(e, t, n = !1) {
  const o = Ua();
  if (o || Zt) {
    let r = Zt ? Zt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && G(t) ? t.call(o && o.proxy) : t;
  }
}
const ul = /* @__PURE__ */ Symbol.for("v-scx"), pl = () => Hn(ul);
function Vn(e, t, n) {
  return ua(e, t, n);
}
function ua(e, t, n = fe) {
  const { immediate: o, deep: r, flush: s, once: i } = n, l = be({}, n), d = t && o || !t && s !== "post";
  let f;
  if (Sn) {
    if (s === "sync") {
      const w = pl();
      f = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!d) {
      const w = () => {
      };
      return w.stop = it, w.resume = it, w.pause = it, w;
    }
  }
  const c = Re;
  l.call = (w, v, k) => Ze(w, c, v, k);
  let p = !1;
  s === "post" ? l.scheduler = (w) => {
    Me(w, c && c.suspense);
  } : s !== "sync" && (p = !0, l.scheduler = (w, v) => {
    v ? w() : br(w);
  }), l.augmentJob = (w) => {
    t && (w.flags |= 4), p && (w.flags |= 2, c && (w.id = c.uid, w.i = c));
  };
  const x = il(e, t, l);
  return Sn && (f ? f.push(x) : d && x()), x;
}
function hl(e, t, n) {
  const o = this.proxy, r = xe(e) ? e.includes(".") ? pa(o, e) : () => o[e] : e.bind(o, o);
  let s;
  G(t) ? s = t : (s = t.handler, n = t);
  const i = On(this), l = ua(r, s.bind(o), n);
  return i(), l;
}
function pa(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
const ml = /* @__PURE__ */ Symbol("_vte"), ha = (e) => e.__isTeleport, st = /* @__PURE__ */ Symbol("_leaveCb"), ln = /* @__PURE__ */ Symbol("_enterCb");
function gl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Rn(() => {
    e.isMounted = !0;
  }), _a(() => {
    e.isUnmounting = !0;
  }), e;
}
const He = [Function, Array], ma = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: He,
  onEnter: He,
  onAfterEnter: He,
  onEnterCancelled: He,
  // leave
  onBeforeLeave: He,
  onLeave: He,
  onAfterLeave: He,
  onLeaveCancelled: He,
  // appear
  onBeforeAppear: He,
  onAppear: He,
  onAfterAppear: He,
  onAppearCancelled: He
}, ga = (e) => {
  const t = e.subTree;
  return t.component ? ga(t.component) : t;
}, vl = {
  name: "BaseTransition",
  props: ma,
  setup(e, { slots: t }) {
    const n = Ua(), o = gl();
    return () => {
      const r = t.default && xa(t.default(), !0);
      if (!r || !r.length)
        return;
      const s = va(r), i = /* @__PURE__ */ se(e), { mode: l } = i;
      if (o.isLeaving)
        return Mo(s);
      const d = Lr(s);
      if (!d)
        return Mo(s);
      let f = Yo(
        d,
        i,
        o,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (p) => f = p
      );
      d.type !== Te && kn(d, f);
      let c = n.subTree && Lr(n.subTree);
      if (c && c.type !== Te && !Lt(c, d) && ga(n).type !== Te) {
        let p = Yo(
          c,
          i,
          o,
          n
        );
        if (kn(c, p), l === "out-in" && d.type !== Te)
          return o.isLeaving = !0, p.afterLeave = () => {
            o.isLeaving = !1, n.job.flags & 8 || n.update(), delete p.afterLeave, c = void 0;
          }, Mo(s);
        l === "in-out" && d.type !== Te ? p.delayLeave = (x, w, v) => {
          const k = ba(
            o,
            c
          );
          k[String(c.key)] = c, x[st] = () => {
            w(), x[st] = void 0, delete f.delayedLeave, c = void 0;
          }, f.delayedLeave = () => {
            v(), delete f.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return s;
    };
  }
};
function va(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Te) {
        t = n;
        break;
      }
  }
  return t;
}
const bl = vl;
function ba(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function Yo(e, t, n, o, r) {
  const {
    appear: s,
    mode: i,
    persisted: l = !1,
    onBeforeEnter: d,
    onEnter: f,
    onAfterEnter: c,
    onEnterCancelled: p,
    onBeforeLeave: x,
    onLeave: w,
    onAfterLeave: v,
    onLeaveCancelled: k,
    onBeforeAppear: b,
    onAppear: E,
    onAfterAppear: $,
    onAppearCancelled: j
  } = t, I = String(e.key), F = ba(n, e), N = (z, J) => {
    z && Ze(
      z,
      o,
      9,
      J
    );
  }, M = (z, J) => {
    const ie = J[1];
    N(z, J), V(z) ? z.every((U) => U.length <= 1) && ie() : z.length <= 1 && ie();
  }, Q = {
    mode: i,
    persisted: l,
    beforeEnter(z) {
      let J = d;
      if (!n.isMounted)
        if (s)
          J = b || d;
        else
          return;
      z[st] && z[st](
        !0
        /* cancelled */
      );
      const ie = F[I];
      ie && Lt(e, ie) && ie.el[st] && ie.el[st](), N(J, [z]);
    },
    enter(z) {
      let J = f, ie = c, U = p;
      if (!n.isMounted)
        if (s)
          J = E || f, ie = $ || c, U = j || p;
        else
          return;
      let re = !1;
      z[ln] = (Oe) => {
        re || (re = !0, Oe ? N(U, [z]) : N(ie, [z]), Q.delayedLeave && Q.delayedLeave(), z[ln] = void 0);
      };
      const ue = z[ln].bind(null, !1);
      J ? M(J, [z, ue]) : ue();
    },
    leave(z, J) {
      const ie = String(e.key);
      if (z[ln] && z[ln](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return J();
      N(x, [z]);
      let U = !1;
      z[st] = (ue) => {
        U || (U = !0, J(), ue ? N(k, [z]) : N(v, [z]), z[st] = void 0, F[ie] === e && delete F[ie]);
      };
      const re = z[st].bind(null, !1);
      F[ie] = e, w ? M(w, [z, re]) : re();
    },
    clone(z) {
      const J = Yo(
        z,
        t,
        n,
        o,
        r
      );
      return r && r(J), J;
    }
  };
  return Q;
}
function Mo(e) {
  if (xo(e))
    return e = Rt(e), e.children = null, e;
}
function Lr(e) {
  if (!xo(e))
    return ha(e.type) && e.children ? va(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && G(n.default))
      return n.default();
  }
}
function kn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, kn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function xa(e, t = !1, n) {
  let o = [], r = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === oe ? (i.patchFlag & 128 && r++, o = o.concat(
      xa(i.children, t, l)
    )) : (t || i.type !== Te) && o.push(l != null ? Rt(i, { key: l }) : i);
  }
  if (r > 1)
    for (let s = 0; s < o.length; s++)
      o[s].patchFlag = -2;
  return o;
}
// @__NO_SIDE_EFFECTS__
function xl(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    be({ name: e.name }, t, { setup: e })
  ) : e;
}
function ya(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Br(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const eo = /* @__PURE__ */ new WeakMap();
function mn(e, t, n, o, r = !1) {
  if (V(e)) {
    e.forEach(
      (k, b) => mn(
        k,
        t && (V(t) ? t[b] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (gn(o) && !r) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && mn(e, t, n, o.component.subTree);
    return;
  }
  const s = o.shapeFlag & 4 ? ko(o.component) : o.el, i = r ? null : s, { i: l, r: d } = e, f = t && t.r, c = l.refs === fe ? l.refs = {} : l.refs, p = l.setupState, x = /* @__PURE__ */ se(p), w = p === fe ? Ns : (k) => Br(c, k) ? !1 : ae(x, k), v = (k, b) => !(b && Br(c, b));
  if (f != null && f !== d) {
    if (Fr(t), xe(f))
      c[f] = null, w(f) && (p[f] = null);
    else if (/* @__PURE__ */ Ee(f)) {
      const k = t;
      v(f, k.k) && (f.value = null), k.k && (c[k.k] = null);
    }
  }
  if (G(d))
    Tn(d, l, 12, [i, c]);
  else {
    const k = xe(d), b = /* @__PURE__ */ Ee(d);
    if (k || b) {
      const E = () => {
        if (e.f) {
          const $ = k ? w(d) ? p[d] : c[d] : v() || !e.k ? d.value : c[e.k];
          if (r)
            V($) && lr($, s);
          else if (V($))
            $.includes(s) || $.push(s);
          else if (k)
            c[d] = [s], w(d) && (p[d] = c[d]);
          else {
            const j = [s];
            v(d, e.k) && (d.value = j), e.k && (c[e.k] = j);
          }
        } else k ? (c[d] = i, w(d) && (p[d] = i)) : b && (v(d, e.k) && (d.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const $ = () => {
          E(), eo.delete(e);
        };
        $.id = -1, eo.set(e, $), Me($, n);
      } else
        Fr(e), E();
    }
  }
}
function Fr(e) {
  const t = eo.get(e);
  t && (t.flags |= 8, eo.delete(e));
}
go().requestIdleCallback;
go().cancelIdleCallback;
const gn = (e) => !!e.type.__asyncLoader, xo = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  wa(e, "a", t);
}
function wl(e, t) {
  wa(e, "da", t);
}
function wa(e, t, n = Re) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (yo(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      xo(r.parent.vnode) && _l(o, t, n, r), r = r.parent;
  }
}
function _l(e, t, n, o) {
  const r = yo(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  xr(() => {
    lr(o[t], r);
  }, n);
}
function yo(e, t, n = Re, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      vt();
      const l = On(n), d = Ze(t, n, e, i);
      return l(), bt(), d;
    });
    return o ? r.unshift(s) : r.push(s), s;
  }
}
const yt = (e) => (t, n = Re) => {
  (!Sn || e === "sp") && yo(e, (...o) => t(...o), n);
}, kl = yt("bm"), Rn = yt("m"), Cl = yt(
  "bu"
), Sl = yt("u"), _a = yt(
  "bum"
), xr = yt("um"), El = yt(
  "sp"
), $l = yt("rtg"), Al = yt("rtc");
function Tl(e, t = Re) {
  yo("ec", e, t);
}
const Rl = /* @__PURE__ */ Symbol.for("v-ndc");
function we(e, t, n, o) {
  let r;
  const s = n, i = V(e);
  if (i || xe(e)) {
    const l = i && /* @__PURE__ */ Ut(e);
    let d = !1, f = !1;
    l && (d = !/* @__PURE__ */ Je(e), f = /* @__PURE__ */ xt(e), e = vo(e)), r = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      r[c] = t(
        d ? f ? en(Xe(e[c])) : Xe(e[c]) : e[c],
        c,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, s);
  } else if (le(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, d) => t(l, d, void 0, s)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let d = 0, f = l.length; d < f; d++) {
        const c = l[d];
        r[d] = t(e[c], c, d, s);
      }
    }
  else
    r = [];
  return r;
}
const Go = (e) => e ? Ha(e) ? ko(e) : Go(e.parent) : null, vn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ be(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Go(e.parent),
    $root: (e) => Go(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ca(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      br(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = wn.bind(e.proxy)),
    $watch: (e) => hl.bind(e)
  })
), Do = (e, t) => e !== fe && !e.__isScriptSetup && ae(e, t), Ol = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: l, appContext: d } = e;
    if (t[0] !== "$") {
      const x = i[t];
      if (x !== void 0)
        switch (x) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Do(o, t))
          return i[t] = 1, o[t];
        if (r !== fe && ae(r, t))
          return i[t] = 2, r[t];
        if (ae(s, t))
          return i[t] = 3, s[t];
        if (n !== fe && ae(n, t))
          return i[t] = 4, n[t];
        Xo && (i[t] = 0);
      }
    }
    const f = vn[t];
    let c, p;
    if (f)
      return t === "$attrs" && Ce(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== fe && ae(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = d.config.globalProperties, ae(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Do(r, t) ? (r[t] = n, !0) : o !== fe && ae(o, t) ? (o[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, props: s, type: i }
  }, l) {
    let d;
    return !!(n[l] || e !== fe && l[0] !== "$" && ae(e, l) || Do(t, l) || ae(s, l) || ae(o, l) || ae(vn, l) || ae(r.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function zr(e) {
  return V(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Xo = !0;
function Pl(e) {
  const t = Ca(e), n = e.proxy, o = e.ctx;
  Xo = !1, t.beforeCreate && Ur(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: l,
    provide: d,
    inject: f,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: x,
    beforeUpdate: w,
    updated: v,
    activated: k,
    deactivated: b,
    beforeDestroy: E,
    beforeUnmount: $,
    destroyed: j,
    unmounted: I,
    render: F,
    renderTracked: N,
    renderTriggered: M,
    errorCaptured: Q,
    serverPrefetch: z,
    // public API
    expose: J,
    inheritAttrs: ie,
    // assets
    components: U,
    directives: re,
    filters: ue
  } = t;
  if (f && jl(f, o, null), i)
    for (const ce in i) {
      const Z = i[ce];
      G(Z) && (o[ce] = Z.bind(n));
    }
  if (r) {
    const ce = r.call(n, n);
    le(ce) && (e.data = /* @__PURE__ */ mr(ce));
  }
  if (Xo = !0, s)
    for (const ce in s) {
      const Z = s[ce], Ue = G(Z) ? Z.bind(n, n) : G(Z.get) ? Z.get.bind(n, n) : it, kt = !G(Z) && G(Z.set) ? Z.set.bind(n) : it, _e = ve({
        get: Ue,
        set: kt
      });
      Object.defineProperty(o, ce, {
        enumerable: !0,
        configurable: !0,
        get: () => _e.value,
        set: (ye) => _e.value = ye
      });
    }
  if (l)
    for (const ce in l)
      ka(l[ce], o, n, ce);
  if (d) {
    const ce = G(d) ? d.call(n) : d;
    Reflect.ownKeys(ce).forEach((Z) => {
      fl(Z, ce[Z]);
    });
  }
  c && Ur(c, e, "c");
  function ee(ce, Z) {
    V(Z) ? Z.forEach((Ue) => ce(Ue.bind(n))) : Z && ce(Z.bind(n));
  }
  if (ee(kl, p), ee(Rn, x), ee(Cl, w), ee(Sl, v), ee(yl, k), ee(wl, b), ee(Tl, Q), ee(Al, N), ee($l, M), ee(_a, $), ee(xr, I), ee(El, z), V(J))
    if (J.length) {
      const ce = e.exposed || (e.exposed = {});
      J.forEach((Z) => {
        Object.defineProperty(ce, Z, {
          get: () => n[Z],
          set: (Ue) => n[Z] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === it && (e.render = F), ie != null && (e.inheritAttrs = ie), U && (e.components = U), re && (e.directives = re), z && ya(e);
}
function jl(e, t, n = it) {
  V(e) && (e = Zo(e));
  for (const o in e) {
    const r = e[o];
    let s;
    le(r) ? "default" in r ? s = Hn(
      r.from || o,
      r.default,
      !0
    ) : s = Hn(r.from || o) : s = Hn(r), /* @__PURE__ */ Ee(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s;
  }
}
function Ur(e, t, n) {
  Ze(
    V(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ka(e, t, n, o) {
  let r = o.includes(".") ? pa(n, o) : () => n[o];
  if (xe(e)) {
    const s = t[e];
    G(s) && Vn(r, s);
  } else if (G(e))
    Vn(r, e.bind(n));
  else if (le(e))
    if (V(e))
      e.forEach((s) => ka(s, t, n, o));
    else {
      const s = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(s) && Vn(r, s, e);
    }
}
function Ca(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let d;
  return l ? d = l : !r.length && !n && !o ? d = t : (d = {}, r.length && r.forEach(
    (f) => to(d, f, i, !0)
  ), to(d, t, i)), le(t) && s.set(t, d), d;
}
function to(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && to(e, s, n, !0), r && r.forEach(
    (i) => to(e, i, n, !0)
  );
  for (const i in t)
    if (!(o && i === "expose")) {
      const l = Ml[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Ml = {
  data: Hr,
  props: Vr,
  emits: Vr,
  // objects
  methods: fn,
  computed: fn,
  // lifecycle
  beforeCreate: $e,
  created: $e,
  beforeMount: $e,
  mounted: $e,
  beforeUpdate: $e,
  updated: $e,
  beforeDestroy: $e,
  beforeUnmount: $e,
  destroyed: $e,
  unmounted: $e,
  activated: $e,
  deactivated: $e,
  errorCaptured: $e,
  serverPrefetch: $e,
  // assets
  components: fn,
  directives: fn,
  // watch
  watch: Nl,
  // provide / inject
  provide: Hr,
  inject: Dl
};
function Hr(e, t) {
  return t ? e ? function() {
    return be(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Dl(e, t) {
  return fn(Zo(e), Zo(t));
}
function Zo(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function $e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fn(e, t) {
  return e ? be(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Vr(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : be(
    /* @__PURE__ */ Object.create(null),
    zr(e),
    zr(t ?? {})
  ) : t;
}
function Nl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = be(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = $e(e[o], t[o]);
  return n;
}
function Sa() {
  return {
    app: null,
    config: {
      isNativeTag: Ns,
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
let Il = 0;
function Ll(e, t) {
  return function(o, r = null) {
    G(o) || (o = be({}, o)), r != null && !le(r) && (r = null);
    const s = Sa(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let d = !1;
    const f = s.app = {
      _uid: Il++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: gd,
      get config() {
        return s.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return i.has(c) || (c && G(c.install) ? (i.add(c), c.install(f, ...p)) : G(c) && (i.add(c), c(f, ...p))), f;
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), f;
      },
      component(c, p) {
        return p ? (s.components[c] = p, f) : s.components[c];
      },
      directive(c, p) {
        return p ? (s.directives[c] = p, f) : s.directives[c];
      },
      mount(c, p, x) {
        if (!d) {
          const w = f._ceVNode || ge(o, r);
          return w.appContext = s, x === !0 ? x = "svg" : x === !1 && (x = void 0), e(w, c, x), d = !0, f._container = c, c.__vue_app__ = f, ko(w.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        d && (Ze(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, p) {
        return s.provides[c] = p, f;
      },
      runWithContext(c) {
        const p = Zt;
        Zt = f;
        try {
          return c();
        } finally {
          Zt = p;
        }
      }
    };
    return f;
  };
}
let Zt = null;
const Bl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ye(t)}Modifiers`] || e[`${Fe(t)}Modifiers`];
function Fl(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || fe;
  let r = n;
  const s = t.startsWith("update:"), i = s && Bl(o, t.slice(7));
  i && (i.trim && (r = n.map((c) => xe(c) ? c.trim() : c)), i.number && (r = n.map(mo)));
  let l, d = o[l = To(t)] || // also try camelCase event handler (#2249)
  o[l = To(Ye(t))];
  !d && s && (d = o[l = To(Fe(t))]), d && Ze(
    d,
    e,
    6,
    r
  );
  const f = o[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ze(
      f,
      e,
      6,
      r
    );
  }
}
const zl = /* @__PURE__ */ new WeakMap();
function Ea(e, t, n = !1) {
  const o = n ? zl : t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, l = !1;
  if (!G(e)) {
    const d = (f) => {
      const c = Ea(f, t, !0);
      c && (l = !0, be(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !s && !l ? (le(e) && o.set(e, null), null) : (V(s) ? s.forEach((d) => i[d] = null) : be(i, s), le(e) && o.set(e, i), i);
}
function wo(e, t) {
  return !e || !fo(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Fe(t)) || ae(e, t));
}
function qr(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    propsOptions: [s],
    slots: i,
    attrs: l,
    emit: d,
    render: f,
    renderCache: c,
    props: p,
    data: x,
    setupState: w,
    ctx: v,
    inheritAttrs: k
  } = e, b = Qn(e);
  let E, $;
  try {
    if (n.shapeFlag & 4) {
      const I = r || o, F = I;
      E = at(
        f.call(
          F,
          I,
          c,
          p,
          w,
          x,
          v
        )
      ), $ = l;
    } else {
      const I = t;
      E = at(
        I.length > 1 ? I(
          p,
          { attrs: l, slots: i, emit: d }
        ) : I(
          p,
          null
        )
      ), $ = t.props ? l : Ul(l);
    }
  } catch (I) {
    bn.length = 0, bo(I, e, 1), E = ge(Te);
  }
  let j = E;
  if ($ && k !== !1) {
    const I = Object.keys($), { shapeFlag: F } = j;
    I.length && F & 7 && (s && I.some(ir) && ($ = Hl(
      $,
      s
    )), j = Rt(j, $, !1, !0));
  }
  return n.dirs && (j = Rt(j, null, !1, !0), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition && kn(j, n.transition), E = j, Qn(b), E;
}
const Ul = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || fo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Hl = (e, t) => {
  const n = {};
  for (const o in e)
    (!ir(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function Vl(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: l, patchFlag: d } = t, f = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return o ? Kr(o, i, f) : !!i;
    if (d & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const x = c[p];
        if ($a(i, o, x) && !wo(f, x))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? Kr(o, i, f) : !0 : !!i;
  return !1;
}
function Kr(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if ($a(t, e, s) && !wo(n, s))
      return !0;
  }
  return !1;
}
function $a(e, t, n) {
  const o = e[n], r = t[n];
  return n === "style" && le(o) && le(r) ? !An(o, r) : o !== r;
}
function ql({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Aa = {}, Ta = () => Object.create(Aa), Ra = (e) => Object.getPrototypeOf(e) === Aa;
function Kl(e, t, n, o = !1) {
  const r = {}, s = Ta();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Oa(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = o ? r : /* @__PURE__ */ Qi(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function Wl(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ se(r), [d] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let x = c[p];
        if (wo(e.emitsOptions, x))
          continue;
        const w = t[x];
        if (d)
          if (ae(s, x))
            w !== s[x] && (s[x] = w, f = !0);
          else {
            const v = Ye(x);
            r[v] = Qo(
              d,
              l,
              v,
              w,
              e,
              !1
            );
          }
        else
          w !== s[x] && (s[x] = w, f = !0);
      }
    }
  } else {
    Oa(e, t, r, s) && (f = !0);
    let c;
    for (const p in l)
      (!t || // for camelCase
      !ae(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Fe(p)) === p || !ae(t, c))) && (d ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[p] = Qo(
        d,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (s !== l)
      for (const p in s)
        (!t || !ae(t, p)) && (delete s[p], f = !0);
  }
  f && ht(e.attrs, "set", "");
}
function Oa(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let d in t) {
      if (un(d))
        continue;
      const f = t[d];
      let c;
      r && ae(r, c = Ye(d)) ? !s || !s.includes(c) ? n[c] = f : (l || (l = {}))[c] = f : wo(e.emitsOptions, d) || (!(d in o) || f !== o[d]) && (o[d] = f, i = !0);
    }
  if (s) {
    const d = /* @__PURE__ */ se(n), f = l || fe;
    for (let c = 0; c < s.length; c++) {
      const p = s[c];
      n[p] = Qo(
        r,
        d,
        p,
        f[p],
        e,
        !ae(f, p)
      );
    }
  }
  return i;
}
function Qo(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const l = ae(i, "default");
    if (l && o === void 0) {
      const d = i.default;
      if (i.type !== Function && !i.skipFactory && G(d)) {
        const { propsDefaults: f } = r;
        if (n in f)
          o = f[n];
        else {
          const c = On(r);
          o = f[n] = d.call(
            null,
            t
          ), c();
        }
      } else
        o = d;
      r.ce && r.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Fe(n)) && (o = !0));
  }
  return o;
}
const Jl = /* @__PURE__ */ new WeakMap();
function Pa(e, t, n = !1) {
  const o = n ? Jl : t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, l = [];
  let d = !1;
  if (!G(e)) {
    const c = (p) => {
      d = !0;
      const [x, w] = Pa(p, t, !0);
      be(i, x), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!s && !d)
    return le(e) && o.set(e, Yt), Yt;
  if (V(s))
    for (let c = 0; c < s.length; c++) {
      const p = Ye(s[c]);
      Wr(p) && (i[p] = fe);
    }
  else if (s)
    for (const c in s) {
      const p = Ye(c);
      if (Wr(p)) {
        const x = s[c], w = i[p] = V(x) || G(x) ? { type: x } : be({}, x), v = w.type;
        let k = !1, b = !0;
        if (V(v))
          for (let E = 0; E < v.length; ++E) {
            const $ = v[E], j = G($) && $.name;
            if (j === "Boolean") {
              k = !0;
              break;
            } else j === "String" && (b = !1);
          }
        else
          k = G(v) && v.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = k, w[
          1
          /* shouldCastTrue */
        ] = b, (k || ae(w, "default")) && l.push(p);
      }
    }
  const f = [i, l];
  return le(e) && o.set(e, f), f;
}
function Wr(e) {
  return e[0] !== "$" && !un(e);
}
const yr = (e) => e === "_" || e === "_ctx" || e === "$stable", wr = (e) => V(e) ? e.map(at) : [at(e)], Yl = (e, t, n) => {
  if (t._n)
    return t;
  const o = gt((...r) => wr(t(...r)), n);
  return o._c = !1, o;
}, ja = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (yr(r)) continue;
    const s = e[r];
    if (G(s))
      t[r] = Yl(r, s, o);
    else if (s != null) {
      const i = wr(s);
      t[r] = () => i;
    }
  }
}, Ma = (e, t) => {
  const n = wr(t);
  e.slots.default = () => n;
}, Da = (e, t, n) => {
  for (const o in t)
    (n || !yr(o)) && (e[o] = t[o]);
}, Gl = (e, t, n) => {
  const o = e.slots = Ta();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Da(o, t, n), n && Fs(o, "_", r, !0)) : ja(t, o);
  } else t && Ma(e, t);
}, Xl = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = fe;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? s = !1 : Da(r, t, n) : (s = !t.$stable, ja(t, r)), i = t;
  } else t && (Ma(e, t), i = { default: 1 });
  if (s)
    for (const l in r)
      !yr(l) && i[l] == null && delete r[l];
}, Me = nd;
function Zl(e) {
  return Ql(e);
}
function Ql(e, t) {
  const n = go();
  n.__VUE__ = !0;
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: l,
    createComment: d,
    setText: f,
    setElementText: c,
    parentNode: p,
    nextSibling: x,
    setScopeId: w = it,
    insertStaticContent: v
  } = e, k = (h, g, C, R = null, O = null, P = null, L = void 0, y = null, u = !!g.dynamicChildren) => {
    if (h === g)
      return;
    h && !Lt(h, g) && (R = Kt(h), ye(h, O, P, !0), h = null), g.patchFlag === -2 && (u = !1, g.dynamicChildren = null);
    const { type: m, ref: B, shapeFlag: D } = g;
    switch (m) {
      case _o:
        b(h, g, C, R);
        break;
      case Te:
        E(h, g, C, R);
        break;
      case qn:
        h == null && $(g, C, R, L);
        break;
      case oe:
        U(
          h,
          g,
          C,
          R,
          O,
          P,
          L,
          y,
          u
        );
        break;
      default:
        D & 1 ? F(
          h,
          g,
          C,
          R,
          O,
          P,
          L,
          y,
          u
        ) : D & 6 ? re(
          h,
          g,
          C,
          R,
          O,
          P,
          L,
          y,
          u
        ) : (D & 64 || D & 128) && m.process(
          h,
          g,
          C,
          R,
          O,
          P,
          L,
          y,
          u,
          Pt
        );
    }
    B != null && O ? mn(B, h && h.ref, P, g || h, !g) : B == null && h && h.ref != null && mn(h.ref, null, P, h, !0);
  }, b = (h, g, C, R) => {
    if (h == null)
      o(
        g.el = l(g.children),
        C,
        R
      );
    else {
      const O = g.el = h.el;
      g.children !== h.children && f(O, g.children);
    }
  }, E = (h, g, C, R) => {
    h == null ? o(
      g.el = d(g.children || ""),
      C,
      R
    ) : g.el = h.el;
  }, $ = (h, g, C, R) => {
    [h.el, h.anchor] = v(
      h.children,
      g,
      C,
      R,
      h.el,
      h.anchor
    );
  }, j = ({ el: h, anchor: g }, C, R) => {
    let O;
    for (; h && h !== g; )
      O = x(h), o(h, C, R), h = O;
    o(g, C, R);
  }, I = ({ el: h, anchor: g }) => {
    let C;
    for (; h && h !== g; )
      C = x(h), r(h), h = C;
    r(g);
  }, F = (h, g, C, R, O, P, L, y, u) => {
    if (g.type === "svg" ? L = "svg" : g.type === "math" && (L = "mathml"), h == null)
      N(
        g,
        C,
        R,
        O,
        P,
        L,
        y,
        u
      );
    else {
      const m = h.el && h.el._isVueCE ? h.el : null;
      try {
        m && m._beginPatch(), z(
          h,
          g,
          O,
          P,
          L,
          y,
          u
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, N = (h, g, C, R, O, P, L, y) => {
    let u, m;
    const { props: B, shapeFlag: D, transition: H, dirs: W } = h;
    if (u = h.el = i(
      h.type,
      P,
      B && B.is,
      B
    ), D & 8 ? c(u, h.children) : D & 16 && Q(
      h.children,
      u,
      null,
      R,
      O,
      No(h, P),
      L,
      y
    ), W && jt(h, null, R, "created"), M(u, h, h.scopeId, L, R), B) {
      for (const pe in B)
        pe !== "value" && !un(pe) && s(u, pe, null, B[pe], P, R);
      "value" in B && s(u, "value", null, B.value, P), (m = B.onVnodeBeforeMount) && ot(m, R, h);
    }
    W && jt(h, null, R, "beforeMount");
    const ne = ed(O, H);
    ne && H.beforeEnter(u), o(u, g, C), ((m = B && B.onVnodeMounted) || ne || W) && Me(() => {
      m && ot(m, R, h), ne && H.enter(u), W && jt(h, null, R, "mounted");
    }, O);
  }, M = (h, g, C, R, O) => {
    if (C && w(h, C), R)
      for (let P = 0; P < R.length; P++)
        w(h, R[P]);
    if (O) {
      let P = O.subTree;
      if (g === P || Ba(P.type) && (P.ssContent === g || P.ssFallback === g)) {
        const L = O.vnode;
        M(
          h,
          L,
          L.scopeId,
          L.slotScopeIds,
          O.parent
        );
      }
    }
  }, Q = (h, g, C, R, O, P, L, y, u = 0) => {
    for (let m = u; m < h.length; m++) {
      const B = h[m] = y ? pt(h[m]) : at(h[m]);
      k(
        null,
        B,
        g,
        C,
        R,
        O,
        P,
        L,
        y
      );
    }
  }, z = (h, g, C, R, O, P, L) => {
    const y = g.el = h.el;
    let { patchFlag: u, dynamicChildren: m, dirs: B } = g;
    u |= h.patchFlag & 16;
    const D = h.props || fe, H = g.props || fe;
    let W;
    if (C && Mt(C, !1), (W = H.onVnodeBeforeUpdate) && ot(W, C, g, h), B && jt(g, h, C, "beforeUpdate"), C && Mt(C, !0), (D.innerHTML && H.innerHTML == null || D.textContent && H.textContent == null) && c(y, ""), m ? J(
      h.dynamicChildren,
      m,
      y,
      C,
      R,
      No(g, O),
      P
    ) : L || Z(
      h,
      g,
      y,
      null,
      C,
      R,
      No(g, O),
      P,
      !1
    ), u > 0) {
      if (u & 16)
        ie(y, D, H, C, O);
      else if (u & 2 && D.class !== H.class && s(y, "class", null, H.class, O), u & 4 && s(y, "style", D.style, H.style, O), u & 8) {
        const ne = g.dynamicProps;
        for (let pe = 0; pe < ne.length; pe++) {
          const de = ne[pe], Pe = D[de], je = H[de];
          (je !== Pe || de === "value") && s(y, de, Pe, je, O, C);
        }
      }
      u & 1 && h.children !== g.children && c(y, g.children);
    } else !L && m == null && ie(y, D, H, C, O);
    ((W = H.onVnodeUpdated) || B) && Me(() => {
      W && ot(W, C, g, h), B && jt(g, h, C, "updated");
    }, R);
  }, J = (h, g, C, R, O, P, L) => {
    for (let y = 0; y < g.length; y++) {
      const u = h[y], m = g[y], B = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        u.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (u.type === oe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Lt(u, m) || // - In the case of a component, it could contain anything.
        u.shapeFlag & 198) ? p(u.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      k(
        u,
        m,
        B,
        null,
        R,
        O,
        P,
        L,
        !0
      );
    }
  }, ie = (h, g, C, R, O) => {
    if (g !== C) {
      if (g !== fe)
        for (const P in g)
          !un(P) && !(P in C) && s(
            h,
            P,
            g[P],
            null,
            O,
            R
          );
      for (const P in C) {
        if (un(P)) continue;
        const L = C[P], y = g[P];
        L !== y && P !== "value" && s(h, P, y, L, O, R);
      }
      "value" in C && s(h, "value", g.value, C.value, O);
    }
  }, U = (h, g, C, R, O, P, L, y, u) => {
    const m = g.el = h ? h.el : l(""), B = g.anchor = h ? h.anchor : l("");
    let { patchFlag: D, dynamicChildren: H, slotScopeIds: W } = g;
    W && (y = y ? y.concat(W) : W), h == null ? (o(m, C, R), o(B, C, R), Q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      C,
      B,
      O,
      P,
      L,
      y,
      u
    )) : D > 0 && D & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren && h.dynamicChildren.length === H.length ? (J(
      h.dynamicChildren,
      H,
      C,
      O,
      P,
      L,
      y
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || O && g === O.subTree) && Na(
      h,
      g,
      !0
      /* shallow */
    )) : Z(
      h,
      g,
      C,
      B,
      O,
      P,
      L,
      y,
      u
    );
  }, re = (h, g, C, R, O, P, L, y, u) => {
    g.slotScopeIds = y, h == null ? g.shapeFlag & 512 ? O.ctx.activate(
      g,
      C,
      R,
      L,
      u
    ) : ue(
      g,
      C,
      R,
      O,
      P,
      L,
      u
    ) : Oe(h, g, u);
  }, ue = (h, g, C, R, O, P, L) => {
    const y = h.component = dd(
      h,
      R,
      O
    );
    if (xo(h) && (y.ctx.renderer = Pt), cd(y, !1, L), y.asyncDep) {
      if (O && O.registerDep(y, ee, L), !h.el) {
        const u = y.subTree = ge(Te);
        E(null, u, g, C), h.placeholder = u.el;
      }
    } else
      ee(
        y,
        h,
        g,
        C,
        O,
        P,
        L
      );
  }, Oe = (h, g, C) => {
    const R = g.component = h.component;
    if (Vl(h, g, C))
      if (R.asyncDep && !R.asyncResolved) {
        ce(R, g, C);
        return;
      } else
        R.next = g, R.update();
    else
      g.el = h.el, R.vnode = g;
  }, ee = (h, g, C, R, O, P, L) => {
    const y = () => {
      if (h.isMounted) {
        let { next: D, bu: H, u: W, parent: ne, vnode: pe } = h;
        {
          const tt = Ia(h);
          if (tt) {
            D && (D.el = pe.el, ce(h, D, L)), tt.asyncDep.then(() => {
              Me(() => {
                h.isUnmounted || m();
              }, O);
            });
            return;
          }
        }
        let de = D, Pe;
        Mt(h, !1), D ? (D.el = pe.el, ce(h, D, L)) : D = pe, H && Un(H), (Pe = D.props && D.props.onVnodeBeforeUpdate) && ot(Pe, ne, D, pe), Mt(h, !0);
        const je = qr(h), et = h.subTree;
        h.subTree = je, k(
          et,
          je,
          // parent may have changed if it's in a teleport
          p(et.el),
          // anchor may have changed if it's in a fragment
          Kt(et),
          h,
          O,
          P
        ), D.el = je.el, de === null && ql(h, je.el), W && Me(W, O), (Pe = D.props && D.props.onVnodeUpdated) && Me(
          () => ot(Pe, ne, D, pe),
          O
        );
      } else {
        let D;
        const { el: H, props: W } = g, { bm: ne, m: pe, parent: de, root: Pe, type: je } = h, et = gn(g);
        Mt(h, !1), ne && Un(ne), !et && (D = W && W.onVnodeBeforeMount) && ot(D, de, g), Mt(h, !0);
        {
          Pe.ce && Pe.ce._hasShadowRoot() && Pe.ce._injectChildStyle(je);
          const tt = h.subTree = qr(h);
          k(
            null,
            tt,
            C,
            R,
            h,
            O,
            P
          ), g.el = tt.el;
        }
        if (pe && Me(pe, O), !et && (D = W && W.onVnodeMounted)) {
          const tt = g;
          Me(
            () => ot(D, de, tt),
            O
          );
        }
        (g.shapeFlag & 256 || de && gn(de.vnode) && de.vnode.shapeFlag & 256) && h.a && Me(h.a, O), h.isMounted = !0, g = C = R = null;
      }
    };
    h.scope.on();
    const u = h.effect = new Vs(y);
    h.scope.off();
    const m = h.update = u.run.bind(u), B = h.job = u.runIfDirty.bind(u);
    B.i = h, B.id = h.uid, u.scheduler = () => br(B), Mt(h, !0), m();
  }, ce = (h, g, C) => {
    g.component = h;
    const R = h.vnode.props;
    h.vnode = g, h.next = null, Wl(h, g.props, R, C), Xl(h, g.children, C), vt(), Ir(h), bt();
  }, Z = (h, g, C, R, O, P, L, y, u = !1) => {
    const m = h && h.children, B = h ? h.shapeFlag : 0, D = g.children, { patchFlag: H, shapeFlag: W } = g;
    if (H > 0) {
      if (H & 128) {
        kt(
          m,
          D,
          C,
          R,
          O,
          P,
          L,
          y,
          u
        );
        return;
      } else if (H & 256) {
        Ue(
          m,
          D,
          C,
          R,
          O,
          P,
          L,
          y,
          u
        );
        return;
      }
    }
    W & 8 ? (B & 16 && Ot(m, O, P), D !== m && c(C, D)) : B & 16 ? W & 16 ? kt(
      m,
      D,
      C,
      R,
      O,
      P,
      L,
      y,
      u
    ) : Ot(m, O, P, !0) : (B & 8 && c(C, ""), W & 16 && Q(
      D,
      C,
      R,
      O,
      P,
      L,
      y,
      u
    ));
  }, Ue = (h, g, C, R, O, P, L, y, u) => {
    h = h || Yt, g = g || Yt;
    const m = h.length, B = g.length, D = Math.min(m, B);
    let H;
    for (H = 0; H < D; H++) {
      const W = g[H] = u ? pt(g[H]) : at(g[H]);
      k(
        h[H],
        W,
        C,
        null,
        O,
        P,
        L,
        y,
        u
      );
    }
    m > B ? Ot(
      h,
      O,
      P,
      !0,
      !1,
      D
    ) : Q(
      g,
      C,
      R,
      O,
      P,
      L,
      y,
      u,
      D
    );
  }, kt = (h, g, C, R, O, P, L, y, u) => {
    let m = 0;
    const B = g.length;
    let D = h.length - 1, H = B - 1;
    for (; m <= D && m <= H; ) {
      const W = h[m], ne = g[m] = u ? pt(g[m]) : at(g[m]);
      if (Lt(W, ne))
        k(
          W,
          ne,
          C,
          null,
          O,
          P,
          L,
          y,
          u
        );
      else
        break;
      m++;
    }
    for (; m <= D && m <= H; ) {
      const W = h[D], ne = g[H] = u ? pt(g[H]) : at(g[H]);
      if (Lt(W, ne))
        k(
          W,
          ne,
          C,
          null,
          O,
          P,
          L,
          y,
          u
        );
      else
        break;
      D--, H--;
    }
    if (m > D) {
      if (m <= H) {
        const W = H + 1, ne = W < B ? g[W].el : R;
        for (; m <= H; )
          k(
            null,
            g[m] = u ? pt(g[m]) : at(g[m]),
            C,
            ne,
            O,
            P,
            L,
            y,
            u
          ), m++;
      }
    } else if (m > H)
      for (; m <= D; )
        ye(h[m], O, P, !0), m++;
    else {
      const W = m, ne = m, pe = /* @__PURE__ */ new Map();
      for (m = ne; m <= H; m++) {
        const Be = g[m] = u ? pt(g[m]) : at(g[m]);
        Be.key != null && pe.set(Be.key, m);
      }
      let de, Pe = 0;
      const je = H - ne + 1;
      let et = !1, tt = 0;
      const sn = new Array(je);
      for (m = 0; m < je; m++) sn[m] = 0;
      for (m = W; m <= D; m++) {
        const Be = h[m];
        if (Pe >= je) {
          ye(Be, O, P, !0);
          continue;
        }
        let nt;
        if (Be.key != null)
          nt = pe.get(Be.key);
        else
          for (de = ne; de <= H; de++)
            if (sn[de - ne] === 0 && Lt(Be, g[de])) {
              nt = de;
              break;
            }
        nt === void 0 ? ye(Be, O, P, !0) : (sn[nt - ne] = m + 1, nt >= tt ? tt = nt : et = !0, k(
          Be,
          g[nt],
          C,
          null,
          O,
          P,
          L,
          y,
          u
        ), Pe++);
      }
      const Rr = et ? td(sn) : Yt;
      for (de = Rr.length - 1, m = je - 1; m >= 0; m--) {
        const Be = ne + m, nt = g[Be], Or = g[Be + 1], Pr = Be + 1 < B ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Or.el || La(Or)
        ) : R;
        sn[m] === 0 ? k(
          null,
          nt,
          C,
          Pr,
          O,
          P,
          L,
          y,
          u
        ) : et && (de < 0 || m !== Rr[de] ? _e(nt, C, Pr, 2) : de--);
      }
    }
  }, _e = (h, g, C, R, O = null) => {
    const { el: P, type: L, transition: y, children: u, shapeFlag: m } = h;
    if (m & 6) {
      _e(h.component.subTree, g, C, R);
      return;
    }
    if (m & 128) {
      h.suspense.move(g, C, R);
      return;
    }
    if (m & 64) {
      L.move(h, g, C, Pt);
      return;
    }
    if (L === oe) {
      o(P, g, C);
      for (let D = 0; D < u.length; D++)
        _e(u[D], g, C, R);
      o(h.anchor, g, C);
      return;
    }
    if (L === qn) {
      j(h, g, C);
      return;
    }
    if (R !== 2 && m & 1 && y)
      if (R === 0)
        y.beforeEnter(P), o(P, g, C), Me(() => y.enter(P), O);
      else {
        const { leave: D, delayLeave: H, afterLeave: W } = y, ne = () => {
          h.ctx.isUnmounted ? r(P) : o(P, g, C);
        }, pe = () => {
          P._isLeaving && P[st](
            !0
            /* cancelled */
          ), D(P, () => {
            ne(), W && W();
          });
        };
        H ? H(P, ne, pe) : pe();
      }
    else
      o(P, g, C);
  }, ye = (h, g, C, R = !1, O = !1) => {
    const {
      type: P,
      props: L,
      ref: y,
      children: u,
      dynamicChildren: m,
      shapeFlag: B,
      patchFlag: D,
      dirs: H,
      cacheIndex: W
    } = h;
    if (D === -2 && (O = !1), y != null && (vt(), mn(y, null, C, h, !0), bt()), W != null && (g.renderCache[W] = void 0), B & 256) {
      g.ctx.deactivate(h);
      return;
    }
    const ne = B & 1 && H, pe = !gn(h);
    let de;
    if (pe && (de = L && L.onVnodeBeforeUnmount) && ot(de, g, h), B & 6)
      qt(h.component, C, R);
    else {
      if (B & 128) {
        h.suspense.unmount(C, R);
        return;
      }
      ne && jt(h, null, g, "beforeUnmount"), B & 64 ? h.type.remove(
        h,
        g,
        C,
        Pt,
        R
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (P !== oe || D > 0 && D & 64) ? Ot(
        m,
        g,
        C,
        !1,
        !0
      ) : (P === oe && D & 384 || !O && B & 16) && Ot(u, g, C), R && dt(h);
    }
    (pe && (de = L && L.onVnodeUnmounted) || ne) && Me(() => {
      de && ot(de, g, h), ne && jt(h, null, g, "unmounted");
    }, C);
  }, dt = (h) => {
    const { type: g, el: C, anchor: R, transition: O } = h;
    if (g === oe) {
      Le(C, R);
      return;
    }
    if (g === qn) {
      I(h);
      return;
    }
    const P = () => {
      r(C), O && !O.persisted && O.afterLeave && O.afterLeave();
    };
    if (h.shapeFlag & 1 && O && !O.persisted) {
      const { leave: L, delayLeave: y } = O, u = () => L(C, P);
      y ? y(h.el, P, u) : u();
    } else
      P();
  }, Le = (h, g) => {
    let C;
    for (; h !== g; )
      C = x(h), r(h), h = C;
    r(g);
  }, qt = (h, g, C) => {
    const { bum: R, scope: O, job: P, subTree: L, um: y, m: u, a: m } = h;
    Jr(u), Jr(m), R && Un(R), O.stop(), P && (P.flags |= 8, ye(L, h, g, C)), y && Me(y, g), Me(() => {
      h.isUnmounted = !0;
    }, g);
  }, Ot = (h, g, C, R = !1, O = !1, P = 0) => {
    for (let L = P; L < h.length; L++)
      ye(h[L], g, C, R, O);
  }, Kt = (h) => {
    if (h.shapeFlag & 6)
      return Kt(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const g = x(h.anchor || h.el), C = g && g[ml];
    return C ? x(C) : g;
  };
  let on = !1;
  const rn = (h, g, C) => {
    let R;
    h == null ? g._vnode && (ye(g._vnode, null, null, !0), R = g._vnode.component) : k(
      g._vnode || null,
      h,
      g,
      null,
      null,
      null,
      C
    ), g._vnode = h, on || (on = !0, Ir(R), da(), on = !1);
  }, Pt = {
    p: k,
    um: ye,
    m: _e,
    r: dt,
    mt: ue,
    mc: Q,
    pc: Z,
    pbc: J,
    n: Kt,
    o: e
  };
  return {
    render: rn,
    hydrate: void 0,
    createApp: Ll(rn)
  };
}
function No({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Mt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ed(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Na(e, t, n = !1) {
  const o = e.children, r = t.children;
  if (V(o) && V(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let l = r[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[s] = pt(r[s]), l.el = i.el), !n && l.patchFlag !== -2 && Na(i, l)), l.type === _o && (l.patchFlag === -1 && (l = r[s] = pt(l)), l.el = i.el), l.type === Te && !l.el && (l.el = i.el);
    }
}
function td(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, l;
  const d = e.length;
  for (o = 0; o < d; o++) {
    const f = e[o];
    if (f !== 0) {
      if (r = n[n.length - 1], e[r] < f) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        l = s + i >> 1, e[n[l]] < f ? s = l + 1 : i = l;
      f < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Ia(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ia(t);
}
function Jr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function La(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? La(t.subTree) : null;
}
const Ba = (e) => e.__isSuspense;
function nd(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : cl(e);
}
const oe = /* @__PURE__ */ Symbol.for("v-fgt"), _o = /* @__PURE__ */ Symbol.for("v-txt"), Te = /* @__PURE__ */ Symbol.for("v-cmt"), qn = /* @__PURE__ */ Symbol.for("v-stc"), bn = [];
let ze = null;
function A(e = !1) {
  bn.push(ze = e ? null : []);
}
function od() {
  bn.pop(), ze = bn[bn.length - 1] || null;
}
let Cn = 1;
function no(e, t = !1) {
  Cn += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function Fa(e) {
  return e.dynamicChildren = Cn > 0 ? ze || Yt : null, od(), Cn > 0 && ze && ze.push(e), e;
}
function T(e, t, n, o, r, s) {
  return Fa(
    a(
      e,
      t,
      n,
      o,
      r,
      s,
      !0
    )
  );
}
function oo(e, t, n, o, r) {
  return Fa(
    ge(
      e,
      t,
      n,
      o,
      r,
      !0
    )
  );
}
function ro(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const za = ({ key: e }) => e ?? null, Kn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? xe(e) || /* @__PURE__ */ Ee(e) || G(e) ? { i: Ke, r: e, k: t, f: !!n } : e : null);
function a(e, t = null, n = null, o = 0, r = null, s = e === oe ? 0 : 1, i = !1, l = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && za(t),
    ref: t && Kn(t),
    scopeId: fa,
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
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ke
  };
  return l ? (_r(d, n), s & 128 && e.normalize(d)) : n && (d.shapeFlag |= xe(n) ? 8 : 16), Cn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && ze.push(d), d;
}
const ge = rd;
function rd(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === Rl) && (e = Te), ro(e)) {
    const l = Rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && _r(l, n), Cn > 0 && !s && ze && (l.shapeFlag & 6 ? ze[ze.indexOf(e)] = l : ze.push(l)), l.patchFlag = -2, l;
  }
  if (hd(e) && (e = e.__vccOpts), t) {
    t = sd(t);
    let { class: l, style: d } = t;
    l && !xe(l) && (t.class = me(l)), le(d) && (/* @__PURE__ */ vr(d) && !V(d) && (d = be({}, d)), t.style = ke(d));
  }
  const i = xe(e) ? 1 : Ba(e) ? 128 : ha(e) ? 64 : le(e) ? 4 : G(e) ? 2 : 0;
  return a(
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    !0
  );
}
function sd(e) {
  return e ? /* @__PURE__ */ vr(e) || Ra(e) ? be({}, e) : e : null;
}
function Rt(e, t, n = !1, o = !1) {
  const { props: r, ref: s, patchFlag: i, children: l, transition: d } = e, f = t ? ad(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && za(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? V(s) ? s.concat(Kn(t)) : [s, Kn(t)] : Kn(t)
    ) : s,
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
    patchFlag: t && e.type !== oe ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Rt(e.ssContent),
    ssFallback: e.ssFallback && Rt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && o && kn(
    c,
    d.clone(c)
  ), c;
}
function te(e = " ", t = 0) {
  return ge(_o, null, e, t);
}
function We(e, t) {
  const n = ge(qn, null, e);
  return n.staticCount = t, n;
}
function X(e = "", t = !1) {
  return t ? (A(), oo(Te, null, e)) : ge(Te, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? ge(Te) : V(e) ? ge(
    oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ro(e) ? pt(e) : ge(_o, null, String(e));
}
function pt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Rt(e);
}
function _r(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (V(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), _r(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Ra(t) ? t._ctx = Ke : r === 3 && Ke && (Ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else G(t) ? (t = { default: t, _ctx: Ke }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [te(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ad(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = me([t.class, o.class]));
      else if (r === "style")
        t.style = ke([t.style, o.style]);
      else if (fo(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(V(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function ot(e, t, n, o = null) {
  Ze(e, t, 7, [
    n,
    o
  ]);
}
const id = Sa();
let ld = 0;
function dd(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || id, s = {
    uid: ld++,
    vnode: e,
    type: o,
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
    scope: new ji(
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
    propsOptions: Pa(o, r),
    emitsOptions: Ea(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: fe,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: fe,
    data: fe,
    props: fe,
    attrs: fe,
    slots: fe,
    refs: fe,
    setupState: fe,
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Fl.bind(null, s), e.ce && e.ce(s), s;
}
let Re = null;
const Ua = () => Re || Ke;
let so, er;
{
  const e = go(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  so = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Re = n
  ), er = t(
    "__VUE_SSR_SETTERS__",
    (n) => Sn = n
  );
}
const On = (e) => {
  const t = Re;
  return so(e), e.scope.on(), () => {
    e.scope.off(), so(t);
  };
}, Yr = () => {
  Re && Re.scope.off(), so(null);
};
function Ha(e) {
  return e.vnode.shapeFlag & 4;
}
let Sn = !1;
function cd(e, t = !1, n = !1) {
  t && er(t);
  const { props: o, children: r } = e.vnode, s = Ha(e);
  Kl(e, o, s, t), Gl(e, r, n || t);
  const i = s ? fd(e, t) : void 0;
  return t && er(!1), i;
}
function fd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ol);
  const { setup: o } = n;
  if (o) {
    vt();
    const r = e.setupContext = o.length > 1 ? pd(e) : null, s = On(e), i = Tn(
      o,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Is(i);
    if (bt(), s(), (l || e.sp) && !gn(e) && ya(e), l) {
      if (i.then(Yr, Yr), t)
        return i.then((d) => {
          Gr(e, d);
        }).catch((d) => {
          bo(d, e, 0);
        });
      e.asyncDep = i;
    } else
      Gr(e, i);
  } else
    Va(e);
}
function Gr(e, t, n) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) && (e.setupState = aa(t)), Va(e);
}
function Va(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || it);
  {
    const r = On(e);
    vt();
    try {
      Pl(e);
    } finally {
      bt(), r();
    }
  }
}
const ud = {
  get(e, t) {
    return Ce(e, "get", ""), e[t];
  }
};
function pd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ud),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ko(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(aa(el(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in vn)
        return vn[n](e);
    },
    has(t, n) {
      return n in t || n in vn;
    }
  })) : e.proxy;
}
function hd(e) {
  return G(e) && "__vccOpts" in e;
}
const ve = (e, t) => /* @__PURE__ */ sl(e, t, Sn);
function md(e, t, n) {
  try {
    no(-1);
    const o = arguments.length;
    return o === 2 ? le(t) && !V(t) ? ro(t) ? ge(e, null, [t]) : ge(e, t) : ge(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && ro(n) && (n = [n]), ge(e, t, n));
  } finally {
    no(1);
  }
}
const gd = "3.5.28";
let tr;
const Xr = typeof window < "u" && window.trustedTypes;
if (Xr)
  try {
    tr = /* @__PURE__ */ Xr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const qa = tr ? (e) => tr.createHTML(e) : (e) => e, vd = "http://www.w3.org/2000/svg", bd = "http://www.w3.org/1998/Math/MathML", ut = typeof document < "u" ? document : null, Zr = ut && /* @__PURE__ */ ut.createElement("template"), xd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? ut.createElementNS(vd, e) : t === "mathml" ? ut.createElementNS(bd, e) : n ? ut.createElement(e, { is: n }) : ut.createElement(e);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => ut.createTextNode(e),
  createComment: (e) => ut.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ut.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === s || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === s || !(r = r.nextSibling)); )
        ;
    else {
      Zr.innerHTML = qa(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Zr.content;
      if (o === "svg" || o === "mathml") {
        const d = l.firstChild;
        for (; d.firstChild; )
          l.appendChild(d.firstChild);
        l.removeChild(d);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Ct = "transition", dn = "animation", En = /* @__PURE__ */ Symbol("_vtc"), Ka = {
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
}, yd = /* @__PURE__ */ be(
  {},
  ma,
  Ka
), wd = (e) => (e.displayName = "Transition", e.props = yd, e), $t = /* @__PURE__ */ wd(
  (e, { slots: t }) => md(bl, _d(e), t)
), Dt = (e, t = []) => {
  V(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Qr = (e) => e ? V(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function _d(e) {
  const t = {};
  for (const U in e)
    U in Ka || (t[U] = e[U]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: o,
    duration: r,
    enterFromClass: s = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: d = s,
    appearActiveClass: f = i,
    appearToClass: c = l,
    leaveFromClass: p = `${n}-leave-from`,
    leaveActiveClass: x = `${n}-leave-active`,
    leaveToClass: w = `${n}-leave-to`
  } = e, v = kd(r), k = v && v[0], b = v && v[1], {
    onBeforeEnter: E,
    onEnter: $,
    onEnterCancelled: j,
    onLeave: I,
    onLeaveCancelled: F,
    onBeforeAppear: N = E,
    onAppear: M = $,
    onAppearCancelled: Q = j
  } = t, z = (U, re, ue, Oe) => {
    U._enterCancelled = Oe, Nt(U, re ? c : l), Nt(U, re ? f : i), ue && ue();
  }, J = (U, re) => {
    U._isLeaving = !1, Nt(U, p), Nt(U, w), Nt(U, x), re && re();
  }, ie = (U) => (re, ue) => {
    const Oe = U ? M : $, ee = () => z(re, U, ue);
    Dt(Oe, [re, ee]), es(() => {
      Nt(re, U ? d : s), ft(re, U ? c : l), Qr(Oe) || ts(re, o, k, ee);
    });
  };
  return be(t, {
    onBeforeEnter(U) {
      Dt(E, [U]), ft(U, s), ft(U, i);
    },
    onBeforeAppear(U) {
      Dt(N, [U]), ft(U, d), ft(U, f);
    },
    onEnter: ie(!1),
    onAppear: ie(!0),
    onLeave(U, re) {
      U._isLeaving = !0;
      const ue = () => J(U, re);
      ft(U, p), U._enterCancelled ? (ft(U, x), rs(U)) : (rs(U), ft(U, x)), es(() => {
        U._isLeaving && (Nt(U, p), ft(U, w), Qr(I) || ts(U, o, b, ue));
      }), Dt(I, [U, ue]);
    },
    onEnterCancelled(U) {
      z(U, !1, void 0, !0), Dt(j, [U]);
    },
    onAppearCancelled(U) {
      z(U, !0, void 0, !0), Dt(Q, [U]);
    },
    onLeaveCancelled(U) {
      J(U), Dt(F, [U]);
    }
  });
}
function kd(e) {
  if (e == null)
    return null;
  if (le(e))
    return [Io(e.enter), Io(e.leave)];
  {
    const t = Io(e);
    return [t, t];
  }
}
function Io(e) {
  return Ho(e);
}
function ft(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[En] || (e[En] = /* @__PURE__ */ new Set())).add(t);
}
function Nt(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const n = e[En];
  n && (n.delete(t), n.size || (e[En] = void 0));
}
function es(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Cd = 0;
function ts(e, t, n, o) {
  const r = e._endId = ++Cd, s = () => {
    r === e._endId && o();
  };
  if (n != null)
    return setTimeout(s, n);
  const { type: i, timeout: l, propCount: d } = Sd(e, t);
  if (!i)
    return o();
  const f = i + "end";
  let c = 0;
  const p = () => {
    e.removeEventListener(f, x), s();
  }, x = (w) => {
    w.target === e && ++c >= d && p();
  };
  setTimeout(() => {
    c < d && p();
  }, l + 1), e.addEventListener(f, x);
}
function Sd(e, t) {
  const n = window.getComputedStyle(e), o = (v) => (n[v] || "").split(", "), r = o(`${Ct}Delay`), s = o(`${Ct}Duration`), i = ns(r, s), l = o(`${dn}Delay`), d = o(`${dn}Duration`), f = ns(l, d);
  let c = null, p = 0, x = 0;
  t === Ct ? i > 0 && (c = Ct, p = i, x = s.length) : t === dn ? f > 0 && (c = dn, p = f, x = d.length) : (p = Math.max(i, f), c = p > 0 ? i > f ? Ct : dn : null, x = c ? c === Ct ? s.length : d.length : 0);
  const w = c === Ct && /\b(?:transform|all)(?:,|$)/.test(
    o(`${Ct}Property`).toString()
  );
  return {
    type: c,
    timeout: p,
    propCount: x,
    hasTransform: w
  };
}
function ns(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, o) => os(n) + os(e[o])));
}
function os(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function rs(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Ed(e, t, n) {
  const o = e[En];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ss = /* @__PURE__ */ Symbol("_vod"), $d = /* @__PURE__ */ Symbol("_vsh"), Ad = /* @__PURE__ */ Symbol(""), Td = /(?:^|;)\s*display\s*:/;
function Rd(e, t, n) {
  const o = e.style, r = xe(n);
  let s = !1;
  if (n && !r) {
    if (t)
      if (xe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Wn(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Wn(o, i, "");
    for (const i in n)
      i === "display" && (s = !0), Wn(o, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = o[Ad];
      i && (n += ";" + i), o.cssText = n, s = Td.test(n);
    }
  } else t && e.removeAttribute("style");
  ss in e && (e[ss] = s ? o.display : "", e[$d] && (o.display = "none"));
}
const as = /\s*!important$/;
function Wn(e, t, n) {
  if (V(n))
    n.forEach((o) => Wn(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Od(e, t);
    as.test(n) ? e.setProperty(
      Fe(o),
      n.replace(as, ""),
      "important"
    ) : e[o] = n;
  }
}
const is = ["Webkit", "Moz", "ms"], Lo = {};
function Od(e, t) {
  const n = Lo[t];
  if (n)
    return n;
  let o = Ye(t);
  if (o !== "filter" && o in e)
    return Lo[t] = o;
  o = Bs(o);
  for (let r = 0; r < is.length; r++) {
    const s = is[r] + o;
    if (s in e)
      return Lo[t] = s;
  }
  return t;
}
const ls = "http://www.w3.org/1999/xlink";
function ds(e, t, n, o, r, s = Ri(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ls, t.slice(6, t.length)) : e.setAttributeNS(ls, t, n) : n == null || s && !zs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : lt(n) ? String(n) : n
  );
}
function cs(e, t, n, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? qa(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const l = s === "OPTION" ? e.getAttribute("value") || "" : e.value, d = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== d || !("_value" in e)) && (e.value = d), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = zs(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function Bt(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Pd(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const fs = /* @__PURE__ */ Symbol("_vei");
function jd(e, t, n, o, r = null) {
  const s = e[fs] || (e[fs] = {}), i = s[t];
  if (o && i)
    i.value = o;
  else {
    const [l, d] = Md(t);
    if (o) {
      const f = s[t] = Id(
        o,
        r
      );
      Bt(e, l, f, d);
    } else i && (Pd(e, l, i, d), s[t] = void 0);
  }
}
const us = /(?:Once|Passive|Capture)$/;
function Md(e) {
  let t;
  if (us.test(e)) {
    t = {};
    let o;
    for (; o = e.match(us); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Fe(e.slice(2)), t];
}
let Bo = 0;
const Dd = /* @__PURE__ */ Promise.resolve(), Nd = () => Bo || (Dd.then(() => Bo = 0), Bo = Date.now());
function Id(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Ze(
      Ld(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Nd(), n;
}
function Ld(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (r) => !r._stopped && o && o(r)
    );
  } else
    return t;
}
const ps = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Bd = (e, t, n, o, r, s) => {
  const i = r === "svg";
  t === "class" ? Ed(e, o, i) : t === "style" ? Rd(e, n, o) : fo(t) ? ir(t) || jd(e, t, n, o, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Fd(e, t, o, i)) ? (cs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ds(e, t, o, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !xe(o)) ? cs(e, Ye(t), o, s, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), ds(e, t, o, i));
};
function Fd(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ps(t) && G(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return ps(t) && xe(n) ? !1 : t in e;
}
const hs = {};
// @__NO_SIDE_EFFECTS__
function wt(e, t, n) {
  let o = /* @__PURE__ */ xl(e, t);
  po(o) && (o = be({}, o, t));
  class r extends kr {
    constructor(i) {
      super(o, i, n);
    }
  }
  return r.def = o, r;
}
const zd = typeof HTMLElement < "u" ? HTMLElement : class {
};
class kr extends zd {
  constructor(t, n = {}, o = xs) {
    super(), this._def = t, this._props = n, this._createApp = o, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && o !== xs ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      be({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof kr) {
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
    this._connected = !1, wn(() => {
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
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (o, r = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: s, styles: i } = o;
      let l;
      if (s && !V(s))
        for (const d in s) {
          const f = s[d];
          (f === Number || f && f.type === Number) && (d in this._props && (this._props[d] = Ho(this._props[d])), (l || (l = /* @__PURE__ */ Object.create(null)))[Ye(d)] = !0);
        }
      this._numberProps = l, this._resolveProps(o), this.shadowRoot && this._applyStyles(i), this._mount(o);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((o) => {
      o.configureApp = this._def.configureApp, t(this._def = o, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const o in n)
        ae(this, o) || Object.defineProperty(this, o, {
          // unwrap ref to be consistent with public instance behavior
          get: () => sa(n[o])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, o = V(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && o.includes(r) && this._setProp(r, this[r]);
    for (const r of o.map(Ye))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(s) {
          this._setProp(r, s, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let o = n ? this.getAttribute(t) : hs;
    const r = Ye(t);
    n && this._numberProps && this._numberProps[r] && (o = Ho(o)), this._setProp(r, o, !1, !0);
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
  _setProp(t, n, o = !0, r = !1) {
    if (n !== this._props[t] && (this._dirty = !0, n === hs ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), r && this._instance && this._update(), o)) {
      const s = this._ob;
      s && (this._processMutations(s.takeRecords()), s.disconnect()), n === !0 ? this.setAttribute(Fe(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Fe(t), n + "") : n || this.removeAttribute(Fe(t)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Wd(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = ge(this._def, be(t, this._props));
    return this._instance || (n.ce = (o) => {
      this._instance = o, o.ce = this, o.isCE = !0;
      const r = (s, i) => {
        this.dispatchEvent(
          new CustomEvent(
            s,
            po(i[0]) ? be({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      o.emit = (s, ...i) => {
        r(s, i), Fe(s) !== s && r(Fe(s), i);
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
    const o = this._nonce;
    for (let r = t.length - 1; r >= 0; r--) {
      const s = document.createElement("style");
      o && s.setAttribute("nonce", o), s.textContent = t[r], this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const o = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[o] || (t[o] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), n = this._instance.type.__scopeId;
    for (let o = 0; o < t.length; o++) {
      const r = t[o], s = r.getAttribute("name") || "default", i = this._slots[s], l = r.parentNode;
      if (i)
        for (const d of i) {
          if (n && d.nodeType === 1) {
            const f = n + "-s", c = document.createTreeWalker(d, 1);
            d.setAttribute(f, "");
            let p;
            for (; p = c.nextNode(); )
              p.setAttribute(f, "");
          }
          l.insertBefore(d, r);
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
    const n = /* @__PURE__ */ new Set();
    for (const o of t) {
      const r = o.querySelectorAll("slot");
      for (let s = 0; s < r.length; s++)
        n.add(r[s]);
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
const ao = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return V(t) ? (n) => Un(t, n) : t;
};
function Ud(e) {
  e.target.composing = !0;
}
function ms(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Qt = /* @__PURE__ */ Symbol("_assign");
function gs(e, t, n) {
  return t && (e = e.trim()), n && (e = mo(e)), e;
}
const Tt = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e[Qt] = ao(r);
    const s = o || r.props && r.props.type === "number";
    Bt(e, t ? "change" : "input", (i) => {
      i.target.composing || e[Qt](gs(e.value, n, s));
    }), (n || s) && Bt(e, "change", () => {
      e.value = gs(e.value, n, s);
    }), t || (Bt(e, "compositionstart", Ud), Bt(e, "compositionend", ms), Bt(e, "change", ms));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: r, number: s } }, i) {
    if (e[Qt] = ao(i), e.composing) return;
    const l = (s || e.type === "number") && !/^0\d/.test(e.value) ? mo(e.value) : e.value, d = t ?? "";
    l !== d && (document.activeElement === e && e.type !== "range" && (o && t === n || r && e.value.trim() === d) || (e.value = d));
  }
}, Fn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const r = uo(t);
    Bt(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? mo(io(i)) : io(i)
      );
      e[Qt](
        e.multiple ? r ? new Set(s) : s : s[0]
      ), e._assigning = !0, wn(() => {
        e._assigning = !1;
      });
    }), e[Qt] = ao(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    vs(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Qt] = ao(n);
  },
  updated(e, { value: t }) {
    e._assigning || vs(e, t);
  }
};
function vs(e, t) {
  const n = e.multiple, o = V(t);
  if (!(n && !o && !uo(t))) {
    for (let r = 0, s = e.options.length; r < s; r++) {
      const i = e.options[r], l = io(i);
      if (n)
        if (o) {
          const d = typeof l;
          d === "string" || d === "number" ? i.selected = t.some((f) => String(f) === String(l)) : i.selected = Pi(t, l) > -1;
        } else
          i.selected = t.has(l);
      else if (An(io(i), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function io(e) {
  return "_value" in e ? e._value : e.value;
}
const Hd = ["ctrl", "shift", "alt", "meta"], Vd = {
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
  exact: (e, t) => Hd.some((n) => e[`${n}Key`] && !t.includes(n))
}, lo = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((r, ...s) => {
    for (let i = 0; i < t.length; i++) {
      const l = Vd[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...s);
  }));
}, qd = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Wa = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((r) => {
    if (!("key" in r))
      return;
    const s = Fe(r.key);
    if (t.some(
      (i) => i === s || qd[i] === s
    ))
      return e(r);
  }));
}, Kd = /* @__PURE__ */ be({ patchProp: Bd }, xd);
let bs;
function Ja() {
  return bs || (bs = Zl(Kd));
}
const Wd = ((...e) => {
  Ja().render(...e);
}), xs = ((...e) => {
  const t = Ja().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const r = Yd(o);
    if (!r) return;
    const s = t._component;
    !G(s) && !s.render && !s.template && (s.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, Jd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Jd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Yd(e) {
  return xe(e) ? document.querySelector(e) : e;
}
function Ya(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Gd } = Object.prototype, { getPrototypeOf: Cr } = Object, { iterator: Co, toStringTag: Ga } = Symbol, So = /* @__PURE__ */ ((e) => (t) => {
  const n = Gd.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Qe = (e) => (e = e.toLowerCase(), (t) => So(t) === e), Eo = (e) => (t) => typeof t === e, { isArray: nn } = Array, tn = Eo("undefined");
function Pn(e) {
  return e !== null && !tn(e) && e.constructor !== null && !tn(e.constructor) && Ne(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Xa = Qe("ArrayBuffer");
function Xd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Xa(e.buffer), t;
}
const Zd = Eo("string"), Ne = Eo("function"), Za = Eo("number"), jn = (e) => e !== null && typeof e == "object", Qd = (e) => e === !0 || e === !1, Jn = (e) => {
  if (So(e) !== "object")
    return !1;
  const t = Cr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ga in e) && !(Co in e);
}, ec = (e) => {
  if (!jn(e) || Pn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, tc = Qe("Date"), nc = Qe("File"), oc = Qe("Blob"), rc = Qe("FileList"), sc = (e) => jn(e) && Ne(e.pipe), ac = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ne(e.append) && ((t = So(e)) === "formdata" || // detect form-data instance
  t === "object" && Ne(e.toString) && e.toString() === "[object FormData]"));
}, ic = Qe("URLSearchParams"), [lc, dc, cc, fc] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Qe), uc = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Mn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let o, r;
  if (typeof e != "object" && (e = [e]), nn(e))
    for (o = 0, r = e.length; o < r; o++)
      t.call(null, e[o], o, e);
  else {
    if (Pn(e))
      return;
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = s.length;
    let l;
    for (o = 0; o < i; o++)
      l = s[o], t.call(null, e[l], l, e);
  }
}
function Qa(e, t) {
  if (Pn(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let o = n.length, r;
  for (; o-- > 0; )
    if (r = n[o], t === r.toLowerCase())
      return r;
  return null;
}
const Ft = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ei = (e) => !tn(e) && e !== Ft;
function nr() {
  const { caseless: e, skipUndefined: t } = ei(this) && this || {}, n = {}, o = (r, s) => {
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return;
    const i = e && Qa(n, s) || s;
    Jn(n[i]) && Jn(r) ? n[i] = nr(n[i], r) : Jn(r) ? n[i] = nr({}, r) : nn(r) ? n[i] = r.slice() : (!t || !tn(r)) && (n[i] = r);
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && Mn(arguments[r], o);
  return n;
}
const pc = (e, t, n, { allOwnKeys: o } = {}) => (Mn(
  t,
  (r, s) => {
    n && Ne(r) ? Object.defineProperty(e, s, {
      value: Ya(r, n),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, s, {
      value: r,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: o }
), e), hc = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), mc = (e, t, n, o) => {
  e.prototype = Object.create(
    t.prototype,
    o
  ), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, gc = (e, t, n, o) => {
  let r, s, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), s = r.length; s-- > 0; )
      i = r[s], (!o || o(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = n !== !1 && Cr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, vc = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const o = e.indexOf(t, n);
  return o !== -1 && o === n;
}, bc = (e) => {
  if (!e) return null;
  if (nn(e)) return e;
  let t = e.length;
  if (!Za(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, xc = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Cr(Uint8Array)), yc = (e, t) => {
  const o = (e && e[Co]).call(e);
  let r;
  for (; (r = o.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, wc = (e, t) => {
  let n;
  const o = [];
  for (; (n = e.exec(t)) !== null; )
    o.push(n);
  return o;
}, _c = Qe("HTMLFormElement"), kc = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, o, r) {
  return o.toUpperCase() + r;
}), ys = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Cc = Qe("RegExp"), ti = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), o = {};
  Mn(n, (r, s) => {
    let i;
    (i = t(r, s, e)) !== !1 && (o[s] = i || r);
  }), Object.defineProperties(e, o);
}, Sc = (e) => {
  ti(e, (t, n) => {
    if (Ne(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const o = e[n];
    if (Ne(o)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Ec = (e, t) => {
  const n = {}, o = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return nn(e) ? o(e) : o(String(e).split(t)), n;
}, $c = () => {
}, Ac = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Tc(e) {
  return !!(e && Ne(e.append) && e[Ga] === "FormData" && e[Co]);
}
const Rc = (e) => {
  const t = new Array(10), n = (o, r) => {
    if (jn(o)) {
      if (t.indexOf(o) >= 0)
        return;
      if (Pn(o))
        return o;
      if (!("toJSON" in o)) {
        t[r] = o;
        const s = nn(o) ? [] : {};
        return Mn(o, (i, l) => {
          const d = n(i, r + 1);
          !tn(d) && (s[l] = d);
        }), t[r] = void 0, s;
      }
    }
    return o;
  };
  return n(e, 0);
}, Oc = Qe("AsyncFunction"), Pc = (e) => e && (jn(e) || Ne(e)) && Ne(e.then) && Ne(e.catch), ni = ((e, t) => e ? setImmediate : t ? ((n, o) => (Ft.addEventListener(
  "message",
  ({ source: r, data: s }) => {
    r === Ft && s === n && o.length && o.shift()();
  },
  !1
), (r) => {
  o.push(r), Ft.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", Ne(Ft.postMessage)), jc = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ft) : typeof process < "u" && process.nextTick || ni, Mc = (e) => e != null && Ne(e[Co]), _ = {
  isArray: nn,
  isArrayBuffer: Xa,
  isBuffer: Pn,
  isFormData: ac,
  isArrayBufferView: Xd,
  isString: Zd,
  isNumber: Za,
  isBoolean: Qd,
  isObject: jn,
  isPlainObject: Jn,
  isEmptyObject: ec,
  isReadableStream: lc,
  isRequest: dc,
  isResponse: cc,
  isHeaders: fc,
  isUndefined: tn,
  isDate: tc,
  isFile: nc,
  isBlob: oc,
  isRegExp: Cc,
  isFunction: Ne,
  isStream: sc,
  isURLSearchParams: ic,
  isTypedArray: xc,
  isFileList: rc,
  forEach: Mn,
  merge: nr,
  extend: pc,
  trim: uc,
  stripBOM: hc,
  inherits: mc,
  toFlatObject: gc,
  kindOf: So,
  kindOfTest: Qe,
  endsWith: vc,
  toArray: bc,
  forEachEntry: yc,
  matchAll: wc,
  isHTMLForm: _c,
  hasOwnProperty: ys,
  hasOwnProp: ys,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ti,
  freezeMethods: Sc,
  toObjectSet: Ec,
  toCamelCase: kc,
  noop: $c,
  toFiniteNumber: Ac,
  findKey: Qa,
  global: Ft,
  isContextDefined: ei,
  isSpecCompliantForm: Tc,
  toJSONObject: Rc,
  isAsyncFn: Oc,
  isThenable: Pc,
  setImmediate: ni,
  asap: jc,
  isIterable: Mc
};
let q = class oi extends Error {
  static from(t, n, o, r, s, i) {
    const l = new oi(t.message, n || t.code, o, r, s);
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
  constructor(t, n, o, r, s) {
    super(t), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), o && (this.config = o), r && (this.request = r), s && (this.response = s, this.status = s.status);
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
      config: _.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
q.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
q.ERR_BAD_OPTION = "ERR_BAD_OPTION";
q.ECONNABORTED = "ECONNABORTED";
q.ETIMEDOUT = "ETIMEDOUT";
q.ERR_NETWORK = "ERR_NETWORK";
q.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
q.ERR_DEPRECATED = "ERR_DEPRECATED";
q.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
q.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
q.ERR_CANCELED = "ERR_CANCELED";
q.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
q.ERR_INVALID_URL = "ERR_INVALID_URL";
const Dc = null;
function or(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function ri(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ws(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = ri(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Nc(e) {
  return _.isArray(e) && !e.some(or);
}
const Ic = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function $o(e, t, n) {
  if (!_.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = _.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(k, b) {
    return !_.isUndefined(b[k]);
  });
  const o = n.metaTokens, r = n.visitor || c, s = n.dots, i = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(v) {
    if (v === null) return "";
    if (_.isDate(v))
      return v.toISOString();
    if (_.isBoolean(v))
      return v.toString();
    if (!d && _.isBlob(v))
      throw new q("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(v) || _.isTypedArray(v) ? d && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function c(v, k, b) {
    let E = v;
    if (v && !b && typeof v == "object") {
      if (_.endsWith(k, "{}"))
        k = o ? k : k.slice(0, -2), v = JSON.stringify(v);
      else if (_.isArray(v) && Nc(v) || (_.isFileList(v) || _.endsWith(k, "[]")) && (E = _.toArray(v)))
        return k = ri(k), E.forEach(function(j, I) {
          !(_.isUndefined(j) || j === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ws([k], I, s) : i === null ? k : k + "[]",
            f(j)
          );
        }), !1;
    }
    return or(v) ? !0 : (t.append(ws(b, k, s), f(v)), !1);
  }
  const p = [], x = Object.assign(Ic, {
    defaultVisitor: c,
    convertValue: f,
    isVisitable: or
  });
  function w(v, k) {
    if (!_.isUndefined(v)) {
      if (p.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + k.join("."));
      p.push(v), _.forEach(v, function(E, $) {
        (!(_.isUndefined(E) || E === null) && r.call(
          t,
          E,
          _.isString($) ? $.trim() : $,
          k,
          x
        )) === !0 && w(E, k ? k.concat($) : [$]);
      }), p.pop();
    }
  }
  if (!_.isObject(e))
    throw new TypeError("data must be an object");
  return w(e), t;
}
function _s(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(o) {
    return t[o];
  });
}
function Sr(e, t) {
  this._pairs = [], e && $o(e, this, t);
}
const si = Sr.prototype;
si.append = function(t, n) {
  this._pairs.push([t, n]);
};
si.toString = function(t) {
  const n = t ? function(o) {
    return t.call(this, o, _s);
  } : _s;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Lc(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ai(e, t, n) {
  if (!t)
    return e;
  const o = n && n.encode || Lc, r = _.isFunction(n) ? {
    serialize: n
  } : n, s = r && r.serialize;
  let i;
  if (s ? i = s(t, r) : i = _.isURLSearchParams(t) ? t.toString() : new Sr(t, r).toString(o), i) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class ks {
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
  use(t, n, o) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: o ? o.synchronous : !1,
      runWhen: o ? o.runWhen : null
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
    _.forEach(this.handlers, function(o) {
      o !== null && t(o);
    });
  }
}
const Er = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Bc = typeof URLSearchParams < "u" ? URLSearchParams : Sr, Fc = typeof FormData < "u" ? FormData : null, zc = typeof Blob < "u" ? Blob : null, Uc = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Bc,
    FormData: Fc,
    Blob: zc
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, $r = typeof window < "u" && typeof document < "u", rr = typeof navigator == "object" && navigator || void 0, Hc = $r && (!rr || ["ReactNative", "NativeScript", "NS"].indexOf(rr.product) < 0), Vc = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", qc = $r && window.location.href || "http://localhost", Kc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: $r,
  hasStandardBrowserEnv: Hc,
  hasStandardBrowserWebWorkerEnv: Vc,
  navigator: rr,
  origin: qc
}, Symbol.toStringTag, { value: "Module" })), Se = {
  ...Kc,
  ...Uc
};
function Wc(e, t) {
  return $o(e, new Se.classes.URLSearchParams(), {
    visitor: function(n, o, r, s) {
      return Se.isNode && _.isBuffer(n) ? (this.append(o, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Jc(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Yc(e) {
  const t = {}, n = Object.keys(e);
  let o;
  const r = n.length;
  let s;
  for (o = 0; o < r; o++)
    s = n[o], t[s] = e[s];
  return t;
}
function ii(e) {
  function t(n, o, r, s) {
    let i = n[s++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), d = s >= n.length;
    return i = !i && _.isArray(r) ? r.length : i, d ? (_.hasOwnProp(r, i) ? r[i] = [r[i], o] : r[i] = o, !l) : ((!r[i] || !_.isObject(r[i])) && (r[i] = []), t(n, o, r[i], s) && _.isArray(r[i]) && (r[i] = Yc(r[i])), !l);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const n = {};
    return _.forEachEntry(e, (o, r) => {
      t(Jc(o), r, n, 0);
    }), n;
  }
  return null;
}
function Gc(e, t, n) {
  if (_.isString(e))
    try {
      return (t || JSON.parse)(e), _.trim(e);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (n || JSON.stringify)(e);
}
const Dn = {
  transitional: Er,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const o = n.getContentType() || "", r = o.indexOf("application/json") > -1, s = _.isObject(t);
    if (s && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))
      return r ? JSON.stringify(ii(t)) : t;
    if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t))
      return t;
    if (_.isArrayBufferView(t))
      return t.buffer;
    if (_.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (s) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return Wc(t, this.formSerializer).toString();
      if ((l = _.isFileList(t)) || o.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return $o(
          l ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || r ? (n.setContentType("application/json", !1), Gc(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Dn.transitional, o = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (_.isResponse(t) || _.isReadableStream(t))
      return t;
    if (t && _.isString(t) && (o && !this.responseType || r)) {
      const i = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? q.from(l, q.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
_.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Dn.headers[e] = {};
});
const Xc = _.toObjectSet([
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
]), Zc = (e) => {
  const t = {};
  let n, o, r;
  return e && e.split(`
`).forEach(function(i) {
    r = i.indexOf(":"), n = i.substring(0, r).trim().toLowerCase(), o = i.substring(r + 1).trim(), !(!n || t[n] && Xc[n]) && (n === "set-cookie" ? t[n] ? t[n].push(o) : t[n] = [o] : t[n] = t[n] ? t[n] + ", " + o : o);
  }), t;
}, Cs = /* @__PURE__ */ Symbol("internals");
function cn(e) {
  return e && String(e).trim().toLowerCase();
}
function Yn(e) {
  return e === !1 || e == null ? e : _.isArray(e) ? e.map(Yn) : String(e);
}
function Qc(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = n.exec(e); )
    t[o[1]] = o[2];
  return t;
}
const ef = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Fo(e, t, n, o, r) {
  if (_.isFunction(o))
    return o.call(this, t, n);
  if (r && (t = n), !!_.isString(t)) {
    if (_.isString(o))
      return t.indexOf(o) !== -1;
    if (_.isRegExp(o))
      return o.test(t);
  }
}
function tf(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, o) => n.toUpperCase() + o);
}
function nf(e, t) {
  const n = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(e, o + n, {
      value: function(r, s, i) {
        return this[o].call(this, t, r, s, i);
      },
      configurable: !0
    });
  });
}
let Ie = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, o) {
    const r = this;
    function s(l, d, f) {
      const c = cn(d);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const p = _.findKey(r, c);
      (!p || r[p] === void 0 || f === !0 || f === void 0 && r[p] !== !1) && (r[p || d] = Yn(l));
    }
    const i = (l, d) => _.forEach(l, (f, c) => s(f, c, d));
    if (_.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (_.isString(t) && (t = t.trim()) && !ef(t))
      i(Zc(t), n);
    else if (_.isObject(t) && _.isIterable(t)) {
      let l = {}, d, f;
      for (const c of t) {
        if (!_.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        l[f = c[0]] = (d = l[f]) ? _.isArray(d) ? [...d, c[1]] : [d, c[1]] : c[1];
      }
      i(l, n);
    } else
      t != null && s(n, t, o);
    return this;
  }
  get(t, n) {
    if (t = cn(t), t) {
      const o = _.findKey(this, t);
      if (o) {
        const r = this[o];
        if (!n)
          return r;
        if (n === !0)
          return Qc(r);
        if (_.isFunction(n))
          return n.call(this, r, o);
        if (_.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = cn(t), t) {
      const o = _.findKey(this, t);
      return !!(o && this[o] !== void 0 && (!n || Fo(this, this[o], o, n)));
    }
    return !1;
  }
  delete(t, n) {
    const o = this;
    let r = !1;
    function s(i) {
      if (i = cn(i), i) {
        const l = _.findKey(o, i);
        l && (!n || Fo(o, o[l], l, n)) && (delete o[l], r = !0);
      }
    }
    return _.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let o = n.length, r = !1;
    for (; o--; ) {
      const s = n[o];
      (!t || Fo(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, o = {};
    return _.forEach(this, (r, s) => {
      const i = _.findKey(o, s);
      if (i) {
        n[i] = Yn(r), delete n[s];
        return;
      }
      const l = t ? tf(s) : String(s).trim();
      l !== s && delete n[s], n[l] = Yn(r), o[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (o, r) => {
      o != null && o !== !1 && (n[r] = t && _.isArray(o) ? o.join(", ") : o);
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
    const o = new this(t);
    return n.forEach((r) => o.set(r)), o;
  }
  static accessor(t) {
    const o = (this[Cs] = this[Cs] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(i) {
      const l = cn(i);
      o[l] || (nf(r, i), o[l] = !0);
    }
    return _.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
Ie.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(Ie.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(o) {
      this[n] = o;
    }
  };
});
_.freezeMethods(Ie);
function zo(e, t) {
  const n = this || Dn, o = t || n, r = Ie.from(o.headers);
  let s = o.data;
  return _.forEach(e, function(l) {
    s = l.call(n, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function li(e) {
  return !!(e && e.__CANCEL__);
}
let Nn = class extends q {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, n, o) {
    super(t ?? "canceled", q.ERR_CANCELED, n, o), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function di(e, t, n) {
  const o = n.config.validateStatus;
  !n.status || !o || o(n.status) ? e(n) : t(new q(
    "Request failed with status code " + n.status,
    [q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function of(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function rf(e, t) {
  e = e || 10;
  const n = new Array(e), o = new Array(e);
  let r = 0, s = 0, i;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const f = Date.now(), c = o[s];
    i || (i = f), n[r] = d, o[r] = f;
    let p = s, x = 0;
    for (; p !== r; )
      x += n[p++], p = p % e;
    if (r = (r + 1) % e, r === s && (s = (s + 1) % e), f - i < t)
      return;
    const w = c && f - c;
    return w ? Math.round(x * 1e3 / w) : void 0;
  };
}
function sf(e, t) {
  let n = 0, o = 1e3 / t, r, s;
  const i = (f, c = Date.now()) => {
    n = c, r = null, s && (clearTimeout(s), s = null), e(...f);
  };
  return [(...f) => {
    const c = Date.now(), p = c - n;
    p >= o ? i(f, c) : (r = f, s || (s = setTimeout(() => {
      s = null, i(r);
    }, o - p)));
  }, () => r && i(r)];
}
const co = (e, t, n = 3) => {
  let o = 0;
  const r = rf(50, 250);
  return sf((s) => {
    const i = s.loaded, l = s.lengthComputable ? s.total : void 0, d = i - o, f = r(d), c = i <= l;
    o = i;
    const p = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: d,
      rate: f || void 0,
      estimated: f && l && c ? (l - i) / f : void 0,
      event: s,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, Ss = (e, t) => {
  const n = e != null;
  return [(o) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: o
  }), t[1]];
}, Es = (e) => (...t) => _.asap(() => e(...t)), af = Se.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Se.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Se.origin),
  Se.navigator && /(msie|trident)/i.test(Se.navigator.userAgent)
) : () => !0, lf = Se.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, o, r, s, i) {
      if (typeof document > "u") return;
      const l = [`${e}=${encodeURIComponent(t)}`];
      _.isNumber(n) && l.push(`expires=${new Date(n).toUTCString()}`), _.isString(o) && l.push(`path=${o}`), _.isString(r) && l.push(`domain=${r}`), s === !0 && l.push("secure"), _.isString(i) && l.push(`SameSite=${i}`), document.cookie = l.join("; ");
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
function df(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function cf(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ci(e, t, n) {
  let o = !df(t);
  return e && (o || n == !1) ? cf(e, t) : t;
}
const $s = (e) => e instanceof Ie ? { ...e } : e;
function Vt(e, t) {
  t = t || {};
  const n = {};
  function o(f, c, p, x) {
    return _.isPlainObject(f) && _.isPlainObject(c) ? _.merge.call({ caseless: x }, f, c) : _.isPlainObject(c) ? _.merge({}, c) : _.isArray(c) ? c.slice() : c;
  }
  function r(f, c, p, x) {
    if (_.isUndefined(c)) {
      if (!_.isUndefined(f))
        return o(void 0, f, p, x);
    } else return o(f, c, p, x);
  }
  function s(f, c) {
    if (!_.isUndefined(c))
      return o(void 0, c);
  }
  function i(f, c) {
    if (_.isUndefined(c)) {
      if (!_.isUndefined(f))
        return o(void 0, f);
    } else return o(void 0, c);
  }
  function l(f, c, p) {
    if (p in t)
      return o(f, c);
    if (p in e)
      return o(void 0, f);
  }
  const d = {
    url: s,
    method: s,
    data: s,
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
    headers: (f, c, p) => r($s(f), $s(c), p, !0)
  };
  return _.forEach(
    Object.keys({ ...e, ...t }),
    function(c) {
      if (c === "__proto__" || c === "constructor" || c === "prototype")
        return;
      const p = _.hasOwnProp(d, c) ? d[c] : r, x = p(e[c], t[c], c);
      _.isUndefined(x) && p !== l || (n[c] = x);
    }
  ), n;
}
const fi = (e) => {
  const t = Vt({}, e);
  let { data: n, withXSRFToken: o, xsrfHeaderName: r, xsrfCookieName: s, headers: i, auth: l } = t;
  if (t.headers = i = Ie.from(i), t.url = ai(ci(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), _.isFormData(n)) {
    if (Se.hasStandardBrowserEnv || Se.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (_.isFunction(n.getHeaders)) {
      const d = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(d).forEach(([c, p]) => {
        f.includes(c.toLowerCase()) && i.set(c, p);
      });
    }
  }
  if (Se.hasStandardBrowserEnv && (o && _.isFunction(o) && (o = o(t)), o || o !== !1 && af(t.url))) {
    const d = r && s && lf.read(s);
    d && i.set(r, d);
  }
  return t;
}, ff = typeof XMLHttpRequest < "u", uf = ff && function(e) {
  return new Promise(function(n, o) {
    const r = fi(e);
    let s = r.data;
    const i = Ie.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: d, onDownloadProgress: f } = r, c, p, x, w, v;
    function k() {
      w && w(), v && v(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let b = new XMLHttpRequest();
    b.open(r.method.toUpperCase(), r.url, !0), b.timeout = r.timeout;
    function E() {
      if (!b)
        return;
      const j = Ie.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), F = {
        data: !l || l === "text" || l === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: j,
        config: e,
        request: b
      };
      di(function(M) {
        n(M), k();
      }, function(M) {
        o(M), k();
      }, F), b = null;
    }
    "onloadend" in b ? b.onloadend = E : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, b.onabort = function() {
      b && (o(new q("Request aborted", q.ECONNABORTED, e, b)), b = null);
    }, b.onerror = function(I) {
      const F = I && I.message ? I.message : "Network Error", N = new q(F, q.ERR_NETWORK, e, b);
      N.event = I || null, o(N), b = null;
    }, b.ontimeout = function() {
      let I = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const F = r.transitional || Er;
      r.timeoutErrorMessage && (I = r.timeoutErrorMessage), o(new q(
        I,
        F.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
        e,
        b
      )), b = null;
    }, s === void 0 && i.setContentType(null), "setRequestHeader" in b && _.forEach(i.toJSON(), function(I, F) {
      b.setRequestHeader(F, I);
    }), _.isUndefined(r.withCredentials) || (b.withCredentials = !!r.withCredentials), l && l !== "json" && (b.responseType = r.responseType), f && ([x, v] = co(f, !0), b.addEventListener("progress", x)), d && b.upload && ([p, w] = co(d), b.upload.addEventListener("progress", p), b.upload.addEventListener("loadend", w)), (r.cancelToken || r.signal) && (c = (j) => {
      b && (o(!j || j.type ? new Nn(null, e, b) : j), b.abort(), b = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const $ = of(r.url);
    if ($ && Se.protocols.indexOf($) === -1) {
      o(new q("Unsupported protocol " + $ + ":", q.ERR_BAD_REQUEST, e));
      return;
    }
    b.send(s || null);
  });
}, pf = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let o = new AbortController(), r;
    const s = function(f) {
      if (!r) {
        r = !0, l();
        const c = f instanceof Error ? f : this.reason;
        o.abort(c instanceof q ? c : new Nn(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, s(new q(`timeout of ${t}ms exceeded`, q.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(s) : f.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", s));
    const { signal: d } = o;
    return d.unsubscribe = () => _.asap(l), d;
  }
}, hf = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let o = 0, r;
  for (; o < n; )
    r = o + t, yield e.slice(o, r), o = r;
}, mf = async function* (e, t) {
  for await (const n of gf(e))
    yield* hf(n, t);
}, gf = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: o } = await t.read();
      if (n)
        break;
      yield o;
    }
  } finally {
    await t.cancel();
  }
}, As = (e, t, n, o) => {
  const r = mf(e, t);
  let s = 0, i, l = (d) => {
    i || (i = !0, o && o(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: f, value: c } = await r.next();
        if (f) {
          l(), d.close();
          return;
        }
        let p = c.byteLength;
        if (n) {
          let x = s += p;
          n(x);
        }
        d.enqueue(new Uint8Array(c));
      } catch (f) {
        throw l(f), f;
      }
    },
    cancel(d) {
      return l(d), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ts = 64 * 1024, { isFunction: zn } = _, vf = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(_.global), {
  ReadableStream: Rs,
  TextEncoder: Os
} = _.global, Ps = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, bf = (e) => {
  e = _.merge.call({
    skipUndefined: !0
  }, vf, e);
  const { fetch: t, Request: n, Response: o } = e, r = t ? zn(t) : typeof fetch == "function", s = zn(n), i = zn(o);
  if (!r)
    return !1;
  const l = r && zn(Rs), d = r && (typeof Os == "function" ? /* @__PURE__ */ ((v) => (k) => v.encode(k))(new Os()) : async (v) => new Uint8Array(await new n(v).arrayBuffer())), f = s && l && Ps(() => {
    let v = !1;
    const k = new n(Se.origin, {
      body: new Rs(),
      method: "POST",
      get duplex() {
        return v = !0, "half";
      }
    }).headers.has("Content-Type");
    return v && !k;
  }), c = i && l && Ps(() => _.isReadableStream(new o("").body)), p = {
    stream: c && ((v) => v.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((v) => {
    !p[v] && (p[v] = (k, b) => {
      let E = k && k[v];
      if (E)
        return E.call(k);
      throw new q(`Response type '${v}' is not supported`, q.ERR_NOT_SUPPORT, b);
    });
  });
  const x = async (v) => {
    if (v == null)
      return 0;
    if (_.isBlob(v))
      return v.size;
    if (_.isSpecCompliantForm(v))
      return (await new n(Se.origin, {
        method: "POST",
        body: v
      }).arrayBuffer()).byteLength;
    if (_.isArrayBufferView(v) || _.isArrayBuffer(v))
      return v.byteLength;
    if (_.isURLSearchParams(v) && (v = v + ""), _.isString(v))
      return (await d(v)).byteLength;
  }, w = async (v, k) => {
    const b = _.toFiniteNumber(v.getContentLength());
    return b ?? x(k);
  };
  return async (v) => {
    let {
      url: k,
      method: b,
      data: E,
      signal: $,
      cancelToken: j,
      timeout: I,
      onDownloadProgress: F,
      onUploadProgress: N,
      responseType: M,
      headers: Q,
      withCredentials: z = "same-origin",
      fetchOptions: J
    } = fi(v), ie = t || fetch;
    M = M ? (M + "").toLowerCase() : "text";
    let U = pf([$, j && j.toAbortSignal()], I), re = null;
    const ue = U && U.unsubscribe && (() => {
      U.unsubscribe();
    });
    let Oe;
    try {
      if (N && f && b !== "get" && b !== "head" && (Oe = await w(Q, E)) !== 0) {
        let _e = new n(k, {
          method: "POST",
          body: E,
          duplex: "half"
        }), ye;
        if (_.isFormData(E) && (ye = _e.headers.get("content-type")) && Q.setContentType(ye), _e.body) {
          const [dt, Le] = Ss(
            Oe,
            co(Es(N))
          );
          E = As(_e.body, Ts, dt, Le);
        }
      }
      _.isString(z) || (z = z ? "include" : "omit");
      const ee = s && "credentials" in n.prototype, ce = {
        ...J,
        signal: U,
        method: b.toUpperCase(),
        headers: Q.normalize().toJSON(),
        body: E,
        duplex: "half",
        credentials: ee ? z : void 0
      };
      re = s && new n(k, ce);
      let Z = await (s ? ie(re, J) : ie(k, ce));
      const Ue = c && (M === "stream" || M === "response");
      if (c && (F || Ue && ue)) {
        const _e = {};
        ["status", "statusText", "headers"].forEach((qt) => {
          _e[qt] = Z[qt];
        });
        const ye = _.toFiniteNumber(Z.headers.get("content-length")), [dt, Le] = F && Ss(
          ye,
          co(Es(F), !0)
        ) || [];
        Z = new o(
          As(Z.body, Ts, dt, () => {
            Le && Le(), ue && ue();
          }),
          _e
        );
      }
      M = M || "text";
      let kt = await p[_.findKey(p, M) || "text"](Z, v);
      return !Ue && ue && ue(), await new Promise((_e, ye) => {
        di(_e, ye, {
          data: kt,
          headers: Ie.from(Z.headers),
          status: Z.status,
          statusText: Z.statusText,
          config: v,
          request: re
        });
      });
    } catch (ee) {
      throw ue && ue(), ee && ee.name === "TypeError" && /Load failed|fetch/i.test(ee.message) ? Object.assign(
        new q("Network Error", q.ERR_NETWORK, v, re, ee && ee.response),
        {
          cause: ee.cause || ee
        }
      ) : q.from(ee, ee && ee.code, v, re, ee && ee.response);
    }
  };
}, xf = /* @__PURE__ */ new Map(), ui = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: o, Response: r } = t, s = [
    o,
    r,
    n
  ];
  let i = s.length, l = i, d, f, c = xf;
  for (; l--; )
    d = s[l], f = c.get(d), f === void 0 && c.set(d, f = l ? /* @__PURE__ */ new Map() : bf(t)), c = f;
  return f;
};
ui();
const Ar = {
  http: Dc,
  xhr: uf,
  fetch: {
    get: ui
  }
};
_.forEach(Ar, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const js = (e) => `- ${e}`, yf = (e) => _.isFunction(e) || e === null || e === !1;
function wf(e, t) {
  e = _.isArray(e) ? e : [e];
  const { length: n } = e;
  let o, r;
  const s = {};
  for (let i = 0; i < n; i++) {
    o = e[i];
    let l;
    if (r = o, !yf(o) && (r = Ar[(l = String(o)).toLowerCase()], r === void 0))
      throw new q(`Unknown adapter '${l}'`);
    if (r && (_.isFunction(r) || (r = r.get(t))))
      break;
    s[l || "#" + i] = r;
  }
  if (!r) {
    const i = Object.entries(s).map(
      ([d, f]) => `adapter ${d} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = n ? i.length > 1 ? `since :
` + i.map(js).join(`
`) : " " + js(i[0]) : "as no adapter specified";
    throw new q(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const pi = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: wf,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Ar
};
function Uo(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Nn(null, e);
}
function Ms(e) {
  return Uo(e), e.headers = Ie.from(e.headers), e.data = zo.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), pi.getAdapter(e.adapter || Dn.adapter, e)(e).then(function(o) {
    return Uo(e), o.data = zo.call(
      e,
      e.transformResponse,
      o
    ), o.headers = Ie.from(o.headers), o;
  }, function(o) {
    return li(o) || (Uo(e), o && o.response && (o.response.data = zo.call(
      e,
      e.transformResponse,
      o.response
    ), o.response.headers = Ie.from(o.response.headers))), Promise.reject(o);
  });
}
const hi = "1.13.5", Ao = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ao[e] = function(o) {
    return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ds = {};
Ao.transitional = function(t, n, o) {
  function r(s, i) {
    return "[Axios v" + hi + "] Transitional option '" + s + "'" + i + (o ? ". " + o : "");
  }
  return (s, i, l) => {
    if (t === !1)
      throw new q(
        r(i, " has been removed" + (n ? " in " + n : "")),
        q.ERR_DEPRECATED
      );
    return n && !Ds[i] && (Ds[i] = !0, console.warn(
      r(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, i, l) : !0;
  };
};
Ao.spelling = function(t) {
  return (n, o) => (console.warn(`${o} is likely a misspelling of ${t}`), !0);
};
function _f(e, t, n) {
  if (typeof e != "object")
    throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(e);
  let r = o.length;
  for (; r-- > 0; ) {
    const s = o[r], i = t[s];
    if (i) {
      const l = e[s], d = l === void 0 || i(l, s, e);
      if (d !== !0)
        throw new q("option " + s + " must be " + d, q.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new q("Unknown option " + s, q.ERR_BAD_OPTION);
  }
}
const Gn = {
  assertOptions: _f,
  validators: Ao
}, Ve = Gn.validators;
let Ht = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new ks(),
      response: new ks()
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
    } catch (o) {
      if (o instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          o.stack ? s && !String(o.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (o.stack += `
` + s) : o.stack = s;
        } catch {
        }
      }
      throw o;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Vt(this.defaults, n);
    const { transitional: o, paramsSerializer: r, headers: s } = n;
    o !== void 0 && Gn.assertOptions(o, {
      silentJSONParsing: Ve.transitional(Ve.boolean),
      forcedJSONParsing: Ve.transitional(Ve.boolean),
      clarifyTimeoutError: Ve.transitional(Ve.boolean),
      legacyInterceptorReqResOrdering: Ve.transitional(Ve.boolean)
    }, !1), r != null && (_.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : Gn.assertOptions(r, {
      encode: Ve.function,
      serialize: Ve.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Gn.assertOptions(n, {
      baseUrl: Ve.spelling("baseURL"),
      withXsrfToken: Ve.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = s && _.merge(
      s.common,
      s[n.method]
    );
    s && _.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete s[v];
      }
    ), n.headers = Ie.concat(i, s);
    const l = [];
    let d = !0;
    this.interceptors.request.forEach(function(k) {
      if (typeof k.runWhen == "function" && k.runWhen(n) === !1)
        return;
      d = d && k.synchronous;
      const b = n.transitional || Er;
      b && b.legacyInterceptorReqResOrdering ? l.unshift(k.fulfilled, k.rejected) : l.push(k.fulfilled, k.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(k) {
      f.push(k.fulfilled, k.rejected);
    });
    let c, p = 0, x;
    if (!d) {
      const v = [Ms.bind(this), void 0];
      for (v.unshift(...l), v.push(...f), x = v.length, c = Promise.resolve(n); p < x; )
        c = c.then(v[p++], v[p++]);
      return c;
    }
    x = l.length;
    let w = n;
    for (; p < x; ) {
      const v = l[p++], k = l[p++];
      try {
        w = v(w);
      } catch (b) {
        k.call(this, b);
        break;
      }
    }
    try {
      c = Ms.call(this, w);
    } catch (v) {
      return Promise.reject(v);
    }
    for (p = 0, x = f.length; p < x; )
      c = c.then(f[p++], f[p++]);
    return c;
  }
  getUri(t) {
    t = Vt(this.defaults, t);
    const n = ci(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ai(n, t.params, t.paramsSerializer);
  }
};
_.forEach(["delete", "get", "head", "options"], function(t) {
  Ht.prototype[t] = function(n, o) {
    return this.request(Vt(o || {}, {
      method: t,
      url: n,
      data: (o || {}).data
    }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function n(o) {
    return function(s, i, l) {
      return this.request(Vt(l || {}, {
        method: t,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: i
      }));
    };
  }
  Ht.prototype[t] = n(), Ht.prototype[t + "Form"] = n(!0);
});
let kf = class mi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const o = this;
    this.promise.then((r) => {
      if (!o._listeners) return;
      let s = o._listeners.length;
      for (; s-- > 0; )
        o._listeners[s](r);
      o._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const i = new Promise((l) => {
        o.subscribe(l), s = l;
      }).then(r);
      return i.cancel = function() {
        o.unsubscribe(s);
      }, i;
    }, t(function(s, i, l) {
      o.reason || (o.reason = new Nn(s, i, l), n(o.reason));
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
    const t = new AbortController(), n = (o) => {
      t.abort(o);
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
      token: new mi(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Cf(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Sf(e) {
  return _.isObject(e) && e.isAxiosError === !0;
}
const sr = {
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
Object.entries(sr).forEach(([e, t]) => {
  sr[t] = e;
});
function gi(e) {
  const t = new Ht(e), n = Ya(Ht.prototype.request, t);
  return _.extend(n, Ht.prototype, t, { allOwnKeys: !0 }), _.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return gi(Vt(e, r));
  }, n;
}
const K = gi(Dn);
K.Axios = Ht;
K.CanceledError = Nn;
K.CancelToken = kf;
K.isCancel = li;
K.VERSION = hi;
K.toFormData = $o;
K.AxiosError = q;
K.Cancel = K.CanceledError;
K.all = function(t) {
  return Promise.all(t);
};
K.spread = Cf;
K.isAxiosError = Sf;
K.mergeConfig = Vt;
K.AxiosHeaders = Ie;
K.formToJSON = (e) => ii(_.isHTMLForm(e) ? new FormData(e) : e);
K.getAdapter = pi.getAdapter;
K.HttpStatusCode = sr;
K.default = K;
const {
  Axios: Ng,
  AxiosError: Ig,
  CanceledError: Lg,
  isCancel: Bg,
  CancelToken: Fg,
  VERSION: zg,
  all: Ug,
  Cancel: Hg,
  isAxiosError: Vg,
  spread: qg,
  toFormData: Kg,
  AxiosHeaders: Wg,
  HttpStatusCode: Jg,
  formToJSON: Yg,
  getAdapter: Gg,
  mergeConfig: Xg
} = K, Ef = ".grid-card[data-v-d978c2d5]{background:#fff;border-radius:24px;padding:1.5rem;border:1px solid #f1f5f9;display:flex;flex-direction:column;gap:1.25rem;transition:all .3s ease;width:100%;min-height:420px;box-shadow:0 4px 6px -1px #0000000d}.grid-card[data-v-d978c2d5]:hover{border-color:#3b82f6;transform:translateY(-4px);box-shadow:0 10px 20px -5px #0000001a}.grid-row[data-v-d978c2d5]{display:flex;align-items:center;gap:1rem}.grid-avatar[data-v-d978c2d5]{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.4rem;color:#fff;flex-shrink:0}.grid-info[data-v-d978c2d5]{flex:1;min-width:0}.grid-name[data-v-d978c2d5]{font-weight:700;font-size:1.1rem;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grid-meta[data-v-d978c2d5]{font-size:.75rem;color:#64748b}.grid-match[data-v-d978c2d5]{background:#f0f9ff;padding:.4rem .8rem;border-radius:12px;font-size:.85rem;font-weight:700;color:#0369a1;border:1px solid #e0f2fe}.grid-stats[data-v-d978c2d5]{display:flex;justify-content:space-between;padding:.75rem 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9}.grid-stat[data-v-d978c2d5]{display:flex;align-items:center;gap:.4rem;font-size:.85rem;color:#475569}.grid-chips[data-v-d978c2d5]{display:flex;flex-wrap:wrap;gap:.4rem;min-height:32px}.grid-chip[data-v-d978c2d5]{background:#f8fafc;padding:.3rem .7rem;border-radius:8px;font-size:.7rem;font-weight:500;color:#475569;border:1px solid #e2e8f0}.grid-chip.course[data-v-d978c2d5]{background:#eff6ff;color:#2563eb;border-color:#dbeafe}.grid-empty-chip[data-v-d978c2d5]{font-size:.7rem;color:#94a3b8;padding:.3rem;font-style:italic}.grid-actions[data-v-d978c2d5]{margin-top:auto;display:flex;flex-direction:column;gap:.75rem}.grid-btn[data-v-d978c2d5]{width:100%;height:42px;border-radius:12px;border:none;background:#0f172a;color:#fff;font-weight:600;cursor:pointer;transition:background .2s}.grid-btn[data-v-d978c2d5]:hover{background:#1e293b}.connect-btn[data-v-d978c2d5]{width:100%;height:42px;border-radius:12px;border:1.5px solid #e2e8f0;background:#fff;color:#0f172a;font-weight:600;cursor:pointer;transition:all .2s}.connect-btn[data-v-d978c2d5]:hover{border-color:#3b82f6;color:#3b82f6;background:#f0f9ff}.modal-overlay[data-v-d978c2d5]{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.modal-content[data-v-d978c2d5]{background:#fff;padding:2rem;border-radius:20px;width:90%;max-width:400px;display:flex;flex-direction:column;gap:1rem}.modal-content select[data-v-d978c2d5],.modal-content textarea[data-v-d978c2d5]{padding:.5rem;border:1px solid #ddd;border-radius:8px}.animate-fade-in[data-v-d978c2d5]{animation:fadeIn-d978c2d5 .3s ease-in-out}@keyframes fadeIn-d978c2d5{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media(max-width:640px){.grid-card[data-v-d978c2d5]{min-height:400px}}", _t = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, $f = { class: "grid-card" }, Af = { class: "grid-row" }, Tf = { class: "grid-info" }, Rf = { class: "grid-name" }, Of = { class: "grid-meta" }, Pf = { class: "grid-match" }, jf = { class: "grid-stats" }, Mf = { class: "grid-stat" }, Df = { class: "grid-stat" }, Nf = { class: "grid-stat" }, If = {
  key: 0,
  class: "grid-chips"
}, Lf = {
  key: 0,
  class: "grid-chip more"
}, Bf = {
  key: 1,
  class: "grid-empty-chip"
}, Ff = {
  key: 2,
  class: "grid-chips"
}, zf = {
  key: 0,
  class: "grid-chip more"
}, Uf = {
  key: 3,
  class: "grid-empty-chip"
}, Hf = { class: "grid-actions" }, Vf = { class: "modal-content" }, qf = { class: "form-group" }, Kf = { class: "form-group" }, Wf = {
  key: 0,
  class: "form-group animate-fade-in"
}, Jf = ["value"], Yf = {
  key: 1,
  class: "form-group animate-fade-in"
}, Gf = ["value"], Xf = {
  key: 2,
  class: "form-group animate-fade-in"
}, Zf = ["value"], Qf = { class: "form-group" }, eu = { class: "modal-btns" }, tu = {
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
    const t = e, n = ve(() => {
      if (typeof t.profile == "object") return t.profile;
      try {
        return t.profile ? JSON.parse(t.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), o = ve(() => {
      if (Array.isArray(t.overlapCourses)) return t.overlapCourses;
      try {
        return t.overlapCourses ? JSON.parse(t.overlapCourses) : [];
      } catch {
        return [];
      }
    }), r = ve(() => {
      if (Array.isArray(t.allInterests)) return t.allInterests;
      try {
        return t.allInterests ? JSON.parse(t.allInterests) : [];
      } catch {
        return console.error("Failed to parse interests"), [];
      }
    }), s = ve(() => {
      if (Array.isArray(t.timeSlots)) return t.timeSlots;
      try {
        return t.timeSlots ? JSON.parse(t.timeSlots) : [];
      } catch {
        return [];
      }
    }), i = ve(() => (n.value.username || "??").charAt(0).toUpperCase()), l = ve(() => {
      const E = ["#4158D0", "#C850C0", "#0093E9", "#80D0C7"], $ = (n.value.username?.length || 0) % E.length;
      return { backgroundColor: E[$] };
    }), d = ve(() => s.value.length > 0), f = (E) => {
      if (!E) return "";
      const [$, j] = E.split(":"), I = parseInt($), F = I >= 12 ? "pm" : "am";
      return `${I % 12 || 12}${j !== "00" ? `:${j}` : ""}${F}`;
    }, c = ve(() => s.value.slice(0, 3).map((E) => ({
      dayShort: E.day?.substring(0, 3) || "Any",
      timeRange: E.start_time ? `${f(E.start_time)}-${f(E.end_time)}` : "Flex"
    }))), p = ve(() => {
      if (s.value.length === 0) return "🔄";
      const E = s.value[0];
      if (!E.start_time) return "🔄";
      const $ = parseInt(E.start_time.split(":")[0]);
      return $ < 12 ? "🌅" : $ < 17 ? "☀️" : "🌙";
    }), x = () => {
      window.location.href = `/profile/${n.value.id}/`;
    }, w = /* @__PURE__ */ Y(!1), v = /* @__PURE__ */ Y({
      group_name: "",
      group_description: "",
      group_type: "",
      major: "",
      interest: "",
      course: "",
      message: ""
    }), k = () => {
      v.value = {
        group_name: "",
        group_description: "",
        group_type: "",
        course: o.value.length > 0 ? o.value[0] : "",
        major: "",
        interest: "",
        message: ""
      }, w.value = !0;
    }, b = async () => {
      if (!v.value.group_type) {
        alert("Please select a Group Type (Course, Major, or General).");
        return;
      }
      if (!v.value.group_name || !v.value.group_description) {
        alert("Please provide a name and description for the group.");
        return;
      }
      const E = new FormData();
      E.append("group_name", v.value.group_name), E.append("group_description", v.value.group_description), E.append("group_type", v.value.group_type), E.append("course_name", v.value.course), E.append("invite_message", v.value.message || "Hi! I'd like to study together."), v.value.group_type === "course" && E.append("course_name", v.value.course), v.value.group_type === "major" && E.append("major_name", v.value.major), v.value.group_type === "general" && E.append("interest", v.value.interest);
      try {
        const $ = document.cookie.split("; ").find((j) => j.startsWith("csrftoken="))?.split("=")[1];
        await K.post(`/student/${n.value.id}/create-group/`, E, {
          headers: {
            "X-CSRFToken": $,
            "X-Requested-With": "XMLHttpRequest"
          }
        }), alert("Invite sent! Awaiting Admin approval."), w.value = !1;
      } catch ($) {
        console.error($), alert("Connection failed. Please check your inputs.");
      }
    };
    return (E, $) => (A(), T("div", $f, [
      a("div", Af, [
        a("div", {
          class: "grid-avatar",
          style: ke(l.value)
        }, S(i.value), 5),
        a("div", Tf, [
          a("div", Rf, S(n.value.username), 1),
          a("div", Of, S(n.value.major) + " • Y" + S(n.value.year), 1)
        ]),
        a("div", Pf, S(e.matchPercent) + "%", 1)
      ]),
      a("div", jf, [
        a("div", Mf, [
          $[8] || ($[8] = a("span", null, "📚", -1)),
          a("span", null, S(o.value.length), 1)
        ]),
        a("div", Df, [
          $[9] || ($[9] = a("span", null, "⏰", -1)),
          a("span", null, S(e.overlapHours) + "h", 1)
        ]),
        a("div", Nf, [
          a("span", null, S(p.value), 1)
        ])
      ]),
      d.value ? (A(), T("div", If, [
        (A(!0), T(oe, null, we(c.value.slice(0, 2), (j) => (A(), T("span", {
          key: j.dayShort,
          class: "grid-chip"
        }, S(j.dayShort) + " " + S(j.timeRange), 1))), 128)),
        e.timeSlots.length > 2 ? (A(), T("span", Lf, " +" + S(e.timeSlots.length - 2), 1)) : X("", !0)
      ])) : (A(), T("div", Bf, "No schedule")),
      o.value.length ? (A(), T("div", Ff, [
        (A(!0), T(oe, null, we(o.value.slice(0, 2), (j) => (A(), T("span", {
          key: j,
          class: "grid-chip course"
        }, S(j), 1))), 128)),
        o.value.length > 2 ? (A(), T("span", zf, " +" + S(o.value.length - 2), 1)) : X("", !0)
      ])) : (A(), T("div", Uf, "No courses match")),
      a("div", Hf, [
        a("button", {
          class: "grid-btn primary",
          onClick: x
        }, " View Profile "),
        a("button", {
          class: "connect-btn",
          onClick: lo(k, ["stop"])
        }, " Connect with " + S(n.value.username), 1),
        w.value ? (A(), T("div", {
          key: 0,
          class: "modal-overlay",
          onClick: $[7] || ($[7] = lo((j) => w.value = !1, ["self"]))
        }, [
          a("div", Vf, [
            $[20] || ($[20] = a("h3", null, "Setup Study Group", -1)),
            a("div", qf, [
              $[10] || ($[10] = a("label", null, "Group Name", -1)),
              qe(a("input", {
                "onUpdate:modelValue": $[0] || ($[0] = (j) => v.value.group_name = j),
                placeholder: "Name your group...",
                class: "modal-input"
              }, null, 512), [
                [Tt, v.value.group_name]
              ])
            ]),
            a("div", Kf, [
              $[12] || ($[12] = a("label", null, "Group Category", -1)),
              qe(a("select", {
                "onUpdate:modelValue": $[1] || ($[1] = (j) => v.value.group_type = j),
                class: "modal-input",
                required: ""
              }, [...$[11] || ($[11] = [
                a("option", {
                  value: "",
                  disabled: ""
                }, "-- Choose a category --", -1),
                a("option", { value: "course" }, "Course-Based (Focus on a subject)", -1),
                a("option", { value: "major" }, "Major-Based (Connect with your department)", -1),
                a("option", { value: "general" }, "General Study (Casual study session)", -1)
              ])], 512), [
                [Fn, v.value.group_type]
              ])
            ]),
            v.value.group_type === "course" ? (A(), T("div", Wf, [
              $[14] || ($[14] = a("label", null, "Which course are you studying?", -1)),
              qe(a("select", {
                "onUpdate:modelValue": $[2] || ($[2] = (j) => v.value.course = j),
                class: "modal-input"
              }, [
                $[13] || ($[13] = a("option", {
                  value: "",
                  disabled: ""
                }, "Select a course", -1)),
                (A(!0), T(oe, null, we(o.value, (j) => (A(), T("option", {
                  key: j,
                  value: j
                }, S(j), 9, Jf))), 128))
              ], 512), [
                [Fn, v.value.course]
              ])
            ])) : X("", !0),
            v.value.group_type === "major" ? (A(), T("div", Yf, [
              $[16] || ($[16] = a("label", null, "Target Major", -1)),
              qe(a("select", {
                "onUpdate:modelValue": $[3] || ($[3] = (j) => v.value.major = j),
                class: "modal-input"
              }, [
                $[15] || ($[15] = a("option", {
                  value: "",
                  disabled: ""
                }, "Confirm major", -1)),
                a("option", {
                  value: n.value.major
                }, S(n.value.major), 9, Gf)
              ], 512), [
                [Fn, v.value.major]
              ])
            ])) : X("", !0),
            v.value.group_type === "general" ? (A(), T("div", Xf, [
              $[18] || ($[18] = a("label", null, "Select Primary Interest", -1)),
              qe(a("select", {
                "onUpdate:modelValue": $[4] || ($[4] = (j) => v.value.interest = j),
                class: "modal-input"
              }, [
                $[17] || ($[17] = a("option", {
                  value: "",
                  disabled: ""
                }, "What is the focus?", -1)),
                (A(!0), T(oe, null, we(r.value, (j) => (A(), T("option", {
                  key: j.id,
                  value: j.id
                }, S(j.name || j.interest_name), 9, Zf))), 128))
              ], 512), [
                [Fn, v.value.interest]
              ])
            ])) : X("", !0),
            a("div", Qf, [
              $[19] || ($[19] = a("label", null, "Description", -1)),
              qe(a("textarea", {
                "onUpdate:modelValue": $[5] || ($[5] = (j) => v.value.group_description = j),
                placeholder: "Describe the goal...",
                class: "modal-input"
              }, null, 512), [
                [Tt, v.value.group_description]
              ])
            ]),
            a("div", eu, [
              a("button", {
                onClick: $[6] || ($[6] = (j) => w.value = !1),
                class: "cancel-btn"
              }, "Cancel"),
              a("button", {
                class: "grid-btn primary",
                onClick: b
              }, "Create & Invite")
            ])
          ])
        ])) : X("", !0)
      ])
    ]));
  }
}, vi = /* @__PURE__ */ _t(tu, [["styles", [Ef]], ["__scopeId", "data-v-d978c2d5"]]), nu = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";.elegant-item-container[data-v-aabf53ee]{font-family:Inter,sans-serif;position:relative;background:#fff;border-radius:16px;padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;transition:all .5s cubic-bezier(.19,1,.22,1);border:1px solid rgba(0,0,0,.05);overflow:hidden}.elegant-item-container[data-v-aabf53ee]:hover{background:#fafafb;transform:translateY(-2px);box-shadow:0 10px 30px -15px #0000001a;border-color:#00000014}.glow-accent[data-v-aabf53ee]{position:absolute;top:-50px;left:-50px;width:150px;height:150px;filter:blur(60px);opacity:.1;pointer-events:none;z-index:0}.elegant-content[data-v-aabf53ee]{position:relative;z-index:1;display:flex;width:100%;align-items:center;justify-content:space-between}.identity-block[data-v-aabf53ee]{display:flex;align-items:center;gap:1rem;flex:1.5}.avatar-container[data-v-aabf53ee]{position:relative;width:52px;height:52px}.avatar-main[data-v-aabf53ee]{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem}.name-section .username[data-v-aabf53ee]{font-size:1rem;font-weight:600;color:#111827;margin:0}.name-section .major[data-v-aabf53ee]{font-size:.75rem;color:#6b7280;margin:2px 0 0}.match-stats[data-v-aabf53ee]{display:flex;align-items:center;justify-content:center;flex:2;gap:1.5rem}.stat-group[data-v-aabf53ee]{display:flex;flex-direction:column;align-items:center}.stat-label[data-v-aabf53ee]{font-size:.65rem;text-transform:uppercase;letter-spacing:.05em;color:#9ca3af;font-weight:500;margin-bottom:2px}.stat-value[data-v-aabf53ee]{font-size:1.1rem;font-weight:600;color:#374151}.stat-value small[data-v-aabf53ee]{font-size:.75rem;color:#9ca3af;margin-left:1px}.stat-value.highlight[data-v-aabf53ee]{color:#4f46e5}.vertical-divider[data-v-aabf53ee]{width:1px;height:24px;background:#f3f4f6}.action-block[data-v-aabf53ee]{display:flex;align-items:center;gap:.75rem;flex:1;justify-content:flex-end}.action-trigger[data-v-aabf53ee]{border:none;cursor:pointer;transition:all .2s ease}.action-trigger.primary[data-v-aabf53ee]{background:#111827;color:#fff;padding:8px 18px;border-radius:8px;font-size:.8rem;font-weight:500}.action-trigger.primary[data-v-aabf53ee]:hover{background:#1f2937;transform:translateY(-1px)}.action-trigger.icon[data-v-aabf53ee]{background:#f9fafb;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4b5563;border:1px solid #f3f4f6}.action-trigger.icon[data-v-aabf53ee]:hover{background:#fff;border-color:#e5e7eb;color:#111827}@media(max-width:768px){.elegant-content[data-v-aabf53ee]{flex-direction:column;gap:1.25rem;text-align:center}.identity-block[data-v-aabf53ee]{flex-direction:column}.match-stats[data-v-aabf53ee]{width:100%;border-top:1px solid #f3f4f6;padding-top:1rem}.action-block[data-v-aabf53ee]{width:100%;justify-content:center}}', ou = { class: "elegant-item-container" }, ru = { class: "elegant-content" }, su = { class: "identity-block" }, au = { class: "avatar-container" }, iu = { class: "name-section" }, lu = { class: "username" }, du = { class: "major" }, cu = { class: "match-stats" }, fu = { class: "stat-group" }, uu = { class: "stat-value highlight" }, pu = { class: "stat-group" }, hu = { class: "stat-value" }, mu = { class: "stat-group" }, gu = { class: "stat-value" }, vu = {
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
    const n = e, o = ve(() => {
      if (typeof n.profile == "object") return n.profile;
      try {
        return n.profile ? JSON.parse(n.profile) : { username: "..." };
      } catch {
        return { username: "Error" };
      }
    }), r = ve(() => {
      if (Array.isArray(n.overlapCourses)) return n.overlapCourses;
      try {
        return n.overlapCourses ? JSON.parse(n.overlapCourses) : [];
      } catch {
        return [];
      }
    }), s = ve(() => (o.value.username || "??").charAt(0).toUpperCase()), i = ve(() => {
      const c = [
        "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
        "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
      ], p = (o.value.username?.length || 0) % c.length;
      return { background: c[p] };
    }), l = () => {
      const c = o.value.username.replace("@", "");
      window.location.href = `/profile/${c}/`;
    }, d = () => {
      const c = o.value.username.replace("@", "");
      window.location.href = `/study-groups/create/?invite=${c}`;
    }, f = () => {
      const c = o.value.username.replace("@", "");
      window.location.href = `/messages/new/?to=${c}`;
    };
    return (c, p) => (A(), T("div", ou, [
      a("div", {
        class: "glow-accent",
        style: ke(i.value)
      }, null, 4),
      a("div", ru, [
        a("div", su, [
          a("div", au, [
            a("div", {
              class: "avatar-ring",
              style: ke(c.avatarBorder)
            }, null, 4),
            a("div", {
              class: "avatar-main",
              style: ke(i.value)
            }, S(s.value), 5)
          ]),
          a("div", iu, [
            a("h3", lu, S(o.value.username), 1),
            a("p", du, S(o.value.major), 1)
          ])
        ]),
        a("div", cu, [
          a("div", fu, [
            p[1] || (p[1] = a("span", { class: "stat-label" }, "Match", -1)),
            a("span", uu, [
              te(S(e.matchPercent), 1),
              p[0] || (p[0] = a("small", null, "%", -1))
            ])
          ]),
          p[6] || (p[6] = a("div", { class: "vertical-divider" }, null, -1)),
          a("div", pu, [
            p[3] || (p[3] = a("span", { class: "stat-label" }, "Overlap", -1)),
            a("span", hu, [
              te(S(e.overlapHours), 1),
              p[2] || (p[2] = a("small", null, "h", -1))
            ])
          ]),
          p[7] || (p[7] = a("div", { class: "vertical-divider" }, null, -1)),
          a("div", mu, [
            p[5] || (p[5] = a("span", { class: "stat-label" }, "Shared", -1)),
            a("span", gu, [
              te(S(r.value.length), 1),
              p[4] || (p[4] = a("small", null, "📚", -1))
            ])
          ])
        ]),
        a("div", { class: "action-block" }, [
          a("button", {
            class: "action-trigger primary",
            onClick: l
          }, [...p[8] || (p[8] = [
            a("span", null, "View", -1)
          ])]),
          a("button", {
            class: "action-trigger icon",
            onClick: f
          }, [...p[9] || (p[9] = [
            a("span", { class: "icon-inner" }, "💬", -1)
          ])]),
          a("button", {
            class: "action-trigger icon",
            onClick: d
          }, [...p[10] || (p[10] = [
            a("span", { class: "icon-inner" }, "📅", -1)
          ])])
        ])
      ])
    ]));
  }
}, bi = /* @__PURE__ */ _t(vu, [["styles", [nu]], ["__scopeId", "data-v-aabf53ee"]]), bu = ".discovery-main[data-v-59ba84ef]{padding:1.5rem;font-family:Inter,sans-serif;overflow-y:auto;height:100vh}[data-v-59ba84ef] .connect-btn{width:100%;padding:.6rem;background:#3b82f6;color:#fff;border:none;border-radius:12px;font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s ease;margin-top:auto}[data-v-59ba84ef] .connect-btn:hover{background:#2563eb;transform:translateY(-2px);box-shadow:0 4px 12px #3b82f64d}[data-v-59ba84ef] .connect-btn:active{transform:translateY(0)}[data-v-59ba84ef] .connect-btn.loading{background:#94a3b8;cursor:wait}.discovery-header[data-v-59ba84ef]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:.5rem;width:70vw}.header-left[data-v-59ba84ef]{flex-shrink:0}.header-title[data-v-59ba84ef]{font-size:1.3rem;font-weight:600;color:#0f172a;margin:0 0 .1rem;letter-spacing:-.02em;white-space:nowrap}.header-subtitle[data-v-59ba84ef]{font-size:.7rem;color:#64748b;margin:0;white-space:nowrap}.header-actions[data-v-59ba84ef]{display:flex;align-items:center;gap:1rem;justify-content:space-between;width:350px}.search-wrapper[data-v-59ba84ef]{position:relative;width:200px;flex-shrink:0}.search-icon[data-v-59ba84ef]{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.8rem}.search-input[data-v-59ba84ef]{width:100%;padding:.5rem 1.8rem .5rem 2.2rem;border:1px solid #f1f5f9;border-radius:40px;background:#fff;font-size:.8rem;transition:all .2s}.search-input[data-v-59ba84ef]:focus{outline:none;border-color:#1e3a5f;box-shadow:0 0 0 3px #1e3a5f1a}.search-clear[data-v-59ba84ef]{position:absolute;right:.25rem;top:50%;transform:translateY(-50%);width:22px;height:22px;border:none;background:#f1f5f9;border-radius:11px;color:#64748b;font-size:.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.search-clear[data-v-59ba84ef]:hover{background:#e2e8f0;color:#1e3a5f}.view-toggles[data-v-59ba84ef]{display:flex;gap:.2rem;background:#f8fafc;padding:.2rem;border-radius:40px;border:1px solid #f1f5f9;flex-shrink:0}.view-btn[data-v-59ba84ef]{width:32px;height:32px;border:none;background:transparent;border-radius:30px;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;padding:0}.view-btn[data-v-59ba84ef]:hover{color:#1e3a5f;background:#fff}.view-btn.active[data-v-59ba84ef]{background:#1e3a5f;color:#fff}.filter-tabs[data-v-59ba84ef]{display:flex;gap:.4rem;overflow-x:auto;padding-bottom:.5rem;margin-bottom:1.5rem;scrollbar-width:none;width:100%}.filter-tabs[data-v-59ba84ef]::-webkit-scrollbar{display:none}.filter-tab[data-v-59ba84ef]{display:flex;align-items:center;gap:.4rem;padding:.4rem 1rem;border:1px solid #f1f5f9;background:#fff;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}.filter-tab[data-v-59ba84ef]:hover{background:#f8fafc;color:#1e3a5f}.filter-tab.active[data-v-59ba84ef]{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.tab-emoji[data-v-59ba84ef]{font-size:.85rem}.tab-badge[data-v-59ba84ef]{background:#f1f5f9;padding:.1rem .4rem;border-radius:30px;font-size:.6rem;color:#64748b;margin-left:.1rem}.filter-tab.active .tab-badge[data-v-59ba84ef]{background:#fff3;color:#fff}.results-container[data-v-59ba84ef]{min-height:400px;width:100%}.results-flex[data-v-59ba84ef]{display:flex;flex-wrap:wrap;gap:1.2rem;width:100%}.results-flex[data-v-59ba84ef]>*{flex:0 0 calc(25% - .9rem);min-width:280px;max-width:100%;height:340px;margin-bottom:0}[data-v-59ba84ef] .grid-card{height:100%;width:100%;margin:0}.results-list[data-v-59ba84ef]{display:flex;flex-direction:column;gap:1rem;width:100%}.results-list[data-v-59ba84ef]>*{width:100%;height:auto;min-height:200px}.empty-state[data-v-59ba84ef]{text-align:center;padding:3rem 2rem;background:#fff;border-radius:32px;border:2px dashed #f1f5f9;width:100%}.empty-icon[data-v-59ba84ef]{font-size:2.5rem;margin-bottom:1rem;opacity:.5}.empty-state h3[data-v-59ba84ef]{font-size:1.1rem;font-weight:600;color:#0f172a;margin-bottom:.3rem}.empty-state p[data-v-59ba84ef]{font-size:.85rem;color:#64748b;margin-bottom:1.2rem}.empty-reset[data-v-59ba84ef]{background:#f8fafc;border:1px solid #f1f5f9;padding:.5rem 1.5rem;border-radius:40px;color:#1e3a5f;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.empty-reset[data-v-59ba84ef]:hover{background:#1e3a5f;color:#fff}.fade-enter-active[data-v-59ba84ef],.fade-leave-active[data-v-59ba84ef]{transition:opacity .3s ease}.fade-enter-from[data-v-59ba84ef],.fade-leave-to[data-v-59ba84ef]{opacity:0}.modal-overlay[data-v-59ba84ef]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:99999!important}@media(max-width:1200px){.results-flex[data-v-59ba84ef]>*{flex:0 0 calc(33.333% - .8rem)}}@media(max-width:900px){.results-flex[data-v-59ba84ef]>*{flex:0 0 calc(50% - .6rem)}}@media(max-width:768px){.discovery-header[data-v-59ba84ef]{flex-direction:column;align-items:flex-start}.header-left[data-v-59ba84ef]{width:100%}.header-title[data-v-59ba84ef],.header-subtitle[data-v-59ba84ef]{white-space:normal}.header-actions[data-v-59ba84ef]{width:100%;justify-content:space-between}.search-wrapper[data-v-59ba84ef]{width:calc(100% - 90px)}.results-flex[data-v-59ba84ef]>*{flex:0 0 100%;height:auto;min-height:340px}}", xu = { class: "discovery-main" }, yu = { class: "discovery-header" }, wu = { class: "header-actions" }, _u = { class: "search-wrapper" }, ku = { class: "view-toggles" }, Cu = { class: "filter-tabs" }, Su = ["onClick"], Eu = { class: "tab-emoji" }, $u = { class: "tab-name" }, Au = { class: "tab-badge" }, Tu = { class: "results-container" }, Ru = {
  key: 1,
  class: "empty-state"
}, Ou = {
  __name: "GalleryManager.ce",
  props: {
    topMatches: String,
    sameMajor: String,
    sameCourse: String
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ Y("grid"), o = /* @__PURE__ */ Y(""), r = /* @__PURE__ */ Y("all"), s = ve(() => {
      try {
        const p = JSON.parse(t.topMatches), x = p.reduce((b, E) => E.match_percent > 85 ? b += 1 : b, 0), w = p.reduce((b, E) => E.overlap_hours > 5 ? b += 1 : b, 0), v = JSON.parse(t.sameMajor), k = JSON.parse(t.sameCourse);
        return {
          all: p.length,
          best: x,
          schedule: w,
          major: v.length,
          course: k.length
        };
      } catch (p) {
        return console.error(p), { all: 0, best: 0, schedule: 0, major: 0, course: 0 };
      }
    }), i = [
      { id: "all", name: "All", icon: "👥", count: s.value.all },
      { id: "high", name: "Best", icon: "⭐", count: s.value.best },
      {
        id: "schedule",
        name: "Schedule",
        icon: "🕒",
        count: s.value.schedule
      },
      {
        id: "courses",
        name: "Courses",
        icon: "📚",
        count: s.value.course
      },
      { id: "major", name: "Major", icon: "🎓", count: s.value.major }
    ], l = ve(() => r.value === "major" ? t.sameMajor : r.value === "courses" ? t.sameCourse : t.topMatches), d = ve(() => {
      try {
        return JSON.parse(l.value || "[]");
      } catch {
        return [];
      }
    }), f = ve(() => {
      let p = d.value;
      if (o.value) {
        const x = o.value.toLowerCase();
        p = p.filter(
          (w) => w.profile.username.toLowerCase().includes(x) || w.profile.major.toLowerCase().includes(x) || w.overlap_courses?.some(
            (v) => v.toLowerCase().includes(x)
          )
        );
      }
      switch (r.value) {
        case "high":
          p = p.filter((x) => x.match_percent >= 85);
          break;
        case "schedule":
          p = p.filter((x) => x.overlap_hours >= 5);
          break;
        case "courses":
          p = p.filter((x) => x.overlap_courses?.length >= 2);
          break;
      }
      return p;
    }), c = () => {
      o.value = "", r.value = "all";
    };
    return Vn(d, (p) => {
    }), (p, x) => (A(), T("div", xu, [
      a("div", yu, [
        x[7] || (x[7] = a("div", { class: "header-left" }, [
          a("h1", { class: "header-title" }, "Find Study Partners"),
          a("p", { class: "header-subtitle" }, "Connect with classmates")
        ], -1)),
        a("div", wu, [
          a("div", _u, [
            x[4] || (x[4] = a("span", { class: "search-icon" }, "🔍", -1)),
            qe(a("input", {
              "onUpdate:modelValue": x[0] || (x[0] = (w) => o.value = w),
              type: "text",
              placeholder: "Search...",
              class: "search-input"
            }, null, 512), [
              [Tt, o.value]
            ]),
            o.value ? (A(), T("button", {
              key: 0,
              class: "search-clear",
              onClick: x[1] || (x[1] = (w) => o.value = "")
            }, " ✕ ")) : X("", !0)
          ]),
          a("div", ku, [
            a("button", {
              class: me(["view-btn", { active: n.value === "grid" }]),
              onClick: x[2] || (x[2] = (w) => n.value = "grid"),
              title: "Grid view"
            }, [...x[5] || (x[5] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-59ba84ef><rect x="3" y="3" width="7" height="7" rx="1" data-v-59ba84ef></rect><rect x="14" y="3" width="7" height="7" rx="1" data-v-59ba84ef></rect><rect x="3" y="14" width="7" height="7" rx="1" data-v-59ba84ef></rect><rect x="14" y="14" width="7" height="7" rx="1" data-v-59ba84ef></rect></svg>', 1)
            ])], 2),
            a("button", {
              class: me(["view-btn", { active: n.value === "list" }]),
              onClick: x[3] || (x[3] = (w) => n.value = "list"),
              title: "List view"
            }, [...x[6] || (x[6] = [
              We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-59ba84ef><line x1="8" y1="6" x2="21" y2="6" data-v-59ba84ef></line><line x1="8" y1="12" x2="21" y2="12" data-v-59ba84ef></line><line x1="8" y1="18" x2="21" y2="18" data-v-59ba84ef></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-59ba84ef></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-59ba84ef></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-59ba84ef></line></svg>', 1)
            ])], 2)
          ])
        ])
      ]),
      a("div", Cu, [
        (A(), T(oe, null, we(i, (w) => a("button", {
          key: w.id,
          class: me(["filter-tab", { active: r.value === w.id }]),
          onClick: (v) => r.value = w.id
        }, [
          a("span", Eu, S(w.icon), 1),
          a("span", $u, S(w.name), 1),
          a("span", Au, S(w.count), 1)
        ], 10, Su)), 64))
      ]),
      a("div", Tu, [
        ge($t, {
          name: "fade",
          mode: "out-in"
        }, {
          default: gt(() => [
            f.value.length > 0 ? (A(), T("div", {
              key: 0,
              class: me(["results-flex", { "results-list": n.value === "list" }])
            }, [
              n.value === "grid" ? (A(!0), T(oe, { key: 0 }, we(f.value, (w, v) => (A(), oo(vi, {
                key: v,
                profile: w.profile,
                "match-percent": w.match_percent,
                "overlap-hours": w.overlap_hours,
                "overlap-courses": w.overlap_courses,
                "time-slots": w.daily_schedules
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128)) : (A(!0), T(oe, { key: 1 }, we(f.value, (w, v) => (A(), oo(bi, {
                profile: w.profile,
                key: w.profile.username.substring(0, 2) + v,
                "match-percent": w.match_percent,
                "overlap-hours": w.overlap_hours,
                "overlap-courses": w.overlap_courses,
                "time-slots": w.daily_schedules
              }, null, 8, ["profile", "match-percent", "overlap-hours", "overlap-courses", "time-slots"]))), 128))
            ], 2)) : (A(), T("div", Ru, [
              x[8] || (x[8] = a("div", { class: "empty-icon" }, "🔍", -1)),
              x[9] || (x[9] = a("h3", null, "No matches found", -1)),
              x[10] || (x[10] = a("p", null, "Try adjusting your filters", -1)),
              a("button", {
                class: "empty-reset",
                onClick: c
              }, " Clear all filters ")
            ]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}, Pu = /* @__PURE__ */ _t(Ou, [["styles", [bu]], ["__scopeId", "data-v-59ba84ef"]]), ju = ".btn-approve[data-v-3d0c8d0a]{flex:1;background:#10b981bc;color:#fff;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.btn-deny[data-v-3d0c8d0a]{flex:1;background:#fee2e2;color:#ef4444;border:none;padding:5px;border-radius:12px;font-weight:700;cursor:pointer}.surface[data-v-3d0c8d0a]{background:var(--panel);border-radius:24px;padding:24px;border:1px solid var(--border);box-shadow:0 10px 30px #00000005}.badge[data-v-3d0c8d0a]{font-size:.65rem;font-weight:700;color:var(--primary);background:#eef2ff;padding:4px 10px;border-radius:8px}.request-list[data-v-3d0c8d0a]{display:flex;flex-direction:column;gap:12px;margin-top:10px}.request-card[data-v-3d0c8d0a]{display:flex;align-items:center;justify-content:space-between;padding:16px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;transition:all .3s cubic-bezier(.4,0,.2,1)}.request-card[data-v-3d0c8d0a]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 12px 20px #0000000a}.group-info[data-v-3d0c8d0a]{display:flex;align-items:center;gap:14px}.avatar[data-v-3d0c8d0a]{width:42px;height:42px;background:linear-gradient(135deg,var(--primary),#818cf8);border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}.text-content[data-v-3d0c8d0a]{display:flex;flex-direction:column}.group-name[data-v-3d0c8d0a]{font-weight:700;color:var(--text-main);font-size:.9rem}.creator-tag[data-v-3d0c8d0a]{font-size:.75rem;color:var(--text-muted)}.action-group[data-v-3d0c8d0a]{display:flex;gap:10px}.btn-action[data-v-3d0c8d0a]{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s ease}.btn-action svg[data-v-3d0c8d0a]{width:14px;height:14px}.btn-view[data-v-3d0c8d0a]{background-color:#f0f4ff;color:#4f46e5}.btn-action[data-v-3d0c8d0a]:hover{transform:translateY(-1px);filter:brightness(.95)}.btn-view[data-v-3d0c8d0a]:hover{background-color:#4f46e5;color:#fff}.btn-approve[data-v-3d0c8d0a]:hover{background-color:#10b981;color:#fff}.btn-deny[data-v-3d0c8d0a]:hover{background-color:#f43f5e;color:#fff}", Mu = { class: "surface" }, Du = { class: "surface-header" }, Nu = { class: "surface-title" }, Iu = { class: "badge" }, Lu = { class: "request-list" }, Bu = ["id"], Fu = { class: "group-info" }, zu = { class: "avatar" }, Uu = { class: "text-content" }, Hu = { class: "group-name" }, Vu = { class: "creator-tag" }, qu = { class: "action-group" }, Ku = ["onClick"], Wu = ["onClick"], Ju = ["onClick"], Yu = {
  __name: "InboundRequests.ce",
  props: {
    groups: Array
  },
  emits: ["action_taken", "show_details"],
  setup(e, { emit: t }) {
    K.defaults.xsrfCookieName = "csrftoken", K.defaults.xsrfHeaderName = "X-CSRFToken";
    const n = t, o = /* @__PURE__ */ Y(null), r = (l) => {
      o.value = l, n("show_details", l.id);
    }, s = async (l) => {
      try {
        await K.post(`/api/group/${l}/approve`), n("action_taken");
      } catch (d) {
        console.error(d);
      }
    }, i = async (l) => {
      try {
        await K.post(`/api/group/${l}/deny`), n("action_taken");
      } catch (d) {
        console.error(d);
      }
    };
    return (l, d) => (A(), T("section", Mu, [
      a("div", Du, [
        a("div", Nu, [
          d[0] || (d[0] = te(" Inbound Requests ", -1)),
          a("span", Iu, S(e.groups?.length || 0) + " NEW", 1)
        ])
      ]),
      a("div", Lu, [
        (A(!0), T(oe, null, we(e.groups, (f) => (A(), T("div", {
          key: f.id,
          class: "request-card",
          id: "group-" + f.id
        }, [
          a("div", Fu, [
            a("div", zu, S(f.name.charAt(0).toUpperCase()), 1),
            a("div", Uu, [
              a("span", Hu, S(f.name), 1),
              a("span", Vu, "by @" + S(f.creator), 1)
            ])
          ]),
          a("div", qu, [
            a("button", {
              class: "btn-action btn-view",
              onClick: (c) => r(f)
            }, [...d[1] || (d[1] = [
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
            ])], 8, Ku),
            a("button", {
              class: "btn-action btn-approve",
              onClick: (c) => s(f.id)
            }, [...d[2] || (d[2] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                a("polyline", { points: "20 6 9 17 4 12" })
              ], -1)
            ])], 8, Wu),
            a("button", {
              class: "btn-action btn-deny",
              onClick: (c) => i(f.id)
            }, [...d[3] || (d[3] = [
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
            ])], 8, Ju)
          ])
        ], 8, Bu))), 128))
      ])
    ]));
  }
}, Gu = /* @__PURE__ */ _t(Yu, [["styles", [ju]], ["__scopeId", "data-v-3d0c8d0a"]]), Xu = ':host{display:flex;justify-content:center;width:100%;min-height:100vh;--primary: #4f46e5;--bg-canvas: #f1f5f9;--sidebar: #0f172a;--panel: #ffffff;--text-main: #1e293b;--text-muted: #64748b;--accent-success: #10b981;--border: rgba(226, 232, 240, .6);background-color:var(--bg-canvas);font-family:system-ui,-apple-system,sans-serif;overflow:visible}.container{width:100%;max-width:1200px;display:grid;grid-template-columns:200px 1fr;gap:24px;padding:40px 20px}.sidebar{background:var(--sidebar);border-radius:20px;padding:24px 16px;color:#fff;height:fit-content;position:sticky;top:40px}.brand{display:flex;align-items:center;gap:10px;font-weight:800;margin-bottom:40px;padding-left:10px}.nav-item{display:flex;align-items:center;gap:12px;padding:12px;color:#94a3b8;text-decoration:none;border-radius:12px;font-size:.85rem;margin-bottom:4px}.nav-item.active{color:#fff;background:var(--primary)}.nav-emoji{font-size:1.1rem}.viewport{display:flex;flex-direction:column;gap:32px}.header h1{font-size:1.5rem;font-weight:800;margin:0}.status-badge{background:#fff;padding:6px 12px;border-radius:50px;font-size:.7rem;font-weight:700;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border)}.dot{width:6px;height:6px;background:var(--accent-success);border-radius:50%;animation:pulse-op 2s infinite}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;padding:24px;border-radius:20px;border:1px solid var(--border)}.card .label{font-size:.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase}.card .value{font-size:2rem;font-weight:800;display:block;margin-top:8px}.workspace{display:grid;grid-template-columns:1.6fr 1fr;gap:24px}.surface{background:#fff;border-radius:20px;padding:20px;border:1px solid var(--border)}.surface-title{display:flex;justify-content:space-between;font-weight:800;margin-bottom:20px}.feed-item{position:relative;display:flex;gap:12px;padding-bottom:20px;cursor:pointer}.feed-item:not(:last-child):before{content:"";position:absolute;left:16px;top:32px;bottom:0;width:1px;background:#e2e8f0}.feed-icon-wrapper{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:2;background:#f8fafc}.bg-register{background:#f5f3ff}.bg-create{background:#fffbeb}.feed-text{font-size:.8rem;color:var(--text-main)}.highlight{font-weight:700}.feed-time{font-size:.7rem;color:var(--text-muted);display:block;margin-top:2px}@keyframes pulse-op{0%{opacity:1}50%{opacity:.4}to{opacity:1}}.empty-state{text-align:center;padding:40px 0;color:var(--text-muted);font-size:.85rem}.modal-overlay{position:fixed;inset:0;background:#00000080;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn .2s ease}.modal-card{background:#fff;border-radius:20px;width:100%;max-width:480px;box-shadow:0 20px 35px -8px #0003;animation:slideUp .25s ease;overflow:hidden}.modal-header{padding:1rem 1.25rem;background:#fafbfc;border-bottom:1px solid #edf2f7}.header-top{display:flex;justify-content:space-between;align-items:center}.badge-group{display:flex;gap:.5rem;flex-wrap:wrap}.badge{padding:.25rem .75rem;border-radius:20px;font-size:.7rem;font-weight:600;letter-spacing:.3px;background:#fff;border:1px solid #e2e8f0;color:#4a5568}.badge.major{background:#e9d8fd;border-color:#d6bcfa;color:#553c9a}.badge.general{background:#c6f6d5;border-color:#9ae6b4;color:#22543d}.badge.project{background:#feebc8;border-color:#fbd38d;color:#7b341e}.badge.status.rejected{background:#fed7d7;border-color:#fc8181;color:#9b2c2c}.close-btn{width:28px;height:28px;border-radius:50%;border:none;background:#edf2f7;color:#4a5568;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}.close-btn:hover{background:#e2e8f0;transform:rotate(90deg)}.modal-body{padding:1.25rem}.title-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.75rem}.group-title{font-size:1.25rem;font-weight:700;color:#1a202c;margin:0;line-height:1.3}.course-tag{display:inline-flex;align-items:center;gap:.25rem;padding:.3rem .75rem;background:#ebf4ff;border-radius:30px;font-size:.75rem;font-weight:600;color:#2c5282;border:1px solid #bee3f8;white-space:nowrap}.course-tag.is-null{background:#f7fafc;color:#718096;border-color:#e2e8f0}.tag-emoji{font-size:.8rem}.description-box{background:#faf9ff;border-radius:12px;padding:.75rem 1rem;margin-bottom:1rem;border-left:3px solid #9f7aea}.description-text{margin:0;font-size:.85rem;color:#2d3748;line-height:1.5}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.6rem;margin-bottom:1rem}.info-item{display:flex;align-items:center;gap:.6rem;padding:.6rem;background:#f8fafc;border-radius:10px;border:1px solid #edf2f7}.item-emoji{font-size:1rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid #e2e8f0}.item-content{flex:1;display:flex;flex-direction:column;gap:.1rem}.item-label{font-size:.6rem;font-weight:700;color:#a0aec0;text-transform:uppercase;letter-spacing:.3px}.item-value{font-size:.8rem;font-weight:600;color:#1a202c;line-height:1.3}.item-value.is-null{color:#a0aec0;font-style:italic}.meta-row{display:flex;gap:.5rem;flex-wrap:wrap;padding-top:.5rem;border-top:1px dashed #e2e8f0}.meta-chip{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .6rem;background:#f7fafc;border-radius:30px;font-size:.65rem;font-weight:600;color:#4a5568;border:1px solid #e2e8f0}.chip-dot{width:6px;height:6px;border-radius:50%;background:#a0aec0}.meta-chip.admin .chip-dot{background:#805ad5}.meta-chip.admin{background:#faf5ff;border-color:#d6bcfa;color:#553c9a}.meta-chip.auto .chip-dot{background:#3182ce}.meta-chip.auto{background:#ebf8ff;border-color:#bee3f8;color:#2c5282}.meta-chip.active .chip-dot{background:#38a169}.meta-chip.active{background:#f0fff4;border-color:#c6f6d5;color:#22543d}.meta-chip.inactive .chip-dot{background:#e53e3e}.meta-chip.inactive{background:#fff5f5;border-color:#fed7d7;color:#9b2c2c}.modal-footer{padding:1rem 1.25rem 1.25rem;display:flex;gap:.75rem;border-top:1px solid #edf2f7}.btn{flex:1;padding:.6rem 1rem;border-radius:10px;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:flex;align-items:center;justify-content:center;gap:.3rem}.btn-outline{background:#fff;border:1.5px solid #e2e8f0;color:#4a5568}.btn-outline:hover{border-color:#f56565;color:#c53030;background:#fff5f5}.btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;box-shadow:0 4px 10px #667eea40}.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 15px #667eea4d}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){.modal-card{max-width:100%;margin:.5rem}.info-grid{grid-template-columns:1fr}.badge-group{gap:.3rem}.badge{padding:.2rem .5rem;font-size:.65rem}.meta-row{gap:.3rem}.meta-chip{padding:.2rem .5rem;font-size:.6rem}}', Zu = { class: "viewport" }, Qu = { class: "header" }, ep = {
  key: 0,
  class: "status-badge"
}, tp = { class: "stats" }, np = { class: "card" }, op = { class: "value" }, rp = { class: "card" }, sp = {
  class: "value",
  style: { color: "var(--primary)" }
}, ap = { class: "card" }, ip = { class: "value" }, lp = { class: "workspace" }, dp = ["groups"], cp = { class: "surface pulse-container" }, fp = { class: "feed-timeline" }, up = ["onClick"], pp = { key: 0 }, hp = { key: 1 }, mp = { key: 2 }, gp = { key: 3 }, vp = { key: 4 }, bp = { class: "feed-body" }, xp = { class: "feed-text" }, yp = { class: "highlight" }, wp = { class: "highlight" }, _p = { class: "highlight" }, kp = { class: "highlight" }, Cp = { class: "highlight" }, Sp = { class: "highlight" }, Ep = { class: "highlight" }, $p = { class: "feed-time" }, Ap = {
  key: 0,
  class: "empty-state"
}, Tp = { class: "modal-card" }, Rp = { class: "modal-header" }, Op = { class: "header-top" }, Pp = { class: "badge-group" }, jp = { class: "badge major" }, Mp = { class: "modal-body" }, Dp = { class: "title-row" }, Np = { class: "group-title" }, Ip = {
  key: 0,
  class: "description-box"
}, Lp = { class: "description-text" }, Bp = { class: "info-grid" }, Fp = { class: "info-item" }, zp = { class: "item-content" }, Up = { class: "item-value" }, Hp = { class: "info-item" }, Vp = { class: "item-content" }, qp = { class: "item-value" }, Kp = { class: "info-item" }, Wp = { class: "item-content" }, Jp = { class: "info-item" }, Yp = { class: "item-content" }, Gp = { class: "info-item" }, Xp = { class: "item-content" }, Zp = { class: "item-value" }, Qp = { class: "info-item" }, e1 = { class: "item-content" }, t1 = { class: "item-value" }, n1 = { class: "meta-row" }, o1 = { class: "modal-footer" }, r1 = {
  __name: "AdminDashboard.ce",
  setup(e) {
    const t = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y(!1), o = /* @__PURE__ */ Y([]), r = /* @__PURE__ */ Y({}), s = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y(!0), l = /* @__PURE__ */ Y(null), d = async () => {
      try {
        const k = await K.get("/api/admin/dashboard-data");
        o.value = k.data.pendingGroups || [], r.value = k.data.stats || {}, s.value = k.data.activities || [];
      } catch (k) {
        console.error("API Error:", k);
      } finally {
        i.value = !1;
      }
    }, f = (k) => {
      if (k.type === "create" && k.group.id) {
        const b = `group-${k.group.id}`, E = l.value.querySelector("inbound-request");
        if (E && E.shadowRoot) {
          const $ = E.shadowRoot.getElementById(b);
          $ && ($.scrollIntoView({
            behavior: "smooth",
            block: "center"
          }), console.log("here inside element"), $.style.outline = "2px solid var(--primary)", $.style.borderRadius = "20px", setTimeout(() => {
            $.style.outline = "transparent";
          }, 2e3));
        }
      } else
        console.error("Element not found in shadow root:", targetId);
    }, c = async (k) => {
      const b = k.detail ? k.detail[0] : k;
      if (!b || typeof b == "object") {
        console.error("Invalid ID received:", b);
        return;
      }
      try {
        const E = await K.get(`/api/group/${b}`);
        t.value = E.data, n.value = !0;
      } catch {
        console.error("Could not load group details");
      }
    }, p = (k, b) => {
      const E = (I) => {
        if (!I) return null;
        const F = I.match(/(\d{2}:\d{2}):\d{2}/);
        return F ? F[1] : I;
      }, $ = E(k), j = E(b);
      return !$ && !j ? "Time TBD" : $ ? j ? `${$} — ${j}` : `${$} - End TBD` : `Starts at ${j || "TBD"}`;
    }, x = (k, b) => {
      b === "approve" ? w(k) : v(k);
    }, w = async (k) => {
      try {
        await K.post(`/api/group/${k}/approve`), n.value = !1, d();
      } catch (b) {
        console.error(b);
      }
    }, v = async (k) => {
      try {
        await K.post(`/api/group/${k}/deny`), n.value = !1, d();
      } catch (b) {
        console.error(b);
      }
    };
    return Rn(d), (k, b) => (A(), T("div", {
      class: "container",
      ref_key: "rootContainer",
      ref: l
    }, [
      b[31] || (b[31] = We('<aside class="sidebar"><div class="brand"><span class="emoji-icon">📚</span> STUDYSYNC </div><nav><a href="/admin-dashboard/" class="nav-item active"><span class="nav-emoji">📊</span> Analytics </a><a href="/students/" class="nav-item"><span class="nav-emoji">👨‍🎓</span> Students </a></nav></aside>', 1)),
      a("main", Zu, [
        a("header", Qu, [
          b[5] || (b[5] = a("h1", null, "Command Center", -1)),
          i.value ? X("", !0) : (A(), T("div", ep, [...b[4] || (b[4] = [
            a("div", { class: "dot-live" }, null, -1),
            te(" OPERATIONAL ", -1)
          ])]))
        ]),
        a("section", tp, [
          a("div", np, [
            b[6] || (b[6] = a("span", { class: "label" }, "Total Groups", -1)),
            a("span", op, S(r.value.groups || 0), 1)
          ]),
          a("div", rp, [
            b[7] || (b[7] = a("span", { class: "label" }, "Pending", -1)),
            a("span", sp, S(r.value.pending || 0), 1)
          ]),
          a("div", ap, [
            b[8] || (b[8] = a("span", { class: "label" }, "Total Students", -1)),
            a("span", ip, S(r.value.students || 0), 1)
          ])
        ]),
        a("div", lp, [
          a("inbound-request", {
            groups: o.value,
            onAction_taken: d,
            onShow_details: c
          }, null, 40, dp),
          a("section", cp, [
            b[14] || (b[14] = a("div", { class: "surface-header" }, [
              a("div", { class: "surface-title" }, [
                te(" Notifications "),
                a("div", { class: "live-indicator" }, [
                  a("span", { class: "dot" })
                ])
              ])
            ], -1)),
            a("div", fp, [
              (A(!0), T(oe, null, we(s.value, (E) => (A(), T("div", {
                key: E.id,
                class: "feed-item",
                onClick: ($) => f(E)
              }, [
                a("div", {
                  class: me([
                    "feed-icon-wrapper",
                    `bg-${E.type || "default"}`
                  ])
                }, [
                  E.type === "register" ? (A(), T("span", pp, "👋")) : E.type === "create" ? (A(), T("span", hp, "👤")) : E.type === "approve" ? (A(), T("span", mp, " 👍")) : E.type === "deny" ? (A(), T("span", gp, "🚫")) : (A(), T("span", vp, "🔔"))
                ], 2),
                a("div", bp, [
                  a("div", xp, [
                    E.type === "register" ? (A(), T(oe, { key: 0 }, [
                      a("span", yp, S(E.sender), 1),
                      b[9] || (b[9] = te(" joined our community ", -1))
                    ], 64)) : E.type === "create" ? (A(), T(oe, { key: 1 }, [
                      a("span", wp, S(E.sender), 1),
                      b[10] || (b[10] = te(" wants to start ", -1)),
                      a("span", _p, S(E.group.name), 1)
                    ], 64)) : E.type === "approve" ? (A(), T(oe, { key: 2 }, [
                      a("span", kp, S(E.sender), 1),
                      b[11] || (b[11] = te(" approved the group ", -1)),
                      a("span", Cp, S(E.group.name), 1)
                    ], 64)) : E.type === "deny" ? (A(), T(oe, { key: 3 }, [
                      a("span", Sp, S(E.sender), 1),
                      b[12] || (b[12] = te(" denied the group ", -1)),
                      a("span", Ep, S(E.group.name), 1)
                    ], 64)) : (A(), T(oe, { key: 4 }, [
                      te(S(E.message || "Update"), 1)
                    ], 64))
                  ]),
                  a("span", $p, S(E.time_ago), 1)
                ])
              ], 8, up))), 128)),
              !s.value?.length && !i.value ? (A(), T("div", Ap, [...b[13] || (b[13] = [
                a("p", null, "📭 No recent pulses.", -1)
              ])])) : X("", !0)
            ])
          ]),
          n.value && t.value ? (A(), T("div", {
            key: 0,
            class: "modal-overlay",
            onClick: b[3] || (b[3] = lo((E) => n.value = !1, ["self"]))
          }, [
            a("div", Tp, [
              a("div", Rp, [
                a("div", Op, [
                  a("div", Pp, [
                    a("span", jp, S(t.value.major || "Undeclared"), 1),
                    a("span", {
                      class: me(["badge", t.value.group_type])
                    }, S(t.value.group_type === "general" ? "General" : "Project"), 3),
                    a("span", {
                      class: me(["badge status", t.value.status.toLowerCase()])
                    }, S(t.value.status), 3)
                  ]),
                  a("button", {
                    class: "close-btn",
                    onClick: b[0] || (b[0] = (E) => n.value = !1)
                  }, "✕")
                ])
              ]),
              a("div", Mp, [
                a("div", Dp, [
                  a("h3", Np, S(t.value.name), 1),
                  a("span", {
                    class: me(["course-tag", { "is-null": !t.value.course }])
                  }, [
                    b[15] || (b[15] = a("span", { class: "tag-emoji" }, "📖", -1)),
                    a("span", null, S(t.value.course_name || "No course"), 1)
                  ], 2)
                ]),
                t.value.description ? (A(), T("div", Ip, [
                  a("p", Lp, " “" + S(t.value.description) + "” ", 1)
                ])) : X("", !0),
                a("div", Bp, [
                  a("div", Fp, [
                    b[17] || (b[17] = a("span", { class: "item-emoji" }, "📅", -1)),
                    a("div", zp, [
                      b[16] || (b[16] = a("span", { class: "item-label" }, "Day", -1)),
                      a("span", Up, S(t.value.study_day || "TBD"), 1)
                    ])
                  ]),
                  a("div", Hp, [
                    b[19] || (b[19] = a("span", { class: "item-emoji" }, "⏰", -1)),
                    a("div", Vp, [
                      b[18] || (b[18] = a("span", { class: "item-label" }, "Time", -1)),
                      a("span", qp, S(p(
                        t.value.start_time,
                        t.value.end_time
                      )), 1)
                    ])
                  ]),
                  a("div", Kp, [
                    b[21] || (b[21] = a("span", { class: "item-emoji" }, "🎯", -1)),
                    a("div", Wp, [
                      b[20] || (b[20] = a("span", { class: "item-label" }, "Interest", -1)),
                      a("span", {
                        class: me(["item-value", { "is-null": !t.value.interest }])
                      }, S(t.value.interest || "None"), 3)
                    ])
                  ]),
                  a("div", Jp, [
                    b[23] || (b[23] = a("span", { class: "item-emoji" }, "📚", -1)),
                    a("div", Yp, [
                      b[22] || (b[22] = a("span", { class: "item-label" }, "Semester", -1)),
                      a("span", {
                        class: me(["item-value", { "is-null": !t.value.semester }])
                      }, S(t.value.semester || "—"), 3)
                    ])
                  ]),
                  a("div", Gp, [
                    b[25] || (b[25] = a("span", { class: "item-emoji" }, "👥", -1)),
                    a("div", Xp, [
                      b[24] || (b[24] = a("span", { class: "item-label" }, "Members", -1)),
                      a("span", Zp, S(t.value.max_members) + " max", 1)
                    ])
                  ]),
                  a("div", Qp, [
                    b[27] || (b[27] = a("span", { class: "item-emoji" }, "👤", -1)),
                    a("div", e1, [
                      b[26] || (b[26] = a("span", { class: "item-label" }, "Creator", -1)),
                      a("span", t1, "ID: " + S(t.value.creator), 1)
                    ])
                  ])
                ]),
                a("div", n1, [
                  a("span", {
                    class: me(["meta-chip", { admin: t.value.project_admin_managed }])
                  }, [
                    b[28] || (b[28] = a("span", { class: "chip-dot" }, null, -1)),
                    te(" " + S(t.value.project_admin_managed ? "Admin managed" : "User managed"), 1)
                  ], 2),
                  a("span", {
                    class: me(["meta-chip", { auto: t.value.auto_created }])
                  }, [
                    b[29] || (b[29] = a("span", { class: "chip-dot" }, null, -1)),
                    te(" " + S(t.value.auto_created ? "Auto" : "Manual"), 1)
                  ], 2),
                  a("span", {
                    class: me(["meta-chip", {
                      active: t.value.is_active,
                      inactive: !t.value.is_active
                    }])
                  }, [
                    b[30] || (b[30] = a("span", { class: "chip-dot" }, null, -1)),
                    te(" " + S(t.value.is_active ? "Active" : "Inactive"), 1)
                  ], 2)
                ])
              ]),
              a("div", o1, [
                a("button", {
                  onClick: b[1] || (b[1] = (E) => x(t.value.id, "deny")),
                  class: "btn btn-outline"
                }, " ✕ Decline "),
                a("button", {
                  onClick: b[2] || (b[2] = (E) => x(t.value.id, "approve")),
                  class: "btn btn-primary"
                }, " ✓ Approve ")
              ])
            ])
          ])) : X("", !0)
        ])
      ])
    ], 512));
  }
}, s1 = /* @__PURE__ */ _t(r1, [["styles", [Xu]]]), a1 = "[data-v-5c526232]{margin:0;padding:0;box-sizing:border-box}.bento-chat-container[data-v-5c526232]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#f5f7fa;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow:hidden}.bento-layout[data-v-5c526232]{display:grid;grid-template-columns:280px 1fr 320px;height:100vh;padding:20px;gap:20px}.bento-sidebar[data-v-5c526232],.bento-main[data-v-5c526232],.bento-resources[data-v-5c526232]{background:#fff;border-radius:32px;box-shadow:0 10px 30px -10px #00000008,0 0 0 1px #00000005;overflow:hidden;display:flex;flex-direction:column;height:calc(100vh - 40px)}.bento-sidebar[data-v-5c526232]{padding:0}.sidebar-header[data-v-5c526232]{padding:24px 20px 16px;border-bottom:1px solid #f1f5f9}.sidebar-brand[data-v-5c526232]{display:flex;align-items:center;gap:12px;margin-bottom:12px}.brand-icon[data-v-5c526232]{width:40px;height:40px;background:#1e3a5f;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff}.brand-name[data-v-5c526232]{font-size:18px;font-weight:700;color:#0f172a}.sidebar-badge[data-v-5c526232]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:11px;font-weight:600;color:#1e3a5f;display:inline-block}.sidebar-section[data-v-5c526232]{padding:20px;flex:1;overflow-y:auto}.sidebar-section[data-v-5c526232]::-webkit-scrollbar{width:4px}.sidebar-section[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.sidebar-section[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.section-header[data-v-5c526232]{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.section-title[data-v-5c526232]{font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase}.online-count[data-v-5c526232]{font-size:11px;color:#10b981;font-weight:600;background:#d1fae5;padding:2px 8px;border-radius:30px}.members-list[data-v-5c526232]{display:flex;flex-direction:column;gap:8px}.member-card[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;transition:all .2s}.member-card[data-v-5c526232]:hover{background:#f8fafc}.member-avatar-wrapper[data-v-5c526232]{position:relative;width:44px;height:44px}.member-avatar[data-v-5c526232]{width:100%;height:100%;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.1rem;color:#fff;box-shadow:0 4px 8px #0000000d}.status-dot[data-v-5c526232]{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;border:2px solid white}.status-dot.online[data-v-5c526232]{background:#10b981}.status-dot.away[data-v-5c526232]{background:#f59e0b}.member-details[data-v-5c526232]{flex:1}.member-name[data-v-5c526232]{font-size:14px;font-weight:600;color:#0f172a;margin-bottom:2px}.member-status-text[data-v-5c526232]{font-size:11px;color:#94a3b8}.bento-main[data-v-5c526232]{display:flex;flex-direction:column;background:#fff}.chat-header[data-v-5c526232]{padding:24px 28px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center}.group-name[data-v-5c526232]{font-size:22px;font-weight:700;color:#0f172a;margin-bottom:6px;letter-spacing:-.02em}.group-meta[data-v-5c526232]{display:flex;gap:16px}.meta-item[data-v-5c526232]{display:flex;align-items:center;gap:6px;font-size:13px;color:#64748b}.meta-item.online[data-v-5c526232]{color:#10b981}.online-dot[data-v-5c526232]{width:8px;height:8px;background:#10b981;border-radius:50%;display:inline-block}.video-button[data-v-5c526232]{width:48px;height:48px;border-radius:16px;background:#1e3a5f;border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.video-button[data-v-5c526232]:hover{background:#14273f;transform:translateY(-2px);box-shadow:0 8px 16px #1e3a5f4d}.messages-container[data-v-5c526232]{flex:1;overflow-y:auto;padding:28px;background:#f8fafc}.messages-container[data-v-5c526232]::-webkit-scrollbar{width:4px}.messages-container[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.messages-container[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.message-group[data-v-5c526232]{margin-bottom:20px;animation:slideIn-5c526232 .2s ease}@keyframes slideIn-5c526232{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.message-row[data-v-5c526232]{display:flex;max-width:70%}.own-message[data-v-5c526232]{margin-left:auto;justify-content:flex-end}.peer-message[data-v-5c526232]{margin-right:auto;justify-content:flex-start}.message-bubble[data-v-5c526232]{background:#fff;border-radius:20px;padding:12px 16px;box-shadow:0 2px 8px #00000005;border:1px solid #f1f5f9}.own-message .message-bubble[data-v-5c526232]{background:#1e3a5f;border-color:#1e3a5f}.message-header[data-v-5c526232]{display:flex;align-items:center;gap:8px;margin-bottom:6px}.own-message .message-header[data-v-5c526232]{justify-content:flex-end}.message-sender[data-v-5c526232]{font-size:12px;font-weight:600;color:#1e3a5f}.own-message .message-sender[data-v-5c526232]{color:#ffffffe6}.message-time[data-v-5c526232]{font-size:10px;color:#94a3b8}.own-message .message-time[data-v-5c526232]{color:#fff9}.text-content[data-v-5c526232]{font-size:14px;line-height:1.6;color:#1a2e35;word-wrap:break-word}.own-message .text-content[data-v-5c526232]{color:#fff}.file-link[data-v-5c526232]{text-decoration:none;display:block}.file-preview[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:8px;background:#f8fafc;border-radius:16px;min-width:260px;transition:all .2s}.file-preview[data-v-5c526232]:hover{background:#f1f5f9}.own-message .file-preview[data-v-5c526232]{background:#ffffff1a}.file-icon-wrapper[data-v-5c526232]{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.file-icon-wrapper.image[data-v-5c526232]{background:#dcfce7;color:#16a34a}.file-icon-wrapper.pdf[data-v-5c526232]{background:#fee2e2;color:#dc2626}.file-icon-wrapper.document[data-v-5c526232]{background:#dbeafe;color:#2563eb}.file-icon-wrapper.presentation[data-v-5c526232]{background:#fed7aa;color:#c2410c}.file-icon-wrapper.spreadsheet[data-v-5c526232]{background:#dcfce7;color:#059669}.file-icon-wrapper.archive[data-v-5c526232]{background:#fef9c3;color:#ca8a04}.file-icon-wrapper.audio[data-v-5c526232]{background:#fae8ff;color:#a21caf}.file-icon-wrapper.video[data-v-5c526232]{background:#ffe4e6;color:#be123c}.file-icon-wrapper.code[data-v-5c526232]{background:#e0f2fe;color:#0369a1}.file-icon-wrapper[data-v-5c526232]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.own-message .file-icon-wrapper[data-v-5c526232]{background:#fff3;color:#fff}.file-details[data-v-5c526232]{flex:1;min-width:0}.file-name[data-v-5c526232]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.own-message .file-name[data-v-5c526232]{color:#fff}.file-meta[data-v-5c526232]{font-size:10px;color:#94a3b8}.own-message .file-meta[data-v-5c526232]{color:#ffffffb3}.file-download-icon[data-v-5c526232]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transform:scale(.9);transition:all .2s}.file-preview:hover .file-download-icon[data-v-5c526232]{opacity:1;transform:scale(1)}.input-area[data-v-5c526232]{padding:20px 28px;background:#fff;border-top:1px solid #f1f5f9}.input-wrapper[data-v-5c526232]{display:flex;align-items:center;gap:12px;background:#f8fafc;border:1px solid #f1f5f9;border-radius:40px;padding:4px 4px 4px 16px;transition:all .2s}.input-wrapper[data-v-5c526232]:focus-within{border-color:#1e3a5f;box-shadow:0 0 0 4px #1e3a5f1a;background:#fff}.attach-btn[data-v-5c526232]{width:40px;height:40px;border-radius:20px;border:none;background:transparent;color:#1e3a5f;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}.attach-btn[data-v-5c526232]:hover{background:#f1f5f9;transform:scale(1.1)}.file-input[data-v-5c526232]{display:none}.message-input[data-v-5c526232]{flex:1;border:none;background:transparent;outline:none;font-size:14px;color:#0f172a;padding:10px 0}.message-input[data-v-5c526232]::placeholder{color:#94a3b8}.send-btn[data-v-5c526232]{width:44px;height:44px;border-radius:22px;border:none;background:#1e3a5f;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px #1e3a5f33}.send-btn[data-v-5c526232]:hover{background:#14273f;transform:scale(1.05)}.bento-resources[data-v-5c526232]{padding:0}.resources-header[data-v-5c526232]{padding:24px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}.resources-title[data-v-5c526232]{display:flex;align-items:center;gap:10px}.resources-title svg[data-v-5c526232]{color:#1e3a5f}.resources-title h3[data-v-5c526232]{font-size:16px;font-weight:600;color:#0f172a;margin:0}.resources-count[data-v-5c526232]{background:#f1f5f9;padding:4px 12px;border-radius:30px;font-size:12px;font-weight:600;color:#1e3a5f}.resources-list[data-v-5c526232]{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}.resources-list[data-v-5c526232]::-webkit-scrollbar{width:4px}.resources-list[data-v-5c526232]::-webkit-scrollbar-track{background:#f1f5f9}.resources-list[data-v-5c526232]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.resource-item[data-v-5c526232]{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:18px;transition:all .2s;cursor:pointer;text-decoration:none;color:inherit}.resource-item[data-v-5c526232]:hover{background:#f1f5f9;transform:translate(4px)}.resource-icon[data-v-5c526232]{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.resource-icon.image[data-v-5c526232]{background:#dcfce7;color:#16a34a}.resource-icon.pdf[data-v-5c526232]{background:#fee2e2;color:#dc2626}.resource-icon.document[data-v-5c526232]{background:#dbeafe;color:#2563eb}.resource-icon.presentation[data-v-5c526232]{background:#fed7aa;color:#c2410c}.resource-icon.spreadsheet[data-v-5c526232]{background:#dcfce7;color:#059669}.resource-icon.archive[data-v-5c526232]{background:#fef9c3;color:#ca8a04}.resource-icon.audio[data-v-5c526232]{background:#fae8ff;color:#a21caf}.resource-icon.video[data-v-5c526232]{background:#ffe4e6;color:#be123c}.resource-icon.code[data-v-5c526232]{background:#e0f2fe;color:#0369a1}.resource-icon[data-v-5c526232]:not(.image):not(.pdf):not(.document):not(.presentation):not(.spreadsheet):not(.archive):not(.audio):not(.video):not(.code){background:#f1f5f9;color:#64748b}.resource-content[data-v-5c526232]{flex:1;min-width:0}.resource-name[data-v-5c526232]{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.resource-meta[data-v-5c526232]{display:flex;gap:8px;font-size:10px}.resource-uploader[data-v-5c526232]{color:#1e3a5f;font-weight:500}.resource-size[data-v-5c526232]{color:#94a3b8}.resource-download[data-v-5c526232]{width:32px;height:32px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;color:#1e3a5f;opacity:0;transition:all .2s}.resource-item:hover .resource-download[data-v-5c526232]{opacity:1}.resource-download[data-v-5c526232]:hover{background:#1e3a5f;color:#fff;transform:scale(1.1)}@media(max-width:1200px){.bento-layout[data-v-5c526232]{grid-template-columns:240px 1fr 280px}}@media(max-width:900px){.bento-layout[data-v-5c526232]{grid-template-columns:1fr;padding:10px}.bento-sidebar[data-v-5c526232],.bento-resources[data-v-5c526232]{display:none}.back-button-container[data-v-5c526232]{bottom:20px;left:20px}.back-button[data-v-5c526232]{padding:10px 18px;font-size:14px}}", i1 = { class: "bento-chat-container" }, l1 = { class: "bento-layout" }, d1 = { class: "bento-sidebar" }, c1 = { class: "sidebar-header" }, f1 = { class: "sidebar-badge" }, u1 = { class: "sidebar-section" }, p1 = { class: "section-header" }, h1 = { class: "online-count" }, m1 = { class: "members-list" }, g1 = { class: "member-avatar-wrapper" }, v1 = { class: "member-details" }, b1 = { class: "member-name" }, x1 = { class: "member-status-text" }, y1 = { class: "bento-main" }, w1 = { class: "chat-header" }, _1 = { class: "header-info" }, k1 = { class: "group-name" }, C1 = { class: "group-meta" }, S1 = { class: "meta-item" }, E1 = { class: "meta-item online" }, $1 = { class: "message-bubble" }, A1 = { class: "message-header" }, T1 = { class: "message-sender" }, R1 = { class: "message-time" }, O1 = {
  key: 0,
  class: "text-content"
}, P1 = ["href", "download"], j1 = {
  key: 0,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, M1 = {
  key: 1,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, D1 = {
  key: 2,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, N1 = { class: "file-details" }, I1 = { class: "file-name" }, L1 = { class: "file-meta" }, B1 = { class: "input-area" }, F1 = { class: "input-wrapper" }, z1 = { class: "bento-resources" }, U1 = { class: "resources-header" }, H1 = { class: "resources-count" }, V1 = { class: "resources-list" }, q1 = ["href", "download"], K1 = { class: "resource-content" }, W1 = { class: "resource-name" }, J1 = { class: "resource-meta" }, Y1 = { class: "resource-uploader" }, G1 = { class: "resource-size" }, X1 = {
  __name: "ChatRoom.ce",
  props: { currentUser: [String] },
  setup(e) {
    K.defaults.xsrfCookieName = "csrftoken", K.defaults.xsrfHeaderName = "X-CSRFToken", K.defaults.withCredentials = !0;
    let t = /* @__PURE__ */ tl(null);
    const n = /* @__PURE__ */ Y(null), o = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y(null), s = /* @__PURE__ */ Y([]), i = /* @__PURE__ */ Y([]), l = /* @__PURE__ */ Y([]), d = e, f = /* @__PURE__ */ Y(""), c = /* @__PURE__ */ Y(null), p = (F) => {
      const N = [
        "#4158D0",
        "#C850C0",
        "#0093E9",
        "#80D0C7",
        "#8EC5FC",
        "#E0C3FC"
      ], M = (F?.length || 0) % N.length;
      return N[M];
    }, x = (F) => !F || F === 0 ? "0 Bytes" : (F / (1024 * 1024)).toFixed(2) + " MB", w = (F) => {
      if (!F) return "";
      const N = new Date(F);
      return isNaN(N.getTime()) ? F : N.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
      });
    }, v = () => {
      o.value.click();
    }, k = async (F) => {
      const N = F.target;
      if (!N || !N.files.length) return;
      const M = N.files[0], Q = new FormData();
      Q.append("file", M), Q.append("group_id", n.value);
      try {
        const z = await K.post(
          "http://127.0.0.1:8000/chat/api/upload/",
          Q
        );
        if (z.status === 201 || z.status === 200) {
          const J = z.data.data;
          t.value.send(
            JSON.stringify({
              message_type: "file",
              file_url: J.file_url,
              file_name: J.file_name,
              file_type: J.file_type,
              file_size: J.file_size,
              sender: d.currentUser,
              message: J.file_name,
              group_id: n.value
            })
          );
        }
      } catch (z) {
        console.error("Upload failed!", z.response?.data || z.message);
      }
      N.value = "";
    }, b = async (F) => {
      try {
        const N = await K.get(F), M = N.data;
        if (N.status == 200) {
          l.value = M.shared_files || [], s.value = M.members || [], i.value = M.messages || [], r.value = M.group_name;
          const Q = s.value.find((z) => String(z.username) === String(d.currentUser));
          Q && (Q.status = "online"), E(), wn(() => {
            c.value && (c.value.scrollTop = c.value.scrollHeight);
          });
        }
      } catch (N) {
        console.error("Error fetching data:", N);
      }
    }, E = () => {
      wn(() => {
        c.value && (c.value.scrollTop = c.value.scrollHeight);
      });
    }, $ = () => {
      console.log("Starting video call..."), alert("Video call feature coming soon!");
    }, j = ve(() => s.value.filter((F) => F.status === "online").length);
    Rn(() => {
      const F = window.location.pathname.split("/");
      n.value = F.filter((Q) => Q !== "").pop();
      const N = `ws://127.0.0.1:8000/ws/chat/${n.value}/`, M = `http://127.0.0.1:8000/chat/api/${n.value}/`;
      b(M), t.value = new WebSocket(N), t.value.onmessage = (Q) => {
        const z = JSON.parse(Q.data);
        if (z.type === "user_status_change") {
          const J = s.value.find(
            (ie) => String(ie.id) === String(z.user_id)
          );
          J && (J.status = z.status);
        } else
          i.value.push({ ...z }), z.message_type === "file" && l.value.unshift({
            id: z.id || Date.now(),
            file_name: z.file_name,
            file_type: z.file_type,
            uploader: z.sender,
            file_url: z.file_url,
            file_size: z.file_size,
            uploaded_at: z.uploaded_at
          }), E();
      };
    }), xr(() => {
      t.value && (console.log("Closing web socket..."), t.value.close());
    });
    const I = () => {
      f.value.trim() && (t.value.send(
        JSON.stringify({
          message: f.value,
          sender: d.currentUser,
          message_type: "text",
          group_id: n.value
        })
      ), f.value = "");
    };
    return (F, N) => (A(), T("div", i1, [
      a("div", l1, [
        a("aside", d1, [
          a("div", c1, [
            N[1] || (N[1] = We('<div class="sidebar-brand" data-v-5c526232><div class="brand-icon" data-v-5c526232><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" data-v-5c526232><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-5c526232></path></svg></div><span class="brand-name" data-v-5c526232>StudySync</span></div>', 1)),
            a("div", f1, S(s.value?.length) + " members", 1)
          ]),
          a("div", u1, [
            a("div", p1, [
              N[2] || (N[2] = a("span", { class: "section-title" }, "MEMBERS", -1)),
              a("span", h1, S(j.value) + " online", 1)
            ]),
            a("div", m1, [
              (A(!0), T(oe, null, we(s.value, (M) => (A(), T("div", {
                key: M.id,
                class: "member-card"
              }, [
                a("div", g1, [
                  a("div", {
                    class: "member-avatar",
                    style: ke({ backgroundColor: p(M.username) })
                  }, S(M.username.charAt(0).toUpperCase()), 5),
                  a("div", {
                    class: me(["status-dot", M.status])
                  }, null, 2)
                ]),
                a("div", v1, [
                  a("div", b1, S(M.username), 1),
                  a("div", x1, S(M.status === "online" ? "Online" : "Away"), 1)
                ])
              ]))), 128))
            ])
          ])
        ]),
        a("main", y1, [
          a("div", w1, [
            a("div", _1, [
              a("h1", k1, S(r.value), 1),
              a("div", C1, [
                a("span", S1, [
                  N[3] || (N[3] = a("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    a("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  te(" " + S(s.value?.length) + " members ", 1)
                ]),
                a("span", E1, [
                  N[4] || (N[4] = a("span", { class: "online-dot" }, null, -1)),
                  te(" " + S(j.value) + " online ", 1)
                ])
              ])
            ]),
            a("button", {
              class: "video-button",
              onClick: $,
              title: "Start Video Call"
            }, [...N[5] || (N[5] = [
              a("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
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
          ]),
          a("div", {
            class: "messages-container",
            ref_key: "messagesContainer",
            ref: c
          }, [
            (A(!0), T(oe, null, we(i.value, (M) => (A(), T("div", {
              key: M.id,
              class: "message-group"
            }, [
              a("div", {
                class: me([
                  "message-row",
                  M.sender === e.currentUser ? "own-message" : "peer-message"
                ])
              }, [
                a("div", $1, [
                  a("div", A1, [
                    a("span", T1, S(M.sender), 1),
                    a("span", R1, S(w(M.time)), 1)
                  ]),
                  M.message_type === "text" ? (A(), T("div", O1, S(M.message), 1)) : M.message_type === "file" ? (A(), T("a", {
                    key: 1,
                    href: "http://127.0.0.1:8000" + M.file_url,
                    download: M.file_name,
                    target: "_blank",
                    class: "file-link"
                  }, [
                    a("div", {
                      class: me(["file-preview", { "own-file": M.sender === e.currentUser }])
                    }, [
                      a("div", {
                        class: me(["file-icon-wrapper", M.file_type?.toLowerCase()])
                      }, [
                        M.file_type == "image" ? (A(), T("svg", j1, [...N[6] || (N[6] = [
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
                        ])])) : M.file_type === "pdf" ? (A(), T("svg", M1, [...N[7] || (N[7] = [
                          We('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-5c526232></path><polyline points="14 2 14 8 20 8" data-v-5c526232></polyline><path d="M9 15h6" data-v-5c526232></path><path d="M9 18h4" data-v-5c526232></path><circle cx="16" cy="15" r="1" fill="currentColor" data-v-5c526232></circle>', 5)
                        ])])) : (A(), T("svg", D1, [...N[8] || (N[8] = [
                          a("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }, null, -1),
                          a("polyline", { points: "13 2 13 9 20 9" }, null, -1)
                        ])]))
                      ], 2),
                      a("div", N1, [
                        a("div", I1, S(M.file_name), 1),
                        a("div", L1, S(M.file_type?.toUpperCase()) + " • " + S(x(M.file_size)), 1)
                      ]),
                      N[9] || (N[9] = We('<div class="file-download-icon" data-v-5c526232><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c526232><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-5c526232></path><polyline points="7 10 12 15 17 10" data-v-5c526232></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-5c526232></line></svg></div>', 1))
                    ], 2)
                  ], 8, P1)) : X("", !0)
                ])
              ], 2)
            ]))), 128))
          ], 512),
          a("div", B1, [
            a("div", F1, [
              a("button", {
                class: "attach-btn",
                onClick: v
              }, [...N[10] || (N[10] = [
                a("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  a("path", { d: "M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22 8.00502 22C6.41281 22 4.88584 21.3658 3.76002 20.24C2.6342 19.1142 2 17.5872 2 15.995C2 14.4028 2.6342 12.8758 3.76002 11.75L12.33 3.18" }),
                  a("path", { d: "M16 8L8 16" })
                ], -1)
              ])]),
              a("input", {
                type: "file",
                ref_key: "fileInput",
                ref: o,
                class: "file-input",
                onChange: k
              }, null, 544),
              qe(a("input", {
                type: "text",
                "onUpdate:modelValue": N[0] || (N[0] = (M) => f.value = M),
                onKeyup: Wa(I, ["enter"]),
                placeholder: "Type a message...",
                class: "message-input"
              }, null, 544), [
                [Tt, f.value]
              ]),
              a("button", {
                class: "send-btn",
                onClick: I
              }, [...N[11] || (N[11] = [
                a("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
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
        a("aside", z1, [
          a("div", U1, [
            N[12] || (N[12] = a("div", { class: "resources-title" }, [
              a("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
              ]),
              a("h3", null, "Resources")
            ], -1)),
            a("span", H1, S(l.value.length), 1)
          ]),
          a("div", V1, [
            (A(!0), T(oe, null, we(l.value, (M) => (A(), T("a", {
              key: M.id,
              href: "http://127.0.0.1:8000" + M.file_url,
              download: M.file_name,
              target: "_blank",
              class: "resource-item"
            }, [
              a("div", {
                class: me(["resource-icon", M.file_type?.toLowerCase()])
              }, [...N[13] || (N[13] = [
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
              a("div", K1, [
                a("div", W1, S(M.file_name), 1),
                a("div", J1, [
                  a("span", Y1, S(M.uploader), 1),
                  a("span", G1, S(x(M.file_size)), 1)
                ])
              ]),
              N[14] || (N[14] = We('<div class="resource-download" data-v-5c526232><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-5c526232><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-5c526232></path><polyline points="7 10 12 15 17 10" data-v-5c526232></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-5c526232></line></svg></div>', 1))
            ], 8, q1))), 128))
          ])
        ])
      ])
    ]));
  }
}, Z1 = /* @__PURE__ */ _t(X1, [["styles", [a1]], ["__scopeId", "data-v-5c526232"]]), Q1 = ".post-card-improved[data-v-04a7a3d8]{background:#fff;border-radius:24px;padding:1.5rem;margin-bottom:1.2rem;border:1px solid #f1f5f9;transition:all .2s;position:relative}.post-card-improved[data-v-04a7a3d8]:hover{background:#fff;border-color:#1e3a5f30;transform:translateY(-2px);box-shadow:0 8px 24px -8px #1e3a5f26}.hot-badge-improved[data-v-04a7a3d8]{position:absolute;top:1.2rem;right:1.2rem;background:linear-gradient(135deg,#f59e0b,#dc2626);color:#fff;padding:.25rem 1.2rem;border-radius:30px;font-size:.65rem;font-weight:600;display:flex;align-items:center;gap:.3rem;box-shadow:0 4px 10px #dc262640}.hot-badge-improved svg[data-v-04a7a3d8]{width:12px;height:12px}.post-header-improved[data-v-04a7a3d8]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.post-avatar-improved[data-v-04a7a3d8]{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;font-weight:600;flex-shrink:0;position:relative;box-shadow:0 4px 10px #1e3a5f33}.online-badge[data-v-04a7a3d8]{position:absolute;bottom:0;right:0;width:12px;height:12px;background:#10b981;border-radius:50%;border:2px solid white}.post-author-improved h4[data-v-04a7a3d8]{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:.2rem;display:flex;align-items:center;gap:.5rem}.post-badge-improved[data-v-04a7a3d8]{background:#1e3a5f15;color:#1e3a5f;font-size:.65rem;padding:.15rem .7rem;border-radius:30px;font-weight:500}.post-time-improved[data-v-04a7a3d8]{font-size:.7rem;color:#64748b;display:flex;align-items:center;gap:.3rem}.post-time-improved svg[data-v-04a7a3d8]{width:12px;height:12px}.post-content-improved[data-v-04a7a3d8]{margin-bottom:1rem;padding-left:.2rem}.post-content-improved p[data-v-04a7a3d8]{font-size:.9rem;color:#1a2e35;line-height:1.6;margin-bottom:.8rem}.post-media-improved[data-v-04a7a3d8]{display:flex;align-items:center;gap:1rem;background:#fff;padding:.8rem 1rem;border-radius:18px;margin-bottom:1rem;border:1px solid #e2e8f0;transition:all .2s;cursor:pointer}.post-media-improved[data-v-04a7a3d8]:hover{background:#f8fafc;border-color:#1e3a5f40}.media-icon-improved[data-v-04a7a3d8]{width:44px;height:44px;background:linear-gradient(135deg,#1e3a5f10,#4f6af510);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#1e3a5f}.media-icon-improved svg[data-v-04a7a3d8]{width:22px;height:22px}.media-info-improved[data-v-04a7a3d8]{flex:1}.media-info-improved h5[data-v-04a7a3d8]{font-size:.85rem;font-weight:600;color:#0f172a;margin-bottom:.15rem}.media-info-improved p[data-v-04a7a3d8]{font-size:.7rem;color:#64748b;margin:0}.media-action-improved[data-v-04a7a3d8]{width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;color:#1e3a5f;cursor:pointer;transition:all .2s}.media-action-improved[data-v-04a7a3d8]:hover{background:#1e3a5f;color:#fff}.media-action-improved svg[data-v-04a7a3d8]{width:18px;height:18px}.post-tags-improved[data-v-04a7a3d8]{display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}.tag-improved[data-v-04a7a3d8]{background:#fff;border:1px solid #e2e8f0;padding:.2rem 1rem;border-radius:40px;font-size:.7rem;color:#1e3a5f;font-weight:500;transition:all .2s;cursor:pointer}.tag-improved[data-v-04a7a3d8]:hover{background:#1e3a5f;color:#fff;border-color:#1e3a5f}.post-engagement-improved[data-v-04a7a3d8]{display:flex;gap:1.5rem;padding-top:1rem;border-top:1px solid #e2e8f0}.engagement-item[data-v-04a7a3d8]{background:none;border:none;padding:0;margin:0;cursor:pointer;display:flex;align-items:center;gap:.5rem;color:#64748b;font-size:.85rem;font-weight:500;transition:all .2s ease;outline:none}.engagement-item[data-v-04a7a3d8]:hover{color:#1e3a5f}.engagement-item:hover svg[data-v-04a7a3d8]:not(.liked){stroke:#1e3a5f}.engagement-item svg[data-v-04a7a3d8]{transition:all .3s ease;fill:transparent;stroke:#64748b}.engagement-item svg.liked[data-v-04a7a3d8]{fill:#ef4444;stroke:#ef4444;transform:scale(1.2)}@keyframes heartBeat-04a7a3d8{0%{transform:scale(1)}50%{transform:scale(1.3)}to{transform:scale(1.2)}}.engagement-item svg.liked[data-v-04a7a3d8]{animation:heartBeat-04a7a3d8 .3s ease-out forwards}", eh = { class: "post-card-improved" }, th = {
  key: 0,
  class: "hot-badge-improved"
}, nh = { class: "post-header-improved" }, oh = {
  key: 0,
  class: "online-badge"
}, rh = { class: "post-author-improved" }, sh = {
  key: 0,
  class: "post-badge-improved"
}, ah = { class: "post-time-improved" }, ih = { class: "post-content-improved" }, lh = {
  key: 1,
  class: "post-media-improved"
}, dh = {
  key: 2,
  class: "post-tags-improved"
}, ch = { class: "post-engagement-improved" }, fh = {
  __name: "PostCard.ce",
  props: {
    post: { type: Object, required: !0 },
    currentUser: { type: Object, required: !0 },
    groupCreatorId: { type: [Number, String], default: null },
    expanded: { type: Boolean, default: !1 }
  },
  emits: ["like", "delete", "view-comments"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = (d) => {
      const f = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], c = d.split("").reduce((p, x) => p + x.charCodeAt(0), 0) % f.length;
      return f[c];
    }, s = (d) => {
      if (!d) return "recently";
      const f = new Date(d), p = /* @__PURE__ */ new Date() - f, x = Math.floor(p / 6e4);
      return x < 1 ? "Just now" : x < 60 ? `${x}m ago` : x < 1440 ? `${Math.floor(x / 60)}h ago` : f.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }, i = () => {
      o("like", n.post.id);
    }, l = () => {
      o("view-comments", n.post);
    };
    return (d, f) => (A(), T("div", eh, [
      e.post.status == "pending" ? (A(), T("div", th, [...f[0] || (f[0] = [
        a("svg", {
          width: "12",
          height: "12",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [
          a("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          a("polyline", { points: "12 6 12 12 16 14" })
        ], -1),
        te(" Pending ", -1)
      ])])) : X("", !0),
      a("div", nh, [
        a("div", {
          class: "post-avatar-improved",
          style: ke({ backgroundColor: r(e.post.author.username) })
        }, [
          te(S(e.post.author.username.charAt(0).toUpperCase()) + " ", 1),
          e.post.author.isOnline ? (A(), T("span", oh)) : X("", !0)
        ], 4),
        a("div", rh, [
          a("h4", null, [
            te(S(e.post.author.username) + " ", 1),
            e.post.author.id === e.groupCreatorId ? (A(), T("span", sh, "Creator")) : X("", !0)
          ]),
          a("div", ah, [
            f[1] || (f[1] = a("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              a("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              a("polyline", { points: "12 6 12 12 16 14" })
            ], -1)),
            te(" " + S(s(e.post.created_at)), 1)
          ])
        ])
      ]),
      a("div", ih, [
        a("p", null, S(e.post.content), 1)
      ]),
      e.post.image ? (A(), T("div", lh, [...f[2] || (f[2] = [
        We('<div class="media-icon-improved" data-v-04a7a3d8><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-04a7a3d8><rect x="2" y="2" width="20" height="20" rx="2" ry="2" data-v-04a7a3d8></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-04a7a3d8></circle><polyline points="21 15 16 10 5 21" data-v-04a7a3d8></polyline></svg></div><div class="media-info-improved" data-v-04a7a3d8><h5 data-v-04a7a3d8>Image</h5><p data-v-04a7a3d8>Click to view full size</p></div><div class="media-action-improved" data-v-04a7a3d8><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-04a7a3d8><polyline points="15 3 21 3 21 9" data-v-04a7a3d8></polyline><polyline points="9 21 3 21 3 15" data-v-04a7a3d8></polyline><line x1="21" y1="3" x2="14" y2="10" data-v-04a7a3d8></line><line x1="3" y1="21" x2="10" y2="14" data-v-04a7a3d8></line></svg></div>', 3)
      ])])) : X("", !0),
      e.post.tags && e.post.tags.length ? (A(), T("div", dh, [
        (A(!0), T(oe, null, we(e.post.tags, (c) => (A(), T("span", {
          key: c,
          class: "tag-improved"
        }, "#" + S(c), 1))), 128))
      ])) : X("", !0),
      a("div", ch, [
        a("button", {
          onClick: i,
          class: "engagement-item"
        }, [
          (A(), T("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: me(["heart-icon", { liked: e.post.isLiked }])
          }, [...f[3] || (f[3] = [
            a("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }, null, -1)
          ])], 2)),
          a("span", null, S(e.post.likesCount), 1)
        ]),
        a("button", {
          onClick: l,
          class: "engagement-item"
        }, [
          f[4] || (f[4] = a("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          ], -1)),
          a("span", null, S(e.post.comments?.length || 0), 1)
        ]),
        f[5] || (f[5] = a("button", { class: "engagement-item" }, [
          a("svg", {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            a("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" })
          ])
        ], -1))
      ])
    ]));
  }
}, xi = /* @__PURE__ */ _t(fh, [["styles", [Q1]], ["__scopeId", "data-v-04a7a3d8"]]), uh = "@keyframes slideIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}.fade-enter-from,.fade-leave-to{opacity:0}.fade-slide-enter-active{transition:all .25s ease-out}.fade-slide-leave-active{transition:all .2s ease-in}.fade-slide-enter-from{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to{opacity:0;transform:translateY(10px)}.comment-fade-enter-active,.comment-fade-leave-active{transition:all .2s ease}.comment-fade-enter-from{opacity:0;transform:translate(-10px)}.comment-fade-leave-to{opacity:0;transform:translate(10px)}.detail-comments-section{background:#fff;border-radius:28px;padding:1.5rem;border:1px solid #f1f5f9;margin-top:1rem;animation:slideIn .3s ease}.comments-title{font-size:1rem;font-weight:600;color:#0f172a;margin-bottom:1.2rem;display:flex;align-items:center;gap:.5rem}.comments-count{background:#1e3a5f1a;padding:.2rem .8rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.comments-list{display:flex;flex-direction:column;gap:1rem;margin-bottom:1.2rem;max-height:300px;overflow-y:auto;padding-right:.5rem}.comments-list::-webkit-scrollbar{width:4px}.comment-item{display:flex;gap:.8rem;animation:slideIn .3s ease}.comment-avatar{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.comment-content{flex:1}.comment-bubble{background:#f8fafc;border-radius:16px;padding:.8rem 1rem;border:1px solid #f1f5f9}.comment-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}.comment-author{font-weight:600;font-size:.75rem;color:#1e3a5f}.comment-time{font-size:.6rem;color:#94a3b8}.comment-text{font-size:.8rem;color:#1e293b;margin:0;line-height:1.5}.comment-actions{display:flex;gap:.5rem;margin-top:.3rem;margin-left:.5rem}.comment-action{display:flex;align-items:center;gap:.3rem;background:transparent;border:none;color:#94a3b8;font-size:.65rem;cursor:pointer;padding:.2rem .5rem;border-radius:30px;transition:all .2s}.comment-action:hover{background:#f1f5f9;color:#1e3a5f}.add-comment-form{display:flex;gap:.8rem;align-items:center;margin-top:1.2rem}.comment-input{flex:1;padding:.6rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.8rem;background:#f8fafc}.comment-input:focus{outline:none;border-color:#1e3a5f;background:#fff}.send-comment-btn{width:36px;height:36px;border-radius:18px;background:#1e3a5f;border:none;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;transition:all .2s;box-shadow:0 8px 12px -4px #1e3a5f33}.send-comment-btn:hover:not(:disabled){background:#14273f;transform:scale(1.05)}.send-comment-btn:disabled{opacity:.5;cursor:not-allowed}.comment-action svg{transition:all .3s ease;fill:transparent;stroke:#64748b}.comment-action svg.liked{fill:#ef4444;stroke:#ef4444;transform:scale(1.2)}@keyframes heartBeat{0%{transform:scale(1)}50%{transform:scale(1.3)}to{transform:scale(1.2)}}.comment-action svg.liked{animation:heartBeat .3s ease-out forwards}", ph = { class: "detail-post-container" }, hh = ["post", "current-user", "group-creator-id"], mh = { class: "detail-comments-section" }, gh = { class: "comments-title" }, vh = { class: "comments-count" }, bh = { class: "comments-list" }, xh = {
  name: "comment-fade",
  tag: "div"
}, yh = { class: "comment-content" }, wh = { class: "comment-bubble" }, _h = { class: "comment-header" }, kh = { class: "comment-author" }, Ch = { class: "comment-time" }, Sh = { class: "comment-text" }, Eh = { class: "comment-actions" }, $h = ["onClick"], Ah = { class: "add-comment-form" }, Th = ["disabled"], Rh = {
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
    const n = e, o = /* @__PURE__ */ Y(null), r = t, s = (p) => {
      r("post-like", p);
    }, i = (p) => {
      r("delete", p);
    }, l = (p) => {
      r("comment-like", p.id);
    }, d = () => {
      o.value.trim() && (r("add-comment", {
        postId: n.selectedPost.id,
        comment: o.value
      }), o.value = "");
    }, f = (p) => {
      const x = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], w = p.split("").reduce((v, k) => v + k.charCodeAt(0), 0) % x.length;
      return x[w];
    }, c = (p) => {
      if (!p) return "";
      const [x, w] = p.split(":"), v = parseInt(x), k = v >= 12 ? "PM" : "AM";
      return `${v % 12 || 12}:${w} ${k}`;
    };
    return (p, x) => (A(), T("div", ph, [
      a("post-card", {
        post: n.selectedPost,
        "current-user": n.currentUser,
        "group-creator-id": n.group.creator?.id,
        onLike: s,
        onDelete: i,
        expanded: !0
      }, null, 40, hh),
      ge($t, {
        name: "fade-slide",
        appear: ""
      }, {
        default: gt(() => [
          a("div", mh, [
            a("h3", gh, [
              x[1] || (x[1] = a("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
              ], -1)),
              x[2] || (x[2] = te(" Comments ", -1)),
              a("span", vh, S(n.selectedPost.comments?.length || 0), 1)
            ]),
            a("div", bh, [
              a("transition-group", xh, [
                (A(!0), T(oe, null, we(n.selectedPost.comments, (w) => (A(), T("div", {
                  key: w.id,
                  class: "comment-item"
                }, [
                  a("div", {
                    class: "comment-avatar",
                    style: ke({
                      backgroundColor: f(w.author.username)
                    })
                  }, S(w.author.username.charAt(0).toUpperCase()), 5),
                  a("div", yh, [
                    a("div", wh, [
                      a("div", _h, [
                        a("span", kh, S(w.author.username), 1),
                        a("span", Ch, S(c(w.created_at)), 1)
                      ]),
                      a("p", Sh, S(w.content), 1)
                    ]),
                    a("div", Eh, [
                      a("button", {
                        onClick: (v) => l(w),
                        class: "comment-action"
                      }, [
                        (A(), T("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: me(["heart-icon", { liked: w.isLiked }])
                        }, [...x[3] || (x[3] = [
                          a("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }, null, -1)
                        ])], 2)),
                        a("span", null, S(w.likesCount || 0), 1)
                      ], 8, $h)
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            ge($t, { name: "fade" }, {
              default: gt(() => [
                a("div", Ah, [
                  qe(a("input", {
                    type: "text",
                    "onUpdate:modelValue": x[0] || (x[0] = (w) => o.value = w),
                    class: "comment-input",
                    placeholder: "Write a comment...",
                    onKeyup: Wa(d, ["enter"])
                  }, null, 544), [
                    [Tt, o.value]
                  ]),
                  a("button", {
                    class: "send-comment-btn",
                    onClick: d,
                    disabled: !o.value?.trim()
                  }, [...x[4] || (x[4] = [
                    a("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      a("line", {
                        x1: "22",
                        y1: "2",
                        x2: "11",
                        y2: "13"
                      }),
                      a("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                    ], -1)
                  ])], 8, Th)
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
}, yi = /* @__PURE__ */ _t(Rh, [["styles", [uh]]]), Oh = '@keyframes fadeIn-837011e1{0%{opacity:0}to{opacity:1}}@keyframes slideIn-837011e1{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes float-837011e1{0%{transform:translateY(0)}50%{transform:translateY(-2px)}to{transform:translateY(0)}}.fade-enter-active[data-v-837011e1],.fade-leave-active[data-v-837011e1]{transition:opacity .2s ease}.fade-enter-from[data-v-837011e1],.fade-leave-to[data-v-837011e1]{opacity:0}.fade-slide-enter-active[data-v-837011e1]{transition:all .25s ease-out}.fade-slide-leave-active[data-v-837011e1]{transition:all .2s ease-in}.fade-slide-enter-from[data-v-837011e1]{opacity:0;transform:translateY(-10px)}.fade-slide-leave-to[data-v-837011e1]{opacity:0;transform:translateY(10px)}.comment-fade-enter-active[data-v-837011e1],.comment-fade-leave-active[data-v-837011e1]{transition:all .2s ease}.comment-fade-enter-from[data-v-837011e1]{opacity:0;transform:translate(-10px)}.comment-fade-leave-to[data-v-837011e1]{opacity:0;transform:translate(10px)}.group-wrapper[data-v-837011e1]{min-height:100vh;padding:2rem;overflow-x:hidden}.group-fullscreen[data-v-837011e1]{width:100%;min-height:100vh;background:transparent;font-family:Inter,sans-serif}.group-header[data-v-837011e1]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:32px;padding:1.5rem 2rem;margin-bottom:2rem;box-shadow:0 20px 35px -10px #0000000d;border:1px solid rgba(255,255,255,.5);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.header-left[data-v-837011e1]{display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap}.group-avatar[data-v-837011e1]{width:70px;height:70px;background:linear-gradient(145deg,#1e3a5f,#2d4b75);border-radius:24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2.2rem;font-weight:600;box-shadow:0 15px 25px -8px #1e3a5f4d;position:relative;overflow:hidden;flex-shrink:0}.group-avatar[data-v-837011e1]:after{content:"";position:absolute;inset:0;background:linear-gradient(145deg,#ffffff1a,#fff0 60%);pointer-events:none}.group-info[data-v-837011e1]{min-width:0;flex:1}.group-info h1[data-v-837011e1]{font-size:1.8rem;font-weight:600;color:#0f172a;margin-bottom:.3rem;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.group-meta[data-v-837011e1]{display:flex;flex-wrap:wrap;gap:1rem;color:#64748b;font-size:.85rem}.group-meta span[data-v-837011e1]{display:flex;align-items:center;gap:.3rem}.group-meta span svg[data-v-837011e1]{width:16px;height:16px;stroke:#1e3a5f;opacity:.7}.group-badge[data-v-837011e1]{background:#f1f5f9cc;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);color:#1e3a5f;padding:.3rem 1rem;border-radius:40px;font-size:.7rem;font-weight:500;display:inline-flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.5)}.group-badge.creator[data-v-837011e1]{background:#fef3c7cc;color:#92400e}.group-actions[data-v-837011e1]{display:flex;gap:.5rem;flex-shrink:0}.btn-group[data-v-837011e1]{padding:.7rem 1.8rem;border-radius:40px;font-size:.85rem;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;transition:all .2s;border:1px solid transparent;cursor:pointer;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}.btn-group.primary[data-v-837011e1]{background:#1e3a5f;color:#fff;box-shadow:0 8px 16px -6px #1e3a5f33}.btn-group.primary[data-v-837011e1]:hover{background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.btn-group.outline[data-v-837011e1]{background:#ffffffb3;color:#1e3a5f;border:1px solid rgba(255,255,255,.8)}.btn-group.outline[data-v-837011e1]:hover{background:#fff;border-color:#1e3a5f}.two-column[data-v-837011e1]{display:grid;grid-template-columns:2fr 1fr;gap:2rem}.main-column[data-v-837011e1]{display:flex;flex-direction:column;gap:1.5rem;height:100%;overflow:hidden}.sidebar-column[data-v-837011e1]{display:flex;flex-direction:column;gap:1.5rem;overflow-y:auto;padding-right:.5rem}.sidebar-column[data-v-837011e1]::-webkit-scrollbar{width:4px}.sidebar-column[data-v-837011e1]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.sidebar-column[data-v-837011e1]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.compact-card[data-v-837011e1]{background:#ffffffe6;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:28px;padding:1.5rem;border:1px solid rgba(255,255,255,.5);box-shadow:0 15px 30px -12px #0000000d;transition:all .3s ease}.compact-card[data-v-837011e1]:hover{background:#fff;transform:translateY(-2px);box-shadow:0 20px 35px -15px #0000001a}.card-header-compact[data-v-837011e1]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem}.header-title[data-v-837011e1]{display:flex;align-items:center;gap:.6rem;font-size:.9rem;font-weight:600;color:#1e293b}.header-title svg[data-v-837011e1]{width:18px;height:18px;stroke:#1e3a5f;opacity:.7}.header-count[data-v-837011e1]{background:#1e3a5f1a;padding:.15rem .6rem;border-radius:30px;font-size:.7rem;color:#1e3a5f;font-weight:600}.header-link[data-v-837011e1]{color:#1e3a5f;font-size:.7rem;text-decoration:none;padding:.3rem 1rem;border-radius:30px;border:1px solid rgba(226,232,240,.8);background:#ffffff80;transition:all .2s}.header-link[data-v-837011e1]:hover{background:#fff;border-color:#1e3a5f}.compact-member-list[data-v-837011e1]{display:flex;flex-direction:column;gap:.8rem}.compact-member-item[data-v-837011e1]{display:flex;align-items:center;gap:.8rem;padding:.4rem .5rem;border-radius:12px;transition:all .2s}.compact-member-item[data-v-837011e1]:hover{background:#f8fafcb3}.compact-member-avatar[data-v-837011e1]{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;position:relative;flex-shrink:0;box-shadow:0 4px 8px -2px #0000001a}.compact-online-indicator[data-v-837011e1]{position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#10b981;border-radius:50%;border:2px solid white}.compact-member-info[data-v-837011e1]{flex:1;display:flex;align-items:center;justify-content:space-between;gap:.5rem;font-size:.85rem}.compact-member-name[data-v-837011e1]{font-weight:600;color:#0f172a}.compact-member-role[data-v-837011e1]{font-size:.65rem;color:#94a3b8;background:#f1f5f9b3;padding:.15rem .6rem;border-radius:30px}.compact-creator-badge[data-v-837011e1],.compact-you-badge[data-v-837011e1]{font-size:.65rem;padding:.15rem .6rem;border-radius:30px;font-weight:500}.compact-creator-badge[data-v-837011e1]{background:#fef3c7;color:#92400e}.compact-you-badge[data-v-837011e1]{background:#e0f2fe;color:#0369a1}.header-actions[data-v-837011e1]{display:flex;align-items:center;gap:.5rem}.invite-btn[data-v-837011e1]{display:flex;align-items:center;gap:.3rem;padding:.3rem 1rem .3rem .8rem;background:linear-gradient(135deg,#1e3a5f,#2d4b75);border:none;border-radius:30px;color:#fff;font-size:.7rem;font-weight:500;cursor:pointer;transition:all .2s ease;box-shadow:0 4px 10px -2px #1e3a5f4d}.invite-btn[data-v-837011e1]:hover{transform:translateY(-2px);box-shadow:0 6px 14px -2px #1e3a5f66}.invite-btn svg[data-v-837011e1]{stroke:#fff}.modal-overlay[data-v-837011e1]{position:fixed;inset:0;background:#00000080;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:1100}.invite-modal[data-v-837011e1]{background:#fff;border-radius:32px;width:90%;max-width:520px;max-height:90vh;overflow:hidden;box-shadow:0 40px 70px -15px #00000040;position:relative;animation:modalPop-837011e1 .4s cubic-bezier(.34,1.56,.64,1);display:flex;flex-direction:column}@keyframes modalPop-837011e1{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}.modal-gradient-line[data-v-837011e1]{position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1e3a5f,#4f6af5,#1e3a5f);opacity:.8}.modal-header[data-v-837011e1]{display:flex;align-items:flex-start;gap:1rem;padding:1.8rem 1.8rem 1rem;flex-shrink:0}.modal-header-icon[data-v-837011e1]{width:48px;height:48px;background:linear-gradient(135deg,#1e3a5f10,#2d4b7510);border-radius:16px;display:flex;align-items:center;justify-content:center;color:#1e3a5f;border:1px solid rgba(30,58,95,.1);flex-shrink:0}.modal-header-icon svg[data-v-837011e1]{width:24px;height:24px;stroke:#1e3a5f}.modal-header-text[data-v-837011e1]{flex:1}.modal-header-text h3[data-v-837011e1]{font-size:1.3rem;font-weight:600;color:#0f172a;margin:0 0 .2rem}.modal-header-text p[data-v-837011e1]{font-size:.8rem;color:#64748b;margin:0}.modal-close-btn[data-v-837011e1]{width:36px;height:36px;border-radius:12px;border:none;background:#f8fafc;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;color:#64748b;flex-shrink:0}.modal-close-btn[data-v-837011e1]:hover{background:#fee2e2;color:#dc2626;transform:rotate(90deg)}.modal-body[data-v-837011e1]{padding:1rem 1.8rem 1.5rem;overflow-y:auto;flex:1}.modal-search-wrapper[data-v-837011e1]{margin-bottom:1.2rem}.modal-search-container[data-v-837011e1]{position:relative;display:flex;align-items:center}.modal-search-icon[data-v-837011e1]{position:absolute;left:1rem;color:#94a3b8;z-index:1}.modal-search-input[data-v-837011e1]{width:100%;padding:.9rem 2.5rem .9rem 2.8rem;border:2px solid #f1f5f9;border-radius:40px;font-size:.9rem;transition:all .2s ease;background:#f8fafc;box-sizing:border-box}.modal-search-input[data-v-837011e1]:focus{outline:none;border-color:#1e3a5f;background:#fff;box-shadow:0 0 0 4px #1e3a5f1a}.modal-search-clear[data-v-837011e1]{position:absolute;right:1rem;color:#94a3b8;cursor:pointer;padding:4px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s ease}.modal-search-clear[data-v-837011e1]:hover{background:#f1f5f9;color:#475569}.modal-results-wrapper[data-v-837011e1]{margin-bottom:1rem}.modal-results[data-v-837011e1]{max-height:280px;overflow-y:auto;border-radius:20px;background:#f8fafc;padding:.5rem}.result-fade-enter-active[data-v-837011e1],.result-fade-leave-active[data-v-837011e1]{transition:all .2s ease}.result-fade-enter-from[data-v-837011e1],.result-fade-leave-to[data-v-837011e1]{opacity:0;transform:translateY(-10px)}.modal-result-item[data-v-837011e1]{display:flex;align-items:center;gap:.8rem;padding:.8rem;border-radius:16px;cursor:pointer;transition:all .2s ease;margin-bottom:.2rem;background:#fff;border:1px solid transparent}.modal-result-item[data-v-837011e1]:hover{background:#fff;border-color:#e2e8f0;transform:translateY(-1px);box-shadow:0 4px 12px #0000000a}.modal-result-avatar[data-v-837011e1]{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:.9rem;flex-shrink:0;position:relative}.modal-result-online-dot[data-v-837011e1]{position:absolute;bottom:-2px;right:-2px;width:10px;height:10px;background:#10b981;border-radius:50%;border:2px solid white}.modal-result-info[data-v-837011e1]{flex:1;display:flex;flex-direction:column;min-width:0}.modal-result-name[data-v-837011e1]{font-weight:600;color:#0f172a;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal-result-email[data-v-837011e1]{font-size:.7rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal-result-status[data-v-837011e1]{display:flex;align-items:center;gap:.3rem;font-size:.7rem;padding:.3rem .8rem;border-radius:30px;background:#f1f5f9;color:#64748b;white-space:nowrap}.modal-result-status.online[data-v-837011e1]{background:#dcfce7;color:#10b981}.modal-status-dot[data-v-837011e1]{width:6px;height:6px;border-radius:50%;background:currentColor}.modal-result-status.online .modal-status-dot[data-v-837011e1]{background:#10b981}.modal-no-results[data-v-837011e1]{text-align:center;padding:2rem;color:#94a3b8;background:#fff;border-radius:16px}.modal-no-results-icon[data-v-837011e1]{margin-bottom:1rem;opacity:.5}.modal-no-results p[data-v-837011e1]{font-size:.9rem;font-weight:500;margin:0 0 .2rem;color:#64748b}.modal-no-results-hint[data-v-837011e1]{font-size:.75rem;color:#94a3b8}.modal-selected-user[data-v-837011e1]{background:linear-gradient(135deg,#1e3a5f05,#2d4b7505);border-radius:20px;padding:1rem;margin:1rem 0;border:1px solid rgba(30,58,95,.1);animation:slideDown-837011e1 .3s ease}.modal-selected-user-header[data-v-837011e1]{margin-bottom:.8rem}.modal-selected-label[data-v-837011e1]{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:#1e3a5f;background:#1e3a5f1a;padding:.2rem .8rem;border-radius:30px}.modal-selected-user-content[data-v-837011e1]{display:flex;align-items:center;gap:1rem}.modal-selected-avatar[data-v-837011e1]{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem;flex-shrink:0;box-shadow:0 6px 12px -4px #0000001a}.modal-selected-details[data-v-837011e1]{flex:1;display:flex;flex-direction:column;min-width:0}.modal-selected-name[data-v-837011e1]{font-weight:600;color:#0f172a;font-size:1rem;margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal-selected-email[data-v-837011e1]{font-size:.75rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal-remove-selected[data-v-837011e1]{width:32px;height:32px;border-radius:10px;border:none;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;color:#94a3b8;flex-shrink:0;box-shadow:0 2px 6px #00000005}.modal-remove-selected[data-v-837011e1]:hover{background:#fee2e2;color:#dc2626;transform:rotate(90deg)}.modal-message[data-v-837011e1]{background:#f8fafc;border-radius:20px;padding:1.2rem;border:1px solid #f1f5f9;animation:slideDown-837011e1 .3s ease .1s both;width:100%;box-sizing:border-box}.modal-message-header[data-v-837011e1]{display:flex;align-items:center;gap:.4rem;margin-bottom:.8rem;color:#1e3a5f;font-size:.8rem;font-weight:500}.modal-message-header svg[data-v-837011e1]{stroke:#1e3a5f}.modal-message-textarea[data-v-837011e1]{width:100%;padding:.9rem 1.2rem;border:1.5px solid #e2e8f0;border-radius:18px;font-size:.85rem;font-family:Inter,sans-serif;resize:vertical;transition:all .2s ease;background:#fff;box-sizing:border-box;max-width:100%}.modal-message-textarea[data-v-837011e1]:focus{outline:none;border-color:#1e3a5f;box-shadow:0 0 0 4px #1e3a5f1a}.modal-message-count[data-v-837011e1]{text-align:right;font-size:.65rem;color:#94a3b8;margin-top:.3rem}.modal-footer[data-v-837011e1]{display:flex;justify-content:flex-end;gap:1rem;padding:1.2rem 1.8rem 1.8rem;background:#fff;border-top:1px solid #f1f5f9;flex-shrink:0}.modal-btn-secondary[data-v-837011e1]{padding:.8rem 1.8rem;border-radius:30px;border:1px solid #e2e8f0;background:#fff;color:#475569;font-size:.85rem;font-weight:500;cursor:pointer;transition:all .2s ease}.modal-btn-secondary[data-v-837011e1]:hover{background:#f8fafc;border-color:#94a3b8}.modal-btn-primary[data-v-837011e1]{display:flex;align-items:center;gap:.5rem;padding:.8rem 2rem;border-radius:30px;border:none;background:linear-gradient(135deg,#1e3a5f,#2d4b75);color:#fff;font-size:.85rem;font-weight:500;cursor:pointer;transition:all .2s ease;box-shadow:0 8px 18px -6px #1e3a5f66}.modal-btn-primary[data-v-837011e1]:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 24px -8px #1e3a5f80}.modal-btn-primary[data-v-837011e1]:disabled{opacity:.5;cursor:not-allowed}.modal-btn-primary svg[data-v-837011e1]{stroke:#fff}@keyframes slideDown-837011e1{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.modal-fade-enter-active[data-v-837011e1],.modal-fade-leave-active[data-v-837011e1]{transition:opacity .3s ease}.modal-fade-enter-from[data-v-837011e1],.modal-fade-leave-to[data-v-837011e1]{opacity:0}.modal-fade-enter-active .invite-modal[data-v-837011e1]{animation:modalPop-837011e1 .4s cubic-bezier(.34,1.56,.64,1)}.modal-fade-leave-active .invite-modal[data-v-837011e1]{animation:modalPop-837011e1 .3s reverse}.slide-down-enter-active[data-v-837011e1],.slide-down-leave-active[data-v-837011e1]{transition:all .3s ease}.slide-down-enter-from[data-v-837011e1],.slide-down-leave-to[data-v-837011e1]{opacity:0;transform:translateY(-10px)}.modal-body[data-v-837011e1]::-webkit-scrollbar,.modal-results[data-v-837011e1]::-webkit-scrollbar{width:4px}.modal-body[data-v-837011e1]::-webkit-scrollbar-track,.modal-results[data-v-837011e1]::-webkit-scrollbar-track{background:#f1f5f9;border-radius:2px}.modal-body[data-v-837011e1]::-webkit-scrollbar-thumb,.modal-results[data-v-837011e1]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.invitation-item[data-v-837011e1]{display:flex;flex-direction:column;gap:1rem;padding:1.2rem;border-radius:20px;background:#fff;border:1px solid rgba(226,232,240,.8);transition:all .2s ease;margin-bottom:.8rem}.invitation-item[data-v-837011e1]:hover{border-color:#1e3a5f;box-shadow:0 8px 20px -8px #1e3a5f26}.invitation-content[data-v-837011e1]{width:100%}.invitation-header[data-v-837011e1]{display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem}.invitation-sender[data-v-837011e1]{display:flex;align-items:center;gap:.6rem}.sender-avatar[data-v-837011e1]{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;position:relative;flex-shrink:0}.sender-online-dot[data-v-837011e1]{position:absolute;bottom:-2px;right:-2px;width:8px;height:8px;background:#10b981;border-radius:50%;border:2px solid white}.sender-info[data-v-837011e1]{display:flex;flex-direction:column}.sender-name[data-v-837011e1]{font-weight:600;color:#0f172a;font-size:.85rem}.invitation-time[data-v-837011e1]{font-size:.65rem;color:#94a3b8}.invitation-badge[data-v-837011e1]{font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:#b45309;background:#fffbeb;padding:.2rem .8rem;border-radius:30px;border:1px solid #fcd34d}.invitation-message[data-v-837011e1]{font-size:.9rem;line-height:1.5;color:#0f172a;margin:0 0 .8rem;font-weight:400}.invitation-quote[data-v-837011e1]{display:flex;align-items:flex-start;gap:.4rem;background:#f8fafc;padding:.8rem;border-radius:12px;margin-bottom:.8rem;font-size:.8rem;color:#475569;font-style:italic;border-left:3px solid #1e3a5f}.invitation-quote svg[data-v-837011e1]{stroke:#1e3a5f;flex-shrink:0;margin-top:.1rem}.invitation-meta[data-v-837011e1]{display:flex;gap:.5rem;flex-wrap:wrap}.invitee-chip[data-v-837011e1]{display:inline-flex;align-items:center;gap:.3rem;background:#f1f5f9;padding:.3rem .8rem;border-radius:30px;font-size:.7rem;color:#475569}.invitee-chip svg[data-v-837011e1]{stroke:#1e3a5f}.invitation-actions[data-v-837011e1]{display:flex;justify-content:flex-end;gap:.5rem;border-top:1px solid rgba(226,232,240,.5);padding-top:1rem}.approval-list[data-v-837011e1]{display:flex;flex-direction:column;gap:1rem;margin-bottom:1rem;max-height:535px;overflow-y:auto}.approval-list[data-v-837011e1]::-webkit-scrollbar{width:4px}.post-item[data-v-837011e1]{display:flex;flex-direction:column;gap:1rem;padding:1.2rem;border-radius:20px;background:#fff;border:1px solid rgba(226,232,240,.8);transition:all .2s ease;position:relative}.post-item[data-v-837011e1]:hover{border-color:#1e3a5f;box-shadow:0 8px 20px -8px #1e3a5f26}.post-content[data-v-837011e1]{width:100%}.post-header[data-v-837011e1]{display:flex;align-items:center;justify-content:space-between;margin-bottom:.8rem}.post-author[data-v-837011e1]{display:flex;align-items:center;gap:.6rem}.author-avatar[data-v-837011e1]{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem;font-weight:600;flex-shrink:0}.author-info[data-v-837011e1]{display:flex;flex-direction:column}.author-name[data-v-837011e1]{font-weight:600;color:#0f172a;font-size:.85rem}.post-time[data-v-837011e1]{font-size:.65rem;color:#94a3b8}.post-badge[data-v-837011e1]{font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:#b45309;background:#fffbeb;padding:.2rem .8rem;border-radius:30px;border:1px solid #fcd34d}.post-message[data-v-837011e1]{font-size:.95rem;line-height:1.5;color:#0f172a;margin:0 0 .8rem;font-weight:400;word-wrap:break-word}.post-image-indicator[data-v-837011e1]{display:inline-flex;align-items:center;gap:.4rem;font-size:.7rem;color:#1e3a5f;background:#1e3a5f0d;padding:.3rem .8rem;border-radius:30px;border:1px solid rgba(30,58,95,.1)}.post-image-indicator svg[data-v-837011e1]{stroke:#1e3a5f;width:14px;height:14px}.post-actions[data-v-837011e1]{display:flex;justify-content:flex-end;gap:.5rem;border-top:1px solid rgba(226,232,240,.5);padding-top:1rem}.action-btn[data-v-837011e1]{width:36px;height:36px;border-radius:12px;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;background:#fff;border:1px solid rgba(226,232,240,.8)}.action-btn svg[data-v-837011e1]{width:18px;height:18px}.action-btn.review[data-v-837011e1]{color:#1e3a5f}.action-btn.review[data-v-837011e1]:hover{background:#1e3a5f;color:#fff;border-color:#1e3a5f;transform:translateY(-2px);box-shadow:0 4px 8px #1e3a5f33}.action-btn.approve[data-v-837011e1]{color:#10b981}.action-btn.approve[data-v-837011e1]:hover{background:#10b981;color:#fff;border-color:#10b981;transform:translateY(-2px);box-shadow:0 4px 8px #10b98133}.action-btn.reject[data-v-837011e1]{color:#dc2626}.action-btn.reject[data-v-837011e1]:hover{background:#dc2626;color:#fff;border-color:#dc2626;transform:translateY(-2px);box-shadow:0 4px 8px #dc262633}.empty-state[data-v-837011e1]{text-align:center;padding:2.5rem 1rem;color:#94a3b8}.empty-state svg[data-v-837011e1]{stroke:#cbd5e1;margin-bottom:.8rem}.empty-state p[data-v-837011e1]{font-size:.9rem;font-weight:500;margin-bottom:.2rem;color:#64748b}.empty-sub[data-v-837011e1]{font-size:.8rem;color:#94a3b8}.card-footer-link[data-v-837011e1]{margin-top:1rem;padding-top:.8rem;border-top:1px solid rgba(226,232,240,.5);text-align:center}.view-all-link[data-v-837011e1]{display:inline-flex;align-items:center;gap:.3rem;color:#1e3a5f;text-decoration:none;font-size:.8rem;font-weight:500;transition:all .2s ease}.view-all-link[data-v-837011e1]:hover{gap:.5rem;opacity:.8}.create-post-card[data-v-837011e1]{background:#fff;border-radius:28px;padding:1.2rem;border:1px solid #f1f5f9;box-shadow:0 15px 30px -12px #0000000d;flex-shrink:0}.create-post-header[data-v-837011e1]{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.create-avatar[data-v-837011e1]{width:40px;height:40px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:1.1rem;flex-shrink:0;box-shadow:0 8px 12px -4px #0000001a}.create-post-input[data-v-837011e1]{flex:1;padding:.8rem 1.2rem;border:1px solid #e2e8f0;border-radius:40px;font-size:.9rem;transition:all .2s;background:#f8fafc}.create-post-input[data-v-837011e1]:focus{outline:none;border-color:#1e3a5f;background:#fff;box-shadow:0 0 0 3px #1e3a5f1a}.create-post-toolbar[data-v-837011e1]{display:flex;justify-content:space-between;align-items:center}.toolbar-left[data-v-837011e1]{display:flex;gap:.5rem}.toolbar-btn[data-v-837011e1]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border:none;background:transparent;border-radius:40px;color:#64748b;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s}.toolbar-btn[data-v-837011e1]:hover{background:#f8fafc;color:#1e3a5f}.toolbar-btn svg[data-v-837011e1]{width:16px;height:16px}.post-btn[data-v-837011e1]{display:flex;align-items:center;gap:.4rem;padding:.5rem 1.5rem;background:#1e3a5f;border:none;border-radius:40px;color:#fff;font-size:.75rem;font-weight:500;cursor:pointer;transition:all .2s;box-shadow:0 8px 16px -6px #1e3a5f33}.post-btn[data-v-837011e1]:hover:not(:disabled){background:#14273f;transform:translateY(-1px);box-shadow:0 12px 20px -8px #1e3a5f4d}.post-btn[data-v-837011e1]:disabled{opacity:.5;cursor:not-allowed}.hidden-input[data-v-837011e1]{display:none}.image-preview-container[data-v-837011e1]{position:relative;margin:.5rem 0;display:inline-block}.image-preview[data-v-837011e1]{max-height:100px;border-radius:12px;border:1px solid #e2e8f0;background:#fff}.remove-image-btn[data-v-837011e1]{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#dc2626;border:none;border-radius:10px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.7rem}.posts-feed-scrollable[data-v-837011e1],.detail-view-scrollable[data-v-837011e1]{flex:1;overflow-y:auto;padding-right:.8rem}.posts-feed-scrollable[data-v-837011e1]::-webkit-scrollbar,.detail-view-scrollable[data-v-837011e1]::-webkit-scrollbar{width:4px}.posts-feed-scrollable[data-v-837011e1]::-webkit-scrollbar-track,.detail-view-scrollable[data-v-837011e1]::-webkit-scrollbar-track{background:#f1f5f980;border-radius:2px}.posts-feed-scrollable[data-v-837011e1]::-webkit-scrollbar-thumb,.detail-view-scrollable[data-v-837011e1]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}.view-header[data-v-837011e1]{margin-bottom:.5rem}.back-to-feed[data-v-837011e1]{display:inline-flex;align-items:center;gap:.3rem;padding:.3rem 1rem;background:#fff;border:1px solid #e2e8f0;border-radius:30px;color:#1e3a5f;font-size:.75rem;cursor:pointer;transition:all .2s}.back-to-feed[data-v-837011e1]:hover{background:#f8fafc;border-color:#1e3a5f}@media(max-width:1200px){.two-column[data-v-837011e1]{grid-template-columns:1fr;height:auto}.main-column[data-v-837011e1]{max-height:600px}.sidebar-column[data-v-837011e1]{max-height:400px}}@media(max-width:768px){.group-fullscreen[data-v-837011e1]{padding:1rem}.group-header[data-v-837011e1]{flex-direction:column;align-items:flex-start;gap:1rem}.group-info h1[data-v-837011e1]{white-space:normal}.create-post-toolbar[data-v-837011e1]{flex-direction:column;gap:.8rem}.toolbar-left[data-v-837011e1],.post-btn[data-v-837011e1]{width:100%;justify-content:center}}', Ph = { class: "group-wrapper" }, jh = { class: "group-fullscreen" }, Mh = { class: "group-header" }, Dh = { class: "header-left" }, Nh = { class: "group-avatar" }, Ih = { class: "group-info" }, Lh = { class: "group-meta" }, Bh = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Fh = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, zh = {
  key: 2,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Uh = {
  key: 1,
  class: "group-badge creator"
}, Hh = { class: "group-actions" }, Vh = ["href"], qh = { class: "two-column" }, Kh = { class: "main-column" }, Wh = { class: "create-post-card" }, Jh = { class: "create-post-header" }, Yh = {
  key: 0,
  class: "image-preview-container"
}, Gh = ["src"], Xh = { class: "create-post-toolbar" }, Zh = ["disabled"], Qh = {
  key: 0,
  class: "view-header"
}, em = {
  key: "feed",
  class: "posts-feed-scrollable"
}, tm = {
  key: "detail",
  class: "detail-view-scrollable"
}, nm = { class: "sidebar-column" }, om = { class: "compact-card" }, rm = { class: "card-header-compact" }, sm = { class: "header-title" }, am = { class: "header-count" }, im = { class: "compact-member-list" }, lm = {
  key: 0,
  class: "compact-online-indicator"
}, dm = { class: "compact-member-info" }, cm = { class: "compact-member-name" }, fm = { class: "compact-member-role" }, um = ["onClick"], pm = {
  key: 0,
  class: "compact-creator-badge"
}, hm = {
  key: 1,
  class: "compact-you-badge"
}, mm = { class: "invite-modal" }, gm = { class: "modal-header" }, vm = { class: "modal-header-text" }, bm = { class: "modal-body" }, xm = { class: "modal-search-wrapper" }, ym = { class: "modal-search-container" }, wm = {
  key: 0,
  class: "modal-results-wrapper"
}, _m = {
  name: "result-fade",
  tag: "div",
  class: "modal-results"
}, km = {
  class: "modal-no-results",
  key: "no-results"
}, Cm = ["onClick"], Sm = {
  key: 0,
  class: "modal-result-online-dot"
}, Em = { class: "modal-result-info" }, $m = { class: "modal-result-name" }, Am = { class: "modal-result-email" }, Tm = {
  key: 0,
  class: "modal-selected-user"
}, Rm = { class: "modal-selected-user-content" }, Om = { class: "modal-selected-details" }, Pm = { class: "modal-selected-name" }, jm = { class: "modal-selected-email" }, Mm = {
  key: 0,
  class: "modal-message"
}, Dm = {
  key: 0,
  class: "modal-message-count"
}, Nm = { class: "modal-footer" }, Im = ["disabled"], Lm = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Bm = {
  key: 0,
  class: "compact-card"
}, Fm = { class: "card-header-compact" }, zm = { class: "header-title" }, Um = { class: "header-count" }, Hm = { class: "approval-list" }, Vm = {
  key: 0,
  class: "empty-state"
}, qm = { class: "post-content" }, Km = { class: "post-header" }, Wm = { class: "post-author" }, Jm = { class: "author-info" }, Ym = { class: "author-name" }, Gm = { class: "post-message" }, Xm = {
  key: 0,
  class: "post-image-indicator"
}, Zm = { class: "post-actions" }, Qm = ["onClick"], eg = ["onClick"], tg = ["onClick"], ng = {
  key: 1,
  class: "compact-card"
}, og = { class: "card-header-compact" }, rg = { class: "header-title" }, sg = { class: "header-count" }, ag = { class: "approval-list" }, ig = {
  key: 0,
  class: "empty-state"
}, lg = { class: "invitation-content" }, dg = { class: "invitation-header" }, cg = { class: "invitation-sender" }, fg = {
  key: 0,
  class: "sender-online-dot"
}, ug = { class: "sender-info" }, pg = { class: "sender-name" }, hg = { class: "invitation-time" }, mg = { class: "invitation-message" }, gg = {
  key: 0,
  class: "invitation-quote"
}, vg = { class: "invitation-meta" }, bg = { class: "invitee-chip" }, xg = { class: "invitation-actions" }, yg = ["onClick"], wg = ["onClick"], _g = {
  __name: "GroupPage.ce",
  setup(e) {
    K.defaults.xsrfCookieName = "csrftoken", K.defaults.xsrfHeaderName = "X-CSRFToken", K.defaults.withCredentials = !0;
    const t = /* @__PURE__ */ Y(null), n = /* @__PURE__ */ Y(null), o = /* @__PURE__ */ Y(null), r = /* @__PURE__ */ Y(null), s = /* @__PURE__ */ Y(null), i = /* @__PURE__ */ Y([
      {
        id: 1,
        author: { id: 2, username: "alex_chen", isOnline: !0 },
        content: "🎉 Just finished implementing a balanced binary tree in Python! Here's my implementation if anyone wants to see:",
        image: null,
        created_at: "2024-03-15T14:30:00Z",
        likesCount: 24,
        isLiked: !1,
        status: "pending",
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
        status: "pending",
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
        status: "approved",
        tags: ["resources", "sorting", "visualization"],
        comments: []
      }
    ]), l = async () => {
      try {
        const y = await K.get(`/api/groups/${n.value}`);
        console.log(y.data.group), t.value = y.data.group, r.value = y.data.members, o.value = y.data.current_user, s.value = y.data.pending_posts, i.value = y.data.posts;
      } catch (y) {
        console.error("Error fetching group details.", y);
      }
    }, d = async () => {
      try {
        const y = await K.get(
          `/api/groups/${n.value}/uninvited-profiles`
        );
        if (y.status === 200) {
          const u = y.data;
          J.value = u;
        }
      } catch (y) {
        console.error("Error fetching group details.", y);
      }
    };
    Rn(() => {
      const u = window.location.pathname.split("/").filter((m) => m !== "");
      n.value = u[u.length - 1], l(), d();
    });
    const f = /* @__PURE__ */ Y(""), c = /* @__PURE__ */ Y(null), p = /* @__PURE__ */ Y(null), x = /* @__PURE__ */ Y(null), w = /* @__PURE__ */ Y("feed"), v = /* @__PURE__ */ Y(null), k = /* @__PURE__ */ Y(""), b = ve(() => t.value?.creator?.id === o.value?.id), E = ve(() => r.value?.some((y) => y.id === o.value?.id)), $ = ve(() => r.value?.slice(0, 5) || []), j = ve(() => [...i.value].sort(
      (y, u) => new Date(u.created_at) - new Date(y.created_at)
    )), I = /* @__PURE__ */ Y(!1), F = /* @__PURE__ */ Y(""), N = /* @__PURE__ */ Y([]), M = /* @__PURE__ */ Y(null), Q = /* @__PURE__ */ Y(""), z = /* @__PURE__ */ Y(!1), J = /* @__PURE__ */ Y(null), ie = () => {
      I.value = !0, F.value = "", N.value = [], M.value = null, Q.value = "";
    }, U = () => {
      I.value = !1;
    }, re = () => {
      if (F.value.length < 2) {
        N.value = [];
        return;
      }
      const y = r.value?.map((u) => u.id) || [];
      N.value = J.value.filter(
        (u) => (u.username.toLowerCase().includes(F.value.toLowerCase()) || u.email.toLowerCase().includes(F.value.toLowerCase())) && !y.includes(u.id) && (!M.value || u.id !== M.value.id)
      );
    }, ue = (y) => {
      M.value = y, N.value = [], F.value = "";
    }, Oe = () => {
      M.value = null;
    }, ee = async () => {
      if (M.value) {
        z.value = !0;
        try {
          (await K.post(
            `/api/groups/${n.value}/invitations/`,
            {
              invited_student_id: M.value.id,
              message: Q.value
            }
          )).status === 200 && (alert(`Invitation sent to ${M.value.username}`), U());
        } catch (y) {
          console.error("Error sending invitation:", y), alert("Failed to send invitation. Please try again.");
        } finally {
          z.value = !1;
        }
      }
    }, ce = async (y) => {
      s.value.find((u) => u.id === y);
      try {
        const u = await K.get(`/api/posts/${y}/approve`);
        if (u.status === 200) {
          const m = u.data;
          console.log("Approved post successfully"), console.log(m), s.value = s.value.filter((B) => B.id !== y), i.value.unshift(m);
        }
      } catch (u) {
        console.log("Error approving post request.", u);
      }
    }, Z = async (y) => {
      s.value.find((u) => u.id === y), s.value = s.value.filter((u) => u.id !== y);
      try {
        const u = await K.get(`/api/posts/${y}/reject`);
        if (u.status === 200) {
          const m = u.data;
          console.log("Rejected successfully");
        }
      } catch (u) {
        console.error("Error in rejecting post.", u);
      }
      console.log(`Rejected post ${y}`);
    }, Ue = (y) => {
      const u = s.value.find((m) => m.id === y);
      v.value = u, w.value = "review", console.log(`Viewing post ${y} for review`);
    }, kt = async ({ postId: y, comment: u }) => {
      try {
        const m = await K.post(`/api/posts/${y}/comment`, {
          content: u
        });
        if (m.status === 200 || m.status === 201) {
          const B = m.data.data, D = i.value.find(
            (H) => H.id === v.value.id
          );
          D && (D.comments || (D.comments = []), D.comments.push(B)), console.log(v.value);
        }
      } catch (m) {
        console.error("Error commenting to the post.", m);
      }
    }, _e = async (y) => {
      const m = i.value.find((D) => D.id === v.value.id)?.comments.find((D) => D.id === y);
      if (!m) return;
      const B = m.isLiked;
      m.isLiked = !m.isLiked, m.likesCount += m.isLiked ? 1 : -1;
      try {
        const D = await K.post(`/api/comments/${y}/like`);
        D.data.likesCount !== void 0 && (m.likesCount = D.data.likesCount);
      } catch (D) {
        m.isLiked = B, m.likesCount += m.isLiked ? 1 : -1, console.error("Like failed to save:", D);
      }
    }, ye = () => {
    }, dt = async (y) => {
      try {
        const u = await K.post(`/api/posts/${y}/like`), m = i.value.find((B) => B.id === y);
        if (u.status === 200 || u.status === 201) {
          const B = u.data;
          console.log(B), m && (m.isLiked = !m.isLiked, m.likesCount += m.isLiked ? 1 : -1);
        }
      } catch (u) {
        console.error("Error liking the post.", u);
      }
    }, Le = (y) => {
      const u = [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD"
      ], m = y?.split("").reduce((B, D) => B + D.charCodeAt(0), 0) % u.length;
      return u[m];
    }, qt = (y) => y ? new Date(y).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) : "Unknown", Ot = (y) => ({
      major: "Major-Based",
      course: "Course-Based",
      general: "General Study"
    })[y] || "General Study", Kt = () => {
      x.value?.click();
    }, on = (y) => {
      const u = y.target;
      if (!u || !u.files.length) return;
      const m = u.files[0];
      if (m) {
        p.value = m;
        const B = new FileReader();
        B.onload = (D) => {
          c.value = D.target.result;
        }, B.readAsDataURL(m);
      }
    }, rn = () => {
      c.value = null, p.value = null, x.value && (x.value.value = "");
    }, Pt = async () => {
      if (!(!f.value.trim() && !c.value))
        try {
          const y = new FormData();
          y.append("content", f.value.trim()), y.append("image", p.value);
          const u = await K.post(
            `/groups/${t.value.id}/post/create`,
            y
          );
          if (u.status === 200 || u.status === 201) {
            const m = u.data;
            i.value.unshift(m), f.value = "", rn();
          }
          console.log("Uploaded successfully:", u.data);
        } catch (y) {
          console.log("Error creating post.", y);
        }
    }, Tr = (y) => {
      if (confirm(
        y.author.id === o.id ? "Delete your post?" : "Remove this post?"
      )) {
        const u = i.value.findIndex((m) => m.id === y.id);
        u !== -1 && i.value.splice(u, 1), w.value === "detail" && v.value?.id === y.id && g();
      }
    }, h = (y) => {
      v.value = y, w.value = "detail", k.value = "";
    }, g = () => {
      w.value = "feed", v.value = null, k.value = "";
    }, C = () => {
      confirm("Are you sure you want to leave this group?") && console.log("Leaving group:", t.id);
    }, R = /* @__PURE__ */ Y([
      {
        id: 1,
        sender: {
          id: 101,
          username: "emily_wong",
          isOnline: !0
        },
        invitee: {
          id: 201,
          username: "michael_rodriguez",
          email: "michael.r@example.com"
        },
        group: {
          id: 301,
          name: "Data Structures Study Group"
        },
        message: "Michael is a great student and would be an asset to our group. He's been asking to join for weeks.",
        timeAgo: "1 hour ago",
        createdAt: "2024-03-20T14:30:00Z"
      },
      {
        id: 2,
        sender: {
          id: 102,
          username: "alex_chen",
          isOnline: !0
        },
        invitee: {
          id: 202,
          username: "sarah_johnson",
          email: "sarah.j@example.com"
        },
        group: {
          id: 302,
          name: "Algorithms Study Group"
        },
        message: "Sarah is a teaching assistant for this course and would be incredibly helpful for everyone.",
        timeAgo: "3 hours ago",
        createdAt: "2024-03-20T12:15:00Z"
      },
      {
        id: 3,
        sender: {
          id: 103,
          username: "maria_r",
          isOnline: !1
        },
        invitee: {
          id: 203,
          username: "james_kim",
          email: "james.k@example.com"
        },
        group: {
          id: 303,
          name: "Machine Learning Study Group"
        },
        message: "James has been working on similar projects and would bring valuable insights.",
        timeAgo: "5 hours ago",
        createdAt: "2024-03-20T10:00:00Z"
      }
    ]), O = (y) => {
      const u = R.value.find(
        (m) => m.id === y
      );
      confirm(
        `Approve ${u.sender.username}'s invitation for ${u.invitee.username}?`
      ) && (R.value = R.value.filter(
        (m) => m.id !== y
      ), console.log(`Approved invitation ${y}`));
    }, P = (y) => {
      const u = R.value.find(
        (m) => m.id === y
      );
      confirm(
        `Reject ${u.sender.username}'s invitation for ${u.invitee.username}?`
      ) && (R.value = R.value.filter(
        (m) => m.id !== y
      ), console.log(`Rejected invitation ${y}`));
    }, L = async (y) => {
      try {
        const u = await K.post(
          `/api/groups/${n.value}/members/${y}/kick/`
        );
        if (u.status === 200) {
          const m = u.data;
          r.value = r.value.filter(
            (B) => B.user.id !== Number(y)
          ), console.log(m);
        }
      } catch {
      }
    };
    return (y, u) => (A(), T("div", Ph, [
      a("div", jh, [
        a("div", Mh, [
          a("div", Dh, [
            a("div", Nh, S(t.value.name.charAt(0).toUpperCase()), 1),
            a("div", Ih, [
              a("h1", null, S(t.value.name), 1),
              a("div", Lh, [
                a("span", null, [
                  u[4] || (u[4] = We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-837011e1><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-837011e1></rect><line x1="16" y1="2" x2="16" y2="6" data-v-837011e1></line><line x1="8" y1="2" x2="8" y2="6" data-v-837011e1></line><line x1="3" y1="10" x2="21" y2="10" data-v-837011e1></line></svg>', 1)),
                  te(" Created " + S(qt(t.value.created_at)), 1)
                ]),
                a("span", null, [
                  u[5] || (u[5] = a("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    a("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  te(" " + S(t.value.member_count) + " / " + S(t.value.max_members) + " members ", 1)
                ]),
                t.value.group_type ? (A(), T("span", {
                  key: 0,
                  class: me(["group-badge", t.value.group_type])
                }, [
                  t.value.group_type === "major" ? (A(), T("svg", Bh, [...u[6] || (u[6] = [
                    a("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }, null, -1)
                  ])])) : t.value.group_type === "course" ? (A(), T("svg", Fh, [...u[7] || (u[7] = [
                    a("rect", {
                      x: "2",
                      y: "3",
                      width: "20",
                      height: "14",
                      rx: "2",
                      ry: "2"
                    }, null, -1),
                    a("line", {
                      x1: "8",
                      y1: "21",
                      x2: "16",
                      y2: "21"
                    }, null, -1),
                    a("line", {
                      x1: "12",
                      y1: "17",
                      x2: "12",
                      y2: "21"
                    }, null, -1)
                  ])])) : (A(), T("svg", zh, [...u[8] || (u[8] = [
                    a("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }, null, -1),
                    a("circle", {
                      cx: "9",
                      cy: "7",
                      r: "4"
                    }, null, -1),
                    a("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }, null, -1),
                    a("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }, null, -1)
                  ])])),
                  te(" " + S(Ot(t.value.group_type)), 1)
                ], 2)) : X("", !0),
                b.value ? (A(), T("span", Uh, [...u[9] || (u[9] = [
                  a("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" })
                  ], -1),
                  te(" Creator ", -1)
                ])])) : X("", !0)
              ])
            ])
          ]),
          a("div", Hh, [
            a("a", {
              href: `/chat/${t.value.id}`,
              class: "btn-group primary"
            }, [...u[10] || (u[10] = [
              a("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
              ], -1),
              te(" Chat ", -1)
            ])], 8, Vh),
            E.value ? (A(), T("button", {
              key: 0,
              onClick: C,
              class: "btn-group outline"
            }, [...u[11] || (u[11] = [
              a("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                a("polyline", { points: "16 17 21 12 16 7" }),
                a("line", {
                  x1: "21",
                  y1: "12",
                  x2: "9",
                  y2: "12"
                })
              ], -1),
              te(" Leave ", -1)
            ])])) : X("", !0)
          ])
        ]),
        a("div", qh, [
          a("div", Kh, [
            a("div", Wh, [
              a("div", Jh, [
                a("div", {
                  class: "create-avatar",
                  style: ke({
                    backgroundColor: Le(o.value.username)
                  })
                }, S(o.value.username.charAt(0).toUpperCase()), 5),
                qe(a("input", {
                  type: "text",
                  class: "create-post-input",
                  placeholder: "What's on your mind? Share something with the group...",
                  "onUpdate:modelValue": u[0] || (u[0] = (m) => f.value = m)
                }, null, 512), [
                  [Tt, f.value]
                ])
              ]),
              c.value ? (A(), T("div", Yh, [
                a("img", {
                  src: c.value,
                  class: "image-preview",
                  alt: "Preview"
                }, null, 8, Gh),
                a("button", {
                  class: "remove-image-btn",
                  onClick: rn
                }, [...u[12] || (u[12] = [
                  a("svg", {
                    width: "14",
                    height: "14",
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
                ])])
              ])) : X("", !0),
              a("div", Xh, [
                a("div", { class: "toolbar-left" }, [
                  a("button", {
                    class: "toolbar-btn",
                    onClick: Kt
                  }, [...u[13] || (u[13] = [
                    a("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      a("rect", {
                        x: "2",
                        y: "2",
                        width: "20",
                        height: "20",
                        rx: "2",
                        ry: "2"
                      }),
                      a("circle", {
                        cx: "8.5",
                        cy: "8.5",
                        r: "1.5"
                      }),
                      a("polyline", { points: "21 15 16 10 5 21" })
                    ], -1),
                    a("span", null, "Photo", -1)
                  ])]),
                  u[14] || (u[14] = a("button", { class: "toolbar-btn" }, [
                    a("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      a("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                      a("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
                    ]),
                    a("span", null, "Link")
                  ], -1))
                ]),
                a("button", {
                  class: "post-btn",
                  onClick: Pt,
                  disabled: !f.value.trim() && !c.value
                }, [...u[15] || (u[15] = [
                  a("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("line", {
                      x1: "22",
                      y1: "2",
                      x2: "11",
                      y2: "13"
                    }),
                    a("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
                  ], -1),
                  a("span", null, "Post", -1)
                ])], 8, Zh)
              ]),
              a("input", {
                type: "file",
                ref_key: "imageInput",
                ref: x,
                class: "hidden-input",
                accept: "image/*",
                onChange: on
              }, null, 544)
            ]),
            ge($t, { name: "fade-slide" }, {
              default: gt(() => [
                w.value === "detail" ? (A(), T("div", Qh, [
                  a("button", {
                    class: "back-to-feed",
                    onClick: g
                  }, [...u[16] || (u[16] = [
                    a("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      a("path", { d: "M19 12H5M12 19l-7-7 7-7" })
                    ], -1),
                    te(" Back to Feed ", -1)
                  ])])
                ])) : X("", !0)
              ]),
              _: 1
            }),
            ge($t, {
              name: "fade",
              mode: "out-in"
            }, {
              default: gt(() => [
                w.value === "feed" ? (A(), T("div", em, [
                  (A(!0), T(oe, null, we(j.value, (m) => (A(), oo(xi, {
                    key: m.id,
                    post: m,
                    "current-user": o.value,
                    "group-creator-id": t.value.creator?.id,
                    onLike: dt,
                    onDelete: Tr,
                    onViewComments: h
                  }, null, 8, ["post", "current-user", "group-creator-id"]))), 128))
                ])) : w.value === "detail" ? (A(), T("div", tm, [
                  ge(yi, {
                    "selected-post": v.value,
                    "current-user": o.value,
                    group: t.value,
                    onAddComment: kt,
                    onPostLike: dt,
                    onDelete: ye,
                    onCommentLike: _e
                  }, null, 8, ["selected-post", "current-user", "group"])
                ])) : X("", !0)
              ]),
              _: 1
            })
          ]),
          a("div", nm, [
            a("div", om, [
              a("div", rm, [
                a("div", sm, [
                  u[17] || (u[17] = a("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    a("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1)),
                  u[18] || (u[18] = a("span", null, "Members", -1)),
                  a("span", am, S(t.value.member_count), 1)
                ]),
                a("div", { class: "header-actions" }, [
                  a("button", {
                    class: "invite-btn",
                    onClick: ie,
                    title: "Invite someone"
                  }, [...u[19] || (u[19] = [
                    We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-837011e1><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-v-837011e1></path><circle cx="9" cy="7" r="4" data-v-837011e1></circle><line x1="19" y1="8" x2="19" y2="14" data-v-837011e1></line><line x1="22" y1="11" x2="16" y2="11" data-v-837011e1></line></svg><span data-v-837011e1>Invite</span>', 2)
                  ])]),
                  u[20] || (u[20] = a("a", {
                    href: "#",
                    class: "header-link"
                  }, "View all", -1))
                ])
              ]),
              a("div", im, [
                (A(!0), T(oe, null, we($.value, (m) => (A(), T("div", {
                  key: m.id,
                  class: "compact-member-item"
                }, [
                  a("div", {
                    class: "compact-member-avatar",
                    style: ke({
                      backgroundColor: Le(m.user.username)
                    })
                  }, [
                    te(S(m.user.username.charAt(0).toUpperCase()) + " ", 1),
                    m.isOnline ? (A(), T("span", lm)) : X("", !0)
                  ], 4),
                  a("div", dm, [
                    a("div", null, [
                      a("span", cm, S(m.user.username), 1),
                      a("span", fm, S(m.role), 1)
                    ]),
                    a("p", {
                      onClick: (B) => L(m.user.id)
                    }, "Kick", 8, um)
                  ]),
                  m.user.id === t.value.creator?.id ? (A(), T("span", pm, "👑")) : m.user.id === o.value.id ? (A(), T("span", hm, "you")) : X("", !0)
                ]))), 128))
              ])
            ]),
            ge($t, { name: "modal-fade" }, {
              default: gt(() => [
                I.value ? (A(), T("div", {
                  key: 0,
                  class: "modal-overlay",
                  onClick: lo(U, ["self"])
                }, [
                  a("div", mm, [
                    u[32] || (u[32] = a("div", { class: "modal-gradient-line" }, null, -1)),
                    a("div", gm, [
                      u[23] || (u[23] = a("div", { class: "modal-header-icon" }, [
                        a("svg", {
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "1.8"
                        }, [
                          a("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
                          a("circle", {
                            cx: "9",
                            cy: "7",
                            r: "4"
                          }),
                          a("line", {
                            x1: "19",
                            y1: "8",
                            x2: "19",
                            y2: "14"
                          }),
                          a("line", {
                            x1: "22",
                            y1: "11",
                            x2: "16",
                            y2: "11"
                          })
                        ])
                      ], -1)),
                      a("div", vm, [
                        u[21] || (u[21] = a("h3", null, "Invite to Group", -1)),
                        a("p", null, "Search and invite someone to join " + S(t.value.name), 1)
                      ]),
                      a("button", {
                        class: "modal-close-btn",
                        onClick: U
                      }, [...u[22] || (u[22] = [
                        a("svg", {
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
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
                      ])])
                    ]),
                    a("div", bm, [
                      a("div", xm, [
                        a("div", ym, [
                          u[25] || (u[25] = a("svg", {
                            class: "modal-search-icon",
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            a("circle", {
                              cx: "11",
                              cy: "11",
                              r: "8"
                            }),
                            a("line", {
                              x1: "21",
                              y1: "21",
                              x2: "16.65",
                              y2: "16.65"
                            })
                          ], -1)),
                          qe(a("input", {
                            type: "text",
                            class: "modal-search-input",
                            placeholder: "Search by name or email...",
                            "onUpdate:modelValue": u[1] || (u[1] = (m) => F.value = m),
                            onInput: re
                          }, null, 544), [
                            [Tt, F.value]
                          ]),
                          F.value ? (A(), T("div", {
                            key: 0,
                            class: "modal-search-clear",
                            onClick: u[2] || (u[2] = (m) => F.value = "")
                          }, [...u[24] || (u[24] = [
                            a("svg", {
                              width: "14",
                              height: "14",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2"
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
                          ])])) : X("", !0)
                        ])
                      ]),
                      F.value.length > 0 ? (A(), T("div", wm, [
                        a("transition-group", _m, [
                          N.value.length === 0 ? (A(), T("div", km, [...u[26] || (u[26] = [
                            a("div", { class: "modal-no-results-icon" }, [
                              a("svg", {
                                width: "48",
                                height: "48",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "1.5"
                              }, [
                                a("circle", {
                                  cx: "12",
                                  cy: "12",
                                  r: "10"
                                }),
                                a("line", {
                                  x1: "12",
                                  y1: "8",
                                  x2: "12",
                                  y2: "12"
                                }),
                                a("line", {
                                  x1: "12",
                                  y1: "16",
                                  x2: "12.01",
                                  y2: "16"
                                })
                              ])
                            ], -1),
                            a("p", null, "No users found", -1),
                            a("span", { class: "modal-no-results-hint" }, "Try a different search term", -1)
                          ])])) : X("", !0),
                          (A(!0), T(oe, null, we(N.value, (m) => (A(), T("div", {
                            key: m.id,
                            class: "modal-result-item",
                            onClick: (B) => ue(m)
                          }, [
                            a("div", {
                              class: "modal-result-avatar",
                              style: ke({
                                backgroundColor: Le(m.username)
                              })
                            }, [
                              te(S(m.username.charAt(0).toUpperCase()) + " ", 1),
                              m.isOnline ? (A(), T("span", Sm)) : X("", !0)
                            ], 4),
                            a("div", Em, [
                              a("span", $m, S(m.username), 1),
                              a("span", Am, S(m.email), 1)
                            ]),
                            a("div", {
                              class: me(["modal-result-status", { online: m.isOnline }])
                            }, [
                              u[27] || (u[27] = a("span", { class: "modal-status-dot" }, null, -1)),
                              te(" " + S(m.isOnline ? "Online" : "Offline"), 1)
                            ], 2)
                          ], 8, Cm))), 128))
                        ])
                      ])) : X("", !0),
                      ge($t, { name: "slide-down" }, {
                        default: gt(() => [
                          M.value ? (A(), T("div", Tm, [
                            u[29] || (u[29] = a("div", { class: "modal-selected-user-header" }, [
                              a("span", { class: "modal-selected-label" }, "Selected User")
                            ], -1)),
                            a("div", Rm, [
                              a("div", {
                                class: "modal-selected-avatar",
                                style: ke({
                                  backgroundColor: Le(
                                    M.value.username
                                  )
                                })
                              }, S(M.value.username.charAt(0).toUpperCase()), 5),
                              a("div", Om, [
                                a("span", Pm, S(M.value.username), 1),
                                a("span", jm, S(M.value.email), 1)
                              ]),
                              a("button", {
                                class: "modal-remove-selected",
                                onClick: Oe
                              }, [...u[28] || (u[28] = [
                                a("svg", {
                                  width: "16",
                                  height: "16",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2"
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
                              ])])
                            ])
                          ])) : X("", !0)
                        ]),
                        _: 1
                      }),
                      ge($t, { name: "slide-down" }, {
                        default: gt(() => [
                          M.value ? (A(), T("div", Mm, [
                            u[30] || (u[30] = a("div", { class: "modal-message-header" }, [
                              a("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "1.8"
                              }, [
                                a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
                              ]),
                              a("span", null, "Personal Message (Optional)")
                            ], -1)),
                            qe(a("textarea", {
                              class: "modal-message-textarea",
                              "onUpdate:modelValue": u[3] || (u[3] = (m) => Q.value = m),
                              placeholder: "Write a short message to accompany your invitation...",
                              rows: "3"
                            }, null, 512), [
                              [Tt, Q.value]
                            ]),
                            Q.value ? (A(), T("div", Dm, S(Q.value.length) + "/200 ", 1)) : X("", !0)
                          ])) : X("", !0)
                        ]),
                        _: 1
                      })
                    ]),
                    a("div", Nm, [
                      a("button", {
                        class: "modal-btn-secondary",
                        onClick: U
                      }, " Cancel "),
                      a("button", {
                        class: "modal-btn-primary",
                        disabled: !M.value || z.value,
                        onClick: ee
                      }, [
                        z.value ? X("", !0) : (A(), T("svg", Lm, [...u[31] || (u[31] = [
                          a("line", {
                            x1: "22",
                            y1: "2",
                            x2: "11",
                            y2: "13"
                          }, null, -1),
                          a("polygon", { points: "22 2 15 22 11 13 2 9 22 2" }, null, -1)
                        ])])),
                        a("span", null, S(z.value ? "Sending Invitation..." : "Send Invitation"), 1)
                      ], 8, Im)
                    ])
                  ])
                ])) : X("", !0)
              ]),
              _: 1
            }),
            o.value.is_admin ? (A(), T("div", Bm, [
              a("div", Fm, [
                a("div", zm, [
                  u[33] || (u[33] = a("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("rect", {
                      x: "2",
                      y: "2",
                      width: "20",
                      height: "20",
                      rx: "2",
                      ry: "2"
                    }),
                    a("circle", {
                      cx: "8.5",
                      cy: "8.5",
                      r: "1.5"
                    }),
                    a("polyline", { points: "21 15 16 10 5 21" })
                  ], -1)),
                  u[34] || (u[34] = a("span", null, "Posts to Review", -1)),
                  a("span", Um, S(s.value.length), 1)
                ]),
                u[35] || (u[35] = a("a", {
                  href: "#",
                  class: "header-link"
                }, "View all", -1))
              ]),
              a("div", Hm, [
                s.value.length === 0 ? (A(), T("div", Vm, [...u[36] || (u[36] = [
                  a("svg", {
                    width: "48",
                    height: "48",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.5"
                  }, [
                    a("rect", {
                      x: "2",
                      y: "2",
                      width: "20",
                      height: "20",
                      rx: "2",
                      ry: "2"
                    }),
                    a("line", {
                      x1: "2",
                      y1: "2",
                      x2: "22",
                      y2: "22"
                    })
                  ], -1),
                  a("p", null, "No posts to review", -1),
                  a("span", { class: "empty-sub" }, "All caught up!", -1)
                ])])) : X("", !0),
                (A(!0), T(oe, null, we(s.value, (m) => (A(), T("div", {
                  key: m.id,
                  class: "post-item"
                }, [
                  a("div", qm, [
                    a("div", Km, [
                      a("div", Wm, [
                        a("div", {
                          class: "author-avatar",
                          style: ke({
                            backgroundColor: Le(m.author.username)
                          })
                        }, S(m.author.username.charAt(0).toUpperCase()), 5),
                        a("div", Jm, [
                          a("span", Ym, S(m.author.username), 1),
                          u[37] || (u[37] = a("span", { class: "post-time" }, " 2 hours ago", -1))
                        ])
                      ]),
                      u[38] || (u[38] = a("span", { class: "post-badge" }, "Pending Review", -1))
                    ]),
                    a("p", Gm, S(m.content), 1),
                    m.image ? (A(), T("div", Xm, [...u[39] || (u[39] = [
                      a("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        a("rect", {
                          x: "2",
                          y: "2",
                          width: "20",
                          height: "20",
                          rx: "2",
                          ry: "2"
                        }),
                        a("circle", {
                          cx: "8.5",
                          cy: "8.5",
                          r: "1.5"
                        }),
                        a("polyline", { points: "21 15 16 10 5 21" })
                      ], -1),
                      a("span", null, "Contains image", -1)
                    ])])) : X("", !0)
                  ]),
                  a("div", Zm, [
                    a("button", {
                      onClick: (B) => Ue(m.id),
                      class: "action-btn review",
                      title: "Review post"
                    }, [...u[40] || (u[40] = [
                      a("svg", {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        a("circle", {
                          cx: "12",
                          cy: "12",
                          r: "3"
                        }),
                        a("path", { d: "M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z" })
                      ], -1)
                    ])], 8, Qm),
                    a("button", {
                      onClick: (B) => ce(m.id),
                      class: "action-btn approve",
                      title: "Approve post"
                    }, [...u[41] || (u[41] = [
                      a("svg", {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.5"
                      }, [
                        a("polyline", { points: "20 6 9 17 4 12" })
                      ], -1)
                    ])], 8, eg),
                    a("button", {
                      onClick: (B) => Z(m.id),
                      class: "action-btn reject",
                      title: "Reject post"
                    }, [...u[42] || (u[42] = [
                      a("svg", {
                        width: "18",
                        height: "18",
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
                    ])], 8, tg)
                  ])
                ]))), 128))
              ]),
              u[43] || (u[43] = a("div", { class: "card-footer-link" }, [
                a("a", {
                  href: "#",
                  class: "view-all-link"
                }, [
                  a("span", null, "View all pending posts"),
                  a("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("polyline", { points: "9 18 15 12 9 6" })
                  ])
                ])
              ], -1))
            ])) : X("", !0),
            o.value.is_admin ? (A(), T("div", ng, [
              a("div", og, [
                a("div", rg, [
                  u[44] || (u[44] = We('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-837011e1><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-v-837011e1></path><circle cx="9" cy="7" r="4" data-v-837011e1></circle><line x1="19" y1="8" x2="19" y2="14" data-v-837011e1></line><line x1="22" y1="11" x2="16" y2="11" data-v-837011e1></line></svg><span data-v-837011e1>Invitation Requests</span>', 2)),
                  a("span", sg, S(R.value.length), 1)
                ]),
                u[45] || (u[45] = a("a", {
                  href: "#",
                  class: "header-link"
                }, "View all", -1))
              ]),
              a("div", ag, [
                R.value.length === 0 ? (A(), T("div", ig, [...u[46] || (u[46] = [
                  We('<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-837011e1><circle cx="12" cy="12" r="10" data-v-837011e1></circle><line x1="12" y1="8" x2="12" y2="12" data-v-837011e1></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-837011e1></line></svg><p data-v-837011e1>No pending invitations</p><span class="empty-sub" data-v-837011e1>All clear!</span>', 3)
                ])])) : X("", !0),
                (A(!0), T(oe, null, we(R.value, (m) => (A(), T("div", {
                  key: m.id,
                  class: "invitation-item"
                }, [
                  a("div", lg, [
                    a("div", dg, [
                      a("div", cg, [
                        a("div", {
                          class: "sender-avatar",
                          style: ke({
                            backgroundColor: Le(
                              m.sender.username
                            )
                          })
                        }, [
                          te(S(m.sender.username.charAt(0).toUpperCase()) + " ", 1),
                          m.sender.isOnline ? (A(), T("span", fg)) : X("", !0)
                        ], 4),
                        a("div", ug, [
                          a("span", pg, S(m.sender.username), 1),
                          a("span", hg, S(m.timeAgo), 1)
                        ])
                      ]),
                      u[47] || (u[47] = a("span", { class: "invitation-badge" }, "Pending", -1))
                    ]),
                    a("p", mg, [
                      a("strong", null, S(m.sender.username), 1),
                      u[48] || (u[48] = te(" wants to invite ", -1)),
                      a("strong", null, S(m.invitee.username), 1),
                      u[49] || (u[49] = te(" to join ", -1)),
                      a("strong", null, S(m.group.name), 1)
                    ]),
                    m.message ? (A(), T("div", gg, [
                      u[50] || (u[50] = a("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        a("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
                      ], -1)),
                      a("span", null, '"' + S(m.message) + '"', 1)
                    ])) : X("", !0),
                    a("div", vg, [
                      a("div", bg, [
                        u[51] || (u[51] = a("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          a("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                          a("circle", {
                            cx: "12",
                            cy: "7",
                            r: "4"
                          })
                        ], -1)),
                        a("span", null, S(m.invitee.email), 1)
                      ])
                    ])
                  ]),
                  a("div", xg, [
                    a("button", {
                      onClick: (B) => O(m.id),
                      class: "action-btn approve",
                      title: "Approve invitation"
                    }, [...u[52] || (u[52] = [
                      a("svg", {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.5"
                      }, [
                        a("polyline", { points: "20 6 9 17 4 12" })
                      ], -1)
                    ])], 8, yg),
                    a("button", {
                      onClick: (B) => P(m.id),
                      class: "action-btn reject",
                      title: "Reject invitation"
                    }, [...u[53] || (u[53] = [
                      a("svg", {
                        width: "18",
                        height: "18",
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
                    ])], 8, wg)
                  ])
                ]))), 128))
              ]),
              u[54] || (u[54] = a("div", { class: "card-footer-link" }, [
                a("a", {
                  href: "#",
                  class: "view-all-link"
                }, [
                  a("span", null, "View all invitation requests"),
                  a("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("polyline", { points: "9 18 15 12 9 6" })
                  ])
                ])
              ], -1))
            ])) : X("", !0)
          ])
        ])
      ])
    ]));
  }
}, kg = /* @__PURE__ */ _t(_g, [["styles", [Oh]], ["__scopeId", "data-v-837011e1"]]), Cg = /* @__PURE__ */ wt(vi), Sg = /* @__PURE__ */ wt(Pu), Eg = /* @__PURE__ */ wt(bi), $g = /* @__PURE__ */ wt(Gu), Ag = /* @__PURE__ */ wt(s1), Tg = /* @__PURE__ */ wt(Z1), Rg = /* @__PURE__ */ wt(xi), Og = /* @__PURE__ */ wt(kg), Pg = /* @__PURE__ */ wt(yi);
customElements.define("gallery-card", Cg);
customElements.define("find-partner-view", Sg);
customElements.define("gallery-card-compact", Eg);
customElements.define("inbound-request", $g);
customElements.define("admin-dashboard", Ag);
customElements.define("chat-room", Tg);
customElements.define("post-card", Rg);
customElements.define("group-page", Og);
customElements.define("post-details", Pg);
