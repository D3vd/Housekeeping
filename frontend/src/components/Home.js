import React, { Component } from 'react';

import Admin from './Admin';
import User from './User';

export class Home extends Component {
  render() {
    return <div>{this.props.admin ? <Admin /> : <User />}</div>;
  }
}

export default Home;
