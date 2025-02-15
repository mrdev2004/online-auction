const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/auctionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define schemas
const auctionSchema = new mongoose.Schema({
  title: String,
  price: Number,
  end_time: Date,
  image_path: String,
  auctioneer_name: String,
});

const bidSchema = new mongoose.Schema({
  auctionId: mongoose.Schema.Types.ObjectId,
  username: String,
  amount: Number,
  time: String,
});

const Auction = mongoose.model("Auction", auctionSchema);
const Bid = mongoose.model("Bid", bidSchema);

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("newBid", async (data) => {
    const { auctionId, bid } = data;

    // Store bid in MongoDB
    const newBid = new Bid(bid);
    await newBid.save();

    // Emit the updated bid list to all clients
    const bids = await Bid.find({ auctionId }).sort({ amount: -1 });
    io.emit("updateBids", { auctionId, bids });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// API endpoints
app.get("/auction/:id", async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (auction) {
    res.json(auction);
  } else {
    res.status(404).send("Auction not found");
  }
});

app.get("/bids/:auctionId", async (req, res) => {
  const bids = await Bid.find({ auctionId: req.params.auctionId }).sort({ amount: -1 });
  res.json(bids);
});

app.post("/store_winner", async (req, res) => {
  const { auctionId, winner, amount, auctioneer } = req.body;
  
  // Store auction winner in MongoDB (you could add this info to the Auction model if needed)
  const auction = await Auction.findById(auctionId);
  auction.winner = { username: winner, amount, auctioneer };
  await auction.save();

  res.json({ message: "Winner stored successfully" });
});

// Start the server
const port = 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
