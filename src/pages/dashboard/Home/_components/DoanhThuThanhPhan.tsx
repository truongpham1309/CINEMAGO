
import { useState } from 'react';
import Chart from 'react-apexcharts';
const DoanhThuThanhPhan = ({ url }: any) => {
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
    <div className="card-body mx-auto">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={"600"}
      />
    </div>
  )
}

export default DoanhThuThanhPhan