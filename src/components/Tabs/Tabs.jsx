import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Card, CardHeader, CardBody, TabPane, TabContent, FormGroup, Label, Input} from 'reactstrap';
import GoogleTab from './GoogleTab/GoogleTab.jsx';
import FacebookTab from './FacebookTab/FacebookTab.jsx';
import TwitterTab from './TwitterTab/TwitterTab.jsx';
import "./Tabs.css";






class Tabs extends React.Component {

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
    return (<div>
        <Card className="card-plain">
        <CardHeader>
            <Nav tabs className="justify-content-center">
                <NavItem>
                    <NavLink
                        className={this.state.activeTab === '1' ? 'active':''}
                        onClick={() => { this.toggle('1'); }}
                        >
                            Google
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={this.state.activeTab === '2' ? 'active':''}
                        onClick={() => { this.toggle('2'); }}
                    >
                        Facebook
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={this.state.activeTab === '3' ? 'active':''}
                        onClick={() => { this.toggle('3'); }}
                    >
                        Twitter
                    </NavLink>
                </NavItem>
            </Nav>
        </CardHeader>
        <CardBody>
            <TabContent activeTab={this.state.activeTab} className="text-center">
                <TabPane tabId="1">
                <GoogleTab 
                    goToGoogle={(fieldsToSelect) => this.props.goToGoogle(fieldsToSelect)}
                    goToGoogleAds={(toDisable) => this.props.goToGoogleAds(toDisable)}
                    goToGoogleActivities={()=> this.props.goToGoogleActivities()}
                    deleteAllPositions={()=> this.props.deleteAllPositions()}
                    collectedActivities={this.props.collectedActivities}
                    collectingAds={this.props.collectingAds}
                    />
                 </TabPane>
                <TabPane tabId="2">
                <FacebookTab 
                    deleteApps={() => this.props.deleteApps}
                    deleteAllApps={() => this.props.deleteAllApps}
                    />              
                    </TabPane>
                <TabPane tabId="3">
                <TwitterTab />              

                       </TabPane>
            </TabContent>
        </CardBody>
    </Card>
    </div>
    )
  }
}

Tabs.propTypes = {
};

export default Tabs;
