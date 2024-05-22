import SignInPage from "@/pages/auth/SignIn/page"
import SignUpUserPage from "@/pages/auth/SignUp/page"
import LayoutDashBoard from "@/pages/dashboard/LayoutDashBoard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRouterLogin from "./PrivateRouterLogin"
import NotFoundPage from "@/pages/website/404/page"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<LayoutDashBoard />}>

          </Route>

          <Route path="/signup" element={<PrivateRouterLogin><SignUpUserPage /></PrivateRouterLogin>} />
          <Route path="/login" element={
            <PrivateRouterLogin>
              <SignInPage />
            </PrivateRouterLogin>} />
            <Route path="/dashboard" element={<LayoutDashBoard />}/>

            <Route path="dashboard" element={<LayoutDashBoard />}>
              <Route index element={<>DashBoard Home</>} />
            </Route>

            <Route path="/404"  element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router