import { getTotalRevenueDashBoard } from '@/services/thongke/thongKeService';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const DoanhThuRap = ({ url }: any) => {
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
            const data = await getTotalRevenueDashBoard(url);
            const sortedData = data?.data?.slice().sort((a: any, b: any) => {
                const dateA = new Date(a.month + '-01');
                const dateB = new Date(b.month + '-01');
                return dateA.getTime() - dateB.getTime();
            });

            const newOptions = {
                ...options,
                xaxis: {
                    categories: sortedData?.map((item: any) => item.month) || [],
                }
            };

            const newSeries = [
                {
                    name: 'Doanh số',
                    data: sortedData?.map((item: any) => item.doanh_thu.total_income) || [],
                }
            ];

            setOptions(newOptions);
            setSeries(newSeries);
        })();
    }, [url]);

    return (
        <div className="card-body mx-auto">
            <Chart
                options={options}
                series={series}
                type="bar"
                width={"600"}
            />
        </div>
    );
}

export default DoanhThuRap