import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export type TFormInput = {
    email: string;
    phone: string;
    full_name: string;
    gender: string;
    password: string;
    confirm_password: string;
    birth_date: string;
}

export type TFormSignUpProps = {
    register: UseFormRegister<TFormInput>;
    handleSubmit: UseFormHandleSubmit<TFormInput>;
    errors: FieldErrors<TFormInput>
}