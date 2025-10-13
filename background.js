// Opens options.html once the extension is loaded
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["GEMINI_API_KEY"], (res) => {
        // If API isn't found, open options.html
        if (!res.GEMINI_API_KEY) {
            chrome.tabs.create({ url: "options.html" });
        }
    })
})
