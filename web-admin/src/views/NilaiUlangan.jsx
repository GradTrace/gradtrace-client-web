import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamScore } from "../store/actions/actionExam";
import { useEffect } from "react";
export default function NilaiUlangan() {
  function MyVerticallyCenteredModal(props) {
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
              <input class="form-control" placeholder="Nilai UTS"></input>
            </div>
            <div class="field">
              <label className="label">Nilai UAS</label>
              <input class="form-control" placeholder="Nilai UAS"></input>
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
  const [modalShow, setModalShow] = React.useState(false);
  // end of modal
  const dispatch = useDispatch();
  const dataRedux = useSelector((state) => {
    console.log(state);
    // return state.homeReducer.reducerHomeData;
  });
  useEffect(() => {
    dispatch(fetchExamScore());
  }, []);
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
            <tr>
              <td>
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: 100, height: 100 }}
                  class="rounded-circle"
                />
              </td>
              <td>
                <div>
                  <div>
                    <p>John Doe</p>
                  </div>
                </div>
              </td>
              <td>
                <p>Software engineer</p>
              </td>
              <td>active</td>
              <td>Senior</td>
              <td>Senior</td>
              <td>
                <button
                  class="button is-info is-small mr-1 p-2"
                  onClick={() => setModalShow(true)}
                >
                  Edit Data
                </button>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
