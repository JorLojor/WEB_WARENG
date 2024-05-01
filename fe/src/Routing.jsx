import { createBrowserRouter } from "react-router-dom";
import Landing from './pages/landingPage/LandingPage';
import InformasiDesa from "./pages/informasiDesa/InformasiDesa";
import Login from "./pages/loginPage/loginPage";
import SignIn from "./pages/siginPage/SiginPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

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
        path: "/informasi-desa",
        element: <InformasiDesa />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default Routing;
