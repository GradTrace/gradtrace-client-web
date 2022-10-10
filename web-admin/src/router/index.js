import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../views/Register";
import Login from "../views/Login";
import Home from "../components/Home";
import NilaiTugas from "../views/NilaiTugas";
import NilaiUlangan from "../views/NilaiUlangan";
import DaftarHadirPage from "../views/DaftarHadirPage";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/nilaiTugas",
            element: <NilaiTugas />,
          },
          {
            path: "/nilaiUlangan",
            element: <NilaiUlangan />,
          },
          {
            path: "/daftarHadir",
            element: <DaftarHadirPage />,
          },
          {
            path: "/",
            element: <NilaiTugas />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
