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
        const summary = await callOpenAI(apiKey, text);
        return summary;
    } catch (error) {
        console.error("Error getting summary:", error);
        return "Error getting summary. Please try again.";
    }
}

async function callOpenAI(apiKey, text) {
    const messages = [
        { role: "system", content: "You are a helpful assistant that summarizes text." },
        { role: "user", content: `Please summarize the following text: ${text}` }
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 250, // Adjust the number of tokens as needed
                n: 1,
                stop: null,
                temperature: 0.5,
            }),
        });

        const data = await response.json();
        console.log(data)
        if (data.choices && data.choices.length > 0) {
            const summary = data.choices[0].message.content.trim();
            return summary;
        } else {
            return "No summary generated. Please try again.";
        }
    } catch (error) {
        console.error("Error getting summary:", error);
        return "Error getting summary. Please try again.";
    }
}
