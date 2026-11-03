import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ResponsiveNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    // Color scheme
    const colors = {
        primary: "#3a86ff", // Vibrant blue
        primaryHover: "#2563eb",
        secondary: "#ff006e", // Pink accent
        text: "#ffffff", // White text for contrast against colored background
        darkText: "#2b2d42", // Dark text for other elements
        lightText: "#f8f9fa", // Light text for subtle elements
        navBackground: "linear-gradient(90deg, #4158D0 0%, #C850C0 100%)", // Gradient background
        background: "#ffffff", // White page background
        shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    };

    // Check if screen is mobile on mount and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Close menu when changing from mobile to desktop
    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);
    const role = localStorage.getItem("user"); // Get role from localStorage
    const role1 = localStorage.getItem("admin"); // Get admin role from localStorage

    const handleLogout = () => {
        localStorage.removeItem("user1");
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        window.location.href = "/Login"; // Redirect to login page
    }; ``
    const navStyles = {
        nav: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            background: colors.navBackground,
            boxShadow: colors.shadow,
            zIndex: 50
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        },
        navFlex: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70px'
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        logoText: {
            marginLeft: '10px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: colors.text
        },
        desktopLinks: {
            display: isMobile ? 'none' : 'block'
        },
        linksContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        link: {
            color: colors.text,
            padding: '5px 5px',
            borderRadius: '4px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            textAlign: "center",
            width: "140px"
        },
        linkHover: {
            textShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
        },
        registerBtn: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: colors.text,
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            cursor: 'pointer'
        },
        registerBtnHover: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.8)'
        },
        hamburgerContainer: {
            display: isMobile ? 'flex' : 'none',
            alignItems: 'center'
        },
        hamburgerButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: colors.text,
            border: 'none',
            cursor: 'pointer'
        },
        mobileMenu: {
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out',
            maxHeight: isOpen ? '300px' : '0',
            background: colors.navBackground,
            boxShadow: isOpen ? 'inset 0 2px 4px rgba(0, 0, 0, 0.15)' : 'none'
        },
        mobileMenuLinks: {
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        mobileLink: {
            color: colors.text,
            padding: '10px 12px',
            borderRadius: '4px',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'block',
            transition: 'all 0.3s ease'
        },
        mobileRegisterBtn: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: colors.text,
            padding: '12px 20px',
            borderRadius: '6px',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '8px',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            width: 'fit-content'
        }
    };

    return (
        <nav style={navStyles.nav}>
            <div style={navStyles.container}>
                <div style={navStyles.navFlex}>
                    {/* Logo */}
                    <div style={navStyles.logoContainer}>

                        <span style={navStyles.logoText}>BIDRISE</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div style={navStyles.desktopLinks}>
                        <div style={navStyles.linksContainer}>
                            {role === "Auctioneer" && (
                                <>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/" activeClassName="active" exact>
                                            Home
                                        </NavLink>
                                    </a>


                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Aauction" activeClassName="active">
                                            Add Auction
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Vauction" activeClassName="active">
                                            View Auction
                                        </NavLink>
                                    </a>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Commission" activeClassName="active">
                                            Submit Commission
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Contact" activeClassName="active">
                                            Contact
                                        </NavLink>
                                    </a>

                                    {/* <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/profile" activeClassName="active">
                                            Profile
                                        </NavLink>
                                    </a> */}
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Feedback" activeClassName="active">
                                            Feedback
                                        </NavLink>
                                    </a>
                                </>
                            )}
                            {role === "Bidder" && (
                                <>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/" activeClassName="active" exact>
                                            Home
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            to="/Category"
                                            className="nav-link     "
                                            data-toggle="dropdown"
                                            role="button"
                                        // aria-haspopup="true"
                                        // aria-expanded="false"
                                        >
                                            Shop
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/mybids" activeClassName="active">
                                            My Bids
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Contact" activeClassName="active">
                                            Contact
                                        </NavLink>
                                    </a>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/AboutUs"
                                            activeClassName="active"
                                        >
                                            About Us
                                        </NavLink>
                                    </a>
                                    {/* <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/profile" activeClassName="active">
                                            Profile
                                        </NavLink>
                                    </a> */}
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink className="nav-link" to="/Feedback" activeClassName="active">
                                            Feedback
                                        </NavLink>
                                    </a>
                                </>
                            )}
                            {!role && !role1 ? (
                                <>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/"
                                            activeClassName="active"
                                            exact
                                        >
                                            Home
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/Login"
                                            activeClassName="active"
                                        >
                                            Login
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/Register"
                                            activeClassName="active"
                                        >
                                            Register
                                        </NavLink>
                                    </a>

                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/AboutUs"
                                            activeClassName="active"
                                        >
                                            About Us
                                        </NavLink>
                                    </a>
                                    <a
                                        style={navStyles.link}
                                        onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                        onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to="/Contact"
                                            activeClassName="active"
                                        >
                                            Contact
                                        </NavLink>
                                    </a>
                                </>
                            ) : (
                                <a
                                    style={navStyles.link}
                                    onMouseOver={(e) => e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)'}
                                    onMouseOut={(e) => e.target.style.textShadow = 'none'}
                                >
                                    <button
                                        className="nav-link "
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </a>

                            )}


                        </div>
                    </div>

                    {/* <div style={navStyles.hamburgerContainer}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={navStyles.hamburgerButton}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                            aria-expanded={isOpen}
                        >
                            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>
                                Open main menu
                            </span>
                            {!isOpen ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div> */}
                </div>
            </div>
            {/* 
            <div style={navStyles.mobileMenu}>
                <div style={navStyles.mobileMenuLinks}>
                    <a
                        href="#"
                        style={navStyles.mobileLink}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        style={navStyles.mobileLink}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        About
                    </a>
                    <a
                        href="#"
                        style={navStyles.mobileLink}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Contact
                    </a>
                    <a
                        href="#"
                        style={navStyles.mobileLink}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Login
                    </a>
                    <a
                        href="#"
                        style={navStyles.mobileRegisterBtn}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                        }}
                    >
                        Register
                    </a>
                </div>
            </div> */}
        </nav >
    );
};

export default ResponsiveNavbar;