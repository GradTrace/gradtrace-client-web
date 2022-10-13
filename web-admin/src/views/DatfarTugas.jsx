import { fetchAssignmentGuru } from "../store/actions/actionAssignment";
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
  // console.log(assignment, "data assignment");
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchAssignmentGuru(page)).finally(() => {
      setLoading(false);
    });
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
  // console.log(params.id, "parramss");
  const [idi, setIdi] = useState({
    id: 0,
  });

  // console.log(editSatu, "ini data");
  // console.log(idi.id, "idddd");
  //!BUAT POPULATE DATA
  useEffect(() => {
    if (idi.id !== 0) {
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
          // console.log(data, "ini data satuan");

          // console.log(data.deadline, "<<< deadline");
          const rubahDeadline = data.deadline.split("T")[0];
          // console.log(rubahDeadline, "<<<<< rubah deadline");
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
  // function EditModal() {
  //   const [edit, setEdit] = useState({
  //     description: "",
  //     CourseId: "",
  //     deadline: "",
  //     name: "",
  //     className: "",
  //   });
  //   const editKen = (e) => {
  //     e.preventDefault();

  //     dispatch(
  //       editAssignment({
  //         description: edit.description,
  //         CourseId: edit.CourseId,
  //         deadline: edit.deadline,
  //         name: edit.name,
  //         className: edit.className,
  //       })
  //     ).then(() => {
  //       navigate("/nilaiTugas");
  //       dispatch(setShow(false));
  //     });
  //   };

  //   return (
  //     <>
  //       <Modal show={editshow} onHide={handleClose}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Edit Assignment</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <form onSubmit={editKen}>
  //             <div class="field">
  //               <label className="label">Description</label>
  //               <input
  //                 value={editSatu.description}
  //                 name="description"
  //                 onChange={(e) => {
  //                   setEdit({
  //                     ...edit,
  //                     description: e.target.value,
  //                   });
  //                 }}
  //                 class="form-control"
  //                 placeholder="Enter Description"
  //               />
  //             </div>
  //             {/* <div class="field">
  //               <label className="label">Courses</label>
  //               <select
  //                 name="CourseId"
  //                 onChange={(e) => {
  //                   setEdit({
  //                     ...edit,
  //                     CourseId: e.target.value,
  //                   });
  //                 }}
  //                 class="form-select"
  //                 aria-label="Default select example"
  //               >
  //                 <option selected disabled>
  //                   Choose Courses
  //                 </option>
  //                 <option value="1">Mathematics</option>
  //                 <option value="2">Biology</option>
  //                 <option value="3">English</option>
  //               </select>
  //             </div> */}
  //             <div class="field">
  //               <label className="label">Deadline</label>
  //               <input
  //                 value={editSatu.deadline}
  //                 name="deadline"
  //                 onChange={(e) => {
  //                   setEdit({
  //                     ...edit,
  //                     deadline: e.target.value,
  //                   });
  //                 }}
  //                 type="date"
  //                 class="form-control"
  //                 placeholder="Deadline"
  //               ></input>
  //             </div>
  //             <div class="field">
  //               <label className="label">Name</label>
  //               <input
  //                 value={editSatu.name}
  //                 name="name"
  //                 onChange={(e) => {
  //                   setEdit({
  //                     ...edit,
  //                     name: e.target.value,
  //                   });
  //                 }}
  //                 class="form-control"
  //                 placeholder="name"
  //               ></input>
  //             </div>
  //             <div class="field">
  //               <label className="label">Class Name</label>
  //               <select
  //                 value={editSatu.className}
  //                 name="className"
  //                 onChange={(e) => {
  //                   setEdit({
  //                     ...edit,
  //                     className: e.target.value,
  //                   });
  //                 }}
  //                 class="form-select"
  //                 aria-label="Default select example"
  //               >
  //                 <option selected disabled>
  //                   Choose Class
  //                 </option>
  //                 <option value="9">9</option>
  //                 <option value="8">8</option>
  //                 <option value="7">7</option>
  //               </select>
  //             </div>

  //             <div className="field">
  //               <div className="div mt-2">
  //                 <Button variant="secondary" onClick={handleClose}>
  //                   Close
  //                 </Button>
  //                 <Button
  //                   type="submit"
  //                   className="m-2"
  //                   variant="primary"
  //                   // onClick={handleClose}
  //                 >
  //                   Save Changes
  //                 </Button>
  //               </div>
  //             </div>
  //           </form>
  //         </Modal.Body>
  //         {/* <Modal.Footer></Modal.Footer> */}
  //       </Modal>
  //     </>
  //   );
  // }
  const [loading, setLoading] = useState(false);
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

  const totalPage = useSelector((state) => {
    return state.assignmentReducer.totalPage;
  });
  useEffect(() => {
    dispatch(fetchAssignmentGuru(page));
  }, [page]);

  if (!assignment) {
    return <h2>Loading ..</h2>;
  }

  /////
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

  ////
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
    <div class="card mt-2 shadow ">
      <div className="container mt-2">
        <div className="row">
          <h2>Assignment List</h2>
          <div className="col d-flex   justify-content-between">
            <button onClick={handleShow} className="btn m-2 btn-primary">
              Add Assignment
            </button>
          </div>
          <div className="col-12 table-responsive">
            <table className=" tableDaftarTugas table table-striped align-middle bg-white ">
              <thead className="table-light rounded bg-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Description</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignment.map((el, i) => {
                  return (
                    <tr
                      className="tr1"
                      style={{ textAlign: "left" }}
                      key={el.id}
                    >
                      <td class="align-middle">{i + 1 + (page - 1) * 5}</td>

                      <td class="align-middle">{el.name}</td>

                      <td class="align-middle">{el.className}</td>
                      <td class="align-middle">{el.deadline.split("T")[0]}</td>
                      <td class="align-middle">{el.description}</td>
                      <td style={{ textAlign: "center" }} class="align-middle">
                        <button
                          onClick={(e) => {
                            e.preventDefault();

                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deletedAssignment({ id: el.id })).then(
                                  () => {
                                    dispatch(fetchAssignmentGuru());
                                  }
                                );
                                Swal.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                          className="m-2 btn btn-danger"
                        >
                          <div d-flex justify-content-center>
                            <svg
                              style={{
                                marginTop: 0,
                                marginBottom: 3,
                                marginRight: 3,
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              fill="currentColor"
                              class="bi bi-trash3-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                            Delete
                          </div>
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
                          className="btn btn-success"
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
      <div class="card-body"></div>
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
      dispatch(fetchAssignmentGuru());

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
      dispatch(fetchAssignmentGuru());
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
