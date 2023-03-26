# TDLR.ai: An AI Powered Text Summarizer

A Google Chrome extension that summarizes text using Open AI LLM models.

## 🚧 _*Notes*_ 🚧
- This project was generated in large part by OpenAI's GPT-4. While I provided the prompts, GPT-4 provided virtually all of the code. I took some creative liberties in a few places and had to make a couple small changes, but this project is almost entirely the product of GPT-4 responding to my prompts asking it to build this extension iteratively.  
- Please make sure you have a valid OpenAI API key to use this extension.
- The extension currently uses the `gpt-3.5-turbo` model in the API call. Replace it with the appropriate GPT-4 model when broadly available.

## How to Load the Extension

1. Clone this repo.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top-right corner of the Extensions page.
4. Click the "Load unpacked" button that appears after enabling Developer mode.
5. Browse to your local clone of this repo and select it.

The extension should now appear in your list of Chrome extensions, and its icon will be displayed in the Chrome toolbar.

## How to Use the Extension

1. Click the extension icon in the Chrome toolbar to open the AI summarizer's popup.
2. Enter your OpenAI API key in the "API Key" input field. The key will be stored securely in your browser.
3. Paste the text you want to summarize in the "Text to Summarize" textarea.
4. Click the "Summarize" button.
5. The summarized text will be displayed in the section below the "Summarize" button.