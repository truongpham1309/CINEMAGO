import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": `Email không hợp lệ!`,
        "string.empty": `Email không được để trống!`,
        "any.required": `Vui lòng nhập Email của bạn!`,
    }),
    full_name: Joi.string().min(5).max(50).messages({
        "string.min": "Họ tên phải nhập tối thiểu {#limit} kí tự!",
        "string.max": "Họ tên tối đa {#limit} kí tự!",
        "any.required": "Vui lòng nhập họ tên của bạn!",
        "string.empty": "Họ tên không được để trống!",
    }),
    phone: Joi.string().min(9).max(10).required().messages({
        "string.empty": "Số điện thoại không được để trống!",
        "string.min": "Số điện thoại tối thiểu phải {#limit} kí tự!",
        "string.max": "Số điện thoại tối đa {#limit} kí tự!",
    }),
    gender: Joi.string().required().max(5).messages({
        "string.empty": "Mời chọn giới tính!",
    }),
    birth_date: Joi.date().max('now').required().messages({
        "date.base": "Ngày sinh không hợp lệ!",
        "date.max": "Ngày sinh được quá ngày hiện tại!",
        "any.required": "Mời nhập ngày sinh của bạn!",
    }),
    password: Joi.string().required().min(8).messages({
        "string.base": "Mật khẩu không hợp lệ!",
        "string.empty": "Mật khẩu không được để trống!",
        "string.min": "Mật khẩu tối thiểu {#limit} kí tự!",
    }),
    confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
        "string.empty": "Mời bạn nhập lại mật khẩu!",
        "any.only": "Mật khẩu không khớp!",
        "any.required": "Mời bạn nhập lại mật khẩu!",
    })
})