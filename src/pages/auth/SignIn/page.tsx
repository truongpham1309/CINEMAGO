import { Link } from "react-router-dom"
import FormSignIn from "./_components/FormSignIn"

const SignInPage = () => {
  return (
    <section
      className="account-section bg_img"
      data-background="assets/images/account/account-bg.jpg"
    >
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">hello</span>
              <h2 className="title">welcome back</h2>
            </div>
            <FormSignIn />
            <div className="option">
              Don't have an account? <Link to="/signup">sign up now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInPage