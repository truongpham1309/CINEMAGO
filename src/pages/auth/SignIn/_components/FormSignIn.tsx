import { TInputFormRegister } from "@/common/types/auth"
import { Link } from "react-router-dom"
import { TFormSignInMethodProps } from "@/common/types/form/methodUseForm"
import InputForm from "../../_components/InputForm"


const FormSignIn = ({ register, handleSubmit, errors, onSubmit }: Required<TFormSignInMethodProps>) => {

    const items: Array<TInputFormRegister> = [
        { id: 1, lable: "email", keysub: "email", typeInput: "email", hasRequired: true },
        { id: 2, lable: "Mật khẩu", keysub: "password", typeInput: "password", hasRequired: true }
    ]
    return (
        <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
            {items.map((item, index) => (
                <InputForm key={index} item={item} form={{ register, errors }} />
            ))}
            <div className="form-group checkgroup">
                <input type="checkbox" id="bal2" />
                <label htmlFor="bal2">remember password</label>
                <Link to="/forgot-password" className="forget-pass">
                    Quên mật khẩu
                </Link>
            </div>
            <div className="form-group text-center">
                <input type="submit" value="Đăng nhập" />
            </div>
        </form>
    )
}

export default FormSignIn