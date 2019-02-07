import "./FacebookTab.css"
import React, { Component } from "react";

import {
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

class FacebookTab extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isDeleteAllApps: false,
            isDeleteAllData: false,
            fullName: "",
            email: "",
            country: ""
        }

    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    deleteApps() {
        const { isDeleteAllApps, isDeleteAllData } = this.state
        this.props.deleteApps(isDeleteAllApps, isDeleteAllData)
    }

    submitForm() {
        const { fullName, email, country } = this.state
        alert(fullName + " - " + email + " - " + country)
        this.props.stopTreatments(fullName, email, country)
    }

    render() {
        const { fullName, email, country, isDeleteAllApps, isDeleteAllData } = this.state;
        return (
            <div>
                <div className="facebook-forms">
                    <div className="facebook-form"><p>Supprimer les applications</p>
                        <form>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="isDeleteAllApps" value={isDeleteAllApps} onChange={(e) => {
                                    this.handleChange(e)
                                }} />
                                    Toutes les applications
                                    <span className="form-check-sign">
                                        <span className="check"></span>
                                    </span>
                                </Label>
                                <Label check>
                                    <Input type="checkbox" name="isDeleteAllData" value={isDeleteAllData} onChange={(e) => {
                                    this.handleChange(e)
                                }} />
                                    Toutes les données associées
                                    <span className="form-check-sign">
                                        <span className="check"></span>
                                    </span>
                                </Label>
                            </FormGroup>
                            <Button type="submit" color="success" onClick={() => this.deleteApps}>Valider</Button>
                        </form>
                    </div>
                    <hr />
                    <div className="facebook-form"><p>Demander l'arrêt des traitements</p>
                        <form>
                            <FormGroup check>
                                <Label>Nom complet</Label>
                                <Input type="text" name="fullName" placeholder="Nom complet" value={fullName} onChange={(e) => {
                                    this.handleChange(e)
                                }} />
                                <Label>Email</Label>
                                <Input type="text" name="email" placeholder="Email" value={email} onChange={(e) => {
                                    this.handleChange(e)
                                }} />
                                <Label>Pays</Label>
                                <Input type="text" name="country" placeholder="Pays" value={country} onChange={(e) => {
                                    this.handleChange(e)
                                }} />
                            </FormGroup>
                            <Button type="submit" color="success" onClick={this.submitForm}>Valider</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default FacebookTab;