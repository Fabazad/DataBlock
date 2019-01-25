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

  goToGoogle(fieldsToSelect){
    chrome.tabs.query({active: true, currentWindow: true},  tabs => {
      chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect});
    });
  }

  goToGoogleAds(){
    var toDisable = false;
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
          /></div>
          <Button color="primary" onClick={this.goToGoogle}>Go to google</Button>
          <Button color="primary" onClick={this.goToGoogleAds}>Go to google ads</Button>
          <Button color="danger" onClick={this.deleteApps}>Delete facebook apps</Button>
          <Button color="danger" onClick={this.deleteAllApps}>Delete facebook all apps</Button>
          </body>
        
      </div>
    );
  }

  
}

export default App;
