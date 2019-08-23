import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import {fetchPeople, sendMessage, setMessage} from "../../actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";

class CreateMessage extends Component {
    componentDidMount() {
        //call to action
        const email = JSON.parse(localStorage.getItem("userdata")).email;
        //console.log(email);
        const data = {
          email: email,
          type: localStorage.getItem("type")
        };
        console.log("email LOG", data);
        this.props.fetchPeople(data);
      }
    onChangeHandler = (e) => {
        this.props.setMessage({
          [e.target.name]: e.target.value
        });
      };
    displayMessages=(e)=>{
        e.preventDefault();
        this.props.history.push(`/student/inbox`);
    }
    sendMessage = (e) => {
        console.log("inside sendMessage API CALL");
        console.log("this.props.messagedetails.receiver", this.props.message.messagedetails);
        // console.log(this.props.messagedetails.subject);
        // console.log(this.props.messagedetails.message);
        e.preventDefault();
        var em = JSON.parse(localStorage.getItem("userdata")).email;
        console.log(em);
        const data = {
            //sender: em, receiver, subject, message, date
            sender: em,
            receiver: this.props.message.messagedetails.receiver,
            subject: this.props.message.messagedetails.subject,
            message: this.props.message.messagedetails.message,
            date: Date(Date.now()),
            type: localStorage.getItem("type")
        };
        console.log("data", data);
        this.props.sendMessage(data, this.props.history);
    };
  render() {
      console.log("this.props.message: ", this.props.message);
      let details = this.props.message.people.map((m) => {
        return (
                <option value={m.email}>{m.name}</option>
            );
        });
    return (
      <div id="content">
        <h1>Create a Message</h1>
        <form method="post">
            <div>
                <div style={{ width: "30%" }} className="form-group">
                    <label>Receiver:</label>
                    <select className="form-control" onChange={this.onChangeHandler} name="receiver" placeholder="receiver">
                    {details}
                    </select>
                </div>
            </div>
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="subject"
              placeholder="subject"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <textarea
              rows="4"
              cols="50"
              onChange={this.onChangeHandler}
              type="text"
              className="form-control"
              name="message"
              placeholder="message"
            />
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button
              onClick={this.sendMessage}
              className="btn btn-success"
              type="submit"
            >
              Send Message
            </button>
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button onClick={this.displayMessages} className="btn btn-success" type="submit">
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { fetchPeople, sendMessage, setMessage })(CreateMessage);

