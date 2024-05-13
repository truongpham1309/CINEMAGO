import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type TFormInputRegister = {
    email: string;
    phone: string;
    full_name: string;
    gender: string;
    password: string;
    password_confirmation: string;
    birth_date: string;
}

export type TFormSignUpProps = {
    register: UseFormRegister<TFormInputRegister>;
    handleSubmit: UseFormHandleSubmit<TFormInputRegister>;
    errors: FieldErrors<TFormInputRegister>;
    onSubmit?: (data: TFormInputRegister) => void;
}