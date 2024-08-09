import { formatCurrencyVND } from "@/common/libs/fomatMoneyVND";
import { formatDate } from "@/common/libs/formatDateToString";
import { Button, Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Tên phim',
      dataIndex: 'movieName',
      key: 'movieName',
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'showDate',
      key: 'showDate',
    },
    {
      title: 'Giờ chiếu',
      dataIndex: 'showTime',
      key: 'showTime',
    },
    {
      title: 'Tên rạp',
      dataIndex: 'cinemaName',
      key: 'cinemaName',
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Link to={`/ticket/${record.id}`}>
          <Button type="primary">
            Xem chi tiết
          </Button>
        </Link>
      ),
    },
  ];
  const ticketsData = [
    {
      id: 1,
      movieName: 'Phim A',
      showDate: '2024-08-15',
      showTime: '19:00',
      cinemaName: 'Rạp X',
      totalPrice: 150000,
    },
    {
      id: 2,
      movieName: 'Phim B',
      showDate: '2024-08-16',
      showTime: '20:00',
      cinemaName: 'Rạp Y',
      totalPrice: 180000,
    },
    // Các vé khác
  ];
  useEffect(() => {
  }, []);
  return (
    <>
      <section className="py-5">
      </section>
      <div className="movie-facility padding-bottom padding-top">
        <div className="container">
          <div className="row">
            <div className="col-8 text-center">
              <h4 className="title text-uppercase mb-4">Vé bạn đã mua</h4>
            </div>
            <div className="col-md-12 col-lg-8">
              <Table
                columns={columns}
                dataSource={ticketsData}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 5 }}
              />
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="booking-summery bg-one">
                <h4 className="title font-bold">Vé của bạn</h4>
                <ul>
                  <li>
                    <h6 className="subtitle">{"Tên phim"}</h6>
                    <span className="info">{'Tên Rạp'} - {"Màn hình chiếu"}</span>
                  </li>
                  <li>
                    <h6 className="subtitle">
                      <span>{'Hà Nội'}</span>
                      <span>{1}</span>
                    </h6>
                    <div className="info">
                      <span>{formatDate("2024-09-13")}, {("14:00:00").slice(-3, 0)}</span> <span>Ghế</span>
                    </div>
                  </li>
                  <li>
                    <h6 className="subtitle mb-0">
                      <span>Giá vé</span>
                      <span>{formatCurrencyVND(100000) || 0}</span>
                    </h6>
                  </li>
                </ul>
                <ul className="side-shape">
                  <li key={1}>
                    <h6 className="subtitle">
                      <span>{"Tên dịch vụ"}</span>
                      <span>{formatCurrencyVND(400000)}</span>
                    </h6>
                    <div className="info">
                      <span>Số lượng</span>
                      <span>{10}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="proceed-area text-center">
                <h6 className="subtitle">
                  <span>Tổng giá vé</span>
                  <span>{formatCurrencyVND(500000) || 0}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketsPage