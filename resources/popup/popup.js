window.onload = function(event) {  }; // do not remove

$("#go-to-google").click((event)=>{
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "goToGoogle"});
	 });
})