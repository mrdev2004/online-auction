import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "../CommonComponents/Style";
import "./AdminLogin.css"; // Import custom CSS for styling

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isValidEmail(formData.username)) {
            toast.error("Invalid email format. Please enter a valid email.");
            return;
        }

        try {
            const response = await fetch("http://localhost/demo/Adminlogin.php", {
                method: "POST",
                body: JSON.stringify({
                    email: formData.username, // Change 'username' to 'email'
                    password: formData.password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            console.log("Response from server: ", result);

            if (result.success) {
                toast.success("Admin Login successful!");

                const role = "Super Admin";
                localStorage.setItem("admin", role);

                setTimeout(() => {
                    navigate("/Dashboard");
                    window.location.reload();
                }, 1000);
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <>
            <section className="admin-login-container">
                <ToastContainer position="top-center" />
                <Style />
                <div className="admin-login-box">
                    <div className="admin-login-header">
                        <h2>Admin Login</h2>
                        <p>Welcome to the Auction Admin Panel. Please log in to continue.</p>
                    </div>
                    <form className="admin-login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your email"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-button">
                            Log In
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AdminLogin;