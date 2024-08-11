import { getTotalRevenue } from '@/services/thongke/thongKeService';
import { useQuery } from '@tanstack/react-query';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { formatCurrencyVND } from '@/common/libs/fomatMoneyVND';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueItem {
    cinema: string;
    doanh_thu: {
        total_income: number;
    };
}

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
}

const DoanhThuTong = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["THONG_KE"],
        queryFn: async () => {
            const data = await getTotalRevenue();
            return data;
        }
    });

    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E6E6E6'],
            },
        ],
    });

    const [hoveredValue, setHoveredValue] = useState<string | null>(null);

    useEffect(() => {
        if (data?.data) {
            const revenueData = data.data as RevenueItem[];

            const labels = revenueData.map(item => item.cinema || "Rạp không xác định");
            const dataset = revenueData.map(item => item.doanh_thu.total_income || 0);

            setChartData({
                labels,
                datasets: [
                    {
                        data: dataset,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E6E6E6'],
                    },
                ],
            });
        }
    }, [data]);

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (isError || !data?.data) {
        return <div>Lỗi khi tải dữ liệu</div>;
    }

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const value = tooltipItem.raw as number;
                        return `Doanh thu: ${value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
                    },
                },
            },
            legend: {
                position: 'top' as const,
            },
        },
        responsive: true,
        onHover: (event: any, elements: any) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = chartData.labels[index];
                const value = chartData.datasets[0].data[index];
                setHoveredValue(`${label}: ${value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
            } else {
                setHoveredValue(null);
            }
        },
    };

    return (
        <div className="col-sm-12 col-lg-5">
            <div className="card shadow h-100 mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Doanh thu Cinema-Go</h6>
                </div>
                <div className="card-body mx-auto">
                    <Pie options={options} data={chartData} width={400} height={400} />
                    {hoveredValue ? <div className="mt-3 text-center title-valueChart">{hoveredValue}</div> : <div className="mt-3 text-center title-valueChart">Tổng doanh thu các phòng vé: {formatCurrencyVND(data?.data?.reduce((sum: any, curr: any) => {
                        return +sum + +curr?.doanh_thu?.total_income;
                    }, 0))}</div>}
                </div>
            </div>
        </div>
    );
};

export default DoanhThuTong;