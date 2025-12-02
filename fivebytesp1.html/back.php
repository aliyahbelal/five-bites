<?php
// back.php - return menu items as JSON
require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    // تم التعديل لإضافة category_ID إلى الجلب 
    $stmt = $pdo->query("SELECT menuitem_ID, Name, Price, Description, category_ID FROM menuitem");
    $menu_items = $stmt->fetchAll(PDO::FETCH_ASSOC); // استخدام FETCH_ASSOC أفضل لضمان مفاتيح أسماء الأعمدة

    echo json_encode(['success' => true, 'data' => $menu_items]);
} catch (PDOException $e) {
    error_log("SQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Internal server error']);
}