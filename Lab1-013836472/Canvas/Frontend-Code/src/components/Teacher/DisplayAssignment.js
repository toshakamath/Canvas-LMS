import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class DisplayAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentdetails: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid =((this.props.match||{}).params||{}).courseid;
    console.log(courseid);
    const data = { email: email , courseid:courseid};
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/home/displayassignment", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        this.setState({
          assignmentdetails: response.data
        });
      });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  createAssignments = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/assignments/create`);
  };
  render() {
    let type=localStorage.getItem("type");
    let courseid =((this.props.match||{}).params||{}).courseid;
    // let d=this.state.assignmentdetails.map((i)=>{
    //   return new Date(i.duedate).toLocaleString();
    // })
    // console.log("CHECK THIS OUT: ",d)
    let details = this.state.assignmentdetails.map((assignment) => {
//{`/teacher/courses/${course.courseid}/home`}
      if(type === "teacher"){
        return <tr>
        <td>
          <Link to={`/teacher/courses/${courseid}/assignments/submissions/${assignment.assignmentid}`}>{assignment.assignmenttitle}</Link>
        </td>
        <td>
          <Link to={`/teacher/courses/${courseid}/assignments/submissions/${assignment.assignmentid}`}>{assignment.assignmentdesc}</Link>
        </td>
        <td>
          <Link to={`/teacher/courses/${courseid}/assignments/submissions/${assignment.assignmentid}`}>{new Date(assignment.duedate).toLocaleString()}</Link>
        </td>
        <td>
          <Link to={`/teacher/courses/${courseid}/assignments/submissions/${assignment.assignmentid}`}>{assignment.points}</Link>
        </td>
        </tr>
      }
      if(type==="student"){
        return <tr>
          <td>
            <Link to={`/student/courses/${courseid}/assignments/submitassignment/${assignment.assignmentid}`}>{assignment.assignmenttitle}</Link>
          </td>
          <td>
            <Link to={`/student/courses/${courseid}/assignments/submitassignment/${assignment.assignmentid}`}>{assignment.assignmentdesc}</Link>
          </td>
          <td>
            <Link to={`/student/courses/${courseid}/assignments/submitassignment/${assignment.assignmentid}`}>{new Date(assignment.duedate).toLocaleString()}</Link>
          </td>
          <td>
            <Link to={`/student/courses/${courseid}/assignments/submitassignment/${assignment.assignmentid}`}>{assignment.points}</Link>
        </td>
          </tr>
      }
    });
    
    return (
      <div id="content">
        <div className="container">
          <h2>List of Assignments</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
                <th>Due Date</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Table row based on data recieved*/}
              {details}
            </tbody>
          </table>
          {type==="teacher"?
              <div style={{ width: "30%" }}>
                <button
                  onClick={this.createAssignments}
                  className="btn btn-success"
                  type="submit"
                >
                  Create Assignments
                </button>
              </div>
              :<div></div>
              }
        </div>
      </div>
    );
  }
}
//export Home Component
export default DisplayAssignment;
