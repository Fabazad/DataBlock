chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "goToGoogle"){
        goToGoogle(request.fieldsToSelect);
    }
    if(request.action == "deselectAll"){
        deselectAll(request.firstTab, request.fieldsToSelect);
    }
});

function goToGoogle(fieldsToSelect){
    if(window.location.href != "https://myaccount.google.com/activitycontrols"){
        chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect: fieldsToSelect});
    }
}
function deselectAll(firstTab, fieldsToSelect){
    var $switchToSelect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return fieldsToSelect.includes(index) && !$(s).hasClass('N2RpBe');
    });
    var $switchToDeselect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return !fieldsToSelect.includes(index) && $(s).hasClass('N2RpBe');
    });
    
    var $switchToClick = $.merge($switchToSelect, $switchToDeselect);
    $switchToClick.click();
    deselectAllBis($switchToClick.length, firstTab);
}

function deselectAllBis(numActivedSwitches, firstTab){
    var $divsToScroll = $(".ETZ0Vd");
    if($divsToScroll.length < numActivedSwitches){
        setTimeout(()=> {
            deselectAllBis(numActivedSwitches, firstTab);
        }, 100);
    }
    else{
        $divsToScroll.each((index)=>{
            $($divsToScroll.get(index)).scrollTop(1000);
        });
        setTimeout(()=>{
            $(".HQ8yf, .HQ8yf a").click();
            closeTab(firstTab);
        },100);
    }
}

function closeTab(firstTab){
    if($(".HQ8yf, .HQ8yf a").length){
        setTimeout(()=>{
            closeTab(firstTab);
        },100);
    }
    else{
        chrome.runtime.sendMessage({action: "closeTab", firstTab: firstTab});
    }
}
