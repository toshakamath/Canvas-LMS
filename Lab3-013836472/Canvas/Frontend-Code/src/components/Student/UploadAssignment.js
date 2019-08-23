import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { setUpload, uploadFile } from "../../actions/AssignmentAction";
import _ from "lodash";
import { connect } from "react-redux";

class UploadAssignment extends Component {
  // constructor(props) {
  //   //Call the constructor of Super class i.e The Component
  //   super(props);
  //   this.state = {
  //     upload: null
  //   };
  //   this.uploadChangeHandler = this.uploadChangeHandler.bind(this);
  //   this.submit = this.submit.bind(this);
  // }
  uploadChangeHandler = (e) => {
    console.log("data:", e.target.files);
    // console.log("data:", e.target.files[0].name);
    // this.setState({
    //   upload: e.target.files[0]
    // });
    this.props.setUpload({
      [e.target.name]: e.target.files[0]
    });
  };
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
    // const data = {
    //   upload: this.state.upload
    // };
    //console.log("data:", e.target.files);
    //console.log("data:", e.target.files[0]);
    var data = new FormData();
    console.log("form data:", data);
    // console.log("filename:", this.state.upload);
    var em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(em);
    console.log("this.props.assignmentdetails.setupload.upload: ", this.props.assignmentdetails.setupload.upload);
    data.append("up", this.props.assignmentdetails.setupload.upload);
    data.append("email", em);
    data.append("courseid", courseid);
    console.log("entire data that we are sending to backend",data);
    this.props.uploadFile(data, this.props.history);
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios
    //   .post("http://localhost:3001/home/fileupload", data)
    //   .then((response) => {
    //     let courseid =((this.props.match||{}).params||{}).courseid;
    //     console.log("Status Code : ", response.status);
    //     console.log("response data : ", response.data);
    //     if (response.status === 200) {
    //       // this.setState({
    //       //   authFlag: true
    //       // });
    //       console.log("success");
    //       this.props.history.push(`/teacher/courses/${courseid}/files`);
    //       //this.props.history.push("/home/fileupload");
    //     } else {
    //       // this.setState({
    //       //   authFlag: false
    //       // });
    //       this.props.history.push(`/teacher/courses/${courseid}/files/upload`);
    //     }
    //   });
  };
  //   function getFileData(myFile){
  //     var file = myFile.files[0];
  //     var filename = file.name;
  //  }
  render() {
    return (
      <div id="content">
        <h1 className="text-center">File Upload</h1>
        <br/>
        <br/>
        <div>
          <form>
            <label>Choose a file to upload</label>
            <br/>
            <input
              type="file"
              key="upload"
              name="upload"
              onChange={this.uploadChangeHandler}
            />
            <br/>
            <br/>
            <button className="btn btn-warning" type="submit" onClick={this.submit}>
              Upload
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-success" type="submit" onClick={this.displayfiles}>
              Display files
            </button>
          </form>
        </div>
      </div>
    );
  }
}
//export Home Component
export default UploadAssignment;
function mapStateToProps(state) {
  return { assignmentdetails: state.assignmentdetails };
}
export default connect(mapStateToProps, { setUpload, uploadFile })(UploadAssignment);
