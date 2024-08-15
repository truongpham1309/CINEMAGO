import axios from 'axios';
const seatMap = "NNNNNNNNNN|NNNNNNNNNN|VVVVVVVVVV|XXXXXXXXXX|CCCCCCCCCC";
const row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"];
let count = 0;
const CINEMA_SCREEN_ID = 9
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
                await axios.post("http://localhost:8000/api/dashboard/seat/create", seat);
            });
            count++;
        }
    })
};

createSeat(seatMap);


const chunkArray = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
        if (i % size === 0) {
            chunks.push([el]);
        } else {
            chunks[chunks.length - 1].push(el);
        }
        return chunks;
    }, []);
}

const seats = [
    {
        id: 456,
        seat_number: "I1",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 457,
        seat_number: "I2",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 458,
        seat_number: "I3",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 459,
        seat_number: "I4",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 460,
        seat_number: "I5",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 461,
        seat_number: "I6",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 462,
        seat_number: "I7",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 463,
        seat_number: "I8",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 464,
        seat_number: "I9",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 465,
        seat_number: "I10",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 466,
        seat_number: "I11",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    },
    {
        id: 467,
        seat_number: "I12",
        type: "Ghế đôi - 2D",
        price: "110000.00",
        status: "Available"
    }
];

const newSeat = chunkArray(seats, 2);
console.log(newSeat)