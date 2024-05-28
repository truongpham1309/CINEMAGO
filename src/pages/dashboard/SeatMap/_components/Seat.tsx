import { Button } from "antd";

type Props = {
    type: "N" | "V" | "C",
    seat_number?: number;
}

const Seat = ({ type, seat_number}: Props) => {
    if (type === "N") return <><Button size="middle" title="Ghế Thường" className="mx-2 seat_admin px-2 py-0 btn-secondary">{seat_number ||  ""}</Button></>
    if (type === "V") return <><Button size="middle" title="Ghế VIP" className="mx-2 seat_admin px-2 py-0 btn-primary">{seat_number}</Button></>
    if (type === "C") return <><Button size="middle" title="Ghế Đôi" className="mx-2 seat_admin px-2 py-0 btn-success">{seat_number}</Button></>

    return <Button disabled size="middle" title="Ghế không được sử dụng" className="mx-2 seat_admin px-2 py-0 hidden_visible btn-secondary">X</Button>

}

export default Seat