import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Style from "../CommonComponents/Style";

const ViewAuctions = () => {

  const navigate = useNavigate();
  const [auctionData] = useState([
    { id: 1, title: 'Vintage Car Auction', date: '2024-01-15', highestBid: '$500', category: 'Automobile' },
    { id: 2, title: 'Art Collection Auction', date: '2024-02-20', highestBid: '$1200', category: 'Art' },
    { id: 3, title: 'Rare Coins Auction', date: '2024-03-10', highestBid: '$800', category: 'Collectibles' },
    { id: 4, title: 'Luxury Watches Auction', date: '2024-04-05', highestBid: '$2500', category: 'Luxury' },
    { id: 5, title: 'Sports Memorabilia Auction', date: '2024-05-15', highestBid: '$900', category: 'Sports' },
    { id: 6, title: 'Antique Furniture Auction', date: '2024-06-01', highestBid: '$1800', category: 'Antiques' },
    { id: 7, title: 'Jewelry Auction', date: '2024-07-10', highestBid: '$5000', category: 'Jewelry' },
    { id: 8, title: 'Classic Books Auction', date: '2024-08-20', highestBid: '$600', category: 'Books' },
    { id: 9, title: 'Modern Art Auction', date: '2024-09-30', highestBid: '$3000', category: 'Art' },
    { id: 10, title: 'Estate Auction', date: '2024-10-10', highestBid: '$4000', category: 'Real Estate' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filtering based on search query
  const filteredAuctions = auctionData.filter(
    (auction) =>
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className="container-fluid">
      {/* <Style /> */}
      <link rel="stylesheet" href="css/bootstrap.css" />

      <link rel="stylesheet" href="css/linearicons.css" />
      <link rel="stylesheet" href="css/owl.carousel.css" />
      <link rel="stylesheet" href="css/themify-icons.css" />
      <link rel="stylesheet" href="css/font-awesome.min.css" />
      <link rel="stylesheet" href="css/nice-select.css" />
      <link rel="stylesheet" href="css/nouislider.min.css" />
      <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet" href="css/main.css" />
      <div className="row">
        {/* Vertical Navbar */}
        <div className="col-md-3 bg-light vh-100 p-3 " >
          {/* <h4 className="text-center">Admin Dashboard</h4> */}
          <ul className="nav flex-column" >

            <li className="nav-item">
              <button
                onClick={() => navigate('/ViewUsers')} // Use navigate to go to ViewUsers
                className="nav-link text-dark"
              >
                Users
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => navigate('/AdminCommission')} // Use navigate to go to AdminCommission
                className="nav-link text-dark"
              >
                Commissions
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => navigate('/admin/auctions')} // Use navigate to go to ViewAuctions
                className="nav-link text-dark"
              >
                View Auctions
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2 className="text-center mb-4">View Auctions</h2>

          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-md-6 offset-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Auction Table */}
          <div className="row">
            <div className="col-md-12">
              <table className="table  table-dark  table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Highest Bid</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuctions.map((auction) => (
                    <tr key={auction.id}>
                      <td>{auction.id}</td>
                      <td>{auction.title}</td>
                      <td>{auction.date}</td>
                      <td>{auction.highestBid}</td>
                      <td>{auction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAuctions.length === 0 && (
                <p className="text-center text-muted">No auctions found.</p>
              )}
            </div>
          </div>

          {/* Auction Statistics */}
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Auctions</h5>
                  <p className="card-text">{auctionData.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Highest Bid</h5>
                  <p className="card-text">
                    {auctionData.reduce(
                      (max, auction) =>
                        Math.max(max, parseInt(auction.highestBid.replace('$', ''), 10)),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <h5 className="card-title">Lowest Bid</h5>
                  <p className="card-text">
                    2000
                    {/* {auctionData.reduce(
                      (min, auction) =>
                        Math.min(min, parseInt(auction..replace('$', ''), 10)),
                      0
                    )} */}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <h5 className="card-title">Popular Category</h5>
                  <p className="card-text">
                    {
                      auctionData.reduce((acc, curr) => {
                        acc[curr.category] = (acc[curr.category] || 0) + 1;
                        return acc;
                      }, {})
                      // |> Object.entries(#).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
                    }
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAuctions;
