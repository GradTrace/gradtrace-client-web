import { fetchAssignment } from "../store/actions/actionAssignment";
import { useEffect, useSelect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addingAssignment } from "../store/actions/actionAssignment";
import { deletedAssignment } from "../store/actions/actionAssignment";
import { editAssignment } from "../store/actions/actionAssignment";

export default function NilaiTugas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector((state) => {
    return state.assignmentReducer.assignment;
  });
  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);
  const [editSatu, setEditSatu] = useState({
    description: "",
    CourseId: "",
    deadline: "",
    name: "",
    className: "",
  });
  const params = useParams();
  // console.log(params.id, "parramss");
  const [idi, setIdi] = useState({
    id: 0,
  });

  // console.log(editSatu, "ini data");
  // console.log(idi.id, "idddd");
  useEffect(() => {
    fetch(`http://localhost:3000/teachers/assignment/${idi.id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // console.log(response, "<<< response");
        if (!response.ok) {
          throw new Error("Something Error Fetch assignmentn");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "ini data satuan");
        setEditSatu({
          description: data.description,
          CourseId: data.CourseId,
          deadline: data.deadline,
          name: data.name,
          className: data.className,
        });
      });
  }, [idi]);
  // console.log(editSatu, "<<<<<");

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
      // console.log(add);
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
              {/* <div class="field">
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
              </div> */}
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
  function EditModal() {
    const [edit, setEdit] = useState({
      description: "",
      CourseId: "",
      deadline: "",
      name: "",
      className: "",
    });
    const editKen = (e) => {
      e.preventDefault();

      dispatch(
        editAssignment({
          description: edit.description,
          CourseId: edit.CourseId,
          deadline: edit.deadline,
          name: edit.name,
          className: edit.className,
        })
      ).then(() => {
        navigate("/nilaiTugas");
        dispatch(setShow(false));
      });
    };

    return (
      <>
        <Modal show={editshow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={editKen}>
              <div class="field">
                <label className="label">Description</label>
                <input
                  value={editSatu.description}
                  name="description"
                  onChange={(e) => {
                    setEdit({
                      ...edit,
                      description: e.target.value,
                    });
                  }}
                  class="form-control"
                  placeholder="Enter Description"
                />
              </div>
              {/* <div class="field">
                <label className="label">Courses</label>
                <select
                  name="CourseId"
                  onChange={(e) => {
                    setEdit({
                      ...edit,
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
              </div> */}
              <div class="field">
                <label className="label">Deadline</label>
                <input
                  value={editSatu.deadline}
                  name="deadline"
                  onChange={(e) => {
                    setEdit({
                      ...edit,
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
                  value={editSatu.name}
                  name="name"
                  onChange={(e) => {
                    setEdit({
                      ...edit,
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
                  value={editSatu.className}
                  name="className"
                  onChange={(e) => {
                    setEdit({
                      ...edit,
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
  const [editshow, seteditShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    seteditShow(false);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  // const handleEditShow = (e) => {
  //   e.preventDefault();
  //   seteditShow(true);
  // };

  if (!assignment) {
    return <h2>Loading ..</h2>;
  }

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
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deletedAssignment({ id: el.id })).then(
                              () => {
                                navigate("/nilaiTugas");
                                dispatch(fetchAssignment());
                              }
                            );
                          }}
                          class="m-2 btn btn-primary"
                        >
                          Delete
                        </button>
                      </a>
                      <a href="">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            seteditShow(true);
                            setIdi({
                              ...idi,
                              id: el.id,
                            });
                          }}
                          class="btn btn-primary"
                        >
                          Edit
                        </button>
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
            <EditModal show={show} onHide={() => setShow(false)} />
          </table>
        </div>
      </div>
    </div>
  );
}
