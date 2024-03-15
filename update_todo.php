<?php
include('connection.php');

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the todo ID and completion status from the request body
    $todoId = $_POST["id"];
    $isCompleted = $_POST["completed"];

    // Perform any necessary validation

    // Update the completion status of the todo in the database
    $stmt = $pdo->prepare("UPDATE todo SET CompletionStatus = :completed WHERE TodoID = :id");
    $stmt->execute(array(':completed' => $isCompleted, ':id' => $todoId));

    // Return a success message
    echo json_encode(array("message" => "Todo updated successfully."));
} else {
    // Handle invalid requests
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Only POST requests are allowed."));
}
?>