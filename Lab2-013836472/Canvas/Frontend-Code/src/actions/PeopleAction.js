import axios from "axios";
import {ROOT_URL} from '../lib/constants';
// import * as constants from "../constants"
export const GET_PEOPLE = "GET_PEOPLE";
export const REMOVE_STUDENT = "REMOVE_STUDENT";


// const ROOT_URL = "http://18.191.157.136:3001";
export async function getPeople(data) {
  //middleware call
  //receive response from backend
  //added data.pageno
  console.log("inside getPeople", data);
  const response = await axios.get(`${ROOT_URL}/teacher/courses/people`, {params: data});
  //Action dispatched
  console.log("Response getPeople", response);
  return {
    type: GET_PEOPLE,
    payload: response.data
  };
}
export async function removeStudent(data) {
  console.log("inside removeStudent");
  const response = await axios.post(`${ROOT_URL}/student/dropcourse`, data);
  console.log("Response removeStudent", response);
  return {
    type: REMOVE_STUDENT,
    payload: response.data
  };
}