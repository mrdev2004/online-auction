import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Style from "./Style";

const SingleData = () => {
  const location = useLocation();
  const { auction } = location.state || {};
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [userName, setUserName] = useState("Guest User");
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [showEndButton, setShowEndButton] = useState(false);

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
    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(auction.end_time);
      setTimeLeft(calculatedTimeLeft);

      if (calculatedTimeLeft === "Auction ended" && !auctionEnded) {
        setAuctionEnded(true);
        setShowEndButton(true); // Show the "End Auction" button after the auction ends
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [auction.end_time, auctionEnded]);

  // Toast notification for time updates
  useEffect(() => {
    let toastId;

    const interval = setInterval(() => {
      const calculatedTimeLeft = calculateTimeLeft(auction.end_time);

      // Check if time left is less than 1 minute
      const endTime = new Date(auction.end_time);
      const now = new Date();
      const diffInSeconds = Math.floor((endTime - now) / 1000);

      if (diffInSeconds > 0 && diffInSeconds <= 5) {
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
          toast.update(toastId, {
            render: `Time Left: ${calculatedTimeLeft}`,
          });
        }
      } else if (diffInSeconds <= 0) {
        // Dismiss the toast if the auction has ended
        if (toastId) {
          toast.dismiss(toastId);
          toastId = null;
        }
      }
    }, 1000); // Update toast every second

    return () => {
      clearInterval(interval);
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast on component unmount
      }
    };
  }, [auction.end_time]);

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

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const currentHighestBid = bids[0] ? bids[0].amount : parseFloat(auction.price);

    if (parseFloat(bidAmount) <= currentHighestBid) {
      alert(`Your bid must be higher than the current highest bid of Rs.${currentHighestBid}.`);
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
    // socket.send(JSON.stringify(payload)); Uncomment if WebSocket is used

    setBidAmount(""); // Reset bid amount after submission
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        color: '#333',
        minHeight: '70vh',
        padding: '40px',
        marginTop: '100px',
      }}
    >
      <ToastContainer />
      <Style />
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Auction Details */}
        <div
          style={{
            flex: '1 1 45%',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '8px 8px 8px 8px black',
            padding: '100px',
          }}
        >
          <img
            src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
              auction.image_path.replace('uploads/', '')
            )}`}
            alt={auction.title}
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',


            }}
          />
          <h2 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center', color: '#333' }}>{auction.title}</h2>
          <p style={{ marginTop: '10px', fontSize: '22px' }}><strong>Starting Price:</strong> Rs.{auction.price}</p>
          <p style={{ marginTop: '10px', fontSize: '22px' }}><strong>Time Left:</strong> {timeLeft}</p>
          <p style={{ marginTop: '10px', fontSize: '22px' }}><strong>Current Highest Bid:</strong> Rs.{bids[0] ? bids[0].amount : auction.price}</p>
          {auctionEnded && winner && (
            <div
              style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: '#155724', margin: 0 }}>Winner: {winner.username}</h3>
              <p style={{ margin: 0, fontSize: '18px' }}><strong>Amount:</strong> Rs.{winner.amount}</p>
            </div>
          )}
        </div>

        {/* Bid History and Form */}
        <div
          style={{
            flex: '1 1 45%',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '8px 8px 8px 8px black',
            padding: '20px',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Bid History</h3>
          <div
            style={{
              maxHeight: '250px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            {bids.length > 0 ? (
              bids.map((bid, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '16px',
                  }}
                >
                  <strong>{bid.username}</strong> bid Rs.{bid.amount} at {bid.time}
                </div>
              ))
            ) : (
              <p style={{ fontSize: '16px', textAlign: 'center' }}>No bids yet.</p>
            )}
          </div>
          <div>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid amount"
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                color: '#333',
                fontSize: '16px',
              }}
            />
            <button
              onClick={handleBidSubmit}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#007bff',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              Place Bid
            </button>
            {showEndButton && (
              <button
                onClick={() => alert('Auction Ended')}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#dc3545',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                End Auction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

export default SingleData;
