import { toUppperCaseFirstString } from "@/common/libs/handleString"
import { TInputFormRegister } from "@/common/types/auth"
import { TFormSignUpProps } from "@/common/types/form/methodUseForm"

type Props = {
    item: TInputFormRegister
    methodInput: TFormSignUpProps
}

const InputNorman = ({ item, methodInput: { register, errors } }: Props) => {
    return (
        <>
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
        </>
    )
}

export default InputNorman