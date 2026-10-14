<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $db->prepare("SELECT * FROM departments WHERE id = :id LIMIT 1");
            $stmt->execute([":id" => $id]);
            $dept = $stmt->fetch();
            echo json_encode(["status" => "success", "data" => $dept]);
        } else {
            $stmt = $db->prepare("SELECT * FROM departments ORDER BY id ASC");
            $stmt->execute();
            $departments = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $departments]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $db->prepare("INSERT INTO departments (name, description, image, icon) VALUES (:name, :description, :image, :icon)");
        $stmt->execute([
            ":name" => $data['name'],
            ":description" => $data['description'] ?? '',
            ":image" => $data['image'] ?? '',
            ":icon" => $data['icon'] ?? 'Activity'
        ]);
        echo json_encode(["status" => "success", "message" => "Department added", "id" => $db->lastInsertId()]);
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("DELETE FROM departments WHERE id = :id");
            $stmt->execute([":id" => intval($_GET['id'])]);
            echo json_encode(["status" => "success", "message" => "Department deleted"]);
        }
        break;
}
