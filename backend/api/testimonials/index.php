<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $db->prepare("SELECT * FROM testimonials WHERE status = 'approved' ORDER BY id DESC");
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['patient_name']) || empty($data['testimonial'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name and Testimonial content are required."]);
            exit();
        }
        $stmt = $db->prepare("INSERT INTO testimonials (patient_name, patient_email, patient_photo, treatment, department, doctor, rating, testimonial, verified, status) 
                              VALUES (:patient_name, :patient_email, :patient_photo, :treatment, :department, :doctor, :rating, :testimonial, 1, 'approved')");
        $stmt->execute([
            ":patient_name" => $data['patient_name'],
            ":patient_email" => $data['patient_email'] ?? '',
            ":patient_photo" => $data['patient_photo'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            ":treatment" => $data['treatment'] ?? 'Hospital Patient Care',
            ":department" => $data['department'] ?? 'General Care',
            ":doctor" => $data['doctor'] ?? 'MediCare Team',
            ":rating" => intval($data['rating'] ?? 5),
            ":testimonial" => $data['testimonial']
        ]);
        echo json_encode(["status" => "success", "message" => "Testimonial submitted successfully"]);
        break;
}
