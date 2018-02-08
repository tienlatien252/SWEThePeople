import React, { Component } from 'react';
import header from './assets/header.png'
import './App.css';

export default class RepresentativeDetails extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <img src={header} className="App-logo" alt="logo" />
          <h1 className="App-title">Representative Details</h1>
      </header>
      <p>{this.props.match.params.bioguideid}</p>

      </div>
    );
  }
}
