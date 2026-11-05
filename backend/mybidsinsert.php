<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Origin: *");

// Database connection
$host = "localhost";
$username = "root";
$password = "";
$dbname = "auction";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

function insertAuction($title, $price, $description, $start_time, $end_time, $image_path, $auctioneer_name) {
    global $conn;

    $stmt = $conn->prepare("INSERT INTO auctions (title, price, description, start_time, end_time, image_path, auctioneer_name) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "Error preparing auction insert query"]);
        exit;
    }

    $stmt->bind_param("sdssss", $title, $price, $description, $start_time, $end_time, $image_path, $auctioneer_name);

    if ($stmt->execute()) {
        return $conn->insert_id;
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Error inserting auction details: " . $stmt->error]);
        return null;
    }
}

function insertAuctionWinner($auction_id, $winner_username, $winning_bid, $auctioneer_name) {
    global $conn;

    $stmt = $conn->prepare("INSERT INTO auction_winners (auction_id, winner_username, winning_bid, auctioneer_name) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "Error preparing auction winner insert query"]);
        exit;
    }

    $stmt->bind_param("isds", $auction_id, $winner_username, $winning_bid, $auctioneer_name);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Auction winner details inserted successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Error inserting auction winner details: " . $stmt->error]);
    }

    $stmt->close();
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['title']) || empty($data['price']) || empty($data['description']) || empty($data['start_time']) || empty($data['end_time']) || empty($data['image_path']) || empty($data['auctioneer_name'])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required auction details"]);
    exit;
}

file_put_contents('php://stderr', print_r($data, TRUE)); // Log incoming data

$auction_id = insertAuction($data['title'], $data['price'], $data['description'], $data['start_time'], $data['end_time'], $data['image_path'], $data['auctioneer_name']);

if ($auction_id) {
    // If auction insertion is successful, proceed to insert the auction winner details
    if (isset($data['winner_username']) && isset($data['winning_bid']) && !empty($data['winner_username']) && !empty($data['winning_bid'])) {
        insertAuctionWinner($auction_id, $data['winner_username'], $data['winning_bid'], $data['auctioneer_name']);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Missing winner details"]);
    }
}

$conn->close();
?>
