// ==UserScript==
// @name         Crunchyroll 中文化
// @namespace    Crunchyroll-Chinese
// @version      2.1
// @description  將 Crunchyroll 網站介面翻譯為繁體中文，提供更友好的使用體驗。
// @author       david082321、GPT-4o
// @match        https://www.crunchyroll.com/*
// @grant        unsafeWindow
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
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
    const black_key_list = ["uuid", "_uid", "slug", "filename", "fieldtype", "article_type", "linktype", "source", "cached_url", "component", "category"];
    const black_key_paths = [
        "story.content.title"
    ];

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

    function translateJsonValues(obj, currentPath = "") {
        if (Array.isArray(obj)) {
            return obj.map((item, index) =>
            translateJsonValues(item, currentPath ? `${currentPath}[${index}]` : `[${index}]`)
            );
        } else if (obj && typeof obj === "object") {
            const translatedObj = {};
            for (const key in obj) {
                const newPath = currentPath ? `${currentPath}.${key}` : key;

                // 先判斷 key 是否在 key 名字黑名單
                if (black_key_list.includes(key)) {
                    // 不翻譯該 key 的值，直接帶過
                    translatedObj[key] = obj[key];
                    continue;
                }

                translatedObj[key] = translateJsonValues(obj[key], newPath);
            }
            return translatedObj;
        } else if (typeof obj === "string") {
            // 判斷完整路徑是否在黑名單，若是跳過翻譯
            if (black_key_paths.includes(currentPath)) {
                return obj;
            }

            // 以下是原本的翻譯邏輯
            if (exactTranslationDict[obj]) {
                return exactTranslationDict[obj];
            }
            if (extraExactDict[obj]) {
                return extraExactDict[obj];
            }
            for (const { pattern, replacement } of regexTranslationDict) {
                const regex = new RegExp(pattern, "i");
                if (regex.test(obj)) {
                    return obj.replace(regex, replacement);
                }
            }
            for (const { pattern, replacement } of extraRegexDict) {
                const regex = new RegExp(pattern, "i");
                if (regex.test(obj)) {
                    return obj.replace(regex, replacement);
                }
            }
            return obj;
        } else {
            return obj;
        }
    }

    async function updateTranslationDictionaries(loadType) {
        const translation_version = await GM.getValue('translation_version', '{}');
        if (translation_version === "{}") loadType = "update";
        // 1天更新一次
        const lastUpdated = await GM.getValue('last_updated_time', 0);
        const now = Date.now();
        const waitTimes = 1 * 24 * 60 * 60 * 1000;
        if (now - lastUpdated > waitTimes) {
            loadType = "update";
            await GM.setValue('last_updated_time', now);
        }

        if (loadType === "update") {
            const localVersion = JSON.parse(translation_version);
            const promises = [];
            const remoteVersion = await loadJson(CONFIG.versionUrl);
            promises.push(
                loadJson(CONFIG.exactDictUrl).then(data => {
                    exactTranslationDict = data;
                    GM.setValue('translation_exact', JSON.stringify(data));
                    localVersion.exact = remoteVersion.exact;
                })
            );
            promises.push(
                loadJson(CONFIG.regexDictUrl).then(data => {
                    regexTranslationDict = data;
                    GM.setValue('translation_regex', JSON.stringify(data));
                    localVersion.regex = remoteVersion.regex;
                })
            );
            promises.push(
                loadJson(CONFIG.extraDictUrl).then(data => {
                    extraExactDict = data.exact || {};
                    extraRegexDict = data.regex || [];
                    GM.setValue('translation_extra', JSON.stringify(data));
                    localVersion.extra = remoteVersion.extra;
                })
            );
            await Promise.all(promises);
            await GM.setValue('translation_version', JSON.stringify(localVersion));
        }

        const cachedExact = await GM.getValue('translation_exact');
        if (cachedExact) exactTranslationDict = JSON.parse(cachedExact);
        const cachedRegex = await GM.getValue('translation_regex');
        if (cachedRegex) regexTranslationDict = JSON.parse(cachedRegex);
        const cachedExtra = await GM.getValue('translation_extra');
        if (cachedExtra) {
            const data = JSON.parse(cachedExtra);
            extraExactDict = data.exact || {};
            extraRegexDict = data.regex || [];
        }
    }

    function waitForHeaderAndInsert() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(() => insertRefreshButton(), 2000);
        } else {
            document.addEventListener('DOMContentLoaded', waitForHeaderAndInsert);
        }
    }

    function insertRefreshButton() {
        // 找到 header 動作容器
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        // 找到搜尋按鈕的容器
        const searchButton = headerActions.querySelector('a[href="/search"]')?.parentElement;
        if (!searchButton) return;

        // 建立新的 div 作為刷新按鈕
        const refreshButton = document.createElement('div');
        refreshButton.className = 'nav-horizontal-layout__action-item--KZBne';
        refreshButton.innerHTML = `
            <div class="erc-header-tile state-icon-only" role="button" aria-label="重新整理翻譯" tabindex="0">
            <div class="erc-header-svg">
                <svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img">
                <path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6 0 1.2-.4 2.3-1 3.2l1.5 1.3C19.2 15.1 20 13.1 20 11c0-4.4-3.6-8-8-8zm-6.5.5C4.8 6.9 4 8.9 4 11c0 4.4 3.6 8 8 8v3l4-4-4-4v3c-3.3 0-6-2.7-6-6 0-1.2.4-2.3 1-3.2L5.5 7.5z"/>
                </svg>
            </div>
            </div>
        `;

        refreshButton.addEventListener('click', async () => {
            if (typeof updateTranslationDictionaries === 'function') {
                await updateTranslationDictionaries("update");
                alert('翻譯字典已重新整理');
            }
        });
        // 插入在搜尋按鈕前
        headerActions.insertBefore(refreshButton, searchButton);
    }

    const TARGET_URL_REGEX = /([?&]locale=en-US|en_US\.json)/;
    const TARGET_METHOD = 'GET';

    GM_log('Crunchyroll Interceptor script loading...');
    waitForHeaderAndInsert();

    updateTranslationDictionaries("local").then(() => {
        GM_log('Dictionaries loaded and cached.');

        const originalXhrOpen = unsafeWindow.XMLHttpRequest.prototype.open;
        const originalXhrSend = unsafeWindow.XMLHttpRequest.prototype.send;

        unsafeWindow.XMLHttpRequest.prototype.open = function (method, url) {
            this._method = method;
            this._url = url;
            return originalXhrOpen.apply(this, arguments);
        };

        unsafeWindow.XMLHttpRequest.prototype.send = function (body) {
            if (this._method === TARGET_METHOD && (TARGET_URL_REGEX.test(this._url) || this._url.includes('/v1/en-US/stories'))) {
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
