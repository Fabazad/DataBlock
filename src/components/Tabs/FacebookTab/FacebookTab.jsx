import React, { Component } from "react";
import "./FacebookTab.css";
import { Button } from "reactstrap";

class FacebookTab extends Component {


    constructor(props){
        super(props)
        this.deleteApps = this.deleteApps.bind(this)
        this.deleteAllApps = this.deleteAllApps.bind(this)
        
        this.state = {
            
        }
    }

        deleteApps(handleDataChecked){
            console.log("GO TO GOOGLE: " + handleDataChecked)
            this.props.goToGoogle(handleDataChecked) 
     }
        deleteAllApps(handleDataChecked){
            console.log("GO TO GOOGLE: " + handleDataChecked)
            this.props.goToGoogle(handleDataChecked) 
 }  
        
    

  render(){
      return (
    <div className="facebook-forms">
        <Button color="info" onClick={this.deleteApps}>Delete facebook apps</Button>
        <Button color="info" onClick={this.deleteAllApps}>Delete facebook all apps</Button>
        </div>
        );
    };

}

export default FacebookTab;