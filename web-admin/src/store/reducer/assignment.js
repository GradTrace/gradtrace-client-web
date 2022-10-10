const initialState = {
  assignment: [],
};

function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    case "getAssignment":
      return { ...state, assignment: action.payload };
    case "addAssignment":
      return { ...state };
    case "deleteAssignment":
      return { ...state };
    case "editAssignment":
      return { ...state };
    case "editAssignmentScore":
      return { ...state };

    default:
      return state;
  }
}

export default assignmentReducer;
