import { Link, useNavigate } from "react-router-dom"
import FormSignUp from "./_components/FormSignUp"
import { backgroundAccount } from "@/assets/images/account"
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "@/common/validations/authValid/register";
import { joiResolver } from "@hookform/resolvers/joi";
import { TFormInputRegister } from "@/common/types/form/methodUseForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/services/auth/authService";
import { toast } from "react-toastify";
import { formatDateToString } from "@/common/libs/formatDateToString";

const SignUpUserPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: joiResolver(registerSchema),
        defaultValues: {
            email: "",
            phone: "",
            full_name: "",
            gender: "",
            password: "",
            password_confirmation: "",
            birth_date: "",
        }
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            await registerUser(data);
        },
        onSuccess: () => {
            toast.success("Đăng kí thành công!");
            queryClient.invalidateQueries({
                queryKey: ['AUTH']
            })
            navigate('/login');
        },
        onError: () => {
            toast.error("Đăng kí thất bại vui lòng thử lại!", {
                position: "top-center"
            });
            // reset();
        }
    })

    const handleSignUp: SubmitHandler<TFormInputRegister> = (data: any) => {
        console.log({ ...data, birth_date: formatDateToString(data.birth_date) });
        mutate({ ...data, birth_date: formatDateToString(data.birth_date) });
    }
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
                            <FormSignUp register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={handleSignUp} />
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