/* eslint-disable no-unused-vars */
import React from "react";
// import Navbar from "../../components/navbar/Navbar"
import "../siginPage/SiginPage.css";
import ButtonLogin from "../../components/ButtonLogin/ButtonLogin";
import { useState, useEffect } from "react";
function loginPage() {
    const [dataUser , setDataUser] = useState({
        name : '',
        password : '',
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
                            <h1>LOGIN</h1>
                            {/* input nama */}
                            <div className="box-Sigin__title__input">
                                <label className='text-light' htmlFor="">Nama</label>
                                <input 
                                    type="text" 
                                    placeholder="Masukan Nama" 
                                    name = 'username'
                                    onChange = {updateField}
                                />
                            </div>
                            {/* input paassword */}
                            <div className="box-Sigin__title__input">
                                <label className='text-light' htmlFor="">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Masukan Password"
                                    name = 'password'
                                    onChange = {updateField}    
                                />
                            </div>
                            
                            <ButtonLogin data={dataUser} />
                        </div>
                </div>

            </div>
        </div>
            
        </>
    )
}

export default loginPage;
