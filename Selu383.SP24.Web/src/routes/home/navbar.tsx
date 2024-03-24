import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  useEffect(() => {
    console.log("layout loaded");
  }, []);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="<KEY>"
        crossOrigin="anonymous"
      ></link>
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Enstay</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/hotel-details/hoteldetails">Hotels</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to="/help">Help</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </body>
      <Outlet />
    </>
  );
}