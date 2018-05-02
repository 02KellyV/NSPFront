
import React from 'react';
import NavBar from '../../components/NavBar';
import {
	Form, Container, Alert,
	Row, Col, FormGroup, Label,
	Input, FormFeedback, Button,
	Card, CardBody, CardHeader,
	CardFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import { actionsCreator as aCsources } from '../../actions/auth';

const mapProps = (state) => ({

});


class SignUp extends React.PureComponent {

	state = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirm: "",
		errors: {}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { errors } = this.state;
		if (this.state.password !== this.state.password_confirm) {
			this.setState({
				errors: {
					password_confirm: "Debes confirmar la contraseña",
					...errors
				}
			});
		}
		const data = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password
		};
		dispatch(aCsources.signUp(data))
			.catch((err) => {
				if (err.errors) {
					this.setState({
						errors: err.errors
					});
					return
				}
				this.setState({
					errors: {
						others: [
							err.message
						]
					}
				});
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
												Registrate
											</h2>
										</header>
									</CardHeader>
									<CardBody>
										<FormGroup row>
											<Col>
												<Label>Nombres</Label>
												<Input
													onChange={this.handleChange}
													type="text" name="first_name"
													value={this.state.first_name}
													invalid={!!errors.first_name} />
												<FormFeedback>
													{errors.first_name}
												</FormFeedback>
											</Col>
											<Col>
												<Label>Apellidos</Label>
												<Input
													onChange={this.handleChange}
													type="text" name="last_name"
													value={this.state.last_name}
													invalid={!!errors.last_name} />
												<FormFeedback>
													{errors.last_name}
												</FormFeedback>
											</Col>
										</FormGroup>

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
										<FormGroup row>
											<Col>
												<Label>Password</Label>
												<Input
													onChange={this.handleChange}
													type="password" name="password"
													value={this.state.password}
													invalid={!!errors.password} />
												<FormFeedback>
													{errors.password}
												</FormFeedback>
											</Col>
											<Col>
												<Label>Confirmar</Label>
												<Input
													onChange={this.handleChange}
													type="password" name="password_confirm"
													value={this.state.password_confirm}
													invalid={!!errors.password_confirm} />
												<FormFeedback>
													{errors.password}
												</FormFeedback>
											</Col>
										</FormGroup>
										{others.map((value, index) => (
											<Alert color="danger" key={index}>
												{value}
											</Alert>
										))}
									</CardBody>
									<CardFooter>
										<Button color="default">
											<Icon name="user-plus" />&nbsp;
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

export default connect(mapProps)(SignUp);
