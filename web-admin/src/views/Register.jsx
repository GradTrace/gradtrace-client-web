import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import GradTrace from "././public/GradTrace-logo.png";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    fullName: "",
    CourseId: "",
    email: "",
    password: "",
  });
  const registerken = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/teachers/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: register.email,
        password: register.password,
        fullName: register.fullName,
        CourseId: register.CourseId,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw { name: "error login" };
        }
        return result.json();
      })
      .then((data) => {
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Success Registered`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Invalid email or password",
        // });
      });
  };

  return (
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-center py-4">
                <a class="logo d-flex align-items-center w-auto">
                  {/* <img
                    src="https://i.imgur.com/qXK2RMo.png"
                    style={{ height: 170, width: 200 }}
                  /> */}
                </a>
              </div>

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <img
                      src="https://i.imgur.com/qXK2RMo.png"
                      style={{ height: "50%", width: "50%" }}
                    />
                    <h5 class="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p class="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  <form
                    onSubmit={registerken}
                    class="row g-3 needs-validation"
                    novalidate
                  >
                    <div class="col-12">
                      <label for="yourName" class="form-label">
                        Full name
                      </label>
                      <input
                        onChange={(e) => {
                          setRegister({
                            ...register,
                            fullName: e.target.value,
                          });
                        }}
                        type="text"
                        name="fullName"
                        class="form-control"
                        id="yourName"
                        required
                      />
                      <div class="invalid-feedback">
                        Please, enter your name!
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">
                        Course
                      </label>
                      <select
                        name="CourseId"
                        onChange={(e) => {
                          setRegister({
                            ...register,
                            CourseId: e.target.value,
                          });
                        }}
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected disabled>
                          Select course
                        </option>
                        <option value="1">Mathematics</option>
                        <option value="2">Biology</option>
                        <option value="3">English</option>
                        <option value="4">Physics</option>
                        <option value="5">Physical Education</option>
                      </select>
                    </div>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">
                        Email address
                      </label>
                      <input
                        onChange={(e) => {
                          setRegister({
                            ...register,
                            email: e.target.value,
                          });
                        }}
                        type="email"
                        name="email"
                        class="form-control"
                        id="yourEmail"
                        required
                      />
                      <div class="invalid-feedback">
                        Please enter a valid Email adddress!
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">
                        Password
                      </label>
                      <input
                        onChange={(e) => {
                          setRegister({
                            ...register,
                            password: e.target.value,
                          });
                        }}
                        type="password"
                        name="password"
                        class="form-control"
                        id="yourPassword"
                        required
                      />
                      <div class="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
