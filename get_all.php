<?php
include('connection.php');

$query = $mysqli->prepare("select * from tasks ");
// $query->bind_param('i', $user_id);
$query->execute();
$query->bind_result($id,$title, $user_id,$status);
$tasks = array();
    while ($query->fetch()) {
        $task = array(
            "id"=>$id,
            "title" => $title,
            "user_id" => $user_id,
            "status"=>$status
        );
        $tasks[] = $task;
    }
    
    header('Content-Type: application/json');
    echo json_encode($tasks);
?>