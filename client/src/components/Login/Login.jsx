import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  validateEntry() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/user/login',
      querystring.stringify({
        email: this.state.email,
        password: this.state.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        this.props.history.push('/account'); // After successful login, redirect to numbers page
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            bsSize="large"
            disabled={!this.validateEntry()}
            type="submit"
          >Login
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
