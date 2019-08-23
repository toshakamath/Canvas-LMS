import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
//import cookie from "react-cookies";
import { Redirect } from "react-router";
import { registerRequest,setRegisterValues } from "../../actions/AuthAction";
import _ from "lodash";
import { connect } from "react-redux";
import auth from "../../lib/auth"

class Signup extends Component {
  nameChangeHandler = (e) => {
    this.props.setRegisterValues({
      name: e.target.value
    })
  };
  emailChangeHandler = (e) => {
    this.props.setRegisterValues({
      email: e.target.value
    })
  };
  passwordChangeHandler = (e) => {
    this.props.setRegisterValues({
      password: e.target.value
    })
  };
  submitStudent = (e) => {
    e.preventDefault();
    const data = {
      name: this.props.authuser.name,
      email: this.props.authuser.email,
      password: this.props.authuser.password,
      type: "student"
    };
    this.props.registerRequest(data, this.props.history);
  };

  submitTeacher = (e) => {
    e.preventDefault();
    const data = {
      name: this.props.authuser.name,
      email: this.props.authuser.email,
      password: this.props.authuser.password,
      type: "teacher"
    };
    this.props.registerRequest(data, this.props.history);
  };

  render() {
    let res = auth();
    if(res == "teacher")
    this.props.history.push("/teacher/profile");
    if(res == "student")
      this.props.history.push("/student/profile");
    return (
      <div>
        <br />
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Sign Up</h2>
                <p>Please enter your name, email and password</p>
              </div>
              <form action="http://127.0.0.1:3000/signup" method="post">
                <div class="form-group">
                  <input
                    onChange={this.nameChangeHandler}
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    onChange={this.passwordChangeHandler}
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="password"
                    required
                  />
                </div>
                <div>
                  <button
                    onClick={this.submitStudent}
                    class="btn btn-primary"
                    type="submit"
                  >
                    Student Signup
                  </button>
                </div>
                <br />
                <div>
                  <button
                    onClick={this.submitTeacher}
                    class="btn btn-primary"
                    type="submit"
                  >
                    Teacher Signup
                  </button>
                </div>
              </form>
              <br />
              <p>
                If already signed up, please <a href="/login">login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { authuser: store.authuser };
}

export default connect(mapStateToProps, { registerRequest, setRegisterValues })(Signup);