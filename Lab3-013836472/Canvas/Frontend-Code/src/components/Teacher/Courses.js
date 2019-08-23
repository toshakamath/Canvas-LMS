import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { Link } from "react-router-dom";
import CreateCourse from "./CreateCourse";
class Courses extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     teacherdetails: {}
  //     //pointerEvents: "none"
  //   };
  // }
  // //get the books data from backend
  // componentDidMount() {
  //   console.log("inside componentDidMount");
  //   var userdata = JSON.parse(localStorage.getItem("userdata")).email;
  //   console.log("email: ", userdata);
  //   // let data = {
  //   //   email: user_email
  //   // };
  //   // console.log("sending data ", data);

  //   axios.get("http://localhost:3001/home/dashboard").then((response) => {
  //     //update the state with the response data
  //     this.setState({
  //       teacherdetails: this.state.teacherdetails.concat(response.data)
  //     });
  //   });
  // }
  // //   axios({
  // //     method: "get",
  // //     url: "http://localhost:3001/auth/studentprofile_display",
  // //     params: data,
  // //     headers: {
  // //       "Content-type": "text/json"
  // //     }
  // //   }).then((response) => {
  // //     //update the state with the response data
  // //     console.log("data ", response.data);
  // //     console.log("resulttt ", response.data.result);

  // //     this.setState({
  // //       student: response.data.result
  // //     });
  // //   });
  // // }

  // updatestudentprofile = () => {
  //   var student_name,
  //     element = document.getElementById("Studentname");
  //   if (element != null) {
  //     student_name = element.value;
  //     console.log("value in student" + student_name);
  //   } else {
  //     student_name = null;
  //   }
  // };

  // getdisabled = () => {
  //   return { pointerEvents: this.state.pointerEvents };
  // };

  // enable = () => {
  //   this.setState({ pointerEvents: "auto" });
  // };

  render() {
    return (
      /**<div>
        <Route path="/" component={MenubarTeacher} />
        <Route path="/home/courses" component={CoursesTeacher} />
        <Route path="/home/profile" component={ProfileTeacher} />
        <Route path="/home/dashboard" component={Courses} />
      </div> */
      <div>
        <h1 className="text-center">Teacher Courses</h1>
        <div id="content">
          
          <h3>
            <Link to="/teacher/courses/create">Create a course</Link>
          </h3>
          <h3>
            <Link to="/teacher/courses/display">Display courses</Link>
          </h3>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Courses;
