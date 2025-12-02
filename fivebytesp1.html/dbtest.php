<?php
require_once 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT COUNT(*) AS item_count FROM menuitem");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo "<h1>Database Test Results</h1>";
    if ($result) {
        $count = $result['item_count'];
        echo "<p>Success! The 'menuitem' table has **$count** rows.</p>";
        
        if ($count == 0) {
            echo "<p style='color: red;'>⚠️ **Warning:** The table is empty! This is why your menu isn't showing any data.</p>";
        }
        
    } else {
        echo "<p style='color: red;'>Error: Could not retrieve count from the table.</p>";
    }

} catch (PDOException $e) {
    echo "<h2>Database Error</h2>";
    echo "<p style='color: red;'>Connection or Query Failed: " . $e->getMessage() . "</p>";
}
?>