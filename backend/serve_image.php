<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: image/jpeg");

// Path handling
$uploadsDir = __DIR__ . '/./uploads/';
$imageName = rawurldecode($_GET['file']);
$targetFile = $uploadsDir . $imageName;

if (file_exists($targetFile)) {
    readfile($targetFile);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Image not found']);
}
?>
