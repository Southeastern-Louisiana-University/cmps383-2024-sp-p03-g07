import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/homepage";
import Help from "./routes/help";
import HotelDetails from "./routes/home/hotel-details/hoteldetails";
import BookingNO from "./routes/booking/bookingNO";
import BookingBR from "./routes/booking/bookingBR";
import BookingLC from "./routes/booking/bookingLC";
import Login from "./routes/login/loginpage";
import { CachePolicies, Provider } from "use-http";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hotel-details/:foo", element: <HotelDetails /> },
  { path: "/help", element: <Help /> },
  { path: "/bookingNO", element: <BookingNO/> },
  { path: "/bookingBR", element: <BookingBR/> },
  { path: "/bookingLC", element: <BookingLC/> },
  {path:"/login",element:<Login/>},
]);

ReactDOM.render(
  <Provider options={{ cache: CachePolicies.NO_CACHE }}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);