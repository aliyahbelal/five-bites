<?php
// back.php - return menu items as JSON
// This file expects a separate db_connect.php that creates a $pdo PDO instance.
// Ensure db_connect.php is present in the same directory and defines DB_* constants and $pdo.

require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    // Prepare and execute the SQL statement
    $stmt = $pdo->query("SELECT menuitem_ID, Name, Price, Description FROM menuitem");
    $menu_items = $stmt->fetchAll();

    // Return the data as JSON
    echo json_encode(['success' => true, 'data' => $menu_items]);
} catch (PDOException $e) {
    // Log detailed error server-side and return a generic error message to the client
    error_log("SQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Internal server error']);
}