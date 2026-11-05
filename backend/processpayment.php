<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "auction"; // Update with your actual database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Read JSON input from request
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["status" => "error", "message" => "Invalid JSON input"]));
}

// Extract payment data
$username = $data['username'] ?? '';
$auction_id = $data['auction_id'] ?? 0;
$email = $data['email'] ?? '';
$phone_no = $data['phone_no'] ?? '';
$address = $data['address'] ?? '';
$city = $data['city'] ?? '';
$zipcode = $data['zipcode'] ?? '';
$order_notes = $data['order_notes'] ?? '';
$auction_item_name = $data['auction_item_name'] ?? '';
$auctioneer_name = $data['auctioneer_name'] ?? '';
$auction_item_amt = $data['auction_item_amt'] ?? 0;
$commission_amt = $data['commission_amt'] ?? 0;
$total = $data['total'] ?? 0;
$created_at = date("Y-m-d H:i:s");

// Insert into `payment` table
$payment_sql = "INSERT INTO payment (username, auction_id, email, phone_no, address, city, zipcode, order_notes, auction_item_name, auctioneer_name, auction_item_amt, commission_amt, total, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($payment_sql);

if (!$stmt) {
    die(json_encode(["status" => "error", "message" => "SQL Prepare failed: " . $conn->error]));
}

$stmt->bind_param("sisssssssssdds", $username, $auction_id, $email, $phone_no, $address, $city, $zipcode, $order_notes, $auction_item_name, $auctioneer_name, $auction_item_amt, $commission_amt, $total, $created_at);

if ($stmt->execute()) {
    $payment_id = $stmt->insert_id;

    // Insert into `comm` table (including auctioneer_name now)
    $comm_sql = "INSERT INTO comm (id, auction, commission, date, auctioneer_name) VALUES (?, ?, ?, ?, ?)";
    $comm_stmt = $conn->prepare($comm_sql);

    if (!$comm_stmt) {
        die(json_encode(["status" => "error", "message" => "Comm Table SQL Prepare failed: " . $conn->error]));
    }

    $comm_stmt->bind_param("isdss", $payment_id, $auction_item_name, $commission_amt, $created_at, $auctioneer_name);

    if ($comm_stmt->execute()) {
        // Update auction_data status to "payment done" based on title
        $update_sql = "UPDATE auction_data SET payment_status = 'payment done' WHERE title = ?";
        $update_stmt = $conn->prepare($update_sql);

        if (!$update_stmt) {
            die(json_encode(["status" => "error", "message" => "Auction Status Update failed: " . $conn->error]));
        }

        $update_stmt->bind_param("s", $auction_item_name);

        if ($update_stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Payment and Commission recorded successfully, Auction status updated",
                "payment_id" => $payment_id,
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Auction status update failed", "error_detail" => $update_stmt->error]);
        }

        $update_stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Commission insert failed", "error_detail" => $comm_stmt->error]);
    }

    $comm_stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Payment failed", "error_detail" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
