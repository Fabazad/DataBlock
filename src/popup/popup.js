window.onload = function(event) {  }; // do not remove

$("#go-to-google").click((event)=>{
	var fieldsToSelect = [2,4];
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect: fieldsToSelect});
	 });
});

$("#go-to-google-ads").click((event)=>{
	var toDisable = true;
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.runtime.sendMessage({action: "goToGoogleAds", toDisable: toDisable});
	 });
});