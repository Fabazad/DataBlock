// EVENTS
bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "goToGoogle") {
		goToPageWithAction("https://myaccount.google.com/activitycontrols", "disableActivities", request.fieldsToSelect);
	}
	if(request.action === "goToGoogleAds"){
		goToPageWithAction("https://adssettings.google.com/authenticated", "disableAds", request.toDisable);
	}
	if(request.action === "goToGoogleActivities"){
		goToPageWithAction("https://myactivity.google.com/myactivity", "deleteAllActivity");
	}
	if (request.action == "closeTab") {
		closeTab(request.firstTab);
	}
	if (request.action == "closeTabAfterRequests") {
		closeTabAfterRequests(request.firstTab);
	}
	if(request.action === "goToGoogleTimeline"){
		goToPageWithAction("https://www.google.com/maps/timeline?pb", "deleteAllPositions");
	}
});

var requests = [];
var firstRequestSent = false
bigBrowser.webRequest.onBeforeRequest.addListener((request)=>{
	requests.push(request);
	firstRequestSent = true;
},{urls: ["*://*.myaccount.google.com/*", "*://myactivity.google.com/api/select-delete*"]});

bigBrowser.webRequest.onCompleted.addListener((request)=>{
	requests = requests.filter((r)=> {r.requestId != request.requestId});
},{urls: ["*://*.myaccount.google.com/*", "*://myactivity.google.com/api/select-delete*"]});

// MAINS

async function closeTabAfterRequests(firstTab){
	while(requests.length > 0 || !firstRequestSent){
		await wait(100);
	}
	closeTab(firstTab);
}

async function goToPageWithAction(url, action, params = null){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url});
	var tab = await waitForPage(url);
	bigBrowser.tabs.sendMessage(tab.id, {action, firstTab, params});
}

// UTILS

async function waitForPage(url){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var tab = tabs[0];
	while(tab.url != url || tab.status != "complete"){
		tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
		tab = tabs[0];	
	}
	return new Promise((resolve) => resolve(tab));
}

async function closeTab(firstTab){
	await wait(500);
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	bigBrowser.tabs.remove([tabs[0].id]);
	bigBrowser.tabs.update(firstTab.id, {active: true});
}