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
import Swal from "sweetalert2";

export default function NilaiTugas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector((state) => {
    return state.assignmentReducer.assignment;
  });
  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);
  const [add, setAdd] = useState({
    description: "",
    CourseId: "",
    deadline: "",
    name: "",
    className: "",
  });
  const [editSatu, setEditSatu] = useState({
    description: "",
    CourseId: "",
    deadline: "",
    name: "",
    className: "",
  });
  const params = useParams();
  console.log(params.id, "parramss");
  const [idi, setIdi] = useState({
    id: 0,
  });

  console.log(editSatu, "ini data");
  console.log(idi.id, "idddd");
  useEffect(() => {
    if (idi.id !== 0) {
      fetch(`http://localhost:3000/teachers/assignment/${idi.id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          console.log(response, "<<< response");
          if (!response.ok) {
            throw new Error("Something Error Fetch assignmentn");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data, "ini data satuan");

          // console.log(data.deadline, "<<< deadline");
          const rubahDeadline = data.deadline.split("T")[0];
          console.log(rubahDeadline, "<<<<< rubah deadline");
          setEditSatu({
            description: data.description,
            CourseId: data.CourseId,
            deadline: rubahDeadline,
            name: data.name,
            className: data.className,
          });
        });
    }
  }, [idi]);

  console.log(editSatu, "<<<<<");

  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const handleClose = () => {
    seteditShow(false);
  };
  const handleCloseAdd = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  if (!assignment) {
    return <h2>Loading ..</h2>;
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <h2>Nilai Tugas</h2>

        <div className="col-12 table-responsive">
          <table className="table table-striped align-middle">
            <thead className="thead-dark">
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
                    <td>{el.deadline.split("T")[0]}</td>
                    <td>{el.description}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deletedAssignment({ id: el.id }))
                            .then(() => {
                              navigate("/nilaiTugas");
                              dispatch(fetchAssignment());
                            })
                            .then(() => {
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Success Deleted ..",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            });
                        }}
                        className="m-2 btn btn-primary"
                      >
                        Delete
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          seteditShow(true);
                          setIdi({
                            ...idi,
                            id: el.id,
                          });
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>

                      <button
                        onClick={handleShow}
                        className="btn m-2 btn-primary"
                      >
                        Add Assignment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <AddModal
              add={add}
              setAdd={setAdd}
              show={show}
              handleCloseAdd={handleCloseAdd}
            />
            <EditModal
              id={idi.id}
              editSatu={editSatu}
              editShow={editshow}
              handleClose={handleClose}
              setEditSatu={setEditSatu}
            />
          </table>
        </div>
      </div>
    </div>
  );
}
function EditModal(props) {
  const { id, editSatu, editShow, handleClose, setEditSatu } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editKen = (e) => {
    e.preventDefault();
    console.log(editSatu, "<<< data edit");
    dispatch(
      editAssignment({
        id: id,
        description: editSatu.description,
        CourseId: editSatu.CourseId,
        deadline: editSatu.deadline,
        name: editSatu.name,
        className: editSatu.className,
      })
    ).then(() => {
      // navigate("/nilaiTugas");
      handleClose();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Edited ..",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <>
      <Modal show={editShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editKen}>
            <div className="field">
              <label className="label">Description</label>
              <input
                name="description"
                value={editSatu.description}
                onChange={(e) => {
                  setEditSatu({
                    ...editSatu,
                    description: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="Enter Description"
              />
            </div>

            <div className="field">
              <label className="label">Deadline</label>
              <input
                value={editSatu.deadline}
                name="deadline"
                onChange={(e) => {
                  setEditSatu({
                    ...editSatu,
                    deadline: e.target.value,
                  });
                }}
                type="date"
                className="form-control"
                placeholder="Deadline"
              ></input>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <input
                value={editSatu.name}
                name="name"
                onChange={(e) => {
                  setEditSatu({
                    ...editSatu,
                    name: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="name"
              ></input>
            </div>
            <div className="field">
              <label className="label">Class Name</label>
              <select
                value={editSatu.className}
                name="className"
                onChange={(e) => {
                  setEditSatu({
                    ...editSatu,
                    className: e.target.value,
                  });
                }}
                className="form-select"
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
                <Button type="submit" className="m-2" variant="primary">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
function AddModal(props) {
  const dispatch = useDispatch();
  const { show, handleCloseAdd, add, setAdd } = props;

  const added = (e) => {
    e.preventDefault();
    dispatch(
      addingAssignment({
        description: add.description,
        CourseId: add.CourseId,
        deadline: add.deadline,
        name: add.name,
        className: add.className,
      })
    ).then(() => {
      handleCloseAdd();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Added ..",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={added}>
            <div className="field">
              <label className="label">Description</label>
              <input
                name="description"
                onChange={(e) => {
                  setAdd({
                    ...add,
                    description: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="Enter Description"
              />
            </div>

            <div className="field">
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
                className="form-control"
                placeholder="Deadline"
              ></input>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <input
                name="name"
                onChange={(e) => {
                  setAdd({
                    ...add,
                    name: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="name"
              ></input>
            </div>
            <div className="field">
              <label className="label">Class Name</label>
              <select
                name="className"
                onChange={(e) => {
                  setAdd({
                    ...add,
                    className: e.target.value,
                  });
                }}
                className="form-select"
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
                <Button variant="secondary" onClick={handleCloseAdd}>
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
      </Modal>
    </>
  );
}
