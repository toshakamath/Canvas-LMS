import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import auth from "../../lib/auth"
import { loginRequest,setLoginValues } from "../../actions/AuthAction";
import _ from "lodash";
import { connect } from "react-redux";
import {getLogin} from '../../queries/queries';
import { graphql, withApollo } from 'react-apollo';

//Define a Login Component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    }
}

  emailChangeHandler = (e) => {
    // this.props.setLoginValues({
    //   email: e.target.value
    // })
    this.setState({
      email: e.target.value
    })
  };
  passwordChangeHandler = (e) => {
    // this.props.setLoginValues({
    //   password: e.target.value
    // })
    this.setState({
      password: e.target.value
    })
  };
  onSubmit = (e) => {
    console.log("Inside Login");
    e.preventDefault();
    console.log(this.state);
      this.props.client.query({
        query: getLogin,
        variables:{
          email: this.state.email,
          password: this.state.password
        }
      }).then((response)=>{
        console.log('Response', response.data);
        // console.log('userdata', response.data.userlogin);
        // // localStorage.setItem("userdata", JSON.stringify(response.data.userdata)); //storing userobj in ls
        // //   localStorage.setItem("token", response.data.token);
        // //   localStorage.setItem("type", response.data.type);
        //   if(response.data.type=="student")
        //     this.props.history.push("/student/profile");
        //   else if(response.data.type=="teacher")
        //   this.props.history.push("/teacher/profile");
      }, (err)=>{
        console.log("sajhgckadjbsj", err);
      })
  };
  render() {
    let res = auth();
    if(res == "teacher")
    this.props.history.push("/teacher/profile");
      // this.props.history.push("/home");
    if(res == "student")
      this.props.history.push("/student/profile");
console.log("da",this.props.authuser)
    return (
      <div>
        {/* {redirectVar} */}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Login</h2>
                <p>Please enter your email and password</p>
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
                  placeholder="Password"
                  required
                />
              </div>
              {/* {
                !!this.props.authuser.error && <p style={{color:"#ff0000"}}>{this.props.authuser.error}</p>
              } */}
              <button onClick={this.onSubmit} class="btn btn-primary">
                Login
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
function mapStateToProps(state) {
  return { authuser: state.authuser };
}

// export default connect(mapStateToProps, { loginRequest, setLoginValues })(Login);

export default withApollo(Login);
