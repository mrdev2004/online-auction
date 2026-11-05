<?php
require __DIR__ . '/vendor/autoload.php'; // Ensure you have Ratchet installed via Composer

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;

class AuctionServer implements MessageComponentInterface {
    protected $clients;
    protected $bids;

    public function __construct() {
        $this->clients = new \SplObjectStorage; // Store connected clients
        $this->bids = []; // Store bids for each auction
    }

    // Clear the bids for all auctions
    public function clearBids() {
        $this->bids = []; // Reset the bids
        echo "All bids have been cleared.\n";
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection: ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true); // Parse the received message

        // Check for a reset request
        if (isset($data['type']) && $data['type'] === 'resetBids') {
            $this->clearBids(); // Clear all bids
            return;
        }

        // Handle the new bid
        if ($data['type'] === 'newBid') {
            $auctionId = $data['auctionId'];
            $bid = $data['bid'];

            // Store the bid
            if (!isset($this->bids[$auctionId])) {
                $this->bids[$auctionId] = [];
            }
            $this->bids[$auctionId][] = $bid;

            // Broadcast the updated bid list
            $payload = json_encode([
                'type' => 'updateBids',
                'auctionId' => $auctionId,
                'bids' => $this->bids[$auctionId],
            ]);

            // Send the updated bids to all clients
            foreach ($this->clients as $client) {
                $client->send($payload);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn); // Remove the client on disconnect
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Error: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Start the WebSocket server
$server = new App('localhost', 5000); // Set the host and port for the WebSocket server
$server->route('/auction', new AuctionServer); // Define the WebSocket route for auction
$server->run(); // Start the WebSocket server
?>
