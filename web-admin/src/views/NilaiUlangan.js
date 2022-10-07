import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Student Data Here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="field">
              <label className="label">Email address</label>
              <input class="form-control" placeholder="Enter email"></input>
            </div>
            <div class="field">
              <label className="label">Password</label>
              <input class="form-control" placeholder="Password"></input>
            </div>
            <div class="field">
              <label className="label">Password</label>
              <input class="form-control" placeholder="Password"></input>
            </div>
            <div class="field">
              <label className="label">Password</label>
              <input class="form-control" placeholder="Password"></input>
            </div>
            <div class="field">
              <label className="label">Password</label>
              <input class="form-control" placeholder="Password"></input>
            </div>
            <div class="field">
              <label className="label">Password</label>
              <input class="form-control" placeholder="Password"></input>
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
              <th class="text-center">Title</th>
              <th class="text-center">Kelas</th>
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
                <div class="">
                  <div>
                    <p class="fw-bold mb-1">John Doe</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">Software engineer</p>
              </td>
              <td>active</td>
              <td>Senior</td>
              <td>Senior</td>
              <td>
                <button
                  type="submit"
                  class="button is-info is-small mr-1 p-2"
                  variant="primary"
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
