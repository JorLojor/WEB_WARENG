

//component
import { Fragment, useState, useEffect } from "react";
import Footer from "../../../shared/layout/footer";
import Navbar from "../../../shared/layout/navBar";
import Foto from "./assets/Foto.svg";

const DetailKegiatanDesa = () => {
    const [SM, setSM] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setSM(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Fragment>
            <div className="conatiner-fluid informasi-desa-container" style={{ overflow: 'hidden' }}>
                <Navbar type={0}></Navbar>
                <div className="background-hijau" style={{ position: 'absolute', width: '100%', height: SM ? '30%' : '50%', background: '#00917C', zIndex: '-1' }}></div>
                <div className="row">
                    <div className="col-0 col-md-1"></div>
                    <div className="col-12 col-md-10 text-center">
                        <p className="pt-4" style={{ fontSize: '16px', color: 'white' }}>Desa Wareng</p>
                        <p style={{ fontSize: '36px', fontWeight: 'lighter', color: 'white' }}>Agenda <span style={{ fontWeight: 'bold', color: 'white' }}>Desa</span></p>
                        <div className="wrap-img p-4">
                            <div className="py-4 mx-auto" style={{ width: '75%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '1vw' }}>
                                <div className="mx-auto" style={{ maxWidth: '622px', maxHeight: '266px' }}>
                                    <img src={Foto} alt="" style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>Nama Kegiatan</p>
                        <div className="row">
                            <div className="col-1 col-md-0"></div>
                            <div className="col-10 col-md-12">
                                <p style={{ fontSize: '20px', textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <div className="row mt-5">
                                    <div className="col-12 col-md-2">
                                        <p style={{ fontSize: '20px', fontWeight: '500', textAlign: 'left',borderBottom:'5px solid #00917C' }}>Jam</p>
                                        <p style={{ fontSize: '16px', textAlign: 'left' }}>12:00 WIB</p>
                                    </div>
                                    <div className="col-12 col-md-2 "></div>
                                    <div className="col-12 col-md-3">
                                        <p style={{ fontSize: '20px', fontWeight: '500', textAlign: 'left',borderBottom:'5px solid #00917C' }}>Lokasi</p>
                                        <p style={{ fontSize: '16px', textAlign: 'left' }}>Desa Lorem Kec.,borderBottom:'3px solid #00917C'Ipsum blalbalblabl</p>
                                    </div>
                                    <div className="col-12 col-md-2"></div>
                                    <div className="col-12 col-md-3">
                                        <p style={{ fontSize: '20px', fontWeight: '500', textAlign: 'left',borderBottom:'5px solid #00917C' }} >Tanggal</p>
                                        <p style={{ fontSize: '16px', textAlign: 'left' }}>24 September 2023</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 col-md-0"></div>
                        </div>
                    </div>
                    <div className="col-0 col-md-1">
                    </div>
                </div>
                <Footer type={3}></Footer>
            </div>
        </Fragment >
    )
}

export default DetailKegiatanDesa;
