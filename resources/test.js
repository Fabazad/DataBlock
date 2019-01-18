function goToGoogle(){
    if(window.location.href != "https://myaccount.google.com/activitycontrols"){
        chrome.runtime.sendMessage({action: "waitForGoogleActivityControl", page: window.location.href});
        window.location.replace("https://myaccount.google.com/activitycontrols");
    }
}
function deselectAll(page){
    var webActivitySwitch = $(".LsSwGf.PciPcd.N2RpBe");
    webActivitySwitch.click();
    deselectAllBis(webActivitySwitch.length, page);
}

function deselectAllBis(numActivedSwitches, page){
    var $divsToScroll = $(".ETZ0Vd");
    if($divsToScroll.length < numActivedSwitches){
        setTimeout(()=> {
            deselectAllBis(numActivedSwitches, page);
        }, 100);
    }
    else{
        $divsToScroll.each((index)=>{
            $($divsToScroll.get(index)).scrollTop(1000);
        });
        setTimeout(()=>{
            $(".HQ8yf, .HQ8yf a").click();
            refreshPage(page);
        },100);
    }
}

function refreshPage(page){
    if($(".HQ8yf, .HQ8yf a").length){
        setTimeout(()=>{
            refreshPage(page);
        },100);
    }
    else{
        chrome.runtime.sendMessage({action: "returnToPage", page: page});
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "goToGoogle"){
        goToGoogle();
    }
    if(request.action == "deselectAll"){
        deselectAll(request.page);
    }
});
