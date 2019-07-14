import React, { Component } from 'react';

import 'antd/dist/antd.css';
import './index.css';

import SignIn from './components/SignIn';
import Home from './components/Home';

export class App extends Component {
  state = {
    signedIn: false,
    admin: false,
    userId: ''
  };

  changeSignIn = (loggedIn, admin, id) => {
    this.setState({
      signedIn: loggedIn,
      admin: admin,
      userId: id
    });
  };

  render() {
    return (
      <div>
        {this.state.signedIn ? (
          <Home admin={this.state.admin} id={this.state.userId} />
        ) : (
          <SignIn changeSignIn={this.changeSignIn} />
        )}
      </div>
    );
  }
}

export default App;
