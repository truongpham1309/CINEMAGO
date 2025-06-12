import LoadingComponent from "@/components/ui/LoadingComponent";
import { logoutUser } from "@/services/auth/authService";
import "@styles/sb-admin-2.css";
import { useMutation } from "@tanstack/react-query";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./_components/Footer";
import SideBarComponent from "./_components/SideBarComponent";
import { Modal } from "antd";
const { confirm } = Modal;

const LayoutDashBoard = () => {
   const navigate = useNavigate();
   const { mutate, isPending } = useMutation({
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
            mutate();
         },
         onCancel() {},
      });
   };
   if (isPending) return <LoadingComponent />;
   return (
      <div className="admin" id="wrapper">
         <SideBarComponent />
         <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
               <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                  <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                     <i className="fa fa-bars" />
                  </button>
                  <ul className="navbar-nav ml-auto">
                     <div className="topbar-divider d-none d-sm-block" />
                     <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <span className="mr-2 d-none d-lg-inline text-gray-600 small">Quản trị viên</span>
                           <i className="fas fa-user-tie"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                           <div className="dropdown-divider" />
                           <Link className="dropdown-item" to="/" data-toggle="modal" data-target="#logoutModal">
                              <i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400" />
                              Website
                           </Link>
                           <span className="dropdown-item" data-toggle="modal" data-target="#logoutModalq" onClick={() => handleLogout()}>
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                              Đăng xuất
                           </span>
                        </div>
                     </li>
                  </ul>
               </nav>
               <div className="container-fluid">
                  <Outlet />
               </div>
            </div>
            <Footer />
         </div>
      </div>
   );
};

export default LayoutDashBoard;
