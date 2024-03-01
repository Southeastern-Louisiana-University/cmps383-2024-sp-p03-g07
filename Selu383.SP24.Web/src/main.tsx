import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";
import Help from "./routes/help";
import MainLayout from "./routes/_layout";
import HotelDetails from "./routes/home/hotel-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [{ path: "hotel-details/:foo", element: <HotelDetails /> }],
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);