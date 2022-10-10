export const getScore = (payload) => {
  return {
    type: "getExamScore",
    payload,
  };
};

export const fetchExamScore = ({ id }) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/exams/score`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch Attendance");
        }
        return response.json();
      })
      .then((data) => dispatch(fetchExamScore(data)));
  };
};
