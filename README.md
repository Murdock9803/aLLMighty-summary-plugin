## aLLMighty Summary Plugin
aLLMighty is a group of `AI/LLM` related projects that I made while coding along with some online tutorials, to learn and have some fun. This repository is the home to `chrome extension` that summarizes all the text written on any webpage. Started by coding along with the [youtube tutorial by RoadsideCoder](https://www.youtube.com/watch?v=mcfCdFS9VBY). The extension uses `Gemini API` as an input from the user, to work.

### Features
- Extracts main textual content from the active page.
- Summarizes the content using the Gemini API.
- Choose summary formats: `brief, detailed, or bullet points`.
- Lightweight popup UI to enter your API key and request a summary.

### Quick start
To use the extension, follow the below simple steps:

#### 1. Download or clone the repo

- Download the ZIP: https://github.com/Murdock9803/aLLMighty/archive/refs/heads/main.zip
- Or clone:
```
git clone https://github.com/Murdock9803/aLLMighty.git
```

#### 2. Load into Chrome
- Open Chrome and go to `chrome://extensions/`.
- Enable `Developer mode` (toggle in the top-right).
- Click `Load unpacked` and select the folder where you extracted/cloned the repository (the folder that contains `manifest.json`).
- The extension should appear in your extensions list.

#### 3. Configure the extension

- Click the extension icon (or open its popup/options), and paste your `Gemini API key` into the input field.
- Choose the summary format (`brief / detailed / bullets`) and request a summary while on any webpage.

Now you can go to any webpage and use the extension to get the summary.


### Contributions
Contributions in the form of `bug/feature` or `pull requests` are highly appreciated.