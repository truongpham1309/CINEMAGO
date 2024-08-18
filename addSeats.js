import axios from 'axios';
const seatMap = "NNNNNNNNNN|NNNNNNNNNN|VVVVVVVVVV|VVVVVVVVVV|VVVVVVVVVV|CCCCCCCCCC";
const row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];
let count = 0;
const CINEMA_SCREEN_ID = 12
const seatType = {
    nomal: 1,
    vip: 2,
    copple: 3
}
const createSeat = (seatMap) => {
    seatMap.split("|").forEach((_seatmap) => {
        if (_seatmap.split("").includes("N") || _seatmap.split("").includes("V") || _seatmap.split("").includes("C")) {
            _seatmap.split("").forEach(async (_s, i) => {
                let seat = null;
                if (_s === "N") {
                    seat = {
                        seat_number: `${row[count]}${i + 1}`,
                        seat_type_id: seatType.nomal,
                        cinema_screen_id: CINEMA_SCREEN_ID,
                        status: "OCCUPIED"
                    }
                }
                if (_s === "V") {
                    seat = {
                        seat_number: `${row[count]}${i + 1}`,
                        seat_type_id: seatType.vip,
                        cinema_screen_id: CINEMA_SCREEN_ID,
                        status: "OCCUPIED"
                    }
                }
                if (_s === "C") {
                    seat = {
                        seat_number: `${row[count]}${i + 1}`,
                        seat_type_id: seatType.copple,
                        cinema_screen_id: CINEMA_SCREEN_ID,
                        status: "OCCUPIED"
                    }
                }
                if (_s === "X") {
                    seat = {
                        seat_number: `${row[count]}${i}`,
                        seat_type_id: seatType.nomal,
                        cinema_screen_id: CINEMA_SCREEN_ID,
                        status: "UNOCCUPIED"
                    }
                }
                (async function () {
                    setTimeout(async () => {
                        try {
                            await axios.post("http://localhost:8000/api/dashboard/seat/create", seat);
                            console.log("Create seat successful: ", seat?.seat_number);
                        } catch (error) {
                            console.log("Error create seat: ", seat?.seat_number, ", Chi tiết lỗi: ", error?.response?.data?.message)
                        }
                    }, 3000)
                })()
            });
            count++;
        }
    })
};

createSeat(seatMap);


