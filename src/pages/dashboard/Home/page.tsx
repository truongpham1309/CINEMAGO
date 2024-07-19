import { useState } from "react";
import Chart from 'react-apexcharts';

const DashBoardHomePage = () => {
  const [options, setOptions] = useState({
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2004, 2005, 2006]
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'Doanh số',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 80, 60, 90]
    }
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="col-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu theo rạp</h6>
            </div>
            <div className="card-body">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"650"}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu theo phim</h6>
            </div>
            <div className="card-body">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"650"}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu theo dịch vụ</h6>
            </div>
            <div className="card-body">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"650"}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu vé</h6>
            </div>
            <div className="card-body">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"650"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHomePage