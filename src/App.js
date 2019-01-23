/* global chrome */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.test = this.test.bind(this);
  }

  test(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.runtime.sendMessage({action: "testMessage"});
    })
  }

  goToGoogle(){
    var fieldsToSelect = [0,2];
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.goToGoogle}>Go to google</button>
          <button onClick={this.goToGoogleAds}>Go to google ads</button>
          <button onClick={this.deleteApps}>Delete facebook apps</button>
          <button onClick={this.deleteAllApps}>Delete facebook all apps</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  
}

export default App;
