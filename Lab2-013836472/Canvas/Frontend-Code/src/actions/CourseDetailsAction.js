import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const COURSE_DETAILS = "COURSE_DETAILS";


// const ROOT_URL = "http://18.191.157.136:3001";
export async function getCourseDetails(data) {
  console.log("inside getCourseDetails");
  const response = await axios.post(`${ROOT_URL}/teacher/courses/home`, data);
  console.log("Response getCourseDetails", response);
  return {
    type: COURSE_DETAILS,
    payload: response.data
  };
}