import { Link } from "react-router-dom"
import FormSignUp from "./_components/FormSignUp"

const SignUpUserPage = () => {
    return (
        <>
            <section
                className="account-section bg_img"
                data-background="assets/images/account/account-bg.jpg"
            >
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">welcome</span>
                                <h2 className="title">to Boleto </h2>
                            </div>
                                <FormSignUp />
                            <div className="option">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                            {/* <div className="or">
                                <span>Or</span>
                            </div>
                            <ul className="social-icons">
                                <li>
                                    <a href="#0">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#0" className="active">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#0">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUpUserPage