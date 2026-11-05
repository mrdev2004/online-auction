<?php
// user-api.php: Handles all database operations

// Set response headers
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, PUT'); // Allow DELETE and PUT methods
header('Access-Control-Allow-Headers: Content-Type');

// Database connection details
$servername = "localhost";
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$dbname = "auction"; // Change to your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch all users
function getAllUsers() {
    global $conn;
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to delete a user by ID
function deleteUser($userId) {
    global $conn;
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    return $stmt->execute();
}

// Function to update a user by ID
function updateUser($userId, $name, $email, $contact, $role) {
    global $conn;
    $sql = "UPDATE users SET name = ?, email = ?, contact = ?, role = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $name, $email, $contact, $role, $userId);
    return $stmt->execute();
}

// Handle different HTTP requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // If the request method is GET, fetch all users
    $users = getAllUsers();
    echo json_encode($users);

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    // If the request method is DELETE and an ID is provided
    $userId = $_GET['id'];
    $deleted = deleteUser($userId);
    
    if ($deleted) {
        echo json_encode(['message' => 'User deleted successfully']);
    } else {
        echo json_encode(['message' => 'Failed to delete user']);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    // If the request method is PUT and an ID is provided
    $userId = $_GET['id'];
    
    // Get the data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['contact']) || !isset($data['role'])) {
        echo json_encode(['message' => 'Missing required fields']);
        exit();
    }

    // Retrieve the updated data
    $name = $data['name'];
    $email = $data['email'];
    $contact = $data['contact'];
    $role = $data['role'];

    // Update the user
    $updated = updateUser($userId, $name, $email, $contact, $role);
    
    if ($updated) {
        echo json_encode(['message' => 'User updated successfully']);
    } else {
        echo json_encode(['message' => 'Failed to update user']);
    }
}

// Close the connection
$conn->close();
?>