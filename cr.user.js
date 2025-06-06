// ==UserScript==
// @name         Crunchyroll 中文版
// @namespace    Crunchyroll-Chinese
// @version      1.7
// @description  將 Crunchyroll 網站介面翻譯為繁體中文，提供更友好的使用體驗。
// @author       david082321、GPT-4o
// @match        https://www.crunchyroll.com/*
// @grant        unsafeWindow
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const CONFIG = {
        versionUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/version.json',
        exactDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/exact.json',
        regexDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/regex.json',
        extraDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/extra.json'
    };

    let exactTranslationDict = {};
    let regexTranslationDict = [];
    let extraExactDict = {};
    let extraRegexDict = [];

    function loadJson(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                onload: res => {
                    try {
                        resolve(JSON.parse(res.responseText));
                    } catch (e) {
                        reject(e);
                    }
                },
                onerror: reject
            });
        });
    }

    function translateJsonValues(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => translateJsonValues(item));
        } else if (obj && typeof obj === 'object') {
            const translatedObj = {};
            for (const key in obj) {
                translatedObj[key] = translateJsonValues(obj[key]);
            }
            return translatedObj;
        } else if (typeof obj === 'string') {
            if (exactTranslationDict[obj]) {
                return exactTranslationDict[obj];
            }
            if (extraExactDict[obj]) {
                return extraExactDict[obj];
            }
            for (const { pattern, replacement } of regexTranslationDict) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(obj)) {
                    return obj.replace(regex, replacement);
                }
            }
            for (const { pattern, replacement } of extraRegexDict) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(obj)) {
                    return obj.replace(regex, replacement);
                }
            }
            return obj;
        } else {
            return obj;
        }
    }

    function updateTranslationDictionaries() {
        return loadJson(CONFIG.versionUrl).then(remoteVersion => {
            const localVersion = JSON.parse(localStorage.getItem('crunchyroll_translation_version') || '{}');

            const promises = [];

            if (remoteVersion.exact !== localVersion.exact) {
                promises.push(
                    loadJson(CONFIG.exactDictUrl).then(data => {
                        exactTranslationDict = data;
                        localStorage.setItem('crunchyroll_translation_exact', JSON.stringify(data));
                        localVersion.exact = remoteVersion.exact;
                    })
                );
            } else {
                const cached = localStorage.getItem('crunchyroll_translation_exact');
                if (cached) exactTranslationDict = JSON.parse(cached);
            }

            if (remoteVersion.regex !== localVersion.regex) {
                promises.push(
                    loadJson(CONFIG.regexDictUrl).then(data => {
                        regexTranslationDict = data;
                        localStorage.setItem('crunchyroll_translation_regex', JSON.stringify(data));
                        localVersion.regex = remoteVersion.regex;
                    })
                );
            } else {
                const cached = localStorage.getItem('crunchyroll_translation_regex');
                if (cached) regexTranslationDict = JSON.parse(cached);
            }

            if (remoteVersion.extra !== localVersion.extra) {
                promises.push(
                    loadJson(CONFIG.extraDictUrl).then(data => {
                        extraExactDict = data.exact || {};
                        extraRegexDict = data.regex || [];
                        localStorage.setItem('crunchyroll_translation_extra', JSON.stringify(data));
                        localVersion.extra = remoteVersion.extra;
                    })
                );
            } else {
                const cached = localStorage.getItem('crunchyroll_translation_extra');
                if (cached) {
                    const data = JSON.parse(cached);
                    extraExactDict = data.exact || {};
                    extraRegexDict = data.regex || [];
                }
            }

            return Promise.all(promises).then(() => {
                localStorage.setItem('crunchyroll_translation_version', JSON.stringify(localVersion));
            });
        });
    }

    const TARGET_URL_REGEX = /([?&]locale=en-US|en_US\.json)/;
    const TARGET_METHOD = 'GET';

    GM_log('Crunchyroll Interceptor script loading...');

    updateTranslationDictionaries().then(() => {
        GM_log('Dictionaries loaded and cached.');

        const originalXhrOpen = unsafeWindow.XMLHttpRequest.prototype.open;
        const originalXhrSend = unsafeWindow.XMLHttpRequest.prototype.send;

        unsafeWindow.XMLHttpRequest.prototype.open = function (method, url) {
            this._method = method;
            this._url = url;
            return originalXhrOpen.apply(this, arguments);
        };

        unsafeWindow.XMLHttpRequest.prototype.send = function (body) {
            if (this._method === TARGET_METHOD && TARGET_URL_REGEX.test(this._url)) {
                const xhr = this;
                const originalOnReadyStateChange = xhr.onreadystatechange;

                xhr.addEventListener('readystatechange', function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const contentType = xhr.getResponseHeader('Content-Type') || '';
                        if (contentType.includes('application/json')) {
                            try {
                                const data = JSON.parse(xhr.responseText);
                                const translatedData = translateJsonValues(data);
                                const newText = JSON.stringify(translatedData);

                                Object.defineProperty(xhr, 'responseText', { get: () => newText });
                                Object.defineProperty(xhr, 'response', { get: () => newText });

                                GM_log('[XHR Modified] JSON values translated.');
                            } catch (e) {
                                GM_log('XHR JSON parse error:', e);
                            }
                        }
                    }
                    if (originalOnReadyStateChange) originalOnReadyStateChange.apply(this, arguments);
                });
            }
            return originalXhrSend.apply(this, arguments);
        };

        const originalFetch = unsafeWindow.fetch;
        unsafeWindow.fetch = function (resource, options) {
            const url = resource instanceof Request ? resource.url : resource;
            const method = (options && options.method ? options.method.toUpperCase() : (resource instanceof Request ? resource.method.toUpperCase() : 'GET'));

            if (method === TARGET_METHOD && TARGET_URL_REGEX.test(url)) {
                GM_log(`[Fetch Intercepted] ${method} ${url}`);
                return originalFetch.apply(this, arguments).then(response => {
                    const contentType = response.headers.get('Content-Type') || '';
                    if (contentType.includes('application/json')) {
                        return response.clone().json().then(data => {
                            const translatedData = translateJsonValues(data);
                            const modifiedBody = JSON.stringify(translatedData);

                            GM_log('[Fetch Modified] JSON values translated.');

                            return new Response(modifiedBody, {
                                status: response.status,
                                statusText: response.statusText,
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8',
                                    'Content-Length': modifiedBody.length.toString()
                                }
                            });
                        });
                    }
                    return response;
                });
            }

            return originalFetch.apply(this, arguments);
        };

        GM_log('Crunchyroll Interceptor setup complete.');
    }).catch(err => GM_log('Failed to load dictionaries:', err));
})();
