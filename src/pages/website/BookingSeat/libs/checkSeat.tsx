import { toast } from "react-toastify";

export const validateSeatSelection = (seats: any[], selectedSeatIds: any[]) => {
    let selectedSeats: any = [];
    for (let row of seats) {
        if (row.length === 0) continue;
        selectedSeats = selectedSeats.concat(row.filter((seat: any) => selectedSeatIds.includes(seat.id)));
    }

    // Kiểm tra loại ghế
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

        let firstSelectedIndex = row.findIndex((seat: any) => selectedSeatIds.includes(seat.id));
        let lastSelectedIndex = row.length - 1 - row.slice().reverse().findIndex((seat: any) => selectedSeatIds.includes(seat.id));

        if (firstSelectedIndex === -1 || lastSelectedIndex === -1) continue;

        // Kiểm tra các ghế trống giữa các ghế đã chọn
        for (let i = firstSelectedIndex + 1; i < lastSelectedIndex; i++) {
            if (!selectedSeatIds.includes(row[i].id) && row[i].status === "Available") {
                toast.error(`Không được để trống ghế ${row[i].seat_number} giữa các ghế đã chọn`, {
                    position: "top-center",
                });
                return false;
            }
        }

        // Kiểm tra ghế trống ngay trước ghế đã chọn
        if (firstSelectedIndex > 0 && row[firstSelectedIndex - 1].status === "Available" && !selectedSeatIds.includes(row[firstSelectedIndex - 1].id)) {
            if (firstSelectedIndex === 1 || row[firstSelectedIndex - 2].status !== "Available") {
                toast.error(`Không được để trống ghế ${row[firstSelectedIndex - 1].seat_number}`, {
                    position: "top-center",
                });
                return false;
            }
        }

        // Kiểm tra ghế trống ngay sau ghế đã chọn
        if (lastSelectedIndex < row.length - 1 && row[lastSelectedIndex + 1].status === "Available" && !selectedSeatIds.includes(row[lastSelectedIndex + 1].id)) {
            if (lastSelectedIndex === row.length - 2 || row[lastSelectedIndex + 2].status !== "Available") {
                toast.error(`Không được để trống ghế ${row[lastSelectedIndex + 1].seat_number}`, {
                    position: "top-center",
                });
                return false;
            }
        }
    }

    return true;
}
