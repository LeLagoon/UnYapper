function updatePopup() {
    chrome.storage.sync.get(['selected-text'], function (data){
        document.getElementById('output').innerText = data['selected-text']
    })
}
document.addEventListener('DOMContentLoaded',updatePopup)
// chrome.runtime.onMessage.addListener(
//     function(request,sender,sendResponse) {
//         if (request.msg = "selected")
//             console.log(request.data.subject)
//             console.log(request.data.content)
//     }
// )