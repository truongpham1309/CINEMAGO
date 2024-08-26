import Joi from "joi";

export const LoginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Email không hợp lệ!",
        "string.empty": "Mời bạn nhập email!",
        "any.required": "Mời bạn nhập email!",
    }),
    password: Joi.string().required().min(8).messages({
        "string.empty": "Mời bạn nhập mật khẩu!",
        "any.required": "Mời bạn nhập mật khẩu!",
        "string.min": "Mật khẩu phải lớn hơn {#limit} kí tự!"
    })
})

export const ForgotPasswordSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Email không hợp lệ!",
        "string.empty": "Mời bạn nhập email!",
        "any.required": "Mời bạn nhập email!",
    }),
})