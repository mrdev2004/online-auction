<?php
header("Content-Type: application/json");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
// Database connection details
$host = 'localhost';
$dbname = 'auction';
$username = 'root';
$password = '';

try {
    // Establish database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

try {
    // Retrieve all auctions
    $sql = "SELECT *
            FROM auction_data";
    $stmt = $pdo->query($sql);
    $auctions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the auctions data as JSON
    echo json_encode(["data" => $auctions]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve auctions: " . $e->getMessage()]);
}
