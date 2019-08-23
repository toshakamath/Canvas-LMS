import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { Link } from "react-router-dom";
import {createAssignment, setAssignment} from "../../actions/AssignmentAction";
import _ from "lodash";
import { connect } from "react-redux";

class CreateAssignment extends Component {
  // constructor(props) {
  //   //Call the constructor of Super class i.e The Component
  //   super(props);
  //   //maintain the state required for this component
  //   this.state = {
  //     assignmenttitle: "",
  //     assignmentdesc: "",
  //     duedate:"",
  //     points:""
  //   };
  //   //Bind the handlers to this class
  //   this.onChangeHandler = this.onChangeHandler.bind(this);
  //   this.submitCreate = this.submitCreate.bind(this);
  //   this.displayAssignments = this.displayAssignments.bind(this);
  // }
  //username change handler to update state variable with the text entered by the user
  onChangeHandler = (e) => {
    this.props.setAssignment({
      [e.target.name]: e.target.value
    });
  };
  displayAssignments = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/assignments`);
  };
  submitCreate = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    console.log("inside submitcreate");
    e.preventDefault();
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(em);
    const data = {
      em: em,
      assignmenttitle: this.props.assignmentdetails.setassignment.assignmenttitle,
      assignmentdesc: this.props.assignmentdetails.setassignment.assignmentdesc,
      duedate: this.props.assignmentdetails.setassignment.duedate,
      points:this.props.assignmentdetails.setassignment.points,
      courseid:courseid
    };
    console.log(data);
    this.props.createAssignment(data, this.props.history);
    // axios.defaults.withCredentials = true;
    // axios
    //   .post("http://localhost:3001/home/createassignment", data)
    //   .then((response) => {
    //     let courseid =((this.props.match||{}).params||{}).courseid;
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       this.props.history.push(`/teacher/courses/${courseid}/assignments`);
    //     } else {
    //       this.props.history.push(`/teacher/courses/${courseid}/assignments/create`);
    //     }
    //   });
  };
  render() {
    console.log("this.props.assignmentdetails", this.props.assignmentdetails);
    return (
      <div id="content">
        <h1>Fill the form to create an assignment</h1>
        <form method="post">
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="assignmenttitle"
              placeholder="assignmenttitle"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <textarea
              rows="4"
              cols="50"
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="assignmentdesc"
              placeholder="assignmentdesc"
            />
          </div>
          <br/>
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="datetime-local"
              className="form-control"
              name="duedate"
              placeholder="duedate"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="number"
              className="form-control"
              name="points"
              placeholder="points"
            />
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button
              onClick={this.submitCreate}
              className="btn btn-success"
              type="submit"
            >
              Create
            </button>
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button onClick={this.displayAssignments} className="btn btn-success" type="submit">
              Display All Assignments
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { assignmentdetails: state.assignmentdetails };
}
export default connect(mapStateToProps, { createAssignment, setAssignment })(CreateAssignment);

