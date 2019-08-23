import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {displayGrades} from "../../actions/GradesAction";
import _ from "lodash";
import { connect } from "react-redux";

class Grades extends Component {
    // constructor(props) {
    //     //Call the constructor of Super class i.e The Component
    //     super(props);
    //     this.state = {
    //       grades:[]
    //     };
    //     // this.uploadChangeHandler = this.uploadChangeHandler.bind(this);
    //     // this.submit = this.submit.bind(this);
    //   }
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        let courseid =((this.props.match||{}).params||{}).courseid;
        console.log(courseid);
        const data = { email: email , courseid:courseid};
        console.log("DAAATTTTAAAAAAAA: ",data);   //studentemail and courseid
        this.props.displayGrades(data);
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios
        //   .post("http://localhost:3001/student/displaygrade", data)
        //   .then((response) => {
        //     console.log("Status Code : ", response.status);
        //     console.log("Data from node : ", response.data);
        //     this.setState({
        //       grades: response.data
        //     });
        //   });
      }
  render() {
    console.log("this.props.grades.displaygrades: ", this.props.grades.displaygrades);
    let pointcount=0, percentcount=0, totmarks=0;
    let display=this.props.grades.displaygrades.map((element,d)=>{
console.log(element,d);
      this.props.grades.displaygrades[d] = this.props.grades.displaygrades[d] || {};
      this.props.grades.displaygrades[d].assignmenttitle = this.props.grades.displaygrades[d].assignmenttitle || "";
      this.props.grades.displaygrades[d].additional = this.props.grades.displaygrades[d].additional || [];
      this.props.grades.displaygrades[d].additional[0] = this.props.grades.displaygrades[d].additional[0]|| {};
      this.props.grades.displaygrades[d].additional[0].grade = parseInt(this.props.grades.displaygrades[d].additional[0].grade|| 0);
      this.props.grades.displaygrades[d].points=parseInt(this.props.grades.displaygrades[d].points||0);

      // console.log(this.props.grades.displaygrades[d].assignmenttitle);
      // console.log(this.props.grades.displaygrades[d].additional[0].grade);
      // console.log(this.props.grades.displaygrades[d].points)

      // console.log("this.props.grades.displaygrades[d].points",this.props.grades.displaygrades[d].points);
      let p=(this.props.grades.displaygrades[d].additional[0].grade||0)/(this.props.grades.displaygrades[d].points||0)*100;
      // pointarr.push(this.props.grades.displaygrades[d].points);
      pointcount=pointcount+this.props.grades.displaygrades[d].points;
      // percentcount=percentcount+p;
      totmarks=totmarks+this.props.grades.displaygrades[d].additional[0].grade;
      percentcount=(totmarks/pointcount)*100;
      return <tr>
        <td>
          {this.props.grades.displaygrades[d].assignmenttitle}
        </td>
        <td>
          {(this.props.grades.displaygrades[d].additional[0].grade)||0}
        </td>
        <td>
          {this.props.grades.displaygrades[d].points}
        </td>
        <td>
        {p}%
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
                <th>{percentcount}%</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { grades: state.grades };
}
export default connect(mapStateToProps, { displayGrades })(Grades);

