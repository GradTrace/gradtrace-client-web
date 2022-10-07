export default function NilaiUlangan() {
  return (
    <div>
      <br />
      <h1>Nilai Ulangan</h1>
      <div className="container">
        <br />
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light text-align-center">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Title</th>
              <th>Kelas</th>
              <th>Nilai UTS</th>
              <th>Nilai UAS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: 100, height: 100 }}
                  class="rounded-circle"
                />
              </td>
              <td>
                <div class="">
                  <div>
                    <p class="fw-bold mb-1">John Doe</p>
                    <p class="text-muted mb-0">john.doe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">Software engineer</p>
                <p class="text-muted mb-0">IT department</p>
              </td>
              <td>active</td>
              <td>Senior</td>
              <td>Senior</td>
              <td>
                <button type="submit" class="button is-info is-small mr-1 p-2">
                  Edit Data
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
