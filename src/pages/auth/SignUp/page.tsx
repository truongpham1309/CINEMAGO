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
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUpUserPage