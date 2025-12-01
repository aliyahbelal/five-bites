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
// The credentials in the file are correct for a default XAMPP/MAMP installation without a root password.
// If you have a password, you must change DB_PASS.

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
    // Return a JSON error message as this file is often used for AJAX/API requests.
    http_response_code(500);
    header('Content-Type: application/json');
    // Log the error for the developer, but show a generic message to the user.
    error_log("Database Connection Failed: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed. Please try again later.',
        // For debugging only: 'debug_message' => $e->getMessage()
    ]);
    // Stop the script if the connection fails.
    exit;
}
?>
