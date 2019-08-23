import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { Link } from "react-router-dom";
class TeacherAnnouncements extends Component {
  render() {
    // let redirectVar = null;
    // if (!cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/login" />;
    // }
    //navbar id sidebar
    return (
      <div>
        <div id="content">
          <h1>Teacher Announcement</h1>
          <h3>
            <Link to="/home/createannouncement">Create an Announcement</Link>
          </h3>
          <h3>
            <Link to="/home/displayannouncement">Display Announcements</Link>
          </h3>
        </div>
      </div>
    );
  }
}
//export Home Component
export default TeacherAnnouncements;
