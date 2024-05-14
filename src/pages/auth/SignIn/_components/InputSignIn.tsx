import { toUppperCaseFirstString } from "@/common/libs/handleString"
import { TInputFormRegister } from "@/common/types/auth"

type Props = {
    props: TInputFormRegister
}

const InputSignIn = ({ props }: Props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.lable}>
                {props.lable}<span>{props.hasRequired ?? "*"}</span>
            </label>
            <input
                type={props.typeInput}
                placeholder={`Enter Your ${toUppperCaseFirstString(props.lable)}`}
                id={props.lable}
            />
        </div>
    )
}

export default InputSignIn