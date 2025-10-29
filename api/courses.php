<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'skillflow_academy';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Handle different API endpoints
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$endpoint = basename($path);

switch ($endpoint) {
    case 'courses':
        if ($method === 'GET') {
            getCourses();
        }
        break;
    case 'sales':
        if ($method === 'POST') {
            recordSale();
        } elseif ($method === 'GET') {
            getSales();
        }
        break;
    default:
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

function getCourses() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("SELECT * FROM courses ORDER BY trending DESC, students DESC");
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'courses' => $courses,
            'count' => count($courses)
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Failed to fetch courses: ' . $e->getMessage()]);
    }
}

function recordSale() {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO sales (course_id, customer_email, amount, currency, payment_method, download_token) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['course_id'],
            $input['email'],
            $input['amount'],
            $input['currency'] ?? 'ZAR',
            $input['payment_method'],
            bin2hex(random_bytes(16)) // Generate download token
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Sale recorded successfully',
            'sale_id' => $pdo->lastInsertId()
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Failed to record sale: ' . $e->getMessage()]);
    }
}

function getSales() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("
            SELECT s.*, c.title as course_title 
            FROM sales s 
            LEFT JOIN courses c ON s.course_id = c.id 
            ORDER BY s.created_date DESC 
            LIMIT 50
        ");
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'sales' => $sales,
            'count' => count($sales)
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Failed to fetch sales: ' . $e->getMessage()]);
    }
}
?>
