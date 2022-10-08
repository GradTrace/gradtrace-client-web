const initialState = {
  assignment: [],
};

function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    case "getAssignment":
      return { ...state, assignment: action.payload };
    case "addAssignment":
      return { ...state };

    default:
      return state;
  }
}

export default assignmentReducer;
