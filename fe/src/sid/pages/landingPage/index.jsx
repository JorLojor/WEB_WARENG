import Navbar from '../../../shared/layout/navBar';
import Footer from '../../../shared/layout/footer';
import ButtonLandingPage from './component/ButtonLandingPage';
import { Fragment } from 'react';
import './index.css'

const LandingPage = () => {

    return (
        <Fragment>
            <div className="container-fluid landing-page-container p-0">
                <div className="container-fluid landing-page-container-background pb-3 pb-md-0">
                    <Navbar type={1}/>
                    <div className="row pt-0 pt-md-5">
                        <div className="col-0 col-md-1"></div>
                        <div className="col-12 col-md-6 pt-0 pt-md-5">
                            <p className='page-header' style={{color:'white', fontSize: '48px', fontWeight: 'bold' }}>Portal Terintegrasi Sistem Informasi, Administrasi dan Pelayanan Desa Wareng</p>
                        </div>
                        <div className="col-0 col-sm-5"></div>
                    </div>
                    <div className="row pb-3 pb-md-5 ">
                        <div className="col-0 col-md-1"></div>
                        <div className="col-12 col-md-10">
                            <div className="wrap-btn">
                                <ButtonLandingPage title="Informasi Desa" path="informasi-desa" ></ButtonLandingPage>
                                <ButtonLandingPage title="Kegiatan Desa" path="informasi-desa" ></ButtonLandingPage>
                                <ButtonLandingPage title="Pelayanan Desa" path="informasi-desa" ></ButtonLandingPage>
                                <ButtonLandingPage title="Aspirasi" path="informasi-desa"></ButtonLandingPage>
                            </div>
                        </div>
                        <div className="col-0 col-md-1"></div>
                    </div>
                    <Footer  type="1"/>
                </div>
            </div>
        </Fragment >
    )
}

export default LandingPage;
