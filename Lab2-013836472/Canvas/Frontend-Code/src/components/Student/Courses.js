import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
// import Disp from "./Disp";
import { Link } from "react-router-dom";
import {displayCourses} from "../../actions/CoursesAction";
import {removeStudent} from "../../actions/PeopleAction";
import _ from "lodash";
import { connect } from "react-redux";

class Courses extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     coursedetails: []
  //   };
  // }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    const data = { email: email };
    console.log(data);
    this.props.displayCourses(data);
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios
    //   .post("http://localhost:3001/student/displaycourse", data)
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.setState({
    //       coursedetails: response.data
    //     });
    //   });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  // addCourses = (e) => {
  //   e.preventDefault();
  //   // this.props.history.push("/student/enrollment");
  // };
  dropCourse=(e)=>{
    e.preventDefault();
    //make a post request with the user data
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid = e.target.value;
    console.log(courseid);
    const data = { email: email, courseid:courseid };
    console.log(data);
    this.props.removeStudent(data);
    // axios.defaults.withCredentials = true;
    // axios
    //   .post("http://localhost:3001/student/dropcourse", data)
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.componentDidMount();
    //   });
    // student email, courseid
  }
  render() {
    console.log(this.props.courses.displaycourses);
    console.log();
    // console.log(details);
    let details = this.props.courses.displaycourses.map((course) => {
      return (
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
          <h5 className="card-title"><Link to={`/student/courses/${course.courseid}/home`}>{course.courseid}</Link></h5>
          <h6 className="card-subtitle mb-2 text-muted">{course.coursename} {course.coursedept}</h6>
          <p className="card-text">{course.coursedesc}</p>
          <p className="card-text">{course.courseroom} {course.courseterm}</p>
          <button onClick={this.dropCourse} value={course.courseid} className="btn btn-danger btn-sm">Drop {course.courseid}</button>
          {/* <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a> */}
        </div>
        </div>
      );
    });
var em = JSON.parse(localStorage.getItem("userdata")).email;
let type=localStorage.getItem("type");
    return (
      <div>
        <h2 className="text-center">Course Home</h2>
          <div className="container">
            <div className="card-deck">
              {details}
            </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { courses: state.courses };
}
export default connect(mapStateToProps, { displayCourses, removeStudent })(Courses);

