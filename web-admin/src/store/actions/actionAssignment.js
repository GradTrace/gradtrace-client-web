export const getAssignment = (payload) => {
  return {
    type: "getAssignment",
    payload,
  };
};

export const fetchAssignment = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignment`, {
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
      .then((data) => dispatch(getAssignment(data)));
  };
};
