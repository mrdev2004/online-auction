import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CommonComponents/index.css";
import Style from "../CommonComponents/Style";
import Loader from "../LoaderComponent/Loader";
import { Modal, Button, Form } from "react-bootstrap";

const Vauctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]); // Separate state for filtered data
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    price: "",
  });

  const auctioneer = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1"))?.name : null;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2000);

    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost/demo/getshopdata.php");
        const data = await response.json();

        if (response.ok) {
          console.log(data.data)
          // Correct filter logic: use comparison (===) not assignment (=)
          const userdata = data.data.filter((item) => item.auctioneer_name === auctioneer);
          setAuctions(userdata);
          setFilteredAuctions(userdata);
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
  }, [auctioneer]);

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

  const applyFilters = () => {
    const filtered = auctions
      .filter((auction) => calculateTimeLeft(auction.end_time) !== "Auction ended") // Exclude ended auctions
      .filter((auction) => {
        const matchesName = auction.title.toLowerCase().includes(filters.name.toLowerCase());

        const formatDate = (date) => {
          const d = new Date(date);
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const year = d.getFullYear();
          return `${month}/${day}/${year}`;
        };

        const matchesDate = filters.date
          ? formatDate(auction.start_time) === formatDate(filters.date)
          : true;

        const matchesPrice = filters.price
          ? auction.price <= parseFloat(filters.price)
          : true;

        return matchesName && matchesDate && matchesPrice;
      });

    setFilteredAuctions(filtered);
    setShowFilterModal(false);
  };

  const handleBid = (auction) => {
    navigate("/product", { state: { auction } });
    window.location.reload();
  };

  const userRole = localStorage.getItem("user1")
    ? JSON.parse(localStorage.getItem("user1")).role
    : null;

  if (showLoader) return <Loader />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container" style={{ marginTop: "100px", }}>
      <Style />
      <h2>
        Auctions added by Auctioneer
      </h2>
      {/* <Button variant="primary" onClick={() => setShowFilterModal(true)} style={{ marginBottom: "20px" }}>
        Filter Auctions
      </Button> */}

      <div className="card-grid" style={{ marginTop: "140px", }}>
        {filteredAuctions
          .filter((auction) => calculateTimeLeft(auction.end_time) !== "Auction ended")
          .map((auction) => (
            <div className="card" key={auction.id} style={cardStyle}>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                    auction.image_path.replace("uploads/", "")
                  )})`,
                  ...cardImageStyle,
                }}
              ></div>
              <div className="card-content">
                <h5>{auction.title}</h5>
                <p><strong>Starting Price:</strong> Rs.{auction.price}</p>
                <p><strong>Start Time:</strong> {new Date(auction.start_time).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(auction.end_time).toLocaleString()}</p>
                <p className="time-left"><strong>Time Left:</strong> {calculateTimeLeft(auction.end_time)}</p>

                {userRole === "Bidder" && (
                  <button onClick={() => handleBid(auction)} className="btn btn-primary">
                    Place Bid
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Auctions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter auction name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max price"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>Close</Button>
          <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
  marginBottom: "20px",
  width: "300px",
};

const cardImageStyle = {
  height: "200px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default Vauctions;
