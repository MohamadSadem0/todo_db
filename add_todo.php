<?php
include('connection.php');

if (isset($_POST["title"]) && isset($_POST["id"])) {
    $todoText = $_POST["title"];
    $user = $_POST["id"];
    
    $todoId = rand(1, 1000);

    $description = date("Y-m-d H:i:s");

    $stmt = $mysqli->prepare("INSERT INTO todo (Title, Description, UserID, TodoID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssii', $todoText, $description, $user, $todoId);

    if ($stmt->execute()) {
        $response["status"] = "success";
    } else {
        $response["status"] = "error";
        $response["message"] = $mysqli->error; // Provide error message for debugging
    }
} else {
    $response["status"] = "error";
    $response["message"] = "Required parameters are missing";
}

echo json_encode($response);
?>