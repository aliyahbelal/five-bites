<?php
// Simple database connection tester using PDO
// Edit the DB credentials below to match your MySQL setup, or set them via environment variables.

// Credentials (change these to your real values)
define('DB_HOST', 'localhost');
define('DB_NAME', 'FiveDB');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_strong_password');

$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html><head><meta charset="utf-8"><title>DB Test</title></head><body><pre>';

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    echo "Connected to database successfully.\n";

    // Show current database
    $stmt = $pdo->query('SELECT DATABASE() AS db');
    $row = $stmt->fetch();
    echo 'Current database: ' . ($row['db'] ?? 'unknown') . "\n";

    // Run a trivial test query
    $stmt = $pdo->query('SELECT 1 AS ok');
    $r = $stmt->fetch();
    echo 'Test query result: ' . ($r['ok'] ?? 'no result') . "\n";
} catch (PDOException $e) {
    echo "Connection failed: " . htmlspecialchars($e->getMessage()) . "\n";
    echo "DSN used: " . htmlspecialchars($dsn) . "\n";
    echo "Make sure the credentials in this file or in `back.php` are correct and MySQL is running.\n";
}

echo '</pre></body></html>';

// Also allow running from CLI: prints same messages without HTML
if (php_sapi_name() === 'cli') {
    // If run in CLI, output already printed; no further action needed.
}

?>
