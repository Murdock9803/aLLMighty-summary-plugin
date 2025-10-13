// loading animation + Result output request + error handling
document.getElementById("summarize").addEventListener("click", () => {
    const result = document.getElementById("result");
    result.innerHTML = "<div class='loader'></div>";

    const format = document.getElementById("summary-format");

    // Getting the user's API Key
    chrome.storage.sync.get(["GEMINI_API_KEY"], ({ GEMINI_API_KEY }) => {
        if (!GEMINI_API_KEY) {
            result.textContent = "No API Key found. Press the ⚙️ icon for setting one.";
            return;
        }

        chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
            chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async ({ text }) => {

                if (!text) {
                    result.textContent = "Couldn't extract text from the page.";
                    return;
                }

                try {
                    const summary = await getSummary (text, format, GEMINI_API_KEY);
                    result.textContent = summary;
                } catch (error) {
                    result.textContent = "There is an error: " + error.message;
                }
            });
        });
    });
});


// Processing the AI input, and fetching results output
async function getSummary(rawText, format, API_KEY) {
    const max = 20000;
    const text = rawText.length > max ? rawText.slice(0, max) + "..." : rawText;

    const promptByFormat = {
        brief: `Summarise the given article briefly, in 2-4 sentences:\n\n${text}`,
        detailed: `Summarise the given article in detail, 6-10 sentences, covering the key points and details:\n\n${text}`,
        bullets: `summarise the given article in 5-7 bullet points. Start each line by "- " so that it looks like a bullt point in markdown:\n\n${text}`
    }

    const prompt = promptByFormat[format] || promptByFormat.brief;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
            contents: [{parts: [{ text: prompt }]}],
            generationConfig: {temperature: 0.2},
        })
    }
    );

    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message || "Request failed");
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary found.";
}


// result copy button logic
document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText = document.getElementById("result").innerText;

  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn");
        const originalText = copyBtn.innerText;

        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
});
