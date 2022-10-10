import teacherReducer from "./teacher";
import assignmentReducer from "./assignment";
import examReducer from "./exam";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teacherReducer,
  assignmentReducer,
  examReducer,
});
export default rootReducer;
