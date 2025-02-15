import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./Style";

function App() {
  const [totalAuctions, setTotalAuctions] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [recentAuctions, setRecentAuctions] = useState([]);
  const [recentCommissions, setRecentCommissions] = useState([]);

  useEffect(() => {
    // Fetch all data from the API
    axios.get("http://localhost/demo/dashboard.php")
      .then((response) => {
        // Update states with the returned data
        setTotalAuctions(response.data.total_auctions.total_auctions);
        setTotalCommission(response.data.total_commission.total_commission);
        setRecentAuctions(response.data.recent_auctions);
        setRecentCommissions(response.data.recent_commissions);
        console.log(response);

      });
  }, []);

  return (
    <div className="App mt-5">
      <Style />
      <div className="container">
        <h2 className="text-center">Dashboard Overview</h2>

        {/* Total Auctions and Commissions */}
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-light text-dark">
              <div className="card-body">
                <h5 className="card-title">Total Auctions</h5>
                <p className="card-text">{totalAuctions} Auctions</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light text-dark">
              <div className="card-body">
                <h5 className="card-title">Total Commissions</h5>
                <p className="card-text">Rs . {totalCommission}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Auctions */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Recent Auctions</h4>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAuctions.map((auction) => (
                      <tr key={auction.id}>
                        <td>{auction.id}</td>
                        <td>{auction.title}</td>
                        <td>{auction.start_time.toString()}</td>
                        <td>Rs.{auction.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Commissions Earned</h4>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Auction</th>
                      <th>Commission</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCommissions.map((commission) => (
                      <tr key={commission.auction}>
                        <td>{commission.auction}</td>
                        <td>Rs.{commission.commission}</td>
                        <td>{commission.date.toString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
