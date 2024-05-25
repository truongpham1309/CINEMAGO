import Joi from "joi";

export const RoomsCinemaSchema = Joi.object({
    cinema_id: Joi.number().required().min(1).messages({
        "number.base": "Rạp chiếu không hợp lệ!",
        "any.required": "Rạp chiếu không hợp lệ!",
        "number.min": "Rạp chiếu không tồn tại!",
    }),
    screen_id: Joi.number().required().min(1).messages({
        "number.base": "Màn hình không hợp lệ!",
        "number.min": "Màn hình không tồn tại!",
        "any.required": "Màn hình không hợp lệ!",
    })
}).unknown(true);