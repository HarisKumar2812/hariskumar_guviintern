<?php
session_start();
require_once "../_config/db.php";
require 'vendor/autoload.php'; // Include Composer's autoloader for Predis

if (isset($_POST['submit'])) {
    $name = $_POST['gname'];
    $email = $_POST['gmail'];
    $age = $_POST['gage'];
    $date_of_birth = $_POST['gdateofbirth'];
    $number = $_POST['gnumber'];
    $address = $_POST['gaddress'];
    $password = $_POST['gpassword'];

    // Initialize Redis client
    $redis = new Predis\Client();

    // Check if the email already exists
    $sql = "SELECT * FROM user_details WHERE email=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        exit(json_encode([
            'status' => 'error',
            'status_code' => 400,
            'message' => 'Email id already exists.'
        ]));
    }

    // Insert new user into the database
    $stmt = $con->prepare("INSERT INTO user_details (name, email, age, dob, contact, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $email, $age, $date_of_birth, $number, $address, $password);

    if ($stmt->execute()) {
        // Cache the new user data in Redis
        $cacheKey = "user:$email";
        $userData = array(
            'name' => $name,
            'email' => $email,
            'age' => $age,
            'dob' => $date_of_birth,
            'contact' => $number,
            'address' => $address
        );

        // Store user data in Redis cache with a TTL of 10 minutes
        $redis->setex($cacheKey, 600, json_encode($userData));

        exit(json_encode([
            'status' => 'success',
            'status_code' => 200,
            'message' => 'Registered successfully.'
        ]));
    } else {
        exit(json_encode([
            'status' => 'error',
            'status_code' => 500,
            'message' => 'Failed to insert data into the database.'
        ]));
    }
}
?>
