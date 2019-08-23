import React, { Component } from "react";
import "../../App.css";
import { displayMessages, replyMessages, newMessage } from "../../actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { EEXIST } from "constants";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
  }
  // componentDidMount() {
  //   const email = JSON.parse(localStorage.getItem("userdata")).email;
  //   console.log(email);
  //   const data = { email: email };
  //   console.log(data);
  //   // this.props.displayMessages(data);
  // }
  reply = (e) => {
    this.setState({
      showComponent: true
    })
  }
  onChangeHandler = (e) => {
    this.props.newMessage({
      [e.target.name]: e.target.value
    });
  };

  send = (e) => {
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID inside reply: ", _id)
    console.log("this.props.messagedetails.receiver", this.props);  //{message: "this is a new message"}
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem("userdata")).email;
    console.log(email);
    console.log("this.props.message: ", this.props.message);
    let sender="", receiver="";
    // originalsender=tosha
    // originalreceiver=paul
    // localStorage=tosha always
    if(email== this.props.message.viewmessages[0].originalsender)
    {
      sender=email;
      receiver=this.props.message.viewmessages[0].originalreceiver;
    }
    else{
      sender=this.props.message.viewmessages[0].originalreceiver;
      receiver=this.props.message.viewmessages[0].originalsender;
    }
    const data = { email: email, _id: _id, date: Date(Date.now()), newmessage: this.props.message.newmessagedetails.message, 
      sender: sender, receiver:receiver, type:localStorage.getItem("type") };
    console.log("data sent to action", data);
    this.props.replyMessages(data, this.props.history);
  };
  render() {
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID: ", _id);
    
    let d_id=(this.props.message.viewmessages|| []).map((d) => {
      return d._id;
    });
    console.log(d_id);
    console.log(this.props.message.viewmessages);
    //this.props.viewmessages[0].messages < map
    let details={}, subject={};
    for (let index = 0; index < ((this.props.message||{}).viewmessages||[]).length; index++) {
      if(_id===this.props.message.viewmessages[index]._id){
        details=this.props.message.viewmessages[index]
        // subject=((this.props.message.viewmessages||{})[0]||[]).subject[index]
      }
    }
    console.log("details: ",details);
    let htmldetails =(details.messages||[]).map((d) => {
        return (
          <div>
          {/* <h4>Conversations {_id}</h4> */}
          <ol>
          <li className="list-group-item">
            <label>Sender: </label> <span> {d.sender}</span>
            <span style={{ float: "right" }}>
              <small> {(d.date)||"".slice(0, 25)}</small>
            </span>
            <label style={{ float: "right" }}>
              <small>Date:- </small>
            </label>
            <br />
            <label>Receiver: </label> <span> {d.receiver}</span>
            <br />
            <label>Message: </label>
            <br />
            <span> {d.message}</span>
            <br />
            {/* {
              d.messages.map((e) => {
                <div>
                  <label>Message: </label>
                  <br />
                  <span> {e.message}</span>
                  <br />
                </div>
              })
            } */}
          </li>
          </ol>
          </div>
        );
      
    });
    return (
      <div id="content">
        <div className="container">
        <h4>Conversations {details.subject}</h4>
            {htmldetails}
          <div style={{ width: "30%" }}>
            {this.state.showComponent ? null :
              <button
                onClick={this.reply}
                className="btn btn-success"
                type="submit"
                name="reply"
              >
                Reply
              </button>
            }
            {this.state.showComponent ?
              <div>
                <div style={{ paddingLeft: "40px", width: "800px" }} className="form-group">
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
                <div style={{ paddingLeft: "40px" }} className="form-group">
                  <button
                    onClick={this.send}
                    className="btn btn-success"
                    type="submit"
                    name="send"
                    value={_id}
                  > Send</button>
                </div>
              </div> :
              null
            }
          </div>
        </div>
      </div>
    );
    // else{
    //   return(
    //     <div>
    //       This is an error {id_table} is not equal to {_id}
    //     </div>
    //   )
    // }
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { displayMessages, replyMessages, newMessage })(Inbox);
