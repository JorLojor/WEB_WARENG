/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {PropTypes} from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ButtonSignin = ({data}) => {
    const dataUser = {
        username : data.username,
        password : data.password,
        nohp : data.nohp,
    }

    useEffect(()=>{
        window.localStorage.removeItem('token');
    }
    ,[]);

    // sigin
    const hndleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3555/api/v1/warga/register',dataUser);
            console.log(result);
            if(result.data.status === 'success'){
                window.localStorage.setItem('token',result.data.token);
                window.location.href = '/login';
                confirm('berhasil login');
            }else{
                alert('gagal login');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return(
        
            <div className="sigin-btn d-flex justify-content-between mt-5">
                <button onClick={
                    hndleSubmit
                }>Register</button>
                <div className="cover-spa-sigin">

                    <Link to={'/login'}>Sudah punya akun</Link>
                </div>
            </div>
    
    )
}

ButtonSignin.propTypes = {
    data : PropTypes.object.isRequired,
}

export default ButtonSignin;
