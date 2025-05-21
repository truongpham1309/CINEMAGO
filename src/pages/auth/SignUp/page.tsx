import { Link, useNavigate } from "react-router-dom"
import FormSignUp from "./_components/FormSignUp"
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "@/common/validations/authValid/register";
import { joiResolver } from "@hookform/resolvers/joi";
import { TFormInputRegister } from "@/common/types/form/methodUseForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/services/auth/authService";
import { toast } from "react-toastify";
import { formatDateToString } from "@/common/libs/formatDateToString";
import LoadingComponent from "@/components/ui/LoadingComponent";

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
    const { mutate, isPending } = useMutation({
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
            reset();
        }
    })

    const handleSignUp: SubmitHandler<TFormInputRegister> = (data: any) => {
        console.log({ ...data, birth_date: formatDateToString(data.birth_date) });
        mutate({ ...data, birth_date: formatDateToString(data.birth_date) });
    }

    if (isPending) return <LoadingComponent />;
    return (
        <>
            <section
                className="account-section bg_img"
                data-background='/assets/images/account/account-bg.jpg'
                style={{ backgroundImage: "url('assets/images/account/account-bg.jpg')", height: "100vh" }}
            >
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">

                            <div className="section-header-3">
                                <div className="logo">
                                    <Link to="/">
                                        <img width={100} className="my-3" src='/assets/images/logo/logo.png' alt="logo" />
                                    </Link>
                                </div>
                                <h2 style={{ fontWeight: '700' }} className="title">chào mừng bạn đến với CinemaGo</h2>
                            </div>
                            <FormSignUp register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={handleSignUp} />
                            <div className="option">
                                Bạn đã có tài khoản <Link to="/login">Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUpUserPage