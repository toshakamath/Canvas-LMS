import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import jwt from "jsonwebtoken";
import {ROOT_URL} from '../../lib/constants';

//create the Navbar Component
class MenubarTeacher extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    return (
      <div>
        <nav id="sidebar">
            <a  href="/teacher/profile">
              <img src={`${ROOT_URL}/uploads/sjsu_logo.png`} />
            </a>
          <div id="menu">
            {/* <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link" data-toggle="pill" role="tab" ria-controls="v-pills-profile"><Link style={{color:"white"}} to="/teacher/profile" >Profile</Link></a>
              <a className="nav-link" data-toggle="pill" role="tab"><Link style={{color:"white"}} to="/teacher/coursehome" >Courses</Link></a>
              <a className="nav-link" data-toggle="pill" role="tab"><Link style={{color:"white"}} to="/teacher/files" >Files</Link></a>
              <a className="nav-link"><Link style={{color:"white"}} to="/teacher/courses" >Courses Temp</Link></a>
              <a className="nav-link"><Link style={{color:"white"}} to="/teacher/assignments" >Assignments Temp</Link></a>
              <a className="nav-link"><Link style={{color:"white"}} to="/teacher/announcements" >Announcements Temp</Link></a>
              <a className="nav-link"><Link style={{color:"white"}} to="/" onClick={this.handleLogout}>Logout</Link></a>
            </div> */}

            <ul className="list-group">
            <a href="/teacher/profile" className="list-group-item list-group-item-action list-group-item-primary text-center">Profile</a>
            <a href="/teacher/courses" className="list-group-item list-group-item-action list-group-item-primary text-center">Courses</a>
            <a href="/teacher/inbox" className="list-group-item list-group-item-action list-group-item-primary text-center">Inbox</a>
            {/* <a href="/teacher/files" className="list-group-item list-group-item-action list-group-item-primary text-center">Files</a>
            <a href="/teacher/courses" className="list-group-item list-group-item-action list-group-item-primary text-center">Courses T</a>
            <a href="/teacher/assignments" className="list-group-item list-group-item-action list-group-item-primary text-center">Assignments T</a>
            <a href="/teacher/announcements" className="list-group-item list-group-item-action list-group-item-primary text-center">Announcements T</a> */}
            </ul>

            {/* <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
              <a className="nav-link" data-toggle="pill" role="tab" aria-controls="v-pills-home">
              <Link style={{color:"white"}} to="/teacher/profile" >Profile</Link>
              </a>
              <a className="nav-link" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">
              <Link style={{color:"white"}} to="/teacher/coursehome" >Courses</Link></a>
              <a className="nav-link" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><Link style={{color:"white"}} to="/" onClick={this.handleLogout} >Logout</Link></a>
            </div> */}





          </div>
            <ul className="nav navbar-nav navbar-right text-center">
            <li>
              <Link style={{color:"white"}} to="/" onClick={this.handleLogout}>
                <div id="logout">
                  <span className="glyphicon glyphicon-user" />
                </div>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MenubarTeacher;
