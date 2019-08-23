import axios from "axios";
import {ROOT_URL} from '../lib/constants';
//export const FETCH_BOOKS = "fetch_books";
export const FETCH_STUDENT_PROFILE = "FETCH_STUDENT_PROFILE";
export const FETCH_STUDENT_PROFILE_EDIT = "FETCH_STUDENT_PROFILE_EDIT";
export const FETCH_STUDENT_PROFILE_UPDATE = "FETCH_STUDENT_PROFILE_UPDATE";
export const SET_STUDENT_USERDETAILS = "SET_STUDENT_USERDETAILS";
//export const CREATE_BOOK = "create_book";


// const ROOT_URL = "http://18.191.157.136:3001";

//target action
// export function fetchBooks() {
export async function fetchProfile(data) {
  let type = data.type;
  console.log("data.type >> ", data.type);
    //middleware call
    //receive response from backend
    const response = await axios.post(`${ROOT_URL}/profile`, data);
    //Action dispatched
    console.log("Response", response);
    return {
      // type: FETCH_BOOKS,
      type: FETCH_STUDENT_PROFILE,
      payload: response.data[0]
    };
}
export async function updateProfile(data, type,cb) {
  type = type || null;
  console.log("data.type > ", type);
    //middleware call
    //receive response from backend
    console.log("SENDING DATA FD ", data);
    const response = await axios.post(`${ROOT_URL}/profile/update`, data);
    //Action dispatched
    console.log("Response", response);
    cb();
    return {
      // type: FETCH_BOOKS,
      type: FETCH_STUDENT_PROFILE_UPDATE,
      payload: response.data[0]
    };
}
export function setUserDetails(data) {

  return {
    type: SET_STUDENT_USERDETAILS,
    payload: data
  }
}
