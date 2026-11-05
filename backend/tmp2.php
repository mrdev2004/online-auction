<?php
// user-api.php: Handles all database operations
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auction";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Function to fetch all users
function getAllUsers() {
    global $conn;
    $sql = "SELECT * FROM comm";
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to fetch total user count
function getTotalUsers() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) AS total_users FROM users");
    return $result->fetch_assoc()['total_users'];
}

// Function to delete a user
function deleteUser($userId) {
    global $conn;
    $sql = "DELETE FROM comm WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die(json_encode(["message" => "SQL prepare failed: " . $conn->error]));
    }
    $stmt->bind_param("i", $userId);
    return $stmt->execute();
}

// Function to update approval status
function updateApprovalStatus($id, $status) {
    global $conn;
    $sql = "UPDATE comm SET approval_status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die(json_encode(["message" => "SQL prepare failed: " . $conn->error]));
    }
    $stmt->bind_param("si", $status, $id);
    $result = $stmt->execute();
    if (!$result) {
        die(json_encode(["message" => "SQL execute failed: " . $stmt->error]));
    }
    return $result;
}

// Handle GET request (Fetch users)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = getAllUsers();
    $totalUsers = getTotalUsers();
    echo json_encode(['users' => $users, 'totalUsers' => $totalUsers]);
}

// Handle DELETE request (Delete user)
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $userId = $_GET['id'];
    $deleted = deleteUser($userId);
    echo json_encode(['message' => $deleted ? 'User deleted successfully' : 'Failed to delete user']);
}

// Handle POST request (Update approval status)
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    if (!isset($inputData['approval_id'], $inputData['approval_status'])) {
        echo json_encode(['message' => 'Missing required parameters']);
        exit();
    }
    $approval_id = $inputData['approval_id'];
    $approval_status = $inputData['approval_status'];
    $updated = updateApprovalStatus($approval_id, $approval_status);
    echo json_encode(['message' => $updated ? 'Approval status updated' : 'Failed to update status']);
}

$conn->close();
?>