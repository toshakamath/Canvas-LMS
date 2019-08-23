import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      image:"/uploads/profile/img_default.jpg",
      name:"",
      email:"",
      phone:"",
      gender:"",
      aboutme:"",
      city:"",
      company:"",
      languages:"",
      school:"",
      hometown:"",
      upload: null
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  
  
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    const data = { email: email };
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    // axios
    //   .post("http://localhost:3001/studenthome/dashboard", data)
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.setState({
    //       userdetails: this.state.userdetails.concat(response.data),
    //       
    //     });
    //   });
    axios
      .post("http://localhost:3001/studenthome/editstudentprofile", data)
      .then((response) => {
        //update the state with the response data
        console.log("response.data: ",response.data);
        console.log("name:", response.data[0].name)
        console.log(this.state.userdetails.concat(response.data));
        // console.log(response.data.result);
        this.setState({
          userdetails: this.state.userdetails.concat(response.data),
          image:response.data[0].image,
          name:response.data[0].name,
          email:response.data[0].email,
          phone:response.data[0].phone,
          gender:response.data[0].gender,
          aboutme:response.data[0].aboutme,
          city:response.data[0].city,
          company:response.data[0].company,
          languages:response.data[0].languages,
          school:response.data[0].school,
          hometown:response.data[0].hometown
        });
        console.log(this.state.userdetails);
      });
  }
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeHandlerFile = (e) => {
    this.setState({
      upload: e.target.files[0]
    });
    console.log("data:", e.target.files);
    console.log("data:", e.target.files[0].name);
  };
  updateProfile = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    var data = new FormData();
    console.log("form data:", data);
    console.log("upload ",this.state.upload);
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log("email ",em);
      data.append("em", em);
      data.append("name",this.state.name);
      data.append("email",this.state.email);
      data.append("phone",this.state.phone);
      data.append("gender",this.state.gender);
      data.append("aboutme",this.state.aboutme);
      data.append("city",this.state.city);
      data.append("company",this.state.company);
      data.append("languages",this.state.languages);
      data.append("school",this.state.school);
      data.append("hometown",this.state.hometown);
      console.log("this.state.upload: ",this.state.upload);
      data.append("imageup", this.state.upload);
      console.log("DATAAAAAAAA: ",data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/student/profile/update", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response.data",response.data);
        if (response.status === 200) {
          //   this.setState({
          //     authFlag: true
          //   });
          this.props.history.push("/student/profile");
        } else {
          //   this.setState({
          //     authFlag: false
          //   });
          this.props.history.push("/student/profile/edit");
        }
      });
  };
  render() {
    return (
      <div>
      <h2 className="text-center">{this.state.name} profile</h2>
      <div id="content">
        <div className="container">
          <form method="post">
            <div style={{ width: "30%" }} className="form-group">
              <img src={`http://localhost:3001/${this.state.image}`} alt="update photo" name="image" value={this.state.image} style={{ width: "100%" }} />
              <div style={{ width: "30%" }} className="form-group">
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
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.name} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="name"
                placeholder="name"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.email} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="email"
                placeholder="email" disabled/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.gender} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="gender"
                placeholder="gender"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.phone} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="phone"
                placeholder="phone"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.aboutme} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="aboutme"
                placeholder="aboutme"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.city} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="city"
                placeholder="city"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.company} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="company"
                placeholder="company"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.languages} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="languages"
                placeholder="languages"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.school} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="school"
                placeholder="school"/>
            </div>
            <div style={{ width: "30%" }} className="form-group">
              <input defaultValue={this.state.hometown} onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                name="hometown"
                placeholder="hometown"/>
            </div>
          <div>
            <button
              onClick={this.updateProfile}
              className="btn btn-success"
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
