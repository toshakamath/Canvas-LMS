import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Menubar from "../LandingPage/Menubar";
import { fetchProfile, updateProfile, setUserDetails } from "../../actions/ProfileAction";
import _ from "lodash";
import { connect } from "react-redux";
import {ROOT_URL} from '../../lib/constants';
import { graphql, compose, withApollo } from "react-apollo";
import {getUserQuery} from '../../queries/queries'; 
import {updateUserMutation} from '../../mutations/mutations';

class EditProfile extends Component {
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
  onChangeHandler = (e) => {
    // this.props.setUserDetails({
    //   [e.target.name]: e.target.value
    // });
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangeHandlerFile = (e) => {
    this.props.setUserDetails({
      upload: e.target.files[0],
    });
  };

  updateProfile = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // var data = new FormData();
    //console.log("form data:", data);
    console.log("userdetails >  ",this.props.userdetails);
    console.log("data >  ",(this.state||{}));
    const em = JSON.parse(localStorage.getItem("userdata")||{}).email;
    const type = JSON.parse(localStorage.getItem("userdata")||{}).type;
    console.log(em);
    console.log(type);
    console.log("PROPSSS: ",this.props)
    this.props.client.mutate({
      mutation:updateUserMutation,
      variables: {
          em:em,
          name: (this.state||{}).name||"",
          phone: (this.state||{}).phone||"",
          gender: (this.state||{}).gender||"",
          aboutme: (this.state||{}).aboutme||"",
          city: (this.state||{}).city||"",
          company: (this.state||{}).company||"",
          languages: (this.state||{}).languages||"",
          school: (this.state||{}).school||"",
          hometown: (this.state||{}).hometown||"",
          type: type
      },
      refetchQueries: [{ query: getUserQuery }]
  });
    if(localStorage.getItem("type")=="student")
      this.props.history.push("/student/profile");
    else
      this.props.history.push("/teacher/profile");
  };

  render() {
    console.log("LOGGGGGGGG:",(this.state||{}));
    console.log("DATAAAA: ",(this.props.data||{}).user);
    return (
      <div>
      <h2 class="text-center">{(this.state||{}).name} profile</h2>
      <div id="content">
        <div class="container">
          <form method="post">
            <div style={{ width: "30%" }} class="form-group">
              <img src={`${ROOT_URL}/${(this.state||{}).image}`} alt="update photo" name="image" value={(this.state||{}).image} style={{ width: "100%" }} />
              <div style={{ width: "30%" }} class="form-group">
              <label>Choose file</label>
            <input
              type="file"
              key="upload"
              name="imageup"
              onChange={this.onChangeHandlerFile}
            />
            </div>
            </div>
            <br/>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).name} value={(this.state||{}).name} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="name"
                placeholder="name"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).email} value={(this.state||{}).email} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="email"
                placeholder="email" disabled/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).gender} onChange={this.onChangeHandler}
              value={(this.state||{}).gender}
                type="text"
                class="form-control"
                name="gender"
                placeholder="gender"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).phone} value={(this.state||{}).phone} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="phone"
                placeholder="phone"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).aboutme} value={(this.state||{}).aboutme} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="aboutme"
                placeholder="aboutme"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).city} value={(this.state||{}).city} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="city"
                placeholder="city"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).company} value={(this.state||{}).company} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="company"
                placeholder="company"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).languages} value={(this.state||{}).languages} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="languages"
                placeholder="languages"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).school} value={(this.state||{}).school} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="school"
                placeholder="school"/>
            </div>
            <div style={{ width: "30%" }} class="form-group">
              <input defaultValue={(this.state||{}).hometown} value={(this.state||{}).hometown} onChange={this.onChangeHandler}
                type="text"
                class="form-control"
                name="hometown"
                placeholder="hometown"/>
            </div>
          <div>
            <button
              onClick={this.updateProfile}
              class="btn btn-success"
              type="submit"
            >
              Update profile
            </button>
          </div>
          </form>
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
//   connect(mapStateToProps, { fetchProfile , updateProfile,setUserDetails}),
//   graphql(updateUserMutation),
//   graphql(getUserQuery)
//   )(EditProfile);

  export default withApollo(EditProfile);
