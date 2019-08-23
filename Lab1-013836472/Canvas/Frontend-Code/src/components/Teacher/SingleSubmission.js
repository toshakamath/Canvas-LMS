import React, { Component } from 'react'
import axios from "axios";

export default class SingleSubmission extends Component {
    //get axios: name of student and filepath using submissionid    >inside didmount
    //post axios: grade of student into submissions table "score"   >onclick this.submitgrade
    constructor(props) {
        super(props);
        this.state = {
          assignmentdetails: [],
          showResults: false,
          showSubmit: true,
          score: null
        };
        //this.submitGrade = this.submitGrade.bind(this);
      }
      componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        let courseid =((this.props.match||{}).params||{}).courseid;
        let submissionid =((this.props.match||{}).params||{}).submissionid;
        //let email=this.state.assignmentdetails[0].email;
        const data = { email: email, assignmentid:assignmentid, courseid:courseid, submissionid:submissionid };
        console.log("DATAAAAAA:", data);
        
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
          .post("http://localhost:3001/teacher/assignment/view", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.setState({
              assignmentdetails: response.data  //name, email, submissions.submission id, submissions.filepath
            });
          });
      }
      gradeChangeHandler =(e)=>{
        this.setState({
          score:e.target.value
        });
      }
      submitGrade = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        // console.log("form data:", data);
        // console.log("upload ",this.state.upload);
        let assignmentid =((this.props.match||{}).params||{}).assignmentid;
        let courseid =((this.props.match||{}).params||{}).courseid;
        let submissionid =this.state.assignmentdetails[0].submissions[0].submissionid;
        let email=this.state.assignmentdetails[0].email;
        let grade=this.state.score;
        console.log("GRADEEEEE: ",grade);
        var em = JSON.parse(localStorage.getItem("userdata")).email;
        console.log("email ",em);
          // data.append("em", em);
          // data.append("name",this.state.name);
          // data.append("email",this.state.email);
          // data.append("phone",this.state.phone);
          // data.append("gender",this.state.gender);
          // data.append("aboutme",this.state.aboutme);
          // data.append("city",this.state.city);
          // data.append("company",this.state.company);
          // data.append("languages",this.state.languages);
          // data.append("school",this.state.school);
          // data.append("hometown",this.state.hometown);
          // console.log("this.state.upload: ",this.state.upload);
          // data.append("imageup", this.state.upload);
        //set the with credentials to true
        const data={email:email, courseid:courseid, assignmentid:assignmentid, submissionid:submissionid, grade:grade};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios
          .post("http://localhost:3001/teacher/assignment/grade", data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("response.data",response.data);
            if (response.status === 200) {
              //   this.setState({
              //     authFlag: true
              //   });
              //http://localhost:3000/teacher/courses/257/assignments/submissions/13
              //`/teacher/courses/${courseid}/assignments/submissions/${assignmentid}/display/${submissionid}`
              this.props.history.push(`/teacher/courses/${courseid}/assignments/submissions/${assignmentid}`);
            } else {
              //   this.setState({
              //     authFlag: false
              //   });
              this.props.history.push(`/teacher/courses/${courseid}/assignments/submissions/${assignmentid}/display/${submissionid}`);
            }
          });
      };
  render() {
            if(this.state.assignmentdetails[0]!==undefined){
            // console.log("STATEEEEEEEE: ",this.state.assignmentdetails);
            let name=this.state.assignmentdetails[0].name;
            // console.log("name: ",name);
            // let email=this.state.assignmentdetails[0].email;
            // console.log("email: ",email);
            let submissionid=this.state.assignmentdetails[0].submissions[0].submissionid;
            // console.log("submissions.submissionid: ",submissionid);
            let filepath=this.state.assignmentdetails[0].submissions[0].filepath;
            // console.log("submissions.filepath: ",filepath);
            let link="http://localhost:3000/"+filepath;
            console.log("link: ",link)
      // let name="Tosha Kamath"
      // let link="http://www.africau.edu/images/default/sample.pdf"
      // let submissionid=this.props.match.params.submissionid
    return (
      <div>
          <div>
              <h4>{name} | {submissionid}</h4>
              <label>Score: </label>
          <input style={{marginLeft:"20px"}} type="number" placeholder="give grade" onChange={this.gradeChangeHandler}/>
          <span style={{marginLeft:"30px"}}>
            <button onClick={this.submitGrade}  className="btn btn-info">Submit Grade</button>
          </span>
          </div>
          <br/>
          <div>
        <embed src={link} style={{width:'80%', height:"500px"}}></embed>
      </div>
      </div>
    )
  }
  else
  return null
}

  //in grade tab:
  //assignment name, score

  // for grades 
  // get list of all assignments using courseId - get latest submission of each assignment with score by sorting by desc and limitng to 1
  // display it as a list - with title and score / maxpoints

  // and done

}
