import Joi from "joi";


export const CinemaSchema = Joi.object({
    name: Joi.string().required().min(5).max(50).messages({
        "string.empty": "Tên rạp phim không được để trống!",
        "string.min": "Tên rạp phim ít nhất {#limit} kí tự!",
        "any.required": "Tên rạp phim là bắt buộc!",
        "string.max": "Tên rạp phim không quá {#limit} kí tự!",
    }),
    city: Joi.string().required().min(3).max(100).messages({
        "string.empty": "Mời nhập tên thành phố!",
        "any.required": "Tên thành phố là bắt buộc!",
        "string.min": "Tên thành phố ít nhất {#limit} kí tự!",
        "string.max": "Tên thành phố không quá {#limit} kí tự!",
    })
})