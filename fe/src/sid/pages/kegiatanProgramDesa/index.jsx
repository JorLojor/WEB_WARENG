import { Fragment, useState, useEffect } from "react";
import Footer from "../../../shared/layout/footer";
import Navbar from "../../../shared/layout/navBar";
import GambarDummy from "./assets/Foto.svg";
import { Link } from "react-router-dom"

const KegiatanProgramDesa = () => {
    const [data, setData] = useState([]);

    const GetFromAPI = async () => {
        try {
            setData([
                {
                    title: 'Nama Agenda 1',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                },
                {
                    title: 'Nama Agenda 2',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                },
                {
                    title: 'Nama Agenda 3',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                },
                {
                    title: 'Nama Agenda 4',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                },
                {
                    title: 'Nama Agenda 5',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                },
                {
                    title: 'Nama Agenda 6',
                    date: Date.now(),
                    location: 'Desa lorem Kec.ipsum',
                    img: GambarDummy
                }
            ]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatDate = (date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day} ${months[monthIndex]} ${year}`;
    };

    useEffect(() => {
        GetFromAPI();
    }, []);

    return (
        <Fragment>
            <Navbar type={0}></Navbar>
            <div className="container-fluid informasi-desa-container" style={{ overflow: 'hidden', background: '#F7FFFB' }}>
                <div className="row">
                    <div className="col-0 col-md-1"></div>
                    <div className="col-12 col-md-10">
                        <p>KEGIATAN PROGRAM DESA WARENG</p>
                        <div className="d-block d-md-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <p style={{ fontSize: '64px', fontWeight: '600' }}>16</p>
                                <div>
                                    <p className="m-0 " style={{ fontSize: '20px', fontWeight: 'bold' }}>Kamis</p>
                                    <p style={{ fontSize: '12px' }}>September, 2023</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <p>logo</p>
                                <p style={{ fontSize: '64px' }}>21'</p>
                                <div>
                                    <p className="m-0" style={{ fontSize: '20px', fontWeight: 'bold' }}>YOGYAKARTA</p>
                                    <p style={{ fontSize: '12px' }}>INDONESIA</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-center" style={{ color: '#184D47', fontSize: '36px', fontWeight: 'bold' }}>Agenda Desa</p>
                        <div className="row my-5 p-3" style={{ boxShadow: '1px 4px 6px rgba(0, 145, 124, 1)', border: '1px solid #00917C', borderRadius: '1vw' }}>
                            <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ borderRight: '2px solid #00917C' }}>
                                <p >Lokasi Desa</p>
                                <p>Semua Desa</p>
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ borderRight: '2px solid #00917C' }}>
                                <p>Pukul Berapa</p>
                                <p>12.00 WIB</p>
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ borderRight: '2px solid #00917C' }}>
                                <p>Pilih Tanggal</p>
                                <p>20 September 2023</p>
                            </div>
                            <div className="col-12 col-md-3 mb-2 mb-md-0">
                                <p>pencarian</p>
                            </div>
                        </div>
                        <div className="row">
                            {data.map((item, index) => (
                                <div className="col-12 col-md-6 mb-5" style={{ position: 'relative' }}>
                                    <Link to="/detail-kegiatan-desa">
                                        <div>
                                            <img src={item.img} alt="" style={{ width: '100%', maxHeight: '100%' }} />
                                            <button className="btn text-light" style={{ position: 'absolute', bottom: '200px', right: '10%', fontSize: '14px', background: '#00917C' }}>Lihat selengkapnya</button>
                                        </div>
                                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.title}</p>
                                        <div className="row">
                                            <div className="col-12 col-md-6 d-flex">
                                                <i className="fa-regular fa-clock me-1"></i>
                                                <p style={{ fontSize: '14px' }}>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            <div className="col-12 col-md-6 d-flex">
                                                <i className="fa-solid fa-location-dot me-1"></i>
                                                <p style={{ fontSize: '14px' }}>{item.location}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 d-flex">
                                            <i className="fa-regular fa-calendar me-1"></i>
                                            <p style={{ fontSize: '14px' }}>{formatDate(new Date(item.date))}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-0 col-md-1"></div>
                </div>
            </div>
            <Footer type={3}></Footer>
        </Fragment>
    );
};

export default KegiatanProgramDesa;
