<?php
require_once "../_config/db.php";

session_start();
$email=$_SESSION['gmail'];
$sql = "SELECT name,age,dob,contact,address FROM user_details WHERE email=? "; // SQL with parameters
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

header('Content-Type: application/json');
echo json_encode($response);
?>





 