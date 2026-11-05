# 🔨 BidRise - Online Auction & Bidding Platform

**BidRise** is a full-stack, feature-rich online auction and bidding marketplace platform. It allows auctioneers to list products, bidders to engage in live real-time bidding with 3D product previews, and administrators to oversee auctions, users, transactions, and commissions.

---

## 🌟 Key Features

### 👤 Role-Based Portals & Authentication
- **Multi-Role Support**: Tailored interfaces and route protection for **Bidders**, **Auctioneers**, and **Administrators** (including Super Admin).
- **Secure Authentication**: User registration with input validation, role assignment, and login state persistence.
- **Admin Management**: Dedicated portal with specialized layout and administrative controls.

### 🏷️ Auction & Bidding Management
- **Listing Creation**: Auctioneers can list items with titles, categories, starting prices, ending timers, and product images.
- **Live Bidding**: Bidders can place bids in real-time with automatic highest-bid tracking.
- **WebSocket Updates**: Real-time broadcast of live bids to connected clients using a Ratchet WebSocket server.
- **3D Product Visualizer**: Three.js integration for rendering interactive 3D product models (GLB format).
- **Personal Dashboard**: Track placed bids, active participating auctions, and winning items in "My Bids".

### 💳 Payments & Commission Management
- **Razorpay Payment Gateway**: Secure checkout experience for auction winners and fee payments.
- **Automated Invoices**: Client-side invoice/receipt generation in PDF format using jsPDF.
- **Commission System**: Auctioneers submit sales commission to administrators upon auction completion.

### 🛡️ Admin Dashboard & Analytics
- **Visual Analytics**: Interactive charts powered by Chart.js displaying auction performance and metrics.
- **User & Admin Moderation**: View, verify, update, or remove users and administrators.
- **Auction Approval**: Review submitted auction listings and approve or reject them.
- **Transaction Logs**: Centralized ledger of completed payments and fee settlements.
- **Feedback Management**: Read and moderate customer feedback and inquiries.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router DOM v7, Redux Toolkit |
| **Styling & UI** | Bootstrap 5, React-Bootstrap, Styled-Components, Lucide Icons, Framer Motion |
| **3D & Visuals** | Three.js, Chart.js, React-Chartjs-2, Swiper |
| **Payments & Tools** | Razorpay SDK, jsPDF, Axios, React-Toastify |
| **Backend** | PHP (RESTful API), Ratchet (PHP WebSockets) |
| **Database** | MySQL (PDO / MySQLi) |
| **Web Server** | Apache (WampServer / XAMPP) |
