export const getAssignment = (payload) => {
  return {
    type: "getAssignment",
    payload,
  };
};
export const addAssignment = (payload) => {
  return {
    type: "addAssignment",
    payload,
  };
};

export const addingAssignment = ({
  name,
  description,
  deadline,
  CourseId,
  className,
}) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        name: name,
        description: description,
        deadline: deadline,
        CourseId: CourseId,
        className: className,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch Attendance");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addAssignment(data));
        dispatch(fetchAssignment());
      });
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
