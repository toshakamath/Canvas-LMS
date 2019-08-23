import React, { Component } from 'react';
import {Link} from "react-router-dom";
import auth from "../../lib/auth";

export default class CourseList extends Component {
  render() {
    let courseid =((this.props.match||{}).params||{}).courseid;
    console.log("MATCH ",courseid)

    let res = auth();   //will return teacher or student according to type that ios logged in
    console.log("RES: ",res);
        if(res === "teacher")    //returning whether teacher is logged in
          {
    return (
    <div className="list-group" id="myList" role="tablist" style={{paddingTop:"4px", marginLeft:"-40px", width:"95%"}}>
      <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/home`}>Course Info</Link>
      <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/announcements`}>Announcements</Link>
      <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/assignments`}>Assignments</Link>
      <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/files`}>Files</Link>
      <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/people`}>People</Link>
      {/* <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/quiz`}>Quiz</Link> */}
      {/* <Link className="list-group-item list-group-item-action" to={`/teacher/courses/${courseid}/grades`}>Grades</Link> */}    
    </div>
    )
    }
        else if(res === "student"){
          return (
            <div className="list-group" id="myList" role="tablist" style={{paddingTop:"4px", marginLeft:"-40px", width:"95%"}}>
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/home`}>Course Info</Link>
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/announcements`}>Announcements</Link>
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/assignments`}>Assignments</Link>
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/files`}>Files</Link>
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/people`}>People</Link>
              {/* <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/quiz`}>Quiz</Link> */}
              <Link className="list-group-item list-group-item-action" to={`/student/courses/${courseid}/grades`}>Grades</Link>
        </div>
        )
    }
  }
}
