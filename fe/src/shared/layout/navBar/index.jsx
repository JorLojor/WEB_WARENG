import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/LogoWareng.svg';
import Hamburger from './assets/hamburger.svg';
import HamburgerWhite from './assets/hamburger-white.svg';
import LoginIcon from './assets/LoginIcon.svg';
import './index.css';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo-WARENG" />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" onClick={toggleNav} aria-expanded={isNavOpen ? "true" : "false"}>
                    <span className="navbar-toggler-icon">
                        {isHome ? <img src={Hamburger} alt="Icon" /> : <img src={HamburgerWhite} alt="Icon" />}
                    </span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item px-1">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Beranda</Link>
                        </li>
                        <li className="nav-item px-1">
                            <Link className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Program Pemerintah</Link>
                        </li>
                        <li className="nav-item dropdown px-1">
                            <Link className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Layanan</Link>
                        </li>
                        <li className="nav-item px-1">
                            <Link className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Tentang</Link>
                        </li>
                        <li className="nav-item px-1" style={{borderRight:'2px solid white'}}>
                            <Link className={`nav-link ${location.pathname === '/#' ? 'active underline' : ''}`} to="/#">Aspirasi</Link>
                        </li>
                        <li className="nav-item px-1">
                            <Link className='nav-link' to="/login" >
                                <div className="wrap p-1 px-2" style={{background:'#00917C', borderRadius:'0.5vw'}}>
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
