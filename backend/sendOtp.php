<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Database credentials
$host = 'localhost';
$dbname = 'auction';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;

if (!$email) {
    echo json_encode(["success" => false, "message" => "Email is required."]);
    exit;
}

// Generate OTP
$otp = random_int(100000, 999999);
$expiry = date("Y-m-d H:i:s", strtotime("+10 minutes"));

try {
    // Store OTP in the database
    $stmt = $pdo->prepare("INSERT INTO otps (email, code, expiry) VALUES (?, ?, ?)");
    $stmt->execute([$email, $otp, $expiry]);

    // Send OTP via email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@example.com';
    $mail->Password = 'your-password';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('your-email@example.com', 'Auction App');
    $mail->addAddress($email);
    $mail->Subject = 'Your Login Code';
    $mail->Body = "Your login code is: $otp";

    if ($mail->send()) {
        echo json_encode(["success" => true, "message" => "Code sent successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to send code."]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
