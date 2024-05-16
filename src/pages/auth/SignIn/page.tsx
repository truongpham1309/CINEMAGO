import { Link, useNavigate } from "react-router-dom"
import FormSignIn from "./_components/FormSignIn"
import { SubmitHandler, useForm } from "react-hook-form"
import { TInputDataLogin, TResponseLogin } from "@/common/types/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { backgroundAccount } from "@/assets/images/account"
import { loginUser } from "@/services/auth/authService"
import { useLocalStorage } from "@/common/hooks/storeRange/useStoreRange"
import { joiResolver } from '@hookform/resolvers/joi';
import { LoginSchema } from "@/common/validations/authValid/login"

const SignInPage = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TInputDataLogin>({
    resolver: joiResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const [, setUser,] = useLocalStorage("user", {});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: async (user: TInputDataLogin) => {
      const data = await loginUser(user);
      return data;
    },
    onSuccess: (data: TResponseLogin) => {
      queryClient.invalidateQueries({
        queryKey: ['AUTH'],
      });

      console.log(data);
      setUser(data);
      navigate("/");
      toast.success("Đăng nhập thành công!", {
        position: "top-center"
      });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Thông tin không hợp lệ! Vui lòng thử lại", {
        position: "top-center"
      });
      reset();
    }
  })

  const handleOnLogin: SubmitHandler<TInputDataLogin> = (data) => {
    login(data);
  }

  return (
    <section
      className="account-section bg_img"
      data-background={backgroundAccount}
    >
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">hello</span>
              <h2 className="title">welcome back</h2>
            </div>
            <FormSignIn
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={handleOnLogin} />
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