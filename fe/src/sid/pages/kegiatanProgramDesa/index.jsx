import { Fragment, useState, useEffect } from "react";
import Footer from "../../../shared/layout/footer";
import Navbar from "../../../shared/layout/navBar";

const KegiatanProgramDesa = () => {

    return (
        <Fragment>
            <div className="conatiner-fluid informasi-desa-container" style={{ overflow: 'hidden' }}>
                <Navbar type={0}></Navbar>

                <Footer type={3}></Footer>
            </div>
        </Fragment >
    )
}

export default KegiatanProgramDesa;
