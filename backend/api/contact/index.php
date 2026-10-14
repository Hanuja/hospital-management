<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $db->prepare("SELECT * FROM contact_messages ORDER BY id DESC");
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name, Email, and Message content are required."]);
            exit();
        }
        $stmt = $db->prepare("INSERT INTO contact_messages (name, email, phone, subject, message, status) 
                              VALUES (:name, :email, :phone, :subject, :message, 'unread')");
        $stmt->execute([
            ":name" => $data['name'],
            ":email" => $data['email'],
            ":phone" => $data['phone'] ?? '',
            ":subject" => $data['subject'] ?? 'General Inquiry',
            ":message" => $data['message']
        ]);
        echo json_encode(["status" => "success", "message" => "Message sent successfully. Our team will contact you shortly."]);
        break;
}
