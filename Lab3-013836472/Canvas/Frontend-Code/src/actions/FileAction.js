import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const DISPLAY_FILES = "DISPLAY_FILES";
export const FILE_UPLOAD = "FILE_UPLOAD";
export const SET_FILEUPLOAD = "SET_FILEUPLOAD";


// const ROOT_URL = "http://18.191.157.136:3001";
export async function displayFiles(data) {
  console.log("inside displayFiles");
  const response = await axios.get(`${ROOT_URL}/home/displayfiles`, {params:data});
  console.log("Response displayFiles", response);
  return {
    type: DISPLAY_FILES,
    payload: response.data
  };
}
export async function fileUpload(data, history, courseid) {
  console.log("inside fileUpload");
  const response = await axios.post(`${ROOT_URL}/home/fileupload`, data);
  console.log("Response fileUpload", response);
    if(response.status===200)
        history.push(`/teacher/courses/${courseid}/files`);
    else
        history.push(`/teacher/courses/${courseid}/files/upload`);
  return {
    type: FILE_UPLOAD,
    payload: {}
  };
}
export function setFileUpload(data) {
    return {
        type: SET_FILEUPLOAD,
        payload: data
    }
}