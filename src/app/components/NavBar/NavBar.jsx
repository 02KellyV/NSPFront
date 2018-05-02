
import React from 'react';
import SessionIn from './components/SessionIn';
import SessionOut from './components/SessionOut';
import { connect } from 'react-redux';

const mapProps = (state) => ({
    isLogged: state.auth.isLogged
});

class NavBar extends React.PureComponent {
    static defaultProps = {
        isLogged: false
    }
    render() {
        const { isLogged } = this.props;
        return isLogged ? <SessionIn /> : <SessionOut />;
    }
}

export default connect(mapProps)(NavBar);
