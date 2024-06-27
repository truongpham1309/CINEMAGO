import "./styles/bootstrap.min.css";
import "./styles/all.min.css";
import "./styles/animate.css";
import "./styles/flaticon.css";
import "./styles/magnific-popup.css";
import "./styles/odometer.css";
import "./styles/owl.carousel.min.css";
import "./styles/owl.theme.default.min.css";
import "./styles/nice-select.css";
import "./styles/jquery.animatedheadline.css";
import "./styles/main.css"
import Router from "@/routes";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { configAxiosUse } from "./configs/service";
import useUnload from "./common/hooks/global/useUnLoad";

configAxiosUse();

const App = () => {

  useUnload();
  return (
    <>
      <ToastContainer limit={3}/>
      <LoadingComponent />
      <Router />
    </>
  )
}

export default App