<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
$servername = "localhost";
$username = "root"; // Change if necessary
$password = ""; // Change if necessary
$dbname = "auction";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
$totalPaymentsQuery = "SELECT COUNT(*) as total_payments FROM payment";
$totalPaymentsResult = $conn->query($totalPaymentsQuery);
$totalPaymentsRow = $totalPaymentsResult->fetch_assoc();
$totalPayments = $totalPaymentsRow['total_payments'];
$Query = "SELECT * FROM payment";
$Result = $conn->query($Query);
$Data = [];
while ($row = $Result->fetch_assoc()) {
    $Data[] = $row;
}
// Return JSON response
echo json_encode([
    "totalPayments" => $totalPayments,
    "payments" => $Data
]);

$conn->close();
?>
