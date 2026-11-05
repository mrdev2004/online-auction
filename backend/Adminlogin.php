<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'localhost';
$dbname = 'auction';
$username = 'root';
$password = '';

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

if (!isset($input['email']) || !isset($input['password'])) {
    echo json_encode(["success" => false, "message" => "Missing email or password."]);
    exit;
}

$adminEmail = $input['email'];
$adminPassword = $input['password'];

try {
    $stmt = $pdo->prepare("SELECT * FROM admin WHERE admin_email = ?");
    $stmt->execute([$adminEmail]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin) {
        // Use password_verify() to check hashed password
        if ($adminPassword === $admin['admin_password']) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful!",
                "admin" => [
                    "a_id" => $admin['a_id'],
                    "admin_name" => $admin['admin_name'],
                    "admin_email" => $admin['admin_email'],
                    
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Admin not found."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
