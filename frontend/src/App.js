import React, { Component } from 'react';

import 'antd/dist/antd.css';

import SignIn from './components/SignIn';
import Home from './components/Home';

export class App extends Component {
  state = {
    signedIn: true,
    admin: true
  };

  changeSignIn = (loggedIn, admin) => {
    this.setState({
      signedIn: loggedIn,
      admin: admin
    });
  };

  render() {
    return (
      <div>
        {this.state.signedIn ? (
          <Home admin={this.state.admin} />
        ) : (
          <SignIn changeSignIn={this.changeSignIn} />
        )}
      </div>
    );
  }
}

export default App;
