<?php
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();

$stmt = $db->prepare("SELECT * FROM careers ORDER BY id ASC");
$stmt->execute();
echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
