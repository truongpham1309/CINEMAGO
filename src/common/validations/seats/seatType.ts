import Joi from "joi";

export const SeatTypeSchema = Joi.object({
    screen_id: Joi.number().min(1).required().messages({
        "number.base": "Loại màn hình không hợp lệ!",
        "number.min": "Mời chọn loại màn hình!",
        "any.required": "Loại màn hình là bắt buộc!",
    }),
    name: Joi.string().required().min(1).max(20).messages({
        "string.min": "Loại ghế không ít hơn {#limit} kí tự!",
        "string.max": "Tên loại ghế không quá {#limit} kí tự!",
        "string.required": "Tên loại ghế là bắt buộc!",
        "string.empty": "Tên loại ghế không được để trống!",
    }),
    price: Joi.number().min(50000).required().messages({
        "number.empty": "Mời nhập giá của ghế!",
        "number.min": "Giá ghế tối thiểu {#limit} VND",
        "any.required": "Giá vé là bắt buộc!",
    }),
    promotion_price: Joi.number().required().min(50000).messages({
        "number.base": "Giá ưu đãi không hợp lệ!",
        "number.empty": "Giá ưu đãi không được để trống!",
        "any.required": "Giá ưu đãi là bắt buộc!",
        "number.min": "Giá không nhỏ hơn 50.000đ",
    })
}).unknown(true)