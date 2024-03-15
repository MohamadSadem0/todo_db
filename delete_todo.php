<?php
include('connection.php');

if (isset($_POST['task_id'])) {
    $task_id = $_POST['task_id'];

    $delete_query = $mysqli->prepare("DELETE FROM tasks WHERE id = ?");
    $delete_query->bind_param("i", $task_id);

    if ($delete_query->execute()) {
        $response = array("message" => "Task deleted successfully");
    } else {
        $response = array("error" => "Error deleting task");
    }
} else {
    $response = array("error" => "Task ID not provided");
}

header('Content-Type: application/json');
echo json_encode($response);

$mysqli->close();
?>