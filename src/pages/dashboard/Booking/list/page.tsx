import { InfoCircleFilled } from '@ant-design/icons';
import { Table, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useBookingQuery } from '../_hooks/useBooking';
import LoadingComponent from '@/components/ui/LoadingComponent';
import ServerError from '../../_components/500';

const BookingDashBoardPage = () => {

  const columns: TableProps<any>['columns'] = [
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
      title: "Suất chiếu",
      key: "show_time",
      dataIndex: "show_time",
    },
    {
      title: "Số lượng",
      key: 'quantity',
      dataIndex: "quantity",
    },
    {
      title: "Tổng số tiền",
      key: "subtotal",
      dataIndex: "subtotal",
    },
    {
      title: "Trạng thái",
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
  const {data, isLoading, isError} = useBookingQuery();

  if(isLoading) return <LoadingComponent />
  if(isError) return <ServerError />
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách Booking</h6>
      </div>
      <div className="card-body">
          <Table columns={columns} rowKey={record => record.id} dataSource={data.data.bookings} pagination={false} />
      </div>
    </div>
  );
}

export default BookingDashBoardPage