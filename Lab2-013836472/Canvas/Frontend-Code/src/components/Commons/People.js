import React, { Component } from 'react'
import axios from "axios";
import { getPeople, removeStudent } from "../../actions/PeopleAction";
import _ from "lodash";
import { connect } from "react-redux";
import * as constants from '../../lib/constants';
// import * as constants from "../constants"

class People extends Component {
  constructor(props) {
      super(props);
      this.state = {
        limit:1
      };
    }

  componentDidMount() {
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid = ((this.props.match || {}).params || {}).courseid;
    const data = { email: email, courseid: courseid, pageno:"1", limit:this.state.limit };
    console.log(data);
    this.props.getPeople(data);
    // axios.defaults.withCredentials = true;
    // axios
    //   .get("http://localhost:3001/teacher/courses/people", { params: data })
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);
    //     this.setState({
    //         people: response.data,
    //         //image: response.data[0].image || this.state.image //if(response.data[0].image!=NULL)then image=response.data[0].image else image=this.state.image
    //         //showResults: false
    //       });
    //   });
  }
  pageClickHandler=(value, e)=>{
    let pageno=value;
    console.log("e.target.value: ", value);
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    let courseid = ((this.props.match || {}).params || {}).courseid;
    const data = { email: email, courseid: courseid, pageno:pageno, limit:this.state.limit };
    console.log("DAATTTTTTAAAA", data);
    this.props.getPeople(data);
  }
  removeStudent = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    const email = e.target.value;
    console.log(email);
    let courseid = ((this.props.match || {}).params || {}).courseid;
    console.log(courseid);
    const data = { email: email, courseid: courseid };
    console.log(data);
    this.props.removeStudent(data);
    // axios
    //   .post("http://localhost:3001/student/dropcourse", data)
    //   .then((response) => {
    //     console.log("Status Code : ", response.status);
    //     console.log("Data from node : ", response.data);

    //   });
    // student email, courseid
  }
  render() {
    console.log("blaaaaahhhhhh1; ", this.props.people);
    console.log("get peopleeeeee; ", this.props.people.getpeople);
    let count= this.props.people.getpeople.count;
    console.log("count: ", count);
    let no_of_pages=count/this.state.limit;
    let a=(this.props.people.getpeople).length;
    console.log("aaaaaa", a)
    let l=this.props.people.getpeople[a-1];
    console.log("The total number of people: ",l);
    console.log("blaaaaahhhhhh3; ", this.props.people.removestudent);
    let type = localStorage.getItem("type");
    let user_name = (this.props.people.getpeople.users||[]).map((user) =>
      <div style={{ display: "inline-block", margin: "20px" }}>
        <img src={`${constants.ROOT_URL}/${user.image || "uploads/profile/img_default.jpg"}`} alt={user.name} style={{ width: "200px", height: "200px", borderRadius: "100px" }} />
        <h2>{user.name}</h2>
        {type === "teacher" ?
          <div>
            <button className="btn btn-danger btn-sm" value={user.email} onClick={this.removeStudent}>Remove {user.name}</button>
          </div>
          : <div></div>
        }
      </div>
    );
    let pg=[]
    for (let i = 0; i < count; i++) {
      pg.push(<li class="page-item" onClick={this.pageClickHandler.bind(this,i+1)}><a class="page-link" >{i+1}</a></li>)
    }
    return (
      <div>
        <h2 className="text-center">Students</h2>
        <div id="content3">
          <div className="container">
            {user_name}
          </div>
        </div>
        <div>
        <ul class="pagination">
          {pg}
        </ul>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { people: state.people };
}
export default connect(mapStateToProps, { getPeople, removeStudent })(People);
