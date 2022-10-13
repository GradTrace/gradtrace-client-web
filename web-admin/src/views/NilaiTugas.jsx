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
  // console.log(assignments, "<<< data di component");
  const totalPage = useSelector((state) => {
    return state.assignmentReducer.totalPage;
  });
  // console.log(totalPage, "dua bukan ?");
  // console.log(assignments, "data dari networkkk");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAssignment("", page)).finally(() => {
      setLoading(false);
    });
  }, []);
  const [idi, setIdi] = useState({
    id: 0,
  });

  const [edit, setEdit] = useState({
    score: "",
    id: "",
  });

  // console.log(idi, "ini id");
  useEffect(() => {
    fetch(`http://localhost:3000/teachers/assignmentGrades/${idi.id}`, {
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
        setEdit({
          score: data.score,
          id: data.id,
        });
        // console.log(data, "ini data satuan");
      });
  }, [idi]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(assignments, "data");

  const [editshow, seteditShow] = useState(false);

  const handleClose = () => {
    seteditShow(false);
  };

  const handleShow = () => {
    seteditShow(true);
    console.log("handle show");
  };

  //! =========== INI UNTUK FILTER BY KELAS ========== //!
  const [kelas, setKelas] = useState({
    className: "",
  });
  // console.log(kelas, "<< data kelas");
  let className = kelas.className;
  useEffect(() => {
    dispatch(fetchAssignment(className, page, name.name));
  }, [kelas]);
  // console.log(className, "<< KELAS");
  //! =========== INI UNTUK FILTER BY KELAS ========== //!

  const inputHandler = (e) => {
    setName({
      name: e.target.value,
    });
  };
  const [name, setName] = useState({
    name: "",
  });
  // console.log(assignments, "<< data rredux");
  // let dataFilter;
  // if (name.name == "") {
  //   dataFilter = assignments;
  // } else {
  //   dataFilter = assignments.filter((el) =>
  //     el.Assignment.name.toLowerCase().includes(name.name.toLowerCase())
  //   ); //! return nya harus booleadn
  // } //! pake include biar kaya ILIKE di sequelize nyari substring dalam string
  // console.log(dataFilter, "<<<< data filterran");
  // console.log(name.name, "<< name .name");

  const searching = (e) => {
    dispatch(fetchAssignment(className, page, name.name));
  };

  const filtering = (e) => {
    e.preventDefault();
    console.log(name);
  };

  useEffect(() => {
    dispatch(fetchAssignment("", page));
  }, [page]);
  const next = (e) => {
    // console.log(page, "<<< page");
    e.preventDefault();

    if (page + 1 > totalPage) {
      return;
    }
    setPage(page + 1);
    // dispatch(fetchAssignment(className, page));
  };
  const previous = (e) => {
    // console.log(page, "<<< page");
    e.preventDefault();
    if (page == 1) {
      return;
    }
    // dispatch(fetchAssignment(className, page - 1));
    setPage(page - 1);
  };

  if (loading) {
    return (
      <div class="d-flex justify-content-center align-items-center">
        <img
          src="https://i.imgur.com/llF5iyg.gif?noredirect"
          alt="loading"
          width={300}
        />
      </div>
    );
  }

  return (
    <div class="card mt-2 shadow">
      <div class="card-body">
        <h2>Student Assignment</h2>
        <div className="container">
          <div className="row">
            <div class="control">
              <label htmlFor="">Filter by class</label>
              <select
                name="className"
                onChange={(e) => {
                  setKelas({
                    ...kelas,
                    className: e.target.value,
                  });
                }}
                class=" filter"
                aria-label="Default select example"
              >
                <option selected disabled>
                  All
                </option>
                <option value="9">9</option>
                <option value="8">8</option>
                <option value="7">7</option>
              </select>
              <form onSubmit={filtering} action="">
                <div class="input-group search d-flex justify-content-center">
                  <button
                    onClick={searching}
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
                    placeholder="Search by assignment name"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {assignments.length == 0 ? (
          <h2 class="mb-2">EMPTY DATA.. </h2>
        ) : (
          <div className="col-12 container table-responsive">
            <table className=" table tableDaftarTugas table-striped align-middle bg-white ">
              <thead className="table-light bg-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Assignment Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Description</th>
                  <th scope="col">Score</th>
                  <th scope="col">Assignment Link</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((el, i) => {
                  return (
                    <tr style={{ textAlign: "left" }} key={el.id}>
                      <td class="align-middle">{i + 1 + (page - 1) * 5}</td>
                      <td class="align-middle">{el.Student.fullName}</td>
                      <td class="align-middle">{el.Assignment.name}</td>
                      <td class="align-middle">{el.Student.className}</td>
                      <td class="align-middle">
                        {el.Assignment.deadline.split("T")[0]}
                      </td>
                      <td class="align-middle">{el.Assignment.description}</td>
                      <td class="align-middle">{el.score}</td>
                      <td class="align-middle">
                        <a href={el.url} target="_blank">
                          <button class="btn btn-primary">
                            <svg
                              style={{
                                marginTop: 0,
                                marginBottom: 3,
                                marginRight: 3,
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-link"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                              <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                            </svg>{" "}
                            Link
                          </button>
                        </a>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            console.log("masuk");
                            seteditShow(true);
                            setIdi({
                              ...idi,
                              id: el.id,
                            });
                          }}
                          className="btn btn-success shadow"
                        >
                          <svg
                            style={{
                              marginTop: 0,
                              marginBottom: 3,
                              marginRight: 3,
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
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
                page={page}
              />
            </table>
          </div>
        )}

        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a onClick={previous} class="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  {(() => {
                    let td = [];
                    for (let i = 1; i <= totalPage; i++) {
                      td.push(
                        <li class="page-item">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(i);
                            }}
                            class="page-link"
                            href="#"
                          >
                            {i}
                          </a>
                        </li>
                      );
                    }
                    return td;
                  })()}

                  <li class="page-item">
                    <a onClick={next} class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function EditModal(props) {
  const { handleClose, handleShow, editshow, edit, setEdit, id, page } = props;
  const dispatch = useDispatch();
  const editken = (e) => {
    e.preventDefault();
    // console.log(edit.id, "editt");
    // console.log(id, "<<<<< id");
    dispatch(
      editAssignmentScores({
        id: id,
        score: edit.score,
      })
    ).then(() => {
      dispatch(fetchAssignment("", page));
      handleClose();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Edited ..",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    // console.log("masuk edit");
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
