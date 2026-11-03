import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/CommonComponents/Navbar';
import VerticalNavbar from './Components/CommonComponents/VerticalNavbar';
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
import SingleData from './Components/Bidder/SingleData';
import MyBids from './Components/Bidder/MyBids';
import AdminAuctions from './Components/Admin/AdminAuctions';
import Profile from './Components/CommonComponents/Profile';
import ViewAdmins from './Components/Admin/ViewAdmins';
import AdminInsertPage from './Components/Admin/AdminInsertPage';
import ViewPayments from './Components/Admin/ViewPayments';
import RazorpayPayment from './Components/CommonComponents/RazorPay';
import AdminLogin from './Components/Admin/AdminLogin';
import Feedback from './Components/CommonComponents/Feedback';
import ViewFeedback from './Components/Admin/ViewFeedback';

// Protected Route for Bidders & Auctioneers
const ProtectedUserRoute = ({ element, allowedRoles }) => {
    const userRole = localStorage.getItem("user"); // Fetch role

    if (!userRole) {
        return <Navigate to="/Login" replace />; // Redirect to Login if not logged in
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/Login" replace />; // Redirect unauthorized users
    }

    return element; // Allow access
};

// Protected Route for Admins
const ProtectedAdminRoute = ({ element, allowedRoles }) => {
    const userRole = localStorage.getItem("admin"); // Fetch role

    if (!userRole) {
        return <Navigate to="/AdminLogin" replace />; // Redirect to Admin Login if not logged in
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/AdminLogin" replace />; // Redirect unauthorized users
    }

    return element; // Allow access
};

const App = () => {
    const location = useLocation();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('admin') // Fetch user role
        setUserRole(role);
    }, []);

    const isAdminLoginPage = location.pathname === '/AdminLogin';

    return (
        <>
            {!isAdminLoginPage && (userRole === 'Super Admin' ? <VerticalNavbar /> : <Navbar />)}

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Feedback" element={<Feedback />} />

                <Route path="/AboutUs" element={<AboutUs />} />

                {/* Protected Routes for Bidders & Auctioneers */}
                <Route path="/Category" element={<ProtectedUserRoute element={<ShopData />} allowedRoles={["Bidder", "Auctioneer"]} />} />
                <Route path="/Checkout" element={<ProtectedUserRoute element={<Checkout />} allowedRoles={["Bidder", "Auctioneer"]} />} />
                <Route path="/Confirmation" element={<ProtectedUserRoute element={<Confrim />} allowedRoles={["Bidder", "Auctioneer"]} />} />
                <Route path="/mybids" element={<ProtectedUserRoute element={<MyBids />} allowedRoles={["Bidder", "Auctioneer"]} />} />
                <Route path="/product" element={<ProtectedUserRoute element={<SingleData />} allowedRoles={["Bidder", "Auctioneer"]} />} />
                <Route path="/Aauction" element={<ProtectedUserRoute element={<AddAuction />} allowedRoles={["Auctioneer"]} />} />
                <Route path="/Vauction" element={<ProtectedUserRoute element={<Vauctions />} allowedRoles={["Auctioneer"]} />} />
                <Route path="/Commission" element={<ProtectedUserRoute element={<SubmitCommission />} allowedRoles={["Auctioneer"]} />} />
                <Route path="/profile" element={<ProtectedUserRoute element={<Profile />} allowedRoles={["Bidder", "Auctioneer"]} />} />

                {/* Protected Admin Routes */}
                <Route path="/Dashboard" element={<ProtectedAdminRoute element={<Dashboard />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/Adata" element={<ProtectedAdminRoute element={<AdminAuctions />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/ViewUsers" element={<ProtectedAdminRoute element={<ViewUsers />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/AdminCommission" element={<ProtectedAdminRoute element={<Commission />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/ViewAdmins" element={<ProtectedAdminRoute element={<ViewAdmins />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/AdminInsert" element={<ProtectedAdminRoute element={<AdminInsertPage />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/ViewPayment" element={<ProtectedAdminRoute element={<ViewPayments />} allowedRoles={["Admin", "Super Admin"]} />} />
                <Route path="/ViewFeedback" element={<ProtectedAdminRoute element={<ViewFeedback />} allowedRoles={["Admin", "Super Admin"]} />} />

                0                {/* Admin Login Page */}
                < Route path="/AdminLogin" element={< AdminLogin />} />

                {/* Razorpay Payment Route */}
                <Route path='/razor' element={<ProtectedUserRoute element={<RazorpayPayment />} allowedRoles={["Bidder", "Auctioneer"]} />} />
            </Routes>

            {!isAdminLoginPage && (userRole !== 'Super Admin' && <Footer />)}
        </>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;
