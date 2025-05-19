import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { TInputDataLogin } from "../auth";

export type TFormInputRegister = {
    email: string;
    phone: string;
    full_name: string;
    gender: string;
    password: string;
    password_confirmation: string;
    birth_date: string;
}

export type TFormSignUpMethodProps = {
    register: UseFormRegister<TFormInputRegister>;
    handleSubmit: any;
    errors: FieldErrors<TFormInputRegister>;
    onSubmit?: (data: TFormInputRegister) => void;
}

export type TFormSignInMethodProps = {
    register: UseFormRegister<TInputDataLogin | any>;
    handleSubmit: UseFormHandleSubmit<TInputDataLogin>;
    errors: FieldErrors<TInputDataLogin>;
    onSubmit?: (data: TInputDataLogin) => void;
}