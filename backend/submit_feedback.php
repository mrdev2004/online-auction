<?php
// Set response headers
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT'); // Include POST method
header('Access-Control-Allow-Headers: Content-Type');

// Database connection details
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "auction"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    sendResponse(false, "Connection failed: " . $conn->connect_error);
    exit;
}

// Get JSON data from frontend
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Validate input data
if (!isset($data['name_feedback_person']) || !isset($data['message'])) {
    sendResponse(false, "Missing required fields");
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name_feedback_person']));
$message = htmlspecialchars(strip_tags($data['message']));

// Validate non-empty inputs
if (empty($name) || empty($message)) {
    sendResponse(false, "Name and message cannot be empty");
    exit;
}

// Prepare and execute SQL statement
$stmt = $conn->prepare("INSERT INTO feedback (name_feedback_person, message, created_at) VALUES (?, ?, NOW())");
$stmt->bind_param("ss", $name, $message);

if ($stmt->execute()) {
    sendResponse(true, "Feedback submitted successfully");
} else {
    sendResponse(false, "Error: " . $stmt->error);
}

// Close connections
$stmt->close();
$conn->close();

// Function to send JSON response
function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
}
?>
