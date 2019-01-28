// EVENTS
bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "goToGoogle") {
		goToPageWithAction("https://myaccount.google.com/activitycontrols", "disableActivities", request.fieldsToSelect);
	}
	if(request.action === "goToGoogleAds"){
		openWorkingTab("https://adssettings.google.com/authenticated", "disableAds", request.toDisable);
	}
	if(request.action === "goToGoogleActivities"){
		openWorkingTab("https://myactivity.google.com/myactivity", "deleteAllActivity");
	}
	if (request.action == "closeTab") {
		closeTab(request.firstTab, request.workingTab);
	}
	if (request.action == "closeTabAfterRequests") {
		closeTabAfterRequests(request.firstTab, request.workingTab);
	}
	if(request.action === "goToGoogleTimeline"){
		openWorkingTab("https://www.google.com/maps/timeline?pb", "deleteAllPositions");
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

async function closeTabAfterRequests(firstTab, workingTab){
	while(requests.length > 0 || !firstRequestSent){
		await wait(100);
	}
	closeTab(firstTab, workingTab);
}

async function goToPageWithAction(url, action, params = null){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url, active: true});
	var tabs = await CrossBrowser.tabsQuery({ currentWindow: true, url });
	var tab = tabs[0];
	await waitForPage(tab, url);
	bigBrowser.tabs.sendMessage(tab.id, {action, firstTab, workingTab: null, params});
}

async function openWorkingTab(url, action, params = nuls){
	await bigBrowser.tabs.create({url, active: false});
	var tabs = await CrossBrowser.tabsQuery({ currentWindow: true, url });
	var tab = tabs[0];
	await waitForPage(tab, url);
	bigBrowser.tabs.sendMessage(tab.id, {action, firstTab: null, workingTab: tab, params});
}

// UTILS

async function waitForPage(url){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var tab = tabs[0];
	while(!tab || tab.url != url || tab.status != "complete"){
		tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
		tab = tabs[0];	
	}
	return new Promise((resolve) => resolve());
}

async function closeTab(firstTab, workingTab){
	await wait(500);
	if(workingTab){
		bigBrowser.tabs.remove([workingTab.id]);
	}
	else{
		var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
		bigBrowser.tabs.remove([tabs[0].id]);
		bigBrowser.tabs.update(firstTab.id, {active: true});
	}
	bigBrowser.runtime.sendMessage({
		msg: "action_completed", 
		data: {
			subject: "Loading",
			content: "Just completed!"
		}
	});	
}
