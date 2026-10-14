<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $db->prepare("SELECT ja.*, c.job_title, c.department FROM job_applications ja LEFT JOIN careers c ON ja.career_id = c.id ORDER BY ja.id DESC");
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['career_id']) || empty($data['name']) || empty($data['email'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Job Position, Name, and Email are required."]);
            exit();
        }
        $stmt = $db->prepare("INSERT INTO job_applications (career_id, name, email, phone, qualification, experience, cover_letter, resume, status) 
                              VALUES (:career_id, :name, :email, :phone, :qualification, :experience, :cover_letter, :resume, 'submitted')");
        $stmt->execute([
            ":career_id" => intval($data['career_id']),
            ":name" => $data['name'],
            ":email" => $data['email'],
            ":phone" => $data['phone'] ?? '',
            ":qualification" => $data['qualification'] ?? '',
            ":experience" => $data['experience'] ?? '',
            ":cover_letter" => $data['cover_letter'] ?? '',
            ":resume" => $data['resume'] ?? 'resume_uploaded.pdf'
        ]);
        echo json_encode(["status" => "success", "message" => "Application submitted successfully"]);
        break;
}
