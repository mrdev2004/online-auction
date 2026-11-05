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

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Fetch users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = [];
    $query = "SELECT * FROM users";
    $result = $conn->query($query);
    
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        'users' => $users,
        'totalUsers' => count($users),
        'adminUsers' => count(array_filter($users, fn($u) => $u['role'] === 'Auctioneer')),
        'bidderUsers' => count(array_filter($users, fn($u) => $u['role'] === 'Bidder'))
    ]);
}

// Delete user
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $userId = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $deleted = $stmt->execute();
    
    echo json_encode(['status' => $deleted ? 'success' : 'error', 'message' => $deleted ? 'User deleted' : 'Failed to delete user']);
}

// Update user status (Block/Unblock)
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['id']) && isset($data['user_status'])) {
        $id = $data['id'];
        $status = ($data['user_status'] === 'Blocked') ? 'Blocked' : 'Unblocked';

        $stmt = $conn->prepare("UPDATE users SET user_status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        $updated = $stmt->execute();

        echo json_encode(["status" => $updated ? "success" : "error", "message" => $updated ? "User status updated" : "Failed to update status"]);
    }
}

$conn->close();
?>
