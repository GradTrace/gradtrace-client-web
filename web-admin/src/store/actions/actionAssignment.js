// export const getAssignment = (payload) => {
//   return {
//     type: "getAssignment",
//     payload,
//   };
// };
export const getAssignments = (payload) => {
  return {
    type: "getAssignments",
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
    type: "getAssignment",
    payload,
  };
};

//! INI UNTUK FETCH Assignment Student ( COMPONENT NILAI TUGASS !!)
export const fetchAssignment = (className) => {
  // console.log(id, "dari reducer");
  return (dispatch) => {
    return fetch(
      `http://localhost:3000/teachers/assignment?className=${className}`,
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch Attendance");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(getAssignments(data));
        console.log(data, "data dari reducerrr");
      });
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
        // dispatch(fetchAssignment());
        dispatch(fetchAssignmentGuru());
      });
  };
};

//! EDIT SCORE STUDENT NILAI TUGAS
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
      })
      .then(() => {
        dispatch(fetchAssignment());
      });
  };
};
//!DAFTAR TUGAS //!
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
        dispatch(fetchAssignmentGuru());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchAssignmentGuru = () => {
  //! COMPONENT DAFTAR TUGASSSS
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
      .then((data) => {
        dispatch(getAssignmentTugasguru(data));
        console.log(data, "<<< data guru");
      });
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
        dispatch(getAssignmentTugasguru());
      });
  };
};
