import React, { Component } from 'react';
import { Row, Col, Modal, Input, Select } from 'antd';

import './css/cards.css';
import axios from 'axios';

const { Option } = Select;
export class TaskCard extends Component {
  state = {
    tasks: [],
    visible: false,
    newTaskName: '',
    assets: [],
    asset: '',
    frequency: ''
  };

  componentDidMount() {
    axios.get('http://localhost:8080/tasks-all').then(res => {
      this.setState({
        tasks: res.data.task
      });
    });

    axios.get('http://localhost:8080/assets-all').then(res => {
      this.setState({
        assets: res.data.assets
      });
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    axios
      .post('http://localhost:8080/add-task', {
        name: this.state.newTaskName,
        assetId: this.state.asset,
        frequency: this.state.frequency
      })
      .then(res => {
        let tasks = this.state.tasks;
        tasks.push({
          name: this.state.newTaskName,
          assetId: this.state.asset,
          frequency: this.state.frequency
        });
        this.setState({
          tasks
        });
      });
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  onChange = value => {
    this.setState({
      asset: value
    });
  };

  updateNewTaskName = e => {
    this.setState({ newTaskName: e.target.value });
  };

  updateFrequency = e => {
    this.setState({ frequency: e.target.value });
  };

  render() {
    return (
      <div className="cardContainer">
        <Row>
          <Col span={16}>
            <h1>Tasks</h1>
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
          {this.state.tasks.map(task => (
            <h2>
              {task.name}: {task.asset} -- {task.frequency}
            </h2>
          ))}
        </div>
        <Modal
          title="Add New Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder="Task Name"
            onChange={this.updateNewTaskName}
            style={{ marginBottom: '20px' }}
          />

          <Select
            showSearch
            style={{ width: 200, marginBottom: '20px' }}
            placeholder="Select an Asset"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.assets.map(asset => (
              <Option value={asset.assetId}>{asset.name}</Option>
            ))}
          </Select>

          <Input placeholder="Frequency" onChange={this.updateFrequency} />
        </Modal>
      </div>
    );
  }
}

export default TaskCard;
