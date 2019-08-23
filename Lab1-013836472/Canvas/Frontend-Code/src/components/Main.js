import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import Login from "./Login/Login";
//import Delete from "./Delete/Delete";
import Signup from "./Signup/Signup";
//import Menubar from "./LandingPage/Menubar";
import Student from "./Student/Student";
import Teacher from "./Teacher/Teacher";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/student" component={Student}/>
          <Route path="/teacher" component={Teacher}/>
        </Switch>
        </div>
    );
  }
}
//Export The Main Component
export default Main;
