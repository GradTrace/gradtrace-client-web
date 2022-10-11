const initialState = {
  assignment: [], //! daftar tugas
  assignments: [], //! nilai tugas
};

function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    case "getAssignment":
      return { ...state, assignment: action.payload };
    case "getAssignments":
      return { ...state, assignments: action.payload };
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
