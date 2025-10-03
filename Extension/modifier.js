// modifier.js (事件監聽者)

(function() {
    'use strict';
    
    // --- 核心翻譯邏輯，等待字典被傳入後才會執行 ---
    function initializeTranslator(dictionaries) {
        console.log('CR-Translate: [INIT] Dictionaries received. Initializing translators...');
        
        const uiTextDict = dictionaries.dict_exact || {};
        const regexRules = dictionaries.dict_regex || [];
        const langTextNameDict = {
            "Japanese": "日文",
            "العربية": "阿拉伯文",
            "Català": "加泰羅尼亞文",
            "Deutsch": "德文",
            "English": "英文",
            "Español (América Latina)": "西班牙文（拉丁美洲）",
            "Español (España)": "西班牙文（西班牙）",
            "Français": "法文",
            "हिंदी": "印地文",
            "Bahasa Indonesia": "印尼文",
            "Italiano": "義大利文",
            "Bahasa Melayu": "馬來文",
            "Polski": "波蘭文",
            "Português (Brasil)": "葡萄牙文（巴西）",
            "Português (Portugal)": "葡萄牙文（葡萄牙）",
            "Русский": "俄文",
            "தமிழ்": "坦米爾文",
            "తెలుగు": "泰盧固文",
            "ไทย": "泰文",
            "Türkçe": "土耳其文",
            "Tiếng Việt": "越南文",
            "中文 (简体)": "簡體中文",
            "中文 (繁体)": "繁體中文"
        };
        const langVoiceNameDict = {
            "Japanese": "日語",
            "العربية": "阿拉伯語",
            "Català": "加泰羅尼亞語",
            "Deutsch": "德語",
            "English (India)": "英語（印度）",
            "English": "英語",
            "Español (América Latina)": "西班牙語（拉丁美洲）",
            "Español (España)": "西班牙語（西班牙）",
            "Français": "法語",
            "हिंदी": "印地語",
            "Bahasa Indonesia": "印尼語",
            "Italiano": "義大利語",
            "한국어": "韓語",
            "Bahasa Melayu": "馬來語",
            "Polski": "波蘭語",
            "Português (Brasil)": "葡萄牙語（巴西）",
            "Português (Portugal)": "葡萄牙語（葡萄牙）",
            "Русский": "俄語",
            "தமிழ்": "坦米爾語",
            "తెలుగు": "泰盧固語",
            "ไทย": "泰語",
            "Türkçe": "土耳其語",
            "Tiếng Việt": "越南語",
            "中文 (普通话)": "中文（普通話）",
            "中文 (粵語)": "中文（粵語）",
            "中文 (國語)": "中文（國語）"
        };

        // ... 這裡的代碼和您上一版 modifier.js 的翻譯引擎部分完全一樣 ...
        const BLACKLIST_KEYS = new Set(["uuid", "_uid", "slug", "filename", "fieldtype", "article_type", "linktype", "source", "cached_url", "component", "category", "id", "url"]);
        const BLACKLIST_PATHS = new Set(["story.content.title","svg.cross","svg.crunchyroll_logo","svg.dropdown","svg.facebook","svg.instagram","svg.loader","svg.odnoklassniki","svg.premium_filled","svg.tiktok","svg.vkontakte","svg.x","svg.youtube",
        ]);

        const compiledRegexRules = (regexRules || []).map(({ pattern, replacement }) => {
            try { return { regex: new RegExp(pattern, "i"), replacement }; } catch (e) { return null; }
        }).filter(Boolean);

        function translateString(text) {
            if (uiTextDict[text]) return uiTextDict[text];
            for (const rule of compiledRegexRules) {
                if (rule.regex.test(text)) return text.replace(rule.regex, rule.replacement);
            }
            return text;
        }

        // 添加 React 相關的保護邏輯
        const REACT_PROTECTED_KEYS = new Set([
            '_owner',
            '_store',
            '_self',
            '_source',
            '__proto__',
            'key'
        ]);

        function translateRecursively(obj, currentPath = '') {
            // 檢查是否為 React 元素
            if (obj && obj.$$typeof && (typeof obj.$$typeof === 'symbol' || obj.$$typeof.toString().includes('Symbol(react.element)'))) {
                console.log(`[CR-Translate Debug] Skipping React element at ${currentPath}`);
                return obj;
            }
        
            if (!obj || typeof obj !== 'object') {
                if (typeof obj === 'string' && !BLACKLIST_PATHS.has(currentPath)) {
                    return translateString(obj);
                }
                return obj;
            }
        
            // 檢查是否為 React 內部屬性
            if (REACT_PROTECTED_KEYS.has(currentPath.split('.').pop())) {
                console.log(`[CR-Translate Debug] Skipping React protected key at ${currentPath}`);
                return obj;
            }
        
            if (Array.isArray(obj)) {
                return obj.map((item, index) => translateRecursively(item, `${currentPath}[${index}]`));
            }
        
            const newObj = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    // 跳過 React 內部屬性
                    if (REACT_PROTECTED_KEYS.has(key)) {
                        newObj[key] = obj[key];
                        continue;
                    }
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    newObj[key] = translateRecursively(obj[key], newPath);
                }
            }
            return newObj;
        }

        // --- JSON.parse 攔截器 ---
        const originalParse = JSON.parse;
        let parseCallCount = 0;

        JSON.parse = function(text, reviver) {
            parseCallCount++;
            
            // 添加除錯日誌
            console.log(`[CR-Translate Debug] Parsing JSON at ${window.location.href}`);
            console.log(`[CR-Translate Debug] JSON length: ${text.length}`);
            
            let data = originalParse(text, reviver);
            // if (text.length <= 1) {
            //     return data;
            // }
            
            // 添加數據結構除錯
            if (data && typeof data === 'object') {
                console.log('[CR-Translate Debug] Top level keys:', Object.keys(data));
            }
            
            try {
                if (data['en-US'] === 'English') {
                    console.log('[CR-Translate Debug] Processing language list');
                    if (data['zh-CN'] === '中文 (简体)') {
                        for (const key in data) {
                            if (langTextNameDict[data[key]]) {
                                data[key] = langTextNameDict[data[key]];
                            }
                        }
                    } else {
                        for (const key in data) {
                            if (langVoiceNameDict[data[key]]) {
                                data[key] = langVoiceNameDict[data[key]];
                            }
                        }
                    }
                }
                // if (data?.props || data?.recommendations || data?.data) {
                    // console.log('%c[HIT] Rule 1: Main UI React Element detected. Starting deep translation...', 'color: #4CAF50; font-weight: bold;');
                    data = translateRecursively(data);
                    // console.log('CR-Translate: Deep translation completed.');
                // }
            } catch (e) {
                console.error('CR-Translate: An error occurred during translation.', e);
            }
            return data;
        };
        console.log('CR-Translate: Universal JSON.parse interceptor is now armed and ready.');

        // ====================================================================
        // B. 新增的 DOM 節點翻譯器
        // ====================================================================
        
        function translateNode(node) {
            if (node.nodeType !== Node.ELEMENT_NODE || node.closest('[data-cr-translated]')) {
                return;
            }
            // ... (IGNORE_TAGS 定义保持不变) ...
            const IGNORE_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE']);
            if (IGNORE_TAGS.has(node.tagName)) {
                node.setAttribute('data-cr-translated', 'ignored');
                return;
            }

            // --- 策略 A: 智能模板塊翻譯 ---
            // 這個策略現在可以處理包含子元素（如<a>）的複雜句子
            
            // 1. 構建模板和子元素地圖
            let templateKey = '';
            const childrenMap = [];
            for (const childNode of node.childNodes) {
                if (childNode.nodeType === Node.TEXT_NODE) {
                    templateKey += childNode.nodeValue;
                } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                    // 為子元素創建一個佔位符，並將元素本身存起來
                    const placeholder = `{{CHILD_${childrenMap.length}}}`;
                    templateKey += placeholder;
                    childrenMap.push(childNode);
                }
            }
            
            // 2. 規範化模板鍵並在字典中查找
            const normalizedKey = templateKey.trim().replace(/\s+/g, ' ');
            const translatedTemplate = normalizedUiTextDict[normalizedKey];

            if (translatedTemplate) {
                console.log(`[CR-Translate Template] Translating: "${normalizedKey}" -> "${translatedTemplate}"`);

                // 3. 如果找到翻譯，就用它來重建節點內容
                // 這一步會清除所有舊的子節點，包括多餘的空格文本節點
                while (node.firstChild) {
                    node.removeChild(node.lastChild);
                }
                
                // 4. 解析翻譯模板並插入新內容
                // 使用正則表達式來分割字符串，同時保留佔位符
                const parts = translatedTemplate.split(/(\{\{CHILD_\d+\}\})/g);
                
                for (const part of parts) {
                    if (!part) continue;

                    const match = part.match(/\{\{CHILD_(\d+)\}\}/);
                    if (match) {
                        // 如果是佔位符，從地圖中取出對應的子元素並插入
                        const childIndex = parseInt(match[1], 10);
                        if (childrenMap[childIndex]) {
                            // **重要**：在插入前，先對子元素本身進行遞歸翻譯
                            translateNode(childrenMap[childIndex]);
                            node.appendChild(childrenMap[childIndex]);
                        }
                    } else {
                        // 如果是普通文本，創建文本節點並插入
                        node.appendChild(document.createTextNode(part));
                    }
                }
                
                node.setAttribute('data-cr-translated', 'template');
                return; // 模板翻譯成功，任務完成
            }

            // --- 策略 B: 如果模板塊翻譯失敗，則遞歸處理子節點 ---
            for (const child of Array.from(node.childNodes)) {
                 if (child.nodeType === Node.ELEMENT_NODE) {
                    translateNode(child);
                }
                // 注意：這裡不再單獨處理TEXT_NODE，因為如果它可被翻譯，
                // 通常意味著它是一個更大句子的一部分，應該由模板塊翻譯處理。
                // 只有最簡單的、父元素不構成句子的文本節點才需要單獨翻譯，
                // 這種情況很少見，且可以通過完善字典中的模板鍵來解決。
            }
        }

        // --- MutationObserver 邏輯 ---
        const mutationCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        translateNode(node);
                    });
                }
            }
        };

        const observer = new MutationObserver(mutationCallback);
        const observerConfig = { childList: true, subtree: true };

        // --- 啟動 ---
        const startTranslation = () => {
            console.log('CR-Translate: Performing initial full-page DOM translation...');
            translateNode(document.body);
            observer.observe(document.body, observerConfig);
            console.log('CR-Translate: MutationObserver is now watching for DOM changes.');
        };

        if (document.body) {
            startTranslation();
        } else {
            window.addEventListener('DOMContentLoaded', startTranslation, { once: true });
        }
    }

    // --- 啟動邏輯 ---
    // 1. 監聽從 content script 發來的字典事件
    document.addEventListener('CR_Translate_Dictionaries', (event) => {
        // 2. 一旦收到字典，就執行我們的初始化函數
        initializeTranslator(event.detail);
    }, { once: true }); // { once: true } 確保這個監聽器只觸發一次

    console.log('CR-Translate: Modifier script is waiting for dictionaries...');

})();

/*
    const translationMap = {
        // 我們用一個非常獨特的 key 來識別目標 JSON
        // "app.default_page_title" 是一個很好的標記
        "app.default_page_title": "Crunchyroll: 觀看熱門動畫、玩遊戲與線上購物",
        "browse.popular.collection.title": "最熱門動畫",
        "browse.new.collection.title": "新上架動畫",
        "browse.alphabetical.collection.title": "依字母排序瀏覽所有動畫",
        "feed.view_all_description": "還在尋找什麼嗎？{linebreak}看看我們的完整資源庫",
        "anonymous.infobox.title": "需要帳號",
        "app.failed_state.title": "發生錯誤",
        "app.failed_state.cta": "再試一次",
        "menu.release_calendar": "更新日曆",
        "browse.view_all": "瀏覽全部",
    };
*/


// modifier.js (偵錯版 - JSON.parse 攔截器)
/*
(function() {
    'use strict';

    console.log('CR-Translate: [INIT] DEBUG version of JSON.parse Interceptor is active.');

    const originalParse = JSON.parse;
    let parseCallCount = 0;

    JSON.parse = function(text, reviver) {
        parseCallCount++;
        
        // 我們只關心看起來比較大的 JSON 字串，忽略小的設定檔
        // if (text.length < 500) {
            return originalParse(text, reviver);
        // }

        console.log(`[Call #${parseCallCount}] Intercepted a large JSON.parse call (length: ${text.length}).`);

        const data = originalParse(text, reviver);

        // --- 偵錯日誌 ---
        // 打印出解析後物件的頂層結構 (keys)
        if (data && typeof data === 'object') {
            console.log(`[Call #${parseCallCount}] Parsed data structure:`, data);
        }
        // --- 偵錯結束 ---

        // --- 原始的識別邏輯，我們先留著 ---
        try {
            if (data && data[3] && data[3].initialState && data[3].initialState.localization && data[3].initialState.localization.messages) {
                console.log(`%c[Call #${parseCallCount}] [HIT!] Target structure FOUND!`, 'color: green; font-weight: bold;');
                // 在這裡可以加上翻譯邏輯，但為了偵錯，我們先只打印日誌
            }
        } catch (e) {}
        
        return data;
    };
    
    console.log('CR-Translate: DEBUG JSON.parse has been patched.');

})();
*/
