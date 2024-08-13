import { getTotalRevenueDashBoard } from "@/services/thongke/thongKeService";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DoanhThuPhim = () => {
    const [options, setOptions] = useState({
        chart: {
            id: 'basic-bar',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: [],
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
            marker: {
                show: false
            },
            y: {
                formatter: function (val: any) {
                    return val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            }
        }
    });

    const [series, setSeries] = useState([
        {
            name: 'Doanh số',
            data: []
        }
    ]);

    useEffect(() => {
        (async () => {
            const data = await getTotalRevenueDashBoard('/dashboard/statistic/cinema-revenue-films');
            console.log(data?.data);
            const newOptions = {
                ...options,
                xaxis: {
                    categories: data?.data?.map((item: any) => item.movie_title) || [],
                }
            };

            const newSeries = [
                {
                    name: 'Doanh số',
                    data: data?.data?.map((item: any) => item.ticket_revenue) || [],
                }
            ];

            setOptions(newOptions);
            setSeries(newSeries);
        })();
    }, []);

    return (
        <div className="card-body mx-auto">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                width={"600"}
            />
        </div>
    );
}

export default DoanhThuPhim