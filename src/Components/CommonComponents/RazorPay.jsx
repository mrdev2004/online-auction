import React, { useEffect } from "react";

const RazorpayPayment = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        const options = {
            key: "rzp_test_kfbVnxx7qtGIYs", // Your Razorpay Test API Key
            amount: 50000, // Amount in paisa (50000 paisa = ₹500)
            currency: "INR",
            name: "Test Product",
            description: "Purchase of Test Product",
            image: "https://yourlogo.com/logo.png",
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Test User",
                email: "testuser@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <div>
            <h2>Test Product</h2>
            <p>Price: ₹500</p>
            <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
    );
};

export default RazorpayPayment;
