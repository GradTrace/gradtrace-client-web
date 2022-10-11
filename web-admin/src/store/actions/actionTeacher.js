export const getAttendances = (payload) => {
  return {
    type: "getAttendances",
    payload,
  };
};

export const fetchAttendance = (className) => {
  return (dispatch) => {
    // console.log(id, "<<< id dari dalem");

    return fetch(`http://localhost:3000/teachers/attendances/${className}`, {
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
      .then((data) => dispatch(getAttendances(data)));
  };
};
