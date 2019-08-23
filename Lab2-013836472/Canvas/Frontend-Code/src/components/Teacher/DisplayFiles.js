import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link, Route } from "react-router-dom";
import {displayFiles} from "../../actions/FileAction";
import _ from "lodash";
import { connect } from "react-redux";
import { ROOT_URL } from "../../lib/constants";

class DisplayFiles extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     filedetails: []
  //   };
  // }

  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid =((this.props.match||{}).params||{}).courseid;
    const data = { email: email, courseid:courseid };
    console.log(data);
    this.props.displayFiles(data);
    // axios.defaults.withCredentials = true;
    // axios
    //   .get("http://localhost:3001/home/displayfiles", { params: data })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.setState({
    //       filedetails: this.state.filedetails.concat(response.data)
    //     });
    //   });
  }
  uploadfile = (e) => {
    let courseid =((this.props.match||{}).params||{}).courseid;
    e.preventDefault();
    this.props.history.push(`/teacher/courses/${courseid}/files/upload`);
  };
  render() {
    console.log("this.props.filedetails: ",this.props.filedetails);

    let details = this.props.filedetails.displayfiles.map((file) => {
      return (
        <tr>
          {/* <td>
            <p>{file.email}</p>
          </td> */}
          <td>
            <p>{file.courseid}</p>
          </td>
          <td>
            <a href={`${ROOT_URL}/${file.filepath}`} target="_blank">
              {file.filepath}
            </a>
          </td>
        </tr>
      );
    });
    let type=localStorage.getItem("type");
    return (
      <div id="content">
        <div className="container">
          <h2>List of files</h2>
          <table className="table">
            <thead>
              <tr>
                {/* <th>Email</th> */}
                <th>Course ID</th>
                <th>Filepath</th>
              </tr>
            </thead>
            <tbody>
              {details}
              {type==="teacher"?
              <div style={{ width: "30%" }}>
                <button
                  onClick={this.uploadfile}
                  className="btn btn-success"
                  type="submit"
                >
                  Upload files
                </button>
              </div>
              :<div></div>
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { filedetails: state.filedetails };
}
export default connect(mapStateToProps, { displayFiles })(DisplayFiles);

