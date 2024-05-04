import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../../shared/layout/navBar'
import Footer from '../../../../shared/layout/footer'
import './index.css';

const SignUp = () => {
    return (
        <Fragment>
            <div className="container-fluid forget-password-container p-0">
                <div className="container-fluid forget-password-container-background p-0">
                    <NavBar type={1}/>
                    <div className="row mt-5">
                        <div className="col-1 col-md-2"></div>
                        <div className="col-10 col-md-8 mb-5">
                            <div className="card card-form-forget-password text-light pt-5">
                                <p className='text-center' style={{ fontSize: '45px', fontWeight: 'bold' }}>RESET PASSWORD</p>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-10">
                                        <div className="Password-baru mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Password baru</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Password baru" />
                                        </div>
                                        <div className="Password-ulang mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Masukkan Ulang Password</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Ulang Password baru" />
                                        </div>
                                        <button className='btn mt-4 mb-5 text-light px-5 py-2' style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}>Register</button>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 col-md-2"></div>
                    </div>
                    <Footer type="2"/>
                </div>
            </div>
        </Fragment >
    )
}

export default SignUp;
