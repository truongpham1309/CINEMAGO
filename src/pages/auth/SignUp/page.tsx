import { Link } from "react-router-dom"
import FormSignUp from "./_components/FormSignUp"
import { backgroundAccount } from "@/assets/images/account"
import { useForm } from "react-hook-form";
import { registerSchema } from "@/common/validations/authValid/register";
import { joiResolver } from "@hookform/resolvers/joi";

const SignUpUserPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(registerSchema),
        defaultValues: {
            email: "",
            phone: "",
            full_name: "",
            gender: "",
            password: "",
            confirm_password: "",
            birth_date: "",
        }
    })
    return (
        <>
            <section
                className="account-section bg_img"
                data-background={backgroundAccount}
            >
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">welcome</span>
                                <h2 className="title">to Boleto </h2>
                            </div>
                            <FormSignUp register={register} handleSubmit={handleSubmit} errors={errors} />
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