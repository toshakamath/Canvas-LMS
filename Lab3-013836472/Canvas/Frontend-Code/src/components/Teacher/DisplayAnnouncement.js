import React, { Component } from "react";
import "../../App.css";
import {displayAnnouncement} from "../../actions/AnnouncementAction";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DisplayAnnouncement extends Component {
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid =((this.props.match||{}).params||{}).courseid;
    const data = { email: email, courseid:courseid };
    console.log(data);
    this.props.displayAnnouncement(data);
  }
  createAnnouncement = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/announcements/create`);
  };
  render() {
    console.log("blaaaaahhhhhh1; ", this.props.announcement);
      console.log("blaaaaahhhhhh2; ", this.props.announcement.displayannouncement);
    let details = this.props.announcement.displayannouncement.map((announcement) => {
      return (
        <tr>
          <td>
            <Link to="#">{announcement.title}</Link>
          </td>
          <td>
            <Link to="#">{announcement.description}</Link>
          </td>
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
function mapStateToProps(state) {
  return { announcement: state.announcement };
}
export default connect(mapStateToProps, { displayAnnouncement })(DisplayAnnouncement);
