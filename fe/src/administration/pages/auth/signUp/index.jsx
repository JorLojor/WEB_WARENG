import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../../shared/layout/navBar'
import Footer from '../../../../shared/layout/footer'
import './index.css';

const SignUp = () => {
    return (
        <Fragment>
            <div className="container-fluid sign-up-container p-0">
                <div className="container-fluid sign-up-container-background p-0">
                    <NavBar type={1}/>
                    <div className="row mt-5">
                        <div className="col-1 col-md-2"></div>
                        <div className="col-10 col-md-8 mb-5">
                            <div className="card card-form-sign-up text-light pt-4 ">
                                <p className='text-center' style={{ fontSize: '45px', fontWeight: 'bold' }}>SIGN UP</p>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-10">
                                        <div className="nama mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Nama</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Nama" />
                                        </div>
                                        <div className="Password mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Password</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder="Masukkan Password" />
                                        </div>
                                        <div className="Nomor mb-2">
                                            <p style={{ fontSize: '24px' }} className='mb-0'>Nomor</p>
                                            <input className='py-3 ps-3' style={{ width: '100%', borderRadius: '0.5vw' }} type="text" placeholder='Masukkan Nomor Kartu Kluarga Anda' />
                                        </div>
                                        <div className="btn-warp  d-block d-md-flex justify-content-between align-items-center">
                                            <button className='btn mt-4 mb-2 mb-md-5 text-light px-5 py-2 me-2' style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}>Register</button>
                                            <p >
                                                <Link to="/login" style={{color:'#00BF7C',textDecoration:'none'}}>Sudah punya akun</Link>
                                            </p>
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
