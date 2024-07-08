import { Link } from 'react-router-dom'

const SideBarComponent = () => {

    const listLink = [
        {
            id: 1, title: "Phim", sku: "movie", icon: "fas fa-fw fa-film", children: [
                { id: "phim1", title: "Danh sách phim", path: '/dashboard/movie' },
                { id: "phim2", title: "Thêm mới phim", path: "/dashboard/movie/create" }
            ],
        },
        {
            id: 2, title: "Màn hình", sku: "screen", icon: "fas fa-fw fa-tv", children: [
                { id: "screen1", title: "Danh sách màn hình", path: "/dashboard/screen" },
                { id: "screen2", title: "Thêm mới màn hình", path: "/dashboard/screen/create" },
            ]
        },
        {
            id: 3, title: "Rạp chiếu", sku: "cinema", icon: "fas fa-fw fa-theater-masks", children: [
                { id: "cinema1", title: "Danh sách rạp chiếu", path: "/dashboard/cinema" },
                { id: "cinema2", title: "Thêm mới rạp chiếu", path: "/dashboard/cinema/create" },
            ]
        },
        {
            id: 4, title: "Phòng chiếu", sku: "rooms", icon: "fas fa-door-open fa-fw", children: [
                { id: "rooms1", title: "Danh sách phòng chiếu", path: "/dashboard/room-cinema" }
            ]
        },
        {
            id: 9, title: "Bản đồ ghế", sku: "seat-map", icon: "fas fa-th-large fa-fw", children: [
                { id: "seat-map1", title: "Danh sách seat map", path: "/dashboard/seat-map" },
                { id: "seat-map2", title: "Thêm mới seat map", path: "/dashboard/seat-map/create" },
            ]
        },
        {
            id: 5, title: "Ghế", sku: "seat", icon: "fas fa-fw fa-chair", children: [
                { id: "seat1", title: "Danh sách ghế", path: "/dashboard/seat" },
                { id: "seat2", title: "Thêm mới ghế", path: "/dashboard/seat/create" },
            ]
        },
        {
            id: 10, title: "Loại Ghế", sku: "seat-type", icon: "fas fa-couch fa-fw", children: [
                { id: "seat-type3", title: "Danh sách loại ghế", path: "/dashboard/seattype" },
                { id: "seat-type4", title: "Thêm mới loại ghế", path: "/dashboard/seattype/create" },
            ]
        },
        {
            id: 6, title: "Suất chiếu", sku: "show-time", icon: "fas fa-fw fa-clock", children: [
                { id: "showtime1", title: "Danh sách suất chiếu", path: "/dashboard/show-time" },
                { id: "showtime2", title: "Thêm mới suất chiếu", path: "/dashboard/show-time/create" }
            ]
        },
        {
            id: 7, title: "Booking", sku: "booking", icon: "fas fa-fw fa-ticket-alt", children: [
                { id: "booking1", title: "Danh sách booking", path: "/dashboard/booking" },
            ]
        },
        {
            id: 8, title: "Dịch vụ", sku: "services", icon: "fas fa-hotdog fa-fw", children: [
                { id: "services1", title: "Danh sách dịch vụ", path: "/dashboard/service" },
                { id: "services2", title: "Thêm mới dịch vụ", path: "/dashboard/service/create" },
            ]
        }
    ]
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    CINEMA GO <sup>2</sup>
                </div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </Link>
            </li>

            {listLink.map((_link) => (
                <li key={_link.id} className="nav-item">
                    <Link
                        className="nav-link collapsed"
                        to="#"
                        data-toggle="collapse"
                        data-target={`#${_link.sku}`}
                        aria-expanded="true"
                        aria-controls={_link.sku}
                    >
                        <i className={_link.icon} />
                        <span>{_link.title}</span>
                    </Link>
                    <div id={_link.sku} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Quản lí {_link.title}</h6>
                            {_link.children.map((_child) => (
                                <Link key={_child.id} className="collapse-item" to={_child.path}>
                                    {_child.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default SideBarComponent