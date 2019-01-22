const bigBrowser = CrossBrowser.getBrowser();

bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.action == "deselectAll"){
        deselectActivities(request.firstTab, request.fieldsToSelect);
    }
    if(request.action === "disableAds"){
        disableAds(request.firstTab, request.toDisable);
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
    await waitForCloseElement(".HQ8yf, .HQ8yf a");
    bigBrowser.runtime.sendMessage({action: "closeTab", firstTab: firstTab});
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

async function disableAds(firstTab, toDisable){
    if(toDisable){
        $(".hh4xKf.MLPG7").click();
        var $disableButton = await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.sZ7lgc");
        $disableButton.click();
    }
    else{
        $(".hh4xKf.MLPG7").click();
        var $enableButton = await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.RBTGZe");
        $enableButton.click();
        
    }
    await waitForElement(".U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.ffRi5e.sZ7lgc.M9Bg4d");
        bigBrowser.runtime.sendMessage({action: "closeTab", firstTab: firstTab});
}