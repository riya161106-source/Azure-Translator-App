function swapLang() {
    const from = document.getElementById("fromLang");
    const to = document.getElementById("toLang");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;
}

async function translateText() {
    const apiKey = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;
    const text = document.getElementById("inputText").value;
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${fromLang}&to=${toLang}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        const data = await response.json();

        if (!response.ok) {
            alert("Error: " + JSON.stringify(data));
            return;
        }

        document.getElementById("outputText").value =
            data[0].translations[0].text;

    } catch (error) {
        alert("Translation failed");
        console.error(error);
    }
}