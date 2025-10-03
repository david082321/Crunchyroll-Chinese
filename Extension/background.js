// background.js

const CONFIG = {
    versionUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/version.json',
    exactDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/exact.json',
    regexDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/regex.json',
    extraDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/extra.json',
    langDictUrl: 'https://raw.githubusercontent.com/david082321/Crunchyroll-Chinese/refs/heads/main/lang.json',
    checkIntervalMinutes: 60 // 每天檢查一次 (24 * 60)
};

async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`[CR-Translate BG] Failed to fetch JSON from ${url}:`, error);
        return null;
    }
}

async function updateDictionaries() {
    console.log('[CR-Translate BG] Checking for dictionary updates...');
    const remoteVersion = await fetchJson(CONFIG.versionUrl);
    if (!remoteVersion) {
        console.log('[CR-Translate BG] Could not fetch remote version. Aborting update.');
        return;
    }

    const localData = await chrome.storage.local.get(['versions', 'lastCheck']);
    const localVersion = localData.versions || {};

    // 比較版本號決定是否需要更新
    if (localVersion.exact === remoteVersion.exact &&
        localVersion.regex === remoteVersion.regex &&
        localVersion.extra === remoteVersion.extra &&
        localVersion.lang === remoteVersion.lang) {
        console.log('[CR-Translate BG] Dictionaries are up to date.');
        // 記錄檢查時間
        await chrome.storage.local.set({ lastCheck: Date.now() });
        return;
    }

    console.log('[CR-Translate BG] New versions found. Fetching new dictionaries...');

    const [exact, regex, extra, lang] = await Promise.all([
        fetchJson(CONFIG.exactDictUrl),
        fetchJson(CONFIG.regexDictUrl),
        fetchJson(CONFIG.extraDictUrl),
        fetchJson(CONFIG.langDictUrl)
    ]);

    // 組合字典
    const combinedExactDict = { ...(extra ? extra.exact : {}), ...(exact || {}) };
    const combinedRegexDict = [...(regex || []), ...(extra ? extra.regex : [])];

    // 儲存到 chrome.storage.local
    await chrome.storage.local.set({
        'dict_exact': combinedExactDict,
        'dict_regex': combinedRegexDict,
        'dict_lang': lang || {},
        'versions': remoteVersion, // 更新本地版本號
        'lastCheck': Date.now()
    });

    console.log('[CR-Translate BG] Dictionaries updated and saved successfully!', remoteVersion);
}

// 擴充功能首次安裝時執行
chrome.runtime.onInstalled.addListener(() => {
    console.log('[CR-Translate BG] Extension installed. Performing initial dictionary fetch.');
    updateDictionaries();
});

// 使用 Alarms API 定期檢查更新
// 這比 setTimeout 更可靠，因為 Service Worker 可能會休眠
chrome.alarms.create('dictionaryUpdateAlarm', {
    delayInMinutes: 1, // 1分鐘後開始第一次檢查
    periodInMinutes: CONFIG.checkIntervalMinutes
});

chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'dictionaryUpdateAlarm') {
        updateDictionaries();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getDictionaries") {
        // 異步獲取所有字典
        (async () => {
            const storedData = await chrome.storage.local.get(['dict_exact', 'dict_regex', 'dict_lang']);
            sendResponse({
                status: "success",
                data: storedData
            });
        })();
        // 返回 true 表示我們將會異步地發送響應
        return true; 
    }
});