chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "deselectAll"){
        deselectActivities(request.firstTab, request.fieldsToSelect);
    }
});


async function deselectActivities(firstTab, fieldsToSelect){
    var $switchToSelect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return fieldsToSelect.includes(index) && !$(s).hasClass('N2RpBe');
    });
    var $switchToDeselect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return !fieldsToSelect.includes(index) && $(s).hasClass('N2RpBe');
    });
    
    var $switchToClick = $.merge($switchToSelect, $switchToDeselect);
    $switchToClick.click();
    await deselectActivitiesBis($switchToClick.length);
    await closeTab();
    chrome.runtime.sendMessage({action: "closeTab", firstTab: firstTab});
}

async function deselectActivitiesBis(numActivedSwitches){
    var $divsToScroll = $(".ETZ0Vd");
    var $buttons = $(".HQ8yf, .HQ8yf a");
    while($buttons.length < numActivedSwitches){
        await wait(100);
        $divsToScroll = $(".ETZ0Vd");
        $buttons = $(".HQ8yf, .HQ8yf a");
    }
    $divsToScroll.each((index)=>{
        $($divsToScroll.get(index)).scrollTop(1000);
    });
    await wait(100);
    return new Promise((resolve, reject)=> {
        $buttons.click();
        resolve();
    });
}

async function closeTab(){
    var $openedModal = $(".HQ8yf, .HQ8yf a");
    while($openedModal.length){
        await wait(100);
        $openedModal = $(".HQ8yf, .HQ8yf a");
    }
    return new Promise((resolve, reject)=>{
        resolve();
    });
}