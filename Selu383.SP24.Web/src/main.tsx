import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/homepage";
import Help from "./routes/help";
import MainLayout from "./routes/home/navbar";
import HotelDetails from "./routes/home/hotel-details/hoteldetails";
import FindHotel from "./routes/home/FindHotel";
import { CachePolicies, Provider } from "use-http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      { path: "/find-hotel", element: <FindHotel /> },
      { path: "/hotel-details/:foo", element: <HotelDetails /> },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider options={{ cache: CachePolicies.NO_CACHE }}>
    <RouterProvider router={router} />
  </Provider>
);