import _ from "lodash";
import { DISPLAY_FILES } from "../actions/FileAction";
import { FILE_UPLOAD } from "../actions/FileAction";
import { SET_FILEUPLOAD } from "../actions/FileAction";

//Reducer listening to different action types
//initial state is {}
export default function (state = {displayfiles:[], fileupload:{}, setfileupload:{}}, action) {
  switch (action.type) {
    case DISPLAY_FILES:
        return Object.assign({}, { ...state }, {displayfiles: action.payload});
    case FILE_UPLOAD:
        return Object.assign({}, { ...state }, {fileupload: action.payload});
    case SET_FILEUPLOAD:
        return Object.assign({}, { ...state }, {setfileupload: { ...state.setannouncement, ...action.payload}});
    default:
      return state;
  }
}