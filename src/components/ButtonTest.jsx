import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown } from 'reactstrap';
import Button from '../paper-dashboard-react/src/components/CustomButton/CustomButton.jsx';





class ButtonTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
  render() {
    return (
        <UncontrolledButtonDropdown>
    <Button id="caret" color="primary">Primary</Button>
    <DropdownToggle caret className="dropdown-toggle-split" color="primary" />
    <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem>Another Action</DropdownItem>
    </DropdownMenu>
</UncontrolledButtonDropdown>
    )
  }
}

ButtonTest.propTypes = {
};

export default ButtonTest;
