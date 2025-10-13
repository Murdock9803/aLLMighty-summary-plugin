// js logic for (checking if the key is present) or (getting the API key from user), and setting the value in chrome storage
window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["GEMINI_API_KEY"], ({ GEMINI_API_KEY }) => {
        if (GEMINI_API_KEY) document.getElementById("api-key").value = GEMINI_API_KEY;
    })

    document.getElementById("save-btn").addEventListener("click", () => {
        const API_KEY = document.getElementById("api-key").value.trim();
        if (!API_KEY) return;

        chrome.storage.sync.set({ GEMINI_API_KEY: API_KEY }, () => {
            document.getElementById("success-msg").style.display = "block";
            // close the options.html page after API saved successfully
            setTimeout(() => window.close(), 1200);
        })
    })
})
