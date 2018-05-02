
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import { connect } from 'react-redux';

const mapProps = (state) => ({
    isLogged: state.auth.isLogged
});

class Secure extends Component {
    static defaultProps = {
        isLogged: false
    }
    render() {
        const { isLogged, children } = this.props;
        if (isLogged === true) {
            return (
                <React.Fragment>
                    {children}
                </React.Fragment>
            );
        }
        return (
            <Switch>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/" component={SignIn} />
            </Switch>
        );
    }
}

export default connect(mapProps)(Secure);
