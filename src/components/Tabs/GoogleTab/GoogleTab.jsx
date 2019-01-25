import React from "react";

import {
  FormGroup,
  Label,
  Input, 
  Button
} from "reactstrap";

const GoogleTab = () => {
  return (
    <div className="google-forms">
    <div><p>Gérer la collecte des données</p>
                    <form>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" />{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
        </FormGroup>
        <Button type="submit" color="success">Valider</Button>
        </form>   
        </div>
        <div><p>Supprimer les données existantes</p>
                    <form>
        <FormGroup check>
            <Label check>
            <Input type="checkbox" />{' '}
            Tout cocher
            <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
        </FormGroup>
        <Button type="submit" color="success">Valider</Button>
        </form>   
        </div>
        </div>
  );
};

export default GoogleTab;