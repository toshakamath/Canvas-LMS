import axios from "axios";
import {ROOT_URL} from '../lib/constants';
export const DISPLAY_ASSIGNMENT = "DISPLAY_ASSIGNMENT";
export const CREATE_ASSIGNMENT = "CREATE_ASSIGNMENT";
export const SET_ASSIGNMENT = "SET_ASSIGNMENT";
export const VIEW_ALL_SUBMISSIONS = "VIEW_ALL_SUBMISSIONS";
export const VIEW_SINGLE_SUBMISSION = "VIEW_SINGLE_SUBMISSION";
export const SET_GRADE = "SET_GRADE";
export const GIVE_GRADE = "GIVE_GRADE";
export const SET_UPLOAD = "SET_UPLOAD";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const ASSIGNMENT_INFO = "ASSIGNMENT_INFO";

// const ROOT_URL = "http://18.191.157.136:3001";
export async function displayAssignment(data) {
  console.log("inside displayAssignment");
  const response = await axios.post(`${ROOT_URL}/home/displayassignment`, data);
  console.log("Response displayAssignment", response);
  return {
    type: DISPLAY_ASSIGNMENT,
    payload: response.data
  };
}
export async function createAssignment(data, history) {
    console.log("inside createAssignment");
    const response = await axios.post(`${ROOT_URL}/home/createassignment`, data);
    console.log("Response createAssignment", response);
      if(response.status===200)
        history.push(`/teacher/courses/${data.courseid}/assignments`);
      else
        history.push(`/teacher/courses/${data.courseid}/assignments/create`);
    return {
      type: CREATE_ASSIGNMENT,
      payload: {}
    };
  }
  export function setAssignment(data) {
      return {
          type: SET_ASSIGNMENT,
          payload: data
      }
  }
export async function viewAllSubmissions(data) {
  console.log("inside viewAllSubmissions");
  const response = await axios.post(`${ROOT_URL}/teacher/viewsubmissions`, data);
  console.log("Response viewAllSubmissions", response);
  return {
    type: VIEW_ALL_SUBMISSIONS,
    payload: response.data
  };
}
  export async function viewSingleSubmission(data) {
    console.log("inside viewSingleSubmission");
    const response = await axios.post(`${ROOT_URL}/teacher/assignment/view`, data);
    console.log("Response viewSingleSubmission", response);
    return {
      type: VIEW_SINGLE_SUBMISSION,
      payload: response.data
    };
  }
  export function setGrade(data) {
    console.log("inside setGrade: ", data);
    return {
        type: SET_GRADE,
        payload: data
    }
}
export async function giveGrade(data, history) {
  console.log("inside giveGrade: ", data);
  const response = await axios.post(`${ROOT_URL}/teacher/assignment/grade`, data);
  console.log("Response giveGrade", response);
    if(response.status===200)
      history.push(`/teacher/courses/${data.courseid}/assignments/submissions/${data.assignmentid}`);
    else
      history.push(`/teacher/courses/${data.courseid}/assignments/submissions/${data.assignmentid}/display/${data.submissionid}`);
  return {
    type: GIVE_GRADE,
    payload: {}
  };
}
export function setUpload(data) {
  console.log("inside setUpload: ", data);
  return {
      type: SET_UPLOAD,
      payload: data
  }
}
//home/fileupload
export async function uploadFile(data) {
console.log("inside uploadFile: ", data);
const response = await axios.post(`${ROOT_URL}/assignment/submit`, data);
console.log("Response uploadFile", response);
return {
  type: UPLOAD_FILE,
  payload: response.data
};
}
export async function getAssignmentDetails(data){
  console.log("inside getAssignmentDetails: ", data);
  const response =  await axios.post(`${ROOT_URL}/assignment/details`, data);
  console.log("Response getAssignmentDetails", response);
  return {
  type: ASSIGNMENT_INFO,
  payload: response.data
};
}
