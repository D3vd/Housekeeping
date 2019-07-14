import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

import './css/signin.css';

export class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('http://localhost:8080/login', {
        username,
        password
      })
      .then(res => {
        this.props.changeSignIn(res.data.login, res.data.admin);
      });
  };

  changePassword = e => {
    this.setState({ password: e.target.value });
  };

  changeUsername = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <div className="signinContainer">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.changeUsername}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.changePassword}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SignIn;
