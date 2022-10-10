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
export default function DaftarTugas() {
  const assignment = useSelector((state) => {
    return state.assignmentReducer.assignment;
  });
  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);
  const [idi, setIdi] = useState({
    id: 0,
  });
  const [id, setId] = useState({
    id: 0,
  });
  useEffect(() => {
    fetch(`http://localhost:3000/teachers/assignmentGrades/${id}`, {
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
      });
  }, [id]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(assignment, "data");
  return (
    <div className="container mt-2">
      <div className="row">
        <h2>Assignment Student</h2>

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
              {assignment.map((el, i) => {
                return (
                  <tr style={{ textAlign: "left" }} key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.AssignmentGrades[0]?.Student.fullName}</td>
                    <td>{el.name}</td>
                    <td>{el.className}</td>
                    <td>{el.deadline.split("T")[0]}</td>
                    <td>{el.description}</td>
                    <td>{el.AssignmentGrades[0]?.score}</td>
                    <td>{el.AssignmentGrades[0]?.url}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          //   seteditShow(true);
                          setIdi({
                            ...id,
                            id: el.id,
                          });
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      {/* 
                          <button
                            // onClick={handleShow}
                            className="btn m-2 btn-primary"
                          >
                            Edit
                          </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// function editModal() {
//   const [add, setAdd] = useState({
//     description: "",
//     CourseId: "",
//     deadline: "",
//     name: "",
//     className: "",
//   });
//   const added = (e) => {
//     e.preventDefault();
//     // console.log(add);
//     dispatch(
//       addingAssignment({
//         description: add.description,
//         CourseId: add.CourseId,
//         deadline: add.deadline,
//         name: add.name,
//         className: add.className,
//       })
//     ).then(() => {
//       navigate("/nilaiTugas");
//       dispatch(setShow(false));
//     });
//   };

//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Assignment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={added}>
//             <div class="field">
//               <label className="label">Description</label>
//               <input
//                 name="description"
//                 onChange={(e) => {
//                   setAdd({
//                     ...add,
//                     description: e.target.value,
//                   });
//                 }}
//                 class="form-control"
//                 placeholder="Enter Description"
//               />
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
