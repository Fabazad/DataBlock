function goToGoogle(){
    if(window.location.href != "https://myaccount.google.com/activitycontrols"){
        window.location.replace("https://myaccount.google.com/activitycontrols")
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "goToGoogle"){
        goToGoogle();
    }
});

