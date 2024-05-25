import Joi from "joi";

export const ScreenSchema = Joi.object({
    name: Joi.string().required().max(20).messages({
        "string.empty": "Mời nhập tên màn hình chiếu!",
        "any.required": "Tên màn hình không được để trống!",
        "string.max": "Tên màn hình không quá {#limit} kí tự!",
    }),
}).unknown(true);