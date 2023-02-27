import { createBrowserRouter } from "react-router-dom";
import { GuestLayout, DefaultLayout } from "./components";
import {
  Surveys,
  Login,
  Signup,
  Dashboard,
  SurveyView,
  SurveyPublicView,
} from "./views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
  },
]);

export default router;
