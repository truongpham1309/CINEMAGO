import { useState } from 'react';
import '@styles/test.css'
import CountDown from './_components/CountDown';
const MAX_SEATS = 8;

const SeatSelection = () => {
    const [seatMap, setSeatMap] = useState([
        [
            { id: 1, seat_number: 'A1', type: 'standard', price: 100, status: 'available' },
            { id: 2, seat_number: 'A2', type: 'standard', price: 100, status: 'available' },
            { id: 3, seat_number: 'A3', type: 'standard', price: 100, status: 'available' },
            { id: 4, seat_number: 'A4', type: 'standard', price: 100, status: 'available' }
        ],
        [
            { id: 5, seat_number: 'B1', type: 'standard', price: 100, status: 'available' },
            { id: 6, seat_number: 'B2', type: 'standard', price: 100, status: 'available' },
            { id: 7, seat_number: 'B3', type: 'standard', price: 100, status: 'available' },
            { id: 8, seat_number: 'B4', type: 'standard', price: 100, status: 'available' }
        ],
        [
            { id: 9, seat_number: 'C1', type: 'standard', price: 100, status: 'available' },
            { id: 10, seat_number: 'C2', type: 'standard', price: 100, status: 'available' },
            { id: 11, seat_number: 'C3', type: 'standard', price: 100, status: 'available' },
            { id: 12, seat_number: 'C4', type: 'standard', price: 100, status: 'available' }
        ]
    ]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const findSeatById = (seatId) => {
        for (let row of seatMap) {
            for (let seat of row) {
                if (seat.id === seatId) {
                    return seat;
                }
            }
        }
        return null;
    };

    const updateSeatStatus = (seatId, status) => {
        const newSeatMap = seatMap.map(row =>
            row.map(seat =>
                seat.id === seatId ? { ...seat, status: status } : seat
            )
        );
        setSeatMap(newSeatMap);
    };

    const checkNoEmptySeatInMiddle = (selectedSeats, seatMap) => {
        for (let row of seatMap) {
            for (let i = 0; i < row.length; i++) {
                if (row[i].status === 'selected') {
                    if ((i > 0 && row[i - 1].status === 'selected') || (i < row.length - 1 && row[i + 1].status === 'selected')) {
                        if (i > 0 && i < row.length - 1 && row[i - 1].status === 'selected' && row[i + 1].status === 'selected' && row[i].status !== 'selected') {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    const checkNoEmptySeatAtEnds = (selectedSeats, seatMap) => {
        for (let row of seatMap) {
            if (row[0].status === 'empty' && row[1].status === 'selected') {
                return false;
            }
            if (row[row.length - 1].status === 'empty' && row[row.length - 2].status === 'selected') {
                return false;
            }
        }
        return true;
    };

    const checkMaxSeats = (selectedSeats) => {
        return selectedSeats.length <= MAX_SEATS;
    };

    const checkSingleSeatType = (selectedSeats) => {
        const seatType = selectedSeats[0]?.type;
        return selectedSeats.every(seat => seat.type === seatType);
    };

    const handleSeatClick = (seatId) => {
        const seat = findSeatById(seatId);
        let newSelectedSeats = [];
        if (seat.status !== 'available') {
            updateSeatStatus(seatId, 'available');
            newSelectedSeats = selectedSeats.filter(s => s.id !== seatId);
            setSelectedSeats(newSelectedSeats);
            return;
        }
        else {
            newSelectedSeats = [...selectedSeats, seat];
        }

        if (!checkNoEmptySeatInMiddle(newSelectedSeats, seatMap)) {
            alert('Bạn không thể để lại một ghế trống giữa hai ghế đã chọn.');
            return;
        }

        if (!checkNoEmptySeatAtEnds(newSelectedSeats, seatMap)) {
            alert('Bạn không thể để lại một ghế trống ở đầu dãy.');
            return;
        }

        if (!checkMaxSeats(newSelectedSeats)) {
            alert(`Bạn đã chọn tối đa ${MAX_SEATS} ghế.`);
            return;
        }

        if (!checkSingleSeatType(newSelectedSeats)) {
            alert('Bạn chỉ có thể chọn một loại ghế trong cùng một giao dịch.');
            return;
        }

        // Nếu tất cả các kiểm tra đều qua, cập nhật trạng thái ghế
        
        if(seat?.status === 'available') updateSeatStatus(seatId, 'selected');
        setSelectedSeats(newSelectedSeats);
    };
    return (
        <div className="app">
            <h1>Movie Booking App</h1>
            <CountDown />
            <div className="seat-selection">
                {seatMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat) => (
                            <div
                                key={seat.id}
                                className={`seat ${seat.status}`}
                                onClick={() => handleSeatClick(seat.id)}
                            >
                                {seat.seat_number}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatSelection;