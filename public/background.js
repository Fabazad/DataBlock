/* global chrome */
alert("background");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "testMessage"){
        alert("ca marche !");
    }
})