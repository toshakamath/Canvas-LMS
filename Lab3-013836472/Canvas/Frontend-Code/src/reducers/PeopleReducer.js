import _ from "lodash";
import { GET_PEOPLE, REMOVE_STUDENT } from "../actions/PeopleAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {getpeople:[], removestudent:{}}, action) {
  switch (action.type) {
    case GET_PEOPLE:
        return Object.assign({}, { ...state }, {getpeople: action.payload});
    case REMOVE_STUDENT:
        return Object.assign({}, { ...state }, {removestudent: action.payload});
    default:
      return state;
  }
}
