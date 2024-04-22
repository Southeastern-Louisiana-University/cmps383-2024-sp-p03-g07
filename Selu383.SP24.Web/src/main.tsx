import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/homepage";
import Help from "./routes/help";
import Booking from "./routes/booking/booking";
import Login from "./routes/login/loginpage";
import Reservation from "./routes/reservation/reservation";
import Staydetails from "./routes/staydetails/staydetails";
import { CachePolicies, Provider } from "use-http";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./routes/signup/signpage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/help", element: <Help /> },
  { path: "/booking", element: <Booking/> },
  {path:"/login",element:<Login/>},
  {path:"/signup",element:<SignUp/>},
  {path:"/reservation",element:<Reservation/>},
  {path:"/staydetails",element:<Staydetails/>},
]);

ReactDOM.render(
  <Provider options={{ cache: CachePolicies.NO_CACHE }}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);