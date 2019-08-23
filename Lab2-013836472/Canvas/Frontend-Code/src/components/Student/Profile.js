import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { fetchProfile } from "../../actions/ProfileAction";
import _ from "lodash";
import { connect } from "react-redux";
import {ROOT_URL} from '../../lib/constants';

class Profile extends Component {
  componentDidMount() {
    //call to action
    const email = JSON.parse(localStorage.getItem("userdata")||{}).email;
    console.log(email);
    const data = { email: email, type: "student" };
    console.log(data);
    this.props.fetchProfile(data);
  }
  editProfile = (e) => {
    console.log("Inside edit student profile");
    e.preventDefault();
    if(localStorage.getItem("type")=="student")
    this.props.history.push("/student/profile/edit");
    else
    this.props.history.push("/teacher/profile/edit");
  };
  render() {
    console.log(this.props.userdetails);
    return (
      <div>
      <h2 class="text-center">Profile</h2>
      <div id="content3">
        <div class="container">
          <div id="displayprofile">
            <img src={`${ROOT_URL}/${this.props.userdetails.image || "uploads/profile/img_default.jpg"}`} alt={this.props.userdetails.name} style={{ width: "200px", height: "200px",borderRadius:"100px"}} />
            <h1>{this.props.userdetails.name}</h1>
            <p>Email: {this.props.userdetails.email}</p>
            <p>Phone: {this.props.userdetails.phone}</p>
            <p>Gender: {this.props.userdetails.gender}</p>
            <p>About me: {this.props.userdetails.aboutme || ""}</p>
            <p>City: {this.props.userdetails.city}</p>
            <p>Company: {this.props.userdetails.company}</p>
            <p>Languages: {this.props.userdetails.languages}</p>
            <p>School: {this.props.userdetails.school}</p>
            <p>Hometown: {this.props.userdetails.hometown}</p>
            {/* {this.renderProfile()} */}
          </div>
          <div>
            <button
              onClick={this.editProfile}
              class="btn btn-success"
              type="submit"
            >
              Edit profile
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { userdetails: state.userdetails };
}

export default connect(mapStateToProps, { fetchProfile })(Profile);
