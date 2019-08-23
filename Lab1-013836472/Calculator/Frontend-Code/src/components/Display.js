import React, { Component } from "react";
import "./main.css";
//import Display from './components/Display';
import axios from "axios";
// import cookie from 'react-cookies';
// import {Redirect} from 'react-router';

class Display extends Component {
  render() {
    return (
      <div className="answer">
        <h1>{this.props.a}</h1>
      </div>
    );
  }
}

export default Display;
