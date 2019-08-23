import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {displayMessages} from "../../actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";

class ConversationsList extends Component {
    componentDidMount() {
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(email);
        const data = { email: email };
        console.log(data);
        this.props.displayMessages(data);
      }
      createMessage = (e) => {
        e.preventDefault();
            if(localStorage.getItem("type")==="student")
            this.props.history.push(`/student/inbox/createmessage`);
            else
            this.props.history.push(`/teacher/inbox/createmessage`);
      };
      render() {
        // (2) [{…}, {…}]
    // 0:
    // date: "Sat Apr 13 2019 01:53:31 GMT-0700 (Pacific Daylight Time)"
    // message: "message tosha-paul"
    // receiver: "paul.nguyen@gmail.com"
    // sender: "toshakamath@gmail.com"
    // subject: "subject tosha-paul"
    // _id: "5cb1a38bd311bb3d3805ede8"
    let type=localStorage.getItem("type");
    let route=""
        if(type==="student"){
            route="student/inbox"
        }
        else{
            route="teacher/inbox"
        }
        console.log("this.props.message.viewmessages", this.props);
        let _id=this.props.match.params;
        console.log("params: ", _id);
        let details = (this.props.message.viewmessages||[]).map((d) => {
          return (
              <div class="small">
                <Link to={`/${route}/${d._id}`}>
                <tr>
                  <td>Sender: {d.originalsender}</td>
                  </tr>
                  <tr>
                  <td>Receiver: {d.originalreceiver}</td>
                  </tr>
                  <tr>
                  <td>Time: {d.date}</td>
                  </tr>
                <tr>
                  <td>Subject: {d.subject}</td>
                </tr>
                <tr>
                  {/* <td>Message: {d.messages}</td> */}
                </tr>
                </Link>
                <hr/>
                </div>
          );
        });
        return (
          <div id="content">
            <div className="container">
              <h2>Conversations</h2>
              {details}
              <div style={{ width: "30%" }}>
                  <button
                    onClick={this.createMessage}
                    className="btn btn-success"
                    type="submit"
                  >
                    Create Message
                  </button>
                </div>
            </div>
          </div>
        );
      }
}
function mapStateToProps(state) {
    return { message: state.message };
  }
  export default connect(mapStateToProps, { displayMessages })(ConversationsList);
  