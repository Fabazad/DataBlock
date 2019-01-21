chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "goToGoogle"){
        goToGoogle();
    }
    if(request.action == "deselectAll"){
        deselectAll(request.page);
    }
});

function goToGoogle(){
    if(window.location.href != "https://myaccount.google.com/activitycontrols"){
        chrome.runtime.sendMessage({action: "waitForGoogleActivityControl", page: window.location.href});
        window.location.replace("https://myaccount.google.com/activitycontrols");
    }
}
function deselectAll(page, fieldsToSelect = [2, 4, 5]){
    var $switchToSelect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return fieldsToSelect.includes(index) && !$(s).hasClass('N2RpBe');
    });
    var $switchToDeselect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return !fieldsToSelect.includes(index) && $(s).hasClass('N2RpBe');
    });
    
    var $switchToClick = $.merge($switchToSelect, $switchToDeselect);
    $switchToClick.click();
    deselectAllBis($switchToClick.length, page);
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
