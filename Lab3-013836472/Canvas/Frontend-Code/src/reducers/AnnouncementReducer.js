import _ from "lodash";
import { DISPLAY_ANNOUNCEMENT } from "../actions/AnnouncementAction";
import { CREATE_ANNOUNCEMENT } from "../actions/AnnouncementAction";
import { SET_ANNOUNCEMENT } from "../actions/AnnouncementAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {displayannouncement:[], createannouncement:{}, setannouncement:{}}, action) {
  switch (action.type) {
    case DISPLAY_ANNOUNCEMENT:
        return Object.assign({}, { ...state }, {displayannouncement: action.payload});
    case CREATE_ANNOUNCEMENT:
        return Object.assign({}, { ...state }, {createannouncement: action.payload});
    case SET_ANNOUNCEMENT:
        return Object.assign({}, { ...state }, {setannouncement: { ...state.setannouncement, ...action.payload}});
    default:
      return state;
  }
}