import React, { Component } from 'react';

import 'antd/dist/antd.css';

import SignIn from './components/SignIn';

// import Home from './components/Home';

export class App extends Component {
  state = {
    signedIn: false,
    admin: false
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
          <h1>Hello</h1>
        ) : (
          <SignIn changeSignIn={this.changeSignIn} />
        )}
      </div>
    );
  }
}

export default App;
