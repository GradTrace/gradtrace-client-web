import { Url } from "../../components/Url";
export const getScore = (payload) => {
  return {
    type: "getExamScore",
    payload,
  };
};

export const editExamScore = (payload) => {
  return {
    type: "editExamScore",
    payload,
  };
};

export const fetchExamScore = () => {
  return (dispatch) => {
    return fetch(`${Url}teachers/exams/score`, {
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
        console.log(data, "dari action exam");
        dispatch(getScore(data));
      })
      .catch((err) => console.log(err));
  };
};

export const editExam = ({ UAS, UTS, UL1, UL2 }) => {
  console.log(UAS, UTS, UL1, "submit");
  return (dispatch) => {
    return fetch(`${Url}teachers/exams/score`, {
      method: "put",
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [UAS, UTS, UL1, UL2],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch Attendance");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(editExamScore(data));
      })
      .then(() => {
        dispatch(fetchExamScore());
      })
      .catch((err) => console.log(err));
  };
};
