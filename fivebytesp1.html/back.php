<?php
/**
 * Database Connection Script using PDO
 * Filename: db_connect.php
 */

// 1. Define Database Credentials
// *** IMPORTANT: You must replace these placeholder values with your actual database host, name, username, and password. ***
define('DB_HOST', 'localhost'); // Usually 'localhost'
define('DB_NAME', 'FiveDB'); // Based on your SQL file
define('DB_USER', 'your_db_user'); // Your MySQL username
define('DB_PASS', 'your_strong_password'); // Your MySQL password

// 2. Define DSN (Data Source Name)
$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';

// 3. Define PDO options for robust connection
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exceptions on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,     // Default fetch mode to associative array
    PDO::ATTR_EMULATE_PREPARES   => false,                // Disable emulation for better security
];

// 4. Attempt to connect to the database
try {
     // Create the PDO instance
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    // echo "Successfully connected to the database!"; // Optional: for testing
} catch (\PDOException $e) {
    // Handle connection errors securely
    // In a production environment, you would log the detailed error and show a generic message to the user.
    error_log("Database Connection Error: " . $e->getMessage());
    die('Database connection failed. Please try again later.');
}

// $pdo variable now holds the database connection object.
// You can use it in other PHP files (after including this one).