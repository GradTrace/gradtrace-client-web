import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamScore } from "../store/actions/actionExam";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editExam } from "../store/actions/actionExam";
import ModalPost from "../components/modalPost";

export default function NilaiUlangan() {
  const dispatch = useDispatch();
  const examScore = useSelector((state) => {
    return state.examReducer.examScore;
  });

  useEffect(() => {
    dispatch(fetchExamScore());
  }, []);
  // start populate
  const [populate, setPopulate] = useState({});
  const [idi, setIdi] = useState({
    id: 0,
  });

  const [edit, setEdit] = useState({
    UAS: { score: "", id: 0 },
    UTS: { score: "", id: 0 },
    UL1: { score: "", id: 0 },
    UL2: { score: "", id: 0 },
  });

  useEffect(() => {
    fetch(`http://localhost:3000/teachers/exams/score/${idi.id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Error Fetch assignmentn");
        }
        return response.json();
      })
      .then((data) => {
        let newEdit = {};
        data[0].ExamGrades.forEach((e) => {
          if (e.Exam.name === "UAS") {
            newEdit.UAS = {
              score: e.score,
              id: e.id,
            };
          } else if (e.Exam.name === "UTS") {
            newEdit.UTS = {
              score: e.score,
              id: e.id,
            };
          } else if (e.Exam.name === "Ulangan 1") {
            newEdit.UL1 = {
              score: e.score,
              id: e.id,
            };
          } else if (e.Exam.name === "Ulangan 2") {
            newEdit.UL2 = {
              score: e.score,
              id: e.id,
            };
          }
        });
        setEdit(newEdit);
      });
  }, [idi]);
  // start modal
  const [modalShow, setModalShow] = React.useState(false);
  const [showModalPost, setShowModalPost] = React.useState(false);
  // end of modal
  if (!populate) {
    return <h2>Loading...</h2>;
  }
  if (!examScore) {
    return <h2>Loading...</h2>;
  }
  let no = 1;
  return (
    <div>
      <br />
      <h1>Nilai Ulangan</h1>
      <div className="container">
        <br />
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light text-align-center">
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Photo</th>
              <th class="text-center">Name</th>
              <th class="text-center">Kelas</th>
              <th class="text-center">Nilai UTS</th>
              <th class="text-center">Nilai UAS</th>
              <th class="text-center">Nilai Ulangan 1</th>
              <th class="text-center">Nilai Ulangan 2</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examScore.map((e) => {
              return (
                <tr>
                  <td>{no++}</td>
                  <td>
                    <img
                      src={e.photo}
                      style={{ width: 100, height: 100 }}
                      class="rounded-circle"
                    />
                  </td>
                  <td>
                    <div>
                      <div>
                        <p>{e.fullName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{e.className}</p>
                  </td>
                  <td>{e.ExamGrades[0]?.score ? e.ExamGrades[0]?.score : 0}</td>
                  <td>{e.ExamGrades[1]?.score ? e.ExamGrades[1]?.score : 0}</td>
                  <td>{e.ExamGrades[2]?.score ? e.ExamGrades[2]?.score : 0}</td>
                  <td>{e.ExamGrades[3]?.score ? e.ExamGrades[3]?.score : 0}</td>
                  <td>
                    {e.ExamGrades.length == 0 ? (
                      <button
                        class="button is-warning is-small mr-1 p-2"
                        onClick={() => {
                          console.log(`masuk add`);
                          setShowModalPost(true);
                          // setIdi({
                          //   ...idi,
                          //   id: e.id,
                          // });
                        }}
                      >
                        Add Data
                      </button>
                    ) : (
                      <button
                        class="button is-info is-small mr-1 p-2"
                        onClick={() => {
                          console.log(`masuk button`);
                          setModalShow(true);
                          setIdi({
                            ...idi,
                            id: e.id,
                          });
                        }}
                      >
                        Edit Data
                      </button>
                    )}

                    <MyVerticallyCenteredModal
                      modalShow={modalShow}
                      onHide={() => setModalShow(false)}
                      setEdit={setEdit}
                      edit={edit}
                      idi={idi}
                    />
                    <ModalPost
                      showModalPost={showModalPost}
                      onHide={() => setShowModalPost(false)}
                      // setEdit={setEdit}
                      // edit={edit}
                      // idi={idi}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const { setEdit, edit, modalShow, onHide, idi } = props;
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    console.log(edit, "<<<<ini dari submit");
    dispatch(
      editExam({
        UAS: edit.UAS,
        UTS: edit.UTS,
        UL1: edit.UL1,
        UL2: edit.UL2,
      })
    );

    onHide();
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Edit Student Data Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <div class="field">
            <label className="label">Nilai UTS</label>
            <input
              class="form-control"
              placeholder="Nilai UTS"
              name="UTS"
              value={edit.UTS.score}
              onChange={(e) => {
                setEdit({
                  ...edit,
                  UTS: {
                    score: e.target.value,
                    id: edit.UTS.id,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai UAS</label>
            <input
              class="form-control"
              placeholder="Nilai UAS"
              name="UAS"
              value={edit.UAS.score}
              onChange={(e) => {
                setEdit({
                  ...edit,
                  UAS: {
                    score: e.target.value,
                    id: edit.UAS.id,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 1</label>
            <input
              class="form-control"
              placeholder="Nilai UL1"
              name="UL1"
              value={edit.UL1.score}
              onChange={(e) => {
                setEdit({
                  ...edit,
                  UL1: {
                    score: e.target.value,
                    id: edit.UL1.id,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 2</label>
            <input
              class="form-control"
              placeholder="Nilai UL2"
              name="UL2"
              value={edit.UL2.score}
              onChange={(e) => {
                setEdit({
                  ...edit,
                  UL2: {
                    score: e.target.value,
                    id: edit.UL2.id,
                  },
                });
              }}
            />
          </div>
          <div className="field">
            <button type="submit" class="button is-success">
              Submit
            </button>
            <button class="button">Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
