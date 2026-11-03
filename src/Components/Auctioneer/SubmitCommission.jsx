import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "../CommonComponents/Style";

const SubmitCommission = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inline styles
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "calc(100vh - 200px)",
      marginTop: "100px"

    },
    heading: {
      color: "#343a40",
      marginBottom: "20px",
      fontWeight: "600",
      textAlign: "center"
    },
    searchBar: {
      marginBottom: "20px",
      borderRadius: "20px",
      padding: "10px 15px",
      border: "1px solid #ced4da",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      overflow: "hidden"
    },
    table: {
      marginBottom: "0"
    },
    tableHeader: {
      backgroundColor: "#343a40",
      color: "white",
      position: "sticky",
      top: "0"
    },
    tableBody: {
      display: "block",
      maxHeight: "500px",
      overflowY: "auto"
    },
    tableRow: {
      display: "table",
      width: "100%",
      tableLayout: "fixed",
      height: "50px",
      border: "1px solid black",
      textAlign: "center"
    },
    payButton: {
      borderRadius: "20px",
      padding: "5px 15px",
      fontWeight: "500",
      backgroundColor: "#28a745",
      border: "none",
      transition: "all 0.3s",
      ":hover": {
        backgroundColor: "#218838",
        transform: "scale(1.05)"
      }
    },
    noData: {
      padding: "20px",
      color: "#6c757d",
      textAlign: "center"
    },
    spinner: {
      width: "3rem",
      height: "3rem",
      margin: "20px auto",
      color: "#343a40"
    }
  };

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay SDK loaded successfully");
        setIsRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        setIsRazorpayLoaded(false);
      };
      document.body.appendChild(script);
    };

    loadRazorpay();

    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, []);
  const auctioneer = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1"))?.name : null;
  console.log(auctioneer)
  const fetchUsersData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost/demo/tmp2.php");
      const data = await response.json();
      setUsers(data.users);
      const fdata = data.users.filter((item) => item.auctioneer_name == auctioneer)
      setFilteredUsers(fdata);

    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.auction.toLowerCase().includes(lowercasedQuery) ||
        user.commission.toLowerCase().includes(lowercasedQuery) ||
        user.date.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };

  const handlePayment = (user) => {
    console.log("Payment initiated for user:", user);

    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded");
      alert("Razorpay SDK is not loaded. Please refresh the page and try again.");
      return;
    }

    setCurrentUser(user);

    const options = {
      key: "rzp_test_kfbVnxx7qtGIYs",
      amount: parseFloat(user.commission) * 100,
      currency: "INR",
      name: "Auction Payment",
      description: `Payment for ${user.auction}`,
      handler: function (response) {
        console.log("Payment successful:", response);
        processPayment(user.id, response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      notes: {
        auction_id: user.id,
        auction_name: user.auction
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: function () {
          console.log("Payment modal dismissed");
        }
      }
    };

    try {
      const rzpay = new window.Razorpay(options);
      rzpay.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzpay.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      alert("Failed to initialize payment gateway. Please try again.");
    }
  };

  const processPayment = async (userId, paymentId) => {
    try {
      console.log("Processing payment on server:", { userId });

      const response = await fetch("http://localhost/demo/payment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId
        })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result = await response.json();
      console.log("Payment processing result:", result);

      if (result.success) {
        alert("Payment successful!");
        fetchUsersData();
      } else {
        alert(`Payment verification failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert(`Error processing payment: ${error.message}. Please contact support.`);
    }
  };

  return (
    <div style={styles.container}>
      <Style />
      <h5 style={styles.heading}>Search Commission</h5>
      <input
        type="text"
        style={styles.searchBar}
        className="form-control"
        placeholder="Search by auction, commission, or date"
        onChange={handleSearchChange}
        value={searchQuery}
      />

      {isLoading ? (
        <div className="text-center mt-4">
          <div style={styles.spinner} className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={{ ...styles.table, ...styles.table }}>
            <thead style={styles.tableHeader}>
              <tr style={styles.tableRow}>
                <th>ID</th>
                <th>Auction</th>
                <th>Commission</th>
                <th>Date</th>
                <th>Approval Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td>{user.id}</td>
                    <td>{user.auction}</td>
                    <td>{user.commission}</td>
                    <td>{user.date}</td>
                    <td>{user.approval_status == "" ? "Pending" : user.approval_status}</td>
                    <td>{user.payment_status == "" ? "Not Paid" : user.payment_status}</td>
                    <td>
                      {user.payment_status !== "Paid" && (
                        <button
                          style={styles.payButton}
                          className="btn"
                          onClick={() => handlePayment(user)}
                          disabled={!isRazorpayLoaded}
                        >
                          {isRazorpayLoaded ? "Pay Now" : "Loading..."}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={styles.tableRow}>
                  <td colSpan="7" style={styles.noData}>
                    No  data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmitCommission;