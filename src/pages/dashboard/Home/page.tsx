import { useState } from "react";
import DoanhThuThanhPhan from "./_components/DoanhThuThanhPhan";
import DoanhThuTong from "./_components/DoanhThuTong";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const DashBoardHomePage = () => {
  const [typeChart, setTypeChart] = useState<"CINEMAS" | "MOVIES" | "SERVICES">('MOVIES');
  return (
    <div className="app">
      <div className="row mt-0 align-items-stretch">
        <DoanhThuTong />
        <div className="col-sm-12 col-lg-7">
          <div className="card shadow h-100">
            <div className="card-header d-flex justify-content-between align-items-center py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">{typeChart === 'MOVIES' ? "Doanh thu phim" : (typeChart === 'CINEMAS' ? "Doanh thu rạp" : "Doanh thu dịch vụ")}</h6>
              <Select
                style={{ width: 200 }}
                onChange={(value) => setTypeChart(value)}
                value={typeChart}
              >
                <Option value={"MOVIES"}>Phim</Option>
                <Option value={"CINEMAS"}>Rạp</Option>
                <Option value={"SERVICES"}>Dịch vụ</Option>
              </Select>
            </div>
            <DoanhThuThanhPhan url={typeChart === 'MOVIES' ? "dashboard/statistic/cinema-revenue-films" : (typeChart === 'CINEMAS' ? "dashboard/statistic/cinema-revenue-films" : "dashboard/statistic/cinema-revenue-films")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHomePage