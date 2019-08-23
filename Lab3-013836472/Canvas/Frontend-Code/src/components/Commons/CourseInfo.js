import React, { Component } from 'react'
import CourseList from '../LandingPage/CourseList';
import CourseDetails from './CourseDetails'
import { Route } from "react-router-dom";
import { Redirect ,Switch} from "react-router";
import DisplayAnnouncement from '../Teacher/DisplayAnnouncement';
import CreateAnnouncement from '../Teacher/CreateAnnouncement';
import DisplayAssignment from '../Teacher/DisplayAssignment';
import CreateAssignment from '../Teacher/CreateAssignment';
import FileUpload from '../Teacher/FileUpload';
import DisplayFiles from '../Teacher/DisplayFiles';
import People from '../Commons/People';
import SubmitAssignment from "../Student/SubmitAssignment";
import ViewAssignmentSubmissions from "../Teacher/ViewAssignmentSubmissions";
import SingleSubmission from '../Teacher/SingleSubmission';
import GiveQuiz from '../Student/GiveQuiz';
import Grades from '../Student/Grades';
import Quiz from '../Teacher/Quiz';
//import UploadAssignment from "../Student/UploadAssignment";

export default class CourseInfo extends Component {

  render() {
    console.log("Match",this.props.match)
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-2">
        <CourseList {...this.props}/>
        </div>
          <div className="col-md-10">
            <Switch>
                <Route path="/teacher/courses/:courseid/home" component={CourseDetails}/> 
                <Route path="/teacher/courses/:courseid/announcements/create" component={CreateAnnouncement}/> 
                <Route path="/teacher/courses/:courseid/announcements" component={DisplayAnnouncement}/> 
                <Route path="/teacher/courses/:courseid/assignments/create" component={CreateAssignment}/> 
                <Route path="/teacher/courses/:courseid/assignments/submissions/:assignmentid/display/:submissionid" component={SingleSubmission}/>
                <Route path="/teacher/courses/:courseid/assignments/submissions/:assignmentid" component={ViewAssignmentSubmissions}/>
                <Route path="/teacher/courses/:courseid/assignments" component={DisplayAssignment}/> 
                <Route path="/teacher/courses/:courseid/files/upload" component={FileUpload}/> 
                <Route path="/teacher/courses/:courseid/files" component={DisplayFiles}/> 
                <Route path="/teacher/courses/:courseid/people" component={People}/> 
                <Route path="/teacher/courses/:courseid/quiz" component={Quiz}/>
                <Route path="/student/courses/:courseid/home" component={CourseDetails}/>
                {/* <Route path="/student/courses/:courseid/announcements/create" component={CreateAnnouncement}/>  */}
                <Route path="/student/courses/:courseid/announcements" component={DisplayAnnouncement}/> 
                {/* <Route path="/student/courses/:courseid/assignments/create" component={CreateAssignment}/>  */}
                {/* <Route path="/student/courses/:courseid/assignments/submitassignment/:assignmentid/upload" component={UploadAssignment}/> */}
                <Route path="/student/courses/:courseid/assignments/submitassignment/:assignmentid" component={SubmitAssignment}/>
                <Route path="/student/courses/:courseid/assignments" component={DisplayAssignment}/> 
                <Route path="/student/courses/:courseid/files/upload" component={FileUpload}/> 
                <Route path="/student/courses/:courseid/files" component={DisplayFiles}/> 
                <Route path="/student/courses/:courseid/people" component={People}/> 
                <Route path="/student/courses/:courseid/grades" component={Grades}/> 
                <Route path="/student/courses/:courseid/quiz" component={GiveQuiz}/> 
            </Switch>
          </div>
      </div>
      </div>
    )
  }
}