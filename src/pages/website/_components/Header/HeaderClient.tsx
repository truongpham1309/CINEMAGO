import { logo } from "@assets/images/logo";
import { logoutUser } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderClient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!) || null;
  const [pathName, setPathName] = useState("/");
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onSuccess: () => {
      navigate("/");
      localStorage.removeItem("user");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, bạn không thể đăng xuất!");
      localStorage.removeItem("user");
    }
  });

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
                <li>
                  <Link to="/profile">{user?.data?.full_name}</Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/account/ticket">Lịch sử</Link>
                    </li>
                    <li>
                      <Link to="/account/ticket">Thông tin tài khoản</Link>
                    </li>
                    {+user.data.role_id === 1 ? (
                      <li>
                        <Link to="/dashboard">Trang quản trị</Link>
                      </li>
                    ) : null}
                    <li>
                      <Link to="#" onClick={() => mutate()}>Đăng xuất</Link>
                    </li>
                  </ul>
                </li>
              ) : null}
              {!user ? (
                <li className="header-button pr-0">
                  <Link to="/login">login</Link>
                </li>
              ) : null}

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
