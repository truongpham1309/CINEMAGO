import DoanhThuThanhPhan from "./_components/DoanhThuThanhPhan";
import DoanhThuTong from "./_components/DoanhThuTong";

const DashBoardHomePage = () => {

  return (
    <div className="app">
      <div className="row mt-0 align-items-stretch">
        <DoanhThuTong />
        <DoanhThuThanhPhan type={"CINEMA"} name={"rạp"}/>
        <DoanhThuThanhPhan type={"SERVICES"} name={"dịch vụ"}/>
        <DoanhThuThanhPhan type={"MOVIE"} name={"phim"}/>
        
      </div>
    </div>
  );
}

export default DashBoardHomePage