<?php
require_once "../_config/db.php";
require 'vendor/autoload.php'; // Include Composer's autoloader for Predis

session_start();

// Initialize Redis client
$redis = new Predis\Client();

$email = $_SESSION['gmail'];

// Check if user profile data is in Redis
$cacheKey = "profile:$email";
$cachedData = $redis->get($cacheKey);

if ($cachedData) {
    // If data is cached, return it
    $response = json_decode($cachedData, true);
} else {
    // Otherwise, fetch data from MySQL
    $sql = "SELECT name, age, dob, contact, address FROM user_details WHERE email=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $name = $user['name'];
    $age = $user['age'];
    $dob = $user['dob'];
    $contact = $user['contact'];
    $address = $user['address'];

    $response = array(
        'value1' => $name,
        'value2' => $age,
        'value3' => $dob,
        'value4' => $contact,
        'value5' => $address
    );

    // Cache the data in Redis for future requests (e.g., cache for 10 minutes)
    $redis->setex($cacheKey, 600, json_encode($response));
}

header('Content-Type: application/json');
echo json_encode($response);
?>
