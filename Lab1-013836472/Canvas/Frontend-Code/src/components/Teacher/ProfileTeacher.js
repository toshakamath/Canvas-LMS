import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
class ProfileTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      image:"uploads/profile/img_default.jpg"
      //showResults: false
    };
  }
  //get the books data from backend
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    const data = { email: email };
    console.log(data);
    axios.defaults.withCredentials = true;
    // axios
    //   .get("http://localhost:3001/studenthome/dashboard", { params: data })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.setState({
    //       userdetails: this.state.userdetails.concat(response.data)
    //       //showResults: false
    //     });
    //   });
    axios
      .post("http://localhost:3001/teacher/profile", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        console.log("image from node : ", response.data[0].image);
        this.setState({
          userdetails: response.data,
          image: response.data[0].image || this.state.image //if(response.data[0].image!=NULL)then image=response.data[0].image else image=this.state.image
          //showResults: false
        });
        // if(response.status===200)
        // console.log("status is 200");
        // else
        // console.log("status is 400");
      });
    //console.log("data returned: ", response.data);
    //var books = [{ bookid: "w", name: "d" }];
  }
  editProfile = (e) => {
    console.log("Inside edit teacher profile");
    e.preventDefault();
    this.props.history.push("/teacher/profile/edit");
  };
  render() {
    // this.state.userdetails = this.state.userdetails || [];
    // this.state.userdetails[0] = this.state.userdetails[0] || {}
    // console.log("userdetails2",this.state.userdetails[0]);
    // let i=(this.state.userdetails[0]).image;
    // console.log("i:",i);
    
    let user_name = this.state.userdetails.map((user) => {
      return user.name;
    });
    let user_email = this.state.userdetails.map((user) => {
      return user.email;
    });
    let user_phone = this.state.userdetails.map((user) => {
      return user.phone;
    });
    let user_gender = this.state.userdetails.map((user) => {
      return user.gender;
    });
    let user_aboutme = this.state.userdetails.map((user) => {
      return user.aboutme;
    });
    let user_city = this.state.userdetails.map((user) => {
      return user.city;
    });
    let user_company = this.state.userdetails.map((user) => {
      return user.company;
    });
    let user_languages = this.state.userdetails.map((user) => {
      return user.languages;
    });
    let user_school = this.state.userdetails.map((user) => {
      return user.school;
    });
    let user_hometown = this.state.userdetails.map((user) => {
      return user.hometown;
    });
    // let user_image = this.state.image;
    // console.log("user_image: ",user_image);
    // let imagepath="/uploads/profile/"+user_image;
    // console.log("imagepath: ",imagepath);
    console.log("state: ",this.state.image);
    return (
      <div>
      <h2 className="text-center">Teacher Profile</h2>
      <div id="content3">
        <div className="container">
          <div id="displayprofile">
            <img src={`http://localhost:3001/${this.state.image}`} alt={user_name} style={{ width: "200px", height: "200px",borderRadius:"100px"}} />
            <h1>{user_name}</h1>
            <p>Email: {user_email}</p>
            <p>Phone: {user_phone}</p>
            <p>Gender: {user_gender}</p>
            <p>About me: {user_aboutme || ""}</p>
            <p>City: {user_city}</p>
            <p>Company: {user_company}</p>
            <p>Languages: {user_languages}</p>
            <p>School: {user_school}</p>
            <p>Hometown: {user_hometown}</p>
          </div>
          <div>
            <button
              onClick={this.editProfile}
              className="btn btn-success"
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
  // render(){
  //   return(
  //     <div>
  //       <h1>This is teacher profile</h1>
  //     </div>
  //   )
  // }
}
//export Home Component
export default ProfileTeacher;
