<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "auction";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!isset($data["admin_name"], $data["admin_email"], $data["admin_password"], $data["admin_create_at"])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$admin_name = $conn->real_escape_string($data["admin_name"]);
$admin_email = $conn->real_escape_string($data["admin_email"]);
$admin_password =$conn->real_escape_string($data["admin_password"]);  // Encrypt password
$admin_create_at = $conn->real_escape_string($data["admin_create_at"]);

// Insert query
$sql = "INSERT INTO admin (admin_name, admin_email, admin_password, admin_create_at) 
        VALUES ('$admin_name', '$admin_email', '$admin_password', '$admin_create_at')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => "Admin added successfully!"]);
} else {
    echo json_encode(["error" => "Error inserting admin: " . $conn->error]);
}

$conn->close();
?>
