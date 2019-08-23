import _ from "lodash";
import { DISPLAY_GRADES } from "../actions/GradesAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {displaygrades:[]}, action) {
  switch (action.type) {
    case DISPLAY_GRADES:
        return Object.assign({}, { ...state }, {displaygrades: action.payload});
    default:
      return state;
  }
}