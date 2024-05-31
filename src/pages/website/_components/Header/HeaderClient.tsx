import { logo } from "@/assets/images/logo"
import { Link } from "react-router-dom"

const HeaderClient = () => {
    return (
        <>
            <header className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <Link to="index-3.html">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <ul className="menu">
                            <li>
                                <Link to="#0" className="active">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="#0">movies</Link>
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
    )
}

export default HeaderClient