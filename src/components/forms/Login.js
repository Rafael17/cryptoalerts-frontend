import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ls from 'local-storage';

class Login extends Component {

	state = {
		pass: "",
		user: ""
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleLogin(false);

		fetch('/api/users/session', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		})
			.then(response => response.json().then(data => ({ status: response.status, body: data })))
			.then((result) => {
				if (result.status != 200) {
					this.props.handleLogin(result.body.message);
				} else {
					ls.set('userData', result.body);
					this.props.history.push('/alerts');
				}
			})
	}

	render() {

		return (
			<div>
				<h2 style={{ marginBottom: 30, color: "#333" }}>LOGIN</h2>
				<form autoComplete="off" className="login-form" onSubmit={this.handleSubmit}>
					<div className="input-wrapper">
						<input
							className={this.state.user != "" ? "has-val" : undefined}
							type="text"
							onChange={this.handleChange}
							name="user"
							value={this.state.user}
						/>
						<span data-placeholder="Username"></span>
					</div>
					<div className="input-wrapper">
						<input
							className={this.state.pass != "" ? "has-val" : undefined}
							type="password"
							onChange={this.handleChange}
							name="pass"
							value={this.state.pass}
						/>
						<span data-placeholder="Password"></span>
					</div>
					<button style={{ marginTop: 60 }}>Sign In</button>
				</form>
			</div>
		)
	}
}

export default withRouter(Login);