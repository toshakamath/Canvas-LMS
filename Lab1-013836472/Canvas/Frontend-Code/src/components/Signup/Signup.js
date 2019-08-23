import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
//import cookie from "react-cookies";
import { Redirect } from "react-router";

class Signup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      email: "",
      password: "",
      authFlag: false,
      t_flag: false,
      s_flag: false
    };
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
    this.submitTeacher = this.submitTeacher.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      t_flag: false,
      s_flag: false
    });
  }

  //username change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value
    });
  };
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value
    });
  };
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    });
  };
  submitStudent = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/student_signup", data)
      .then((response) => {
        console.log("Response : ", response);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
            s_flag: true,
            t_flag: false
          });
          // console.log("data from backend is: ", response);
          // //if response is something something then redirect
        } else {
          this.setState({
            authFlag: false,
            s_flag: false,
            t_flag: false
          });
        }
      });
  };

  submitTeacher = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/teacher_signup", data)
      .then((response) => {
        console.log("Response : ", response);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
            t_flag: true,
            s_flag: false
          });
        } else {
          this.setState({
            authFlag: false,
            t_flag: false,
            s_flag: false
          });
        }
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.authFlag === true && this.state.s_flag === true) {
      //if auth flag true and student sign up success
      redirectVar = <Redirect to="/login" />;
    } else if (this.state.authFlag === true && this.state.t_flag === true) {
      //if auth flag true and teacher sign up success
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <br />
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
              <img src="http://localhost:3001/uploads/sjsu_logo.png" />
                <h2>Sign Up</h2>
                <p>Please enter your name, email and password</p>
              </div>
              <form action="http://127.0.0.1:3000/signup" method="post">
                <div className="form-group">
                  <input
                    onChange={this.nameChangeHandler}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.passwordChangeHandler}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    required
                  />
                </div>
                <div>
                  <button
                    onClick={this.submitStudent}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Student Signup
                  </button>
                </div>
                <br />
                <div>
                  <button
                    onClick={this.submitTeacher}
                    className="btn btn-primary"
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

export default Signup;
