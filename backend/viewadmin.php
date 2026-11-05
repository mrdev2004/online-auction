<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (change for security)
header("Content-Type: application/json"); // Set JSON response
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auction";
$conn = new mysqli($servername, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get Request Method
$method = $_SERVER['REQUEST_METHOD'];

// Handle API Routes
switch ($method) {
    case 'GET': // Fetch all admins
        $searchQuery = "";
        if (isset($_GET['search'])) {
            $searchTerm = $conn->real_escape_string($_GET['search']);
            $searchQuery = " WHERE admin_name LIKE '%$searchTerm%' OR admin_email LIKE '%$searchTerm%' OR admin_role LIKE '%$searchTerm%'";
        }
        $query = "SELECT * FROM admin" . $searchQuery;
        $result = $conn->query($query);
        $admins = [];
        while ($row = $result->fetch_assoc()) {
            $admins[] = $row;
        }
        echo json_encode($admins);
        break;

    case 'POST': // Add new admin
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["error" => "Invalid JSON data"]);
            exit();
        }

        $name = $conn->real_escape_string($data['admin_name']);
        $email = $conn->real_escape_string($data['admin_email']);
        $contact = $conn->real_escape_string($data['admin_contact']);
        $role = $conn->real_escape_string($data['admin_role']);
        $term = $conn->real_escape_string($data['admin_term']);

        $query = "INSERT INTO admin (admin_name, admin_email, admin_contact, admin_role, admin_term) 
                  VALUES ('$name', '$email', '$contact', '$role', '$term')";
        if ($conn->query($query)) {
            echo json_encode(["success" => "Admin added successfully"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case 'PUT': // Edit an admin
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['a_id'])) {
            echo json_encode(["error" => "Invalid JSON data"]);
            exit();
        }

        $id = $conn->real_escape_string($data['a_id']);
        $name = $conn->real_escape_string($data['admin_name']);
        $email = $conn->real_escape_string($data['admin_email']);
        $contact = $conn->real_escape_string($data['admin_contact']);
        $role = $conn->real_escape_string($data['admin_role']);
        $term = $conn->real_escape_string($data['admin_term']);

        $query = "UPDATE admin SET 
                    admin_name='$name', 
                    admin_email='$email', 
                    admin_contact='$contact', 
                    admin_role='$role', 
                    admin_term='$term' 
                  WHERE a_id='$id'";

        if ($conn->query($query)) {
            echo json_encode(["success" => "Admin updated successfully"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;

        case 'DELETE': // Delete an admin
            $data = json_decode(file_get_contents("php://input"), true); // Decode JSON
            if (!isset($data['a_id'])) {
                echo json_encode(["error" => "Admin ID required"]);
                exit();
            }
        
            $id = $conn->real_escape_string($data['a_id']);
            $query = "DELETE FROM admin WHERE a_id='$id'";
        
            if ($conn->query($query)) {
                echo json_encode(["success" => "Admin deleted successfully"]);
            } else {
                echo json_encode(["error" => $conn->error]);
            }
            break;
        

    default:
        echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
