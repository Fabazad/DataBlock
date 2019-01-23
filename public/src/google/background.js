// EVENTS
bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "goToGoogle") {
		goToGoogle(request.fieldsToSelect);
	}
	if (request.action == "closeTab") {
		closeTab(request.firstTab);
	}
	if(request.action === "goToGoogleAds"){
		goToGoogleAds(request.toDisable);
	}
	if(request.action === "goToGoogleActivities"){
		goToGoogleActivities();
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

async function goToGoogle(fieldsToSelect){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url: "https://myaccount.google.com/activitycontrols"});
	var tab = await waitForPage("https://myaccount.google.com/activitycontrols");
	bigBrowser.tabs.sendMessage(tab.id, {action: "disableActivities", firstTab: firstTab, fieldsToSelect: fieldsToSelect});
}

async function closeTab(firstTab){
	while(requests.length > 0 || !firstRequestSent){
		await wait(100);
	}
	await wait(500);
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	bigBrowser.tabs.remove([tabs[0].id]);
	bigBrowser.tabs.update(firstTab.id, {active: true});
}

async function goToGoogleAds(toDisable){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url: "https://adssettings.google.com/authenticated"});
	var tab = await waitForPage("https://adssettings.google.com/authenticated");
	bigBrowser.tabs.sendMessage(tab.id, {action: "disableAds", firstTab: firstTab, toDisable: toDisable});
}

async function goToGoogleActivities(){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url: "https://myactivity.google.com/myactivity"});
	var tab = await waitForPage("https://myactivity.google.com/myactivity");
	bigBrowser.tabs.sendMessage(tab.id, {action: "deleteAllActivity", firstTab: firstTab});
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

