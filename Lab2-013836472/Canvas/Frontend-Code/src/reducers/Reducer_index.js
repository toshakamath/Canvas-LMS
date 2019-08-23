import { combineReducers } from "redux";
import EnrollmentReducer from "./EnrollmentReducer";
import ProfileReducer from "./ProfileReducer";
import AuthReducer from "./AuthReducer";
import PeopleReducer from "./PeopleReducer";
import AnnouncementReducer from "./AnnouncementReducer";
import FileReducer from "./FileReducer";
import AssignmentReducer from "./AssignmentReducer";
import GradesReducer from "./GradesReducer";
import CourseDetailsReducer from "./CourseDetailsReducer";
import CoursesReducer from "./CoursesReducer";
import MessageReducer from "./MessageReducer";

const rootReducer = combineReducers({   //take all of your reducersa nd combine them into one onject
  enrollment: EnrollmentReducer,
  userdetails: ProfileReducer,
  authuser: AuthReducer,
  people: PeopleReducer,
  announcement: AnnouncementReducer,
  filedetails:FileReducer,
  assignmentdetails: AssignmentReducer,
  grades: GradesReducer,
  courseinfo: CourseDetailsReducer,
  courses: CoursesReducer,
  message: MessageReducer
});

export default rootReducer;
