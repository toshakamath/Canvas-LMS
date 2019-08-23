import React, { Component } from 'react'
import axios from "axios";

export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
          people: [],
          image:"uploads/profile/img_default.jpg"
        };
      }
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        let courseid =((this.props.match||{}).params||{}).courseid;
        const data = { email: email, courseid:courseid };
        console.log(data);
        axios.defaults.withCredentials = true;
        axios
          .get("http://localhost:3001/teacher/courses/people", { params: data })
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.setState({
                people: response.data,
                //image: response.data[0].image || this.state.image //if(response.data[0].image!=NULL)then image=response.data[0].image else image=this.state.image
                //showResults: false
              });
          });
      }
      removeStudent=(e)=>{
        e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    const email = e.target.value;
    console.log(email);
    let courseid = ((this.props.match||{}).params||{}).courseid;
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
    let type=localStorage.getItem("type");
    let user_name = this.state.people.map((user) => 
        <div style={{display:"inline-block", margin:"20px"}}>
              <img src={`http://localhost:3001/${user.image || this.state.image }`} alt={user_name} style={{ width: "200px", height: "200px",borderRadius:"100px"}} />
              <h2>{user.name}</h2>
              {type==="teacher"?
              <div>
                <button className="btn btn-danger btn-sm" value={user.email} onClick={this.removeStudent}>Remove {user.name}</button>
              </div>
              :<div></div>
              }
        </div>
            
      );
    //   let user_image = this.state.people.map((user) => {
    //     return user.image|| this.state.image;
    //   });
      let courseid =((this.props.match||{}).params||{}).courseid;
      console.log(user_name);
    //   console.log(user_image);
    //   console.log(this.state.people);
    //   console.log(this.state.image);
    return (
        <div>
        <h2 className="text-center">Students</h2>
        <div id="content3">
          <div className="container">
          {user_name}
            </div>
            </div>
            
          </div>
    )
  }
}
