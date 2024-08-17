import { toast } from "react-toastify";

export const validateSeatSelection = (seats: any[], selectedSeatIds: any[]) => {
    let selectedSeats: any = [];
    for (let row of seats) {
        if (row.length === 0) continue;
        selectedSeats = selectedSeats.concat(row.filter((seat: any) => selectedSeatIds.includes(seat.id)));
    }
    let seatType = selectedSeats.length > 0 ? selectedSeats[0].type : null;
    for (let seat of selectedSeats) {
        if (seat.type !== seatType) {
            toast.error(`Bạn chỉ được chọn 1 loại ghế trong 1 lần đặt!`, {
                position: "top-center",
            });
            return false;
        }
    }

    for (let row of seats) {
        if (row.length === 0) continue;

        let selectedSeats = row.filter((seat: any) => selectedSeatIds.includes(seat.id));
        if (selectedSeats.length === 0) continue;

        let firstSelectedIndex = row.findIndex((seat: any) => selectedSeatIds.includes(seat.id));
        let lastSelectedIndex = row.length - 1 - row.slice().reverse().findIndex((seat: any) => selectedSeatIds.includes(seat.id));

        // Kiểm tra ghế trống giữa các ghế đã chọn
        let gap = 0;
        for (let i = firstSelectedIndex; i <= lastSelectedIndex; i++) {
            if (!selectedSeatIds.includes(row[i].id) && !['Selected', 'Held'].includes(row[i].status)) {
                gap++;
                if (gap === 1 && (i === lastSelectedIndex || selectedSeatIds.includes(row[i + 1].id)) && row[i].status === "Available") {
                    toast.error(`Không được để trống ghế ${row[i].seat_number}`, {
                        position: "top-center",
                    });
                    return false;
                }
            } else {
                gap = 0;
            }
        }

        // Kiểm tra ghế trống ở đầu hàng
        if (firstSelectedIndex === 1 && row[0].status === "Available") {
            toast.error(`Không được để trống ghế ${row[0].seat_number}`, {
                position: "top-center",
            });
            return false; // Ghế không hợp lệ
        }

        // Kiểm tra ghế trống ở cuối hàng
        if (lastSelectedIndex === row.length - 2 && row[row.length - 1].status === "Available") {
            toast.error(`Không được để trống ghế ${row[row.length - 1].seat_number}`, {
                position: "top-center",
            });
            return false; // Ghế không hợp lệ
        }

        // Kiểm tra nếu ghế trước ghế đã chọn có trạng thái "Available" nhưng bị bỏ trống
        for (let i = 1; i < row.length; i++) {
            if (selectedSeatIds.includes(row[i].id)) {
                if (row[i - 1].status === "Available" && !selectedSeatIds.includes(row[i - 1].id) && row[i - 1].status !== "Reserved") {
                    toast.error(`Không được để trống ghế ${row[i - 1].seat_number}`, {
                        position: "top-center",
                    });
                    return false;
                }
            }
        }
    }
    return true;
}
