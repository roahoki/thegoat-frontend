import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Header from '../components/header/Header'
import Bonds from '../pages/bonds/Bonds'
import Fixtures from '../pages/Fixtures'
import Profile from '../pages/profile/Profile'


const Routing = () => {
  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/bonds" element={<Bonds />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing