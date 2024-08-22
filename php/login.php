<?php
require_once "../_config/db.php";
require 'vendor/autoload.php'; // Include Composer's autoloader for Predis

session_start();

// Initialize Redis client
$redis = new Predis\Client();

$email = $_POST['gmail'];
$password = $_POST['gpassword'];

// Prepare SQL statement to check user credentials
$sql = "SELECT * FROM user_details WHERE email=? AND password=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    // Generate a session token
    $sessionToken = bin2hex(random_bytes(32));

    // Store session token in Redis with an expiry time (e.g., 1 hour)
    $redis->setex("session:$sessionToken", 3600, $email);

    // Set session token in a cookie or session variable
    $_SESSION['sessionToken'] = $sessionToken;

    exit(json_encode([
        'status' => 'success',
        'status_code' => 200,
        'message' => 'Logged in successfully.',
    ]));
} else {
    exit(json_encode([
        'status' => 'error',
        'status_code' => 400,
        'message' => 'Invalid email or password.',
    ]));
}
?>
