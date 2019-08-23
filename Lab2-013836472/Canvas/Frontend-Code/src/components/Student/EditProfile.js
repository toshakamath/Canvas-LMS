import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { fetchProfile, updateProfile, setUserDetails } from "../../actions/ProfileAction";
import _ from "lodash";
import { connect } from "react-redux";
import {ROOT_URL} from '../../lib/constants';

class EditProfile extends Component {
  componentDidMount() {
    //call to action
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    //console.log(email);
    const data = {
      email: email,
      type: localStorage.getItem("type")
    };
    console.log("email LOG", data);
    this.props.fetchProfile(data);
  }
  onChangeHandler = (e) => {
    this.props.setUserDetails({
      [e.target.name]: e.target.value
    });
  };
  onChangeHandlerFile = (e) => {
    this.props.setUserDetails({
      upload: e.target.files[0],
    });
  };
  updateProfile = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    var data = new FormData();
    //console.log("form data:", data);
    console.log("userdetails >  ",this.props.userdetails);
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    //console.log("email ",em);
      data.append("em", em);
      data.append("name",this.props.userdetails.name||"");
      data.append("email",this.props.userdetails.email||"");
      data.append("phone",this.props.userdetails.phone||"");
      data.append("gender",this.props.userdetails.gender||"");
      data.append("aboutme",this.props.userdetails.aboutme||"");
      data.append("city",this.props.userdetails.city)||"";
      data.append("company",this.props.userdetails.company||"");
      data.append("languages",this.props.userdetails.languages||"");
      data.append("school",this.props.userdetails.school)||"";
      data.append("hometown",this.props.userdetails.hometown||"");
      //console.log("this.props.userdetails.upload: ",this.props.userdetails.upload);
      data.append("imageup", this.props.userdetails.upload||"");
    this.props.updateProfile(data,localStorage.getItem("type"),(error)=>{
      if(error){
        if(localStorage.getItem("type")=="student")
      this.props.history.push("/student/profile/edit");
      else
      this.props.history.push("/teacher/profile/edit");
      }
      else{
        if(localStorage.getItem("type")=="student")
      this.props.history.push("/student/profile");
      else
      this.props.history.push("/teacher/profile");
      }
    });
  };

  render() {
    console.log("LOGGGGGGGG:",this.props.userdetails);
    return (
      <div>
      <h2 class="text-center">{this.props.userdetails.name} profile</h2>
      <div id="content">
        <div class="container">
          <form method="post">
            <div style={{ width: "30%" }} class="form-group">
              <img src={`${ROOT_URL}/${this.props.userdetails.image}`} alt="update photo" name="image" value={this.props.userdetails.image} style={{ width: "100%" }} />
              <div style={{ width: "30%" }} class="form-group">
              <label>Choose file</label>
            <input
              type="file"
              key="upload"
              name="imageup"
              onChange={this.onChangeHandlerFile}
            />
            </div>
            </div>
            <br/>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.name} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="name"
                placeholder="name"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.email} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="email"
                placeholder="email" disabled/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.gender} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="gender"
                placeholder="gender"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.phone} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="phone"
                placeholder="phone"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.aboutme} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="aboutme"
                placeholder="aboutme"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.city} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="city"
                placeholder="city"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.company} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="company"
                placeholder="company"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.languages} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="languages"
                placeholder="languages"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.school} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="school"
                placeholder="school"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={this.props.userdetails.hometown} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="hometown"
                placeholder="hometown"/>
            </div>
          <div>
            <button
              onClick={this.updateProfile}
              class="btn btn-success"
              type="submit"
            >
              Update profile
            </button>
          </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { userdetails: state.userdetails };
}
export default connect(mapStateToProps, { fetchProfile , updateProfile,setUserDetails})(EditProfile);
