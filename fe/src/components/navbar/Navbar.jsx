// generate the component
import React from 'react';
import logo from "../../assets/LogoIconNavbar.png";
import login from "../../assets/LogoLoginNavbar.png";
import "./Navbar.css";

const Navbar = () => {
    return (
       <>
            <nav className='bg-warning'>
                <div className="container-fluid ">
                    <div className="row justify-content-between">
                        <div className="col-3  ps-5 ms-5 pt-2">
                            <img src={logo} alt="" />
                        </div>
                        <div className="col-6  pe-5 me-5 ">
                            <ul className=' ul d-flex justify-content-end pt-3'>
                                <li className='list'>Beranda</li>
                                <li className='list'>Program</li>
                                <li className='list'>Layanan</li>
                                <li className='tentang'>Tentang</li>
                            </ul>
                            <button>
                                <img className='Login-Button' src={login} alt="" />
                                <p>Login</p>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </nav>
       </>
    );
}

export default Navbar;
