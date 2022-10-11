const initialState = {
  attendances: [],
};

function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case "getAttendances":
      return { ...state, attendances: action.payload };

    default:
      return state;
  }
}

export default teacherReducer;
