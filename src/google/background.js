chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "waitForGoogleActivityControl") {
		waitForGoogle(request.page);
	}
	if (request.action == "returnToPage") {
		returnToPage(request.page);
	}
});

var requests = [];
chrome.webRequest.onBeforeRequest.addListener((request)=>{
	requests.push(request)
},{urls: ["*://*.myaccount.google.com/*"]});
chrome.webRequest.onCompleted.addListener((request)=>{
	requests = requests.filter((r)=> {r.requestId != request.requestId});
},{urls: ["*://*.myaccount.google.com/*"]});


function waitForGoogle(page){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if(tabs[0].url == "https://myaccount.google.com/activitycontrols" && tabs[0].status === "complete"){
			chrome.tabs.sendMessage(tabs[0].id, {action: "deselectAll", page: page});
		}
		else{
			waitForGoogle(page);
		}
	});
}

function returnToPage(page){
	if(requests.length > 0){
		setTimeout(()=>{
			returnToPage(page);
		},100);		
	}
	else{
		setTimeout(()=>{
			chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
				chrome.tabs.update(tab.id, {url: page});
			});
		},500);
		
	}
}