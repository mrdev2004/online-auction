import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost/demo/ViewUsers.php');
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const handleApprovalChange = async (userId, status, toast_text) => {

    try {
      const response = await fetch('http://localhost/demo/ViewUsers.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          user_status: status,
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        toast.success(toast_text)
        fetchUsersData();
      } else {
        alert('Error updating user status: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
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
    <div style={styles.container}>
      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        {/* Example stat cards */}
        <div style={{ ...styles.statsCard, backgroundColor: '#4e73df' }}>
          <h5 style={styles.statsTitle}>Total Users</h5>
          <p style={styles.statsValue}>{users.length}</p>
        </div>
        {/* You can add more stats similar to the example above */}
      </div>
      <ToastContainer />
      <h2 style={styles.heading}>Users </h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Role</th>
            <th style={styles.tableHeader}>Contact</th>
            <th style={styles.tableHeader}>User_Status</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{user.id}</td>
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.role}</td>

              <td style={styles.tableCell}>{user.contact}</td>
              <td style={styles.tableCell}>{user.user_status == "" ? "Unblocked" : user.user_status}</td>

              <td style={styles.tableCell}>
                <button
                  onClick={() => handleApprovalChange(user.id, 'Unblocked', 'User Unblocked')}
                  style={{ ...styles.button, backgroundColor: '#1cc88a' }}
                >
                  Unblock
                </button>
                <button
                  onClick={() => handleApprovalChange(user.id, 'Blocked', 'User Blocked')}
                  style={{ ...styles.button, backgroundColor: '#e74a3b' }}
                >
                  Block
                </button>

              </td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ ...styles.button, backgroundColor: '#e74a3b' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fc',
    minHeight: '100vh',
    paddingLeft: '20%'
  },

  statsCard: {
    flex: '1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    textAlign: 'center',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4e73df',
    marginTop: "10px"
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    overflow: 'hidden',

  },
  statsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
    color: "white",
    textAlign: "center",
  },
  statsValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: "white",
    textAlign: "center",
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
  button: {
    padding: '8px 12px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '14px',
  },
};

export default ViewUsers;
