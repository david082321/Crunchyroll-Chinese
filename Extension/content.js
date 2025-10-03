// content.js

console.log('[CR-Translate CS] Content script loaded. Injecting modifier first...');

// 1. 先注入 modifier.js，讓它準備好監聽
const script = document.createElement('script');
script.src = chrome.runtime.getURL('modifier.js');
script.onload = () => {
    // 2. 當 modifier.js 腳本加載並執行後，這個 onload 回調會被觸發
    console.log('[CR-Translate CS] Modifier script has been loaded. Now fetching dictionaries...');
    
    // 3. 在這個時間點，我們確信 modifier.js 已經在監聽了，於是才開始請求和發送數據
    chrome.runtime.sendMessage({ action: "getDictionaries" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error('[CR-Translate CS] Error fetching dictionaries:', chrome.runtime.lastError.message);
            return;
        }
        if (response && response.status === "success") {
            console.log('[CR-Translate CS] Dictionaries received. Dispatching event to the page.');
            document.dispatchEvent(new CustomEvent('CR_Translate_Dictionaries', {
                detail: response.data
            }));
        } else {
            console.error('[CR-Translate CS] Failed to get a valid response from background script.');
        }
    });

    // 腳本加載後可以移除自己，保持 DOM 清潔
    script.remove();
};

// 將 script 添加到頁面，觸發加載
(document.head || document.documentElement).appendChild(script);