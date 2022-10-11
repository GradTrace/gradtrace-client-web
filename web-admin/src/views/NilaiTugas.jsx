import { fetchAssignment } from "../store/actions/actionAssignment";
import { useEffect, useSelect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { editAssignmentScores } from "../store/actions/actionAssignment";

import Swal from "sweetalert2";
export default function DaftarTugas() {
  const assignments = useSelector((state) => {
    return state.assignmentReducer.assignments;
  });
  console.log(assignments, "data dari networkkk");

  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);
  const [idi, setIdi] = useState({
    id: 0,
  });

  const [edit, setEdit] = useState({
    score: "",
    id: "",
  });

  console.log(idi, "ini id");
  useEffect(() => {
    fetch(`http://localhost:3000/teachers/assignmentGrades/${idi.id}`, {
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
        setEdit({
          score: data.score,
          id: data.id,
        });
        console.log(data, "ini data satuan");
      });
  }, [idi]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(assignments, "data");

  const [editshow, seteditShow] = useState(false);

  const handleClose = () => {
    seteditShow(false);
  };

  const handleShow = () => {
    seteditShow(true);
    console.log("handle show");
  };

  const [kelas, setKelas] = useState({
    className: "",
  });
  console.log(kelas, "<< data kelas");
  let className = kelas.className;
  useEffect(() => {
    dispatch(fetchAssignment(className));
  }, [kelas]);
  console.log(kelas);

  const inputHandler = (e) => {
    setName({
      name: e.target.value,
    });
  };
  const [name, setName] = useState({
    name: "",
  });
  console.log(assignments, "<< data rredux");
  let dataFilter;
  if (name.name == "") {
    dataFilter = assignments;
  } else {
    dataFilter = assignments.filter((el) =>
      el.name.toLowerCase().includes(name.name.toLowerCase())
    ); //! return nya harus booleadn
  } //! pake include biar kaya ILIKE di sequelize nyari substring dalam string
  console.log(dataFilter, "<<<< data filterran");
  console.log(name.name, "<< name .name");

  const filtering = (e) => {
    e.preventDefault();
    console.log(name);
  };
  return (
    <div className="container mt-2">
      <div className="row">
        <h2>Assignment Student</h2>
        <div className="container">
          <div className="row">
            <label htmlFor=""> filter by Class</label>
            <select
              name="className"
              onChange={(e) => {
                setKelas({
                  ...kelas,
                  className: e.target.value,
                });
              }}
              class="form-select"
              aria-label="Default select example"
            >
              <option selected disabled>
                Open this select menu
              </option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
            </select>
            <form onSubmit={filtering} action="">
              <div class="input-group mt-3 d-flex justify-content-center">
                <button
                  class="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon1"
                >
                  Search
                </button>
                <input
                  name="search"
                  onChange={inputHandler}
                  type="text"
                  class="form-control"
                  placeholder="search by assignment"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 table-responsive">
          <table className="table table-striped align-middle bg-white ">
            <thead className="thead-dark bg-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Assignment</th>
                <th scope="col">Class</th>
                <th scope="col">Deadline</th>
                <th scope="col">Description</th>
                <th scope="col">Score</th>
                <th scope="col">Link Assignment</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataFilter.map((el, i) => {
                return (
                  <tr style={{ textAlign: "left" }} key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.AssignmentGrades[0]?.Student.fullName}</td>
                    <td>{el.name}</td>
                    <td>{el.className}</td>
                    <td>{el.deadline.split("T")[0]}</td>
                    <td>{el.description}</td>
                    <td>{el.AssignmentGrades[0]?.score}</td>
                    <td>
                      <a href={el.AssignmentGrades[0]?.url} target="_blank">
                        {el.AssignmentGrades[0]?.url}
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          console.log("masuk");
                          seteditShow(true);
                          setIdi({
                            ...idi,
                            id: el.AssignmentGrades[0].id,
                          });
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <EditModal
              id={edit.id}
              edit={edit}
              setEdit={setEdit}
              editshow={editshow}
              handleClose={handleClose}
              handleShow={handleShow}
            />
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
function EditModal(props) {
  const { handleClose, handleShow, editshow, edit, setEdit, id } = props;
  const dispatch = useDispatch();
  const editken = (e) => {
    e.preventDefault();
    // console.log(edit.id, "editt");
    console.log(id, "<<<<< id");
    dispatch(
      editAssignmentScores({
        id: id,
        score: edit.score,
      })
    ).then(() => {
      dispatch(fetchAssignment("")); //! kenapa ini tidak jalan  ?
      handleClose();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Edited ..",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    console.log("masuk edit");
  };

  return (
    <>
      <Modal show={editshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment Score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editken}>
            <div class="field">
              <label className="label">Edit Score</label>
              <input
                value={edit.score}
                name="description"
                onChange={(e) => {
                  setEdit({
                    ...edit,
                    score: e.target.value,
                  });
                }}
                class="form-control"
                placeholder=""
                type="number"
              />
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
