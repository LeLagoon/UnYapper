chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id : "selectText",
        title : "Select Text",
        contexts : ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info,tab) => {
    if (info.menuItemId === "selectText") {
        chrome.scripting.executeScript({
            target: {tabId : tab.id},
            function: getSelectedText
        });
    }
});

function getSelectedText() {
    let text = window.getSelection().toString()
    if(text)
    alert(text)
    chrome.storage.sync.set({'selected-text': text})
}
    // chrome.runtime.sendMessage({
    //     msg: "selected",
    //     data: {
    //         subject : "Message",
    //         content : text
    //     }
    // });