<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $db->prepare("SELECT * FROM gallery ORDER BY id DESC");
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $db->prepare("INSERT INTO gallery (title, image, category, description) VALUES (:title, :image, :category, :description)");
        $stmt->execute([
            ":title" => $data['title'],
            ":image" => $data['image'],
            ":category" => $data['category'],
            ":description" => $data['description'] ?? ''
        ]);
        echo json_encode(["status" => "success", "message" => "Gallery item added", "id" => $db->lastInsertId()]);
        break;
}
