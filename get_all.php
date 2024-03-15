<?php
include('connection.php');

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    $query = $mysqli->prepare("SELECT id, title, user_id, is_completed FROM tasks WHERE user_id = ?");
    $query->bind_param('i', $user_id);
    $query->execute();
    $query->bind_result($id, $title, $user_id, $status);

    $tasks = array();
    while ($query->fetch()) {
        $task = array(
            "id" => $id,
            "title" => $title,
            "status" => $status
        );
        $tasks[] = $task;
    }

    header('Content-Type: application/json');
    echo json_encode($tasks);
} else {
    $response = array("error" => "User ID not provided");
    
    header('Content-Type: application/json');
    echo json_encode($response);
}

$mysqli->close();   
?>