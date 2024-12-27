"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[6038], {
    24331: function(e, t, r) {
        r.d(t, {
            J: function() {
                return c
            },
            y: function() {
                return u
            }
        });
        var n = r(75202)
          , o = r(61608)
          , i = r(32411)
          , s = r(9370)
          , a = r(88869);
        let u = (0,
        o.Xp)([(0,
        o.eq)(n.XU), (0,
        o.Bu)(n.d9)])
          , c = function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                delayFirstCall: !1,
                skipRetryUntilFirstSuccess: !1
            }
              , r = !1;
            return async function n(o) {
                let c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.Dr
                  , l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3
                  , f = (0,
                a.Z)(c)
                  , d = 3 === l;
                return (d && t.delayFirstCall || !d) && await (0,
                i.Z)(f),
                e(o).then(e => (r = !0,
                e)).catch(e => {
                    if (!r && t.skipRetryUntilFirstSuccess || !u(e.status) || 0 === l)
                        throw e;
                    return n(o, f, l - 1)
                }
                )
            }
        }
    },
    12326: function(e, t, r) {
        r.d(t, {
            C0: function() {
                return h
            },
            Ig: function() {
                return E
            },
            Nn: function() {
                return A
            },
            Qn: function() {
                return O
            },
            Rn: function() {
                return C
            },
            S1: function() {
                return d
            },
            SB: function() {
                return _
            },
            TD: function() {
                return b
            },
            ee: function() {
                return l
            },
            gE: function() {
                return g
            },
            hb: function() {
                return T
            },
            jp: function() {
                return c
            },
            lG: function() {
                return R
            },
            pV: function() {
                return P
            },
            qG: function() {
                return y
            },
            sE: function() {
                return k
            },
            sO: function() {
                return p
            },
            tP: function() {
                return m
            },
            uI: function() {
                return S
            },
            zt: function() {
                return f
            }
        });
        var n = r(37786)
          , o = r(37935)
          , i = r(55931)
          , s = r(24781)
          , a = r(10353)
          , u = r(61972);
        let c = (0,
        o.PH)("APP_LAUNCHED")
          , l = (0,
        o.PH)("APP_MOUNTED")
          , f = (0,
        o.PH)("APP_MOUNT_TYPE_SETTLED")
          , d = (0,
        o.PH)("APP_LOADED")
          , h = (0,
        o.PH)("LIMITED_APP_LOADED")
          , p = (0,
        o.PH)("APP_LOAD_FAILED")
          , E = (0,
        o.PH)("TRIGGER_APP_RETRY")
          , g = (0,
        o.PH)("SET_APP_RETRY_BACKOFF")
          , _ = (0,
        o.PH)("RESET_APP_RETRY_BACKOFF")
          , T = (0,
        o.PH)("LOAD_APP_RETRY_BACKOFF_FROM_STORAGE")
          , P = (0,
        o.PH)("API_CONFIGURED")
          , R = (0,
        o.PH)("LIMITED_API_CONFIGURED")
          , m = (0,
        o.PH)("CRITICAL_RESOURCES_LOADED")
          , O = (0,
        o.PH)("NETWORK_WENT_OFFLINE")
          , A = (0,
        o.PH)("NETWORK_WENT_ONLINE")
          , b = (0,
        o.PH)("ANALYTICS_LIBRARY_READY")
          , y = (0,
        o.PH)("BRAZE_LIBRARY_READY")
          , C = (0,
        o.PH)("CLEAR_CURRENT_USER_DATA")
          , S = (0,
        o.PH)("PANEL_SELECTED");
        function k() {
            return (e, t) => {
                let r = (0,
                i.i)(u.S) !== u.M;
                return n.AuthorizeInterceptor.onTokenExpire( () => e((0,
                s.g$)(r))),
                n.AuthorizeInterceptor.authorize().then( () => e((0,
                a.yj)(t()) ? R() : P())).catch(t => e(p(t)))
            }
        }
    },
    39566: function(e, t, r) {
        var n = r(75483)
          , o = r(37935);
        let i = {
            link: r(52338).uz
        }
          , s = (0,
        o.$j)(i)(n.ql);
        t.Z = s
    },
    24194: function(e, t, r) {
        r.d(t, {
            D: function() {
                return n
            }
        });
        let n = (0,
        r(37935).PH)("HEADER_LOGO_CLICKED")
    },
    7040: function(e, t, r) {
        var n = r(57437)
          , o = r(2265)
          , i = r(40718)
          , s = r.n(i)
          , a = r(53444)
          , u = r(70162)
          , c = r(84772)
          , l = r.n(c)
          , f = r(33518)
          , d = r(61608)
          , h = r(53499);
        class p extends o.Component {
            renderShortLogo() {
                return (0,
                n.jsx)(a.Z, {
                    className: "logo-icon"
                })
            }
            renderScalableLogo() {
                return (0,
                n.jsxs)(o.Fragment, {
                    children: [(0,
                    n.jsx)(u.Z, {
                        className: "logo-icon hidden-mobile",
                        isReadable: !0
                    }), (0,
                    n.jsx)(a.Z, {
                        className: "logo-icon hidden-desktop"
                    })]
                })
            }
            renderLongLogo() {
                return (0,
                n.jsx)(u.Z, {
                    isReadable: !0,
                    className: "logo-icon"
                })
            }
            renderLogo() {
                let {type: e} = this.props;
                switch (e) {
                case "short":
                    return this.renderShortLogo();
                case "scalable":
                    return this.renderScalableLogo();
                default:
                    return this.renderLongLogo()
                }
            }
            render() {
                let {type: e, headerLogoClicked: t} = this.props
                  , r = l()("erc-logo", {
                    "state-short": "short" === e,
                    "state-scalable": "scalable" === e,
                    "state-long": "long" === e
                });
                return (0,
                n.jsx)(f.rU, {
                    to: h.qh,
                    className: r,
                    onClick: t,
                    children: this.renderLogo()
                })
            }
        }
        p.propTypes = {
            headerLogoClicked: s().func.isRequired,
            type: s().oneOf(["short", "scalable", "long"])
        },
        p.defaultProps = {
            headerLogoClicked: d.ZT,
            type: "long"
        },
        t.Z = p
    },
    61097: function(e, t, r) {
        var n = r(57437)
          , o = r(70162)
          , i = r(40718)
          , s = r.n(i)
          , a = r(43846);
        let u = e => {
            let {isLogoActionable: t=!1} = e;
            return (0,
            n.jsx)("div", {
                className: "erc-sticky-header-landing",
                children: (0,
                n.jsx)("div", {
                    className: "header-content",
                    children: t ? (0,
                    n.jsx)(a.Z, {}) : (0,
                    n.jsx)(o.Z, {
                        className: "static-logo-icon",
                        isReadable: !0
                    })
                })
            })
        }
        ;
        u.propTypes = {
            isLogoActionable: s().bool
        },
        t.Z = u
    },
    43846: function(e, t, r) {
        var n = r(7040)
          , o = r(37935)
          , i = r(24194);
        let s = (0,
        o.$j)(null, {
            headerLogoClicked: i.D
        })(n.Z);
        t.Z = s
    },
    21776: function(e, t, r) {
        r.d(t, {
            A6: function() {
                return s
            },
            IV: function() {
                return n
            },
            gq: function() {
                return o
            },
            kc: function() {
                return i
            }
        });
        let n = "auth.obtain_access_token.force_contact_customer_support"
          , o = "auth.obtain_access_token.force_password_reset"
          , i = "auth.obtain_access_token.missing_required_field"
          , s = "invalid_grant"
    },
    24781: function(e, t, r) {
        r.d(t, {
            zC: function() {
                return f
            },
            Bd: function() {
                return d
            },
            fy: function() {
                return h
            },
            Sh: function() {
                return p
            },
            Tf: function() {
                return T
            },
            _1: function() {
                return R
            },
            JD: function() {
                return m
            },
            H1: function() {
                return P
            },
            ce: function() {
                return _
            },
            g$: function() {
                return C
            },
            vH: function() {
                return A
            },
            Up: function() {
                return y
            },
            pu: function() {
                return b
            },
            c5: function() {
                return E
            },
            fL: function() {
                return O
            },
            zc: function() {
                return g
            }
        });
        var n = r(37935)
          , o = r(10353)
          , i = r(21776)
          , s = r(61608);
        let a = (0,
        s.qC)(s.Mg, (0,
        s.hX)((0,
        s.sv)([(0,
        s.OH)("field", "etp_rt"), (0,
        s.OH)("code", i.kc)])), (0,
        s.pM)([], ["data", "context"]))
          , u = (0,
        s.uF)(["data", "error"], i.A6)
          , c = (0,
        s.Xp)([a, u]);
        var l = r(24331);
        let f = (0,
        n.PH)("FETCH_ETP_ACCOUNT_ERROR")
          , d = (0,
        n.PH)("FETCH_ETP_ACCOUNT_START")
          , h = (0,
        n.PH)("FETCH_ETP_ACCOUNT_SUCCESS")
          , p = (0,
        n.PH)("FETCH_LIMITED_ETP_ACCOUNT_SUCCESS")
          , E = (0,
        n.PH)("SET_PREV_SESSION_IS_USER_PREMIUM")
          , g = (0,
        n.PH)("UNVERIFIED_EMAIL_BANNER_REQUIRED")
          , _ = (0,
        n.PH)("JWT_TOKEN_RETRIEVED")
          , T = (0,
        n.PH)("JWT_TOKEN_ERROR")
          , P = (0,
        n.PH)("JWT_TOKEN_RESET")
          , R = (0,
        n.PH)("JWT_TOKEN_PROCESSED")
          , m = (0,
        n.PH)("JWT_TOKEN_PROCESSED_HANDLED")
          , O = (0,
        n.PH)("TOKEN_LOST_PRIVILEGES")
          , A = (0,
        n.PH)("REQUEST_AUTH_OTP")
          , b = (0,
        n.PH)("REQUEST_AUTH_OTP_SUCCESS")
          , y = (0,
        n.PH)("REQUEST_AUTH_OTP_ERROR");
        function C(e) {
            return (t, r) => t( (t, r, n) => {
                let {API: i} = n
                  , s = (0,
                l.J)( () => i.createAnonymousToken(), {
                    skipRetryUntilFirstSuccess: e
                })
                  , a = (0,
                l.J)( () => i.createAuthenticatedToken({}), {
                    skipRetryUntilFirstSuccess: e
                });
                return (0,
                o.$8)(r()) ? a() : a().catch(e => {
                    if (c(e))
                        return s();
                    throw e
                }
                )
            }
            ).then(e => (t(_(e)),
            {
                token: e.accessToken,
                expiresIn: e.expiresIn,
                isLimited: (0,
                o.yj)(r())
            })).catch(e => {
                throw t(T(e)),
                e
            }
            )
        }
    },
    9370: function(e, t, r) {
        r.d(t, {
            Dr: function() {
                return n
            },
            ll: function() {
                return i
            },
            rZ: function() {
                return o
            }
        });
        let n = 500
          , o = 32e3
          , i = 3
    },
    88869: function(e, t, r) {
        r.d(t, {
            Z: function() {
                return i
            }
        });
        var n = r(9370);
        let o = (e, t) => Math.random() * (t - e) + e;
        var i = function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n.Dr;
            return Math.min(o(t, Math.max(e, t) * n.ll), n.rZ)
        }
    },
    32411: function(e, t) {
        t.Z = function(e, t) {
            return new Promise(r => setTimeout( () => {
                r(t)
            }
            , e))
        }
    },
    37786: function(e, t, r) {
        var n = r(52857)
          , o = r(27064)
          , i = r(44077);
        function s(e) {
            return e && "object" == typeof e && "default"in e ? e : {
                default: e
            }
        }
        var a = s(n)
          , u = s(o)
          , c = s(i);
        let l = (e, t) => t
          , f = (e, t) => a.default(e, t, {
            arrayMerge: l
        });
        f.all = e => a.default.all(e, {
            arrayMerge: l
        });
        class d {
            constructor(e) {
                void 0 === e && (e = {}),
                this.config = e
            }
            updateConfig(e) {
                this.config = f(this.config, e)
            }
            getConfig() {
                return this.config
            }
            getOption(e) {
                return this.config[e]
            }
        }
        let h = new d({
            env: "dev",
            region: null,
            baseURL: null,
            oAuth: {
                client: null,
                user: null
            },
            defaultParams: {}
        });
        function p(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter(function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                })),
                r.push.apply(r, n)
            }
            return r
        }
        function E(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? p(Object(r), !0).forEach(function(t) {
                    !function(e, t, r) {
                        var n;
                        (t = "symbol" == typeof (n = function(e) {
                            if ("object" != typeof e || !e)
                                return e;
                            var t = e[Symbol.toPrimitive];
                            if (void 0 !== t) {
                                var r = t.call(e, "string");
                                if ("object" != typeof r)
                                    return r;
                                throw TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(t)) ? n : n + "")in e ? Object.defineProperty(e, t, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = r
                    }(e, t, r[t])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p(Object(r)).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                })
            }
            return e
        }
        let g = e => null == e
          , _ = e => {
            try {
                if ("string" == typeof e)
                    return JSON.parse(e)
            } catch (e) {}
            return e
        }
        ;
        class T {
            constructor(e) {
                let {token: t, expiresIn: r, isLimited: n} = e;
                this.token = t,
                this.expiresAt = Date.now() + 1e3 * (r - 10),
                this.isLimited = n
            }
            isExpired() {
                return Date.now() > this.expiresAt
            }
            getToken() {
                return this.token
            }
        }
        var P = new class {
            constructor() {
                var e;
                let t;
                this.interceptor = this.intercept.bind(this),
                this.getToken = this.getToken.bind(this),
                this.refreshTokenIfNeeded = (e = this.refreshTokenIfNeeded.bind(this),
                function() {
                    try {
                        return t || (t = e(...[].slice.call(arguments)),
                        t.finally( () => {
                            t = null
                        }
                        )),
                        Promise.resolve(t)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
                ),
                this.getNewToken = () => Promise.reject(Error("You should set onTokenExpire callback before making any API call"))
            }
            authorize() {
                return this.getNewToken().then(e => {
                    this.accessToken = new T(e)
                }
                )
            }
            onTokenExpire(e) {
                this.getNewToken = e
            }
            refreshTokenIfNeeded() {
                return !this.accessToken || this.accessToken.isExpired() ? this.authorize() : Promise.resolve()
            }
            intercept(e) {
                return this.refreshTokenIfNeeded().then( () => {
                    let t = this.accessToken.getToken();
                    if (!e.bypassLimit && this.accessToken.isLimited)
                        throw Error("Token is limited");
                    return E({}, e, {
                        headers: E({}, e.headers, {
                            Authorization: `Bearer ${t}`
                        })
                    })
                }
                )
            }
            getInterceptor() {
                return this.interceptor
            }
            getToken() {
                return this.refreshTokenIfNeeded().then( () => this.accessToken.getToken())
            }
        }
        ;
        let R = e => e.type && e[`${e.type}_metadata`] ? Object.assign({}, e, e[`${e.type}_metadata`]) : e
          , m = r(62379);
        t.APIClient = class {
            constructor(e) {
                void 0 === e && (e = {}),
                this.config = new d,
                this.transport = u.default.create(),
                this.createApiMethods(e)
            }
            updateConfig(e) {
                this.config.updateConfig(e)
            }
            getConfig() {
                return f(h.getConfig(), this.config.getConfig())
            }
            createApiMethods(e) {
                Object.keys(e).forEach(t => {
                    this[t] = this.createApiMethod(e[t])
                }
                )
            }
            clearObject(e) {
                return "object" != typeof e || null === e ? e : Object.keys(e).filter(t => !g(e[t])).reduce( (t, r) => (t[r] = e[r],
                t), {})
            }
            excludeTemplateParams(e, t) {
                let r = e.match(/{([^\\{}]+)}/g)
                  , n = Object.keys(t);
                if (n.length < 1 || g(r))
                    return t;
                let o = /[{}+#./;?&]/g
                  , i = r.map(e => e.replace(o, "")).reduce( (e, t) => e.concat(t.split(",")), []);
                return Object.assign({}, ...n.filter(e => !(-1 !== i.indexOf(e))).map(e => ({
                    [e]: t[e]
                })))
            }
            getParametersSendType(e) {
                return Object.prototype.hasOwnProperty.call(e, "sendType") ? e.sendType : -1 !== ["GET", "HEAD"].indexOf(e.method.toUpperCase()) ? "params" : "data"
            }
            createApiMethod(e) {
                var t = this;
                return function(r, n) {
                    void 0 === r && (r = {}),
                    void 0 === n && (n = {});
                    let o = t.excludeTemplateParams(e.path, r)
                      , i = t.buildUrl(e.path, E({}, t.getConfig().defaultParams, {}, r))
                      , s = {
                        method: e.method,
                        adapter: e.adapter,
                        url: i,
                        transformResponse: [_].concat(e.transformResponse || []),
                        timeout: e.timeout,
                        validateStatus: e.validateStatus || t.defaultValidateStatus
                    };

const storedData = localStorage.getItem('translate_data');
let translationDict = {};

if (storedData) {
    translationDict = JSON.parse(storedData);
}

                    return e.onSuccess = e.onSuccess || [],
                    s[t.getParametersSendType(e)] = t.clearObject(o),
                    t.request(f.all([s, e.options || {}, n])).then(
                        //t => Promise.all(e.onSuccess.map(e => e(t))).then( () => t))
t => {
    // 1. 對回應的內容進行翻譯處理
    const translateResponse = (response, dict) => {
        let responseStr = JSON.stringify(response); // 將回應轉為字串
        if (responseStr.includes('This young girl')) {
            console.log("this!!!!!!!!!!!!");
        }
        Object.keys(dict).forEach(key => {
            const value = dict[key];
            const regex = new RegExp(key, 'g'); // 全局替換
            responseStr = responseStr.replace(regex, value);
        });
        return JSON.parse(responseStr); // 轉回物件
    };

    // 2. 執行所有成功回調，並對回應進行翻譯
    return Promise.all(e.onSuccess.map(e => e(t)))
        .then(() => {
            t.data = translateResponse(t.data, translationDict); // 替換回應中的內容
            return t; // 返回處理後的回應
        });
})
                }
            }
            isFullUrl(e) {
                return /^https?:\/\//.test(e)
            }
            request(e) {
                let t = this.getConfig()
                  , r = E({
                    responseType: "json"
                }, e);
                console.log("-------------------");
                console.log(t.baseURL + r.url);
                
                return this.isFullUrl(r.url) || (function(e, t) {
                    if (!e)
                        throw Error(function(e) {
                            let t = 0;
                            return e.replace(/%s/g, () => [].slice.call(arguments, 1)[t++])
                        }(t, ...[].slice.call(arguments, 2)))
                }(t.baseURL, "You should configure API baseURL before making relative api calls"),
                r.baseURL = t.baseURL),
                r.headers = Object.assign(e.headers || {}, this.getRegionHeaders(), this.getAuthHeaders(r)),
                this.transport.request(r).then(this.createResponse).catch(e => {
                    throw this.createError(e)
                }
                )
            }
            defaultValidateStatus(e) {
                return e >= 200 && e < 300
            }
            createResponse(e) {
                return {
                    data: e.data,
                    headers: e.headers,
                    status: e.status
                }
            }
            createError(e) {
                let t = Error(e.message)
                  , r = e.response || e
                  , {config: n={}} = r;
                return t.data = r.data,
                t.headers = r.headers,
                t.status = r.status,
                t.url = n.baseURL + n.url,
                t.method = n.method,
                t.params = n.params,
                t.body = n.data,
                t
            }
            buildUrl(e, t) {
                return void 0 === t && (t = {}),
                c.default.parse(e).expand(t)
            }
            getRegionHeaders() {
                let {region: e} = this.getConfig()
                  , t = {};
                return e && (t["cloudfront-viewer-country"] = e),
                t
            }
            getAuthHeaders() {
                return {}
            }
            addRequestInterceptor(e, t) {
                void 0 === t && (t = null),
                this.transport.interceptors.request.use(e, t)
            }
            addResponseInterceptor(e, t) {
                void 0 === t && (t = null),
                this.transport.interceptors.response.use(e, t)
            }
        }
        ,
        t.AuthorizeInterceptor = P,
        t.createCacheHttpAdapter = e => {
            let {keyFn: t, expireFn: r} = e
              , n = {};
            return e => {
                let o = t(e)
                  , {value: i, expires: s} = n[o] || {};
                return i && s > Date.now() ? Promise.resolve(i) : m(e).then(e => (n[o] = {
                    value: e,
                    expires: r(e)
                },
                e))
            }
        }
        ,
        t.defaultConfig = h,
        t.mergeItemsMetadata = e => (e.items && (e.items = e.items.map(R)),
        e),
        t.mergeMetadata = R,
        t.transformJson = _
    }
}]);
