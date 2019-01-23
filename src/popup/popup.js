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