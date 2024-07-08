import { toast } from "react-toastify";

export const validateSeatSelection = (seats: any[], selectedSeatIds: any[]) => {
    // Validate seat type consistency
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

        let gap = 0;
        for (let i = firstSelectedIndex; i <= lastSelectedIndex; i++) {
            if (!selectedSeatIds.includes(row[i].id) && row[i].status !== 'Unavailable') {
                gap++;
                if (gap === 1 && (i === lastSelectedIndex || selectedSeatIds.includes(row[i + 1].id))) {
                    toast.error(`Không được để trống ghế ${row[i].seat_number}`, {
                        position: "top-center",
                    });
                    return false;
                }
            } else {
                gap = 0;
            }
        }

        // // Check gap between selected seats
        // if (selectedSeatIds.length > 1) {
        //     for (let i = 0; i < selectedSeatIds.length - 1; i++) {
        //         const currentSeat = row.find((seat:any) => seat.id === selectedSeatIds[i]);
        //         const nextSeat = row.find((seat: any) => seat.id === selectedSeatIds[i + 1]);

        //         if (currentSeat && nextSeat) {
        //             let currentIndex = row.findIndex((seat: any) => seat.id === currentSeat.id);
        //             let nextIndex = row.findIndex((seat: any) => seat.id === nextSeat.id);

        //             if (nextIndex - currentIndex !== 1) {
        //                 toast.error(`Không được để trống ghế giữa ${currentSeat.seat_number} và ${nextSeat.seat_number}`, {
        //                     position: "top-center",
        //                 });
        //                 return false;
        //             }
        //         }
        //     }
        // }

        // Check empty seats at the beginning of the row
        if (firstSelectedIndex > 0) {
            let emptySeatsBeforeFirstSelected = row.slice(0, firstSelectedIndex).filter((seat: any) => seat.status !== 'Unavailable');
            if (emptySeatsBeforeFirstSelected.length > 0) {
                toast.error(`Không được để trống ghế ${row[firstSelectedIndex - 1].seat_number}`, {
                    position: "top-center",
                });
                return false;
            }
        }

        // Check empty seats at the end of the row
        if (lastSelectedIndex < row.length - 1) {
            let emptySeatsAfterLastSelected = row.slice(lastSelectedIndex + 1).filter((seat: any) => seat.status !== 'Unavailable');
            if (emptySeatsAfterLastSelected.length > 0) {
                toast.error(`Không được để trống ghế ${row[lastSelectedIndex + 1].seat_number}`, {
                    position: "top-center",
                });
                return false;
            }
        }
    }

    return true;
}