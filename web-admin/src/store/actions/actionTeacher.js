export const getAttendance = (payload) => {
  return {
    type: "getAttendance",
    payload,
  };
};

export const fetchAttendance = ({ id }) => {
  return (dispatch) => {
    console.log(id, "<<< id dari dalem");

    return fetch(`http://localhost:3000/teachers/attendances/${id}`, {
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
      .then((data) => dispatch(getAttendance(data)));
  };
};
