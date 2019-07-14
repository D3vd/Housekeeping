import React, { Component } from 'react';

import Admin from './Admin';
import Worker from './Worker';

export class Home extends Component {
  render() {
    return (
      <div>{this.props.admin ? <Admin /> : <Worker id={this.props.id} />}</div>
    );
  }
}

export default Home;
