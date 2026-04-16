async function translateText() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;

    const endpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        // 🔥 NEW: Check if response is OK
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("API Error: " + errorText);
        }

        const data = await response.json();

        document.getElementById("output").innerText =
            data[0].translations[0].text;

    } catch (error) {
        document.getElementById("output").innerText =
            "❌ " + error.message;
    }
}