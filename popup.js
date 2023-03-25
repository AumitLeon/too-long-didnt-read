document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("apiKey", ({ apiKey }) => {
        if (apiKey) {
            document.getElementById("apiKey").value = apiKey;
        }
    });
});

document.getElementById("summarizeButton").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const inputText = document.getElementById("inputText").value;
    const resultDiv = document.getElementById("result");

    if (!apiKey) {
        resultDiv.innerHTML = "Please enter your API key.";
        return;
    }

    if (inputText) {
        resultDiv.innerHTML = "Summarizing...";
        // Save the API key to Chrome storage
        chrome.storage.sync.set({ apiKey }, () => {
            console.log("API key saved");
        });

        const summary = await getSummary(apiKey, inputText);
        resultDiv.innerHTML = summary;
    } else {
        resultDiv.innerHTML = "Please paste your text in the textarea.";
    }
});

async function getSummary(apiKey, text) {
    // Use the provided API key in the callGPT4 function
    try {
        const summary = await callGPT4(apiKey, text);
        return summary;
    } catch (error) {
        console.error("Error getting summary:", error);
        return "Error getting summary. Please try again.";
    }
}

async function callGPT4(apiKey, text) {
    const prompt = `Please summarize the following text: ${text}`;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 250, // Adjust the number of tokens as needed
                n: 1,
                stop: null,
                temperature: 0.5,
            }),
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const summary = data.choices[0].text.trim();
            return summary;
        } else {
            return "No summary generated. Please try again.";
        }
    } catch (error) {
        console.error("Error getting summary:", error);
        return "Error getting summary. Please try again.";
    }
}