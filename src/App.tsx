import 'react-modal-video/css/modal-video.min.css';
import "react-toastify/ReactToastify.css";
import "./styles/all.min.css";
import "./styles/animate.css";
import "./styles/bootstrap.min.css";
import "./styles/flaticon.css";
import "./styles/jquery.animatedheadline.css";
import "./styles/magnific-popup.css";
import "./styles/main.css";
import "./styles/nice-select.css";
import "./styles/odometer.css";
import "./styles/owl.carousel.min.css";
import "./styles/owl.theme.default.min.css";
import "react-multi-carousel/lib/styles.css";
import "aos/dist/aos.css";
import Router from "@/routes";
import { ToastContainer } from "react-toastify";
import useUnload from "./common/hooks/global/useUnLoad";
import { configAxiosUse } from "./configs/service";

configAxiosUse();

const App = () => {
  useUnload();
  return (
    <>
      <ToastContainer limit={3} autoClose={1000} />
      <Router />
    </>
  )
}

export default App