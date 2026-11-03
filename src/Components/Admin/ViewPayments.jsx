import React, { useState, useEffect } from "react";
import VerticalNavbar from "../CommonComponents/VerticalNavbar";
import "../CommonComponents/VerticalNavbarCss.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Import for animations

const ViewPayments = () => {
    const [payments, setPayments] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {

        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        fetchPaymentsData();
    }, []);

    const fetchPaymentsData = async () => {
        try {
            const response = await axios.get("http://localhost/demo/ViewPayments.php");

            console.log("API Response:", response); // Debugging log

            if (response.data && response.data.payments) {
                setPayments(response.data.payments);
                setTotalPayments(response.data.totalPayments);
                setFilteredPayments(response.data.payments);
            } else {
                console.error("Invalid API Response Structure:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = payments.filter(payment =>
            payment.username.toLowerCase().includes(query) ||
            payment.email.toLowerCase().includes(query) ||
            payment.auction_item_name.toLowerCase().includes(query)
        );
        setFilteredPayments(filtered);
    };

    return (
        <div style={{ display: "flex" }}>
            <VerticalNavbar />

            {/* Main Content Area */}
            <div style={styles.container}>
                {/* Search Bar */}
                <div style={styles.searchForm}>
                    <input
                        type="text"
                        style={styles.searchInput}
                        placeholder="Search by username, email, or auction item..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Stats Card */}
                <div style={styles.statsContainer}>
                    <div style={{ ...styles.statsCard, backgroundColor: "#4e73df" }}>
                        <h5 style={styles.statsTitle}>Total Payments</h5>
                        <p style={styles.statsValue}>{totalPayments}</p>
                    </div>
                </div>

                {/* Payments Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.tableHeader}>P_ID</th>
                                <th style={styles.tableHeader}>USERNAME</th>
                                <th style={styles.tableHeader}>AUCTION_ID</th>
                                <th style={styles.tableHeader}>EMAIL</th>
                                <th style={styles.tableHeader}>PHONE_NO</th>
                                <th style={styles.tableHeader}>ADDRESS</th>
                                <th style={styles.tableHeader}>CITY</th>
                                <th style={styles.tableHeader}>ZIPCODE</th>
                                <th style={styles.tableHeader}>ORDER_NOTES</th>
                                <th style={styles.tableHeader}>AUCTION_ITEM_NAME</th>
                                <th style={styles.tableHeader}>AUCTIONEER_NAME</th>
                                <th style={styles.tableHeader}>AUCTION_ITEM_AMT</th>
                                <th style={styles.tableHeader}>COMMISSION_AMT</th>
                                <th style={styles.tableHeader}>TOTAL</th>
                                <th style={styles.tableHeader}>CREATED_AT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment) => (
                                        <motion.tr
                                            key={payment.p_id}
                                            style={styles.tableRow}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td style={styles.tableCell}>{payment.p_id}</td>
                                            <td style={styles.tableCell}>{payment.username}</td>
                                            <td style={styles.tableCell}>{payment.auction_id}</td>
                                            <td style={styles.tableCell}>{payment.email}</td>
                                            <td style={styles.tableCell}>{payment.phone_no}</td>
                                            <td style={styles.tableCell}>{payment.address}</td>
                                            <td style={styles.tableCell}>{payment.city}</td>
                                            <td style={styles.tableCell}>{payment.zipcode}</td>
                                            <td style={styles.tableCell}>{payment.order_notes}</td>
                                            <td style={styles.tableCell}>{payment.auction_item_name}</td>
                                            <td style={styles.tableCell}>{payment.auctioneer_name}</td>
                                            <td style={styles.tableCell}>{payment.auction_item_amt}</td>
                                            <td style={styles.tableCell}>{payment.commission_amt}</td>
                                            <td style={styles.tableCell}>{payment.total}</td>
                                            <td style={styles.tableCell}>{payment.created_at}</td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan="15" style={styles.noUsersCell}>
                                            No payments found.
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    container: {
        marginLeft: '270px',
        padding: '20px',
        width: 'calc(100% - 270px)',
        backgroundColor: '#f8f9fc',
        minHeight: '100vh',
    },
    searchForm: {
        display: 'flex',
        marginBottom: '20px',
    },
    searchInput: {
        flex: '1',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        outline: 'none',
    },
    searchButton: {
        padding: '10px 20px',
        marginLeft: '10px',
        backgroundColor: '#4e73df',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    statsContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
    },
    statsCard: {
        flex: '1',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
        textAlign: 'center',
        color: '#fff',
    },
    statsTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '10px',
    },
    statsValue: {
        fontSize: '24px',
        fontWeight: '700',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
        overflow: 'scroll',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',

    },
    tableHeaderRow: {
        backgroundColor: '#4e73df',
    },
    tableHeader: {
        padding: '15px',
        textAlign: 'left',
        color: '#fff',
        fontWeight: '600',
    },
    tableRow: {
        borderBottom: '1px solid #e3e6f0',
        transition: 'background-color 0.3s ease',
    },
    tableRowHover: {
        backgroundColor: '#f8f9fc',
    },
    tableCell: {
        padding: '15px',
        color: '#5a5c69',
    },
    noUsersCell: {
        textAlign: 'center',
        padding: '20px',
        color: '#5a5c69',
    },
};

export default ViewPayments;
