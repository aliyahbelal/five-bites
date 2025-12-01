<?php
// Simple database connection tester using the shared db_connect.php
// This script will test the connection defined in db_connect.php

// The require_once will handle the connection and exit on failure.
require_once 'db_connect.php';

header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html><head><meta charset="utf-8"><title>DB Test</title></head><body><pre>';

// If we reached this point, the connection in db_connect.php was successful.
echo "Connected to database successfully via db_connect.php.
";

try {
    // Show current database
    $stmt = $pdo->query('SELECT DATABASE() AS db');
    $row = $stmt->fetch();
    echo 'Current database: ' . ($row['db'] ?? 'unknown') . "\n";

    // Run a trivial test query
    $stmt = $pdo->query('SELECT 1 AS ok');
    $r = $stmt->fetch();
    echo 'Test query result: ' . ($r['ok'] ?? 'no result') . "\n";
} catch (PDOException $e) {
    // This part should ideally not be reached if db_connect handles the exit.
    echo "An error occurred after the initial connection: " . htmlspecialchars($e->getMessage()) . "\n";
}

echo '</pre></body></html>';
?>