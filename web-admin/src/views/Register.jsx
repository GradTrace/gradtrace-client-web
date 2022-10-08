export default function Register() {
  return (
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-center py-4">
                <a class="logo d-flex align-items-center w-auto">
                  <img src="../../public/img/logo.png" />
                  <span class="d-none d-lg-block logo d-flex align-items-center w-auto">
                    Grade Tracer
                  </span>
                </a>
              </div>

              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p class="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>
                    <div class="col-12">
                      <label for="yourName" class="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="yourName"
                        required
                      />
                      <div class="invalid-feedback">
                        Please, enter your name!
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">
                        Your Email
                      </label>
                      <input
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
                      <label for="yourUsername" class="form-label">
                        Username
                      </label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">
                          @
                        </span>
                        <input
                          type="text"
                          name="username"
                          class="form-control"
                          id="yourUsername"
                          required
                        />
                        <div class="invalid-feedback">
                          Please choose a username.
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">
                        Password
                      </label>
                      <input
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
