import LoadingComponent from "@/components/ui/LoadingComponent";
import { FilterFilled, WarningFilled } from "@ant-design/icons";
import { Alert, Button, Col, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import ServerError from "../../_components/500";
import { useSeatQuery } from "../_hooks/useSeat";
const { Option } = Select;


const SeatDashBoardPage = () => {
  const { columnsSeat, isLoading, isError, isPending, data } = useSeatQuery();
  const [seats, setSeats] = useState([]);
  const [filterSeat, setFilterSeat] = useState({ cinema: undefined, seat_type: undefined, status: undefined });
  useEffect(() => {
    if (data) {
      const seats_cinema = filterSeat.cinema ? data.data.seats.filter((_s: any) => _s.cinema === filterSeat.cinema) : data.data.seats;
      const seats_seat_type = filterSeat.seat_type ? seats_cinema.filter((_s: any) => _s.seat_type === filterSeat.seat_type) : seats_cinema;
      const seats_status = filterSeat.status ? seats_seat_type.filter((_s: any) => _s.status === filterSeat.status) : seats_seat_type;
      setSeats(seats_status);
    }
  }, [filterSeat, data]);
  if (isLoading || isPending) return <LoadingComponent />
  if (isError) return <ServerError />
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách ghế</h6>
        </div>
        <div className="card-body">
          <div className="row justify-content-end">
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col>
                <Select
                  placeholder="Chọn phòng chiếu"
                  style={{ width: 200 }}
                  onChange={(value) => setFilterSeat({ ...filterSeat, cinema: value })}
                  allowClear
                >
                  {[...new Set(data.data.seats.map((seat: any) => seat.cinema))].map((_cinema: any, index: number) => (
                    <Option key={(index + 1)} value={_cinema}>{_cinema}</Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Select
                  placeholder="Chọn loại ghế"
                  style={{ width: 200 }}
                  onChange={(value) => setFilterSeat({ ...filterSeat, seat_type: value })}
                  allowClear
                >
                  {[...new Set(data.data.seats.map((seat: any) => seat.seat_type))].map((_seattype: any, index) => (
                    <Option value={_seattype} key={(index + 1) * 2}>{_seattype}</Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Select
                  placeholder="Chọn trạng thái ghế"
                  style={{ width: 200 }}
                  onChange={(value) => setFilterSeat({ ...filterSeat, status: value })}
                  allowClear
                >
                  {[...new Set(data.data.seats.map((seat: any) => seat.status))].map((_status, index) => (
                    <Option value={_status} key={(index + 1) * 3}> {_status === "OCCUPIED" ? "Đang sử dụng" : "Không sử dụng"}</Option>
                  ))}
                </Select>
              </Col>
              <Col>
                <Button type="primary" icon={<FilterFilled />}>
                </Button>
              </Col>
            </Row>
          </div>
          {seats.length === 0 ? <Alert
            message="Không có ghế phù hợp"
            description=""
            icon={<WarningFilled />}
            showIcon
            type="warning"
          /> : (
            <Table columns={columnsSeat} size="small" dataSource={seats} rowKey={record => record.id} />
          )}
        </div>
      </div>
    </>
  )
}

export default SeatDashBoardPage