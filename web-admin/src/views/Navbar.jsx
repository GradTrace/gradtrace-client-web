import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav class="navbar sticky-top shadow navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-center">
              <a class="navbar-brand" href="#">
                <img
                  src="https://i.imgur.com/qXK2RMo.png"
                  width="150"
                  height="40"
                />
              </a>
              <li class="nav-item">
                <Link
                  to={"/register"}
                  class="nav-link active"
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/nilaiTugas"}
                >
                  Assignment
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/daftarTugas"}
                >
                  Assignment List
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/nilaiUlangan"}
                >
                  Exam Scores
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/daftarHadir"}
                >
                  Student Attendance
                </Link>
              </li>
              <li class="nav-item">
                <a
                  onClick={(e) => {
                    console.log("masuk");
                    e.preventDefault();
                    localStorage.clear();
                    navigate("/login");
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `Logout ..`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }}
                  class="nav-link active"
                  aria-current="page"
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
