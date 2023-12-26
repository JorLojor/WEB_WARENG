/* eslint-disable no-unused-vars */
import React from 'react';
import { useState,useEffect } from 'react';
import TombolLoginNav from '../TombolNavbar/TombolLoginNav';
import TombolSettingNav from '../TombolNavbar/TombolSettingNav';
import logo from "../../assets/LogoIconNavbar.png";
import "./Navbar.css";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const Navbar = ({page}) => {
    const [pagesState,setPagesState]=useState()

    useEffect(()=>{
        if (page==='landingPage'){
            setPagesState(<TombolLoginNav />)
        }else if(page==='informasiDesa'){
            setPagesState(<TombolSettingNav />)
        }



    }

    ,[page])
 

    return (
       <>
            <nav className='bg-warning'>
                <div className="container-fluid ">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-3 bg-success ps-5 ms-5 pt-2">
                            <img src={logo} alt="" />
                        </div>
                        <div className="col-7 bg-primary me-5 d-flex justify-content-end align-items-center">
                            <ul className=' ul d-flex justify-content-end pt-3'>
                                <li className='list mx-5'>Beranda</li>
                                <li className='list mx-5'>Program</li>
                                <li className='list mx-5'>Layanan</li>
                                <li className='list mx-5'>Tentang</li>
                            </ul>
                             
                             <div id='pagesState'>
                                    {pagesState}
                             </div>
                        </div>
                      
                        
                    </div>
                </div>
            </nav>
       </>
    );
}

Navbar.propTypes={
    page:PropTypes.string
}

export default Navbar;
