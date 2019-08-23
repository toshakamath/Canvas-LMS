import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const DISPLAY_ANNOUNCEMENT = "DISPLAY_ANNOUNCEMENT";
export const CREATE_ANNOUNCEMENT = "CREATE_ANNOUNCEMENT";
export const SET_ANNOUNCEMENT = "SET_ANNOUNCEMENT";

// const ROOT_URL = "http://18.191.157.136:3001";
export async function displayAnnouncement(data) {
  console.log("inside displayAnnouncement");
  const response = await axios.post(`${ROOT_URL}/home/displayannouncement`, data);
  console.log("Response displayAnnouncement", response);
  return {
    type: DISPLAY_ANNOUNCEMENT,
    payload: response.data
  };
}
export async function createAnnouncement(data, history) {
  console.log("inside createAnnouncement");
  const response = await axios.post(`${ROOT_URL}/home/createannouncement`, data);
  console.log("Response createAnnouncement", response);
    if(response.status===200)
        history.push(`/teacher/courses/${data.courseid}/announcements`);
    else
        history.push(`/teacher/courses/${data.courseid}/announcements/create`);
  return {
    type: CREATE_ANNOUNCEMENT,
    payload: {}
  };
}
export function setAnnouncement(data) {
    return {
        type: SET_ANNOUNCEMENT,
        payload: data
    }
}

//displayAnnouncement
// /home/displayannouncemen