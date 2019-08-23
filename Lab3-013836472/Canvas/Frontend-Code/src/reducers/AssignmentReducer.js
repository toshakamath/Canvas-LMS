import _ from "lodash";
import { ASSIGNMENT_INFO, DISPLAY_ASSIGNMENT, CREATE_ASSIGNMENT, SET_ASSIGNMENT, VIEW_SINGLE_SUBMISSION, VIEW_ALL_SUBMISSIONS, SET_GRADE, GIVE_GRADE, SET_UPLOAD, UPLOAD_FILE } from "../actions/AssignmentAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {assignmentinfo:[{}], displayassignment:[], createassignment:{}, setassignment:{}, viewallsubmissions:[], viewsinglesubmission:[], setgrade:{}, givegrade:{}, setupload:{}, filedetails:{} }, action) {
  switch (action.type) {
    case DISPLAY_ASSIGNMENT:
        return Object.assign({}, { ...state }, {displayassignment: action.payload});
    case CREATE_ASSIGNMENT:
        return Object.assign({}, { ...state }, {createassignment: action.payload});
    case SET_ASSIGNMENT:
        return Object.assign({}, { ...state }, {setassignment: { ...state.setassignment, ...action.payload}});
    case VIEW_ALL_SUBMISSIONS:
        return Object.assign({}, { ...state }, {viewallsubmissions: action.payload});
    case VIEW_SINGLE_SUBMISSION:
        return Object.assign({}, { ...state }, {viewsinglesubmission: action.payload});
    case SET_GRADE:
        return Object.assign({}, { ...state }, {setgrade: { ...state.setgrade, ...action.payload}});
    case GIVE_GRADE:
        return Object.assign({}, { ...state }, {givegrade: action.payload});
    case SET_UPLOAD:
        return Object.assign({}, { ...state }, {setupload: { ...state.setupload, ...action.payload}});
    case UPLOAD_FILE:
        return Object.assign({}, { ...state }, {filedetails: action.payload});
    case ASSIGNMENT_INFO:
        return Object.assign({}, { ...state }, {assignmentinfo: action.payload});
    default:
      return state;
  }
}
