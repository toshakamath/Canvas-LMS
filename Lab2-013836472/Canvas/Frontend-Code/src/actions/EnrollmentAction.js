import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const SET_SEARCH = "SET_SEARCH";
export const SEARCH_RESULTS = "SEARCH_RESULTS";
export const ENROLL = "ENROLL";


// const ROOT_URL = "http://18.191.157.136:3001";

//target action
export async function setSearch(data) {
  return {
    type: SET_SEARCH,
    payload: data
  };
}
export async function searchResults(data) {

  //middleware call
  //receive response from backend
  const response = await axios.post(`${ROOT_URL}/search/`, data);
  //Action dispatched
  console.log("Response", response);
  return {
    // type: FETCH_BOOKS,
    type: SEARCH_RESULTS,
    payload: response.data
  };
}

export async function enroll(data, history) {

  //middleware call
  //receive response from backend
  console.log("SENDING DATA FD ",data);
  const response = await axios.post(`${ROOT_URL}/enroll/`, data);
  //Action dispatched
  console.log("Response", response);
  if(response.status===200)
        history.push("/student/courses");
  return {
    type: ENROLL,
    payload: response.data
  };
}


// export function setUserDetails(data) {

//   return {
//     type  :SET_STUDENT_USERDETAILS,
//     payload : data
//   }
// }

// export function createBook(values, callback) {
//   const request = axios
//     .post(`${ROOT_URL}/book`, values)
//     .then(() => callback());

//   return {
//     // type: FETCH_BOOKS,
//     type: FETCH_STUDENT_PROFILE,
//     payload: request
//   };
// }

