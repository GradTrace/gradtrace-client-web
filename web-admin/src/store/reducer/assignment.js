const initialState = {
  assignment: [], //! daftar tugas
  assignments: [], //! nilai tugas
  totalPage: 0,
};

function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    case "getAssignment": //! daftar tugas
      return {
        ...state,
        assignment: action.payload.rows,
        totalPage: Math.ceil(action.payload.count / 5),
      };
    case "getAssignments": //! nilai tugas
      return {
        ...state,
        assignments: action.payload.rows,
        totalPage: Math.ceil(action.payload.count / 5),
      };
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
