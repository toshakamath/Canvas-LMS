import _ from "lodash";
import { DISPLAY_COURSES } from "../actions/CoursesAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {displaycourses:[] }, action) {
  switch (action.type) {
    case DISPLAY_COURSES:
        return Object.assign({}, { ...state }, {displaycourses: action.payload});
    default:
      return state;
  }
}