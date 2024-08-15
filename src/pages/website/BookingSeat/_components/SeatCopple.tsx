import Seat02 from "./../_image/seat02.png";
import Seat02Free from "./../_image/seat02-free.png";
import Seat02_Booked from "./../_image/seat02-booked.png";
import Seat02_Held from "./../_image/seat02_held.png";

const SeatCopple = ({ seat, handleClick, booked }: any) => {
    const handleChooseSeatBooking = () => {
        console.log("đã chọn ghế")
        handleClick({ id: seat[0]?.id, price: seat[0]?.price, seatNumber: seat[0]?.seat_number, type: seat[0]?.type, status: seat[0]?.status });
        handleClick({ id: seat[1]?.id, price: 0, seatNumber: seat[1]?.seat_number, type: seat[1]?.type, status: seat[1]?.status });
    }
    console.log(seat);

    let checkSeat = booked?.find((_s: any) => _s === seat[0]?.id || _s === seat[1]?.id);
    const image = seat[0]?.status === 'Available' ? Seat02Free : (seat[0]?.status === 'Reserved' ? Seat02 : Seat02_Held);
    return (
        <li className="single-seat seat-free-two seat-copple" onClick={seat[0]?.status === "Available" || checkSeat || seat[0]?.status === "Selected" ? handleChooseSeatBooking : () => null}>
            <img src={checkSeat || seat[0]?.status === "Selected" ? Seat02_Booked : image} alt="seat" />
            {seat[0]?.status === "Available" || seat[0]?.status === "Selected" ? <span className="sit-num text-nowrap">{seat?.map((_s: any) => _s?.seat_number).join(" ")}</span> : null}
        </li>
    )
}

export default SeatCopple