import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Style from "../CommonComponents/Style";
import Loader from "../LoaderComponent/Loader";
import { Modal, Button, Form } from "react-bootstrap";
import { use } from "react";

const ShopData = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]); // Separate state for filtered data
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2000);

    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost/demo/getshopdata.php");
        const data = await response.json();

        if (response.ok) {
          setAuctions(data.data);
          setFilteredAuctions(data.data); // Initialize filtered data
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

  const applyFilters = () => {
    let filtered = auctions.filter((auction) => {
      return (
        (!filters.name || auction.title.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.date || auction.start_time.startsWith(filters.date)) &&
        (!filters.price || parseFloat(auction.price) <= parseFloat(filters.price))
      );
    });
    setFilteredAuctions(filtered);
  };
  const validateInputs = () => {
    let newErrors = {};

    // Name validation: Allow only alphabets and spaces
    if (filters.name && !/^[a-zA-Z\s]+$/.test(filters.name)) {
      newErrors.name = "Name should contain only alphabets.";
    }

    // Date validation: Ensure it's a valid date
    if (filters.date) {
      const dateObj = new Date(filters.date);
      if (isNaN(dateObj.getTime())) {
        newErrors.date = "Please enter a valid date.";
      }
    }

    // Price validation: Should be a positive number
    if (filters.price && (!/^\d+(\.\d{1,2})?$/.test(filters.price) || parseFloat(filters.price) <= 0)) {
      newErrors.price = "Please enter a valid positive price.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyFilters = () => {
    if (validateInputs()) {
      applyFilters();
      setShowFilterModal(false);
    }
  };


  const handleBid = (auction) => {
    navigate("/product", { state: { auction } });
    window.location.reload();
  };

  const userRole = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1")).role : null;
  const userStatus = localStorage.getItem("user1") ? JSON.parse(localStorage.getItem("user1")).user_status : null;
  console.log(userStatus, 'ssss')
  // console.log(userStatus,"gyguy")

  if (showLoader) return <Loader />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Style />
      <h2>
        All Auctions <span>({filteredAuctions.length})</span>
      </h2>
      <Button variant="primary" onClick={() => setShowFilterModal(true)} style={{ marginBottom: "20px" }}>
        Filter Auctions
      </Button>
      <div className="card-grid">
        {filteredAuctions
          .filter((auction) => calculateTimeLeft(auction.end_time) !== "Auction ended") // Remove ended auctions
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
                <p>
                  <strong>Starting Price:</strong> Rs.{auction.price}
                </p>
                <p>
                  <strong>Start Time:</strong> {new Date(auction.start_time).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong> {new Date(auction.end_time).toLocaleString()}
                </p>
                <p className="time-left">
                  <strong>Time Left:</strong> {calculateTimeLeft(auction.end_time)}
                </p>
                {userStatus === "Unblocked" || userStatus === "" && userRole === "Bidder" ? (
                  <button onClick={() => handleBid(auction)} className="btn btn-primary">
                    Place Bid
                  </button>
                ) : (
                  <p>Currently you are blocked</p>
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
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                isInvalid={!!errors.date}
              />
              <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max price"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// CSS Fixes
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  marginBottom: "20px",
  width: "300px", // Prevents single item from expanding
};

const cardImageStyle = {
  height: "200px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default ShopData;
