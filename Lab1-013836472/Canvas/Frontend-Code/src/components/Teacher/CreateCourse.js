import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
class CreateCourse extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      courseID: "",
      courseName: "",
      courseDept: "",
      courseDesc: "",
      courseRoom: "",
      courseCapacity: "",
      waitlistCapacity: "",
      courseTerm: ""
      //   teacherdetails: {}
    };
    //Bind the handlers to this class
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitCreate = this.submitCreate.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  //   componentWillMount() {
  //     this.setState({
  //       authFlag: false
  //     });
  //   }

  //username change handler to update state variable with the text entered by the user
  onChangeHandler = (e) => {
    this.setState({
      //   teacherdetails: {
      //     [e.target.name]: e.target.value
      //   }
      [e.target.name]: e.target.value
    });
    //console.log(teacherdetails.state);
  };
  displayCourses = (e) => {
    e.preventDefault();
    this.props.history.push("/teacher/courses");
  };
  submitCreate = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(em);
    const data = {
      em: em,
      courseID: this.state.courseID,
      courseName: this.state.courseName,
      courseDept: this.state.courseDept,
      courseDesc: this.state.courseDesc,
      courseRoom: this.state.courseRoom,
      courseCapacity: this.state.courseCapacity,
      waitlistCapacity: this.state.waitlistCapacity,
      courseTerm: this.state.courseTerm
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/home/createcourse", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          //   this.setState({
          //     authFlag: true
          //   });
          this.props.history.push("/teacher/courses");
        } else {
          //   this.setState({
          //     authFlag: false
          //   });
          this.props.history.push("/teacher/courses/create");
        }
      });
  };
  //http://localhost:3000/home/http://localhost:3001/home/displaycourse
  //http://localhost:3000/home/http://localhost:3000/home/displaycourse
  render() {
    return (
      <div id="content">
        <h1>Fill the form to create a course</h1>
        <form method="post">
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseID"
              placeholder="courseID"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseName"
              placeholder="courseName"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseDept"
              placeholder="courseDept"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseDesc"
              placeholder="Course Desc"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseRoom"
              placeholder="Course Room"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseCapacity"
              placeholder="courseCapacity"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="waitlistCapacity"
              placeholder="waitlistCapacity"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="courseTerm"
              placeholder="courseTerm"
            />
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button
              onClick={this.submitCreate}
              className="btn btn-success"
              type="submit"
            >
              Create
            </button>
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button onClick={this.displayCourses} className="btn btn-success" type="submit">
              Display
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateCourse;
