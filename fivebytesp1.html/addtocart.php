<?php
// add_to_cart.php - Handles adding a menu item to the user's cart in the database.

require_once 'db_connect.php'; // Use the established database connection

header('Content-Type: application/json');

// --- 1. Get Input Data ---
// Ensure the request is POST and required data is present
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['menuitemId'], $_POST['quantity'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'error' => 'Invalid request or missing data.']);
    exit;
}

// Sanitize and validate input
$menuitemId = filter_var($_POST['menuitemId'], FILTER_SANITIZE_NUMBER_INT);
$quantity = filter_var($_POST['quantity'], FILTER_SANITIZE_NUMBER_INT);

// Basic validation
if (!is_numeric($menuitemId) || $menuitemId <= 0 || !is_numeric($quantity) || $quantity <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid item ID or quantity.']);
    exit;
}

// --- 2. Determine Cart and Item Details ---

// IMPORTANT: This part is simplified. In a real app, you'd check for a user session
// and fetch their existing cart_ID or create a new cart if none exists.
// For this example, we'll use a hardcoded customer_ID (1) and try to find/create a cart.
$customer_ID = 1; // Assuming you have a customer with ID 1 for testing

try {
    // A. Find or Create a Cart (carts table)
    $stmt = $pdo->prepare("SELECT carts_ID FROM carts WHERE customer_ID = :customer_id");
    $stmt->execute(['customer_id' => $customer_ID]);
    $cart_id = $stmt->fetchColumn();

    if (!$cart_id) {
        // Create a new cart if one doesn't exist for the customer
        $stmt = $pdo->prepare("INSERT INTO carts (created_at, customer_ID) VALUES (NOW(), :customer_id)");
        $stmt->execute(['customer_id' => $customer_ID]);
        $cart_id = $pdo->lastInsertId();
    }
    
    // B. Get item price (required for total_price in cartsitem)
    $stmt = $pdo->prepare("SELECT Price FROM menuitem WHERE menuitem_ID = :item_id");
    $stmt->execute(['item_id' => $menuitemId]);
    $item_price_str = $stmt->fetchColumn(); // Fetches the Price as a string

    if (!$item_price_str) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Menu item not found.']);
        exit;
    }
    $item_price = (float)$item_price_str;
    $total_price = $item_price * $quantity;

    // --- 3. Insert/Update Item in Cart (cartsitem table) ---
    // Check if item is already in cart to UPDATE quantity instead of INSERTing
    $stmt = $pdo->prepare("SELECT cartsitem_ID, quantity FROM cartsitem WHERE carts_ID = :cart_id AND menuitem_ID = :item_id");
    $stmt->execute(['cart_id' => $cart_id, 'item_id' => $menuitemId]);
    $existing_item = $stmt->fetch();

    if ($existing_item) {
        // UPDATE existing item quantity and total price
        $new_quantity = $existing_item['quantity'] + $quantity;
        $new_total_price = $item_price * $new_quantity;
        
        $sql = "UPDATE cartsitem SET quantity = :qty, total_price = :total WHERE cartsitem_ID = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['qty' => $new_quantity, 'total' => $new_total_price, 'id' => $existing_item['cartsitem_ID']]);
    } else {
        // INSERT new item into cart
        $sql = "INSERT INTO cartsitem (carts_ID, menuitem_ID, quantity, total_price) 
                VALUES (:cart_id, :item_id, :qty, :total)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['cart_id' => $cart_id, 'item_id' => $menuitemId, 'qty' => $quantity, 'total' => $total_price]);
    }

    // --- 4. Success Response ---
    echo json_encode(['success' => true, 'message' => 'Item added to cart successfully.', 'cart_id' => $cart_id]);

} catch (PDOException $e) {
    error_log("Cart Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database operation failed.']);
}
?>