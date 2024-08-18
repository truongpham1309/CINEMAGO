import { logo } from "@/assets/images/logo"
import { NewsLaster } from "@/assets/images/newslater"

const FooterClient = () => {
    return (
        <>
            <footer className="footer-section">
                <div className="newslater-section padding-bottom">
                    <div className="container">
                        <div
                            className="newslater-container bg_img"
                            data-background={NewsLaster}
                        >
                            <div className="newslater-wrapper">
                                <h5 className="cate">Đăng ký ngay tại CinemaGo </h5>
                                <h3 className="title">Để nhận được những voucher hấp dẫn!</h3>
                                <form className="newslater-form">
                                    <input type="text" placeholder="Địa chỉ email của bạn" />
                                    <button type="submit">Đăng kí</button>
                                </form>
                                <p>Chúng tôi tôn trọng quyền riêng tư của bạn nên chúng tôi không bao giờ chia sẻ thông tin của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="footer-top">
                        <div className="logo">
                            {/* <a href="index-1.html">
                                <img src={logo} alt="footer" />
                            </a> */}
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