

//component
import { Fragment } from "react";
import Footer from "../../../shared/layout/footer";
import Navbar from "../../../shared/layout/navBar";
import Tentang from "./session/tentang";
import "./index.css";

const InformasiDesa = () => {

    return (
        <Fragment>
            <div className="conatiner-fluid informasi-desa-container">
                <Navbar type={0}></Navbar>
                    <Tentang />
                <Footer type={2}></Footer>
            </div>
        </Fragment>
    )
}

export default InformasiDesa;
