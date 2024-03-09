import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand">Enstay</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="./hotel-details/hoteldetails">Hotels</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./sign-up">Sign-Up</a>
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