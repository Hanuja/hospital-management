<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode([
    "app" => "MediCare Plus Hospital Management REST API",
    "version" => "2.0.0",
    "status" => "active",
    "timestamp" => date("Y-m-d H:i:s")
]);
