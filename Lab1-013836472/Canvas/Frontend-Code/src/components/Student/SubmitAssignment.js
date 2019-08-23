import React, { Component } from 'react'
import "../../App.css";
import axios from "axios";

export default class SubmitAssignment extends Component {
      constructor(props) {
        super(props);
        this.state = {
          assignmentdetails: [],
          showResults: false,
          showSubmit: true
        };
      }
      //get the books data from backend
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        const data = { email: email, assignmentid:assignmentid };
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
          .post("http://localhost:3001/assignment/upload", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.setState({
              assignmentdetails: response.data
            });
            // if(response.status===200)
            // console.log("status is 200");
            // else
            // console.log("status is 400");
          });
        //console.log("data returned: ", response.data);
      }
    //   editProfile = (e) => {
    //     console.log("Inside edit teacher profile");
    //     e.preventDefault();
    //     this.props.history.push("/teacher/profile/edit");
    //   };
    
    uploadAssignment=(e)=>{
        let courseid =((this.props.match||{}).params||{}).courseid;
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        this.setState({
            showResults: true,
            showSubmit: false
          });
        console.log("assignmentid: ",assignmentid);
        console.log("this should render file upload");
        e.preventDefault();
        // this.props.history.push(`/student/courses/${courseid}/assignments/submitassignment/${assignmentid}/upload`);
    }
      render() {
        const showResults = this.state.showResults;
        const showSubmit = this.state.showSubmit;
        let title = this.state.assignmentdetails.map((a) => {
          return a.assignmenttitle;
        });
        let duedate=this.state.assignmentdetails.map((a)=>{
              return new Date(a.duedate).toLocaleString();
            })
        let marks = this.state.assignmentdetails.map((a) => {
          return a.points;
        });
        // let user_image = this.state.image;
        // console.log("user_image: ",user_image);
        // let imagepath="/uploads/profile/"+user_image;
        // console.log("imagepath: ",imagepath);
        // console.log("state: ",this.state.image);
        return (
          <div>
          <h2 className="text-center">{title}</h2>
          <div id="content3">
            <div className="container">
                {/* <p>Due date: {duedate} <span style={{float:"right"}}>Marks: {marks}</span></p> */}
                <p>Due date: {duedate} <span style={{float:"right"}}>Marks: {marks}</span><span style={{marginLeft:"50px"}}></span></p>
              <p><span style={{float:"right"}}></span></p>
              </div>
              {showSubmit &&(
              <div>
                <button
                  onClick={this.uploadAssignment}
                  className="btn btn-warning"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            )}
              { showResults && (
              <div><UploadDocument {...this.props}/></div>
              )}
            </div>
          </div>
        );
      }
    //   render(){
    //     return(
    //       <div>
    //         <h1>This is SubmitAssignment</h1>
    //       </div>
    //     )
    //   }
}

class UploadDocument extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        this.state = {
          upload: null,
          filepath:""
        };
        this.uploadChangeHandler = this.uploadChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
      }
      uploadChangeHandler = (e) => {
        console.log("data:", e.target.files);
        // console.log("data:", e.target.files[0].name);
        this.setState({
          upload: e.target.files[0]
        });
      };
      //upload assignment> display on the same page
    //   displayfiles = (e) => {
    //     let courseid =((this.props.match||{}).params||{}).courseid;
    //     e.preventDefault();
    //     this.props.history.push(`/teacher/courses/${courseid}/files`);
    //   };
      submit = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let courseid =((this.props.match||{}).params||{}).courseid;
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        console.log("aayega ",courseid,assignmentid,this.props.match);
        
        var data = new FormData();
        var em = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(em);
        data.append("subup", this.state.upload);
        data.append("email", em);
        data.append("courseid", courseid);
        data.append("assignmentid", assignmentid);
        //courseid, assignmentid, studentemail, filepath
        console.log("entire data that we are sending to backend",data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios
          .post("http://localhost:3001/assignment/submit", data)
          .then((response) => {
            let courseid =((this.props.match||{}).params||{}).courseid;
            console.log("Status Code : ", response.status);
            console.log("response data : ", response.data);
            //response.data.filepath
            /**
             *  assignmentid: "12"
                courseid: "273"
                email: "toshakamath@gmail.com"
                filepath: "uploads/submissions/subup-1552804658650.pdf"
             */
            if (response.status === 200) {
              // this.setState({
              //   authFlag: true
              // });
              console.log("success");
              this.setState({
                filepath:response.data.filepath
              })
              console.log(this.state.filepath);
              //this.props.history.push(`/student/courses/${courseid}/assignments/submitassignment/${assignmentid}`);
            } 
            // else {
            //   this.props.history.push(`/teacher/courses/${courseid}/files/upload`);
            // }
          });
      };
      render() {
          console.log(this.state.filepath);
        return (
          <div id="content">
            <br/>
            <br/>
            <div>
              <form>
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
                <a href={`http://localhost:3001/${this.state.filepath}`} target="_blank">
                <span style={{float:"right"}}>{this.state.filepath}</span>
                </a>
                {/* &nbsp;&nbsp;&nbsp;
                <button className="btn btn-success" type="submit" onClick={this.displayfiles}>
                  Submit Assignment
                </button> */}
                <br/>
                <br/>
              </form>
            </div>
          </div>
        );
      }
    }
