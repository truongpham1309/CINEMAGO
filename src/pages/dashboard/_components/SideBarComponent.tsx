import { Link } from 'react-router-dom'

const SideBarComponent = () => {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    CINEMA GO <sup>2</sup>
                </div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link collapsed"
                    to="#"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                >
                    <i className="fas fa-fw fa-film" />
                    <span>Phim</span>
                </Link>
                <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionSidebar"
                >
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Quản Lí Phim</h6>
                        <Link className="collapse-item" to="/dashboard/movie">
                            Danh Sách Phim
                        </Link>
                        <Link className="collapse-item" to="/dasboard/movie/create">
                            Thêm Mới Phim
                        </Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link collapsed"
                    to="#"
                    data-toggle="collapse"
                    data-target="#collapseChair"
                    aria-expanded="true"
                    aria-controls="collapseChair"
                >
                    <i className="fas fa-fw fa-chair" />
                    <span>Ghế</span>
                </Link>
                <div
                    id="collapseChair"
                    className="collapse"
                    aria-labelledby="headingChair"
                    data-parent="#accordionSidebar"
                >
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Quản Lí Phim</h6>
                        <Link className="collapse-item" to="/dashboard/movie">
                            Danh Sách Phim
                        </Link>
                        <Link className="collapse-item" to="/dasboard/movie/create">
                            Thêm Mới Phim
                        </Link>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default SideBarComponent