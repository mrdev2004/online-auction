import React, { useState, useEffect } from "react";
import Style from "../CommonComponents/Style";

const Checkout = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [orderNotes, setOrderNotes] = useState("");

    // Fetch auctions data
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await fetch("http://localhost/demo/getmybids.php");
                const data = await response.json();
                if (response.ok) {
                    setAuctions(data.data); // assuming 'data' is the key containing the auction items
                } else {
                    setError(data.error || "Error loading data.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);

    // Handle form submission and store both form and auction data
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data
        const formData = {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            zip,
            orderNotes,
        };

        // Collect auction data (assuming we use the first auction in the list for now)
        const auctionData = auctions[0] ? {
            auctionTitle: auctions[0].title,
            auctioneer: auctions[0].auctioneer,
            bidAmount: auctions[0].bid_amount,
            highestBidder: auctions[0].highest_bidder,
        } : {};

        // Combine both form and auction data
        const checkoutData = {
            ...formData,
            auction: auctionData,
        };

        // Store the combined data in sessionStorage
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

        // Log the data to check if it's being stored correctly
        console.log("Form and auction data saved in sessionStorage:", checkoutData);
    };

    // If loading or error occurs
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate totals for the first auction
    const auction = auctions[0]; // Just take the first auction for now
    const subtotal = auction ? auction.bid_amount * 1 : 0; // Assuming quantity is 1
    const shipping = 50; // Flat shipping rate
    const total = subtotal + shipping;

    return (
        <>
            <Style />
            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="row">
                        {/* Checkout Form */}
                        <div className="col-lg-8">
                            <div className="billing_details">
                                <h3>Billing Details</h3>
                                <form onSubmit={handleSubmit}>
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
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="form-control"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
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
                                            required
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
                                            required
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
                                                required
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
                                                required
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
                        <div className="col-lg-4">
                            <div className="order_box">
                                <h2>Your Order</h2>
                                <ul className="list">
                                    <li>
                                        <a href="#">
                                            Product <span>Total</span>
                                        </a>
                                    </li>
                                    {/* Dynamically render product list for 1 auction */}
                                    {auction && (
                                        <li key={auction.id}>
                                            <a href="#">
                                                <h3>{auction.title}</h3>
                                                <p><strong>Auctioneer:</strong> {auction.auctioneer}</p>
                                                <p><strong>Bid Amount:</strong> Rs. {auction.bid_amount}</p>
                                                <p><strong>Highest Bidder:</strong> {auction.highest_bidder}</p>
                                                <span className="middle">x 1</span>{" "}
                                                <span className="last">Rs. {auction.bid_amount}</span>
                                            </a>
                                        </li>
                                    )}
                                </ul>

                                {/* Totals */}
                                <ul className="list list_2">
                                    <li>
                                        <a href="#">
                                            Subtotal <span>Rs. {subtotal}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Shipping <span>Flat rate: Rs. {shipping}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Total <span>Rs. {total}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
