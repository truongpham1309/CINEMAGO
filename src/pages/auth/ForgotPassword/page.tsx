import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from '@hookform/resolvers/joi';
import { ForgotPasswordSchema } from "@/common/validations/authValid/login";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logo } from "@/assets/images/logo";


const ForgotPassWordPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            return await forgotPassword(data);
        },
        onSuccess: () => {
            navigate('/send-email');
        },
        onError: (err: any) => {
            toast.warn(err.response?.data.message)
        }
    })

    const handleForgotPassword: SubmitHandler<any> = (data) => {
        mutate(data);
    }
    return (
        <section
            className="account-section bg_img"
            style={{ backgroundImage: "url('/src/assets/images/account/account-bg.jpg')", height: "100vh" }}
            data-background="/src/assets/images/account/account-bg.jpg"
        >
            <div className="container">
                <div className="padding-top padding-bottom">
                    <div className="account-area">

                        <div className="section-header-3">
                            <div className="logo">
                                <Link to="/">
                                    <img width={100} className="my-3" src={logo} alt="logo" />
                                </Link>
                            </div>
                            <h2 className="title">Nhập email của bạn</h2>
                        </div>
                        <form className="account-form" onSubmit={handleSubmit(handleForgotPassword)}>
                            <div className="form-group">
                                <label htmlFor="email2">
                                    Email<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("email")}
                                    placeholder="Enter Your Email"
                                    id="email2"
                                />
                                {errors.email && <span className="text-danger">{errors?.email.message!}</span>}
                            </div>

                            <div className="form-group text-center">
                                <input disabled={isPending} type="submit" defaultValue="Gửi" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default ForgotPassWordPage