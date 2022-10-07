import { fetchAssignment } from "../store/actions/actionAssignment";
import { useEffect, useSelect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NilaiTugas() {
  const dispatch = useDispatch();
  const assignment = useSelector((state) => {
    return state.assignmentReducer.assignment;
  });
  console.log(assignment, "<<<");
  useEffect(() => {
    dispatch(fetchAssignment());
  }, []);
  return (
    <div className="container mt-2">
      <div className="row">
        <h2>NilaiTugas</h2>;
        <div class="col-12 table-responsive">
          <table class="table table-striped align-middle">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Kelas</th>
                <th scope="col">Deadline</th>
                <th scope="col">Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignment.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.className}</td>
                    <td>{el.deadline}</td>
                    <td>{el.description}</td>
                    <td>
                      <a href="">
                        <button class="m-2 btn btn-primary">Delete</button>
                      </a>
                      <a href="">
                        <button class="btn btn-primary">Edit</button>
                      </a>
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
