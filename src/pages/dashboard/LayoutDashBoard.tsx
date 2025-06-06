import LoadingComponent from "@/components/ui/LoadingComponent"
import { logoutUser } from "@/services/auth/authService"
import "@styles/sb-admin-2.css"
import { useMutation } from "@tanstack/react-query"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Footer from "./_components/Footer"
import SideBarComponent from "./_components/SideBarComponent"
import { Modal } from "antd"
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
    }
  });
  const handleLogout = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn đăng xuất!',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        mutate()
      },
      onCancel() {
      },
    });
  }
  if (isPending) return <LoadingComponent />;
  return (
    <div className="admin" id="wrapper">
      <SideBarComponent />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item dropdown no-arrow d-sm-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-search fa-fw" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell fa-fw" />
                  <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <div
                  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="alertsDropdown"
                >
                  <h6 className="dropdown-header">Alerts Center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                      <div className="icon-circle bg-primary">
                        <i className="fas fa-file-alt text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="small text-gray-500">December 12, 2019</div>
                      <span className="font-weight-bold">
                        A new monthly report is ready to download!
                      </span>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Show All Alerts
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-envelope fa-fw" />
                  <span className="badge badge-danger badge-counter">7</span>
                </a>
                <div
                  className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="messagesDropdown"
                >
                  <h6 className="dropdown-header">Message Center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                      <img
                        className="rounded-circle"
                        src="img/undraw_profile_1.svg"
                        alt="..."
                      />
                      <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                      <div className="text-truncate">
                        Hi there! I am wondering if you can help me with a problem
                        I've been having.
                      </div>
                      <div className="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Read More Messages
                  </a>
                </div>
              </li> */}
              <div className="topbar-divider d-none d-sm-block" />
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    Quản trị viên
                  </span>
                  <i className="fas fa-user-tie"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <div className="dropdown-divider" />
                  <Link
                    className="dropdown-item"
                    to="/"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400" />
                    Website
                  </Link>
                  <span
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target="#logoutModalq"
                    onClick={() => handleLogout()}
                  >
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


  )
}

export default LayoutDashBoard