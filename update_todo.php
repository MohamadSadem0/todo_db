<?php
include('connection.php');

if (isset($_POST['task_id']) && isset($_POST['new_title'])) {
    $task_id = $_POST['task_id'];
    $new_title = $_POST['new_title'];

    $update_query = $mysqli->prepare("UPDATE tasks SET title = ? WHERE id = ?");
    $update_query->bind_param("si", $new_title, $task_id);

    if ($update_query->execute()) {
        $response = array("message" => "Task updated successfully");
    } else {
        $response = array("error" => "Error updating task");
    }
} else {
    $response = array("error" => "Task ID or new title not provided");
}

header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();
?>