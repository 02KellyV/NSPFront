
import React from 'react';
import NavBar from '../../components/NavBar';
import {
	Form, Container, Alert,
	Row, Col, FormGroup, Label,
	Input, FormFeedback, Button,
	Card, CardBody, CardHeader,
	CardFooter
} from 'reactstrap';
import { Icon } from 'react-fa';
import { connect } from 'react-redux';
import { actionsCreator as aCsources } from '../../actions/auth';

const mapProps = (state) => ({

});

class SignIn extends React.PureComponent {
	state = {
		email: "",
		password: "",
		errors: {}
	}
	setOtherErrors = (errors) =>
		this.setState({
			errors: {
				others: errors
			}
		});
	handleSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(aCsources.signIn({
			"email": this.state.email,
			"password": this.state.password,
		}))
			.catch((err) => {
				if (Array.isArray(err.errors)) {
					this.setState({
						errors: err.errors
					});
				} else if (err) {
					this.setOtherErrors([err.errors]);
				} else {
					this.setOtherErrors([err.message]);
				}

			});
	}
	handleChange = ({ target: { name, value } }) =>
		this.setState({
			[name]: value,
			errors: {
				...this.state.errors,
				[name]: ''
			}
		});
	render() {
		const { errors } = this.state;
		const { others = [] } = errors;
		console.log(this.state)
		return (
			<div style={{ height: '100%', backgroundColor: '#F1ECE9' }}>
				<NavBar />
				<br />
				<br />
				<Container>
					<Row>
						<Col style={{ margin: '0 auto' }} md={{ size: 5 }}>
							<Form onSubmit={this.handleSubmit}>
								<Card>
									<CardHeader>
										<header>
											<h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
												Ingresa
											</h2>
										</header>
									</CardHeader>
									<CardBody>
										<FormGroup>
											<Label>Correo electronico</Label>
											<Input
												onChange={this.handleChange}
												type="email" name="email"
												value={this.state.email}
												invalid={!!errors.email} />
											<FormFeedback>
												{errors.email}
											</FormFeedback>
										</FormGroup>
										<FormGroup>
											<Label>Password</Label>
											<Input
												onChange={this.handleChange}
												type="password" name="password"
												value={this.state.password}
												invalid={!!errors.password} />
											<FormFeedback>
												{errors.password}
											</FormFeedback>
										</FormGroup>
										{others.map((value, index) => (
											<Alert color="danger" key={index}>
												{value}
											</Alert>
										))}
									</CardBody>
									<CardFooter>
										<Button color="default">
											<Icon name="sign-in" />&nbsp;
											Enviar
										</Button>
									</CardFooter>
								</Card>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default connect(mapProps)(SignIn);
