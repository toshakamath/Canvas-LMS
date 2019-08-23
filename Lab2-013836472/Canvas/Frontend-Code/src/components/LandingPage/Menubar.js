import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ROOT_URL} from '../../lib/constants';

//create the Navbar Component
class Menubar extends Component {
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
        {/* {redirectVar} */}

        {/* <nav id="sidebar" className="nav nav-pills nav-stacked" role="tablist">
          <div>
            <a href="/student/profile" id="canvas">
              <img src="http://localhost:3001/uploads/sjsu_logo.png" />
            </a>
          </div>
          <div id="studentmenu">
            <ul className="nav nav-pills nav-stacked" role="tablist">
              <li id="profile" >
                <Link to="/student/profile">Profile</Link>
              </li>
              <li id="courses">
                <Link to="/student/courses">Courses</Link>
              </li>
              <li id="enrollment">
                <Link to="/student/enrollment">Enrollment</Link>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/" onClick={this.handleLogout}>
                <div id="logout">
                  <span className="glyphicon glyphicon-user" />
                </div>
                Logout
              </Link>
            </li>
          </ul> */}
          <nav id="sidebar">
            <a  href="/teacher/profile">
              <img src={`${ROOT_URL}/uploads/sjsu_logo.png`} />
            </a>
          <div id="menu">
            <ul className="list-group">
            <a href="/student/profile" className="list-group-item list-group-item-action list-group-item-primary text-center">Profile</a>
            <a href="/student/courses" className="list-group-item list-group-item-action list-group-item-primary text-center">Courses</a>
            <a href="/student/enrollment" className="list-group-item list-group-item-action list-group-item-primary text-center">Enrollment</a>
            <a href="/student/inbox" className="list-group-item list-group-item-action list-group-item-primary text-center">Inbox</a>
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

export default Menubar;
