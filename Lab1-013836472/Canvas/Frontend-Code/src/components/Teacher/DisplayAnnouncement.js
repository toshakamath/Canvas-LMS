import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class DisplayAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementdetails: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid =((this.props.match||{}).params||{}).courseid;
    const data = { email: email, courseid:courseid };
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/home/displayannouncement", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        this.setState({
          announcementdetails: this.state.announcementdetails.concat(
            response.data
          )
        });
      });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  createAnnouncement = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/announcements/create`);
  };
  //   trial = () => {
  //     const email = JSON.parse(localStorage.getItem("userdata")).email;
  //     console.log(email);
  //     const data = { email: email };
  //     console.log(data);
  //     axios.defaults.withCredentials = true;
  //     //make a post request with the user data
  //     axios
  //       .post("http://localhost:3001/home/displaycourse", data)
  //       .then((response) => {
  //         console.log("Status Code : ", response.status);
  //         console.log("Data from node : ", response.data);
  //         this.setState({
  //           coursedetails: this.state.coursedetails.concat(response.data)
  //         });
  //       });
  render() {
    let details = this.state.announcementdetails.map((announcement) => {
      return (
        <tr>
          <td>
            <Link to="#">{announcement.announcementtitle}</Link>
          </td>
          <td>
            <Link to="#">{announcement.announcementdesc}</Link>
          </td>
          {/* <td>{assignment.assignmenttitle}</td>
          <td>{assignment.assignmentdesc}</td> */}
          {/* <td>{course.coursedept}</td>
          <td>{course.coursedesc}</td>
          <td>{course.courseroom}</td>
          <td>{course.coursecapacity}</td>
          <td>{course.waitlistcapacity}</td>
          <td>{course.courseterm}</td> */}
        </tr>
      );
    });
    let type=localStorage.getItem("type");
    return (
      <div id="content">
        <div className="container">
          <h2>List of Announcements</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Announcement Title</th>
                <th>Announcement Description</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Table row based on data recieved*/}
              {details}
              {type==="teacher"?
              <div style={{ width: "30%" }}>
                <button
                  onClick={this.createAnnouncement}
                  className="btn btn-success"
                  type="submit"
                >
                  Create Announcement
                </button>
              </div>
              :<div></div>
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default DisplayAnnouncement;
