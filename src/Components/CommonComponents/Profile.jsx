import React, { useEffect, useState } from 'react';
import Style from "../CommonComponents/Style";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = localStorage.getItem('user1');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>Loading...</div>;
    }
    /**
     *
contact
: 
"8000054035"
email
: 
"dev123@gmail.com"
id
: 
"10"
name
: 
"dev"
profile_photo
: 
"uploads/675bc7c2bcb24_c2.jpg"
role
: 
"Auctioneer"
terms
: 
"1"
     */

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
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right" style={{ fontSize: "24px", fontWeight: "600" }}>Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    ID OF THE {user.role}
                                </label>
                                <input
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
                                />
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;
