//import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/homepage";
import Help from "./routes/help";
import HotelDetails from "./routes/home/hotel-details/hoteldetails";
import FindHotel from "./routes/home/FindHotel";
import { CachePolicies, Provider } from "use-http";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/find-hotel", element: <FindHotel /> },
  { path: "/hotel-details/:foo", element: <HotelDetails /> },
  { path: "/help", element: <Help /> },
]);

ReactDOM.render(
  <Provider options={{ cache: CachePolicies.NO_CACHE }}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);