import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../index.css";
import Style from "./Style";

const ShopData = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost/demo/getshopdata.php");
        const data = await response.json();

        if (response.ok) {
          setAuctions(data.data);
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

  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Auction ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;

    return `${seconds}s`;
  };

  // Filter out expired auctions
  const validAuctions = auctions.filter((auction) => {
    const endTime = new Date(auction.end_time);
    return endTime > new Date();
  });

  const handleBid = (auction) => {
    // Navigate to the SingleProduct component with auction data passed via state

    navigate("/product", { state: { auction } });
    window.location.reload();
  };

  // Get the user role from localStorage
  const userRole = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1")).role : null;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Style />
      <h2>
        All Auctions <span>({validAuctions.length})</span>
      </h2>
      <div className="card-grid" style={{ paddingTop: "20px" }}>
        {validAuctions.map((auction) => (
          <div className="card" key={auction.id}>
            <div
              className="card-image"
              style={{
                backgroundImage: `url(http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                  auction.image_path.replace("uploads/", "")
                )})`,
              }}
            ></div>
            <div className="card-content">
              <h5>{auction.title}</h5>
              <p>
                <strong>Starting Price:</strong> Rs.{auction.price}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(auction.start_time).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(auction.end_time).toLocaleString()}
              </p>
              <p className="time-left">
                <strong>Time Left:</strong> {calculateTimeLeft(auction.end_time)}
              </p>

              {/* Show 'Place Bid' button only if user role is 'bidder' */}
              {userRole === "Bidder" && (
                <button
                  onClick={() => handleBid(auction)} // Trigger bidding action
                  className="btn btn-primary"
                >
                  Place Bid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopData;
