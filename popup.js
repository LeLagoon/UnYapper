var output = [""];

function updatePopup() {
    chrome.storage.sync.get(['selected-text'], function (data){
        output = document.getElementById('output').innerText = data['selected-text']
        console.log(output)
        PromptAI();
    })
}

document.addEventListener('DOMContentLoaded',updatePopup)

async function PromptAI () {
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