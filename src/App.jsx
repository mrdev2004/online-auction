import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Index from './Components/Index';
import Login from './Components/Login';
import Contact from './Components/Contact';
import Category from './Components/Category';
import Register from './Components/Register';
import Checkout from './Components/Checkout';
import Confrim from './Components/Confrim';
import SubmitCommission from './Components/SubmitCommission';
import View from './Components/ViewAuction';
import AddAuction from './Components/AddAuction';
import Dashboard from './Components/Dashboard';
import Commission from './Components/Commission';
import ViewUsers from './Components/ViewUsers';
import Vauctions from './Components/Vauctions';
import AboutUs from './Components/AboutUs';
import BidOnAuction from './Components/MyBids';
import BidOnAuction1 from './Components/BidOnAuction1';
// import SingleProducts from './Components/SingleProducts';
// import Deval from './Components/Deval';
import ShopData from './Components/ShopData';
import AuctionsList from './Components/AuctionsList';
import SingleData from './Components/SingleData';
import MyBids from './Components/MyBids';
import ViewAuctions from './Components/ViewAuction';
import AdminAuctions from './Components/AdminAuctions';
import Profile from './Components/Profile';
// import NotFound from './Components/NotFound'; // Optional

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Category" element={<ShopData />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/Confirmation" element={<Confrim />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/mybids" element={<MyBids />} />
                {/* <Route path="/single-product" element={<SingleProducts />} />  */}
                <Route path="/product" element={<SingleData />} />

                {/* <Route path='/Deval' element={<Deval/>}/> */}

                // auctionneer path
                <Route path="/Aauction" element={<AddAuction />} />
                <Route path="/Vauction" element={<Vauctions />} />
                <Route path="/Commission" element={<SubmitCommission />} />
                <Route path="/data" element={<AuctionsList />} />
                <Route path="/profile" element={<Profile />} />



            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
