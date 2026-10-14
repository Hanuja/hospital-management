<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $query = "SELECT p.*, a.patient_name, a.patient_email, d.name as doctor_name 
                  FROM payments p 
                  LEFT JOIN appointments a ON p.appointment_id = a.id 
                  LEFT JOIN doctors d ON a.doctor_id = d.id 
                  ORDER BY p.id DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['appointment_id']) || empty($data['amount'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Appointment ID and Amount are required."]);
            exit();
        }

        $txnId = "MCP-TXN-" . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));
        $stmt = $db->prepare("INSERT INTO payments (appointment_id, amount, payment_method, transaction_id, status) 
                              VALUES (:appointment_id, :amount, :payment_method, :transaction_id, 'completed')");
        $stmt->execute([
            ":appointment_id" => intval($data['appointment_id']),
            ":amount" => floatval($data['amount']),
            ":payment_method" => $data['payment_method'] ?? 'Card',
            ":transaction_id" => $txnId
        ]);

        // Update appointment status to confirmed
        $upStmt = $db->prepare("UPDATE appointments SET status = 'confirmed' WHERE id = :id");
        $upStmt->execute([":id" => intval($data['appointment_id'])]);

        echo json_encode([
            "status" => "success",
            "message" => "Payment successful",
            "payment_id" => $db->lastInsertId(),
            "transaction_id" => $txnId
        ]);
        break;
}
