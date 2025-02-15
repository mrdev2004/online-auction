import React from "react";
import { jsPDF } from "jspdf";

const Confirm = () => {
    // Retrieve form data and auction data from sessionStorage
    const checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"));

    // Handle case where no data is present
    if (!checkoutData) {
        return <div>No order data found. Please go back and complete the checkout process.</div>;
    }

    // Destructure the checkoutData for easier access
    const { firstName, lastName, email, phone, address, city, zip, orderNotes, auction } = checkoutData;
    const { auctionTitle, auctioneer, bidAmount, highestBidder } = auction;

    // Calculate totals for the first auction (since we are assuming only 1 auction for now)
    const subtotal = bidAmount; // Total bid amount from auction
    const shipping = 50; // Flat shipping rate
    const total = subtotal + shipping;

    // Function to download the bill as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Add title
        doc.text("Order Confirmation", 20, 20);

        // Add Order Details
        doc.text(`Order number: 60235`, 20, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
        doc.text(`Total: USD ${total}`, 20, 60);
        doc.text(`Payment method: Check payments`, 20, 70);

        // Add Billing Address
        doc.text("Billing Address:", 20, 90);
        doc.text(`First Name: ${firstName}`, 20, 100);
        doc.text(`Last Name: ${lastName}`, 20, 110);
        doc.text(`Email: ${email}`, 20, 120);
        doc.text(`Phone: ${phone}`, 20, 130);
        doc.text(`Street: ${address}`, 20, 140);
        doc.text(`City: ${city}`, 20, 150);
        doc.text(`Zip Code: ${zip}`, 20, 160);

        // Add Shipping Address
        doc.text("Shipping Address:", 20, 180);
        doc.text(`Street: ${address}`, 20, 190);
        doc.text(`City: ${city}`, 20, 200);
        doc.text("Country: United States", 20, 210);
        doc.text(`Postcode: ${zip}`, 20, 220);

        // Add Auction Details
        doc.text("Auction Details:", 20, 240);
        doc.text(`Auction Title: ${auctionTitle}`, 20, 250);
        doc.text(`Auctioneer: ${auctioneer}`, 20, 260);
        doc.text(`Highest Bidder: ${highestBidder}`, 20, 270);
        doc.text(`Bid Amount: USD ${bidAmount}`, 20, 280);

        // Add Total Section
        doc.text(`Subtotal: USD ${subtotal}`, 20, 300);
        doc.text(`Shipping: USD ${shipping}`, 20, 310);
        doc.text(`Total: USD ${total}`, 20, 320);

        // Save the document
        doc.save("order_confirmation.pdf");
    };

    return (
        <>
            {/* Meta tags for mobile responsiveness */}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="shortcut icon" href="img/fav.png" />
            <meta name="author" content="CodePixar" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta charSet="UTF-8" />
            <title>Karma Shop</title>

            {/* CSS imports */}
            <link rel="stylesheet" href="css/linearicons.css" />
            <link rel="stylesheet" href="css/owl.carousel.css" />
            <link rel="stylesheet" href="css/themify-icons.css" />
            <link rel="stylesheet" href="css/font-awesome.min.css" />
            <link rel="stylesheet" href="css/nice-select.css" />
            <link rel="stylesheet" href="css/nouislider.min.css" />
            <link rel="stylesheet" href="css/bootstrap.css" />
            <link rel="stylesheet" href="css/main.css" />

            {/* Start Banner Area */}
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Confirmation</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home <span className="lnr lnr-arrow-right" /></a>
                                <a href="category.html">Confirmation</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Banner Area */}

            {/* Order Details Area */}
            <section className="order_details section_gap">
                <div className="container">
                    <h3 className="title_confirmation">Thank you. Your order has been received.</h3>

                    {/* Order Information */}
                    <div className="row order_d_inner">
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Order Info</h4>
                                <ul className="list">
                                    <li><a href="#"><span>Order number</span> : 60235</a></li>
                                    <li><a href="#"><span>Date</span> : {new Date().toLocaleDateString()}</a></li>
                                    <li><a href="#"><span>Total</span> : USD {total}</a></li>
                                    <li><a href="#"><span>Payment method</span> : Razor Pay</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Billing Address</h4>
                                <ul className="list">
                                    <li><a href="#"><span>First Name</span> : {firstName}</a></li>
                                    <li><a href="#"><span>Last Name</span> : {lastName}</a></li>
                                    <li><a href="#"><span>Email</span> : {email}</a></li>
                                    <li><a href="#"><span>Phone</span> : {phone}</a></li>
                                    <li><a href="#"><span>Street</span> : {address}</a></li>
                                    <li><a href="#"><span>City</span> : {city}</a></li>
                                    <li><a href="#"><span>Zip Code</span> : {zip}</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Shipping Address</h4>
                                <ul className="list">
                                    <li><a href="#"><span>Street</span> : {address}</a></li>
                                    <li><a href="#"><span>City</span> : {city}</a></li>
                                    <li><a href="#"><span>Country</span> : United States</a></li>
                                    <li><a href="#"><span>Postcode</span> : {zip}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>



                    {/* Download Button */}
                    <button className="btn btn-primary" onClick={downloadPDF}>Download Bill</button>
                </div>
            </section>
            {/* End Order Details Area */}

            {/* Footer and other components could go here */}
        </>
    );
};

export default Confirm;
