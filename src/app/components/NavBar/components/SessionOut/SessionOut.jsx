
import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav, NavItem
} from 'reactstrap';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
//import { Switch, Route } from '../../../../pages/';

class SessionOut extends Component {
	state = {
		isOpen: false
	}
	toggle = () => this.setState({ isOpen: !this.state.isOpen });
	render() {
		return (
			<React.Fragment>
				<Navbar dark expand="md">
					<NavbarBrand href="/">
						&nbsp;&nbsp;
						<Icon name="home" />
						&nbsp;&nbsp;
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Link className="nav-link" to="/sign-up">
									<Icon name="user-plus" />&nbsp;
									Registro
								</Link>
							</NavItem>
							<NavItem>
								<Link className="nav-link" to="/sign-in">
									<Icon name="sign-in" />&nbsp;
									Ingresa
								</Link>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</React.Fragment>
		);
	}
}

export default SessionOut;
