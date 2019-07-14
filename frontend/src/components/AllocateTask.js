import React, { Component } from 'react';
import { Modal, Input, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

import './css/allocate.css';

const { Option } = Select;

export class AllocateTask extends Component {
  state = {
    workers: [],
    tasks: [],
    visible: false,
    assetId: '',
    workerId: '',
    taskId: '',
    finishBy: ''
  };

  componentDidMount() {
    axios.get('http://localhost:8080/tasks-all').then(res => {
      this.setState({
        tasks: res.data.task
      });
    });

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
    axios.post('http://localhost:8080/allocate-task', {
      assetId: this.state.assetId,
      taskId: this.state.taskId,
      workerId: this.state.workerId,
      timeOfAllocation: moment().format(),
      taskToBePerformedBy: this.state.finishBy
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

  onTaskChange = value => {
    this.setState({
      taskId: value
    });
  };

  onWorkerChange = value => {
    this.setState({
      workerId: value
    });
  };

  updateFinishBy = e => {
    this.setState({
      finishBy: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="allocateBtn" onClick={this.showModal}>
          Allocate Task
        </div>
        <Modal
          title="Allocate Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select
            showSearch
            style={{ width: 200, marginBottom: '20px', marginRight: '20px' }}
            placeholder="Select an Task"
            optionFilterProp="children"
            onChange={this.onTaskChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.tasks.map(tasks => (
              <Option value={tasks.taskId}>{tasks.name}</Option>
            ))}
          </Select>

          <Select
            showSearch
            style={{ width: 200, marginBottom: '20px' }}
            placeholder="Select an Worker"
            optionFilterProp="children"
            onChange={this.onWorkerChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.workers.map(worker => (
              <Option value={worker.workerId}>{worker.name}</Option>
            ))}
          </Select>

          <Input placeholder="Finish By" onChange={this.updateFinishBy} />
        </Modal>
      </div>
    );
  }
}

export default AllocateTask;
