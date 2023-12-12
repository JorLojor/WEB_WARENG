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
            <div className="container-fluid setbg-landing-page">
                <div className="set-nav">
                    <Navbar />
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
            <footer className='row justify-content-center'>
                <div className="text-light text-center d-flex justify-content-between" style={{width:'250px'
                ,height:'50px',borderRadius:'10px',padding:'10px',marginTop:'20px'
            }}>
                    <p> Hubungi petuas desa </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 0C8.01167 0 7.63858 0.01375 6.46525 0.066C5.29375 0.121 4.49625 0.30525 3.795 0.5775C3.07175 0.858 2.45758 1.23475 1.84617 1.84617C1.23475 2.45758 0.857083 3.07083 0.5775 3.795C0.30525 4.49625 0.120083 5.29375 0.066 6.46525C0.011 7.63858 0 8.01167 0 11C0 13.9883 0.01375 14.3614 0.066 15.5348C0.121 16.7053 0.30525 17.5038 0.5775 18.205C0.853684 18.9391 1.28663 19.6042 1.84617 20.1538C2.3955 20.7138 3.06066 21.1468 3.795 21.4225C4.49717 21.6938 5.29467 21.8799 6.46525 21.934C7.63858 21.989 8.01167 22 11 22C13.9883 22 14.3614 21.9862 15.5348 21.934C16.7053 21.879 17.5038 21.6938 18.205 21.4225C18.9389 21.146 19.6039 20.7131 20.1538 20.1538C20.7139 19.6046 21.147 18.9395 21.4225 18.205C21.6938 17.5038 21.8799 16.7053 21.934 15.5348C21.989 14.3614 22 13.9883 22 11C22 8.01167 21.9862 7.63858 21.934 6.46525C21.879 5.29467 21.6938 4.49533 21.4225 3.795C21.1462 3.06095 20.7133 2.39592 20.1538 1.84617C19.6049 1.28575 18.9396 0.852674 18.205 0.5775C17.5038 0.30525 16.7053 0.120083 15.5348 0.066C14.3614 0.011 13.9883 0 11 0ZM11 1.98C13.9361 1.98 14.2863 1.99467 15.4458 2.04508C16.5183 2.0955 17.1004 2.27333 17.4872 2.4255C18.0024 2.62442 18.3673 2.86275 18.7541 3.24683C19.1382 3.63183 19.3765 3.99758 19.5754 4.51275C19.7257 4.89958 19.9054 5.48167 19.954 6.55417C20.0063 7.71467 20.0182 8.063 20.0182 11C20.0182 13.937 20.0044 14.2863 19.9503 15.4458C19.8944 16.5183 19.7157 17.1004 19.5644 17.4872C19.3855 17.9646 19.1042 18.397 18.7403 18.7541C18.3848 19.1183 17.9527 19.3988 17.4753 19.5754C17.0903 19.7257 16.4991 19.9054 15.4266 19.954C14.2588 20.0063 13.915 20.0182 10.9725 20.0182C8.02908 20.0182 7.68533 20.0044 6.51842 19.9503C5.445 19.8944 4.85375 19.7157 4.46875 19.5644C3.99108 19.3877 3.55912 19.1061 3.20467 18.7403C2.8367 18.3872 2.55449 17.9545 2.37967 17.4753C2.22842 17.0903 2.05058 16.4991 1.99467 15.4266C1.95342 14.2716 1.93875 13.915 1.93875 10.9862C1.93875 8.05658 1.95342 7.69908 1.99467 6.53033C2.05058 5.45783 2.22842 4.8675 2.37967 4.4825C2.57217 3.96 2.81875 3.6025 3.20467 3.21658C3.58875 2.8325 3.94717 2.585 4.46875 2.39342C4.85375 2.24125 5.43217 2.0625 6.50467 2.0075C7.67342 1.96625 8.01717 1.9525 10.9587 1.9525L11 1.98ZM11 5.3515C10.2582 5.3515 9.52372 5.4976 8.83841 5.78147C8.15311 6.06533 7.53042 6.4814 7.00591 7.00591C6.4814 7.53042 6.06533 8.15311 5.78147 8.83841C5.4976 9.52372 5.3515 10.2582 5.3515 11C5.3515 11.7418 5.4976 12.4763 5.78147 13.1616C6.06533 13.8469 6.4814 14.4696 7.00591 14.9941C7.53042 15.5186 8.15311 15.9347 8.83841 16.2185C9.52372 16.5024 10.2582 16.6485 11 16.6485C12.4981 16.6485 13.9348 16.0534 14.9941 14.9941C16.0534 13.9348 16.6485 12.4981 16.6485 11C16.6485 9.50192 16.0534 8.06521 14.9941 7.00591C13.9348 5.94661 12.4981 5.3515 11 5.3515ZM11 14.6667C8.97417 14.6667 7.33333 13.0258 7.33333 11C7.33333 8.97417 8.97417 7.33333 11 7.33333C13.0258 7.33333 14.6667 8.97417 14.6667 11C14.6667 13.0258 13.0258 14.6667 11 14.6667ZM18.1922 5.12875C18.1794 5.47032 18.0348 5.79366 17.7886 6.03081C17.5425 6.26797 17.214 6.40047 16.8722 6.40047C16.5304 6.40047 16.2019 6.26797 15.9557 6.03081C15.7095 5.79366 15.5649 5.47032 15.5522 5.12875C15.5522 4.77866 15.6912 4.44292 15.9388 4.19537C16.1863 3.94782 16.5221 3.80875 16.8722 3.80875C17.2223 3.80875 17.558 3.94782 17.8055 4.19537C18.0531 4.44292 18.1922 4.77866 18.1922 5.12875Z" fill="white"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="21" viewBox="0 0 13 21" fill="none">
                        <path d="M13 0.590038C13 0.435379 12.9377 0.287055 12.8269 0.177694C12.7161 0.0683341 12.5658 0.00689602 12.4091 0.00689602H9.45455C7.96678 -0.0662406 6.51016 0.444709 5.40294 1.42811C4.29573 2.4115 3.62793 3.7874 3.54545 5.25517V8.40414H0.590909C0.43419 8.40414 0.28389 8.46558 0.173073 8.57494C0.0622564 8.6843 0 8.83262 0 8.98728V12.0196C0 12.1743 0.0622564 12.3226 0.173073 12.432C0.28389 12.5413 0.43419 12.6028 0.590909 12.6028H3.54545V20.4169C3.54545 20.5715 3.60771 20.7198 3.71853 20.8292C3.82934 20.9386 3.97964 21 4.13636 21H7.68182C7.83854 21 7.98884 20.9386 8.09965 20.8292C8.21047 20.7198 8.27273 20.5715 8.27273 20.4169V12.6028H11.3691C11.5005 12.6046 11.6288 12.5632 11.7337 12.485C11.8385 12.4069 11.914 12.2965 11.9482 12.1712L12.7991 9.1389C12.8226 9.05273 12.8258 8.9624 12.8083 8.87484C12.7909 8.78728 12.7533 8.70484 12.6985 8.63386C12.6437 8.56288 12.5732 8.50526 12.4922 8.46544C12.4113 8.42561 12.3222 8.40464 12.2318 8.40414H8.27273V5.25517C8.30212 4.96649 8.4395 4.69899 8.65803 4.50489C8.87656 4.3108 9.16055 4.20406 9.45455 4.20552H12.4091C12.5658 4.20552 12.7161 4.14408 12.8269 4.03472C12.9377 3.92536 13 3.77703 13 3.62238V0.590038Z" fill="white"/>
                    </svg>

                </div>
            </footer>
        </>
    )
}

export default LandingPage;
