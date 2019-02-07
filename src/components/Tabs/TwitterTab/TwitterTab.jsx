import React, { Component } from "react";
import "./TwitterTab.css"
import { Button, UncontrolledTooltip } from "reactstrap";

class TwitterTab extends Component {


    constructor(props){
        super(props)

        this.state = {
            
             }
        
        }
        
    
    render(){
        return (
            <div className="google-form">
                <p>Supprimer les données</p> 
                <Button id="delete-geolocation-btn" className="delete-button" color="danger">Géolocalisation</Button>
                <UncontrolledTooltip placement="left" target="delete-geolocation-btn" delay={0}>
                    Supprime tout l'historique des endroits où vous êtes allés
                </UncontrolledTooltip>
                <br />
                <Button id="delete-activities-btn" className="delete-button" color="danger">Contacts</Button>
                <UncontrolledTooltip placement="left" target="delete-activities-btn" delay={0}>
                    Supprime les contacts importés
                </UncontrolledTooltip>
            </div>
        );
        }

};

export default TwitterTab;