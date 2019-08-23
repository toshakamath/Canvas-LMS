import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { fetchProfile } from "../../actions/ProfileAction";
import _ from "lodash";
import { connect } from "react-redux";
import {ROOT_URL} from '../../lib/constants';
import { graphql, compose, withApollo } from "react-apollo";
import {getUserQuery} from '../../queries/queries'; 

class Profile extends Component {
  componentDidMount() {
    //call to action
    const email = JSON.parse(localStorage.getItem("userdata")||{}).email;
    const type = JSON.parse(localStorage.getItem("userdata")||{}).type;
    console.log(email);
    console.log(type);
    // this.props.fetchProfile(data);
    this.props.client.query({
      query : getUserQuery,
      variables: {
        email: email,
        type: type
      }
  }).then((response)=>{
      console.log('Response user', response.data);
      const result = response.data.user;
      var keyArray = Object.keys(response.data.user);

      for (var i = 0; i < keyArray.length; i++) {
          console.log('keyArr', keyArray[i]);
          var name = keyArray[i];
          console.log('result[i]', result[name])
          this.setState({
              [name]: result[name]
          });
      }
      console.log('state', this.state);
      });
  console.log('data:', this.props.data);
  }
  editProfile = (e) => {
    // console.log("Inside edit student profile");
    e.preventDefault();
    if(localStorage.getItem("type")=="student")
      this.props.history.push("/student/profile/edit");
    else
      this.props.history.push("/teacher/profile/edit");
  };
  render() {
    console.log("USER: ",this.props.userdetails);
    console.log("DATAAAA: ",this.state);
    return (
      <div>
      <h2 class="text-center">Profile</h2>
      <div id="content3">
        <div class="container">
          <div id="displayprofile">
            <img src={`${ROOT_URL}/${(this.state||{}).image || "uploads/profile/img_default.jpg"}`} alt={(this.state||{}).name} style={{ width: "200px", height: "200px",borderRadius:"100px"}} />
            <h1>{(this.state||{}).name}</h1>
            <p>Email: {(this.state||{}).email}</p>
            <p>Phone: {(this.state||{}).phone}</p>
            <p>Gender: {(this.state||{}).gender}</p>
            <p>About me: {(this.state||{}).aboutme || ""}</p>
            <p>City: {(this.state||{}).city}</p>
            <p>Company: {(this.state||{}).company}</p>
            <p>Languages: {(this.state||{}).languages}</p>
            <p>School: {(this.state||{}).school}</p>
            <p>Hometown: {(this.state||{}).hometown}</p>
            {/* {this.renderProfile()} */}
          </div>
          <div>
            <button
              onClick={this.editProfile}
              class="btn btn-success"
              type="submit"
            >
              Edit profile
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { userdetails: state.userdetails };
}

// export default compose(
//   connect(mapStateToProps, { fetchProfile }),
//   graphql (getUserQuery)
// )(Profile);

export default withApollo(Profile);

