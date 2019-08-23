import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewAssignmentSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentdetails: []
    };
  }
  //check whether teacher present> if present
  //select studentemail, from submissions 
  //where courseid=courseid, assignmentid=assignmentid
  //student email, filepath, to give marks a input field + button to grade
  // > from student email get name from studentdetails table
  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email); //teacheremail
    let courseid =((this.props.match||{}).params||{}).courseid; //courseid
    console.log(courseid);
    let assignmentid =((this.props.match||{}).params||{}).assignmentid; //assignmentid
    console.log(assignmentid);
    const data = { email: email , courseid:courseid, assignmentid:assignmentid};
    console.log(data);
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/teacher/viewsubmissions", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("Data from node : ", response.data);
        this.setState({
          assignmentdetails: response.data
        });
      });
  }
  render() {
    console.log("assignment details",this.state.assignmentdetails);
    // let name=this.state.assignmentdetails.map((a)=>{
    //   return a.name;
    // })
    // console.log(name);
    // let email=this.state.assignmentdetails.map((a)=>{
    //   return a.email;
    // })
    // console.log(email);
    // let s_id=this.state.assignmentdetails.map((a)=>{
    //   return a.submissions[0].submissionid;
    // })
    // console.log(s_id);
    // let filepath=this.state.assignmentdetails.map((a)=>{
    //   return a.submissions[0].filepath;
    // })
    // console.log(filepath);
    let courseid =((this.props.match||{}).params||{}).courseid; //courseid
    // console.log(courseid);
    let assignmentid =((this.props.match||{}).params||{}).assignmentid; //assignmentid
    // console.log(assignmentid);
    console.log("this.state.assignmentdetails", this.state.assignmentdetails);
    let name=this.state.assignmentdetails.map((a)=>{
        return (
          <div>
              <div className="card">
                <h5 className="card-header">{a.name}</h5>
              <div className="card-body">
                <h5 className="card-title">Score: {a.submissions[0].grade||`ungraded`}<span style={{float:"right"}}><small>No of submissions: {a.submissions.length||0}</small></span></h5>
                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                {!!a.submissions.length && <Link to={`/teacher/courses/${courseid}/assignments/submissions/${assignmentid}/display/${a.submissions[0].submissionid}`} className="btn btn-primary">View Latest Submission</Link>}
              </div>
          </div>
          <br/>
          </div>
        )
      })
    //student name>link> click> file view + input field
    console.log("this.state.assignmentdetails: ",this.state.assignmentdetails);
    return (
      <div>
        <h3 className="text-center">View All Assignment Submissions</h3><br/>
        {name}
        {/* <p>{this.state.assignmentdetails}</p> */}
      </div>
    )
  }
}
