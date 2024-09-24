import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Signin from '../components/Signin'

const Routing = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing