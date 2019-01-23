const bigBrowser = CrossBrowser.getBrowser();

bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "waitForFacebook") {
		waitForFacebook(request);
	}
});

function waitForFacebook(request){
	bigBrowser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if(tabs[0].url == "https://www.facebook.com/help/contact/367438723733209" && tabs[0].status === "complete"){
			bigBrowser.tabs.sendMessage(tabs[0].id, {action: "stopTreatments"});	
		}
		else if(tabs[0].url == "https://www.facebook.com/settings?tab=applications&section=inactive" && tabs[0].status === "complete"){
			if (request.deleteAll) bigBrowser.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: true, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});	
			else bigBrowser.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});	
		}
		else if(tabs[0].url == "https://www.facebook.com/settings?tab=applications&section=active" && tabs[0].status === "complete"){
			bigBrowser.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=active"});	
		}
		else{
			waitForFacebook(request);
		}
	});
}