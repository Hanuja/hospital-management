<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    // ---------------------------------------------------------
    // 1. READ / VIEW (GET)
    // ---------------------------------------------------------
    case 'GET':
        if (isset($_GET['id'])) {
            // Read Single Record
            $id = intval($_GET['id']);
            $query = "SELECT p.*, u.name, u.email, u.phone 
                      FROM patients p 
                      LEFT JOIN users u ON p.user_id = u.id 
                      WHERE p.id = :id LIMIT 1";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $record = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($record) {
                echo json_encode(["status" => "success", "data" => $record]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Record not found"]);
            }
        } else {
            // Read All Records
            $query = "SELECT p.*, u.name, u.email, u.phone 
                      FROM patients p 
                      LEFT JOIN users u ON p.user_id = u.id 
                      ORDER BY p.id DESC";
            
            $stmt = $db->prepare($query);
            $stmt->execute();
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(["status" => "success", "data" => $records]);
        }
        break;

    // ---------------------------------------------------------
    // 2. ADD / CREATE (POST)
    // ---------------------------------------------------------
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Basic validation
        if (empty($data['user_id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "User ID is required."]);
            exit();
        }

        $query = "INSERT INTO patients (user_id, nic, dob, gender, address) 
                  VALUES (:user_id, :nic, :dob, :gender, :address)";
        
        $stmt = $db->prepare($query);
        $stmt->execute([
            ":user_id" => intval($data['user_id']),
            ":nic" => isset($data['nic']) ? trim($data['nic']) : null,
            ":dob" => isset($data['dob']) ? trim($data['dob']) : null,
            ":gender" => isset($data['gender']) ? trim($data['gender']) : 'Male',
            ":address" => isset($data['address']) ? trim($data['address']) : null
        ]);

        $newId = $db->lastInsertId();
        
        if ($newId) {
            http_response_code(201);
            echo json_encode(["status" => "success", "message" => "Record created successfully", "id" => $newId]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to create record."]);
        }
        break;

    // ---------------------------------------------------------
    // 3. UPDATE (PUT)
    // ---------------------------------------------------------
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID is required for update."]);
            exit();
        }

        $query = "UPDATE patients 
                  SET nic = :nic, dob = :dob, gender = :gender, address = :address 
                  WHERE id = :id";
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            ":nic" => isset($data['nic']) ? trim($data['nic']) : null,
            ":dob" => isset($data['dob']) ? trim($data['dob']) : null,
            ":gender" => isset($data['gender']) ? trim($data['gender']) : 'Male',
            ":address" => isset($data['address']) ? trim($data['address']) : null,
            ":id" => intval($data['id'])
        ]);

        if ($result) {
            echo json_encode(["status" => "success", "message" => "Record updated successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to update record."]);
        }
        break;

    // ---------------------------------------------------------
    // 4. DELETE
    // ---------------------------------------------------------
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = isset($data['id']) ? intval($data['id']) : (isset($_GET['id']) ? intval($_GET['id']) : 0);
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Valid ID is required for deletion."]);
            exit();
        }

        $query = "DELETE FROM patients WHERE id = :id";
        $stmt = $db->prepare($query);
        $result = $stmt->execute([":id" => $id]);

        if ($result) {
            echo json_encode(["status" => "success", "message" => "Record deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to delete record."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed"]);
        break;
}
?>
