// Scraper logic, for getting the page's text-content
function getPageText() {
    const article = document.querySelector("article");
    if (article) { return article.innerText };

    const paras = Array.from(document.querySelectorAll("p"));
    return paras.map(p => p.innerText).join("\n");
}

// If GET_ARTIcLE_TEXT request is made (popup.js), send the page text content
chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if ((req.type == "GET_ARTICLE_TEXT")) {
        const text = getPageText();
        sendResponse({ text });
    }
})
