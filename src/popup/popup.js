window.onload = function(event) {  }; // do not remove

$("#go-to-google").click((event)=>{
	var fieldsToSelect = [0,2];
	chrome.tabs.query({active: true, currentWindow: true},  tabs => {
		chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect});
	 });
});

$("#go-to-google-ads").click((event)=>{
	var toDisable = false;
	chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
		chrome.runtime.sendMessage({action: "goToGoogleAds", toDisable});
	 });
});

$("#go-to-google-activities").click((event)=>{
	chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
		chrome.runtime.sendMessage({action: "goToGoogleActivities"});
	 });
});

$("#stopTreatments").click((event)=>{
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "stopTreatments"});
	 });
})

$("#deleteApps").click((event)=>{
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
	 });
})

$("#deleteAllApps").click((event)=>{
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: true, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
	 });
})