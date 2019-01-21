chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "goToGoogle") {
		goToGoogle();
	}
	if (request.action == "closeTab") {
		closeTab(request.firstTab);
	}
});

var requests = [];
chrome.webRequest.onBeforeRequest.addListener((request)=>{
	requests.push(request)
},{urls: ["*://*.myaccount.google.com/*"]});
chrome.webRequest.onCompleted.addListener((request)=>{
	requests = requests.filter((r)=> {r.requestId != request.requestId});
},{urls: ["*://*.myaccount.google.com/*"]});

function goToGoogle(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var firstTab = tabs[0];
		chrome.tabs.create({url: "https://myaccount.google.com/activitycontrols"}, (tab) => {
			waitForGoogle(firstTab);
		});
	});
}

function waitForGoogle(firstTab){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var tab = tabs[0];
		if(tab.url == "https://myaccount.google.com/activitycontrols" && tab.status === "complete"){
			chrome.tabs.sendMessage(tab.id, {action: "deselectAll", firstTab: firstTab});
		}
		else{
			waitForGoogle(firstTab);
		}
	});
}

function closeTab(firstTab){
	if(requests.length > 0){
		setTimeout(()=>{
			closeTab(page);
		},100);		
	}
	else{
		setTimeout(()=>{
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.remove([tabs[0].id]);
				chrome.tabs.update(firstTab.id, {active: true});
			});
		},500);
		
	}
}