import React, { useState, useEffect } from 'react';
import Style from './Style';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap is included

const SubmitCommission = () => {
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

  // Handle modal close
  const handleCloseModal = () => setShowModal(false);

  // Handle modal open and set current user
  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };


  // Handle update user
  const handleUpdate = async () => {
    if (currentUser) {
      try {
        const response = await fetch('http://localhost/demo/tmp2.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            update_id: currentUser.id,
            auction: currentUser.auction,
            commission: currentUser.commission,
            date: currentUser.date,
          }),
        });
        const data = await response.json();

        if (data.message === 'User updated successfully') {
          fetchUsersData(currentPage); // Refresh users after update
          setShowModal(false);
        } else {
          alert('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Handle page click for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: '900px',
        backgroundColor: '#f0f4f8',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '20px',
      }}
    >
      <Style />
      <h5 className="mt-5" style={{ color: '#2c3e50' }}>Search Bar</h5>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4 mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search by auction, commission, or date..."
          onChange={handleSearchChange}
          style={{
            border: '1px solid #ced4da',
            padding: '10px',
            borderRadius: '5px',
          }}
        />
      </form>

      <table className="table table-bordered" style={{ backgroundColor: '#ffffff' }}>
        <thead style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
          <tr>
            <th>ID</th>
            <th>Auction</th>
            <th>Commission</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={{ backgroundColor: '#ecf0f1', color: '#34495e' }}>
                <td>{user.id}</td>
                <td>{user.auction}</td>
                <td>{user.commission}</td>
                <td>{user.date}</td>
                <td>{user.status || 'Pending'}</td>
                <td>
                  {/* Actions like Edit/Delete */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center" style={{ backgroundColor: '#e74c3c', color: '#ffffff' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Commission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Auction</label>
            <input
              type="text"
              className="form-control"
              value={currentUser?.auction || ''}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, auction: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Commission</label>
            <input
              type="number"
              className="form-control"
              value={currentUser?.commission || ''}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, commission: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={currentUser?.date || ''}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, date: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              value={currentUser?.status || 'Pending'}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {/* Save changes logic */ }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default SubmitCommission;
