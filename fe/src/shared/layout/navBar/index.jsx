import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/LogoWareng.svg';
import Hamburger from './assets/hamburger.svg';
import HamburgerWhite from './assets/hamburger-white.svg';
import LoginIcon from './assets/LoginIcon.svg';
import './index.css';

const Navbar = ({type}) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top pt-1 pt-md-5">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo-WARENG" />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" onClick={toggleNav} aria-expanded={isNavOpen ? "true" : "false"}>
                    <span className="navbar-toggler-icon">
                        <img src={Hamburger}  alt="Icon" />
                    </span>
                </button>
                <div className={`collapse navbar-collapse d-xs-flex justify-content-end ${isNavOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav mb-2 mb-lg-0" >
                        <li className="nav-item px-1">
                            <Link style={{color: type ? 'white' : 'black'  }} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Beranda</Link>
                        </li>
                        <li className="nav-item px-1">
                            <Link style={{color: type ? 'white' : 'black'  }} className={`nav-link ${location.pathname === '/informasi-desa' ? 'active underline' : ''}`} to="/informasi-desa">Informasi Desa</Link>
                        </li>
                        <li className="nav-item dropdown px-1">
                            <Link style={{color: type ? 'white' : 'black'  }} className={`nav-link ${location.pathname === '/kegiatan-program-desa' ? 'active underline' : ''}`} to="/kegiatan-program-desa">Kegiatan Desa</Link>
                        </li>
                        {/* <li className="nav-item px-1">
                            <Link style={{color: type ? 'white' : 'black'  }} className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Tentang</Link>
                        </li>
                        <li className="nav-item px-1" >
                            <Link style={{color: type ? 'white' : 'black'  }} className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Aspirasi</Link>
                        </li> */}
                        <li className="nav-item px-1" style={{ borderLeft: '2px solid white' }}>
                            <Link className='nav-link' to="/login" >
                                <div className="text-light wrap p-1 px-2" style={{ background: '#00917C', borderRadius: '0.5vw' }}>
                                    <img src={LoginIcon} className='me-2' alt="" />
                                    Login
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
