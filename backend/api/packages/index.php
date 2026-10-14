<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("SELECT * FROM health_packages WHERE id = :id LIMIT 1");
            $stmt->execute([":id" => intval($_GET['id'])]);
            $pkg = $stmt->fetch();
            echo json_encode(["status" => "success", "data" => $pkg]);
        } else {
            $stmt = $db->prepare("SELECT * FROM health_packages ORDER BY id ASC");
            $stmt->execute();
            echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Package name is required."]);
            exit();
        }

        $query = "INSERT INTO health_packages (name, description, price, age_group, tests, image) 
                  VALUES (:name, :description, :price, :age_group, :tests, :image)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ":name" => $data['name'],
            ":description" => $data['description'] ?? '',
            ":price" => $data['price'] ?? 0,
            ":age_group" => $data['age_group'] ?? '18-60',
            ":tests" => $data['tests'] ?? '',
            ":image" => $data['image'] ?? ''
        ]);
        $packageId = $db->lastInsertId();
        echo json_encode(["status" => "success", "message" => "Package created", "package_id" => $packageId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Package ID is required."]);
            exit();
        }

        $allowedFields = ['name', 'description', 'price', 'age_group', 'tests', 'image'];
        $setClauses = [];
        $params = [":id" => intval($data['id'])];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $setClauses[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (empty($setClauses)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No fields provided for update."]);
            exit();
        }

        $query = "UPDATE health_packages SET " . implode(', ', $setClauses) . " WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        echo json_encode(["status" => "success", "message" => "Package updated successfully"]);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Package ID is required."]);
            exit();
        }

        $id = intval($_GET['id']);
        $stmt = $db->prepare("DELETE FROM health_packages WHERE id = :id");
        $stmt->execute([":id" => $id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Package deleted successfully"]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Package not found."]);
        }
        break;
}
