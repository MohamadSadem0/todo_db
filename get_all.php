<?php
include('connection.php');

// Prepare and execute the SQL query to fetch all tasks
$stmt = $mysqli->query("SELECT * FROM todo");
$tasks = $stmt->fetch_all(MYSQLI_ASSOC);

// Send the tasks data back to the client as JSON
header('Content-Type: application/json');
echo json_encode($tasks);
?>