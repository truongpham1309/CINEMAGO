import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { formatDate, formatDateString } from "@/common/libs/formatDateToString";
import { getAllTicketByUser } from "@/services/ticket/ticketService";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Empty, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import TicketDetail from "./_components/TicketDetail";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [idBooking, setIdBooking] = useState(null);
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Phim',
      dataIndex: 'movie',
      key: 'movieName',
    },
    {
      title: 'Ngày',
      key: 'showDate',
      render: (record) => (
        formatDateString(record?.show_date)
      )
    },
    {
      title: 'Giờ',
      key: 'showTime',
      dataIndex: 'show_time',
      render: (record) => {
        return record.slice(0, -3);
      }
    },
    {
      title: 'Rạp',
      className: "text-truncate",
      key: 'cinemaName',
      align: "center",
      dataIndex: "cinema"
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'subtotal',
      className: "text-truncate",
      key: 'totalPrice',
      render: (price) => `${formatCurrencyVND(price.slice(0, -3))}`
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button icon={<InfoCircleFilled />} onClick={() => handleShowTicketDetail(record.id)} type="primary">
        </Button>
      ),
    },
  ];
  const handleShowTicketDetail = (id: any) => {
    setIdBooking(id);
  }

  useEffect(() => {
    (async () => {
      const ticket = await getAllTicketByUser();
      setTickets(ticket.data.bookings)
    })()
  }, []);
  return (
    <>
      <section className="py-5">
      </section>
      <div className="movie-facility padding-bottom padding-top">
        <div className="container">
          <div className="row">
            <div className="col-8 text-center">
              <h4 className="title text-uppercase mb-4">Lịch sử</h4>
            </div>
            <div className="col-md-12 col-lg-8">
              {tickets?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: "#fff" }}>
                  <Empty description={<span className="text-white text-uppercase text-xl">Bạn chưa có vé nào!</span>} />
                </div>
              ) : <Table
                columns={columns}
                dataSource={tickets}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 5 }}
              />}
            </div>
            <div className="col-md-12 col-lg-4">
              <TicketDetail idTicket={idBooking} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketsPage