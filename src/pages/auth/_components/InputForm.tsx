import { TInputFormRegister } from "@/common/types/auth";
import { toUppperCaseFirstString } from "@/common/libs/handleString";
import { TFormSignUpMethodProps } from "@/common/types/form/methodUseForm";

type Props = {
    item: TInputFormRegister,
    form: TFormSignUpMethodProps
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