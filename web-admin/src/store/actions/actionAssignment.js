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
export const deleteAssignment = (payload) => {
  return {
    type: "deleteAssignment",
    payload,
  };
};
export const edittAssignment = (payload) => {
  return {
    type: "editAssignment",
    payload,
  };
};
export const edittAssignmentScore = (payload) => {
  return {
    type: "editAssignmentScore",
    payload,
  };
};
export const getAssignmentTugasguru = (payload) => {
  return {
    type: "getAssignments",
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
export const editAssignmentScores = ({ score, id }) => {
  console.log(id, "masuk dari reeduxS");
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignmentGrades/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        score: score,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch Attendance");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(edittAssignmentScore(data));
        dispatch(fetchAssignment());
      });
  };
};
export const editAssignment = ({
  name,
  description,
  deadline,
  CourseId,
  className,
  id,
}) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignment/${id}`, {
      method: "PUT",
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
        dispatch(edittAssignment(data));
        dispatch(fetchAssignment());
      });
  };
};
export const fetchAssignment = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignment?className=${id}`, {
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
export const fetchAssignmentGuru = () => {
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
      .then((data) => dispatch(getAssignmentTugasguru(data)));
  };
};
export const deletedAssignment = ({ id }) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/teachers/assignment/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error DELETE");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(deleteAssignment(data));
        dispatch(getAssignment());
      });
  };
};
