<?php
require_once "../_config/db.php";
require 'vendor/autoload.php'; // Include Composer's autoloader for Predis

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $email = $_SESSION['gmail'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $dob = $_POST['dob'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];

    // Initialize Redis client
    $redis = new Predis\Client();

    // Prepare the SQL statement
    $sql = "UPDATE user_details SET name=?, age=?, dob=?, contact=?, address=? WHERE email=?";
    $statement = $con->prepare($sql);
    $statement->bind_param("ssssss", $name, $age, $dob, $contact, $address, $email);

    // Execute the statement
    if ($statement->execute()) {
        // Profile updated successfully

        // Update Redis cache
        $cacheKey = "profile:$email";
        $updatedData = array(
            'value1' => $name,
            'value2' => $age,
            'value3' => $dob,
            'value4' => $contact,
            'value5' => $address
        );

        $redis->setex($cacheKey, 600, json_encode($updatedData)); // Cache for 10 minutes

        $response = array('message' => 'Profile updated successfully.');
    } else {
        $response = array('message' => 'Error updating profile: ' . $statement->error);
    }

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
