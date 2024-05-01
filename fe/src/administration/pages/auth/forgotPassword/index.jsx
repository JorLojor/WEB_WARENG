/* eslint-disable no-unused-vars */
import React from "react";
import "../siginPage/SiginPage.css";
import ButtonForgotPass from "../../components/ButtonForgotPass/ButtonForgotPass";
import { useState, useEffect } from "react";



const ForgotPassword = () => {
    const [dataUser , setDataUser] = useState({
        nik : '',
        password1 : '',
        password2 : '',
    });

    const updateField = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name] : e.target.value
        })
    }

    

    return(
        <>
            <div className='outer-Sigin ' style={{width: '100vw', height: '100vh'}}>
            <div className="inner-Sigin">

                <div className="container-fluid box-Sigin">
                        
                        <div className="box-Sigin-title">
                            <h1>Ubah password</h1>
                            {/* input nama */}
                            <div className="box-Sigin__title__input">
                                <label className='text-light' htmlFor="">NIK</label>
                                <input 
                                    type="text" 
                                    placeholder="Masukan NIK" 
                                    name = 'nik'
                                    onChange={updateField}
                                />
                            </div>
                            {/* input paassword */}
                            <div className="box-Sigin__title__input">
                                <label className='text-light' htmlFor="">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Masukan Password baru"
                                    name = 'password1'
                                    onChange = {updateField}    
                                />
                            </div>
                            <div className="box-Sigin__title__input">
                                <label className='text-light' htmlFor="">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Masukan ulang Password baru"
                                    name = 'password2'
                                    onChange = {updateField}    
                                />
                            </div>
                            
                            <ButtonForgotPass data={dataUser}/>
                        </div>
                </div>

            </div>
        </div>
        </>
    )
};

export default ForgotPassword;
