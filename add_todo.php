<?php
include('connection.php');


$user_id = $_POST['user_id'];
$title = $_POST['title'];

$sql = "INSERT INTO tasks (title, user_id) VALUES (?, ?)";
$stmt = $mysqli->prepare($sql);

$stmt->bind_param("si", $title, $user_id);

if ($stmt->execute()) {
    $response = array("message" => "Task created successfully");
} else {
    $response = array("error" => "Error creating task");
}

header('Content-Type: application/json');
echo json_encode($response);



?>