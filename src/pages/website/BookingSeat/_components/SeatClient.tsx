import Seat01 from './../_image/seat01.png';
import Seat01_Free from './../_image/seat01-free.png';
import Seat01_Booked from './../_image/seat01-booked.png';
import Seat01Held from "./../_image/1c9bc34a-eed9-4a0e-92c7-17694838cca6.png";
import Seat02 from './../_image/seat02.png';
import Seat02_Free from './../_image/seat02-free.png';
import Seat02_Booked from './../_image/seat02-booked.png';
import Seat02_Held from "./../_image/seat02_held.png"

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
        handleClick({ id, price, seatNumber, type: seatType, status });
    }

    if (seatType.includes("thường")) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat01_Free : (status === 'Reserved' ? Seat01 : Seat01Held);
        return (
            <li className={status === 'Available' ? "single-seat seat-free-two" : "single-seat"} onClick={status === "Available" || checkSeat || status === "Selected" ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat || status === "Selected" ? Seat01_Booked : image} alt="seat" />
                {status === "Available" || status === "Selected" ? <span className="sit-num">{seatNumber}</span> : null}
            </li>
        )
    }

    if (seatType.includes("VIP")) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat01_Free : (status === 'Reserved' ? Seat01 : Seat01Held);
        return (
            <li className={status === 'Available' ? "single-seat seat-free-two" : "single-seat"} onClick={status === "Available" || checkSeat || status === "Selected" ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat || status === "Selected" ? Seat01_Booked : image} alt="seat" />
                {status === "Available" || status === "Selected" ? <span className="sit-num">{seatNumber}</span> : null}
            </li>
        )
    }

    if (seatType.includes('đôi')) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat02_Free : (status === 'Reserved' ? Seat02 : Seat02_Held)
        return (
            <li className="single-seat seat-free-two" onClick={status === "Available" || checkSeat || status === "Selected" ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat || status === "Selected" ? Seat02_Booked : image} alt="seat" />
                {status === "Available" || status === "Selected" ? <span className="sit-num">{seatNumber}</span> : null}
            </li>
        )
    }

    return null;
}

export default SeatClient