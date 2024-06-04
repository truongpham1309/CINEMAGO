import Joi from "joi";


export const SeatSchema = Joi.object({
    cinema_screen_id: Joi.number().required().min(1).messages({
        "number.min": "Rạp chiếu không hợp lệ!",
        "any.required": "Mời chọn rạp chiếu!",
        "number.empty": "Mời chọn rạp chiếu!",
    }),
    seat_type_id: Joi.number().required().min(1).messages({
        "number.base": "Loại ghế chiếu không hợp lệ!",
        "number.min": "Loại ghế chiếu không hợp lệ!",
        "any.required": "Mời chọn loại ghế!",
        "number.empty": "Mời chọn loại ghế!",
    }),
    seat_number: Joi.string().required().min(1).messages({
        "string.base": "Số ghế chiếu không hợp lệ!",
        "string.min": "Số ghế chiếu không hợp lệ!",
        "any.required": "Mời nhập số ghế!",
        "string.empty": "Mời nhập số ghế!",
    }),
    status: Joi.string().required().min(3).max(50).messages({
        "string.empty": "Mời chọn trạng thái ghế!",
        "string.min": "Trạng thái không hợp lệ!",
        "string.max": "Trạng thái không hợp lệ!",
        "any.required": "Mời chọn trạng thái!",
    })
}).unknown(true);