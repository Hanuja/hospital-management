<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $query = "SELECT d.*, dept.name as department_name FROM doctors d LEFT JOIN departments dept ON d.department_id = dept.id WHERE d.id = :id LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $doctor = $stmt->fetch();
            if ($doctor) {
                echo json_encode(["status" => "success", "data" => $doctor]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Doctor not found"]);
            }
        } else {
            $query = "SELECT d.*, dept.name as department_name FROM doctors d LEFT JOIN departments dept ON d.department_id = dept.id ORDER BY d.id ASC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $doctors = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $doctors]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Doctor Name is required."]);
            exit();
        }
        $deptId = !empty($data['department_id']) ? intval($data['department_id']) : 1;
        $query = "INSERT INTO doctors (department_id, name, qualification, specialization, experience, gender, bio, image, consultation_fee, availability, rating) 
                  VALUES (:department_id, :name, :qualification, :specialization, :experience, :gender, :bio, :image, :consultation_fee, :availability, :rating)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ":department_id" => $deptId,
            ":name" => trim($data['name']),
            ":qualification" => isset($data['qualification']) ? trim($data['qualification']) : '',
            ":specialization" => isset($data['specialization']) ? trim($data['specialization']) : '',
            ":experience" => isset($data['experience']) ? intval($data['experience']) : 5,
            ":gender" => isset($data['gender']) ? $data['gender'] : 'Male',
            ":bio" => isset($data['bio']) ? trim($data['bio']) : '',
            ":image" => !empty($data['image']) ? trim($data['image']) : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
            ":consultation_fee" => isset($data['consultation_fee']) ? floatval($data['consultation_fee']) : 50.00,
            ":availability" => !empty($data['availability']) ? trim($data['availability']) : 'Mon - Fri, 9:00 AM - 4:00 PM',
            ":rating" => isset($data['rating']) ? floatval($data['rating']) : 4.90
        ]);
        $newId = $db->lastInsertId();
        echo json_encode(["status" => "success", "message" => "Doctor added successfully", "id" => $newId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['id']) || empty($data['name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Doctor ID and Name are required."]);
            exit();
        }
        $deptId = !empty($data['department_id']) ? intval($data['department_id']) : 1;
        $query = "UPDATE doctors SET 
                    department_id = :department_id,
                    name = :name,
                    qualification = :qualification,
                    specialization = :specialization,
                    experience = :experience,
                    gender = :gender,
                    bio = :bio,
                    image = :image,
                    consultation_fee = :consultation_fee,
                    availability = :availability
                  WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ":id" => intval($data['id']),
            ":department_id" => $deptId,
            ":name" => trim($data['name']),
            ":qualification" => isset($data['qualification']) ? trim($data['qualification']) : '',
            ":specialization" => isset($data['specialization']) ? trim($data['specialization']) : '',
            ":experience" => isset($data['experience']) ? intval($data['experience']) : 5,
            ":gender" => isset($data['gender']) ? $data['gender'] : 'Male',
            ":bio" => isset($data['bio']) ? trim($data['bio']) : '',
            ":image" => !empty($data['image']) ? trim($data['image']) : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
            ":consultation_fee" => isset($data['consultation_fee']) ? floatval($data['consultation_fee']) : 50.00,
            ":availability" => !empty($data['availability']) ? trim($data['availability']) : 'Mon - Fri, 9:00 AM - 4:00 PM'
        ]);
        echo json_encode(["status" => "success", "message" => "Doctor updated successfully"]);
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $db->prepare("DELETE FROM doctors WHERE id = :id");
            $stmt->execute([":id" => $id]);
            echo json_encode(["status" => "success", "message" => "Doctor deleted successfully"]);
        } else {
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id'])) {
                $stmt = $db->prepare("DELETE FROM doctors WHERE id = :id");
                $stmt->execute([":id" => intval($data['id'])]);
                echo json_encode(["status" => "success", "message" => "Doctor deleted successfully"]);
            } else {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Doctor ID is required for deletion"]);
            }
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed"]);
        break;
}
