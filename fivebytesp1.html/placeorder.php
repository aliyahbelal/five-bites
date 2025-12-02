<?php
// place_order.php - FIX: Updated to match FiveDB.sql schema

require_once 'db_connect.php'; // Provides the $pdo connection object

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

// 1. Read JSON input (Content-Type: application/json from script.js)
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data === null || !isset($data['fullName']) || !isset($data['email']) || !isset($data['address']) || !isset($data['items'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid data format received.']);
    exit;
}

// 2. Extract and sanitize client data
$fullName = filter_var($data['fullName'], FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$address = filter_var($data['address'], FILTER_SANITIZE_SPECIAL_CHARS);
$cartItems = $data['items'];
$cartTotal = isset($data['total']) ? (float)$data['total'] : 0; 

if (empty($cartItems)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Your cart is empty.']);
    exit;
}

// === DATABASE DEPENDENCIES & PLACEHOLDERS (REQUIRED by FiveDB.sql) ===
// CRITICAL: Ensure customer_ID 1 and restaurant_ID 1 exist in your database.
$customer_ID = 1; 
$restaurant_ID = 1; 

// Handling the single address input:
// The 'orders' table requires cityaddress (VARCHAR 30) and streetaddress (VARCHAR 100).
$cityAddress = "Default City"; // Using a placeholder since the form doesn't collect it.
$streetAddress = $address; // Using the full address provided by the client.
$orderStatus = 'Pending';
// =====================================================================

try {
    $pdo->beginTransaction();

    // 3. Insert into 'orders' table (FIXED QUERY)
    // Using order_Data, status, cityaddress, streetaddress, and restaurant_ID to match FiveDB.sql
    $stmt = $pdo->prepare("
        INSERT INTO orders (restaurant_ID, customer_ID, cityaddress, streetaddress, order_Data, status) 
        VALUES (:restaurant_ID, :customer_ID, :cityaddress, :streetaddress, NOW(), :status)
    ");
    
    $stmt->execute([
        'restaurant_ID' => $restaurant_ID,
        'customer_ID' => $customer_ID,
        'cityaddress' => $cityAddress,
        'streetaddress' => $streetAddress,
        'status' => $orderStatus
    ]);
    
    $orders_ID = $pdo->lastInsertId(); // Get the ID of the new order

    // 4. Insert line items into 'order_item' table
    // NOTE: The 'orders' table does not store 'total_amount'. 
    // This value is not saved in the database in this transaction.
    $orderItemStmt = $pdo->prepare("
        INSERT INTO order_item (orders_ID, product_ID, quantity, price) 
        VALUES (:orders_ID, :product_ID, :quantity, :price)
    ");

    foreach ($cartItems as $item) {
        $product_ID = (int)$item['id']; // This is the menuitem_ID
        $quantity = (int)$item['quantity'];
        $price = (float)$item['price'];
        
        if ($product_ID > 0 && $quantity > 0) {
            $orderItemStmt->execute([
                'orders_ID' => $orders_ID,
                'product_ID' => $product_ID,
                'quantity' => $quantity,
                'price' => $price
            ]);
        }
    }

    // 5. Commit transaction and respond
    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Order successfully placed.',
        'order_id' => $orders_ID 
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    error_log("Order placement error: " . $e->getMessage());
    http_response_code(500);
    
    // TEMPORARILY expose the database error message for debugging:
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to place order due to a server error.',
        'debug_message' => $e->getMessage() 
    ]);
}
?>