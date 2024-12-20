import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Header from '../components/header/Header'
import Bonds from '../pages/bonds/Bonds'
import Fixtures from '../pages/Fixtures'
import Profile from '../pages/profile/Profile'
import PurchaseCompleted from '../pages/purchase-completed/PurchaseCompleted'
import Recommendations from '../pages/recommendations/Recommendations'
import AdminBonds from '../pages/bonds/AdminBonds';
import AdminAvailableBonds from '../pages/bonds/AdminAvailableBonds';
import AdminAuctions from '../pages/auctions/AdminAuctions';
import AdminAuctionOffers from '../pages/auctions/AdminAuctionOffers';
import AdminProposals from '../pages/auctions/AdminProposals'
import Test from '../pages/bonds/test';



const Routing = () => {
  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bonds" element={<Bonds />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/purchase-completed" element={<PurchaseCompleted />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/admin/bonds/avail" element={<AdminAvailableBonds />} />
                <Route path="/admin/bonds" element={<AdminBonds />} />
                <Route path="/admin/auctions" element={<AdminAuctions />} />
                <Route path="/admin/auctions/offers" element={<AdminAuctionOffers />} />
                <Route path="/admin/auctions/proposals" element={<AdminProposals />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing