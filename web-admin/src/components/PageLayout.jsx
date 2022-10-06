import { Outlet } from "react-router-dom";
import Navbar from "../views/Navbar";
export default function PageLayout() {
  return (
    <div style={{ padding: 10, marginTop: 0 }}>
      <Navbar />
      <Outlet />
    </div>
  );
}
