import Joi from "joi";

export const ServiceSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).messages({
        "string.empty": "Tên dịch vụ không được để trống!",
        "string.base": "Tên dịch vụ không đúng định dạng!",
        "string.min": "Tên dịch vụ phải ít nhất {#limit} kí tự!",
        "string.max": "Tên dịch vụ không quá {#limit} kí tự!",
        "any.required": "Tên dịch vụ là bắt buộc!",
    }),
    price: Joi.number().required().min(10000).messages({
        "number.empty": "Giá dịch vụ không được để trống!",
        "number.min": "Giá dịch vụ phải lớn hơn {#limit} đồng!",
        "any.required": "Giá dịch vụ là bắt buộc!",
        "number.base": "Giá dịch vụ không đúng định dạng!",
    }),
    quantity: Joi.number().required().min(1).messages({
        "number.base": "Số lượng không đúng định dạng!",
        "number.min": "Số lượng phải lớn hơn {#limit}!",
        "any.required": "Số lượng là bắt buộc!",
    })
}).unknown(true);