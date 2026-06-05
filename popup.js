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
                        text: "Summarize all this text into a concatenated format ina few important pointers :- "+output,
                    },
                    ],
                },
                ],
                max_output_tokens: 9000,
        })
    })

    const result = await response.json();
    console.log(result)
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