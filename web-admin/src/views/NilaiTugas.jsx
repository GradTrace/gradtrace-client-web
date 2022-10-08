import { fetchAssignment } from "../store/actions/actionAssignment";
import { useEffect, useSelect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addingAssignment } from "../store/actions/actionAssignment";

export default function NilaiTugas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector((state) => {
    return state.assignmentReducer.assignment;
  });
  console.log(assignment, "<<<");
  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);

  function Example() {
    const [add, setAdd] = useState({
      description: "",
      CourseId: "",
      deadline: "",
      name: "",
      className: "",
    });
    const added = (e) => {
      e.preventDefault();
      console.log(add);
      dispatch(
        addingAssignment({
          description: add.description,
          CourseId: add.CourseId,
          deadline: add.deadline,
          name: add.name,
          className: add.className,
        })
      ).then(() => {
        navigate("/nilaiTugas");
        dispatch(setShow(false));
      });
    };

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={added}>
              <div class="field">
                <label className="label">Description</label>
                <input
                  name="description"
                  onChange={(e) => {
                    setAdd({
                      ...add,
                      description: e.target.value,
                    });
                  }}
                  class="form-control"
                  placeholder="Enter Description"
                />
              </div>
              <div class="field">
                <label className="label">Courses</label>
                <select
                  name="CourseId"
                  onChange={(e) => {
                    setAdd({
                      ...add,
                      CourseId: e.target.value,
                    });
                  }}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Choose Courses
                  </option>
                  <option value="1">Mathematics</option>
                  <option value="2">Biology</option>
                  <option value="3">English</option>
                </select>
              </div>
              <div class="field">
                <label className="label">Deadline</label>
                <input
                  name="deadline"
                  onChange={(e) => {
                    setAdd({
                      ...add,
                      deadline: e.target.value,
                    });
                  }}
                  type="date"
                  class="form-control"
                  placeholder="Deadline"
                ></input>
              </div>
              <div class="field">
                <label className="label">Name</label>
                <input
                  name="name"
                  onChange={(e) => {
                    setAdd({
                      ...add,
                      name: e.target.value,
                    });
                  }}
                  class="form-control"
                  placeholder="name"
                ></input>
              </div>
              <div class="field">
                <label className="label">Class Name</label>
                <select
                  name="className"
                  onChange={(e) => {
                    setAdd({
                      ...add,
                      className: e.target.value,
                    });
                  }}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Choose Class
                  </option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                </select>
              </div>

              <div className="field">
                <div className="div mt-2">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="m-2"
                    variant="primary"
                    // onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </>
    );
  }
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <h2>Nilai Tugas</h2>

        <div class="col-12 table-responsive">
          <table class="table table-striped align-middle">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Kelas</th>
                <th scope="col">Deadline</th>
                <th scope="col">Description</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignment.map((el, i) => {
                return (
                  <tr style={{ textAlign: "left" }} key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.className}</td>
                    <td>{el.deadline}</td>
                    <td>{el.description}</td>
                    <td style={{ textAlign: "center" }}>
                      <a href="">
                        <button class="m-2 btn btn-primary">Delete</button>
                      </a>
                      <a href="">
                        <button class="btn btn-primary">Edit</button>
                      </a>
                      <a href="">
                        <button
                          onClick={handleShow}
                          class="btn m-2 btn-primary"
                        >
                          Add Assignment
                        </button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <Example show={show} onHide={() => setShow(false)} />
          </table>
        </div>
      </div>
    </div>
  );
}
