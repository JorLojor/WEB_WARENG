import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../../shared/layout/navBar'
import Footer from '../../../../shared/layout/footer'
import './index.css';

const SignUp = () => {

    return (
        <Fragment>
            <div className="container-fluid login-container p-0 ">
                <div className="container-fluid login-container-background p-0 ">
                    <NavBar type={1}/>
                    <div className="row mt-0 mt-md-5">
                        <div className="col-1 col-md-2"></div>
                        <div className="col-10 col-md-8 mb-5">
                            <div className="card card-form-login text-light pt-5 ">
                                <p className='text-center' style={{ fontSize: '45px', fontWeight: 'bold' }}>LOGIN</p>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-10">
                                        <div className="NIK mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>NIK</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Nomor NIK" />
                                        </div>
                                        <div className="Password mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Password</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Password" />
                                        </div>
                                        <div className="btn-warp d-block d-sm-flex justify-content-between align-items-center">
                                            <button className='btn mt-4 mb-3 mb-sm-5 text-light px-5 py-2' style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}>Login</button>
                                            <div className="text-warp d-block d-sm-flex justify-content-between align-items-center mb-5 mb-sm-0">
                                                <p className='mx-0 mx-sm-3'>
                                                    <Link to="/forgot-password" style={{ color: '#00BF7C', textDecoration: 'none' }}>Lupa Pasword ?</Link>
                                                </p>
                                                <p className='mx-0 mx-sm-3'>
                                                    <Link to="/sign-up" style={{ color: '#00BF7C', textDecoration: 'none' }}>Belum punya akun ?</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 col-md-1"></div>
                    </div>
                    <Footer type="2"/>
                </div>
            </div>
        </Fragment >
    )
}

export default SignUp;
