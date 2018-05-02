
import React from 'react';
import NavBar from './components/NavBar';
import Canvas from '../../components/Canvas';
import { connect } from 'react-redux';
//import Paginator from './components/Paginator';
import { actionsCreator as aCsources } from '../../actions/sources';

const mapProps = (state) => ({
	file: state.sources.file,
	selected: state.sources.selected
});

class Home extends React.PureComponent {
	state = {
		selected: '',
		pages: []
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(aCsources.get())
			.then(() => {

			});
	}
	componentDidUpdate() {
		const { dispatch, selected } = this.props;
		if (selected === this.state.selected) return;
		if (!selected) return;
		this.setState({
			selected: selected
		});
		dispatch(aCsources.details(selected))
			.then((length) => {
				this.setState({
					pages: [{
						image: selected,
						page: 2
					}]
				});
			});
	}
	render() {
		const { file } = this.props;
		const { pages } = this.state;
		return (
			<React.Fragment>
				<NavBar />
				<div style={{ width: '100%', textAlign: 'center' }}>
					{pages.map((value, index) => {
						const images = [value.image];
						if (file !== null) {
							images.push(file);
						}
						return (
							<Canvas key={index} images={images} page={value.page} />
						)
					})}
				</div>
			</React.Fragment>
		);
	}
}

export default connect(mapProps)(Home);
