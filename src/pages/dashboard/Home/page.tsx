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

  const options2 = {
    chart: {
      type: 'donut' as 'donut',
    },
    labels: ['Rạp 1', 'Rạp 2', 'Rạp 3', 'Rạp 4'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 700
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series2 = [44, 55, 41, 17];

  return (
    <div className="app">
      <div className="row mt-0 align-items-stretch">
        <div className="col-sm-12 col-lg-6 mt-5">
          <div className="card shadow h-100 mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu Cinema-Go</h6>
            </div>
            <div className="card-body mx-auto">
              <Chart options={options2} series={series2} type="donut" width="500" />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 mt-5">
          <div className="card shadow h-100 mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu theo phim</h6>
            </div>
            <div className="card-body mx-auto">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"500"}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 mt-5">
          <div className="card shadow h-100 mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu dịch vụ</h6>
            </div>
            <div className="card-body mx-auto">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"500"}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 mt-5">
          <div className="card shadow h-100 mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu vé</h6>
            </div>
            <div className="card-body mx-auto">
              <Chart
                options={options}
                series={series}
                type="bar"
                width={"500"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHomePage