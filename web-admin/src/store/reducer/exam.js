const initialState = {
  assignment: [],
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case "getExamScore":
      return { ...state, assignment: action.payload };

    default:
      return state;
  }
}

export default examReducer;
