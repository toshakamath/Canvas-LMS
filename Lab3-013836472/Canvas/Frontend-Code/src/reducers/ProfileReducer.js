import _ from "lodash";
// import { FETCH_BOOKS } from "../actions";
// import { FETCH_BOOKS } from "../actions";
import { FETCH_STUDENT_PROFILE, FETCH_STUDENT_PROFILE_EDIT, FETCH_STUDENT_PROFILE_UPDATE, SET_STUDENT_USERDETAILS } from "../actions/ProfileAction";
import Profile from "../components/Student/Profile";

//Reducer listening to different action types
//initial state is {}
export default function (state = {}, action) {
  switch (action.type) {
    //target 
    // case FETCH_BOOKS:
    case FETCH_STUDENT_PROFILE:
      //return _.mapKeys(action.payload.data, "BookID");
      return Object.assign({}, action.payload);
    case FETCH_STUDENT_PROFILE_EDIT:
      return Object.assign({}, action.payload);
    case FETCH_STUDENT_PROFILE_UPDATE:
      return Object.assign({}, action.payload);
    case SET_STUDENT_USERDETAILS:
      return Object.assign({}, { ...state }, {...action.payload});
    default:
      return state;
  }
}
