import _ from "lodash";
import { SET_SEARCH, SEARCH_RESULTS, ENROLL } from "../actions/EnrollmentAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {search:{}, searchresults:[], enroll:{}}, action) {
  switch (action.type) {
    case SET_SEARCH:
        return Object.assign({}, { ...state }, {search: {...state.search, ...action.payload}});
    case SEARCH_RESULTS:
        return Object.assign({}, { ...state }, {searchresults: action.payload});
    case ENROLL:
    //{ ...state } > create a new object and add previous state already present in store
    //{enroll: {...state.enroll, ...action.payload}} > adding the action.payload to the already existing state.enroll > that is because we are changing only enroll in the entire state so we have to create a copy again
        return Object.assign({}, { ...state }, {enroll: {...state.enroll, ...action.payload}}); 
    default:
      return state;
  }
}
