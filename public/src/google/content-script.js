// EVENTS
bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action === "disableActivities"){
        disableActivities(request.firstTab, request.params);
    }
    if(request.action === "disableAds"){
        disableAds(request.firstTab, request.params);
    }
    if(request.action === "deleteAllActivity"){
        deleteAllActivities(request.firstTab);
    }
});

// MAINS
async function disableActivities(firstTab, fieldsToSelect){
    var $switchToSelect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return fieldsToSelect.includes(index) && !$(s).hasClass('N2RpBe');
    });
    var $switchToDeselect = $(".LsSwGf.PciPcd").filter((index, s) => {
        return !fieldsToSelect.includes(index) && $(s).hasClass('N2RpBe');
    });
    
    var $switchToClick = $.merge($switchToSelect, $switchToDeselect);
    $switchToClick.click();
    await disableActivitiesBis($switchToClick.length);
    await waitForCloseElement(".HQ8yf, .HQ8yf a");
    bigBrowser.runtime.sendMessage({action: "closeTabAfterRequests", firstTab});
}

async function disableAds(firstTab, toDisable){
    var $disableSwitch = $(".LsSwGf.vBNbwc.N2RpBe");
    var $enableSwitch = $(".LsSwGf.vBNbwc:not(.N2RpBe)");
    if(toDisable && $disableSwitch.length){
        $disableSwitch.click();
        var $disableButton = await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.sZ7lgc");
        $disableButton.click();
        await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.sZ7lgc.M9Bg4d");
    }
    else if($enableSwitch.length){
        $enableSwitch.click();
        var $enableButton = await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.RBTGZe");
        $enableButton.click();
        await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.sZ7lgc.M9Bg4d");
    }
    bigBrowser.runtime.sendMessage({action: "closeTab", firstTab});
}

async function deleteAllActivities(firstTab){
    $("a[href='/delete-activity']")[0].click(); // deleteactivities tab
    var $selectOption = await waitForElement("md-option", 4); 
    $selectOption.click(); 
    $("button.md-button.md-ink-ripple:not(.history-overflow-menu-button)").click(); // Delete button 1
    var $deleteButton = await $("md-dialog-content button.md-button.md-ink-ripple:not(.fp-delete-confirmation-cancel");
    $deleteButton.click();
    bigBrowser.runtime.sendMessage({action: "closeTabAfterRequests", firstTab});
}

// UTILS

async function disableActivitiesBis(numActivedSwitches){
    if(numActivedSwitches == 0) return Promise.resolve();
    var $divsToScroll = $(".ETZ0Vd");
    var $buttons = $(".HQ8yf, .HQ8yf a");
    
    while($buttons.length < numActivedSwitches || sameCss($buttons, "color", "rgba(68, 68, 68, 0.5)")){
        await wait(100);
        $divsToScroll = $(".ETZ0Vd");
        $buttons = $(".HQ8yf, .HQ8yf a");
    }
    $divsToScroll.each((index)=>{
        $($divsToScroll.get(index)).scrollTop(1000);
    });
    await wait(100);
    $buttons.click();
    return Promise.resolve();
}