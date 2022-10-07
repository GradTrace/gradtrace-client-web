import teacherReducer from "./teacher";
import assignmentReducer from "./assignment";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ teacherReducer, assignmentReducer });
export default rootReducer;
