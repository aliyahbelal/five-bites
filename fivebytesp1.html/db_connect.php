<?php
// db_connect.php - Establishes a PDO database connection.
// This file should be included by other PHP scripts that need database access.

// --- Database Credentials ---
// Replace with your actual database details.
// For XAMPP, the default username is 'root' and there is often no password.
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'FiveDB');
define('DB_USER', 'root');
define('DB_PASS', ''); // <-- IMPORTANT: Set your MySQL root password here if you have one.

// --- PDO Connection ---
$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // For development, you might want to see the error.
    // For production, you should log this error and show a generic message.
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed.',
        // Uncomment the line below for debugging, but be careful in production!
        // 'debug_message' => $e->getMessage()
    ]);
    // Stop the script if the connection fails.
    exit;
}
?>
