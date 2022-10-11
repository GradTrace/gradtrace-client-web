import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamScore } from "../store/actions/actionExam";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function MyVerticallyCenteredModal(props) {
  const [populate, setPopulate] = useState({});
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Edit Student Data Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="field">
            <label className="label">Nilai UTS</label>
            <input
              class="form-control"
              placeholder="Nilai UTS"
              name="UTS"
              value={populate.ExamGrades[1]?.score}
              onChange={(e) => {
                setPopulate({
                  ...populate,
                  UTS: e.target.value,
                });
              }}
            ></input>
          </div>
          <div class="field">
            <label className="label">Nilai UAS</label>
            <input
              class="form-control"
              placeholder="Nilai UAS"
              name="UAS"
              value={populate.ExamGrades[0]?.score}
              onChange={(e) => {
                setPopulate({
                  ...populate,
                  UAS: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="field">
            <button type="submit" class="button is-success">
              Submit
            </button>
            <button type="submit" class="button">
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default function NilaiUlangan() {
  const dispatch = useDispatch();
  const examScore = useSelector((state) => {
    return state.examReducer.examScore;
  });

  useEffect(() => {
    dispatch(fetchExamScore());
  }, []);
  // start populate

  // start modal

  const [modalShow, setModalShow] = React.useState(false);
  // end of modal
  if (!populate) {
    return <h2>Loading...</h2>;
  }
  if (!examScore) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <br />
      <h1>Nilai Ulangan</h1>
      <div className="container">
        <br />
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light text-align-center">
            <tr>
              <th class="text-center">Photo</th>
              <th class="text-center">Name</th>
              <th class="text-center">Kelas</th>
              <th class="text-center">Mata Pelajaran</th>
              <th class="text-center">Nilai UTS</th>
              <th class="text-center">Nilai UAS</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examScore.map((e) => {
              return (
                <tr>
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
                  <td>{e.ExamGrades[0]?.Exam.Course.name}</td>
                  <td>{e.ExamGrades[0]?.score}</td>
                  <td>{e.ExamGrades[1]?.score}</td>
                  <td>
                    <button
                      class="button is-info is-small mr-1 p-2"
                      onClick={() => {
                        setModalShow(true);
                        setPopulate(e);
                        console.log(e, "dari button");
                      }}
                    >
                      Edit Data
                    </button>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
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
