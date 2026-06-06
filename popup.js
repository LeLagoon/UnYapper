var output = [""];
let apiKey
function updatePopup() {
    chrome.storage.sync.get(['selected-text'], function (data){
        output = document.getElementById('output').innerText = data['selected-text']
        console.log(output)
        PromptAI();
    })
}

document.addEventListener('DOMContentLoaded',updatePopup)
const apiInput = document.getElementById('api');

if (apiInput) {
    chrome.storage.local.get(['apiKey'],function (data){
        if (data && data.apiKey) {
            apiInput.value = data.apiKey;
            apiKey = data.apiKey;
        }
    });

    apiInput.addEventListener('input', (e) => {
        const val = e.target.value;
        chrome.storage.local.set({ apiKey: val });
        apiKey = val;
    });
}

async function PromptAI () {
    chrome.storage.sync.get(['apiKey'],function (data){apiKey=data['apiKey']})
    console.log(apiKey)
    const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
        method: "POST",
        headers: {
            "Authorization" : apiKey,
            "Content_Type" : "application/json"
        },
        body: JSON.stringify({
            model: "anthropic/claude-opus-4.8",
            input: [
                {
                    type: 'message',
                    role: 'user',
                    content: [
                    {
                        type: 'input_text',
                        text: "Please summarize the provided text into a highly concise format that highlights the most important pointers. CRITICAL LENGTH CONSTRAINT: > Your final response MUST absolutely be less than 40% of the length of the provided text. To ensure you do not fail this constraint: Internally calculate the approximate word count of the provided text. Calculate 40% of that number to find your strict maximum word limit. Ruthlessly edit your summary so it falls well below this ceiling. Shorter is always better. CRITICAL FORMATTING CONSTRAINTS: > - NO MARKDOWN: Do not use any Markdown formatting whatsoever (no asterisks for bolding, no hash symbols for headers, no backticks, etc.). HTML ONLY: You must output your entire response strictly in valid HTML format. Use standard HTML tags (such as <p>, <ul>, <li>, <b>, <br>) to structure the summary. Text to summarize:" +output,
                    },
                    ],
                },
                ],
                max_output_tokens: 9000,
        })
    })

    const result = await response.json();
    console.log(result)
    let reply = result.output[0].content[0].text;
    document.getElementById("output").innerHTML = reply;
}


// async function PromptAI () {
//     const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
//         method : "POST",
//         headers : {
//             "Authorization": "",
//             "Content-Type" : "application/json",
//         },
//         body: JSON.stringify({
//             model: "anthropic/claude-opus-4.8",
//             input: "tell me a joke",
//             max_output_tokens: 9000,
//         }),
//     });
// }

// PromptAI

// async function ResponseAI () {
//     const result = await response.json();
//     console.log(result);
// }

// ResponseAI