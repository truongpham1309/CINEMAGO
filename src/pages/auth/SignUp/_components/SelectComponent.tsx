import { TOptionsSelect } from "@/common/types/auth"
import { TFormInputRegister, TFormSignUpMethodProps } from "@/common/types/form/methodUseForm"

type Props = {
    id?: number,
    lable: string,
    keysub: string,
    options: TOptionsSelect[],
    hasRequired: boolean,
    methodForm: TFormSignUpMethodProps
}

const SelectComponent = ({ lable, keysub, options, methodForm: { errors, register } }: Props) => {
    return (
        <>
            <label htmlFor={keysub}>
                {lable}<span>*</span>
            </label>
            <select className="border-0" {...register(keysub as keyof TFormInputRegister)}  style={{ backgroundColor: "#001232" }} name={keysub} id={keysub}>
                <option defaultValue={""}></option>
                {options.map(item => (
                    <option key={item.keysub} value={item.value}>{item.value}</option>
                ))}
            </select>
            {errors[keysub as keyof TFormInputRegister] && (<span className="text-danger">{errors[keysub as keyof TFormInputRegister]?.message}</span>)}
        </>
    )
}

export default SelectComponent