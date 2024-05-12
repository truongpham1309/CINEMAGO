import { TOptionsSelect } from "@/common/types/auth"
import { TFormInput, TFormSignUpProps } from "@/common/types/form/methodUseForm"

type Props = {
    id?: number,
    lable: string,
    keysub: string,
    options: TOptionsSelect[],
    hasRequired: boolean,
    methodForm: TFormSignUpProps
}

const SelectComponent = ({ lable, keysub, options, hasRequired, methodForm: { errors, register } }: Props) => {
    return (
        <>
            <label htmlFor={keysub}>
                {lable}<span>*</span>
            </label>
            <select className="border-0" {...register(keysub as keyof TFormInput)}  style={{ backgroundColor: "#001232" }} name={keysub} id={keysub}>
                <option defaultValue={""}></option>
                {options.map(item => (
                    <option key={item.keysub} value={item.value}>{item.value}</option>
                ))}
            </select>
            {errors[keysub as keyof TFormInput] && (<span className="text-danger">{errors[keysub as keyof TFormInput]?.message}</span>)}
        </>
    )
}

export default SelectComponent