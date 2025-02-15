import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/CommonComponents/Navbar';
import VerticalNavbar from './Components/CommonComponents/VerticalNavbar'; // Import the VerticalNavbar
import Footer from './Components/CommonComponents/Footer';
import Index from './Components/CommonComponents/Index';
import Login from './Components/CommonComponents/Login';
import Contact from './Components/CommonComponents/Contact';
import Category from './Components/CommonComponents/Category';
import Register from './Components/CommonComponents/Register';
import Checkout from './Components/Bidder/Checkout';
import Confrim from './Components/Bidder/Confrim';
import SubmitCommission from './Components/Auctioneer/SubmitCommission';
import AddAuction from './Components/Auctioneer/AddAuction';
import Dashboard from './Components/Admin/Dashboard';
import Commission from './Components/Admin/Commission';
import ViewUsers from './Components/Admin/ViewUsers';
import Vauctions from './Components/Auctioneer/Vauctions';
import AboutUs from './Components/CommonComponents/AboutUs';

import ShopData from './Components/CommonComponents/ShopData';
// import AuctionsList from './Components/AuctionsList';
import SingleData from './Components/Bidder/SingleData';
import MyBids from './Components/Bidder/MyBids';

import AdminAuctions from './Components/Admin/AdminAuctions';
import Profile from './Components/CommonComponents/Profile';
import ViewAdmins from './Components/Admin/ViewAdmins';
import AdminInsertPage from './Components/Admin/AdminInsertPage';
import ViewPayments from './Components/Admin/ViewPayments';

const App = () => {
    // Assuming the user role is stored in localStorage or sessionStorage after login
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // You can replace this with your actual logic to retrieve the user role (e.g., from localStorage, API, or global state)
        const role = localStorage.getItem('admin'); // Example of retrieving user role from localStorage
        console.log("role", role)
        setUserRole(role);
    }, []);

    // Conditionally render the navbar based on user role
    const renderNavbar = () => {
        if (userRole === 'Super Admin') {
            return <VerticalNavbar />;
        }
        return <Navbar />;
    };

    // Conditionally render Footer based on user role
    const renderFooter = () => {
        if (userRole !== 'Super Admin') {
            return <Footer />;
        }
        return null; // Don't render Footer if user is Super Admin
    };

    return (
        <Router>
            {renderNavbar()} {/* Conditionally render Navbar */}
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
                <Route path="/product" element={<SingleData />} />
                <Route path="/Aauction" element={<AddAuction />} />
                <Route path="/Vauction" element={<Vauctions />} />
                <Route path="/Commission" element={<SubmitCommission />} />
                {/* <Route path="/data" element={<AuctionsList />} /> */}
                <Route path="/profile" element={<Profile />} />

                {/* Admin routes */}
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Adata" element={<AdminAuctions />} />
                <Route path="/ViewUsers" element={<ViewUsers />} />
                <Route path="/AdminCommission" element={<Commission />} />
                <Route path="/ViewAdmins" element={<ViewAdmins />} />
                <Route path="/AdminInsert" element={<AdminInsertPage />} />
                <Route path="/ViewPayment" element={<ViewPayments />} />


            </Routes>
            {renderFooter()} {/* Conditionally render Footer */}
        </Router>
    );
};

export default App;
