!function (e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else { ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).charming = e() } }(function () { return function () { return function e(n, t, r) { function o(f, u) { if (!t[f]) { if (!n[f]) { var c = "function" == typeof require && require; if (!u && c) return c(f, !0); if (i) return i(f, !0); var a = new Error("Cannot find module '" + f + "'"); throw a.code = "MODULE_NOT_FOUND", a } var d = t[f] = { exports: {} }; n[f][0].call(d.exports, function (e) { return o(n[f][1][e] || e) }, d, d.exports, e, n, t, r) } return t[f].exports } for (var i = "function" == typeof require && require, f = 0; f < r.length; f++)o(r[f]); return o } }()({ 1: [function (e, n, t) { n.exports = function (e, { tagName: n = "span", split: t, setClassName: r = function (e) { return "char" + e } } = {}) { e.normalize(); let o = 1; function i(e) { const i = e.parentNode, f = e.nodeValue; (t ? t(f) : f.split("")).forEach(function (t) { const f = document.createElement(n), u = r(o++, t); u && (f.className = u), f.appendChild(document.createTextNode(t)), f.setAttribute("aria-hidden", "true"), i.insertBefore(f, e) }), "" !== f.trim() && i.setAttribute("aria-label", f), i.removeChild(e) } !function e(n) { if (3 === n.nodeType) return i(n); const t = Array.prototype.slice.call(n.childNodes); if (1 === t.length && 3 === t[0].nodeType) return i(t[0]); t.forEach(function (n) { e(n) }) }(e) } }, {}] }, {}, [1])(1) });
/*
     FILE ARCHIVED ON 02:41:36 Jul 13, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:49:37 Apr 22, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RedisCDXSource: 31.538
  esindex: 0.016
  LoadShardBlock: 102.146 (3)
  exclusion.robots.policy: 0.189
  PetaboxLoader3.datanode: 77.768 (4)
  CDXLines.iter: 14.657 (3)
  exclusion.robots: 0.203
  PetaboxLoader3.resolve: 119.256 (2)
  load_resource: 97.769
  captures_list: 152.21
*/