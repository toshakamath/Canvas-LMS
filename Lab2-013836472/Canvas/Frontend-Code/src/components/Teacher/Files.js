import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { Link } from "react-router-dom";
class Announcements extends Component {
  render() {
    // let redirectVar = null;
    // if (!cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    //navbar id sidebar
    return (
      <div>
        <h1 className="text-center">Teacher Files</h1>
        <div id="content">
          
          <h3>
            <Link to="/teacher/files/upload">Upload a file</Link>
          </h3>
          <h3>
            <Link to="/teacher/files/display">Display Files</Link>
          </h3>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Announcements;
