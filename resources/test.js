function goToGoogle(){
    if(window.location.href != "https://myaccount.google.com/activitycontrols"){
        window.location.replace("https://myaccount.google.com/activitycontrols");
        chrome.runtime.sendMessage({action: "waitForGoogleActivityControl"});
    }
}
function deselectAll(){
    var webActivitySwitch = $(".LsSwGf.PciPcd");
    while(!webActivitySwitch){
        webActivitySwitch = $(".LsSwGf.PciPcd");
    }
    $(".LsSwGf.PciPcd").click();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "goToGoogle"){
        goToGoogle();
    }
    if(request.action == "deselectAll"){
        deselectAll();
    }
});

