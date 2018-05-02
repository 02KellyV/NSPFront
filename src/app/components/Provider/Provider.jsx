import React, { Component } from 'react';
import { actionsCreator as aCauth } from './../../actions/auth';
import { connect } from 'react-redux';

const mapProps = (state) => ({

});

class Provider extends Component {
	state = {
		isLoading: true
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(aCauth.session())
			.then(this.loadingStop)
			.catch(this.loadingStop);
	}
	loadingStop = () => {
		this.setState({
			isLoading: false
		});
	}
	render() {
        const { children } = this.props;
		if (this.state.isLoading) {
			return (
                <React.Fragment>
                    Loading...
                </React.Fragment>
            );
		}
		return (
			<React.Fragment>
				{children}
			</React.Fragment>
		);
	}
}

export default connect(mapProps)(Provider);
