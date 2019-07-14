import React, { Component } from 'react';
import { Row, Col, Modal, Input } from 'antd';

import './css/cards.css';
import axios from 'axios';

export class AssetsCard extends Component {
  state = {
    assets: [],
    visible: false,
    newAsset: ''
  };

  componentDidMount() {
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
      .post('http://localhost:8080/add-asset', {
        name: this.state.newAsset
      })
      .then(res => {
        let assets = this.state.assets;
        assets.push({
          name: this.state.newAsset
        });
        this.setState({
          assets,
          newAsset: ''
        });
      });
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log('cancel');
    this.setState({
      visible: false
    });
  };

  updateNewAsset = e => {
    this.setState({ newAsset: e.target.value });
  };

  render() {
    return (
      <div className="cardContainer">
        <Row>
          <Col span={16}>
            <h1>Assets</h1>
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
          {this.state.assets.map(asset => (
            <h2>{asset.name}</h2>
          ))}
        </div>
        <Modal
          title="Add New Asset"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input onChange={this.updateNewAsset} />
        </Modal>
      </div>
    );
  }
}

export default AssetsCard;
