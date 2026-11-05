<?php

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'auction';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, password: $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => "Connection failed: " . $e->getMessage()]);
    exit;
}

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['auction_id'], $data['title'], $data['image_path'], $data['starting_price'], $data['auction_end_time'], $data['auctioneer'], $data['bid_amount'], $data['highest_bidder'])) {
    // Insert the bid data into the database
    $stmt = $pdo->prepare("INSERT INTO auction_data (auction_id, title, image_path, starting_price, auction_end_time, auctioneer, bid_amount, highest_bidder, status) 
                           VALUES (:auction_id, :title, :image_path, :starting_price, :auction_end_time, :auctioneer, :bid_amount, :highest_bidder, 'active')");
    $stmt->execute([
        'auction_id' => $data['auction_id'],
        'title' => $data['title'],
        'image_path' => $data['image_path'],
        'starting_price' => $data['starting_price'],
        'auction_end_time' => $data['auction_end_time'],
        'auctioneer' => $data['auctioneer'],
        'bid_amount' => $data['bid_amount'],
        'highest_bidder' => $data['highest_bidder']
    ]);

    echo json_encode(['success' => true, 'message' => 'Bid placed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
}
?>
