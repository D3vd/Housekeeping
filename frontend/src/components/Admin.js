import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './css/admin.css';
import AssetsCard from './AssetsCard';

export class Admin extends Component {
  render() {
    return (
      <div className="adminContainer">
        <h1>Hello, Admin!</h1>
        <Row>
          <Col lg={8}>
            <AssetsCard />
          </Col>
          <Col lg={8}>
            <AssetsCard />
          </Col>
          <Col lg={8}>
            <AssetsCard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
