import React, { useState, useEffect } from 'react';
import Style from "../CommonComponents/Style";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap is included
import { toast, ToastContainer } from 'react-toastify';

const Commission = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtered users
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10; // Number of users per page

  useEffect(() => {
    fetchUsersData(currentPage);
  }, [currentPage]);

  // Fetch users data with pagination
  const fetchUsersData = async (page) => {
    try {
      const response = await fetch(`http://localhost/demo/tmp2.php?page=${page + 1}&pageSize=${pageSize}`);
      const data = await response.json();
      console.log(data)
      setUsers(data.users);
      setFilteredUsers(data.users); // Initially, show all users
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value); // Filter users when search query changes
  };

  // Filter users based on the search query
  const filterUsers = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = users.filter((user) =>
      user.auction.toLowerCase().includes(lowercasedQuery) ||
      user.commission.toLowerCase().includes(lowercasedQuery) ||
      user.date.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered); // Set filtered users to state
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost/demo/tmp2.php?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUsersData(currentPage); // Refresh user list after deletion
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Handle commission approval update
  const handleApproval = async (id, currentStatus, toast_text) => {


    try {
      const response = await fetch('http://localhost/demo/tmp2.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approval_id: id,
          approval_status: currentStatus,
        }),
      });

      const data = await response.json();
      if (data.message === 'Approval status updated') {
        toast.success(toast_text)
        fetchUsersData(); // Refresh data
      } else {
        alert('Failed to update approval status');
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Main Content Area */}
      <ToastContainer />
      <div style={styles.container}>
        {/* Search Bar */}
        <form onSubmit={(e) => e.preventDefault()} style={styles.searchForm}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search by auction, commission, or date..."
            value={searchQuery}
            onChange={handleSearchChange} // Handle search change
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>



        {/* Users Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Auction</th>
                <th style={styles.tableHeader}>Commission</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Payment Status</th>

                <th style={styles.tableHeader}>Approval Status</th>
                <th style={styles.tableHeader}>Approval Status Actions</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{user.id}</td>
                    <td style={styles.tableCell}>{user.auction}</td>
                    <td style={styles.tableCell}>{user.commission}</td>
                    <td style={styles.tableCell}>{user.date}</td>
                    <td style={styles.tableCell}>{user.approval_status == "" ? "Not Received" : user.approval_status}</td>
                    <td style={styles.tableCell}>{user.payment_status == "" ? "Not Paid" : user.payment_status}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => handleApproval(user.id, "Received", "Commission Approved")}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Yes
                      </button>

                      <button
                        onClick={() => handleApproval(user.id, "Not Received", "Commission Not Approved")}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        No
                      </button>

                    </td>
                    <td style={styles.tableCell}>
                      <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noUsersCell}>
                    No data found.
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

export default Commission;
