import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useEffect, useState } from "react";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import { MenuItem } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const openNav = () => {
    setNav(!nav);
  };

  const logout = () => {
    navigate("/", { replace: true });
    localStorage.clear();
  };

  // const adminPanel = () => {
  //   navigate("/admin", { replace: true });
  //   // window.location.reload();
  // };
  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="md:block hidden">
            <MenuItem />
          </div>
          <ul className="mobile-navbar__links bg-white">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/book">
                Book
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            <li>
              {user === null && (
                <div className="flex flex-col gap-3 -mt-5">
                  <Link onClick={openNav} className="navbar__buttons__sign-in" to="/login">
                    Sign In
                  </Link>
                  <Link onClick={openNav} className="navbar__buttons__register" to="/signup">
                    Register
                  </Link>
                </div>
              )}
            </li>
            <li>
              {localStorage.getItem("jwt") !== null && user && (
                <div className="flex flex-col gap-3 -mt-5">
                  {user.role === "admin" && (
                    <Link onClick={openNav} className="navbar__buttons__sign-in" to="/admin">
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    onClick={() => {
                      openNav();
                      logout();
                    }}
                    className="navbar__buttons__sign-in"
                    to="/"
                  >
                    Logout
                  </Link>
                  <Link onClick={openNav} className="navbar__buttons__register" to="/">
                    {user.role}
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* desktop */}
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>

            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/book">
                <DirectionsCar fontSize="large" className="text-red-400 font-extrabold" /> <span className="">Book</span>
              </Link>
            </li>
          </ul>

          {user === null && (
            <div className="navbar__buttons">
              <Link className="navbar__buttons__sign-in" to="/login">
                Sign In
              </Link>
              <Link className="navbar__buttons__register" to="/signup">
                Register
              </Link>
            </div>
          )}
          {localStorage.getItem("jwt") !== null && user && (
            <div className="navbar__buttons">
              {user.role === "admin" && (
                <Link className="navbar__buttons__sign-in" to="/admin">
                  Admin Panel
                </Link>
              )}
              <Link onClick={logout} className="navbar__buttons__sign-in" to="/">
                Logout
              </Link>
              <Link className="navbar__buttons__register" to="/">
                {user.role}
              </Link>
            </div>
          )}
          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
