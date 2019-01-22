const bigBrowser = CrossBrowser.getBrowser();

bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "goToGoogle") {
		goToGoogle(request.fieldsToSelect);
	}
	if (request.action == "closeTab") {
		closeTab(request.firstTab);
	}
});

var requests = [];
bigBrowser.webRequest.onBeforeRequest.addListener((request)=>{
	requests.push(request);
},{urls: ["*://*.myaccount.google.com/*"]});
bigBrowser.webRequest.onCompleted.addListener((request)=>{
	requests = requests.filter((r)=> {r.requestId != request.requestId});
},{urls: ["*://*.myaccount.google.com/*"]});

async function goToGoogle(fieldsToSelect){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var firstTab = tabs[0];
	await bigBrowser.tabs.create({url: "https://myaccount.google.com/activitycontrols"});
	var tab = await waitForGoogle();
	bigBrowser.tabs.sendMessage(tab.id, {action: "deselectAll", firstTab: firstTab, fieldsToSelect: fieldsToSelect});
}

async function closeTab(firstTab){
	if(requests.length > 0){
		wait(100);
	}
	else{
		wait(500);
		var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
		bigBrowser.tabs.remove([tabs[0].id]);
		bigBrowser.tabs.update(firstTab.id, {active: true});
	}
}

async function waitForGoogle(){
	var tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
	var tab = tabs[0];
	while(tab.url != "https://myaccount.google.com/activitycontrols" || tab.status != "complete"){
		tabs = await CrossBrowser.tabsQuery({ active: true, currentWindow: true });
		tab = tabs[0];	
	}
	return new Promise((resolve) => resolve(tab));
}