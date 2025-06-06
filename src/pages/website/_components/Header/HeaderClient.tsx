import { selectorBooking } from "@/common/store/booking/selectorBooking";
import { logoutUser } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useChooseSeatsBooking } from "../../BookingSeat/hooks/useChooseSeat";
const { confirm } = Modal;

const HeaderClient = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const booking = useSelector(selectorBooking);
   const { mutate: cancelSeats } = useChooseSeatsBooking();
   const user = JSON.parse(localStorage.getItem("user")!) || null;
   const [pathName, setPathName] = useState("/");
   useEffect(() => {
      setPathName(location.pathname);
   }, [location.pathname]);

   const { mutate } = useMutation({
      mutationFn: async () => {
         await logoutUser();
      },
      onSuccess: () => {
         navigate("/");
         localStorage.removeItem("user");
      },
      onError: () => {
         localStorage.removeItem("user");
      },
   });

   const handleLogout = () => {
      confirm({
         content: "Bạn có chắc chắn muốn đăng xuất!",
         okText: "Có",
         cancelText: "Không",
         onOk() {
            if (booking?.seats.length > 0) {
               cancelSeats(
                  {
                     type: "CANCEL",
                     booking_seat: {
                        seat_ids: [...booking?.seats],
                        showtime_id: booking?.showtime_id,
                     },
                  },
                  {
                     onSuccess: () => {
                        mutate();
                     },
                  }
               );
            } else mutate();
         },
         onCancel() {},
      });
   };

   return (
      <>
         <header className="header-section">
            <div className="container">
               <div className="header-wrapper">
                  <div className="logo">
                     <Link to="/">
                        <img src="/assets/images/logo/logo.png" alt="logo" />
                     </Link>
                  </div>
                  <ul className="menu">
                     <li>
                        <Link to="/" className={pathName === "/" ? "active" : ""}>
                           Trang chủ
                        </Link>
                     </li>
                     <li>
                        <Link to="/movie" className={pathName.includes("/movie") ? "active" : ""}>
                           Phim
                        </Link>
                     </li>
                     <li>
                        <Link to="#0">Rạp</Link>
                     </li>
                     {user ? (
                        <li>
                           <Link className={pathName.includes("/account") ? "active" : ""} to="#">
                              {user?.data?.full_name} <i className="bi bi-chevron-up"></i>
                           </Link>
                           <ul className="submenu">
                              <li>
                                 <Link to="/account/ticket">Lịch sử</Link>
                              </li>
                              <li>
                                 <Link to="/account/profile">Thông tin tài khoản</Link>
                              </li>
                              {+user.data.role_id === 1 ? (
                                 <li>
                                    <Link to="/dashboard">Trang quản trị</Link>
                                 </li>
                              ) : null}
                              <li>
                                 <Link to="#" onClick={() => handleLogout()}>
                                    Đăng xuất
                                 </Link>
                              </li>
                           </ul>
                        </li>
                     ) : null}
                     {!user ? (
                        <li className="header-button pr-0">
                           <Link to="/login">Login</Link>
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
