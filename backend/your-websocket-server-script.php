<?php
require __DIR__ . '/vendor/autoload.php'; // Ensure you've installed Ratchet with Composer

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App; // Add this import for the App class

class AuctionServer implements MessageComponentInterface {
    protected $clients;
    protected $bids;

    public function __construct() {
        $this->clients = new \SplObjectStorage; // Store connected clients
        $this->bids = []; // Store bids for each auction
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection: ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true); // Parse the received message

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

            foreach ($this->clients as $client) {
                $client->send($payload); // Send the updated bids to all clients
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
$server = new App('localhost', 8080); // Properly instantiate the App class
$server->route('/auction', new AuctionServer); // Define the WebSocket route for auction
$server->run(); // Run the server
