chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "waitForGoogleActivityControl") {
		waitForGoogle(request.page);
	}
});

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