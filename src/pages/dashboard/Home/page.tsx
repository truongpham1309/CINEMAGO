import { useState } from "react";
import DoanhThuThanhPhan from "./_components/DoanhThuThanhPhan";
import DoanhThuTong from "./_components/DoanhThuTong";
import { Select, Button } from "antd";
import { Option } from "antd/es/mentions";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getAllCinemas } from "@/services/cinema/cinemaService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DashBoardHomePage = () => {
  const [typeChart, setTypeChart] = useState<"CINEMAS" | "MOVIES" | "SERVICES">('MOVIES');
  const [selectedType, setSelectedType] = useState<"CINEMAS" | "MOVIES" | "SERVICES">('MOVIES');
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  const handleViewReport = () => {
    if(!selectedCinema && selectedType === "CINEMAS") {
      toast.warning("Mời bạn chọn rạp!", {
        position: "top-center",
        autoClose: 1000
      })
    }
    setTypeChart(selectedType);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['CINEMAS'],
    queryFn: async () => {
      const data = await getAllCinemas();
      return data;
    }
  });


  if (isLoading) return <LoadingComponent />
  console.log(data?.data?.cinemas)

  return (
    <div className="app">
      <div className="row mt-0 align-items-stretch">
        <DoanhThuTong />
        <div className="col-sm-12 col-lg-7">
          <div className="card shadow h-100">
            <div className="card-header d-flex justify-content-between align-items-center py-3">
              <h6 className="m-0 font-weight-bold text-primary text-uppercase">
                {typeChart === 'MOVIES' ? "Doanh thu phim" : (typeChart === 'CINEMAS' ? "Doanh thu rạp" : "Doanh thu dịch vụ")}
              </h6>

            </div>
            <div className="d-flex align-items-center justify-content-end mt-3 mr-2">

              {selectedType === 'CINEMAS' && (
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  onChange={(value) => setSelectedCinema(value)}
                  value={selectedCinema}
                  placeholder="Chọn Rạp"
                  className="mr-1"
                >
                  {data?.data?.cinemas?.map((_c: any, index: any) => (
                    <Option key={index} value={_c?.id}>{_c?.name}</Option>
                  ))}
                </Select>
              )}
              <Select
                style={{ width: 200 }}
                onChange={(value) => setSelectedType(value)}
                value={selectedType}
              >
                <Option value={"MOVIES"}>Phim</Option>
                <Option value={"CINEMAS"}>Rạp</Option>
                <Option value={"SERVICES"}>Dịch vụ</Option>
              </Select>


              <Button
                type="primary"
                onClick={handleViewReport}
                className="ml-3"
              >
                Xem Báo Cáo
              </Button>
            </div>
            <DoanhThuThanhPhan
              url={typeChart === 'MOVIES' ?
                "dashboard/statistic/cinema-revenue-films" :
                (typeChart === 'CINEMAS' && selectedCinema ?
                  `dashboard/statistic/cinema-revenue/${selectedCinema}` :
                  "dashboard/statistic/cinema-revenue-services")}
                  typeChart={typeChart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHomePage;
