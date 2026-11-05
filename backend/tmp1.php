<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auction"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function fetchAuctions() {
    global $conn;
    $sql = "SELECT id, title, description, price, image_path, start_time, end_time, created_at FROM shopdata";
    $result = $conn->query($sql);
    $auctions = [];
    
    while ($row = $result->fetch_assoc()) {
        $auctions[] = $row;
    }
    return $auctions;
}

function updateAuction($updateData) {
    global $conn;

    $stmt = $conn->prepare("UPDATE shopdata SET title=?, description=?, price=?, start_time=?, end_time=? WHERE id=?");
    $stmt->bind_param("sssssi", $updateData['title'], $updateData['description'], $updateData['price'], $updateData['start_time'], $updateData['end_time'], $updateData['update_id']);

    return $stmt->execute();
}

function deleteAuction($id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM shopdata WHERE id=?");
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(fetchAuctions());
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['update_id'])) {
        $updateData = [
            'update_id' => $_POST['update_id'],
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'price' => $_POST['price'],
            'start_time' => $_POST['start_time'],
            'end_time' => $_POST['end_time']
        ];

        if (updateAuction($updateData)) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['id']) && deleteAuction($data['id'])) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

$conn->close();
?>
