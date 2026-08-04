import { Outlet } from "react-router-dom";

import Navbar from "../components/bootstrap/Navbar";

function BootstrapLayout() {

    return (

        <>

            <Navbar />

            <div className="container-fluid mt-4">

                <Outlet />

            </div>

        </>

    );

}

export default BootstrapLayout;