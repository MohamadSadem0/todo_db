<?php
include('connection.php');


$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(name,password,email) values(?,?,?);');
    $query->bind_param('sss', $name, $hashed_password, $email);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);