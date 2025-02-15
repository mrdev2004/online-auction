import React, { useEffect, useState } from 'react';
import Style from "../CommonComponents/Style";

const MyBids = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user1");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || "Guest User");
    }
  }, []);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost/demo/getmybids.php");
        const data = await response.json();

        if (response.ok) {
          setAuctions(data.data);
          console.log(data);
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

  useEffect(() => {
    if (userName && auctions.length > 0) {
      const filtered = auctions.filter(auction => auction.highest_bidder === userName);
      setFilteredAuctions(filtered);
    }
  }, [userName, auctions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cardContainerStyle = {
    display: 'flex',
    alignItems: "flex-start", // Align items to the top (left side vertically)
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'flex-start', // Align items to the left
    paddingTop: "100px",
    paddingLeft: "30px", // Added some left padding for spacing from the edge
    paddingBottom: "50px",
  };

  const cardStyle = {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  };

  const detailsStyle = {
    marginTop: '10px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  };

  const paragraphStyle = {
    margin: '5px 0',
    fontSize: '1rem',
    color: '#555',
  };

  const strongStyle = {
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div>
      <div style={cardContainerStyle}>
        <Style />
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction, index) => (
            <div
              key={index}
              style={{ ...cardStyle, ':hover': cardHoverStyle }}
            >
              <img
                src={`http://localhost/demo/${auction.image_path}`}
                alt={auction.title}
                style={imageStyle}
              />
              <div style={detailsStyle}>
                <h3 style={headingStyle}>{auction.title}</h3>
                <p style={paragraphStyle}><strong style={strongStyle}>Auctioneer:</strong> {auction.auctioneer}</p>
                <p style={paragraphStyle}><strong style={strongStyle}>Bid Amount:</strong> Rs.{auction.bid_amount}</p>
                <p style={paragraphStyle}><strong style={strongStyle}>Highest Bidder:</strong> {auction.highest_bidder}</p>
                {/* <p style={paragraphStyle}><strong style={strongStyle}>Auction End Time:</strong> {auction.auction_end_time}</p>
                <p style={paragraphStyle}><strong style={strongStyle}>Status:</strong> {auction.status}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p>No auctions found for your bids.</p>
        )}
      </div>
    </div>
  );
};

export default MyBids;
