import React from "react";
import "./FacebookTab.css";

import {
  FormGroup,
  Label,
  Input
} from "reactstrap";

const FacebookTab = () => {
  return (
    <div className="facebook-forms">
    <div><p>Gérer la collecte des données</p>
                    <>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" />{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
        </FormGroup>
        </>   
        </div>
        <div><p>Supprimer les données existantes</p>
                    <>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" />{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
        </FormGroup>
        </>   
        </div>
        </div>
  );
};

export default FacebookTab;