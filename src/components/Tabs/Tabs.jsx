import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Card, CardHeader, CardBody, TabPane, TabContent } from 'reactstrap';




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
    return (
        <Card className="card-plain">
        <CardHeader>
            <Nav tabs>
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
                        Cookies
                    </NavLink>
                </NavItem>
            </Nav>
        </CardHeader>
        <CardBody>
            <TabContent activeTab={this.state.activeTab} className="text-center">
                <TabPane tabId="1">
                    <p>I think that's a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. So when you get something that has the name Kanye West on it, it's supposed to be pushing the furthest possibilities. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>
                </TabPane>
                <TabPane tabId="2">
                    <p> I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that's a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I think that's a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. </p>
                </TabPane>
                <TabPane tabId="3">
                    <p> I think that's a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that's a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>
                </TabPane>
            </TabContent>
        </CardBody>
    </Card>
    )
  }
}

Tabs.propTypes = {
};

export default Tabs;
