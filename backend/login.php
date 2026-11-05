<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database credentials
$host = 'localhost';
$dbname = 'auction';
$username = 'root';
$password = '';

// Establish a database connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// Get JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Check if username and password are provided
if (!isset($input['username']) || !isset($input['password'])) {
    echo json_encode(["success" => false, "message" => "Missing username or password."]);
    exit;
}

$usernameInput = $input['username'];
$passwordInput = $input['password']; // Plain text password entered by the user

// Fetch user by email
try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$usernameInput]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Compare plain-text password
        if ($passwordInput === $user['password']) {
            // Password matches
            echo json_encode([
                "success" => true,
                "message" => "Login successful!",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "contact" => $user['contact'],
                    "role" => $user['role'],
                    "profile_photo" => $user['profile_photo'],
                    "terms" => $user['terms'],
                    "user_status"=>$user['user_status']
                ]
            ]);
        } else {
            // Password does not match
            echo json_encode(["success" => false, "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
