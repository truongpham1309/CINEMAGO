import Joi from "joi";

export const TicketTypeSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
        "string.base": "Tên loại vé không hợp lệ!",
        "string.empty": "Tên loại vé không được để trống!",
        "any.required": "Tên loại vé là bắt buộc!",
        "string.min": "Tên loại vé không quá {#limit} kí tự!",
        "string.max": "Tên loại vé không vượt quá {#limit} kí tự!",
    }),
    seat_type_id: Joi.number().required().min(1).messages({
        "any.required": "Loại ghế là bắt buộc!",
        "number.min": "Mời bạn chọn loại ghế!",
        "number.empty": "Mời bạn chọn loại ghế!",
        "number.base": "Loại ghế không hợp lệ!",
    }),
    price: Joi.number().required().min(50000).messages({
        "number.base": "Giá vé không hợp lệ!",
        "number.empty": "Giá vé không được để trống!",
        "any.required": "Giá vé là bắt buộc!",
        "number.min": "Giá vé không nhỏ hơn 50.000đ",
    }),
    promotion_price: Joi.number().required().min(50000).messages({
        "number.base": "Giá ưu đãi không hợp lệ!",
        "number.empty": "Giá ưu đãi không được để trống!",
        "any.required": "Giá ưu đãi là bắt buộc!",
        "number.min": "Giá không nhỏ hơn 50.000đ",
    })
}).unknown(true);