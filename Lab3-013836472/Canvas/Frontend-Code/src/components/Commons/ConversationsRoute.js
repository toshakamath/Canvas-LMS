import React, { Component } from 'react';
import {Link} from "react-router-dom";
import auth from "../../lib/auth";
import Inbox from './Inbox';
import CourseList from "../LandingPage/CourseList";
import { Route } from "react-router-dom";
import { Switch} from "react-router";
import ConversationsList from "./ConversationsList"
import CreateMessage from './CreateMessage';

export default class ConversationsRoute extends Component {
    //get inbox: courseid, subjectid, sender_id, receiver_id, subject, message
  render() {

    return (
    // <div className="list-group" id="myList" role="tablist" style={{paddingTop:"4px", marginLeft:"-40px", width:"95%"}}>
    //   <Link className="list-group-item list-group-item-action" to={``}>Conversation i</Link>
    // </div>
    <div className="container">
      <div className="row">
      <div className="col-md-3">
      <div class="btext">
        <ConversationsList {...this.props}/>
        </div>
        </div>
          <div className="col-md-9">
            <Switch>
                <Route path="/student/inbox/createmessage" component={CreateMessage}/>
                <Route path="/teacher/inbox/createmessage" component={CreateMessage}/>
                {/* <Route path="/student/inbox/:conv_id/createmessage" component={CreateMessage}/> */}
                <Route path="/student/inbox/:_id" component={Inbox}/>
                <Route path="/teacher/inbox/:_id" component={Inbox}/>
            </Switch>
          </div>
      </div>
      </div>
    )
  }
}
