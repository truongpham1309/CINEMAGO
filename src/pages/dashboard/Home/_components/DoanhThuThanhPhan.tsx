
import { toast } from 'react-toastify';
import DoanhThuRap from './DoanhThuRap';
import DoanhThuPhim from './DoanhThuPhim';
import DoanhThuDichVu from './DoanhThuDichVu';

const DoanhThuThanhPhan = ({ url, typeChart }: any) => {
  switch (typeChart) {
    case "CINEMAS": return <DoanhThuRap url={url} />
    case "MOVIES": return <DoanhThuPhim />;
    case "SERVICES": return <DoanhThuDichVu />;
    default: {
      toast.warning("Thống kê không hợp lệ!", {
        position: "top-center",
        autoClose: 1000
      });
      return null
    }
  }
};

export default DoanhThuThanhPhan;