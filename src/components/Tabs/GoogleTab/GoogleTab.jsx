import "./GoogleTab.css"
import React, { Component } from "react";

import {
  FormGroup,
  Label,
  Input, 
  Button
} from "reactstrap";

class GoogleTab extends Component {

    constructor(props){
        super(props)
        this.handleData = this.handleData.bind(this)
        this.onCheckHandleData = this.onCheckHandleData.bind(this)
        this.onCheckDeleteData = this.onCheckDeleteData.bind(this)
        this.onCheckAllHandle = this.onCheckAllHandle.bind(this)
        this.onCheckAllDelete = this.onCheckAllDelete.bind(this)
        this.customAds = this.customAds.bind(this)
        this.goToGoogleActivities = this.goToGoogleActivities.bind(this)
        this.deleteAllPositions = this.deleteAllPositions.bind(this)

        this.state = {
            handleDataChecked: this.props.collectedActivities,
            customAdsValue: false,
            handleDataForm: [
                { position: 0, value: "Activité sur le Web et les applications" },
                { position: 1, value: "Historique des positions" },
                { position: 2, value: "Informations provenant des appareils" },
                { position: 3, value: "Activité vocale et audio" },
                { position: 4, value: "Historique des recherches YouTube" },
                { position: 5, value: "Historique des vidéos regardées sur YouTube" }
                         ]
        }
        
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({handleDataChecked: nextProps.collectedActivities});
        this.setState({customAdsValue: nextProps.collectingAds});
    }

    handleData(handleDataChecked){
        console.log("GO TO GOOGLE: " + handleDataChecked)
        this.props.goToGoogle(handleDataChecked) 
    }

    deleteData(){

    }

    customAds(){
        console.log("GO TO GOOGLE ADS: " + this.props.collectingAds)
        this.props.goToGoogleAds(this.props.collectingAds)
    }

    goToGoogleActivities(){
        this.props.goToGoogleActivities()
    }

    deleteAllPositions(){
        this.props.deleteAllPositions()
    }

    onCheckHandleData(e) {
        // current array of options
        const handleDataChecked = this.state.handleDataChecked
        let index
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          handleDataChecked.push(+e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = handleDataChecked.indexOf(+e.target.value)
          handleDataChecked.splice(index, 1)
        }
    
        // update the state with the new array of options
        this.setState({ handleDataChecked: handleDataChecked })
        console.log("handleDataChecked: " + this.state.handleDataChecked)

    }
   

    onCheckDeleteData(e) {
        // current array of options
        const deleteDataChecked = this.state.deleteDataChecked
        let index
    
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          deleteDataChecked.push(+e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = deleteDataChecked.indexOf(+e.target.value)
          deleteDataChecked.splice(index, 1)
        }
    
        // update the state with the new array of options
        this.setState({ deleteDataChecked: deleteDataChecked })
        console.log("deleteDataChecked: " + this.state.deleteDataChecked)

    }

    onCheckAllHandle(e) {
        const newHandleDataChecked = []
    
        if (e.target.checked) {
        this.state.handleDataForm.map(field => newHandleDataChecked.push(field.position))
            }
        else {

        }

        this.setState({ handleDataChecked: newHandleDataChecked })
        console.log("handleDataCheckedAll: " + this.state.handleDataChecked)

    }

    onCheckAllDelete(e) {
        const newDeleteDataChecked = []
    
        if (e.target.checked) {
        this.state.deleteDataForm.map(field => newDeleteDataChecked.push(field.position))
            }
        else {
            
    }

    this.setState({ deleteDataChecked: newDeleteDataChecked })
        console.log("deleteDataCheckedAll: " + this.state.deleteDataChecked)

    }
        
    
    render(){
        return (
    <div>              
    <div className="custom-ads">
    <p>Personnalisation des publicités</p>
            {this.state.customAdsValue ?
            <Button color="primary" size="sm" onClick={() => this.customAds()}>Activée</Button>
            :  <Button color="default" size="sm" onClick={() => this.customAds()}>Désactivée</Button>
            }
            </div>
    <div className="google-forms">
    <div className="google-form"> 
    <p>Gérer la collecte des données</p>
                    <form>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" onChange={ this.onCheckAllHandle }/>{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
            {this.state.handleDataForm.map(field => <Label check>
            <Input type="checkbox" checked={this.state.handleDataChecked.includes(field.position)} value={field.position} onChange={ this.onCheckHandleData }/>{' '}
            {field.value}
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>)}
        </FormGroup>
        <Button type="submit" color="success" onClick={() => this.handleData(this.state.handleDataChecked)}>Valider</Button>
        </form>   
        </div>
        <div className="google-form"><p>Supprimer les données existantes</p> 
        <Button className="delete-button" color="danger" onClick={() => this.deleteData(this.deleteDataChecked)}>Géolocalisation</Button>
        <br />
        <Button className="delete-button" color="danger" onClick={() => this.deleteData(this.goToGoogleActivities)}>Activités</Button>
        <br />
        <Button className="delete-button" color="danger" onClick={() => this.deleteData()}>Centres d'intéret</Button>
        </div>
        </div>
        </div>
          );
        }

};

export default GoogleTab;