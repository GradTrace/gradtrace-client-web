const initialState = {
  attendance: [],
};

function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case "getAttendance":
      return { ...state, attendance: action.payload };

    default:
      return state;
  }
}

export default teacherReducer;
