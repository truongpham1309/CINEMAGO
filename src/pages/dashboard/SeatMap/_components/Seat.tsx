import { Button } from "antd";

type Props = {
    type: "N" | "V" | "C",
    seat_number?: string;
}

const Seat = ({ type, seat_number}: Props) => {
    if (type === "N") return <><Button size="middle" title={`Ghế Thường ${seat_number || ""}`} className="mx-2 seat_admin px-2 py-0 btn-secondary d-flex justify-content-center">{seat_number ||  ""}</Button></>
    if (type === "V") return <><Button size="middle" title={`Ghế VIP ${seat_number || ""}`} className="mx-2 seat_admin px-2 py-0 btn-primary d-flex justify-content-center">{seat_number}</Button></>
    if (type === "C") return <><Button size="middle" title={`Ghế Đôi ${seat_number || ""}`} className="mx-2 seat_admin px-2 py-0 btn-success d-flex justify-content-center">{seat_number}</Button></>

    return <Button disabled size="middle" title="Ghế không được sử dụng" className="mx-2 seat_admin px-2 py-0 hidden_visible btn-secondary">X</Button>

}

export default Seat