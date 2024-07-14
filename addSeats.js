import axios from 'axios';
const seatMap = "NNNNNNNNNN|NNNNNNNNNN|NNNNNNNNNN|NNNNNNNNNN|VVVVVVVVVV|VVVVVVVVVV|VVVVVVVVVV|VVVVVVVVVV|CCCCCCCCCC";
const row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];
let count = 0;
const CINEMA_SCREEN_ID = 7
const seatType = {
    nomal: 7,
    vip: 8,
    copple: 9
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
                await axios.post("http://localhost:8000/api/dashboard/seat/create", seat);
            });
            count++;
        }
    })
};

createSeat(seatMap);