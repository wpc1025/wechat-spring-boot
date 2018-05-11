(function (b) {
    b.MtaH5 = b.MtaH5 || {};
    MtaH5.hack = function () {
        var b = document.getElementsByName("MTAH5"), f = {
            conf: {autoReport: 1, senseHash: 1, senseQuery: 0, userReport: 0},
            user: {user_id: ""},
            version: "2.0.6"
        };
        if (0 == b.length)for (var r = document.getElementsByTagName("script"), p = 0; p < r.length; p++)if ("undefined" !== typeof r[p].attributes.name && "MTAH5" == r[p].attributes.name.nodeValue) {
            b = [];
            b.push(r[p]);
            break
        }
        0 < b.length && function () {
            "undefined" !== typeof b[0].attributes.sid && (f.conf.sid = b[0].attributes.sid.nodeValue);
            "undefined" !==
            typeof b[0].attributes.cid && (f.conf.cid = b[0].attributes.cid.nodeValue);
            "object" === typeof _mtac && function () {
                for (var b in _mtac)if ("ignoreParams" == b) {
                    if ("string" == typeof _mtac[b] && /\w(,?)\w+/.test(_mtac[b])) {
                        var p = _mtac[b].split(",");
                        _mtac.hasOwnProperty(b) && (f.conf[b] = p)
                    }
                } else _mtac.hasOwnProperty(b) && (f.conf[b] = _mtac[b])
            }();
            "object" === typeof _user && function () {
                for (var b in _user)f.user.hasOwnProperty(b) && (f.user[b] = _user[b])
            }()
        }();
        f.conf.user = f.user;
        f.conf.version = f.version;
        return f
    }
})(this);
(function (b, t) {
    function f(a) {
        a = window.localStorage ? localStorage.getItem(a) || sessionStorage.getItem(a) : (a = document.cookie.match(new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)"))) ? a[1] : "";
        return a
    }

    function r(a, d, c) {
        if (window.localStorage)try {
            c ? localStorage.setItem(a, d) : sessionStorage.setItem(a, d)
        } catch (B) {
        } else {
            var b = window.location.host,
                h = {"com.cn": 1, "js.cn": 1, "net.cn": 1, "gov.cn": 1, "com.hk": 1, "co.nz": 1}, g = b.split(".");
            2 < g.length && (b = (h[g.slice(-2).join(".")] ? g.slice(-3) : g.slice(-2)).join("."));
            document.cookie =
                a + "=" + d + ";path=/;domain=" + b + (c ? ";expires=" + c : "")
        }
    }

    function p(a) {
        var d = {};
        if (void 0 === a) {
            var c = window.location;
            a = c.host;
            var e = c.pathname;
            var h = c.search.substr(1);
            c = c.hash
        } else c = a.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?::\d+)?(\/[^\?\\"'\|:<>]*)?(?:\?([^'"\\<>#]*))?(?:#(\w+))?/i) || [], a = c[1], e = c[2], h = c[3], c = c[4];
        void 0 !== c && (c = c.replace(/"|'|<|>/ig, "M"));
        h && function () {
            for (var c = h.split("&"), a = 0, b = c.length; a < b; a++)if (-1 != c[a].indexOf("=")) {
                var e = c[a].indexOf("="), k = c[a].slice(0, e);
                e = c[a].slice(e + 1);
                d[k] =
                    e
            }
        }();
        h = function () {
            if ("undefined" === typeof h)return h;
            for (var a = h.split("&"), c = [], d = 0, e = a.length; d < e; d++)if (-1 != a[d].indexOf("=")) {
                var k = a[d].indexOf("="), n = a[d].slice(0, k);
                k = a[d].slice(k + 1);
                b.ignoreParams && -1 != b.ignoreParams.indexOf(n) || c.push(n + "=" + k)
            }
            return c.join("&")
        }();
        return {host: a, path: e, search: h, hash: c, param: d}
    }

    function y(a) {
        for (var d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
            var b = Math.floor(10 * Math.random()), h = d[b];
            d[b] = d[c - 1];
            d[c - 1] = h
        }
        for (c = b = 0; 5 > c; c++)b = 10 * b + d[c];
        return (a || "") + (b + "" + +new Date)
    }

    function u() {
        var a = p(), d = {
            dm: a.host,
            pvi: "",
            si: "",
            url: a.path,
            arg: encodeURIComponent(a.search || "").substr(0, 512),
            ty: 0
        };
        d.pvi = function () {
            if (b.userReport) {
                var a = f("pgv_uid");
                a && a == b.user.user_id || (d.ty = 1, r("pgv_uid", b.user.user_id, "Sun, 18 Jan 2038 00:00:00 GMT;"));
                a = b.user.user_id
            } else a = f("pgv_pvi"), a || (d.ty = 1, a = y(void 0), r("pgv_pvi", a, "Sun, 18 Jan 2038 00:00:00 GMT;"));
            return a
        }();
        d.si = function () {
            var a = f("pgv_si");
            a || (a = y("s"), r("pgv_si", a));
            return a
        }();
        d.url = function () {
            var c = a.path;
            b.senseQuery &&
            (c += a.search ? "?" + encodeURIComponent(a.search || "").substr(0, 512) : "");
            b.senseHash && (c += a.hash ? encodeURIComponent(a.hash) : "");
            return c
        }();
        return d
    }

    function x() {
        var a = p(document.referrer), b = p();
        return {
            rdm: a.host,
            rurl: a.path,
            rarg: encodeURIComponent(a.search || "").substr(0, 512),
            adt: b.param.ADTAG || b.param.adtag || b.param.CKTAG || b.param.cktag || b.param.PTAG || b.param.ptag
        }
    }

    function v() {
        try {
            var a = navigator, b = screen || {width: "", height: "", colorDepth: ""}, c = {
                scr: b.width + "x" + b.height, scl: b.colorDepth + "-bit", lg: (a.language ||
                a.userLanguage).toLowerCase(), tz: (new Date).getTimezoneOffset() / 60
            }
        } catch (e) {
            return {}
        }
        return c
    }

    function w(a) {
        arr = {};
        if (a) {
            var b = arr, c = [], e;
            for (e in a)a.hasOwnProperty(e) && c.push(encodeURIComponent(e) + "=" + encodeURIComponent(a[e]));
            a = c.join(";");
            b.ext = a
        }
        return arr
    }

    function z(a) {
        a = a || {};
        for (var d in a)a.hasOwnProperty(d) && (b[d] = a[d]);
        if (b.sid)if (!b.userReport || b.user.user_id && !parseInt(b.user.user_id, 10) !== b.user.user_id) {
            a = [];
            for (var c = 0, e = [u(), x(), {r2: b.sid}, v(), w({version: b.version}), {random: +new Date}], h = e.length; c < h; c++)for (d in e[c])e[c].hasOwnProperty(d) && a.push(d + "=" + ("undefined" == typeof e[c][d] ? "" : e[c][d]));
            var g = function (a) {
                a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + a.join("&").toLowerCase();
                var c = new Image;
                Ta[b.sid] = c;
                c.onload = c.onerror = c.onabort = function () {
                    c = c.onload = c.onerror = c.onabort = null;
                    Ta[b.sid] = !0
                };
                c.src = a
            };
            g(a);
            b.performanceMonitor && (d = function () {
                if (window.performance) {
                    var a = window.performance.timing;
                    var c =
                        {value: a.domainLookupEnd - a.domainLookupStart};
                    var d = {value: a.connectEnd - a.connectStart},
                        e = {value: a.responseStart - (a.requestStart || a.responseStart + 1)},
                        n = a.responseEnd - a.responseStart;
                    a.domContentLoadedEventStart ? 0 > n && (n = 0) : n = -1;
                    a = {
                        domainLookupTime: c,
                        connectTime: d,
                        requestTime: e,
                        resourcesLoadedTime: {value: n},
                        domParsingTime: {value: a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1},
                        domContentLoadedTime: {value: a.domContentLoadedEventStart ? a.domContentLoadedEventStart - a.fetchStart : -1}
                    }
                } else a =
                    "";
                c = a;
                d = [];
                a = [];
                e = 0;
                n = [u(), {r2: b.cid}, v(), {random: +new Date}];
                for (var h = n.length; e < h; e++)for (var q in n[e])n[e].hasOwnProperty(q) && a.push(q + "=" + ("undefined" == typeof n[e][q] ? "" : n[e][q]));
                for (q in c)c.hasOwnProperty(q) && ("domContentLoadedTime" == q ? a.push("r3=" + c[q].value) : d.push(c[q].value));
                q = w({pfm: d.join("_"), version: b.version});
                a.push("ext=" + q.ext);
                g(a)
            }, "undefined" !== typeof window.performance && "undefined" !== typeof window.performance.timing && 0 != window.performance.timing.loadEventEnd ? d() : window.attachEvent ?
                window.attachEvent("onload", d) : window.addEventListener && window.addEventListener("load", d, !1))
        } else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u9009\u62e9\u4e86\u7528\u6237\u7edf\u8ba1uv\uff0c\u8bf7\u8bbe\u7f6e\u4e1a\u52a1\u7684user_id\uff0c\u9700\u4e3aint\u7c7b\u578b"); else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6esid")
    }

    t.MtaH5 = t.MtaH5 || {};
    t.Ta = t.Ta || {};
    MtaH5.pgv = z;
    Ta.clickStat = MtaH5.clickStat = function (a, d) {
        var c = MtaH5.hack ?
            MtaH5.hack() : "", e = {};
        c.conf && function () {
            var a = c.conf, b;
            for (b in a)a.hasOwnProperty(b) && (e[b] = a[b])
        }();
        if (e.cid) {
            var h = [], g = u(), f = {r2: b.sid};
            g.dm = "taclick";
            g.url = a.toString().toLowerCase();
            f.r2 = e.cid;
            f.r5 = function (a) {
                a = "undefined" === typeof a ? {} : a;
                var b = [], c;
                for (c in a)a.hasOwnProperty(c) && b.push(c + "=" + encodeURIComponent(a[c]));
                return b.join(";")
            }(d);
            var m = 0;
            g = [g, x(), f, v(), w({version: e.version}), {random: +new Date}];
            for (f = g.length; m < f; m++)for (var l in g[m])g[m].hasOwnProperty(l) && h.push(l + "=" + ("undefined" ==
                typeof g[m][l] ? "" : g[m][l]));
            h = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + h.join("&");
            var k = new Image;
            MtaH5["click_" + e.sid] = k;
            k.onload = k.onerror = k.onabort = function () {
                k = k.onload = k.onerror = k.onabort = null;
                MtaH5[e.sid] = !0
            };
            k.src = h
        } else console.log("MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6ecid,\u8bf7\u5230\u7ba1\u7406\u53f0\u5f00\u901a\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u5e76\u66f4\u65b0\u7edf\u8ba1\u4ee3\u7801")
    };
    Ta.clickShare = MtaH5.clickShare = function (a) {
        var d = MtaH5.hack ? MtaH5.hack() : "", c = {}, e = p();
        e = e.param.CKTAG || e.param.ckatg;
        var h = "undefined" === typeof e ? [] : e.split(".");
        d.conf && function () {
            var a = d.conf, b;
            for (b in a)a.hasOwnProperty(b) && (c[b] = a[b])
        }();
        if (c.cid) {
            e = [];
            var g = u(), f = {r2: b.sid};
            g.dm = "taclick_share";
            g.url = "mtah5-share-" + a;
            f.r2 = c.cid;
            f.r5 = function (a, b) {
                var c = [];
                2 === a.length && a[0] == b && c.push(a[0] + "=" + a[1]);
                return c.join(";")
            }(h, "mtah5_share");
            a = 0;
            g = [g, x(), f, v(), w({version: c.version}), {random: +new Date}];
            for (f = g.length; a < f; a++)for (var m in g[a])g[a].hasOwnProperty(m) && e.push(m + "=" + ("undefined" == typeof g[a][m] ? "" : g[a][m]));
            m = MtaH5.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + e.join("&").toLowerCase();
            var l = new Image;
            MtaH5["click_" + c.sid] = l;
            l.onload = l.onerror = l.onabort = function () {
                l = l.onload = l.onerror = l.onabort = null;
                MtaH5[c.sid] = !0
            };
            l.src = m
        }
    };
    var A = MtaH5.hack ? MtaH5.hack() : {};
    A.conf && function () {
        var a = A.conf, d;
        for (d in a)a.hasOwnProperty(d) &&
        (b[d] = a[d])
    }();
    b.autoReport && z()
})({}, this);