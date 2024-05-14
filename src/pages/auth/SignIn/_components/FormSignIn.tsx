import { TInputFormRegister } from "@/common/types/auth"
import InputSignIn from "./InputSignIn"
import { Link } from "react-router-dom"


const FormSignIn = () => {

    const items: Array<TInputFormRegister> = [
        { id: 1, lable: "email", keysub: "email", typeInput: "email", hasRequired: true },
        { id: 2, lable: "password", keysub: "password", typeInput: "password", hasRequired: true }
    ]
    return (
        <form className="account-form">

            {items.map((item, index) => (
                <InputSignIn key={index} props={item} />
            ))}
            <div className="form-group checkgroup">
                <input type="checkbox" id="bal2" />
                <label htmlFor="bal2">remember password</label>
                <Link to="#" className="forget-pass">
                    Forget Password
                </Link>
            </div>
            <div className="form-group text-center">
                <input type="submit" value="Login" />
            </div>
        </form>
    )
}

export default FormSignIn