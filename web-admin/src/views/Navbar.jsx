import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
  const navigate = useNavigate();

  //   const logout = (e) => {
  //     e.preventDefault();
  //     localStorage.clear();
  //     navigate("/login");
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "Good Bye ...",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   };

  return (
    <div>
      <nav class="navbar sticky-top shadow navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="nav-link active" aria-current="page" to={"/"}>
            Home Page
          </Link>
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
            <ul class="navbar-nav">
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
                  Nilai Tugas
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/nilaiUlangan"}
                >
                  Nilai Ulangan
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/uploadTugas"}
                >
                  Upload Tugas
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/daftarHadir"}
                >
                  Daftar Hadir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
