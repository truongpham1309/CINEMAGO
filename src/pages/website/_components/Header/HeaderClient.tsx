import { logo } from "@/assets/images/logo";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderClient = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")!) || null;
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
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/movie" className={pathName.includes("/movie") ? "active" : ""}>Phim</Link>
              </li>
              <li>
                <Link to="#0">Rạp</Link>
              </li>
              <li>
                <Link to="#0">Sự kiện</Link>
              </li>
              {user ? (
                <li className="header-button pr-0">
                  <Link to="">Tài khoản</Link>
                </li>
              ) : (
                <li className="header-button pr-0">
                  <Link to="/sign-up">Sign up</Link>
                </li>
              )}

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
