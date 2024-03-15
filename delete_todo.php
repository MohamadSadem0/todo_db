<?php
include('connection.php');

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $todoId = $_POST["id"];

    // Perform any necessary validation

    // Delete the todo from the database
    $stmt = $pdo->prepare("DELETE FROM todo WHERE TodoID = :id");
    $stmt->execute(array(':id' => $todoId));

    // Return a success message
    echo json_encode(array("message" => "Todo deleted successfully."));
} else {
    // Handle invalid requests
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Only POST requests are allowed."));
}
?>