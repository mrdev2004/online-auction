import React, { useEffect, useState } from 'react';
import Style from "../CommonComponents/Style";
import { useNavigate } from 'react-router-dom';

const MyBids = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const userStatus = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1")).user_status : null;
  const navigate = useNavigate();

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
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#555' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#dc3545' }}>Error: {error}</div>;
  }

  const handlePayNow = (auctionData) => {
    console.log(auctionData, "auction");
    navigate("/Checkout", { state: { auctionData } });
  };
  console.log(filteredAuctions)

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '80vh', marginTop: "20px" }}>
      <Style />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingTop: "50px" }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>
          My Bids
        </h1>
        {filteredAuctions.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredAuctions.map((auction, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <img
                  src={`http://localhost/demo/${auction.image_path}`}
                  alt={auction.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333' }}>{auction.title}</h3>
                  <p style={{ margin: '5px 0', fontSize: '1rem', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Auctioneer:</strong> {auction.auctioneer}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '1rem', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Bid Amount:</strong> Rs.{auction.bid_amount}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '1rem', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Highest Bidder:</strong> {auction.highest_bidder}
                  </p>
                  {userStatus !== "Blocked" && (
                    auction.payment_status !== "payment done" ? (
                      <button
                        onClick={() => handlePayNow(auction)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: '#007bff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginTop: '15px',
                          transition: 'background-color 0.3s',
                        }}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <p style={{
                        margin: '20px 0',
                        fontSize: '1rem',
                        color: '#555',
                      }}>
                        <strong style={{
                          color: 'green',
                          fontWeight: "900",
                          fontSize: "1.2vw",
                          fontStyle: "bold",

                        }}>
                          Payment Done
                        </strong>
                      </p>
                    )
                  )}


                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555', marginTop: '50px' }}>
            No auctions found for your bids.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBids;