<?php
// Turn off output buffering to prevent any HTML from interfering with JSON
ob_start();
ob_clean();

// Set headers for CORS and JSON
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Connect to database
$conn = new mysqli("localhost", "root", "", "auction");

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get and validate input data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

// Prepare and execute update
$id = $conn->real_escape_string($data["id"]);

$query = "UPDATE comm SET payment_status = 'Paid' WHERE id = ?"; 
$stmt = $conn->prepare($query); 

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare statement failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);  // Only binding one integer parameter

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Payment recorded successfully"]); 
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to update payment status: " . $stmt->error]); 
}

// Close connections
$stmt->close(); 
$conn->close();
?>