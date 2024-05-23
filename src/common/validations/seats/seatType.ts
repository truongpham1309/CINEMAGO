import Joi from "joi";

export const SeatTypeSchema = Joi.object({
    name: Joi.string().required().min(1).max(20).messages({
        "string.min": "Loại ghế không ít hơn {#limit} kí tự!",
        "string.max": "Tên loại ghế không quá {#limit} kí tự!",
        "string.required": "Tên loại ghế là bắt buộc!",
        "string.empty": "Tên loại ghế không được để trống!",
    }),
}).unknown(true)