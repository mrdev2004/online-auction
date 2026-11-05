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

---

## 📁 Repository Structure

```text
bidrise-auction/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and visual assets
│   ├── Components/
│   │   ├── Admin/          # Admin dashboard, user & payment moderation
│   │   ├── Auctioneer/     # Add auctions, view listings, commission submission
│   │   ├── Bidder/         # Live bidding, checkout, confirmation, bid history
│   │   ├── CommonComponents/ # Navbar, Footer, Login, Register, Product Views
│   │   └── LoaderComponent/ # Custom loaders and loading animations
│   ├── redux/              # Redux slices and store configuration
│   ├── App.jsx             # Main router configuration and protected routes
│   └── main.jsx            # React root application entry point
├── jordan.glb              # 3D model asset for interactive previews
├── index.html              # HTML entry template
├── vite.config.js          # Vite build tool configuration
└── package.json            # Frontend dependencies and npm scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or later) & **npm**
- **WampServer** (or XAMPP) with **PHP 8.x** and **MySQL**
- **Composer** (PHP dependency manager)

---

### 2. Setting Up the Backend

The backend PHP API and WebSocket scripts are hosted in your local web server root directory:
- **Location:** `C:\wamp64\www\demo\`

#### Step A: Start WampServer (Apache & MySQL)
1. Launch **WampServer** from your Start Menu or Desktop.
2. Ensure the WampServer icon in the Windows taskbar system tray turns **Green** (indicating Apache and MySQL services are active).
3. Open your browser and navigate to `http://localhost/phpmyadmin/`.
4. Create a new database named **`auction`**.
5. Ensure the database connection parameters in `C:\wamp64\www\demo\login.php` match:
   - **Host:** `localhost`
   - **Database:** `auction`
   - **User:** `root`
   - **Password:** ` ` *(empty string)*

#### Step B: Start the Real-Time WebSocket Server
The live bidding system uses a Ratchet PHP WebSocket server.

1. Open a new terminal / Command Prompt window.
2. Navigate to the backend directory:
   ```powershell
   cd C:\wamp64\www\demo
   ```
3. Run the WebSocket server:
   ```powershell
   php your-websocket-server-script.php
   ```
4. Keep this terminal open while using real-time auction bidding.

> [!NOTE]
> If running without WampServer's Apache service, you can also start PHP's built-in server from `C:\wamp64\www`:
> ```powershell
> cd C:\wamp64\www
> php -S localhost:80
> ```

---

### 3. Setting Up the Frontend

1. Open your terminal in the frontend project root:
   ```powershell
   cd c:\Users\DEV\Documents\GitHub\bidrise-auction
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Launch the development server:
   ```powershell
   npm run dev
   ```

4. Open your browser at:
   ```text
   http://localhost:5173/
   ```

---

## 🔒 Default Portals & Routes

| Role | Route | Description |
|---|---|---|
| **Public** | `/` | Home page & featured auctions |
| **Public** | `/Login` & `/Register` | Bidder / Auctioneer sign-in and registration |
| **Public** | `/AdminLogin` | Dedicated login portal for system administrators |
| **Bidder** | `/Category` | Browse auctions by category |
| **Bidder** | `/product` | Live bidding room & 3D model viewer |
| **Bidder** | `/mybids` | Personal bidding history |
| **Auctioneer** | `/Aauction` | Create new auction item |
| **Auctioneer** | `/Vauction` | Manage submitted auctions |
| **Auctioneer** | `/Commission` | Calculate and submit platform commission |
| **Admin** | `/Dashboard` | Administrative analytics and overview |
| **Admin** | `/Adata` | Approve/reject auction submissions |
| **Admin** | `/ViewUsers` | User management |
| **Admin** | `/ViewPayment` | Payment transactions review |

---

## 📦 Build for Production

To create an optimized production build of the frontend:

```powershell
npm run build
```

The compiled assets will be placed in the `dist/` directory.

---

## 📄 License
This project is developed for educational and demonstration purposes.
