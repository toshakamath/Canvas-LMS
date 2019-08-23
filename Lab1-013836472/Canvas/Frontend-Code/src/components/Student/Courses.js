import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
// import Disp from "./Disp";
import { Link } from "react-router-dom";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursedetails: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    const data = { email: email };
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/student/displaycourse", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        this.setState({
          coursedetails: this.state.coursedetails.concat(response.data)
        });
      });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  addCourses = (e) => {
    e.preventDefault();
    // this.props.history.push("/student/enrollment");
  };
  dropCourse=(e)=>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid = e.target.value;
    console.log(courseid);
    const data = { email: email, courseid:courseid };
    console.log(data);
    axios
      .post("http://localhost:3001/student/dropcourse", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        
      });
    // student email, courseid
  }
  render() {
    console.log(this.state.coursedetails);
    console.log();
    // console.log(details);
    let details = this.state.coursedetails.map((course) => {
      return (
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
          <h5 className="card-title"><Link to={`/student/courses/${course.courseid}/home`}>{course.courseid}</Link></h5>
          <h6 className="card-subtitle mb-2 text-muted">{course.coursename} {course.coursedept}</h6>
          <p className="card-text">{course.coursedesc}</p>
          <p className="card-text">{course.courseroom} {course.courseterm}</p>
          <button onClick={this.dropCourse} value={course.courseid} className="btn btn-danger btn-sm">Drop {course.courseid}</button>
          {/* <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a> */}
        </div>
        </div>
      );
    });
var em = JSON.parse(localStorage.getItem("userdata")).email;
let type=localStorage.getItem("type");
    return (
      <div>
        <h2 className="text-center">Course Home</h2>
      <div className="container">

          {/* <div className="col-md-4">
              <CourseList/>
          </div>
          <div className="col-md-8">
          <Switch>
              <Route path="/teacher/coursehome/disp" component={Disp}/>
          </Switch>
          </div> */}
          {/**kyuki student ko add courses button nhi dikhna chahiye,, teacher ko dikhna chahiye */}
          {type==="teacher"?
          <div style={{ float:"right"}}>
          <button onClick={this.addCourses} className="btn btn-success" type="submit">
            Add Courses
          </button>
        </div>
        :<div></div>
        }
          <div className="card-deck">
        {details}
      </div>
    </div>
    </div>
    )
  }
}
