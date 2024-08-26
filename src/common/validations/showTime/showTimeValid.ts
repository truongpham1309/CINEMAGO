import Joi from "joi";

export const ShowTimeSchema = Joi.object({
    movie_id: Joi.number().required().min(1).messages({
        "number.base": "Phim không hợp lệ!",
        "number.min": "Phim không hợp lệ!",
        "any.required": "Mời bạn chọn phim!",
    }),
    cinema_screen_id: Joi.number().required().min(1).messages({
        "number.base": "Phòng chiếu không hợp lệ!",
        "number.min": "Phòng chiếu không hợp lệ!",
        "any.required": "Mời chọn phòng chiếu!",
    }),
    subtitle: Joi.string().required().min(3).max(50).messages({
        "string.base": "Ngôn ngữ dịch không hợp lệ!",
        "string.min": "Ngôn ngữ dịch tối thiểu {#limit} kí tự!",
        "any.required": "Ngôn ngữ dịch không được để trống!",
        "string.empty": "Mời chọn ngôn ngữ dịch",
    }),
    show_date: Joi.date().required().min("now").messages({
        "date.min": "Ngày chiếu phải từ hôm nay!",
        "date.base": "Ngày chiếu phải là định dạng ngày!",
        "date.empty": "Mời nhập ngày chiếu!",
        "any.required": "Mời nhập ngày chiếu!",
    }),
    show_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        'string.pattern.base': 'Thời gian phải có định dạng HH:mm',
        'any.required': 'Thời gian là bắt buộc',
        'string.empty': "Mời nhập thời gian chiếu!",
    }),
    
}).unknown(true);