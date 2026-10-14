<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Mock response for now, in a real app this would query the doctors table
$doctors = array();

for($i = 1; $i <= 8; $i++) {
    array_push($doctors, array(
        "id" => $i,
        "name" => "Dr. Robert Wilson",
        "specialty" => "Cardiologist",
        "department_id" => 1,
        "experience" => "15+ years",
        "image" => "doctor_portrait.jpg"
    ));
}

http_response_code(200);
echo json_encode(array("message" => "Doctors retrieved successfully", "data" => $doctors));
?>
