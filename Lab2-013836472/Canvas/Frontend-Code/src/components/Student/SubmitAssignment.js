import React, { Component } from 'react'
import "../../App.css";
import axios from "axios";
import {setUpload, uploadFile, getAssignmentDetails} from "../../actions/AssignmentAction";
import _ from "lodash";
import { connect } from "react-redux";
import {ROOT_URL} from '../../lib/constants';

class SubmitAssignment extends Component {
    // constructor(props) {
    //     //Call the constructor of Super class i.e The Component
    //     super(props);
    //     this.state = {
    //       upload: null,
    //       filepath:""
    //     };
    //     this.uploadChangeHandler = this.uploadChangeHandler.bind(this);
    //     this.submit = this.submit.bind(this);
    //   }
    componentDidMount() {
      const email = JSON.parse(localStorage.getItem("userdata")).email;
      console.log(email);
      let courseid =((this.props.match||{}).params||{}).courseid;
      console.log(courseid);
      let assignmentid =((this.props.match||{}).params||{}).assignmentid;
      console.log(assignmentid);
      const data = { email:email , courseid:courseid, assignmentid:assignmentid};
      console.log(data);
      //get assignmenttitle, duedate, marks, filename submitted 
    // select assignmentid, filepath where courseid=257, assignmentid=13 orderby submissionid desc <select first only>
    // select assignmenttitle, duedate, points from assignmentdetails where assignmentid=13
      this.props.getAssignmentDetails(data);
    }
      uploadChangeHandler = (e) => {
        console.log("data:", e.target.files);
        // this.setState({
        //   upload: e.target.files[0]
        // });
        this.props.setUpload({
          upload: e.target.files[0]
        });
      };
      submit = (e) => {
        //this.props.assignmentdetails.assignmentinfo.whatevernameinresponse
        e.preventDefault();
        let courseid =((this.props.match||{}).params||{}).courseid;
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        console.log("aayega ",courseid,assignmentid,this.props.match);
        
        var data = new FormData();
        var em = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(em);
        data.append("subup", this.props.assignmentdetails.setupload.upload);
        //this.props.assignmentdetails.setupload.upload
        data.append("email", em);
        data.append("courseid", courseid);
        data.append("assignmentid", assignmentid);
        console.log("entire data that we are sending to backend",data);
        this.props.uploadFile(data);
        // axios.defaults.withCredentials = true;
        // axios
        //   .post("http://localhost:3001/assignment/submit", data)
        //   .then((response) => {
        //     let courseid =((this.props.match||{}).params||{}).courseid;
        //     console.log("Status Code : ", response.status);
        //     console.log("response data : ", response.data);
        //     if (response.status === 200) {
        //       console.log("success");
        //       this.setState({
        //         filepath:response.data.filepath
        //       })
        //       console.log(this.state.filepath);
        //     } 
        //   });
      };
      render() {
        let flag="flag";
        let link="link";
        let text="text";
        console.log("((this.props.assignmentdetails.assignmentinfo[0].additional||[])[0]||{})", this.props.assignmentdetails.assignmentinfo);
        if(((this.props.assignmentdetails.assignmentinfo[0].additional||[])[0]||{}).filepath||"")
        {
          flag="SUBMITTED";
          link=`${ROOT_URL}/${((this.props.assignmentdetails.assignmentinfo[0].additional||[])[0]||{}).filepath||""}`;
          text="Click here to view latest submission";
        }
        console.log("this.props.assignmentdetails.filedetails: ", this.props.assignmentdetails.filedetails);
        console.log(this.props.assignmentdetails.assignmentinfo);
        return (
          <div id="content">
          <h3 class="text-center">{this.props.assignmentdetails.assignmentinfo[0].assignmenttitle}</h3>
            <br/>
            <br/>
            <div>
            <p>Due date: {new Date(this.props.assignmentdetails.assignmentinfo[0].duedate).toLocaleString()} <span style={{float:"right"}}>Marks: {this.props.assignmentdetails.assignmentinfo[0].points} </span><span style={{marginLeft:"50px"}}></span></p>
              <p><span style={{float:"right"}}>{flag}</span></p>
              <br/>
              <p><span style={{float:"right"}}><a href={link} target="_blank">{text}</a> </span></p>
              <form>
                <br/>
                <br/>
                <br/>
                <label>Choose a file to upload</label>
                <br/>
                <input
                  type="file"
                  key="upload"
                  name="up"
                  onChange={this.uploadChangeHandler}
                />
                <br/>
                <br/>
                <button className="btn btn-success" type="submit" onClick={this.submit}>
                  Submit Assignment
                </button>
                <a href={`${ROOT_URL}/${this.props.assignmentdetails.filedetails.filepath}`} target="_blank">
                <span style={{float:"right"}}>{this.props.assignmentdetails.filedetails.filepath}</span>
                </a>
                <br/>
                <br/>
              </form>
            </div>
          </div>
        );
      }
    }
    function mapStateToProps(state) {
      return { assignmentdetails: state.assignmentdetails };
    }
    export default connect(mapStateToProps, { setUpload, uploadFile, getAssignmentDetails })(SubmitAssignment);
    
    