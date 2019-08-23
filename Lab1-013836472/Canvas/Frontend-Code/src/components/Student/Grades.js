import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default class Grades extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        this.state = {
          grades:[]
        };
        // this.uploadChangeHandler = this.uploadChangeHandler.bind(this);
        // this.submit = this.submit.bind(this);
      }
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        let courseid =((this.props.match||{}).params||{}).courseid;
        console.log(courseid);
        const data = { email: email , courseid:courseid};
        console.log("DAAATTTTAAAAAAAA: ",data);   //studentemail and courseid
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios
          .post("http://localhost:3001/student/displaygrade", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.setState({
              grades: response.data
            });
          });
      }
  render() {
    let pointcount=0, percentcount=0, totmarks=0;
    let display=this.state.grades.map((element,d)=>{
console.log(element,d);
      this.state.grades[d] = this.state.grades[d] || {};
      this.state.grades[d].assignmenttitle = this.state.grades[d].assignmenttitle || "";
      this.state.grades[d].additional = this.state.grades[d].additional || [];
      this.state.grades[d].additional[0] = this.state.grades[d].additional[0]|| {};
      this.state.grades[d].additional[0].grade = this.state.grades[d].additional[0].grade|| "";
      this.state.grades[d].points=this.state.grades[d].points||"";

      // console.log(this.state.grades[d].assignmenttitle);
      // console.log(this.state.grades[d].additional[0].grade);
      // console.log(this.state.grades[d].points)

      // console.log("this.state.grades[d].points",this.state.grades[d].points);
      let p=(this.state.grades[d].additional[0].grade||0)/(this.state.grades[d].points||0)*100;
      // pointarr.push(this.state.grades[d].points);
      pointcount=pointcount+this.state.grades[d].points;
      percentcount=percentcount+p;
      totmarks=totmarks+this.state.grades[d].additional[0].grade;
      return <tr>
        <td>
          {this.state.grades[d].assignmenttitle}
        </td>
        <td>
          {this.state.grades[d].additional[0].grade}
        </td>
        <td>
          {this.state.grades[d].points}
        </td>
        <td>
        {p}
        </td>
      </tr>
    })
    return (
      <div id="content">
        <div className="container">
          <h2>Grades</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Marks Obtained</th>
                <th>Total Marks</th>
                <th>Percent</th>
              </tr>
            </thead>
            <tbody>
              {display}
            </tbody>
            <thead>
            <tr>
                <th></th>
                <th>{totmarks}</th>
                <th>{pointcount}</th>
                <th>{percentcount}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}