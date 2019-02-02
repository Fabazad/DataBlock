/* global chrome */
/* global bigBrowser */


import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './assets/icons/DataBlockLogo.png';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import { Button } from "reactstrap";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      collectedActivities: [],
      collectingAds: false
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    var self = this;
    bigBrowser.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
          if (request.action === "action_completed") {
              //  To do something
              console.log("Tab closed");
              console.log("REQUEST MSG subject" + request.data.subject)
              console.log("REQUEST MSG content" + request.data.content)
          }
          if(request.action === "disableActivities"){
            self.setState({collectedActivities: request.selectedSwitches});
            chrome.runtime.sendMessage({action: "synchroGoogleAds"});
          }
          if(request.action === "disableAdsForFront"){
            self.setState({collectingAds: request.isEnable});
          }
      }
    );
  }

  goToGoogle(fieldsToSelect){
    chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect});
  }

  goToGoogleAds(toDisable){
    console.log("Disable google ads:" + toDisable)
    this.setState({customAds: !this.state.customAds})
    chrome.runtime.sendMessage({action: "goToGoogleAds", toDisable});
  }

  goToGoogleActivities(){
    chrome.runtime.sendMessage({action: "goToGoogleActivities"});
  }

  deleteApps(){
    chrome.tabs.sendMessage({action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
  }

  deleteAllApps(){
    chrome.tabs.sendMessage({action: "deleteApps", deleteAll: true, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
  }

  deleteAllPositions(){
    chrome.runtime.sendMessage({action: "goToGoogleTimeline"});
  }

  synchroGoogle(){
    chrome.runtime.sendMessage({action: "synchroGoogle"});
  }

  synchroGoogleAds(){
    chrome.runtime.sendMessage({action: "synchroGoogleAds"});
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
            collectedActivities={this.state.collectedActivities}
            collectingAds={this.state.collectingAds}
          />
          </div>
          <Button color={this.state.collectingAds ? "primary" : "danger"} onClick={this.synchroGoogleAds}>Synchroniser Google ads </Button>
          <Button color="primary" onClick={this.synchroGoogle}>Synchroniser Google</Button>
          <Button color="primary" onClick={this.goToGoogleActivities}>Delete Google Activities</Button>
          
          </body>
        
      </div>
    );
  }

  
}

export default App;

