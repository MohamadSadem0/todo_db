<?php
include('connection.php');


$user_id = $_POST['user_id'];
$title = $_POST['title'];
$status=$_POST['is_completed']; 


$query = $mysqli->prepare("INSERT INTO tasks (title, user_id,is_completed) VALUES (?, ?, ?)");


$query->bind_param("sii", $title, $user_id,$status);


if ($query->execute()) {
    $response = array("message" => "Task created successfully");
} else {
    $response = array("error" => "Error creating task");
}

header('Content-Type: application/json');
echo json_encode($response);



?>