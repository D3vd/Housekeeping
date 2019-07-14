import React, { Component } from 'react';
import axios from 'axios';

import './css/worker.css';

export class Worker extends Component {
  state = {
    worker: {}
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/get-tasks-for-worker/${this.props.id}`)
      .then(res => {
        this.setState({
          worker: res.data.worker
        });
      });
  }

  render() {
    return (
      <div className="workerContainer">
        <h1>Hello, {this.state.worker.name}!</h1>
        <div className="tasksContainer">
          {/* {this.state.worker.tasks.length === 0 ? (
            <div>No Tasks For Now</div>
          ) : (
            <div>{this.state.worker.tasks.length} Tasks Pending..</div>
          )} */}
        </div>
      </div>
    );
  }
}

export default Worker;
