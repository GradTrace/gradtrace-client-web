import { useLocation } from "react-router-dom";
export default function Footer() {
  // const someComponent = withRouter(props)
  const location = useLocation();
  console.log(location.pathname, "<<<<< footer");
  const footer = () => {
    if (
      location.pathname == "/nilaiTugas" ||
      location.pathname == "/daftarTugas"
    ) {
      return (
        <div className="footerPagination">
          {/* <div class="card-header">Featured</div> */}
          <div>
            <h5>GradTrace 2022</h5>
            <p>
              created by: Ariq Rizky, Gifari Akbar, Hardaya Suriatmaja, Nur
              Mizwari, Ryru Lobo
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="footer">
          {/* <div class="card-header">Featured</div> */}
          <div>
            <h5>GradTrace 2022</h5>
            <p>
              created by: Ariq Rizky, Gifari Akbar, Hardaya Suriatmaja, Nur
              Mizwari, Ryru Lobo
            </p>
          </div>
        </div>
      );
    }
  };

  return footer();
}
