<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "../../config/database.php";

$database = new Database();
$db = $database->getConnection();

try {
    // 1. Fix Markdown URLs in the image column
    $query = "SELECT id, image FROM doctors";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $fixedCount = 0;
    foreach ($doctors as $doc) {
        $img = $doc['image'];
        // Check if it matches markdown format: [url](url)
        if (preg_match('/^\[(.*?)\]\((.*?)\)$/', $img, $matches)) {
            $realUrl = $matches[2];
            
            // Update the DB
            $updateQ = "UPDATE doctors SET image = :img WHERE id = :id";
            $uStmt = $db->prepare($updateQ);
            $uStmt->execute([
                ':img' => $realUrl,
                ':id' => $doc['id']
            ]);
            $fixedCount++;
        }
    }

    // 2. Fix Doctor #8 Record (Dr. Natasha Perera)
    $q8 = "UPDATE doctors SET 
            department_id = 8,
            name = 'Dr. Natasha Perera',
            qualification = 'MD (Dermatology), FAAD',
            specialization = 'Medical & Aesthetic Dermatology',
            experience = 10,
            gender = 'Female',
            bio = 'Specialist in laser treatments, eczema management, skin rejuvenation, and pediatric skin conditions.',
            image = 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80',
            consultation_fee = 55.00,
            availability = 'Tue - Sat, 11:00 AM - 5:00 PM',
            rating = 4.91
           WHERE id = 8";
    $stmt8 = $db->prepare($q8);
    $stmt8->execute();
    
    // Check if row 8 exists, if not, insert it manually.
    if ($stmt8->rowCount() === 0) {
        // Just in case it was deleted, insert it
        $db->query("INSERT IGNORE INTO doctors (id, department_id, name, qualification, specialization, experience, gender, bio, image, consultation_fee, availability, rating) 
        VALUES (8, 8, 'Dr. Natasha Perera', 'MD (Dermatology), FAAD', 'Medical & Aesthetic Dermatology', 10, 'Female', 'Specialist in laser treatments, eczema management, skin rejuvenation, and pediatric skin conditions.', 'https://images.unsplash.com/photo-1594824813566-78a05349b29e?auto=format&fit=crop&w=800&q=80', 55.00, 'Tue - Sat, 11:00 AM - 5:00 PM', 4.91)");
    }

    echo json_encode([
        "success" => true, 
        "message" => "Database fixed successfully. Markdown URLs fixed: $fixedCount",
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
