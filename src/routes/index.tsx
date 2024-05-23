import SignInPage from "@/pages/auth/SignIn/page"
import SignUpUserPage from "@/pages/auth/SignUp/page"
import LayoutDashBoard from "@/pages/dashboard/LayoutDashBoard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRouterLogin from "./PrivateRouterLogin"
import MovieCreatePage from "@/pages/dashboard/Movies/create/page"
import NotFoundPage from "@/pages/website/404/page"
import MovieListPage from "@/pages/dashboard/Movies/list/page"
import MovieEditPage from "@/pages/dashboard/Movies/edit/page"
import SeatTypeCreatePage from "@/pages/dashboard/SeatType/create/page"
import SeatTypeListPage from "@/pages/dashboard/SeatType/list/page"
import SeatTypeEditPage from "@/pages/dashboard/SeatType/edit/page"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<PrivateRouterLogin><SignUpUserPage /></PrivateRouterLogin>} />
          <Route path="/login" element={<PrivateRouterLogin><SignInPage /></PrivateRouterLogin>} />

          {/* DashBoard */}
          <Route path="dashboard" element={<LayoutDashBoard />}>
            <Route index element={<>DashBoard Home</>} />
            <Route path="/dashboard/movie/create" element={<MovieCreatePage />} />
            <Route path="/dashboard/movie" element={<MovieListPage />} />
            <Route path="/dashboard/movie/edit/:id" element={<MovieEditPage />} />

            <Route path="/dashboard/seattype" element={<SeatTypeListPage />} />
            <Route path="/dashboard/seattype/create" element={<SeatTypeCreatePage />} />
            <Route path="/dashboard/seattype/edit/:id" element={<SeatTypeEditPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router