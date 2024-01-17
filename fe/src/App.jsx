/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import LandingPage from './pages/landingPage/LandingPage';
import InformasiDesa from './pages/informasiDesa/InformasiDesa';
import LoginPage from './pages/loginPage/loginPage';
import SiginPage from './pages/siginPage/SiginPage';

const App = () => {

  return (
    <>
      <BrowserRouter>
      
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/informasi-desa" element={<InformasiDesa/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/sigin" element={<SiginPage/>} />

          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
