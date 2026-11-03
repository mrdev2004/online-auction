import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../CommonComponents/Style"; // Ensure this CSS file exists
import Style from "../CommonComponents/Style";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [orderNotes, setOrderNotes] = useState("");
    const location = useLocation();
    const { auctionData } = location.state || {}; // Extract auction data
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user1');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFirstName(parsedUser.name || "");
            setEmail(parsedUser.email || "");
            setPhone(parsedUser.contact || "");
        }

        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const shipping = 50; // Fixed shipping rate
    const commission = Math.floor(parseInt(auctionData?.bid_amount || 0) * 15 / 100);
    const totalAmount = Math.floor(parseInt(auctionData?.bid_amount || 0) + 50);
    const handlePayment = (event) => {
        event.preventDefault();

        if (!address.trim() || !/^[A-Za-z\s]+$/.test(address)) {
            alert("Please enter a valid address (letters only).");
            return;
        }

        if (!city.trim() || !/^[A-Za-z\s]+$/.test(city)) {
            alert("Please enter a valid city name (letters only).");
            return;
        }
        if (!zip.trim() || !/^\d{5,6}$/.test(zip)) {
            alert("Please enter a valid ZIP code.");
            return;
        }

        if (!orderNotes.trim() || !/^[A-Za-z\s]+$/.test(orderNotes)) {
            alert("Please enter valid order notes (letters only).");
            return;
        }


        const paymentData = {
            username: firstName,
            auction_id: auctionData?.id || "",
            email,
            phone_no: phone,
            address,
            city,
            zipcode: zip,
            order_notes: orderNotes || "No notes",
            auction_item_name: auctionData?.title || "Unknown",
            auctioneer_name: auctionData?.auctioneer || "Unknown",
            auction_item_amt: auctionData?.bid_amount || "0",
            commission_amt: commission.toString(),
            total: totalAmount.toString(),
        };

        // Razorpay options
        const options = {
            key: "rzp_test_kfbVnxx7qtGIYs", // Your Razorpay test/live key
            amount: totalAmount * 100, // Razorpay uses paisa (INR * 100)
            currency: "INR",
            name: "Auction Payment",
            description: "Payment for Auction Item",
            image: `http://localhost/demo/${auctionData?.image_path || "default.jpg"}`,
            handler: function (response) {
                console.log("Payment successful!", response);

                // Send payment details to backend after successful payment
                fetch("http://localhost/demo/processpayment.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...paymentData,
                        razorpay_payment_id: response.razorpay_payment_id, // Attach Razorpay Payment ID
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Server Response:", data);
                        if (data.status === "success") {
                            toast.success("Payment recorded successfully!");
                            const billingDetails = {
                                firstName,
                                lastName,
                                email,
                                address,
                                city,
                                zip,
                                orderNotes,
                            };

                            const orderDetails = auctionData
                                ? {
                                    auctionTitle: auctionData.title,
                                    auctioneer: auctionData.auctioneer,
                                    bidAmount: parseInt(auctionData.bid_amount),
                                    commission,
                                    shipping,
                                    totalAmount,
                                    highestBidder: auctionData.highest_bidder,
                                }
                                : {};

                            let checkoutData = {
                                billingDetails,
                                orderDetails,
                            };

                            sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData))
                            setTimeout(() => {
                                window.location.href = "/Confirmation";
                            }, 2000);
                        } else {
                            toast.error("Error: " + data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("Error sending data:", error);
                        toast.error("Failed to send payment data.");
                    });
            },
            prefill: {
                name: firstName,
                email: email,
                contact: phone,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };





    return (
        <>
            <section className="checkout_area section_gap">
                <Style />
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        {/* Checkout Form */}
                        <div className="col-lg-8 mt-5">
                            <div className="billing_details mt-5">
                                <h3>Billing Details</h3>
                                <form onSubmit={handlePayment}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="form-control"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}

                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}

                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                className="form-control"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}

                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="zip">Zip Code</label>
                                            <input
                                                type="text"
                                                id="zip"
                                                className="form-control"
                                                value={zip}
                                                onChange={(e) => setZip(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="orderNotes">Order Notes</label>
                                        <textarea
                                            id="orderNotes"
                                            className="form-control"
                                            value={orderNotes}
                                            onChange={(e) => setOrderNotes(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Pay Now</button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4" style={{ paddingTop: "50px" }}>
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <ul className="list">
                                    <li><a href="#">Product <span>Total</span></a></li>
                                    {auctionData && (
                                        <li key={auctionData.id}>
                                            <a href="#">
                                                <h3>{auctionData.title}</h3>
                                                <p><strong>Auctioneer:</strong> {auctionData.auctioneer}</p>
                                                <img
                                                    src={`http://localhost/demo/${auctionData.image_path}`}
                                                    alt={auctionData.title}
                                                    style={{ height: "200px", width: "200px" }}
                                                />
                                                <p><strong>Bid Amount:</strong> Rs. {auctionData.bid_amount}</p>
                                                <p><strong>Highest Bidder:</strong> {auctionData.highest_bidder}</p>
                                            </a >
                                        </li >
                                    )}
                                </ul >
                                <ul className="list list_2">
                                    <li><a href="#">Subtotal <span>Rs. {auctionData?.bid_amount}</span></a></li>
                                    <li><a href="#">Shipping <span>Rs. {shipping}</span></a></li>
                                    <li><a href="#">Total <span>Rs. {totalAmount}</span></a></li>
                                </ul>
                            </div >
                        </div >
                    </div >
                </div >
            </section >
        </>
    );
};

export default Checkout;
