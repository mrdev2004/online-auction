import React, { useState } from 'react';
import axios from 'axios';
import Style from "./Style"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        profilePhoto: null,
        role: 'Auctioneer',
        terms: false,
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, profilePhoto: file });
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Validate form
    const validateForm = () => {
        const { name, email, password, contact, terms, profilePhoto } = formData;

        if (!name.trim()) return 'Full Name is required.';
        if (!/^[A-Za-z\s]+$/.test(name)) return 'Full Name must contain only letters.';
        if (!email.match(/^\S+@\S+\.\S+$/)) return 'Invalid email address.';

        // Password checks individually
        if (password.length < 6) return 'Password must be at least 6 characters.';
        if (!/^[A-Z]/.test(password)) return 'Password must start with a capital letter.';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
        if (!/\d/.test(password)) return 'Password must contain at least one number.';

        // Contact validation (exactly 10 digits, numeric only)
        if (!/^\d{10}$/.test(contact)) return 'Contact number must be exactly 10 digits and should not contain alphabets or special characters.';

        // Check if the file is uploaded
        if (!profilePhoto) return 'Please upload a profile photo.';

        if (!terms) return 'You must agree to the terms and conditions.';

        return null;
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validateForm();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('contact', formData.contact);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('terms', formData.terms);
            if (formData.profilePhoto) {
                formDataToSend.append('profilePhoto', formData.profilePhoto);
            }

            const response = await axios.post('http://localhost/demo/register.php', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Registration successful!');
                setTimeout(() => {
                    navigate("/Login");


                }, [1000]);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <section className="login_box_area section_gap" >
                <Style />
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6" style={{ marginTop: "100px" }}>
                            <div className="login_box_img">
                                <img className="img-fluid" src="img/login.jpg" alt="Login Illustration" />
                                <div className="hover">
                                    <h4>New to our website?</h4>
                                    <p>
                                        Discover the opportunities available for Auctioneers and Bidders.
                                    </p>
                                    <a className="primary-btn" href="/Login">
                                        Already Have an Account
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Create Your Account</h3>
                                <form
                                    className="row login_form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                >
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contact"
                                            placeholder="Contact Number"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="profilePhoto">Profile Photo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="profilePhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                        {photoPreview && (
                                            <img
                                                src={photoPreview}
                                                alt="Profile Preview"
                                                style={{
                                                    marginTop: '10px',
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="role">Role</label>
                                        <select
                                            className="form-control"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="Auctioneer">Auctioneer</option>
                                            <option value="Bidder">Bidder</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <input
                                                type="checkbox"
                                                name="terms"
                                                checked={formData.terms}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="terms">I agree to the terms and conditions</label>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="col-md-12 form-group">
                                            <p style={{ color: 'red' }}>{error}</p>
                                        </div>
                                    )}
                                    <div className="col-md-12 form-group">
                                        <button type="submit" className="primary-btn">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
