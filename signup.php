<?php
include('connection.php');


$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];



$check_query = $mysqli->prepare("SELECT id FROM user WHERE email = ?");
$check_query->bind_param("s", $email);
$check_query->execute();
$check_query->store_result();

if ($check_query->num_rows > 0) {
    $response = array("error" => "Email already exists");
} else {
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $insert_query = $mysqli->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
    $insert_query->bind_param("sss", $name, $email, $hashed_password);

    if ($insert_query->execute()) {
        $response = array("message" => "User created successfully");
    } else {
        $response = array("error" => "Error creating user");
    }
}


header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();



?>