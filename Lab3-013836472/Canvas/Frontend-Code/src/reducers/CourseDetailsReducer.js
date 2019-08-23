import _ from "lodash";
import { COURSE_DETAILS } from "../actions/CourseDetailsAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {coursedetails:[] }, action) {
  switch (action.type) {
    case COURSE_DETAILS:
        return Object.assign({}, { ...state }, {coursedetails: action.payload});
    default:
      return state;
  }
}