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
        this.deleteData = this.deleteData.bind(this)
        this.onCheckHandleData = this.onCheckHandleData.bind(this)
        this.onCheckDeleteData = this.onCheckDeleteData.bind(this)
        this.onCheckAllHandle = this.onCheckAllHandle.bind(this)
        this.onCheckAllDelete = this.onCheckAllDelete.bind(this)


        this.state = {
            handleDataChecked:[],
            deleteDataChecked:[],
            handleDataForm: [
                { position: 0, value: "Activité sur le Web et les applications" },
                { position: 1, value: "Historique des positions" },
                { position: 2, value: "Informations provenant des appareils" },
                { position: 3, value: "Activité vocale et audio" },
                { position: 4, value: "Historique des recherches YouTube" },
                { position: 5, value: "Historique des vidéos regardées sur YouTube" },
                { position: 6, value: "Personnalisation des publicités" }
             ],
            deleteDataForm: [
                { position: 0, value: "Activité sur le Web et les applications" },
                { position: 1, value: "Historique des positions" },
                { position: 2, value: "Informations provenant des appareils" },
                { position: 3, value: "Activité vocale et audio" },
                { position: 4, value: "Historique des recherches YouTube" },
                { position: 5, value: "Historique des vidéos regardées sur YouTube" },
                { position: 6, value: "Centres d'intérêt" }
        ]
        }
        
    }

    

    handleData(handleDataChecked){
        // Send the value to container OR directly trigger the back function?
        // If handleDataChecked.includes(6) : triggers special function
        console.log("GO TO GOOGLE: " + handleDataChecked)

        return this.props.goToGoogle(handleDataChecked)
        

    }
    deleteData(deleteDataChecked){
        // Send the value to container OR directly trigger the back function?
        // If deleteDataChecked.includes(6) : triggers special function

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
    <div className="google-forms">
    <div className="google-form"><p>Gérer la collecte des données</p>
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
                    <form>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" onChange={ this.onCheckAllDelete }/>{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
            {this.state.deleteDataForm.map(field => <Label check>
            <Input type="checkbox" value={field.position} checked={this.state.deleteDataChecked.includes(field.position)} onChange={ this.onCheckDeleteData }/>{' '}
            {field.value}
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>)}
        </FormGroup>
        <Button type="submit" color="success" onClick={this.deleteData(this.state.deleteDataChecked)}>Valider</Button>
        </form>   
        </div>
        {/* <Button color="primary" onClick={this.props.goToGoogle(this.state.handleDataChecked)}>Go to google</Button> */}

        </div>

  );
        }

};

export default GoogleTab;