import { Link, useNavigate } from "react-router-dom"

const FooterClient = () => {
    const navigate = useNavigate();
    return (
        <>
            <footer className="footer-section">
                <div className="newslater-section padding-bottom">
                    <div className="container">
                        <div
                            className="newslater-container bg_img"
                            // data-background='/assets/images/newslater/newslater-bg01.jpg'
                            style={{backgroundImage: "url('/assets/images/newslater/newslater-bg01.jpg')", height: "45vh"}}
                        >
                            <div className="newslater-wrapper">
                                <h5 className="cate">Đăng ký ngay tại CinemaGo </h5>
                                <h3 className="title">Để nhận được những voucher hấp dẫn!</h3>
                                <form className="newslater-form">
                                    <input className=""  type="email" placeholder="Địa chỉ email của bạn" />
                                    <button onClick={() => navigate('/signup')} type="submit">Đăng kí</button>
                                </form>
                                <p>Chúng tôi tôn trọng quyền riêng tư của bạn nên chúng tôi không bao giờ chia sẻ thông tin của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="footer-top">
                        <div className="logo">
                            <Link to="/">
                                <img width={120} src='/assets/images/logo/logo.png' alt="footer" />
                            </Link>
                        </div>
                        <ul className="social-icons">
                            <li>
                                <a href="#0">
                                    <i className="fab fa-facebook-f" />
                                </a>
                            </li>
                            <li>
                                <a href="#0" className="active">
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                            <li>
                                <a href="#0">
                                    <i className="fab fa-pinterest-p" />
                                </a>
                            </li>
                            <li>
                                <a href="#0">
                                    <i className="fab fa-google" />
                                </a>
                            </li>
                            <li>
                                <a href="#0">
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-area">
                            <div className="left">
                                <p>
                                    Copyright © 2024.All Rights Reserved By <a href="#0">CinemaGO </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default FooterClient