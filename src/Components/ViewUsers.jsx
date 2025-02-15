import React, { useState, useEffect } from 'react';
import Style from './Style';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [adminUsers, setAdminUsers] = useState(0);
  const [bidderUsers, setBidderUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users and statistics when the component mounts
  useEffect(() => {
    fetchUsersData();  // Initial fetch when the component mounts
  }, []);

  // Fetch users and statistics from the backend
  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost/demo/ViewUsers.php'); // Fetch all users
      const data = await response.json();
      // Set the data to state
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setAdminUsers(data.adminUsers);
      setBidderUsers(data.bidderUsers);
      setFilteredUsers(data.users); // Initially, show all users
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  // Handle user search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filterUsers = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery) ||
      user.role.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };

  // Handle user search submit (trigger filterUsers)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterUsers(); // Trigger filtering when the search form is submitted
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost/demo/ViewUsers.php?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchUsersData(); // Refresh user list after deletion
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <Style />
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4 mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or role..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="stats-card" style={{ backgroundColor: 'black', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h5 style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>Total Users</h5>
            <p style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>{totalUsers}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stats-card" style={{ backgroundColor: 'black', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h5 style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>Auctioneer Users</h5>
            <p style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>{adminUsers}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stats-card" style={{ backgroundColor: "black", padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h5 style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>Bidder Users</h5>
            <p style={{ fontWeight: "900", fontSize: "15px", color: "gold" }}>{bidderUsers}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.contact}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
