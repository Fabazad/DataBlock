// EVENTS
bigBrowser.runtime.onMessage.addListener(async function (request, sender, sendResponse){
    if(request.action === "disableActivities"){
        await disableActivities(request.params);
        bigBrowser.runtime.sendMessage({action: "closeTabAfterRequests", firstTab: request.firstTab, workingTab: request.workingTab});
    }
    if(request.action === "disableAds"){
        await disableAds(request.params);
        bigBrowser.runtime.sendMessage({action: "closeTab", firstTab: request.firstTab, workingTab: request.workingTab});
    }
    if(request.action === "deleteAllActivity"){
        await deleteAllActivities();
        bigBrowser.runtime.sendMessage({action: "closeTabAfterRequests", firstTab: request.firstTab, workingTab: request.workingTab});
    }
    if(request.action === "deleteAllPositions"){
        await deleteAllPositions();
        bigBrowser.runtime.sendMessage({action: "closeTab", firstTab: request.firstTab, workingTab: request.workingTab});
    }
});

// MAINS
async function disableActivities(fieldsToSelect){
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
    return Promise.resolve()
}

async function disableAds(toDisable){
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
    return Promise.resolve()
}

async function deleteAllActivities(){
    $("a[href='/delete-activity']")[0].click(); // deleteactivities tab
    var $selectOption = await waitForElement("md-option", 4); 
    $selectOption.click(); 
    $("button.md-button.md-ink-ripple:not(.history-overflow-menu-button)").click(); // Delete button 1
    var $deleteButton = await waitForElement("md-dialog-content button.md-button.md-ink-ripple:not(.fp-delete-confirmation-cancel");
    $deleteButton.click();
    await wait(100);
    return Promise.resolve()
}

async function deleteAllPositions(){
    var $binButton = await waitForElement(".delete-button.delete-all-button.invalidate-fade.material-icons-extended.material-icon-with-ripple"); // delete/bin button
    $binButton.click();
    var $checkbox = await waitForElement(".modal-dialog .goog-checkbox");
    $checkbox.click();
    $("button.delete-button").click()
    await waitForElement(".modal-dialog button.goog-buttonset-default");
    return Promise.resolve()
}

// UTILS

async function disableActivitiesBis(numActivedSwitches){
    if(numActivedSwitches == 0) return Promise.resolve();
    var $divsToScroll = $(".ETZ0Vd");
    var $buttons = $("div [jsaction='JIbuQc:Wh8OAb'] .RveJvd.snByac");
    
    while($buttons.length < numActivedSwitches || sameCss($buttons, "color", "rgba(68, 68, 68, 0.5)")){
        await wait(100);
        $divsToScroll = $(".ETZ0Vd");
        $buttons = $("div [jsaction='JIbuQc:Wh8OAb'] .RveJvd.snByac");
    }
    
    $divsToScroll.each((index)=>{
        $($divsToScroll.get(index)).scrollTop(1000);
    });
    await wait(100);
    $buttons.click();
    
    return Promise.resolve();
}