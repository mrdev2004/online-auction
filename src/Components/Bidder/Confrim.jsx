import React from "react";
import { jsPDF } from "jspdf";
import Style from "../CommonComponents/Style";

const Confirm = () => {
    // Retrieve form data and auction data from sessionStorage
    const checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"));

    // Handle case where no data is present
    if (!checkoutData) {
        return <div>No order data found. Please go back and complete the checkout process.</div>;
    }

    // Destructure the checkoutData
    const { billingDetails, orderDetails = {} } = checkoutData;
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zip,
        orderNotes
    } = billingDetails || {};

    const {
        auctionTitle,
        auctioneer,
        bidAmount,
        highestBidder,
        commission,
        shipping,
        totalAmount,
        image
    } = orderDetails || {};

    // Function to generate PDF invoice
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Title
        doc.text("Order Confirmation", 20, 20);

        // Order Info
        doc.text(`Order Number: 60235`, 20, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
        doc.text(`Total: Rs. ${totalAmount}`, 20, 60);
        doc.text(`Payment Method: Razor Pay`, 20, 70);

        // Billing Address
        doc.text("Billing Address:", 20, 90);
        doc.text(`First Name: ${firstName}`, 20, 100);
        doc.text(`Last Name: ${lastName}`, 20, 110);
        doc.text(`Email: ${email}`, 20, 120);
        doc.text(`Phone: ${phone}`, 20, 130);
        doc.text(`Street: ${address}`, 20, 140);
        doc.text(`City: ${city}`, 20, 150);
        doc.text(`Zip Code: ${zip}`, 20, 160);
        doc.text(`Order Notes: ${orderNotes || "N/A"}`, 20, 170);

        // Shipping Address
        doc.text("Shipping Address:", 20, 190);
        doc.text(`Street: ${address}`, 20, 200);
        doc.text(`City: ${city}`, 20, 210);
        doc.text(`Postcode: ${zip}`, 20, 230);

        // Auction Details
        doc.text("Auction Details:", 20, 250);
        doc.text(`Auction Title: ${auctionTitle}`, 20, 260);
        doc.text(`Auctioneer: ${auctioneer}`, 20, 270);
        doc.text(`Highest Bidder: ${highestBidder}`, 20, 280);
        doc.text(`Bid Amount: Rs. ${bidAmount}`, 20, 290);
        doc.text(`Shipping: Rs. ${shipping}`, 20, 310);
        doc.text(`Total Amount: Rs. ${totalAmount}`, 20, 320);

        // Save PDF
        doc.save("order_confirmation.pdf");
    };

    return (
        <section className="order_details section_gap">
            <Style />
            <div className="container">
                <h3 className="title_confirmation">Thank you. Your order has been received.</h3>

                <div className="row order_d_inner">
                    {/* Order Info */}
                    <div className="col-lg-4">
                        <div className="details_item">
                            <h4>Order Info</h4>
                            <ul className="list">
                                <li><span>Order Number:</span> 60235</li>
                                <li><span>Date:</span> {new Date().toLocaleDateString()}</li>
                                <li><span>Total:</span> Rs. {totalAmount}</li>
                                <li><span>Payment Method:</span> Razor Pay</li>
                            </ul>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="col-lg-4">
                        <div className="details_item">
                            <h4>Billing Address</h4>
                            <ul className="list">
                                <li><span>First Name:</span> {firstName}</li>

                                <li><span>Email:</span> {email}</li>
                                <li><span>Phone:</span> {phone}</li>
                                <li><span>Street:</span> {address}</li>
                                <li><span>City:</span> {city}</li>
                                <li><span>Zip Code:</span> {zip}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="col-lg-4">
                        <div className="details_item">
                            <h4>Shipping Address</h4>
                            <ul className="list">
                                <li><span>Street:</span> {address}</li>
                                <li><span>City:</span> {city}</li>
                                <li><span>Country:</span> India</li>
                                <li><span>Postcode:</span> {zip}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Auction Details */}
                <div className="row order_d_inner">
                    <div className="col-lg-6">
                        <div className="details_item">
                            <h4>Auction Details</h4>
                            <ul className="list">
                                <li><span>Auction Title:</span> {auctionTitle}</li>
                                <li><span>Auctioneer:</span> {auctioneer}</li>
                                <li><span>Highest Bidder:</span> {highestBidder}</li>
                                <li><span>Bid Amount:</span> Rs. {bidAmount}</li>
                                <li><span>Shipping:</span> Rs. {shipping}</li>
                                <li><span>Total Amount:</span> Rs. {totalAmount}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Product Image */}
                    {image && (
                        <div className="col-lg-6">
                            <div className="details_item">
                                <h4>Product Image</h4>
                                <img src={image} alt="Auction Item" width="100%" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Download Button */}
                <button className="btn btn-primary mt-4" onClick={downloadPDF}>
                    Download Bill
                </button>
            </div>
        </section>
    );
};

export default Confirm;
