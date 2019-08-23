import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const FETCH_PEOPLE = "FETCH_PEOPLE";
export const SET_MESSAGE = "SET_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const DISPLAY_MESSAGES = "DISPLAY_MESSAGES";
export const REPLY_MESSAGES = "REPLY_MESSAGES";
export const NEW_MESSAGE = "NEW_MESSAGE";


// const ROOT_URL = "http://18.191.157.136:3001";

export async function fetchPeople(data) {
  console.log("ResponseSSSSSSSSSSS before: ", data);
    const response = await axios.get(`${ROOT_URL}/inbox/peopledetails`);
    console.log("ResponseSSSSSSSSSSS after: ", response);
    return {
      type: FETCH_PEOPLE,
      payload: response.data
    };
}
export async function sendMessage(data, history) {
  //sender,receiver,subject, message, date
  let type=data.type;
    console.log("SENDING DATA FD ", data);
    const response = await axios.post(`${ROOT_URL}/inbox/sendmessage`, data);
    console.log("Response", response);
    if(response.status===200){
      if(type==="student")
        history.push(`/student/inbox`);
      else
        history.push(`/teacher/inbox`);
    }
    else{
      if(type==="student")
        history.push(`/student/inbox/createmessage`);
      else
        history.push(`/teacher/inbox/createmessage`);
    }
    return {
      type: SEND_MESSAGE,
      payload: response.data
    };
}
export function setMessage(data) {

  return {
    type: SET_MESSAGE,
    payload: data
  }
}
export async function displayMessages(data) {
  console.log("inside displayMessages: ", data);
  const response = await axios.post(`${ROOT_URL}/inbox/displaymessages`, data);
  console.log("Response displayMessages", response);
  return {
    type: DISPLAY_MESSAGES,
    payload: response.data
  };
}

export async function replyMessages(data, history){
  console.log("inside replyMessages", data);
  let type=data.type;
  const response = await axios.post(`${ROOT_URL}/inbox/reply`, data);
  console.log("Response replyMessages", response);
  if(type==="student")
  history.push(`/student/inbox/${data._id}`);
  else
  history.push(`/teacher/inbox/${data._id}`);
  return {
    type: REPLY_MESSAGES,
    payload: {}
  };
}
export function newMessage(data) {

  return {
    type: NEW_MESSAGE,
    payload: data
  }
}