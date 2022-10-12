import { fetchAttendance } from "../store/actions/actionTeacher";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DaftarHadirPage() {
  const attendances = useSelector((state) => {
    return state.teacherReducer.attendances;
  });
  const [loading, setLoading] = useState(false);
  console.log(attendances);
  const dispatch = useDispatch();
  const [kelas, setKelas] = useState({
    className: 9,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAttendance()).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchAttendance(kelas.className));
  }, [kelas]);

  console.log(kelas.className, "<<<");

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
    <div class="card mt-2 shadow" style={{ marginBottom: "450px" }}>
      <section class="container">
        <div class="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <h2 class="display-7 ">Daftar Hadir </h2>
          {/* <button class="btn btn-primary ">New Items</button> */}
        </div>

        <div class="daftarhadir">
          <div className="col-6">
            <label htmlFor="">Filter By Class</label>
            <select
              name="className"
              onChange={(e) => {
                setKelas({
                  ...kelas,
                  className: e.target.value,
                });
              }}
              class="form-select col-6"
              aria-label="Default select example"
            >
              <option selected value="9">
                9
              </option>
              <option value="8">8</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>

        <div class="row ">
          <div class="col-12 table-responsive ">
            <table class="tableDaftarTugas mb-2 table align-middle mb-0 bg-white">
              <thead class="bg-light text-align-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((el, i) => {
                  return (
                    <tr style={{ textAlign: "left" }} key={el.id}>
                      <td>{i + 1}</td>
                      <td>{el.Student.fullName}</td>
                      <td>{el.Student.className}</td>
                      <td>{el.dateAndTime.split("T")[0]}</td>
                      <td>{el.status == true ? "Masuk" : "belum masuk"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div class="card-body"></div>
    </div>
  );
}
