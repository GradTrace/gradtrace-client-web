import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginken = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/teachers/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw { name: "error login" };
        }
        return result.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome ${data.loggedInName}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password",
        });
      });
  };

  return (
    <main>
      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex justify-content-center py-4">
                  {/* <a
                    href="index.html"
                    class="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">GradeTracer</span>
                  </a> */}
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <img
                        src="https://i.imgur.com/qXK2RMo.png"
                        style={{ height: "50%", width: "50%" }}
                      />
                      <h5 class="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p class="text-center small">
                        Enter your Email & password to login
                      </p>
                    </div>

                    <form
                      onSubmit={loginken}
                      class="row g-3 needs-validation"
                      novalidate
                    >
                      <div class="col-12">
                        <label for="yourUsername" class="form-label">
                          Email
                        </label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input
                            onChange={(e) => {
                              setLogin({
                                ...login,
                                email: e.target.value,
                              });
                            }}
                            type="email"
                            name="email"
                            class="form-control"
                            required
                          />
                          <div class="invalid-feedback">
                            Please enter your username.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Password
                        </label>
                        <input
                          onChange={(e) => {
                            setLogin({
                              ...login,
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

                      <div class="col-12"></div>
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="credits"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
