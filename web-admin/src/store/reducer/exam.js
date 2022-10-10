const initialState = {
  examScore: [],
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case "getExamScore":
      return { ...state, examScore: action.payload };

    default:
      return state;
  }
}

export default examReducer;
