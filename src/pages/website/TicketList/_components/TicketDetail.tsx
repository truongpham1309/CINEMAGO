import { formatCurrencyVND } from '@/common/libs/fomatMoneyVND'
import { formatDate } from '@/common/libs/formatDateToString'
import { getDetailTicketByIDOfUser } from '@/services/ticket/ticketService'
import { useEffect, useState } from 'react'

const TicketDetail = ({ idTicket }: any) => {
    const [booking, setBooking] = useState<any>(null);
    useEffect(() => {
        (async () => {
            const data = await getDetailTicketByIDOfUser(idTicket);
            setBooking(data.data);
        })()
    }, [idTicket])
    if (booking === null || idTicket === null) return null
    return (
        <>
            <div className="booking-summery bg-one">
                <h6 className="subtitle text-center text-uppercase">{booking?.booking?.movie}</h6>
                <ul>
                    <li>
                        <span className="info">{booking?.booking?.cinema} - {booking?.booking?.screen}</span>
                    </li>
                    <li>
                        <h6 className="subtitle">
                            <span>{booking?.booking?.city || "Cinema GO"}</span>
                            <span>{booking?.booking?.quantity}</span>
                        </h6>
                        <div className="info">
                            <span>{formatDate(booking?.booking?.show_date)}, {booking?.booking?.show_time.substring(0, 5)}</span> <span>Ghế</span>
                        </div>
                    </li>
                    <li>
                        <div className='info'>
                            <span>
                                {booking?.seats[0]?.seat_type} - {booking?.seats?.map((_s: any) => _s?.seat_number).join(', ')}
                            </span>
                        </div>
                    </li>
                    <li>
                        <h6 className="subtitle mb-0">
                            <span>Giá ghế</span>
                            <span>{formatCurrencyVND(booking?.ticket?.subtotal) || 0}</span>
                        </h6>
                    </li>
                </ul>
                <ul className="side-shape">
                    {booking?.services.map((_s: any, index: number) => (
                        <li key={index}>
                            <h6 className="subtitle">
                                <span>{_s.name}</span>
                            </h6>
                            <div className="info">
                                <span>Số lượng</span>
                                <span>{_s?.quantity}</span>
                            </div>
                            <div className="info">
                                <span>Giá</span>
                                <span>{formatCurrencyVND(_s?.subtotal.slice(0, -3))}</span>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="proceed-area text-center">
                <h6 className="subtitle">
                    <span>Tổng giá vé</span>
                    <span>{formatCurrencyVND(booking?.booking?.subtotal?.slice(0, -3)) || 0}</span>
                </h6>
                <div className='bg-white px-3'>
                    <img className='w-100' src={booking?.booking?.code} alt="" />
                </div>
            </div>
        </>
    )
}

export default TicketDetail