<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
// Database connection settings
$servername = "localhost";  
$username = "root";         
$password = "";             
$dbname = "auction";        

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get total auctions
function getTotalAuctions($conn) {
    $query = "SELECT COUNT(*) AS total_auctions FROM shopdata";
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

// Function to get total commission
function getTotalCommission($conn) {
    $query = "SELECT SUM(commission) AS total_commission FROM comm";
    $result = $conn->query($query);
    return $result->fetch_assoc();
}

// Function to get recent auctions
function getRecentAuctions($conn) {
    $query = "SELECT id, title, start_time, price FROM shopdata";
    $result = $conn->query($query);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to get recent commissions
function getRecentCommissions($conn) {
    $query = "SELECT auction, commission, date FROM comm ORDER BY date DESC LIMIT 10";
    $result = $conn->query($query);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Set the content type to JSON
header('Content-Type: application/json');

// Fetch all data
$data = [
    'total_auctions' => getTotalAuctions($conn),
    'total_commission' => getTotalCommission($conn),
    'recent_auctions' => getRecentAuctions($conn),
    'recent_commissions' => getRecentCommissions($conn)
];

// Return all data as a JSON response
echo json_encode($data);

// Close the database connection
$conn->close();
?>
