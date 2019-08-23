import _ from "lodash";
import { FETCH_PEOPLE, SET_MESSAGE, SEND_MESSAGE, DISPLAY_MESSAGES, REPLY_MESSAGES, NEW_MESSAGE } from "../actions/MessageAction";

export default function (state = {people:[], messagedetails:[], sendmessage:{}, newmessagedetails:[]}, action) {
    switch (action.type) {
      case FETCH_PEOPLE:
          return Object.assign({}, { ...state }, {people: action.payload});
      case SET_MESSAGE:
          return Object.assign({}, { ...state }, {messagedetails: {...state.messagedetails, ...action.payload}});
      case SEND_MESSAGE:
          return Object.assign({}, { ...state }, {sendmessage: action.payload});
        case DISPLAY_MESSAGES:
            return Object.assign({}, { ...state }, {viewmessages: action.payload});
        case REPLY_MESSAGES:
            return Object.assign({}, { ...state }, {replymessages: action.payload});
        case NEW_MESSAGE:
            return Object.assign({}, { ...state }, {newmessagedetails: {...state.newmessagedetails, ...action.payload}});
      default:
        return state;
    }
  }