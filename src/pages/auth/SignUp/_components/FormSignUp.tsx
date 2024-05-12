import { TInputChildren, TInputFormRegister } from "@/common/types/auth"
import InputForm from "../../_components/InputForm"
import { SubmitHandler } from "react-hook-form";
import { TFormInput, TFormSignUpProps } from "@/common/types/form/methodUseForm";
import SelectComponent from "./SelectComponent";
import InputNorman from "../../_components/InputNorman";

const FormSignUp = ({ register, handleSubmit, errors }: TFormSignUpProps) => {

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
        { id: 7, lable: "Confirm Password", typeInput: "password", keysub: "confirm_password", hasRequired: true },
    ];

    const handleSignUp: SubmitHandler<TFormInput> = (data) => {
        console.log(data);
    }
    return (
        <>
            <form className="account-form" onSubmit={handleSubmit(handleSignUp)}>
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
                                            <InputNorman item={child as TInputFormRegister} methodInput={{ register, handleSubmit, errors }} />
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        )
                    }
                        return (
                            <InputForm
                                item={item}
                                key={index}
                                form={{ register, errors, handleSubmit }}
                            />
                        )
                }

                )}
                {/* <div className="form-group checkgroup">
                    <input type="checkbox" id="bal" defaultChecked={true} />
                    <label htmlFor="bal">
                        I agree to the <a href="#0">Terms, Privacy Policy</a> and{" "}
                        <a href="#0">Fees</a>
                    </label>
                </div> */}
                <div className="form-group text-center mt-5">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </>
    )
}

export default FormSignUp