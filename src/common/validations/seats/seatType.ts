import Joi from "joi";


export const SeatTypeSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(1)
        .max(20)
        .messages({
            "string.min": "Loại ghế không ít hơn {#limit} kí tự!",
            "string.max": "Tên loại ghế không quá {#limit} kí tự!",
            "any.required": "Tên loại ghế là bắt buộc!",
            "string.empty": "Tên loại ghế không được để trống!",
        }),
    price: Joi.number()
        .min(50000)
        .required()
        .messages({
            "number.base": "Giá ghế không hợp lệ!",
            "number.empty": "Mời nhập giá của ghế!",
            "number.min": "Giá ghế tối thiểu {#limit}đ",
            "any.required": "Giá vé là bắt buộc!",
        }),
    promotion_price: Joi.number().required().greater(Joi.ref('price')).messages({
            "number.greater": "Giá ưu đãi phải lớn hơn giá vé thường!",
            "number.required": "Giá ưu đãi là bắt buộc!",
        })
}).unknown(true);