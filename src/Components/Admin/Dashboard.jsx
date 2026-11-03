import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div style={styles.app}>
      <div style={styles.container}>
        <h2 style={styles.header}>Dashboard Overview</h2>

        {/* Cards Row */}
        <div style={styles.cardRow}>
          {/* Total Auctions Card */}
          <div style={styles.cardContainer}>
            <div style={{ ...styles.card, backgroundColor: '#4e73df' }}>
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>Total Auctions</h5>
                <p style={styles.cardText}>{totalAuctions} Auctions</p>
              </div>
            </div>
          </div>

          {/* Total Commissions Card */}
          <div style={styles.cardContainer}>
            <div style={{ ...styles.card, backgroundColor: '#1cc88a' }}>
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>Total Commissions</h5>
                <p style={styles.cardText}>Rs. {totalCommission}</p>
              </div>
            </div>
          </div>

          {/* Additional Card 1 */}
       
        </div>

        {/* Recent Auctions Section */}
        <div style={styles.section}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h4 style={styles.sectionTitle}>Recent Auctions</h4>
            </div>
            <div style={styles.cardBody}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Title</th>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAuctions.slice(0,20).map((auction) => (
                    <tr key={auction.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{auction.id}</td>
                      <td style={styles.tableCell}>{auction.title}</td>
                      <td style={styles.tableCell}>{auction.start_time.toString()}</td>
                      <td style={styles.tableCell}>Rs.{auction.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Commissions Section */}
        <div style={styles.section}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h4 style={styles.sectionTitle}>Commissions Earned</h4>
            </div>
            <div style={styles.cardBody}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Auction</th>
                    <th style={styles.tableHeader}>Commission</th>
                    <th style={styles.tableHeader}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCommissions.map((commission) => (
                    <tr key={commission.auction} style={styles.tableRow}>
                      <td style={styles.tableCell}>{commission.auction}</td>
                      <td style={styles.tableCell}>Rs.{commission.commission}</td>
                      <td style={styles.tableCell}>{commission.date.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#f8f9fc',
    minHeight: '100vh',
    leftpadding: '120px',
    fontFamily: "'Nunito', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft:'230px'
  },
  header: {
    textAlign: 'center',
    color: '#5a5c69',
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '30px',
  },
  cardRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
  },
  cardContainer: {
    flex: '1',
    minWidth: '200px',
  },
  card: {
    borderRadius: '10px',
    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  },
  cardHeader: {
    backgroundColor: '#4e73df',
    color: '#fff',
    padding: '15px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  cardBody: {
    padding: '20px',
    color: '#5a5c69',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#fff',
  },
  cardText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
  },
  tableHeader: {
    backgroundColor: '#4e73df',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #e3e6f0',
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#f8f9fc',
  },
  tableCell: {
    padding: '12px',
    color: '#5a5c69',
  },
};

export default App;