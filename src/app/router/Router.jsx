
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Secure from '../components/Secure';
import Home from '../pages/Home';

class Router extends Component {
	Redirect = () => <Redirect to="/" />;
	render() {
		const Redirect = this.Redirect;
		return (
			<Secure>
				<Switch>
					<Route exact path="/" component={Home} />

					
					<Route path="/" component={Redirect} />
				</Switch>
			</Secure>
		);
	}
}

export default Router;
