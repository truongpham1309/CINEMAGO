import { toUppperCaseFirstString } from "@/common/libs/handleString";

type inputProps = {
    name: string,
    typeInput: string,
    errors?: boolean,
}

const InputForm = ({ name, typeInput }: inputProps) => {
    return (
        <>
            <label htmlFor={name}>
                {name}<span>*</span>
            </label>
            <input
                type={typeInput}
                placeholder={`Enter Your ${toUppperCaseFirstString(name)}`}
                id={name}
            />
            <span className="text-danger ">{toUppperCaseFirstString(name)} không được để trống!</span>
        </>
    )
}

export default InputForm