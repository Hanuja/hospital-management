<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();

$stmt = $db->prepare("SELECT * FROM faqs WHERE status = 'active' ORDER BY category ASC, id ASC");
$stmt->execute();
echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
