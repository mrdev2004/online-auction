import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Style from "../CommonComponents/Style";
import { toast, ToastContainer } from "react-toastify";

// WebSocket URL should match your server's route
const socket = new WebSocket("ws://localhost:5000/auction");

const SingleData = () => {
  const location = useLocation();
  const { auction } = location.state || {};
  console.log("auctionername==>", auction)
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [userName, setUserName] = useState("Guest User");
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [showEndButton, setShowEndButton] = useState(false); // State to control End Auction button visibility
  const user1 = JSON.parse(localStorage.getItem("user1")); // Parse the string back to an object
  console.log("id -->", user1?.id); // Use optional chaining to prevent errors if user1 is null


  if (!auction) {
    return <div className="text-white">No auction details provided. Please go back to the auctions page.</div>;
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user1");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || "Guest User");
    }
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "updateBids" && data.auctionId === auction.id) {
        setBids(data.bids.sort((a, b) => b.amount - a.amount));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [auction.id]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost/demo/ViewUsers.php');
      const data = await response.json();
      console.log("data-->", data)
      setUsers(data.users);

    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  // Toast notification for time updates
  useEffect(() => {
    let toastId;

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(auction.end_time);

      // Check if time left is less than 1 minute
      const endTime = new Date(auction.end_time);
      const now = new Date();
      const diffInSeconds = Math.floor((endTime - now) / 1000);

      if (diffInSeconds > 0 && diffInSeconds <= 10) {
        // Show toast only if time left is less than 1 minute
        if (!toastId) {
          toastId = toast.warning(`Time Left: ${calculatedTimeLeft}`, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            pauseOnHover: false,
          });
        } else {
          toast.update(toastId, { render: `Time Left: ${calculatedTimeLeft}`, });
        }
      } else if (diffInSeconds <= 0) {
        // Dismiss the toast if the auction has ended
        if (toastId) {
          toast.dismiss(toastId);
          toastId = null;
        }
      }
    }, 100); // Update toast every second

    return () => {
      clearInterval(interval);
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast on component unmount
      }
    };
  }, [auction.end_time]);

  // Calculate time left and check for auction end
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(auction.end_time);
      setTimeLeft(timeLeft);

      if (timeLeft === "Auction ended" && !auctionEnded) {
        setAuctionEnded(true);
        setShowEndButton(true); // Show the "End Auction" button after the auction ends
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [auction.end_time, auctionEnded]);
  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) {
      return "Auction ended"; // Auction has ended
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;

    return `${seconds}s`;
  };


  const handleAuctionEnd = () => {
    console.log("Auction Ended");
    const highestBid = bids[0]; // Assuming bids are sorted with the highest bid first

    console.log("Winner details:", {
      winner: highestBid.username,
      amount: highestBid.amount,
      auction,
    });

    const auctionData = {
      auction_id: auction.id,
      title: auction.title,
      image_path: auction.image_path,
      starting_price: auction.price,
      auction_end_time: auction.end_time,
      auctioneer: auction.auctioneer_name,
      bid_amount: highestBid.amount,
      highest_bidder: highestBid.username
    };

    // Send POST request to PHP backend to save winner data
    fetch('http://localhost/demo/insertbid.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auctionData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Auction winner saved successfully.");
          toast.success(`Auction ended! Winner: ${highestBid.username}, Amount: Rs.${highestBid.amount}`);
        } else {
          console.error("Error saving auction winner:", data.message);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });

    // Set the winner in state
    setWinner({
      auction_id: auction.id,
      username: highestBid.username,
      amount: highestBid.amount,
    });
  };

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    const currentHighestBid = bids[0] ? bids[0].amount : parseFloat(auction.price);

    if (parseFloat(bidAmount) <= currentHighestBid) {
      toast.error(`Your bid must be higher than the current highest bid of Rs.${currentHighestBid}.`);
      return;
    }

    const newBid = {
      username: userName,
      amount: parseFloat(bidAmount),
      time: new Date().toLocaleString(),
    };

    const payload = {
      type: "newBid",
      auctionId: auction.id,
      bid: newBid,
    };
    socket.send(JSON.stringify(payload));

    setBidAmount(""); // Reset bid amount after submission
  };

  return (
    <div
      className="container pt-5 my-5 py-4 border rounded"
      style={{
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        borderColor: "#333",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Style />
      <ToastContainer /> {/* Include ToastContainer */}

      <div className="row pt-5">
        {/* Left Column: Auction Details */}
        <div className="col-md-6">
          <div
            className="card"
            style={{
              backgroundColor: "#2a2a2a",
              border: "1px solid #444",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                auction.image_path.replace("uploads/", "")
              )}`}
              alt={auction.title}
              className="card-img-top"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ color: "#ffcc00", fontSize: "24px", fontWeight: "bold" }}
              >
                {auction.title}
              </h5>
              <p style={{ color: "#ffffff", fontSize: "16px" }}>
                <strong style={{ color: "#ffcc00" }}>Starting Price:</strong> Rs.
                {auction.price}
              </p>
              <p style={{ color: "#ffffff", fontSize: "16px" }}>
                <strong style={{ color: "#ffcc00" }}>Time Left:</strong> {timeLeft}
              </p>
              <p style={{ color: "#ffffff", fontSize: "16px" }}>
                <strong style={{ color: "#ffcc00" }}>Current Highest Bid:</strong> Rs.
                {bids[0] ? bids[0].amount : auction.price}
              </p>
              {auctionEnded && winner && (
                <div
                  className="mt-3 alert"
                  style={{
                    backgroundColor: "#28a745",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  <h3 style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
                    Winner: {winner.username}
                  </h3>
                  <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
                    <strong>Amount:</strong> Rs.{winner.amount}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Bid History and Bid Form */}
        <div className="col-md-6">
          <div
            className="card"
            style={{
              backgroundColor: "#2a2a2a",
              border: "1px solid #444",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="card-body">
              <h3
                className="text-center mb-4"
                style={{ color: "#ffcc00", fontSize: "24px", fontWeight: "bold" }}
              >
                Bid History
              </h3>
              <div
                className="list-group"
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "5px",
                  border: "1px solid #444",
                }}
              >
                {bids.map((bid, index) => (
                  <div
                    key={index}
                    className="list-group-item"
                    style={{
                      backgroundColor: "#2a2a2a",
                      color: "#ffffff",
                      border: "none",
                      borderBottom: "1px solid #444",
                      padding: "10px",
                    }}
                  >
                    <strong style={{ color: "#ffcc00" }}>{bid.username}</strong> bid Rs.
                    {bid.amount} at {bid.time}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  className="form-control mb-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    border: "1px solid #444",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                />
                <button
                  onClick={handleBidSubmit}
                  className="btn btn-block"
                  style={{
                    backgroundColor: "#ffcc00",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Place Bid
                </button>

                {showEndButton && (
                  <button
                    onClick={handleAuctionEnd}
                    className="btn btn-block mt-3"
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    End Auction
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleData;
