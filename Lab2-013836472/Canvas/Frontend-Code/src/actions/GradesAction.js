import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const DISPLAY_GRADES = "DISPLAY_GRADES";


// const ROOT_URL = "http://18.191.157.136:3001";
export async function displayGrades(data) {
  console.log("inside displayGrades");
  const response = await axios.post(`${ROOT_URL}/student/displaygrade`, data);
  console.log("Response displayGrades", response);
  return {
    type: DISPLAY_GRADES,
    payload: response.data
  };
}