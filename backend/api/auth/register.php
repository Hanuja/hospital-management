<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name, Email, and Password are required."]);
    exit();
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = password_hash(trim($data['password']), PASSWORD_BCRYPT);
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$role = isset($data['role']) && $data['role'] === 'admin' ? 'admin' : 'patient';

// Check existing
$checkQuery = "SELECT id FROM users WHERE email = :email LIMIT 1";
$checkStmt = $db->prepare($checkQuery);
$checkStmt->bindParam(":email", $email);
$checkStmt->execute();

if ($checkStmt->rowCount() > 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "An account with this email already exists."]);
    exit();
}

$query = "INSERT INTO users (name, email, password, phone, role) VALUES (:name, :email, :password, :phone, :role)";
$stmt = $db->prepare($query);
$stmt->bindParam(":name", $name);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":password", $password);
$stmt->bindParam(":phone", $phone);
$stmt->bindParam(":role", $role);

if ($stmt->execute()) {
    $userId = $db->lastInsertId();
    if ($role === 'patient') {
        $pStmt = $db->prepare("INSERT INTO patients (user_id) VALUES (:user_id)");
        $pStmt->bindParam(":user_id", $userId);
        $pStmt->execute();
    }
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Registration successful",
        "user" => [
            "id" => $userId,
            "name" => $name,
            "email" => $email,
            "phone" => $phone,
            "role" => $role
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Registration failed. Please try again."]);
}
