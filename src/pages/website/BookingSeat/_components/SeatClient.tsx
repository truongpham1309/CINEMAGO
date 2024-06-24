import Seat01 from './../_image/seat01.png';
import Seat01_Free from './../_image/seat01-free.png';
import Seat01_Booked from './../_image/seat01-booked.png';
import Seat02 from './../_image/seat02.png';
import Seat02_Free from './../_image/seat02-free.png';
import Seat02_Booked from './../_image/seat02-booked.png';

type SeatProps = {
    seatType: string;
    id: number;
    seatNumber: string;
    price: number;
    booked?: [];
    status: 'Available' | 'Held' | 'Selected' | 'Reserved';
    handleClick: ({ id, price, type, seatNumber }: any) => void;
}

const SeatClient = ({ seatNumber, seatType, price, status, id, handleClick, booked }: SeatProps) => {
    const handleChooseSeatBooking = () => {
        handleClick({ id, price, seatNumber, type:seatType });
    }

    if (seatType.includes("thường") || seatType.includes("VIP")) {
        let checkSeat = booked?.find(_s => _s === id)
        const image = status === 'Available' ? Seat01_Free : (status === 'Selected' ? Seat01 : Seat01_Booked);
        return (
            <li className={status === 'Available' ? "single-seat seat-free-two" : "single-seat"} onClick={status === "Available" ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat ? Seat01_Booked : image} alt="seat" />
                {status === "Available" ? <span className="sit-num">{seatNumber}</span> : null}
            </li>
        )
    }

    if (seatType.includes('đôi')) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat02_Free : (status === 'Selected' ? Seat02 : Seat02_Booked)
        return (
            <li className="single-seat" onClick={status === "Available" ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat ? Seat02_Booked : image} alt="seat" />
                {status === "Available" ? <span className="sit-num">{seatNumber}</span> : null}
            </li>
        )
    }

    return null;
}

export default SeatClient