;(function (e, t) {
  if ('object' === typeof exports && 'object' === typeof module)
    module.exports = t()
  else if ('function' === typeof define && define.amd) define([], t)
  else {
    var n = t()
    for (var o in n) ('object' === typeof exports ? exports : e)[o] = n[o]
  }
})(self, function () {
  return (function () {
    'use strict'
    var e = {}
    !(function () {
      e.d = function (t, n) {
        for (var o in n)
          e.o(n, o) &&
            !e.o(t, o) &&
            Object.defineProperty(t, o, { enumerable: !0, get: n[o] })
      }
    })(),
      (function () {
        e.g = (function () {
          if ('object' === typeof globalThis) return globalThis
          try {
            return this || new Function('return this')()
          } catch (e) {
            if ('object' === typeof window) return window
          }
        })()
      })(),
      (function () {
        e.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }
      })(),
      (function () {
        e.r = function (e) {
          'undefined' !== typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 })
        }
      })()
    var t = {}
    function n(e, t) {
      const n = Object.create(null),
        o = e.split(',')
      for (let r = 0; r < o.length; r++) n[o[r]] = !0
      return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
    }
    e.r(t),
      e.d(t, {
        default: function () {
          return oo
        },
      })
    function o(e) {
      if (v(e)) {
        const t = {}
        for (let n = 0; n < e.length; n++) {
          const r = e[n],
            s = w(r) ? l(r) : o(r)
          if (s) for (const e in s) t[e] = s[e]
        }
        return t
      }
      return w(e) || k(e) ? e : void 0
    }
    const r = /;(?![^(]*\))/g,
      s = /:(.+)/
    function l(e) {
      const t = {}
      return (
        e.split(r).forEach((e) => {
          if (e) {
            const n = e.split(s)
            n.length > 1 && (t[n[0].trim()] = n[1].trim())
          }
        }),
        t
      )
    }
    function i(e) {
      let t = ''
      if (w(e)) t = e
      else if (v(e))
        for (let n = 0; n < e.length; n++) {
          const o = i(e[n])
          o && (t += o + ' ')
        }
      else if (k(e)) for (const n in e) e[n] && (t += n + ' ')
      return t.trim()
    }
    const c = {},
      u = () => {},
      a = () => !1,
      f = /^on[^a-z]/,
      p = (e) => f.test(e),
      h = Object.assign,
      d = (e, t) => {
        const n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
      },
      g = Object.prototype.hasOwnProperty,
      _ = (e, t) => g.call(e, t),
      v = Array.isArray,
      y = (e) => '[object Map]' === j(e),
      b = (e) => '[object Set]' === j(e),
      m = (e) => 'function' === typeof e,
      w = (e) => 'string' === typeof e,
      S = (e) => 'symbol' === typeof e,
      k = (e) => null !== e && 'object' === typeof e,
      x = (e) => k(e) && m(e.then) && m(e.catch),
      C = Object.prototype.toString,
      j = (e) => C.call(e),
      O = (e) => j(e).slice(8, -1),
      F = (e) => '[object Object]' === j(e),
      R = (e) =>
        w(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
      M = (e) => {
        const t = Object.create(null)
        return (n) => {
          const o = t[n]
          return o || (t[n] = e(n))
        }
      },
      P = /-(\w)/g,
      E =
        (M((e) => e.replace(P, (e, t) => (t ? t.toUpperCase() : ''))),
        /\B([A-Z])/g),
      A =
        (M((e) => e.replace(E, '-$1').toLowerCase()),
        M((e) => e.charAt(0).toUpperCase() + e.slice(1))),
      $ = (M((e) => (e ? `on${A(e)}` : '')), (e, t) => !Object.is(e, t)),
      N = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
      },
      I = (e, t, n) => {
        Object.defineProperty(e, t, {
          configurable: !0,
          enumerable: !1,
          value: n,
        })
      }
    let L
    function T(e, t = L) {
      t && t.active && t.effects.push(e)
    }
    const U = (e) => {
        const t = new Set(e)
        return (t.w = 0), (t.n = 0), t
      },
      W = (e) => (e.w & D) > 0,
      z = (e) => (e.n & D) > 0,
      B = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= D
      },
      V = (e) => {
        const { deps: t } = e
        if (t.length) {
          let n = 0
          for (let o = 0; o < t.length; o++) {
            const r = t[o]
            W(r) && !z(r) ? r.delete(e) : (t[n++] = r), (r.w &= ~D), (r.n &= ~D)
          }
          t.length = n
        }
      },
      H = new WeakMap()
    let K = 0,
      D = 1
    const Y = 30
    let Z
    const q = Symbol(''),
      G = Symbol('')
    class J {
      constructor(e, t = null, n) {
        ;(this.fn = e),
          (this.scheduler = t),
          (this.active = !0),
          (this.deps = []),
          (this.parent = void 0),
          T(this, n)
      }
      run() {
        if (!this.active) return this.fn()
        let e = Z,
          t = X
        while (e) {
          if (e === this) return
          e = e.parent
        }
        try {
          return (
            (this.parent = Z),
            (Z = this),
            (X = !0),
            (D = 1 << ++K),
            K <= Y ? B(this) : Q(this),
            this.fn()
          )
        } finally {
          K <= Y && V(this),
            (D = 1 << --K),
            (Z = this.parent),
            (X = t),
            (this.parent = void 0),
            this.deferStop && this.stop()
        }
      }
      stop() {
        Z === this
          ? (this.deferStop = !0)
          : this.active &&
            (Q(this), this.onStop && this.onStop(), (this.active = !1))
      }
    }
    function Q(e) {
      const { deps: t } = e
      if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e)
        t.length = 0
      }
    }
    let X = !0
    const ee = []
    function te() {
      ee.push(X), (X = !1)
    }
    function ne() {
      const e = ee.pop()
      X = void 0 === e || e
    }
    function oe(e, t, n) {
      if (X && Z) {
        let t = H.get(e)
        t || H.set(e, (t = new Map()))
        let o = t.get(n)
        o || t.set(n, (o = U()))
        const r = void 0
        re(o, r)
      }
    }
    function re(e, t) {
      let n = !1
      K <= Y ? z(e) || ((e.n |= D), (n = !W(e))) : (n = !e.has(Z)),
        n && (e.add(Z), Z.deps.push(e))
    }
    function se(e, t, n, o, r, s) {
      const l = H.get(e)
      if (!l) return
      let i = []
      if ('clear' === t) i = [...l.values()]
      else if ('length' === n && v(e))
        l.forEach((e, t) => {
          ;('length' === t || t >= o) && i.push(e)
        })
      else
        switch ((void 0 !== n && i.push(l.get(n)), t)) {
          case 'add':
            v(e)
              ? R(n) && i.push(l.get('length'))
              : (i.push(l.get(q)), y(e) && i.push(l.get(G)))
            break
          case 'delete':
            v(e) || (i.push(l.get(q)), y(e) && i.push(l.get(G)))
            break
          case 'set':
            y(e) && i.push(l.get(q))
            break
        }
      if (1 === i.length) i[0] && le(i[0])
      else {
        const e = []
        for (const t of i) t && e.push(...t)
        le(U(e))
      }
    }
    function le(e, t) {
      const n = v(e) ? e : [...e]
      for (const o of n) o.computed && ie(o, t)
      for (const o of n) o.computed || ie(o, t)
    }
    function ie(e, t) {
      ;(e !== Z || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
    }
    const ce = n('__proto__,__v_isRef,__isVue'),
      ue = new Set(
        Object.getOwnPropertyNames(Symbol)
          .filter((e) => 'arguments' !== e && 'caller' !== e)
          .map((e) => Symbol[e])
          .filter(S)
      ),
      ae = de(),
      fe = de(!0),
      pe = he()
    function he() {
      const e = {}
      return (
        ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
          e[t] = function (...e) {
            const n = tt(this)
            for (let t = 0, r = this.length; t < r; t++) oe(n, 'get', t + '')
            const o = n[t](...e)
            return -1 === o || !1 === o ? n[t](...e.map(tt)) : o
          }
        }),
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
          e[t] = function (...e) {
            te()
            const n = tt(this)[t].apply(this, e)
            return ne(), n
          }
        }),
        e
      )
    }
    function de(e = !1, t = !1) {
      return function (n, o, r) {
        if ('__v_isReactive' === o) return !e
        if ('__v_isReadonly' === o) return e
        if ('__v_isShallow' === o) return t
        if ('__v_raw' === o && r === (e ? (t ? Ke : He) : t ? Ve : Be).get(n))
          return n
        const s = v(n)
        if (!e && s && _(pe, o)) return Reflect.get(pe, o, r)
        const l = Reflect.get(n, o, r)
        return (S(o) ? ue.has(o) : ce(o))
          ? l
          : (e || oe(n, 'get', o),
            t
              ? l
              : st(l)
              ? s && R(o)
                ? l
                : l.value
              : k(l)
              ? e
                ? qe(l)
                : Ze(l)
              : l)
      }
    }
    const ge = _e()
    function _e(e = !1) {
      return function (t, n, o, r) {
        let s = t[n]
        if (Qe(s) && st(s) && !st(o)) return !1
        if (
          !e &&
          !Qe(o) &&
          (Xe(o) || ((o = tt(o)), (s = tt(s))), !v(t) && st(s) && !st(o))
        )
          return (s.value = o), !0
        const l = v(t) && R(n) ? Number(n) < t.length : _(t, n),
          i = Reflect.set(t, n, o, r)
        return (
          t === tt(r) &&
            (l ? $(o, s) && se(t, 'set', n, o, s) : se(t, 'add', n, o)),
          i
        )
      }
    }
    function ve(e, t) {
      const n = _(e, t),
        o = e[t],
        r = Reflect.deleteProperty(e, t)
      return r && n && se(e, 'delete', t, void 0, o), r
    }
    function ye(e, t) {
      const n = Reflect.has(e, t)
      return (S(t) && ue.has(t)) || oe(e, 'has', t), n
    }
    function be(e) {
      return oe(e, 'iterate', v(e) ? 'length' : q), Reflect.ownKeys(e)
    }
    const me = { get: ae, set: ge, deleteProperty: ve, has: ye, ownKeys: be },
      we = {
        get: fe,
        set(e, t) {
          return !0
        },
        deleteProperty(e, t) {
          return !0
        },
      },
      Se = (e) => e,
      ke = (e) => Reflect.getPrototypeOf(e)
    function xe(e, t, n = !1, o = !1) {
      e = e['__v_raw']
      const r = tt(e),
        s = tt(t)
      n || (t !== s && oe(r, 'get', t), oe(r, 'get', s))
      const { has: l } = ke(r),
        i = o ? Se : n ? rt : ot
      return l.call(r, t)
        ? i(e.get(t))
        : l.call(r, s)
        ? i(e.get(s))
        : void (e !== r && e.get(t))
    }
    function Ce(e, t = !1) {
      const n = this['__v_raw'],
        o = tt(n),
        r = tt(e)
      return (
        t || (e !== r && oe(o, 'has', e), oe(o, 'has', r)),
        e === r ? n.has(e) : n.has(e) || n.has(r)
      )
    }
    function je(e, t = !1) {
      return (
        (e = e['__v_raw']),
        !t && oe(tt(e), 'iterate', q),
        Reflect.get(e, 'size', e)
      )
    }
    function Oe(e) {
      e = tt(e)
      const t = tt(this),
        n = ke(t),
        o = n.has.call(t, e)
      return o || (t.add(e), se(t, 'add', e, e)), this
    }
    function Fe(e, t) {
      t = tt(t)
      const n = tt(this),
        { has: o, get: r } = ke(n)
      let s = o.call(n, e)
      s || ((e = tt(e)), (s = o.call(n, e)))
      const l = r.call(n, e)
      return (
        n.set(e, t),
        s ? $(t, l) && se(n, 'set', e, t, l) : se(n, 'add', e, t),
        this
      )
    }
    function Re(e) {
      const t = tt(this),
        { has: n, get: o } = ke(t)
      let r = n.call(t, e)
      r || ((e = tt(e)), (r = n.call(t, e)))
      const s = o ? o.call(t, e) : void 0,
        l = t.delete(e)
      return r && se(t, 'delete', e, void 0, s), l
    }
    function Me() {
      const e = tt(this),
        t = 0 !== e.size,
        n = void 0,
        o = e.clear()
      return t && se(e, 'clear', void 0, void 0, n), o
    }
    function Pe(e, t) {
      return function (n, o) {
        const r = this,
          s = r['__v_raw'],
          l = tt(s),
          i = t ? Se : e ? rt : ot
        return (
          !e && oe(l, 'iterate', q),
          s.forEach((e, t) => n.call(o, i(e), i(t), r))
        )
      }
    }
    function Ee(e, t, n) {
      return function (...o) {
        const r = this['__v_raw'],
          s = tt(r),
          l = y(s),
          i = 'entries' === e || (e === Symbol.iterator && l),
          c = 'keys' === e && l,
          u = r[e](...o),
          a = n ? Se : t ? rt : ot
        return (
          !t && oe(s, 'iterate', c ? G : q),
          {
            next() {
              const { value: e, done: t } = u.next()
              return t
                ? { value: e, done: t }
                : { value: i ? [a(e[0]), a(e[1])] : a(e), done: t }
            },
            [Symbol.iterator]() {
              return this
            },
          }
        )
      }
    }
    function Ae(e) {
      return function (...t) {
        return 'delete' !== e && this
      }
    }
    function $e() {
      const e = {
          get(e) {
            return xe(this, e)
          },
          get size() {
            return je(this)
          },
          has: Ce,
          add: Oe,
          set: Fe,
          delete: Re,
          clear: Me,
          forEach: Pe(!1, !1),
        },
        t = {
          get(e) {
            return xe(this, e, !1, !0)
          },
          get size() {
            return je(this)
          },
          has: Ce,
          add: Oe,
          set: Fe,
          delete: Re,
          clear: Me,
          forEach: Pe(!1, !0),
        },
        n = {
          get(e) {
            return xe(this, e, !0)
          },
          get size() {
            return je(this, !0)
          },
          has(e) {
            return Ce.call(this, e, !0)
          },
          add: Ae('add'),
          set: Ae('set'),
          delete: Ae('delete'),
          clear: Ae('clear'),
          forEach: Pe(!0, !1),
        },
        o = {
          get(e) {
            return xe(this, e, !0, !0)
          },
          get size() {
            return je(this, !0)
          },
          has(e) {
            return Ce.call(this, e, !0)
          },
          add: Ae('add'),
          set: Ae('set'),
          delete: Ae('delete'),
          clear: Ae('clear'),
          forEach: Pe(!0, !0),
        },
        r = ['keys', 'values', 'entries', Symbol.iterator]
      return (
        r.forEach((r) => {
          ;(e[r] = Ee(r, !1, !1)),
            (n[r] = Ee(r, !0, !1)),
            (t[r] = Ee(r, !1, !0)),
            (o[r] = Ee(r, !0, !0))
        }),
        [e, n, t, o]
      )
    }
    const [Ne, Ie, Le, Te] = $e()
    function Ue(e, t) {
      const n = t ? (e ? Te : Le) : e ? Ie : Ne
      return (t, o, r) =>
        '__v_isReactive' === o
          ? !e
          : '__v_isReadonly' === o
          ? e
          : '__v_raw' === o
          ? t
          : Reflect.get(_(n, o) && o in t ? n : t, o, r)
    }
    const We = { get: Ue(!1, !1) },
      ze = { get: Ue(!0, !1) }
    const Be = new WeakMap(),
      Ve = new WeakMap(),
      He = new WeakMap(),
      Ke = new WeakMap()
    function De(e) {
      switch (e) {
        case 'Object':
        case 'Array':
          return 1
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
          return 2
        default:
          return 0
      }
    }
    function Ye(e) {
      return e['__v_skip'] || !Object.isExtensible(e) ? 0 : De(O(e))
    }
    function Ze(e) {
      return Qe(e) ? e : Ge(e, !1, me, We, Be)
    }
    function qe(e) {
      return Ge(e, !0, we, ze, He)
    }
    function Ge(e, t, n, o, r) {
      if (!k(e)) return e
      if (e['__v_raw'] && (!t || !e['__v_isReactive'])) return e
      const s = r.get(e)
      if (s) return s
      const l = Ye(e)
      if (0 === l) return e
      const i = new Proxy(e, 2 === l ? o : n)
      return r.set(e, i), i
    }
    function Je(e) {
      return Qe(e) ? Je(e['__v_raw']) : !(!e || !e['__v_isReactive'])
    }
    function Qe(e) {
      return !(!e || !e['__v_isReadonly'])
    }
    function Xe(e) {
      return !(!e || !e['__v_isShallow'])
    }
    function et(e) {
      return Je(e) || Qe(e)
    }
    function tt(e) {
      const t = e && e['__v_raw']
      return t ? tt(t) : e
    }
    function nt(e) {
      return I(e, '__v_skip', !0), e
    }
    const ot = (e) => (k(e) ? Ze(e) : e),
      rt = (e) => (k(e) ? qe(e) : e)
    function st(e) {
      return !(!e || !0 !== e.__v_isRef)
    }
    function lt(e) {
      return st(e) ? e.value : e
    }
    const it = {
      get: (e, t, n) => lt(Reflect.get(e, t, n)),
      set: (e, t, n, o) => {
        const r = e[t]
        return st(r) && !st(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o)
      },
    }
    function ct(e) {
      return Je(e) ? e : new Proxy(e, it)
    }
    function ut(e, t, n, o) {
      let r
      try {
        r = o ? e(...o) : e()
      } catch (s) {
        ft(s, t, n)
      }
      return r
    }
    function at(e, t, n, o) {
      if (m(e)) {
        const r = ut(e, t, n, o)
        return (
          r &&
            x(r) &&
            r.catch((e) => {
              ft(e, t, n)
            }),
          r
        )
      }
      const r = []
      for (let s = 0; s < e.length; s++) r.push(at(e[s], t, n, o))
      return r
    }
    function ft(e, t, n, o = !0) {
      const r = t ? t.vnode : null
      if (t) {
        let o = t.parent
        const r = t.proxy,
          s = n
        while (o) {
          const t = o.ec
          if (t)
            for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return
          o = o.parent
        }
        const l = t.appContext.config.errorHandler
        if (l) return void ut(l, null, 10, [e, r, s])
      }
      pt(e, n, r, o)
    }
    function pt(e, t, n, o = !0) {
      console.error(e)
    }
    let ht = !1,
      dt = !1
    const gt = []
    let _t = 0
    const vt = []
    let yt = null,
      bt = 0
    const mt = []
    let wt = null,
      St = 0
    const kt = Promise.resolve()
    let xt = null,
      Ct = null
    function jt(e) {
      const t = xt || kt
      return e ? t.then(this ? e.bind(this) : e) : t
    }
    function Ot(e) {
      let t = _t + 1,
        n = gt.length
      while (t < n) {
        const o = (t + n) >>> 1,
          r = Nt(gt[o])
        r < e ? (t = o + 1) : (n = o)
      }
      return t
    }
    function Ft(e) {
      ;(gt.length && gt.includes(e, ht && e.allowRecurse ? _t + 1 : _t)) ||
        e === Ct ||
        (null == e.id ? gt.push(e) : gt.splice(Ot(e.id), 0, e), Rt())
    }
    function Rt() {
      ht || dt || ((dt = !0), (xt = kt.then(It)))
    }
    function Mt(e, t, n, o) {
      v(e)
        ? n.push(...e)
        : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
        Rt()
    }
    function Pt(e) {
      Mt(e, yt, vt, bt)
    }
    function Et(e) {
      Mt(e, wt, mt, St)
    }
    function At(e, t = null) {
      if (vt.length) {
        for (
          Ct = t, yt = [...new Set(vt)], vt.length = 0, bt = 0;
          bt < yt.length;
          bt++
        )
          yt[bt]()
        ;(yt = null), (bt = 0), (Ct = null), At(e, t)
      }
    }
    function $t(e) {
      if ((At(), mt.length)) {
        const e = [...new Set(mt)]
        if (((mt.length = 0), wt)) return void wt.push(...e)
        for (
          wt = e, wt.sort((e, t) => Nt(e) - Nt(t)), St = 0;
          St < wt.length;
          St++
        )
          wt[St]()
        ;(wt = null), (St = 0)
      }
    }
    const Nt = (e) => (null == e.id ? 1 / 0 : e.id)
    function It(e) {
      ;(dt = !1), (ht = !0), At(e), gt.sort((e, t) => Nt(e) - Nt(t))
      try {
        for (_t = 0; _t < gt.length; _t++) {
          const e = gt[_t]
          e && !1 !== e.active && ut(e, null, 14)
        }
      } finally {
        ;(_t = 0),
          (gt.length = 0),
          $t(e),
          (ht = !1),
          (xt = null),
          (gt.length || vt.length || mt.length) && It(e)
      }
    }
    new Set()
    new Map()
    let Lt = null,
      Tt = null
    const Ut = (e) => e.__isSuspense
    function Wt(e, t) {
      t && t.pendingBranch
        ? v(e)
          ? t.effects.push(...e)
          : t.effects.push(e)
        : Et(e)
    }
    const zt = {}
    function Bt(e, t, n) {
      return Vt(e, t, n)
    }
    function Vt(
      e,
      t,
      { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: l } = c
    ) {
      const i = Yn
      let a,
        f,
        p = !1,
        h = !1
      if (
        (st(e)
          ? ((a = () => e.value), (p = Xe(e)))
          : Je(e)
          ? ((a = () => e), (o = !0))
          : v(e)
          ? ((h = !0),
            (p = e.some((e) => Je(e) || Xe(e))),
            (a = () =>
              e.map((e) =>
                st(e) ? e.value : Je(e) ? Dt(e) : m(e) ? ut(e, i, 2) : void 0
              )))
          : (a = m(e)
              ? t
                ? () => ut(e, i, 2)
                : () => {
                    if (!i || !i.isUnmounted) return f && f(), at(e, i, 3, [g])
                  }
              : u),
        t && o)
      ) {
        const e = a
        a = () => Dt(e())
      }
      let g = (e) => {
        f = w.onStop = () => {
          ut(e, i, 4)
        }
      }
      if (Qn)
        return (g = u), t ? n && at(t, i, 3, [a(), h ? [] : void 0, g]) : a(), u
      let _ = h ? [] : zt
      const y = () => {
        if (w.active)
          if (t) {
            const e = w.run()
            ;(o || p || (h ? e.some((e, t) => $(e, _[t])) : $(e, _))) &&
              (f && f(), at(t, i, 3, [e, _ === zt ? void 0 : _, g]), (_ = e))
          } else w.run()
      }
      let b
      ;(y.allowRecurse = !!t),
        (b =
          'sync' === r
            ? y
            : 'post' === r
            ? () => jn(y, i && i.suspense)
            : () => Pt(y))
      const w = new J(a, b)
      return (
        t
          ? n
            ? y()
            : (_ = w.run())
          : 'post' === r
          ? jn(w.run.bind(w), i && i.suspense)
          : w.run(),
        () => {
          w.stop(), i && i.scope && d(i.scope.effects, w)
        }
      )
    }
    function Ht(e, t, n) {
      const o = this.proxy,
        r = w(e) ? (e.includes('.') ? Kt(o, e) : () => o[e]) : e.bind(o, o)
      let s
      m(t) ? (s = t) : ((s = t.handler), (n = t))
      const l = Yn
      qn(this)
      const i = Vt(r, s.bind(o), n)
      return l ? qn(l) : Gn(), i
    }
    function Kt(e, t) {
      const n = t.split('.')
      return () => {
        let t = e
        for (let e = 0; e < n.length && t; e++) t = t[n[e]]
        return t
      }
    }
    function Dt(e, t) {
      if (!k(e) || e['__v_skip']) return e
      if (((t = t || new Set()), t.has(e))) return e
      if ((t.add(e), st(e))) Dt(e.value, t)
      else if (v(e)) for (let n = 0; n < e.length; n++) Dt(e[n], t)
      else if (b(e) || y(e))
        e.forEach((e) => {
          Dt(e, t)
        })
      else if (F(e)) for (const n in e) Dt(e[n], t)
      return e
    }
    function Yt() {
      const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map(),
      }
      return (
        an(() => {
          e.isMounted = !0
        }),
        pn(() => {
          e.isUnmounting = !0
        }),
        e
      )
    }
    const Zt = [Function, Array]
    Boolean, Boolean
    function qt(e, t) {
      const { leavingVNodes: n } = e
      let o = n.get(t.type)
      return o || (Object.create(null), n.set(t.type, o)), o
    }
    function Gt(e, t, n, o) {
      const {
          appear: r,
          mode: s,
          persisted: l = !1,
          onBeforeEnter: i,
          onEnter: c,
          onAfterEnter: u,
          onEnterCancelled: a,
          onBeforeLeave: f,
          onLeave: p,
          onAfterLeave: h,
          onLeaveCancelled: d,
          onBeforeAppear: g,
          onAppear: _,
          onAfterAppear: y,
          onAppearCancelled: b,
        } = t,
        m = String(e.key),
        w = qt(n, e),
        S = (e, t) => {
          e && at(e, o, 9, t)
        },
        k = (e, t) => {
          const n = t[1]
          S(e, t),
            v(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n()
        },
        x = {
          mode: s,
          persisted: l,
          beforeEnter(t) {
            let o = i
            if (!n.isMounted) {
              if (!r) return
              g || i
            }
            t._leaveCb && t._leaveCb(!0)
            const s = w[m]
            s && $n(e, s) && s.el._leaveCb && s.el._leaveCb(), S(o, [t])
          },
          enter(e) {
            let t = c,
              o = u,
              s = a
            if (!n.isMounted) {
              if (!r) return
              _ || c, y || u, b || a
            }
            let l = !1
            const i = (e._enterCb = (t) => {
              l ||
                (!0,
                S(t ? s : o, [e]),
                x.delayedLeave && x.delayedLeave(),
                (e._enterCb = void 0))
            })
            t ? k(t, [e, i]) : i()
          },
          leave(t, o) {
            const r = String(e.key)
            if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return o()
            S(f, [t])
            let s = !1
            const l = (t._leaveCb = (n) => {
              s ||
                (!0,
                o(),
                S(n ? d : h, [t]),
                (t._leaveCb = void 0),
                w[r] === e && delete w[r])
            })
            ;(w[r] = e), p ? k(p, [t, l]) : l()
          },
          clone(e) {
            return Gt(e, t, n, o)
          },
        }
      return x
    }
    function Jt(e) {
      if (on(e)) return Bn(e), (e.children = null), e
    }
    function Qt(e) {
      return on(e) ? (e.children ? e.children[0] : void 0) : e
    }
    function Xt(e, t) {
      6 & e.shapeFlag && e.component
        ? Xt(e.component.subTree, t)
        : 128 & e.shapeFlag
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t)
    }
    function en(e, t = !1, n) {
      let o = [],
        r = 0
      for (let s = 0; s < e.length; s++) {
        let r = e[s]
        const l =
          null == n ? r.key : String(n) + String(null != r.key ? r.key : s)
        r.type === Fn
          ? (128 & r.patchFlag && 0, o.concat(en(r.children, t, l)))
          : (t || r.type !== Mn) && o.push(null != l ? Bn(r, { key: l }) : r)
      }
      if (r > 1) for (let s = 0; s < o.length; s++) o[s].patchFlag = -2
      return o
    }
    function tn(e) {
      return m(e) ? { setup: e, name: e.name } : e
    }
    const nn = (e) => !!e.type.__asyncLoader
    const on = (e) => e.type.__isKeepAlive
    RegExp, RegExp
    function rn(e, t) {
      return v(e)
        ? e.some((e) => rn(e, t))
        : w(e)
        ? e.split(',').includes(t)
        : !!e.test && e.test(t)
    }
    function sn(e) {
      let t = e.shapeFlag
      256 & t && 256, 512 & t && 512, (e.shapeFlag = t)
    }
    function ln(e) {
      return 128 & e.shapeFlag ? e.ssContent : e
    }
    function cn(e, t, n = Yn, o = !1) {
      if (n) {
        const r = n[e] || (n[e] = []),
          s =
            t.__weh ||
            (t.__weh = (...o) => {
              if (n.isUnmounted) return
              te(), qn(n)
              const r = at(t, n, e, o)
              return Gn(), ne(), r
            })
        return o ? r.unshift(s) : r.push(s), s
      }
    }
    const un =
        (e) =>
        (t, n = Yn) =>
          (!Qn || 'sp' === e) && cn(e, t, n),
      an = (un('bm'), un('m')),
      fn = (un('bu'), un('u')),
      pn = un('bum')
    un('um'), un('sp'), un('rtg'), un('rtc')
    const hn = Symbol()
    const dn = (e) => (e ? (Jn(e) ? Xn(e) || e.proxy : dn(e.parent)) : null),
      gn = h(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => dn(e.parent),
        $root: (e) => dn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => _n(e),
        $forceUpdate: (e) => e.f || (e.f = () => Ft(e.update)),
        $nextTick: (e) => e.n || (e.n = jt.bind(e.proxy)),
        $watch: (e) => Ht.bind(e),
      })
    function _n(e) {
      const t = e.type,
        { mixins: n, extends: o } = t,
        {
          mixins: r,
          optionsCache: s,
          config: { optionMergeStrategies: l },
        } = e.appContext,
        i = s.get(t)
      let c
      return (
        i
          ? (c = i)
          : r.length || n || o
          ? ((c = {}),
            r.length && r.forEach((e) => vn(c, e, l, !0)),
            vn(c, t, l))
          : (c = t),
        s.set(t, c),
        c
      )
    }
    function vn(e, t, n, o = !1) {
      const { mixins: r, extends: s } = t
      s && vn(e, s, n, !0), r && r.forEach((t) => vn(e, t, n, !0))
      for (const l in t)
        if (o && 'expose' === l);
        else {
          const o = yn[l] || (n && n[l])
          e[l] = o ? o(e[l], t[l]) : t[l]
        }
      return e
    }
    const yn = {
      data: bn,
      props: kn,
      emits: kn,
      methods: kn,
      computed: kn,
      beforeCreate: Sn,
      created: Sn,
      beforeMount: Sn,
      mounted: Sn,
      beforeUpdate: Sn,
      updated: Sn,
      beforeDestroy: Sn,
      beforeUnmount: Sn,
      destroyed: Sn,
      unmounted: Sn,
      activated: Sn,
      deactivated: Sn,
      errorCaptured: Sn,
      serverPrefetch: Sn,
      components: kn,
      directives: kn,
      watch: xn,
      provide: bn,
      inject: mn,
    }
    function bn(e, t) {
      return t
        ? e
          ? function () {
              return h(
                m(e) ? e.call(this, this) : e,
                m(t) ? t.call(this, this) : t
              )
            }
          : t
        : e
    }
    function mn(e, t) {
      return kn(wn(e), wn(t))
    }
    function wn(e) {
      if (v(e)) {
        const t = {}
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
        return t
      }
      return e
    }
    function Sn(e, t) {
      return e ? [...new Set([].concat(e, t))] : t
    }
    function kn(e, t) {
      return e ? h(h(Object.create(null), e), t) : t
    }
    function xn(e, t) {
      if (!e) return t
      if (!t) return e
      const n = h(Object.create(null), e)
      for (const o in t) n[o] = Sn(e[o], t[o])
      return n
    }
    function Cn() {
      return {
        app: null,
        config: {
          isNativeTag: a,
          performance: !1,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
      }
    }
    const jn = Wt
    const On = (e) => e.__isTeleport
    const Fn = Symbol(void 0),
      Rn = Symbol(void 0),
      Mn = Symbol(void 0)
    Symbol(void 0)
    let Pn = null
    let En = 1
    function An(e) {
      return !!e && !0 === e.__v_isVNode
    }
    function $n(e, t) {
      return e.type === t.type && e.key === t.key
    }
    const Nn = '__vInternal',
      In = ({ key: e }) => (null != e ? e : null),
      Ln = ({ ref: e, ref_key: t, ref_for: n }) =>
        null != e
          ? w(e) || st(e) || m(e)
            ? { i: Lt, r: e, k: t, f: !!n }
            : e
          : null
    function Tn(
      e,
      t = null,
      n = null,
      o = 0,
      r = null,
      s = e === Fn ? 0 : 1,
      l = !1,
      i = !1
    ) {
      const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && In(t),
        ref: t && Ln(t),
        scopeId: Tt,
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
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: s,
        patchFlag: o,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
      }
      return (
        i
          ? (Hn(c, n), 128 & s && e.normalize(c))
          : n && (c.shapeFlag |= w(n) ? 8 : 16),
        En > 0 &&
          !l &&
          Pn &&
          (c.patchFlag > 0 || 6 & s) &&
          32 !== c.patchFlag &&
          Pn.push(c),
        c
      )
    }
    const Un = Wn
    function Wn(e, t = null, n = null, r = 0, s = null, l = !1) {
      if (((e && e !== hn) || (e = Mn), An(e))) {
        const o = Bn(e, t, !0)
        return (
          n && Hn(o, n),
          En > 0 &&
            !l &&
            Pn &&
            (6 & o.shapeFlag ? (Pn[Pn.indexOf(e)] = o) : Pn.push(o)),
          (o.patchFlag |= -2),
          o
        )
      }
      if ((to(e) && (e = e.__vccOpts), t)) {
        t = zn(t)
        let { class: e, style: n } = t
        e && !w(e) && (t.class = i(e)),
          k(n) && (et(n) && !v(n) && (n = h({}, n)), (t.style = o(n)))
      }
      const c = w(e) ? 1 : Ut(e) ? 128 : On(e) ? 64 : k(e) ? 4 : m(e) ? 2 : 0
      return Tn(e, t, n, r, s, c, l, !0)
    }
    function zn(e) {
      return e ? (et(e) || Nn in e ? h({}, e) : e) : null
    }
    function Bn(e, t, n = !1) {
      const { props: o, ref: r, patchFlag: s, children: l } = e,
        i = t ? Kn(o || {}, t) : o,
        c = {
          __v_isVNode: !0,
          __v_skip: !0,
          type: e.type,
          props: i,
          key: i && In(i),
          ref:
            t && t.ref
              ? n && r
                ? v(r)
                  ? r.concat(Ln(t))
                  : [r, Ln(t)]
                : Ln(t)
              : r,
          scopeId: e.scopeId,
          slotScopeIds: e.slotScopeIds,
          children: l,
          target: e.target,
          targetAnchor: e.targetAnchor,
          staticCount: e.staticCount,
          shapeFlag: e.shapeFlag,
          patchFlag: t && e.type !== Fn ? (-1 === s ? 16 : 16 | s) : s,
          dynamicProps: e.dynamicProps,
          dynamicChildren: e.dynamicChildren,
          appContext: e.appContext,
          dirs: e.dirs,
          transition: e.transition,
          component: e.component,
          suspense: e.suspense,
          ssContent: e.ssContent && Bn(e.ssContent),
          ssFallback: e.ssFallback && Bn(e.ssFallback),
          el: e.el,
          anchor: e.anchor,
        }
      return c
    }
    function Vn(e = ' ', t = 0) {
      return Un(Rn, null, e, t)
    }
    function Hn(e, t) {
      let n = 0
      const { shapeFlag: o } = e
      if (null == t) t = null
      else if (v(t)) n = 16
      else if ('object' === typeof t) {
        if (65 & o) {
          const n = t.default
          return void (
            n && (n._c && (n._d = !1), Hn(e, n()), n._c && (n._d = !0))
          )
        }
        {
          n = 32
          const o = t._
          o || Nn in t
            ? 3 === o &&
              Lt &&
              (1 === Lt.slots._
                ? (t._ = 1)
                : ((t._ = 2), (e.patchFlag |= 1024)))
            : (t._ctx = Lt)
        }
      } else
        m(t)
          ? ((t = { default: t, _ctx: Lt }), (n = 32))
          : ((t = String(t)), 64 & o ? ((n = 16), (t = [Vn(t)])) : (n = 8))
      ;(e.children = t), (e.shapeFlag |= n)
    }
    function Kn(...e) {
      const t = {}
      for (let n = 0; n < e.length; n++) {
        const r = e[n]
        for (const e in r)
          if ('class' === e)
            t.class !== r.class && (t.class = i([t.class, r.class]))
          else if ('style' === e) t.style = o([t.style, r.style])
          else if (p(e)) {
            const n = t[e],
              o = r[e]
            !o ||
              n === o ||
              (v(n) && n.includes(o)) ||
              (t[e] = n ? [].concat(n, o) : o)
          } else '' !== e && (t[e] = r[e])
      }
      return t
    }
    function Dn(e, t, n, o = null) {
      at(e, t, 7, [n, o])
    }
    Cn()
    let Yn = null
    const Zn = () => Yn || Lt,
      qn = (e) => {
        ;(Yn = e), e.scope.on()
      },
      Gn = () => {
        Yn && Yn.scope.off(), (Yn = null)
      }
    function Jn(e) {
      return 4 & e.vnode.shapeFlag
    }
    let Qn = !1
    function Xn(e) {
      if (e.exposed)
        return (
          e.exposeProxy ||
          (e.exposeProxy = new Proxy(ct(nt(e.exposed)), {
            get(t, n) {
              return n in t ? t[n] : n in gn ? gn[n](e) : void 0
            },
          }))
        )
    }
    function eo(e) {
      return (m(e) && e.displayName) || e.name
    }
    function to(e) {
      return m(e) && '__vccOpts' in e
    }
    Symbol('')
    var no = tn({
      name: 'YhImage',
      setup() {
        return () => {
          Un('div', null, [Un('button', null, [Vn('12312312')])])
        }
      },
    })
    no.install = function (e) {
      e.components(no.name, no)
    }
    var oo = no
    return t
  })()
})
