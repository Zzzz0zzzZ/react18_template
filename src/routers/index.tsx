import {createBrowserRouter} from "react-router-dom";
import React from "react";
import AuthRoute from "../components/AuthRoute";
import PageLayout from "../pages";
import { RedirectPageComponent } from "../components/RedirectPageComponent";




const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><PageLayout /></AuthRoute>,
    children: [
      {
        // index: true,
        // path: 'user_center',
        // element: <UserCenter />
      },

    ]
  },
  {
    path: '*',
    element: <RedirectPageComponent />,
  }
])

export default router