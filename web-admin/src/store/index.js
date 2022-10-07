import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import teacherReducer from "./reducer/teacher";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(teacherReducer, applyMiddleware(thunk));

export default store;
