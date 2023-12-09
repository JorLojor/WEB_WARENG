/* eslint-disable no-unused-vars */
import react from "react";
import logo from "../../assets/LogoInsideWarengFooter.png";
import maps from "../../assets/LogoMapsFooter.png";
import instagram from "../../assets/LogoInstagramFooter.png";
import facebook from "../../assets/LogoFacebookFooter.png";
import "../Footer/Footer.css";

const Footer = () => {
    return(
        <>
            <footer>
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        <div className="col-3  ps-5 ms-5">
                            <img src={logo} alt="" />
                        </div>
                        <div className="col-3  text-end pe-5 me-5">
                            <img className="mx-3" src={maps} alt="" />
                            <img className="mx-3" src={instagram} alt="" />
                            <img className="mx-3" src={facebook} alt="" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
