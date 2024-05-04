import { Fragment } from "react";
import { Link } from 'react-router-dom'
import Foto1 from '../../assets/Foto1.svg';
import Foto2 from '../../assets/Foto2.svg';
import Foto3 from '../../assets/Foto3.svg';
import Instagram from "../../assets/LogoIconInstagramFooter.png";
import Google from "../../assets/LogoIconGoogleFooter.png";
import Facebook from "../../assets/LogoIconFacebookFooter.png";
import ImageTentang from './component/imageTentang';

const Tentang = () => {

    return (
        <Fragment>
            <div className="container-fluid tentang-container mt-3 mt-md-5 mb-3 mb-md-5">
                <div className="row ">
                    <div className="col-12 col-md-4 p-0">
                        <ImageTentang Foto={Foto1} />
                    </div>
                    <div className="col-12 col-md-4 p-0">
                        <ImageTentang Foto={Foto2} />
                    </div>
                    <div className="col-12 col-md-4 p-0">
                        <ImageTentang Foto={Foto3} />
                    </div>
                    <div className="mt-3 mt-md-5">
                        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>Desa <span style={{ color: '#005F51' }}>Wareng</span></p>
                        <p style={{ fontSize: '20px', color: '#184D47', maxWidth: '80%', textAlign: 'justify' }}>Wareng adalah sebuah desa di Kecamatan Butuh, Kabupaten Purworejo, Provinsi Jawa Tengah, Indonesia. Desa Wareng terletak kurang lebih 10 Km dari Kutoarjo, Purworejo dan 20 Km dari Pusat Kota Purworejo, Purworejo. </p>
                        <div className="d-flex  justify-content-between">
                            <Link style={{ fontSize: '16px', color: '#00BF7C' }}>Baca lebih banyak</Link>
                            <div className="d-flex">
                                <img className="mx-1 mx-md-2" src={Instagram} alt="" />
                                <img className="mx-1 mx-md-2" src={Google} alt="" />
                                <img className="mx-1 mx-md-2" src={Facebook} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Tentang;
