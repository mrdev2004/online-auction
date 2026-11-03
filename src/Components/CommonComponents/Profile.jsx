import React, { useEffect, useState } from 'react';
import Style from "../CommonComponents/Style";
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        contact: '',
        role: ''
    });

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const response = await fetch('http://localhost/demo/ViewUsers.php');
            const data = await response.json();

            // Get user data from localStorage
            const storedUser = localStorage.getItem('user1');
            if (storedUser) {
                const loggedInUser = JSON.parse(storedUser);

                // Filter the user data based on the logged-in user's ID
                const currentUser = data.users.find(user => user.id === loggedInUser.id);

                if (currentUser) {
                    setUser(currentUser);
                    setUpdatedUser({
                        name: currentUser.name,
                        email: currentUser.email,
                        contact: currentUser.contact,
                        role: currentUser.role
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost/demo/userprofile.php?id=${user.id}`, {
                name: updatedUser.name,
                email: updatedUser.email,
                contact: updatedUser.contact,
                role: updatedUser.role
            });

            if (response.data.message === 'User updated successfully') {
                alert('Profile updated successfully');
                window.location.reload()
                setUser({
                    ...user,
                    ...updatedUser
                });
                setShowModal(false);
            } else {
                alert('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Error updating profile');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost/demo/userprofile.php?id=${user.id}`);

                if (response.data.message === 'User deleted successfully') {
                    alert('Profile deleted successfully');
                    window.location.reload()
                    localStorage.removeItem("user");
                    localStorage.removeItem('user1');
                    window.location.href = '/login'; // Redirect to login page or home
                } else {
                    alert('Error deleting profile');
                }
            } catch (error) {
                console.error('Error deleting profile', error);
                alert('Error deleting profile');
            }
        }
    };

    if (!user) {
        return <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>Loading...</div>;
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5 pt-5">
            <Style />
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        {/* Display profile photo */}
                        <div
                            className="card-image"
                            style={{
                                backgroundImage: `url(http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                                    user.profile_photo.replace("uploads/", "")
                                )})`,
                                width: "150px", // Set a fixed width for the image
                                height: "150px", // Set a fixed height for the image
                                borderRadius: "50%", // Circular image
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                marginBottom: "15px",
                            }}
                        ></div>
                        <span className="font-weight-bold" style={{ fontSize: "20px", marginBottom: "5px" }}>{user.name}</span>
                        <span className="text-black-50" style={{ fontSize: "14px" }}>{user.email}</span>
                        <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>Edit Profile</button>
                        <button className="btn btn-danger mt-2" onClick={handleDelete}>Delete Profile</button>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right" style={{ fontSize: "24px", fontWeight: "600" }}>Profile Settings</h4>

                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                {/* <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    ID OF THE {user.role}
                                </label> */}
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user.id || ""}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                        width: "21.3vw"
                                    }}
                                    disabled
                                /> */}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    Name of the {user.role}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user.name || ""}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px"
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    Email of the {user.role}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user.email}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px"
                                    }}
                                    disabled
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    Phone no of the {user.role}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user.contact}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px"
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    Role
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user.role}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        marginBottom: "20px"
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for editing profile */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={updatedUser.name}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                                    className="form-control"
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={updatedUser.email}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                                    className="form-control"
                                />
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    value={updatedUser.contact}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, contact: e.target.value })}
                                    className="form-control"
                                />
                                <label>Role:</label>
                                <input
                                    type="text"
                                    value={updatedUser.role}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
