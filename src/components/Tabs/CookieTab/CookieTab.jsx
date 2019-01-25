import React from "react";

import {
  FormGroup,
  Label,
  Input
} from "reactstrap";

const CookieTab = () => {
  return (
    <div className="cookie-forms">
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

export default CookieTab;