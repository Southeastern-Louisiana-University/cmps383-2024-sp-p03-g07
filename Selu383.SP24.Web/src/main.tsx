import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/homepage";
import Help from "./routes/help";
import HotelDetails from "./routes/home/hotel-details/hoteldetails";
import BookingNO from "./routes/booking/bookingNO";
import BookingBR from "./routes/booking/bookingBR";
import BookingLC from "./routes/booking/bookingLC";
import { CachePolicies, Provider } from "use-http";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignPage from "./routes/signup/signpage";
import LoginPage from "./routes/login/loginpage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hotel-details/:foo", element: <HotelDetails /> },
  { path: "/help", element: <Help /> },
  { path: "/bookingNO", element: <BookingNO/> },
  { path: "/bookingBR", element: <BookingBR/> },
  { path: "/bookingLC", element: <BookingLC/> },
  { path: '/signup', element: <SignPage /> },
  { path: '/login', element: <LoginPage /> },
]);

ReactDOM.render(
  <Provider options={{ cache: CachePolicies.NO_CACHE }}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);