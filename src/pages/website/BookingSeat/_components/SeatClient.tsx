import Seat01 from './../_image/seat01.png';
import Seat01_Free from './../_image/seat01-free.png';
import Seat01_Booked from './../_image/seat01-booked.png';
import Seat03 from "./../_image/seat03Held.png";
import Seat03Free from './../_image/seat_vip_free.png';
import Seat02Free from "./../_image/seat02-free.png";
import Seat02_Booked from "./../_image/seat02-booked.png";
import Seat02_Held from "./../_image/seat02_held.png";

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
        const image = status === 'Available' ? Seat03Free : (status === 'Reserved' ? Seat01 : Seat03);
        return (
            <li className={status === 'Available' ? "single-seat seat-free-two" : "single-seat"} onClick={status === "Available" || (checkSeat || status === "Selected") ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat || status === "Selected" ? Seat01_Booked : image} alt="seat" />
                {status === "Available" || status === "Selected" ? <span className="sit-num text-white">{seatNumber}</span> : null}
            </li>
        )
    }

    if (seatType.includes("vip")) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat01_Free : (status === 'Reserved' ? Seat01 : Seat03);
        return (
            <li className={status === 'Available' ? "single-seat seat-free-two" : "single-seat"} onClick={status === "Available" || (checkSeat || status === "Selected") ? handleChooseSeatBooking : () => null}>
                <img src={checkSeat || status === "Selected" ? Seat01_Booked : image} alt="seat" />
                {status === "Available" || status === "Selected" ? <span className="sit-num text-white">{seatNumber}</span> : null}
            </li>
        )
    }

    if (seatType.includes('đôi')) {
        let checkSeat = booked?.find(_s => _s === id);
        const image = status === 'Available' ? Seat02Free : (status === 'Reserved' ? Seat01 : Seat02_Held)
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