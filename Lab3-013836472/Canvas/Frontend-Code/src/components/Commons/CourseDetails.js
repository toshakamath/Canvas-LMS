import React, { Component } from 'react'
import axios from "axios";
import {getCourseDetails} from "../../actions/CourseDetailsAction";
import _ from "lodash";
import { connect } from "react-redux";

class CourseDetails extends Component {    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       courseinfo: [],
    //       //image:"/uploads/profile/img_default.jpg"
    //     };
    //   }
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log("email in courseinfo: ",email);
        let courseid =((this.props.match||{}).params||{}).courseid;
        console.log("courseid in courseinfo: ",courseid);
        const data = { email: email, courseid:courseid };
        console.log(data);
        this.props.getCourseDetails(data);
        // axios.defaults.withCredentials = true;
        // // axios
        // //   .get("http://localhost:3001/studenthome/dashboard", { params: data })
        // //   .then((response) => {
        // //     console.log("Status Code : ", response.status);
        // //     console.log("Data from node : ", response.data);
        // //     this.setState({
        // //       userdetails: this.state.userdetails.concat(response.data)
        // //       //showResults: false
        // //     });
        // //   });
        // axios
        //   .post("http://localhost:3001/teacher/courses/home", data)
        //   .then((response) => {
        //     console.log("Status Code : ", response.status);
        //     console.log("Data from node : ", response.data);
        //     // console.log("image from node : ", response.data[0].image);
        //     this.setState({
        //       courseinfo:response.data 
        //       //userdetails: response.data,
        //       //image: response.data[0].image || this.state.image //if(response.data[0].image!=NULL)then image=response.data[0].image else image=this.state.image
        //       //showResults: false
        //     });
        //     //console.log("inside axios", this.props.courseinfo.coursedetails);
        //     // if(response.status===200)
        //     // console.log("status is 200");
        //     // else
        //     // console.log("status is 400");
        //   });
        //console.log("data returned: ", response.data);
        //var books = [{ bookid: "w", name: "d" }];
      }
  render() {
    console.log("this.props.courseinfo.coursedetails", this.props.courseinfo.coursedetails)
    let courseinfo=this.props.courseinfo.coursedetails;
    console.log("courseinfo: ",courseinfo);
    console.log("this.props.courseinfo.coursedetails: ",this.props.courseinfo.coursedetails);
    let courseid = this.props.courseinfo.coursedetails.map((object) => {
      return object.courseid;
    });
    let coursename = this.props.courseinfo.coursedetails.map((object) => {
      return object.coursename;
    });
    let coursedept = this.props.courseinfo.coursedetails.map((object) => {
      return object.coursedept;
    });
    let coursedesc = this.props.courseinfo.coursedetails.map((object) => {
      return object.coursedesc;
    });
    let courseterm = this.props.courseinfo.coursedetails.map((object) => {
      return object.courseterm;
    });
    let courseroom = this.props.courseinfo.coursedetails.map((object) => {
      return object.courseroom;
    });
    let coursecapacity = this.props.courseinfo.coursedetails.map((object) => {
      return object.coursecapacity;
    });
    let currentcapacity = this.props.courseinfo.coursedetails.map((object) => {
      return object.currentcapacity;
    });
    let waitlistcapacity = this.props.courseinfo.coursedetails.map((object) => {
      return object.waitlistcapacity;
    });
    let currentwaitlistcapacity = this.props.courseinfo.coursedetails.map((object) => {
      return object.currentwaitlistcapacity;
    });


    // coursecapacity: 2,
    // waitlistcapacity: 1,
    // currentcapacity: 1,
    // currentwaitlistcapacity: 1

    console.log("this is the courseid: ",courseid);
    return (
      // <div>
      //     <div>
      //       <h3 className="text-center">Common Course Details</h3>
      //   </div>
      // </div>
      <div>
      <h2 className="text-center">{courseid} : {coursename}</h2>
      <div id="content3">
        <div className="container">
          <div>
            
            <p>Department: {coursedept}</p>
            <p>Course Description: {coursedesc}</p>
            <p>Course Room: {courseroom}</p>
            <p>Course Term: {courseterm}</p>
            <p>Course Capacity: {coursecapacity}</p>
            <p>Current Capacity: {currentcapacity}</p>
            <p>Waitlist Capacity: {waitlistcapacity}</p>
            <p>Current Waitlist Capacity: {currentwaitlistcapacity}</p>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { courseinfo: state.courseinfo };
}
export default connect(mapStateToProps, { getCourseDetails })(CourseDetails);

