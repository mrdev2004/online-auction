import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Assuming you're using React Router for routing

const VerticalNavbar = () => {
    const role = localStorage.getItem("user"); // Get role from localStorage
    const role1 = localStorage.getItem("admin"); // Super Admin role
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        window.location.href = "/Login"; // Redirect to login page
    };

    return (
        <div className="dashboard">
            <div className="dashboard-nav">
                <header>
                    <a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a>
                    <a href="#" className="brand-logo">
                        <span style={{ fontWeight: "800", letterSpacing: '2px' }}>BIDRISE</span>
                    </a>
                </header>
                <nav className="dashboard-nav-list">
                    {/* Home Link */}


                    {/* Dashboard Link */}
                    <NavLink to="/Dashboard" className="dashboard-nav-item">
                        <i className="fas fa-gavel"></i> Dashboard
                    </NavLink>

                    {/* Users Link */}
                    {role1 === "Super Admin" && (
                        <div className="dashboard-nav-dropdown">
                            <a href="ViewUsers" className="dashboard-nav-item ">
                                <i className="fas fa-gavel"></i> Manage Users
                            </a>
                        </div>
                    )}


                    {/* Commissions Link */}
                    {role1 === "Super Admin" && (
                        <NavLink to="/AdminCommission" className="dashboard-nav-item">
                            <i className="fas fa-gavel"></i> Manage Commissions
                        </NavLink>
                    )}

                    {/* View Auctions Link */}
                    {role1 === "Super Admin" && (
                        <NavLink to="/Adata" className="dashboard-nav-item">
                            <i className="fas fa-gavel"></i> View Auctions
                        </NavLink>
                    )}

                    {/* Settings and Profile Links */}
                    <NavLink to="/ViewAdmins" className="dashboard-nav-item">
                        <i className="fas fa-cogs"></i> View Admins
                    </NavLink>
                    <NavLink to="/AdminInsert   " className="dashboard-nav-item">
                        <i className="fas fa-user"></i> Admin Insert Page
                    </NavLink>
                    <NavLink to="/ViewPayment" className="dashboard-nav-item">
                        <i className="fas fa-user"></i> Payment Record Page
                    </NavLink>
                    <div className="nav-item-divider"></div>

                    {/* Logout Link */}
                    <a href="#!" onClick={handleLogout} className="dashboard-nav-item">
                        <i className="fas fa-gavel"></i> Logout
                    </a>
                </nav>
            </div>


        </div>
    );
};

export default VerticalNavbar;
