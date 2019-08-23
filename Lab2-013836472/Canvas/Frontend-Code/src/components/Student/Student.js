import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import Courses from "./Courses";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import auth from "../../lib/auth"
import {Switch} from "react-router-dom";
import Enrollment from "./Enrollment";
import CourseHome from "../Teacher/CourseHome";
import CourseInfo from "../Commons/CourseInfo";
import Inbox from "../Commons/Inbox";
import ConversationsList from "../Commons/ConversationsRoute";
import ConversationsRoute from "../Commons/ConversationsRoute";

export default class Student extends Component {
    render() {
        
        let res = auth();   //will return teacher or student according to type that ios logged in
        if(res === "teacher")    //returning whether teacher is logged in
          this.props.history.push("/teacher/profile");
        else if(res !== "student")
          this.props.history.push("/login");
        //student home dont add content and set dashboad as active
        return (
         
        <div className="row">
            <div className="col-2">
                <Menubar/>
            </div>
            <div className="col-10" style={{marginTop:'70px'}}>
            <Switch>
                <Route path="/student/courses/:courseid" component={CourseInfo} /> 
                <Route path="/student/courses" component={Courses} />
                <Route path="/student/profile/edit" component={EditProfile}/>
                <Route path="/student/profile" component={Profile} />
                <Route path="/student/enrollment" component={Enrollment} />
                <Route path="/student/inbox" component={ConversationsRoute} />
            </Switch>
            </div>
        </div>
            // {/* <Route path="/" component={Menubar} /> */}
            // {/* <Route path="/studenthome/profile" component={Profile} />
            // <Route path="/studenthome/courses" component={Courses} />
            // <Route path="/studenthome/dashboard" component={Dashboard} />
            // <Route
            //   path="/studenthome/editstudentprofile"
            //   component={EditStudentProfile}
            // /> */}
            
            // {/* <div id="studentcontent">
            //   <h2>hey thiis is student home</h2>
            // </div> */}
            
        );
      }
}
