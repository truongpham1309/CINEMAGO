import { InfoCircleFilled } from '@ant-design/icons';
import { Table, TableProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBookingQuery } from '../_hooks/useBooking';
import LoadingComponent from '@/components/ui/LoadingComponent';
import ServerError from '../../_components/500';

interface Booking {
  id: number;
  user: string;
  movie: string;
  cinema: string;
  show_time: string;
  quantity: number;
  show_date: string;
  status: string;
  ticket_code: string;
}

const BookingDashBoardPage = () => {
  const [searchText, setSearchText] = useState('');

  const columns: TableProps<Booking>['columns'] = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => index + 1
    },
    {
      title: "Người đặt",
      key: "user",
      dataIndex: "user",
    },
    {
      title: "Tên phim",
      key: "movie",
      dataIndex: "movie",
    },
    // {
    //   title: "Tên rạp",
    //   key: "cinema",
    //   dataIndex: "cinema",
    // },
    // {
    //   title: "Suất chiếu",
    //   key: "show_time",
    //   dataIndex: "show_time",
    // },
    {
      title: "Ngày đặt vé",
      key: "show_date",
      dataIndex: "show_date",
    },
    {
      title: "Trạng thái thanh toán",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Chi tiết",
      align: "center",
      key: "detail",
      render: (record) => <Link to={`/dashboard/booking/detail/${record.id}`}><InfoCircleFilled /></Link> 
    }
  ];

  const { data, isLoading, isError } = useBookingQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data?.data?.bookings.filter((booking: Booking) =>
    booking.ticket_code?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ServerError />;

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách Booking</h6>
      </div>
      <div className="card-body">
        <Input
          placeholder="Tìm kiếm mã vé"
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={filteredData}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default BookingDashBoardPage;
