<?php
require_once "../_config/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $email = $_SESSION['gmail'];
    $name = $_POST['name'];
    $age = $_POST['age'];
    $dob = $_POST['dob'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];

    // Prepare the SQL statement
    $sql = "UPDATE user_details SET name=?, age=?, dob=?, contact=?, address=? WHERE email=?";
    $statement = $con->prepare($sql);
    $statement->bind_param("ssssss", $name, $age, $dob, $contact, $address, $email);

    // Execute the statement
    if ($statement->execute()) {
        $response = array ('message' => 'Profile updated successfully.');
    } else {
        $response = array('message' => 'Error updating profile: ' . $statement->error);
    }

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
