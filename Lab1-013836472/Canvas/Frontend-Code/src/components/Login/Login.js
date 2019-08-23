import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import auth from "../../lib/auth"

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      s_flag: false,
      t_flag: false
      // hideTeacher: false, //both should be visible
      // hideStudent: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitStudentLogin = this.submitStudentLogin.bind(this);
    this.submitTeacherLogin = this.submitTeacherLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      t_flag: false,
      s_flag: false
    });
  }
  // toggleHidden() {
  //   this.setState({
  //     hideTeacher: !this.state.hideTeacher,
  //     hideStudent: !this.state.hideStudent
  //   });
  // }
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitStudentLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    console.log("Inside Student Login");
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("Student: " + data.email);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/student_login", data).then((response) => {
      console.log(response.status);
      console.log("Data from backend : ", response.data.userdata);
      localStorage.setItem("userdata", JSON.stringify(response.data.userdata)); //storing userobj in ls
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);
      //PROFILE PAGE
      //var em = JSON.parse(localStorage.getItem("userdata")).email;

      // let userdata = localStorage.getItem("userdata");
      // let token = localStorage.getItem("token");
      // let type=localStorage.getItem("type");
      // let lsuserdata = JSON.parse(userdata);
      // // let lstoken = JSON.parse(token);
      // // let lstype = JSON.parse(type);
      // //var b = JSON.parse(a);
      // var lsemail = lsuserdata.email;
      // console.log("this is userdata", userdata); //string obj
      // console.log("this is lsuserdata", lsuserdata); //parsed obj
      // console.log("this is lsemail", lsemail); //email that was stored in ls
      // console.log("this is token", token); //string token
      // console.log("this is lstoken", lstoken); //parsed token
      // console.log("this is type", type);
      // console.log("this is lstype", lstype);
      // var decodedToken = jwt.decode(lstoken); //decoding token from response backend
      // console.log(decodedToken);
      // console.log("email: ", decodedToken.email);
      // if (decodedToken.email === lsemail) {
      //   console.log("yayyyy ghus gaye andar");
      // } else {
      //   console.log("shit lag gayi");
      // }
      if (response.status === 200) {
        // this.setState({
        //   authFlag: true,
        //   t_flag: false,
        //   s_flag: true
        // });
        console.log("redirecting..");
        this.props.history.push("/student/profile");
      } else {
        // this.setState({
        //   authFlag: false,
        //   t_flag: false,
        //   s_flag: false
        // });
        console.log("before alert");
        //alert.show(<div style={{ color: 'blue' }}>Some Message</div>)
        this.props.history.push("/login");
        console.log("after alert");
      }
    });     //.catch(e=>console.log("hello"));
  };
  submitTeacherLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    console.log("Inside Teacher Login");
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("Teacher: " + data.email);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/teacher_login", data).then((response) => {
      console.log("Data from backend : ", response.data.userdata);
      localStorage.setItem("userdata", JSON.stringify(response.data.userdata)); //storing userobj in ls
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);
      //PROFILE PAGE
      // let userdata = localStorage.getItem("userdata");
      // let token = localStorage.getItem("token");
      // let type=localStorage.getItem("type");
      // let lsuserdata = JSON.parse(userdata);
      // // let lstoken = JSON.parse(token);
      // // let lstype = JSON.parse(type);
      // //var b = JSON.parse(a);
      // var lsemail = lsuserdata.email;
      // console.log("this is userdata", userdata); //string obj
      // console.log("this is lsuserdata", lsuserdata); //parsed obj
      // console.log("this is lsemail", lsemail); //email that was stored in ls
      // console.log("this is token", token); //string token
      // console.log("this is lstoken", lstoken); //parsed token
      // console.log("this is type", type);
      // console.log("this is lstype", lstype);
      // var decodedToken = jwt.decode(lstoken); //decoding token from response backend
      // console.log(decodedToken);
      // console.log("email: ", decodedToken.email);
      // if (decodedToken.email === lsemail) {
      //   console.log("yayyyy ghus gaye andar");
      // } else {
      //   console.log("shit lag gayi");
      // }
      if (response.status === 200) {
        // this.setState({
        //   authFlag: true,
        //   t_flag: false,
        //   s_flag: true
        // });
        // this.props.history.push("/home");
        this.props.history.push("/teacher/profile");
      } else {
        // this.setState({
        //   authFlag: false,
        //   t_flag: false,
        //   s_flag: false
        // });
        this.props.history.push("/login");
      }
    });
  };
  render() {
    let res = auth();
    if(res === "teacher")
    this.props.history.push("/teacher/profile");
      // this.props.history.push("/home");
    if(res === "student")
      this.props.history.push("/student/profile");

    return (
      <div>
        {/* {redirectVar} */}
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
              <img src="http://localhost:3001/uploads/sjsu_logo.png" />
                <h2>Login</h2>
                <p>Please enter your email and password</p>
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
                  placeholder="Password"
                  required
                />
              </div>
              <button onClick={this.submitStudentLogin} className="btn btn-primary">
                Student Login
              </button>
              <br />
              <br />
              <button onClick={this.submitTeacherLogin} className="btn btn-primary">
                Teacher Login
              </button>
              <br />
              <br />
              <p>
                Not signed up yet? <a href="/Signup">Create Account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
