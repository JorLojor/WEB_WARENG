import { createBrowserRouter } from "react-router-dom";
import Landing from './sid/pages/landingPage';
import SignUp from './administration/pages/auth/signUp';
import Login from "./administration/pages/auth/login";
import ForgotPassword from "./administration/pages/auth/forgotPassword";
import InformasiDesa from "./sid/pages/informasiDesa";
import DetailKegiatanDesa from "./sid/pages/detailKegiatanDesa";
import KegiatanProgramDesa from "./sid/pages/kegiatanProgramDesa";
// import SignIn from "./pages/siginPage/SiginPage";

import App from "./App";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/informasi-desa",
        element: <InformasiDesa />,
      },
      {
        path: "/kegiatan-program-desa",
        element: <KegiatanProgramDesa />,
      },
      {
        path: "/detail-kegiatan-desa",
        element: <DetailKegiatanDesa />,
      },
    ],
  },
]);

export default Routing;
