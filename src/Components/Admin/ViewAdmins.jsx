import React, { useState, useEffect } from 'react';


const ViewAdmins = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [adminUsers, setAdminUsers] = useState(0);
    const [bidderUsers, setBidderUsers] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await fetch('http://localhost/demo/ViewUsers.php');
            const data = await response.json();
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setAdminUsers(data.adminUsers);
            setBidderUsers(data.bidderUsers);
            setFilteredUsers(data.users);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterUsers = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(lowercasedQuery) ||
                user.email.toLowerCase().includes(lowercasedQuery) ||
                user.role.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredUsers(filtered);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        filterUsers();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost/demo/ViewUsers.php?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchUsersData();
                } else {
                    console.error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div style={{ display: 'flex' }}>

            {/* Main Content Area */}
            <div style={styles.container}>
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                    <input
                        type="text"
                        style={styles.searchInput}
                        placeholder="Search by name, email, or role..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>

                {/* Stats Cards */}
                <div style={styles.statsContainer}>
                    <div style={{ ...styles.statsCard, backgroundColor: '#4e73df' }}>
                        <h5 style={styles.statsTitle}>Total Users</h5>
                        <p style={styles.statsValue}>{totalUsers}</p>
                    </div>
                    <div style={{ ...styles.statsCard, backgroundColor: '#1cc88a' }}>
                        <h5 style={styles.statsTitle}>Auctioneer Users</h5>
                        <p style={styles.statsValue}>{adminUsers}</p>
                    </div>
                    <div style={{ ...styles.statsCard, backgroundColor: '#f6c23e' }}>
                        <h5 style={styles.statsTitle}>Bidder Users</h5>
                        <p style={styles.statsValue}>{bidderUsers}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Name</th>
                                <th style={styles.tableHeader}>Email</th>
                                <th style={styles.tableHeader}>Role</th>
                                <th style={styles.tableHeader}>Contact</th>
                                <th style={styles.tableHeader}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{user.id}</td>
                                        <td style={styles.tableCell}>{user.name}</td>
                                        <td style={styles.tableCell}>{user.email}</td>
                                        <td style={styles.tableCell}>{user.role}</td>
                                        <td style={styles.tableCell}>{user.contact}</td>
                                        <td style={styles.tableCell}>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={styles.noUsersCell}>
                                        No users found.
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
        overflow: 'hidden',
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
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#e74a3b',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default ViewAdmins;