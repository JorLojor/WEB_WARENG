import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Routing}  />
  </React.StrictMode>,
)
