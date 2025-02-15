import React, { useState, useEffect } from "react";
import Style from "../CommonComponents/Style";

const AuctionsList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost/demo/getshopdata.php");
        const data = await response.json();
        console.log("asdd", data)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="container mt-5">
      <Style />
      <h2 className="mt-4" style={{ paddingTop: "20px" }}>Auctions List</h2>
      {auctions.length === 0 ? (
        <p>No auctions available at the moment.</p>
      ) : (
        <div className="row">
          {auctions.map((auction) => (
            <div className="col-md-4 mb-4" key={auction.id}>
              <div className="card">
                <img
                  src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                    auction.image_path.replace('uploads/', '')
                  )}`}
                  className="card-img-top"
                  alt={auction.title}
                  style={{ maxHeight: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">{auction.description}</p>
                  <p className="card-text">
                    <strong>Starting Price:</strong> Rs.{auction.price}
                  </p>
                  <p className="card-text">
                    <strong>Start Time:</strong> {new Date(auction.start_time).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>End Time:</strong> {new Date(auction.end_time).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionsList;
