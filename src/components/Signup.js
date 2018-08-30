import React from 'react';
import { firebase } from '../utils/db';

const Signup = () => {
	return <div>Signup</div>;
};

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}
	render() {
		return (
			<form
				onSubmit={(event) => {
					event.preventDefault();
					firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
				}}
			>
				<input
					type="text"
					name="email"
					value={this.state.email}
					onChange={(event) => {
						this.setState({
							email: event.target.value
						});
					}}
				/>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={(event) => {
						this.setState({
							password: event.target.value
						});
					}}
				/>
				<button>LOGIN</button>
			</form>
		);
	}
}

export { Signup, Login };
