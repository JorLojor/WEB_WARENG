/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {PropTypes} from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ButtonSignin = ({data}) => {

    const dataUser = {
        name : data.username,
        password : data.password,
    }

    useEffect(()=>{
        window.localStorage.removeItem('token');
    }
    ,[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.post(' http://localhost:3555/api/v1/warga/login',dataUser);
            console.log(result);
            if (result.data.status === 'success'){
                window.localStorage.setItem('token',result.data.token);
                window.location.href = '/';
                confirm('berhasil login');
            }else{
                alert('gagal login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="login-btn d-flex justify-content-between mt-5">
                <button onClick={
                    handleSubmit
                }>Login</button>
                <div className="d-flex cover-spa-sigin gap-4">
                    <Link to={'/forgot-password'}> <p>lupa password</p></Link>
                    <Link to={'/sigin'}> <p>belum punya akun</p></Link>
                </div>
                

                
            </div>
        </>
    )
}

ButtonSignin.propTypes = {
    data : PropTypes.object.isRequired,
}

export default ButtonSignin;
