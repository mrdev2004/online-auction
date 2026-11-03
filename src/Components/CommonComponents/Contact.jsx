import React, { useEffect, useState } from 'react';

const Contact = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
        if (!formData.message.trim()) newErrors.message = "Message is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            alert('Your message has been sent!');
            console.log('Form Data:', formData);
            // You can also send this data to a backend here

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setErrors({});
        }
    };
    useEffect(() => {
        // Check if Geolocation is available
        if (navigator.geolocation) {
            // Get the user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting the user's location:", error);
                }
            );
        } else {
            console.error('Geolocation is not available in this browser.');
        }
    }, [location]);
    console.log(location.latitude, location.longitude);

    const mapSrc = location.latitude && location.longitude
        ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.725792828543!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6504cc38d5%3A0x24a2b1bd774747a4!2sSurat%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1688445606938!5m2!1sen!2sus`
        : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.725792828543!2d72.8042799152441!3d21.170240685928795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6504cc38d5%3A0x24a2b1bd774747a4!2sSurat%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1688445606938!5m2!1sen!2sus';

    return (
        <>
            {/* Mobile Specific Meta */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {/* Favicon */}
            <link rel="shortcut icon" href="img/fav.png" />
            {/* Meta Information */}
            <meta name="author" content="CodePixar" />
            <meta charSet="UTF-8" />
            <title>Karma Shop</title>
            {/* CSS */}
            <link rel="stylesheet" href="css/bootstrap.css" />
            <link rel="stylesheet" href="css/linearicons.css" />
            <link rel="stylesheet" href="css/owl.carousel.css" />
            <link rel="stylesheet" href="css/themify-icons.css" />
            <link rel="stylesheet" href="css/font-awesome.min.css" />
            <link rel="stylesheet" href="css/nice-select.css" />
            <link rel="stylesheet" href="css/nouislider.min.css" />
            <link rel="stylesheet" href="css/bootstrap.css" />
            <link rel="stylesheet" href="css/main.css" />

            {/* Banner Area */}
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Contact Us</h1>
                            <nav className="d-flex align-items-center">
                                <a href="/">Home</a>
                                <span className="lnr lnr-arrow-right" />
                                <a href="/Contact">Contact</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Area */}
            <section className="contact_area section_gap_bottom">
                <div className="container">
                    {/* Google Map */}
                    <div className="mapBox">
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="contact_info">
                                <div className="info_item">
                                    <i className="lnr lnr-home" />
                                    <h6>Surat, Gujarat, India</h6>
                                    <p>Known as the Diamond City</p>
                                </div>
                                <div className="info_item">
                                    <i className="lnr lnr-phone-handset" />
                                    <h6>
                                        <a href="tel:+910000000000">+91 88490 46086</a>
                                    </h6>
                                    <p>Mon to Fri 9am to 6 pm</p>
                                </div>
                                <div className="info_item">
                                    <i className="lnr lnr-envelope" />
                                    <h6>
                                        <a href="mailto:support@karmashop.com">support@bidrise.com</a>
                                    </h6>
                                    <p>Send us your query anytime!</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-9">
                            <form
                                className="row contact_form"
                                id="contactForm"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="subject"
                                            placeholder="Enter Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        {errors.subject && <small className="text-danger">{errors.subject}</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            name="message"
                                            rows="4"
                                            placeholder="Enter Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                        {errors.message && <small className="text-danger">{errors.message}</small>}
                                    </div>
                                </div>
                                <div className="col-md-12 text-right">
                                    <button type="submit" className="primary-btn">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
