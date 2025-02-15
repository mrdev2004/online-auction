import React from "react";
import { NavLink, } from "react-router-dom";

const Navbar = () => {
    const role = localStorage.getItem("user"); // Get role from sessionStorage
    const role1 = localStorage.getItem("admin")
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        // Remove role from sessionStorage
        window.location.href = "/Login"; // Redirect to login page
    };

    return (
        <header className="header_area sticky-header">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light main_box">
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <NavLink className="navbar-brand logo_h" to="/">
                            <img src="img/logo.png" alt="Logo" />
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div
                            className="collapse navbar-collapse offset"
                            id="navbarSupportedContent"
                        >
                            <ul className="nav navbar-nav menu_nav ml-auto">
                                {role === "Auctioneer" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/"
                                                activeClassName="active"
                                                exact
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item submenu dropdown">
                                            <NavLink
                                                to="#"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Shop
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="nav-link"
                                                        to="/Category"
                                                    >
                                                        Shop Category
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Aauction">
                                                Add Auction
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Vauction">
                                                View Auction
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Commission">
                                                Submit Commission
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/Contact"
                                                activeClassName="active"
                                            >
                                                Contact
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/profile"
                                                activeClassName="active"
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {role === "Bidder" && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/"
                                                activeClassName="active"
                                                exact
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item submenu dropdown">
                                            <NavLink
                                                to="#"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Shop
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="nav-link"
                                                        to="/Category"
                                                    >
                                                        Shop Category
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="nav-link"
                                                        to="/Checkout"
                                                    >
                                                        Checkout
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="nav-link"
                                                        to="/Confirmation"
                                                    >
                                                        Confirmation
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink className="nav-link" to="/product">
                                                Bid on Auctions
                                            </NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/mybids">
                                                My Bids
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/Contact"
                                                activeClassName="active"
                                            >
                                                Contact
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {role1 === "Super Admin" && (
                                    <>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Dashboard">
                                                Dashboard
                                            </NavLink>
                                        </li>

                                        <li className="nav-item" >
                                            <NavLink
                                                className="nav-link text-dark"
                                                to="/ViewUsers"
                                            >
                                                Users
                                            </NavLink>
                                        </li>

                                        {/* Commissions Link */}
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link text-dark"
                                                to="/AdminCommission"

                                            >
                                                Commissions
                                            </NavLink>
                                        </li>

                                        {/* View Auctions Link */}
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link text-dark"
                                                to="/Adata"

                                            >
                                                View Auctions
                                            </NavLink>
                                        </li>


                                    </>
                                )}

                                {!role && !role1 ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/"
                                                activeClassName="active"
                                                exact
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/Login"
                                                activeClassName="active"
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/Register"
                                                activeClassName="active"
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/AboutUs"
                                                activeClassName="active"
                                            >
                                                About Us
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to="/Contact"
                                                activeClassName="active"
                                            >
                                                Contact
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn btn-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
