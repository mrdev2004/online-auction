<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root"; // Update if needed
$password = ""; // Update if needed
$dbname = "auction";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Fetch feedbacks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $feedbacks = [];
    $query = "SELECT f_id, name_feedback_person, message FROM feedback"; // Check if 'feedback' table exists
    $result = $conn->query($query);

    if (!$result) {
        die(json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]));
    }

    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }

    echo json_encode($feedbacks);
}

$conn->close();
?>
