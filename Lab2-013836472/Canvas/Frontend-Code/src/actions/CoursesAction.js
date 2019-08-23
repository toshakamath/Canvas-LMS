import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const DISPLAY_COURSES = "DISPLAY_COURSES";


// const ROOT_URL = "http://18.191.157.136:3001";
export async function displayCourses(data) {
  console.log("inside displayCourses");
  const response = await axios.post(`${ROOT_URL}/student/displaycourse`, data);
  console.log("Response displayCourses", response);
  return {
    type: DISPLAY_COURSES,
    payload: response.data
  };
}