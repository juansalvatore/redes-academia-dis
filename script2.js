/*!
 * d3.chart - v0.3.0
 * License: MIT
 * Date: 2016-01-23
 */
!(function(t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e(require('d3')))
    : 'function' == typeof define && define.amd
      ? define('d3.chart', ['d3'], e)
      : 'object' == typeof exports
        ? (exports['d3.chart'] = e(require('d3')))
        : (t['d3.chart'] = e(t.d3))
})(this, function(t) {
  return (function(t) {
    function e(n) {
      if (r[n]) return r[n].exports
      var i = (r[n] = { exports: {}, id: n, loaded: !1 })
      return t[n].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports
    }
    var r = {}
    return (e.m = t), (e.c = r), (e.p = ''), e(0)
  })([
    function(t, e, r) {
      var n
      ;(n = function(t, e, n) {
        'use strict'
        var i = r(1),
          o = r(2),
          a = r(3)
        a(/^3\./.test(i.version), 'd3.js version 3 is required'),
          r(4),
          (i.chart = function(t) {
            return 0 === arguments.length
              ? o
              : 1 === arguments.length ? o[t] : o.extend.apply(o, arguments)
          }),
          (i.selection.prototype.chart = function(t, e) {
            if (0 === arguments.length) return this._chart
            var r = o[t]
            return (
              a(r, "No chart registered with name '" + t + "'"), new r(this, e)
            )
          }),
          (i.selection.enter.prototype.chart = function() {
            return this._chart
          }),
          (i.transition.prototype.chart = i.selection.enter.prototype.chart),
          (n.exports = i.chart)
      }.call(e, r, e, t)),
        !(void 0 !== n && (t.exports = n))
    },
    function(e, r) {
      e.exports = t
    },
    function(t, e, r) {
      var n
      ;(n = function(t, e, n) {
        'use strict'
        function i(t) {
          var e, r, n, i
          if (!t) return t
          for (r = arguments.length, e = 1; r > e; e++)
            if ((n = arguments[e])) for (i in n) t[i] = n[i]
          return t
        }
        var o = r(3),
          a = Object.hasOwnProperty,
          s = function(t, e) {
            var r = this.constructor,
              n = r.__super__
            n && s.call(n, t, e),
              a.call(r.prototype, 'initialize') && this.initialize.apply(t, e)
          },
          c = function(t, e) {
            var r = this.constructor,
              n = r.__super__
            return (
              this === t &&
                a.call(this, 'transform') &&
                (e = this.transform(e)),
              a.call(r.prototype, 'transform') &&
                (e = r.prototype.transform.call(t, e)),
              n && (e = c.call(n, t, e)),
              e
            )
          },
          h = function(t, e) {
            ;(this.base = t),
              (this._layers = {}),
              (this._attached = {}),
              (this._events = {}),
              e && e.transform && (this.transform = e.transform),
              s.call(this, this, [e])
          }
        ;(h.prototype.initialize = function() {}),
          (h.prototype.unlayer = function(t) {
            var e = this.layer(t)
            return delete this._layers[t], delete e._chart, e
          }),
          (h.prototype.layer = function(t, e, r) {
            var n
            if (1 === arguments.length) return this._layers[t]
            if (2 === arguments.length) {
              if ('function' == typeof e.draw)
                return (e._chart = this), (this._layers[t] = e), this._layers[t]
              o(
                !1,
                'When reattaching a layer, the second argument must be a d3.chart layer'
              )
            }
            return (n = e.layer(r)), (this._layers[t] = n), (e._chart = this), n
          }),
          (h.prototype.attach = function(t, e) {
            return 1 === arguments.length
              ? this._attached[t]
              : ((this._attached[t] = e), e)
          }),
          (h.prototype.transform = function(t) {
            return t
          }),
          (h.prototype.draw = function(t) {
            var e, r, n
            t = c.call(this, this, t)
            for (e in this._layers) this._layers[e].draw(t)
            for (r in this._attached)
              (n = this.demux ? this.demux(r, t) : t), this._attached[r].draw(n)
          }),
          (h.prototype.on = function(t, e, r) {
            var n = this._events[t] || (this._events[t] = [])
            return (
              n.push({ callback: e, context: r || this, _chart: this }), this
            )
          }),
          (h.prototype.once = function(t, e, r) {
            var n = this,
              i = function() {
                n.off(t, i), e.apply(this, arguments)
              }
            return this.on(t, i, r)
          }),
          (h.prototype.off = function(t, e, r) {
            var n, i, o, a, s, c
            if (0 === arguments.length) {
              for (t in this._events) this._events[t].length = 0
              return this
            }
            if (1 === arguments.length)
              return (o = this._events[t]), o && (o.length = 0), this
            for (
              n = t ? [t] : Object.keys(this._events), s = 0;
              s < n.length;
              s++
            )
              for (i = n[s], o = this._events[i], c = o.length; c--; )
                (a = o[c]),
                  ((e && e === a.callback) || (r && r === a.context)) &&
                    o.splice(c, 1)
            return this
          }),
          (h.prototype.trigger = function(t) {
            var e,
              r,
              n = Array.prototype.slice.call(arguments, 1),
              i = this._events[t]
            if (void 0 !== i)
              for (e = 0; e < i.length; e++)
                (r = i[e]), r.callback.apply(r.context, n)
            return this
          }),
          (h.extend = function(t, e, r) {
            var n,
              o = this
            ;(n =
              e && a.call(e, 'constructor')
                ? e.constructor
                : function() {
                    return o.apply(this, arguments)
                  }),
              i(n, o, r)
            var s = function() {
              this.constructor = n
            }
            return (
              (s.prototype = o.prototype),
              (n.prototype = new s()),
              e && i(n.prototype, e),
              (n.__super__ = o.prototype),
              (h[t] = n),
              n
            )
          }),
          (n.exports = h)
      }.call(e, r, e, t)),
        !(void 0 !== n && (t.exports = n))
    },
    function(t, e, r) {
      var n
      ;(n = function(t, e, r) {
        'use strict'
        r.exports = function(t, e) {
          if (!t) throw new Error('[d3.chart] ' + e)
        }
      }.call(e, r, e, t)),
        !(void 0 !== n && (t.exports = n))
    },
    function(t, e, r) {
      var n
      ;(n = function(t) {
        'use strict'
        var e = r(1),
          n = r(5)
        e.selection.prototype.layer = function(t) {
          var e,
            r = new n(this)
          if (((r.dataBind = t.dataBind), (r.insert = t.insert), 'events' in t))
            for (e in t.events) r.on(e, t.events[e])
          return (
            (this.on = function() {
              return r.on.apply(r, arguments)
            }),
            (this.off = function() {
              return r.off.apply(r, arguments)
            }),
            (this.draw = function() {
              return r.draw.apply(r, arguments)
            }),
            this
          )
        }
      }.call(e, r, e, t)),
        !(void 0 !== n && (t.exports = n))
    },
    function(t, e, r) {
      var n
      ;(n = function(t, e, n) {
        'use strict'
        var i = r(1),
          o = r(3),
          a = /^(enter|update|merge|exit)(:transition)?$/,
          s = function(t) {
            o(t, 'Layers must be initialized with a base.'),
              (this._base = t),
              (this._handlers = {})
          }
        ;(s.prototype.dataBind = function() {
          o(!1, 'Layers must specify a `dataBind` method.')
        }),
          (s.prototype.insert = function() {
            o(!1, 'Layers must specify an `insert` method.')
          }),
          (s.prototype.on = function(t, e, r) {
            return (
              (r = r || {}),
              o(
                a.test(t),
                "Unrecognized lifecycle event name specified to `Layer#on`: '" +
                  t +
                  "'."
              ),
              t in this._handlers || (this._handlers[t] = []),
              this._handlers[t].push({ callback: e, chart: r.chart || null }),
              this._base
            )
          }),
          (s.prototype.off = function(t, e) {
            var r,
              n = this._handlers[t]
            if (
              (o(
                a.test(t),
                "Unrecognized lifecycle event name specified to `Layer#off`: '" +
                  t +
                  "'."
              ),
              !n)
            )
              return this._base
            if (1 === arguments.length) return (n.length = 0), this._base
            for (r = n.length - 1; r > -1; --r)
              n[r].callback === e && n.splice(r, 1)
            return this._base
          }),
          (s.prototype.draw = function(t) {
            var e, r, n, a, s, c, h, l, u
            ;(e = this.dataBind.call(this._base, t)),
              o(
                e && e.call === i.selection.prototype.call,
                'Invalid selection defined by `Layer#dataBind` method.'
              ),
              o(e.enter, 'Layer selection not properly bound.'),
              (r = e.enter()),
              (r._chart = this._base._chart),
              (n = [
                { name: 'update', selection: e },
                { name: 'enter', selection: r, method: this.insert },
                { name: 'merge', selection: e },
                { name: 'exit', selection: e, method: e.exit },
              ])
            for (var p = 0, f = n.length; f > p; ++p)
              if (
                ((h = n[p].name),
                (a = n[p].selection),
                (s = n[p].method),
                'function' == typeof s && (a = s.call(a)),
                !a.empty())
              ) {
                if (
                  (o(
                    a && a.call === i.selection.prototype.call,
                    "Invalid selection defined for '" + h + "' lifecycle event."
                  ),
                  (c = this._handlers[h]))
                )
                  for (l = 0, u = c.length; u > l; ++l)
                    (a._chart = c[l].chart || this._base._chart),
                      a.call(c[l].callback)
                if (((c = this._handlers[h + ':transition']), c && c.length))
                  for (a = a.transition(), l = 0, u = c.length; u > l; ++l)
                    (a._chart = c[l].chart || this._base._chart),
                      a.call(c[l].callback)
              }
          }),
          (n.exports = s)
      }.call(e, r, e, t)),
        !(void 0 !== n && (t.exports = n))
    },
  ])
})
//# sourceMappingURL=d3.chart.min.map
