import { Link, useNavigate } from "react-router-dom"
import FormSignIn from "./_components/FormSignIn"
import { SubmitHandler, useForm } from "react-hook-form"
import { TInputDataLogin, TResponseLogin } from "@/common/types/auth"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { loginUser } from "@/services/auth/authService"
import { joiResolver } from '@hookform/resolvers/joi';
import { LoginSchema } from "@/common/validations/authValid/login"
import LoadingComponent from "@/components/ui/LoadingComponent"

const SignInPage = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TInputDataLogin>({
    resolver: joiResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (user: TInputDataLogin) => {
      const data = await loginUser(user);
      return data;
    },
    onSuccess: (login: TResponseLogin) => {
      localStorage.setItem("user", JSON.stringify(login.data));
      navigate("/");
      toast.success("Đăng nhập thành công!", {
        position: "top-center"
      });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Thông tin tài khoản hoặc mật khẩu không chính xác!", {
        position: "top-center"
      });
      reset();
    }
  })

  const handleOnLogin: SubmitHandler<TInputDataLogin> = (data) => {
    login(data);
  }
  if (isPending) return <LoadingComponent />;
  return (
    <section
      className="account-section bg_img"
      style={{ backgroundImage: "url('assets/images/account/account-bg.jpg')", height: "100vh" }}
      data-background='/assets/images/account/account-bg.jpg'
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
              <span style={{ fontWeight: '700' }} className="cate font-bold">chào mừng bạn trở lại</span>
              <h2 className="title"></h2>
            </div>
            <FormSignIn
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={handleOnLogin} />
            <div className="option">
              Bạn chưa có tài khoản? <Link to="/signup">Đăng kí ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInPage