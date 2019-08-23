import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {ROOT_URL} from '../../lib/constants';

class DisplayCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursedetails: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    const data = { email: email };
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(`${ROOT_URL}/home/displaycourse`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        this.setState({
          coursedetails: this.state.coursedetails.concat(response.data)
        });
      });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  goBack = (e) => {
    e.preventDefault();
    this.props.history.push("/teacher/courses");
  };
  //   trial = () => {
  //     const email = JSON.parse(localStorage.getItem("userdata")).email;
  //     console.log(email);
  //     const data = { email: email };
  //     console.log(data);
  //     axios.defaults.withCredentials = true;
  //     //make a post request with the user data
  //     axios
  //       .post("http://localhost:3001/home/displaycourse", data)
  //       .then((response) => {
  //         console.log("Status Code : ", response.status);
  //         console.log("Data from node : ", response.data);
  //         this.setState({
  //           coursedetails: this.state.coursedetails.concat(response.data)
  //         });
  //       });
  render() {
    let details = this.state.coursedetails.map((course) => {
      return (
        <tr>
          <td>{course.courseid}</td>
          <td>{course.coursename}</td>
          <td>{course.coursedept}</td>
          <td>{course.coursedesc}</td>
          <td>{course.courseroom}</td>
          <td>{course.coursecapacity}</td>
          <td>{course.waitlistcapacity}</td>
          <td>{course.courseterm}</td>
        </tr>
      );
    });
    return (
      <div id="content">
        <div className="container">
          <h2>List of Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Dept</th>
                <th>Course Desc</th>
                <th>Course Room</th>
                <th>Course Capacity</th>
                <th>Waitlist Capacity</th>
                <th>Course Term</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Table row based on data recieved*/}
              {details}
              <div style={{ width: "30%" }}>
                <button
                  onClick={this.goBack}
                  className="btn btn-success"
                  type="submit"
                >
                  Main Screen
                </button>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default DisplayCourse;
