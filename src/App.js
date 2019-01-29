/* global chrome */


import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './assets/icons/DataBlockLogo.png';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import { Button } from "reactstrap";


class App extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
          if (request.msg === "action_completed") {
              //  To do something
              alert("Tab closed")
              console.log("REQUEST MSG subject" + request.data.subject)
              console.log("REQUEST MSG content" + request.data.content)
          }
      }
    );
  }

  goToGoogle(fieldsToSelect){
    chrome.tabs.query({active: true, currentWindow: true},  tabs => {
      chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect});
    });
  }

  goToGoogleAds(toDisable){
    console.log("Disable google ads:" + toDisable)
    chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
      chrome.runtime.sendMessage({action: "goToGoogleAds", toDisable});
    });
  }

  goToGoogleActivities(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
      chrome.runtime.sendMessage({action: "goToGoogleActivities"});
     });
  }

  deleteApps(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
    });
  }

  deleteAllApps(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "deleteApps", deleteAll: true, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
    });
  }

  deleteAllPositions(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
      chrome.runtime.sendMessage({action: "goToGoogleTimeline"});
     });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Data Block</p>
          </header>
          <body className="App-body">
          <div className="tabs-container">
          <Tabs 
            goToGoogle={(fieldsToSelect) => this.goToGoogle(fieldsToSelect)}
            goToGoogleAds={(toDisable) => this.goToGoogleAds(toDisable)}
            deleteApps={() => this.deleteApps}
            deleteAllApps={() => this.deleteAllApps}
          />
          </div>
          </body>
        
      </div>
    );
  }

  
}

export default App;
