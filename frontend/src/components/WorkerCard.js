import React, { Component } from 'react';
import { Row, Col, Modal, Input } from 'antd';

import './css/cards.css';
import axios from 'axios';

export class WorkerCard extends Component {
  state = {
    workers: [],
    visible: false,
    newName: '',
    newUserName: '',
    newPassword: ''
  };

  componentDidMount() {
    axios.get('http://localhost:8080/workers-all').then(res => {
      this.setState({
        workers: res.data.worker
      });
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    if (this.state.newAsset !== '') {
      axios
        .post('http://localhost:8080/add-worker', {
          name: this.state.newName,
          username: this.state.newUserName,
          password: this.state.newPassword
        })
        .then(res => {
          let workers = this.state.workers;
          workers.push({
            name: this.state.newName,
            username: this.state.newUserName,
            password: this.state.newPassword
          });
          this.setState({
            workers
          });
        });
      this.setState({
        visible: false
      });
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  updateNewName = e => {
    this.setState({ newName: e.target.value });
  };

  updateNewUserName = e => {
    this.setState({ newUserName: e.target.value });
  };

  updateNewPassword = e => {
    this.setState({ newPassword: e.target.value });
  };

  render() {
    return (
      <div className="cardContainer">
        <Row>
          <Col span={16}>
            <h1>Workers</h1>
          </Col>
          <Col span={8}>
            <img
              src={require('./img/add.png')}
              alt=""
              onClick={this.showModal}
            />
          </Col>
        </Row>
        <div className="cardListContainer">
          {this.state.workers.map(asset => (
            <h2>{asset.name}</h2>
          ))}
        </div>
        <Modal
          title="Add New Worker"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={this.updateNewName}
            placeholder="Name"
            style={{ marginBottom: '20px' }}
          />
          <Input
            onChange={this.updateNewUserName}
            placeholder="User Name"
            style={{ marginBottom: '20px' }}
          />
          <Input onChange={this.updateNewPassword} placeholder="Password" />
        </Modal>
      </div>
    );
  }
}

export default WorkerCard;
