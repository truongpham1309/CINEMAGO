import Joi from "joi";

export const MovieSchema = Joi.object({
    title: Joi.string().required().max(255).messages({
        "string.empty": "Tên phim không được để trống!",
        "string.required": "Tên phim là bắt buộc!",
        "string.max": "Tên phim không được quá {#limit} kí tự!"
    }),
    actor: Joi.string().required().max(255).messages({
        "string.required": "Tên diễn viên là bắt buộc",
        "string.empty": "Tên diễn viên không được để trống",
        "string.max": "Tên diễn viên không quá {#limit} kí tự",
    }),
    genre: Joi.string().required().max(50).messages({
        "string.empty": "Thể loại không được để trống",
        "string.required": "Thể loại là bắt buộc",
        "string.max": "Không được quá {#limit} kí tự", 
    }),
    director: Joi.string().required().max(50).messages({
        "string.required": "Đạo diễn là bắt buộc!",
        "string.empty": "Tên đạo diễn không được để trống",
        "string.max": "Tên đạo diễn không được quá {#limit} kí tự",
    }),
    duration: Joi.number().required().min(10).messages({
        "number.required": "Thới lượng phim là bắt buộc!",
        "number.empty": "Thời lượng không được để trống",
        "number.base": "Thời lượng phải là số!",
        "number.min": "Thời lượng không nhỏ hơn {#limit} phút!",
    }),
    release_date: Joi.date().required().min("now").messages({
        "date.base": 'Ngày khởi chiếu không hợp lệ!',
        "date.required": "Ngày khởi chiếu là bắt buộc!",
        "data.max": "Ngày khởi chiếu phải bắt đầu từ hôm nay!",
        "date.empty": "Ngày khởi chiếu không được để trống",
    }),
    end_date: Joi.date().required().greater(Joi.ref('release_date')).messages({
        "date.base": 'Ngày kết thúc không hợp lệ!',
        "date.required": "Ngày kết thúc là bắt buộc!",
        "date.greater": "Ngày kết thúc phải lớn hơn ngày khởi chiếu!",
        "date.empty": "Ngày kết thúc không được để trống",
    }),
    status: Joi.string().required().max(50).messages({
        "any.required": "Trạng thái phim là bắt buộc",
        "string.empty": "Trạng thái không được để trống!",
    }),
    trailer: Joi.string().required().max(255).uri().messages({
        "any.required": "Trailer phim là bắt buộc!",
        "string.empty": "Trailer phim không được để trống!",
        "string.max": "Trailer phim không lớn hơn {#limit} kí tự!",
        "string.uri": "Trailer phải là dạng URL!"
    }),
    image: Joi.object().required().messages({
        "string.base": "Ảnh không hợp lệ!",
        "string.empty": "Ảnh không được để trống!",
        "string.required": "Ảnh Phim là bắt buộc!"
    }),
    rated: Joi.string().required().messages({
        "any.required": "Độ tuổi là bắt buộc!",
        "string.empty": "Mời chọn độ tuổi!",
        "string.base": "Độ tuổi không hợp lệ!",
    }),
    description: Joi.optional(),
});


export const MovieSchemaUpdate = Joi.object({
    title: Joi.string().required().max(255).messages({
        "string.empty": "Tên phim không được để trống!",
        "string.required": "Tên phim là bắt buộc!",
        "string.max": "Tên phim không được quá {#limit} kí tự!"
    }),
    actor: Joi.string().required().max(255).messages({
        "string.required": "Tên diễn viên là bắt buộc",
        "string.empty": "Tên diễn viên không được để trống",
        "string.max": "Tên diễn viên không quá {#limit} kí tự",
    }),
    genre: Joi.string().required().max(50).messages({
        "string.empty": "Thể loại không được để trống",
        "string.required": "Thể loại là bắt buộc",
        "string.max": "Không được quá {#limit} kí tự", 
    }),
    director: Joi.string().required().max(50).messages({
        "string.required": "Đạo diễn là bắt buộc!",
        "string.empty": "Tên đạo diễn không được để trống",
        "string.max": "Tên đạo diễn không được quá {#limit} kí tự",
    }),
    duration: Joi.number().required().min(10).messages({
        "number.required": "Thới lượng phim là bắt buộc!",
        "number.empty": "Thời lượng không được để trống",
        "number.base": "Thời lượng phải là số!",
        "number.min": "Thời lượng không nhỏ hơn {#limit} phút!",
    }),
    release_date: Joi.date().required().messages({
        "date.base": 'Ngày khởi chiếu không hợp lệ!',
        "date.required": "Ngày khởi chiếu là bắt buộc!",
        "date.empty": "Ngày khởi chiếu không được để trống",
    }),
    status: Joi.string().required().max(50).messages({
        "any.required": "Trạng thái phim là bắt buộc",
        "string.empty": "Trạng thái không được để trống!",
    }),
    trailer: Joi.string().required().uri().max(255).messages({
        "any.required": "Trailer phim là bắt buộc!",
        "string.empty": "Trailer phim không được để trống!",
        "string.max": "Trailer phim không lớn hơn {#limit} kí tự!",
        "string.base": "Trailer phải là dạng URL!"
    }),
    image: Joi.optional(),
    rated: Joi.string().required().messages({
        "any.required": "Độ tuổi là bắt buộc!",
        "string.empty": "Mời chọn độ tuổi!",
        "string.base": "Độ tuổi không hợp lệ!",
    }),
    description: Joi.optional(),
}).unknown(true);