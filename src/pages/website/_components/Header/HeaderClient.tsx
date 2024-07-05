import { logo } from "@/assets/images/logo";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderClient = () => {
  const location = useLocation();
  console.log(location);
  const [pathName, setPathName] = useState("/");
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <header className="header-section">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <ul className="menu">
              <li>
                <Link to="/" className={pathName === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movie" className={pathName === "/movie" ? "active" : ""}>movies</Link>
              </li>
              <li>
                <Link to="#0">events</Link>
              </li>
              <li>
                <Link to="#0">pages</Link>
              </li>
              <li>
                <Link to="contact.html">contact</Link>
              </li>
              <li>
                <Link to="#0" />
              </li>
              <li>
                <Link to="#0" />
              </li>
              <li>
                <Link to="#0" />
              </li>
              <li className="header-button pr-0">
                <Link to="/sign-up">Sign up</Link>
              </li>
            </ul>
            <div className="header-bar d-lg-none">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderClient;
