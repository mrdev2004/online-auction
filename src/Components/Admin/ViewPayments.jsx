import React, { useState, useEffect } from 'react';
import VerticalNavbar from '../CommonComponents/VerticalNavbar'; // Import the vertical navbar
import '../CommonComponents/VerticalNavbarCss.css'; // Import the custom CSS for the navbar
// import Style from "../CommonComponents/Style";

const ViewPayments = () => {
    const [payments, setPayments] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {
        fetchPaymentsData();
    }, []);

    const fetchPaymentsData = async () => {
        // Dummy data for payments
        const data = [
            { P_ID: 1, USERNAME: 'John Doe', AUCTION_ID: 'A123', EMAIL: 'john@example.com', PHONE_NO: '1234567890', ADDRESS: '123 Street, City', CITY: 'New York', ZIPCODE: '10001', ORDER_NOTES: 'Paid in full', AUCTION_ITEM_NAME: 'Item 1', AUCTIONEER_NAME: 'Auctioneer 1', AUCTION_ITEM_AMT: 100, COMMISSION_AMT: 10, TOTAL: 110, CREATED_AT: '2025-02-01' },
            { P_ID: 2, USERNAME: 'Jane Smith', AUCTION_ID: 'A124', EMAIL: 'jane@example.com', PHONE_NO: '2345678901', ADDRESS: '456 Avenue, City', CITY: 'Los Angeles', ZIPCODE: '90001', ORDER_NOTES: 'Paid in full', AUCTION_ITEM_NAME: 'Item 2', AUCTIONEER_NAME: 'Auctioneer 2', AUCTION_ITEM_AMT: 200, COMMISSION_AMT: 20, TOTAL: 220, CREATED_AT: '2025-02-02' },
            // Add more dummy data here
        ];

        setPayments(data);
        setTotalPayments(data.length);
        setFilteredPayments(data);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterPayments = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = payments.filter(
            (payment) =>
                payment.USERNAME.toLowerCase().includes(lowercasedQuery) ||
                payment.EMAIL.toLowerCase().includes(lowercasedQuery) ||
                payment.AUCTION_ITEM_NAME.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredPayments(filtered);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        filterPayments();
    };

    return (
        <div style={{ display: 'flex' }}>
            <VerticalNavbar /> {/* Include the Vertical Navbar */}

            {/* Main Content Area */}
            <div style={styles.container}>
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                    <input
                        type="text"
                        style={styles.searchInput}
                        placeholder="Search by username, email, or auction item..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>

                {/* Stats Card (Optional, depending on how you want to display total records) */}
                <div style={styles.statsContainer}>
                    <div style={{ ...styles.statsCard, backgroundColor: '#4e73df' }}>
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
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.P_ID} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{payment.P_ID}</td>
                                        <td style={styles.tableCell}>{payment.USERNAME}</td>
                                        <td style={styles.tableCell}>{payment.AUCTION_ID}</td>
                                        <td style={styles.tableCell}>{payment.EMAIL}</td>
                                        <td style={styles.tableCell}>{payment.PHONE_NO}</td>
                                        <td style={styles.tableCell}>{payment.ADDRESS}</td>
                                        <td style={styles.tableCell}>{payment.CITY}</td>
                                        <td style={styles.tableCell}>{payment.ZIPCODE}</td>
                                        <td style={styles.tableCell}>{payment.ORDER_NOTES}</td>
                                        <td style={styles.tableCell}>{payment.AUCTION_ITEM_NAME}</td>
                                        <td style={styles.tableCell}>{payment.AUCTIONEER_NAME}</td>
                                        <td style={styles.tableCell}>{payment.AUCTION_ITEM_AMT}</td>
                                        <td style={styles.tableCell}>{payment.COMMISSION_AMT}</td>
                                        <td style={styles.tableCell}>{payment.TOTAL}</td>
                                        <td style={styles.tableCell}>{payment.CREATED_AT}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="14" style={styles.noUsersCell}>
                                        No payments found.
                                    </td>
                                </tr>
                            )}
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
