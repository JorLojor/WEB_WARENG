import './LandingPage.css'
// components
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ButtonLandingPage from '../../components/buttonLandingPage/ButtonLandingPage';
// import facebook from "../../assets/LogoIconFacebookFooter";
// import google from "../../assets/LogoIconGoogleFooter";
// import instagram from "../../assets/LogoIconInstagramFooter";

const LandingPage = () => {

    return(
        <>
                    <Navbar page='landingPage' />
            <div className="container-fluid setbg-landing-page bg-primary">
                <div className="set-nav">
                </div>

                <div className="container-fluid set-text-lp">
                    <h1>Portal Terintegrasi Sistem <br/>Informasi, Administrasi <br/> dan Pelayanan Desa <br/> Wareng</h1>
                </div>

                <div className="container-fluid set-text-lp-sec ">
                    <div className="d-flex justify-content-center">
                        <div className="set-btn-landing-page">
                            <ButtonLandingPage title="Informasi Desa" path="informasi-desa" />
                        </div>
                        <div className="set-btn-landing-page">
                            <ButtonLandingPage title="Kegiatan Desa" path="kegiatan-desa" />
                        </div>
                        <div className="set-btn-landing-page">
                            <ButtonLandingPage title="Pelayanan Desa" path="pelayanan-desa" />
                        </div>
                        <div className="set-btn-landing-page">
                            <ButtonLandingPage title="Portal" path="portal" />
                        </div>
                        <div className="set-btn-landing-page">
                            <ButtonLandingPage title="Aspirasi" path="Aspirasi" />
                        </div>
                    
                    </div>
                </div>

            </div>
            <div className="set-footer">
                <Footer />
            </div>
        </>
    )
}

export default LandingPage;
