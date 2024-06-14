
import { Outlet } from 'react-router-dom';
import HeaderClient from './../_components/Header/HeaderClient';
import FooterClient from '../_components/Footer/FooterClient';
import GoToTop from '../_components/GoToTop';


const LayoutClient = () => {
    return (
        <>
            <HeaderClient />
            <Outlet />
            <GoToTop />
            <FooterClient />
        </>
    )
}

export default LayoutClient