import { TInputFormRegister } from "@/common/types/auth";
import InputNorman from "./InputNorman";
import { TFormSignUpProps } from "@/common/types/form/methodUseForm";

type Props = {
    item: TInputFormRegister,
    form: TFormSignUpProps
}

const InputForm = ({ item, form }: Props) => {
    return (
        <div className="form-group">
            <InputNorman item={item} methodInput={form} />
        </div>
    )
}

export default InputForm