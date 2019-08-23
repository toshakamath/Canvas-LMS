import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { Link } from "react-router-dom";
import CreateCourse from "./CreateCourse";
export default class Assignments extends Component {
  
  render() {
    return (
      /**<div>
        <Route path="/" component={MenubarTeacher} />
        <Route path="/home/courses" component={CoursesTeacher} />
        <Route path="/home/profile" component={ProfileTeacher} />
        <Route path="/home/dashboard" component={Courses} />
      </div> */
      <div>
        <h1 className="text-center">Teacher Assignments</h1>
        <div id="content">
          
          <h3>
            <Link to="/teacher/assignments/create">Create an assignment</Link>
          </h3>
          <h3>
            <Link to="/teacher/assignments/display">Display an assignment</Link>
          </h3>
        </div>
      </div>
    );
  }
}