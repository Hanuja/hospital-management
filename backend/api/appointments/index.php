<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("SELECT a.*, d.name as doctor_name, d.specialization, dept.name as department_name, d.consultation_fee 
                                  FROM appointments a 
                                  LEFT JOIN doctors d ON a.doctor_id = d.id 
                                  LEFT JOIN departments dept ON a.department_id = dept.id 
                                  WHERE a.id = :id LIMIT 1");
            $stmt->execute([":id" => intval($_GET['id'])]);
            $apt = $stmt->fetch();
            echo json_encode(["status" => "success", "data" => $apt]);
        } else if (isset($_GET['email'])) {
            $stmt = $db->prepare("SELECT a.*, d.name as doctor_name, dept.name as department_name 
                                  FROM appointments a 
                                  LEFT JOIN doctors d ON a.doctor_id = d.id 
                                  LEFT JOIN departments dept ON a.department_id = dept.id 
                                  WHERE a.patient_email = :email ORDER BY a.id DESC");
            $stmt->execute([":email" => trim($_GET['email'])]);
            $apts = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $apts]);
        } else {
            $stmt = $db->prepare("SELECT a.*, d.name as doctor_name, dept.name as department_name 
                                  FROM appointments a 
                                  LEFT JOIN doctors d ON a.doctor_id = d.id 
                                  LEFT JOIN departments dept ON a.department_id = dept.id 
                                  ORDER BY a.id DESC");
            $stmt->execute();
            $apts = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $apts]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['patient_name']) || empty($data['patient_email']) || empty($data['appointment_date'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Patient Name, Email, and Appointment Date are required."]);
            exit();
        }

        $query = "INSERT INTO appointments (patient_id, patient_name, patient_email, patient_phone, doctor_id, department_id, package_id, appointment_date, appointment_time, consultation_type, reason, medical_notes, status) 
                  VALUES (:patient_id, :patient_name, :patient_email, :patient_phone, :doctor_id, :department_id, :package_id, :appointment_date, :appointment_time, :consultation_type, :reason, :medical_notes, :status)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ":patient_id" => $data['patient_id'] ?? null,
            ":patient_name" => $data['patient_name'],
            ":patient_email" => $data['patient_email'],
            ":patient_phone" => $data['patient_phone'] ?? '',
            ":doctor_id" => $data['doctor_id'] ?? null,
            ":department_id" => $data['department_id'] ?? null,
            ":package_id" => $data['package_id'] ?? null,
            ":appointment_date" => $data['appointment_date'],
            ":appointment_time" => $data['appointment_time'] ?? '10:00 AM',
            ":consultation_type" => $data['consultation_type'] ?? 'In-person',
            ":reason" => $data['reason'] ?? '',
            ":medical_notes" => $data['medical_notes'] ?? '',
            ":status" => $data['status'] ?? 'pending'
        ]);
        $appointmentId = $db->lastInsertId();
        echo json_encode(["status" => "success", "message" => "Appointment created", "appointment_id" => $appointmentId]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Appointment ID is required."]);
            exit();
        }

        // Build dynamic update query based on provided fields
        $allowedFields = [
            'patient_name', 'patient_email', 'patient_phone',
            'doctor_id', 'department_id', 'package_id',
            'appointment_date', 'appointment_time',
            'consultation_type', 'reason', 'medical_notes', 'status'
        ];

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

        $query = "UPDATE appointments SET " . implode(', ', $setClauses) . " WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        echo json_encode(["status" => "success", "message" => "Appointment updated successfully"]);
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Appointment ID is required."]);
            exit();
        }

        $id = intval($_GET['id']);
        $stmt = $db->prepare("DELETE FROM appointments WHERE id = :id");
        $stmt->execute([":id" => $id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Appointment deleted successfully"]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Appointment not found."]);
        }
        break;
}
