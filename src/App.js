/* global chrome */
/* global bigBrowser */


import React, { Component } from 'react';
import logo from './assets/icons/DataBlockLogo.png';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import { Button, Spinner } from "reactstrap";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      collectedActivities: [],
      collectingAds: false,
      loading: 0,
      synchronized: false
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToGoogle = this.goToGoogle.bind(this);
    this.goToGoogleAds = this.goToGoogleAds.bind(this);
    this.goToGoogleActivities = this.goToGoogleActivities.bind(this);
    this.deleteApps = this.deleteApps.bind(this);
    this.deleteAllApps = this.deleteAllApps.bind(this);
    this.deleteAllPositions = this.deleteAllPositions.bind(this);
    this.synchroGoogle = this.synchroGoogle.bind(this);
    this.deleteInterests = this.deleteInterests.bind(this);
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
              self.setState({loading: self.state.loading-1});
          }
          if(request.action === "disableActivities"){
            self.setState({collectedActivities: request.selectedSwitches});
            self.setState({loading: self.state.loading+1});
            chrome.runtime.sendMessage({action: "synchroGoogleAds"});
            
          }
          if(request.action === "disableAdsForFront"){
            self.setState({collectingAds: request.isEnable});
            self.setState({loading: self.state.loading-1});
            self.setState({synchronized: true});
          }
      }
    );
  }

  goToGoogle(fieldsToSelect){
    chrome.runtime.sendMessage({action: "goToGoogle", fieldsToSelect});
    this.setState({loading: this.state.loading+1});
  }

  goToGoogleAds(toDisable){
    console.log("Disable google ads:" + toDisable)
    this.setState({customAds: !this.state.customAds});
    this.setState({loading: this.state.loading+1});
    chrome.runtime.sendMessage({action: "goToGoogleAds", toDisable});
  }

  goToGoogleActivities(){
    this.setState({loading: this.state.loading+1});
    chrome.runtime.sendMessage({action: "goToGoogleActivities"});
  }

  deleteApps(){
    this.setState({loading: this.state.loading+1});
    chrome.tabs.sendMessage({action: "deleteApps", deleteAll: false, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
  }

  deleteAllApps(){
    this.setState({loading: this.state.loading+1});
    chrome.tabs.sendMessage({action: "deleteApps", deleteAll: true, url: "https://www.facebook.com/settings?tab=applications&section=inactive"});
  }

  deleteAllPositions(){
    this.setState({loading: this.state.loading+1});
    chrome.runtime.sendMessage({action: "goToGoogleTimeline"});
  }

  deleteInterests(){
    this.setState({loading: this.state.loading+1});
    chrome.runtime.sendMessage({action: "goToDeleteInterests"});
  }

  synchroGoogle(){
    this.setState({loading: this.state.loading+1});
    chrome.runtime.sendMessage({action: "synchroGoogle"});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Data Block</p>
        </header>
        <body className="App-body">
          {this.state.loading > 0 ?
            <Spinner type="grow" color="success" /> : ""
          }
          { !(this.state.loading > 0) && !this.state.synchronized ?
            <div><Button color="primary" onClick={this.synchroGoogle}>Synchroniser Google</Button></div>
          : ""}
          { !(this.state.loading > 0) && this.state.synchronized ?
            <div className="tabs-container">
              <Tabs 
                //Google
                goToGoogle={(fieldsToSelect) => this.goToGoogle(fieldsToSelect)}
                goToGoogleAds={(toDisable) => this.goToGoogleAds(toDisable)}
                goToGoogleActivities={() => this.goToGoogleActivities()}
                deleteAllPositions={() => this.deleteAllPositions()}
                deleteInterests={() => this.deleteInterests()}
                deleteApps={() => this.deleteApps()}
                deleteAllApps={() => this.deleteAllApps()}
                collectedActivities={this.state.collectedActivities}
                collectingAds={this.state.collectingAds}
              />
            </div>
            : ""
          }
          
          </body>
        
      </div>
    );
  }

  
}

export default App;

