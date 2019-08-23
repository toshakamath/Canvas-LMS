import _ from "lodash";
import { LOGIN_REQUEST, SET_LOGIN_VALUES, REGISTER_REQUEST, SET_REGISTER_VALUES,LOGIN_REQUEST_ERROR } from "../actions/AuthAction";
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, action.payload); //object.assign(source, target)
      case LOGIN_REQUEST_ERROR:
      return Object.assign({}, {
        error : action.payload
      }); //object.assign(source, target)
    case SET_LOGIN_VALUES:
      return Object.assign({}, { ...state }, { ...action.payload });  //... merges the state and payload into a single new obj 
      //... also used to copy a single dim array
    case REGISTER_REQUEST:
      return Object.assign({}, action.payload);
    case SET_REGISTER_VALUES:
      return Object.assign({}, { ...state }, { ...action.payload });
    default:
      return state;
  }
}
