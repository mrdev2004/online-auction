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

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure required fields are set
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? '';
    $startTime = $_POST['startTime'] ?? '';
    $endTime = $_POST['endTime'] ?? '';
    $auctioneer_name = $_POST['auctioneer_name'] ?? '';
    

    // Validate inputs
    if (!$title || !$description || !$price || !$startTime || !$endTime) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Handle file upload
    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = basename($_FILES['image']['name']);
        $targetFilePath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            $imagePath = 'uploads/' . $fileName;
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload the image."]);
            exit;
        }
    }

    // Insert data into the database
    $sql = "INSERT INTO shopdata (title, description, price, image_path, start_time, end_time,auctioneer_name)
            VALUES (:title, :description, :price, :image_path, :start_time, :end_time, :auctioneer_name)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':title' => $title,
            ':description' => $description,
            ':price' => $price,
            ':image_path' => $imagePath,
            ':start_time' => $startTime,
            ':end_time' => $endTime,
            ':auctioneer_name' => $auctioneer_name  
        ]);
        echo json_encode(["success" => "Auction added successfully."]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add auction: " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
}
