import { TInputFormRegister } from "@/common/types/auth";
import { TFormSignUpProps } from "@/common/types/form/methodUseForm";
import { toUppperCaseFirstString } from "@/common/libs/handleString";

type Props = {
    item: TInputFormRegister,
    form: TFormSignUpProps
}

const InputForm = ({ item, form: { register, errors } }: Props) => {
    return (
        <div className="form-group">
            <label htmlFor={item?.keysub}>
                {item?.lable}<span>*</span>
            </label>
            <input
                type={item?.typeInput}
                placeholder={`Enter Your ${toUppperCaseFirstString(item?.lable!)}`}
                id={item?.keysub}
                {...register(item?.keysub!)}
            />
            {errors[item?.keysub!] && <span className="text-danger">{errors[item?.keysub!]?.message!}</span>}
        </div>
    )
}

export default InputForm