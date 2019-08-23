import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import {createAnnouncement, setAnnouncement} from "../../actions/AnnouncementAction";
import _ from "lodash";
import { connect } from "react-redux";

class CreateAnnouncement extends Component {
  onChangeHandler = (e) => {
    this.props.setAnnouncement({
      [e.target.name]: e.target.value
    });
  };
  displayAnnouncements = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/announcements`);
  };
  submitCreate = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    let courseid =((this.props.match||{}).params||{}).courseid;
    console.log("inside submitcreate");
    e.preventDefault();
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(em);
    const data = {
      em: em,
      announcementtitle: this.props.announcement.setannouncement.announcementtitle,
      announcementdesc: this.props.announcement.setannouncement.announcementdesc,
      courseid:courseid
    };
    console.log(data);
    this.props.createAnnouncement(data, this.props.history);
  };
  render() {
    return (
      <div id="content">
        <h1>Fill the form to create an announcement</h1>
        <form method="post">
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="announcementtitle"
              placeholder="announcementtitle"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <textarea
              rows="4"
              cols="50"
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="announcementdesc"
              placeholder="announcementdesc"
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
            <button onClick={this.displayAnnouncements} className="btn btn-success" type="submit">
              Display Announcement
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { announcement: state.announcement };
}
export default connect(mapStateToProps, { createAnnouncement, setAnnouncement })(CreateAnnouncement);

