/**
 * easytimer.js
 * Generated: 2018-03-26
 * Version: 2.2.1
 */

! function (n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Timer = t()
}(this, function () {
    "use strict";

    function n(n, t, e) {
        var o = void 0,
            i = "";
        if (n.length > t) return n;
        for (o = 0; o < t; o += 1) i += String(e);
        return (i + n).slice(-i.length)
    }

    function t() {
        this.secondTenths = 0, this.seconds = 0, this.minutes = 0, this.hours = 0, this.days = 0, this.toString = function (t, e, o) {
            t = t || ["hours", "minutes", "seconds"], e = e || ":", o = o || 2;
            var i = [],
                r = void 0;
            for (r = 0; r < t.length; r += 1) void 0 !== this[t[r]] && ("secondTenths" === t[r] ? i.push(this[t[r]]) : i.push(n(this[t[r]], o, "0")));
            return i.join(e)
        }
    }
    var e = "undefined" != typeof window ? window.CustomEvent : void 0;
    "undefined" != typeof window && "function" != typeof e && ((e = function (n, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(n, t.bubbles, t.cancelable, t.detail), e
    }).prototype = window.Event.prototype, window.CustomEvent = e);
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
            return typeof n
        } : function (n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        },
        i = 10,
        r = 60,
        s = 60,
        u = 24,
        d = 0,
        c = 1,
        f = 2,
        a = 3,
        v = 4,
        h = "secondTenths",
        l = "seconds",
        p = "minutes",
        m = "hours",
        y = "days",
        b = {
            secondTenths: 100,
            seconds: 1e3,
            minutes: 6e4,
            hours: 36e5,
            days: 864e5
        },
        w = {
            secondTenths: i,
            seconds: r,
            minutes: s,
            hours: u
        },
        g = "undefined" != typeof module && module.exports && "function" == typeof require ? require("events") : void 0;

    function E() {
        return "undefined" != typeof document
    }

    function T() {
        return g
    }

    function S(n, t) {
        return (n % t + t) % t
    }
    return function () {
        var n = new t,
            e = new t,
            j = void 0,
            C = E() ? document.createElement("span") : T() ? new g.EventEmitter : void 0,
            L = !1,
            U = !1,
            V = void 0,
            A = void 0,
            D = void 0,
            k = {},
            x = void 0,
            M = void 0,
            P = void 0,
            q = void 0,
            I = void 0,
            O = void 0,
            z = {
                detail: {
                    timer: this
                }
            };

        function R(t, o) {
            var i = e[o];
            return function (t, o) {
                e[t] = o, n[t] = t === y ? o : o >= 0 ? S(o, w[t]) : w[t] - S(o, w[t])
            }(o, X(t, b[o])), e[o] !== i
        }

        function B() {
            F(),
                function () {
                    for (var t in n) n.hasOwnProperty(t) && "number" == typeof n[t] && (n[t] = 0);
                    for (var o in e) e.hasOwnProperty(o) && "number" == typeof e[o] && (e[o] = 0)
                }()
        }

        function F() {
            clearInterval(j), j = void 0, L = !1, U = !1
        }

        function G(t) {
            var i;
            tn() ? (I = H(), M = Y(x.target)) : function (t) {
                var i;
                V = "string" == typeof (t = t || {}).precision ? t.precision : l, D = "function" == typeof t.callback ? t.callback : function () {}, q = !0 === t.countdown, A = !0 === q ? -1 : 1, "object" === o(t.startValues) && (i = t.startValues, P = W(i), n.secondTenths = P[d], n.seconds = P[c], n.minutes = P[f], n.hours = P[a], n.days = P[v], e = Z(P, e)), I = H(), K(), "object" === o(t.target) ? M = Y(t.target) : q && (t.target = {
                    seconds: 0
                }, M = Y(t.target)), k = {
                    precision: V,
                    callback: D,
                    countdown: "object" === (void 0 === t ? "undefined" : o(t)) && !0 === t.countdown,
                    target: M,
                    startValues: P
                }, x = t
            }(t), i = b[V], Q(N(Date.now())) || (j = setInterval(J, i), L = !0, U = !1)
        }

        function H() {
            return N(Date.now()) - e.secondTenths * b[h] * A
        }

        function J() {
            var n = N(Date.now());
            ! function (n) {
                n[h] && _("secondTenthsUpdated", z), n[l] && _("secondsUpdated", z), n[p] && _("minutesUpdated", z), n[m] && _("hoursUpdated", z), n[y] && _("daysUpdated", z)
            }(K()), D(z.detail.timer), Q(n) && ($(), _("targetAchieved", z))
        }

        function K() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : N(Date.now()),
                t = A > 0 ? n - I : I - n,
                e = {};
            return e[h] = R(t, h), e[l] = function (n) {
                return R(n, l)
            }(t), e[p] = function (n) {
                return R(n, p)
            }(t), e[m] = function (n) {
                return R(n, m)
            }(t), e[y] = function (n) {
                return R(n, y)
            }(t), e
        }

        function N(n) {
            return Math.floor(n / b[V]) * b[V]
        }

        function Q(n) {
            return M instanceof Array && n >= O
        }

        function W(n) {
            var t, e, h, l, p, m = void 0;
            if ("object" === (void 0 === n ? "undefined" : o(n)))
                if (n instanceof Array) {
                    if (5 !== n.length) throw new Error("Array size not valid");
                    m = n
                } else m = [n.secondTenths || 0, n.seconds || 0, n.minutes || 0, n.hours || 0, n.days || 0];
            return t = m[d], e = m[c] + X(t, i), h = m[f] + X(e, r), l = m[a] + X(h, s), p = m[v] + X(l, u), m[d] = t % i, m[c] = e % r, m[f] = h % s, m[a] = l % u, m[v] = p, m
        }

        function X(n, t) {
            var e = n / t;
            return e < 0 ? Math.ceil(e) : Math.floor(e)
        }

        function Y(n) {
            if (n) {
                var t = Z(M = W(n));
                return O = I + t.secondTenths * b[h] * A, M
            }
        }

        function Z(n, t) {
            var e = t || {};
            return e.days = n[v], e.hours = e.days * u + n[a], e.minutes = e.hours * s + n[f], e.seconds = e.minutes * r + n[c], e.secondTenths = e.seconds * i + n[[d]], e
        }

        function $() {
            B(), _("stopped", z)
        }

        function _(n, t) {
            E() ? C.dispatchEvent(new CustomEvent(n, t)) : T() && C.emit(n, t)
        }

        function nn() {
            return L
        }

        function tn() {
            return U
        }
        void 0 !== this && (this.start = function (n) {
            nn() || (G(n), _("started", z))
        }, this.pause = function () {
            F(), U = !0, _("paused", z)
        }, this.stop = $, this.reset = function () {
            B(), G(x), _("reset", z)
        }, this.isRunning = nn, this.isPaused = tn, this.getTimeValues = function () {
            return n
        }, this.getTotalTimeValues = function () {
            return e
        }, this.getConfig = function () {
            return k
        }, this.addEventListener = function (n, t) {
            E() ? C.addEventListener(n, t) : T() && C.on(n, t)
        }, this.removeEventListener = function (n, t) {
            E() ? C.removeEventListener(n, t) : T() && C.removeListener(n, t)
        })
    }
});
