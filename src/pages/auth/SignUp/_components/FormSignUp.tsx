import { TInputChildren, TInputFormRegister } from "@/common/types/auth";
import { TFormSignUpProps } from "@/common/types/form/methodUseForm";
import InputForm from "../../_components/InputForm";
import SelectComponent from "./SelectComponent";

const FormSignUp = ({ register, handleSubmit, errors, onSubmit }: Required<TFormSignUpProps>) => {
    
    const items: Array<TInputFormRegister | TInputChildren> = [
        { id: 1, lable: "Email", typeInput: "email", keysub: "email", hasRequired: true },
        {
            children: [
                { id: 2, lable: "Full name", typeInput: "text", keysub: "full_name", hasRequired: true },
                { id: 3, lable: "Phone", typeInput: "text", keysub: "phone", hasRequired: true },
            ]
        },
        {
            children: [
                { id: 4, lable: "Birthday", typeInput: "date", keysub: "birth_date", hasRequired: true },
                {
                    id: 5, lable: "Gender", typeInput: "select", options: [
                        { value: "Nam", keysub: "gender" },
                        { value: "Nữ", keysub: "gender2" }
                    ], keysub: "gender", hasRequired: true
                }
            ]
        },
        { id: 6, lable: "Password", typeInput: "password", keysub: "password", hasRequired: true },
        { id: 7, lable: "Confirm Password", typeInput: "password", keysub: "password_confirmation", hasRequired: true },
    ];
    
    return (
        <>
            <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
                {items.map((item, index) => {
                    if ("children" in item) {
                        return (
                            <div key={index} className="form-group row">
                                {item.children.map((child, index) => {
                                    if (child.typeInput === "select") {
                                        return (
                                            <div key={index} className="col-sm-12 col-md-6 my-2">
                                                <SelectComponent
                                                    keysub={child.keysub}
                                                    lable={child.lable}
                                                    options={child.options!}
                                                    hasRequired={child.hasRequired}
                                                    methodForm={{ register, handleSubmit, errors }}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={index} className="col-sm-12 col-md-6 my-2">
                                            <InputForm item={child as TInputFormRegister} form={{ register, handleSubmit, errors }} />
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        )
                    }
                    return (
                        <div key={index} className="form-group">
                            <InputForm
                                item={item}
                                form={{ register, errors, handleSubmit }}
                            />
                        </div>

                    )
                }
                )}
                <div className="form-group text-center mt-5">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </>
    )
}

export default FormSignUp