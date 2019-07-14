import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './css/admin.css';
import AssetsCard from './AssetsCard';
import TaskCard from './TaskCard';
import WorkerCard from './WorkerCard';
import AllocateTask from './AllocateTask';

export class Admin extends Component {
  render() {
    return (
      <div className="adminContainer">
        <h1>Hello, Admin!</h1>
        <Row className="mainCards">
          <Col lg={8}>
            <AssetsCard />
          </Col>
          <Col lg={8}>
            <TaskCard />
          </Col>
          <Col lg={8}>
            <WorkerCard />
          </Col>
        </Row>
        <AllocateTask />
      </div>
    );
  }
}

export default Admin;
