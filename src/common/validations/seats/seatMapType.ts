import Joi from "joi";

const validateSeatLayout = (value: any, helpers: any) => {
    const { total_row, total_column, seat_total } = helpers.state.ancestors[0];
    const rows = value.split('|');

    if (rows.length !== total_row) {
        return helpers.error("seat_layout.invalidRowCount", { rowCount: rows.length });
    }

    const seatPattern = /^(N|V|C|X)+$/;
    let totalSeats = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const seats = row.split('');
        if (seats.length !== total_column) {
            return helpers.error("seat_layout.invalidColumnCount", { rowIndex: i + 1, columnCount: seats.length });
        }
        if (!seatPattern.test(row)) {
            return helpers.error("seat_layout.invalidSeatFormat", { rowIndex: i + 1, row });
        }

        const uniqueSeats = new Set(seats.filter((seat:any) => seat !== 'X'));
        if (uniqueSeats.size > 1) {
            return helpers.error("seat_layout.multipleSeatTypes", { rowIndex: i + 1, row });
        }

        totalSeats += seats.filter((seat:any) => seat !== 'X').length;
    }

    if (totalSeats !== seat_total) {
        return helpers.error("seat_layout.invalidSeatTotal", { totalSeats, seat_total });
    }

    return value;
};

export const SeatMapSchema = Joi.object({
    cinema_screen_id: Joi.number().required().min(1).messages({
        "number.min": "Phòng chiếu không hợp lệ!",
        "number.base": "Phòng chiếu không hợp lệ!",
        "any.required": "Mời chọn phòng chiếu!",
    }),
    total_row: Joi.number().required().min(2).messages({
        "number.min": "Số hàng phải lớn hơn hoặc bằng {#limit}!",
        "number.base": "Dữ liệu này phải là số!",
        "any.required": "Số hàng là bắt buộc!",
    }),
    total_column: Joi.number().required().min(2).messages({
        "number.min": "Số ghế trên 1 hàng phải lớn hơn hoặc bằng {#limit}!",
        "number.base": "Dữ liệu này phải là số!",
        "any.required": "Số ghế trên 1 hàng là bắt buộc!",
    }),
    seat_total: Joi.number().required().min(4).custom((value, helpers) => {
        const { total_row, total_column } = helpers.state.ancestors[0];
        const maxSeats = total_row * total_column;
        if (value > maxSeats) {
            return helpers.error("seat_total.max", { limit: maxSeats });
        }
        return value;
    }).messages({
        "number.min": "Tổng số ghế phải lớn hơn hoặc bằng {#limit}!",
        "number.base": "Dữ liệu này phải là số!",
        "any.required": "Tổng số ghế là bắt buộc!",
        "seat_total.max": "Tổng số ghế không được lớn hơn {#limit}!",
    }),
    layout: Joi.string().required().custom(validateSeatLayout).messages({
        "any.required": "Bố trí ghế là bắt buộc!",
        "string.empty": "Mời nhập bối trí ghế của phòng chiếu!",
        "seat_layout.invalidRowCount": "Số hàng ghế thực tế ({#rowCount}) không khớp với số hàng đã chỉ định!",
        "seat_layout.invalidColumnCount": "Số ghế thực tế trên hàng {#rowIndex} ({#columnCount}) không khớp với số ghế đã chỉ định!",
        "seat_layout.invalidSeatFormat": "Định dạng ghế không hợp lệ trong hàng {#rowIndex}: {#row}!",
        "seat_layout.multipleSeatTypes": "Hàng {#rowIndex} chứa nhiều hơn một loại ghế: {#row}!",
        "seat_layout.invalidSeatTotal": "Tổng số ghế thực tế ({#totalSeats}) không khớp với tổng số ghế đã chỉ định ({#seat_total})!",
    })
}).unknown(true);
