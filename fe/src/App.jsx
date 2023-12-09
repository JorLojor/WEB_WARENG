/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import LandingPage from './pages/landingPage/LandingPage';
import InformasiDesa from './pages/informasiDesa/InformasiDesa';

function App() {

  return (
    <>
      <BrowserRouter>
      
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/informasi-desa" element={<InformasiDesa/>} />
          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
