import { fetchAttendance } from "../store/actions/actionTeacher";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DaftarHadirPage() {
  const attendance = useSelector((state) => {
    return state.teacherReducer.attendance;
  });
  console.log(attendance);
  const dispatch = useDispatch();
  const [kelas, setKelas] = useState({
    className: "",
  });
  useEffect(() => {
    dispatch(fetchAttendance({ id: kelas.className }));
  }, [kelas]);

  console.log(kelas.className, "<<<");
  return (
    <section class="container-fluid">
      <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 class="display-7 ">Daftar Hadir </h2>
        {/* <button class="btn btn-primary ">New Items</button> */}
      </div>
      <div className="container-fluid">
        <div className="row">
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
              Choose Class Name
            </option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-striped align-middle">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Kelas</th>
                <th scope="col">Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td>{i + 1}</td>
                    <td>{el.Student.fullName}</td>
                    <td>{el.Student.className}</td>
                    <td>{el.status == true ? "Masuk" : "belum masuk"}</td>
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
    </section>
  );
}
