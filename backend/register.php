<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
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

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$contact = $_POST['contact'];
$role = $_POST['role'];
$terms = $_POST['terms'] === 'true' ? 1 : 0;

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email address."]);
    exit;
}

// Handle file upload
$profilePhotoPath = null;
if (isset($_FILES['profilePhoto']) && $_FILES['profilePhoto']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true); // Create directory if it doesn't exist
    }

    $fileName = basename($_FILES['profilePhoto']['name']);
    $filePath = $uploadDir . uniqid() . '_' . $fileName;

    if (move_uploaded_file($_FILES['profilePhoto']['tmp_name'], $filePath)) {
        $profilePhotoPath = $filePath;
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload profile photo."]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, contact, role, terms, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $password, $contact, $role, $terms, $profilePhotoPath]);
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
