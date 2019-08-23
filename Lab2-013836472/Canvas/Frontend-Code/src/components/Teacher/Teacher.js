import React, { Component } from "react";
import "../../App.css";
import { Redirect ,Switch} from "react-router";
import { Route } from "react-router-dom";
import MenubarTeacher from "../LandingPage/MenubarTeacher";
import ProfileTeacher from "./ProfileTeacher";
import ProfileTeacherEdit from './ProfileTeacherEdit'
import CourseList from "../LandingPage/CourseList"
import Assignments from "./Assignments"
import CreateCourse from "./CreateCourse";
import DisplayCourse from "./DisplayCourse";
import CreateAssignment from "./CreateAssignment";
import DisplayAssignment from "./DisplayAssignment";
import Announcements from "./Announcements"
import CreateAnnouncement from "./CreateAnnouncement";
import DisplayAnnouncement from "./DisplayAnnouncement";
import FileUpload from "./FileUpload";
import Files from "./Files"
import DisplayFiles from "./DisplayFiles";
import auth from "../../lib/auth"
import CourseHome from "./CourseHome"
import Disp from "./Disp";
import Courses from "./Courses";
import CourseInfo from "../Commons/CourseInfo";
import EditProfile from "../Student/EditProfile";
import Profile from "../Student/Profile";
import Inbox from "../Commons/Inbox";
import ConversationsRoute from "../Commons/ConversationsRoute";

export default class Teacher extends Component {
    render() {
        let res = auth(); 
        console.log("auth value ",res)  //will return teacher or student according to type that ios logged in
        if(res === "student")    //returning whether teacher is logged in
          this.props.history.push("/student/profile");
        else if(res !== "teacher")
            this.props.history.push("/login");
        return (
            <div className="row">
                <div className="col-2">
                    <MenubarTeacher/>
                </div>
                <div className="col-10"  style={{marginTop:'70px'}}>
                <Switch>
                    <Route path="/teacher/courses/create" component={CreateCourse}/>
                     <Route path="/teacher/courses/:courseid" component={CourseInfo} /> 
                    <Route path="/teacher/courses" component={CourseHome}/>
                    <Route path="/teacher/profile/edit" component={EditProfile} />
                    <Route path="/teacher/profile" component={Profile} />
                    <Route path="/teacher/inbox" component={ConversationsRoute} />
                </Switch>
                </div>
            </div>
        );
      }
}
