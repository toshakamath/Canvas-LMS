import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { setSearch, searchResults ,enroll} from "../../actions/EnrollmentAction";
import _ from "lodash";
import { connect } from "react-redux";

class Enrollment extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     this.state = {
    //         courses:[]
    //       };
    // }
searchbarChangeHandler=(e)=>{
    this.props.setSearch({
        [e.target.name]: e.target.value         //e.target.name is this.state.search
      });
    // this.setState({
    //     [e.target.name]: e.target.value     
    //   });
}
searchCourses = (e)=>{
    console.log('search');
    // console.log(this.state.search);     //this.props.objectname
    console.log(this.props.enrollment.search);
    var data = 
    {
        // search: this.state.search       //this.props.objectname
        search: this.props.enrollment.search
    }
    console.log(data);
    this.props.searchResults(data);
    // axios.post('http://localhost:3001/search/',data)
    //     .then(response =>{
    //         if(response.status === 200){
    //             console.log(response.data);
    //             this.setState({
    //                 courses: response.data
    //             });
    //         }
    //         else{
    //             console.log("error");
    //         }
    //     });
}
enrollCourses = (e)=>{
    console.log('enroll');
    e.preventDefault();
    console.log(this.props.enrollment.enroll);
    let cid=e.target.value;
    console.log(cid);
    let t_em=e.target.name;
    console.log(t_em);
    var s_em = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(s_em);
    var data = 
    {
        t_em:t_em,
        s_em: s_em,
        cid: cid
    }
    console.log("data: ",data);
    this.props.enroll(data, this.props.history);
    // axios.post('http://localhost:3001/enroll/',data)
    //     .then(response =>{
    //         if(response.status === 200){
    //             console.log("indication to find the log: ",response.data);
    //             this.props.history.push("/student/courses");
    //         }
    //         else{
    //             console.log("error");
    //         }
    //     });
}
    render() {
        // let details = this.state.courses.map((course) => {          //this.props.objectname
        console.log("blaaaaahhhhhh1; ", this.props.enrollment.search);
        console.log("blaaaaahhhhhh2; ", this.props.enrollment.searchresults);
        console.log("blaaaaahhhhhh3; ", this.props.enrollment.enroll);
        // return(
        //     <div>
        //         HELLOOOOOO
        //     </div>
        // )
        let details = this.props.enrollment.searchresults.map((course) => {
                return (
              <div className="card text-center" style={{width: "18rem"}}>
                <div className="card-body text-center">
                <h5 className="card-title text-center"><Link to="#">{course.courseid}</Link></h5>
                <h6 className="card-subtitle mb-2 text-muted text-center">{course.coursename} {course.coursedept}</h6>
                <p className="card-text text-center">{course.coursedesc}</p>
                <p className="card-text text-center">{course.courseroom} {course.courseterm}</p>
                <p className="card-text text-center">{course.email}</p>
                <button onClick={this.enrollCourses} value={course.courseid} name={course.email} className="btn btn-primary btn-lg btn-block" >Enroll</button>
              </div>
              </div>
            );
          });
        return (
            <div>
            <h1 className="text-center">Enrollment Tab</h1>
            <div className="border q-5 search-container" style={{marginLeft:"10px"}}>
                <div className="form-group mt-3 mb-3 ml-5 mr-5">
                    <input type="text" name="search" id="search" className="form-control form-control-lg" placeholder="Search" 
                    onChange= {this.searchbarChangeHandler}/>
                </div>
                <div className="form-group mt-3 mb-3 ml-5 mr-5">
                    <button onClick={this.searchCourses} className="btn btn-primary btn-lg btn-block" >Search</button>
                </div>
            </div>
            <div className="card-deck" style={{marginLeft:"-5px"}}>
                {details}
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { enrollment: state.enrollment };
  }
export default connect(mapStateToProps, { setSearch , searchResults, enroll})(Enrollment);